# Family Tree for Home Assistant Constitution

## Core Principles

### I. Local-First Privacy

Family data is personal and MUST stay on the user's Home Assistant instance.

- All tree data (SQLite database, GEDCOM uploads, person media) MUST live under
  `/config/family_tree/` so it is covered by Home Assistant backups and nowhere else.
- Features MUST NOT send tree data to third-party services. Lookups (e.g. the
  GeoNames gazetteer) MUST work offline against locally stored data.
- The only permitted outbound network access is user-initiated fetching of media
  referenced by an imported GEDCOM, under the controls in Principle IV.
- Real `.ged`, `.db`, or personal media files MUST NOT be committed to this
  repository; test fixtures MUST be synthetic.

**Rationale**: Users trust the integration with sensitive genealogical and
living-person data; "stays on your box" is the core promise of the project.

### II. Home Assistant Native

The integration MUST behave like a well-formed Home Assistant custom integration.

- It MUST pass `hassfest` and remain installable via HACS (custom repository) as a
  zipped release of `custom_components/family_tree/`.
- Setup MUST go through the config flow; the integration is a single config entry.
- It MUST NOT declare Python requirements that Home Assistant core already ships
  (e.g. Pillow), and SHOULD avoid new runtime dependencies altogether.
- Blocking I/O (SQLite, file system, network) MUST NOT run on the event loop; use
  executor jobs or async equivalents.
- User-facing surfaces (panel, Lovelace cards, calendar, sensors, services, logbook)
  MUST use Home Assistant's own primitives and theming rather than parallel systems.

**Rationale**: Users install this alongside many other integrations; anything
non-native breaks upgrades, slows HA, or fails validation.

### III. Role-Based Access

Authorization rules are a security boundary and MUST be enforced server-side.

- Any authenticated Home Assistant user MAY read the tree (people, relationships,
  places, sources, media of non-trashed persons, GEDCOM export).
- Mutations MUST require an admin user, or a call with no `user_id`
  (automations/scripts), via `async_require_admin_or_automation`. The only
  documented exception is self-service `user_links/claim`.
- Trash (soft-deleted persons) and `user_links/list` MUST be admin-only.
- The frontend MAY hide controls by role, but MUST NOT be the only enforcement.
- Any change to this access model MUST update `docs/SECURITY-AUDIT.md`.

**Rationale**: Households share one HA instance; non-admin members must not be able
to alter or erase family records.

### IV. Untrusted Input Is Hostile

GEDCOM files, URLs, uploads, and WebSocket/HTTP payloads MUST be treated as hostile.

- SQL MUST be parameterized; no string-built queries from input.
- All inputs MUST be bounded: voluptuous schemas and `MAX_*` limits for strings,
  URLs, and import size (enforced while streaming, not after a full read).
- URLs rendered as links MUST be scheme-checked on both server (`normalize_source_url`)
  and client (`isSafeUrl`).
- Remote media fetches MUST validate every redirect hop and the connected peer IP
  against SSRF rules, with a hop limit.
- Uploaded images MUST pass a magic-byte allowlist and size/pixel caps, and MUST have
  metadata (EXIF) stripped on save.
- Error responses MUST be generic to clients; details go to server logs only.

**Rationale**: GEDCOM files come from other programs and other people; the panel runs
inside the user's authenticated HA session.

### V. Data Integrity & Forward-Only Migrations

A user's family tree MUST never be silently corrupted or lost.

- Schema changes MUST be added as a new numbered entry in `_MIGRATIONS` with
  `SCHEMA_VERSION` bumped; applied migrations MUST NOT be edited.
- The integration MUST refuse to open a database whose schema is newer than it
  supports.
- Deleting a person MUST be a soft delete (trash) unless an explicit, admin-only
  purge is requested.
- GEDCOM 5.5.1 import/export MUST preserve the data the model supports; any new model
  field MUST either round-trip through GEDCOM or be documented as not exported.
- Every migration and GEDCOM mapping change MUST come with tests against fixture data.

**Rationale**: Genealogy data often represents years of work and may exist nowhere
else.

### VI. Inclusive, Localized Experience

The data model and UI MUST respect real family structures and the supported languages.

- Unions MUST stay gender-neutral; parent–child links MUST stay typed (e.g.
  biological, adoptive) rather than assumed.
- Names, dates, and places MUST tolerate partial, approximate, and uncertain values.
- Every user-facing string MUST exist in all supported languages (currently English
  and Dutch) in both `translations/*.json` and the frontend `i18n.ts`.

**Rationale**: A family tree that cannot represent a user's actual family, or speaks
only half its users' language, fails at its job.

### VII. Verified, Reproducible Builds

What users install MUST be exactly what CI built and tested.

- Backend changes MUST pass `ruff check`, `ruff format --check`, and `pytest`.
- Frontend changes MUST pass `npm run build` (including `tsc --noEmit`) and
  `npm test` (vitest).
- The committed `custom_components/family_tree/dist/` bundle MUST match a fresh
  `npm run build`; frontend source and bundle changes ship in the same commit.
- Bug fixes MUST include a regression test where practical; new behavior MUST
  include tests at the layer it lives in (Python and/or TypeScript).
- Releases MUST be cut from `main` via the release workflow, which stamps the
  manifest version from the tag.

**Rationale**: HACS serves the committed bundle directly to every user's HA
instance, so it is part of the trusted release surface.

## Technology & Compatibility Constraints

- **Backend**: Python ≥ 3.12, Home Assistant ≥ 2024.12 (per `hacs.json`), SQLite
  in WAL mode via `db.py`.
- **Frontend**: TypeScript + Lit, bundled with Vite into the panel bundle and the
  separate Lovelace cards bundle; Chart.js is the only charting library.
- **Style**: Ruff (`E, F, I, UP, B, SIM`, line length 100); TypeScript strict
  type-checking via `tsc`.
- **Compatibility**: Supporting a newer HA release MUST NOT break the minimum
  declared HA version without bumping it in `hacs.json` and the README.
- Dependency updates (Dependabot) MUST pass the same CI gates as any other change.

## Development Workflow & Quality Gates

- All changes land on `main` through pull requests; CI (`test.yaml`: hassfest,
  pytest + ruff, frontend build + test + dist check, plus `validate.yaml`) MUST be
  green before merge.
- Reviews MUST check changes against Principles III and IV whenever they touch
  `websocket_api.py`, `http.py`, `services.py`, `auth.py`, GEDCOM import, or media.
- User-visible behavior changes MUST update the relevant page in `docs/` and, where
  applicable, the README feature list.
- Security vulnerabilities are handled privately per `SECURITY.md`, never via public
  issues.

## Governance

This constitution supersedes conflicting practices and guides all Spec Kit specs,
plans, and tasks for this repository.

- **Amendments**: Proposed by pull request editing this file, with a rationale and
  any migration impact on existing code or docs. The maintainer approves amendments.
- **Versioning**: Semantic versioning of this document — MAJOR for removing or
  redefining a principle, MINOR for adding a principle/section or materially
  expanding guidance, PATCH for clarifications and wording.
- **Compliance**: Each implementation plan MUST include a Constitution Check against
  these principles; any deviation MUST be recorded in the plan's Complexity Tracking
  with justification and a simpler alternative that was rejected.
- Runtime development guidance for agents lives in `CLAUDE.md` (when present) and
  MUST stay consistent with this document.

**Version**: 1.0.0 | **Ratified**: 2026-10-30 | **Last Amended**: 2026-10-30
