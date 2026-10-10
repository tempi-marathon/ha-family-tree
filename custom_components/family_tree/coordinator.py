"""Coordinator that recomputes stats and fires birthday/anniversary events."""

from __future__ import annotations

import json
import logging
from datetime import date, datetime
from typing import TYPE_CHECKING, Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import CALLBACK_TYPE, Context, HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from .const import (
    CONF_FAMILY_SHORTCUTS,
    CONF_GAZETTEER_COUNTRIES,
    DOMAIN,
    EVENT_ANNIVERSARY,
    EVENT_BIRTHDAY,
    META_FAMILY_SHORTCUTS,
)
from .dates import parse_gedcom_date
from .models import EventType, SubjectType, UnionStatus
from .names import display_name
from .repository import Repository
from .stats import compute_stats

if TYPE_CHECKING:
    from .gazetteer import Gazetteer

_LOGGER = logging.getLogger(__name__)

_META_EVENT_STATE = "event_fire_state"


class FamilyTreeData:
    """Snapshot published to entities after each recompute."""

    def __init__(
        self,
        *,
        stats: dict[str, Any],
        upcoming_birthdays: list[dict[str, Any]],
        upcoming_anniversaries: list[dict[str, Any]],
        revision: int,
    ) -> None:
        self.stats = stats
        self.upcoming_birthdays = upcoming_birthdays
        self.upcoming_anniversaries = upcoming_anniversaries
        self.revision = revision


