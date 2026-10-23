/** Shared helpers for Family Tree Lovelace cards. */

import type { HassEntity, HomeAssistant } from "../types";

export type CardLang = "en" | "nl";

const EN = {
  upcoming_title: "Upcoming",
  on_this_day_title: "On this day",
  mini_tree_title: "Family",
  birthday: "Birthday",
  anniversary: "Anniversary",
  memorial: "Memorial",
  birth: "Born",
  baptism: "Baptized",
  death: "Died",
  marriage: "Married",
  partnership: "Partnership",
  empty_upcoming: "No upcoming events",
  empty_on_this_day: "Nothing on this day",
  missing_entity: "Family Tree sensor not found",
  empty_tree: "No person selected",
  parents: "Parents",
  partners: "Partners",
  children: "Children",
  days_today: "today",
  days_tomorrow: "tomorrow",
  days_in: "in %s days",
  years_ago: "%s years ago",
  loading: "Loading…",
  error: "Could not load",
} as const;

const NL: Record<keyof typeof EN, string> = {
  upcoming_title: "Komend",
  on_this_day_title: "Op deze dag",
  mini_tree_title: "Familie",
  birthday: "Verjaardag",
  anniversary: "Jubileum",
  memorial: "Herdenking",
  birth: "Geboren",
  baptism: "Gedoopt",
  death: "Overleden",
  marriage: "Getrouwd",
  partnership: "Partnerschap",
  empty_upcoming: "Geen komende gebeurtenissen",
  empty_on_this_day: "Niets op deze dag",
  missing_entity: "Family Tree-sensor niet gevonden",
  empty_tree: "Geen persoon gekozen",
  parents: "Ouders",
  partners: "Partners",
  children: "Kinderen",
  days_today: "vandaag",
  days_tomorrow: "morgen",
  days_in: "over %s dagen",
  years_ago: "%s jaar geleden",
  loading: "Laden…",
  error: "Kon niet laden",
};

export type CardStringKey = keyof typeof EN;

export function cardLang(hass?: HomeAssistant | null): CardLang {
  const raw = (hass?.locale?.language || hass?.language || "en").toLowerCase();
  return raw.startsWith("nl") ? "nl" : "en";
}

export function tt(hass: HomeAssistant | null | undefined, key: CardStringKey): string {
  const table = cardLang(hass) === "nl" ? NL : EN;
  return table[key];
}

export function daysLabel(hass: HomeAssistant | null | undefined, days: number): string {
  if (days === 0) return tt(hass, "days_today");
  if (days === 1) return tt(hass, "days_tomorrow");
  return tt(hass, "days_in").replace("%s", String(days));
}

export function findSensorEntity(
  hass: HomeAssistant | null | undefined,
  suffix: string,
): HassEntity | null {
  if (!hass?.states) return null;
  const needle = `_${suffix}`;
  for (const entity of Object.values(hass.states)) {
    if (!entity.entity_id.startsWith("sensor.")) continue;
    if (entity.entity_id.endsWith(needle) || entity.entity_id === `sensor.${suffix}`) {
      return entity;
    }
  }
  return null;
}

export function resolveEntity(
  hass: HomeAssistant | null | undefined,
  configured: string | undefined,
  suffix: string,
): HassEntity | null {
  if (configured && hass?.states?.[configured]) {
    return hass.states[configured];
  }
  return findSensorEntity(hass, suffix);
}

export interface UpcomingItem {
  kind: "birthday" | "anniversary" | "memorial";
  label: string;
  days_until: number;
  next_date?: string;
  detail?: string;
}

export function collectUpcoming(
  attrs: Record<string, unknown> | undefined,
  limit = 8,
): UpcomingItem[] {
  const items: UpcomingItem[] = [];
  const birthdays = (attrs?.birthdays as Array<Record<string, unknown>>) || [];
  const anniversaries = (attrs?.anniversaries as Array<Record<string, unknown>>) || [];
  const memorials = (attrs?.memorials as Array<Record<string, unknown>>) || [];

  for (const b of birthdays) {
    items.push({
      kind: "birthday",
      label: String(b.name || ""),
      days_until: Number(b.days_until ?? 0),
      next_date: b.next_date != null ? String(b.next_date) : undefined,
      detail: b.age != null ? String(b.age) : undefined,
    });
  }
  for (const a of anniversaries) {
    const names = (a.names as string[]) || [];
    items.push({
      kind: "anniversary",
      label: names.join(" & ") || String(a.name || ""),
      days_until: Number(a.days_until ?? 0),
      next_date: a.next_date != null ? String(a.next_date) : undefined,
      detail: a.years != null ? String(a.years) : undefined,
    });
  }
  for (const m of memorials) {
    items.push({
      kind: "memorial",
      label: String(m.name || ""),
      days_until: Number(m.days_until ?? 0),
      next_date: m.next_date != null ? String(m.next_date) : undefined,
      detail: m.years != null ? String(m.years) : undefined,
    });
  }
  items.sort((a, b) => a.days_until - b.days_until || a.label.localeCompare(b.label));
  return items.slice(0, limit);
}

export interface OnThisDayItem {
  kind: string;
  label: string;
  year?: number;
  years_ago?: number;
}

export function collectOnThisDay(
  attrs: Record<string, unknown> | undefined,
): OnThisDayItem[] {
  const events = (attrs?.events as Array<Record<string, unknown>>) || [];
  return events.map((e) => {
    const names = (e.names as string[]) || [];
    const label =
      names.length > 1
        ? names.join(" & ")
        : String(e.name || names[0] || "—");
    return {
      kind: String(e.kind || "birth"),
      label,
      year: e.year != null ? Number(e.year) : undefined,
      years_ago: e.years_ago != null ? Number(e.years_ago) : undefined,
    };
  });
}

export function kindLabel(
  hass: HomeAssistant | null | undefined,
  kind: string,
): string {
  const key = kind as CardStringKey;
  if (key in EN) return tt(hass, key);
  return kind;
}

export function onThisDayMeta(
  hass: HomeAssistant | null | undefined,
  item: OnThisDayItem,
): string {
  if (item.years_ago != null) {
    return tt(hass, "years_ago").replace("%s", String(item.years_ago));
  }
  if (item.year != null) {
    return String(item.year);
  }
  return "";
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

export function registerCard(meta: {
  type: string;
  name: string;
  description: string;
}): void {
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: meta.type,
    name: meta.name,
    description: meta.description,
    preview: true,
  });
}
