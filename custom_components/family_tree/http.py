"""HTTP endpoints for GEDCOM import/export and person media."""

from __future__ import annotations

import json
import logging
from http import HTTPStatus

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN, MAX_IMPORT_BYTES, MAX_PHOTO_BYTES
from .gedcom_export import export_gedcom
from .gedcom_import import GedcomImporter, preview_gedcom
from .helpers import get_coordinator, media_dir
from .media_files import read_media_file
from .media_service import upload_person_media
from .validation import normalize_entity_id

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
        except Exception:  # noqa: BLE001
            _LOGGER.exception("GEDCOM import coordinator lookup failed")
            return self.json_message("Family Tree is not available", HTTPStatus.BAD_REQUEST)

        replace = request.query.get("replace", "0") in ("1", "true", "yes")
        preview = request.query.get("preview", "0") in ("1", "true", "yes")
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
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to read GEDCOM upload")
            return self.json_message("Failed to read upload", HTTPStatus.BAD_REQUEST)

        if preview:

            def _preview() -> dict:
                return preview_gedcom(text).to_dict()

            try:
                report = await hass.async_add_executor_job(_preview)
            except Exception:  # noqa: BLE001
                _LOGGER.exception("GEDCOM preview failed")
                return self.json_message("GEDCOM preview failed", HTTPStatus.BAD_REQUEST)
            return self.json({"ok": True, "preview": True, "report": report})

        def _import() -> dict:
            importer = GedcomImporter(coordinator.repo, media_dir(hass))
            report = importer.import_text(text, replace=replace)
            return report.to_dict()

        try:
            report = await hass.async_add_executor_job(_import)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("GEDCOM import failed")
            return self.json_message("GEDCOM import failed", HTTPStatus.BAD_REQUEST)

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
        except Exception:  # noqa: BLE001
            _LOGGER.exception("GEDCOM export coordinator lookup failed")
            return self.json_message("Family Tree is not available", HTTPStatus.BAD_REQUEST)

        text = await hass.async_add_executor_job(export_gedcom, coordinator.repo.db)
        return web.Response(
            body=text.encode("utf-8"),
            content_type="text/plain",
            headers={
                "Content-Disposition": 'attachment; filename="family_tree.ged"',
            },
        )


class FamilyTreeMediaView(HomeAssistantView):
    """GET /api/family_tree/media/{media_id} — authenticated."""

    url = f"/api/{DOMAIN}/media/{{media_id}}"
    name = f"api:{DOMAIN}:media"
    requires_auth = True

    async def get(self, request: web.Request, media_id: str) -> web.StreamResponse:
        """Serve full or thumbnail image bytes."""
        hass: HomeAssistant = request.app["hass"]
        if not normalize_entity_id(media_id):
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)

        variant = (request.query.get("variant") or "thumb").lower()
        thumb = variant != "full"
        content_type = "image/webp" if thumb else None

        try:
            coordinator = get_coordinator(hass)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Media coordinator lookup failed")
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)

        root = media_dir(hass)

        def _read() -> tuple[bytes, str] | None:
            media = coordinator.repo.get_visible_person_media(media_id)
            if media is None:
                return None
            ct = content_type or media.content_type
            data = read_media_file(
                root,
                media.person_id,
                media.id,
                media.content_type,
                thumb=thumb,
            )
            if data is None:
                return None
            return data, ct

        try:
            payload = await hass.async_add_executor_job(_read)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to read media %s", media_id)
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)

        if payload is None:
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)

        body, ct = payload
        etag = f'"{media_id}-{variant}"'
        if request.headers.get("If-None-Match") == etag:
            return web.Response(status=304)

        return web.Response(
            body=body,
            content_type=ct,
            headers={
                "Cache-Control": "private",
                "ETag": etag,
                "X-Content-Type-Options": "nosniff",
                "Content-Disposition": "inline",
            },
        )


