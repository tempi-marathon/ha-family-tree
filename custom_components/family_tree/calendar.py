"""Calendar platform for birthdays and anniversaries."""

from __future__ import annotations

from datetime import date, datetime, timedelta

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import FamilyTreeCoordinator, _month_day_from_sort, _next_occurrence
from .dates import parse_gedcom_date
from .helpers import device_info_for_entry
from .models import EventType, SubjectType, UnionStatus
from .names import display_name


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Family Tree calendar."""
    coordinator: FamilyTreeCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([FamilyTreeCalendar(coordinator, entry)])


class FamilyTreeCalendar(CoordinatorEntity[FamilyTreeCoordinator], CalendarEntity):
    """All-day birthday and anniversary calendar."""

    _attr_has_entity_name = True
    _attr_translation_key = "family_events"
    _attr_icon = "mdi:calendar-heart"

    def __init__(
        self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = f"{entry.entry_id}_calendar"
        self._attr_device_info = device_info_for_entry(entry)
        self._object_id = "family_events"

    @property
    def suggested_object_id(self) -> str | None:
        return self._object_id

    @property
    def event(self) -> CalendarEvent | None:
        """Return the next upcoming event."""
        data = self.coordinator.data
        if data is None:
            return None
        candidates: list[tuple[int, CalendarEvent]] = []
        for item in data.upcoming_birthdays[:5]:
            start = date.fromisoformat(item["next_date"])
            candidates.append(
                (
                    item["days_until"],
                    CalendarEvent(
                        start=start,
                        end=start + timedelta(days=1),
                        summary=f"Birthday: {item['name']}",
                        description=f"Turns {item.get('age')}" if item.get("age") else None,
                        uid=f"birthday-{item['person_id']}-{item['next_date']}",
                    ),
                )
            )
        for item in data.upcoming_anniversaries[:5]:
            start = date.fromisoformat(item["next_date"])
            names = " & ".join(item.get("names") or [])
            candidates.append(
                (
                    item["days_until"],
                    CalendarEvent(
                        start=start,
                        end=start + timedelta(days=1),
                        summary=f"Anniversary: {names}",
                        description=(
                            f"{item.get('years')} years" if item.get("years") else None
                        ),
                        uid=f"anniversary-{item['union_id']}-{item['next_date']}",
                    ),
                )
            )
        if not candidates:
            return None
        candidates.sort(key=lambda c: c[0])
        return candidates[0][1]

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: datetime,
        end_date: datetime,
    ) -> list[CalendarEvent]:
        """Return calendar events in the range."""
        start_d = start_date.date() if isinstance(start_date, datetime) else start_date
        end_d = end_date.date() if isinstance(end_date, datetime) else end_date

        def _build() -> list[CalendarEvent]:
            events: list[CalendarEvent] = []
            repo = self.coordinator.repo

            for ev in repo.list_events_by_type(EventType.BIRTH.value):
                if ev.subject_type != SubjectType.PERSON:
                    continue
                person = repo.get_person(ev.subject_id)
                if person is None or not person.is_living:
                    continue
                parsed = parse_gedcom_date(ev.date_text)
                sort = ev.sort_date or (parsed.sort_date if parsed else None)
                md = _month_day_from_sort(sort)
                if md is None or not sort or len(sort) < 10:
                    continue
                month, day = md
                cursor = _next_occurrence(month, day, start_d)
                while cursor < end_d:
                    events.append(
                        CalendarEvent(
                            start=cursor,
                            end=cursor + timedelta(days=1),
                            summary=f"Birthday: {display_name(person)}",
                            uid=f"birthday-{person.id}-{cursor.isoformat()}",
                        )
                    )
                    cursor = _next_occurrence(month, day, cursor + timedelta(days=1))

            for ev in repo.list_events_by_type(EventType.MARRIAGE.value):
                if ev.subject_type != SubjectType.UNION:
                    continue
                union = repo.get_union(ev.subject_id)
                if union is None or union.status != UnionStatus.ONGOING:
                    continue
                partners = [
                    repo.get_person(p.person_id)
                    for p in repo.list_union_partners(union.id)
                ]
                if not partners or any(p is None or not p.is_living for p in partners):
                    continue
                parsed = parse_gedcom_date(ev.date_text)
                sort = ev.sort_date or (parsed.sort_date if parsed else None)
                md = _month_day_from_sort(sort)
                if md is None or not sort or len(sort) < 10:
                    continue
                month, day = md
                names = " & ".join(display_name(p) for p in partners if p)
                cursor = _next_occurrence(month, day, start_d)
                while cursor < end_d:
                    events.append(
                        CalendarEvent(
                            start=cursor,
                            end=cursor + timedelta(days=1),
                            summary=f"Anniversary: {names}",
                            uid=f"anniversary-{union.id}-{cursor.isoformat()}",
                        )
                    )
                    cursor = _next_occurrence(month, day, cursor + timedelta(days=1))

            events.sort(key=lambda e: e.start)
            return events

        return await hass.async_add_executor_job(_build)
