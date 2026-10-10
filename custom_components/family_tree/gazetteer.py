"""Local GeoNames gazetteer backed by SQLite FTS5."""

from __future__ import annotations

import io
import logging
import sqlite3
import zipfile
from datetime import UTC
from pathlib import Path
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import GEONAMES_ADMIN1_URL, GEONAMES_BASE_URL, MAX_SEARCH

_LOGGER = logging.getLogger(__name__)

_SCHEMA = """
CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS countries (
    code TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    place_count INTEGER NOT NULL DEFAULT 0,
    installed_at TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS admin1 (
    code TEXT PRIMARY KEY NOT NULL,
    country_code TEXT NOT NULL,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS places (
    geonames_id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    asciiname TEXT NOT NULL DEFAULT '',
    country_code TEXT NOT NULL,
    admin1_code TEXT NOT NULL DEFAULT '',
    admin1_name TEXT NOT NULL DEFAULT '',
    latitude REAL,
    longitude REAL,
    feature_class TEXT NOT NULL DEFAULT '',
    feature_code TEXT NOT NULL DEFAULT '',
    population INTEGER NOT NULL DEFAULT 0
);
CREATE VIRTUAL TABLE IF NOT EXISTS places_fts USING fts5(
    name,
    asciiname,
    admin1_name,
    country_code UNINDEXED,
    content='places',
    content_rowid='geonames_id'
);
"""

# Common ISO country names for status display
_COUNTRY_NAMES: dict[str, str] = {
    "NL": "Netherlands",
    "BE": "Belgium",
    "DE": "Germany",
    "FR": "France",
    "GB": "United Kingdom",
    "US": "United States",
    "CA": "Canada",
    "AU": "Australia",
    "IE": "Ireland",
    "LU": "Luxembourg",
    "CH": "Switzerland",
    "AT": "Austria",
    "ES": "Spain",
    "IT": "Italy",
    "PT": "Portugal",
    "PL": "Poland",
    "SE": "Sweden",
    "NO": "Norway",
    "DK": "Denmark",
    "FI": "Finland",
}


