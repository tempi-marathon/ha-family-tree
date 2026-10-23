"""Unit tests for coordinator upcoming / on-this-day helpers and sensors."""

from __future__ import annotations

from datetime import date
from pathlib import Path
from unittest.mock import MagicMock

from custom_components.family_tree.coordinator import (
    FamilyTreeData,
    _on_this_day,
    _upcoming_memorials,
)
from custom_components.family_tree.db import Database
from custom_components.family_tree.models import (
    Event,
    EventType,
    Person,
    SubjectType,
    Union,
    UnionType,
)
from custom_components.family_tree.repository import Repository
from custom_components.family_tree.sensor import (
    _UNRECORDED,
    OnThisDaySensor,
    UpcomingEventsSensor,
)


def _repo(tmp_path: Path) -> Repository:
    db = Database(tmp_path / "tree.db")
    db.open()
    return Repository(db)


def test_upcoming_memorials_precise_dates_only(tmp_path: Path) -> None:
    repo = _repo(tmp_path)
    precise = repo.add_person(Person(given_names="Ada", surname="Lovelace", is_living=False))
    year_only = repo.add_person(Person(given_names="Year", surname="Only", is_living=False))
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=precise.id,
            type=EventType.DEATH,
            date_text="27 NOV 1852",
            sort_date="1852-11-27",
        )
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=year_only.id,
            type=EventType.DEATH,
            date_text="1900",
            sort_date="1900",
        )
    )

    today = date(2026, 11, 20)
    memorials = _upcoming_memorials(repo, today=today, within_days=60)
    assert len(memorials) == 1
    item = memorials[0]
    assert item["person_id"] == precise.id
    assert item["name"] == "Ada Lovelace"
    assert item["next_date"] == "2026-11-27"
    assert item["days_until"] == 7
    assert item["years"] == 2026 - 1852
    repo.db.close()


def test_upcoming_memorials_includes_death_even_if_flagged_living(
    tmp_path: Path,
) -> None:
    repo = _repo(tmp_path)
    person = repo.add_person(Person(given_names="Misflagged", surname="Living", is_living=True))
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=person.id,
            type=EventType.DEATH,
            date_text="15 JAN 2000",
            sort_date="2000-01-15",
        )
    )
    today = date(2026, 1, 10)
    memorials = _upcoming_memorials(repo, today=today, within_days=60)
    assert len(memorials) == 1
    assert memorials[0]["person_id"] == person.id
    repo.db.close()


def test_on_this_day_baptism_and_partnership(tmp_path: Path) -> None:
    repo = _repo(tmp_path)
    deceased = repo.add_person(Person(given_names="Jan", surname="Baptiste", is_living=False))
    living = repo.add_person(Person(given_names="Living", surname="Child", is_living=True))
    a = repo.add_person(Person(given_names="Alex", surname="One"))
    b = repo.add_person(Person(given_names="Blake", surname="Two"))
    union = repo.add_union(
        Union(type=UnionType.REGISTERED_PARTNERSHIP),
        [(a.id, 0), (b.id, 1)],
    )

    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=deceased.id,
            type=EventType.BAPTISM,
            date_text="10 MAR 1800",
            sort_date="1800-03-10",
        )
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=living.id,
            type=EventType.BAPTISM,
            date_text="10 MAR 2010",
            sort_date="2010-03-10",
        )
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.UNION,
            subject_id=union.id,
            type=EventType.PARTNERSHIP,
            date_text="10 MAR 2015",
            sort_date="2015-03-10",
        )
    )

    today = date(2026, 3, 10)
    items = _on_this_day(repo, today=today, within_days=0, limit=20)
    kinds = {i["kind"] for i in items}
    assert "baptism" in kinds
    assert "partnership" in kinds
    baptism = next(i for i in items if i["kind"] == "baptism")
    assert baptism["person_id"] == deceased.id
    assert baptism["days_until"] == 0
    assert baptism["years_ago"] == 2026 - 1800
    partnership = next(i for i in items if i["kind"] == "partnership")
    assert partnership["union_id"] == union.id
    assert partnership["days_until"] == 0
    assert set(partnership["names"]) == {"Alex One", "Blake Two"}
    # Living baptism must not appear (deceased-only like birth).
    assert all(i.get("person_id") != living.id for i in items if i["kind"] == "baptism")
    repo.db.close()


def test_on_this_day_sensor_counts_today_events() -> None:
    entry = MagicMock()
    entry.entry_id = "test-entry"
    coordinator = MagicMock()
    coordinator.data = FamilyTreeData(
        stats={},
        upcoming_birthdays=[],
        upcoming_anniversaries=[],
        upcoming_memorials=[],
        on_this_day=[
            {
                "kind": "death",
                "name": "Ada",
                "days_until": 0,
                "person_id": "p1",
            },
            {
                "kind": "birth",
                "name": "Bob",
                "days_until": 3,
                "person_id": "p2",
            },
            {
                "kind": "baptism",
                "name": "Jan",
                "days_until": 0,
                "person_id": "p3",
            },
        ],
        revision=1,
    )
    coordinator.update_context = None
    sensor = OnThisDaySensor(coordinator, entry)
    assert sensor.native_value == 2
    attrs = sensor.extra_state_attributes
    assert len(attrs["events"]) == 2
    assert all(int(e["days_until"]) == 0 for e in attrs["events"])


def test_upcoming_events_sensor_soonest_and_lists() -> None:
    entry = MagicMock()
    entry.entry_id = "test-entry"
    coordinator = MagicMock()
    coordinator.data = FamilyTreeData(
        stats={},
        upcoming_birthdays=[
            {
                "person_id": "b1",
                "name": "Birthday Person",
                "next_date": "2026-04-01",
                "days_until": 10,
                "age": 30,
            }
        ],
        upcoming_anniversaries=[
            {
                "union_id": "u1",
                "names": ["A", "B"],
                "next_date": "2026-03-25",
                "days_until": 3,
                "years": 5,
            }
        ],
        upcoming_memorials=[
            {
                "person_id": "m1",
                "name": "Memorial Person",
                "next_date": "2026-03-28",
                "days_until": 6,
                "years": 20,
            }
        ],
        on_this_day=[],
        revision=1,
    )
    coordinator.update_context = None
    sensor = UpcomingEventsSensor(coordinator, entry)
    assert sensor.native_value == 3
    attrs = sensor.extra_state_attributes
    assert len(attrs["birthdays"]) == 1
    assert len(attrs["anniversaries"]) == 1
    assert len(attrs["memorials"]) == 1
    assert attrs["next_kind"] == "anniversary"
    assert attrs["next_label"] == "A & B"


def test_unrecorded_attributes_cover_list_fields() -> None:
    assert "events" in _UNRECORDED
    assert "birthdays" in _UNRECORDED
    assert "anniversaries" in _UNRECORDED
    assert "memorials" in _UNRECORDED
