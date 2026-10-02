"""Relative lookups: parents, children, siblings, partners."""

from __future__ import annotations

from typing import Any

from .db import Database
from .models import EventType, Person, SubjectType
from .names import display_name, full_name
from .repository import Repository


def _vital_fields(repo: Repository, person_id: str) -> dict[str, Any]:
    """Birth/death date texts, sort dates, and birth place for a person."""
    birth_date_text = ""
    birth_sort_date = None
    death_date_text = ""
    death_sort_date = None
    birth_place = ""
    for event in repo.list_events(SubjectType.PERSON, person_id):
        if event.type == EventType.BIRTH:
            if not birth_date_text:
                birth_date_text = event.date_text or ""
                birth_sort_date = event.sort_date
            if not birth_place and event.place_id:
                place = repo.get_place(event.place_id)
                if place:
                    birth_place = place.name
        elif event.type == EventType.DEATH and not death_date_text:
            death_date_text = event.date_text or ""
            death_sort_date = event.sort_date
    return {
        "birth_date_text": birth_date_text,
        "birth_sort_date": birth_sort_date,
        "death_date_text": death_date_text,
        "death_sort_date": death_sort_date,
        "birth_place": birth_place,
    }


def _person_summary(repo: Repository, person: Person) -> dict[str, Any]:
    return {
        "id": person.id,
        "name": display_name(person),
        "formal_name": full_name(person),
        "given_names": person.given_names,
        "call_name": person.call_name,
        "surname_prefix": person.surname_prefix,
        "surname": person.surname,
        "sex": person.sex.value,
        "is_living": person.is_living,
        **_vital_fields(repo, person.id),
    }


def _union_event_fields(repo: Repository, union_id: str) -> dict[str, Any]:
    """Marriage/divorce date and place for a union."""
    marriage_date = ""
    marriage_place = ""
    divorce_date = ""
    divorce_place = ""
    for event in repo.list_events(SubjectType.UNION, union_id):
        place_name = ""
        if event.place_id:
            place = repo.get_place(event.place_id)
            if place:
                place_name = place.name
        if event.type == EventType.MARRIAGE and not marriage_date:
            marriage_date = event.date_text or ""
            marriage_place = place_name
        elif event.type == EventType.DIVORCE and not divorce_date:
            divorce_date = event.date_text or ""
            divorce_place = place_name
    return {
        "marriage_date": marriage_date,
        "marriage_place": marriage_place,
        "divorce_date": divorce_date,
        "divorce_place": divorce_place,
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
                **_person_summary(repo, parent),
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
                **_person_summary(repo, child),
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
            by_id[child.id] = _person_summary(repo, child)

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
                partners.append({**_person_summary(repo, partner), "position": up.position})
        out.append(
            {
                "union_id": union.id,
                "type": union.type.value,
                "status": union.status.value,
                "known_children_count": union.known_children_count,
                "partners": partners,
                **_union_event_fields(repo, union.id),
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

    siblings = siblings_of(repo, person_id)
    children = children_of(repo, person_id)
    partners = partners_of(repo, person_id)
    _assign_children_to_unions(repo, partners, children)
    assigned = {c["id"] for union in partners for c in union["children"]}
    return {
        "person": {
            **_person_summary(repo, person),
            "sibling_count": len(siblings),
        },
        "parents": parent_links,
        "grandparents": grandparents,
        "partners": partners,
        "children": children,
        "children_without_union": [c for c in children if c["id"] not in assigned],
        "siblings": siblings,
    }


def _assign_children_to_unions(
    repo: Repository,
    unions: list[dict[str, Any]],
    children: list[dict[str, Any]],
) -> None:
    """Nest each child under its union (explicit union_id, else shared co-parent)."""
    co_parents: dict[str, set[str]] = {}
    for child in children:
        if not child.get("union_id"):
            co_parents[child["id"]] = {
                link.parent_id for link in repo.list_parents(child["id"])
            }
    for union in unions:
        partner_ids = {p["id"] for p in union["partners"]}
        union["children"] = [
            child
            for child in children
            if child.get("union_id") == union["union_id"]
            or (
                not child.get("union_id")
                and partner_ids & co_parents.get(child["id"], set())
            )
        ]


def living_persons(db: Database) -> list[Person]:
    rows = db.fetchall(
        "SELECT * FROM persons WHERE deleted_at IS NULL AND is_living = 1"
    )
    return [Person.from_dict(dict(r)) for r in rows]


def enrich_event_dict(repo: Repository, event_dict: dict[str, Any]) -> dict[str, Any]:
    """Add place_name to an event payload."""
    place_name = ""
    place_id = event_dict.get("place_id")
    if place_id:
        place = repo.get_place(str(place_id))
        if place:
            place_name = place.name
    return {**event_dict, "place_name": place_name}


def union_events_for_person(repo: Repository, person_id: str) -> list[dict[str, Any]]:
    """Marriage/divorce events for unions this person belongs to."""
    out: list[dict[str, Any]] = []
    for union in repo.list_unions_for_person(person_id):
        partner_names: list[str] = []
        for up in repo.list_union_partners(union.id):
            if up.person_id == person_id:
                continue
            partner = repo.get_person(up.person_id)
            if partner:
                partner_names.append(display_name(partner))
        for event in repo.list_events(SubjectType.UNION, union.id):
            if event.type not in (EventType.MARRIAGE, EventType.DIVORCE):
                continue
            payload = enrich_event_dict(repo, event.to_dict())
            payload["union_id"] = union.id
            payload["partner_names"] = partner_names
            if partner_names and not payload.get("description"):
                payload["description"] = " & ".join(partner_names)
            out.append(payload)
    return out
