/** Image element that loads Family Tree media via authenticated fetch. */

import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { ensureHassAuthHeaders } from "./auth";
import { personMediaApiPath, type MediaVariant } from "./media";
import type { HomeAssistant } from "./types";

export class FtAuthenticatedMediaImg extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property() public mediaId = "";
  @property() public variant: MediaVariant = "thumb";
  @property({ type: Number }) public width = 0;
  @property({ type: Number }) public height = 0;
  @property() public alt = "";

  @state() private _src = "";
  private _objectUrl: string | null = null;
  private _loadGen = 0;

  static styles = css`
    :host {
      display: contents;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: inherit;
    }
  `;

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._revokeObjectUrl();
  }

  protected override updated(changed: Map<string, unknown>): void {
    if (
      changed.has("mediaId") ||
      changed.has("variant") ||
      changed.has("hass")
    ) {
      void this._load();
    }
  }

  protected override firstUpdated(): void {
    void this._load();
  }

  private _revokeObjectUrl(): void {
    if (this._objectUrl) {
      URL.revokeObjectURL(this._objectUrl);
      this._objectUrl = null;
    }
  }

  private async _load(): Promise<void> {
    const id = this.mediaId.trim();
    const path = personMediaApiPath(id, this.variant);
    if (!path || !this.hass) {
      this._revokeObjectUrl();
      this._src = "";
      return;
    }
    const gen = ++this._loadGen;
    try {
      const headers = await ensureHassAuthHeaders(this.hass);
      // Never hit requires_auth without a Bearer — HA logs that as a ban attempt.
      if (!headers.Authorization || gen !== this._loadGen) {
        return;
      }
      const resp = await fetch(path, {
        method: "GET",
        credentials: "same-origin",
        headers,
      });
      if (!resp.ok || gen !== this._loadGen) return;
      const blob = await resp.blob();
      if (gen !== this._loadGen) return;
      this._revokeObjectUrl();
      this._objectUrl = URL.createObjectURL(blob);
      this._src = this._objectUrl;
    } catch {
      if (gen === this._loadGen) {
        this._revokeObjectUrl();
        this._src = "";
      }
    }
  }

  protected override render() {
    if (!this._src) return html``;
    return html`<img
      src=${this._src}
      alt=${this.alt}
      width=${this.width > 0 ? this.width : undefined}
      height=${this.height > 0 ? this.height : undefined}
      loading="lazy"
    />`;
  }
}

if (!customElements.get("ft-authenticated-media-img")) {
  customElements.define("ft-authenticated-media-img", FtAuthenticatedMediaImg);
}
