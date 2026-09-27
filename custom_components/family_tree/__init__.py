"""The Family Tree integration."""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .const import CONF_NAME, DEFAULT_PROFILE_NAME, DOMAIN, PLATFORMS
from .helpers import db_path, gazetteer_db_path

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up the Family Tree domain (enables logbook event descriptions)."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Family Tree from a config entry."""
    from .coordinator import FamilyTreeCoordinator
    from .db import Database
    from .gazetteer import Gazetteer
    from .http import async_register_http
    from .panel import async_setup_panel
    from .repository import Repository
    from .services import async_register_services
    from .websocket_api import async_register_websocket

    if CONF_NAME not in entry.data:
        name = str(entry.title or DEFAULT_PROFILE_NAME).strip() or DEFAULT_PROFILE_NAME
        hass.config_entries.async_update_entry(
            entry, data={**dict(entry.data), CONF_NAME: name}
        )

    path = db_path(hass)
    database = Database(path)
    await hass.async_add_executor_job(database.open)
    repo = Repository(database)

    gazetteer = Gazetteer(hass, gazetteer_db_path(hass))
    await gazetteer.async_setup()

    coordinator = FamilyTreeCoordinator(hass, repo, gazetteer, entry)
    await coordinator.async_setup()

    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = coordinator

    async_register_services(hass)
    async_register_websocket(hass)
    async_register_http(hass)
    await async_setup_panel(hass)

    await hass.config_entries.async_forward_entry_setups(
        entry, [Platform(p) for p in PLATFORMS]
    )

    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    from .coordinator import FamilyTreeCoordinator
    from .panel import async_unregister_panel
    from .services import async_unregister_services

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry, [Platform(p) for p in PLATFORMS]
    )
    if unload_ok:
        coordinator: FamilyTreeCoordinator = hass.data[DOMAIN].pop(entry.entry_id)
        await coordinator.async_shutdown()
        if not hass.data[DOMAIN]:
            async_unregister_services(hass)
            async_unregister_panel(hass)
            hass.data.pop(DOMAIN, None)
    return unload_ok


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update (e.g. gazetteer country list)."""
    from .coordinator import FamilyTreeCoordinator

    coordinator: FamilyTreeCoordinator = hass.data[DOMAIN][entry.entry_id]
    await coordinator.async_options_updated()
