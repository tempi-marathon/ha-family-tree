"""Tests for SSRF-protected remote image fetch."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from custom_components.family_tree.media_fetch import fetch_http_image

# Minimal valid JPEG (magic bytes only — sniff_image_type checks SOI).
_JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 64


def test_fetch_rejects_redirect_to_localhost() -> None:
    with (
        patch(
            "custom_components.family_tree.media_fetch.is_fetchable_http_url",
            side_effect=lambda u: "127.0.0.1" not in u and "localhost" not in u,
        ),
        patch(
            "custom_components.family_tree.media_fetch._fetch_once",
            return_value=(302, {"location": "http://127.0.0.1/secret"}, b""),
        ) as mock_fetch,
        pytest.raises(ValueError, match="URL not allowed"),
    ):
        fetch_http_image("https://example.com/photo.jpg")
    mock_fetch.assert_called_once()


def test_fetch_allows_direct_public_image() -> None:
    with (
        patch(
            "custom_components.family_tree.media_fetch.is_fetchable_http_url",
            return_value=True,
        ),
        patch(
            "custom_components.family_tree.media_fetch._fetch_once",
            return_value=(200, {}, _JPEG),
        ),
    ):
        assert fetch_http_image("https://example.com/photo.jpg") == _JPEG


def test_fetch_follows_safe_redirect_then_succeeds() -> None:
    calls: list[str] = []

    def _once(url: str) -> tuple[int, dict[str, str], bytes]:
        calls.append(url)
        if url.endswith("/start"):
            return 302, {"location": "https://cdn.example.com/photo.jpg"}, b""
        return 200, {}, _JPEG

    with (
        patch(
            "custom_components.family_tree.media_fetch.is_fetchable_http_url",
            return_value=True,
        ),
        patch(
            "custom_components.family_tree.media_fetch._fetch_once",
            side_effect=_once,
        ),
    ):
        assert fetch_http_image("https://example.com/start") == _JPEG
    assert len(calls) == 2
    assert calls[1] == "https://cdn.example.com/photo.jpg"


def test_fetch_rejects_blocked_peer_after_connect() -> None:
    mock_sock = MagicMock()
    mock_sock.getpeername.return_value = ("127.0.0.1", 80)

    mock_conn = MagicMock()
    mock_conn.sock = mock_sock

    with (
        patch(
            "custom_components.family_tree.media_fetch.is_fetchable_http_url",
            return_value=True,
        ),
        patch(
            "custom_components.family_tree.media_fetch.http.client.HTTPConnection",
            return_value=mock_conn,
        ),
        pytest.raises(ValueError, match="URL not allowed"),
    ):
        fetch_http_image("http://example.com/photo.jpg")
    mock_conn.close.assert_called()
