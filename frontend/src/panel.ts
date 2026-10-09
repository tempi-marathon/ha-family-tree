/** Family Tree sidebar management panel. */

import Chart from "chart.js/auto";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import {
  type GazetteerHit,
  type EventDto,
  type MyLineageDto,
  type PersonDetail,
  type PersonDto,
  type PlaceDto,
  type StatsDto,
  type TreeUnion,
  addParentChild,
  claimUserLink,
  deleteEvent,
  deletePerson,
  deleteUnion,
  getUnion,
  removeParentChild,
  gazetteerStatus,
  getMyLineage,
  getPerson,
  getSiblings,
  getSettings,
  getStats,
  listPersons,
  listUserLinks,
  purgePerson,
  restorePerson,
  listPlaces,
  saveEvent,
  savePerson,
  savePlace,
  saveUnion,
  searchGazetteer,
  setUserLink,
  subscribeRevision,
  type SettingsDto,
} from "./api";
import {
  FORM_QUALIFIERS,
  type DateQualifier,
  buildGedcomDate,
  formatDeathCell,
  formatEventDate,
  formatLifespan,
  gedcomToForm,
} from "./date_format";
import {
  daysUntilLabel,
  formatGedcomDate,
  formatLifespanLine,
  gedcomToIsoDate,
  isoToGedcomDate,
} from "./dates_view";
import { formatHassError } from "./errors";
import { type LocaleKey, t } from "./i18n";
import {
  loadPanelViewState,
  savePanelViewState,
  sortedOptionList,
  type PanelSort,
  type PanelView,
  type SortDir,
} from "./panel_view_state";
import {
  filterAndSortPeople,
  personDisplayName,
  placeOptionsFromPeople,
} from "./people_view";
import { nodeName } from "./tree_view";
import type { HomeAssistant } from "./types";

const PANEL_TAG = "family-tree-panel";

const MDI_MENU =
  "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
const MDI_CLOSE =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
const MDI_ACCOUNT =
  "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
const MDI_COG =
  "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
const MDI_DELETE =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const MDI_PLUS =
  "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
const MDI_GENDER_MALE =
  "M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z";
const MDI_GENDER_FEMALE =
  "M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z";
const MDI_STAR =
  "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z";
const MDI_STAR_OUTLINE =
  "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z";
const MDI_DOTS_VERTICAL =
  "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
const MDI_MENU_DOWN = "M7,10L12,15L17,10H7Z";
const MDI_MENU_UP = "M7,15L12,10L17,15H7Z";
const MDI_CHEVRON_DOWN =
  "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
const MDI_CHEVRON_RIGHT =
  "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
const MDI_BOOKMARK_OUTLINE =
  "M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z";
const MDI_INFORMATION =
  "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";

const BRAND_LOGO_URL = "/api/family_tree/brand/logo.png";
const BRAND_LOGO_DARK_URL = "/api/family_tree/brand/dark_logo.png";

type PersonTab = "details" | "relationships" | "tree" | "sources";
type DialogMode =
  | "person"
  | "event"
  | "import"
  | "siblings"
  | "preview"
  | "union"
  | "pickPerson"
  | "parents";
type RelationTarget =
  | { kind: "parent"; personId: string }
  | { kind: "partner"; personId: string }
  | { kind: "child"; personId: string; unionId?: string; coParentId?: string };

const EVENT_TYPE_KEYS: Record<string, LocaleKey> = {
  birth: "event_birth",
  death: "event_death",
  baptism: "event_baptism",
  burial: "event_burial",
  occupation: "event_occupation",
  residence: "event_residence",
  marriage: "event_marriage",
  divorce: "event_divorce",
  partnership: "event_partnership",
};

/** Person-subject event types offered in the event form (marriage etc. live on unions). */
const PERSON_EVENT_TYPES = ["birth", "baptism", "occupation", "residence", "death", "burial"];
/** Mirrors backend UNIQUE_PERSON_EVENT_TYPES. */
const UNIQUE_PERSON_EVENT_TYPES = new Set(["birth", "baptism", "death", "burial"]);

const QUALIFIER_KEYS: Record<DateQualifier, LocaleKey> = {
  exact: "qual_exact",
  about: "qual_about",
  before: "qual_before",
  after: "qual_after",
  between: "qual_between",
  from_to: "qual_from_to",
  estimated: "qual_estimated",
  calculated: "qual_calculated",
};

const MOBILE_QUERY = "(max-width: 720px)";

function icon(path: string) {
  return html`<svg class="mdi" viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>`;
}

function brandLogo(hass?: HomeAssistant, alt = "") {
  const dark = Boolean(hass?.themes?.darkMode);
  const src = dark ? BRAND_LOGO_DARK_URL : BRAND_LOGO_URL;
  return html`<img class="brand-logo" src=${src} alt=${alt} height="36" />`;
}

function tooltip(content: string, inner: unknown) {
  return html`
    <span class="ft-tooltip" tabindex="0">
      ${inner}
      <span class="ft-tooltip__popup" role="tooltip">${content}</span>
    </span>
  `;
}

function mdButton(
  label: string,
  opts: {
    variant?: "filled" | "outlined" | "text";
    disabled?: boolean;
    active?: boolean;
    onClick: (e: Event) => void;
  },
) {
  const variant = opts.variant ?? "outlined";
  const active = opts.active ? " md-btn-active" : "";
  return html`
    <button
      type="button"
      class="md-btn md-btn-${variant}${active}"
      ?disabled=${opts.disabled ?? false}
      @click=${opts.onClick}
    >
      ${label}
    </button>
  `;
}

