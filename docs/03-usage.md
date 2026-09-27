# 3. Usage

## Panel

The **Family Tree** sidebar panel includes:

- **Dashboard** — counts and charts (age, century, places of birth)
- **People** — search, filters, lineage icon, family shortcuts
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

## Sensors & calendar

- Sensors: total people, living people, days until next birthday
- Calendar: birthdays (living) and wedding/partnership anniversaries
