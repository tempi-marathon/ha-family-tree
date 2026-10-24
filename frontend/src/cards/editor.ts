/** Shared HA-style Lovelace card editors. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { listPersons, type PersonDto } from "../api";
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

@customElement("family-tree-card-editor-form")
export class FamilyTreeCardEditorForm extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) config: SensorEditorConfig = {};
  @property() sensorSuffix = "";
  @property({ type: Boolean }) showMaxItems = false;
  @property({ type: Boolean }) showPersonPicker = false;
  @property({ type: Boolean }) showLinkedUser = false;

  @state() private _personQuery = "";
  @state() private _personHits: PersonDto[] = [];
  @state() private _personSearching = false;
  private _searchTimer: ReturnType<typeof setTimeout> | undefined;
  private _searchGen = 0;

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

  private _onTitleChanged(ev: Event) {
    const value = (ev.target as HTMLInputElement).value.trim();
    this._fire({
      ...this.config,
      title: value || undefined,
    });
  }

  private _onMaxItemsChanged(ev: Event) {
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
    const checked = (ev.target as HTMLInputElement).checked;
    this._fire({
      ...this.config,
      use_linked_user: checked,
    });
  }

  private _schedulePersonSearch(query: string) {
    this._personQuery = query;
    if (this._searchTimer) clearTimeout(this._searchTimer);
    const q = query.trim();
    if (!q) {
      this._personHits = [];
      this._personSearching = false;
      return;
    }
    this._personSearching = true;
    this._searchTimer = setTimeout(() => void this._runPersonSearch(q), 250);
  }

  private async _runPersonSearch(query: string) {
    const gen = ++this._searchGen;
    try {
      const result = await listPersons(this.hass, { search: query, limit: 12 });
      if (gen !== this._searchGen) return;
      this._personHits = result.persons;
    } catch {
      if (gen !== this._searchGen) return;
      this._personHits = [];
    } finally {
      if (gen === this._searchGen) this._personSearching = false;
    }
  }

  private _selectPerson(person: PersonDto) {
    this._fire({
      ...this.config,
      person_id: person.id,
      use_linked_user: false,
    });
    this._personQuery = personDisplayName(person);
    this._personHits = [];
  }

  private _clearPerson() {
    this._fire({
      ...this.config,
      person_id: undefined,
    });
    this._personQuery = "";
    this._personHits = [];
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._searchTimer) clearTimeout(this._searchTimer);
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
              .checked=${this.config.use_linked_user !== false}
              @change=${this._onLinkedChanged}
            ></ha-switch>
            <span>${tt(hass, "use_linked_user")}</span>
          </label>`
        : nothing}

      ${this.showPersonPicker
        ? html`<div class="field">
            <label>${tt(hass, "person")}</label>
            ${this.config.person_id
              ? html`<div class="selected">
                  <code>${this.config.person_id}</code>
                  <button type="button" class="clear" @click=${() => this._clearPerson()}>
                    ×
                  </button>
                </div>`
              : nothing}
            <ha-textfield
              .label=${tt(hass, "search_person")}
              .value=${this._personQuery}
              @input=${(e: Event) =>
                this._schedulePersonSearch((e.target as HTMLInputElement).value)}
            ></ha-textfield>
            ${this._personSearching
              ? html`<div class="muted">${tt(hass, "loading")}</div>`
              : nothing}
            ${this._personHits.length
              ? html`<ul class="hits">
                  ${this._personHits.map(
                    (p) => html`<li>
                      <button type="button" @click=${() => this._selectPerson(p)}>
                        ${personDisplayName(p)}
                      </button>
                    </li>`,
                  )}
                </ul>`
              : this._personQuery.trim() && !this._personSearching
                ? html`<div class="muted">${tt(hass, "no_person_results")}</div>`
                : nothing}
          </div>`
        : nothing}

      <div class="field">
        <ha-textfield
          .label=${tt(hass, "title")}
          .value=${this.config.title || ""}
          @change=${this._onTitleChanged}
        ></ha-textfield>
      </div>

      ${this.showMaxItems
        ? html`<div class="field">
            <ha-textfield
              type="number"
              min="1"
              max="20"
              .label=${tt(hass, "max_items")}
              .value=${String(this.config.max_items ?? 8)}
              @change=${this._onMaxItemsChanged}
            ></ha-textfield>
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
    .selected {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
    }
    .selected code {
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
