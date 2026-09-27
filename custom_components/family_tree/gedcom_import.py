"""GEDCOM 5.5.1 import into the Family Tree model."""

from __future__ import annotations

import contextlib
import logging
import re
from dataclasses import dataclass, field
from typing import Any

from .dates import parse_gedcom_date
from .models import (
    Citation,
    Event,
    EventType,
    ParentChild,
    ParentChildType,
    Person,
    Place,
    Sex,
    Source,
    SubjectType,
    Union,
    UnionStatus,
    UnionType,
    new_id,
)
from .names import split_surname
from .repository import Repository

_LOGGER = logging.getLogger(__name__)

_SYSTEM = "gedcom"

_SEX_MAP = {"M": Sex.MALE, "F": Sex.FEMALE, "U": Sex.UNKNOWN, "X": Sex.INTERSEX}
_PEDI_MAP = {
    "birth": ParentChildType.BIOLOGICAL,
    "adopted": ParentChildType.ADOPTIVE,
    "foster": ParentChildType.FOSTER,
}

_EVENT_TAGS = {
    "BIRT": EventType.BIRTH,
    "BAPM": EventType.BAPTISM,
    "CHR": EventType.BAPTISM,
    "DEAT": EventType.DEATH,
    "BURI": EventType.BURIAL,
    "MARR": EventType.MARRIAGE,
    "DIV": EventType.DIVORCE,
    "OCCU": EventType.OCCUPATION,
    "RESI": EventType.RESIDENCE,
}


@dataclass
class ImportReport:
    """Summary of a GEDCOM import run."""

    persons: int = 0
    unions: int = 0
    places: int = 0
    sources: int = 0
    events: int = 0
    parent_child: int = 0
    citations: int = 0
    skipped_tags: list[str] = field(default_factory=list)
    unparseable_dates: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "persons": self.persons,
            "unions": self.unions,
            "places": self.places,
            "sources": self.sources,
            "events": self.events,
            "parent_child": self.parent_child,
            "citations": self.citations,
            "skipped_tags": sorted(set(self.skipped_tags)),
            "unparseable_dates": self.unparseable_dates[:50],
            "warnings": self.warnings[:50],
        }


@dataclass
class _Line:
    level: int
    tag: str
    value: str
    xref: str | None = None


def _parse_lines(text: str) -> list[_Line]:
    lines: list[_Line] = []
    for raw in text.splitlines():
        raw = raw.rstrip("\r\n")
        if not raw.strip():
            continue
        parts = raw.split(" ", 2)
        if len(parts) < 2:
            continue
        try:
            level = int(parts[0])
        except ValueError:
            continue
        second = parts[1]
        rest = parts[2] if len(parts) > 2 else ""
        if second.startswith("@") and second.endswith("@"):
            xref = second
            tag_and_val = rest.split(" ", 1)
            tag = tag_and_val[0] if tag_and_val else ""
            value = tag_and_val[1] if len(tag_and_val) > 1 else ""
            lines.append(_Line(level, tag, value, xref))
        else:
            lines.append(_Line(level, second, rest, None))
    return lines


def _records(lines: list[_Line]) -> list[list[_Line]]:
    records: list[list[_Line]] = []
    current: list[_Line] = []
    for line in lines:
        if line.level == 0 and current:
            records.append(current)
            current = [line]
        else:
            current.append(line)
    if current:
        records.append(current)
    return records


def _child_map(record: list[_Line]) -> dict[str, list[_Line]]:
    """Group level-1 tags with their contiguous level>1 children."""
    groups: dict[str, list[_Line]] = {}
    i = 1  # skip level-0
    while i < len(record):
        line = record[i]
        if line.level != 1:
            i += 1
            continue
        key = line.tag
        block = [line]
        i += 1
        while i < len(record) and record[i].level > 1:
            block.append(record[i])
            i += 1
        groups.setdefault(key, []).append(block[0])
        # Attach sub-lines onto a synthetic container via side channel
        block[0].value = block[0].value  # noqa: B018 — keep lint calm
        block[0]._children = block[1:]
    return groups


