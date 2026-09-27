"""Pytest configuration for Family Tree tests."""

from __future__ import annotations

import sys
import types
from pathlib import Path
from typing import Any
from unittest.mock import MagicMock

# Allow importing custom_components.family_tree without installing the package
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


def _ensure_homeassistant_stubs() -> None:
    """Install lightweight stubs so modules import without HA installed."""
    if "homeassistant" in sys.modules and hasattr(
        sys.modules["homeassistant"], "__file__"
    ):
        return

    modules: dict[str, Any] = {
        "homeassistant": types.ModuleType("homeassistant"),
        "homeassistant.core": types.ModuleType("homeassistant.core"),
        "homeassistant.helpers": types.ModuleType("homeassistant.helpers"),
        "homeassistant.helpers.storage": types.ModuleType(
            "homeassistant.helpers.storage"
        ),
        "homeassistant.helpers.event": types.ModuleType("homeassistant.helpers.event"),
        "homeassistant.helpers.update_coordinator": types.ModuleType(
            "homeassistant.helpers.update_coordinator"
        ),
        "homeassistant.helpers.aiohttp_client": types.ModuleType(
            "homeassistant.helpers.aiohttp_client"
        ),
        "homeassistant.helpers.device_registry": types.ModuleType(
            "homeassistant.helpers.device_registry"
        ),
        "homeassistant.helpers.config_validation": types.ModuleType(
            "homeassistant.helpers.config_validation"
        ),
        "homeassistant.helpers.selector": types.ModuleType(
            "homeassistant.helpers.selector"
        ),
        "homeassistant.helpers.entity_platform": types.ModuleType(
            "homeassistant.helpers.entity_platform"
        ),
        "homeassistant.exceptions": types.ModuleType("homeassistant.exceptions"),
        "homeassistant.config_entries": types.ModuleType(
            "homeassistant.config_entries"
        ),
        "homeassistant.const": types.ModuleType("homeassistant.const"),
        "homeassistant.components": types.ModuleType("homeassistant.components"),
        "homeassistant.components.websocket_api": types.ModuleType(
            "homeassistant.components.websocket_api"
        ),
        "homeassistant.components.http": types.ModuleType(
            "homeassistant.components.http"
        ),
        "homeassistant.components.frontend": types.ModuleType(
            "homeassistant.components.frontend"
        ),
        "homeassistant.components.panel_custom": types.ModuleType(
            "homeassistant.components.panel_custom"
        ),
        "homeassistant.components.logbook": types.ModuleType(
            "homeassistant.components.logbook"
        ),
        "homeassistant.components.sensor": types.ModuleType(
            "homeassistant.components.sensor"
        ),
        "homeassistant.components.calendar": types.ModuleType(
            "homeassistant.components.calendar"
        ),
    }

    modules["homeassistant.helpers.aiohttp_client"].async_get_clientsession = MagicMock()

    class DeviceEntryType:
        SERVICE = "service"

    def DeviceInfo(**kwargs: Any) -> dict[str, Any]:
        return kwargs

    modules["homeassistant.helpers.device_registry"].DeviceEntryType = DeviceEntryType
    modules["homeassistant.helpers.device_registry"].DeviceInfo = DeviceInfo

    modules["homeassistant.exceptions"].HomeAssistantError = type(
        "HomeAssistantError", (Exception,), {}
    )
    modules["homeassistant.exceptions"].ServiceValidationError = type(
        "ServiceValidationError", (Exception,), {}
    )
    modules["homeassistant.exceptions"].Unauthorized = type(
        "Unauthorized",
        (modules["homeassistant.exceptions"].HomeAssistantError,),
        {},
    )

    ws = modules["homeassistant.components.websocket_api"]
    ws.websocket_command = lambda schema: (lambda f: f)
    ws.async_response = lambda f: f
    ws.async_register_command = MagicMock()
    ws.event_message = lambda sid, data: {"id": sid, "event": data}
    ws.ActiveConnection = MagicMock

    class DataUpdateCoordinator:
        def __init__(self, hass: Any, logger: Any, name: str = "") -> None:
            self.hass = hass
            self.logger = logger
            self.name = name
            self.data = None

        def __class_getitem__(cls, _item: Any) -> type:
            return cls

        async def async_refresh(self) -> None:
            self.data = await self._async_update_data()

        async def async_request_refresh(self) -> None:
            await self.async_refresh()

        async def _async_update_data(self) -> Any:
            raise NotImplementedError

        def async_add_listener(self, _listener: Any) -> Any:
            return MagicMock()

    modules["homeassistant.helpers.update_coordinator"].DataUpdateCoordinator = (
        DataUpdateCoordinator
    )
    modules["homeassistant.helpers.update_coordinator"].CoordinatorEntity = type(
        "CoordinatorEntity",
        (),
        {
            "__init__": lambda self, coordinator: setattr(self, "coordinator", coordinator),
            "__class_getitem__": classmethod(lambda cls, _item: cls),
        },
    )
    modules["homeassistant.helpers.event"].async_track_time_change = MagicMock(
        return_value=MagicMock()
    )
    modules["homeassistant.core"].HomeAssistant = MagicMock
    modules["homeassistant.core"].callback = lambda f: f
    modules["homeassistant.core"].CALLBACK_TYPE = object
    modules["homeassistant.core"].ServiceCall = MagicMock
    modules["homeassistant.core"].SupportsResponse = MagicMock(
        OPTIONAL="optional", ONLY="only"
    )

    class Context:
        def __init__(
            self,
            id: str | None = None,
            user_id: str | None = None,
            parent_id: str | None = None,
        ) -> None:
            self.id = id or "stub-context"
            self.user_id = user_id
            self.parent_id = parent_id

    modules["homeassistant.core"].Context = Context

    cv = modules["homeassistant.helpers.config_validation"]
    cv.string = str
    cv.boolean = bool

    selector = modules["homeassistant.helpers.selector"]

    class _SelectorStub:
        def __init__(self, *args: Any, **kwargs: Any) -> None:
            pass

    class _ConfigStub:
        def __init__(self, *args: Any, **kwargs: Any) -> None:
            pass

    class _ModeStub:
        BOX = "box"
        DROPDOWN = "dropdown"
        SLIDER = "slider"

    selector.NumberSelector = _SelectorStub
    selector.NumberSelectorConfig = _ConfigStub
    selector.NumberSelectorMode = _ModeStub
    selector.SelectSelector = _SelectorStub
    selector.SelectSelectorConfig = _ConfigStub
    selector.SelectSelectorMode = _ModeStub
    selector.TextSelector = _SelectorStub

    class ConfigFlow:
        def __init_subclass__(cls, domain: str | None = None, **kwargs: Any) -> None:
            super().__init_subclass__(**kwargs)
            cls.DOMAIN = domain  # type: ignore[attr-defined]

    class OptionsFlow:
        pass

    modules["homeassistant.config_entries"].ConfigEntry = MagicMock
    modules["homeassistant.config_entries"].ConfigFlow = ConfigFlow
    modules["homeassistant.config_entries"].ConfigFlowResult = dict
    modules["homeassistant.config_entries"].OptionsFlow = OptionsFlow

    modules["homeassistant.const"].Platform = MagicMock
    modules["homeassistant.const"].PERCENTAGE = "%"
    modules["homeassistant.const"].EntityCategory = MagicMock
    modules["homeassistant.const"].UnitOfTime = MagicMock(DAYS="d")
    modules["homeassistant.const"].ATTR_NAME = "name"

    modules["homeassistant.components.logbook"].LOGBOOK_ENTRY_MESSAGE = "message"
    modules["homeassistant.components.logbook"].LOGBOOK_ENTRY_NAME = "name"

    class HomeAssistantView:
        requires_auth = True

        def json(self, data: Any, status_code: int = 200) -> Any:
            return data

        def json_message(self, message: str, status_code: int = 200) -> Any:
            return {"message": message, "status": status_code}

    modules["homeassistant.components.http"].HomeAssistantView = HomeAssistantView
    modules["homeassistant.components.http"].StaticPathConfig = MagicMock

    class SensorEntity:
        pass

    class SensorStateClass:
        MEASUREMENT = "measurement"

    modules["homeassistant.components.sensor"].SensorEntity = SensorEntity
    modules["homeassistant.components.sensor"].SensorStateClass = SensorStateClass
    modules["homeassistant.components.sensor"].SensorDeviceClass = MagicMock

    class CalendarEntity:
        pass

    class CalendarEvent:
        def __init__(self, **kwargs: Any) -> None:
            for k, v in kwargs.items():
                setattr(self, k, v)

    modules["homeassistant.components.calendar"].CalendarEntity = CalendarEntity
    modules["homeassistant.components.calendar"].CalendarEvent = CalendarEvent

    for name, mod in modules.items():
        sys.modules.setdefault(name, mod)


_ensure_homeassistant_stubs()
