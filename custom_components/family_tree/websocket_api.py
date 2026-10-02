"""Websocket API for Family Tree."""

from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import Unauthorized

from .const import (
    ATTR_CONFIG_ENTRY_ID,
    CONF_FAMILY_SHORTCUTS,
    CONF_GAZETTEER_COUNTRIES,
    CONF_NAME,
    DOMAIN,
    MAX_NAME,
    MAX_NOTES,
    MAX_PERSONS,
    MAX_PLACES,
    MAX_SEARCH,
    MAX_SOURCES,
)
from .coordinator import FamilyTreeCoordinator
from .dates import parse_gedcom_date
from .helpers import get_coordinator, profile_name
from .lineage import ancestors, descendants, lineage_relation
from .models import (
    Event,
    EventType,
    ParentChild,
    ParentChildType,
    Person,
    Place,
    Sex,
    SubjectType,
    Union,
    UnionStatus,
    UnionType,
)
from .names import display_name, matches_family_shortcut
from .relatives import enrich_event_dict, tree_for, union_events_for_person
from .stats import compute_stats

_LOGGER = logging.getLogger(__name__)

_OPTIONAL_ENTRY = {vol.Optional(ATTR_CONFIG_ENTRY_ID): str}


def _coordinator(hass: HomeAssistant, msg: dict[str, Any]) -> FamilyTreeCoordinator:
    return get_coordinator(
        hass, config_entry_id=msg.get(ATTR_CONFIG_ENTRY_ID) or None
    )


def _require_admin(connection: websocket_api.ActiveConnection) -> None:
    if not connection.user or not connection.user.is_admin:
        raise Unauthorized()


def _bounded_string(max_length: int, *, allow_empty: bool = True):
    def validator(value: Any) -> str:
        text = str(value) if value is not None else ""
        if len(text) > max_length:
            raise vol.Invalid(f"must be at most {max_length} characters")
        if not allow_empty and not text.strip():
            raise vol.Invalid("must not be empty")
        return text

    return validator


def _cap(limit: int | None, default: int, hard: int) -> int:
    value = default if limit is None else int(limit)
    return max(1, min(value, hard))


