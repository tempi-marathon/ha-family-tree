"""Serve Lovelace card bundle and register the module resource."""

from __future__ import annotations

import logging
from datetime import datetime
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_call_later

from .const import (
    CARDS_FILENAME,
    CARDS_SOURCEMAP_URL,
    CARDS_URL_PATH,
    DOMAIN,
    VERSION,
)

_LOGGER = logging.getLogger(__name__)

_CARDS_KEY = f"{DOMAIN}_cards_registered"
_CARDS_LISTENER = f"{DOMAIN}_cards_lovelace_listener"
_MAX_LOVELACE_RETRIES = 24
DIST_DIR = Path(__file__).parent / "dist"


def _cards_fs_state(cards_path: Path, sourcemap_path: Path) -> tuple[bool, int, bool]:
    """Return (exists, cache_bust_mtime, sourcemap_exists)."""
    if not cards_path.is_file():
        return False, 0, False
    try:
        cache_bust = int(cards_path.stat().st_mtime)
    except OSError:
        cache_bust = 0
    return True, cache_bust, sourcemap_path.is_file()


async def async_setup_cards(hass: HomeAssistant) -> None:
    """Serve card JS and register a Lovelace module resource (storage mode)."""
    if hass.data.get(_CARDS_KEY):
        return

    cards_path = DIST_DIR / CARDS_FILENAME
    sourcemap_path = DIST_DIR / f"{CARDS_FILENAME}.map"
    exists, cache_bust, sourcemap_exists = await hass.async_add_executor_job(
        _cards_fs_state, cards_path, sourcemap_path
    )
    if not exists:
        _LOGGER.warning(
            "Family Tree cards bundle missing (%s) — run `npm run build`",
            cards_path,
        )
        return

    static_paths = [
        StaticPathConfig(
            url_path=CARDS_URL_PATH,
            path=str(cards_path),
            cache_headers=False,
        )
    ]
    if sourcemap_exists:
        static_paths.append(
            StaticPathConfig(
                url_path=CARDS_SOURCEMAP_URL,
                path=str(sourcemap_path),
                cache_headers=False,
            )
        )

    try:
        await hass.http.async_register_static_paths(static_paths)
    except RuntimeError:
        _LOGGER.debug("Static paths already registered for Family Tree cards")

    module_url = f"{CARDS_URL_PATH}?v={VERSION}&m={cache_bust}"
    hass.data[_CARDS_KEY] = {"url": module_url}
    await _async_schedule_lovelace_registration(hass, module_url)
    _LOGGER.info("Family Tree Lovelace cards available at %s", module_url)


async def _async_schedule_lovelace_registration(hass: HomeAssistant, module_url: str) -> None:
    """Register now, or wait until Lovelace / HA startup is ready."""
    if await _async_register_lovelace_resource(hass, module_url):
        return

    if hass.is_running:
        _schedule_retry(hass, module_url, attempt=1)
        return

    if hass.data.get(_CARDS_LISTENER):
        return

    @callback
    def _on_started(_event: Event) -> None:
        hass.data.pop(_CARDS_LISTENER, None)
        hass.async_create_task(_async_retry_register(hass, module_url, 1))

    hass.data[_CARDS_LISTENER] = hass.bus.async_listen_once(
        EVENT_HOMEASSISTANT_STARTED, _on_started
    )


def _schedule_retry(hass: HomeAssistant, module_url: str, *, attempt: int) -> None:
    async def _run(_now: datetime) -> None:
        await _async_retry_register(hass, module_url, attempt)

    async_call_later(hass, 5, _run)


async def _async_retry_register(hass: HomeAssistant, module_url: str, attempt: int) -> None:
    if await _async_register_lovelace_resource(hass, module_url):
        return
    if attempt >= _MAX_LOVELACE_RETRIES:
        _LOGGER.warning(
            "Gave up registering Family Tree Lovelace resource after %s attempts",
            attempt,
        )
        return
    _schedule_retry(hass, module_url, attempt=attempt + 1)


async def _async_register_lovelace_resource(hass: HomeAssistant, module_url: str) -> bool:
    """Idempotently add/update the cards module in Lovelace storage mode.

    Returns True when registration succeeded or is not applicable (YAML mode).
    Returns False when Lovelace is not ready yet (caller should retry).
    """
    lovelace = hass.data.get("lovelace")
    if lovelace is None:
        _LOGGER.debug("Lovelace not loaded yet; will retry card resource registration")
        return False

    resource_mode = getattr(lovelace, "resource_mode", None) or getattr(lovelace, "mode", None)
    if resource_mode != "storage":
        _LOGGER.debug(
            "Lovelace resources not in storage mode (%s); add YAML resource manually: %s",
            resource_mode,
            CARDS_URL_PATH,
        )
        return True

    resources = getattr(lovelace, "resources", None)
    if resources is None:
        return False

    try:
        # Force-load storage before create/update (avoids wiping resources).
        if hasattr(resources, "async_get_info"):
            await resources.async_get_info()
        elif not getattr(resources, "loaded", True) and hasattr(resources, "async_load"):
            await resources.async_load()
    except Exception:  # noqa: BLE001
        _LOGGER.debug("Lovelace resources not ready; will retry", exc_info=True)
        return False

    if not getattr(resources, "loaded", True):
        return False

    try:
        items = list(resources.async_items())
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Failed to list Lovelace resources")
        return False

    base = CARDS_URL_PATH
    existing = next(
        (item for item in items if str(item.get("url", "")).startswith(base)),
        None,
    )
    if existing is not None:
        if existing.get("url") == module_url:
            return True
        try:
            await resources.async_update_item(
                existing["id"],
                {"res_type": "module", "url": module_url},
            )
            _LOGGER.info("Updated Lovelace resource for Family Tree cards")
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to update Lovelace card resource")
            return False
        return True

    try:
        await resources.async_create_item({"res_type": "module", "url": module_url})
        _LOGGER.info("Registered Lovelace resource for Family Tree cards")
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Failed to create Lovelace card resource")
        return False
    return True


@callback
def async_unload_cards(hass: HomeAssistant) -> None:
    """Clear registration flag when the last config entry unloads.

    The Lovelace resource URL is left in place (safe orphan); YAML-mode users
    manage resources themselves. Static paths cannot be unregistered.
    """
    unsub = hass.data.pop(_CARDS_LISTENER, None)
    if unsub is not None:
        unsub()
    hass.data.pop(_CARDS_KEY, None)
