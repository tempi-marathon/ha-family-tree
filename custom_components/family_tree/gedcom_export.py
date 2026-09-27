"""GEDCOM 5.5.1 export from the Family Tree model."""

from __future__ import annotations

from .db import Database
from .models import EventType, ParentChildType, Person, Sex, SubjectType

_SEX_OUT = {
    Sex.MALE: "M",
    Sex.FEMALE: "F",
    Sex.INTERSEX: "X",
    Sex.UNKNOWN: "U",
}

_EVENT_TAG = {
    EventType.BIRTH: "BIRT",
    EventType.BAPTISM: "BAPM",
    EventType.DEATH: "DEAT",
    EventType.BURIAL: "BURI",
    EventType.MARRIAGE: "MARR",
    EventType.DIVORCE: "DIV",
    EventType.OCCUPATION: "OCCU",
    EventType.RESIDENCE: "RESI",
}

_PEDI_OUT = {
    ParentChildType.BIOLOGICAL: "birth",
    ParentChildType.ADOPTIVE: "adopted",
    ParentChildType.FOSTER: "foster",
}


def _xref(prefix: str, index: int) -> str:
    return f"@{prefix}{index}@"


def _fmt_coord(lat: float | None, lon: float | None) -> list[str]:
    if lat is None or lon is None:
        return []
    ns = "N" if lat >= 0 else "S"
    ew = "E" if lon >= 0 else "W"
    return [
        "2 MAP",
        f"3 LATI {ns}{abs(lat)}",
        f"3 LONG {ew}{abs(lon)}",
    ]


