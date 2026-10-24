/** Shared HA-style Lovelace card editors. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { listPersons } from "../api";
import { personDisplayName } from "../people_view";
import type { HassEntity, HomeAssistant } from "../types";
import { tt } from "./common";

export interface SensorEditorConfig {
  entity?: string;
  title?: string;
  max_items?: number;
  person_id?: string;
  use_linked_user?: boolean;
  type?: string;
  [key: string]: unknown;
}

interface PersonComboItem {
  id: string;
  label: string;
}

const PERSON_HIT_LIMIT = 12;

@customElement("family-tree-card-editor-form")
export class FamilyTreeCardEditorForm extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config: SensorEditorConfig = {};
  @property() sensorSuffix = "";
  @property({ type: Boolean }) showMaxItems = false;
  @property({ type: Boolean }) showPersonPicker = false;
  @property({ type: Boolean }) showLinkedUser = false;

  @state() private _personQuery = "";
  @state() private _personHits: PersonComboItem[] = [];
  @state() private _personList: PersonComboItem[] = [];
  @state() private _personListLoading = false;
  @state() private _personListError = false;
  @state() private _comboOpen = false;
  @state() private _useHaComboBox = false;
  private _listLoaded = false;
  private _listGen = 0;

  connectedCallback() {
    super.connectedCallback();
    this._useHaComboBox = typeof customElements !== "undefined" &&
      Boolean(customElements.get("ha-combo-box"));
  }

  protected updated(changed: Map<string, unknown>) {
    if (
      this.showPersonPicker &&
      (changed.has("showPersonPicker") || changed.has("hass") || changed.has("config"))
    ) {
      void this._ensurePersonList();
    }
  }

  private _fire(next: SensorEditorConfig) {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _entityFilter = (entity: HassEntity): boolean => {
    const entityId = entity?.entity_id || "";
    if (!this.sensorSuffix) return entityId.startsWith("sensor.");
    return (
      entityId.startsWith("sensor.") &&
      (entityId.endsWith(`_${this.sensorSuffix}`) ||
        entityId === `sensor.${this.sensorSuffix}`)
    );
  };

  private _onEntityChanged(ev: CustomEvent) {
    const value = (ev.detail?.value ?? "") as string;
    this._fire({
      ...this.config,
      entity: value.trim() || undefined,
    });
  }

  private _onTitleInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value.trim();
    this._fire({
      ...this.config,
      title: value || undefined,
    });
  }

  private _onMaxItemsInput(ev: Event) {
    const raw = Number((ev.target as HTMLInputElement).value);
    const max_items = Number.isFinite(raw)
      ? Math.min(20, Math.max(1, Math.round(raw)))
      : undefined;
    this._fire({
      ...this.config,
      max_items,
    });
  }

  private _onLinkedChanged(ev: Event) {
    const checked = Boolean(
      (ev.target as HTMLInputElement & { checked?: boolean }).checked,
    );
    this._fire({
      ...this.config,
      use_linked_user: checked,
    });
  }

  private get _linkedUserOn(): boolean {
    return this.config.use_linked_user !== false;
  }

  private get _showPersonCombo(): boolean {
    return this.showPersonPicker && !(this.showLinkedUser && this._linkedUserOn);
  }

  private async _ensurePersonList() {
    if (!this.hass || this._listLoaded || this._personListLoading) return;
    const gen = ++this._listGen;
    this._personListLoading = true;
    this._personListError = false;
    try {
      const result = await listPersons(this.hass, { limit: 5000 });
      if (gen !== this._listGen) return;
      this._personList = result.persons.map((p) => ({
        id: p.id,
        label: personDisplayName(p),
      }));
      this._listLoaded = true;
      this._hydrateSelectedLabel();
      this._filterHits(this._personQuery);
    } catch {
      if (gen !== this._listGen) return;
      this._personListError = true;
      this._personList = [];
    } finally {
      if (gen === this._listGen) this._personListLoading = false;
    }
  }

  private _hydrateSelectedLabel() {
    const id = this.config.person_id?.trim();
    if (!id || this._personQuery.trim()) return;
    const match = this._personList.find((p) => p.id === id);
    if (match) this._personQuery = match.label;
  }

  private _selectedLabel(): string {
    const id = this.config.person_id?.trim();
    if (!id) return "";
    return this._personList.find((p) => p.id === id)?.label || id;
  }

  private _filterHits(query: string) {
    const q = query.trim().toLowerCase();
    if (!q) {
      this._personHits = this._personList.slice(0, PERSON_HIT_LIMIT);
      return;
    }
    this._personHits = this._personList
      .filter(
        (p) =>
          p.label.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
      )
      .slice(0, PERSON_HIT_LIMIT);
  }

  private _onPersonQueryInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this._personQuery = value;
    this._comboOpen = true;
    this._filterHits(value);
  }

  private _onPersonFocus() {
    this._comboOpen = true;
    if (!this._personQuery.trim() && this.config.person_id) {
      this._personQuery = this._selectedLabel();
    }
    this._filterHits(this._personQuery);
  }

  private _onPersonBlur() {
    // Delay so hit-button click can fire first.
    window.setTimeout(() => {
      this._comboOpen = false;
      if (this.config.person_id) {
        this._personQuery = this._selectedLabel();
      }
    }, 150);
  }

  private _selectPerson(person: PersonComboItem) {
    this._fire({
      ...this.config,
      person_id: person.id,
      use_linked_user: false,
    });
    this._personQuery = person.label;
    this._comboOpen = false;
    this._personHits = [];
  }

  private _clearPerson() {
    this._fire({
      ...this.config,
      person_id: undefined,
    });
    this._personQuery = "";
    this._personHits = [];
    this._comboOpen = false;
  }

  private _onHaComboChanged(ev: CustomEvent) {
    const value = String(ev.detail?.value ?? "").trim();
    if (!value) {
      this._clearPerson();
      return;
    }
    const match = this._personList.find((p) => p.id === value || p.label === value);
    if (match) this._selectPerson(match);
  }

  private _renderPersonCombo(hass: HomeAssistant) {
    if (this._useHaComboBox && this._personList.length) {
      return html`<ha-combo-box
        .hass=${hass}
        .label=${tt(hass, "person")}
        .items=${this._personList}
        .value=${this.config.person_id || ""}
        item-value-path="id"
        item-label-path="label"
        .allowCustomValue=${false}
        @value-changed=${this._onHaComboChanged}
      ></ha-combo-box>`;
    }

    const showHits =
      this._comboOpen &&
      !this._personListLoading &&
      (this._personHits.length > 0 || Boolean(this._personQuery.trim()));

    return html`
      <div class="combo">
        <input
          type="search"
          class="text-input"
          autocomplete="off"
          .value=${this._personQuery}
          placeholder=${tt(hass, "search_person")}
          aria-label=${tt(hass, "person")}
          @input=${this._onPersonQueryInput}
          @focus=${this._onPersonFocus}
          @blur=${this._onPersonBlur}
        />
        ${this.config.person_id
          ? html`<button
              type="button"
              class="clear"
              title=${tt(hass, "clear_person")}
              @mousedown=${(e: Event) => e.preventDefault()}
              @click=${() => this._clearPerson()}
            >
              ×
            </button>`
          : nothing}
      </div>
      ${this._personListLoading
        ? html`<div class="muted">${tt(hass, "loading")}</div>`
        : nothing}
      ${this._personListError
        ? html`<div class="muted">${tt(hass, "error")}</div>`
        : nothing}
      ${showHits
        ? this._personHits.length
          ? html`<ul class="hits" role="listbox">
              ${this._personHits.map(
                (p) => html`<li>
                  <button
                    type="button"
                    role="option"
                    @mousedown=${(e: Event) => e.preventDefault()}
                    @click=${() => this._selectPerson(p)}
                  >
                    ${p.label}
                  </button>
                </li>`,
              )}
            </ul>`
          : html`<div class="muted">${tt(hass, "no_person_results")}</div>`
        : nothing}
    `;
  }

  protected render() {
    const hass = this.hass;
    const includeDomains = ["sensor"];
    return html`<div class="form">
      ${this.sensorSuffix
        ? html`<div class="field">
            <label>${tt(hass, "entity")}</label>
            <ha-entity-picker
              .hass=${hass}
              .value=${this.config.entity || ""}
              .includeDomains=${includeDomains}
              .entityFilter=${this._entityFilter}
              allow-custom-entity
              @value-changed=${this._onEntityChanged}
            ></ha-entity-picker>
          </div>`
        : nothing}

      ${this.showLinkedUser
        ? html`<label class="check">
            <ha-switch
              .checked=${this._linkedUserOn}
              @change=${this._onLinkedChanged}
            ></ha-switch>
            <span>${tt(hass, "use_linked_user")}</span>
          </label>`
        : nothing}

      ${this._showPersonCombo
        ? html`<div class="field">
            <label>${tt(hass, "person")}</label>
            ${this.config.person_id && !this._useHaComboBox
              ? html`<div class="selected">
                  <span class="selected-name">${this._selectedLabel()}</span>
                </div>`
              : nothing}
            ${this._renderPersonCombo(hass)}
          </div>`
        : nothing}

      <div class="field">
        <label for="ft-card-title">${tt(hass, "title")}</label>
        <input
          id="ft-card-title"
          type="text"
          class="text-input"
          .value=${this.config.title || ""}
          @change=${this._onTitleInput}
        />
      </div>

      ${this.showMaxItems
        ? html`<div class="field">
            <label for="ft-card-max">${tt(hass, "max_items")}</label>
            <input
              id="ft-card-max"
              type="number"
              class="text-input"
              min="1"
              max="20"
              .value=${String(this.config.max_items ?? 8)}
              @change=${this._onMaxItemsInput}
            />
          </div>`
        : nothing}
    </div>`;
  }

  static styles = css`
    .form {
      display: grid;
      gap: 16px;
      padding: 4px 0;
    }
    .field {
      display: grid;
      gap: 6px;
    }
    label {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    label.check {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 400;
    }
    .text-input {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: var(--ha-border-radius-sm, 4px);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
      font-size: 1rem;
    }
    .text-input:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 0;
      border-color: var(--primary-color);
    }
    .combo {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .combo .text-input {
      flex: 1;
      padding-right: 36px;
    }
    .combo .clear {
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
    }
    .selected {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .selected-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: var(--secondary-background-color);
      padding: 4px 8px;
      border-radius: 4px;
    }
    .clear {
      appearance: none;
      border: none;
      background: transparent;
      font-size: 1.2rem;
      cursor: pointer;
      color: var(--secondary-text-color);
      line-height: 1;
      padding: 4px 8px;
    }
    .hits {
      list-style: none;
      margin: 0;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      max-height: 200px;
      overflow: auto;
    }
    .hits button {
      appearance: none;
      width: 100%;
      text-align: left;
      border: none;
      background: transparent;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      color: var(--primary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .hits li:last-child button {
      border-bottom: none;
    }
    .hits button:hover,
    .hits button:focus-visible {
      background: var(--secondary-background-color);
      outline: none;
    }
    .muted {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "family-tree-card-editor-form": FamilyTreeCardEditorForm;
  }
}
