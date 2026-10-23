"""Summary sensors for Family Tree."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import (
    SensorEntity,
    SensorStateClass,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import UnitOfTime
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import FamilyTreeCoordinator
from .helpers import device_info_for_entry

# Exclude PII / list attributes from the recorder history DB.
_UNRECORDED = frozenset(
    {
        "events",
        "birthdays",
        "anniversaries",
        "memorials",
        "next_kind",
        "next_label",
    }
)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Family Tree sensors."""
    coordinator: FamilyTreeCoordinator = hass.data[DOMAIN][entry.entry_id]
    async_add_entities(
        [
            PeopleCountSensor(coordinator, entry),
            LivingCountSensor(coordinator, entry),
            OnThisDaySensor(coordinator, entry),
            UpcomingEventsSensor(coordinator, entry),
        ]
    )


class FamilyTreeSensorBase(CoordinatorEntity[FamilyTreeCoordinator], SensorEntity):
    """Base class for Family Tree sensors."""

    _attr_has_entity_name = True
    _unrecorded_attributes = _UNRECORDED

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry, key: str) -> None:
        super().__init__(coordinator)
        self._object_id = key
        self._attr_unique_id = f"{entry.entry_id}_{key}"
        self._attr_device_info = device_info_for_entry(entry)

    @property
    def suggested_object_id(self) -> str | None:
        return self._object_id

    @callback
    def _handle_coordinator_update(self) -> None:
        ctx = self.coordinator.update_context
        if ctx is not None:
            self.async_set_context(ctx)
        super()._handle_coordinator_update()


class PeopleCountSensor(FamilyTreeSensorBase):
    """Total number of people in the tree."""

    _attr_translation_key = "people_count"
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:account-group"

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "people_count")

    @property
    def native_value(self) -> int | None:
        data = self.coordinator.data
        if data is None:
            return None
        return int(data.stats.get("total_persons") or 0)


class LivingCountSensor(FamilyTreeSensorBase):
    """Number of living people."""

    _attr_translation_key = "living_count"
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:account-heart"

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "living_count")

    @property
    def native_value(self) -> int | None:
        data = self.coordinator.data
        if data is None:
            return None
        return int(data.stats.get("living") or 0)


class OnThisDaySensor(FamilyTreeSensorBase):
    """Count of historic events that fall on today."""

    _attr_translation_key = "on_this_day"
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:history"

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "on_this_day")

    @property
    def native_value(self) -> int | None:
        data = self.coordinator.data
        if data is None:
            return None
        return sum(1 for item in data.on_this_day if int(item.get("days_until", -1)) == 0)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data
        if data is None:
            return {}
        today = [item for item in data.on_this_day if int(item.get("days_until", -1)) == 0]
        return {"events": today}


class UpcomingEventsSensor(FamilyTreeSensorBase):
    """Days until the soonest birthday, anniversary, or memorial."""

    _attr_translation_key = "upcoming_events"
    _attr_native_unit_of_measurement = UnitOfTime.DAYS
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:calendar-clock"

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "upcoming_events")

    def _soonest(self) -> tuple[str, dict[str, Any]] | None:
        data = self.coordinator.data
        if data is None:
            return None
        candidates: list[tuple[int, str, dict[str, Any]]] = []
        for item in data.upcoming_birthdays:
            candidates.append((int(item["days_until"]), "birthday", item))
        for item in data.upcoming_anniversaries:
            candidates.append((int(item["days_until"]), "anniversary", item))
        for item in data.upcoming_memorials:
            candidates.append((int(item["days_until"]), "memorial", item))
        if not candidates:
            return None
        candidates.sort(key=lambda c: (c[0], c[1]))
        _, kind, item = candidates[0]
        return kind, item

    @property
    def native_value(self) -> int | None:
        soonest = self._soonest()
        if soonest is None:
            return None
        return int(soonest[1]["days_until"])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data
        if data is None:
            return {}
        attrs: dict[str, Any] = {
            "birthdays": list(data.upcoming_birthdays),
            "anniversaries": list(data.upcoming_anniversaries),
            "memorials": list(data.upcoming_memorials),
        }
        soonest = self._soonest()
        if soonest is not None:
            kind, item = soonest
            attrs["next_kind"] = kind
            if kind == "birthday":
                attrs["next_label"] = item.get("name")
            elif kind == "anniversary":
                attrs["next_label"] = " & ".join(item.get("names") or [])
            else:
                attrs["next_label"] = item.get("name")
        return attrs
