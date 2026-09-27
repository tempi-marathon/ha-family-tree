"""CRUD repository over the Family Tree SQLite database."""

from __future__ import annotations

import logging
from collections.abc import Callable
from datetime import UTC, datetime
from typing import Any

from .db import Database
from .models import (
    Citation,
    Event,
    ExternalRef,
    ParentChild,
    Person,
    Place,
    Source,
    SubjectType,
    Union,
    UnionPartner,
    UserLink,
    new_id,
)

_LOGGER = logging.getLogger(__name__)

Listener = Callable[[], None]


def _now() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


def _row_person(row: Any) -> Person:
    return Person.from_dict(dict(row))


def _row_union(row: Any) -> Union:
    return Union.from_dict(dict(row))


def _row_place(row: Any) -> Place:
    return Place.from_dict(dict(row))


def _row_event(row: Any) -> Event:
    return Event.from_dict(dict(row))


def _row_source(row: Any) -> Source:
    return Source.from_dict(dict(row))


class Repository:
    """Synchronous repository; call from HA executor."""

    def __init__(self, db: Database) -> None:
        self.db = db
        self._listeners: list[Listener] = []

    def add_listener(self, listener: Listener) -> Callable[[], None]:
        self._listeners.append(listener)

        def _remove() -> None:
            if listener in self._listeners:
                self._listeners.remove(listener)

        return _remove

    def _notify(self) -> None:
        for listener in list(self._listeners):
            listener()

    def _mutate(self, fn: Callable[[], Any]) -> Any:
        with self.db.transaction():
            result = fn()
            self.db.bump_revision()
        self._notify()
        return result

    def get_revision(self) -> int:
        return self.db.get_revision()

    # --- Persons -----------------------------------------------------------

    def list_persons(
        self,
        *,
        search: str = "",
        sex: str | None = None,
        living: bool | None = None,
        trashed: bool = False,
        limit: int = 50,
        offset: int = 0,
    ) -> tuple[list[Person], int]:
        clauses = ["deleted_at IS NOT NULL" if trashed else "deleted_at IS NULL"]
        params: list[Any] = []
        if search:
            clauses.append(
                "(given_names LIKE ? OR call_name LIKE ? OR surname LIKE ? "
                "OR surname_prefix LIKE ? OR (surname_prefix || ' ' || surname) LIKE ?)"
            )
            like = f"%{search}%"
            params.extend([like, like, like, like, like])
        if sex:
            clauses.append("sex = ?")
            params.append(sex)
        if living is not None:
            clauses.append("is_living = ?")
            params.append(1 if living else 0)
        where = " AND ".join(clauses)
        total = self.db.fetchone(
            f"SELECT COUNT(*) AS c FROM persons WHERE {where}", params
        )
        rows = self.db.fetchall(
            f"SELECT * FROM persons WHERE {where} "
            "ORDER BY surname COLLATE NOCASE, given_names COLLATE NOCASE "
            "LIMIT ? OFFSET ?",
            [*params, limit, offset],
        )
        return [_row_person(r) for r in rows], int(total["c"] if total else 0)

    def get_person(self, person_id: str, *, include_deleted: bool = False) -> Person | None:
        if include_deleted:
            row = self.db.fetchone("SELECT * FROM persons WHERE id = ?", (person_id,))
        else:
            row = self.db.fetchone(
                "SELECT * FROM persons WHERE id = ? AND deleted_at IS NULL",
                (person_id,),
            )
        return _row_person(row) if row else None

    def count_persons(self, *, trashed: bool = False) -> int:
        if trashed:
            row = self.db.fetchone(
                "SELECT COUNT(*) AS c FROM persons WHERE deleted_at IS NOT NULL"
            )
        else:
            row = self.db.fetchone(
                "SELECT COUNT(*) AS c FROM persons WHERE deleted_at IS NULL"
            )
        return int(row["c"] if row else 0)

    def add_person(self, person: Person) -> Person:
        def _do() -> Person:
            self.db.execute(
                "INSERT INTO persons (id, given_names, call_name, surname_prefix, "
                "surname, sex, is_living, notes, created_at, updated_at, deleted_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    person.id,
                    person.given_names,
                    person.call_name,
                    person.surname_prefix,
                    person.surname,
                    person.sex.value,
                    1 if person.is_living else 0,
                    person.notes,
                    person.created_at,
                    person.updated_at,
                    person.deleted_at,
                ),
            )
            return person

        return self._mutate(_do)

    def update_person(self, person: Person) -> Person:
        def _do() -> Person:
            updated = Person(
                id=person.id,
                given_names=person.given_names,
                call_name=person.call_name,
                surname_prefix=person.surname_prefix,
                surname=person.surname,
                sex=person.sex,
                is_living=person.is_living,
                notes=person.notes,
                created_at=person.created_at,
                updated_at=_now(),
                deleted_at=person.deleted_at,
            )
            self.db.execute(
                "UPDATE persons SET given_names=?, call_name=?, surname_prefix=?, "
                "surname=?, sex=?, is_living=?, notes=?, updated_at=?, deleted_at=? "
                "WHERE id=?",
                (
                    updated.given_names,
                    updated.call_name,
                    updated.surname_prefix,
                    updated.surname,
                    updated.sex.value,
                    1 if updated.is_living else 0,
                    updated.notes,
                    updated.updated_at,
                    updated.deleted_at,
                    updated.id,
                ),
            )
            return updated

        return self._mutate(_do)

    def soft_delete_person(self, person_id: str) -> bool:
        def _do() -> bool:
            cur = self.db.execute(
                "UPDATE persons SET deleted_at=?, updated_at=? "
                "WHERE id=? AND deleted_at IS NULL",
                (_now(), _now(), person_id),
            )
            return cur.rowcount > 0

        return self._mutate(_do)

    def restore_person(self, person_id: str) -> bool:
        def _do() -> bool:
            cur = self.db.execute(
                "UPDATE persons SET deleted_at=NULL, updated_at=? "
                "WHERE id=? AND deleted_at IS NOT NULL",
                (_now(), person_id),
            )
            return cur.rowcount > 0

        return self._mutate(_do)

    def force_delete_person(self, person_id: str) -> bool:
        def _do() -> bool:
            self.db.execute(
                "DELETE FROM parent_child WHERE parent_id=? OR child_id=?",
                (person_id, person_id),
            )
            self.db.execute("DELETE FROM union_partners WHERE person_id=?", (person_id,))
            self.db.execute(
                "DELETE FROM events WHERE subject_type='person' AND subject_id=?",
                (person_id,),
            )
            self.db.execute(
                "DELETE FROM citations WHERE subject_type='person' AND subject_id=?",
                (person_id,),
            )
            self.db.execute(
                "DELETE FROM external_refs WHERE entity_type='person' AND entity_id=?",
                (person_id,),
            )
            self.db.execute("DELETE FROM user_links WHERE person_id=?", (person_id,))
            cur = self.db.execute("DELETE FROM persons WHERE id=?", (person_id,))
            return cur.rowcount > 0

        return self._mutate(_do)

    # --- Unions ------------------------------------------------------------

    def get_union(self, union_id: str) -> Union | None:
        row = self.db.fetchone(
            "SELECT * FROM unions WHERE id=? AND deleted_at IS NULL", (union_id,)
        )
        return _row_union(row) if row else None

    def list_union_partners(self, union_id: str) -> list[UnionPartner]:
        rows = self.db.fetchall(
            "SELECT * FROM union_partners WHERE union_id=? ORDER BY position",
            (union_id,),
        )
        return [UnionPartner.from_dict(dict(r)) for r in rows]

    def add_union(
        self, union: Union, partners: list[tuple[str, int]]
    ) -> Union:
        def _do() -> Union:
            self.db.execute(
                "INSERT INTO unions (id, type, status, known_children_count, notes, "
                "created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    union.id,
                    union.type.value,
                    union.status.value,
                    union.known_children_count,
                    union.notes,
                    union.created_at,
                    union.updated_at,
                    union.deleted_at,
                ),
            )
            for person_id, position in partners:
                self.db.execute(
                    "INSERT INTO union_partners (id, union_id, person_id, position) "
                    "VALUES (?, ?, ?, ?)",
                    (new_id(), union.id, person_id, position),
                )
            return union

        return self._mutate(_do)

    def update_union(
        self,
        union: Union,
        partners: list[tuple[str, int]] | None = None,
    ) -> Union:
        def _do() -> Union:
            updated = Union(
                id=union.id,
                type=union.type,
                status=union.status,
                known_children_count=union.known_children_count,
                notes=union.notes,
                created_at=union.created_at,
                updated_at=_now(),
                deleted_at=union.deleted_at,
            )
            self.db.execute(
                "UPDATE unions SET type=?, status=?, known_children_count=?, notes=?, "
                "updated_at=?, deleted_at=? WHERE id=?",
                (
                    updated.type.value,
                    updated.status.value,
                    updated.known_children_count,
                    updated.notes,
                    updated.updated_at,
                    updated.deleted_at,
                    updated.id,
                ),
            )
            if partners is not None:
                self.db.execute(
                    "DELETE FROM union_partners WHERE union_id=?", (union.id,)
                )
                for person_id, position in partners:
                    self.db.execute(
                        "INSERT INTO union_partners (id, union_id, person_id, position) "
                        "VALUES (?, ?, ?, ?)",
                        (new_id(), union.id, person_id, position),
                    )
            return updated

        return self._mutate(_do)

    def soft_delete_union(self, union_id: str) -> bool:
        def _do() -> bool:
            cur = self.db.execute(
                "UPDATE unions SET deleted_at=?, updated_at=? "
                "WHERE id=? AND deleted_at IS NULL",
                (_now(), _now(), union_id),
            )
            return cur.rowcount > 0

        return self._mutate(_do)

    def list_unions_for_person(self, person_id: str) -> list[Union]:
        rows = self.db.fetchall(
            "SELECT u.* FROM unions u "
            "JOIN union_partners up ON up.union_id = u.id "
            "WHERE up.person_id=? AND u.deleted_at IS NULL "
            "ORDER BY u.created_at",
            (person_id,),
        )
        return [_row_union(r) for r in rows]

    # --- Parent–child ------------------------------------------------------

    def add_parent_child(self, link: ParentChild) -> ParentChild:
        def _do() -> ParentChild:
            self.db.execute(
                "INSERT INTO parent_child (id, parent_id, child_id, type, union_id) "
                "VALUES (?, ?, ?, ?, ?)",
                (link.id, link.parent_id, link.child_id, link.type.value, link.union_id),
            )
            return link

        return self._mutate(_do)

    def remove_parent_child(self, link_id: str) -> bool:
        def _do() -> bool:
            cur = self.db.execute("DELETE FROM parent_child WHERE id=?", (link_id,))
            return cur.rowcount > 0

        return self._mutate(_do)

    def list_parents(self, child_id: str) -> list[ParentChild]:
        rows = self.db.fetchall(
            "SELECT * FROM parent_child WHERE child_id=?", (child_id,)
        )
        return [ParentChild.from_dict(dict(r)) for r in rows]

    def list_children(self, parent_id: str) -> list[ParentChild]:
        rows = self.db.fetchall(
            "SELECT * FROM parent_child WHERE parent_id=?", (parent_id,)
        )
        return [ParentChild.from_dict(dict(r)) for r in rows]

    # --- Places ------------------------------------------------------------

    def list_places(self, *, search: str = "", limit: int = 50) -> list[Place]:
        if search:
            like = f"%{search}%"
            rows = self.db.fetchall(
                "SELECT * FROM places WHERE deleted_at IS NULL AND "
                "(name LIKE ? OR admin1 LIKE ? OR country LIKE ?) "
                "ORDER BY name LIMIT ?",
                (like, like, like, limit),
            )
        else:
            rows = self.db.fetchall(
                "SELECT * FROM places WHERE deleted_at IS NULL "
                "ORDER BY name LIMIT ?",
                (limit,),
            )
        return [_row_place(r) for r in rows]

    def get_place(self, place_id: str) -> Place | None:
        row = self.db.fetchone(
            "SELECT * FROM places WHERE id=? AND deleted_at IS NULL", (place_id,)
        )
        return _row_place(row) if row else None

    def find_place(
        self,
        name: str,
        *,
        admin1: str = "",
        country: str = "",
        latitude: float | None = None,
        longitude: float | None = None,
    ) -> Place | None:
        if latitude is not None and longitude is not None:
            row = self.db.fetchone(
                "SELECT * FROM places WHERE deleted_at IS NULL AND name=? "
                "AND ABS(COALESCE(latitude, 999)-?) < 0.0001 "
                "AND ABS(COALESCE(longitude, 999)-?) < 0.0001",
                (name, latitude, longitude),
            )
            if row:
                return _row_place(row)
        row = self.db.fetchone(
            "SELECT * FROM places WHERE deleted_at IS NULL AND name=? "
            "AND admin1=? AND country=?",
            (name, admin1, country),
        )
        return _row_place(row) if row else None

    def add_place(self, place: Place) -> Place:
        def _do() -> Place:
            self.db.execute(
                "INSERT INTO places (id, name, admin1, country, country_code, "
                "latitude, longitude, geonames_id, created_at, updated_at, deleted_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    place.id,
                    place.name,
                    place.admin1,
                    place.country,
                    place.country_code,
                    place.latitude,
                    place.longitude,
                    place.geonames_id,
                    place.created_at,
                    place.updated_at,
                    place.deleted_at,
                ),
            )
            return place

        return self._mutate(_do)

    def update_place(self, place: Place) -> Place:
        def _do() -> Place:
            updated = Place(
                id=place.id,
                name=place.name,
                admin1=place.admin1,
                country=place.country,
                country_code=place.country_code,
                latitude=place.latitude,
                longitude=place.longitude,
                geonames_id=place.geonames_id,
                created_at=place.created_at,
                updated_at=_now(),
                deleted_at=place.deleted_at,
            )
            self.db.execute(
                "UPDATE places SET name=?, admin1=?, country=?, country_code=?, "
                "latitude=?, longitude=?, geonames_id=?, updated_at=?, deleted_at=? "
                "WHERE id=?",
                (
                    updated.name,
                    updated.admin1,
                    updated.country,
                    updated.country_code,
                    updated.latitude,
                    updated.longitude,
                    updated.geonames_id,
                    updated.updated_at,
                    updated.deleted_at,
                    updated.id,
                ),
            )
            return updated

        return self._mutate(_do)

    # --- Events ------------------------------------------------------------

    def list_events(
        self, subject_type: SubjectType, subject_id: str
    ) -> list[Event]:
        rows = self.db.fetchall(
            "SELECT * FROM events WHERE subject_type=? AND subject_id=? "
            "AND deleted_at IS NULL ORDER BY sort_date IS NULL, sort_date, type",
            (subject_type.value, subject_id),
        )
        return [_row_event(r) for r in rows]

    def list_events_by_type(self, event_type: str) -> list[Event]:
        rows = self.db.fetchall(
            "SELECT * FROM events WHERE type=? AND deleted_at IS NULL",
            (event_type,),
        )
        return [_row_event(r) for r in rows]

    def add_event(self, event: Event) -> Event:
        def _do() -> Event:
            self.db.execute(
                "INSERT INTO events (id, subject_type, subject_id, type, place_id, "
                "date_text, date_qualifier, date_from, date_to, sort_date, description, "
                "created_at, updated_at, deleted_at) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    event.id,
                    event.subject_type.value,
                    event.subject_id,
                    event.type.value,
                    event.place_id,
                    event.date_text,
                    event.date_qualifier.value,
                    event.date_from,
                    event.date_to,
                    event.sort_date,
                    event.description,
                    event.created_at,
                    event.updated_at,
                    event.deleted_at,
                ),
            )
            return event

        return self._mutate(_do)

    def update_event(self, event: Event) -> Event:
        def _do() -> Event:
            updated = Event(
                id=event.id,
                subject_type=event.subject_type,
                subject_id=event.subject_id,
                type=event.type,
                place_id=event.place_id,
                date_text=event.date_text,
                date_qualifier=event.date_qualifier,
                date_from=event.date_from,
                date_to=event.date_to,
                sort_date=event.sort_date,
                description=event.description,
                created_at=event.created_at,
                updated_at=_now(),
                deleted_at=event.deleted_at,
            )
            self.db.execute(
                "UPDATE events SET place_id=?, date_text=?, date_qualifier=?, "
                "date_from=?, date_to=?, sort_date=?, description=?, type=?, "
                "updated_at=? WHERE id=?",
                (
                    updated.place_id,
                    updated.date_text,
                    updated.date_qualifier.value,
                    updated.date_from,
                    updated.date_to,
                    updated.sort_date,
                    updated.description,
                    updated.type.value,
                    updated.updated_at,
                    updated.id,
                ),
            )
            return updated

        return self._mutate(_do)

    def delete_event(self, event_id: str) -> bool:
        def _do() -> bool:
            cur = self.db.execute("DELETE FROM events WHERE id=?", (event_id,))
            return cur.rowcount > 0

        return self._mutate(_do)

    # --- Sources / citations -----------------------------------------------

    def list_sources(self, *, search: str = "", limit: int = 50) -> list[Source]:
        if search:
            like = f"%{search}%"
            rows = self.db.fetchall(
                "SELECT * FROM sources WHERE deleted_at IS NULL AND "
                "(title LIKE ? OR url LIKE ?) ORDER BY title LIMIT ?",
                (like, like, limit),
            )
        else:
            rows = self.db.fetchall(
                "SELECT * FROM sources WHERE deleted_at IS NULL "
                "ORDER BY title LIMIT ?",
                (limit,),
            )
        return [_row_source(r) for r in rows]

    def get_source(self, source_id: str) -> Source | None:
        row = self.db.fetchone(
            "SELECT * FROM sources WHERE id=? AND deleted_at IS NULL", (source_id,)
        )
        return _row_source(row) if row else None

    def find_source_by_url(self, url: str) -> Source | None:
        if not url:
            return None
        row = self.db.fetchone(
            "SELECT * FROM sources WHERE deleted_at IS NULL AND url=? LIMIT 1",
            (url,),
        )
        return _row_source(row) if row else None

    def find_source_by_title(self, title: str) -> Source | None:
        if not title:
            return None
        row = self.db.fetchone(
            "SELECT * FROM sources WHERE deleted_at IS NULL AND title=? LIMIT 1",
            (title,),
        )
        return _row_source(row) if row else None

    def add_source(self, source: Source) -> Source:
        def _do() -> Source:
            self.db.execute(
                "INSERT INTO sources (id, title, url, author, repository, notes, "
                "created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (
                    source.id,
                    source.title,
                    source.url,
                    source.author,
                    source.repository,
                    source.notes,
                    source.created_at,
                    source.updated_at,
                    source.deleted_at,
                ),
            )
            return source

        return self._mutate(_do)

    def add_citation(self, citation: Citation) -> Citation:
        def _do() -> Citation:
            self.db.execute(
                "INSERT INTO citations (id, source_id, subject_type, subject_id, detail) "
                "VALUES (?, ?, ?, ?, ?)",
                (
                    citation.id,
                    citation.source_id,
                    citation.subject_type.value,
                    citation.subject_id,
                    citation.detail,
                ),
            )
            return citation

        return self._mutate(_do)

    def list_citations(
        self, subject_type: SubjectType, subject_id: str
    ) -> list[dict[str, Any]]:
        rows = self.db.fetchall(
            "SELECT c.*, s.title AS source_title, s.url AS source_url "
            "FROM citations c JOIN sources s ON s.id = c.source_id "
            "WHERE c.subject_type=? AND c.subject_id=?",
            (subject_type.value, subject_id),
        )
        return [dict(r) for r in rows]

    # --- External refs / user links ----------------------------------------

    def set_external_ref(
        self, entity_type: str, entity_id: str, system: str, external_id: str
    ) -> ExternalRef:
        def _do() -> ExternalRef:
            existing = self.db.fetchone(
                "SELECT * FROM external_refs WHERE system=? AND external_id=? "
                "AND entity_type=?",
                (system, external_id, entity_type),
            )
            if existing:
                self.db.execute(
                    "UPDATE external_refs SET entity_id=? WHERE id=?",
                    (entity_id, existing["id"]),
                )
                return ExternalRef(
                    id=existing["id"],
                    entity_type=entity_type,
                    entity_id=entity_id,
                    system=system,
                    external_id=external_id,
                )
            ref = ExternalRef(
                entity_type=entity_type,
                entity_id=entity_id,
                system=system,
                external_id=external_id,
            )
            self.db.execute(
                "INSERT INTO external_refs (id, entity_type, entity_id, system, "
                "external_id) VALUES (?, ?, ?, ?, ?)",
                (ref.id, entity_type, entity_id, system, external_id),
            )
            return ref

        return self._mutate(_do)

    def get_by_external_ref(
        self, system: str, external_id: str, entity_type: str
    ) -> str | None:
        row = self.db.fetchone(
            "SELECT entity_id FROM external_refs WHERE system=? AND external_id=? "
            "AND entity_type=?",
            (system, external_id, entity_type),
        )
        return str(row["entity_id"]) if row else None

    def list_external_refs(
        self, entity_type: str, entity_id: str
    ) -> list[ExternalRef]:
        rows = self.db.fetchall(
            "SELECT * FROM external_refs WHERE entity_type=? AND entity_id=?",
            (entity_type, entity_id),
        )
        return [
            ExternalRef(
                id=r["id"],
                entity_type=r["entity_type"],
                entity_id=r["entity_id"],
                system=r["system"],
                external_id=r["external_id"],
            )
            for r in rows
        ]

    def set_user_link(self, ha_user_id: str, person_id: str) -> UserLink:
        def _do() -> UserLink:
            existing = self.db.fetchone(
                "SELECT id FROM user_links WHERE ha_user_id=?", (ha_user_id,)
            )
            if existing:
                self.db.execute(
                    "UPDATE user_links SET person_id=? WHERE ha_user_id=?",
                    (person_id, ha_user_id),
                )
                return UserLink(
                    id=existing["id"], ha_user_id=ha_user_id, person_id=person_id
                )
            link = UserLink(ha_user_id=ha_user_id, person_id=person_id)
            self.db.execute(
                "INSERT INTO user_links (id, ha_user_id, person_id) VALUES (?, ?, ?)",
                (link.id, ha_user_id, person_id),
            )
            return link

        return self._mutate(_do)

    def get_user_link(self, ha_user_id: str) -> UserLink | None:
        row = self.db.fetchone(
            "SELECT * FROM user_links WHERE ha_user_id=?", (ha_user_id,)
        )
        if not row:
            return None
        return UserLink(
            id=row["id"], ha_user_id=row["ha_user_id"], person_id=row["person_id"]
        )

    def list_user_links(self) -> list[UserLink]:
        rows = self.db.fetchall("SELECT * FROM user_links")
        return [
            UserLink(id=r["id"], ha_user_id=r["ha_user_id"], person_id=r["person_id"])
            for r in rows
        ]

    def clear_all(self) -> None:
        """Delete all family data (replace-import)."""

        def _do() -> None:
            for table in (
                "citations",
                "external_refs",
                "user_links",
                "events",
                "parent_child",
                "union_partners",
                "unions",
                "persons",
                "places",
                "sources",
            ):
                self.db.execute(f"DELETE FROM {table}")

        self._mutate(_do)

    def import_batch(self, fn: Callable[[], Any]) -> Any:
        """Run multiple writes in one transaction + single revision bump."""
        return self._mutate(fn)