def _subs(line: _Line) -> list[_Line]:
    return getattr(line, "_children", [])


def _sub_value(line: _Line, tag: str) -> str | None:
    for child in _subs(line):
        if child.tag == tag and child.level == line.level + 1:
            return child.value
    return None


def _sub_block(line: _Line, tag: str) -> _Line | None:
    for child in _subs(line):
        if child.tag == tag and child.level == line.level + 1:
            return child
    return None


def _extract_quoted_nick(given: str) -> tuple[str, str]:
    """Pull ``"Nick"`` / ``'Nick'`` out of a given-name string."""
    match = re.search(r'["\u201c\u201d]([^"\u201c\u201d]+)["\u201c\u201d]', given)
    if not match:
        match = re.search(r"'([^']+)'", given)
    if not match:
        return given.strip(), ""
    nick = match.group(1).strip()
    cleaned = (given[: match.start()] + given[match.end() :]).strip()
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" ,")
    return cleaned, nick


def _parse_name(value: str) -> tuple[str, str, str, str]:
    """Return given_names, surname_prefix, surname, call_name from a NAME value."""
    # GEDCOM: Given /Surname/ or Given "Nick" /prefix Surname/
    match = re.match(r"^(.*?)\s*/([^/]*)/\s*(.*)$", value.strip())
    if not match:
        given, nick = _extract_quoted_nick(value.strip())
        return given, "", "", nick
    given_raw = match.group(1).strip()
    surname_raw = match.group(2).strip()
    given, nick = _extract_quoted_nick(given_raw)
    prefix, surname = split_surname(surname_raw)
    return given, prefix, surname, nick


def preview_gedcom(text: str) -> ImportReport:
    """Parse GEDCOM and return counts without writing to the repository."""
    report = ImportReport()
    places: set[str] = set()
    lines = _parse_lines(text)
    for record in _records(lines):
        if not record:
            continue
        tag = record[0].tag
        groups = _child_map(record)
        if tag == "INDI":
            report.persons += 1
            for event_tag in _EVENT_TAGS:
                if event_tag in ("MARR", "DIV"):
                    continue
                if event_tag in groups:
                    report.events += len(groups[event_tag])
                    for block in groups[event_tag]:
                        plac = _sub_value(block, "PLAC")
                        if plac:
                            places.add(plac.strip().casefold())
        elif tag == "FAM":
            report.unions += 1
            if "CHIL" in groups:
                report.parent_child += len(groups["CHIL"])
            for event_tag in ("MARR", "DIV"):
                if event_tag in groups:
                    report.events += len(groups[event_tag])
                    for block in groups[event_tag]:
                        plac = _sub_value(block, "PLAC")
                        if plac:
                            places.add(plac.strip().casefold())
        elif tag == "SOUR":
            report.sources += 1
    report.places = len(places)
    return report


def _coord(value: str | None) -> float | None:
    if not value:
        return None
    text = value.strip().upper()
    # GEDCOM: N51.5 or E4.2 or plain float
    sign = 1.0
    if text[0] in "NSWE":
        if text[0] in "SW":
            sign = -1.0
        text = text[1:]
    try:
        return sign * float(text)
    except ValueError:
        return None


