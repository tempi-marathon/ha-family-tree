"""Tests for the Family Tree repository."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.models import (
    Event,
    EventType,
    Person,
    Place,
    Sex,
    SubjectType,
    Union,
    UnionType,
)
from custom_components.family_tree.repository import Repository


def _repo(tmp_path: Path) -> Repository:
    db = Database(tmp_path / "tree.db")
    db.open()
    return Repository(db)


def test_person_crud_and_trash(tmp_path: Path):
    repo = _repo(tmp_path)
    person = repo.add_person(
        Person(given_names="Ada", surname="Lovelace", sex=Sex.FEMALE)
    )
    assert repo.get_person(person.id) is not None
    assert repo.count_persons() == 1

    updated = repo.update_person(
        Person(
            id=person.id,
            given_names="Ada",
            surname="Lovelace",
            call_name="Ada",
            sex=Sex.FEMALE,
            created_at=person.created_at,
        )
    )
    assert updated.call_name == "Ada"

    assert repo.soft_delete_person(person.id)
    assert repo.get_person(person.id) is None
    trashed, total = repo.list_persons(trashed=True)
    assert total == 1
    assert trashed[0].id == person.id
    assert repo.restore_person(person.id)
    assert repo.get_person(person.id) is not None
    repo.db.close()


def test_union_place_event_and_revision(tmp_path: Path):
    repo = _repo(tmp_path)
    a = repo.add_person(Person(given_names="Alex", surname="One"))
    b = repo.add_person(Person(given_names="Blake", surname="Two"))
    rev0 = repo.get_revision()

    union = repo.add_union(
        Union(type=UnionType.MARRIAGE),
        [(a.id, 0), (b.id, 1)],
    )
    assert len(repo.list_union_partners(union.id)) == 2
    assert repo.get_revision() > rev0

    place = repo.add_place(Place(name="Amsterdam", country="Netherlands", country_code="NL"))
    event = repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=a.id,
            type=EventType.BIRTH,
            place_id=place.id,
            date_text="1 JAN 1990",
            sort_date="1990-01-01",
        )
    )
    events = repo.list_events(SubjectType.PERSON, a.id)
    assert events[0].id == event.id
    assert repo.find_place("Amsterdam", country="Netherlands") is not None

    notified = []
    unsub = repo.add_listener(lambda: notified.append(1))
    repo.add_person(Person(given_names="Casey"))
    assert notified
    unsub()
    repo.db.close()


def test_life_events_for_persons(tmp_path: Path):
    repo = _repo(tmp_path)
    a = repo.add_person(Person(given_names="Alex", surname="One"))
    b = repo.add_person(Person(given_names="Blake", surname="Two"))
    place = repo.add_place(
        Place(name="Amsterdam", country="Netherlands", country_code="NL")
    )
    marr_place = repo.add_place(
        Place(name="Utrecht", country="Netherlands", country_code="NL")
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=a.id,
            type=EventType.BIRTH,
            place_id=place.id,
            date_text="1 JAN 1990",
            sort_date="1990-01-01",
        )
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.PERSON,
            subject_id=a.id,
            type=EventType.DEATH,
            date_text="2020",
            sort_date="2020-01-01",
        )
    )
    union = repo.add_union(
        Union(type=UnionType.MARRIAGE),
        [(a.id, 0), (b.id, 1)],
    )
    repo.add_event(
        Event(
            subject_type=SubjectType.UNION,
            subject_id=union.id,
            type=EventType.MARRIAGE,
            place_id=marr_place.id,
            date_text="15 JUN 2010",
            sort_date="2010-06-15",
        )
    )

    by_id = repo.life_events_for_persons([a.id, b.id])
    assert len(by_id[a.id]) == 3
    types_a = {e["type"] for e in by_id[a.id]}
    assert types_a == {"birth", "death", "marriage"}
    birth = next(e for e in by_id[a.id] if e["type"] == "birth")
    assert birth["place_id"] == place.id
    assert birth["place_name"] and "Amsterdam" in birth["place_name"]
    assert birth["sort_date"] == "1990-01-01"

    assert len(by_id[b.id]) == 1
    assert by_id[b.id][0]["type"] == "marriage"
    assert by_id[b.id][0]["place_id"] == marr_place.id
    assert by_id[b.id][0]["sort_date"] == "2010-06-15"

    assert repo.life_events_for_persons([]) == {}
    repo.db.close()
