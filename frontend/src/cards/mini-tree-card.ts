/** Lovelace card: compact parents / focus / partners / children. */

import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getMyLineage, getTree, type TreePayload } from "../api";
import { renderPersonAvatar } from "../person-avatar";
import {
  flattenChildren,
  flattenParents,
  flattenPartners,
  flattenSiblings,
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

const MINI_CARD_WIDTH = 110;
const MINI_GAP = 12;

function groupBusStyle(count: number): string {
  if (count < 2) return "";
  const groupWidth = count * MINI_CARD_WIDTH + (count - 1) * MINI_GAP;
  const inset = ((MINI_CARD_WIDTH / 2) / groupWidth) * 100;
  return `--tree-bus-left:${inset}%;--tree-bus-right:${inset}%`;
}

@customElement("family-tree-mini-tree-card")
export class FamilyTreeMiniTreeCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config: MiniTreeCardConfig = {};
  @state() private _tree: TreePayload | null = null;
  @state() private _error = "";
  @state() private _loading = false;
  /** True when the linked HA user resolved to no person in the tree. */
  @state() private _notLinked = false;
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
    this._notLinked = false;
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
    } else if (changed.has("hass") && this.hass && !this._loadedFor && !this._loading) {
      // `hass`/connection became available after first render, or a previous
      // lineage lookup failed transiently and left us unresolved. Retry without
      // requiring a config change, page refresh, or app restart.
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
    // Let a thrown lineage lookup propagate to the caller: a transient failure
    // (e.g. the HA connection not yet ready) MUST NOT be cached, so the next
    // update can retry. Only a successful resolution is cached — including a
    // genuine "no linked person" result (null).
    const mine = await getMyLineage(this.hass);
    this._resolvedPersonId = mine.person_id || null;
    return this._resolvedPersonId;
  }

  private async _maybeLoad() {
    if (!this.hass) return;
    const gen = ++this._loadGen;
    let personId: string | null;
    try {
      personId = await this._resolvePersonId();
    } catch {
      // Transient lineage failure: leave the card unresolved (not cached) so a
      // later hass/connection-ready update retries automatically.
      if (gen === this._loadGen) this._loading = false;
      return;
    }
    if (gen !== this._loadGen) return;

    // "Not linked" applies only when the card follows the linked HA user and that
    // lookup resolved to no person — distinct from an unconfigured card.
    const usingLinkedUser =
      !this._config.person_id?.trim() && this._config.use_linked_user !== false;
    this._notLinked = usingLinkedUser && !personId;

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

  private _cardWrap(
    node: TreeNodeSummary,
    opts: { focus?: boolean; size?: "sm" | "md"; stemDown?: boolean } = {},
  ) {
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
    const wrapClass = [
      "tree-card-wrap",
      opts.stemDown ? "tree-card-wrap--stem-down" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const nodeClass = ["node", opts.focus ? "node--focus" : ""].filter(Boolean).join(" ");

    if (!node.id) {
      return html`<div class=${wrapClass}>
        <div class=${nodeClass}>
          ${avatar}
          <span class="node-name">${node.name}</span>
        </div>
      </div>`;
    }
    return html`<div class=${wrapClass}>
      <button
        type="button"
        class=${nodeClass}
        @click=${() => this._personDialog.open(node.id)}
      >
        ${avatar}
        <span class="node-name">${node.name}</span>
      </button>
    </div>`;
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
    if (this._notLinked) {
      return html`<ha-card header=${title}>
        <div class="pad muted">${tt(this.hass, "not_linked")}</div>
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
      birth_sort_date:
        typeof focusPerson.birth_sort_date === "string"
          ? focusPerson.birth_sort_date
          : null,
    };
    const focusRow = flattenSiblings(focus, this._tree.siblings);
    const parents = flattenParents(this._tree.parents);
    const partners = flattenPartners(
      this._tree.partners as unknown as Array<Record<string, unknown>>,
    );
    const children = flattenChildren(this._tree.children);
    const hasParents = parents.length > 0;
    const hasPartners = partners.length > 0;
    const hasChildren = children.length > 0;
    const focusStemDown = hasPartners || hasChildren;
    const partnerStemDown = hasChildren;
    const parentsBus = groupBusStyle(parents.length);
    const childrenBus = groupBusStyle(children.length);

    return html`<ha-card header=${title}>
      <div class="tree">
        ${hasParents
          ? html`<div
              class="tree-row tree-row--parents ${parents.length >= 2 ? "tree-row--bus" : ""}"
              style=${parentsBus}
            >
              <div class="tree-group">
                ${parents.map((p) => this._cardWrap(p, { stemDown: true }))}
              </div>
            </div>`
          : nothing}

        <div
          class="tree-row tree-row--focus ${hasParents ? "tree-row--stem-up" : ""}"
        >
          <div class="tree-group tree-group--focus">
            ${focusRow.map((p) =>
              p.id === focus.id
                ? this._cardWrap(p, {
                    focus: true,
                    size: "md",
                    stemDown: focusStemDown,
                  })
                : this._cardWrap(p, { size: "sm" }),
            )}
          </div>
        </div>

        ${hasPartners
          ? html`<div
              class="tree-row tree-row--partner tree-row--stem-up"
            >
              ${partners.map((p) =>
                this._cardWrap(p, { size: "md", stemDown: partnerStemDown }),
              )}
            </div>`
          : nothing}

        ${hasChildren
          ? html`<div
              class="tree-row tree-row--children ${children.length >= 2 ? "tree-row--bus" : ""} tree-row--stem-up"
              style=${childrenBus}
            >
              <div class="tree-group">
                ${children.map((c) => this._cardWrap(c))}
              </div>
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
        --tree-card-width: 110px;
        --tree-gap: 12px;
        --tree-connector: 0.9rem;
        --tree-row-gap: 24px;
        --tree-line-color: var(--divider-color, rgba(0, 0, 0, 0.18));
        padding: 12px 16px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
      }
      .tree-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
        gap: var(--tree-gap);
        width: 100%;
        position: relative;
        padding-bottom: var(--tree-row-gap);
      }
      .tree-row--partner {
        padding-bottom: calc(var(--tree-row-gap) / 2);
      }
      .tree-row--children {
        padding-bottom: 0;
        padding-top: calc(var(--tree-connector) + 2px);
      }
      .tree-group {
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-wrap: wrap;
        gap: var(--tree-gap);
        width: fit-content;
        max-width: 100%;
        margin-inline: auto;
        position: relative;
      }
      /* Focus + siblings share one row, capped at 3 cards wide before wrapping. */
      .tree-group--focus {
        max-width: calc(3 * var(--tree-card-width) + 2 * var(--tree-gap));
      }
      .tree-row--bus .tree-group::before {
        content: "";
        position: absolute;
        top: 100%;
        left: var(--tree-bus-left, 12.5%);
        right: var(--tree-bus-right, 12.5%);
        border-top: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-row--parents.tree-row--bus .tree-group::before {
        top: auto;
        bottom: calc(-1 * var(--tree-connector) + 0.15rem);
      }
      .tree-row--children.tree-row--bus .tree-group::before {
        top: calc(-1 * var(--tree-connector));
      }
      .tree-row--stem-up::before {
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
      .tree-row--children.tree-row--stem-up::before {
        /* Per-child stems handle single-child; multi uses bus + per-card stems */
        display: none;
      }
      .tree-row--children:not(.tree-row--bus)::before {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -1px;
        width: 0;
        height: var(--tree-connector);
        border-left: 2px solid var(--tree-line-color);
        z-index: 0;
        pointer-events: none;
      }
      .tree-card-wrap {
        position: relative;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: var(--tree-card-width);
        min-width: var(--tree-card-width);
        max-width: var(--tree-card-width);
        flex: 0 0 var(--tree-card-width);
        z-index: 1;
      }
      .tree-card-wrap--stem-down::after {
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
      .tree-row--children .tree-card-wrap::before {
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
      .tree-row--children:not(.tree-row--bus) .tree-card-wrap::before {
        display: none;
      }
      .node {
        appearance: none;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--card-background-color, var(--secondary-background-color, #fff));
        padding: 10px 8px;
        border-radius: var(--ha-border-radius-lg, 12px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        color: inherit;
        font: inherit;
        flex: 1;
        min-height: 0;
      }
      .node:hover,
      .node:focus-visible {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
        outline: none;
      }
      .node--focus {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.06));
        box-shadow: inset 0 0 0 1px var(--primary-color, rgba(3, 169, 244, 0.35));
        border-color: var(--primary-color, var(--divider-color));
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
        font-size: 0.85rem;
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
