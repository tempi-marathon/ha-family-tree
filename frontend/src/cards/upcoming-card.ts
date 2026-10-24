/** Lovelace card: upcoming birthdays, anniversaries, memorials. */

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import {
  collectUpcoming,
  kindClass,
  kindLabel,
  registerCard,
  resolveEntity,
  tt,
  upcomingMeta,
} from "./common";
import "./editor";
import { listCardStyles, PersonDialogController } from "./person-dialog";

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
  private _personDialog = new PersonDialogController(this);

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

  disconnectedCallback() {
    super.disconnectedCallback();
    this._personDialog.disconnected();
  }

  protected updated() {
    this._personDialog.ensureOpen();
  }

  protected render() {
    const entity = resolveEntity(this.hass, this._config.entity, "upcoming_events");
    const title = this._config.title || tt(this.hass, "upcoming_title");
    if (!entity) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "missing_entity")}</div>
        ${this._personDialog.render()}
      </ha-card>`;
    }
    const items = collectUpcoming(
      entity.attributes,
      Math.min(20, Math.max(1, Number(this._config.max_items) || 8)),
      this.hass,
    );
    return html`<ha-card header=${title}>
      ${items.length
        ? html`<ul class="list">
            ${items.map((item) => {
              const meta = upcomingMeta(this.hass, item);
              const personId = item.person_id;
              return html`<li>
                <span class="kind ${kindClass(item.kind)}"
                  >${kindLabel(this.hass, item.kind)}</span
                >
                ${personId
                  ? html`<button
                      type="button"
                      class="linkish name"
                      @click=${() => this._personDialog.open(personId)}
                    >
                      ${item.label}
                    </button>`
                  : html`<span class="name">${item.label}</span>`}
                <span class="meta muted">${meta}</span>
              </li>`;
            })}
          </ul>`
        : html`<div class="pad muted">${tt(this.hass, "empty_upcoming")}</div>`}
      ${this._personDialog.render()}
    </ha-card>`;
  }

  static styles = listCardStyles;
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
    // Editor markup is provided by shared editor helpers after import side-effect.
    return html`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="upcoming_events"
      .showMaxItems=${true}
      @config-changed=${(e: CustomEvent) => {
        this._config = { ...e.detail.config };
        this._fire();
      }}
    ></family-tree-card-editor-form>`;
  }
}

registerCard({
  type: "family-tree-upcoming-card",
  name: "Family Tree Upcoming",
  description: "Upcoming birthdays, anniversaries, and memorials",
});
