"""Logbook descriptions for Family Tree birthday/anniversary events."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.logbook import (
    LOGBOOK_ENTRY_MESSAGE,
    LOGBOOK_ENTRY_NAME,
)
from homeassistant.const import ATTR_NAME
from homeassistant.core import Event, HomeAssistant, callback

from .const import DOMAIN, EVENT_ANNIVERSARY, EVENT_BIRTHDAY


@callback
def async_describe_events(
    hass: HomeAssistant,
    async_describe_event: Callable[[str, str, Callable[[Event], dict[str, Any]]], None],
) -> None:
    """Describe Family Tree events for the Activity / logbook UI."""

    @callback
    def _describe_birthday(event: Event) -> dict[str, Any]:
        name = event.data.get("name") or "Someone"
        age = event.data.get("age")
        message = f"{name} turns {age}" if age is not None else f"{name}'s birthday"
        return {
            LOGBOOK_ENTRY_NAME: "Family Tree",
            LOGBOOK_ENTRY_MESSAGE: message,
            ATTR_NAME: name,
        }

    @callback
    def _describe_anniversary(event: Event) -> dict[str, Any]:
        names = event.data.get("names") or []
        label = " & ".join(names) if names else "A couple"
        years = event.data.get("years")
        if years is not None:
            message = f"{label} — {years} year anniversary"
        else:
            message = f"{label} anniversary"
        return {
            LOGBOOK_ENTRY_NAME: "Family Tree",
            LOGBOOK_ENTRY_MESSAGE: message,
            ATTR_NAME: label,
        }

    async_describe_event(DOMAIN, EVENT_BIRTHDAY, _describe_birthday)
    async_describe_event(DOMAIN, EVENT_ANNIVERSARY, _describe_anniversary)
