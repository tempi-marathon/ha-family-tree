/** Family Tree sidebar management panel. */

import Chart from "chart.js/auto";
import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import {
  type GazetteerHit,
  type EventDto,
  type PersonDetail,
  type PersonDto,
  type StatsDto,
  deleteEvent,
  deletePerson,
  gazetteerStatus,
  getPerson,
  getSettings,
  getStats,
  listPersons,
  listUserLinks,
  purgePerson,
  restorePerson,
  saveEvent,
  savePerson,
  searchGazetteer,
  setUserLink,
  subscribeRevision,
  type SettingsDto,
} from "./api";
import { daysUntilLabel, formatGedcomDate } from "./dates_view";
import { formatHassError } from "./errors";
import { type LocaleKey, t } from "./i18n";
import {
  loadPanelViewState,
  savePanelViewState,
  sortedOptionList,
  type PanelView,
} from "./panel_view_state";
import {
  filterAndSortPeople,
  personDisplayName,
  placeOptionsFromPeople,
} from "./people_view";
import {
  flattenChildren,
  flattenParents,
  nodeName,
  partnerNames,
} from "./tree_view";
import type { HomeAssistant } from "./types";

const PANEL_TAG = "family-tree-panel";

const MDI_MENU =
  "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
const MDI_CLOSE =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
const MDI_TREE =
  "M12,2L9,7H11V12H8V14H11V22H13V14H16V12H13V7H15L12,2Z";
const MDI_ACCOUNT =
  "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
const MDI_COG =
  "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
const MDI_DELETE =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const MDI_PLUS =
  "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";

type PersonTab = "details" | "relationships" | "tree" | "sources";

function icon(path: string) {
  return html`<svg class="mdi" viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>`;
}

