# Laravel → Home Assistant migration (throwaway)

Copy [`ExportGedcomCommand.php`](ExportGedcomCommand.php) into your
`family-tree-app` tree as:

```
app/Console/Commands/ExportGedcomCommand.php
```

Then on Laravel Cloud (or locally with production DB credentials):

```bash
php artisan export:gedcom storage/app/family-tree-export.ged
```

Download the file, import it in the Home Assistant **Family Tree → Settings**
panel (admin), check the import report against Laravel row counts, then:

1. Link HA users to persons in Settings.
2. Delete the `.ged` file (it contains personal data).
3. Remove `ExportGedcomCommand.php` from `family-tree-app`.

Re-importing the same file merges by GEDCOM xref. Use “replace all” only when
you intend to wipe the HA database first.
