"""Websocket handler tests (HA decorators are stubbed to identity in conftest)."""

from __future__ import annotations

import asyncio
from pathlib import Path
from types import SimpleNamespace
from typing import Any

import pytest

from custom_components.family_tree import websocket_api as ws
from custom_components.family_tree.db import Database
from custom_components.family_tree.models import (
    Event,
    EventType,
    ParentChild,
    Person,
    Sex,
    SubjectType,
    Union,
    UnionStatus,
    UnionType,
)
from custom_components.family_tree.repository import Repository


class _FakeHass:
    async def async_add_executor_job(self, fn: Any, *args: Any) -> Any:
        return fn(*args)


class _FakeConnection:
    def __init__(self, user_id: str | None, *, is_admin: bool = False) -> None:
        self.user = SimpleNamespace(id=user_id, is_admin=is_admin) if user_id else None
        self.results: list[Any] = []
        self.errors: list[tuple[str, str]] = []

    def send_result(self, _msg_id: int, result: Any = None) -> None:
        self.results.append(result)

    def send_error(self, _msg_id: int, code: str, message: str) -> None:
        self.errors.append((code, message))


@pytest.fixture
def repo(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Repository:
    db = Database(tmp_path / "tree.db")
    db.open()
    repository = Repository(db)
    monkeypatch.setattr(ws, "_coordinator", lambda _hass, _msg: SimpleNamespace(repo=repository))
    yield repository
    db.close()


def _call(handler: Any, conn: _FakeConnection, msg: dict[str, Any]) -> None:
    asyncio.run(handler(_FakeHass(), conn, {"id": 1, **msg}))


def test_lineage_mine_unlinked_user(repo: Repository) -> None:
    conn = _FakeConnection("user-1")
    _call(ws.ws_lineage_mine, conn, {"type": "family_tree/lineage/mine"})
    assert conn.results == [{"person_id": None, "person_name": None, "relatives": {}}]


def test_lineage_mine_returns_ancestors_and_descendants(repo: Repository) -> None:
    grandpa = repo.add_person(Person(given_names="Marinus", sex=Sex.MALE))
    dad = repo.add_person(Person(given_names="Ad", sex=Sex.MALE))
    me = repo.add_person(Person(given_names="Maarten", sex=Sex.MALE))
    kid = repo.add_person(Person(given_names="Kid"))
    stranger = repo.add_person(Person(given_names="Other"))
    repo.add_parent_child(ParentChild(parent_id=grandpa.id, child_id=dad.id))
    repo.add_parent_child(ParentChild(parent_id=dad.id, child_id=me.id))
    repo.add_parent_child(ParentChild(parent_id=me.id, child_id=kid.id))
    repo.set_user_link("user-1", me.id)

    conn = _FakeConnection("user-1")
    _call(ws.ws_lineage_mine, conn, {"type": "family_tree/lineage/mine"})
    result = conn.results[0]
    assert result["person_id"] == me.id
    relatives = result["relatives"]
    assert relatives[dad.id] == {"type": "ancestor", "generation": 1}
    assert relatives[grandpa.id] == {"type": "ancestor", "generation": 2}
    assert relatives[kid.id] == {"type": "descendant", "generation": 1}
    assert stranger.id not in relatives


def test_claim_links_existing_person_and_unlinks(repo: Repository) -> None:
    me = repo.add_person(Person(given_names="Maarten"))
    conn = _FakeConnection("user-1")
    _call(ws.ws_user_links_claim, conn, {"type": "x", "person_id": me.id})
    assert conn.results[-1]["person_id"] == me.id
    assert repo.get_user_link("user-1").person_id == me.id

    _call(ws.ws_user_links_claim, conn, {"type": "x", "person_id": None})
    assert conn.results[-1] == {"person_id": None, "person_name": None}
    assert repo.get_user_link("user-1") is None


def test_claim_create_person_with_birth(repo: Repository) -> None:
    conn = _FakeConnection("user-2")
    _call(
        ws.ws_user_links_claim,
        conn,
        {
            "type": "x",
            "create": {
                "given_names": "Maarten",
                "surname_prefix": "",
                "surname": "Molenschot",
                "sex": "male",
                "birth_date_text": "26 NOV 1982",
            },
        },
    )
    assert not conn.errors
    person_id = conn.results[-1]["person_id"]
    assert repo.get_user_link("user-2").person_id == person_id
    events = repo.list_events(SubjectType.PERSON, person_id)
    assert [e.type for e in events] == [EventType.BIRTH]
    assert events[0].sort_date == "1982-11-26"


def test_claim_rejects_person_linked_to_other_user(repo: Repository) -> None:
    me = repo.add_person(Person(given_names="Maarten"))
    repo.set_user_link("someone-else", me.id)
    conn = _FakeConnection("user-1")
    _call(ws.ws_user_links_claim, conn, {"type": "x", "person_id": me.id})
    assert conn.errors and conn.errors[0][0] == "already_linked"

    admin = _FakeConnection("admin", is_admin=True)
    _call(ws.ws_user_links_claim, admin, {"type": "x", "person_id": me.id})
    assert not admin.errors


def test_claim_requires_user(repo: Repository) -> None:
    conn = _FakeConnection(None)
    _call(ws.ws_user_links_claim, conn, {"type": "x", "person_id": "abc"})
    assert conn.errors[0][0] == "unauthorized"


def test_persons_save_requires_admin(repo: Repository) -> None:
    conn = _FakeConnection("user-1", is_admin=False)
    _call(
        ws.ws_persons_save,
        conn,
        {
            "type": "family_tree/persons/save",
            "given_names": "Ada",
        },
    )
    assert conn.errors == [("unauthorized", "Unauthorized")]
    assert not conn.results


def test_persons_delete_requires_admin(repo: Repository) -> None:
    person = repo.add_person(Person(given_names="Ada"))
    conn = _FakeConnection("user-1", is_admin=False)
    _call(
        ws.ws_persons_delete,
        conn,
        {"type": "family_tree/persons/delete", "person_id": person.id},
    )
    assert conn.errors == [("unauthorized", "Unauthorized")]


def test_events_save_rejects_duplicate_unique_type(repo: Repository) -> None:
    p = repo.add_person(Person(given_names="Ada"))
    existing = repo.add_event(
        Event(subject_type=SubjectType.PERSON, subject_id=p.id, type=EventType.BIRTH)
    )
    admin = _FakeConnection("admin", is_admin=True)
    base = {
        "type": "family_tree/events/save",
        "subject_type": "person",
        "subject_id": p.id,
    }
    _call(ws.ws_events_save, admin, {**base, "event_type": "birth"})
    assert admin.errors and admin.errors[0][0] == "duplicate_event"

    # Editing the existing birth itself is allowed.
    _call(
        ws.ws_events_save,
        admin,
        {**base, "event_type": "birth", "event_id": existing.id, "date_text": "1850"},
    )
    assert len(admin.errors) == 1
    assert admin.results[-1]["event"]["sort_date"] == "1850-01-01"

    # Repeatable types are fine.
    _call(ws.ws_events_save, admin, {**base, "event_type": "residence"})
    _call(ws.ws_events_save, admin, {**base, "event_type": "residence"})
    assert len(admin.errors) == 1


def test_persons_get_includes_vital_summaries(repo: Repository) -> None:
    p = repo.add_person(Person(given_names="Ada", is_living=False))
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=p.id,
            type=EventType.BIRTH,
            date_text="12 JAN 1900",
            sort_date="1900-01-12",
        )
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=p.id,
            type=EventType.DEATH,
            date_text="ABT 1980",
            sort_date="1980-01-01",
        )
    )
    admin = _FakeConnection("admin", is_admin=True)
    _call(
        ws.ws_persons_get,
        admin,
        {"type": "family_tree/persons/get", "person_id": p.id},
    )
    assert not admin.errors
    person = admin.results[-1]["person"]
    assert person["birth"]["sort_date"] == "1900-01-12"
    assert person["death"]["sort_date"] == "1980-01-01"


