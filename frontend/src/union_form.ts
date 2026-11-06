/** Pure rules for the person events list and the couple edit dialog. */

import type { LocaleKey } from "./i18n";

export type DateFormScope = "person" | "union";

/** Person events owned by the person dialog (birth/death sections); not editable in the list. */
const CORE_PERSON_EVENT_TYPES = new Set(["birth", "baptism", "death", "burial"]);

export function isManualPersonEvent(ev: { subject_type: string; type: string }): boolean {
  return ev.subject_type === "person" && !CORE_PERSON_EVENT_TYPES.has(ev.type);
}

export const UNION_TYPES = [
  "marriage",
  "registered_partnership",
  "cohabitation",
  "engagement",
  "unknown",
] as const;

/** Event kinds a couple's start date can be stored as. */
export const UNION_START_EVENT_TYPES = [
  "marriage",
  "partnership",
  "cohabitation",
  "engagement",
] as const;

export type UnionStartEventType = (typeof UNION_START_EVENT_TYPES)[number];

const START_EVENT_BY_TYPE: Record<string, UnionStartEventType> = {
  registered_partnership: "partnership",
  cohabitation: "cohabitation",
  engagement: "engagement",
};

/** Event kind that holds the start date for a relationship type. */
export function unionStartEventType(unionType: string): UnionStartEventType {
  return START_EVENT_BY_TYPE[unionType] ?? "marriage";
}

/** i18n key for the start-date label of a relationship type. */
export function unionStartLabelKey(unionType: string): LocaleKey {
  return startEventLabelKey(unionStartEventType(unionType));
}

/** i18n key for the label of a start event kind. */
export function startEventLabelKey(kind: string): LocaleKey {
  switch (kind) {
    case "partnership":
      return "event_partnership";
    case "cohabitation":
      return "event_start_cohabitation";
    case "engagement":
      return "event_engagement";
    default:
      return "event_marriage";
  }
}

/**
 * The couple's start event: the one of the type's own kind, else any other start kind that
 * exists, so a date stored under a different kind is still shown and editable.
 */
export function pickStartEvent<T extends { type: string }>(
  events: readonly T[],
  unionType: string,
): T | undefined {
  const wanted = unionStartEventType(unionType);
  return (
    events.find((e) => e.type === wanted) ??
    events.find((e) => (UNION_START_EVENT_TYPES as readonly string[]).includes(e.type))
  );
}

export interface DateTextResult {
  text: string;
  error: boolean;
}

/**
 * Resolve a couple date field. When strict building failed but the user left a legacy
 * free-text date untouched (advanced mode, exact, same text), keep it verbatim.
 */
export function resolveUnionDateText(
  built: DateTextResult,
  form: { mode: string; qualifier: string; first: string },
  orig: string,
): DateTextResult {
  if (!built.error) return built;
  const untouched =
    form.mode === "advanced" && (form.qualifier || "exact") === "exact" && form.first === orig;
  return orig && untouched ? { text: orig, error: false } : built;
}

/** Event kinds that belong to a couple (start dates and the end date). */
export const UNION_EVENT_KINDS: ReadonlySet<string> = new Set([
  ...UNION_START_EVENT_TYPES,
  "divorce",
]);

const ENDED_STATUSES = new Set(["divorced", "separated"]);

/** The start date is always shown; divorced and separated couples also show an end date. */
export function unionDateFields(status: string): { end: boolean } {
  return { end: ENDED_STATUSES.has(status) };
}
