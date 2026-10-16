/** Shared panel chrome helpers (icons, buttons, brand). */

import { html } from "lit";
import { apiUrl } from "./media";
import type { HomeAssistant } from "./types";

export const MDI_MENU =
  "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
export const MDI_CLOSE =
  "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
export const MDI_ACCOUNT =
  "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z";
export const MDI_COG =
  "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z";
export const MDI_DELETE =
  "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
export const MDI_PLUS =
  "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
export const MDI_GENDER_MALE =
  "M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z";
export const MDI_GENDER_FEMALE =
  "M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z";
export const MDI_ACCOUNT_HEART =
  "M15,14C12.3,14 7,15.3 7,18V20H23V18C23,15.3 17.7,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,15L4.4,14.5C2.4,12.6 1,11.4 1,9.9C1,8.7 2,7.7 3.2,7.7C3.9,7.7 4.6,8 5,8.5C5.4,8 6.1,7.7 6.8,7.7C8,7.7 9,8.6 9,9.9C9,11.4 7.6,12.6 5.6,14.5L5,15Z";
export const MDI_DOTS_VERTICAL =
  "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
export const MDI_MENU_DOWN = "M7,10L12,15L17,10H7Z";
export const MDI_MENU_UP = "M7,15L12,10L17,15H7Z";
export const MDI_CHEVRON_DOWN =
  "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
export const MDI_CHEVRON_RIGHT =
  "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";
export const MDI_BOOKMARK_OUTLINE =
  "M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3Z";
export const MDI_INFORMATION =
  "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z";

export const BRAND_LOGO_URL = "/api/family_tree/brand/logo.png";
export const BRAND_LOGO_DARK_URL = "/api/family_tree/brand/dark_logo.png";

export function icon(path: string) {
  return html`<svg class="mdi" viewBox="0 0 24 24" aria-hidden="true"><path d=${path}></path></svg>`;
}

export function brandLogo(hass?: HomeAssistant, alt = "") {
  const dark = Boolean(hass?.themes?.darkMode);
  const path = dark ? BRAND_LOGO_DARK_URL : BRAND_LOGO_URL;
  const src = apiUrl(hass, path);
  return html`<img class="brand-logo" src=${src} alt=${alt} height="36" />`;
}

export function tooltip(content: string, inner: unknown) {
  return html`
    <span class="ft-tooltip" tabindex="0">
      ${inner}
      <span class="ft-tooltip__popup" role="tooltip">${content}</span>
    </span>
  `;
}

export function mdButton(
  label: string,
  opts: {
    variant?: "filled" | "outlined" | "text";
    disabled?: boolean;
    active?: boolean;
    onClick: (e: Event) => void;
  },
) {
  const variant = opts.variant ?? "outlined";
  const active = opts.active ? " md-btn-active" : "";
  return html`
    <button
      type="button"
      class="md-btn md-btn-${variant}${active}"
      ?disabled=${opts.disabled ?? false}
      @click=${opts.onClick}
    >
      ${label}
    </button>
  `;
}
