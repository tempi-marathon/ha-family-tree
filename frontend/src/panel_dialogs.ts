// @ts-nocheck — host accessed via this: any after extract from FamilyTreePanel
/** Dialog render helpers for FamilyTreePanel. */

import { html, nothing } from "lit";
import type { PersonDto } from "./api";
import { FORM_QUALIFIERS, formatLifespan } from "./date_format";
import type { FamilyTreePanel } from "./panel";
import { icon, mdButton, MDI_CLOSE, tooltip } from "./panel_chrome";
import {
  PERSON_DIALOG_BIRTH,
  PERSON_DIALOG_DECEASED,
  PERSON_DIALOG_PERSONAL,
  PERSON_EVENT_TYPES,
  QUALIFIER_KEYS,
  UNIQUE_PERSON_EVENT_TYPES,
} from "./panel_shared";
import { personDisplayName } from "./people_view";
import { renderPersonAvatar } from "./person-avatar";
import { PROFILE_CROP_CANVAS_PX } from "./profile-photo-editor";

export function renderImportDialogBody(host: FamilyTreePanel) {
  return (function (this: any) {

  const report = this._importReport || {};
  const phase = this._importPhase;
  if (phase === "importing" || (phase === "preview" && !this._importReport && this._importStatus)) {
    return html`<p class="muted">${this._importStatus || this._tt("importing")}</p>`;
  }
  const done = phase === "done";
  return html`
    ${done
      ? html`<p>${this._tt("import_complete_hint")}</p>`
      : this._importFileName
        ? html`<p class="muted">${this._importFileName}</p>`
        : nothing}
    ${!done && this._replaceImport
      ? html`<p class="error" role="alert">${this._tt("replace_warning")}</p>`
      : nothing}
    <ul class="plain import-counts">
      <li><span>${this._tt("import_persons")}</span><strong>${report.persons ?? 0}</strong></li>
      <li><span>${this._tt("import_unions")}</span><strong>${report.unions ?? 0}</strong></li>
      <li><span>${this._tt("import_events")}</span><strong>${report.events ?? 0}</strong></li>
      <li><span>${this._tt("import_sources")}</span><strong>${report.sources ?? 0}</strong></li>
      <li><span>${this._tt("import_places")}</span><strong>${report.places ?? 0}</strong></li>
    </ul>
  `;
    }).call(host);
}

