"""Input validation helpers for Family Tree."""

from __future__ import annotations

import ipaddress
import re
import socket
from urllib.parse import urlparse

from .const import ENTITY_ID_HEX_LEN, MAX_CAPTION, MAX_URL

_ISO_COUNTRY_RE = re.compile(r"^[A-Z]{2}$")
_ENTITY_ID_RE = re.compile(rf"^[0-9a-f]{{{ENTITY_ID_HEX_LEN}}}$")
_ALLOWED_URL_SCHEMES = frozenset({"http", "https", "mailto"})
_FETCH_URL_SCHEMES = frozenset({"http", "https"})


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


def normalize_http_source_url(url: str | None) -> str:
    """Return a normalized http(s) source URL or empty string if invalid."""
    normalized = normalize_source_url(url)
    if not normalized:
        return ""
    parsed = urlparse(normalized)
    if parsed.scheme.lower() not in _FETCH_URL_SCHEMES:
        return ""
    return normalized


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


def normalize_entity_id(value: str | None) -> str | None:
    """Return a valid hex entity id or None."""
    if value is None:
        return None
    text = str(value).strip().lower()
    if not _ENTITY_ID_RE.match(text):
        return None
    return text


def normalize_caption(caption: str | None) -> str:
    """Bound gallery caption length."""
    if caption is None:
        return ""
    return str(caption).strip()[:MAX_CAPTION]


def _ip_blocked(addr: ipaddress.IPv4Address | ipaddress.IPv6Address) -> bool:
    return bool(
        addr.is_loopback
        or addr.is_link_local
        or addr.is_private
        or addr.is_multicast
        or addr.is_reserved
        or addr.is_unspecified
    )


def is_fetchable_http_url(url: str) -> bool:
    """Return True when url is http(s) and resolves to a public address (SSRF guard)."""
    normalized = normalize_source_url(url)
    if not normalized:
        return False
    parsed = urlparse(normalized)
    if parsed.scheme.lower() not in _FETCH_URL_SCHEMES:
        return False
    if parsed.username or parsed.password:
        return False
    host = parsed.hostname
    if not host:
        return False
    if host.lower() in ("localhost", "localhost.localdomain"):
        return False
    try:
        literal = ipaddress.ip_address(host)
        if _ip_blocked(literal):
            return False
    except ValueError:
        pass
    try:
        infos = socket.getaddrinfo(host, None)
    except OSError:
        return False
    for info in infos:
        sockaddr = info[4]
        if not sockaddr:
            continue
        ip_str = sockaddr[0]
        try:
            addr = ipaddress.ip_address(ip_str)
        except ValueError:
            return False
        if _ip_blocked(addr):
            return False
    return True
