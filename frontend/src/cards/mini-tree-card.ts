/** Lovelace card: compact parents / focus / partners / children. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getMyLineage, getTree, type TreePayload } from "../api";
import { renderPersonAvatar } from "../person-avatar";
import {
  flattenChildren,
  flattenParents,
  flattenPartners,
  nodeName,
  type TreeNodeSummary,
} from "../tree_view";
import type { HomeAssistant } from "../types";
import { avatarStyles } from "./avatar-styles";
import { registerCard, tt } from "./common";
import "./editor";
import { personDialogStyles, PersonDialogController } from "./person-dialog";

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
  private _personDialog = new PersonDialogController(this);

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

  disconnectedCallback() {
    super.disconnectedCallback();
    this._personDialog.disconnected();
  }

  protected firstUpdated() {
    void this._maybeLoad();
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("_config")) {
      void this._maybeLoad();
    }
    this._personDialog.ensureOpen();
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

  private _nodeButton(node: TreeNodeSummary, opts: { focus?: boolean; size?: "sm" | "md" } = {}) {
    const size = opts.size ?? "sm";
    const avatar = renderPersonAvatar(
      {
        id: node.id,
        given_names: node.name,
        call_name: "",
        surname_prefix: "",
        surname: "",
        sex: node.sex || "unknown",
        is_living: Boolean(node.is_living),
        notes: "",
        display_name: node.name,
        profile_media_id: node.profile_media_id ?? undefined,
      },
      {
        size,
        hass: this.hass,
        deceasedOverlay: true,
        isLiving: Boolean(node.is_living),
        profileMediaId: node.profile_media_id,
        title: node.name,
      },
    );
    if (!node.id) {
      return html`<div class="node ${opts.focus ? "node--focus" : ""}">
        ${avatar}
        <span class="node-name">${node.name}</span>
      </div>`;
    }
    return html`<button
      type="button"
      class="node ${opts.focus ? "node--focus" : ""}"
      @click=${() => this._personDialog.open(node.id)}
    >
      ${avatar}
      <span class="node-name">${node.name}</span>
    </button>`;
  }

  protected render() {
    const title = this._config.title || tt(this.hass, "mini_tree_title");
    if (this._loading && !this._tree) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "loading")}</div>
        ${this._personDialog.render()}
      </ha-card>`;
    }
    if (this._error) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${this._error}</div>
        ${this._personDialog.render()}
      </ha-card>`;
    }
    if (!this._tree) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "empty_tree")}</div>
        ${this._personDialog.render()}
      </ha-card>`;
    }

    const focusPerson = this._tree.person as unknown as Record<string, unknown>;
    const focus: TreeNodeSummary = {
      id: String(focusPerson.id || this._loadedFor),
      name: nodeName(focusPerson),
      sex: typeof focusPerson.sex === "string" ? focusPerson.sex : undefined,
      is_living: Boolean(focusPerson.is_living),
      profile_media_id:
        typeof focusPerson.profile_media_id === "string"
          ? focusPerson.profile_media_id
          : null,
    };
    const parents = flattenParents(this._tree.parents);
    const partners = flattenPartners(
      this._tree.partners as unknown as Array<Record<string, unknown>>,
    );
    const children = flattenChildren(this._tree.children);

    return html`<ha-card header=${title}>
      <div class="tree">
        ${parents.length
          ? html`<div class="row row--parents">
              ${parents.map((p) => this._nodeButton(p))}
            </div>
            <div class="connector connector--parents" aria-hidden="true"></div>`
          : nothing}

        <div class="row row--focus">
          ${this._nodeButton(focus, { focus: true, size: "md" })}
          ${partners.map((p) => this._nodeButton(p, { size: "md" }))}
        </div>

        ${children.length
          ? html`<div class="connector connector--children" aria-hidden="true"></div>
            <div class="row row--children">
              ${children.map((c) => this._nodeButton(c))}
            </div>`
          : nothing}
      </div>
      ${this._personDialog.render()}
    </ha-card>`;
  }

  static styles = [
    avatarStyles,
    personDialogStyles,
    css`
      .pad {
        padding: 12px 16px 16px;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .tree {
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px 16px;
        width: 100%;
      }
      .connector {
        width: 2px;
        height: 14px;
        background: var(--divider-color, rgba(0, 0, 0, 0.18));
        margin: 2px 0;
      }
      .connector--parents {
        position: relative;
      }
      .connector--parents::before {
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        width: min(120px, 40%);
        height: 2px;
        background: var(--divider-color, rgba(0, 0, 0, 0.18));
        transform: translate(-50%, -100%);
      }
      .node {
        appearance: none;
        border: none;
        background: transparent;
        padding: 6px 8px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        max-width: 110px;
        cursor: pointer;
        color: inherit;
        font: inherit;
      }
      .node:hover,
      .node:focus-visible {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        outline: none;
      }
      .node--focus {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        box-shadow: inset 0 0 0 1px var(--divider-color, rgba(0, 0, 0, 0.12));
        max-width: 140px;
      }
      .node-name {
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.25;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .node--focus .node-name {
        font-size: 0.9rem;
        font-weight: 600;
      }
    `,
  ];
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
    return html`<family-tree-card-editor-form
      .hass=${this.hass}
      .config=${this._config}
      .showPersonPicker=${true}
      .showLinkedUser=${true}
      @config-changed=${(e: CustomEvent) => {
        this._config = { use_linked_user: true, ...e.detail.config };
        this._fire();
      }}
    ></family-tree-card-editor-form>`;
  }
}

registerCard({
  type: "family-tree-mini-tree-card",
  name: "Family Tree Mini Tree",
  description: "Compact parents, partners, and children for a person",
});