class GedcomImporter:
    """Import a GEDCOM document into a Repository."""

    def __init__(self, repo: Repository) -> None:
        self.repo = repo
        self.report = ImportReport()
        self._indi: dict[str, str] = {}  # xref -> person id
        self._fam: dict[str, str] = {}
        self._sour: dict[str, str] = {}
        self._place_cache: dict[str, str] = {}

    def import_text(self, text: str, *, replace: bool = False) -> ImportReport:
        def _run() -> ImportReport:
            if replace:
                self.repo.clear_all()

            lines = _parse_lines(text)
            records = _records(lines)

            # First pass: sources
            for record in records:
                if not record or record[0].tag != "SOUR":
                    continue
                self._import_source(record)

            # Second: individuals
            for record in records:
                if not record or record[0].tag != "INDI":
                    continue
                self._import_indi(record)

            # Third: families
            for record in records:
                if not record or record[0].tag != "FAM":
                    continue
                self._import_fam(record)

            return self.report

        return self.repo.import_batch(_run)

    def _resolve_person(self, xref: str | None) -> str | None:
        if not xref:
            return None
        existing = self.repo.get_by_external_ref(_SYSTEM, xref, "person")
        if existing:
            self._indi[xref] = existing
            return existing
        return self._indi.get(xref)

    def _import_source(self, record: list[_Line]) -> None:
        xref = record[0].xref or new_id()
        existing_id = self.repo.get_by_external_ref(_SYSTEM, xref, "source")
        groups = _child_map(record)
        title = ""
        url = ""
        author = ""
        repository = ""
        notes = ""
        if "TITL" in groups:
            title = groups["TITL"][0].value
        if "WWW" in groups:
            url = groups["WWW"][0].value
        if "AUTH" in groups:
            author = groups["AUTH"][0].value
        if "PUBL" in groups:
            repository = groups["PUBL"][0].value
        if "NOTE" in groups:
            notes = groups["NOTE"][0].value

        if existing_id:
            self._sour[xref] = existing_id
            return

        found = None
        if url:
            found = self.repo.find_source_by_url(url)
        if not found and title:
            found = self.repo.find_source_by_title(title)
        if found:
            source_id = found.id
        else:
            source = Source(title=title, url=url, author=author, repository=repository, notes=notes)
            self.repo.add_source(source)
            source_id = source.id
            self.report.sources += 1
        self.repo.set_external_ref("source", source_id, _SYSTEM, xref)
        self._sour[xref] = source_id

    def _ensure_place(
        self,
        name: str,
        *,
        latitude: float | None = None,
        longitude: float | None = None,
    ) -> str | None:
        if not name:
            return None
        # GEDCOM places often "City, Province, Country"
        parts = [p.strip() for p in name.split(",")]
        city = parts[0] if parts else name
        admin1 = parts[1] if len(parts) > 1 else ""
        country = parts[-1] if len(parts) > 2 else (parts[1] if len(parts) == 2 else "")
        cache_key = f"{city}|{admin1}|{country}|{latitude}|{longitude}"
        if cache_key in self._place_cache:
            return self._place_cache[cache_key]
        found = self.repo.find_place(
            city, admin1=admin1, country=country, latitude=latitude, longitude=longitude
        )
        if found:
            self._place_cache[cache_key] = found.id
            return found.id
        place = Place(
            name=city,
            admin1=admin1,
            country=country,
            latitude=latitude,
            longitude=longitude,
        )
        self.repo.add_place(place)
        self.report.places += 1
        self._place_cache[cache_key] = place.id
        return place.id

    def _event_from_block(
        self,
        block: _Line,
        event_type: EventType,
        subject_type: SubjectType,
        subject_id: str,
    ) -> None:
        date_text = _sub_value(block, "DATE") or ""
        plac = _sub_value(block, "PLAC") or ""
        lat = lon = None
        map_block = _sub_block(block, "MAP")
        if map_block:
            lat = _coord(_sub_value(map_block, "LATI"))
            lon = _coord(_sub_value(map_block, "LONG"))
        place_id = self._ensure_place(plac, latitude=lat, longitude=lon) if plac else None
        parsed = parse_gedcom_date(date_text)
        if date_text and not parsed.sort_date and not parsed.date_from:
            self.report.unparseable_dates.append(date_text)
        description = block.value if event_type == EventType.OCCUPATION else (
            _sub_value(block, "NOTE") or ""
        )
        # DEAT Y with no date
        if event_type == EventType.DEATH and block.value.upper() == "Y" and not date_text:
            date_text = ""
        event = Event(
            subject_type=subject_type,
            subject_id=subject_id,
            type=event_type,
            place_id=place_id,
            date_text=parsed.date_text or date_text,
            date_qualifier=parsed.qualifier,
            date_from=parsed.date_from,
            date_to=parsed.date_to,
            sort_date=parsed.sort_date,
            description=description or "",
        )
        self.repo.add_event(event)
        self.report.events += 1

    def _import_indi(self, record: list[_Line]) -> None:
        xref = record[0].xref or new_id()
        existing_id = self.repo.get_by_external_ref(_SYSTEM, xref, "person")
        groups = _child_map(record)

        given = surname_prefix = surname = call_name = ""
        if "NAME" in groups:
            name_line = groups["NAME"][0]
            given, surname_prefix, surname, call_name = _parse_name(name_line.value)
            givn = _sub_value(name_line, "GIVN")
            surn = _sub_value(name_line, "SURN")
            spfx = _sub_value(name_line, "SPFX")
            if givn:
                given = givn
            if surn:
                surname = surn
            if spfx:
                surname_prefix = spfx
            elif surname and not surname_prefix:
                surname_prefix, surname = split_surname(surname)
            nick = _sub_value(name_line, "NICK")
            if nick:
                call_name = nick
            ruf = _sub_value(name_line, "_RUFNAME")
            if ruf and not call_name:
                call_name = ruf

        # INDI-level name parts (some exporters put these beside NAME, not under it)
        if "GIVN" in groups and groups["GIVN"][0].value.strip():
            given = groups["GIVN"][0].value.strip()
        if "SURN" in groups and groups["SURN"][0].value.strip():
            surname = groups["SURN"][0].value.strip()
        if "SPFX" in groups and groups["SPFX"][0].value.strip():
            surname_prefix = groups["SPFX"][0].value.strip()
        elif surname and not surname_prefix:
            surname_prefix, surname = split_surname(surname)
        if "NICK" in groups and groups["NICK"][0].value.strip():
            call_name = groups["NICK"][0].value.strip()
        if "_RUFNAME" in groups and groups["_RUFNAME"][0].value.strip() and not call_name:
            call_name = groups["_RUFNAME"][0].value.strip()

        sex = Sex.UNKNOWN
        if "SEX" in groups:
            sex = _SEX_MAP.get(groups["SEX"][0].value.upper()[:1], Sex.UNKNOWN)

        notes = groups["NOTE"][0].value if "NOTE" in groups else ""
        is_living = True
        if "DEAT" in groups:
            is_living = False

        if existing_id:
            person = self.repo.get_person(existing_id, include_deleted=True)
            if person:
                updated = Person(
                    id=person.id,
                    given_names=given or person.given_names,
                    call_name=call_name or person.call_name,
                    surname_prefix=surname_prefix or person.surname_prefix,
                    surname=surname or person.surname,
                    sex=sex if sex != Sex.UNKNOWN else person.sex,
                    is_living=is_living,
                    notes=notes or person.notes,
                    created_at=person.created_at,
                    updated_at=person.updated_at,
                    deleted_at=person.deleted_at,
                )
                self.repo.update_person(updated)
                person_id = person.id
            else:
                person_id = existing_id
        else:
            person = Person(
                given_names=given,
                call_name=call_name,
                surname_prefix=surname_prefix,
                surname=surname,
                sex=sex,
                is_living=is_living,
                notes=notes,
            )
            self.repo.add_person(person)
            person_id = person.id
            self.report.persons += 1
            self.repo.set_external_ref("person", person_id, _SYSTEM, xref)

        self._indi[xref] = person_id

        for tag, event_type in _EVENT_TAGS.items():
            if tag in ("MARR", "DIV"):
                continue
            if tag not in groups:
                continue
            for block in groups[tag]:
                self._event_from_block(
                    block, event_type, SubjectType.PERSON, person_id
                )

        # Inline source citations
        if "SOUR" in groups:
            for block in groups["SOUR"]:
                sour_xref = block.value or (block.xref or "")
                # value like @S1@
                source_id = self._sour.get(sour_xref) or self.repo.get_by_external_ref(
                    _SYSTEM, sour_xref, "source"
                )
                if not source_id:
                    continue
                detail = _sub_value(block, "PAGE") or ""
                self.repo.add_citation(
                    Citation(
                        source_id=source_id,
                        subject_type=SubjectType.PERSON,
                        subject_id=person_id,
                        detail=detail,
                    )
                )
                self.report.citations += 1

    def _import_fam(self, record: list[_Line]) -> None:
        xref = record[0].xref or new_id()
        existing_id = self.repo.get_by_external_ref(_SYSTEM, xref, "union")
        groups = _child_map(record)

        husb = groups["HUSB"][0].value if "HUSB" in groups else None
        wife = groups["WIFE"][0].value if "WIFE" in groups else None
        partner_xrefs = [x for x in (husb, wife) if x]
        partner_ids: list[str] = []
        for px in partner_xrefs:
            pid = self._resolve_person(px)
            if pid:
                partner_ids.append(pid)

        union_type = UnionType.UNKNOWN
        status = UnionStatus.ONGOING
        if "MARR" in groups:
            union_type = UnionType.MARRIAGE
        if "DIV" in groups:
            status = UnionStatus.DIVORCED

        known_children = None
        if "NCHI" in groups:
            with contextlib.suppress(ValueError):
                known_children = int(groups["NCHI"][0].value)

        if existing_id:
            union_id = existing_id
            union = self.repo.get_union(union_id)
            if union:
                self.repo.update_union(
                    Union(
                        id=union.id,
                        type=union_type if union_type != UnionType.UNKNOWN else union.type,
                        status=status,
                        known_children_count=known_children
                        if known_children is not None
                        else union.known_children_count,
                        notes=union.notes,
                        created_at=union.created_at,
                        updated_at=union.updated_at,
                    ),
                    partners=[(pid, i) for i, pid in enumerate(partner_ids)],
                )
        else:
            union = Union(
                type=union_type,
                status=status,
                known_children_count=known_children,
            )
            self.repo.add_union(
                union, partners=[(pid, i) for i, pid in enumerate(partner_ids)]
            )
            union_id = union.id
            self.report.unions += 1
            self.repo.set_external_ref("union", union_id, _SYSTEM, xref)

        self._fam[xref] = union_id

        for tag, event_type in (("MARR", EventType.MARRIAGE), ("DIV", EventType.DIVORCE)):
            if tag not in groups:
                continue
            for block in groups[tag]:
                self._event_from_block(
                    block, event_type, SubjectType.UNION, union_id
                )

        # Children
        chil_blocks = groups.get("CHIL", [])
        for block in chil_blocks:
            child_xref = block.value
            child_id = self._resolve_person(child_xref)
            if not child_id:
                self.report.warnings.append(f"Missing child {child_xref} for {xref}")
                continue
            pedi = (_sub_value(block, "PEDI") or "birth").lower()
            link_type = _PEDI_MAP.get(pedi, ParentChildType.BIOLOGICAL)
            for parent_id in partner_ids:
                # Avoid duplicate unique constraint
                existing = [
                    link
                    for link in self.repo.list_parents(child_id)
                    if link.parent_id == parent_id
                ]
                if existing:
                    continue
                self.repo.add_parent_child(
                    ParentChild(
                        parent_id=parent_id,
                        child_id=child_id,
                        type=link_type,
                        union_id=union_id,
                    )
                )
                self.report.parent_child += 1
