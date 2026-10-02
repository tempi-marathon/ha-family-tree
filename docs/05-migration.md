# 5. Migrating an existing tree

To bring people in from another genealogy program:

1. Export a GEDCOM (`.ged`) file from that program
2. In Home Assistant, open **Family Tree → Settings** and import the file
3. Check the import report counts
4. Optionally export GEDCOM from HA and compare structure
5. Link HA users to persons if you use that feature
6. Delete the export file when finished

Soft-deleted or private records in the source app may not appear in the export.
User↔person links are not carried over (relink in Settings).