def test_persons_siblings_returns_shared_parents(repo: Repository) -> None:
    father = repo.add_person(Person(given_names="Father", sex=Sex.MALE))
    mother = repo.add_person(Person(given_names="Mother", sex=Sex.FEMALE))
    child_a = repo.add_person(Person(given_names="Alice"))
    child_b = repo.add_person(Person(given_names="Bob"))
    for child_id in (child_a.id, child_b.id):
        repo.add_parent_child(ParentChild(parent_id=father.id, child_id=child_id))
        repo.add_parent_child(ParentChild(parent_id=mother.id, child_id=child_id))

    conn = _FakeConnection("user-1")
    _call(
        ws.ws_persons_siblings,
        conn,
        {"type": "family_tree/persons/siblings", "person_id": child_a.id},
    )
    assert not conn.errors
    result = conn.results[-1]
    assert result["person_id"] == child_a.id
    assert len(result["siblings"]) == 1
    assert result["siblings"][0]["id"] == child_b.id
    assert result["siblings"][0]["relation"] == "sibling"


def test_ha_users_list_requires_admin(repo: Repository) -> None:
    conn = _FakeConnection("user-1", is_admin=False)
    _call(ws.ws_ha_users_list, conn, {"type": "family_tree/ha_users/list"})
    assert conn.errors == [("unauthorized", "Unauthorized")]


