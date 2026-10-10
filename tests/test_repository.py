"""Tests for the Family Tree repository."""

from pathlib import Path

from custom_components.family_tree.db import Database
from custom_components.family_tree.models import (
    Event,
    EventType,
    ParentChild,
    Person,
    Place,
    Sex,
    SubjectType,
    Union,
    UnionType,
)
from custom_components.family_tree.repository import (
    Repository,
    event_sort_key,
    vital_summary,
)


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
    assert birth["date_text"] == "1 JAN 1990"
    assert birth["date_qualifier"] == "exact"
    repo.db.close()


def test_family_summaries_for_persons(tmp_path: Path):
    repo = _repo(tmp_path)
    dad = repo.add_person(Person(given_names="Marinus", surname="Molenschot", sex=Sex.MALE))
    mom = repo.add_person(Person(given_names="Wilhelmina", surname="Aerts", sex=Sex.FEMALE))
    kid = repo.add_person(Person(given_names="Ad", surname="Molenschot", sex=Sex.MALE))
    kid2 = repo.add_person(Person(given_names="Anna", surname="Molenschot"))
    gone = repo.add_person(Person(given_names="Gone", surname="Molenschot"))
    orphan = repo.add_person(Person(given_names="Solo"))
    for child in (kid, kid2, gone):
        repo.add_parent_child(ParentChild(parent_id=dad.id, child_id=child.id))
        repo.add_parent_child(ParentChild(parent_id=mom.id, child_id=child.id))
    repo.soft_delete_person(gone.id)

    by_id = repo.family_summaries_for_persons([dad.id, kid.id, orphan.id])
    assert by_id[kid.id]["father"] == {"id": dad.id, "name": "Marinus Molenschot"}
    assert by_id[kid.id]["mother"] == {"id": mom.id, "name": "Wilhelmina Aerts"}
    assert by_id[kid.id]["children_count"] == 0
    assert by_id[dad.id]["children_count"] == 2
    assert by_id[orphan.id] == {"father": None, "mother": None, "children_count": 0}
    assert repo.family_summaries_for_persons([]) == {}
    repo.db.close()


def test_family_summaries_unknown_sex_parents_fill_slots(tmp_path: Path):
    repo = _repo(tmp_path)
    p1 = repo.add_person(Person(given_names="Pat"))
    p2 = repo.add_person(Person(given_names="Sam", sex=Sex.FEMALE))
    kid = repo.add_person(Person(given_names="Kid"))
    repo.add_parent_child(ParentChild(parent_id=p1.id, child_id=kid.id))
    repo.add_parent_child(ParentChild(parent_id=p2.id, child_id=kid.id))
    summary = repo.family_summaries_for_persons([kid.id])[kid.id]
    assert summary["mother"]["id"] == p2.id
    assert summary["father"]["id"] == p1.id
    repo.db.close()


def test_vital_summary_falls_back_to_baptism_and_burial():
    events = [
        {"type": "baptism", "date_text": "ABT 1784", "date_qualifier": "about",
         "sort_date": "1784-01-01", "place_name": "Tilburg"},
        {"type": "burial", "date_text": "1863", "sort_date": "1863-01-01"},
        {"type": "marriage", "date_text": "1810", "sort_date": "1810-01-01"},
    ]
    summary = vital_summary(events)
    assert summary["birth"]["type"] == "baptism"
    assert summary["birth"]["date_qualifier"] == "about"
    assert summary["birth"]["place_name"] == "Tilburg"
    assert summary["death"]["type"] == "burial"
    assert vital_summary([]) == {"birth": None, "death": None}


def test_events_sorted_chronologically_with_type_order(tmp_path: Path):
    repo = _repo(tmp_path)
    p = repo.add_person(Person(given_names="Ada"))

    def _add(event_type: EventType, sort_date: str | None) -> None:
        repo.add_event(
            Event(
                subject_type=SubjectType.PERSON,
                subject_id=p.id,
                type=event_type,
                sort_date=sort_date,
            )
        )

    _add(EventType.BURIAL, "1900-01-01")
    _add(EventType.OCCUPATION, None)
    _add(EventType.DEATH, "1900-01-01")
    _add(EventType.BIRTH, "1850-03-01")
    _add(EventType.RESIDENCE, "1870-01-01")
    types = [e.type.value for e in repo.list_events(SubjectType.PERSON, p.id)]
    assert types == ["birth", "residence", "death", "burial", "occupation"]

    dicts = [
        {"type": "death", "sort_date": "1900-01-01"},
        {"type": "marriage", "sort_date": "1875-05-05"},
        {"type": "occupation", "sort_date": None},
        {"type": "birth", "sort_date": "1850-03-01"},
    ]
    assert [d["type"] for d in sorted(dicts, key=event_sort_key)] == [
        "birth",
        "marriage",
        "death",
        "occupation",
    ]
    repo.db.close()


def test_family_shortcuts_meta(tmp_path: Path) -> None:
    repo = _repo(tmp_path)
    assert repo.get_family_shortcuts() is None
    saved = repo.set_family_shortcuts(["van Iersel", "Molenschot", "van Iersel"])
    assert saved == ["van Iersel", "Molenschot"]
    assert repo.get_family_shortcuts() == ["van Iersel", "Molenschot"]
    repo.db.close()
