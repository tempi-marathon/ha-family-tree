"""Service actions for Family Tree."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv

from .auth import async_require_admin_or_automation
from .const import (
    ATTR_CONFIG_ENTRY_ID,
    DOMAIN,
    MAX_NAME,
    MAX_NOTES,
    MAX_PERSONS,
)
from .gedcom_export import export_gedcom
from .helpers import entry_id_from_call_data, get_coordinator
from .models import Person, Sex
from .names import display_name

_LOGGER = logging.getLogger(__name__)

SERVICE_ADD_PERSON = "add_person"
SERVICE_LINK_USER = "link_user"
SERVICE_EXPORT_GEDCOM = "export_gedcom"

ATTR_GIVEN_NAMES = "given_names"
ATTR_CALL_NAME = "call_name"
ATTR_SURNAME_PREFIX = "surname_prefix"
ATTR_SURNAME = "surname"
ATTR_SEX = "sex"
ATTR_IS_LIVING = "is_living"
ATTR_NOTES = "notes"
ATTR_HA_USER_ID = "ha_user_id"
ATTR_PERSON_ID = "person_id"


def _bounded_string(max_length: int):
    def validator(value: Any) -> str:
        text = cv.string(value)
        if len(text) > max_length:
            raise vol.Invalid(f"must be at most {max_length} characters")
        return text

    return validator


ADD_PERSON_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_GIVEN_NAMES, default=""): _bounded_string(MAX_NAME),
        vol.Optional(ATTR_CALL_NAME, default=""): _bounded_string(MAX_NAME),
        vol.Optional(ATTR_SURNAME_PREFIX, default=""): _bounded_string(MAX_NAME),
        vol.Optional(ATTR_SURNAME, default=""): _bounded_string(MAX_NAME),
        vol.Optional(ATTR_SEX, default=Sex.UNKNOWN.value): vol.In(
            [s.value for s in Sex]
        ),
        vol.Optional(ATTR_IS_LIVING, default=True): cv.boolean,
        vol.Optional(ATTR_NOTES, default=""): _bounded_string(MAX_NOTES),
        vol.Optional(ATTR_CONFIG_ENTRY_ID): cv.string,
    }
)

LINK_USER_SCHEMA = vol.Schema(
    {
        vol.Required(ATTR_HA_USER_ID): cv.string,
        vol.Required(ATTR_PERSON_ID): cv.string,
        vol.Optional(ATTR_CONFIG_ENTRY_ID): cv.string,
    }
)

EXPORT_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_CONFIG_ENTRY_ID): cv.string,
    }
)


@callback
def async_register_services(hass: HomeAssistant) -> None:
    """Register Family Tree services once."""
    key = f"{DOMAIN}_services_registered"
    if hass.data.get(key):
        return

    async def async_add_person(call: ServiceCall) -> dict[str, Any]:
        await async_require_admin_or_automation(hass, call.context.user_id)
        coordinator = get_coordinator(
            hass, config_entry_id=entry_id_from_call_data(call.data)
        )

        def _run() -> dict[str, Any]:
            if coordinator.repo.count_persons() >= MAX_PERSONS:
                raise ServiceValidationError(
                    f"Maximum of {MAX_PERSONS} persons reached"
                )
            person = Person(
                given_names=call.data.get(ATTR_GIVEN_NAMES) or "",
                call_name=call.data.get(ATTR_CALL_NAME) or "",
                surname_prefix=call.data.get(ATTR_SURNAME_PREFIX) or "",
                surname=call.data.get(ATTR_SURNAME) or "",
                sex=Sex(call.data.get(ATTR_SEX) or Sex.UNKNOWN.value),
                is_living=bool(call.data.get(ATTR_IS_LIVING, True)),
                notes=call.data.get(ATTR_NOTES) or "",
            )
            saved = coordinator.repo.add_person(person)
            return {**saved.to_dict(), "display_name": display_name(saved)}

        return {"person": await hass.async_add_executor_job(_run)}

    async def async_link_user(call: ServiceCall) -> dict[str, Any]:
        await async_require_admin_or_automation(hass, call.context.user_id)
        coordinator = get_coordinator(
            hass, config_entry_id=entry_id_from_call_data(call.data)
        )

        def _run() -> dict[str, Any]:
            person = coordinator.repo.get_person(call.data[ATTR_PERSON_ID])
            if person is None:
                raise ServiceValidationError(
                    f"Unknown person_id: {call.data[ATTR_PERSON_ID]}"
                )
            link = coordinator.repo.set_user_link(
                call.data[ATTR_HA_USER_ID], call.data[ATTR_PERSON_ID]
            )
            return link.to_dict()

        return {"link": await hass.async_add_executor_job(_run)}

    async def async_export(call: ServiceCall) -> dict[str, Any]:
        await async_require_admin_or_automation(hass, call.context.user_id)
        coordinator = get_coordinator(
            hass, config_entry_id=entry_id_from_call_data(call.data)
        )
        text = await hass.async_add_executor_job(export_gedcom, coordinator.repo.db)
        return {"gedcom": text}

    hass.services.async_register(
        DOMAIN,
        SERVICE_ADD_PERSON,
        async_add_person,
        schema=ADD_PERSON_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_LINK_USER,
        async_link_user,
        schema=LINK_USER_SCHEMA,
        supports_response=SupportsResponse.OPTIONAL,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_EXPORT_GEDCOM,
        async_export,
        schema=EXPORT_SCHEMA,
        supports_response=SupportsResponse.ONLY,
    )
    hass.data[key] = True


@callback
def async_unregister_services(hass: HomeAssistant) -> None:
    """Remove Family Tree services."""
    key = f"{DOMAIN}_services_registered"
    if not hass.data.pop(key, None):
        return
    for service in (SERVICE_ADD_PERSON, SERVICE_LINK_USER, SERVICE_EXPORT_GEDCOM):
        if hass.services.has_service(DOMAIN, service):
            hass.services.async_remove(DOMAIN, service)
