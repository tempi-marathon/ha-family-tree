"""SQLite database access for Family Tree."""

from __future__ import annotations

import logging
import sqlite3
from collections.abc import Callable, Iterator
from contextlib import contextmanager
from pathlib import Path
from typing import Any

from .const import SCHEMA_VERSION

_LOGGER = logging.getLogger(__name__)

_MIGRATIONS: dict[int, str] = {
    1: """
    PRAGMA foreign_keys = ON;

    CREATE TABLE persons (
        id TEXT PRIMARY KEY NOT NULL,
        given_names TEXT NOT NULL DEFAULT '',
        call_name TEXT NOT NULL DEFAULT '',
        surname_prefix TEXT NOT NULL DEFAULT '',
        surname TEXT NOT NULL DEFAULT '',
        sex TEXT NOT NULL DEFAULT 'unknown',
        is_living INTEGER NOT NULL DEFAULT 1,
        notes TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT
    );

    CREATE TABLE unions (
        id TEXT PRIMARY KEY NOT NULL,
        type TEXT NOT NULL DEFAULT 'unknown',
        status TEXT NOT NULL DEFAULT 'ongoing',
        known_children_count INTEGER,
        notes TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT
    );

    CREATE TABLE union_partners (
        id TEXT PRIMARY KEY NOT NULL,
        union_id TEXT NOT NULL REFERENCES unions(id) ON DELETE CASCADE,
        person_id TEXT NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
        position INTEGER NOT NULL DEFAULT 0,
        UNIQUE (union_id, person_id)
    );

    CREATE TABLE parent_child (
        id TEXT PRIMARY KEY NOT NULL,
        parent_id TEXT NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
        child_id TEXT NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
        type TEXT NOT NULL DEFAULT 'biological',
        union_id TEXT REFERENCES unions(id) ON DELETE SET NULL,
        UNIQUE (parent_id, child_id)
    );

    CREATE TABLE places (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        admin1 TEXT NOT NULL DEFAULT '',
        country TEXT NOT NULL DEFAULT '',
        country_code TEXT NOT NULL DEFAULT '',
        latitude REAL,
        longitude REAL,
        geonames_id INTEGER,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT
    );

    CREATE TABLE events (
        id TEXT PRIMARY KEY NOT NULL,
        subject_type TEXT NOT NULL,
        subject_id TEXT NOT NULL,
        type TEXT NOT NULL,
        place_id TEXT REFERENCES places(id) ON DELETE SET NULL,
        date_text TEXT NOT NULL DEFAULT '',
        date_qualifier TEXT NOT NULL DEFAULT 'exact',
        date_from TEXT,
        date_to TEXT,
        sort_date TEXT,
        description TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT
    );

    CREATE TABLE sources (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL DEFAULT '',
        url TEXT NOT NULL DEFAULT '',
        author TEXT NOT NULL DEFAULT '',
        repository TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        deleted_at TEXT
    );

    CREATE TABLE citations (
        id TEXT PRIMARY KEY NOT NULL,
        source_id TEXT NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
        subject_type TEXT NOT NULL,
        subject_id TEXT NOT NULL,
        detail TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE external_refs (
        id TEXT PRIMARY KEY NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        system TEXT NOT NULL,
        external_id TEXT NOT NULL,
        UNIQUE (system, external_id, entity_type)
    );

    CREATE TABLE user_links (
        id TEXT PRIMARY KEY NOT NULL,
        ha_user_id TEXT NOT NULL UNIQUE,
        person_id TEXT NOT NULL REFERENCES persons(id) ON DELETE CASCADE
    );

    CREATE TABLE meta (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
    );

    CREATE INDEX idx_persons_surname ON persons(surname);
    CREATE INDEX idx_persons_deleted ON persons(deleted_at);
    CREATE INDEX idx_events_subject ON events(subject_type, subject_id);
    CREATE INDEX idx_events_type ON events(type);
    CREATE INDEX idx_parent_child_parent ON parent_child(parent_id);
    CREATE INDEX idx_parent_child_child ON parent_child(child_id);
    CREATE INDEX idx_union_partners_person ON union_partners(person_id);
    CREATE INDEX idx_citations_subject ON citations(subject_type, subject_id);
    CREATE INDEX idx_external_refs_lookup ON external_refs(system, external_id);
    CREATE INDEX idx_places_name ON places(name);

    INSERT INTO meta (key, value) VALUES ('revision', '0');
    """,
}


class Database:
    """Thin SQLite wrapper with migrations and WAL."""

    def __init__(self, path: Path) -> None:
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._conn: sqlite3.Connection | None = None

    def open(self) -> None:
        """Open the connection and apply migrations."""
        if self._conn is not None:
            return
        self._conn = sqlite3.connect(
            str(self.path),
            check_same_thread=False,
            isolation_level=None,
        )
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._conn.execute("PRAGMA journal_mode = WAL")
        self._migrate()

    def close(self) -> None:
        """Close the connection."""
        if self._conn is not None:
            self._conn.close()
            self._conn = None

    @property
    def conn(self) -> sqlite3.Connection:
        if self._conn is None:
            raise RuntimeError("Database is not open")
        return self._conn

    def _migrate(self) -> None:
        assert self._conn is not None
        current = int(self._conn.execute("PRAGMA user_version").fetchone()[0])
        if current > SCHEMA_VERSION:
            raise RuntimeError(
                f"Database schema version {current} is newer than "
                f"supported {SCHEMA_VERSION}"
            )
        for version in range(current + 1, SCHEMA_VERSION + 1):
            sql = _MIGRATIONS.get(version)
            if not sql:
                raise RuntimeError(f"Missing migration for schema version {version}")
            _LOGGER.info("Migrating family tree database to version %s", version)
            self._conn.executescript(sql)
            self._conn.execute(f"PRAGMA user_version = {version}")

    @contextmanager
    def transaction(self) -> Iterator[sqlite3.Connection]:
        """Run a write transaction."""
        conn = self.conn
        conn.execute("BEGIN IMMEDIATE")
        try:
            yield conn
            conn.execute("COMMIT")
        except Exception:
            conn.execute("ROLLBACK")
            raise

    def execute(
        self, sql: str, params: tuple[Any, ...] | list[Any] = ()
    ) -> sqlite3.Cursor:
        return self.conn.execute(sql, params)

    def executemany(self, sql: str, seq: list[tuple[Any, ...]]) -> sqlite3.Cursor:
        return self.conn.executemany(sql, seq)

    def fetchone(
        self, sql: str, params: tuple[Any, ...] | list[Any] = ()
    ) -> sqlite3.Row | None:
        return self.conn.execute(sql, params).fetchone()

    def fetchall(
        self, sql: str, params: tuple[Any, ...] | list[Any] = ()
    ) -> list[sqlite3.Row]:
        return list(self.conn.execute(sql, params).fetchall())

    def get_revision(self) -> int:
        row = self.fetchone("SELECT value FROM meta WHERE key = 'revision'")
        return int(row["value"]) if row else 0

    def bump_revision(self) -> int:
        self.execute(
            "UPDATE meta SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT) "
            "WHERE key = 'revision'"
        )
        return self.get_revision()


def run_in_executor(hass: Any, func: Callable[..., Any], *args: Any) -> Any:
    """Schedule a sync DB call on the HA executor."""
    return hass.async_add_executor_job(func, *args)
