/** Lovelace card: compact parents / focus / partners / children. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getMyLineage, getTree, type TreePayload } from "../api";
import { flattenChildren, flattenParents, nodeName, partnerNames } from "../tree_view";
import type { HomeAssistant } from "../types";
import { registerCard, tt } from "./common";

export interface MiniTreeCardConfig {
  type?: string;
  person_id?: string;
  use_linked_user?: boolean;
  title?: string;
}

@customElement("family-tree-mini-tree-card")
export class FamilyTreeMiniTreeCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: MiniTreeCardConfig = {};
  @state() private _tree: TreePayload | null = null;
  @state() private _error = "";
  @state() private _loading = false;
  /** Person id currently shown in `_tree`. */
  private _loadedFor = "";
  /** Cached linked-user person id so hass updates don't re-hit lineage/mine. */
  private _resolvedPersonId: string | null | undefined = undefined;
  private _loadGen = 0;

  static getStubConfig(): MiniTreeCardConfig {
    return { use_linked_user: true };
  }

  static getConfigElement() {
    return document.createElement("family-tree-mini-tree-card-editor");
  }

  setConfig(config: MiniTreeCardConfig) {
    this._config = { ...config };
    this._loadedFor = "";
    this._tree = null;
    this._resolvedPersonId = undefined;
    this._error = "";
  }

  getCardSize(): number {
    return 4;
  }

  protected firstUpdated() {
    void this._maybeLoad();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("_config")) {
      void this._maybeLoad();
    }
  }

  private async _resolvePersonId(): Promise<string | null> {
    if (this._config.person_id?.trim()) {
      return this._config.person_id.trim();
    }
    if (this._config.use_linked_user === false) {
      return null;
    }
    if (this._resolvedPersonId !== undefined) {
      return this._resolvedPersonId;
    }
    try {
      const mine = await getMyLineage(this.hass);
      this._resolvedPersonId = mine.person_id || null;
    } catch {
      this._resolvedPersonId = null;
    }
    return this._resolvedPersonId;
  }

  private async _maybeLoad() {
    if (!this.hass) return;
    const gen = ++this._loadGen;
    const personId = await this._resolvePersonId();
    if (gen !== this._loadGen) return;

    if (!personId) {
      this._tree = null;
      this._error = "";
      this._loadedFor = "";
      return;
    }
    if (personId === this._loadedFor && this._tree) return;

    this._loading = true;
    this._error = "";
    try {
      const tree = await getTree(this.hass, personId);
      if (gen !== this._loadGen) return;
      this._tree = tree;
      this._loadedFor = personId;
    } catch (err) {
      if (gen !== this._loadGen) return;
      this._tree = null;
      this._error = err instanceof Error ? err.message : tt(this.hass, "error");
      this._loadedFor = "";
    } finally {
      if (gen === this._loadGen) {
        this._loading = false;
      }
    }
  }

  protected render() {
    const title = this._config.title || tt(this.hass, "mini_tree_title");
    if (this._loading && !this._tree) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "loading")}</div>
      </ha-card>`;
    }
    if (this._error) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${this._error}</div>
      </ha-card>`;
    }
    if (!this._tree) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "empty_tree")}</div>
      </ha-card>`;
    }

    const focus = nodeName(this._tree.person as unknown as Record<string, unknown>);
    const parents = flattenParents(this._tree.parents);
    const children = flattenChildren(this._tree.children);
    const partners = partnerNames(
      this._tree.partners as unknown as Array<Record<string, unknown>>,
    );

    return html`<ha-card header=${title}>
      <div class="tree">
        ${parents.length
          ? html`<section>
              <h4>${tt(this.hass, "parents")}</h4>
              <ul>
                ${parents.map((p) => html`<li>${p.name}</li>`)}
              </ul>
            </section>`
          : nothing}
        <section class="focus">
          <div class="focus-name">${focus}</div>
        </section>
        ${partners.length
          ? html`<section>
              <h4>${tt(this.hass, "partners")}</h4>
              <ul>
                ${partners.map((n) => html`<li>${n}</li>`)}
              </ul>
            </section>`
          : nothing}
        ${children.length
          ? html`<section>
              <h4>${tt(this.hass, "children")}</h4>
              <ul>
                ${children.map((c) => html`<li>${c.name}</li>`)}
              </ul>
            </section>`
          : nothing}
      </div>
    </ha-card>`;
  }

  static styles = css`
    .pad {
      padding: 12px 16px 16px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .tree {
      padding: 8px 16px 16px;
      display: grid;
      gap: 12px;
    }
    h4 {
      margin: 0 0 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      padding: 2px 0;
    }
    .focus {
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    }
    .focus-name {
      font-size: 1.1rem;
      font-weight: 600;
    }
  `;
}

@customElement("family-tree-mini-tree-card-editor")
export class FamilyTreeMiniTreeCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: MiniTreeCardConfig = { use_linked_user: true };

  setConfig(config: MiniTreeCardConfig) {
    this._config = { use_linked_user: true, ...config };
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
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._config.use_linked_user !== false}
          @change=${(e: Event) => {
            this._config = {
              ...this._config,
              use_linked_user: (e.target as HTMLInputElement).checked,
            };
            this._fire();
          }}
        />
        Use linked Home Assistant user
      </label>
      <label>
        Person ID
        <input
          type="text"
          .value=${this._config.person_id || ""}
          placeholder="optional override"
          @change=${(e: Event) => {
            this._config = {
              ...this._config,
              person_id: (e.target as HTMLInputElement).value.trim() || undefined,
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
    label.check {
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 8px;
    }
    input[type="text"] {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }
  `;
}

registerCard({
  type: "family-tree-mini-tree-card",
  name: "Family Tree Mini Tree",
  description: "Compact parents, partners, and children for a person",
});
