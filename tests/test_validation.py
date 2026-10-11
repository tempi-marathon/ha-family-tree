"""Tests for validation helpers."""

from __future__ import annotations

from custom_components.family_tree.validation import (
    is_fetchable_http_url,
    normalize_country_codes,
    normalize_entity_id,
    normalize_source_url,
)


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


def test_normalize_entity_id() -> None:
    hex_id = "a" * 32
    assert normalize_entity_id(hex_id) == hex_id
    assert normalize_entity_id("UPPER" + "a" * 27) is None
    assert normalize_entity_id("../etc") is None


def test_is_fetchable_http_url_blocks_localhost() -> None:
    assert not is_fetchable_http_url("http://127.0.0.1/photo.jpg")
    assert not is_fetchable_http_url("http://localhost/x")


def test_is_fetchable_http_url_allows_public_example() -> None:
    from unittest.mock import patch

    with patch(
        "custom_components.family_tree.validation.socket.getaddrinfo",
        return_value=[(2, 1, 6, "", ("93.184.216.34", 0))],
    ):
        assert is_fetchable_http_url("https://example.com/photo.jpg")
