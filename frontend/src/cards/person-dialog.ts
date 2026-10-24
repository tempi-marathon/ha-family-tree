/** Vedurkort-style native <dialog> person quickview for Lovelace cards. */

import { css, html, nothing } from "lit";
import { getPerson, type PersonDetail } from "../api";
import { formatLifespanLine } from "../dates_view";
import { personDisplayName } from "../people_view";
import { renderPersonAvatar } from "../person-avatar";
import type { HomeAssistant } from "../types";
import { avatarStyles } from "./avatar-styles";
import {
  navigateToFamilyTreePerson,
  tt,
} from "./common";
import { trapFocus } from "./focus-trap";
import { lockScroll } from "./scroll-lock";

const DIALOG_CLASS = "ft-modal";

export interface PersonDialogHost {
  hass: HomeAssistant;
  renderRoot: HTMLElement | DocumentFragment;
  requestUpdate(): void;
}

/**
 * Mixin state + render helpers for cards that open a person quickview.
 * Host must call `personDialogUpdated()` from `updated()` and clean up on disconnect.
 */
export class PersonDialogController {
  openId: string | null = null;
  private _detail: PersonDetail | null = null;
  private _loading = false;
  private _error = "";
  private _loadGen = 0;
  private _unlockScroll: (() => void) | undefined;
  private _unbindFocusTrap: (() => void) | undefined;
  private _boundDialog: HTMLDialogElement | null = null;
  private _host: PersonDialogHost;

  constructor(host: PersonDialogHost) {
    this._host = host;
  }

  get isOpen(): boolean {
    return Boolean(this.openId);
  }

  open(personId: string) {
    const id = personId.trim();
    if (!id) return;
    this.openId = id;
    this._detail = null;
    this._error = "";
    this._loading = true;
    this._host.requestUpdate();
    void this._load(id);
  }

  close() {
    this.openId = null;
    this._detail = null;
    this._error = "";
    this._loading = false;
    this._closeDialogElements();
    this._host.requestUpdate();
  }

  disconnected() {
    this._closeDialogElements();
    this.openId = null;
  }

  /** Call from host `updated()` after Lit renders the dialog. */
  ensureOpen() {
    if (!this.openId) {
      this._closeDialogElements();
      return;
    }
    const root = this._host.renderRoot;
    const dlg = root.querySelector(
      `dialog.${DIALOG_CLASS}`,
    ) as HTMLDialogElement | null;
    if (!dlg) return;

    if (!dlg.open) {
      try {
        dlg.showModal();
      } catch {
        return;
      }
    }

    if (!this._unlockScroll) {
      this._unlockScroll = lockScroll(this._host as unknown as Element);
    }

    if (this._boundDialog !== dlg) {
      this._releaseDialog();
      this._boundDialog = dlg;
      dlg.focus();
      this._unbindFocusTrap = trapFocus(dlg);
    }
  }

  private async _load(id: string) {
    const gen = ++this._loadGen;
    try {
      const detail = await getPerson(this._host.hass, id);
      if (gen !== this._loadGen || this.openId !== id) return;
      this._detail = detail;
      this._error = "";
    } catch (err) {
      if (gen !== this._loadGen || this.openId !== id) return;
      this._detail = null;
      this._error = err instanceof Error ? err.message : tt(this._host.hass, "error");
    } finally {
      if (gen === this._loadGen) {
        this._loading = false;
        this._host.requestUpdate();
      }
    }
  }

  private _releaseDialog() {
    this._unbindFocusTrap?.();
    this._unbindFocusTrap = undefined;
    this._boundDialog = null;
  }

  private _closeDialogElements() {
    const root = this._host.renderRoot;
    for (const dlg of root.querySelectorAll(`dialog.${DIALOG_CLASS}`)) {
      if ((dlg as HTMLDialogElement).open) {
        (dlg as HTMLDialogElement).close();
      }
    }
    this._unlockScroll?.();
    this._unlockScroll = undefined;
    this._releaseDialog();
  }

  private _openInPanel() {
    const id = this.openId;
    if (!id) return;
    this.close();
    navigateToFamilyTreePerson(id);
  }

