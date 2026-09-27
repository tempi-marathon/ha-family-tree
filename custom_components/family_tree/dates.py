"""GEDCOM-style date parsing and age helpers."""

from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import date

from .models import DateQualifier

_MONTHS = {
    "JAN": 1,
    "FEB": 2,
    "MAR": 3,
    "APR": 4,
    "MAY": 5,
    "JUN": 6,
    "JUL": 7,
    "AUG": 8,
    "SEP": 9,
    "OCT": 10,
    "NOV": 11,
    "DEC": 12,
}

_DATE_TOKEN = re.compile(
    r"^(?:(?P<day>\d{1,2})\s+)?(?:(?P<month>[A-Z]{3})\s+)?(?P<year>\d{4})$",
    re.IGNORECASE,
)

_QUALIFIER_PREFIXES = {
    "ABT": DateQualifier.ABOUT,
    "ABOUT": DateQualifier.ABOUT,
    "CIR": DateQualifier.ABOUT,
    "CA": DateQualifier.ABOUT,
    "BEF": DateQualifier.BEFORE,
    "BEFORE": DateQualifier.BEFORE,
    "AFT": DateQualifier.AFTER,
    "AFTER": DateQualifier.AFTER,
    "EST": DateQualifier.ESTIMATED,
    "CAL": DateQualifier.CALCULATED,
}


@dataclass(frozen=True, slots=True)
class ParsedDate:
    """Structured date from a GEDCOM date string."""

    date_text: str
    qualifier: DateQualifier
    date_from: str | None
    date_to: str | None
    sort_date: str | None


def _parse_single(token: str) -> tuple[str | None, date | None]:
    """Parse a single GEDCOM date token into ISO (partial) and a sort date."""
    token = token.strip()
    if not token:
        return None, None
    match = _DATE_TOKEN.match(token)
    if not match:
        # Year-only fallback
        year_match = re.search(r"(\d{4})", token)
        if year_match:
            year = int(year_match.group(1))
            return f"{year:04d}", date(year, 1, 1)
        return None, None

    day_s = match.group("day")
    month_s = match.group("month")
    year = int(match.group("year"))
    month = _MONTHS.get(month_s.upper()) if month_s else None
    day = int(day_s) if day_s else None

    if month and day:
        iso = f"{year:04d}-{month:02d}-{day:02d}"
        try:
            return iso, date(year, month, day)
        except ValueError:
            return iso, date(year, month, 1)
    if month:
        iso = f"{year:04d}-{month:02d}"
        return iso, date(year, month, 1)
    return f"{year:04d}", date(year, 1, 1)


def parse_gedcom_date(raw: str | None) -> ParsedDate:
    """Parse a GEDCOM date string into structured fields."""
    text = (raw or "").strip()
    if not text:
        return ParsedDate("", DateQualifier.EXACT, None, None, None)

    upper = text.upper()

    if upper.startswith("BET ") and " AND " in upper:
        rest = text[4:]
        parts = re.split(r"\s+AND\s+", rest, maxsplit=1, flags=re.IGNORECASE)
        d1, s1 = _parse_single(parts[0])
        d2, s2 = _parse_single(parts[1]) if len(parts) > 1 else (None, None)
        sort = (s1 or s2)
        return ParsedDate(
            text,
            DateQualifier.BETWEEN,
            d1,
            d2,
            sort.isoformat() if sort else None,
        )

    if upper.startswith("FROM ") and " TO " in upper:
        rest = text[5:]
        parts = re.split(r"\s+TO\s+", rest, maxsplit=1, flags=re.IGNORECASE)
        d1, s1 = _parse_single(parts[0])
        d2, s2 = _parse_single(parts[1]) if len(parts) > 1 else (None, None)
        sort = s1 or s2
        return ParsedDate(
            text,
            DateQualifier.FROM_TO,
            d1,
            d2,
            sort.isoformat() if sort else None,
        )

    for prefix, qualifier in _QUALIFIER_PREFIXES.items():
        if upper.startswith(prefix + " "):
            rest = text[len(prefix) :].strip()
            d1, s1 = _parse_single(rest)
            return ParsedDate(
                text,
                qualifier,
                d1,
                None,
                s1.isoformat() if s1 else None,
            )

    d1, s1 = _parse_single(text)
    return ParsedDate(
        text,
        DateQualifier.EXACT,
        d1,
        None,
        s1.isoformat() if s1 else None,
    )


def display_date(parsed: ParsedDate | None, fallback: str = "") -> str:
    """Human-readable date string."""
    if parsed is None:
        return fallback
    if parsed.date_text:
        return parsed.date_text
    return fallback


def age_years(
    birth: ParsedDate | None,
    death: ParsedDate | None,
    *,
    is_living: bool,
    today: date | None = None,
) -> int | None:
    """Approximate age in whole years, or None if unknown."""
    if birth is None or birth.sort_date is None:
        return None
    try:
        birth_d = date.fromisoformat(birth.sort_date[:10])
    except ValueError:
        return None

    if is_living:
        end = today or date.today()
    elif death and death.sort_date:
        try:
            end = date.fromisoformat(death.sort_date[:10])
        except ValueError:
            return None
    else:
        return None

    years = end.year - birth_d.year
    if (end.month, end.day) < (birth_d.month, birth_d.day):
        years -= 1
    return max(0, years)


def year_from_sort_date(sort_date: str | None) -> int | None:
    """Extract a year from a sort_date ISO string."""
    if not sort_date:
        return None
    try:
        return int(sort_date[:4])
    except (TypeError, ValueError):
        return None