function mdButton(
  label: string,
  opts: {
    variant?: "filled" | "outlined" | "text";
    disabled?: boolean;
    onClick: (e: Event) => void;
  },
) {
  const variant = opts.variant ?? "outlined";
  return html`
    <button
      type="button"
      class="md-btn md-btn-${variant}"
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

  private _unsub: (() => void) | null = null;
  private _connected = false;
  private _viewHydrated = false;
  private _charts: Chart[] = [];
  private _revision = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this._connected = true;
    this._restoreViewState();
    window.addEventListener("keydown", this._onWindowKeyDown);
    void this._connect();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._connected = false;
    window.removeEventListener("keydown", this._onWindowKeyDown);
    this._unsub?.();
    this._unsub = null;
    this._destroyCharts();
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("hass") && this.hass && !this._unsub && this._connected) {
      void this._connect();
    }
    if (this._view === "dashboard" && this._stats) {
      this.updateComplete.then(() => this._renderCharts());
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
        sort: "surname",
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
      const [list, stats, settings] = await Promise.all([
        listPersons(this.hass, {
          trashed,
          // Full tree — filters apply client-side (ready-home pattern).
          limit: 5000,
        }),
        getStats(this.hass),
        getSettings(this.hass),
      ]);
      this._people = list.persons;
      this._total = list.total;
      this._stats = stats;
      this._settings = settings;
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
    if (this._familyShortcut) n += 1;
    if (this._filterPlace) n += 1;
    if (this._dateFrom) n += 1;
    if (this._dateTo) n += 1;
    return n;
  }

  private _resetFilters = () => {
    this._familyShortcut = "";
    this._filterPlace = "";
    this._dateFrom = "";
    this._dateTo = "";
    this._persistViewState();
  };

  private _onWindowKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape" && this._dialogOpen) {
      this._dialogOpen = false;
    }
  };

  private _setView(view: PanelView) {
    this._view = view;
    this._detail = null;
    this._persistViewState();
    void this._refreshAll();
  }

  private async _openPerson(id: string) {
    if (!this.hass) return;
    try {
      this._detail = await getPerson(this.hass, id);
      this._view = "person";
      this._personTab = "details";
      this._persistViewState();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _openCreate() {
    this._editing = null;
    this._error = "";
    this._form = {
      given_names: "",
      call_name: "",
      surname_prefix: "",
      surname: "",
      sex: "unknown",
      is_living: "true",
      notes: "",
    };
    this._dialogOpen = true;
  }

  private _openEdit(person: PersonDto) {
    this._editing = person;
    this._error = "";
    this._form = {
      given_names: person.given_names || "",
      call_name: person.call_name || "",
      surname_prefix: person.surname_prefix || "",
      surname: person.surname || "",
      sex: person.sex || "unknown",
      is_living: person.is_living ? "true" : "false",
      notes: person.notes || "",
    };
    this._dialogOpen = true;
  }

  private async _savePerson() {
    if (!this.hass || !this._canWrite()) return;
    this._saving = true;
    this._error = "";
    try {
      const payload: Parameters<typeof savePerson>[1] = {
        given_names: this._form.given_names,
        call_name: this._form.call_name,
        surname_prefix: this._form.surname_prefix,
        surname: this._form.surname,
        sex: this._form.sex,
        is_living: this._form.is_living === "true",
        notes: this._form.notes,
      };
      if (this._editing?.id) {
        payload.person_id = this._editing.id;
      }
      const { person } = await savePerson(this.hass, payload);
      this._dialogOpen = false;
      await this._refreshAll();
      await this._openPerson(person.id);
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _deleteCurrent() {
    if (!this.hass || !this._detail || !this._canWrite()) return;
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
    try {
      await purgePerson(this.hass, id);
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _saveEvent() {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    try {
      await saveEvent(this.hass, {
        subject_type: "person",
        subject_id: this._detail.person.id,
        event_type: this._eventForm.event_type || "birth",
        date_text: this._eventForm.date_text || "",
        description: this._eventForm.description || "",
      });
      this._eventForm = {};
      this._detail = await getPerson(this.hass, this._detail.person.id);
    } catch (err) {
      this._error = formatHassError(err);
    }
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

  private async _importGedcom(file: File) {
    if (!this.hass || !this._canWrite()) return;
    this._importStatus = this._tt("loading");
    try {
      const token = await (this.hass as unknown as {
        auth?: { data?: { access_token?: string } };
        connection?: { options?: { auth?: { data?: { access_token?: string } } } };
      }).auth;
      // Use fetch with credentials — HA panel shares cookies / auth header via hass
      const form = new FormData();
      form.append("file", file);
      const url = `/api/family_tree/import_gedcom?replace=${this._replaceImport ? "1" : "0"}`;
      const headers: Record<string, string> = {};
      const access =
        (this.hass as unknown as { connection?: { options?: { auth?: { accessToken?: string } } } })
          ?.connection?.options?.auth?.accessToken;
      // Prefer hass.callApi pattern via raw fetch with Authorization from hass
      const authData = (this.hass as unknown as { auth?: { data?: { access_token?: string } } })
        .auth?.data?.access_token;
      const bearer = authData || access;
      if (bearer) headers.Authorization = `Bearer ${bearer}`;
      void token;
      const resp = await fetch(url, {
        method: "POST",
        body: form,
        credentials: "same-origin",
        headers,
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || `Import failed (${resp.status})`);
      }
      const body = await resp.json();
      this._importStatus = `Imported: ${JSON.stringify(body.report || body)}`;
      await this._refreshAll();
    } catch (err) {
      this._importStatus = "";
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

  private _renderCharts() {
    this._destroyCharts();
    if (!this._stats) return;
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
                labels: { color },
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
      this._stats.places_of_birth.labels,
      this._stats.places_of_birth.values,
    );
  }

  private get _filteredPeople(): PersonDto[] {
    return filterAndSortPeople(this._people, {
      search: this._search,
      filterLiving: this._filterLiving,
      filterSex: this._filterSex,
      sort: "surname",
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
          <div class="brand">
            <span class="brand-mark">${icon(MDI_TREE)}</span>
            <span class="brand-text">${this._tt("brand")}</span>
          </div>
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
    `;
  }

  private _renderDashboard() {
    const s = this._stats;
    const upcoming = this._settings?.upcoming_birthdays || [];
    const anniversaries = this._settings?.upcoming_anniversaries || [];
    const shortcuts = this._settings?.family_shortcuts || [];
    return html`
      <section class="stats-row">
        <div class="stat"><span class="stat-n">${s?.total_persons ?? "—"}</span><span>${this._tt("stats_total")}</span></div>
        <div class="stat"><span class="stat-n">${s?.living ?? "—"}</span><span>${this._tt("stats_living")}</span></div>
        <div class="stat"><span class="stat-n">${s?.deceased ?? "—"}</span><span>${this._tt("stats_deceased")}</span></div>
      </section>
      <section class="charts">
        <div class="chart-card"><h3>${this._tt("chart_ages")}</h3><div class="chart-wrap"><canvas id="ft-ages"></canvas></div></div>
        <div class="chart-card"><h3>${this._tt("chart_centuries")}</h3><div class="chart-wrap"><canvas id="ft-centuries"></canvas></div></div>
        <div class="chart-card"><h3>${this._tt("chart_places")}</h3><div class="chart-wrap"><canvas id="ft-places"></canvas></div></div>
      </section>
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
          <h3>${this._tt("upcoming_anniversaries")}</h3>
          <ul class="plain">
            ${anniversaries.length
              ? anniversaries.slice(0, 8).map(
                  (u) => html`<li>
                    ${((u.names as string[]) || []).join(" & ")}
                    <span class="muted">${daysUntilLabel(Number(u.days_until), this._tt("days"))}</span>
                  </li>`,
                )
              : html`<li class="muted">—</li>`}
          </ul>
        </div>
      </section>
    `;
  }

  private _renderPeopleList() {
    const people = this._filteredPeople;
    const families = sortedOptionList(
      this._settings?.family_shortcuts || [],
      this._familyShortcut,
    );
    const places = placeOptionsFromPeople(this._people);
    const showFilters = this._view !== "trash";
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
        <select
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
        ${showFilters
          ? html`<button
              type="button"
              class="filters-btn ${this._filtersOpen || this._activeFilterCount
                ? "active"
                : ""}"
              @click=${() => {
                this._filtersOpen = !this._filtersOpen;
                this._persistViewState();
              }}
            >
              ${this._tt("filters")}${this._activeFilterCount
                ? html` (${this._activeFilterCount})`
                : nothing}
            </button>`
          : nothing}
        ${this._canWrite() && this._view !== "trash"
          ? html`<button class="primary" @click=${this._openCreate}>${icon(MDI_PLUS)} ${this._tt("add_person")}</button>`
          : nothing}
      </div>
      ${showFilters && this._filtersOpen
        ? html`<div class="filters">
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
      <p class="muted">${people.length} / ${this._total}</p>
      ${people.length === 0
        ? html`<p>${this._tt("no_people")}</p>`
        : html`<ul class="people">
            ${people.map(
              (p) => html`<li>
                <button class="person-row" @click=${() =>
                  this._view === "trash" ? nothing : this._openPerson(p.id)}>
                  ${icon(MDI_ACCOUNT)}
                  <span>
                    <strong>${personDisplayName(p)}</strong>
                    <span class="muted">${p.sex}${p.is_living ? "" : " · †"}</span>
                  </span>
                </button>
                ${this._view === "trash" && this._canWrite()
                  ? html`<span class="row-actions">
                      <button @click=${() => this._restore(p.id)}>${this._tt("restore")}</button>
                      <button class="danger" @click=${() => this._purge(p.id)}>${this._tt("purge")}</button>
                    </span>`
                  : nothing}
              </li>`,
            )}
          </ul>`}
    `;
  }

  private _renderPerson() {
    const d = this._detail!;
    const p = d.person;
    const tree = d.tree;
    return html`
      <div class="person-head">
        <button class="linkish" @click=${() => this._setView("people")}>← ${this._tt("nav_people")}</button>
        <h2>${personDisplayName(p)}</h2>
        <div class="row-actions">
          ${this._canWrite()
            ? html`
                <button @click=${() => this._openEdit(p)}>${this._tt("details")}</button>
                <button class="danger" @click=${() => this._deleteCurrent()}>${this._tt("delete")}</button>
              `
            : nothing}
        </div>
      </div>
      <div class="subtabs">
        ${(["details", "relationships", "tree", "sources"] as PersonTab[]).map(
          (tab) => html`<button class=${this._personTab === tab ? "active" : ""}
            @click=${() => (this._personTab = tab)}>${this._tt(tab)}</button>`,
        )}
      </div>
      ${this._personTab === "details"
        ? html`<dl class="kv">
            <dt>${this._tt("given_names")}</dt><dd>${p.given_names || "—"}</dd>
            <dt>${this._tt("call_name")}</dt><dd>${p.call_name || "—"}</dd>
            <dt>${this._tt("surname_prefix")}</dt><dd>${p.surname_prefix || "—"}</dd>
            <dt>${this._tt("surname")}</dt><dd>${p.surname || "—"}</dd>
            <dt>${this._tt("sex")}</dt><dd>${p.sex}</dd>
            <dt>${this._tt("living")}</dt><dd>${p.is_living ? "✓" : "†"}</dd>
            <dt>${this._tt("notes")}</dt><dd>${p.notes || "—"}</dd>
          </dl>
          <h3>${this._tt("events")}</h3>
          <ul class="plain">
            ${d.events.map(
              (ev: EventDto) => html`<li>
                <strong>${ev.type}</strong> ${formatGedcomDate(ev.date_text)}
                ${ev.description ? html` — ${ev.description}` : nothing}
                ${this._canWrite()
                  ? html`<button class="linkish danger" @click=${() => this._deleteEvent(ev.id)}>${this._tt("delete")}</button>`
                  : nothing}
              </li>`,
            )}
          </ul>
          ${this._canWrite()
            ? html`<div class="inline-form">
                <select .value=${this._eventForm.event_type || "birth"}
                  @change=${(e: Event) => (this._eventForm = { ...this._eventForm, event_type: (e.target as HTMLSelectElement).value })}>
                  <option value="birth">birth</option>
                  <option value="death">death</option>
                  <option value="baptism">baptism</option>
                  <option value="burial">burial</option>
                  <option value="occupation">occupation</option>
                  <option value="residence">residence</option>
                </select>
                <input placeholder=${this._tt("date")} .value=${this._eventForm.date_text || ""}
                  @input=${(e: Event) => (this._eventForm = { ...this._eventForm, date_text: (e.target as HTMLInputElement).value })} />
                <button class="primary" @click=${() => this._saveEvent()}>${this._tt("add_event")}</button>
              </div>`
            : nothing}`
        : this._personTab === "relationships"
          ? html`
              <h3>${this._tt("parents")}</h3>
              <ul class="plain">${flattenParents(tree?.parents).map((n) => html`<li><button class="linkish" @click=${() => this._openPerson(n.id)}>${n.name}</button></li>`)}</ul>
              <h3>${this._tt("partners")}</h3>
              <ul class="plain">${partnerNames(tree?.partners).map((n) => html`<li>${n}</li>`)}</ul>
              <h3>${this._tt("siblings")}</h3>
              <ul class="plain">${(tree?.siblings || []).map((s) => html`<li><button class="linkish" @click=${() => this._openPerson(String(s.id))}>${nodeName(s)}</button></li>`)}</ul>
              <h3>${this._tt("children")}</h3>
              <ul class="plain">${flattenChildren(tree?.children).map((n) => html`<li><button class="linkish" @click=${() => this._openPerson(n.id)}>${n.name}</button></li>`)}</ul>
            `
          : this._personTab === "tree"
            ? html`<div class="tree-box">
                <div class="gen">
                  <span class="muted">${this._tt("parents")}</span>
                  ${flattenParents(tree?.parents).map((n) => html`<div class="node" @click=${() => this._openPerson(n.id)}>${n.name}</div>`)}
                </div>
                <div class="gen focus"><div class="node self">${personDisplayName(p)}</div></div>
                <div class="gen">
                  <span class="muted">${this._tt("children")}</span>
                  ${flattenChildren(tree?.children).map((n) => html`<div class="node" @click=${() => this._openPerson(n.id)}>${n.name}</div>`)}
                </div>
              </div>`
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

  private _renderSettings() {
    const countries = (this._gazetteer?.countries as Array<Record<string, unknown>>) || [];
    return html`
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
                  if (file) void this._importGedcom(file);
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
  };

  private _renderDialog() {
    const write = this._canWrite();
    const dialogTitle = this._editing
      ? personDisplayName(this._editing)
      : this._tt("add_person");
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
            <h2>${dialogTitle}</h2>
            <button
              type="button"
              class="icon-btn dialog-close"
              aria-label=${this._tt("cancel")}
              @click=${this._closeDialog}
            >
              ${icon(MDI_CLOSE)}
            </button>
          </div>

          <div class="form-section">
            <div class="form-section-title">${this._tt("details")}</div>
            <label
              >${this._tt("given_names")}
              <input
                .value=${this._form.given_names || ""}
                ?disabled=${!write}
                @input=${(e: Event) =>
                  (this._form = {
                    ...this._form,
                    given_names: (e.target as HTMLInputElement).value,
                  })}
              />
            </label>
            <label
              >${this._tt("call_name")}
              <input
                .value=${this._form.call_name || ""}
                ?disabled=${!write}
                @input=${(e: Event) =>
                  (this._form = {
                    ...this._form,
                    call_name: (e.target as HTMLInputElement).value,
                  })}
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
                >${this._tt("living")}
                <span class="check-control">
                  <input
                    type="checkbox"
                    .checked=${this._form.is_living === "true"}
                    ?disabled=${!write}
                    @change=${(e: Event) =>
                      (this._form = {
                        ...this._form,
                        is_living: (e.target as HTMLInputElement).checked
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

          ${this._error
            ? html`<div class="error" role="alert">${this._error}</div>`
            : nothing}

          <div class="dialog-actions">
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
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
      background: var(--primary-background-color);
      font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
      --ft-max: 1100px;
    }
    .shell {
      max-width: var(--ft-max);
      margin: 0 auto;
      padding: 12px 16px 48px;
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
      gap: 8px;
      font-size: 1.35rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .brand-mark .mdi { width: 28px; height: 28px; fill: var(--primary-color); }
    .tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-left: auto; }
    .tabs button, .subtabs button, .toolbar button, .inline-form button, .row-actions button, .chip {
      appearance: none;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 6px 10px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tabs button.active, .subtabs button.active, .chip.on, button.primary {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: transparent;
    }
    button.danger { color: var(--error-color); }
    .icon-btn {
      appearance: none; border: none; background: transparent; color: inherit;
      padding: 4px; cursor: pointer;
    }
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
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat {
      text-align: center;
      padding: 16px 8px;
      background: var(--secondary-background-color);
      border-radius: var(--ha-border-radius-lg, 12px);
    }
    .stat-n { display: block; font-size: 1.8rem; font-weight: 600; }
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .chart-card h3 { margin: 0 0 8px; font-size: 0.95rem; }
    .chart-wrap { height: 200px; position: relative; }
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .block { margin-bottom: 20px; }
    .block h3 { margin: 0 0 8px; }
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
    .dialog input, .dialog select, .dialog textarea {
      font: inherit; padding: 8px 10px;
      border-radius: var(--ha-border-radius-lg, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--primary-background-color));
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
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
    .filters-btn.active {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    .date-filter {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .subtabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
    .kv { display: grid; grid-template-columns: 140px 1fr; gap: 6px 12px; margin: 0 0 16px; }
    .kv dt { color: var(--secondary-text-color); }
    .kv dd { margin: 0; }
    .person-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; margin-bottom: 8px; }
    .person-head h2 { margin: 0; flex: 1; }
    .tree-box { display: flex; flex-direction: column; gap: 16px; align-items: center; }
    .gen { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
    .node {
      padding: 10px 14px; border-radius: var(--ha-border-radius-lg, 12px);
      background: var(--secondary-background-color);
      cursor: pointer; min-width: 100px; text-align: center;
    }
    .node.self { background: var(--primary-color); color: var(--text-primary-color, #fff); font-weight: 600; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .inline-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .check { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
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
      letter-spacing: 0.06em;
      text-transform: uppercase;
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
      background: transparent;
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
    }
    .dialog-close {
      flex-shrink: 0;
      margin: -8px -8px -8px 0;
    }
    .dialog.dialog-narrow {
      width: 100%;
      max-height: 100%;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }
    .dialog-backdrop:has(.dialog-narrow) {
      align-items: stretch;
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
    @media (max-width: 600px) {
      .stats-row { grid-template-columns: 1fr; }
      .kv { grid-template-columns: 1fr; }
      .row2 { grid-template-columns: 1fr; }
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
