/** Pure people list filtering / sorting helpers. */

import type { LifeEventDto, PersonDto } from "./api";
import type { PanelSort } from "./panel_view_state";

export interface PeopleViewFilters {
  search: string;
  filterLiving: string;
  filterSex: string;
  sort: PanelSort;
  familyShortcut: string;
  filterPlace: string;
  dateFrom: string;
  dateTo: string;
}

export interface PlaceOption {
  id: string;
  label: string;
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

function lifeEvents(person: PersonDto): LifeEventDto[] {
  return person.life_events || [];
}

function isoDay(sortDate: string | null | undefined): string | null {
  if (!sortDate) return null;
  const day = sortDate.trim().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : null;
}

/** True if any life-event sort_date falls in [dateFrom, dateTo] (inclusive, open ends). */
export function matchesDateRange(
  person: PersonDto,
  dateFrom: string,
  dateTo: string,
): boolean {
  const from = dateFrom.trim();
  const to = dateTo.trim();
  if (!from && !to) return true;
  const events = lifeEvents(person);
  for (const ev of events) {
    const day = isoDay(ev.sort_date);
    if (!day) continue;
    if (from && day < from) continue;
    if (to && day > to) continue;
    return true;
  }
  return false;
}

export function matchesPlace(person: PersonDto, placeId: string): boolean {
  const needle = placeId.trim();
  if (!needle) return true;
  return lifeEvents(person).some((ev) => ev.place_id === needle);
}

/** Unique places from loaded people, sorted by label. */
export function placeOptionsFromPeople(people: PersonDto[]): PlaceOption[] {
  const byId = new Map<string, string>();
  for (const person of people) {
    for (const ev of lifeEvents(person)) {
      if (!ev.place_id) continue;
      const label = (ev.place_name || "").trim() || ev.place_id;
      if (!byId.has(ev.place_id)) byId.set(ev.place_id, label);
    }
  }
  return [...byId.entries()]
    .map(([id, label]) => ({ id, label }))
    .sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" }),
    );
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
    if (!matchesPlace(p, filters.filterPlace)) return false;
    if (!matchesDateRange(p, filters.dateFrom, filters.dateTo)) return false;
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
