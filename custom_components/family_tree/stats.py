"""Dashboard statistics aggregations."""

from __future__ import annotations

from collections import Counter
from datetime import date
from typing import Any

from .dates import age_years, parse_gedcom_date, year_from_sort_date
from .db import Database
from .models import EventType, Person, SubjectType


def _birth_death_for(
    db: Database, person_id: str
) -> tuple[Any, Any]:
    birth = db.fetchone(
        "SELECT * FROM events WHERE subject_type=? AND subject_id=? AND type=? "
        "AND deleted_at IS NULL LIMIT 1",
        (SubjectType.PERSON.value, person_id, EventType.BIRTH.value),
    )
    death = db.fetchone(
        "SELECT * FROM events WHERE subject_type=? AND subject_id=? AND type=? "
        "AND deleted_at IS NULL LIMIT 1",
        (SubjectType.PERSON.value, person_id, EventType.DEATH.value),
    )
    birth_p = parse_gedcom_date(birth["date_text"]) if birth else None
    if birth and birth["sort_date"] and birth_p and not birth_p.sort_date:
        birth_p = type(birth_p)(
            birth_p.date_text,
            birth_p.qualifier,
            birth_p.date_from,
            birth_p.date_to,
            birth["sort_date"],
        )
    death_p = parse_gedcom_date(death["date_text"]) if death else None
    if death and death["sort_date"] and death_p and not death_p.sort_date:
        death_p = type(death_p)(
            death_p.date_text,
            death_p.qualifier,
            death_p.date_from,
            death_p.date_to,
            death["sort_date"],
        )
    return birth_p, death_p


def compute_stats(db: Database, *, today: date | None = None) -> dict[str, Any]:
    """Return dashboard stats and chart datasets."""
    today = today or date.today()
    persons = [
        Person.from_dict(dict(r))
        for r in db.fetchall("SELECT * FROM persons WHERE deleted_at IS NULL")
    ]
    living = sum(1 for p in persons if p.is_living)
    deceased = len(persons) - living

    ages: Counter[str] = Counter()
    centuries: Counter[str] = Counter()
    places: Counter[str] = Counter()

    for person in persons:
        birth, death = _birth_death_for(db, person.id)
        age = age_years(birth, death, is_living=person.is_living, today=today)
        if age is not None:
            bucket = f"{(age // 10) * 10}-{(age // 10) * 10 + 9}"
            ages[bucket] += 1
        year = year_from_sort_date(birth.sort_date if birth else None)
        if year:
            century = f"{(year // 100) * 100}s"
            centuries[century] += 1

        birth_event = db.fetchone(
            "SELECT e.*, pl.name AS place_name, pl.admin1, pl.country "
            "FROM events e LEFT JOIN places pl ON pl.id = e.place_id "
            "WHERE e.subject_type=? AND e.subject_id=? AND e.type=? "
            "AND e.deleted_at IS NULL LIMIT 1",
            (SubjectType.PERSON.value, person.id, EventType.BIRTH.value),
        )
        if birth_event and birth_event["place_name"]:
            label = birth_event["place_name"]
            if birth_event["admin1"]:
                label = f"{label}, {birth_event['admin1']}"
            places[label] += 1

    # Top places + Other
    top = places.most_common(6)
    remaining = sum(c for _, c in places.most_common()[6:])
    place_labels = [n for n, _ in top]
    place_values = [c for _, c in top]
    if remaining:
        place_labels.append("Other")
        place_values.append(remaining)

    return {
        "total_persons": len(persons),
        "living": living,
        "deceased": deceased,
        "ages": {
            "labels": sorted(ages.keys(), key=lambda k: int(k.split("-")[0])),
            "values": [
                ages[k]
                for k in sorted(ages.keys(), key=lambda k: int(k.split("-")[0]))
            ],
        },
        "centuries": {
            "labels": sorted(centuries.keys()),
            "values": [centuries[k] for k in sorted(centuries.keys())],
        },
        "places_of_birth": {
            "labels": place_labels,
            "values": place_values,
        },
    }