# --- Reads -----------------------------------------------------------------


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/revision", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_revision(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    revision = await hass.async_add_executor_job(coordinator.repo.get_revision)
    connection.send_result(msg["id"], {"revision": revision})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/subscribe", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_subscribe(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Subscribe to revision changes; push ``{revision}``."""
    coordinator = _coordinator(hass, msg)
    subscription_id = msg["id"]

    @callback
    def _push() -> None:
        revision = (
            coordinator.data.revision
            if coordinator.data is not None
            else coordinator.repo.get_revision()
        )
        connection.send_message(
            websocket_api.event_message(subscription_id, {"revision": revision})
        )

    connection.send_result(subscription_id)
    _push()

    unsub_coord = coordinator.async_add_listener(_push)

    def _on_repo() -> None:
        hass.loop.call_soon_threadsafe(_push)

    unsub_repo = coordinator.repo.add_listener(_on_repo)

    def _unsubscribe() -> None:
        unsub_coord()
        unsub_repo()

    connection.subscriptions[subscription_id] = _unsubscribe


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/list",
        vol.Optional("search", default=""): _bounded_string(MAX_SEARCH),
        vol.Optional("sex"): vol.In([s.value for s in Sex]),
        vol.Optional("living"): bool,
        vol.Optional("trashed", default=False): bool,
        vol.Optional("limit", default=MAX_PERSONS): vol.All(
            int, vol.Range(min=1, max=MAX_PERSONS)
        ),
        vol.Optional("offset", default=0): vol.All(int, vol.Range(min=0)),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    limit = _cap(msg.get("limit"), MAX_PERSONS, MAX_PERSONS)

    def _run() -> dict[str, Any]:
        persons, total = coordinator.repo.list_persons(
            search=msg.get("search") or "",
            sex=msg.get("sex"),
            living=msg.get("living"),
            trashed=bool(msg.get("trashed")),
            limit=limit,
            offset=int(msg.get("offset") or 0),
        )
        life_by_id = coordinator.repo.life_events_for_persons([p.id for p in persons])
        return {
            "persons": [
                {
                    **p.to_dict(),
                    "display_name": display_name(p),
                    "life_events": life_by_id.get(p.id, []),
                }
                for p in persons
            ],
            "total": total,
        }

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/get",
        vol.Required("person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any] | None:
        person = coordinator.repo.get_person(
            msg["person_id"], include_deleted=True
        )
        if person is None:
            return None
        events = []
        for e in coordinator.repo.list_events(SubjectType.PERSON, person.id):
            events.append(enrich_event_dict(coordinator.repo, e.to_dict()))
        events.extend(union_events_for_person(coordinator.repo, person.id))
        citations = coordinator.repo.list_citations(SubjectType.PERSON, person.id)
        return {
            "person": {**person.to_dict(), "display_name": display_name(person)},
            "events": events,
            "citations": citations,
            "tree": tree_for(coordinator.repo, person.id),
        }

    result = await hass.async_add_executor_job(_run)
    if result is None:
        connection.send_error(msg["id"], "not_found", "Person not found")
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/tree",
        vol.Required("person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_tree(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any] | None:
        return tree_for(coordinator.repo, msg["person_id"])

    result = await hass.async_add_executor_job(_run)
    if result is None:
        connection.send_error(msg["id"], "not_found", "Person not found")
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/lineage",
        vol.Required("person_id"): str,
        vol.Optional("direction", default="ancestors"): vol.In(
            ["ancestors", "descendants", "both"]
        ),
        vol.Optional("max_generations"): vol.All(int, vol.Range(min=1, max=50)),
        vol.Optional("compare_person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_lineage(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    max_gen = msg.get("max_generations")

    def _run() -> dict[str, Any]:
        payload: dict[str, Any] = {"person_id": msg["person_id"]}
        direction = msg.get("direction") or "ancestors"
        if direction in ("ancestors", "both"):
            payload["ancestors"] = ancestors(
                coordinator.repo.db,
                msg["person_id"],
                max_generations=max_gen,
            )
        if direction in ("descendants", "both"):
            payload["descendants"] = descendants(
                coordinator.repo.db,
                msg["person_id"],
                max_generations=max_gen,
            )
        compare = msg.get("compare_person_id")
        if compare:
            payload["relation"] = lineage_relation(
                coordinator.repo.db, msg["person_id"], compare
            )
        return payload

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/stats", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_stats(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    if coordinator.data is not None:
        connection.send_result(msg["id"], coordinator.data.stats)
        return
    stats = await hass.async_add_executor_job(compute_stats, coordinator.repo.db)
    connection.send_result(msg["id"], stats)


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/families", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_families(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return family shortcut groups (surname prefixes from options)."""
    coordinator = _coordinator(hass, msg)
    shortcuts = coordinator.family_shortcuts

    def _run() -> dict[str, Any]:
        persons, _ = coordinator.repo.list_persons(limit=MAX_PERSONS, offset=0)
        groups: list[dict[str, Any]] = []
        for shortcut in shortcuts:
            matched = [
                {**p.to_dict(), "display_name": display_name(p)}
                for p in persons
                if matches_family_shortcut(p, shortcut)
            ]
            groups.append({"shortcut": shortcut, "persons": matched[:100], "total": len(matched)})
        return {"families": groups}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/unions/get",
        vol.Required("union_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_unions_get(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any] | None:
        union = coordinator.repo.get_union(msg["union_id"])
        if union is None:
            return None
        partners = []
        for up in coordinator.repo.list_union_partners(union.id):
            person = coordinator.repo.get_person(up.person_id)
            partners.append(
                {
                    "person_id": up.person_id,
                    "position": up.position,
                    "name": display_name(person) if person else None,
                    "person": person.to_dict() if person else None,
                }
            )
        events = [
            enrich_event_dict(coordinator.repo, e.to_dict())
            for e in coordinator.repo.list_events(SubjectType.UNION, union.id)
        ]
        return {"union": union.to_dict(), "partners": partners, "events": events}

    result = await hass.async_add_executor_job(_run)
    if result is None:
        connection.send_error(msg["id"], "not_found", "Union not found")
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/places/list",
        vol.Optional("search", default=""): _bounded_string(MAX_SEARCH),
        vol.Optional("limit", default=50): vol.All(int, vol.Range(min=1, max=200)),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_places_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    limit = _cap(msg.get("limit"), 50, min(200, MAX_PLACES))

    def _run() -> dict[str, Any]:
        places = coordinator.repo.list_places(
            search=msg.get("search") or "", limit=limit
        )
        return {"places": [p.to_dict() for p in places]}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/sources/list",
        vol.Optional("search", default=""): _bounded_string(MAX_SEARCH),
        vol.Optional("limit", default=50): vol.All(int, vol.Range(min=1, max=200)),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_sources_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    limit = _cap(msg.get("limit"), 50, min(200, MAX_SOURCES))

    def _run() -> dict[str, Any]:
        sources = coordinator.repo.list_sources(
            search=msg.get("search") or "", limit=limit
        )
        return {"sources": [s.to_dict() for s in sources]}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/user_links/list", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_user_links_list(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any]:
        links = []
        for link in coordinator.repo.list_user_links():
            person = coordinator.repo.get_person(link.person_id)
            links.append(
                {
                    **link.to_dict(),
                    "person_name": display_name(person) if person else None,
                }
            )
        return {"links": links}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/gazetteer/search",
        vol.Required("query"): _bounded_string(MAX_SEARCH, allow_empty=False),
        vol.Optional("country"): str,
        vol.Optional("limit", default=20): vol.All(int, vol.Range(min=1, max=50)),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_gazetteer_search(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any]:
        results = coordinator.gazetteer.search(
            msg["query"],
            country=msg.get("country"),
            limit=int(msg.get("limit") or 20),
        )
        return {"results": results}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/gazetteer/status", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_gazetteer_status(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    status = await hass.async_add_executor_job(coordinator.gazetteer.status)
    status["configured_countries"] = coordinator.gazetteer_countries
    connection.send_result(msg["id"], status)


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/settings", **_OPTIONAL_ENTRY}
)
@websocket_api.async_response
async def ws_settings(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    coordinator = _coordinator(hass, msg)
    entry = coordinator.entry
    connection.send_result(
        msg["id"],
        {
            "name": profile_name(entry),
            CONF_NAME: entry.data.get(CONF_NAME),
            CONF_GAZETTEER_COUNTRIES: coordinator.gazetteer_countries,
            CONF_FAMILY_SHORTCUTS: coordinator.family_shortcuts,
            "can_write": bool(connection.user and connection.user.is_admin),
            "upcoming_birthdays": (
                coordinator.data.upcoming_birthdays if coordinator.data else []
            ),
            "upcoming_anniversaries": (
                coordinator.data.upcoming_anniversaries if coordinator.data else []
            ),
        },
    )


# --- Mutations -------------------------------------------------------------


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/save",
        # Never use key "id" here — it collides with the websocket message id (int).
        vol.Optional("person_id"): str,
        vol.Required("given_names"): _bounded_string(MAX_NAME, allow_empty=False),
        vol.Optional("call_name", default=""): _bounded_string(MAX_NAME),
        vol.Optional("surname_prefix", default=""): _bounded_string(MAX_NAME),
        vol.Optional("surname", default=""): _bounded_string(MAX_NAME),
        vol.Optional("sex", default=Sex.UNKNOWN.value): vol.In(
            [s.value for s in Sex]
        ),
        vol.Optional("is_living", default=True): bool,
        vol.Optional("notes", default=""): _bounded_string(MAX_NOTES),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return

    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any]:
        given_names = (msg.get("given_names") or "").strip()
        person_id = msg.get("person_id")
        if person_id:
            existing = coordinator.repo.get_person(person_id, include_deleted=True)
            if existing is None:
                raise LookupError("Person not found")
            person = Person(
                id=existing.id,
                given_names=given_names,
                call_name=msg.get("call_name") or "",
                surname_prefix=msg.get("surname_prefix") or "",
                surname=msg.get("surname") or "",
                sex=Sex(msg.get("sex") or Sex.UNKNOWN.value),
                is_living=bool(msg.get("is_living", True)),
                notes=msg.get("notes") or "",
                created_at=existing.created_at,
                updated_at=existing.updated_at,
                deleted_at=existing.deleted_at,
            )
            saved = coordinator.repo.update_person(person)
        else:
            if coordinator.repo.count_persons() >= MAX_PERSONS:
                raise OverflowError(f"Maximum of {MAX_PERSONS} persons reached")
            person = Person(
                given_names=given_names,
                call_name=msg.get("call_name") or "",
                surname_prefix=msg.get("surname_prefix") or "",
                surname=msg.get("surname") or "",
                sex=Sex(msg.get("sex") or Sex.UNKNOWN.value),
                is_living=bool(msg.get("is_living", True)),
                notes=msg.get("notes") or "",
            )
            saved = coordinator.repo.add_person(person)
        return {**saved.to_dict(), "display_name": display_name(saved)}

    try:
        result = await hass.async_add_executor_job(_run)
    except LookupError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    except OverflowError as err:
        connection.send_error(msg["id"], "limit_exceeded", str(err))
        return
    connection.send_result(msg["id"], {"person": result})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/delete",
        vol.Required("person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.soft_delete_person, msg["person_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Person not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/restore",
        vol.Required("person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_restore(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.restore_person, msg["person_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Person not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/persons/purge",
        vol.Required("person_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_persons_purge(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.force_delete_person, msg["person_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Person not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/unions/save",
        vol.Optional("union_id"): str,
        vol.Optional("union_type", default=UnionType.UNKNOWN.value): vol.In(
            [t.value for t in UnionType]
        ),
        vol.Optional("status", default=UnionStatus.ONGOING.value): vol.In(
            [s.value for s in UnionStatus]
        ),
        vol.Optional("known_children_count"): vol.Any(None, int),
        vol.Optional("notes", default=""): _bounded_string(MAX_NOTES),
        vol.Required("partner_ids"): vol.All([str], vol.Length(min=1, max=10)),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_unions_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    partners = [(pid, idx) for idx, pid in enumerate(msg["partner_ids"])]

    def _run() -> dict[str, Any]:
        union_id = msg.get("union_id")
        if union_id:
            existing = coordinator.repo.get_union(union_id)
            if existing is None:
                raise LookupError("Union not found")
            union = Union(
                id=existing.id,
                type=UnionType(msg.get("union_type") or UnionType.UNKNOWN.value),
                status=UnionStatus(msg.get("status") or UnionStatus.ONGOING.value),
                known_children_count=msg.get("known_children_count"),
                notes=msg.get("notes") or "",
                created_at=existing.created_at,
                updated_at=existing.updated_at,
            )
            saved = coordinator.repo.update_union(union, partners)
        else:
            union = Union(
                type=UnionType(msg.get("union_type") or UnionType.UNKNOWN.value),
                status=UnionStatus(msg.get("status") or UnionStatus.ONGOING.value),
                known_children_count=msg.get("known_children_count"),
                notes=msg.get("notes") or "",
            )
            saved = coordinator.repo.add_union(union, partners)
        return saved.to_dict()

    try:
        result = await hass.async_add_executor_job(_run)
    except LookupError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    connection.send_result(msg["id"], {"union": result})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/unions/delete",
        vol.Required("union_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_unions_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.soft_delete_union, msg["union_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Union not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/parent_child/add",
        vol.Required("parent_id"): str,
        vol.Required("child_id"): str,
        vol.Optional("link_type", default=ParentChildType.BIOLOGICAL.value): vol.In(
            [t.value for t in ParentChildType]
        ),
        vol.Optional("union_id"): vol.Any(None, str),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_parent_child_add(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    link = ParentChild(
        parent_id=msg["parent_id"],
        child_id=msg["child_id"],
        type=ParentChildType(msg.get("link_type") or ParentChildType.BIOLOGICAL.value),
        union_id=msg.get("union_id"),
    )

    def _run() -> dict[str, Any]:
        return coordinator.repo.add_parent_child(link).to_dict()

    try:
        result = await hass.async_add_executor_job(_run)
    except Exception as err:  # noqa: BLE001
        connection.send_error(msg["id"], "error", str(err))
        return
    connection.send_result(msg["id"], {"link": result})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/parent_child/remove",
        vol.Required("link_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_parent_child_remove(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.remove_parent_child, msg["link_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Link not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/places/save",
        vol.Optional("place_id"): str,
        vol.Required("name"): _bounded_string(MAX_NAME, allow_empty=False),
        vol.Optional("admin1", default=""): _bounded_string(MAX_NAME),
        vol.Optional("country", default=""): _bounded_string(MAX_NAME),
        vol.Optional("country_code", default=""): _bounded_string(8),
        vol.Optional("latitude"): vol.Any(None, float, int),
        vol.Optional("longitude"): vol.Any(None, float, int),
        vol.Optional("geonames_id"): vol.Any(None, int),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_places_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)

    def _run() -> dict[str, Any]:
        place_id = msg.get("place_id")
        lat = msg.get("latitude")
        lon = msg.get("longitude")
        if place_id:
            existing = coordinator.repo.get_place(place_id)
            if existing is None:
                raise LookupError("Place not found")
            place = Place(
                id=existing.id,
                name=msg["name"],
                admin1=msg.get("admin1") or "",
                country=msg.get("country") or "",
                country_code=(msg.get("country_code") or "").upper(),
                latitude=float(lat) if lat is not None else None,
                longitude=float(lon) if lon is not None else None,
                geonames_id=msg.get("geonames_id"),
                created_at=existing.created_at,
            )
            saved = coordinator.repo.update_place(place)
        else:
            place = Place(
                name=msg["name"],
                admin1=msg.get("admin1") or "",
                country=msg.get("country") or "",
                country_code=(msg.get("country_code") or "").upper(),
                latitude=float(lat) if lat is not None else None,
                longitude=float(lon) if lon is not None else None,
                geonames_id=msg.get("geonames_id"),
            )
            saved = coordinator.repo.add_place(place)
        return saved.to_dict()

    try:
        result = await hass.async_add_executor_job(_run)
    except LookupError as err:
        connection.send_error(msg["id"], "not_found", str(err))
        return
    connection.send_result(msg["id"], {"place": result})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/events/save",
        vol.Optional("event_id"): str,
        vol.Required("subject_type"): vol.In([s.value for s in SubjectType]),
        vol.Required("subject_id"): str,
        vol.Required("event_type"): vol.In([t.value for t in EventType]),
        vol.Optional("place_id"): vol.Any(None, str),
        vol.Optional("place", default=""): _bounded_string(MAX_NAME),
        vol.Optional("date_text", default=""): _bounded_string(100),
        vol.Optional("description", default=""): _bounded_string(MAX_NOTES),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_events_save(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    date_text = msg.get("date_text") or ""
    parsed = parse_gedcom_date(date_text)

    def _run() -> dict[str, Any]:
        place_id = msg.get("place_id")
        place_name = (msg.get("place") or "").strip()
        if not place_id and place_name:
            found = coordinator.repo.find_place(place_name)
            place_id = (
                found.id
                if found
                else coordinator.repo.add_place(Place(name=place_name)).id
            )
        event_id = msg.get("event_id")
        if event_id:
            event = Event(
                id=event_id,
                subject_type=SubjectType(msg["subject_type"]),
                subject_id=msg["subject_id"],
                type=EventType(msg["event_type"]),
                place_id=place_id,
                date_text=date_text,
                date_qualifier=parsed.qualifier,
                date_from=parsed.date_from,
                date_to=parsed.date_to,
                sort_date=parsed.sort_date,
                description=msg.get("description") or "",
            )
            saved = coordinator.repo.update_event(event)
        else:
            event = Event(
                subject_type=SubjectType(msg["subject_type"]),
                subject_id=msg["subject_id"],
                type=EventType(msg["event_type"]),
                place_id=place_id,
                date_text=date_text,
                date_qualifier=parsed.qualifier,
                date_from=parsed.date_from,
                date_to=parsed.date_to,
                sort_date=parsed.sort_date,
                description=msg.get("description") or "",
            )
            saved = coordinator.repo.add_event(event)
        return enrich_event_dict(coordinator.repo, saved.to_dict())

    connection.send_result(
        msg["id"], {"event": await hass.async_add_executor_job(_run)}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/events/delete",
        vol.Required("event_id"): str,
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_events_delete(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    ok = await hass.async_add_executor_job(
        coordinator.repo.delete_event, msg["event_id"]
    )
    if not ok:
        connection.send_error(msg["id"], "not_found", "Event not found")
        return
    connection.send_result(msg["id"], {"ok": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/user_links/set",
        vol.Required("ha_user_id"): str,
        vol.Optional("person_id"): vol.Any(None, str),
        **_OPTIONAL_ENTRY,
    }
)
@websocket_api.async_response
async def ws_user_links_set(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    try:
        _require_admin(connection)
    except Unauthorized:
        connection.send_error(msg["id"], "unauthorized", "Unauthorized")
        return
    coordinator = _coordinator(hass, msg)
    person_id = msg.get("person_id")

    def _run() -> dict[str, Any]:
        if not person_id:

            def _clear() -> None:
                coordinator.repo.db.execute(
                    "DELETE FROM user_links WHERE ha_user_id = ?",
                    (msg["ha_user_id"],),
                )

            coordinator.repo.import_batch(_clear)
            return {"ok": True, "cleared": True}
        link = coordinator.repo.set_user_link(msg["ha_user_id"], person_id)
        return {"link": link.to_dict()}

    connection.send_result(msg["id"], await hass.async_add_executor_job(_run))


@callback
def async_register_websocket(hass: HomeAssistant) -> None:
    """Register websocket commands once."""
    key = f"{DOMAIN}_ws_registered"
    if hass.data.get(key):
        return
    for handler in (
        ws_revision,
        ws_subscribe,
        ws_persons_list,
        ws_persons_get,
        ws_persons_save,
        ws_persons_delete,
        ws_persons_restore,
        ws_persons_purge,
        ws_tree,
        ws_lineage,
        ws_stats,
        ws_families,
        ws_unions_get,
        ws_unions_save,
        ws_unions_delete,
        ws_parent_child_add,
        ws_parent_child_remove,
        ws_places_list,
        ws_places_save,
        ws_sources_list,
        ws_events_save,
        ws_events_delete,
        ws_user_links_list,
        ws_user_links_set,
        ws_gazetteer_search,
        ws_gazetteer_status,
        ws_settings,
    ):
        websocket_api.async_register_command(hass, handler)
    hass.data[key] = True
