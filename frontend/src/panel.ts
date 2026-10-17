/** Family Tree sidebar management panel. */

import Chart from "chart.js/auto";
import { LitElement, html, nothing } from "lit";
import { panelStyles } from "./panel_styles";
import { renderImportDialogBody, renderDialog } from "./panel_dialogs";
import { renderPerson, renderPersonDetailsTab, renderRelationshipsTab, renderTreeTab, renderSourcesTab, renderPhotosSection } from "./panel_person_view";
import { renderSettings, renderUserLinkForm, renderLinkedUsersSettingsBody } from "./panel_settings";
import {
  MDI_ACCOUNT,
  MDI_ACCOUNT_HEART,
  MDI_BOOKMARK_OUTLINE,
  MDI_CHEVRON_DOWN,
  MDI_CHEVRON_RIGHT,
  MDI_CLOSE,
  MDI_COG,
  MDI_DELETE,
  MDI_DOTS_VERTICAL,
  MDI_GENDER_FEMALE,
  MDI_GENDER_MALE,
  MDI_MENU,
  MDI_MENU_DOWN,
  MDI_MENU_UP,
  MDI_PLUS,
  brandLogo,
  icon,
  mdButton,
  tooltip,
} from "./panel_chrome";
import {
  EVENT_TYPE_KEYS,
  PERSON_DIALOG_BIRTH,
  PERSON_DIALOG_DECEASED,
  PERSON_DIALOG_PERSONAL,
  PERSON_EVENT_TYPES,
  QUALIFIER_KEYS,
  UNIQUE_PERSON_EVENT_TYPES,
} from "./panel_shared";
import { property, state } from "lit/decorators.js";
import {
  type GazetteerHit,
  type EventDto,
  type MyLineageDto,
  type PersonDetail,
  type PersonDto,
  type PersonMediaDto,
  type PlaceDto,
  type StatsDto,
  type TreeUnion,
  addParentChild,
  claimUserLink,
  deleteCitation,
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
  getFamilies,
  getStats,
  type FamilySummaryDto,
  listPersonMedia,
  deletePersonMedia,
  listHaUsers,
  type HaUserDto,
  listPersons,
  listUserLinks,
  personMediaUploadUrl,
  purgePerson,
  restorePerson,
  listPlaces,
  saveCitation,
  saveEvent,
  saveFamilyShortcuts,
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
  formatAge,
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
import { isHttpUrl } from "./url";
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
import { renderPersonAvatar } from "./person-avatar";
import { hassAuthHeaders } from "./auth";
import "./authenticated-media-img";
import { apiUrl, personMediaApiPath } from "./media";
import {
  PROFILE_CROP_CANVAS_PX,
  defaultCropTransform,
  drawProfileCropPreview,
  loadImageFromBlob,
  encodeImageForUpload,
  renderCroppedJpeg,
  type CropTransform,
} from "./profile-photo-editor";
import type { HomeAssistant } from "./types";

const PANEL_TAG = "family-tree-panel";

type PersonTab = "details" | "relationships" | "tree" | "sources";
type DialogMode =
  | "person"
  | "event"
  | "import"
  | "siblings"
  | "preview"
  | "union"
  | "pickPerson"
  | "parents"
  | "profilePhoto"
  | "citation"
  | "userLink";
type RelationTarget =
  | { kind: "parent"; personId: string }
  | { kind: "partner"; personId: string }
  | { kind: "child"; personId: string; unionId?: string; coParentId?: string };

const MOBILE_QUERY = "(max-width: 720px)";

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
  @state() private _filterUserLinked = "";
  @state() private _filtersOpen = false;
  @state() private _reopenParentsAfterSave = false;
  @state() private _editingCitationId: string | null = null;
  @state() private _citationForm: Record<string, string> = {};
  @state() private _parentsPickRole: "father" | "mother" | null = null;
  @state() private _people: PersonDto[] = [];
  @state() private _total = 0;
  @state() private _stats: StatsDto | null = null;
  @state() private _familySummaries: FamilySummaryDto[] = [];
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
  @state() private _haUsers: HaUserDto[] = [];
  @state() private _haUsersLoadError = "";
  @state() private _linkUserQuery = "";
  @state() private _linkSelectedUserId = "";
  @state() private _linkPersonQuery = "";
  @state() private _linkPersonId = "";
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
  @state() private _placeSuggestions: PlaceDto[] = [];
  @state() private _placeSuggestOpen = false;
  @state() private _personPlaceField: "birth_place" | "death_place" | null = null;
  @state() private _siblingsPersonId = "";
  @state() private _siblingsPersonName = "";
  @state() private _siblingsList: Array<Record<string, unknown>> = [];
  @state() private _siblingsLoading = false;
  @state() private _previewDetail: PersonDetail | null = null;
  @state() private _previewLoading = false;
  @state() private _shortcutsDraft: string[] = [];
  @state() private _shortcutInput = "";
  @state() private _shortcutsSaving = false;
  @state() private _personMedia: PersonMediaDto[] = [];
  @state() private _photoLightbox: string | null = null;
  @state() private _profileCropTransform: CropTransform = defaultCropTransform();
  @state() private _profileCropHasImage = false;
  @state() private _profileCropSourceMediaId: string | null = null;

  private _profileCropImage: HTMLImageElement | null = null;
  private _profileCropPendingBlob: Blob | null = null;
  private _profileCropPendingName = "photo.jpg";
  private _profileCropDrag: { active: boolean; lastX: number; lastY: number } = {
    active: false,
    lastX: 0,
    lastY: 0,
  };

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
    this._filterUserLinked = saved.filterUserLinked;
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
        filterUserLinked: this._filterUserLinked,
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
      const canWrite = this._canWrite();
      if (this._view === "trash" && !canWrite) {
        this._view = "people";
      }
      const trashed = this._view === "trash" && canWrite;
      const [list, stats, settings, lineage, userLinks, families] = await Promise.all([
        listPersons(this.hass, {
          trashed,
          // Full tree — filters apply client-side (ready-home pattern).
          limit: 5000,
        }),
        getStats(this.hass),
        getSettings(this.hass),
        getMyLineage(this.hass).catch(() => null),
        canWrite
          ? listUserLinks(this.hass).catch(() => ({ links: [] as Array<Record<string, unknown>> }))
          : Promise.resolve({ links: [] as Array<Record<string, unknown>> }),
        getFamilies(this.hass).catch(() => ({ families: [] as FamilySummaryDto[] })),
      ]);
      this._people = list.persons;
      this._total = list.total;
      this._stats = stats;
      this._settings = settings;
      this._familySummaries = families.families;
      this._syncShortcutsDraft();
      this._lineage = lineage;
      this._userLinks = userLinks.links;
      if (this._canWrite()) {
        try {
          this._haUsers = await listHaUsers(this.hass);
          this._haUsersLoadError = "";
        } catch (err) {
          this._haUsers = [];
          this._haUsersLoadError = formatHassError(err);
        }
      }
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
    if (this._filterUserLinked) n += 1;
    return n;
  }

  private _linkedPersonIds(): Set<string> {
    const ids = new Set<string>();
    for (const link of this._userLinks) {
      const pid = String(link.person_id || "");
      if (pid) ids.add(pid);
    }
    return ids;
  }

  private _resetFilters = () => {
    this._filterLiving = "all";
    this._filterSex = "";
    this._familyShortcut = "";
    this._filterPlace = "";
    this._dateFrom = "";
    this._dateTo = "";
    this._filterUserLinked = "";
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
    if (view === "trash" && !this._canWrite()) {
      view = "people";
    }
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
      await this._loadPersonMedia();
      this._persistViewState();
      this._scrollMainToTop();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _loadPersonMedia() {
    if (!this.hass || !this._detail) {
      this._personMedia = [];
      return;
    }
    try {
      const data = await listPersonMedia(this.hass, this._detail.person.id);
      this._personMedia = data.media;
      this._detail = {
        ...this._detail,
        person: {
          ...this._detail.person,
          profile_media_id: data.profile_media_id,
          profile_source_media_id: data.profile_source_media_id ?? null,
          profile_crop: data.profile_crop ?? null,
        },
      };
    } catch {
      this._personMedia = [];
    }
  }

  private _openProfilePhotoEditor(opts?: { sourceMediaId?: string }) {
    if (!this._canWrite()) return;
    this._resetProfileCropState();
    this._profileCropSourceMediaId = opts?.sourceMediaId ?? null;
    this._error = "";
    this._dialogMode = "profilePhoto";
    this._dialogOpen = true;
    void this._bootstrapProfilePhotoEditor();
  }

  private async _bootstrapProfilePhotoEditor() {
    if (!this.hass || !this._detail) return;
    const person = this._detail.person;
    const sourceId =
      this._profileCropSourceMediaId ||
      person.profile_source_media_id ||
      person.profile_media_id ||
      null;
    if (!sourceId) return;
    this._profileCropSourceMediaId = sourceId;
    const path = personMediaApiPath(sourceId, "full");
    if (!path) return;
    try {
      const resp = await fetch(apiUrl(this.hass, path), {
        method: "GET",
        credentials: "same-origin",
        headers: await this._authHeaders(),
      });
      if (!resp.ok) return;
      const blob = await resp.blob();
      this._profileCropImage = await loadImageFromBlob(blob);
      const stored =
        person.profile_source_media_id === sourceId && person.profile_crop
          ? person.profile_crop
          : null;
      this._profileCropTransform = stored
        ? {
            scale: Number(stored.scale) || 1,
            offsetX: Number(stored.offsetX) || 0,
            offsetY: Number(stored.offsetY) || 0,
          }
        : defaultCropTransform();
      this._profileCropHasImage = true;
      await this.updateComplete;
      this._redrawProfileCropCanvas();
    } catch {
      /* user can choose a new image */
    }
  }

  private _resetProfileCropState() {
    this._profileCropImage = null;
    this._profileCropHasImage = false;
    this._profileCropTransform = defaultCropTransform();
    this._profileCropSourceMediaId = null;
    this._profileCropPendingBlob = null;
    this._profileCropPendingName = "photo.jpg";
    this._profileCropDrag = { active: false, lastX: 0, lastY: 0 };
  }

  private _redrawProfileCropCanvas() {
    const canvas = this.renderRoot.querySelector(
      "#profile-crop-canvas",
    ) as HTMLCanvasElement | null;
    if (!canvas || !this._profileCropImage) return;
    drawProfileCropPreview(canvas, this._profileCropImage, this._profileCropTransform);
  }

  private async _onProfilePhotoFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    try {
      // Encode once so editor preview matches the stored original dimensions.
      const blob = await encodeImageForUpload(file);
      const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
      this._profileCropPendingBlob = blob;
      this._profileCropPendingName = `${baseName}.jpg`;
      this._profileCropSourceMediaId = null;
      this._profileCropImage = await loadImageFromBlob(blob);
      this._profileCropTransform = defaultCropTransform();
      this._profileCropHasImage = true;
      await this.updateComplete;
      this._redrawProfileCropCanvas();
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _uploadMediaBlob(
    blob: Blob,
    filename: string,
    query?: Record<string, string>,
  ): Promise<{ id: string }> {
    if (!this.hass || !this._detail) throw new Error("Not ready");
    const form = new FormData();
    form.append("file", blob, filename);
    const url = apiUrl(
      this.hass,
      personMediaUploadUrl(this._detail.person.id, this.hass, query),
    );
    const resp = await fetch(url, {
      method: "POST",
      body: form,
      credentials: "same-origin",
      headers: await this._authHeaders(),
    });
    if (!resp.ok) {
      throw new Error(
        await this._uploadErrorMessage(resp, `Upload failed (${resp.status})`),
      );
    }
    const data = (await resp.json()) as { media?: { id?: string } };
    const id = data.media?.id;
    if (!id) throw new Error("Upload failed");
    return { id };
  }

  private _onProfileCropPointerDown(e: PointerEvent) {
    if (!this._profileCropHasImage) return;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    this._profileCropDrag = { active: true, lastX: e.clientX, lastY: e.clientY };
  }

  private _onProfileCropPointerMove(e: PointerEvent) {
    if (!this._profileCropDrag.active) return;
    const dx = e.clientX - this._profileCropDrag.lastX;
    const dy = e.clientY - this._profileCropDrag.lastY;
    this._profileCropDrag = { active: true, lastX: e.clientX, lastY: e.clientY };
    this._profileCropTransform = {
      ...this._profileCropTransform,
      offsetX: this._profileCropTransform.offsetX + dx,
      offsetY: this._profileCropTransform.offsetY + dy,
    };
    this._redrawProfileCropCanvas();
  }

  private _onProfileCropPointerUp(e: PointerEvent) {
    if (!this._profileCropDrag.active) return;
    this._profileCropDrag = { active: false, lastX: 0, lastY: 0 };
    try {
      (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  private _onProfileCropZoom(e: Event) {
    const v = Number((e.target as HTMLInputElement).value);
    this._profileCropTransform = { ...this._profileCropTransform, scale: v };
    this._redrawProfileCropCanvas();
  }

  private async _saveProfilePhoto() {
    if (!this.hass || !this._detail || !this._profileCropImage || !this._canWrite()) return;
    this._saving = true;
    try {
      let sourceMediaId = this._profileCropSourceMediaId;
      if (this._profileCropPendingBlob) {
        const uploaded = await this._uploadMediaBlob(
          this._profileCropPendingBlob,
          this._profileCropPendingName,
        );
        sourceMediaId = uploaded.id;
      }
      if (!sourceMediaId) {
        throw new Error("Missing source image");
      }
      const cropped = await renderCroppedJpeg(
        this._profileCropImage,
        this._profileCropTransform,
      );
      await this._uploadMediaBlob(cropped, "profile.jpg", {
        set_profile: "1",
        source_media_id: sourceMediaId,
        crop_json: JSON.stringify(this._profileCropTransform),
      });
      await this._loadPersonMedia();
      await this._refreshAll();
      this._error = "";
      this._dialogOpen = false;
      this._resetProfileCropState();
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _uploadPersonPhoto(file: File) {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    const personId = this._detail.person.id;
    try {
      const blob = await encodeImageForUpload(file);
      const form = new FormData();
      const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
      form.append("file", blob, `${baseName}.jpg`);
      const resp = await fetch(apiUrl(this.hass, personMediaUploadUrl(personId, this.hass)), {
        method: "POST",
        body: form,
        credentials: "same-origin",
        headers: await this._authHeaders(),
      });
      if (!resp.ok) {
        throw new Error(
          await this._uploadErrorMessage(resp, `Upload failed (${resp.status})`),
        );
      }
      await this._loadPersonMedia();
      await this._refreshAll();
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _setProfilePhoto(mediaId: string) {
    if (!this._canWrite() || !mediaId) return;
    this._openProfilePhotoEditor({ sourceMediaId: mediaId });
  }

  private async _deletePersonPhoto(mediaId: string) {
    if (!this.hass || !this._canWrite()) return;
    if (!confirm(this._tt("confirm_delete_photo"))) return;
    try {
      await deletePersonMedia(this.hass, mediaId);
      await this._loadPersonMedia();
      await this._refreshAll();
      if (this._photoLightbox === mediaId) this._photoLightbox = null;
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _onPersonPhotoFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) void this._uploadPersonPhoto(file);
    input.value = "";
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

  private _emptyPersonVitalFields(): Record<string, string> {
    return {
      profession: "",
      birth_place: "",
      birth_date_mode: "simple",
      birth_date_iso: "",
      birth_date_qualifier: "exact",
      birth_date_first: "",
      birth_date_second: "",
      death_place: "",
      death_date_mode: "simple",
      death_date_iso: "",
      death_date_qualifier: "exact",
      death_date_first: "",
      death_date_second: "",
      birth_event_id: "",
      death_event_id: "",
      occupation_event_id: "",
    };
  }

  private _personEventsForEdit(personId: string): EventDto[] {
    if (this._detail?.person.id === personId) return this._detail.events;
    if (this._previewDetail?.person.id === personId) return this._previewDetail.events;
    return [];
  }

  private _vitalEventIds(events: EventDto[]): {
    birth?: string;
    death?: string;
    occupation?: string;
  } {
    const birth = events.find((e) => e.type === "birth");
    const death = events.find((e) => e.type === "death");
    const occ = events
      .filter((e) => e.type === "occupation")
      .sort((a, b) => (a.sort_date || "").localeCompare(b.sort_date || ""));
    const occupation = occ.length ? occ[occ.length - 1] : undefined;
    return {
      birth: birth?.id,
      death: death?.id,
      occupation: occupation?.id,
    };
  }

  private _vitalDateFieldsFromText(
    prefix: "birth" | "death",
    dateText: string,
  ): Record<string, string> {
    const form = gedcomToForm(dateText || "");
    const dateIso = gedcomToIsoDate(form.first) || "";
    const simple = form.qualifier === "exact" && dateIso !== "";
    return {
      [`${prefix}_date_mode`]: simple ? "simple" : dateText.trim() ? "advanced" : "simple",
      [`${prefix}_date_iso`]: simple ? dateIso : "",
      [`${prefix}_date_qualifier`]: form.qualifier,
      [`${prefix}_date_first`]: simple ? "" : form.first,
      [`${prefix}_date_second`]: simple ? "" : form.second,
    };
  }

  private _vitalFieldsFromPerson(person: PersonDto, events: EventDto[]): Record<string, string> {
    const ids = this._vitalEventIds(events);
    const birthText = person.birth?.date_text || "";
    const deathText = person.death?.date_text || "";
    return {
      profession: this._professionFromEvents(events),
      birth_place: person.birth?.place_name || "",
      ...this._vitalDateFieldsFromText("birth", birthText),
      death_place: person.death?.place_name || "",
      ...this._vitalDateFieldsFromText("death", deathText),
      birth_event_id: ids.birth || "",
      death_event_id: ids.death || "",
      occupation_event_id: ids.occupation || "",
    };
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
      ...this._emptyPersonVitalFields(),
    };
    this._collapsed = { ...this._collapsed, [PERSON_DIALOG_DECEASED]: true };
    this._dialogOpen = true;
  }

  private _openEdit(person: PersonDto) {
    this._editing = person;
    this._dialogMode = "person";
    this._error = "";
    this._fieldErrors = {};
    const events = this._personEventsForEdit(person.id);
    this._form = {
      given_names: person.given_names || "",
      call_name: person.call_name || "",
      surname_prefix: person.surname_prefix || "",
      surname: person.surname || "",
      sex: person.sex || "unknown",
      deceased: person.is_living ? "false" : "true",
      notes: person.notes || "",
      ...this._vitalFieldsFromPerson(person, events),
    };
    this._collapsed = {
      ...this._collapsed,
      [PERSON_DIALOG_DECEASED]: person.is_living,
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
    const parentSex =
      target.kind === "parent" && this._parentsPickRole
        ? this._parentsPickRole === "mother"
          ? "female"
          : "male"
        : null;
    this._relationTarget = target;
    this._openCreate(false);
    if (parentSex) {
      this._form = { ...this._form, sex: parentSex };
    }
  }

  private _openAddParentFromDialog(role: "father" | "mother") {
    if (!this._detail) return;
    this._parentsPickRole = role;
    this._reopenParentsAfterSave = true;
    this._dialogOpen = false;
    this._openAddRelation({ kind: "parent", personId: this._detail.person.id });
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

  private _lineageIconSpan() {
    return html`<span class="lineage-marker">${icon(MDI_ACCOUNT_HEART)}</span>`;
  }

  private _lineageSentence(personId: string, personName?: string): string {
    if (personId === this._myLinkedPersonId()) {
      return this._tt("lineage_me");
    }
    return this._lineageTooltip(personId, personName);
  }

  private _lineageBadge(personId: string, _personName?: string) {
    if (personId === this._myLinkedPersonId()) {
      return this._lineageIconSpan();
    }
    const rel = this._lineageRel(personId);
    if (!rel) return nothing;
    return this._lineageIconSpan();
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

  private _schedulePlaceSearch(
    value: string,
    personField?: "birth_place" | "death_place",
  ) {
    if (personField) this._personPlaceField = personField;
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

  private _vitalDateTextFromForm(
    prefix: "birth" | "death",
  ): { text: string; error: boolean } {
    const mode = this._form[`${prefix}_date_mode`] || "simple";
    if (mode === "simple") {
      const isoTrim = (this._form[`${prefix}_date_iso`] || "").trim();
      if (!isoTrim) return { text: "", error: false };
      const gedcom = isoToGedcomDate(isoTrim);
      return gedcom ? { text: gedcom, error: false } : { text: "", error: true };
    }
    const qualifier = (this._form[`${prefix}_date_qualifier`] ||
      "exact") as DateQualifier;
    const built = buildGedcomDate(
      qualifier,
      this._form[`${prefix}_date_first`] || "",
      this._form[`${prefix}_date_second`] || "",
    );
    if (built.error) return { text: "", error: true };
    return { text: built.value, error: false };
  }

  private _togglePersonVitalDateMode(prefix: "birth" | "death") {
    const mode = this._form[`${prefix}_date_mode`] || "simple";
    if (mode === "simple") {
      const dateFirst = this._form[`${prefix}_date_iso`]
        ? isoToGedcomDate(this._form[`${prefix}_date_iso`])
        : this._form[`${prefix}_date_first`] || "";
      this._form = {
        ...this._form,
        [`${prefix}_date_mode`]: "advanced",
        [`${prefix}_date_qualifier`]: "exact",
        [`${prefix}_date_first`]: dateFirst,
        [`${prefix}_date_iso`]: "",
      };
      return;
    }
    const dateIso = gedcomToIsoDate(this._form[`${prefix}_date_first`] || "") || "";
    this._form = {
      ...this._form,
      [`${prefix}_date_mode`]: "simple",
      [`${prefix}_date_iso`]: dateIso,
      [`${prefix}_date_qualifier`]: "exact",
      [`${prefix}_date_first`]: "",
      [`${prefix}_date_second`]: "",
    };
  }

  private _renderPersonVitalDateField(
    prefix: "birth" | "death",
    label: string,
    write: boolean,
  ) {
    const advanced = (this._form[`${prefix}_date_mode`] || "simple") === "advanced";
    const needsSecond =
      advanced &&
      (this._form[`${prefix}_date_qualifier`] === "between" ||
        this._form[`${prefix}_date_qualifier`] === "from_to");
    return html`<div class="event-date-field">
      ${advanced
        ? html`<label
            >${this._tt("date_qualifier")}
            <select
              ?disabled=${!write}
              @change=${(e: Event) =>
                (this._form = {
                  ...this._form,
                  [`${prefix}_date_qualifier`]: (e.target as HTMLSelectElement).value,
                })}
            >
              ${FORM_QUALIFIERS.map((q) => {
                const current = this._form[`${prefix}_date_qualifier`] || "exact";
                return html`<option value=${q} ?selected=${q === current}
                  >${this._tt(QUALIFIER_KEYS[q])}</option
                >`;
              })}
            </select>
          </label>
          <label
            >${label}
            <input
              .value=${this._form[`${prefix}_date_first`] || ""}
              placeholder=${this._tt("date_gedcom_hint")}
              ?disabled=${!write}
              @input=${(e: Event) =>
                (this._form = {
                  ...this._form,
                  [`${prefix}_date_first`]: (e.target as HTMLInputElement).value,
                })}
            />
          </label>
          ${needsSecond
            ? html`<label
                >${this._tt("date_second")}
                <input
                  .value=${this._form[`${prefix}_date_second`] || ""}
                  placeholder=${this._tt("date_gedcom_hint")}
                  ?disabled=${!write}
                  @input=${(e: Event) =>
                    (this._form = {
                      ...this._form,
                      [`${prefix}_date_second`]: (e.target as HTMLInputElement).value,
                    })}
                />
              </label>`
            : nothing}
          ${write
            ? html`<button
                type="button"
                class="linkish date-mode-toggle"
                @click=${() => this._togglePersonVitalDateMode(prefix)}
              >
                ${this._tt("date_simple")}
              </button>`
            : nothing}`
        : html`<div class="date-input-row">
            <div class="date-label-grow">
              <span class="field-label">${label}</span>
              <input
                type="date"
                .value=${this._form[`${prefix}_date_iso`] || ""}
                ?disabled=${!write}
                @input=${(e: Event) =>
                  (this._form = {
                    ...this._form,
                    [`${prefix}_date_iso`]: (e.target as HTMLInputElement).value,
                  })}
              />
            </div>
            ${write
              ? html`<button
                  type="button"
                  class="linkish date-mode-toggle"
                  @click=${() => this._togglePersonVitalDateMode(prefix)}
                >
                  ${this._tt("date_advanced")}
                </button>`
              : nothing}
          </div>`}
    </div>`;
  }

  private async _resolvePlaceId(placeName: string): Promise<string | null> {
    if (!this.hass) return null;
    const name = placeName.trim();
    if (!name) return null;
    const found = await listPlaces(this.hass, { search: name, limit: 20 });
    const exact = found.places.find(
      (p) => p.name.localeCompare(name, undefined, { sensitivity: "accent" }) === 0,
    );
    if (exact) return exact.id;
    const { place } = await savePlace(this.hass, { name });
    return place.id;
  }

  private async _resolvePersonEventIds(
    personId: string,
  ): Promise<{ birth?: string; death?: string; occupation?: string }> {
    const fromForm = {
      birth: (this._form.birth_event_id || "").trim() || undefined,
      death: (this._form.death_event_id || "").trim() || undefined,
      occupation: (this._form.occupation_event_id || "").trim() || undefined,
    };
    const needFetch =
      (!fromForm.birth &&
        Boolean(
          (this._form.birth_place || "").trim() ||
            (this._form.birth_date_iso || "").trim() ||
            (this._form.birth_date_first || "").trim(),
        )) ||
      (this._form.deceased === "true" &&
        !fromForm.death &&
        Boolean(
          (this._form.death_place || "").trim() ||
            (this._form.death_date_iso || "").trim() ||
            (this._form.death_date_first || "").trim(),
        )) ||
      (!fromForm.occupation && Boolean((this._form.profession || "").trim()));
    if (!needFetch || !this.hass) return fromForm;
    const detail = await getPerson(this.hass, personId);
    const ids = this._vitalEventIds(detail.events);
    return {
      birth: fromForm.birth || ids.birth,
      death: fromForm.death || ids.death,
      occupation: fromForm.occupation || ids.occupation,
    };
  }

  private async _savePersonVitalEvent(
    personId: string,
    eventType: "birth" | "death",
    opts: {
      place: string;
      eventId?: string;
    },
  ): Promise<boolean> {
    if (!this.hass) return false;
    const placeName = (opts.place || "").trim();
    const built = this._vitalDateTextFromForm(eventType);
    if (built.error) {
      this._error = this._tt("date_invalid");
      return false;
    }
    if (!built.text && !placeName) return true;
    const placeId = placeName ? await this._resolvePlaceId(placeName) : null;
    await saveEvent(this.hass, {
      ...(opts.eventId ? { event_id: opts.eventId } : {}),
      subject_type: "person",
      subject_id: personId,
      event_type: eventType,
      date_text: built.text,
      place: placeName || undefined,
      place_id: placeId,
      description: "",
    });
    return true;
  }

  private async _savePersonVitals(personId: string): Promise<boolean> {
    const ids = await this._resolvePersonEventIds(personId);
    const birthOk = await this._savePersonVitalEvent(personId, "birth", {
      place: this._form.birth_place || "",
      eventId: ids.birth,
    });
    if (!birthOk) return false;
    if (this._form.deceased === "true") {
      const deathOk = await this._savePersonVitalEvent(personId, "death", {
        place: this._form.death_place || "",
        eventId: ids.death,
      });
      if (!deathOk) return false;
    }
    const profession = (this._form.profession || "").trim();
    if (profession && this.hass) {
      await saveEvent(this.hass, {
        ...(ids.occupation ? { event_id: ids.occupation } : {}),
        subject_type: "person",
        subject_id: personId,
        event_type: "occupation",
        date_text: "",
        description: profession,
      });
    }
    return true;
  }

  private _renderPersonPlaceField(
    field: "birth_place" | "death_place",
    label: string,
    write: boolean,
  ) {
    const suggestOpen =
      this._placeSuggestOpen &&
      this._personPlaceField === field &&
      this._placeSuggestions.length > 0;
    return html`<label class="place-field"
      >${label}
      <input
        .value=${this._form[field] || ""}
        ?disabled=${!write}
        @input=${(e: Event) => {
          const value = (e.target as HTMLInputElement).value;
          this._form = { ...this._form, [field]: value };
          this._schedulePlaceSearch(value, field);
        }}
        @focus=${() => {
          this._personPlaceField = field;
          if (this._placeSuggestions.length) this._placeSuggestOpen = true;
        }}
        @blur=${() => {
          setTimeout(() => {
            if (this._personPlaceField === field) {
              this._placeSuggestOpen = false;
            }
          }, 150);
        }}
      />
      ${suggestOpen
        ? html`<ul class="place-suggest">
            ${this._placeSuggestions.map(
              (pl) => html`<li>
                <button
                  type="button"
                  @mousedown=${() => {
                    this._form = { ...this._form, [field]: pl.name };
                    this._placeSuggestOpen = false;
                  }}
                >
                  ${pl.name}
                </button>
              </li>`,
            )}
          </ul>`
        : nothing}
    </label>`;
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

  private _personLink(
    ref: { id: string; name: string } | null | undefined,
    opts?: { preview?: boolean },
  ) {
    if (!ref) return html`<span class="muted">—</span>`;
    const preview = opts?.preview === true;
    return html`<button
      type="button"
      class="linkish"
      @click=${() => (preview ? void this._openPersonPreview(ref.id) : void this._openPerson(ref.id))}
    >
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

  private _peopleSearchMatches(
    query: string,
    opts: { limit?: number; excludeId?: string } = {},
  ): PersonDto[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const limit = opts.limit ?? 12;
    return this._people
      .filter((p) => !p.deleted_at)
      .filter((p) => !opts.excludeId || p.id !== opts.excludeId)
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
      .slice(0, limit);
  }

  private _mePersonMatches(): PersonDto[] {
    return this._peopleSearchMatches(this._meQuery);
  }

  private _linkedHaUserIds(): Set<string> {
    return new Set(
      this._userLinks.map((l) => String(l.ha_user_id || "")).filter(Boolean),
    );
  }

  private _haUserMatches(): HaUserDto[] {
    const q = this._linkUserQuery.trim().toLowerCase();
    if (!q) return [];
    const linked = this._linkedHaUserIds();
    return this._haUsers
      .filter((u) => !linked.has(u.id))
      .filter((u) => {
        const hay = [u.name, u.id].join(" ").toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 12);
  }

  private _knownSurnames(): string[] {
    const seen = new Set<string>();
    for (const p of this._people) {
      const s = (p.surname || "").trim();
      if (s) seen.add(s);
    }
    return [...seen].sort((a, b) => a.localeCompare(b));
  }

  private _haUserDisplayName(userId: string): string {
    const u = this._haUsers.find((x) => x.id === userId);
    if (u?.name?.trim()) return u.name.trim();
    // Current session user is known even before ha_users/list loads.
    if (this.hass?.user?.id === userId) {
      const selfName = (this.hass.user.name || "").trim();
      if (selfName) return selfName;
    }
    return "";
  }

  private _renderPersonSearchHits(
    matches: PersonDto[],
    query: string,
    onSelect: (personId: string) => void,
  ) {
    if (!matches.length) {
      return query.trim()
        ? html`<p class="muted">${this._tt("no_people")}</p>`
        : nothing;
    }
    const lang = this.hass?.language;
    return html`<ul class="plain me-hits">
      ${matches.map(
        (p) => html`<li>
          <button type="button" class="linkish" @click=${() => onSelect(p.id)}>
            <strong>${personDisplayName(p)}</strong>
            <span class="muted">
              ${formatLifespan(p.birth, p.death, p.is_living, lang)}
              ${[p.father?.name, p.mother?.name].filter(Boolean).join(" · ")}
            </span>
          </button>
        </li>`,
      )}
    </ul>`;
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
      const vitalsOk = await this._savePersonVitals(person.id);
      if (!vitalsOk) {
        this._error = this._tt("date_invalid");
        return;
      }
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
      if (this._reopenParentsAfterSave && target?.kind === "parent") {
        this._reopenParentsAfterSave = false;
        this._parentsPickRole = null;
        this._openParentsDialog();
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
      const placeName = (this._eventForm.place || "").trim();
      const placeId = placeName ? await this._resolvePlaceId(placeName) : null;
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
    return hassAuthHeaders(this.hass);
  }

  private async _uploadErrorMessage(resp: Response, fallback: string): Promise<string> {
    try {
      const body = (await resp.json()) as { message?: string };
      if (body.message) return body.message;
    } catch {
      /* not JSON */
    }
    return fallback;
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

  private _pickGedcomFile(inputId = "ft-gedcom-file") {
    const input = this.renderRoot.querySelector(
      `#${inputId}`,
    ) as HTMLInputElement | null;
    input?.click();
  }

  private _onGedcomFilePicked(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    (e.target as HTMLInputElement).value = "";
    if (file) void this._previewGedcom(file);
  }

  private _onGedcomFileChange(e: Event) {
    this._onGedcomFilePicked(e);
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

  private _syncShortcutsDraft() {
    this._shortcutsDraft = [...(this._settings?.family_shortcuts || [])];
  }

  private async _loadSettingsExtras() {
    if (!this.hass) return;
    try {
      this._settings = await getSettings(this.hass);
      this._syncShortcutsDraft();
      this._gazetteer = await gazetteerStatus(this.hass);
      this._lineage = await getMyLineage(this.hass).catch(() => this._lineage);
      if (this._canWrite()) {
        this._userLinks = (await listUserLinks(this.hass)).links;
        try {
          this._haUsers = await listHaUsers(this.hass);
          this._haUsersLoadError = "";
        } catch (err) {
          this._haUsers = [];
          this._haUsersLoadError = formatHassError(err);
        }
      } else {
        this._userLinks = [];
        this._haUsers = [];
        this._haUsersLoadError = "";
      }
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _resetUserLinkForm() {
    this._linkUserQuery = "";
    this._linkPersonQuery = "";
    this._linkSelectedUserId = "";
    this._linkPersonId = "";
  }

  private _openUserLinkDialog() {
    this._resetUserLinkForm();
    this._error = "";
    this._dialogMode = "userLink";
    this._dialogOpen = true;
  }

  private async _saveUserLinkFromForm() {
    if (!this.hass || !this._canWrite()) return;
    if (!this._linkSelectedUserId || !this._linkPersonId) return;
    try {
      await setUserLink(this.hass, this._linkSelectedUserId, this._linkPersonId);
      this._resetUserLinkForm();
      await this._loadSettingsExtras();
      this._dialogOpen = false;
      this._error = "";
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private async _addShortcutFromInput() {
    const text = this._shortcutInput.trim();
    if (!text) return;
    if (this._shortcutsDraft.some((s) => s.toLowerCase() === text.toLowerCase())) {
      this._shortcutInput = "";
      return;
    }
    this._shortcutsDraft = [...this._shortcutsDraft, text];
    this._shortcutInput = "";
    await this._saveShortcutsDraft();
  }

  private async _removeShortcut(index: number) {
    this._shortcutsDraft = this._shortcutsDraft.filter((_, i) => i !== index);
    await this._saveShortcutsDraft();
  }

  private async _saveShortcutsDraft() {
    if (!this.hass || !this._canWrite()) return;
    this._shortcutsSaving = true;
    this._error = "";
    try {
      const { family_shortcuts } = await saveFamilyShortcuts(this.hass, this._shortcutsDraft);
      this._shortcutsDraft = [...family_shortcuts];
      if (this._settings) {
        this._settings = { ...this._settings, family_shortcuts };
      }
      await this._refreshAll();
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._shortcutsSaving = false;
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
    return filterAndSortPeople(
      this._people,
      {
        search: this._search,
        filterLiving: this._filterLiving,
        filterSex: this._filterSex,
        filterUserLinked: this._filterUserLinked,
        sort: this._sort,
        sortDir: this._sortDir,
        familyShortcut: this._familyShortcut,
        filterPlace: this._filterPlace,
        dateFrom: this._dateFrom,
        dateTo: this._dateTo,
      },
      this._linkedPersonIds(),
    );
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
            ${this._canWrite()
              ? html`<button class=${this._view === "trash" ? "active" : ""} @click=${() => this._setView("trash")}>
                  ${icon(MDI_DELETE)} ${this._tt("nav_trash")}
                </button>`
              : nothing}
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
            ? this._renderLoading()
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

  private _renderLoading() {
    const skeleton =
      this._view === "settings"
        ? this._renderSettingsSkeleton()
        : this._view === "dashboard"
          ? this._renderDashboardSkeleton()
          : this._renderPeopleSkeleton();
    return html`
      <div class="loading-panel" role="status" aria-busy="true">
        <span class="sr-only">${this._tt("loading")}</span>
        <div class="loading-bar" aria-hidden="true">
          <div class="loading-bar-fill"></div>
        </div>
        <div class="loading-skel" aria-hidden="true">${skeleton}</div>
      </div>
    `;
  }

  private _renderDashboardSkeleton() {
    return html`
      <section class="stats-row">
        ${[0, 1, 2].map(
          () => html`<div class="stat skel-stat">
            <div class="skel skel-line skel-line--lg"></div>
            <div class="skel skel-line skel-line--sm"></div>
          </div>`,
        )}
      </section>
      <section class="charts">
        ${[0, 1].map(
          () => html`<div class="chart-card">
            <div class="skel skel-line skel-line--md"></div>
            <div class="skel skel-chart"></div>
          </div>`,
        )}
      </section>
    `;
  }

  private _renderPeopleSkeleton() {
    return html`
      <div class="toolbar">
        <div class="skel skel-toolbar-search"></div>
        <div class="skel skel-toolbar-btn"></div>
      </div>
      <div class="skel-people">
        ${[0, 1, 2, 3, 4, 5, 6].map(
          () => html`<div class="skel-person-row">
            <div class="skel skel-avatar"></div>
            <div class="skel-person-text">
              <div class="skel skel-line skel-line--md"></div>
              <div class="skel skel-line skel-line--sm"></div>
            </div>
          </div>`,
        )}
      </div>
    `;
  }

  private _renderSettingsSkeleton() {
    return html`
      <div class="skel-settings">
        ${[0, 1, 2].map(
          () => html`<div class="dashboard-panel skel-settings-card">
            <div class="skel skel-line skel-line--md"></div>
            <div class="skel skel-line skel-line--full"></div>
            <div class="skel skel-line skel-line--full"></div>
            <div class="skel skel-line skel-line--sm"></div>
          </div>`,
        )}
      </div>
    `;
  }

  private _familyPresenceSpan(f: FamilySummaryDto): string {
    const from = f.year_from;
    if (from == null || Number.isNaN(Number(from))) return "";
    const end = f.has_living
      ? this._tt("family_span_now")
      : f.year_to != null && !Number.isNaN(Number(f.year_to))
        ? String(f.year_to)
        : "";
    if (!end) return String(from);
    return `${from} – ${end}`;
  }

  private _renderDashboard() {
    const s = this._stats;
    const upcoming = this._settings?.upcoming_birthdays || [];
    const onThisDay = this._settings?.on_this_day || [];
    const familyCards =
      this._familySummaries.length > 0
        ? this._familySummaries
        : (this._settings?.family_shortcuts || []).map(
            (shortcut) => ({ shortcut, total: 0 }) as FamilySummaryDto,
          );
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
      ${familyCards.length
        ? html`<section class="block">
            <h3>${this._tt("families")}</h3>
            <div class="family-stats-row">
              ${familyCards.map((f) => {
                const span = this._familyPresenceSpan(f);
                const sc = f.shortcut;
                return html`<button
                  type="button"
                  class="family-stat"
                  @click=${() => {
                    this._familyShortcut = sc;
                    this._persistViewState();
                    this._setView("people");
                  }}
                >
                  <span class="family-stat-name">${sc}</span>
                  <span class="family-stat-n">${f.total}</span>
                  <span class="family-stat-span muted"
                    >${span || "—"}</span
                  >
                </button>`;
              })}
            </div>
          </section>`
        : nothing}
      <section class="dashboard-row">
        <div class="block dashboard-panel">
          <h3>${this._tt("linked_users")}</h3>
          ${this._renderLinkedUsersDashboard()}
        </div>
        <div class="block dashboard-panel">
          <h3>${this._tt("upcoming_birthdays")}</h3>
          <ul class="plain">
            ${upcoming.length
              ? upcoming.slice(0, 8).map((u) => {
                  const when = daysUntilLabel(Number(u.days_until), this._tt("days"));
                  const turns =
                    u.age != null
                      ? this._tt("turns_age").replace("%s", String(u.age))
                      : "";
                  const meta = [turns, when].filter(Boolean).join(" · ");
                  return html`<li>
                    <button class="linkish" @click=${() => void this._openPersonPreview(String(u.person_id))}>
                      ${u.name}
                    </button>
                    <span class="muted">${meta}</span>
                  </li>`;
                })
              : html`<li class="muted">—</li>`}
          </ul>
        </div>
        <div class="block dashboard-panel">
          <h3>${this._tt("on_this_day")}</h3>
          <ul class="plain">
            ${onThisDay.length
              ? onThisDay.slice(0, 8).map((u) => {
                  const kind = String(u.kind || "");
                  const kindLabel =
                    kind === "death"
                      ? this._tt("on_this_day_death")
                      : kind === "marriage"
                        ? this._tt("on_this_day_marriage")
                        : this._tt("on_this_day_birth");
                  const names = (u.names as string[]) || [];
                  const label =
                    names.length > 1
                      ? names.join(" & ")
                      : String(u.name || names[0] || "—");
                  const yearsAgo =
                    u.years_ago != null
                      ? this._tt("on_this_day_years_ago").replace(
                          "%s",
                          String(u.years_ago),
                        )
                      : "";
                  const year = u.year != null ? String(u.year) : "";
                  const personId = u.person_id ? String(u.person_id) : "";
                  const when =
                    Number(u.days_until) === 0
                      ? ""
                      : daysUntilLabel(Number(u.days_until), this._tt("days"));
                  return html`<li>
                    ${personId
                      ? html`<button
                          class="linkish"
                          @click=${() => void this._openPersonPreview(personId)}
                        >
                          ${kindLabel}: ${label}
                        </button>`
                      : html`<span>${kindLabel}: ${label}</span>`}
                    <span class="muted">
                      ${[year, yearsAgo, when].filter(Boolean).join(" · ")}
                    </span>
                  </li>`;
                })
              : html`<li class="muted">—</li>`}
          </ul>
        </div>
      </section>`}
    `;
  }

  private _haAccountLabelsForPerson(personId: string): string {
    const names: string[] = [];
    for (const link of this._userLinks) {
      if (String(link.person_id) !== personId) continue;
      const label = this._haUserDisplayName(String(link.ha_user_id));
      if (label) names.push(label);
    }
    return names.join(", ");
  }

  private _renderLinkedUsersDashboard() {
    const seen = new Set<string>();
    const cards: PersonDto[] = [];
    for (const link of this._userLinks) {
      const pid = String(link.person_id || "");
      if (!pid || seen.has(pid)) continue;
      seen.add(pid);
      const person = this._people.find((p) => p.id === pid);
      if (person) cards.push(person);
    }
    if (!cards.length) {
      return html`<p class="muted">—</p>`;
    }
    return html`<div class="card-list people-cards dashboard-linked-cards">
      ${cards.map((p) => {
        const accounts = this._haAccountLabelsForPerson(p.id);
        return html`<div class="person-card-wrap">
          ${this._renderPersonCard(p as unknown as Record<string, unknown>, {
            preview: true,
            subtitle: accounts || undefined,
          })}
        </div>`;
      })}
    </div>`;
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
    if (this._filterUserLinked) {
      chips.push({
        label: this._tt("filter_linked_users"),
        clear: () => {
          this._filterUserLinked = "";
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
              aria-label=${this._tt("filter_all_statuses")}
              .value=${this._filterLiving}
              @change=${(e: Event) => {
                this._filterLiving = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="all">${this._tt("filter_all_statuses")}</option>
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
              aria-label=${this._tt("linked_users")}
              .value=${this._filterUserLinked}
              @change=${(e: Event) => {
                this._filterUserLinked = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="">${this._tt("filter_all_people")}</option>
              <option value="linked">${this._tt("filter_linked_users")}</option>
            </select>
            <select
              aria-label=${this._tt("filter_family")}
              @change=${(e: Event) => {
                this._familyShortcut = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="" ?selected=${this._familyShortcut === ""}>
                ${this._tt("filter_all_families")}
              </option>
              ${families.map(
                (f) => html`<option value=${f} ?selected=${f === this._familyShortcut}>${f}</option>`,
              )}
            </select>
            <select
              aria-label=${this._tt("place")}
              @change=${(e: Event) => {
                this._filterPlace = (e.target as HTMLSelectElement).value;
                this._persistViewState();
              }}
            >
              <option value="" ?selected=${this._filterPlace === ""}>
                ${this._tt("filter_all_places")}
              </option>
              ${places.map(
                (p) => html`<option value=${p.id} ?selected=${p.id === this._filterPlace}>${p.label}</option>`,
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
          this._filterUserLinked ||
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
                    <th class="avatar-col" aria-label=${this._tt("photo")}></th>
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
    const name = personDisplayName(p);
    return html`
      <div class="person-card-wrap">
        <button type="button" class="person-card" @click=${() => this._openPerson(p.id)}>
          <div class="person-card-head person-card-head--with-avatar">
            ${renderPersonAvatar(p, { size: "sm", hass: this.hass, deceasedOverlay: true })}
            <div class="person-card-head-text">
              <div class="person-card-title-row">
                <div class="person-card-title-main">
                  <div class="person-card-title person-card-title--clamp">${name}</div>
                  ${this._lineageBadge(p.id, name)}
                </div>
                <span class="person-card-sex">${this._sexIconBadge(p.sex)}</span>
              </div>
            </div>
          </div>
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
      <td class="avatar-col">
        ${renderPersonAvatar(p, { size: "sm", hass: this.hass, deceasedOverlay: true })}
      </td>
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
      <td class="center">${this._lineageBadge(p.id)}</td>
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

  private _plainEventTypeLabel(type: string): string {
    const key = EVENT_TYPE_KEYS[type];
    return key ? this._tt(key) : type;
  }

  private _relatedEventTemplate(ev: EventDto): LocaleKey | null {
    if (ev.subject_type !== "related" || !ev.relation) return null;
    if (ev.type === "birth" && ev.relation === "child") return "event_child_birth";
    if (ev.type === "death" && ev.relation === "child") return "event_child_death";
    if (ev.type === "birth" && ev.relation === "partner") return "event_partner_birth";
    if (ev.type === "death" && ev.relation === "partner") return "event_partner_death";
    return null;
  }

  private _eventTypeLabel(ev: EventDto): string {
    const relKey = this._relatedEventTemplate(ev);
    if (relKey) {
      const name = ev.related_person_name || "";
      const prefix = (this._tt(relKey).split("%s")[0] || this._tt(relKey)).trimEnd();
      return name ? `${prefix} — ${name}` : prefix;
    }
    return this._plainEventTypeLabel(ev.type);
  }

  private _renderEventPartnerLinks(partners: { id: string; name: string }[]) {
    return partners.map((p, i) =>
      i === 0
        ? this._personLink(p, { preview: true })
        : html` & ${this._personLink(p, { preview: true })}`,
    );
  }

  private _renderEventTypeHeading(ev: EventDto) {
    const unionTypes = new Set(["marriage", "divorce", "partnership"]);
    if (unionTypes.has(ev.type)) {
      const partners = this._unionEventPartners(ev);
      const label = this._plainEventTypeLabel(ev.type);
      if (partners.length) {
        return html`<span class="event-card-title"
          ><strong>${label}</strong> — ${this._renderEventPartnerLinks(partners)}</span
        >`;
      }
      return html`<strong>${label}</strong>`;
    }
    const relKey = this._relatedEventTemplate(ev);
    if (relKey && ev.related_person_id) {
      const label = (this._tt(relKey).split("%s")[0] || this._tt(relKey)).trimEnd();
      return html`<span class="event-card-title"
        ><strong>${label}</strong> —
        ${this._personLink(
          {
            id: ev.related_person_id,
            name: ev.related_person_name || ev.related_person_id,
          },
          { preview: true },
        )}</span
      >`;
    }
    if (relKey) {
      return html`<strong>${this._eventTypeLabel(ev)}</strong>`;
    }
    return html`<strong>${this._plainEventTypeLabel(ev.type)}</strong>`;
  }

  private _formatUnionDate(dateText: string | null | undefined, lang?: string): string {
    const text = (dateText || "").trim();
    if (!text) return "";
    return formatEventDate({ date_text: text }, lang) || text;
  }

  /** Death date that ended a widowed union (partner or focus person). */
  private _widowedDateText(
    union: TreeUnion,
    focusDeathText?: string | null,
  ): string {
    if (union.status !== "widowed") return "";
    for (const partner of union.partners || []) {
      const text =
        typeof partner.death_date_text === "string"
          ? partner.death_date_text.trim()
          : "";
      if (text) return text;
    }
    return (focusDeathText || "").trim();
  }

  /** Years together, same style as person age: "(25)" / "(±25)". */
  private _unionDurationSuffix(
    union: TreeUnion,
    focusDeathText?: string | null,
  ): string {
    const marriage = (union.marriage_date || "").trim();
    if (!marriage) return "";
    const start = { date_text: marriage };
    if (union.status === "divorced") {
      const end = (union.divorce_date || "").trim();
      return end ? formatAge(start, { date_text: end }, false) : "";
    }
    if (union.status === "widowed") {
      const end = this._widowedDateText(union, focusDeathText);
      return end ? formatAge(start, { date_text: end }, false) : "";
    }
    if (union.status === "ongoing" || union.status === "separated") {
      return formatAge(start, null, true);
    }
    return "";
  }

  private _formatUnionMarriageDisplay(
    union: TreeUnion,
    lang?: string,
    focusDeathText?: string | null,
  ): string {
    const marriageDate = this._formatUnionDate(union.marriage_date, lang);
    if (!marriageDate) return "";
    const duration = this._unionDurationSuffix(union, focusDeathText);
    return duration ? `${marriageDate} ${duration}` : marriageDate;
  }

  private _unionMetaSubtitle(
    union: TreeUnion | undefined,
    lang?: string,
    focusDeathText?: string | null,
  ): string {
    if (!union) return "";
    const parts: string[] = [];
    const marriageDate = this._formatUnionMarriageDisplay(union, lang, focusDeathText);
    if (marriageDate) parts.push(`${this._tt("event_marriage")}: ${marriageDate}`);
    if (union.marriage_place) parts.push(union.marriage_place);
    const divorceDate = this._formatUnionDate(union.divorce_date, lang);
    if (divorceDate) parts.push(`${this._tt("event_divorce")}: ${divorceDate}`);
    if (union.status === "widowed") {
      const widowedDate = this._formatUnionDate(
        this._widowedDateText(union, focusDeathText),
        lang,
      );
      parts.push(
        widowedDate
          ? `${this._tt("status_widowed")}: ${widowedDate}`
          : this._tt("status_widowed"),
      );
    }
    return parts.join(" · ");
  }

  private _renderPersonCard(
    node: Record<string, unknown>,
    opts: {
      subtitle?: string;
      footer?: string;
      preview?: boolean;
      hideSiblings?: boolean;
      compact?: boolean;
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
    const compact = opts.compact !== false;
    const personLike = {
      ...node,
      sex,
      is_living: isLiving,
      profile_media_id:
        typeof node.profile_media_id === "string" ? node.profile_media_id : null,
    };
    return html`
      <button type="button" class="person-card" @click=${onCardClick}>
        <div class="person-card-head person-card-head--with-avatar">
          ${renderPersonAvatar(personLike as PersonDto, {
            size: "sm",
            hass: this.hass,
            deceasedOverlay: compact,
            title,
          })}
          <div class="person-card-head-text">
            <div class="person-card-title-row">
              <div class="person-card-title person-card-title--clamp" title=${title}>
                ${compact
                  ? title
                  : html`${this._deceasedIcon(isLiving)} ${this._sexIconBadge(sex)} ${title}`}
              </div>
              ${id ? this._lineageBadge(id, title) : nothing}
            </div>
          </div>
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

  private _unionEventPartners(ev: EventDto): { id: string; name: string }[] {
    if (!ev.union_id || !this._detail) return [];
    const selfId = this._detail.person.id;
    const partners = (this._detail.tree?.partners || []) as TreeUnion[];
    const union = partners.find((u) => u.union_id === ev.union_id);
    if (!union) return [];
    return (union.partners || [])
      .map((p) => {
        const rec = p as Record<string, unknown>;
        const id = String(rec.id || "");
        const name = nodeName(rec);
        return { id, name };
      })
      .filter((p) => p.id && p.id !== selfId);
  }

  private _renderEventCard(ev: EventDto) {
    const canEdit = this._canWrite() && ev.subject_type === "person";
    const lang = this.hass?.language;
    const unionTypes = new Set(["marriage", "divorce", "partnership"]);
    const partnerRefs =
      unionTypes.has(ev.type) ? this._unionEventPartners(ev) : [];
    const partnerNamesJoined = partnerRefs.map((p) => p.name).join(" & ");
    const titleShowsPartners = unionTypes.has(ev.type) && partnerRefs.length > 0;
    const desc = (ev.description || "").trim();
    const showDesc =
      desc &&
      (!partnerRefs.length ||
        desc.localeCompare(partnerNamesJoined, undefined, { sensitivity: "accent" }) !== 0);
    return html`
      <div class="event-card">
        <div class="event-card-head">
          ${this._renderEventTypeHeading(ev)}
          ${canEdit
            ? html`<span class="row-actions">
                <button class="linkish" @click=${() => this._openEditEvent(ev)}>${this._tt("edit")}</button>
                <button class="linkish danger" @click=${() => this._deleteEvent(ev.id)}>${this._tt("delete")}</button>
              </span>`
            : nothing}
        </div>
        <div class="event-card-meta">${formatEventDate(ev, lang) || formatGedcomDate(ev.date_text)}</div>
        ${ev.place_name ? html`<div class="event-card-meta">${ev.place_name}</div>` : nothing}
        ${partnerRefs.length && !titleShowsPartners
          ? html`<div class="event-card-meta">
              ${this._renderEventPartnerLinks(partnerRefs)}
            </div>`
          : nothing}
        ${showDesc ? html`<div class="event-card-desc">${desc}</div>` : nothing}
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

  private _renderParentLinkSlot(role: "father" | "mother") {
    const parents = (this._detail?.tree?.parents || []) as Array<Record<string, unknown>>;
    const current = parents.find((p) =>
      role === "father" ? p.sex === "male" : p.sex === "female",
    );
    const label = role === "father" ? this._tt("father") : this._tt("mother");
    const addLabel = role === "father" ? this._tt("add_father") : this._tt("add_mother");
    return html`<div class="parent-slot-row">
      <div class="parent-slot-head">
        <span class="muted">${label}</span>
        ${current
          ? html`<strong>${nodeName(current)}</strong>`
          : html`<span class="muted">—</span>`}
      </div>
      <div class="row-actions">
        ${current
          ? html`<button type="button" class="linkish" @click=${() => this._openPickPerson(role)}>
              ${this._tt("change")}
            </button>`
          : html`
              <button type="button" class="linkish" @click=${() => this._openPickPerson(role)}>
                ${this._tt("link_existing_person")}
              </button>
              ${this._canWrite()
                ? html`<button
                    type="button"
                    class="linkish"
                    @click=${() => this._openAddParentFromDialog(role)}
                  >
                    ${addLabel}
                  </button>`
                : nothing}
            `}
      </div>
    </div>`;
  }

  private _openParentsDialog() {
    this._parentsPickRole = null;
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
      const role = this._pickPersonRole;
      this._dialogOpen = false;
      this._pickPersonRole = null;
      this._detail = await getPerson(this.hass, selfId);
      await this._refreshAll();
      if (role === "father" || role === "mother") {
        this._openParentsDialog();
      }
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
            event_type: "marriage",
            date_text: built.value,
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
    return renderRelationshipsTab(this, d);
  }

  private _renderPersonDetailsTab(d: PersonDetail) {
    return renderPersonDetailsTab(this, d);
  }

  private _renderPhotosSection(p: PersonDto) {
    return renderPhotosSection(this, p);
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

  private _treeCard(
    node: Record<string, unknown> | null,
    extraClass = "",
    opts: {
      hideSiblings?: boolean;
      stemDown?: boolean;
      stemUp?: boolean;
    } = {},
  ) {
    if (!node) {
      return html`<div class="tree-card-wrap tree-card-wrap--empty"></div>`;
    }
    const stemClass = [
      opts.stemDown ? "tree-card-wrap--stem-down" : "",
      opts.stemUp ? "tree-card-wrap--stem-up" : "",
    ]
      .filter(Boolean)
      .join(" ");
    return html`<div class="tree-card-wrap ${extraClass} ${stemClass}">
      ${this._renderPersonCard(node, { hideSiblings: opts.hideSiblings })}
    </div>`;
  }

  private _treeAddParentsSlot(parentId: string, extraClass = "") {
    return html`<div class="tree-card-wrap ${extraClass}">
      <button
        type="button"
        class="add-slot"
        @click=${() => {
          void this._openPerson(parentId).then(() => this._openParentsDialog());
        }}
      >
        ${icon(MDI_PLUS)} ${this._tt("add_parents")}
      </button>
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
    return renderTreeTab(this, d);
  }

  private _renderPerson() {
    return renderPerson(this);
  }

  private _openCitationDialog(citation?: Record<string, unknown>) {
    this._editingCitationId = citation ? String(citation.id) : null;
    this._citationForm = {
      title: String(citation?.source_title || ""),
      url: String(citation?.source_url || ""),
      author: String(citation?.source_author || ""),
      repository: String(citation?.source_repository || ""),
      detail: String(citation?.detail || ""),
      source_id: String(citation?.source_id || ""),
    };
    this._dialogMode = "citation";
    this._dialogOpen = true;
    this._error = "";
  }

  private async _saveCitationForm() {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    const title = (this._citationForm.title || "").trim();
    if (!title && !this._citationForm.source_id) {
      this._error = this._tt("field_required");
      return;
    }
    const urlTrim = (this._citationForm.url || "").trim();
    if (urlTrim && !isHttpUrl(urlTrim)) {
      this._error = this._tt("source_url_invalid");
      return;
    }
    this._saving = true;
    this._error = "";
    try {
      await saveCitation(this.hass, {
        citation_id: this._editingCitationId || undefined,
        source_id: this._citationForm.source_id || undefined,
        subject_type: "person",
        subject_id: this._detail.person.id,
        title,
        url: this._citationForm.url || "",
        author: this._citationForm.author || "",
        repository: this._citationForm.repository || "",
        detail: this._citationForm.detail || "",
      });
      this._dialogOpen = false;
      this._editingCitationId = null;
      this._detail = await getPerson(this.hass, this._detail.person.id);
    } catch (err) {
      this._error = formatHassError(err);
    } finally {
      this._saving = false;
    }
  }

  private async _deleteCitationById(citationId: string) {
    if (!this.hass || !this._detail || !this._canWrite()) return;
    if (!confirm(this._tt("confirm_delete_citation"))) return;
    try {
      await deleteCitation(this.hass, citationId);
      this._detail = await getPerson(this.hass, this._detail.person.id);
    } catch (err) {
      this._error = formatHassError(err);
    }
  }

  private _renderSourcesTab(d: PersonDetail) {
    return renderSourcesTab(this, d);
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

  private _renderUserLinkForm() {
    return renderUserLinkForm(this);
  }

  private _renderLinkedUsersSettingsBody(write: boolean) {
    return renderLinkedUsersSettingsBody(this, write);
  }

  private _renderSettings() {
    return renderSettings(this);
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
    this._resetProfileCropState();
    if (this._dialogMode === "userLink") {
      this._resetUserLinkForm();
    }
    if (this._dialogMode === "import" && this._importPhase !== "importing") {
      this._importPhase = "";
      this._importFile = null;
      this._importFileName = "";
      this._importReport = null;
      this._importStatus = "";
    }
  };

  private _renderImportDialogBody() {
    return renderImportDialogBody(this);
  }

  private _renderDialog() {
    return renderDialog(this);
  }

  static styles = panelStyles;
}

if (!customElements.get(PANEL_TAG)) {
  customElements.define(PANEL_TAG, FamilyTreePanel);
}

declare global {
  interface HTMLElementTagNameMap {
    "family-tree-panel": FamilyTreePanel;
  }
}
