"""Fetch remote images for GEDCOM import (SSRF-protected)."""

from __future__ import annotations

import http.client
import logging
import ssl
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse

from .const import MAX_PHOTO_BYTES
from .media_files import sniff_image_type
from .validation import (
    is_blocked_ip_str,
    is_fetchable_http_url,
    normalize_source_url,
)

_LOGGER = logging.getLogger(__name__)

_FETCH_TIMEOUT = 15
_MAX_REDIRECTS = 5
_REDIRECT_STATUSES = frozenset({301, 302, 303, 307, 308})


def _assert_peer_public(conn: http.client.HTTPConnection) -> None:
    """Reject connections whose peer address is private/reserved."""
    sock = getattr(conn, "sock", None)
    if sock is None:
        raise ValueError("URL not allowed")
    try:
        peer = sock.getpeername()
    except OSError as err:
        raise ValueError("URL not allowed") from err
    if not peer:
        raise ValueError("URL not allowed")
    if is_blocked_ip_str(str(peer[0])):
        raise ValueError("URL not allowed")


def _fetch_once(url: str) -> tuple[int, dict[str, str], bytes]:
    """Perform a single HTTP GET without following redirects."""
    parsed = urlparse(url)
    scheme = parsed.scheme.lower()
    host = parsed.hostname
    if host is None:
        raise ValueError("URL not allowed")
    port = parsed.port or (443 if scheme == "https" else 80)
    path = parsed.path or "/"
    if parsed.query:
        path = f"{path}?{parsed.query}"

    if scheme == "https":
        context = ssl.create_default_context()
        conn: http.client.HTTPConnection = http.client.HTTPSConnection(
            host, port, timeout=_FETCH_TIMEOUT, context=context
        )
    elif scheme == "http":
        conn = http.client.HTTPConnection(host, port, timeout=_FETCH_TIMEOUT)
    else:
        raise ValueError("URL not allowed")

    try:
        conn.request(
            "GET",
            path,
            headers={"User-Agent": "FamilyTree/1.0", "Host": parsed.netloc},
        )
        _assert_peer_public(conn)
        resp = conn.getresponse()
        status = resp.status
        headers = {k: v for k, v in resp.getheaders()}
        # Normalize header keys for case-insensitive Location lookup.
        headers_l = {k.lower(): v for k, v in headers.items()}
        if status in _REDIRECT_STATUSES:
            # Do not read a large body on redirects.
            resp.read(1024)
            return status, headers_l, b""
        data = resp.read(MAX_PHOTO_BYTES + 1)
        return status, headers_l, data
    finally:
        conn.close()


def fetch_http_image(url: str) -> bytes:
    """Download image bytes when URL passes SSRF checks.

    Redirects are followed manually with a hop limit; each Location is
    re-validated with ``is_fetchable_http_url``, and the connected peer
    address is checked after connect.
    """
    current = normalize_source_url(url)
    for _hop in range(_MAX_REDIRECTS + 1):
        if not current or not is_fetchable_http_url(current):
            raise ValueError("URL not allowed")
        try:
            status, headers, data = _fetch_once(current)
        except (HTTPError, URLError, TimeoutError, OSError, ValueError) as err:
            if isinstance(err, ValueError) and str(err) == "URL not allowed":
                raise
            raise ValueError("Download failed") from err

        if status in _REDIRECT_STATUSES:
            location = headers.get("location")
            if not location:
                raise ValueError("Download failed")
            current = normalize_source_url(urljoin(current, location))
            continue

        if status >= 400:
            raise ValueError("HTTP error")
        if len(data) > MAX_PHOTO_BYTES:
            raise ValueError("Image too large")
        if sniff_image_type(data) is None:
            raise ValueError("Unsupported image")
        return data

    raise ValueError("Too many redirects")
