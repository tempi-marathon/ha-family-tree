# 3. Usage

## Panel

The **Family Tree** sidebar panel includes:

- **Dashboard** — counts and charts (age, century, places of birth)
- **People** — search, living filter, and Filters (family, place, date range); family shortcuts on the dashboard jump into People
- **Person** — Details, Relationships, Tree, Sources
- **Trash** — restore or permanently delete
- **Settings** — GEDCOM import/export, user links, gazetteer status

Admins can create and edit. Other logged-in users see a read-only panel.

## Actions

| Action | Description |
|--------|-------------|
| `family_tree.add_person` | Create a person (admin or automation) |
| `family_tree.link_user` | Link an HA user id to a person |
| `family_tree.export_gedcom` | Write a GEDCOM file under `/config/family_tree/` |

## Photos

On a person’s **Details** tab, admins can upload photos (JPEG, PNG, WebP). One photo can be set as the **profile** picture; it appears in the people list, tree, and relationship cards. Files are stored under `/config/family_tree/media/` — include that folder in backups alongside `family_tree.db`.

## Sensors & calendar

- Sensors:
  - **People** / **Living** — totals from the tree
  - **On this day** — count of historic events that fall today; attribute `events` lists them (birth, baptism, marriage, partnership, death)
  - **Upcoming events** — days until the soonest birthday, anniversary, or memorial; attributes `birthdays`, `anniversaries`, `memorials` (plus `next_kind` / `next_label`)
- Calendar (`family_events`): living birthdays, wedding anniversaries, and death memorials (all-day)
- Bus events (once per day, deduped): `family_tree_birthday`, `family_tree_anniversary`, `family_tree_memorial`

## Lovelace cards

Cards ship with the integration (no separate HACS install). In **storage mode**, the module
resource is registered automatically (URL includes a cache-busting query). In **YAML mode**,
add the resource and bump the `v=` query after upgrades so browsers pick up the new bundle:

```yaml
resources:
  - url: /api/family_tree/family-tree-cards.js?v=0.1.0
    type: module
```

Examples:

```yaml
type: custom:family-tree-upcoming-card
# entity: sensor.family_tree_upcoming_events  # optional; auto-discovered

type: custom:family-tree-on-this-day-card
# entity: sensor.family_tree_on_this_day

type: custom:family-tree-mini-tree-card
use_linked_user: true
# person_id: "<uuid>"  # optional override
```
