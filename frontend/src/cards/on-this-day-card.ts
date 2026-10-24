/** Lovelace card: historic events that fall today. */

import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "../types";
import {
  collectOnThisDay,
  kindClass,
  kindLabel,
  onThisDayMeta,
  registerCard,
  resolveEntity,
  tt,
} from "./common";
import "./editor";
import { listCardStyles, PersonDialogController } from "./person-dialog";

export interface OnThisDayCardConfig {
  type?: string;
  entity?: string;
  title?: string;
}

@customElement("family-tree-on-this-day-card")
export class FamilyTreeOnThisDayCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: OnThisDayCardConfig = {};
  private _personDialog = new PersonDialogController(this);

  static getStubConfig(): OnThisDayCardConfig {
    return {};
  }

  static getConfigElement() {
    return document.createElement("family-tree-on-this-day-card-editor");
  }

  setConfig(config: OnThisDayCardConfig) {
    this._config = { ...config };
  }

  getCardSize(): number {
    return 2;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._personDialog.disconnected();
  }

  protected updated() {
    this._personDialog.ensureOpen();
  }

  protected render() {
    const entity = resolveEntity(this.hass, this._config.entity, "on_this_day");
    const title = this._config.title || tt(this.hass, "on_this_day_title");
    if (!entity) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "missing_entity")}</div>
        ${this._personDialog.render()}
      </ha-card>`;
    }
    const items = collectOnThisDay(entity.attributes);
    return html`<ha-card header=${title}>
      ${items.length
        ? html`<ul class="list">
            ${items.map((item) => {
              const meta = onThisDayMeta(this.hass, item);
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
                ${meta
                  ? html`<span class="meta muted">${meta}</span>`
                  : nothing}
              </li>`;
            })}
          </ul>`
        : html`<div class="pad muted">${tt(this.hass, "empty_on_this_day")}</div>`}
      ${this._personDialog.render()}
    </ha-card>`;
  }

  static styles = listCardStyles;
}

@customElement("family-tree-on-this-day-card-editor")
export class FamilyTreeOnThisDayCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: OnThisDayCardConfig = {};

  setConfig(config: OnThisDayCardConfig) {
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
    return html`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      sensorSuffix="on_this_day"
      @config-changed=${(e: CustomEvent) => {
        this._config = { ...e.detail.config };
        this._fire();
      }}
    ></family-tree-card-editor-form>`;
  }
}

registerCard({
  type: "family-tree-on-this-day-card",
  name: "Family Tree On This Day",
  description: "Historic births, baptisms, marriages, and deaths for today",
});
