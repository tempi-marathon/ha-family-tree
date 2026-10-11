# Security audit report

**Repository:** ha-family-tree (Home Assistant custom integration)  
**Branch audited:** `main`  
**Threat model:** Any authenticated Home Assistant user may read the full family tree; only admins may mutate data (except documented self-service `user_links/claim`).

## Summary

| Severity | Count (before remediation) | Status |
|----------|----------------------------|--------|
| Critical | 0 | — |
| High | 1 | Fixed (citation URL XSS) |
| Medium | 2 | Fixed (MAX_URL, error disclosure) |
| Low | 2 | Fixed (country codes, dev npm advisory) |

No SQL injection, command injection, hardcoded secrets, or unsafe deserialization were found.

## Findings

| Severity | Location | Finding | Resolution |
|----------|----------|---------|------------|
| High | `frontend/src/panel.ts`, `gedcom_import.py` | Citation `source_url` bound to `href` without scheme checks; malicious GEDCOM `WWW` tags | `isSafeUrl()` in panel; `normalize_source_url()` on import and in `add_source()` |
| Medium | `const.py` `MAX_URL` | Constant never enforced | Enforced in `validation.normalize_source_url()` |
| Medium | `http.py`, `websocket_api.py` | `str(err)` from caught exceptions returned to clients | Generic client messages; details logged server-side |
| Low | `config_flow.py`, `gazetteer.py` | Gazetteer country codes not validated as ISO alpha-2 | `normalize_country_codes()` |
| Low (dev) | `package-lock.json` | `source-map-js` advisory GHSA-68fv-2mgg-jv7q | Lockfile bump via `npm audit fix` |

## Intentional design (not vulnerabilities)

- Read-open WebSocket and HTTP GEDCOM export for all authenticated HA users
- Non-admin `user_links/claim` with optional `create` (self-service linking)
- HA user IDs listed for admin link management
- Service calls with `user_id=None` allowed for automations (`auth.py`)
- Panel source map served to authenticated users (see `SECURITY.md`)

## Person media (photos)

| Control | Implementation |
|---------|----------------|
| Read | Authenticated `GET /api/family_tree/media/{id}`; trashed persons → 404 |
| Write | Admin-only upload (`POST …/persons/{id}/media`) and WebSocket media mutations |
| IDOR | Serve by `media_id` from DB only; hex id validation |
| Upload | Magic-byte allowlist (JPEG/PNG/WebP), size/pixel caps, EXIF stripped on save |
| GEDCOM fetch | `is_fetchable_http_url()` SSRF guard; local copy only in UI |
| Response headers | `X-Content-Type-Options: nosniff`, `Cache-Control: private` |

Intentional: any logged-in HA user may view photos (same as tree data).

## Positive controls

- Parameterized SQL throughout `repository.py`
- Admin gate on WebSocket mutations and GEDCOM import
- Input length bounds via voluptuous and `MAX_*` constants
- GEDCOM import size cap (`MAX_IMPORT_BYTES`)
- CI verifies committed `dist/` matches `npm run build`

## Reporting vulnerabilities

See [SECURITY.md](../SECURITY.md) for how to report new issues privately.
