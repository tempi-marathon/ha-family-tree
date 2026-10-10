"""Family surname shortcut list normalization."""

from __future__ import annotations

from typing import Any

from .const import MAX_FAMILY_SHORTCUTS, MAX_NAME


def normalize_family_shortcuts(raw: Any, *, max_count: int = MAX_FAMILY_SHORTCUTS) -> list[str]:
    """Trim, dedupe, and cap shortcut strings."""
    seen: set[str] = set()
    out: list[str] = []
    for item in raw or []:
        text = str(item).strip()
        if not text or len(text) > MAX_NAME:
            continue
        key = text.casefold()
        if key in seen:
            continue
        seen.add(key)
        out.append(text)
        if len(out) >= max_count:
            break
    return out
