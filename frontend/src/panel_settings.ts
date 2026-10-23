// @ts-nocheck — host accessed via this: any after extract from FamilyTreePanel
/** Settings / user-links / GEDCOM / gazetteer render helpers. */

import { html, nothing } from "lit";
import { setUserLink } from "./api";
import type { FamilyTreePanel } from "./panel";
import { MDI_ACCOUNT_HEART, MDI_DELETE, MDI_PLUS, icon, mdButton } from "./panel_chrome";
import { personDisplayName } from "./people_view";

export function renderSettings(host: FamilyTreePanel) {
  return (function (this: any) {

  const countries = (this._gazetteer?.countries as Array<Record<string, unknown>>) || [];
  const write = this._canWrite();
  const surnameOptions = this._knownSurnames();
  const linkedUsersBody = this._renderLinkedUsersSettingsBody(write);

  const gedcomBody = html`<div class="settings-subsections form-stack">
    <div class="form-stack">
      <span class="form-stack-title">${this._tt("import_gedcom")}</span>
      ${write
        ? html`
            <label class="check">
              <input
                type="checkbox"
                .checked=${this._replaceImport}
                @change=${(e: Event) =>
                  (this._replaceImport = (e.target as HTMLInputElement).checked)}
              />
              ${this._tt("replace_import")}
            </label>
            ${mdButton(this._tt("import_gedcom"), {
              variant: "filled",
              onClick: () => this._pickGedcomFile("ft-gedcom-settings-file"),
            })}
            <input
              id="ft-gedcom-settings-file"
              class="sr-only"
              type="file"
              accept=".ged,text/plain"
              @change=${(e: Event) => this._onGedcomFilePicked(e)}
            />
          `
        : html`<p class="muted">${this._tt("read_only")}</p>`}
      ${this._importStatus ? html`<p class="muted">${this._importStatus}</p>` : nothing}
    </div>
    <div class="form-stack settings-gedcom-export">
      <span class="form-stack-title">${this._tt("export_gedcom")}</span>
      <p class="muted">${this._tt("settings_gedcom_export_hint")}</p>
      <label class="check">
        <input
          type="checkbox"
          .checked=${this._anonymizeLivingExport}
          @change=${(e: Event) =>
            (this._anonymizeLivingExport = (e.target as HTMLInputElement).checked)}
        />
        ${this._tt("anonymize_living")}
      </label>
      <p class="muted">${this._tt("anonymize_living_hint")}</p>
      ${mdButton(this._tt("export_gedcom"), {
        variant: "filled",
        onClick: () => this._exportGedcom(),
      })}
    </div>
  </div>`;

  const shortcutsBody = html`<div class="form-stack">
    <p class="muted">${this._tt("settings_shortcuts_help")}</p>
    <div class="chip-row settings-shortcut-chips">
      ${this._shortcutsDraft.map(
        (s, i) => html`<span class="chip">
          ${s}
          ${write
            ? html`<button
                type="button"
                class="linkish chip-remove"
                aria-label=${this._tt("delete")}
                @click=${() => void this._removeShortcut(i)}
              >
                ×
              </button>`
            : nothing}
        </span>`,
      )}
      ${!this._shortcutsDraft.length ? html`<span class="muted">—</span>` : nothing}
    </div>
    ${write
      ? html`<div class="inline-form">
          <input
            list="ft-surname-suggestions"
            .value=${this._shortcutInput}
            placeholder=${this._tt("settings_shortcuts_placeholder")}
            @input=${(e: Event) =>
              (this._shortcutInput = (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void this._addShortcutFromInput();
              }
            }}
          />
          <datalist id="ft-surname-suggestions">
            ${surnameOptions.map((s) => html`<option value=${s}></option>`)}
          </datalist>
          ${mdButton(this._tt("settings_shortcuts_add"), {
            variant: "filled",
            disabled: this._shortcutsSaving,
            onClick: () => void this._addShortcutFromInput(),
          })}
        </div>`
      : nothing}
  </div>`;

  const gazetteerBody = html`<div class="form-stack">
    <p class="muted">${this._tt("settings_gazetteer_countries_hint")}</p>
    <p class="muted">${countries.map((c) => `${c.code} (${c.place_count})`).join(", ") || "—"}</p>
    <div class="inline-form">
      <input
        .value=${this._gazQuery}
        placeholder=${this._tt("gazetteer_search_placeholder")}
        @input=${(e: Event) => (this._gazQuery = (e.target as HTMLInputElement).value)}
      />
      ${mdButton(this._tt("search"), {
        variant: "filled",
        onClick: () => this._runGazSearch(),
      })}
    </div>
    <ul class="plain">
      ${this._gazHits.map(
        (h) => html`<li>${h.name}${h.admin1 ? `, ${h.admin1}` : ""} (${h.country_code})</li>`,
      )}
    </ul>
  </div>`;

  return html`<div class="settings-page">
    ${this._renderCollapsibleSection(
      "settings-linked-users",
      this._tt("linked_users"),
      linkedUsersBody,
      true,
    )}
    ${this._renderCollapsibleSection(
      "settings-gedcom",
      this._tt("settings_gedcom"),
      gedcomBody,
      true,
    )}
    ${this._renderCollapsibleSection(
      "settings-shortcuts",
      this._tt("settings_shortcuts"),
      shortcutsBody,
      true,
    )}
    ${this._renderCollapsibleSection(
      "settings-gazetteer",
      this._tt("gazetteer"),
      gazetteerBody,
      false,
    )}
  </div>`;
    }).call(host);
}