class Gazetteer:
    """Download and search GeoNames country dumps locally."""

    def __init__(self, hass: HomeAssistant, path: Path) -> None:
        self.hass = hass
        self.path = path
        self._conn: sqlite3.Connection | None = None

    async def async_setup(self) -> None:
        """Open (or create) the gazetteer database."""
        await self.hass.async_add_executor_job(self._open)

    def _open(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._conn = sqlite3.connect(
            str(self.path),
            check_same_thread=False,
            isolation_level=None,
        )
        self._conn.row_factory = sqlite3.Row
        self._conn.executescript(_SCHEMA)

    def close(self) -> None:
        if self._conn is not None:
            self._conn.close()
            self._conn = None

    @property
    def conn(self) -> sqlite3.Connection:
        if self._conn is None:
            raise RuntimeError("Gazetteer database is not open")
        return self._conn

    async def async_ensure_countries(self, country_codes: list[str]) -> None:
        """Download any missing country dumps and refresh admin1 names."""
        from .validation import normalize_country_codes

        codes = normalize_country_codes(country_codes)
        if not codes:
            return
        missing = await self.hass.async_add_executor_job(self._missing_countries, codes)
        if not missing and not await self.hass.async_add_executor_job(
            self._needs_admin1
        ):
            return
        session = async_get_clientsession(self.hass)
        if await self.hass.async_add_executor_job(self._needs_admin1):
            async with session.get(GEONAMES_ADMIN1_URL) as resp:
                resp.raise_for_status()
                admin1_text = await resp.text()
            await self.hass.async_add_executor_job(self._import_admin1, admin1_text)
        for code in missing:
            url = f"{GEONAMES_BASE_URL}/{code}.zip"
            _LOGGER.info("Downloading GeoNames dump for %s", code)
            async with session.get(url) as resp:
                resp.raise_for_status()
                data = await resp.read()
            await self.hass.async_add_executor_job(self._import_country_zip, code, data)

    def _missing_countries(self, codes: list[str]) -> list[str]:
        installed = {
            str(r["code"])
            for r in self.conn.execute("SELECT code FROM countries").fetchall()
        }
        return [c for c in codes if c not in installed]

    def _needs_admin1(self) -> bool:
        row = self.conn.execute("SELECT COUNT(*) AS c FROM admin1").fetchone()
        return int(row["c"] if row else 0) == 0

    def _import_admin1(self, text: str) -> None:
        self.conn.execute("BEGIN")
        try:
            self.conn.execute("DELETE FROM admin1")
            for line in text.splitlines():
                if not line or line.startswith("#"):
                    continue
                parts = line.split("\t")
                if len(parts) < 2:
                    continue
                code = parts[0].strip()
                name = parts[1].strip()
                if "." not in code:
                    continue
                country = code.split(".", 1)[0]
                self.conn.execute(
                    "INSERT OR REPLACE INTO admin1 (code, country_code, name) "
                    "VALUES (?, ?, ?)",
                    (code, country, name),
                )
            self.conn.execute("COMMIT")
        except Exception:
            self.conn.execute("ROLLBACK")
            raise

    def _admin1_name(self, country: str, admin1_code: str) -> str:
        if not admin1_code:
            return ""
        key = f"{country}.{admin1_code}"
        row = self.conn.execute(
            "SELECT name FROM admin1 WHERE code = ?", (key,)
        ).fetchone()
        return str(row["name"]) if row else ""

    def _import_country_zip(self, country_code: str, data: bytes) -> None:
        from datetime import datetime

        places: list[tuple[Any, ...]] = []
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            # Prefer the country .txt file inside the zip
            names = [n for n in zf.namelist() if n.upper().endswith(".TXT")]
            if not names:
                raise ValueError(f"No .txt found in GeoNames zip for {country_code}")
            preferred = next(
                (n for n in names if n.upper().startswith(country_code)), names[0]
            )
            with zf.open(preferred) as handle:
                for raw in handle:
                    line = raw.decode("utf-8", errors="replace").rstrip("\n")
                    if not line:
                        continue
                    parts = line.split("\t")
                    if len(parts) < 15:
                        continue
                    feature_class = parts[6]
                    # Settlements (P) and some admin (A) for capitals
                    if feature_class not in ("P", "A"):
                        continue
                    feature_code = parts[7]
                    if (
                        feature_class == "A"
                        and not feature_code.startswith("PCLI")
                        and not feature_code.startswith("ADM")
                    ):
                        continue
                    try:
                        geonames_id = int(parts[0])
                        lat = float(parts[4]) if parts[4] else None
                        lon = float(parts[5]) if parts[5] else None
                        population = int(parts[14] or 0)
                    except ValueError:
                        continue
                    admin1_code = parts[10] or ""
                    admin1_name = self._admin1_name(country_code, admin1_code)
                    places.append(
                        (
                            geonames_id,
                            parts[1],
                            parts[2] or parts[1],
                            country_code,
                            admin1_code,
                            admin1_name,
                            lat,
                            lon,
                            feature_class,
                            feature_code,
                            population,
                        )
                    )

        self.conn.execute("BEGIN")
        try:
            self.conn.execute(
                "DELETE FROM places WHERE country_code = ?", (country_code,)
            )
            self.conn.execute(
                "DELETE FROM places_fts WHERE country_code = ?", (country_code,)
            )
            self.conn.executemany(
                "INSERT OR REPLACE INTO places "
                "(geonames_id, name, asciiname, country_code, admin1_code, "
                "admin1_name, latitude, longitude, feature_class, feature_code, "
                "population) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                places,
            )
            # Rebuild FTS for this country
            self.conn.execute(
                "INSERT INTO places_fts(rowid, name, asciiname, admin1_name, country_code) "
                "SELECT geonames_id, name, asciiname, admin1_name, country_code "
                "FROM places WHERE country_code = ?",
                (country_code,),
            )
            self.conn.execute(
                "INSERT OR REPLACE INTO countries (code, name, place_count, installed_at) "
                "VALUES (?, ?, ?, ?)",
                (
                    country_code,
                    _COUNTRY_NAMES.get(country_code, country_code),
                    len(places),
                    datetime.now(UTC).replace(microsecond=0).isoformat(),
                ),
            )
            self.conn.execute("COMMIT")
        except Exception:
            self.conn.execute("ROLLBACK")
            raise
        _LOGGER.info(
            "Installed gazetteer for %s (%s places)", country_code, len(places)
        )

    def search(
        self, query: str, *, country: str | None = None, limit: int = 20
    ) -> list[dict[str, Any]]:
        """Full-text search over installed places."""
        q = (query or "").strip()
        if not q:
            return []
        limit = max(1, min(int(limit), MAX_SEARCH))
        # Escape FTS5 special chars lightly
        token = q.replace('"', '""')
        match = f'"{token}"*'
        params: list[Any] = [match]
        sql = (
            "SELECT p.geonames_id, p.name, p.asciiname, p.country_code, "
            "p.admin1_code, p.admin1_name, p.latitude, p.longitude, p.population "
            "FROM places_fts f "
            "JOIN places p ON p.geonames_id = f.rowid "
            "WHERE places_fts MATCH ?"
        )
        if country:
            sql += " AND p.country_code = ?"
            params.append(country.strip().upper())
        sql += " ORDER BY p.population DESC LIMIT ?"
        params.append(limit)
        try:
            rows = self.conn.execute(sql, params).fetchall()
        except sqlite3.OperationalError:
            # Fallback LIKE search if FTS query fails
            like = f"%{q}%"
            fallback_sql = (
                "SELECT geonames_id, name, asciiname, country_code, admin1_code, "
                "admin1_name, latitude, longitude, population FROM places "
                "WHERE name LIKE ? OR asciiname LIKE ?"
            )
            fparams: list[Any] = [like, like]
            if country:
                fallback_sql += " AND country_code = ?"
                fparams.append(country.strip().upper())
            fallback_sql += " ORDER BY population DESC LIMIT ?"
            fparams.append(limit)
            rows = self.conn.execute(fallback_sql, fparams).fetchall()
        return [
            {
                "geonames_id": int(r["geonames_id"]),
                "name": r["name"],
                "asciiname": r["asciiname"],
                "country_code": r["country_code"],
                "admin1_code": r["admin1_code"],
                "admin1": r["admin1_name"],
                "latitude": r["latitude"],
                "longitude": r["longitude"],
                "population": int(r["population"] or 0),
            }
            for r in rows
        ]

    def status(self) -> dict[str, Any]:
        """Return installed countries and totals."""
        rows = self.conn.execute(
            "SELECT code, name, place_count, installed_at FROM countries ORDER BY code"
        ).fetchall()
        total = self.conn.execute("SELECT COUNT(*) AS c FROM places").fetchone()
        return {
            "countries": [
                {
                    "code": r["code"],
                    "name": r["name"],
                    "place_count": int(r["place_count"]),
                    "installed_at": r["installed_at"],
                }
                for r in rows
            ],
            "total_places": int(total["c"] if total else 0),
        }
