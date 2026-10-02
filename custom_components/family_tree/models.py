"""Domain models for Family Tree."""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import UTC, datetime
from enum import StrEnum
from typing import Any
from uuid import uuid4


def _utc_now_iso() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat()


def new_id() -> str:
    """Return a new uuid4 hex id."""
    return uuid4().hex


class Sex(StrEnum):
    """Biological / recorded sex."""

    MALE = "male"
    FEMALE = "female"
    INTERSEX = "intersex"
    UNKNOWN = "unknown"


class UnionType(StrEnum):
    """Type of partnership / union."""

    MARRIAGE = "marriage"
    REGISTERED_PARTNERSHIP = "registered_partnership"
    COHABITATION = "cohabitation"
    ENGAGEMENT = "engagement"
    UNKNOWN = "unknown"


class UnionStatus(StrEnum):
    """Current status of a union."""

    ONGOING = "ongoing"
    DIVORCED = "divorced"
    SEPARATED = "separated"
    WIDOWED = "widowed"


class ParentChildType(StrEnum):
    """How a parent relates to a child."""

    BIOLOGICAL = "biological"
    ADOPTIVE = "adoptive"
    FOSTER = "foster"
    STEP = "step"
    GUARDIAN = "guardian"
    UNKNOWN = "unknown"


class EventType(StrEnum):
    """Genealogy event types."""

    BIRTH = "birth"
    BAPTISM = "baptism"
    DEATH = "death"
    BURIAL = "burial"
    MARRIAGE = "marriage"
    DIVORCE = "divorce"
    PARTNERSHIP = "partnership"
    OCCUPATION = "occupation"
    RESIDENCE = "residence"


# Life events a person can only have once.
UNIQUE_PERSON_EVENT_TYPES: frozenset[EventType] = frozenset(
    {EventType.BIRTH, EventType.BAPTISM, EventType.DEATH, EventType.BURIAL}
)


class DateQualifier(StrEnum):
    """GEDCOM-style date qualifier."""

    EXACT = "exact"
    ABOUT = "about"
    BEFORE = "before"
    AFTER = "after"
    BETWEEN = "between"
    FROM_TO = "from_to"
    ESTIMATED = "estimated"
    CALCULATED = "calculated"


class SubjectType(StrEnum):
    """Polymorphic subject for events and citations."""

    PERSON = "person"
    UNION = "union"


@dataclass(frozen=True, slots=True)
class Person:
    """A person in the family tree."""

    given_names: str = ""
    call_name: str = ""
    surname_prefix: str = ""
    surname: str = ""
    sex: Sex = Sex.UNKNOWN
    is_living: bool = True
    notes: str = ""
    id: str = field(default_factory=new_id)
    created_at: str = field(default_factory=_utc_now_iso)
    updated_at: str = field(default_factory=_utc_now_iso)
    deleted_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["sex"] = self.sex.value
        return data

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Person:
        return cls(
            id=str(raw["id"]),
            given_names=str(raw.get("given_names") or ""),
            call_name=str(raw.get("call_name") or ""),
            surname_prefix=str(raw.get("surname_prefix") or ""),
            surname=str(raw.get("surname") or ""),
            sex=Sex(str(raw.get("sex") or Sex.UNKNOWN.value)),
            is_living=bool(raw.get("is_living", True)),
            notes=str(raw.get("notes") or ""),
            created_at=str(raw.get("created_at") or _utc_now_iso()),
            updated_at=str(raw.get("updated_at") or _utc_now_iso()),
            deleted_at=raw.get("deleted_at"),
        )


@dataclass(frozen=True, slots=True)
class Union:
    """A partnership between people (marriage, cohabitation, …)."""

    type: UnionType = UnionType.UNKNOWN
    status: UnionStatus = UnionStatus.ONGOING
    known_children_count: int | None = None
    notes: str = ""
    id: str = field(default_factory=new_id)
    created_at: str = field(default_factory=_utc_now_iso)
    updated_at: str = field(default_factory=_utc_now_iso)
    deleted_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["type"] = self.type.value
        data["status"] = self.status.value
        return data

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Union:
        return cls(
            id=str(raw["id"]),
            type=UnionType(str(raw.get("type") or UnionType.UNKNOWN.value)),
            status=UnionStatus(str(raw.get("status") or UnionStatus.ONGOING.value)),
            known_children_count=raw.get("known_children_count"),
            notes=str(raw.get("notes") or ""),
            created_at=str(raw.get("created_at") or _utc_now_iso()),
            updated_at=str(raw.get("updated_at") or _utc_now_iso()),
            deleted_at=raw.get("deleted_at"),
        )


@dataclass(frozen=True, slots=True)
class UnionPartner:
    """A partner in a union with display order."""

    union_id: str
    person_id: str
    position: int = 0
    id: str = field(default_factory=new_id)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> UnionPartner:
        return cls(
            id=str(raw.get("id") or new_id()),
            union_id=str(raw["union_id"]),
            person_id=str(raw["person_id"]),
            position=int(raw.get("position") or 0),
        )


