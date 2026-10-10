"""Tests for validation helpers."""

from __future__ import annotations

from custom_components.family_tree.validation import normalize_country_codes, normalize_source_url


def test_normalize_source_url_allows_http_https() -> None:
    assert normalize_source_url("https://example.com/x") == "https://example.com/x"
    assert normalize_source_url("http://example.com") == "http://example.com"
    assert normalize_source_url("mailto:a@b.co") == "mailto:a@b.co"


def test_normalize_source_url_rejects_javascript_and_data() -> None:
    assert normalize_source_url("javascript:alert(1)") == ""
    assert normalize_source_url("data:text/html,hi") == ""


def test_normalize_source_url_enforces_max_length() -> None:
    assert normalize_source_url("https://" + "a" * 3000) == ""


def test_normalize_country_codes_iso_only() -> None:
    assert normalize_country_codes(["nl", "be", "NL"]) == ["NL", "BE"]
    assert normalize_country_codes(["NL", "../x", "USA", ""]) == ["NL"]


def test_normalize_country_codes_empty() -> None:
    assert normalize_country_codes(None) == []
    assert normalize_country_codes([]) == []
