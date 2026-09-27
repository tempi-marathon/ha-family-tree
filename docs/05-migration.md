# 5. Migration from Laravel Family Tree App

If you used [family-tree-app](https://github.com/tempi-marathon/family-tree-app)
on Laravel Cloud:

1. Copy
   [`tools/laravel-export/ExportGedcomCommand.php`](../tools/laravel-export/ExportGedcomCommand.php)
   into `app/Console/Commands/` in that repo (see
   [`tools/laravel-export/README.md`](../tools/laravel-export/README.md)).
2. Run `php artisan export:gedcom storage/app/family-tree-export.ged`
3. Download the file; import it in HA Family Tree → Settings
4. Check the import report counts
5. Optionally export GEDCOM from HA and compare structure
6. Link HA users to persons
7. Delete the export file and remove the artisan command

Soft-deleted Laravel rows are not exported. User↔person links are not carried
over (relink in Settings).
