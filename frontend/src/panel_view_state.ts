/** Persist Family Tree panel search / filters across remounts. */

export type PanelSort =
  | "name"
  | "surname"
  | "updated"
  | "birth"
  | "death"
  | "sex"
  | "father"
  | "mother"
  | "children";
export type SortDir = "asc" | "desc";
export type PanelView = "dashboard" | "people" | "trash" | "settings" | "person";

export interface PanelViewState {
  search: string;
  filterLiving: string;
  filterSex: string;
  sort: PanelSort;
  sortDir: SortDir;
  view: PanelView;
  familyShortcut: string;
  filterPlace: string;
  dateFrom: string;
  dateTo: string;
  filtersOpen: boolean;
}

export const DEFAULT_PANEL_VIEW: PanelViewState = {
  search: "",
  filterLiving: "all",
  filterSex: "",
  sort: "surname",
  sortDir: "asc",
  view: "dashboard",
  familyShortcut: "",
  filterPlace: "",
  dateFrom: "",
  dateTo: "",
  filtersOpen: false,
};

const STORAGE_PREFIX = "family_tree.panel.view";
const SORTS: ReadonlySet<string> = new Set([
  "name",
  "surname",
  "updated",
  "birth",
  "death",
  "sex",
  "father",
  "mother",
  "children",
]);
const VIEWS: ReadonlySet<string> = new Set([
  "dashboard",
  "people",
  "trash",
  "settings",
  "person",
]);

export function panelViewStorageKey(entryId?: string | null): string {
  return entryId ? `${STORAGE_PREFIX}.${entryId}` : STORAGE_PREFIX;
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

export function loadPanelViewState(
  storage: Pick<Storage, "getItem"> | null | undefined,
  entryId?: string | null,
): PanelViewState {
  if (!storage) return { ...DEFAULT_PANEL_VIEW };
  try {
    const raw = storage.getItem(panelViewStorageKey(entryId));
    if (!raw) return { ...DEFAULT_PANEL_VIEW };
    const parsed = JSON.parse(raw) as Partial<PanelViewState>;
    const sort = asString(parsed.sort, "surname");
    const view = asString(parsed.view, "dashboard");
    return {
      search: asString(parsed.search, ""),
      filterLiving: asString(parsed.filterLiving, "all"),
      filterSex: asString(parsed.filterSex, ""),
      sort: (SORTS.has(sort) ? sort : "surname") as PanelSort,
      sortDir: parsed.sortDir === "desc" ? "desc" : "asc",
      view: (VIEWS.has(view) ? view : "dashboard") as PanelView,
      familyShortcut: asString(parsed.familyShortcut, ""),
      filterPlace: asString(parsed.filterPlace, ""),
      dateFrom: asString(parsed.dateFrom, ""),
      dateTo: asString(parsed.dateTo, ""),
      filtersOpen: Boolean(parsed.filtersOpen),
    };
  } catch {
    return { ...DEFAULT_PANEL_VIEW };
  }
}

export function savePanelViewState(
  storage: Pick<Storage, "setItem"> | null | undefined,
  state: PanelViewState,
  entryId?: string | null,
): void {
  if (!storage) return;
  try {
    storage.setItem(panelViewStorageKey(entryId), JSON.stringify(state));
  } catch {
    // Quota / private mode — ignore.
  }
}

/** Deduplicate options (case-insensitive) and sort by localeCompare. */
export function sortedOptionList(
  options: string[],
  current = "",
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of [...options, current]) {
    const v = value?.trim();
    if (!v) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
  }
  out.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  return out;
}