def test_user_links_list_requires_admin(repo: Repository) -> None:
    person = repo.add_person(Person(given_names="Ada"))
    repo.set_user_link("user-1", person.id)
    conn = _FakeConnection("user-1", is_admin=False)
    _call(ws.ws_user_links_list, conn, {"type": "family_tree/user_links/list"})
    assert conn.errors == [("unauthorized", "Unauthorized")]
    assert not conn.results

    admin = _FakeConnection("admin", is_admin=True)
    _call(ws.ws_user_links_list, admin, {"type": "family_tree/user_links/list"})
    assert not admin.errors
    assert len(admin.results[-1]["links"]) == 1


def test_persons_list_trashed_requires_admin(repo: Repository) -> None:
    person = repo.add_person(Person(given_names="Ada"))
    repo.soft_delete_person(person.id)
    conn = _FakeConnection("user-1", is_admin=False)
    _call(
        ws.ws_persons_list,
        conn,
        {"type": "family_tree/persons/list", "trashed": True},
    )
    assert conn.errors == [("unauthorized", "Unauthorized")]

    admin = _FakeConnection("admin", is_admin=True)
    _call(
        ws.ws_persons_list,
        admin,
        {"type": "family_tree/persons/list", "trashed": True},
    )
    assert not admin.errors
    assert admin.results[-1]["total"] == 1


def test_persons_get_hides_deleted_from_non_admin(repo: Repository) -> None:
    person = repo.add_person(Person(given_names="Ada"))
    repo.soft_delete_person(person.id)
    conn = _FakeConnection("user-1", is_admin=False)
    _call(
        ws.ws_persons_get,
        conn,
        {"type": "family_tree/persons/get", "person_id": person.id},
    )
    assert conn.errors and conn.errors[0][0] == "not_found"

    admin = _FakeConnection("admin", is_admin=True)
    _call(
        ws.ws_persons_get,
        admin,
        {"type": "family_tree/persons/get", "person_id": person.id},
    )
    assert not admin.errors
    assert admin.results[-1]["person"]["id"] == person.id


async def _fake_ha_users() -> list[Any]:
    return [SimpleNamespace(id="u1", name="Alice", is_active=True)]


def test_ha_users_list_admin(repo: Repository) -> None:
    hass = _FakeHass()
    hass.auth = SimpleNamespace(async_get_users=_fake_ha_users)

    conn = _FakeConnection("admin", is_admin=True)
    asyncio.run(ws.ws_ha_users_list(hass, conn, {"id": 1, "type": "family_tree/ha_users/list"}))
    assert conn.results == [{"users": [{"id": "u1", "name": "Alice", "is_active": True}]}]


def _divorced_union(repo: Repository) -> tuple[Union, Event]:
    a = repo.add_person(Person(given_names="A"))
    b = repo.add_person(Person(given_names="B"))
    union = repo.add_union(
        Union(type=UnionType.MARRIAGE, status=UnionStatus.DIVORCED), [(a.id, 0), (b.id, 1)]
    )
    divorce = repo.add_event(
        Event(
            subject_type=SubjectType.UNION,
            subject_id=union.id,
            type=EventType.DIVORCE,
            date_text="winter 1998",
        )
    )
    return union, divorce


def test_unions_save_changes_status_with_free_text_divorce_date(repo: Repository) -> None:
    union, divorce = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    partners = [p.person_id for p in repo.list_union_partners(union.id)]
    _call(
        ws.ws_unions_save,
        admin,
        {
            "type": "family_tree/unions/save",
            "union_id": union.id,
            "status": "separated",
            "partner_ids": partners,
        },
    )
    assert not admin.errors
    _call(ws.ws_unions_get, admin, {"type": "family_tree/unions/get", "union_id": union.id})
    result = admin.results[-1]
    assert result["union"]["status"] == "separated"
    assert [(e["id"], e["date_text"]) for e in result["events"]] == [(divorce.id, "winter 1998")]


def test_unions_save_keeps_type_when_omitted(repo: Repository) -> None:
    union, _ = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    partners = [p.person_id for p in repo.list_union_partners(union.id)]
    _call(
        ws.ws_unions_save,
        admin,
        {"type": "family_tree/unions/save", "union_id": union.id, "partner_ids": partners},
    )
    saved = repo.get_union(union.id)
    assert saved is not None and saved.type == UnionType.MARRIAGE


