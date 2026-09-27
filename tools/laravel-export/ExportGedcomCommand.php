<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Enums\SexEnum;
use App\Models\Couple;
use App\Models\Location;
use App\Models\Person;
use App\Models\Source;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

/**
 * Throwaway one-off export for migrating to ha-family-tree.
 * Delete this command after the Home Assistant import succeeds.
 *
 * Usage: php artisan export:gedcom storage/app/family-tree-export.ged
 */
class ExportGedcomCommand extends Command
{
    protected $signature = 'export:gedcom {path : Output .ged file path}';

    protected $description = 'Export non-deleted people/couples/locations/sources as GEDCOM 5.5.1';

    /** @var array<int, string> */
    private array $personXref = [];

    /** @var array<int, string> */
    private array $familyXref = [];

    /** @var array<int, string> */
    private array $sourceXref = [];

    /** @var array<int, string> */
    private array $placeXref = [];

    public function handle(): int
    {
        $path = $this->argument('path');
        $dir = dirname($path);
        if ($dir !== '' && $dir !== '.' && ! File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        $lines = [
            '0 HEAD',
            '1 SOUR FAMILY-TREE-APP',
            '2 NAME Family Tree App (Laravel export)',
            '2 VERS 1.0',
            '1 GEDC',
            '2 VERS 5.5.1',
            '2 FORM LINEAGE-LINKED',
            '1 CHAR UTF-8',
        ];

        $sources = Source::query()->get();
        $i = 1;
        foreach ($sources as $source) {
            $xref = '@S'.$i.'@';
            $this->sourceXref[$source->id] = $xref;
            $lines[] = '0 '.$xref.' SOUR';
            if (filled($source->name)) {
                $lines[] = '1 TITL '.$this->escape($source->name);
            }
            if (filled($source->url)) {
                $lines[] = '1 WWW '.$this->escape($source->url);
            }
            $i++;
        }

        $locations = Location::query()->get();
        foreach ($locations as $location) {
            $this->placeXref[$location->id] = $location->fullName;
        }

        $people = Person::query()->orderBy('id')->get();
        $i = 1;
        foreach ($people as $person) {
            $this->personXref[$person->id] = '@I'.$i.'@';
            $i++;
        }

        $couples = Couple::query()->orderBy('id')->get();
        $i = 1;
        foreach ($couples as $couple) {
            $this->familyXref[$couple->id] = '@F'.$i.'@';
            $i++;
        }

        foreach ($people as $person) {
            $xref = $this->personXref[$person->id];
            $lines[] = '0 '.$xref.' INDI';

            $given = trim(collect([$person->first_name, $person->given_name])->filter()->join(' '));
            $surname = (string) ($person->family_name ?? '');
            $lines[] = '1 NAME '.$this->escape($given).' /'.$this->escape($surname).'/';
            if ($given !== '') {
                $lines[] = '2 GIVN '.$this->escape($given);
            }
            if ($surname !== '') {
                // Let HA importer split Dutch prefixes (van, de, …)
                $lines[] = '2 SURN '.$this->escape($surname);
            }

            $sex = match ($person->sex) {
                SexEnum::Male => 'M',
                SexEnum::Female => 'F',
                default => 'U',
            };
            $lines[] = '1 SEX '.$sex;

            if (filled($person->notes)) {
                $lines[] = '1 NOTE '.$this->escape($person->notes);
            }
            if (filled($person->profession)) {
                $lines[] = '1 OCCU '.$this->escape($person->profession);
            }

            $this->emitEvent(
                $lines,
                'BIRT',
                $person->date_of_birth_unformatted
                    ?? ($person->date_of_birth?->format('d M Y') ?: null),
                $person->place_of_birth_id,
                $person->place_of_birth,
            );

            if ($person->deceased) {
                $deathDate = $person->date_of_death_unformatted
                    ?? ($person->date_of_death?->format('d M Y') ?: null);
                if ($deathDate || filled($person->place_of_death) || $person->place_of_death_id) {
                    $this->emitEvent(
                        $lines,
                        'DEAT',
                        $deathDate,
                        $person->place_of_death_id,
                        $person->place_of_death,
                    );
                } else {
                    $lines[] = '1 DEAT Y';
                }
            }

            if ($person->couple_id && isset($this->familyXref[$person->couple_id])) {
                $lines[] = '1 FAMC '.$this->familyXref[$person->couple_id];
            }

            foreach ($couples as $couple) {
                if ($couple->husband_id === $person->id || $couple->wife_id === $person->id) {
                    $lines[] = '1 FAMS '.$this->familyXref[$couple->id];
                }
            }

            foreach ($person->sources as $source) {
                if (! isset($this->sourceXref[$source->id])) {
                    continue;
                }
                $lines[] = '1 SOUR '.$this->sourceXref[$source->id];
            }
        }

        foreach ($couples as $couple) {
            $xref = $this->familyXref[$couple->id];
            $lines[] = '0 '.$xref.' FAM';
            if ($couple->husband_id && isset($this->personXref[$couple->husband_id])) {
                $lines[] = '1 HUSB '.$this->personXref[$couple->husband_id];
            }
            if ($couple->wife_id && isset($this->personXref[$couple->wife_id])) {
                $lines[] = '1 WIFE '.$this->personXref[$couple->wife_id];
            }

            $children = Person::query()->where('couple_id', $couple->id)->orderBy('id')->get();
            foreach ($children as $child) {
                if (isset($this->personXref[$child->id])) {
                    $lines[] = '1 CHIL '.$this->personXref[$child->id];
                }
            }

            if ($couple->children_count !== null) {
                $lines[] = '1 NCHI '.(int) $couple->children_count;
            }

            $marrDate = $couple->date_of_marriage_unformatted
                ?? ($couple->date_of_marriage?->format('d M Y') ?: null);
            if ($marrDate || filled($couple->place_of_marriage) || $couple->place_of_marriage_id) {
                $this->emitEvent(
                    $lines,
                    'MARR',
                    $marrDate,
                    $couple->place_of_marriage_id,
                    $couple->place_of_marriage,
                );
            }

            $divDate = $couple->date_of_divorce_unformatted
                ?? ($couple->date_of_divorce?->format('d M Y') ?: null);
            if ($divDate) {
                $this->emitEvent($lines, 'DIV', $divDate, null, null);
            }

            foreach ($couple->sources as $source) {
                if (! isset($this->sourceXref[$source->id])) {
                    continue;
                }
                $lines[] = '1 SOUR '.$this->sourceXref[$source->id];
            }
        }

        $lines[] = '0 TRLR';

        File::put($path, implode("\n", $lines)."\n");
        $this->info(sprintf(
            'Wrote %s (%d people, %d families, %d sources)',
            $path,
            count($this->personXref),
            count($this->familyXref),
            count($this->sourceXref),
        ));

        return self::SUCCESS;
    }

    /**
     * @param  list<string>  $lines
     */
    private function emitEvent(
        array &$lines,
        string $tag,
        ?string $date,
        ?int $placeId,
        ?string $placeText,
    ): void {
        $lines[] = '1 '.$tag;
        if (filled($date)) {
            $lines[] = '2 DATE '.$this->escape(strtoupper((string) $date));
        }

        $placeName = null;
        $lat = null;
        $lng = null;
        if ($placeId && isset($this->placeXref[$placeId])) {
            $placeName = $this->placeXref[$placeId];
            $location = Location::query()->find($placeId);
            if ($location?->coordinates) {
                $lat = $location->coordinates->latitude;
                $lng = $location->coordinates->longitude;
            }
        } elseif (filled($placeText)) {
            $placeName = $placeText;
        }

        if (filled($placeName)) {
            $lines[] = '2 PLAC '.$this->escape((string) $placeName);
            if ($lat !== null && $lng !== null) {
                $ns = $lat >= 0 ? 'N' : 'S';
                $ew = $lng >= 0 ? 'E' : 'W';
                $lines[] = '2 MAP';
                $lines[] = '3 LATI '.$ns.abs($lat);
                $lines[] = '3 LONG '.$ew.abs($lng);
            }
        }
    }

    private function escape(string $value): string
    {
        return str_replace(["\r", "\n"], ['', ' '], $value);
    }
}
