"""Dutch-aware name display and sorting (tussenvoegsel / roepnaam)."""

from __future__ import annotations

import re

from .models import Person

# Common Dutch/Flemish surname prefixes (lowercase for matching).
_PREFIXES = (
    "van der",
    "van den",
    "van de",
    "van 't",
    "van het",
    "in den",
    "in de",
    "op den",
    "op de",
    "aan den",
    "aan de",
    "uit den",
    "uit de",
    "van",
    "de",
    "den",
    "der",
    "het",
    "ten",
    "ter",
    "te",
    "'t",
)

_PREFIX_RE = re.compile(
    r"^(?P<prefix>" + "|".join(re.escape(p) for p in _PREFIXES) + r")\s+(?P<rest>.+)$",
    re.IGNORECASE,
)

_NICK_PAREN_RE = re.compile(r"^(?P<first>.+?)\s*\((?P<nick>[^)]+)\)\s*$")
_QUOTED_NICK_RE = re.compile(r'["\u201c\u201d]([^"\u201c\u201d]+)["\u201c\u201d]|\'([^\']+)\'')


def split_surname(family_name: str) -> tuple[str, str]:
    """Split ``van Iersel`` into ``(van, Iersel)``."""
    text = (family_name or "").strip()
    if not text:
        return "", ""
    match = _PREFIX_RE.match(text)
    if not match:
        return "", text
    prefix = match.group("prefix")
    # Preserve common lowercase style for Dutch prefixes.
    return prefix.lower(), match.group("rest").strip()


def _extract_quoted_nick(given: str) -> tuple[str, str]:
    """Pull quoted nick out of a given-name string."""
    match = _QUOTED_NICK_RE.search(given)
    if not match:
        return given.strip(), ""
    nick = (match.group(1) or match.group(2) or "").strip()
    cleaned = (given[: match.start()] + given[match.end() :]).strip()
    cleaned = re.sub(r"\s{2,}", " ", cleaned).strip(" ,")
    return cleaned, nick


def normalize_call_name_field(raw: str) -> str:
    """``Marinus (Rien)`` → ``Rien``; otherwise trim."""
    text = (raw or "").strip()
    if not text:
        return ""
    paren = _NICK_PAREN_RE.match(text)
    if paren:
        return paren.group("nick").strip()
    return text


def _dedupe_leading_given_token(given: str, call: str) -> str:
    given = (given or "").strip()
    call = (call or "").strip()
    if not given or not call:
        return given
    parts = given.split()
    if not parts:
        return given
    call_first = call.split()[0]
    if parts[0].casefold() == call_first.casefold():
        return " ".join(parts[1:]).strip()
    return given


def normalize_imported_names(given_names: str, call_name: str) -> tuple[str, str]:
    """Clean GEDCOM / stored name fields (nicks, duplicate leading tokens)."""
    given = (given_names or "").strip()
    call = normalize_call_name_field(call_name or "")
    given, nick_from_given = _extract_quoted_nick(given)
    if nick_from_given and not call:
        call = nick_from_given
    given = _dedupe_leading_given_token(given, call)
    return given, call


def _person_with_normalized_names(person: Person) -> Person:
    given, call = normalize_imported_names(person.given_names, person.call_name)
    return Person(
        id=person.id,
        given_names=given,
        call_name=call,
        surname_prefix=person.surname_prefix,
        surname=person.surname,
        sex=person.sex,
        is_living=person.is_living,
        notes=person.notes,
        profile_media_id=person.profile_media_id,
        created_at=person.created_at,
        updated_at=person.updated_at,
        deleted_at=person.deleted_at,
    )


def _display_name_fields(person: Person) -> str:
    parts: list[str] = []
    given = (person.call_name or person.given_names or "").strip()
    if not given and person.given_names:
        given = person.given_names.strip()
    if given:
        # Prefer first given name for compact display when call_name empty
        if not person.call_name and " " in given:
            given = given.split()[0]
        parts.append(given)
    if person.surname_prefix:
        parts.append(person.surname_prefix.strip())
    if person.surname:
        parts.append(person.surname.strip())
    return " ".join(parts) or "Unknown"


def display_name(person: Person) -> str:
    """Format ``Given [prefix] Surname`` for display."""
    return _display_name_fields(_person_with_normalized_names(person))


def _full_name_fields(person: Person) -> str:
    parts: list[str] = []
    if person.given_names:
        parts.append(person.given_names.strip())
    if person.surname_prefix:
        parts.append(person.surname_prefix.strip())
    if person.surname:
        parts.append(person.surname.strip())
    return " ".join(parts) or "Unknown"


def full_name(person: Person) -> str:
    """Full formal name with all given names."""
    return _full_name_fields(_person_with_normalized_names(person))


def formal_subtitle(person: Person) -> str:
    """Extra formal line for cards; empty when redundant with display_name."""
    person = _person_with_normalized_names(person)
    formal = _full_name_fields(person)
    short = _display_name_fields(person)
    if formal.casefold() == short.casefold():
        return ""
    return formal


def sort_key(person: Person) -> tuple[str, str]:
    """Sort by surname without prefix, then given names (Dutch convention)."""
    surname = (person.surname or "").casefold()
    given = (person.given_names or "").casefold()
    return (surname, given)


def matches_family_shortcut(person: Person, shortcut: str) -> bool:
    """True when surname (with or without prefix) starts with the shortcut."""
    needle = shortcut.strip().casefold()
    if not needle:
        return False
    full = f"{person.surname_prefix} {person.surname}".strip().casefold()
    bare = (person.surname or "").casefold()
    return full.startswith(needle) or bare.startswith(needle)
