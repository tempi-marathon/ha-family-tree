"""Relative lookups: parents, children, siblings, partners."""

from __future__ import annotations

from typing import Any

from .db import Database
from .models import Person
from .names import display_name
from .repository import Repository


def _person_summary(person: Person) -> dict[str, Any]:
    return {
        "id": person.id,
        "name": display_name(person),
        "given_names": person.given_names,
        "call_name": person.call_name,
        "surname_prefix": person.surname_prefix,
        "surname": person.surname,
        "sex": person.sex.value,
        "is_living": person.is_living,
    }


def parents_of(repo: Repository, person_id: str) -> list[dict[str, Any]]:
    """Parents with link type and optional union."""
    out: list[dict[str, Any]] = []
    for link in repo.list_parents(person_id):
        parent = repo.get_person(link.parent_id)
        if not parent:
            continue
        out.append(
            {
                **_person_summary(parent),
                "link_id": link.id,
                "link_type": link.type.value,
                "union_id": link.union_id,
            }
        )
    return out


def children_of(repo: Repository, person_id: str) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for link in repo.list_children(person_id):
        child = repo.get_person(link.child_id)
        if not child:
            continue
        out.append(
            {
                **_person_summary(child),
                "link_id": link.id,
                "link_type": link.type.value,
                "union_id": link.union_id,
            }
        )
    return out


def siblings_of(repo: Repository, person_id: str) -> list[dict[str, Any]]:
    """Full and half siblings via shared parents."""
    parent_ids = {link.parent_id for link in repo.list_parents(person_id)}
    if not parent_ids:
        return []

    by_id: dict[str, dict[str, Any]] = {}
    shared_counts: dict[str, int] = {}
    for parent_id in parent_ids:
        for link in repo.list_children(parent_id):
            if link.child_id == person_id:
                continue
            child = repo.get_person(link.child_id)
            if not child:
                continue
            shared_counts[child.id] = shared_counts.get(child.id, 0) + 1
            by_id[child.id] = _person_summary(child)

    result: list[dict[str, Any]] = []
    for sibling_id, summary in by_id.items():
        kind = "sibling" if shared_counts[sibling_id] >= 2 else "half_sibling"
        result.append({**summary, "relation": kind})
    result.sort(key=lambda s: (s.get("surname") or "", s.get("given_names") or ""))
    return result


def partners_of(repo: Repository, person_id: str) -> list[dict[str, Any]]:
    """Unions and partners for a person."""
    out: list[dict[str, Any]] = []
    for union in repo.list_unions_for_person(person_id):
        partners = []
        for up in repo.list_union_partners(union.id):
            if up.person_id == person_id:
                continue
            partner = repo.get_person(up.person_id)
            if partner:
                partners.append({**_person_summary(partner), "position": up.position})
        out.append(
            {
                "union_id": union.id,
                "type": union.type.value,
                "status": union.status.value,
                "known_children_count": union.known_children_count,
                "partners": partners,
            }
        )
    return out


def tree_for(repo: Repository, person_id: str) -> dict[str, Any] | None:
    """Compact tree payload: grandparents, parents, self, partners, children."""
    person = repo.get_person(person_id)
    if not person:
        return None

    parent_links = parents_of(repo, person_id)
    grandparents: dict[str, list[dict[str, Any]]] = {}
    for parent in parent_links:
        grandparents[parent["id"]] = parents_of(repo, parent["id"])

    return {
        "person": _person_summary(person),
        "parents": parent_links,
        "grandparents": grandparents,
        "partners": partners_of(repo, person_id),
        "children": children_of(repo, person_id),
        "siblings": siblings_of(repo, person_id),
    }


def living_persons(db: Database) -> list[Person]:
    rows = db.fetchall(
        "SELECT * FROM persons WHERE deleted_at IS NULL AND is_living = 1"
    )
    return [Person.from_dict(dict(r)) for r in rows]