class FamilyTreeCoordinator(DataUpdateCoordinator[FamilyTreeData]):
    """Owns daily recompute, repo listeners, and event dedupe."""

    def __init__(
        self,
        hass: HomeAssistant,
        repo: Repository,
        gazetteer: Gazetteer,
        entry: ConfigEntry,
    ) -> None:
        super().__init__(hass, _LOGGER, name=DOMAIN)
        self.repo = repo
        self.gazetteer = gazetteer
        self.entry = entry
        self.entry_id = entry.entry_id
        self.config_entry = entry
        self.update_context: Context | None = None
        self._unsub_daily: CALLBACK_TYPE | None = None
        self._unsub_repo: CALLBACK_TYPE | None = None

    @property
    def family_shortcuts(self) -> list[str]:
        stored = self.repo.get_family_shortcuts()
        if stored is not None:
            return stored
        return list(self.entry.options.get(CONF_FAMILY_SHORTCUTS) or [])

    @property
    def gazetteer_countries(self) -> list[str]:
        return list(self.entry.options.get(CONF_GAZETTEER_COUNTRIES) or [])

    async def async_setup(self) -> None:
        """Wire listeners, sync gazetteer countries, run first recompute."""
        self._unsub_repo = self.repo.add_listener(self._on_repo_changed)
        self._unsub_daily = async_track_time_change(
            self.hass,
            self._on_daily,
            hour=0,
            minute=5,
            second=0,
        )
        await self.async_sync_gazetteer()
        await self.hass.async_add_executor_job(self._migrate_family_shortcuts)
        await self._async_strip_shortcuts_from_options()
        await self.async_refresh()

    def _migrate_family_shortcuts(self) -> None:
        if self.repo.meta_has(META_FAMILY_SHORTCUTS):
            return
        legacy = list(self.entry.options.get(CONF_FAMILY_SHORTCUTS) or [])
        self.repo.set_family_shortcuts(legacy)

    async def _async_strip_shortcuts_from_options(self) -> None:
        opts = dict(self.entry.options)
        if CONF_FAMILY_SHORTCUTS not in opts:
            return
        opts.pop(CONF_FAMILY_SHORTCUTS, None)
        self.hass.config_entries.async_update_entry(self.entry, options=opts)

    async def async_shutdown(self) -> None:
        """Detach listeners and close database."""
        if self._unsub_daily is not None:
            self._unsub_daily()
            self._unsub_daily = None
        if self._unsub_repo is not None:
            self._unsub_repo()
            self._unsub_repo = None
        await self.hass.async_add_executor_job(self.repo.db.close)

    async def async_options_updated(self) -> None:
        """Refresh after options flow changes."""
        await self.async_sync_gazetteer()
        self._schedule_refresh()

    async def async_sync_gazetteer(self) -> None:
        """Ensure configured GeoNames countries are installed."""
        countries = self.gazetteer_countries
        if not countries:
            return
        try:
            await self.gazetteer.async_ensure_countries(countries)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to sync gazetteer countries %s", countries)

    def _schedule_refresh(self) -> None:
        entry = self.config_entry
        if entry is not None and hasattr(entry, "async_create_task"):
            entry.async_create_task(
                self.hass,
                self.async_request_refresh(),
                f"{DOMAIN}_refresh",
            )
            return
        self.hass.async_create_task(self.async_request_refresh())

    @callback
    def _on_repo_changed(self) -> None:
        # Repository notifies from the executor thread.
        self.hass.loop.call_soon_threadsafe(self._schedule_refresh)

    @callback
    def _on_daily(self, _now: datetime) -> None:
        self._schedule_refresh()

    async def _async_update_data(self) -> FamilyTreeData:
        self.update_context = Context()
        today = date.today()

        def _compute() -> tuple[dict[str, Any], list[dict[str, Any]], list[dict[str, Any]], int]:
            stats = compute_stats(self.repo.db, today=today)
            birthdays = _upcoming_birthdays(self.repo, today=today)
            anniversaries = _upcoming_anniversaries(self.repo, today=today)
            revision = self.repo.get_revision()
            return stats, birthdays, anniversaries, revision

        stats, birthdays, anniversaries, revision = await self.hass.async_add_executor_job(
            _compute
        )
        await self._async_fire_transition_events(birthdays, anniversaries, today)
        return FamilyTreeData(
            stats=stats,
            upcoming_birthdays=birthdays,
            upcoming_anniversaries=anniversaries,
            revision=revision,
        )

    def _load_event_state(self) -> dict[str, str]:
        row = self.repo.db.fetchone(
            "SELECT value FROM meta WHERE key = ?", (_META_EVENT_STATE,)
        )
        if not row:
            return {}
        try:
            raw = json.loads(row["value"])
        except (TypeError, json.JSONDecodeError):
            return {}
        return {str(k): str(v) for k, v in raw.items()} if isinstance(raw, dict) else {}

    def _save_event_state(self, state: dict[str, str]) -> None:
        payload = json.dumps(state)
        existing = self.repo.db.fetchone(
            "SELECT key FROM meta WHERE key = ?", (_META_EVENT_STATE,)
        )
        if existing:
            self.repo.db.execute(
                "UPDATE meta SET value = ? WHERE key = ?",
                (payload, _META_EVENT_STATE),
            )
        else:
            self.repo.db.execute(
                "INSERT INTO meta (key, value) VALUES (?, ?)",
                (_META_EVENT_STATE, payload),
            )

    async def _async_fire_transition_events(
        self,
        birthdays: list[dict[str, Any]],
        anniversaries: list[dict[str, Any]],
        today: date,
    ) -> None:
        """Fire events once when an occasion newly becomes today."""
        previous = await self.hass.async_add_executor_job(self._load_event_state)
        current: dict[str, str] = {}
        context = self.update_context
        today_iso = today.isoformat()

        for item in birthdays:
            if int(item.get("days_until", -1)) != 0:
                continue
            key = f"birthday:{item['person_id']}"
            marker = f"{today_iso}:{item.get('next_date')}"
            current[key] = marker
            if previous.get(key) == marker:
                continue
            self.hass.bus.async_fire(
                EVENT_BIRTHDAY,
                {
                    "person_id": item["person_id"],
                    "name": item.get("name"),
                    "age": item.get("age"),
                    "date": item.get("next_date"),
                },
                context=context,
            )

        for item in anniversaries:
            if int(item.get("days_until", -1)) != 0:
                continue
            key = f"anniversary:{item['union_id']}"
            marker = f"{today_iso}:{item.get('next_date')}"
            current[key] = marker
            if previous.get(key) == marker:
                continue
            self.hass.bus.async_fire(
                EVENT_ANNIVERSARY,
                {
                    "union_id": item["union_id"],
                    "names": item.get("names"),
                    "years": item.get("years"),
                    "date": item.get("next_date"),
                },
                context=context,
            )

        # Keep prior markers that are still relevant so we don't re-fire mid-day
        # after a repo refresh; drop markers for other years.
        merged = {k: v for k, v in previous.items() if v.startswith(today_iso)}
        merged.update(current)
        await self.hass.async_add_executor_job(self._save_event_state, merged)


