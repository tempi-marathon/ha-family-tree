"""HTTP endpoints for GEDCOM import/export."""

from __future__ import annotations

import logging
from http import HTTPStatus

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, MAX_IMPORT_BYTES
from .gedcom_export import export_gedcom
from .gedcom_import import GedcomImporter
from .helpers import get_coordinator

_LOGGER = logging.getLogger(__name__)

_HTTP_KEY = f"{DOMAIN}_http_registered"


class FamilyTreeImportGedcomView(HomeAssistantView):
    """POST /api/family_tree/import_gedcom — admin only."""

    url = f"/api/{DOMAIN}/import_gedcom"
    name = f"api:{DOMAIN}:import_gedcom"
    requires_auth = True

    async def post(self, request: web.Request) -> web.Response:
        """Import a GEDCOM file (multipart or raw body)."""
        hass: HomeAssistant = request.app["hass"]
        user = request["hass_user"]
        if user is None or not user.is_admin:
            return self.json_message("Unauthorized", HTTPStatus.UNAUTHORIZED)

        try:
            coordinator = get_coordinator(hass)
        except Exception as err:  # noqa: BLE001
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)

        replace = request.query.get("replace", "0") in ("1", "true", "yes")
        content_type = (request.content_type or "").lower()

        try:
            if "multipart/" in content_type:
                reader = await request.multipart()
                text: str | None = None
                while True:
                    part = await reader.next()
                    if part is None:
                        break
                    data = await part.read(decode=False)
                    if len(data) > MAX_IMPORT_BYTES:
                        return self.json_message(
                            f"File exceeds {MAX_IMPORT_BYTES} bytes",
                            HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
                        )
                    text = data.decode("utf-8", errors="replace")
                if text is None:
                    return self.json_message("No file uploaded", HTTPStatus.BAD_REQUEST)
            else:
                body = await request.read()
                if len(body) > MAX_IMPORT_BYTES:
                    return self.json_message(
                        f"Body exceeds {MAX_IMPORT_BYTES} bytes",
                        HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
                    )
                text = body.decode("utf-8", errors="replace")
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Failed to read GEDCOM upload")
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)

        def _import() -> dict:
            importer = GedcomImporter(coordinator.repo)
            report = importer.import_text(text, replace=replace)
            return report.to_dict()

        try:
            report = await hass.async_add_executor_job(_import)
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("GEDCOM import failed")
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)

        return self.json({"ok": True, "report": report})


class FamilyTreeExportGedcomView(HomeAssistantView):
    """GET /api/family_tree/export_gedcom — authenticated."""

    url = f"/api/{DOMAIN}/export_gedcom"
    name = f"api:{DOMAIN}:export_gedcom"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Export the tree as a GEDCOM download."""
        hass: HomeAssistant = request.app["hass"]
        try:
            coordinator = get_coordinator(hass)
        except Exception as err:  # noqa: BLE001
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)

        text = await hass.async_add_executor_job(export_gedcom, coordinator.repo.db)
        return web.Response(
            body=text.encode("utf-8"),
            content_type="text/plain",
            headers={
                "Content-Disposition": 'attachment; filename="family_tree.ged"',
            },
        )


@callback
def async_register_http(hass: HomeAssistant) -> None:
    """Register HTTP views once."""
    if hass.data.get(_HTTP_KEY):
        return
    hass.http.register_view(FamilyTreeImportGedcomView())
    hass.http.register_view(FamilyTreeExportGedcomView())
    hass.data[_HTTP_KEY] = True
