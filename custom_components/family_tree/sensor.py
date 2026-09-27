"""Summary sensors for Family Tree."""

from __future__ import annotations

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

# Exclude PII name attributes from the recorder history DB.
_UNRECORDED = frozenset({"person_name", "person_id", "names", "union_id"})


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
            NextBirthdaySensor(coordinator, entry),
        ]
    )


class FamilyTreeSensorBase(CoordinatorEntity[FamilyTreeCoordinator], SensorEntity):
    """Base class for Family Tree sensors."""

    _attr_has_entity_name = True
    _unrecorded_attributes = _UNRECORDED

    def __init__(
        self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry, key: str
    ) -> None:
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


class NextBirthdaySensor(FamilyTreeSensorBase):
    """Days until the next birthday among living people."""

    _attr_translation_key = "next_birthday"
    _attr_native_unit_of_measurement = UnitOfTime.DAYS
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_icon = "mdi:cake-variant"

    def __init__(self, coordinator: FamilyTreeCoordinator, entry: ConfigEntry) -> None:
        super().__init__(coordinator, entry, "next_birthday")

    @property
    def native_value(self) -> int | None:
        data = self.coordinator.data
        if data is None or not data.upcoming_birthdays:
            return None
        return int(data.upcoming_birthdays[0]["days_until"])

    @property
    def extra_state_attributes(self) -> dict:
        data = self.coordinator.data
        if data is None or not data.upcoming_birthdays:
            return {}
        nxt = data.upcoming_birthdays[0]
        return {
            "person_name": nxt.get("name"),
            "person_id": nxt.get("person_id"),
            "date": nxt.get("next_date"),
            "age": nxt.get("age"),
        }