export function renderUserLinkForm(host: FamilyTreePanel) {
  return (function (this: any) {

  const linkPersonMatches = this._peopleSearchMatches(this._linkPersonQuery);
  const linkUserMatches = this._haUserMatches();
  const userQuery = this._linkUserQuery.trim();
  return html`<div class="form-stack user-link-form">
    ${this._haUsersLoadError
      ? html`<p class="muted">${this._tt("ha_users_load_failed")}</p>
          <p class="muted">${this._haUsersLoadError}</p>`
      : nothing}
    <label>
      ${this._tt("link_ha_user")}
      <input
        type="search"
        .value=${this._linkUserQuery}
        placeholder=${this._tt("search_placeholder")}
        @input=${(e: Event) => {
          this._linkUserQuery = (e.target as HTMLInputElement).value;
          this._linkSelectedUserId = "";
        }}
      />
    </label>
    ${this._linkSelectedUserId
      ? html`<p class="muted">
          ${this._haUserDisplayName(this._linkSelectedUserId)}
          <button
            type="button"
            class="linkish"
            @click=${() => {
              this._linkSelectedUserId = "";
              this._linkUserQuery = "";
            }}
          >
            ×
          </button>
        </p>`
      : linkUserMatches.length
        ? html`<ul class="plain me-hits">
            ${linkUserMatches.map(
              (u) => html`<li>
                <button
                  type="button"
                  class="linkish"
                  @click=${() => {
                    this._linkSelectedUserId = u.id;
                    this._linkUserQuery = u.name || "";
                  }}
                >
                  <strong>${u.name || this._tt("linked_users")}</strong>
                </button>
              </li>`,
            )}
          </ul>`
        : userQuery && !linkUserMatches.length
          ? html`<p class="muted">${this._tt("ha_users_no_match")}</p>`
          : !userQuery && !this._haUsersLoadError
            ? html`<p class="muted">${this._tt("search_ha_users_hint")}</p>`
            : nothing}
    <label>
      ${this._tt("link_person")}
      <input
        type="search"
        .value=${this._linkPersonQuery}
        placeholder=${this._tt("search_placeholder")}
        @input=${(e: Event) => {
          this._linkPersonQuery = (e.target as HTMLInputElement).value;
          this._linkPersonId = "";
        }}
      />
    </label>
    ${this._linkPersonId
      ? html`<p class="muted">
          ${personDisplayName(
            this._people.find((p) => p.id === this._linkPersonId) || {
              id: this._linkPersonId,
              given_names: "",
              call_name: "",
              surname_prefix: "",
              surname: "",
              sex: "unknown",
              is_living: true,
              notes: "",
            },
          )}
          <button
            type="button"
            class="linkish"
            @click=${() => {
              this._linkPersonId = "";
              this._linkPersonQuery = "";
            }}
          >
            ×
          </button>
        </p>`
      : this._renderPersonSearchHits(linkPersonMatches, this._linkPersonQuery, (id) => {
          this._linkPersonId = id;
          const p = this._people.find((x) => x.id === id);
          if (p) this._linkPersonQuery = personDisplayName(p);
        })}
  </div>`;
    }).call(host);
}

