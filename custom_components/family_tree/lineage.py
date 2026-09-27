"""Biological lineage via recursive CTEs."""

from __future__ import annotations

from typing import Any

from .db import Database
from .models import ParentChildType, Person, Sex
from .names import display_name


def ancestors(
    db: Database,
    person_id: str,
    *,
    max_generations: int | None = None,
) -> list[dict[str, Any]]:
    """Return biological ancestors with generation (1 = parents)."""
    rows = db.fetchall(
        """
        WITH RECURSIVE lineage(relative_id, generation) AS (
            SELECT pc.parent_id, 1
            FROM parent_child pc
            WHERE pc.child_id = ? AND pc.type = ?
            UNION
            SELECT pc.parent_id, l.generation + 1
            FROM lineage l
            JOIN parent_child pc
              ON pc.child_id = l.relative_id AND pc.type = ?
        )
        SELECT l.relative_id AS id, MIN(l.generation) AS generation,
               p.given_names, p.call_name, p.surname_prefix, p.surname, p.sex,
               p.is_living
        FROM lineage l
        JOIN persons p ON p.id = l.relative_id AND p.deleted_at IS NULL
        GROUP BY l.relative_id
        ORDER BY generation, p.surname, p.given_names
        """,
        (
            person_id,
            ParentChildType.BIOLOGICAL.value,
            ParentChildType.BIOLOGICAL.value,
        ),
    )
    result = [_relative_dict(r) for r in rows]
    if max_generations is not None:
        result = [r for r in result if r["generation"] <= max_generations]
    return result


def descendants(
    db: Database,
    person_id: str,
    *,
    max_generations: int | None = None,
) -> list[dict[str, Any]]:
    """Return biological descendants with generation (1 = children)."""
    rows = db.fetchall(
        """
        WITH RECURSIVE lineage(relative_id, generation) AS (
            SELECT pc.child_id, 1
            FROM parent_child pc
            WHERE pc.parent_id = ? AND pc.type = ?
            UNION
            SELECT pc.child_id, l.generation + 1
            FROM lineage l
            JOIN parent_child pc
              ON pc.parent_id = l.relative_id AND pc.type = ?
        )
        SELECT l.relative_id AS id, MIN(l.generation) AS generation,
               p.given_names, p.call_name, p.surname_prefix, p.surname, p.sex,
               p.is_living
        FROM lineage l
        JOIN persons p ON p.id = l.relative_id AND p.deleted_at IS NULL
        GROUP BY l.relative_id
        ORDER BY generation, p.surname, p.given_names
        """,
        (
            person_id,
            ParentChildType.BIOLOGICAL.value,
            ParentChildType.BIOLOGICAL.value,
        ),
    )
    result = [_relative_dict(r) for r in rows]
    if max_generations is not None:
        result = [r for r in result if r["generation"] <= max_generations]
    return result


def lineage_relation(
    db: Database,
    from_person_id: str,
    to_person_id: str,
) -> dict[str, Any] | None:
    """If ``to`` is an ancestor or descendant of ``from``, return the relation."""
    if from_person_id == to_person_id:
        return None
    for relative in ancestors(db, from_person_id):
        if relative["id"] == to_person_id:
            return {
                "type": "ancestor",
                "generation": relative["generation"],
                "relative_id": to_person_id,
            }
    for relative in descendants(db, from_person_id):
        if relative["id"] == to_person_id:
            return {
                "type": "descendant",
                "generation": relative["generation"],
                "relative_id": to_person_id,
            }
    return None


def _relative_dict(row: Any) -> dict[str, Any]:
    sex_raw = row["sex"] or Sex.UNKNOWN.value
    try:
        sex = Sex(sex_raw)
    except ValueError:
        sex = Sex.UNKNOWN
    person = Person(
        id=row["id"],
        given_names=row["given_names"] or "",
        call_name=row["call_name"] or "",
        surname_prefix=row["surname_prefix"] or "",
        surname=row["surname"] or "",
        sex=sex,
        is_living=bool(row["is_living"]),
    )
    return {
        "id": person.id,
        "generation": int(row["generation"]),
        "name": display_name(person),
        "sex": person.sex.value,
        "is_living": person.is_living,
    }