export function renderDialog(host: FamilyTreePanel) {
  return (function (this: any) {

  const write = this._canWrite();
  const mode = this._dialogMode;
  const dialogTitle =
    mode === "import"
      ? this._importPhase === "done"
        ? this._tt("import_complete")
        : this._tt("import_preview")
      : mode === "union"
        ? this._tt("edit")
        : mode === "pickPerson"
          ? this._tt("link_existing_person")
          : mode === "parents"
            ? this._tt("add_parents")
            : mode === "citation"
              ? this._editingCitationId
                ? this._tt("edit_source")
                : this._tt("add_source")
            : mode === "siblings"
              ? this._tt("siblings_of").replace("%s", this._siblingsPersonName || "")
              : mode === "preview"
                ? this._previewDetail
                  ? personDisplayName(this._previewDetail.person)
                  : this._tt("details")
                : mode === "profilePhoto"
                  ? this._tt("edit_profile_photo")
                : mode === "userLink"
                  ? this._tt("add_user_link")
                : mode === "event"
                ? this._editingEventId
                  ? this._tt("edit_event")
                  : this._tt("add_event")
                : this._editing
                  ? personDisplayName(this._editing)
                  : this._relationTarget
                    ? this._tt("add_person")
                    : this._tt("add_person");

  const deceasedOn = this._form.deceased === "true";
  const personalBody = html`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt("given_names"), write)}
      <input
        class=${this._fieldInvalid("given_names") ? "invalid" : ""}
        .value=${this._form.given_names || ""}
        ?disabled=${!write}
        @input=${(e: Event) => this._onPersonField("given_names", e)}
      />
      ${this._fieldError("given_names")}
    </label>
    <label
      >${this._fieldLabel(this._tt("call_name"))}
      <input
        .value=${this._form.call_name || ""}
        ?disabled=${!write}
        @input=${(e: Event) => this._onPersonField("call_name", e)}
      />
    </label>
    <div class="row2">
      <label
        >${this._tt("surname_prefix")}
        <input
          .value=${this._form.surname_prefix || ""}
          ?disabled=${!write}
          @input=${(e: Event) =>
            (this._form = {
              ...this._form,
              surname_prefix: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
      <label
        >${this._tt("surname")}
        <input
          .value=${this._form.surname || ""}
          ?disabled=${!write}
          @input=${(e: Event) =>
            (this._form = {
              ...this._form,
              surname: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
    </div>
    <label
      >${this._tt("sex")}
      <select
        .value=${this._form.sex || "unknown"}
        ?disabled=${!write}
        @change=${(e: Event) =>
          (this._form = {
            ...this._form,
            sex: (e.target as HTMLSelectElement).value,
          })}
      >
        <option value="male">${this._tt("sex_male")}</option>
        <option value="female">${this._tt("sex_female")}</option>
        <option value="intersex">${this._tt("sex_intersex")}</option>
        <option value="unknown">${this._tt("sex_unknown")}</option>
      </select>
    </label>
    <label
      >${this._tt("profession")}
      <input
        .value=${this._form.profession || ""}
        ?disabled=${!write}
        @input=${(e: Event) => this._onPersonField("profession", e)}
      />
    </label>
    <label
      >${this._tt("notes")}
      <textarea
        rows="3"
        .value=${this._form.notes || ""}
        ?disabled=${!write}
        @input=${(e: Event) =>
          (this._form = {
            ...this._form,
            notes: (e.target as HTMLTextAreaElement).value,
          })}
      ></textarea>
    </label>
  </div>`;

  const birthBody = html`<div class="form-stack">
    ${this._renderPersonPlaceField("birth_place", this._tt("birth_place"), write)}
    ${this._renderPersonVitalDateField("birth", this._tt("col_birth"), write)}
  </div>`;

  const deceasedBody = html`<div class="form-stack">
    <label class="check-row"
      >${this._tt("deceased")}
      <span class="check-control">
        <input
          type="checkbox"
          .checked=${deceasedOn}
          ?disabled=${!write}
          @change=${(e: Event) => {
            const checked = (e.target as HTMLInputElement).checked;
            this._form = {
              ...this._form,
              deceased: checked ? "true" : "false",
              ...(checked
                ? {}
                : {
                    death_place: "",
                    death_date_mode: "simple",
                    death_date_iso: "",
                    death_date_qualifier: "exact",
                    death_date_first: "",
                    death_date_second: "",
                  }),
            };
          }}
        />
      </span>
    </label>
    ${!deceasedOn && this._editing && this._editing.is_living === false
      ? html`<p class="muted" role="status">${this._tt("revive_unions_hint")}</p>`
      : nothing}
    ${deceasedOn
      ? html`
          ${this._renderPersonPlaceField("death_place", this._tt("death_place"), write)}
          ${this._renderPersonVitalDateField("death", this._tt("col_death"), write)}
        `
      : nothing}
  </div>`;

  const personBody = html`
    ${this._renderCollapsibleSection(
      PERSON_DIALOG_PERSONAL,
      this._tt("section_personal"),
      personalBody,
      true,
    )}
    ${this._renderCollapsibleSection(
      PERSON_DIALOG_BIRTH,
      this._tt("section_birth"),
      birthBody,
      true,
    )}
    ${this._renderCollapsibleSection(
      PERSON_DIALOG_DECEASED,
      this._tt("section_deceased"),
      deceasedBody,
      false,
    )}
  `;

  const usedTypes = this._usedUniqueEventTypes();
  const advancedDate = (this._eventForm.date_mode || "simple") === "advanced";
  const needsSecondDate =
    advancedDate &&
    (this._eventForm.date_qualifier === "between" ||
      this._eventForm.date_qualifier === "from_to");
  const eventBody = html`
    <div class="form-stack">
      <label
        >${this._tt("events")}
        <select
          .value=${this._eventForm.event_type || "birth"}
          @change=${(e: Event) =>
            (this._eventForm = {
              ...this._eventForm,
              event_type: (e.target as HTMLSelectElement).value,
            })}
        >
          ${PERSON_EVENT_TYPES.map((t) => {
            const disabled =
              UNIQUE_PERSON_EVENT_TYPES.has(t) && usedTypes.has(t);
            return html`<option value=${t} ?disabled=${disabled}>
              ${this._plainEventTypeLabel(t)}${disabled ? ` (${this._tt("already_added")})` : ""}
            </option>`;
          })}
        </select>
      </label>
      <div class="event-date-field">
        ${advancedDate
          ? html`<label
              >${this._tt("date_qualifier")}
              <select
                @change=${(e: Event) =>
                  (this._eventForm = {
                    ...this._eventForm,
                    date_qualifier: (e.target as HTMLSelectElement).value,
                  })}
              >
                ${FORM_QUALIFIERS.map((q) => {
                  const current = this._eventForm.date_qualifier || "exact";
                  return html`<option value=${q} ?selected=${q === current}
                    >${this._tt(QUALIFIER_KEYS[q])}</option
                  >`;
                })}
              </select>
            </label>
            <label
              >${this._tt("date")}
              <input
                .value=${this._eventForm.date_first || ""}
                placeholder=${this._tt("date_gedcom_hint")}
                @input=${(e: Event) =>
                  (this._eventForm = {
                    ...this._eventForm,
                    date_first: (e.target as HTMLInputElement).value,
                  })}
              />
            </label>
            ${needsSecondDate
              ? html`<label
                  >${this._tt("date_second")}
                  <input
                    .value=${this._eventForm.date_second || ""}
                    placeholder=${this._tt("date_gedcom_hint")}
                    @input=${(e: Event) =>
                      (this._eventForm = {
                        ...this._eventForm,
                        date_second: (e.target as HTMLInputElement).value,
                      })}
                  />
                </label>`
              : nothing}
            <button
              type="button"
              class="linkish date-mode-toggle"
              @click=${() => this._toggleEventDateMode()}
            >
              ${this._tt("date_simple")}
            </button>`
          : html`<div class="date-input-row">
              <div class="date-label-grow">
                <span class="field-label">${this._tt("date")}</span>
                ${tooltip(
                  this._tt("date"),
                  html`<input
                    type="date"
                    .value=${this._eventForm.date_iso || ""}
                    @input=${(e: Event) =>
                      (this._eventForm = {
                        ...this._eventForm,
                        date_iso: (e.target as HTMLInputElement).value,
                      })}
                  />`,
                )}
              </div>
              <button
                type="button"
                class="linkish date-mode-toggle"
                @click=${() => this._toggleEventDateMode()}
              >
                ${this._tt("date_advanced")}
              </button>
            </div>`}
      </div>
      <label class="place-field"
        >${this._fieldLabel(this._tt("place"))}
        <input
          .value=${this._eventForm.place || ""}
          @input=${(e: Event) => {
            const value = (e.target as HTMLInputElement).value;
            this._eventForm = { ...this._eventForm, place: value };
            this._schedulePlaceSearch(value);
          }}
          @focus=${() => {
            if (this._placeSuggestions.length) this._placeSuggestOpen = true;
          }}
          @blur=${() => {
            setTimeout(() => {
              this._placeSuggestOpen = false;
            }, 150);
          }}
        />
        ${this._placeSuggestOpen && this._placeSuggestions.length
          ? html`<ul class="place-suggest">
              ${this._placeSuggestions.map(
                (pl) => html`<li>
                  <button
                    type="button"
                    @mousedown=${() => {
                      this._eventForm = { ...this._eventForm, place: pl.name };
                      this._placeSuggestOpen = false;
                    }}
                  >
                    ${pl.name}
                  </button>
                </li>`,
              )}
            </ul>`
          : nothing}
      </label>
      <label
        >${this._tt("description")}
        <input
          .value=${this._eventForm.description || ""}
          @input=${(e: Event) =>
            (this._eventForm = {
              ...this._eventForm,
              description: (e.target as HTMLInputElement).value,
            })}
        />
      </label>
    </div>
  `;

  const unionBody = html`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt("union_status"))}
      <select
        .value=${this._unionForm.status || "ongoing"}
        @change=${(e: Event) =>
          (this._unionForm = {
            ...this._unionForm,
            status: (e.target as HTMLSelectElement).value,
          })}
      >
        <option value="ongoing">${this._tt("status_ongoing")}</option>
        <option value="divorced">${this._tt("status_divorced")}</option>
        <option value="separated">${this._tt("status_separated")}</option>
        <option value="widowed">${this._tt("status_widowed")}</option>
      </select>
    </label>
    <label
      >${this._fieldLabel(this._tt("known_children"))}
      <input
        type="number"
        min="0"
        .value=${this._unionForm.known_children_count || ""}
        @input=${(e: Event) =>
          (this._unionForm = {
            ...this._unionForm,
            known_children_count: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt("event_marriage"))}
      <input
        .value=${this._unionForm.marriage_date || ""}
        placeholder=${this._tt("date_gedcom_hint")}
        @input=${(e: Event) =>
          (this._unionForm = {
            ...this._unionForm,
            marriage_date: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt("place"))}
      <input
        .value=${this._unionForm.marriage_place || ""}
        @input=${(e: Event) =>
          (this._unionForm = {
            ...this._unionForm,
            marriage_place: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._fieldLabel(this._tt("union_notes"))}
      <textarea
        rows="2"
        .value=${this._unionForm.notes || ""}
        @input=${(e: Event) =>
          (this._unionForm = {
            ...this._unionForm,
            notes: (e.target as HTMLTextAreaElement).value,
          })}
      ></textarea>
    </label>
  </div>`;

  const pickMatches = this._pickPersonMatches();
  const pickBody = html`<div class="form-stack">
    <label
      >${this._fieldLabel(this._tt("search_to_link"))}
      <input
        type="search"
        .value=${this._pickPersonQuery}
        placeholder=${this._tt("search_placeholder")}
        @input=${(e: Event) =>
          (this._pickPersonQuery = (e.target as HTMLInputElement).value)}
      />
    </label>
    <ul class="plain me-hits">
      ${pickMatches.map(
        (p) => html`<li>
          <button type="button" class="linkish" @click=${() => void this._linkPickedPerson(p.id)}>
            ${personDisplayName(p)}
          </button>
        </li>`,
      )}
      ${!pickMatches.length && this._pickPersonQuery
        ? html`<li class="muted">—</li>`
        : nothing}
    </ul>
  </div>`;

  const citationBody = html`<div class="form-stack">
    <label
      >${this._tt("source_title")}
      <input
        .value=${this._citationForm.title || ""}
        @input=${(e: Event) =>
          (this._citationForm = {
            ...this._citationForm,
            title: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._tt("source_url")}
      <input
        type="url"
        .value=${this._citationForm.url || ""}
        @input=${(e: Event) =>
          (this._citationForm = {
            ...this._citationForm,
            url: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._tt("source_author")}
      <input
        .value=${this._citationForm.author || ""}
        @input=${(e: Event) =>
          (this._citationForm = {
            ...this._citationForm,
            author: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._tt("source_repository")}
      <input
        .value=${this._citationForm.repository || ""}
        @input=${(e: Event) =>
          (this._citationForm = {
            ...this._citationForm,
            repository: (e.target as HTMLInputElement).value,
          })}
      />
    </label>
    <label
      >${this._tt("citation_detail")}
      <textarea
        rows="3"
        .value=${this._citationForm.detail || ""}
        @input=${(e: Event) =>
          (this._citationForm = {
            ...this._citationForm,
            detail: (e.target as HTMLTextAreaElement).value,
          })}
      ></textarea>
    </label>
  </div>`;

  const userLinkBody = this._renderUserLinkForm();

  const parentsBody = html`<div class="form-stack parent-link-form">
    ${this._renderParentLinkSlot("father")}
    ${this._renderParentLinkSlot("mother")}
  </div>`;

  const profilePhotoBody = html`<div class="form-stack profile-photo-editor">
    <label class="file-btn">
      ${this._tt("profile_photo_choose")}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        @change=${this._onProfilePhotoFileChange}
      />
    </label>
    <div class="profile-crop-wrap">
      <canvas
        id="profile-crop-canvas"
        class="profile-crop-canvas"
        width=${PROFILE_CROP_CANVAS_PX}
        height=${PROFILE_CROP_CANVAS_PX}
        @pointerdown=${this._onProfileCropPointerDown}
        @pointermove=${this._onProfileCropPointerMove}
        @pointerup=${this._onProfileCropPointerUp}
        @pointercancel=${this._onProfileCropPointerUp}
      ></canvas>
      ${!this._profileCropHasImage
        ? html`<p class="muted profile-crop-hint">${this._tt("profile_photo_choose")}</p>`
        : nothing}
    </div>
    ${this._profileCropHasImage
      ? html`<label class="profile-zoom-label">
          ${this._tt("profile_photo_zoom")}
          <input
            type="range"
            min="1"
            max="3"
            step="0.02"
            .value=${String(this._profileCropTransform.scale)}
            @input=${this._onProfileCropZoom}
          />
        </label>`
      : nothing}
  </div>`;

  const siblingsBody = this._siblingsLoading
    ? html`<p class="muted">${this._tt("loading")}</p>`
    : html`<div class="siblings-grid">
        ${this._siblingsList.map((s) => {
          const relation = String(s.relation || "");
          const subtitle =
            relation === "half_sibling" ? this._tt("half_sibling") : undefined;
          return this._renderPersonCard(s as Record<string, unknown>, {
            hideSiblings: true,
            subtitle,
          });
        })}
        ${!this._siblingsList.length ? html`<p class="muted">—</p>` : nothing}
      </div>`;

  const preview = this._previewDetail;
  const lang = this.hass?.language;
  const previewBody = this._previewLoading
    ? html`<p class="muted">${this._tt("loading")}</p>`
    : preview
      ? html`<div class="preview-body">
          <dl class="kv">
            <dt>${this._tt("given_names")}</dt>
            <dd>${preview.person.given_names || "—"}</dd>
            <dt>${this._tt("call_name")}</dt>
            <dd>${preview.person.call_name || "—"}</dd>
            <dt>${this._tt("surname")}</dt>
            <dd>
              ${[preview.person.surname_prefix, preview.person.surname]
                .filter(Boolean)
                .join(" ") || "—"}
            </dd>
            <dt>${this._tt("sex")}</dt>
            <dd>${this._sexBadge(preview.person.sex)}</dd>
            ${preview.person.birth || preview.person.death
              ? html`<dt>${this._tt("lifespan")}</dt>
                  <dd>
                    ${formatLifespan(
                      preview.person.birth,
                      preview.person.death,
                      preview.person.is_living,
                      lang,
                    ) || "—"}
                  </dd>`
              : nothing}
            ${preview.person.notes
              ? html`<dt>${this._tt("notes")}</dt><dd>${preview.person.notes}</dd>`
              : nothing}
          </dl>
        </div>`
      : html`<p class="muted">—</p>`;

  const actions =
    mode === "import"
      ? html`
          ${mdButton(this._tt(this._importPhase === "done" ? "close" : "cancel"), {
            variant: "text",
            disabled: this._importPhase === "importing",
            onClick: this._closeDialog,
          })}
          ${this._importPhase === "preview" && this._importReport
            ? mdButton(this._tt("confirm_import"), {
                variant: "filled",
                onClick: () => void this._confirmImport(),
              })
            : nothing}
        `
      : mode === "union"
        ? html`
            ${mdButton(this._tt("cancel"), {
              variant: "text",
              onClick: this._closeDialog,
            })}
            ${mdButton(this._tt("save"), {
              variant: "filled",
              disabled: this._saving,
              onClick: () => void this._saveUnionForm(),
            })}
          `
        : mode === "pickPerson"
          ? mdButton(this._tt("close"), {
              variant: "text",
              onClick: this._closeDialog,
            })
          : mode === "parents"
            ? mdButton(this._tt("close"), {
                variant: "text",
                onClick: this._closeDialog,
              })
            : mode === "citation"
              ? html`
                  ${mdButton(this._tt("cancel"), {
                    variant: "text",
                    onClick: this._closeDialog,
                  })}
                  ${mdButton(this._tt("save"), {
                    variant: "filled",
                    disabled: this._saving,
                    onClick: () => void this._saveCitationForm(),
                  })}
                `
            : mode === "siblings"
        ? mdButton(this._tt("close"), {
            variant: "text",
            onClick: this._closeDialog,
          })
        : mode === "preview"
          ? html`
              ${mdButton(this._tt("close"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${preview
                ? html`
                    ${mdButton(this._tt("view_full_profile"), {
                      variant: "outlined",
                      onClick: () => {
                        const id = preview.person.id;
                        this._closeDialog();
                        void this._openPerson(id);
                      },
                    })}
                    ${mdButton(this._tt("view_tree_action"), {
                      variant: "outlined",
                      onClick: () => {
                        const id = preview.person.id;
                        this._closeDialog();
                        void this._openPerson(id, "tree");
                      },
                    })}
                    ${write
                      ? mdButton(this._tt("edit"), {
                          variant: "filled",
                          onClick: () => {
                            this._closeDialog();
                            this._openEdit(preview.person);
                          },
                        })
                      : nothing}
                  `
                : nothing}
            `
        : mode === "profilePhoto"
          ? html`
              ${mdButton(this._tt("cancel"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${mdButton(this._tt("save"), {
                variant: "filled",
                disabled: this._saving || !this._profileCropHasImage,
                onClick: () => void this._saveProfilePhoto(),
              })}
            `
        : mode === "userLink"
          ? html`
              ${mdButton(this._tt("cancel"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${mdButton(this._tt("save"), {
                variant: "filled",
                disabled: !this._linkSelectedUserId || !this._linkPersonId,
                onClick: () => void this._saveUserLinkFromForm(),
              })}
            `
        : mode === "event"
          ? html`
              ${mdButton(this._tt("cancel"), {
                variant: "text",
                onClick: this._closeDialog,
              })}
              ${mdButton(this._tt("save"), {
                variant: "filled",
                disabled: this._saving,
                onClick: () => void this._saveEvent(),
              })}
            `
          : html`
            ${mdButton(this._tt(write ? "cancel" : "close"), {
              variant: "text",
              onClick: this._closeDialog,
            })}
            ${write
              ? mdButton(this._tt("save"), {
                  variant: "filled",
                  disabled: this._saving,
                  onClick: () => void this._savePerson(),
                })
              : nothing}
          `;

  return html`
    <div class="dialog-backdrop">
      <div
        class="dialog ${this.narrow ? "dialog-narrow" : ""}"
        role="dialog"
        aria-modal="true"
        aria-label=${dialogTitle}
        @click=${(e: Event) => e.stopPropagation()}
      >
        <div class="dialog-header">
          <h2 class=${mode === "preview" && preview ? "dialog-preview-head" : ""}>
            ${mode === "preview" && preview
              ? html`${renderPersonAvatar(preview.person, {
                  size: "md",
                  hass: this.hass,
                  deceasedOverlay: true,
                  deceasedMarkPx: 16,
                })}
                  <span class="dialog-preview-head-text">
                    <span class="dialog-title-row">
                      <span class="dialog-title-text"
                        >${personDisplayName(preview.person)}</span
                      >
                      ${this._lineageBadge(
                        preview.person.id,
                        personDisplayName(preview.person),
                      )}
                    </span>
                    ${(() => {
                      const lineage = this._lineageSentence(
                        preview.person.id,
                        personDisplayName(preview.person),
                      );
                      return lineage
                        ? html`<span class="muted lineage-sentence">${lineage}</span>`
                        : nothing;
                    })()}
                  </span>`
              : dialogTitle}
          </h2>
          <button
            type="button"
            class="icon-btn dialog-close"
            aria-label=${this._tt("cancel")}
            ?disabled=${mode === "import" && this._importPhase === "importing"}
            @click=${this._closeDialog}
          >
            ${icon(MDI_CLOSE)}
          </button>
        </div>

        <div class="dialog-body">
          ${mode === "import"
            ? this._renderImportDialogBody()
            : mode === "union"
              ? unionBody
              : mode === "pickPerson"
                ? pickBody
                : mode === "parents"
                  ? parentsBody
                  : mode === "citation"
                    ? citationBody
                  : mode === "siblings"
                    ? siblingsBody
                    : mode === "preview"
                      ? previewBody
                      : mode === "profilePhoto"
                        ? profilePhotoBody
                      : mode === "userLink"
                        ? userLinkBody
                      : mode === "event"
                      ? eventBody
                      : personBody}

          ${this._error && mode !== "import"
            ? html`<div class="error" role="alert">${this._error}</div>`
            : nothing}
        </div>

        <div class="dialog-actions">${actions}</div>
      </div>
    </div>
  `;
    }).call(host);
}