def _next_occurrence(month: int, day: int, today: date) -> date:
    """Next calendar date for month/day on or after today (handles Feb 29)."""
    year = today.year
    for _ in range(2):
        try:
            candidate = date(year, month, day)
        except ValueError:
            # Feb 29 in non-leap year → Feb 28
            candidate = date(year, month, 28)
        if candidate >= today:
            return candidate
        year += 1
    return date(year, month, min(day, 28))


def _month_day_from_sort(sort_date: str | None) -> tuple[int, int] | None:
    if not sort_date or len(sort_date) < 7:
        return None
    try:
        month = int(sort_date[5:7])
        day = int(sort_date[8:10]) if len(sort_date) >= 10 else 1
        if month < 1 or month > 12 or day < 1 or day > 31:
            return None
        return month, day
    except (TypeError, ValueError):
        return None


def _upcoming_birthdays(
    repo: Repository, *, today: date, within_days: int = 60
) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for event in repo.list_events_by_type(EventType.BIRTH.value):
        if event.subject_type != SubjectType.PERSON:
            continue
        person = repo.get_person(event.subject_id)
        if person is None or not person.is_living:
            continue
        parsed = parse_gedcom_date(event.date_text)
        sort = event.sort_date or (parsed.sort_date if parsed else None)
        md = _month_day_from_sort(sort)
        if md is None:
            continue
        month, day = md
        if len(sort or "") < 10:
            # Year-only or month-only → skip precise birthday
            if sort and len(sort) < 7:
                continue
            if len(sort or "") < 10:
                continue
        next_date = _next_occurrence(month, day, today)
        days = (next_date - today).days
        if days > within_days:
            continue
        birth_year = int(sort[:4]) if sort and len(sort) >= 4 else None
        age = next_date.year - birth_year if birth_year else None
        out.append(
            {
                "person_id": person.id,
                "name": display_name(person),
                "next_date": next_date.isoformat(),
                "days_until": days,
                "age": age,
            }
        )
    out.sort(key=lambda i: (i["days_until"], i["name"]))
    return out


def _upcoming_anniversaries(
    repo: Repository, *, today: date, within_days: int = 60
) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for event in repo.list_events_by_type(EventType.MARRIAGE.value):
        if event.subject_type != SubjectType.UNION:
            continue
        union = repo.get_union(event.subject_id)
        if union is None or union.status != UnionStatus.ONGOING:
            continue
        partners = repo.list_union_partners(union.id)
        people = [repo.get_person(p.person_id) for p in partners]
        if not people or any(p is None or not p.is_living for p in people):
            continue
        parsed = parse_gedcom_date(event.date_text)
        sort = event.sort_date or (parsed.sort_date if parsed else None)
        md = _month_day_from_sort(sort)
        if md is None or not sort or len(sort) < 10:
            continue
        month, day = md
        next_date = _next_occurrence(month, day, today)
        days = (next_date - today).days
        if days > within_days:
            continue
        start_year = int(sort[:4])
        names = [display_name(p) for p in people if p is not None]
        out.append(
            {
                "union_id": union.id,
                "names": names,
                "next_date": next_date.isoformat(),
                "days_until": days,
                "years": next_date.year - start_year,
            }
        )
    out.sort(key=lambda i: (i["days_until"], ",".join(i["names"])))
    return out
