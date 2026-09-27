/** Pure people list filtering / sorting helpers. */

import type { PersonDto } from "./api";
import type { PanelSort } from "./panel_view_state";

export interface PeopleViewFilters {
  search: string;
  filterLiving: string;
  filterSex: string;
  sort: PanelSort;
  familyShortcut: string;
}

export function personDisplayName(person: PersonDto): string {
  if (person.display_name) return person.display_name;
  const given = (person.call_name || person.given_names || "").trim();
  const first = given.includes(" ") && !person.call_name ? given.split(/\s+/)[0] : given;
  const parts = [first, person.surname_prefix, person.surname]
    .map((p) => (p || "").trim())
    .filter(Boolean);
  return parts.join(" ") || "Unknown";
}

export function matchesFamilyShortcut(person: PersonDto, shortcut: string): boolean {
  const needle = shortcut.trim().toLowerCase();
  if (!needle) return true;
  const full = `${person.surname_prefix || ""} ${person.surname || ""}`
    .trim()
    .toLowerCase();
  const bare = (person.surname || "").toLowerCase();
  return full.startsWith(needle) || bare.startsWith(needle);
}

export function filterAndSortPeople(
  people: PersonDto[],
  filters: PeopleViewFilters,
): PersonDto[] {
  const search = filters.search.trim().toLowerCase();
  let list = people.filter((p) => {
    if (filters.filterLiving === "living" && !p.is_living) return false;
    if (filters.filterLiving === "deceased" && p.is_living) return false;
    if (filters.filterSex && p.sex !== filters.filterSex) return false;
    if (!matchesFamilyShortcut(p, filters.familyShortcut)) return false;
    if (!search) return true;
    const hay = [
      p.given_names,
      p.call_name,
      p.surname_prefix,
      p.surname,
      personDisplayName(p),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(search);
  });

  list = [...list].sort((a, b) => {
    if (filters.sort === "name") {
      return personDisplayName(a).localeCompare(personDisplayName(b), undefined, {
        sensitivity: "base",
      });
    }
    if (filters.sort === "updated") {
      return (b.updated_at || "").localeCompare(a.updated_at || "");
    }
    // surname (Dutch: bare surname, then given)
    const sa = (a.surname || "").toLowerCase();
    const sb = (b.surname || "").toLowerCase();
    if (sa !== sb) return sa.localeCompare(sb);
    return (a.given_names || "").localeCompare(b.given_names || "", undefined, {
      sensitivity: "base",
    });
  });

  return list;
}
