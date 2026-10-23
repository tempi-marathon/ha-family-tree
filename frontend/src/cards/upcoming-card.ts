/** Lovelace card: upcoming birthdays, anniversaries, memorials. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import {
  collectUpcoming,
  daysLabel,
  kindLabel,
  registerCard,
  resolveEntity,
  tt,
} from "./common";

export interface UpcomingCardConfig {
  type?: string;
  entity?: string;
  title?: string;
  max_items?: number;
}

@customElement("family-tree-upcoming-card")
export class FamilyTreeUpcomingCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: UpcomingCardConfig = {};

  static getStubConfig(): UpcomingCardConfig {
    return {};
  }

  static getConfigElement() {
    return document.createElement("family-tree-upcoming-card-editor");
  }

  setConfig(config: UpcomingCardConfig) {
    this._config = { ...config };
  }

  getCardSize(): number {
    return 3;
  }

  protected render() {
    const entity = resolveEntity(this.hass, this._config.entity, "upcoming_events");
    const title = this._config.title || tt(this.hass, "upcoming_title");
    if (!entity) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "missing_entity")}</div>
      </ha-card>`;
    }
    const items = collectUpcoming(
      entity.attributes,
      Math.min(20, Math.max(1, Number(this._config.max_items) || 8)),
    );
    return html`<ha-card header=${title}>
      ${items.length
        ? html`<ul class="list">
            ${items.map(
              (item) => html`<li>
                <span class="kind">${kindLabel(this.hass, item.kind)}</span>
                <span class="name">${item.label}</span>
                <span class="meta muted"
                  >${daysLabel(this.hass, item.days_until)}${item.detail
                    ? html` · ${item.detail}`
                    : nothing}</span
                >
              </li>`,
            )}
          </ul>`
        : html`<div class="pad muted">${tt(this.hass, "empty_upcoming")}</div>`}
    </ha-card>`;
  }

  static styles = css`
    .pad {
      padding: 12px 16px 16px;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 4px 16px 12px;
    }
    li {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 8px;
      align-items: baseline;
      padding: 6px 0;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    li:last-child {
      border-bottom: none;
    }
    .kind {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .name {
      font-weight: 500;
    }
    .meta {
      font-size: 0.85rem;
      white-space: nowrap;
    }
    .muted {
      color: var(--secondary-text-color);
    }
  `;
}

@customElement("family-tree-upcoming-card-editor")
export class FamilyTreeUpcomingCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: UpcomingCardConfig = {};

  setConfig(config: UpcomingCardConfig) {
    this._config = { ...config };
  }

  private _fire() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    return html`<div class="form">
      <label>
        Entity
        <input
          type="text"
          .value=${this._config.entity || ""}
          placeholder="sensor.…_upcoming_events"
          @change=${(e: Event) => {
            this._config = {
              ...this._config,
              entity: (e.target as HTMLInputElement).value.trim() || undefined,
            };
            this._fire();
          }}
        />
      </label>
      <label>
        Title
        <input
          type="text"
          .value=${this._config.title || ""}
          @change=${(e: Event) => {
            this._config = {
              ...this._config,
              title: (e.target as HTMLInputElement).value.trim() || undefined,
            };
            this._fire();
          }}
        />
      </label>
    </div>`;
  }

  static styles = css`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }
    label {
      display: grid;
      gap: 4px;
      font-size: 0.85rem;
    }
    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `;
}

registerCard({
  type: "family-tree-upcoming-card",
  name: "Family Tree Upcoming",
  description: "Upcoming birthdays, anniversaries, and memorials",
});