  render() {
    if (!this.openId) return nothing;
    const hass = this._host.hass;
    const person = this._detail?.person;
    const title = person ? personDisplayName(person) : tt(hass, "person");
    const lifespan = person
      ? formatLifespanLine({
          birth_date_text: person.birth?.date_text,
          birth_sort_date: person.birth?.sort_date,
          death_date_text: person.death?.date_text,
          death_sort_date: person.death?.sort_date,
          is_living: person.is_living,
        })
      : "";

    return html`
      <dialog
        class=${DIALOG_CLASS}
        aria-labelledby="ft-person-modal-title"
        @cancel=${(ev: Event) => {
          ev.preventDefault();
          this.close();
        }}
        @click=${(ev: MouseEvent) => {
          const dlg = ev.currentTarget as HTMLDialogElement;
          if (ev.target === dlg) this.close();
        }}
      >
        <div class="ft-modal-inner">
          <div class="ft-modal-header">
            <h2 id="ft-person-modal-title" class="ft-modal-title">${title}</h2>
            <button type="button" class="ft-modal-close" @click=${() => this.close()}>
              ${tt(hass, "close")}
            </button>
          </div>
          <div class="ft-modal-body">
            ${this._loading
              ? html`<p class="muted">${tt(hass, "loading")}</p>`
              : this._error
                ? html`<p class="muted">${this._error}</p>`
                : person
                  ? html`
                      <div class="ft-person-hero">
                        ${renderPersonAvatar(person, {
                          size: "detail",
                          hass,
                          deceasedOverlay: true,
                          isLiving: person.is_living,
                        })}
                        <div class="ft-person-hero-text">
                          <div class="ft-person-name">${personDisplayName(person)}</div>
                          ${lifespan
                            ? html`<div class="muted">${lifespan}</div>`
                            : nothing}
                        </div>
                      </div>
                      <button
                        type="button"
                        class="ft-modal-primary"
                        @click=${() => this._openInPanel()}
                      >
                        ${tt(hass, "open_in_family_tree")}
                      </button>
                    `
                  : html`<p class="muted">${tt(hass, "error")}</p>`}
          </div>
        </div>
      </dialog>
    `;
  }
}

export const personDialogStyles = css`
  .ft-modal:not([open]) {
    display: none;
  }
  .ft-modal[open] {
    display: block;
  }
  .ft-modal {
    position: fixed;
    inset: unset;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    width: min(420px, calc(100vw - 32px));
    max-height: min(85vh, 640px);
    overflow: hidden;
    overscroll-behavior: contain;
    border-radius: 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
    box-sizing: border-box;
  }
  .ft-modal:focus,
  .ft-modal:focus-visible {
    outline: none;
  }
  .ft-modal::backdrop {
    background: rgba(0, 0, 0, 0.45);
  }
  .ft-modal-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    max-height: min(85vh, 640px);
  }
  .ft-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px 12px;
    flex-shrink: 0;
  }
  .ft-modal-title {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 650;
  }
  .ft-modal-close {
    appearance: none;
    border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
    color: inherit;
    border-radius: 8px;
    padding: 6px 12px;
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }
  .ft-modal-close:hover,
  .ft-modal-close:focus-visible {
    background: var(--divider-color, rgba(0, 0, 0, 0.08));
    outline: none;
  }
  .ft-modal-body {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 0 16px 16px;
    flex: 1;
    min-height: 0;
  }
  .ft-person-hero {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 4px 0 16px;
  }
  .ft-person-hero-text {
    min-width: 0;
  }
  .ft-person-name {
    font-size: 1.05rem;
    font-weight: 600;
  }
  .ft-modal-primary {
    appearance: none;
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
    background: var(--primary-color, #03a9f4);
    color: var(--text-primary-color, #fff);
  }
  .ft-modal-primary:hover,
  .ft-modal-primary:focus-visible {
    filter: brightness(1.05);
    outline: none;
  }
  .muted {
    color: var(--secondary-text-color);
  }
`;

/** Shared list-card styles including kind colors + dialog. */
export const listCardStyles = css`
  ${avatarStyles}
  ${personDialogStyles}
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
    font-weight: 600;
  }
  .kind--birthday,
  .kind--marriage,
  .kind--partnership {
    color: var(--primary-color);
  }
  .kind--memorial,
  .kind--death {
    color: var(--secondary-text-color);
    opacity: 0.85;
  }
  .kind--anniversary,
  .kind--baptism,
  .kind--birth {
    color: var(--accent-color, var(--primary-color));
    opacity: 0.9;
  }
  .name {
    font-weight: 500;
  }
  button.linkish {
    appearance: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font: inherit;
    font-weight: 500;
    color: var(--primary-text-color);
    text-align: left;
    cursor: pointer;
  }
  button.linkish:hover,
  button.linkish:focus-visible {
    color: var(--primary-color);
    text-decoration: underline;
    outline: none;
  }
  .meta {
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .muted {
    color: var(--secondary-text-color);
  }
`;