class FamilyTreePersonMediaUploadView(HomeAssistantView):
    """POST /api/family_tree/persons/{person_id}/media — admin only."""

    url = f"/api/{DOMAIN}/persons/{{person_id}}/media"
    name = f"api:{DOMAIN}:person_media_upload"
    requires_auth = True

    async def post(self, request: web.Request, person_id: str) -> web.Response:
        """Upload a photo for a person (multipart)."""
        hass: HomeAssistant = request.app["hass"]
        user = request["hass_user"]
        if user is None or not user.is_admin:
            return self.json_message("Unauthorized", HTTPStatus.UNAUTHORIZED)

        if not normalize_entity_id(person_id):
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)

        try:
            coordinator = get_coordinator(hass)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Media upload coordinator lookup failed")
            return self.json_message("Family Tree is not available", HTTPStatus.BAD_REQUEST)

        content_type = (request.content_type or "").lower()
        filename = ""
        data: bytes | None = None

        try:
            if "multipart/" in content_type:
                reader = await request.multipart()
                while True:
                    part = await reader.next()
                    if part is None:
                        break
                    chunk = await part.read(decode=False)
                    if not chunk:
                        continue
                    if len(chunk) > MAX_PHOTO_BYTES:
                        return self.json_message(
                            "File too large",
                            HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
                        )
                    part_name = part.filename or ""
                    if part_name or data is None:
                        data = chunk
                        if part_name:
                            filename = part_name
            else:
                body = await request.read()
                if len(body) > MAX_PHOTO_BYTES:
                    return self.json_message(
                        "File too large",
                        HTTPStatus.REQUEST_ENTITY_TOO_LARGE,
                    )
                data = body
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Failed to read media upload")
            return self.json_message("Upload failed", HTTPStatus.BAD_REQUEST)

        if not data:
            return self.json_message("No file uploaded", HTTPStatus.BAD_REQUEST)

        root = media_dir(hass)
        set_profile = request.query.get("set_profile", "").lower() in ("1", "true", "yes")
        source_media_id = (request.query.get("source_media_id") or "").strip() or None
        crop_json_raw = (request.query.get("crop_json") or "").strip() or None
        crop_json: str | None = None
        if crop_json_raw:
            try:
                parsed = json.loads(crop_json_raw)
                if not isinstance(parsed, dict):
                    return self.json_message("Invalid crop", HTTPStatus.BAD_REQUEST)
                scale = float(parsed.get("scale", 1))
                offset_x = float(parsed.get("offsetX", 0))
                offset_y = float(parsed.get("offsetY", 0))
                if scale < 1 or scale > 3:
                    return self.json_message("Invalid crop scale", HTTPStatus.BAD_REQUEST)
                crop_json = json.dumps(
                    {"scale": scale, "offsetX": offset_x, "offsetY": offset_y}
                )
            except (TypeError, ValueError, json.JSONDecodeError):
                return self.json_message("Invalid crop", HTTPStatus.BAD_REQUEST)

        def _upload() -> dict:
            media = upload_person_media(
                coordinator.repo,
                root,
                person_id,
                data,
                original_filename=filename,
                set_profile_if_empty=False,
            )
            if set_profile:
                coordinator.repo.set_profile_media(
                    person_id,
                    media.id,
                    source_media_id=source_media_id,
                    crop_json=crop_json,
                )
            return {"media": media.to_dict()}

        try:
            result = await hass.async_add_executor_job(_upload)
        except LookupError:
            return self.json_message("Not found", HTTPStatus.NOT_FOUND)
        except OverflowError as err:
            return self.json_message(str(err), HTTPStatus.BAD_REQUEST)
        except ValueError as err:
            return self.json_message(str(err) or "Invalid image", HTTPStatus.BAD_REQUEST)
        except Exception:  # noqa: BLE001
            _LOGGER.exception("Media upload failed for person %s", person_id)
            return self.json_message("Upload failed", HTTPStatus.BAD_REQUEST)

        return self.json({"ok": True, **result})


@callback
def async_register_http(hass: HomeAssistant) -> None:
    """Register HTTP views once."""
    if hass.data.get(_HTTP_KEY):
        return
    hass.http.register_view(FamilyTreeImportGedcomView())
    hass.http.register_view(FamilyTreeExportGedcomView())
    hass.http.register_view(FamilyTreeMediaView())
    hass.http.register_view(FamilyTreePersonMediaUploadView())
    hass.data[_HTTP_KEY] = True