def export_gedcom(db: Database) -> str:
    """Serialize the database to a GEDCOM 5.5.1 string."""
    lines: list[str] = [
        "0 HEAD",
        "1 SOUR HA-FAMILY-TREE",
        "2 NAME Family Tree for Home Assistant",
        "2 VERS 0.1.0",
        "1 GEDC",
        "2 VERS 5.5.1",
        "2 FORM LINEAGE-LINKED",
        "1 CHAR UTF-8",
    ]

    # Sources
    sources = db.fetchall(
        "SELECT * FROM sources WHERE deleted_at IS NULL ORDER BY title"
    )
    source_xref: dict[str, str] = {}
    for i, row in enumerate(sources, start=1):
        xref = _xref("S", i)
        source_xref[row["id"]] = xref
        lines.append(f"0 {xref} SOUR")
        if row["title"]:
            lines.append(f"1 TITL {row['title']}")
        if row["author"]:
            lines.append(f"1 AUTH {row['author']}")
        if row["repository"]:
            lines.append(f"1 PUBL {row['repository']}")
        if row["url"]:
            lines.append(f"1 WWW {row['url']}")
        if row["notes"]:
            lines.append(f"1 NOTE {row['notes']}")

    persons = db.fetchall(
        "SELECT * FROM persons WHERE deleted_at IS NULL "
        "ORDER BY surname, given_names"
    )
    person_xref: dict[str, str] = {}
    for i, row in enumerate(persons, start=1):
        person_xref[row["id"]] = _xref("I", i)

    # Preload fam membership for FAMS/FAMC
    unions = db.fetchall(
        "SELECT * FROM unions WHERE deleted_at IS NULL ORDER BY created_at"
    )
    union_xref: dict[str, str] = {}
    for i, row in enumerate(unions, start=1):
        union_xref[row["id"]] = _xref("F", i)

    partners_by_union: dict[str, list[tuple[str, int]]] = {}
    for row in db.fetchall(
        "SELECT * FROM union_partners ORDER BY union_id, position"
    ):
        partners_by_union.setdefault(row["union_id"], []).append(
            (row["person_id"], row["position"])
        )

    children_by_union: dict[str, list[tuple[str, str]]] = {}
    for row in db.fetchall("SELECT * FROM parent_child WHERE union_id IS NOT NULL"):
        children_by_union.setdefault(row["union_id"], []).append(
            (row["child_id"], row["type"])
        )

    # Also collect parent_child without union for FAMC
    famc_for_child: dict[str, str] = {}
    for union_id, kids in children_by_union.items():
        for child_id, _ in kids:
            famc_for_child[child_id] = union_id

    fams_for_person: dict[str, list[str]] = {}
    for union_id, partners in partners_by_union.items():
        for person_id, _ in partners:
            fams_for_person.setdefault(person_id, []).append(union_id)

    places = {
        r["id"]: r
        for r in db.fetchall("SELECT * FROM places WHERE deleted_at IS NULL")
    }

    def emit_event(subject_type: str, subject_id: str) -> None:
        events = db.fetchall(
            "SELECT * FROM events WHERE subject_type=? AND subject_id=? "
            "AND deleted_at IS NULL ORDER BY sort_date IS NULL, sort_date",
            (subject_type, subject_id),
        )
        for ev in events:
            try:
                et = EventType(ev["type"])
            except ValueError:
                continue
            tag = _EVENT_TAG.get(et)
            if not tag:
                continue
            if et == EventType.DEATH and not ev["date_text"] and not ev["place_id"]:
                lines.append(f"1 {tag} Y")
                continue
            if et == EventType.OCCUPATION and ev["description"]:
                lines.append(f"1 {tag} {ev['description']}")
            else:
                lines.append(f"1 {tag}")
            if ev["date_text"]:
                lines.append(f"2 DATE {ev['date_text']}")
            place = places.get(ev["place_id"]) if ev["place_id"] else None
            if place:
                parts = [place["name"]]
                if place["admin1"]:
                    parts.append(place["admin1"])
                if place["country"]:
                    parts.append(place["country"])
                lines.append(f"2 PLAC {', '.join(parts)}")
                lines.extend(_fmt_coord(place["latitude"], place["longitude"]))

    def emit_citations(subject_type: str, subject_id: str) -> None:
        rows = db.fetchall(
            "SELECT * FROM citations WHERE subject_type=? AND subject_id=?",
            (subject_type, subject_id),
        )
        for cit in rows:
            xref = source_xref.get(cit["source_id"])
            if not xref:
                continue
            lines.append(f"1 SOUR {xref}")
            if cit["detail"]:
                lines.append(f"2 PAGE {cit['detail']}")

    for row in persons:
        xref = person_xref[row["id"]]
        person = Person.from_dict(dict(row))
        lines.append(f"0 {xref} INDI")
        given = person.given_names or ""
        surname = person.surname or ""
        if person.surname_prefix:
            surname_part = f"{person.surname_prefix} {surname}".strip()
        else:
            surname_part = surname
        lines.append(f"1 NAME {given} /{surname_part}/")
        if given:
            lines.append(f"2 GIVN {given}")
        if person.surname_prefix:
            lines.append(f"2 SPFX {person.surname_prefix}")
        if surname:
            lines.append(f"2 SURN {surname}")
        if person.call_name:
            lines.append(f"2 NICK {person.call_name}")
        lines.append(f"1 SEX {_SEX_OUT.get(person.sex, 'U')}")
        if person.notes:
            lines.append(f"1 NOTE {person.notes}")
        emit_event(SubjectType.PERSON.value, person.id)
        emit_citations(SubjectType.PERSON.value, person.id)
        for union_id in fams_for_person.get(person.id, []):
            lines.append(f"1 FAMS {union_xref[union_id]}")
        if person.id in famc_for_child:
            lines.append(f"1 FAMC {union_xref[famc_for_child[person.id]]}")

    for row in unions:
        xref = union_xref[row["id"]]
        lines.append(f"0 {xref} FAM")
        partners = partners_by_union.get(row["id"], [])
        # Export first two partners as HUSB/WIFE for GEDCOM compatibility
        # (roles are positional, not gendered).
        if len(partners) >= 1 and partners[0][0] in person_xref:
            lines.append(f"1 HUSB {person_xref[partners[0][0]]}")
        if len(partners) >= 2 and partners[1][0] in person_xref:
            lines.append(f"1 WIFE {person_xref[partners[1][0]]}")
        for child_id, link_type in children_by_union.get(row["id"], []):
            if child_id not in person_xref:
                continue
            lines.append(f"1 CHIL {person_xref[child_id]}")
            try:
                pedi = _PEDI_OUT.get(ParentChildType(link_type), "birth")
            except ValueError:
                pedi = "birth"
            if pedi != "birth":
                lines.append(f"2 PEDI {pedi}")
        if row["known_children_count"] is not None:
            lines.append(f"1 NCHI {row['known_children_count']}")
        emit_event(SubjectType.UNION.value, row["id"])

    lines.append("0 TRLR")
    return "\n".join(lines) + "\n"
