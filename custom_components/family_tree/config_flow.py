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
    CONF_FAMILY_SHORTCUTS,
    CONF_GAZETTEER_COUNTRIES,
    CONF_NAME,
    DEFAULT_FAMILY_SHORTCUTS,
    DEFAULT_GAZETTEER_COUNTRIES,
    DEFAULT_PROFILE_NAME,
    DOMAIN,
)


class FamilyTreeConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Family Tree."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Initial setup: profile name only (single entry)."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        errors: dict[str, str] = {}

        if user_input is not None:
            name = str(user_input.get(CONF_NAME) or DEFAULT_PROFILE_NAME).strip()
            if not name:
                errors["base"] = "invalid_name"
            else:
                return self.async_create_entry(
                    title=name,
                    data={CONF_NAME: name},
                    options={
                        CONF_GAZETTEER_COUNTRIES: list(DEFAULT_GAZETTEER_COUNTRIES),
                        CONF_FAMILY_SHORTCUTS: list(DEFAULT_FAMILY_SHORTCUTS),
                    },
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_NAME, default=DEFAULT_PROFILE_NAME): TextSelector(),
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        """Create the options flow."""
        return FamilyTreeOptionsFlow()


class FamilyTreeOptionsFlow(OptionsFlow):
    """Options for gazetteer countries and family shortcuts."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Edit gazetteer countries and family surname shortcuts."""
        options = dict(self.config_entry.options)
        countries = list(
            options.get(CONF_GAZETTEER_COUNTRIES) or DEFAULT_GAZETTEER_COUNTRIES
        )
        shortcuts = list(
            options.get(CONF_FAMILY_SHORTCUTS) or DEFAULT_FAMILY_SHORTCUTS
        )

        if user_input is not None:
            countries = [
                str(c).strip().upper()
                for c in (user_input.get(CONF_GAZETTEER_COUNTRIES) or [])
                if str(c).strip()
            ]
            shortcuts = [
                str(s).strip()
                for s in (user_input.get(CONF_FAMILY_SHORTCUTS) or [])
                if str(s).strip()
            ]
            return self.async_create_entry(
                title="",
                data={
                    CONF_GAZETTEER_COUNTRIES: countries,
                    CONF_FAMILY_SHORTCUTS: shortcuts,
                },
            )

        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_GAZETTEER_COUNTRIES, default=countries
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=countries,
                        multiple=True,
                        custom_value=True,
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(
                    CONF_FAMILY_SHORTCUTS, default=shortcuts
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=shortcuts,
                        multiple=True,
                        custom_value=True,
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                ),
            }
        )
        return self.async_show_form(step_id="init", data_schema=schema)