export function renderLinkedUsersSettingsBody(host: FamilyTreePanel, write: boolean) {
  return (function (this: any, write: boolean) {

  const userName = this.hass?.user?.name || this.hass?.user?.id || "—";
  const myHaId = String(this.hass?.user?.id || "");
  const personId = this._lineage?.person_id;
  const linkedName = this._lineage?.person_name;
  const myLinkInGrid = this._userLinks.some((l) => String(l.ha_user_id) === myHaId);
  const matches = this._mePersonMatches();

  const linkCards = this._userLinks.length
    ? html`<div class="settings-linked-users settings-linked-grid">
        ${this._userLinks.map((l) => {
          const pid = String(l.person_id || "");
          const person = this._people.find((p) => p.id === pid);
          const haId = String(l.ha_user_id || "");
          const account = this._haUserDisplayName(haId);
          const isMe = haId === myHaId;
          const subtitle = account
            ? isMe
              ? `${account} · ${this._tt("lineage_me")}`
              : account
            : isMe
              ? this._tt("lineage_me")
              : undefined;
          return html`<div class="person-card-wrap">
            ${person
              ? this._renderPersonCard(person as unknown as Record<string, unknown>, {
                  preview: true,
                  subtitle,
                })
              : html`<div class="person-card">
                  <div class="person-card-title">${l.person_name || pid}</div>
                  ${subtitle ? html`<div class="person-card-meta">${subtitle}</div>` : nothing}
                </div>`}
            ${isMe
              ? html`<div class="rel-person-actions">
                  <button
                    type="button"
                    class="linkish danger"
                    @click=${() => void this._claimMe(null)}
                  >
                    ${this._tt("unlink_me")}
                  </button>
                </div>`
              : write
                ? html`<div class="rel-person-actions">
                    <button
                      type="button"
                      class="linkish danger"
                      @click=${async () => {
                        await setUserLink(this.hass, haId, null);
                        await this._loadSettingsExtras();
                      }}
                    >
                      ${this._tt("delete")}
                    </button>
                  </div>`
                : nothing}
          </div>`;
        })}
      </div>`
    : html`<p class="muted">—</p>`;

  return html`<div class="form-stack settings-me-body">
    ${write
      ? html`<div class="section-head">
          ${mdButton(`+ ${this._tt("add_user_link")}`, {
            variant: "filled",
            onClick: () => this._openUserLinkDialog(),
          })}
        </div>`
      : nothing}
    ${linkCards}
    ${myLinkInGrid ? nothing : html`<p class="muted settings-me-username">${userName}</p>`}
    <p class="lineage-legend muted">
      <span class="lineage-marker" aria-hidden="true">${icon(MDI_ACCOUNT_HEART)}</span>
      ${this._tt("settings_lineage_help")}
    </p>
    ${personId && !myLinkInGrid
      ? linkedName
        ? html`<p>
            <strong>${linkedName}</strong>
            <button type="button" class="linkish danger" @click=${() => void this._claimMe(null)}>
              ${this._tt("unlink_me")}
            </button>
          </p>`
        : nothing
      : !personId
        ? html`<p class="muted">${this._tt("not_linked")}</p>
            <label>
              ${this._tt("search_person")}
              <input
                type="search"
                .value=${this._meQuery}
                placeholder=${this._tt("search_placeholder")}
                @input=${(e: Event) => (this._meQuery = (e.target as HTMLInputElement).value)}
              />
            </label>
            ${this._renderPersonSearchHits(matches, this._meQuery, (id) => void this._claimMe(id))}
            <button
              type="button"
              class="linkish"
              @click=${() => (this._meCreateOpen = !this._meCreateOpen)}
            >
              ${this._tt("create_my_person")}
            </button>
            ${this._meCreateOpen
              ? html`<div class="inline-form me-create">
                  <input
                    placeholder=${this._tt("given_names")}
                    .value=${this._meForm.given_names || ""}
                    @input=${(e: Event) =>
                      (this._meForm = {
                        ...this._meForm,
                        given_names: (e.target as HTMLInputElement).value,
                      })}
                  />
                  <input
                    placeholder=${this._tt("surname")}
                    .value=${this._meForm.surname || ""}
                    @input=${(e: Event) =>
                      (this._meForm = {
                        ...this._meForm,
                        surname: (e.target as HTMLInputElement).value,
                      })}
                  />
                  <select
                    .value=${this._meForm.sex || "unknown"}
                    @change=${(e: Event) =>
                      (this._meForm = {
                        ...this._meForm,
                        sex: (e.target as HTMLSelectElement).value,
                      })}
                  >
                    <option value="male">${this._tt("sex_male")}</option>
                    <option value="female">${this._tt("sex_female")}</option>
                    <option value="unknown">${this._tt("sex_unknown")}</option>
                  </select>
                  <button type="button" @click=${() => void this._createAndClaimMe()}>
                    ${this._tt("save")}
                  </button>
                </div>`
              : nothing}`
        : nothing}
  </div>`;
    }).call(host, write);
}