def test_union_end_event_updates_in_place(repo: Repository) -> None:
    union, divorce = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    base = {
        "type": "family_tree/events/save",
        "subject_type": "union",
        "subject_id": union.id,
        "event_type": "divorce",
        "event_id": divorce.id,
    }
    _call(ws.ws_events_save, admin, {**base, "date_text": "ABT 1998"})
    assert admin.results[-1]["event"]["date_qualifier"] == "about"
    _call(ws.ws_events_save, admin, {**base, "date_text": "BET 1997 AND 1999"})
    assert admin.results[-1]["event"]["date_qualifier"] == "between"
    events = repo.list_events(SubjectType.UNION, union.id)
    assert [e.id for e in events] == [divorce.id]


def test_union_marriage_event_not_duplicated_when_saved_by_id(repo: Repository) -> None:
    union, _ = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    base = {
        "type": "family_tree/events/save",
        "subject_type": "union",
        "subject_id": union.id,
        "event_type": "marriage",
    }
    _call(ws.ws_events_save, admin, {**base, "date_text": "1990"})
    marriage_id = admin.results[-1]["event"]["id"]
    _call(ws.ws_events_save, admin, {**base, "event_id": marriage_id, "date_text": "1991"})
    marriages = [
        e for e in repo.list_events(SubjectType.UNION, union.id) if e.type == EventType.MARRIAGE
    ]
    assert [(e.id, e.date_text) for e in marriages] == [(marriage_id, "1991")]


def test_union_start_event_can_be_retyped_keeping_date(repo: Repository) -> None:
    union, _ = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    base = {
        "type": "family_tree/events/save",
        "subject_type": "union",
        "subject_id": union.id,
    }
    _call(ws.ws_events_save, admin, {**base, "event_type": "cohabitation", "date_text": "ABT 1995"})
    event_id = admin.results[-1]["event"]["id"]
    _call(
        ws.ws_events_save,
        admin,
        {**base, "event_type": "engagement", "event_id": event_id, "date_text": "ABT 1995"},
    )
    assert not admin.errors
    starts = [
        e
        for e in repo.list_events(SubjectType.UNION, union.id)
        if e.type in (EventType.COHABITATION, EventType.ENGAGEMENT)
    ]
    assert [(e.id, e.type, e.date_text) for e in starts] == [
        (event_id, EventType.ENGAGEMENT, "ABT 1995")
    ]


def test_unions_save_changes_type(repo: Repository) -> None:
    union, _ = _divorced_union(repo)
    admin = _FakeConnection("admin", is_admin=True)
    partners = [p.person_id for p in repo.list_union_partners(union.id)]
    _call(
        ws.ws_unions_save,
        admin,
        {
            "type": "family_tree/unions/save",
            "union_id": union.id,
            "union_type": "cohabitation",
            "partner_ids": partners,
        },
    )
    saved = repo.get_union(union.id)
    assert saved is not None
    assert saved.type == UnionType.COHABITATION
    assert saved.status == UnionStatus.DIVORCED


def test_person_events_include_new_union_start_kinds(repo: Repository) -> None:
    from custom_components.family_tree.relatives import (
        union_events_for_person,
        union_start_event_type,
    )

    union, _ = _divorced_union(repo)
    person_id = repo.list_union_partners(union.id)[0].person_id
    for kind in (EventType.ENGAGEMENT, EventType.COHABITATION, EventType.PARTNERSHIP):
        repo.add_event(
            Event(
                subject_type=SubjectType.UNION,
                subject_id=union.id,
                type=kind,
                date_text="1990",
            )
        )
    kinds = {e["type"] for e in union_events_for_person(repo, person_id)}
    assert {"engagement", "cohabitation", "partnership", "divorce"} <= kinds
    assert union_start_event_type(UnionType.ENGAGEMENT) == EventType.ENGAGEMENT
    assert union_start_event_type(UnionType.UNKNOWN) == EventType.MARRIAGE


def test_new_event_kinds_sort_before_marriage(repo: Repository) -> None:
    from custom_components.family_tree.repository import EVENT_TYPE_ORDER

    order = list(EVENT_TYPE_ORDER)
    assert order.index("engagement") < order.index("cohabitation") < order.index("marriage")


def test_union_type_to_start_event_mapping_matches_contract() -> None:
    """Same table as frontend/src/union_form.test.ts and contracts/ws-union-event.md."""
    from custom_components.family_tree.relatives import union_start_event_type

    expected = {
        UnionType.MARRIAGE: EventType.MARRIAGE,
        UnionType.REGISTERED_PARTNERSHIP: EventType.PARTNERSHIP,
        UnionType.COHABITATION: EventType.COHABITATION,
        UnionType.ENGAGEMENT: EventType.ENGAGEMENT,
        UnionType.UNKNOWN: EventType.MARRIAGE,
    }
    assert set(expected) == set(UnionType)
    assert {t: union_start_event_type(t) for t in UnionType} == expected