@dataclass(frozen=True, slots=True)
class ParentChild:
    """A parent–child link."""

    parent_id: str
    child_id: str
    type: ParentChildType = ParentChildType.BIOLOGICAL
    union_id: str | None = None
    id: str = field(default_factory=new_id)

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["type"] = self.type.value
        return data

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> ParentChild:
        return cls(
            id=str(raw.get("id") or new_id()),
            parent_id=str(raw["parent_id"]),
            child_id=str(raw["child_id"]),
            type=ParentChildType(
                str(raw.get("type") or ParentChildType.BIOLOGICAL.value)
            ),
            union_id=raw.get("union_id"),
        )


@dataclass(frozen=True, slots=True)
class Place:
    """A geographic place."""

    name: str
    admin1: str = ""
    country: str = ""
    country_code: str = ""
    latitude: float | None = None
    longitude: float | None = None
    geonames_id: int | None = None
    id: str = field(default_factory=new_id)
    created_at: str = field(default_factory=_utc_now_iso)
    updated_at: str = field(default_factory=_utc_now_iso)
    deleted_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Place:
        return cls(
            id=str(raw["id"]),
            name=str(raw.get("name") or ""),
            admin1=str(raw.get("admin1") or ""),
            country=str(raw.get("country") or ""),
            country_code=str(raw.get("country_code") or ""),
            latitude=raw.get("latitude"),
            longitude=raw.get("longitude"),
            geonames_id=raw.get("geonames_id"),
            created_at=str(raw.get("created_at") or _utc_now_iso()),
            updated_at=str(raw.get("updated_at") or _utc_now_iso()),
            deleted_at=raw.get("deleted_at"),
        )


@dataclass(frozen=True, slots=True)
class Event:
    """A genealogy event attached to a person or union."""

    subject_type: SubjectType
    subject_id: str
    type: EventType
    place_id: str | None = None
    date_text: str = ""
    date_qualifier: DateQualifier = DateQualifier.EXACT
    date_from: str | None = None
    date_to: str | None = None
    sort_date: str | None = None
    description: str = ""
    id: str = field(default_factory=new_id)
    created_at: str = field(default_factory=_utc_now_iso)
    updated_at: str = field(default_factory=_utc_now_iso)
    deleted_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["subject_type"] = self.subject_type.value
        data["type"] = self.type.value
        data["date_qualifier"] = self.date_qualifier.value
        return data

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Event:
        return cls(
            id=str(raw.get("id") or new_id()),
            subject_type=SubjectType(str(raw["subject_type"])),
            subject_id=str(raw["subject_id"]),
            type=EventType(str(raw["type"])),
            place_id=raw.get("place_id"),
            date_text=str(raw.get("date_text") or ""),
            date_qualifier=DateQualifier(
                str(raw.get("date_qualifier") or DateQualifier.EXACT.value)
            ),
            date_from=raw.get("date_from"),
            date_to=raw.get("date_to"),
            sort_date=raw.get("sort_date"),
            description=str(raw.get("description") or ""),
            created_at=str(raw.get("created_at") or _utc_now_iso()),
            updated_at=str(raw.get("updated_at") or _utc_now_iso()),
            deleted_at=raw.get("deleted_at"),
        )


@dataclass(frozen=True, slots=True)
class Source:
    """A bibliographic / archival source."""

    title: str = ""
    url: str = ""
    author: str = ""
    repository: str = ""
    notes: str = ""
    id: str = field(default_factory=new_id)
    created_at: str = field(default_factory=_utc_now_iso)
    updated_at: str = field(default_factory=_utc_now_iso)
    deleted_at: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Source:
        return cls(
            id=str(raw["id"]),
            title=str(raw.get("title") or ""),
            url=str(raw.get("url") or ""),
            author=str(raw.get("author") or ""),
            repository=str(raw.get("repository") or ""),
            notes=str(raw.get("notes") or ""),
            created_at=str(raw.get("created_at") or _utc_now_iso()),
            updated_at=str(raw.get("updated_at") or _utc_now_iso()),
            deleted_at=raw.get("deleted_at"),
        )


@dataclass(frozen=True, slots=True)
class Citation:
    """A citation of a source for a subject."""

    source_id: str
    subject_type: SubjectType
    subject_id: str
    detail: str = ""
    id: str = field(default_factory=new_id)

    def to_dict(self) -> dict[str, Any]:
        data = asdict(self)
        data["subject_type"] = self.subject_type.value
        return data

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> Citation:
        return cls(
            id=str(raw.get("id") or new_id()),
            source_id=str(raw["source_id"]),
            subject_type=SubjectType(str(raw["subject_type"])),
            subject_id=str(raw["subject_id"]),
            detail=str(raw.get("detail") or ""),
        )


@dataclass(frozen=True, slots=True)
class ExternalRef:
    """Maps an entity to an external id (GEDCOM xref, …)."""

    entity_type: str
    entity_id: str
    system: str
    external_id: str
    id: str = field(default_factory=new_id)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True, slots=True)
class UserLink:
    """Links a Home Assistant user to a person (for lineage indicator)."""

    ha_user_id: str
    person_id: str
    id: str = field(default_factory=new_id)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)
