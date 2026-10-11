"""Fetch remote images for GEDCOM import (SSRF-protected)."""

from __future__ import annotations

import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .const import MAX_PHOTO_BYTES
from .media_files import sniff_image_type
from .validation import is_fetchable_http_url, normalize_source_url

_LOGGER = logging.getLogger(__name__)

_FETCH_TIMEOUT = 15


def fetch_http_image(url: str) -> bytes:
    """Download image bytes when URL passes SSRF checks."""
    normalized = normalize_source_url(url)
    if not normalized or not is_fetchable_http_url(normalized):
        raise ValueError("URL not allowed")
    req = Request(
        normalized,
        headers={"User-Agent": "FamilyTree/1.0"},
        method="GET",
    )
    try:
        with urlopen(req, timeout=_FETCH_TIMEOUT) as resp:
            if resp.status and resp.status >= 400:
                raise ValueError("HTTP error")
            data = resp.read(MAX_PHOTO_BYTES + 1)
    except (HTTPError, URLError, TimeoutError, ValueError) as err:
        raise ValueError("Download failed") from err
    if len(data) > MAX_PHOTO_BYTES:
        raise ValueError("Image too large")
    if sniff_image_type(data) is None:
        raise ValueError("Unsupported image")
    return data
