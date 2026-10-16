# Security audit report

**Repository:** ha-family-tree (Home Assistant custom integration)  
**Branch audited:** `main`  
**Threat model:** Any authenticated Home Assistant user may read the full family tree; only admins may mutate data (except documented self-service `user_links/claim`). Soft-deleted (trash) persons and HA↔person user-link listings are admin-only.

## Summary

| Severity | Count (before remediation) | Status |
|----------|----------------------------|--------|
| Critical | 0 | — |
| High | 2 | Fixed (citation URL XSS; GEDCOM image SSRF via redirects) |
| Medium | 5 | Fixed (MAX_URL, error disclosure, Pillow requirements, trash/`user_links` authz) |
| Low | 3 | Fixed (country codes, dev npm advisory, import size streaming) |

No SQL injection, command injection, hardcoded secrets, or unsafe deserialization were found.

## Findings

| Severity | Location | Finding | Resolution |
|----------|----------|---------|------------|
| High | `frontend/src/panel.ts`, `gedcom_import.py` | Citation `source_url` bound to `href` without scheme checks; malicious GEDCOM `WWW` tags | `isSafeUrl()` in panel; `normalize_source_url()` on import and in `add_source()` |
| High | `media_fetch.py` | `urlopen` followed redirects; SSRF check ran only on the initial URL | Manual redirect follow with hop limit; re-validate each `Location`; peer IP check after connect |
| Medium | `const.py` `MAX_URL` | Constant never enforced | Enforced in `validation.normalize_source_url()` |
| Medium | `http.py`, `websocket_api.py` | `str(err)` from caught exceptions returned to clients | Generic client messages; details logged server-side |
| Medium | `manifest.json` | Pillow used at runtime but not declared for HACS | `"requirements": ["Pillow>=10.0"]` |
| Medium | `websocket_api.py` | `user_links/list` and trash/deleted person reads open to any user | Admin-gated; UI hides trash/links for non-admins |
| Low | `config_flow.py`, `gazetteer.py` | Gazetteer country codes not validated as ISO alpha-2 | `normalize_country_codes()` |
| Low | `http.py` import | Multipart/body read fully before size gate | Streamed read with `MAX_IMPORT_BYTES` cap; early `Content-Length` reject |
| Low (dev) | `package-lock.json` | `source-map-js` advisory GHSA-68fv-2mgg-jv7q | Lockfile bump via `npm audit fix` |

## Intentional design (not vulnerabilities)

- Read-open WebSocket and HTTP GEDCOM export for all authenticated HA users (living tree data and photos)
- Non-admin `user_links/claim` with optional `create` (self-service linking)
- Service calls with `user_id=None` allowed for automations (`auth.py`)
- Panel source map served with the panel bundle (see `SECURITY.md`)

## Person media (photos)

| Control | Implementation |
|---------|----------------|
| Read | Authenticated `GET /api/family_tree/media/{id}`; trashed persons → 404 |
| Write | Admin-only upload (`POST …/persons/{id}/media`) and WebSocket media mutations |
| IDOR | Serve by `media_id` from DB only; hex id validation |
| Upload | Magic-byte allowlist (JPEG/PNG/WebP), size/pixel caps, EXIF stripped on save |
| GEDCOM fetch | `is_fetchable_http_url()` + redirect re-validation + peer IP check; local copy only in UI |
| Response headers | `X-Content-Type-Options: nosniff`, `Cache-Control: private` |

Intentional: any logged-in HA user may view photos of non-trashed persons (same as tree data).

## Positive controls

- Parameterized SQL throughout `repository.py`
- Admin gate on WebSocket mutations, GEDCOM import, trash reads, and `user_links/list`
- Input length bounds via voluptuous and `MAX_*` constants
- GEDCOM import size cap (`MAX_IMPORT_BYTES`) enforced while streaming
- Pillow declared in `manifest.json` for HACS installs
- CI verifies committed `dist/` matches `npm run build`

## Reporting vulnerabilities

See [SECURITY.md](../SECURITY.md) for how to report new issues privately.
