"""Biological lineage via recursive CTEs."""

from __future__ import annotations

from typing import Any

from .const import MAX_LINEAGE_GENERATIONS
from .db import Database
from .models import ParentChildType, Person, Sex
from .names import display_name

_ANCESTOR_CTE = """
        WITH RECURSIVE lineage(relative_id, generation, lineage_path) AS (
            SELECT pc.parent_id, 1, CAST(pc.parent_id AS TEXT)
            FROM parent_child pc
            WHERE pc.child_id = ? AND pc.type = ?
            UNION ALL
            SELECT pc.parent_id, l.generation + 1,
                   l.lineage_path || ',' || pc.parent_id
            FROM lineage l
            JOIN parent_child pc
              ON pc.child_id = l.relative_id AND pc.type = ?
            WHERE l.generation < ?
              AND instr(',' || l.lineage_path || ',', ',' || pc.parent_id || ',') = 0
        )
"""

_DESCENDANT_CTE = """
        WITH RECURSIVE lineage(relative_id, generation, lineage_path) AS (
            SELECT pc.child_id, 1, CAST(pc.child_id AS TEXT)
            FROM parent_child pc
            WHERE pc.parent_id = ? AND pc.type = ?
            UNION ALL
            SELECT pc.child_id, l.generation + 1,
                   l.lineage_path || ',' || pc.child_id
            FROM lineage l
            JOIN parent_child pc
              ON pc.parent_id = l.relative_id AND pc.type = ?
            WHERE l.generation < ?
              AND instr(',' || l.lineage_path || ',', ',' || pc.child_id || ',') = 0
        )
"""


def would_create_parent_child_cycle(
    db: Database, parent_id: str, child_id: str
) -> bool:
    """True when ``parent_id`` as parent of ``child_id`` would create a cycle."""
    if parent_id == child_id:
        return True
    seen: set[str] = set()
    stack = [parent_id]
    while stack:
        person_id = stack.pop()
        if person_id == child_id:
            return True
        if person_id in seen:
            continue
        seen.add(person_id)
        for row in db.fetchall(
            "SELECT parent_id FROM parent_child WHERE child_id = ?", (person_id,)
        ):
            stack.append(str(row["parent_id"]))
    return False


def ancestors(
    db: Database,
    person_id: str,
    *,
    max_generations: int | None = None,
) -> list[dict[str, Any]]:
    """Return biological ancestors with generation (1 = parents)."""
    rows = db.fetchall(
        _ANCESTOR_CTE
        + """
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
            MAX_LINEAGE_GENERATIONS,
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
        _DESCENDANT_CTE
        + """
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
            MAX_LINEAGE_GENERATIONS,
        ),
    )
    result = [_relative_dict(r) for r in rows]
    if max_generations is not None:
        result = [r for r in result if r["generation"] <= max_generations]
    return result


def lineage_map(db: Database, person_id: str) -> dict[str, dict[str, Any]]:
    """All biological ancestors and descendants keyed by id (for lineage stars)."""
    out: dict[str, dict[str, Any]] = {}
    for relative in ancestors(db, person_id):
        out[relative["id"]] = {"type": "ancestor", "generation": relative["generation"]}
    for relative in descendants(db, person_id):
        out.setdefault(
            relative["id"], {"type": "descendant", "generation": relative["generation"]}
        )
    return out


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
