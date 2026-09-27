"""Tests for GEDCOM-style date helpers."""

from datetime import date

from custom_components.family_tree.dates import (
    age_years,
    parse_gedcom_date,
    year_from_sort_date,
)
from custom_components.family_tree.models import DateQualifier


def test_parse_exact_full_date():
    parsed = parse_gedcom_date("12 JAN 1980")
    assert parsed.qualifier == DateQualifier.EXACT
    assert parsed.date_from == "1980-01-12"
    assert parsed.sort_date == "1980-01-12"


def test_parse_about_and_between():
    abt = parse_gedcom_date("ABT 1900")
    assert abt.qualifier == DateQualifier.ABOUT
    assert abt.sort_date == "1900-01-01"

    bet = parse_gedcom_date("BET 1 JAN 1910 AND 5 MAR 1912")
    assert bet.qualifier == DateQualifier.BETWEEN
    assert bet.date_from == "1910-01-01"
    assert bet.date_to == "1912-03-05"


def test_age_years_living_and_deceased():
    birth = parse_gedcom_date("27 SEP 2000")
    today = date(2026, 9, 27)
    assert age_years(birth, None, is_living=True, today=today) == 26

    death = parse_gedcom_date("1 JUN 1950")
    birth2 = parse_gedcom_date("1 JAN 1900")
    assert age_years(birth2, death, is_living=False) == 50


def test_year_from_sort_date():
    assert year_from_sort_date("1980-03-15") == 1980
    assert year_from_sort_date(None) is None
