"""Shared helpers for Family Tree coordinators and paths."""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo

from .const import (
    CONF_NAME,
    DATA_DIR_NAME,
    DB_FILENAME,
    DEFAULT_PROFILE_NAME,
    DOMAIN,
    GAZETTEER_DB_FILENAME,
    VERSION,
)

if TYPE_CHECKING:
    from .coordinator import FamilyTreeCoordinator


def profile_name(entry: ConfigEntry) -> str:
    """Return the display name for a config entry."""
    return str(entry.data.get(CONF_NAME) or entry.title or DEFAULT_PROFILE_NAME)


def device_info_for_entry(entry: ConfigEntry) -> DeviceInfo:
    """Shared DeviceInfo for Family Tree entity platforms."""
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name=profile_name(entry),
        manufacturer="Family Tree",
        model="Genealogy",
        sw_version=VERSION,
        entry_type=DeviceEntryType.SERVICE,
    )


def data_dir(hass: HomeAssistant) -> Path:
    """Return ``config/family_tree`` and ensure it exists."""
    path = Path(hass.config.path(DATA_DIR_NAME))
    path.mkdir(parents=True, exist_ok=True)
    return path


def db_path(hass: HomeAssistant) -> Path:
    """Return the main SQLite database path."""
    return data_dir(hass) / DB_FILENAME


def gazetteer_db_path(hass: HomeAssistant) -> Path:
    """Return the gazetteer SQLite database path."""
    return data_dir(hass) / GAZETTEER_DB_FILENAME


def get_coordinator(
    hass: HomeAssistant,
    *,
    config_entry_id: str | None = None,
) -> FamilyTreeCoordinator:
    """Resolve the Family Tree coordinator for the (single) config entry."""
    data = hass.data.get(DOMAIN) or {}
    if not data:
        raise HomeAssistantError("Family Tree is not set up")

    if config_entry_id:
        coordinator = data.get(config_entry_id)
        if coordinator is None:
            raise ServiceValidationError(
                f"Unknown Family Tree config entry: {config_entry_id}"
            )
        return coordinator

    if len(data) == 1:
        return next(iter(data.values()))

    raise ServiceValidationError(
        "Multiple Family Tree entries are configured; provide config_entry_id"
    )


def entry_id_from_call_data(data: dict[str, Any]) -> str | None:
    """Extract optional config_entry_id from service/websocket data."""
    value = data.get("config_entry_id")
    if value is None or value == "":
        return None
    return str(value)