export class FamilyTreePanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean }) public narrow = false;
  @property({ attribute: false }) public panel?: {
    config?: Record<string, unknown>;
  };

  @state() private _view: PanelView = "dashboard";
  @state() private _search = "";
  @state() private _filterLiving = "all";
  @state() private _filterSex = "";
  @state() private _familyShortcut = "";
  @state() private _filterPlace = "";
  @state() private _dateFrom = "";
  @state() private _dateTo = "";
  @state() private _filtersOpen = false;
  @state() private _people: PersonDto[] = [];
  @state() private _total = 0;
  @state() private _stats: StatsDto | null = null;
  @state() private _settings: SettingsDto | null = null;
  @state() private _detail: PersonDetail | null = null;
  @state() private _personTab: PersonTab = "details";
  @state() private _dialogOpen = false;
  @state() private _dialogMode: DialogMode = "person";
  @state() private _editing: PersonDto | null = null;
  @state() private _form: Record<string, string> = {};
  @state() private _eventForm: Record<string, string> = {};
  @state() private _error = "";
  @state() private _saving = false;
  @state() private _loading = true;
  @state() private _userLinks: Array<Record<string, unknown>> = [];
  @state() private _gazetteer: Record<string, unknown> | null = null;
  @state() private _gazQuery = "";
  @state() private _gazHits: GazetteerHit[] = [];
  @state() private _replaceImport = false;
  @state() private _importStatus = "";
  @state() private _importFile: File | null = null;
  @state() private _importReport: Record<string, number> | null = null;
  @state() private _importPhase: "" | "preview" | "importing" | "done" = "";
  @state() private _sort: PanelSort = "surname";
  @state() private _sortDir: SortDir = "asc";
  @state() private _lineage: MyLineageDto | null = null;
  @state() private _isMobile = false;
  @state() private _rowMenu: string | null = null;
  @state() private _rowMenuAnchor: {
    top: number;
    bottom: number;
    right: number;
    up: boolean;
  } | null = null;
  @state() private _collapsed: Record<string, boolean> = {};
  @state() private _editingEventId: string | null = null;
  @state() private _relationTarget: RelationTarget | null = null;
  @state() private _treeUnion = 0;
  @state() private _meQuery = "";
  @state() private _meCreateOpen = false;
  @state() private _meForm: Record<string, string> = {};
  @state() private _fieldErrors: Record<string, string> = {};
  @state() private _importFileName = "";
  @state() private _unionForm: Record<string, string> = {};
  @state() private _editingUnionId: string | null = null;
  @state() private _pickPersonQuery = "";
  @state() private _pickPersonRole: "partner" | "father" | "mother" | null = null;
  @state() private _parentsForm: Record<string, string> = {};
  @state() private _placeSuggestions: PlaceDto[] = [];
  @state() private _placeSuggestOpen = false;
  @state() private _siblingsPersonId = "";
  @state() private _siblingsPersonName = "";
  @state() private _siblingsList: Array<Record<string, unknown>> = [];
  @state() private _siblingsLoading = false;
  @state() private _previewDetail: PersonDetail | null = null;
  @state() private _previewLoading = false;

  private _unsub: (() => void) | null = null;
  private _placeSearchTimer: ReturnType<typeof setTimeout> | null = null;
  private _mql: MediaQueryList | null = null;
  private _connected = false;
  private _viewHydrated = false;
  private _charts: Chart[] = [];
  private _revision = 0;
  private _chartsStatsKey = "";

  connectedCallback(): void {
    super.connectedCallback();
    this._connected = true;
    this._restoreViewState();
    window.addEventListener("keydown", this._onWindowKeyDown);
    window.addEventListener("click", this._onWindowClick);
    window.addEventListener("scroll", this._onWindowScroll, true);
    window.addEventListener("resize", this._onWindowScroll);
    if (typeof window.matchMedia === "function") {
      this._mql = window.matchMedia(MOBILE_QUERY);
      this._isMobile = this._mql.matches;
      this._mql.addEventListener("change", this._onMediaChange);
    }
    void this._connect();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._connected = false;
    window.removeEventListener("keydown", this._onWindowKeyDown);
    window.removeEventListener("click", this._onWindowClick);
    window.removeEventListener("scroll", this._onWindowScroll, true);
    window.removeEventListener("resize", this._onWindowScroll);
    this._mql?.removeEventListener("change", this._onMediaChange);
    this._mql = null;
    this._unsub?.();
    this._unsub = null;
    this._destroyCharts();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass && !this._unsub && this._connected) {
      void this._connect();
    }
    if (this._view !== "dashboard" || this._loading) {
      if (this._chartsStatsKey) {
        this._chartsStatsKey = "";
        this._destroyCharts();
      }
      return;
    }
    if (this._stats) {
      const key = JSON.stringify(this._stats);
      if (key !== this._chartsStatsKey) {
        this.updateComplete.then(() => {
          // Only remember the key once canvases existed and charts were drawn;
          // otherwise the next update (e.g. after loading ends) must retry.
          if (this._renderCharts()) this._chartsStatsKey = key;
        });
      }
    }
  }

  private _tt(key: LocaleKey): string {
    return t(this.hass?.language, key);
  }

  private _canWrite(): boolean {
    return this.hass?.user?.is_admin === true;
  }

  private _entryId(): string | null {
    const raw = this.panel?.config?.config_entry_id;
    return typeof raw === "string" && raw ? raw : null;
  }

  private _restoreViewState() {
    const saved = loadPanelViewState(
      typeof localStorage !== "undefined" ? localStorage : null,
      this._entryId(),
    );
    this._search = saved.search;
    this._filterLiving = saved.filterLiving;
    this._filterSex = saved.filterSex;
    this._sort = saved.sort;
    this._sortDir = saved.sortDir;
    this._familyShortcut = saved.familyShortcut;
    this._filterPlace = saved.filterPlace;
    this._dateFrom = saved.dateFrom;
    this._dateTo = saved.dateTo;
    this._filtersOpen = saved.filtersOpen;
    this._view = saved.view === "person" ? "people" : saved.view;
    this._viewHydrated = true;
  }

  private _persistViewState() {
    if (!this._viewHydrated) return;
    savePanelViewState(
      typeof localStorage !== "undefined" ? localStorage : null,
      {
        search: this._search,
        filterLiving: this._filterLiving,
        filterSex: this._filterSex,
        sort: this._sort,
        sortDir: this._sortDir,
        view: this._view,
        familyShortcut: this._familyShortcut,
        filterPlace: this._filterPlace,
        dateFrom: this._dateFrom,
        dateTo: this._dateTo,
        filtersOpen: this._filtersOpen,
      },
      this._entryId(),
    );
  }

  private async _connect() {
    if (!this.hass || this._unsub) return;
    try {
      this._settings = await getSettings(this.hass);
      await this._refreshAll();
      this._unsub = await subscribeRevision(this.hass, (data) => {
        if (data.revision !== this._revision) {
          this._revision = data.revision;
          void this._refreshAll();
        }
      });
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._loading = false;
    }
  }

  private async _refreshAll() {
    if (!this.hass) return;
    try {
      const trashed = this._view === "trash";
      const [list, stats, settings, lineage] = await Promise.all([
        listPersons(this.hass, {
          trashed,
          // Full tree — filters apply client-side (ready-home pattern).
          limit: 5000,
        }),
        getStats(this.hass),
        getSettings(this.hass),
        getMyLineage(this.hass).catch(() => null),
      ]);
      this._people = list.persons;
      this._total = list.total;
      this._stats = stats;
      this._settings = settings;
      this._lineage = lineage;
      if (this._detail) {
        this._detail = await getPerson(this.hass, this._detail.person.id);
      }
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private get _activeFilterCount(): number {
    let n = 0;
    if (this._filterLiving !== "all") n += 1;
    if (this._filterSex) n += 1;
    if (this._familyShortcut) n += 1;
    if (this._filterPlace) n += 1;
    if (this._dateFrom) n += 1;
    if (this._dateTo) n += 1;
    return n;
  }

  private _resetFilters = () => {
    this._filterLiving = "all";
    this._filterSex = "";
    this._familyShortcut = "";
    this._filterPlace = "";
    this._dateFrom = "";
    this._dateTo = "";
    this._persistViewState();
  };

  private _clearAllFilters = () => {
    this._search = "";
    this._resetFilters();
  };

  private _closeRowMenu = () => {
    this._rowMenu = null;
    this._rowMenuAnchor = null;
  };

  private _onWindowKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      if (this._rowMenu) this._closeRowMenu();
      else if (this._dialogOpen) this._dialogOpen = false;
    }
  };

  private _onWindowClick = () => {
    if (this._rowMenu) this._closeRowMenu();
  };

  private _onWindowScroll = () => {
    if (this._rowMenu) this._closeRowMenu();
  };

  private _onMediaChange = (ev: MediaQueryListEvent) => {
    this._isMobile = ev.matches;
  };

  private _toggleSort(sort: PanelSort) {
    if (this._sort === sort) {
      this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    } else {
      this._sort = sort;
      this._sortDir = "asc";
    }
    this._persistViewState();
  }

  private _setView(view: PanelView) {
    this._view = view;
    this._detail = null;
    this._persistViewState();
    void this._refreshAll();
  }

  private async _openPerson(id: string, tab: PersonTab = "details") {
    if (!this.hass) return;
    try {
      this._detail = await getPerson(this.hass, id);
      this._view = "person";
      this._personTab = tab;
      this._persistViewState();
      this._scrollMainToTop();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _openPersonPreview(id: string) {
    if (!this.hass || !id) return;
    this._dialogMode = "preview";
    this._dialogOpen = true;
    this._previewLoading = true;
    this._previewDetail = null;
    this._error = "";
    try {
      if (this._detail?.person.id === id) {
        this._previewDetail = this._detail;
      } else {
        this._previewDetail = await getPerson(this.hass, id);
      }
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._previewLoading = false;
    }
  }

  private _scrollMainToTop() {
    requestAnimationFrame(() => {
      const main = this.renderRoot.querySelector(".main");
      main?.scrollTo?.({ top: 0, behavior: "instant" as ScrollBehavior });
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }

  private _openCreate(clearRelation = true) {
    if (clearRelation) this._relationTarget = null;
    this._editing = null;
    this._dialogMode = "person";
    this._error = "";
    this._fieldErrors = {};
    this._form = {
      given_names: "",
      call_name: "",
      surname_prefix: "",
      surname: "",
      sex: "unknown",
      deceased: "false",
      notes: "",
    };
    this._dialogOpen = true;
  }

  private _openEdit(person: PersonDto) {
    this._editing = person;
    this._dialogMode = "person";
    this._error = "";
    this._fieldErrors = {};
    this._form = {
      given_names: person.given_names || "",
      call_name: person.call_name || "",
      surname_prefix: person.surname_prefix || "",
      surname: person.surname || "",
      sex: person.sex || "unknown",
      deceased: person.is_living ? "false" : "true",
      notes: person.notes || "",
    };
    this._dialogOpen = true;
  }

  private _openAddEvent() {
    this._dialogMode = "event";
    this._editingEventId = null;
    this._eventForm = {
      event_type: "birth",
      date_mode: "simple",
      date_iso: "",
      date_qualifier: "exact",
      date_first: "",
      date_second: "",
      place: "",
      description: "",
    };
    this._dialogOpen = true;
  }

  private _openEditEvent(ev: EventDto) {
    const form = gedcomToForm(ev.date_text);
    const date_iso = gedcomToIsoDate(form.first) || "";
    const simple = form.qualifier === "exact" && date_iso !== "";
    this._dialogMode = "event";
    this._editingEventId = ev.id;
    this._eventForm = {
      event_type: ev.type,
      date_mode: simple ? "simple" : "advanced",
      date_iso: simple ? date_iso : "",
      date_qualifier: form.qualifier,
      date_first: form.first,
      date_second: form.second,
      place: ev.place_name || "",
      description: ev.description || "",
    };
    this._dialogOpen = true;
  }

  private _openAddRelation(target: RelationTarget) {
    this._relationTarget = target;
    this._openCreate(false);
  }

  private async _openSiblingsDialog(personId: string, personName?: string) {
    if (!this.hass || !personId) return;
    this._siblingsPersonId = personId;
    this._siblingsPersonName = personName || this._personNameById(personId);
    this._dialogMode = "siblings";
    this._dialogOpen = true;
    this._siblingsLoading = true;
    this._siblingsList = [];
    this._error = "";
    try {
      if (this._detail?.person.id === personId && this._detail.tree?.siblings?.length) {
        this._siblingsList = this._detail.tree.siblings;
      } else {
        const data = await getSiblings(this.hass, personId);
        this._siblingsPersonName = data.person_name || this._siblingsPersonName;
        this._siblingsList = data.siblings;
      }
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._siblingsLoading = false;
    }
  }

  private _myLinkedPersonId(): string | null {
    return this._lineage?.person_id ?? null;
  }

  private _lineageRel(personId: string) {
    return this._lineage?.relatives?.[personId] ?? null;
  }

  private _ordinal(n: number): string {
    const lang = (this.hass?.language || "en").toLowerCase();
    if (lang.startsWith("nl")) {
      return `${n}e`;
    }
    if (n % 10 === 1 && n % 100 !== 11) return `${n}st`;
    if (n % 10 === 2 && n % 100 !== 12) return `${n}nd`;
    if (n % 10 === 3 && n % 100 !== 13) return `${n}rd`;
    return `${n}th`;
  }

  private _personNameById(personId: string): string {
    const fromList = this._people.find((p) => p.id === personId);
    if (fromList) return personDisplayName(fromList);
    if (this._detail?.person.id === personId) {
      return personDisplayName(this._detail.person);
    }
    return personId;
  }

  private _lineageTooltip(personId: string, personName?: string): string {
    const rel = this._lineageRel(personId);
    const anchor = this._lineage?.person_name;
    if (!rel || !anchor) return "";
    const name = personName || this._personNameById(personId);
    const ord = this._ordinal(rel.generation);
    const kind =
      rel.type === "ancestor"
        ? this._tt("lineage_ancestor")
        : this._tt("lineage_descendant");
    const args = [name, ord, kind, anchor];
    let i = 0;
    return this._tt("lineage_tooltip").replace(/%s/g, () => args[i++] || "");
  }

  private _lineageStar(personId: string, personName?: string) {
    if (personId === this._myLinkedPersonId()) {
      return tooltip(
        this._tt("lineage_me"),
        html`<span class="lineage-star">${icon(MDI_STAR)}</span>`,
      );
    }
    const rel = this._lineageRel(personId);
    if (!rel) return nothing;
    return tooltip(
      this._lineageTooltip(personId, personName),
      html`<span class="lineage-star">${icon(MDI_STAR)}</span>`,
    );
  }

  private _deceasedIcon(isLiving: boolean) {
    if (isLiving) return nothing;
    return tooltip(
      this._tt("deceased"),
      html`<span class="deceased-icon">${icon(MDI_BOOKMARK_OUTLINE)}</span>`,
    );
  }

  private _childrenCountLabel(count: number): string {
    if (count === 1) return `1 ${this._tt("child")}`;
    return `${count} ${this._tt("children").toLowerCase()}`;
  }

  private _moreChildrenLabel(count: number): string {
    const key = count === 1 ? "more_child" : "more_children";
    return this._tt(key).replace("%s", String(count));
  }

  private _renderMoreChildrenCard(unknownCount: number, onAdd?: () => void) {
    const label = this._moreChildrenLabel(unknownCount);
    return html`<div class="more-children-card">
      <div class="more-children-label">+ ${label}</div>
      ${onAdd
        ? html`<button type="button" class="linkish more-children-add" @click=${onAdd}>
            ${icon(MDI_PLUS)} ${this._tt("add_child")}
          </button>`
        : nothing}
    </div>`;
  }

  private _renderChildExtras(unknownCount: number, onAdd?: () => void) {
    if (unknownCount > 0) {
      return this._renderMoreChildrenCard(unknownCount, onAdd);
    }
    if (!onAdd) return nothing;
    return html`<button type="button" class="add-slot" @click=${onAdd}>
      ${icon(MDI_PLUS)} ${this._tt("add_child")}
    </button>`;
  }

  private _fieldLabel(text: string, required = false) {
    return html`<span class="field-label"
      >${text}${required
        ? html`<span class="req" aria-hidden="true">*</span>`
        : nothing}</span
    >`;
  }

  private _fieldError(key: string) {
    const msg = this._fieldErrors[key];
    return msg ? html`<div class="field-error">${msg}</div>` : nothing;
  }

  private _fieldInvalid(key: string): boolean {
    return Boolean(this._fieldErrors[key]);
  }

  private _onPersonField(key: string, e: Event) {
    const value = (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
      .value;
    this._form = { ...this._form, [key]: value };
    if (this._fieldErrors[key]) {
      const next = { ...this._fieldErrors };
      delete next[key];
      this._fieldErrors = next;
    }
  }

  private _validatePersonForm(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!(this._form.given_names || "").trim()) {
      errors.given_names = this._tt("field_required");
    }
    return errors;
  }

  private _parentsCell(p: PersonDto) {
    const parts: unknown[] = [];
    if (p.father) parts.push(this._personLink(p.father));
    if (p.mother) {
      if (parts.length) parts.push(html`<span class="muted"> · </span>`);
      parts.push(this._personLink(p.mother));
    }
    return parts.length ? parts : html`<span class="muted">—</span>`;
  }

  private _truncatePlaceLabel(label: string): string {
    const comma = label.indexOf(",");
    return comma > 0 ? label.slice(0, comma).trim() : label;
  }

  private _schedulePlaceSearch(value: string) {
    if (this._placeSearchTimer) clearTimeout(this._placeSearchTimer);
    const q = value.trim();
    if (!q || !this.hass) {
      this._placeSuggestions = [];
      this._placeSuggestOpen = false;
      return;
    }
    this._placeSearchTimer = setTimeout(() => {
      void listPlaces(this.hass, { search: q, limit: 8 }).then((res) => {
        this._placeSuggestions = res.places;
        this._placeSuggestOpen = res.places.length > 0;
      });
    }, 250);
  }

  private _sexBadge(sex: string) {
    const cls =
      sex === "male" ? "sex-male" : sex === "female" ? "sex-female" : "sex-other";
    const iconPath =
      sex === "male"
        ? MDI_GENDER_MALE
        : sex === "female"
          ? MDI_GENDER_FEMALE
          : MDI_ACCOUNT;
    const key = `sex_${sex}` as LocaleKey;
    const label = this._tt(key) !== key ? this._tt(key) : sex;
    return html`<span class="sex-badge ${cls}">${icon(iconPath)} ${label}</span>`;
  }

  private _sexIconBadge(sex: string) {
    const cls =
      sex === "male" ? "sex-male" : sex === "female" ? "sex-female" : "sex-other";
    const iconPath =
      sex === "male"
        ? MDI_GENDER_MALE
        : sex === "female"
          ? MDI_GENDER_FEMALE
          : MDI_ACCOUNT;
    const key = `sex_${sex}` as LocaleKey;
    const label = this._tt(key) !== key ? this._tt(key) : sex;
    return tooltip(
      label,
      html`<span class="sex-badge sex-badge--icon-only ${cls}">${icon(iconPath)}</span>`,
    );
  }

  private _sortIcon(sort: PanelSort) {
    if (this._sort !== sort) return nothing;
    return icon(this._sortDir === "asc" ? MDI_MENU_UP : MDI_MENU_DOWN);
  }

  private _sortTh(label: string, sort: PanelSort) {
    return html`<th>
      <button type="button" class="sort-btn" @click=${() => this._toggleSort(sort)}>
        ${label} ${this._sortIcon(sort)}
      </button>
    </th>`;
  }

  private _personLink(ref: { id: string; name: string } | null | undefined) {
    if (!ref) return html`<span class="muted">—</span>`;
    return html`<button type="button" class="linkish" @click=${() => this._openPerson(ref.id)}>
      ${ref.name}
    </button>`;
  }

  private _toggleSection(key: string) {
    this._collapsed = { ...this._collapsed, [key]: !this._collapsed[key] };
  }

  private _sectionOpen(key: string, defaultOpen = true): boolean {
    if (key in this._collapsed) return !this._collapsed[key];
    return defaultOpen;
  }

  private _usedUniqueEventTypes(): Set<string> {
    if (!this._detail) return new Set();
    const editing = this._editingEventId;
    return new Set(
      this._detail.events
        .filter((e) => UNIQUE_PERSON_EVENT_TYPES.has(e.type))
        .filter((e) => e.id !== editing)
        .map((e) => e.type),
    );
  }

  private _professionFromEvents(events: EventDto[]): string {
    const occ = events
      .filter((e) => e.type === "occupation")
      .sort((a, b) => (a.sort_date || "").localeCompare(b.sort_date || ""));
    if (!occ.length) return "";
    return occ[occ.length - 1].description || "";
  }

  private _mePersonMatches(): PersonDto[] {
    const q = this._meQuery.trim().toLowerCase();
    if (!q) return [];
    return this._people
      .filter((p) => {
        const hay = [
          p.given_names,
          p.call_name,
          p.surname_prefix,
          p.surname,
          personDisplayName(p),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 12);
  }

  private async _savePerson() {
    if (!this.hass || !this._canWrite()) return;
    const errors = this._validatePersonForm();
    this._fieldErrors = errors;
    if (Object.keys(errors).length) return;
    const given = (this._form.given_names || "").trim();
    this._saving = true;
    this._error = "";
    try {
      const payload: Parameters<typeof savePerson>[1] = {
        given_names: given,
        call_name: this._form.call_name,
        surname_prefix: this._form.surname_prefix,
        surname: this._form.surname,
        sex: this._form.sex,
        is_living: this._form.deceased !== "true",
        notes: this._form.notes,
      };
      if (this._editing?.id) {
        payload.person_id = this._editing.id;
      }
      const { person } = await savePerson(this.hass, payload);
      const target = this._relationTarget;
      this._relationTarget = null;
      this._dialogOpen = false;
      let partnerUnionId: string | null = null;
      let focusPersonId = person.id;
      if (target) {
        if (target.kind === "parent") {
          await addParentChild(this.hass, {
            parent_id: person.id,
            child_id: target.personId,
          });
        } else if (target.kind === "child") {
          await addParentChild(this.hass, {
            parent_id: target.personId,
            child_id: person.id,
            union_id: target.unionId,
          });
        } else if (target.kind === "partner") {
          const { union } = await saveUnion(this.hass, {
            partner_ids: [target.personId, person.id],
          });
          partnerUnionId = union.id;
          focusPersonId = target.personId;
        }
      }
      await this._refreshAll();
      if (partnerUnionId) {
        await this._openPerson(focusPersonId);
        this._personTab = "relationships";
        await this._openUnionEdit(partnerUnionId);
      } else {
        await this._openPerson(focusPersonId);
      }
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _deleteCurrent() {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    const name = personDisplayName(this._detail.person);
    if (!confirm(this._tt("confirm_delete_person").replace("%s", name))) return;
    try {
      await deletePerson(this.hass, this._detail.person.id);
      this._detail = null;
      this._view = "people";
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _restore(id: string) {
    if (!this.hass || !this._canWrite()) return;
    try {
      await restorePerson(this.hass, id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _purge(id: string) {
    if (!this.hass || !this._canWrite()) return;
    const person = this._people.find((p) => p.id === id);
    const name = person ? personDisplayName(person) : id;
    if (!confirm(this._tt("confirm_purge_person").replace("%s", name))) return;
    try {
      await purgePerson(this.hass, id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _toggleEventDateMode() {
    const current = this._eventForm.date_mode || "simple";
    if (current === "simple") {
      const date_first = this._eventForm.date_iso
        ? isoToGedcomDate(this._eventForm.date_iso)
        : this._eventForm.date_first || "";
      this._eventForm = {
        ...this._eventForm,
        date_mode: "advanced",
        date_qualifier: "exact",
        date_first,
        date_iso: "",
      };
      return;
    }
    const date_iso = gedcomToIsoDate(this._eventForm.date_first || "") || "";
    this._eventForm = {
      ...this._eventForm,
      date_mode: "simple",
      date_iso,
      date_qualifier: "exact",
      date_first: "",
      date_second: "",
    };
  }

  private async _saveEvent() {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    this._saving = true;
    try {
      let placeId: string | null = null;
      const placeName = (this._eventForm.place || "").trim();
      if (placeName) {
        const found = await listPlaces(this.hass, { search: placeName, limit: 20 });
        const exact = found.places.find(
          (p) => p.name.localeCompare(placeName, undefined, { sensitivity: "accent" }) === 0,
        );
        if (exact) {
          placeId = exact.id;
        } else {
          const { place } = await savePlace(this.hass, { name: placeName });
          placeId = place.id;
        }
      }
      let date_text = "";
      if ((this._eventForm.date_mode || "simple") === "simple") {
        date_text = isoToGedcomDate(this._eventForm.date_iso || "");
      } else {
        const qualifier = (this._eventForm.date_qualifier || "exact") as DateQualifier;
        const built = buildGedcomDate(
          qualifier,
          this._eventForm.date_first || "",
          this._eventForm.date_second || "",
        );
        if (built.error) {
          this._error = this._tt("date_invalid");
          return;
        }
        date_text = built.value;
      }
      await saveEvent(this.hass, {
        ...(this._editingEventId ? { event_id: this._editingEventId } : {}),
        subject_type: "person",
        subject_id: this._detail.person.id,
        event_type: this._eventForm.event_type || "birth",
        date_text,
        place: this._eventForm.place || undefined,
        description: this._eventForm.description || "",
        place_id: placeId,
      });
      this._eventForm = {};
      this._editingEventId = null;
      this._dialogOpen = false;
      this._detail = await getPerson(this.hass, this._detail.person.id);
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _authHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {};
    const access =
      (this.hass as unknown as { connection?: { options?: { auth?: { accessToken?: string } } } })
        ?.connection?.options?.auth?.accessToken;
    const authData = (this.hass as unknown as { auth?: { data?: { access_token?: string } } })
      .auth?.data?.access_token;
    const bearer = authData || access;
    if (bearer) headers.Authorization = `Bearer ${bearer}`;
    return headers;
  }

  private async _previewGedcom(file: File) {
    if (!this.hass || !this._canWrite()) return;
    this._importFile = file;
    this._importFileName = file.name;
    this._importPhase = "preview";
    this._importReport = null;
    this._importStatus = this._tt("loading");
    this._dialogMode = "import";
    this._dialogOpen = true;
    try {
      const form = new FormData();
      form.append("file", file);
      const url = `/api/family_tree/import_gedcom?preview=1`;
      const resp = await fetch(url, {
        method: "POST",
        body: form,
        credentials: "same-origin",
        headers: await this._authHeaders(),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Preview failed (${resp.status})`);
      }
      const body = await resp.json();
      this._importReport = (body.report || {}) as Record<string, number>;
      this._importStatus = "";
    } catch (err) {
      this._importStatus = "";
      this._importPhase = "";
      this._dialogOpen = false;
      this._error = formatHassError(err);
    }
  }

  private async _confirmImport() {
    if (!this._importFile) return;
    await this._importGedcom(this._importFile);
  }

  private async _importGedcom(file: File) {
    if (!this.hass || !this._canWrite()) return;
    if (!this._importFileName) this._importFileName = file.name;
    this._importPhase = "importing";
    this._importStatus = this._tt("importing");
    this._dialogMode = "import";
    this._dialogOpen = true;
    try {
      const form = new FormData();
      form.append("file", file);
      const url = `/api/family_tree/import_gedcom?replace=${this._replaceImport ? "1" : "0"}`;
      const resp = await fetch(url, {
        method: "POST",
        body: form,
        credentials: "same-origin",
        headers: await this._authHeaders(),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Import failed (${resp.status})`);
      }
      const body = await resp.json();
      this._importReport = (body.report || {}) as Record<string, number>;
      this._importPhase = "done";
      this._importStatus = "";
      this._importFile = null;
      await this._refreshAll();
    } catch (err) {
      this._importStatus = "";
      this._importPhase = "";
      this._dialogOpen = false;
      this._error = formatHassError(err);
    }
  }

  private _pickGedcomFile() {
    const input = this.renderRoot.querySelector(
      "#ft-gedcom-file",
    ) as HTMLInputElement | null;
    input?.click();
  }

  private _onGedcomFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    (e.target as HTMLInputElement).value = "";
    if (file) void this._previewGedcom(file);
  }

  private _renderEmptyCta() {
    if (!this._canWrite()) {
      return html`<div class="empty-state">
        ${brandLogo(this.hass, this._tt("brand"))}
        <p>${this._tt("no_people")}</p>
      </div>`;
    }
    return html`<div class="empty-state">
      ${brandLogo(this.hass, this._tt("brand"))}
      <p>${this._tt("empty_cta_hint")}</p>
      <div class="empty-actions">
        ${mdButton(this._tt("add_person"), {
          variant: "filled",
          onClick: () => this._openCreate(),
        })}
        ${mdButton(this._tt("import_gedcom"), {
          variant: "outlined",
          onClick: () => this._pickGedcomFile(),
        })}
      </div>
      <input
        id="ft-gedcom-file"
        class="sr-only"
        type="file"
        accept=".ged,text/plain"
        @change=${(e: Event) => this._onGedcomFileChange(e)}
      />
    </div>`;
  }

  private async _deleteEvent(id: string) {
    if (!this.hass || !this._canWrite()) return;
    try {
      await deleteEvent(this.hass, id);
      if (this._detail) {
        this._detail = await getPerson(this.hass, this._detail.person.id);
      }
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _loadSettingsExtras() {
    if (!this.hass) return;
    try {
      this._userLinks = (await listUserLinks(this.hass)).links;
      this._gazetteer = await gazetteerStatus(this.hass);
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _runGazSearch() {
    if (!this.hass || !this._gazQuery.trim()) return;
    try {
      const res = await searchGazetteer(this.hass, this._gazQuery.trim());
      this._gazHits = res.results;
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _exportGedcom() {
    window.open("/api/family_tree/export_gedcom", "_blank");
  }

  private _destroyCharts() {
    for (const c of this._charts) c.destroy();
    this._charts = [];
  }

  /** Draw dashboard charts; returns false if no chart canvas was mounted yet. */
  private _renderCharts(): boolean {
    this._destroyCharts();
    if (!this._stats) return false;
    const expected = this.renderRoot.querySelectorAll(".chart-wrap canvas").length;
    const make = (
      canvasId: string,
      type: "bar" | "doughnut",
      labels: string[],
      values: number[],
    ) => {
      const canvas = this.renderRoot.querySelector(
        `#${canvasId}`,
      ) as HTMLCanvasElement | null;
      if (!canvas || !labels.length) return;
      const style = getComputedStyle(this);
      const color = style.getPropertyValue("--primary-text-color").trim() || "#333";
      const accent =
        style.getPropertyValue("--primary-color").trim() || "#03a9f4";
      this._charts.push(
        new Chart(canvas, {
          type,
          data: {
            labels,
            datasets: [
              {
                data: values,
                backgroundColor:
                  type === "doughnut"
                    ? values.map((_, i) => `hsl(${(i * 47) % 360} 55% 55%)`)
                    : accent,
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: type === "doughnut",
                position: "bottom",
                labels: {
                  color,
                  boxWidth: 12,
                  padding: 8,
                },
              },
            },
            scales:
              type === "bar"
                ? {
                    x: { ticks: { color }, grid: { display: false } },
                    y: {
                      ticks: { color },
                      grid: { color: "rgba(127,127,127,0.2)" },
                      beginAtZero: true,
                    },
                  }
                : undefined,
          },
        }),
      );
    };
    make("ft-ages", "bar", this._stats.ages.labels, this._stats.ages.values);
    make(
      "ft-centuries",
      "bar",
      this._stats.centuries.labels,
      this._stats.centuries.values,
    );
    make(
      "ft-places",
      "doughnut",
      this._stats.places_of_birth.labels.map((l) => this._truncatePlaceLabel(l)),
      this._stats.places_of_birth.values,
    );
    return expected > 0 && this._charts.length === expected;
  }

  private get _filteredPeople(): PersonDto[] {
    return filterAndSortPeople(this._people, {
      search: this._search,
      filterLiving: this._filterLiving,
      filterSex: this._filterSex,
      sort: this._sort,
      sortDir: this._sortDir,
      familyShortcut: this._familyShortcut,
      filterPlace: this._filterPlace,
      dateFrom: this._dateFrom,
      dateTo: this._dateTo,
    });
  }

  private _toggleSidebar() {
    this.dispatchEvent(
      new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }),
    );
  }

  protected render() {
    return html`
      <div class="shell">
        <header class="top">
          ${this.narrow
            ? html`<button class="icon-btn" @click=${this._toggleSidebar} aria-label=${this._tt("tab_menu")}>
                ${icon(MDI_MENU)}
              </button>`
            : nothing}
          <div class="brand">${brandLogo(this.hass, this._tt("brand"))}</div>
          <nav class="tabs">
            <button class=${this._view === "dashboard" ? "active" : ""} @click=${() => this._setView("dashboard")}>
              ${this._tt("nav_dashboard")}
            </button>
            <button class=${this._view === "people" || this._view === "person" ? "active" : ""} @click=${() => this._setView("people")}>
              ${this._tt("nav_people")}
            </button>
            <button class=${this._view === "trash" ? "active" : ""} @click=${() => this._setView("trash")}>
              ${icon(MDI_DELETE)} ${this._tt("nav_trash")}
            </button>
            <button class=${this._view === "settings" ? "active" : ""} @click=${() => { this._setView("settings"); void this._loadSettingsExtras(); }}>
              ${icon(MDI_COG)} ${this._tt("nav_settings")}
            </button>
          </nav>
        </header>

        ${!this._canWrite()
          ? html`<p class="banner">${this._tt("read_only")}</p>`
          : nothing}
        ${this._error
          ? html`<p class="error" role="alert">${this._error}</p>`
          : nothing}

        <main class="main">
          ${this._loading
            ? html`<p class="muted">${this._tt("loading")}</p>`
            : this._view === "dashboard"
              ? this._renderDashboard()
              : this._view === "person" && this._detail
                ? this._renderPerson()
                : this._view === "settings"
                  ? this._renderSettings()
                  : this._renderPeopleList()}
        </main>
      </div>
      ${this._dialogOpen ? this._renderDialog() : nothing}
      ${this._rowMenu ? this._renderFixedRowMenu() : nothing}
    `;
  }

  private _renderDashboard() {
    const s = this._stats;
    const upcoming = this._settings?.upcoming_birthdays || [];
    const anniversaries = this._settings?.upcoming_anniversaries || [];
    const shortcuts = this._settings?.family_shortcuts || [];
    const emptyTree = (s?.total_persons ?? 0) === 0;
    const hasAges = Boolean(s?.ages.labels.length);
    const hasCenturies = Boolean(s?.centuries.labels.length);
    const hasPlaces = Boolean(s?.places_of_birth.labels.length);
    const showCharts = hasAges || hasCenturies || hasPlaces;
    return html`
      ${emptyTree
        ? this._renderEmptyCta()
        : html`
      <section class="stats-row">
        <div class="stat"><span class="stat-n">${s?.total_persons ?? "—"}</span><span class="stat-label">${this._tt("stats_total")}</span></div>
        <div class="stat"><span class="stat-n">${s?.living ?? "—"}</span><span class="stat-label">${this._tt("stats_living")}</span></div>
        <div class="stat"><span class="stat-n">${s?.deceased ?? "—"}</span><span class="stat-label">${this._tt("stats_deceased")}</span></div>
      </section>
      ${showCharts
        ? html`<section class="charts">
            ${hasAges
              ? html`<div class="chart-card"><h3>${this._tt("chart_ages")}</h3><div class="chart-wrap"><canvas id="ft-ages"></canvas></div></div>`
              : nothing}
            ${hasCenturies
              ? html`<div class="chart-card"><h3>${this._tt("chart_centuries")}</h3><div class="chart-wrap"><canvas id="ft-centuries"></canvas></div></div>`
              : nothing}
            ${hasPlaces
              ? html`<div class="chart-card"><h3>${this._tt("chart_places")}</h3><div class="chart-wrap"><canvas id="ft-places"></canvas></div></div>`
              : nothing}
          </section>`
        : nothing}
      ${shortcuts.length
        ? html`<section class="block">
            <h3>${this._tt("families")}</h3>
            <div class="chip-row">
              ${shortcuts.map(
                (sc) => html`<button class="chip ${this._familyShortcut === sc ? "on" : ""}"
                  @click=${() => { this._familyShortcut = this._familyShortcut === sc ? "" : sc; this._persistViewState(); this._setView("people"); }}>
                  ${sc}
                </button>`,
              )}
            </div>
          </section>`
        : nothing}
      <section class="two-col">
        <div class="block">
          <h3>${this._tt("upcoming_birthdays")}</h3>
          <ul class="plain">
            ${upcoming.length
              ? upcoming.slice(0, 8).map(
                  (u) => html`<li>
                    <button class="linkish" @click=${() => this._openPerson(String(u.person_id))}>
                      ${u.name}
                    </button>
                    <span class="muted">${daysUntilLabel(Number(u.days_until), this._tt("days"))}</span>
                  </li>`,
                )
              : html`<li class="muted">—</li>`}
          </ul>
        </div>
        <div class="block">
          <h3 class="heading-with-tip">
            ${this._tt("upcoming_anniversaries")}
            ${tooltip(
              this._tt("anniversaries_hint"),
              html`<span class="info-tip">${icon(MDI_INFORMATION)}</span>`,
            )}
          </h3>
          <ul class="plain">
            ${anniversaries.length
              ? anniversaries.slice(0, 8).map((u) => {
                  const names = (u.names as string[]) || [];
                  const label = names.join(" & ");
                  const years = u.years != null ? this._tt("anniversary_years").replace("%s", String(u.years)) : "";
                  const match = names[0]
                    ? this._people.find(
                        (p) =>
                          personDisplayName(p).toLowerCase() === names[0].toLowerCase(),
                      )
                    : undefined;
                  return html`<li>
                    ${match
                      ? html`<button class="linkish" @click=${() => this._openPerson(match.id)}>
                          ${label}
                        </button>`
                      : html`<span>${label}</span>`}
                    <span class="muted">
                      ${years ? `${years} · ` : ""}${daysUntilLabel(Number(u.days_until), this._tt("days"))}
                    </span>
                  </li>`;
                })
              : html`<li class="muted">${this._tt("no_anniversaries")}</li>`}
          </ul>
        </div>
      </section>`}
    `;
  }

  private _activeFilterChips() {
    const chips: Array<{ label: string; clear: () => void }> = [];
    if (this._search.trim()) {
      chips.push({
        label: `${this._tt("filter_search")}: ${this._search.trim()}`,
        clear: () => {
          this._search = "";
          this._persistViewState();
        },
      });
    }
    if (this._filterLiving !== "all") {
      chips.push({
        label:
          this._filterLiving === "living"
            ? this._tt("filter_living")
            : this._tt("filter_deceased"),
        clear: () => {
          this._filterLiving = "all";
          this._persistViewState();
        },
      });
    }
    if (this._filterSex) {
      const key = `sex_${this._filterSex}` as LocaleKey;
      chips.push({
        label: this._tt(key) !== key ? this._tt(key) : this._filterSex,
        clear: () => {
          this._filterSex = "";
          this._persistViewState();
        },
      });
    }
    if (this._familyShortcut) {
      chips.push({
        label: `${this._tt("filter_family")}: ${this._familyShortcut}`,
        clear: () => {
          this._familyShortcut = "";
          this._persistViewState();
        },
      });
    }
    if (this._filterPlace) {
      const place = placeOptionsFromPeople(this._people).find(
        (p) => p.id === this._filterPlace,
      );
      chips.push({
        label: `${this._tt("place")}: ${place?.label || this._filterPlace}`,
        clear: () => {
          this._filterPlace = "";
          this._persistViewState();
        },
      });
    }
    if (this._dateFrom) {
      chips.push({
        label: `${this._tt("filter_date_from")}: ${this._dateFrom}`,
        clear: () => {
          this._dateFrom = "";
          this._persistViewState();
        },
      });
    }
    if (this._dateTo) {
      chips.push({
        label: `${this._tt("filter_date_to")}: ${this._dateTo}`,
        clear: () => {
          this._dateTo = "";
          this._persistViewState();
        },
      });
    }
    return chips;
  }

  private _renderPeopleList() {
    const people = this._filteredPeople;
    const families = sortedOptionList(
      this._settings?.family_shortcuts || [],
      this._familyShortcut,
    );
    const places = placeOptionsFromPeople(this._people);
    const showFilters = this._view !== "trash";
    const chips = this._activeFilterChips();
    const lang = this.hass?.language;
    return html`
      <div class="toolbar">
        <input
          type="search"
          .value=${this._search}
          placeholder=${this._tt("search_placeholder")}
          @input=${(e: Event) => {
            this._search = (e.target as HTMLInputElement).value;
            this._persistViewState();
          }}
        />
        ${showFilters
          ? html`<div class="toolbar-actions">
              ${mdButton(
                `${this._tt("filters")}${this._activeFilterCount ? ` (${this._activeFilterCount})` : ""}`,
                {
                  variant: "outlined",
                  active: this._filtersOpen || this._activeFilterCount > 0,
                  onClick: () => {
                    this._filtersOpen = !this._filtersOpen;
                    this._persistViewState();
                  },
                },
              )}
              ${this._canWrite() && this._view !== "trash"
                ? mdButton(this._tt("add_person"), {
                    variant: "filled",
                    onClick: () => this._openCreate(),
                  })
                : nothing}
            </div>`
          : this._canWrite() && this._view !== "trash"
            ? html`<div class="toolbar-actions">
                ${mdButton(this._tt("add_person"), {
                  variant: "filled",
                  onClick: () => this._openCreate(),
                })}
              </div>`
            : nothing}
      </div>
      ${showFilters && this._filtersOpen
        ? html`<div class="filters">
            <select
              aria-label=${this._tt("filter_all")}
              .value=${this._filterLiving}
              @change=${(e: Event) => {
                this._filterLiving = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="all">${this._tt("filter_all")}</option>
              <option value="living">${this._tt("filter_living")}</option>
              <option value="deceased">${this._tt("filter_deceased")}</option>
            </select>
            <select
              aria-label=${this._tt("sex")}
              .value=${this._filterSex}
              @change=${(e: Event) => {
                this._filterSex = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="">${this._tt("filter_all_sexes")}</option>
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="intersex">${this._tt("sex_intersex")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
            <select
              aria-label=${this._tt("filter_family")}
              .value=${this._familyShortcut}
              @change=${(e: Event) => {
                this._familyShortcut = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="">${this._tt("filter_all_families")}</option>
              ${families.map(
                (f) => html`<option value=${f}>${f}</option>`,
              )}
            </select>
            <select
              aria-label=${this._tt("place")}
              .value=${this._filterPlace}
              @change=${(e: Event) => {
                this._filterPlace = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="">${this._tt("filter_all_places")}</option>
              ${places.map(
                (p) => html`<option value=${p.id}>${p.label}</option>`,
              )}
            </select>
            <label class="date-filter">
              <span class="muted">${this._tt("filter_date_from")}</span>
              <input
                type="date"
                .value=${this._dateFrom}
                @change=${(e: Event) => {
                  this._dateFrom = (e.target as HTMLInputElement).value;
                  this._persistViewState();
                }}
              />
            </label>
            <label class="date-filter">
              <span class="muted">${this._tt("filter_date_to")}</span>
              <input
                type="date"
                .value=${this._dateTo}
                @change=${(e: Event) => {
                  this._dateTo = (e.target as HTMLInputElement).value;
                  this._persistViewState();
                }}
              />
            </label>
            ${this._activeFilterCount
              ? html`<button type="button" @click=${this._resetFilters}>
                  ${this._tt("filter_reset")}
                </button>`
              : nothing}
          </div>`
        : nothing}
      ${chips.length
        ? html`<div class="filter-chips">
            ${chips.map(
              (c) => html`<button type="button" class="chip on" @click=${c.clear}>
                ${c.label} ×
              </button>`,
            )}
            <button type="button" class="chip" @click=${this._clearAllFilters}>
              ${this._tt("filter_clear_all")}
            </button>
          </div>`
        : nothing}
      <p class="muted">${people.length} / ${this._total}</p>
      ${people.length === 0
        ? this._view === "trash" ||
          this._search ||
          this._filterLiving !== "all" ||
          this._filterSex ||
          chips.length
          ? html`<p>${this._tt("no_people")}</p>`
          : this._renderEmptyCta()
        : this._isMobile
          ? html`<div class="card-list people-cards">
              ${people.map((p) => this._renderPeopleCard(p, lang))}
            </div>`
          : html`<div class="table-wrap">
              <table class="people-table">
                <thead>
                  <tr>
                    ${this._sortTh(this._tt("col_name"), "name")}
                    ${this._sortTh(this._tt("col_birth"), "birth")}
                    ${this._sortTh(this._tt("col_death"), "death")}
                    ${this._sortTh(this._tt("sex"), "sex")}
                    <th>${this._tt("col_parents")}</th>
                    ${this._sortTh(this._tt("col_children"), "children")}
                    <th>${this._tt("col_lineage")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${people.map((p) => this._renderPeopleRow(p, lang))}
                </tbody>
              </table>
            </div>`}
    `;
  }

  private _renderPeopleCard(p: PersonDto, lang?: string) {
    const birth = formatEventDate(p.birth, lang);
    const death = formatDeathCell(p.birth, p.death, p.is_living, lang);
    const parents = [p.father?.name, p.mother?.name].filter(Boolean).join(" · ");
    const isTrash = this._view === "trash";
    return html`
      <div class="person-card-wrap">
        <button type="button" class="person-card" @click=${() => this._openPerson(p.id)}>
          <div class="person-card-head">
            <div class="person-card-title">
              ${this._deceasedIcon(p.is_living)} ${personDisplayName(p)}
            </div>
            ${this._lineageStar(p.id, personDisplayName(p))}
          </div>
          <div class="person-card-meta">${this._sexBadge(p.sex)}</div>
          ${birth ? html`<div class="person-card-meta">${birth}</div>` : nothing}
          ${death ? html`<div class="person-card-meta">${death}</div>` : nothing}
          ${parents ? html`<div class="person-card-meta">${parents}</div>` : nothing}
          ${(p.children_count ?? 0) > 0
            ? html`<div class="person-card-footer">
                ${this._childrenCountLabel(p.children_count ?? 0)}
              </div>`
            : nothing}
        </button>
        ${isTrash && this._canWrite()
          ? html`<div class="card-actions">
              <button type="button" @click=${() => this._restore(p.id)}>
                ${this._tt("restore")}
              </button>
              <button type="button" class="danger" @click=${() => this._purge(p.id)}>
                ${this._tt("purge")}
              </button>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderFixedRowMenu() {
    const personId = this._rowMenu;
    const anchor = this._rowMenuAnchor;
    if (!personId || !anchor) return nothing;
    const right = window.innerWidth - anchor.right;
    const style = anchor.up
      ? `bottom:${window.innerHeight - anchor.top + 4}px;right:${right}px;`
      : `top:${anchor.bottom + 4}px;right:${right}px;`;
    return html`<div
      class="row-menu row-menu--fixed"
      style=${style}
      @click=${(e: Event) => e.stopPropagation()}
    >
      <button type="button" @click=${() => {
        this._closeRowMenu();
        void this._openPerson(personId);
      }}>${this._tt("details")}</button>
      <button type="button" @click=${() => {
        this._closeRowMenu();
        void this._openPerson(personId).then(() => {
          this._personTab = "tree";
        });
      }}>${this._tt("tree")}</button>
      ${this._canWrite()
        ? html`<button type="button" class="danger" @click=${() => {
            this._closeRowMenu();
            void this._deletePersonById(personId);
          }}>${this._tt("delete")}</button>`
        : nothing}
    </div>`;
  }

  private _renderPeopleRow(p: PersonDto, lang?: string) {
    const birth = formatEventDate(p.birth, lang);
    const death = formatDeathCell(p.birth, p.death, p.is_living, lang);
    const menuOpen = this._rowMenu === p.id;
    return html`<tr>
      <td>
        <button type="button" class="linkish name-cell" @click=${() => this._openPerson(p.id)}>
          ${personDisplayName(p)}
        </button>
      </td>
      <td><span class="date-badge">${birth || "—"}</span></td>
      <td><span class="date-badge">${death || "—"}</span></td>
      <td>${this._sexBadge(p.sex)}</td>
      <td>${this._parentsCell(p)}</td>
      <td class="num">${p.children_count ?? 0}</td>
      <td class="center">${this._lineageStar(p.id)}</td>
      <td class="menu-cell">
        ${this._view === "trash" && this._canWrite()
          ? html`<span class="row-actions">
              <button @click=${() => this._restore(p.id)}>${this._tt("restore")}</button>
              <button class="danger" @click=${() => this._purge(p.id)}>${this._tt("purge")}</button>
            </span>`
          : html`<div class="row-menu-wrap">
              <button
                type="button"
                class="icon-btn sm${menuOpen ? " active" : ""}"
                aria-label=${this._tt("actions")}
                @click=${(e: Event) => {
                  e.stopPropagation();
                  if (menuOpen) {
                    this._closeRowMenu();
                    return;
                  }
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const menuHeight = this._canWrite() ? 130 : 88;
                  this._rowMenuAnchor = {
                    top: rect.top,
                    bottom: rect.bottom,
                    right: rect.right,
                    up: rect.bottom + menuHeight > window.innerHeight,
                  };
                  this._rowMenu = p.id;
                }}
              >
                ${icon(MDI_DOTS_VERTICAL)}
              </button>
            </div>`}
      </td>
    </tr>`;
  }

  private async _deletePersonById(id: string) {
    if (!this.hass || !this._canWrite()) return;
    const person = this._people.find((p) => p.id === id);
    const name = person ? personDisplayName(person) : id;
    if (!confirm(this._tt("confirm_delete_person").replace("%s", name))) return;
    try {
      await deletePerson(this.hass, id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _eventTypeLabel(type: string): string {
    const key = EVENT_TYPE_KEYS[type];
    return key ? this._tt(key) : type;
  }

  private _formatUnionDate(dateText: string | null | undefined, lang?: string): string {
    const text = (dateText || "").trim();
    if (!text) return "";
    return formatEventDate({ date_text: text }, lang) || text;
  }

  private _unionMetaSubtitle(union: TreeUnion | undefined, lang?: string): string {
    if (!union) return "";
    const parts: string[] = [];
    const marriageDate = this._formatUnionDate(union.marriage_date, lang);
    if (marriageDate) parts.push(`${this._tt("event_marriage")}: ${marriageDate}`);
    if (union.marriage_place) parts.push(union.marriage_place);
    const divorceDate = this._formatUnionDate(union.divorce_date, lang);
    if (divorceDate) parts.push(`${this._tt("event_divorce")}: ${divorceDate}`);
    return parts.join(" · ");
  }

  private _renderPersonCard(
    node: Record<string, unknown>,
    opts: {
      subtitle?: string;
      footer?: string;
      preview?: boolean;
      hideSiblings?: boolean;
    } = {},
  ) {
    const id = String(node.id || "");
    const title = nodeName(node);
    const sex = typeof node.sex === "string" ? node.sex : "unknown";
    const formal =
      (typeof node.formal_name === "string" && node.formal_name) ||
      [node.given_names, node.surname_prefix, node.surname]
        .map((p) => (typeof p === "string" ? p.trim() : ""))
        .filter(Boolean)
        .join(" ");
    const lifespan = formatLifespanLine({
      birth_date_text: typeof node.birth_date_text === "string" ? node.birth_date_text : "",
      birth_sort_date: typeof node.birth_sort_date === "string" ? node.birth_sort_date : null,
      death_date_text: typeof node.death_date_text === "string" ? node.death_date_text : "",
      death_sort_date: typeof node.death_sort_date === "string" ? node.death_sort_date : null,
      is_living: node.is_living !== false,
    });
    const birthPlace = typeof node.birth_place === "string" ? node.birth_place : "";
    const siblingCount = Number(node.sibling_count || 0);
    const isLiving = node.is_living !== false;
    const usePreview = opts.preview !== false;
    const onCardClick = () => {
      if (!id) return;
      if (usePreview) void this._openPersonPreview(id);
      else void this._openPerson(id);
    };
    return html`
      <button type="button" class="person-card" @click=${onCardClick}>
        <div class="person-card-head">
          <div class="person-card-title">
            ${this._deceasedIcon(isLiving)} ${this._sexIconBadge(sex)} ${title}
          </div>
          ${id ? this._lineageStar(id, title) : nothing}
        </div>
        ${formal && formal !== title
          ? html`<div class="person-card-formal">${formal}</div>`
          : nothing}
        ${lifespan ? html`<div class="person-card-meta">${lifespan}</div>` : nothing}
        ${birthPlace ? html`<div class="person-card-meta">${birthPlace}</div>` : nothing}
        ${opts.subtitle ? html`<div class="person-card-meta">${opts.subtitle}</div>` : nothing}
        ${siblingCount > 0 && !opts.hideSiblings
          ? html`<span
              role="button"
              tabindex="0"
              class="person-card-footer linkish"
              @click=${(e: Event) => {
                e.stopPropagation();
                void this._openSiblingsDialog(id, title);
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  void this._openSiblingsDialog(id, title);
                }
              }}
            >
              +${siblingCount} ${this._tt("siblings_count")}
            </span>`
          : opts.footer
            ? html`<div class="person-card-footer">${opts.footer}</div>`
            : nothing}
      </button>
    `;
  }

  private _renderEventCard(ev: EventDto) {
    const canEdit = this._canWrite() && ev.subject_type === "person";
    const lang = this.hass?.language;
    return html`
      <div class="event-card">
        <div class="event-card-head">
          <strong>${this._eventTypeLabel(ev.type)}</strong>
          ${canEdit
            ? html`<span class="row-actions">
                <button class="linkish" @click=${() => this._openEditEvent(ev)}>${this._tt("edit")}</button>
                <button class="linkish danger" @click=${() => this._deleteEvent(ev.id)}>${this._tt("delete")}</button>
              </span>`
            : nothing}
        </div>
        <div class="event-card-meta">${formatEventDate(ev, lang) || formatGedcomDate(ev.date_text)}</div>
        ${ev.place_name ? html`<div class="event-card-meta">${ev.place_name}</div>` : nothing}
        ${ev.description ? html`<div class="event-card-desc">${ev.description}</div>` : nothing}
      </div>
    `;
  }

  private _renderCollapsibleSection(
    key: string,
    title: string,
    body: unknown,
    defaultOpen = true,
    variant: "default" | "cards" = "default",
  ) {
    const open = this._sectionOpen(key, defaultOpen);
    return html`<section class="collapse ${variant === "cards" ? "collapse--cards" : ""}">
      <button type="button" class="collapse-head" @click=${() => this._toggleSection(key)}>
        <span>${title}</span>
        ${icon(open ? MDI_CHEVRON_DOWN : MDI_CHEVRON_RIGHT)}
      </button>
      ${open ? html`<div class="collapse-body">${body}</div>` : nothing}
    </section>`;
  }

  private _pickPersonMatches(): PersonDto[] {
    const q = this._pickPersonQuery.trim().toLowerCase();
    if (!q || !this._detail) return [];
    const selfId = this._detail.person.id;
    return this._people
      .filter((p) => p.id !== selfId && !p.deleted_at)
      .filter((p) => {
        const hay = [p.given_names, p.call_name, p.surname_prefix, p.surname, personDisplayName(p)]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 12);
  }

  private _openPickPerson(role: "partner" | "father" | "mother") {
    this._pickPersonRole = role;
    this._pickPersonQuery = "";
    this._dialogMode = "pickPerson";
    this._dialogOpen = true;
    this._error = "";
  }

  private _openParentsDialog() {
    const parents = (this._detail?.tree?.parents || []) as Array<Record<string, unknown>>;
    const father = parents.find((p) => p.sex === "male");
    const mother = parents.find((p) => p.sex === "female");
    this._parentsForm = {
      father_id: father ? String(father.id) : "",
      mother_id: mother ? String(mother.id) : "",
    };
    this._dialogMode = "parents";
    this._dialogOpen = true;
    this._error = "";
  }

  private async _openUnionEdit(unionId: string) {
    if (!this.hass) return;
    try {
      const data = await getUnion(this.hass, unionId);
      const marriage = data.events.find((e) => e.type === "marriage");
      this._editingUnionId = unionId;
      this._unionForm = {
        status: data.union.status || "ongoing",
        notes: data.union.notes || "",
        known_children_count:
          data.union.known_children_count != null
            ? String(data.union.known_children_count)
            : "",
        marriage_date: marriage?.date_text || "",
        marriage_place: marriage?.place_name || "",
      };
      this._dialogMode = "union";
      this._dialogOpen = true;
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _linkPickedPerson(personId: string) {
    if (!this.hass || !this._detail || !this._pickPersonRole) return;
    const selfId = this._detail.person.id;
    this._saving = true;
    try {
      if (this._pickPersonRole === "partner") {
        await saveUnion(this.hass, { partner_ids: [selfId, personId] });
      } else if (this._pickPersonRole === "father" || this._pickPersonRole === "mother") {
        await addParentChild(this.hass, {
          parent_id: personId,
          child_id: selfId,
        });
      }
      this._dialogOpen = false;
      this._pickPersonRole = null;
      this._detail = await getPerson(this.hass, selfId);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _saveParentsLinks() {
    if (!this.hass || !this._detail) return;
    const selfId = this._detail.person.id;
    const fatherId = (this._parentsForm.father_id || "").trim();
    const motherId = (this._parentsForm.mother_id || "").trim();
    this._saving = true;
    try {
      if (fatherId) {
        await addParentChild(this.hass, { parent_id: fatherId, child_id: selfId });
      }
      if (motherId) {
        await addParentChild(this.hass, { parent_id: motherId, child_id: selfId });
      }
      this._dialogOpen = false;
      this._detail = await getPerson(this.hass, selfId);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _removeParentLink(linkId: string) {
    if (!this.hass || !this._detail || !confirm(this._tt("confirm_remove_parent"))) return;
    try {
      await removeParentChild(this.hass, linkId);
      this._detail = await getPerson(this.hass, this._detail.person.id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _deleteUnion(unionId: string) {
    if (!this.hass || !this._detail || !confirm(this._tt("confirm_delete_union"))) return;
    try {
      await deleteUnion(this.hass, unionId);
      this._detail = await getPerson(this.hass, this._detail.person.id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _saveUnionForm() {
    if (!this.hass || !this._detail || !this._editingUnionId) return;
    const selfId = this._detail.person.id;
    const partners = (this._detail.tree?.partners || []) as TreeUnion[];
    const union = partners.find((u) => u.union_id === this._editingUnionId);
    if (!union) return;
    const partnerIds = [
      selfId,
      ...(union.partners || []).map((p) => String((p as Record<string, unknown>).id || "")),
    ].filter(Boolean);
    const uniquePartners = [...new Set(partnerIds)];
    this._saving = true;
    try {
      const kcc = (this._unionForm.known_children_count || "").trim();
      await saveUnion(this.hass, {
        union_id: this._editingUnionId,
        partner_ids: uniquePartners,
        status: this._unionForm.status || "ongoing",
        notes: this._unionForm.notes || "",
        known_children_count: kcc ? Number(kcc) : null,
      });
      const marriageDate = (this._unionForm.marriage_date || "").trim();
      const placeName = (this._unionForm.marriage_place || "").trim();
      let placeId: string | undefined;
      if (placeName) {
        const found = await listPlaces(this.hass, { search: placeName, limit: 20 });
        const exact = found.places.find(
          (pl) => pl.name.localeCompare(placeName, undefined, { sensitivity: "accent" }) === 0,
        );
        if (exact) placeId = exact.id;
        else {
          const { place } = await savePlace(this.hass, { name: placeName });
          placeId = place.id;
        }
      }
      if (marriageDate) {
        const built = buildGedcomDate("exact", marriageDate);
        if (!built.error && built.value) {
          await saveEvent(this.hass, {
            subject_type: "union",
            subject_id: this._editingUnionId,
            type: "marriage",
            date_text: built.value,
            date_qualifier: "exact",
            place_id: placeId,
          });
        }
      }
      this._dialogOpen = false;
      this._editingUnionId = null;
      this._detail = await getPerson(this.hass, selfId);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private _renderRelPersonCard(
    node: Record<string, unknown>,
    opts: { onRemove?: () => void } = {},
  ) {
    const id = String(node.id || "");
    return html`<div class="rel-person-wrap">
      ${this._renderPersonCard(node)}
      ${opts.onRemove
        ? html`<div class="rel-person-actions">
            <button type="button" class="linkish" @click=${() => id && this._openPerson(id)}>
              ${this._tt("details")}
            </button>
            <button type="button" class="linkish danger" @click=${opts.onRemove}>
              ${this._tt("delete")}
            </button>
          </div>`
        : nothing}
    </div>`;
  }

  private _renderRelationshipsTab(d: PersonDetail) {
    const tree = d.tree;
    const lang = this.hass?.language;
    const parents = (tree?.parents || []) as Array<Record<string, unknown>>;
    const partners = (tree?.partners || []) as TreeUnion[];
    const write = this._canWrite();
    const canAddParents = write && parents.length < 2;

    const parentsBody = html`
      ${canAddParents
        ? html`<div class="section-head">
            <button type="button" class="linkish" @click=${() => this._openParentsDialog()}>
              ${this._tt("add_parents")}
            </button>
          </div>`
        : nothing}
      <div class="card-list rel-card-list">
        ${parents.length
          ? parents.map((parent) =>
              this._renderRelPersonCard(parent, {
                onRemove:
                  write && parent.link_id
                    ? () => void this._removeParentLink(String(parent.link_id))
                    : undefined,
              }),
            )
          : html`<p class="muted">—</p>`}
      </div>
    `;

    const partnersBody = html`
      ${write
        ? html`<div class="section-head section-head-actions">
            ${mdButton(this._tt("add_partner"), {
              variant: "filled",
              onClick: () => this._openAddRelation({ kind: "partner", personId: d.person.id }),
            })}
            ${mdButton(this._tt("link_existing_person"), {
              onClick: () => this._openPickPerson("partner"),
            })}
          </div>`
        : nothing}
      ${partners.length
        ? html`<div class="card-list">
            ${partners.map((u) => {
              const unionChildren = u.children || [];
              const knownCount = u.known_children_count;
              const unknownCount =
                knownCount != null && knownCount > unionChildren.length
                  ? knownCount - unionChildren.length
                  : 0;
              const coParentId = String(
                (u.partners?.[0] as Record<string, unknown> | undefined)?.id || "",
              );
              return html`<div class="rel-union-card">
                <div class="rel-union-head">
                  <strong>
                    ${(u.partners || [])
                      .map((pt) => String((pt as Record<string, unknown>).name || ""))
                      .filter(Boolean)
                      .join(" & ") || this._tt("partners")}
                  </strong>
                  ${write
                    ? html`<span class="row-actions">
                        <button
                          type="button"
                          class="linkish"
                          @click=${() => this._openUnionEdit(u.union_id)}
                        >
                          ${this._tt("edit")}
                        </button>
                        <button
                          type="button"
                          class="linkish danger"
                          @click=${() => this._deleteUnion(u.union_id)}
                        >
                          ${this._tt("delete")}
                        </button>
                      </span>`
                    : nothing}
                </div>
                ${u.marriage_date || u.divorce_date || u.known_children_count != null
                  ? html`<div class="rel-union-meta">
                      ${u.marriage_date
                        ? html`<div>${this._tt("event_marriage")}: <strong>${this._formatUnionDate(u.marriage_date, lang)}</strong></div>`
                        : nothing}
                      ${u.divorce_date
                        ? html`<div>${this._tt("event_divorce")}: <strong>${this._formatUnionDate(u.divorce_date, lang)}</strong></div>`
                        : nothing}
                      ${u.known_children_count != null
                        ? html`<div>
                            ${this._tt("known_children")}:
                            <strong>${u.known_children_count}</strong>
                          </div>`
                        : nothing}
                    </div>`
                  : nothing}
                <div class="rel-card-list">
                  ${(u.partners || []).map((partner) =>
                    this._renderPersonCard(partner as Record<string, unknown>),
                  )}
                </div>
                <div class="rel-union-children">
                  <span class="muted">${this._tt("children")}</span>
                  <div class="rel-card-list">
                    ${unionChildren.map((c) =>
                      this._renderPersonCard(c as Record<string, unknown>),
                    )}
                    ${this._renderChildExtras(
                      unknownCount,
                      write
                        ? () =>
                            this._openAddRelation({
                              kind: "child",
                              personId: d.person.id,
                              unionId: u.union_id,
                              coParentId,
                            })
                        : undefined,
                    )}
                  </div>
                  ${!unionChildren.length && !unknownCount && !write
                    ? html`<p class="muted">—</p>`
                    : nothing}
                </div>
              </div>`;
            })}
          </div>`
        : html`<p class="muted">—</p>`}
    `;

    return html`
      ${this._renderCollapsibleSection("rel-parents", this._tt("section_parents"), parentsBody, true, "cards")}
      ${this._renderCollapsibleSection("rel-partners", this._tt("section_partners"), partnersBody, true, "cards")}
    `;
  }

  private _renderPersonDetailsTab(d: PersonDetail) {
    const p = d.person;
    const lang = this.hass?.language;
    const profession = this._professionFromEvents(d.events);
    const personal = html`<dl class="kv">
      <dt>${this._tt("given_names")}</dt><dd>${p.given_names || "—"}</dd>
      <dt>${this._tt("call_name")}</dt><dd>${p.call_name || "—"}</dd>
      <dt>${this._tt("surname_prefix")}</dt><dd>${p.surname_prefix || "—"}</dd>
      <dt>${this._tt("surname")}</dt><dd>${p.surname || "—"}</dd>
      <dt>${this._tt("sex")}</dt><dd>${this._sexBadge(p.sex)}</dd>
      ${profession
        ? html`<dt>${this._tt("profession")}</dt><dd>${profession}</dd>`
        : nothing}
      <dt>${this._tt("lifespan")}</dt>
      <dd>${formatLifespan(p.birth, p.death, p.is_living, lang) || "—"}</dd>
      <dt>${this._tt("notes")}</dt><dd>${p.notes || "—"}</dd>
    </dl>`;
    const events = html`
      <div class="section-head">
        ${this._canWrite()
          ? mdButton(`+ ${this._tt("add_event")}`, {
              variant: "filled",
              onClick: () => this._openAddEvent(),
            })
          : nothing}
      </div>
      <div class="card-list">
        ${d.events.map((ev: EventDto) => this._renderEventCard(ev))}
        ${d.events.length === 0 ? html`<p class="muted">—</p>` : nothing}
      </div>
    `;
    return html`
      ${this._renderCollapsibleSection("personal", this._tt("section_personal"), personal)}
      ${this._renderCollapsibleSection("events", this._tt("events"), events)}
    `;
  }

  private _sortParents(
    parents: Array<Record<string, unknown>>,
  ): Array<Record<string, unknown>> {
    const order: Record<string, number> = { male: 0, female: 1, unknown: 2 };
    return [...parents].sort((a, b) => {
      const sa = order[String(a.sex || "unknown")] ?? 2;
      const sb = order[String(b.sex || "unknown")] ?? 2;
      return sa - sb;
    });
  }

  private _allGrandparents(tree: PersonDetail["tree"]): Array<Record<string, unknown>> {
    if (!tree?.grandparents) return [];
    const seen = new Set<string>();
    const all: Array<Record<string, unknown>> = [];
    for (const parent of tree.parents || []) {
      for (const gp of tree.grandparents[String(parent.id)] || []) {
        const node = gp as Record<string, unknown>;
        const id = String(node.id || "");
        if (id && !seen.has(id)) {
          seen.add(id);
          all.push(node);
        }
      }
    }
    return all;
  }

  private _renderGenRow(label: string, content: unknown) {
    return html`<div class="gen-row">
      <span class="gen-label muted">${label}</span>
      <div class="gen">${content}</div>
    </div>`;
  }

  private _renderTreeRow(label: string | null, content: unknown) {
    return html`<div class="gen-row">
      <span class="gen-label muted ${label ? "" : "gen-label--empty"}">${label ?? ""}</span>
      ${content}
    </div>`;
  }

  private _treeCard(node: Record<string, unknown> | null, extraClass = "") {
    if (!node) {
      return html`<div class="tree-card-wrap tree-card-wrap--empty"></div>`;
    }
    return html`<div class="tree-card-wrap ${extraClass}">
      ${this._renderPersonCard(node)}
    </div>`;
  }

  private _treeCell(colStart: number, colSpan: number, content: unknown, extraClass = "") {
    const style =
      colStart === 1 && colSpan === 1
        ? ""
        : `grid-column:${colStart}/span ${colSpan}`;
    return html`<div class="tree-grid-cell ${extraClass}" style=${style}>${content}</div>`;
  }

  private _childrenBusStyle(childCount: number): string {
    if (childCount < 2) return "";
    const cardW = 280;
    const gap = 12;
    const total = 4 * cardW + 3 * gap;
    const groupWidth = childCount * cardW + (childCount - 1) * gap;
    const leftEdge = (total - groupWidth) / 2;
    const rightEdge = leftEdge + groupWidth;
    const leftPct = ((leftEdge + cardW / 2) / total) * 100;
    const rightPct = ((total - (rightEdge - cardW / 2)) / total) * 100;
    return `--tree-bus-left:${leftPct}%;--tree-bus-right:${rightPct}%`;
  }

  private _grandparentSlots(
    tree: PersonDetail["tree"],
    parentNodes: Array<Record<string, unknown>>,
  ): Array<Record<string, unknown> | null> {
    const father = parentNodes.find((p) => p.sex === "male") || parentNodes[0];
    const mother =
      parentNodes.find((p) => p.sex === "female" && p !== father) ||
      parentNodes.find((p) => p !== father) ||
      null;
    const fatherGps = father
      ? ((tree?.grandparents?.[String(father.id)] || []) as Array<Record<string, unknown>>)
      : [];
    const motherGps = mother
      ? ((tree?.grandparents?.[String(mother.id)] || []) as Array<Record<string, unknown>>)
      : [];
    const fatherSide = this._sortParents(fatherGps);
    const motherSide = this._sortParents(motherGps);
    return [
      fatherSide[0] || null,
      fatherSide[1] || null,
      motherSide[0] || null,
      motherSide[1] || null,
    ];
  }

  private _renderTreeTab(d: PersonDetail) {
    const p = d.person;
    const tree = d.tree;
    const lang = this.hass?.language;
    const partners = (tree?.partners || []) as TreeUnion[];
    const unionIdx = Math.min(this._treeUnion, Math.max(0, partners.length - 1));
    const activeUnion = partners[unionIdx];
    const siblingCount = Number(tree?.person?.sibling_count || tree?.siblings?.length || 0);
    const focusNode = {
      id: p.id,
      name: personDisplayName(p),
      given_names: p.given_names,
      call_name: p.call_name,
      surname_prefix: p.surname_prefix,
      surname: p.surname,
      sex: p.sex,
      is_living: p.is_living,
      sibling_count: siblingCount,
      ...(tree?.person || {}),
    };
    const unionChildren = activeUnion?.children || [];
    const knownCount = activeUnion?.known_children_count;
    const unknownCount =
      knownCount != null && knownCount > unionChildren.length
        ? knownCount - unionChildren.length
        : 0;
    const parentNodes = this._sortParents(
      (tree?.parents || []) as Array<Record<string, unknown>>,
    );
    const father = parentNodes.find((n) => n.sex === "male") || parentNodes[0];
    const mother =
      parentNodes.find((n) => n.sex === "female" && n !== father) ||
      parentNodes.find((n) => n !== father) ||
      null;
    const canAddParents = this._canWrite() && parentNodes.length < 2;
    const gpSlots = this._grandparentSlots(tree, parentNodes);
    const marriageSubtitle = this._unionMetaSubtitle(activeUnion, lang);

    const coParentId = String(
      (activeUnion?.partners?.[0] as Record<string, unknown> | undefined)?.id || "",
    );
    const onAddChild = this._canWrite()
      ? () =>
          this._openAddRelation({
            kind: "child",
            personId: p.id,
            unionId: activeUnion?.union_id,
            coParentId,
          })
      : undefined;

    const renderParentSlot = (
      parent: Record<string, unknown> | undefined,
      missing: boolean,
    ) => {
      if (parent) return this._treeCard(parent);
      if (canAddParents && missing) {
        return html`<div class="tree-card-wrap">
          <button type="button" class="add-slot" @click=${() => this._openParentsDialog()}>
            ${icon(MDI_PLUS)} ${this._tt("add_parents")}
          </button>
        </div>`;
      }
      return this._treeCard(null);
    };

    const showChildExtras = unknownCount > 0 || Boolean(onAddChild);
    const childChunks: Array<Array<Record<string, unknown>>> = [];
    for (let i = 0; i < unionChildren.length; i += 4) {
      childChunks.push(
        unionChildren.slice(i, i + 4).map((n) => n as Record<string, unknown>),
      );
    }
    const hasChildCards = unionChildren.length > 0;
    const hasPartnerChildren = hasChildCards || unknownCount > 0 || showChildExtras;

    return html`
      <div class="tree-scroll">
        <div class="tree-box view-tree">
          ${gpSlots.some(Boolean)
            ? this._renderTreeRow(
                this._tt("grandparents"),
                html`<div class="tree-grid-row tree-grid-row--gp">
                  <div class="tree-grid-pair tree-grid-pair--left">
                    ${this._treeCard(gpSlots[0])}
                    ${this._treeCard(gpSlots[1])}
                  </div>
                  <div class="tree-grid-pair tree-grid-pair--right">
                    ${this._treeCard(gpSlots[2])}
                    ${this._treeCard(gpSlots[3])}
                  </div>
                </div>`,
              )
            : nothing}
          ${this._renderTreeRow(
            this._tt("parents"),
            html`<div class="tree-grid-row tree-grid-row--parents">
              ${this._treeCell(1, 2, renderParentSlot(father, !father), "tree-grid-cell--span2")}
              ${this._treeCell(3, 2, renderParentSlot(mother ?? undefined, !mother), "tree-grid-cell--span2")}
            </div>`,
          )}
          ${this._renderTreeRow(
            null,
            html`<div class="tree-grid-row tree-grid-row--focus">
              ${this._treeCell(
                2,
                2,
                this._treeCard(focusNode),
                "tree-grid-cell--center tree-grid-cell--stem-down",
              )}
            </div>`,
          )}
          ${partners.length
            ? html`<div class="union-tabs">
                ${partners.length > 1
                  ? html`<div class="subtabs tree-subtabs">
                      ${partners.map(
                        (u, i) => html`<button
                          class=${i === unionIdx ? "active" : ""}
                          @click=${() => (this._treeUnion = i)}
                        >
                          ${(u.partners || [])
                            .map((pt) => String((pt as Record<string, unknown>).name || ""))
                            .filter(Boolean)
                            .join(" & ") || `${this._tt("partners")} ${i + 1}`}
                        </button>`,
                      )}
                    </div>`
                  : nothing}
                ${this._renderTreeRow(
                  this._tt("partners"),
                  html`<div
                    class="tree-grid-row tree-grid-row--partner ${hasPartnerChildren ? "tree-grid-row--stem-down" : ""}"
                  >
                    ${this._treeCell(
                      2,
                      2,
                      html`${(activeUnion?.partners || []).map((partner) =>
                        html`<div class="tree-card-wrap">
                          ${this._renderPersonCard(partner as Record<string, unknown>, {
                            subtitle: marriageSubtitle,
                          })}
                        </div>`,
                      )}`,
                      "tree-grid-cell--center",
                    )}
                  </div>`,
                )}
                ${hasChildCards
                  ? this._renderTreeRow(
                      this._tt("children"),
                      html`${childChunks.map((chunk, chunkIdx) => {
                        const busStyle = this._childrenBusStyle(chunk.length);
                        const multiBus = chunk.length >= 2;
                        return html`<div
                          class="tree-grid-row tree-grid-row--children ${chunkIdx === 0 ? "" : "tree-grid-row--children-cont"} ${multiBus ? "tree-grid-row--children-bus" : ""}"
                          style=${busStyle}
                        >
                          ${this._treeCell(
                            1,
                            4,
                            html`<div class="tree-children-group">
                              ${chunk.map((item) => this._treeCard(item))}
                            </div>`,
                            "tree-grid-cell--children-group",
                          )}
                        </div>`;
                      })}`,
                    )
                  : nothing}
                ${showChildExtras
                  ? this._renderTreeRow(
                      hasChildCards ? null : this._tt("children"),
                      html`<div class="tree-grid-row tree-grid-row--add-child">
                        ${this._treeCell(
                          2,
                          2,
                          html`<div class="tree-card-wrap">
                            ${this._renderChildExtras(unknownCount, onAddChild)}
                          </div>`,
                          "tree-grid-cell--center",
                        )}
                      </div>`,
                    )
                  : nothing}
              </div>`
            : this._canWrite()
              ? this._renderTreeRow(
                  this._tt("partners"),
                  html`<div class="tree-grid-row">
                    ${this._treeCell(
                      2,
                      2,
                      html`<button
                        type="button"
                        class="add-slot"
                        @click=${() => this._openAddRelation({ kind: "partner", personId: p.id })}
                      >
                        ${icon(MDI_PLUS)} ${this._tt("add_partner")}
                      </button>`,
                      "tree-grid-cell--center",
                    )}
                  </div>`,
                )
              : nothing}
        </div>
      </div>
    `;
  }

  private _renderPerson() {
    const d = this._detail!;
    const p = d.person;
    const tabs: PersonTab[] = ["details", "relationships", "tree", "sources"];
    return html`
      <div class="person-head">
        <button type="button" class="back-link" @click=${() => this._setView("people")}>
          ← ${this._tt("nav_people")}
        </button>
        <h2>
          ${this._deceasedIcon(p.is_living)} ${personDisplayName(p)}
          ${this._lineageStar(p.id, personDisplayName(p))}
        </h2>
      </div>
      <div class="subtabs person-subtabs">
        <div class="subtabs-left">
          ${tabs.map(
            (tab) => html`<button class=${this._personTab === tab ? "active" : ""}
              @click=${() => (this._personTab = tab)}>${this._tt(tab)}</button>`,
          )}
        </div>
        ${this._canWrite()
          ? html`<div class="subtabs-actions">
              <button @click=${() => this._openEdit(p)}>${this._tt("edit")}</button>
              <button class="danger" @click=${() => this._deleteCurrent()}>${this._tt("delete")}</button>
            </div>`
          : nothing}
      </div>
      ${this._personTab === "details"
        ? this._renderPersonDetailsTab(d)
        : this._personTab === "relationships"
          ? this._renderRelationshipsTab(d)
          : this._personTab === "tree"
            ? this._renderTreeTab(d)
            : html`<ul class="plain">
              ${(d.citations || []).map(
                (c) => html`<li>
                  <strong>${c.source_title || "Source"}</strong>
                  ${c.source_url
                    ? html`<a href=${String(c.source_url)} target="_blank" rel="noopener">${c.source_url}</a>`
                    : nothing}
                  ${c.detail ? html`<span class="muted"> — ${c.detail}</span>` : nothing}
                </li>`,
              )}
              ${(d.citations || []).length === 0 ? html`<li class="muted">—</li>` : nothing}
            </ul>`}
    `;
  }

  private async _claimMe(personId: string | null) {
    if (!this.hass) return;
    try {
      await claimUserLink(this.hass, { person_id: personId });
      this._lineage = await getMyLineage(this.hass);
      await this._loadSettingsExtras();
      this._meQuery = "";
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _createAndClaimMe() {
    if (!this.hass) return;
    const given = (this._meForm.given_names || "").trim();
    if (!given) {
      this._error = this._tt("field_required");
      return;
    }
    try {
      await claimUserLink(this.hass, {
        create: {
          given_names: given,
          surname_prefix: this._meForm.surname_prefix || "",
          surname: this._meForm.surname || "",
          sex: this._meForm.sex || "unknown",
          birth_date_text: this._meForm.birth_date_text || "",
        },
      });
      this._lineage = await getMyLineage(this.hass);
      await this._refreshAll();
      this._meCreateOpen = false;
      this._meForm = {};
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _renderMeCard() {
    const userName = this.hass?.user?.name || this.hass?.user?.id || "—";
    const linked = this._lineage?.person_name;
    const matches = this._mePersonMatches();
    return html`<section class="block me-card">
      <h3>${this._tt("this_is_me")}</h3>
      <p class="muted">${userName}</p>
      ${linked
        ? html`<p>
            <strong>${linked}</strong>
            <button type="button" class="linkish" @click=${() => void this._claimMe(null)}>
              ${this._tt("unlink_me")}
            </button>
          </p>`
        : html`<p class="muted">${this._tt("not_linked")}</p>`}
      <label>
        ${this._tt("search_person")}
        <input
          type="search"
          .value=${this._meQuery}
          placeholder=${this._tt("search_placeholder")}
          @input=${(e: Event) => (this._meQuery = (e.target as HTMLInputElement).value)}
        />
      </label>
      ${matches.length
        ? html`<ul class="plain me-hits">
            ${matches.map(
              (p) => html`<li>
                <button type="button" class="linkish" @click=${() => void this._claimMe(p.id)}>
                  <strong>${personDisplayName(p)}</strong>
                  <span class="muted">
                    ${formatLifespan(p.birth, p.death, p.is_living, this.hass?.language)}
                    ${[p.father?.name, p.mother?.name].filter(Boolean).join(" · ")}
                  </span>
                </button>
              </li>`,
            )}
          </ul>`
        : this._meQuery.trim()
          ? html`<p class="muted">${this._tt("no_people")}</p>`
          : nothing}
      ${!linked
        ? html`<button type="button" class="linkish" @click=${() => (this._meCreateOpen = !this._meCreateOpen)}>
            ${this._tt("create_my_person")}
          </button>`
        : nothing}
      ${this._meCreateOpen
        ? html`<div class="inline-form me-create">
            <input
              placeholder=${this._tt("given_names")}
              .value=${this._meForm.given_names || ""}
              @input=${(e: Event) =>
                (this._meForm = {
                  ...this._meForm,
                  given_names: (e.target as HTMLInputElement).value,
                })}
            />
            <input
              placeholder=${this._tt("surname")}
              .value=${this._meForm.surname || ""}
              @input=${(e: Event) =>
                (this._meForm = {
                  ...this._meForm,
                  surname: (e.target as HTMLInputElement).value,
                })}
            />
            <select
              .value=${this._meForm.sex || "unknown"}
              @change=${(e: Event) =>
                (this._meForm = {
                  ...this._meForm,
                  sex: (e.target as HTMLSelectElement).value,
                })}
            >
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
            <button type="button" @click=${() => void this._createAndClaimMe()}>
              ${this._tt("save")}
            </button>
          </div>`
        : nothing}
    </section>`;
  }

  private _renderSettings() {
    const countries = (this._gazetteer?.countries as Array<Record<string, unknown>>) || [];
    return html`
      ${this._renderMeCard()}
      <section class="block">
        <h3>${this._tt("import_gedcom")} / ${this._tt("export_gedcom")}</h3>
        ${this._canWrite()
          ? html`
              <label class="check">
                <input type="checkbox" .checked=${this._replaceImport}
                  @change=${(e: Event) => (this._replaceImport = (e.target as HTMLInputElement).checked)} />
                ${this._tt("replace_import")}
              </label>
              <input type="file" accept=".ged,text/plain"
                @change=${(e: Event) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) void this._previewGedcom(file);
                  (e.target as HTMLInputElement).value = "";
                }} />
            `
          : nothing}
        <button @click=${() => this._exportGedcom()}>${this._tt("export_gedcom")}</button>
        ${this._importStatus ? html`<p class="muted">${this._importStatus}</p>` : nothing}
      </section>
      <section class="block">
        <h3>${this._tt("user_links")}</h3>
        <ul class="plain">
          ${this._userLinks.map(
            (l) => html`<li>
              ${l.ha_user_id} → ${l.person_name || l.person_id}
              ${this._canWrite()
                ? html`<button class="linkish" @click=${async () => {
                    await setUserLink(this.hass, String(l.ha_user_id), null);
                    await this._loadSettingsExtras();
                  }}>${this._tt("delete")}</button>`
                : nothing}
            </li>`,
          )}
        </ul>
        ${this._canWrite()
          ? html`<div class="inline-form">
              <input id="link-user" placeholder="HA user id" />
              <input id="link-person" placeholder="person id" />
              <button @click=${async () => {
                const u = (this.renderRoot.querySelector("#link-user") as HTMLInputElement)?.value;
                const p = (this.renderRoot.querySelector("#link-person") as HTMLInputElement)?.value;
                if (u && p) {
                  await setUserLink(this.hass, u, p);
                  await this._loadSettingsExtras();
                }
              }}>${this._tt("save")}</button>
            </div>`
          : nothing}
      </section>
      <section class="block">
        <h3>${this._tt("gazetteer")}</h3>
        <p class="muted">${countries.map((c) => `${c.code} (${c.place_count})`).join(", ") || "—"}</p>
        <div class="inline-form">
          <input .value=${this._gazQuery} placeholder="Search places…"
            @input=${(e: Event) => (this._gazQuery = (e.target as HTMLInputElement).value)} />
          <button @click=${() => this._runGazSearch()}>Search</button>
        </div>
        <ul class="plain">
          ${this._gazHits.map(
            (h) => html`<li>${h.name}${h.admin1 ? `, ${h.admin1}` : ""} (${h.country_code})</li>`,
          )}
        </ul>
      </section>
    `;
  }

  private _closeDialog = () => {
    this._dialogOpen = false;
    this._fieldErrors = {};
    this._editingUnionId = null;
    this._pickPersonRole = null;
    this._siblingsPersonId = "";
    this._siblingsPersonName = "";
    this._siblingsList = [];
    this._siblingsLoading = false;
    this._previewDetail = null;
    this._previewLoading = false;
    if (this._dialogMode === "import" && this._importPhase !== "importing") {
      this._importPhase = "";
      this._importFile = null;
      this._importFileName = "";
      this._importReport = null;
      this._importStatus = "";
    }
  };

  private _renderImportDialogBody() {
    const report = this._importReport || {};
    const phase = this._importPhase;
    if (phase === "importing" || (phase === "preview" && !this._importReport && this._importStatus)) {
      return html`<p class="muted">${this._importStatus || this._tt("importing")}</p>`;
    }
    const done = phase === "done";
    return html`
      ${done
        ? html`<p>${this._tt("import_complete_hint")}</p>`
        : this._importFileName
          ? html`<p class="muted">${this._importFileName}</p>`
          : nothing}
      ${!done && this._replaceImport
        ? html`<p class="error" role="alert">${this._tt("replace_warning")}</p>`
        : nothing}
      <ul class="plain import-counts">
        <li><span>${this._tt("import_persons")}</span><strong>${report.persons ?? 0}</strong></li>
        <li><span>${this._tt("import_unions")}</span><strong>${report.unions ?? 0}</strong></li>
        <li><span>${this._tt("import_events")}</span><strong>${report.events ?? 0}</strong></li>
        <li><span>${this._tt("import_sources")}</span><strong>${report.sources ?? 0}</strong></li>
        <li><span>${this._tt("import_places")}</span><strong>${report.places ?? 0}</strong></li>
      </ul>
    `;
  }

  private _renderDialog() {
    const write = this._canWrite();
    const mode = this._dialogMode;
    const dialogTitle =
      mode === "import"
        ? this._importPhase === "done"
          ? this._tt("import_complete")
          : this._tt("import_preview")
        : mode === "union"
          ? this._tt("edit")
          : mode === "pickPerson"
            ? this._tt("link_existing_person")
            : mode === "parents"
              ? this._tt("add_parents")
              : mode === "siblings"
                ? this._tt("siblings_of").replace("%s", this._siblingsPersonName || "")
                : mode === "preview"
                  ? this._previewDetail
                    ? personDisplayName(this._previewDetail.person)
                    : this._tt("details")
                  : mode === "event"
                  ? this._editingEventId
                    ? this._tt("edit_event")
                    : this._tt("add_event")
                  : this._editing
                    ? personDisplayName(this._editing)
                    : this._relationTarget
                      ? this._tt("add_person")
                      : this._tt("add_person");

    const personBody = html`
      <div class="form-section">
        <div class="form-section-title">${this._tt("details")}</div>
        <label
          >${this._fieldLabel(this._tt("given_names"), write)}
          <input
            class=${this._fieldInvalid("given_names") ? "invalid" : ""}
            .value=${this._form.given_names || ""}
            ?disabled=${!write}
            @input=${(e: Event) => this._onPersonField("given_names", e)}
          />
          ${this._fieldError("given_names")}
        </label>
        <label
          >${this._fieldLabel(this._tt("call_name"))}
          <input
            .value=${this._form.call_name || ""}
            ?disabled=${!write}
            @input=${(e: Event) => this._onPersonField("call_name", e)}
          />
        </label>
        <div class="row2">
          <label
            >${this._tt("surname_prefix")}
            <input
              .value=${this._form.surname_prefix || ""}
              ?disabled=${!write}
              @input=${(e: Event) =>
                (this._form = {
                  ...this._form,
                  surname_prefix: (e.target as HTMLInputElement).value,
                })}
            />
          </label>
          <label
            >${this._tt("surname")}
            <input
              .value=${this._form.surname || ""}
              ?disabled=${!write}
              @input=${(e: Event) =>
                (this._form = {
                  ...this._form,
                  surname: (e.target as HTMLInputElement).value,
                })}
            />
          </label>
        </div>
        <div class="row2">
          <label
            >${this._tt("sex")}
            <select
              .value=${this._form.sex || "unknown"}
              ?disabled=${!write}
              @change=${(e: Event) =>
                (this._form = {
                  ...this._form,
                  sex: (e.target as HTMLSelectElement).value,
                })}
            >
              <option value="male">${this._tt("sex_male")}</option>
              <option value="female">${this._tt("sex_female")}</option>
              <option value="intersex">${this._tt("sex_intersex")}</option>
              <option value="unknown">${this._tt("sex_unknown")}</option>
            </select>
          </label>
          <label class="check-row"
            >${this._tt("deceased")}
            <span class="check-control">
              <input
                type="checkbox"
                .checked=${this._form.deceased === "true"}
                ?disabled=${!write}
                @change=${(e: Event) =>
                  (this._form = {
                    ...this._form,
                    deceased: (e.target as HTMLInputElement).checked
                      ? "true"
                      : "false",
                  })}
              />
            </span>
          </label>
        </div>
        <label
          >${this._tt("notes")}
          <textarea
            rows="3"
            .value=${this._form.notes || ""}
            ?disabled=${!write}
            @input=${(e: Event) =>
              (this._form = {
                ...this._form,
                notes: (e.target as HTMLTextAreaElement).value,
              })}
          ></textarea>
        </label>
      </div>
    `;

    const usedTypes = this._usedUniqueEventTypes();
    const advancedDate = (this._eventForm.date_mode || "simple") === "advanced";
    const needsSecondDate =
      advancedDate &&
      (this._eventForm.date_qualifier === "between" ||
        this._eventForm.date_qualifier === "from_to");
    const eventBody = html`
      <div class="form-section">
        <label
          >${this._tt("events")}
          <select
            .value=${this._eventForm.event_type || "birth"}
            @change=${(e: Event) =>
              (this._eventForm = {
                ...this._eventForm,
                event_type: (e.target as HTMLSelectElement).value,
              })}
          >
            ${PERSON_EVENT_TYPES.map((t) => {
              const disabled =
                UNIQUE_PERSON_EVENT_TYPES.has(t) && usedTypes.has(t);
              return html`<option value=${t} ?disabled=${disabled}>
                ${this._eventTypeLabel(t)}${disabled ? ` (${this._tt("already_added")})` : ""}
              </option>`;
            })}
          </select>
        </label>
        <div class="event-date-field">
          ${advancedDate
            ? html`<label
                >${this._tt("date_qualifier")}
                <select
                  .value=${this._eventForm.date_qualifier || "exact"}
                  @change=${(e: Event) =>
                    (this._eventForm = {
                      ...this._eventForm,
                      date_qualifier: (e.target as HTMLSelectElement).value,
                    })}
                >
                  ${FORM_QUALIFIERS.map(
                    (q) =>
                      html`<option value=${q}>${this._tt(QUALIFIER_KEYS[q])}</option>`,
                  )}
                </select>
              </label>
              <label
                >${this._tt("date")}
                <input
                  .value=${this._eventForm.date_first || ""}
                  placeholder=${this._tt("date_gedcom_hint")}
                  @input=${(e: Event) =>
                    (this._eventForm = {
                      ...this._eventForm,
                      date_first: (e.target as HTMLInputElement).value,
                    })}
                />
              </label>
              ${needsSecondDate
                ? html`<label
                    >${this._tt("date_second")}
                    <input
                      .value=${this._eventForm.date_second || ""}
                      placeholder=${this._tt("date_gedcom_hint")}
                      @input=${(e: Event) =>
                        (this._eventForm = {
                          ...this._eventForm,
                          date_second: (e.target as HTMLInputElement).value,
                        })}
                    />
                  </label>`
                : nothing}
              <button
                type="button"
                class="linkish date-mode-toggle"
                @click=${() => this._toggleEventDateMode()}
              >
                ${this._tt("date_simple")}
              </button>`
            : html`<div class="date-input-row">
                <div class="date-label-grow">
                  <span class="field-label">${this._tt("date")}</span>
                  ${tooltip(
                    this._tt("date"),
                    html`<input
                      type="date"
                      .value=${this._eventForm.date_iso || ""}
                      @input=${(e: Event) =>
                        (this._eventForm = {
                          ...this._eventForm,
                          date_iso: (e.target as HTMLInputElement).value,
                        })}
                    />`,
                  )}
                </div>
                <button
                  type="button"
                  class="linkish date-mode-toggle"
                  @click=${() => this._toggleEventDateMode()}
                >
                  ${this._tt("date_advanced")}
                </button>
              </div>`}
        </div>
        <label class="place-field"
          >${this._fieldLabel(this._tt("place"))}
          <input
            .value=${this._eventForm.place || ""}
            @input=${(e: Event) => {
              const value = (e.target as HTMLInputElement).value;
              this._eventForm = { ...this._eventForm, place: value };
              this._schedulePlaceSearch(value);
            }}
            @focus=${() => {
              if (this._placeSuggestions.length) this._placeSuggestOpen = true;
            }}
            @blur=${() => {
              setTimeout(() => {
                this._placeSuggestOpen = false;
              }, 150);
            }}
          />
          ${this._placeSuggestOpen && this._placeSuggestions.length
            ? html`<ul class="place-suggest">
                ${this._placeSuggestions.map(
                  (pl) => html`<li>
                    <button
                      type="button"
                      @mousedown=${() => {
                        this._eventForm = { ...this._eventForm, place: pl.name };
                        this._placeSuggestOpen = false;
                      }}
                    >
                      ${pl.name}
                    </button>
                  </li>`,
                )}
              </ul>`
            : nothing}
        </label>
        <label
          >${this._tt("description")}
          <input
            .value=${this._eventForm.description || ""}
            @input=${(e: Event) =>
              (this._eventForm = {
                ...this._eventForm,
                description: (e.target as HTMLInputElement).value,
              })}
          />
        </label>
      </div>
    `;

    const unionBody = html`<div class="form-section">
      <label
        >${this._fieldLabel(this._tt("union_status"))}
        <select
          .value=${this._unionForm.status || "ongoing"}
          @change=${(e: Event) =>
            (this._unionForm = {
              ...this._unionForm,
              status: (e.target as HTMLSelectElement).value,
            })}
        >
          <option value="ongoing">${this._tt("status_ongoing")}</option>
          <option value="ended">${this._tt("status_ended")}</option>
          <option value="unknown">${this._tt("status_unknown")}</option>
        </select>
      </label>
      <label
        >${this._fieldLabel(this._tt("known_children"))}
        <input
          type="number"
          min="0"
          .value=${this._unionForm.known_children_count || ""}
          @input=${(e: Event) =>
            (this._unionForm = {
              ...this._unionForm,
              known_children_count: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("event_marriage"))}
        <input
          .value=${this._unionForm.marriage_date || ""}
          placeholder=${this._tt("date_gedcom_hint")}
          @input=${(e: Event) =>
            (this._unionForm = {
              ...this._unionForm,
              marriage_date: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("place"))}
        <input
          .value=${this._unionForm.marriage_place || ""}
          @input=${(e: Event) =>
            (this._unionForm = {
              ...this._unionForm,
              marriage_place: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label
        >${this._fieldLabel(this._tt("union_notes"))}
        <textarea
          rows="2"
          .value=${this._unionForm.notes || ""}
          @input=${(e: Event) =>
            (this._unionForm = {
              ...this._unionForm,
              notes: (e.target as HTMLTextAreaElement).value,
            })}
        ></textarea>
      </label>
    </div>`;

    const pickMatches = this._pickPersonMatches();
    const pickBody = html`<div class="form-section">
      <label
        >${this._fieldLabel(this._tt("search_to_link"))}
        <input
          type="search"
          .value=${this._pickPersonQuery}
          placeholder=${this._tt("search_placeholder")}
          @input=${(e: Event) =>
            (this._pickPersonQuery = (e.target as HTMLInputElement).value)}
        />
      </label>
      <ul class="plain me-hits">
        ${pickMatches.map(
          (p) => html`<li>
            <button type="button" class="linkish" @click=${() => void this._linkPickedPerson(p.id)}>
              ${personDisplayName(p)}
            </button>
          </li>`,
        )}
        ${!pickMatches.length && this._pickPersonQuery
          ? html`<li class="muted">—</li>`
          : nothing}
      </ul>
    </div>`;

    const parentsBody = html`<div class="form-section">
      <p class="muted">${this._tt("search_to_link")}</p>
      <label>${this._tt("father")}
        <input
          type="search"
          placeholder=${this._tt("search_placeholder")}
          @change=${(e: Event) => {
            const q = (e.target as HTMLInputElement).value.toLowerCase();
            const hit = this._people.find((p) =>
              personDisplayName(p).toLowerCase().includes(q),
            );
            if (hit) this._parentsForm = { ...this._parentsForm, father_id: hit.id };
          }}
        />
      </label>
      <label>${this._tt("mother")}
        <input
          type="search"
          placeholder=${this._tt("search_placeholder")}
          @change=${(e: Event) => {
            const q = (e.target as HTMLInputElement).value.toLowerCase();
            const hit = this._people.find((p) =>
              personDisplayName(p).toLowerCase().includes(q),
            );
            if (hit) this._parentsForm = { ...this._parentsForm, mother_id: hit.id };
          }}
        />
      </label>
      <div class="row-actions">
        <button type="button" class="linkish" @click=${() => this._openPickPerson("father")}>
          ${this._tt("link_existing_person")} (${this._tt("father")})
        </button>
        <button type="button" class="linkish" @click=${() => this._openPickPerson("mother")}>
          ${this._tt("link_existing_person")} (${this._tt("mother")})
        </button>
      </div>
    </div>`;

    const siblingsBody = this._siblingsLoading
      ? html`<p class="muted">${this._tt("loading")}</p>`
      : html`<div class="siblings-grid">
          ${this._siblingsList.map((s) => {
            const relation = String(s.relation || "");
            const subtitle =
              relation === "half_sibling" ? this._tt("half_sibling") : undefined;
            return this._renderPersonCard(s as Record<string, unknown>, {
              hideSiblings: true,
              subtitle,
            });
          })}
          ${!this._siblingsList.length ? html`<p class="muted">—</p>` : nothing}
        </div>`;

    const preview = this._previewDetail;
    const lang = this.hass?.language;
    const previewBody = this._previewLoading
      ? html`<p class="muted">${this._tt("loading")}</p>`
      : preview
        ? html`<div class="preview-body">
            <dl class="kv">
              <dt>${this._tt("given_names")}</dt>
              <dd>${preview.person.given_names || "—"}</dd>
              <dt>${this._tt("call_name")}</dt>
              <dd>${preview.person.call_name || "—"}</dd>
              <dt>${this._tt("surname")}</dt>
              <dd>
                ${[preview.person.surname_prefix, preview.person.surname]
                  .filter(Boolean)
                  .join(" ") || "—"}
              </dd>
              <dt>${this._tt("sex")}</dt>
              <dd>${this._sexBadge(preview.person.sex)}</dd>
              ${preview.person.birth
                ? html`<dt>${this._tt("event_birth")}</dt><dd>${formatEventDate(preview.person.birth, lang) || "—"}</dd>`
                : nothing}
              ${preview.person.death
                ? html`<dt>${this._tt("event_death")}</dt><dd>${formatEventDate(preview.person.death, lang) || "—"}</dd>`
                : nothing}
              ${preview.person.notes
                ? html`<dt>${this._tt("notes")}</dt><dd>${preview.person.notes}</dd>`
                : nothing}
            </dl>
          </div>`
        : html`<p class="muted">—</p>`;

    const actions =
      mode === "import"
        ? html`
            ${mdButton(this._tt(this._importPhase === "done" ? "close" : "cancel"), {
              variant: "text",
              disabled: this._importPhase === "importing",
              onClick: this._closeDialog,
            })}
            ${this._importPhase === "preview" && this._importReport
              ? mdButton(this._tt("confirm_import"), {
                  variant: "filled",
                  onClick: () => void this._confirmImport(),
                })
              : nothing}
          `
        : mode === "union"
          ? html`
              ${mdButton(this._tt("cancel"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${mdButton(this._tt("save"), {
                variant: "filled",
                disabled: this._saving,
                onClick: () => void this._saveUnionForm(),
              })}
            `
          : mode === "pickPerson"
            ? mdButton(this._tt("close"), {
                variant: "text",
                onClick: this._closeDialog,
              })
            : mode === "parents"
              ? html`
                  ${mdButton(this._tt("cancel"), {
                    variant: "text",
                    onClick: this._closeDialog,
                  })}
                  ${mdButton(this._tt("save"), {
                    variant: "filled",
                    disabled: this._saving,
                    onClick: () => void this._saveParentsLinks(),
                  })}
                `
              : mode === "siblings"
          ? mdButton(this._tt("close"), {
              variant: "text",
              onClick: this._closeDialog,
            })
          : mode === "preview"
            ? html`
                ${mdButton(this._tt("close"), {
                  variant: "text",
                  onClick: this._closeDialog,
                })}
                ${preview
                  ? html`
                      ${mdButton(this._tt("view_full_profile"), {
                        variant: "outlined",
                        onClick: () => {
                          const id = preview.person.id;
                          this._closeDialog();
                          void this._openPerson(id);
                        },
                      })}
                      ${mdButton(this._tt("view_tree_action"), {
                        variant: "outlined",
                        onClick: () => {
                          const id = preview.person.id;
                          this._closeDialog();
                          void this._openPerson(id, "tree");
                        },
                      })}
                      ${write
                        ? mdButton(this._tt("edit"), {
                            variant: "filled",
                            onClick: () => {
                              this._closeDialog();
                              this._openEdit(preview.person);
                            },
                          })
                        : nothing}
                    `
                  : nothing}
              `
          : mode === "event"
            ? html`
                ${mdButton(this._tt("cancel"), {
                  variant: "text",
                  onClick: this._closeDialog,
                })}
                ${mdButton(this._tt("save"), {
                  variant: "filled",
                  disabled: this._saving,
                  onClick: () => void this._saveEvent(),
                })}
              `
            : html`
              ${mdButton(this._tt(write ? "cancel" : "close"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${write
                ? mdButton(this._tt("save"), {
                    variant: "filled",
                    disabled: this._saving,
                    onClick: () => void this._savePerson(),
                  })
                : nothing}
            `;

    return html`
      <div class="dialog-backdrop">
        <div
          class="dialog ${this.narrow ? "dialog-narrow" : ""}"
          role="dialog"
          aria-modal="true"
          aria-label=${dialogTitle}
          @click=${(e: Event) => e.stopPropagation()}
        >
          <div class="dialog-header">
            <h2>
              ${mode === "preview" && preview
                ? html`${this._deceasedIcon(preview.person.is_living)}
                    ${this._sexIconBadge(preview.person.sex)}
                    <span class="dialog-title-text">${personDisplayName(preview.person)}</span>
                    ${this._lineageStar(preview.person.id, personDisplayName(preview.person))}`
                : dialogTitle}
            </h2>
            <button
              type="button"
              class="icon-btn dialog-close"
              aria-label=${this._tt("cancel")}
              ?disabled=${mode === "import" && this._importPhase === "importing"}
              @click=${this._closeDialog}
            >
              ${icon(MDI_CLOSE)}
            </button>
          </div>

          <div class="dialog-body">
            ${mode === "import"
              ? this._renderImportDialogBody()
              : mode === "union"
                ? unionBody
                : mode === "pickPerson"
                  ? pickBody
                  : mode === "parents"
                    ? parentsBody
                    : mode === "siblings"
                      ? siblingsBody
                      : mode === "preview"
                        ? previewBody
                        : mode === "event"
                        ? eventBody
                        : personBody}

            ${this._error && mode !== "import"
              ? html`<div class="error" role="alert">${this._error}</div>`
              : nothing}
          </div>

          <div class="dialog-actions">${actions}</div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      color: var(--primary-text-color);
      background: var(--primary-background-color, transparent);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .shell {
      margin: 0 auto;
      padding: 20px 24px 48px;
      box-sizing: border-box;
      width: 100%;
    }
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .brand-logo {
      height: 36px;
      width: auto;
      display: block;
      object-fit: contain;
    }
    .tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-left: auto; }
    .tabs button, .subtabs button, .toolbar button:not(.md-btn), .inline-form button:not(.md-btn), .row-actions button:not(.md-btn), .chip {
      appearance: none;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-border-radius-pill, 9999px);
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tabs button.active, .subtabs button.active, .chip.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: transparent;
    }
    button.danger { color: var(--error-color); }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      flex-shrink: 0;
    }
    .icon-btn:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
    }
    .icon-btn svg { width: 24px; height: 24px; }
    .mdi { width: 20px; height: 20px; fill: currentColor; display: block; }
    .banner, .error {
      padding: 8px 12px;
      border-radius: var(--ha-border-radius-md, 8px);
      margin: 0 0 12px;
    }
    .banner { background: var(--secondary-background-color); }
    .error { background: color-mix(in srgb, var(--error-color) 18%, transparent); color: var(--error-color); }
    .muted { color: var(--secondary-text-color); font-size: 0.9em; }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat {
      padding: 16px;
      border-radius: var(--ha-border-radius-md, 8px);
      border-left: 3px solid var(--primary-color);
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .stat-n { display: block; font-size: 1.5rem; font-weight: 600; }
    .stat-label {
      display: block;
      margin-top: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .chart-card {
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .chart-card h3 { margin: 0 0 8px; font-size: 0.95rem; font-weight: 500; }
    .chart-wrap { height: 200px; position: relative; }
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .block { margin-bottom: 20px; }
    .block h3 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 500; }
    .heading-with-tip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .info-tip {
      display: inline-flex;
      color: var(--secondary-text-color);
      cursor: help;
    }
    .info-tip svg { width: 16px; height: 16px; }
    .ft-tooltip {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .ft-tooltip__popup {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      padding: 6px 10px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font-size: 0.8rem;
      line-height: 1.35;
      max-width: 240px;
      white-space: normal;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.15s;
      width: max-content;
    }
    .ft-tooltip:hover .ft-tooltip__popup,
    .ft-tooltip:focus-visible .ft-tooltip__popup {
      opacity: 1;
    }
    ul.plain, ul.people { list-style: none; padding: 0; margin: 0; }
    ul.plain li, ul.people li {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--divider-color);
    }
    .person-row, .linkish {
      appearance: none; border: none; background: none; color: var(--primary-color);
      font: inherit; cursor: pointer; text-align: left; display: inline-flex; gap: 8px; align-items: center;
    }
    .person-row { color: inherit; width: 100%; padding: 8px 0; }
    .toolbar {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center;
    }
    .toolbar input[type="search"], .toolbar select, .filters select, .filters input[type="date"],
    .inline-form input, .inline-form select,
    .dialog input, .dialog select, .dialog textarea,
    .me-card input, .me-card select {
      font: inherit;
      padding: 8px 12px;
      min-height: 40px;
      border-radius: var(--ha-border-radius-lg, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--primary-background-color));
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1.41 0L6 4.58 10.59 0 12 1.41 6 7.41 0 1.41z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 36px;
    }
    .toolbar input[type="search"] { flex: 1; min-width: 160px; width: auto; }
    .toolbar select, .filters select, .filters input[type="date"] { width: auto; }
    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .date-filter {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
    .subtabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
    .kv { display: grid; grid-template-columns: 140px 1fr; gap: 6px 12px; margin: 0 0 16px; }
    .kv dt { color: var(--secondary-text-color); }
    .kv dd { margin: 0; }
    .person-head { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; margin-bottom: 8px; }
    .person-head h2 { margin: 0; font-size: 1.3rem; font-weight: 500; }
    .tree-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      width: 100%;
    }
    .tree-box {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: stretch;
    }
    .tree-box.view-tree {
      gap: 0;
      align-items: stretch;
      width: max-content;
      min-width: 100%;
    }
    .view-tree {
      min-width: 0;
      padding: 24px 0 32px;
      --tree-line-color: var(--divider-color);
      --tree-card-width: 280px;
      --tree-gap: 12px;
      --tree-row-gap: 36px;
      --tree-connector: 1.4rem;
    }
    .tree-grid-row {
      display: grid;
      grid-template-columns: repeat(4, var(--tree-card-width));
      column-gap: var(--tree-gap);
      width: fit-content;
      min-width: max-content;
      flex-shrink: 0;
      padding-bottom: var(--tree-row-gap);
      position: relative;
      align-items: stretch;
    }
    .tree-grid-row--children-cont::before {
      display: none;
    }
    .tree-grid-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      min-width: 0;
    }
    .tree-grid-cell--span2,
    .tree-grid-cell--center {
      justify-content: center;
    }
    .tree-grid-pair {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: span 2;
      position: relative;
      align-items: stretch;
    }
    .tree-grid-pair--left { grid-column: 1 / 3; }
    .tree-grid-pair--right { grid-column: 3 / 5; }
    .tree-grid-pair::before {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-connector));
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--parents::before {
      content: "";
      position: absolute;
      bottom: calc(var(--tree-connector) - 0.2rem);
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--span2::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-connector));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-connector);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--focus .tree-grid-cell--stem-down::before,
    .tree-grid-row--partner .tree-grid-cell--center::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-connector));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-connector);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--partner {
      padding-bottom: calc(var(--tree-row-gap) / 2);
    }
    .tree-grid-row--children::before {
      content: "";
      position: absolute;
      top: 0;
      left: var(--tree-bus-left, 12.5%);
      right: var(--tree-bus-right, 12.5%);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--children-group {
      width: 100%;
    }
    .tree-children-group {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--tree-gap);
      width: 100%;
      position: relative;
    }
    .tree-grid-row--children-bus .tree-children-group {
      padding-top: calc(var(--tree-connector) + 2px);
    }
    .tree-grid-row--children .tree-card-wrap:not(.tree-card-wrap--empty)::before {
      content: "";
      position: absolute;
      top: calc(-1 * var(--tree-connector));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-connector);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-row--add-child {
      padding-top: 0;
    }
    .tree-card-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      width: var(--tree-card-width);
      max-width: 100%;
      flex: 0 0 auto;
      z-index: 1;
    }
    .tree-card-wrap--empty {
      min-height: 1px;
      width: var(--tree-card-width);
      flex: 0 0 auto;
    }
    .tree-grid-row:not(.tree-grid-row--children):not(.tree-grid-row--add-child) .tree-card-wrap:not(.tree-card-wrap--empty)::after {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-connector));
      left: 50%;
      margin-left: -1px;
      width: 0;
      height: var(--tree-connector);
      border-left: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-card-wrap .person-card,
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      background: var(--card-background-color, #fff);
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .tree-card-wrap .person-card-footer {
      margin-top: auto;
    }
    .tree-subtabs {
      justify-content: center;
      width: 100%;
    }
    .gen { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
    .node {
      padding: 10px 14px; border-radius: var(--ha-border-radius-lg, 12px);
      background: var(--secondary-background-color);
      cursor: pointer; min-width: 100px; text-align: center;
    }
    .node.self { background: var(--primary-color); color: var(--text-primary-color, #fff); font-weight: 600; }

    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; margin: 16px 0 8px;
    }
    .section-head-actions {
      justify-content: flex-start;
    }
    .section-head h3 { margin: 0; }
    .card-list {
      display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
    }
    .person-card, .event-card {
      appearance: none; border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 14px; text-align: left; color: inherit;
      box-shadow: var(--ha-card-box-shadow, none);
      width: 100%; box-sizing: border-box;
    }
    button.person-card { cursor: pointer; font: inherit; display: block; }
    .person-card-title {
      font-weight: 600;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: nowrap;
    }
    .person-card-formal { margin-top: 2px; }
    .person-card-meta, .event-card-meta {
      color: var(--secondary-text-color); font-size: 0.9em; margin-top: 4px;
    }
    .person-card-meta.accent, .person-card-footer {
      color: var(--primary-color); font-size: 0.9em; margin-top: 6px;
    }
    button.person-card-footer,
    span.person-card-footer {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      font: inherit;
      text-align: left;
    }
    .event-card-head {
      display: flex; justify-content: space-between; align-items: center; gap: 8px;
    }
    .event-card-desc { margin-top: 6px; }
    .import-counts li { justify-content: space-between; }
    .tree-grid {
      display: grid;
      gap: 8px;
      width: 100%;
    }
    .tree-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .tree-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tree-grid .person-card,
    .tree-grid .add-slot,
    .tree-grid .unknown-children {
      width: 100%;
      max-width: none;
      min-height: 88px;
      box-sizing: border-box;
    }
    .gen .person-card { max-width: 280px; width: 280px; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .inline-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; align-items: center; }
    .event-date-field {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      flex: 1; min-width: 200px;
    }
    .event-date-field input { flex: 1; min-width: 140px; width: auto; }
    .date-input-row {
      display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;
    }
    .date-label-grow {
      flex: 1; min-width: 140px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .date-mode-toggle { font-size: 0.85em; white-space: nowrap; flex-shrink: 0; align-self: center; }
    .event-form input, .event-form select { width: auto; min-width: 120px; flex: 1; }
    .check { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      padding: 48px 16px;
      color: var(--secondary-text-color);
    }
    .empty-state .brand-logo { height: 56px; width: auto; }
    .empty-state p { margin: 0; max-width: 28rem; }
    .empty-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px; }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
    .req { color: var(--error-color, #c62828); margin-left: 2px; }
    .field-label { display: inline-flex; align-items: baseline; gap: 2px; }
    .field-error {
      color: var(--error-color);
      font-size: 0.75rem;
      margin-top: 2px;
    }
    .dialog input.invalid,
    .dialog select.invalid,
    .dialog textarea.invalid {
      border-color: var(--error-color);
    }
    .deceased-icon {
      color: var(--secondary-text-color);
      display: inline-flex;
      vertical-align: middle;
    }
    .deceased-icon svg { width: 14px; height: 14px; }
    .person-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .person-card-wrap { display: flex; flex-direction: column; gap: 6px; }
    .card-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px 8px;
    }
    .person-subtabs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .subtabs-left { display: flex; flex-wrap: wrap; gap: 4px; }
    .subtabs-actions {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
    .rel-section h3 { margin: 0; font-size: 1rem; }
    .rel-union-card {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--card-background-color, #fff);
    }
    .rel-union-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .rel-union-meta {
      margin: 12px 0;
      padding: 12px 14px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      font-size: 0.95rem;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .rel-union-meta strong { color: var(--primary-text-color); }
    .place-field { position: relative; }
    .place-suggest {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      margin: 2px 0 0;
      padding: 0;
      list-style: none;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.12));
      max-height: 180px;
      overflow: auto;
    }
    .place-suggest button {
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
    }
    .place-suggest button:hover { background: var(--secondary-background-color); }
    .union-tabs .gen + .gen { margin-top: 16px; }
    .md-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      padding: 0 16px;
      border-radius: var(--ha-button-border-radius, var(--ha-border-radius-pill, 9999px));
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      box-sizing: border-box;
      background: transparent;
      color: var(--primary-color);
      font-family: inherit;
    }
    .md-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .md-btn-filled {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .md-btn-outlined {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      background: var(--card-background-color, #fff);
    }
    .md-btn-active.md-btn-outlined {
      background: color-mix(in srgb, var(--primary-color) 8%, var(--card-background-color, #fff));
    }
    .md-btn-text {
      color: var(--primary-color);
      background: transparent;
      padding: 0 8px;
    }
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      box-sizing: border-box;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 20px;
      border-radius: var(--ha-dialog-border-radius, var(--ha-border-radius-lg, 12px));
      width: min(520px, 100%);
      max-height: 90vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .dialog-header h2 {
      margin: 0;
      flex: 1;
      min-width: 0;
      font-size: 1.25rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .dialog-title-text { min-width: 0; }
    .dialog-close {
      flex-shrink: 0;
      margin: -8px -8px -8px 0;
    }
    .dialog-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .dialog.dialog-narrow {
      width: 100%;
      height: auto;
      max-height: calc(
        100dvh - max(12px, env(safe-area-inset-top, 0px)) - max(12px, env(safe-area-inset-bottom, 0px)) - 24px
      );
      overflow: hidden;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }
    .dialog-backdrop:has(.dialog-narrow) {
      align-items: center;
      padding-top: max(12px, env(safe-area-inset-top, 0px));
      padding-right: max(12px, env(safe-area-inset-right, 0px));
      padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
      padding-left: max(12px, env(safe-area-inset-left, 0px));
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.02));
    }
    .form-section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .dialog label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .check-row .check-control {
      display: flex;
      align-items: center;
      min-height: 40px;
    }
    .check-row input[type="checkbox"] {
      width: auto;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 4px;
    }
    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .table-wrap { overflow-x: auto; overflow-y: visible; margin-bottom: 16px; }
    .people-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
    }
    .people-table th, .people-table td {
      padding: 10px 8px;
      border-bottom: 1px solid var(--divider-color);
      text-align: left;
      vertical-align: middle;
    }
    .people-table th { color: var(--secondary-text-color); font-weight: 500; }
    .sort-btn {
      appearance: none;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0;
    }
    .people-table .num, .people-table .center { text-align: center; }
    .date-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background: var(--secondary-background-color);
      font-size: 0.88em;
      white-space: nowrap;
    }
    .sex-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      font-size: 0.85em;
      white-space: nowrap;
    }
    .sex-badge svg { width: 14px; height: 14px; }
    .sex-badge--icon-only {
      padding: 4px 6px;
      gap: 0;
    }
    .sex-male { background: color-mix(in srgb, #2196f3 15%, transparent); color: #1565c0; }
    .sex-female { background: color-mix(in srgb, #e91e63 15%, transparent); color: #ad1457; }
    .sex-other { background: var(--secondary-background-color); }
    .lineage-star { color: var(--primary-color); display: inline-flex; }
    .lineage-star svg { width: 16px; height: 16px; }
    .name-cell { font-weight: 500; }
    .menu-cell { width: 40px; position: relative; }
    .row-menu-wrap { position: relative; }
    .icon-btn.sm { width: 32px; height: 32px; }
    .row-menu {
      z-index: 100;
      min-width: 140px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 4px 16px rgba(0,0,0,.12));
      display: flex;
      flex-direction: column;
      padding: 4px;
    }
    .row-menu--fixed { position: fixed; }
    .row-menu button {
      appearance: none;
      border: none;
      background: none;
      text-align: left;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      border-radius: 6px;
    }
    .row-menu button:hover { background: var(--secondary-background-color); }
    .people-cards .person-card-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .back-link {
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-color);
      cursor: pointer;
      margin-bottom: 4px;
      text-align: left;
    }
    .back-link:hover { text-decoration: underline; }
    .collapse {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      margin-bottom: 12px;
      overflow: hidden;
      background: #fff;
    }
    .collapse-head {
      appearance: none;
      border: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      background: #fff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: inherit;
    }
    .collapse-body {
      padding: 0 14px 14px;
      background: #fff;
    }
    .collapse--cards .collapse-body {
      padding: 10px 14px 14px;
      background: color-mix(in srgb, var(--divider-color) 8%, #fff);
    }
    .gen-row {
      position: relative;
      display: flex;
      justify-content: center;
      width: max-content;
      min-width: 100%;
      box-sizing: border-box;
      align-items: stretch;
    }
    .gen-label {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rem;
      text-align: left;
      font-size: 0.85rem;
    }
    .gen-label--empty {
      visibility: hidden;
    }
    .siblings-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .preview-body { margin-bottom: 8px; }
    .rel-card-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
    }
    .rel-card-list .person-card,
    .rel-card-list .add-slot,
    .rel-card-list .more-children-card,
    .rel-card-list .unknown-children {
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      box-sizing: border-box;
    }
    .rel-person-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      align-self: flex-start;
    }
    .rel-person-wrap .person-card {
      width: 100%;
      height: fit-content;
      flex: none;
    }
    .rel-person-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px;
    }
    .rel-union-children { margin-top: 16px; }
    .rel-union-children > .muted {
      display: block;
      margin-bottom: 8px;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .union-tabs {
      width: max-content;
      min-width: 100%;
    }
    .add-slot {
      appearance: none;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 16px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .more-children-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 120px;
      padding: 12px 16px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      box-sizing: border-box;
      text-align: center;
    }
    .more-children-label {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .more-children-add {
      font-size: 0.9rem;
    }
    .unknown-children {
      padding: 8px 12px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .me-hits li { flex-direction: column; align-items: flex-start; }
    .me-create { margin-top: 8px; }
    @media (max-width: 720px) {
      .shell { padding: 12px 16px 40px; }
      .view-tree { zoom: 0.8; }
      .siblings-grid { grid-template-columns: 1fr; }
      .stats-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      .stat { padding: 8px 6px; }
      .stat-n { font-size: 1.15rem; }
      .stat-label { font-size: 0.7rem; }
      .row2 { grid-template-columns: 1fr; }
      .subtabs-actions { width: 100%; justify-content: flex-end; }
      .rel-card-list .person-card,
      .rel-card-list .add-slot,
      .rel-card-list .more-children-card,
      .rel-person-wrap {
        width: 100%;
        flex: 1 1 100%;
      }
    }
  `;
}

if (!customElements.get(PANEL_TAG)) {
  customElements.define(PANEL_TAG, FamilyTreePanel);
}

declare global {
  interface HTMLElementTagNameMap {
    "family-tree-panel": FamilyTreePanel;
  }
}
