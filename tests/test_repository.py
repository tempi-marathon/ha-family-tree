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
