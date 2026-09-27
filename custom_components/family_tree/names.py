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


def display_name(person: Person) -> str:
    """Format ``Given [prefix] Surname`` for display."""
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


def full_name(person: Person) -> str:
    """Full formal name with all given names."""
    parts: list[str] = []
    if person.given_names:
        parts.append(person.given_names.strip())
    if person.surname_prefix:
        parts.append(person.surname_prefix.strip())
    if person.surname:
        parts.append(person.surname.strip())
    return " ".join(parts) or "Unknown"


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
