"""Input validation helpers for Family Tree."""

from __future__ import annotations

import re
from urllib.parse import urlparse

from .const import MAX_URL

_ISO_COUNTRY_RE = re.compile(r"^[A-Z]{2}$")
_ALLOWED_URL_SCHEMES = frozenset({"http", "https", "mailto"})


def normalize_source_url(url: str | None) -> str:
    """Return a safe source URL or empty string if invalid or disallowed."""
    if url is None:
        return ""
    text = str(url).strip()
    if not text or len(text) > MAX_URL:
        return ""
    parsed = urlparse(text)
    if not parsed.scheme:
        if "://" in text or text.lower().startswith("javascript:"):
            return ""
        return text if len(text) <= MAX_URL else ""
    scheme = parsed.scheme.lower()
    if scheme not in _ALLOWED_URL_SCHEMES:
        return ""
    return text


def normalize_country_codes(raw: object) -> list[str]:
    """Normalize gazetteer country codes to unique ISO 3166-1 alpha-2 values."""
    if not raw:
        return []
    codes: list[str] = []
    seen: set[str] = set()
    for item in raw:
        code = str(item).strip().upper()
        if not code or not _ISO_COUNTRY_RE.match(code) or code in seen:
            continue
        seen.add(code)
        codes.append(code)
    return codes
