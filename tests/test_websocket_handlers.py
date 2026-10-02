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
)
from custom_components.family_tree.repository import Repository


class _FakeHass:
    async def async_add_executor_job(self, fn: Any, *args: Any) -> Any:
        return fn(*args)


class _FakeConnection:
    def __init__(self, user_id: str | None, *, is_admin: bool = False) -> None:
        self.user = (
            SimpleNamespace(id=user_id, is_admin=is_admin) if user_id else None
        )
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
    monkeypatch.setattr(
        ws, "_coordinator", lambda _hass, _msg: SimpleNamespace(repo=repository)
    )
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
