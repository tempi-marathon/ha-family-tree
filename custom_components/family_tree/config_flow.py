"""Config and options flows for Family Tree."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
)

from .const import (
    CONF_GAZETTEER_COUNTRIES,
    CONF_NAME,
    DEFAULT_GAZETTEER_COUNTRIES,
    DEFAULT_PROFILE_NAME,
    DOMAIN,
    SUGGESTED_GAZETTEER_COUNTRIES,
)
from .validation import normalize_country_codes


def _normalize_countries(raw: Any) -> list[str]:
    return normalize_country_codes(raw)


def _country_selector(current: list[str]) -> SelectSelector:
    options = list(
        dict.fromkeys([*SUGGESTED_GAZETTEER_COUNTRIES, *[c.upper() for c in current]])
    )
    return SelectSelector(
        SelectSelectorConfig(
            options=options,
            multiple=True,
            custom_value=True,
            mode=SelectSelectorMode.DROPDOWN,
        )
    )


class FamilyTreeConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Family Tree."""

    VERSION = 1

    def __init__(self) -> None:
        """Store answers across setup steps."""
        self._name = DEFAULT_PROFILE_NAME
        self._countries: list[str] = list(DEFAULT_GAZETTEER_COUNTRIES)

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step 1: profile / tree name."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        errors: dict[str, str] = {}

        if user_input is not None:
            name = str(user_input.get(CONF_NAME) or DEFAULT_PROFILE_NAME).strip()
            if not name:
                errors["base"] = "invalid_name"
            else:
                self._name = name
                return await self.async_step_gazetteer()

        schema = vol.Schema(
            {
                vol.Required(CONF_NAME, default=self._name): TextSelector(),
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    async def async_step_gazetteer(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Step 2: which GeoNames countries to download for offline place search."""
        if user_input is not None:
            self._countries = _normalize_countries(
                user_input.get(CONF_GAZETTEER_COUNTRIES)
            )
            return self.async_create_entry(
                title=self._name,
                data={CONF_NAME: self._name},
                options={
                    CONF_GAZETTEER_COUNTRIES: list(self._countries),
                },
            )

        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_GAZETTEER_COUNTRIES, default=list(self._countries)
                ): _country_selector(self._countries),
            }
        )
        return self.async_show_form(step_id="gazetteer", data_schema=schema)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Create the options flow."""
        return FamilyTreeOptionsFlow()


class FamilyTreeOptionsFlow(OptionsFlow):
    """Options for gazetteer countries."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit gazetteer countries."""
        options = dict(self.config_entry.options)
        countries = list(
            options.get(CONF_GAZETTEER_COUNTRIES) or DEFAULT_GAZETTEER_COUNTRIES
        )

        if user_input is not None:
            return self.async_create_entry(
                title="",
                data={
                    CONF_GAZETTEER_COUNTRIES: _normalize_countries(
                        user_input.get(CONF_GAZETTEER_COUNTRIES)
                    ),
                },
            )

        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_GAZETTEER_COUNTRIES, default=countries
                ): _country_selector(countries),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
