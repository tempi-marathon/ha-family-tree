// @ts-nocheck — host accessed via this: any after extract from FamilyTreePanel
/** Person detail / tabs render helpers. */

import { html, nothing } from "lit";
import type { EventDto, PersonDetail, PersonDto, TreeUnion } from "./api";
import { formatDeathCell, formatEventDate, formatLifespan } from "./date_format";
import { formatGedcomDate, formatLifespanLine } from "./dates_view";
import type { FamilyTreePanel } from "./panel";
import {
  MDI_ACCOUNT_HEART,
  MDI_BOOKMARK_OUTLINE,
  MDI_CHEVRON_DOWN,
  MDI_CHEVRON_RIGHT,
  MDI_DELETE,
  MDI_DOTS_VERTICAL,
  MDI_GENDER_FEMALE,
  MDI_GENDER_MALE,
  MDI_INFORMATION,
  MDI_PLUS,
  icon,
  mdButton,
  tooltip,
} from "./panel_chrome";
import { EVENT_TYPE_KEYS } from "./panel_shared";
import { personDisplayName } from "./people_view";
import { renderPersonAvatar } from "./person-avatar";
import { nodeName } from "./tree_view";
import { isHttpUrl } from "./url";

export function renderPerson(host: FamilyTreePanel) {
  return (function (this: any) {

  const d = this._detail!;
  const p = d.person;
  const tabs: PersonTab[] = ["details", "relationships", "tree", "sources"];
  return html`
    <div class="person-head">
      <button type="button" class="back-link" @click=${() => this._setView("people")}>
        ← ${this._tt("nav_people")}
      </button>
      <div class="person-head-main">
        ${this._canWrite()
          ? html`<button
              type="button"
              class="person-avatar-edit-btn"
              title=${this._tt("edit_profile_photo")}
              aria-label=${this._tt("edit_profile_photo")}
              @click=${() => this._openProfilePhotoEditor()}
            >
              ${renderPersonAvatar(p, {
                size: "detail",
                hass: this.hass,
                deceasedOverlay: true,
                deceasedMarkPx: 20,
              })}
              <span class="person-avatar-edit-label">${this._tt("edit")}</span>
            </button>`
          : renderPersonAvatar(p, {
              size: "detail",
              hass: this.hass,
              deceasedOverlay: true,
              deceasedMarkPx: 20,
            })}
        <div class="person-head-text">
          <h2>
            ${personDisplayName(p)}
            ${this._lineageBadge(p.id, personDisplayName(p))}
          </h2>
          ${(() => {
            const lineage = this._lineageSentence(p.id, personDisplayName(p));
            return lineage
              ? html`<p class="muted lineage-sentence">${lineage}</p>`
              : nothing;
          })()}
        </div>
      </div>
    </div>
    <div class="subtabs person-subtabs">
      <div class="subtabs-left">
        ${tabs.map(
          (tab) => html`<button class=${this._personTab === tab ? "active" : ""}
            @click=${() => (this._personTab = tab)}>${this._tt(tab)}</button>`,
        )}
      </div>
      ${this._canWrite()
        ? html`<div class="subtabs-actions">
            <button @click=${() => this._openEdit(p)}>${this._tt("edit")}</button>
            <button class="danger" @click=${() => this._deleteCurrent()}>${this._tt("delete")}</button>
          </div>`
        : nothing}
    </div>
    ${this._personTab === "details"
      ? this._renderPersonDetailsTab(d)
      : this._personTab === "relationships"
        ? this._renderRelationshipsTab(d)
        : this._personTab === "tree"
          ? this._renderTreeTab(d)
          : this._renderSourcesTab(d)}
  `;
    }).call(host);
}

export function renderPersonDetailsTab(host: FamilyTreePanel, d: PersonDetail) {
  return (function (this: any, d: PersonDetail) {

  const p = d.person;
  const lang = this.hass?.language;
  const profession = this._professionFromEvents(d.events);
  const personal = html`<dl class="kv">
    <dt>${this._tt("given_names")}</dt><dd>${p.given_names || "—"}</dd>
    <dt>${this._tt("call_name")}</dt><dd>${p.call_name || "—"}</dd>
    <dt>${this._tt("surname_prefix")}</dt><dd>${p.surname_prefix || "—"}</dd>
    <dt>${this._tt("surname")}</dt><dd>${p.surname || "—"}</dd>
    <dt>${this._tt("sex")}</dt><dd>${this._sexBadge(p.sex)}</dd>
    ${profession
      ? html`<dt>${this._tt("profession")}</dt><dd>${profession}</dd>`
      : nothing}
    <dt>${this._tt("lifespan")}</dt>
    <dd>${formatLifespan(p.birth, p.death, p.is_living, lang) || "—"}</dd>
    <dt>${this._tt("notes")}</dt><dd>${p.notes || "—"}</dd>
  </dl>`;
  const events = html`
    <div class="section-head">
      ${this._canWrite()
        ? mdButton(`+ ${this._tt("add_event")}`, {
            variant: "filled",
            onClick: () => this._openAddEvent(),
          })
        : nothing}
    </div>
    <div class="card-list">
      ${d.events.map((ev: EventDto) => this._renderEventCard(ev))}
      ${d.events.length === 0 ? html`<p class="muted">—</p>` : nothing}
    </div>
  `;
  const photos = this._renderPhotosSection(p);
  return html`
    ${this._renderCollapsibleSection("personal", this._tt("section_personal"), personal)}
    ${this._renderCollapsibleSection("photos", this._tt("section_photos"), photos)}
    ${this._renderCollapsibleSection("events", this._tt("events"), events)}
    ${this._photoLightbox
      ? html`<div
          class="photo-lightbox"
          @click=${() => (this._photoLightbox = null)}
        >
          <ft-authenticated-media-img
            class="photo-lightbox-img"
            .hass=${this.hass}
            mediaId=${this._photoLightbox}
            variant="full"
            @click=${(e: Event) => e.stopPropagation()}
          ></ft-authenticated-media-img>
        </div>`
      : nothing}
  `;
    }).call(host, d);
}

export function renderRelationshipsTab(host: FamilyTreePanel, d: PersonDetail) {
  return (function (this: any, d: PersonDetail) {

  const tree = d.tree;
  const lang = this.hass?.language;
  const parents = (tree?.parents || []) as Array<Record<string, unknown>>;
  const partners = (tree?.partners || []) as TreeUnion[];
  const write = this._canWrite();
  const canAddParents = write && parents.length < 2;

  const parentsBody = html`
    ${canAddParents
      ? html`<div class="section-head">
          <button type="button" class="linkish" @click=${() => this._openParentsDialog()}>
            ${this._tt("add_parents")}
          </button>
        </div>`
      : nothing}
    <div class="card-list rel-card-list">
      ${parents.length
        ? parents.map((parent) =>
            this._renderRelPersonCard(parent, {
              onRemove:
                write && parent.link_id
                  ? () => void this._removeParentLink(String(parent.link_id))
                  : undefined,
            }),
          )
        : html`<p class="muted">—</p>`}
    </div>
  `;

  const partnersBody = html`
    ${write
      ? html`<div class="section-head section-head-actions">
          ${mdButton(this._tt("add_partner"), {
            variant: "filled",
            onClick: () => this._openAddRelation({ kind: "partner", personId: d.person.id }),
          })}
          ${mdButton(this._tt("link_existing_person"), {
            onClick: () => this._openPickPerson("partner"),
          })}
        </div>`
      : nothing}
    ${partners.length
      ? html`<div class="card-list">
          ${partners.map((u) => {
            const unionChildren = u.children || [];
            const knownCount = u.known_children_count;
            const unknownCount =
              knownCount != null && knownCount > unionChildren.length
                ? knownCount - unionChildren.length
                : 0;
            const coParentId = String(
              (u.partners?.[0] as Record<string, unknown> | undefined)?.id || "",
            );
            return html`<div class="rel-union-card">
              <div class="rel-union-head">
                <strong>
                  ${(u.partners || [])
                    .map((pt) => String((pt as Record<string, unknown>).name || ""))
                    .filter(Boolean)
                    .join(" & ") || this._tt("partners")}
                </strong>
                ${write
                  ? html`<span class="row-actions">
                      <button
                        type="button"
                        class="linkish"
                        @click=${() => this._openUnionEdit(u.union_id)}
                      >
                        ${this._tt("edit")}
                      </button>
                      <button
                        type="button"
                        class="linkish danger"
                        @click=${() => this._deleteUnion(u.union_id)}
                      >
                        ${this._tt("delete")}
                      </button>
                    </span>`
                  : nothing}
              </div>
              ${u.marriage_date || u.divorce_date || u.known_children_count != null
                ? html`<div class="rel-union-meta">
                    ${u.marriage_date
                      ? html`<div>${this._tt("event_marriage")}: <strong>${this._formatUnionDate(u.marriage_date, lang)}</strong></div>`
                      : nothing}
                    ${u.divorce_date
                      ? html`<div>${this._tt("event_divorce")}: <strong>${this._formatUnionDate(u.divorce_date, lang)}</strong></div>`
                      : nothing}
                    ${u.known_children_count != null
                      ? html`<div>
                          ${this._tt("known_children")}:
                          <strong>${u.known_children_count}</strong>
                        </div>`
                      : nothing}
                  </div>`
                : nothing}
              <div class="rel-card-list">
                ${(u.partners || []).map((partner) =>
                  this._renderPersonCard(partner as Record<string, unknown>),
                )}
              </div>
              <div class="rel-union-children">
                <span class="muted">${this._tt("children")}</span>
                <div class="rel-card-list">
                  ${unionChildren.map((c) =>
                    this._renderPersonCard(c as Record<string, unknown>),
                  )}
                  ${this._renderChildExtras(
                    unknownCount,
                    write
                      ? () =>
                          this._openAddRelation({
                            kind: "child",
                            personId: d.person.id,
                            unionId: u.union_id,
                            coParentId,
                          })
                      : undefined,
                  )}
                </div>
                ${!unionChildren.length && !unknownCount && !write
                  ? html`<p class="muted">—</p>`
                  : nothing}
              </div>
            </div>`;
          })}
        </div>`
      : html`<p class="muted">—</p>`}
  `;

  return html`
    ${this._renderCollapsibleSection("rel-parents", this._tt("section_parents"), parentsBody, true, "cards")}
    ${this._renderCollapsibleSection("rel-partners", this._tt("section_partners"), partnersBody, true, "cards")}
  `;
    }).call(host, d);
}

export function renderTreeTab(host: FamilyTreePanel, d: PersonDetail) {
  return (function (this: any, d: PersonDetail) {

  const p = d.person;
  const tree = d.tree;
  const lang = this.hass?.language;
  const partners = (tree?.partners || []) as TreeUnion[];
  const unionIdx = Math.min(this._treeUnion, Math.max(0, partners.length - 1));
  const activeUnion = partners[unionIdx];
  const siblingCount = Number(tree?.person?.sibling_count || tree?.siblings?.length || 0);
  const focusNode = {
    id: p.id,
    name: personDisplayName(p),
    given_names: p.given_names,
    call_name: p.call_name,
    surname_prefix: p.surname_prefix,
    surname: p.surname,
    sex: p.sex,
    is_living: p.is_living,
    sibling_count: siblingCount,
    ...(tree?.person || {}),
  };
  const unionChildren = [...(activeUnion?.children || [])].sort((a, b) => {
    const da =
      typeof a.birth_sort_date === "string" ? a.birth_sort_date : "";
    const db =
      typeof b.birth_sort_date === "string" ? b.birth_sort_date : "";
    if (!da && !db) return 0;
    if (!da) return 1;
    if (!db) return -1;
    return da < db ? -1 : da > db ? 1 : 0;
  });
  const knownCount = activeUnion?.known_children_count;
  const unknownCount =
    knownCount != null && knownCount > unionChildren.length
      ? knownCount - unionChildren.length
      : 0;
  const parentNodes = this._sortParents(
    (tree?.parents || []) as Array<Record<string, unknown>>,
  );
  const father = parentNodes.find((n) => n.sex === "male") || parentNodes[0];
  const mother =
    parentNodes.find((n) => n.sex === "female" && n !== father) ||
    parentNodes.find((n) => n !== father) ||
    null;
  const canAddParents = this._canWrite() && parentNodes.length < 2;
  const gpSlots = this._grandparentSlots(tree, parentNodes);
  const marriageSubtitle = this._unionMetaSubtitle(activeUnion, lang);
  const canWrite = this._canWrite();
  const fatherGpCount = [gpSlots[0], gpSlots[1]].filter(Boolean).length;
  const motherGpCount = [gpSlots[2], gpSlots[3]].filter(Boolean).length;
  const showGpRow =
    gpSlots.some(Boolean) ||
    (canWrite &&
      ((Boolean(father) && fatherGpCount < 2) ||
        (Boolean(mother) && motherGpCount < 2)));

  const coParentId = String(
    (activeUnion?.partners?.[0] as Record<string, unknown> | undefined)?.id || "",
  );
  const onAddChild = canWrite
    ? () =>
        this._openAddRelation({
          kind: "child",
          personId: p.id,
          unionId: activeUnion?.union_id,
          coParentId,
        })
    : undefined;

  const renderParentSlot = (
    parent: Record<string, unknown> | undefined,
    missing: boolean,
  ) => {
    if (parent) return this._treeCard(parent);
    if (canAddParents && missing) {
      return html`<div class="tree-card-wrap">
        <button type="button" class="add-slot" @click=${() => this._openParentsDialog()}>
          ${icon(MDI_PLUS)} ${this._tt("add_parents")}
        </button>
      </div>`;
    }
    return this._treeCard(null);
  };

  const renderGpSlot = (
    gp: Record<string, unknown> | null,
    sideParent: Record<string, unknown> | undefined | null,
    allowAdd: boolean,
  ) => {
    if (gp) {
      return this._treeCard(gp, "", {
        stemUp: Boolean(gp.has_parent),
      });
    }
    if (allowAdd && sideParent && canWrite) {
      return this._treeAddParentsSlot(String(sideParent.id));
    }
    return this._treeCard(null);
  };

  /** One Add parents card when a side has zero grandparents; otherwise fill missing slots. */
  const renderGpPair = (
    gp0: Record<string, unknown> | null,
    gp1: Record<string, unknown> | null,
    sideParent: Record<string, unknown> | undefined | null,
    pairClass: string,
  ) => {
    const knownCount = [gp0, gp1].filter(Boolean).length;
    if (knownCount === 0 && sideParent && canWrite) {
      return html`<div class="tree-grid-pair ${pairClass}">
        ${this._treeAddParentsSlot(String(sideParent.id), "tree-card-wrap--gp-add")}
      </div>`;
    }
    return html`<div class="tree-grid-pair ${pairClass}">
      ${renderGpSlot(gp0, sideParent, knownCount === 1 && !gp0)}
      ${renderGpSlot(gp1, sideParent, knownCount === 1 && !gp1)}
    </div>`;
  };

  const showChildExtras = unknownCount > 0 || Boolean(onAddChild);
  const childChunks: Array<Array<Record<string, unknown>>> = [];
  for (let i = 0; i < unionChildren.length; i += 4) {
    childChunks.push(
      unionChildren.slice(i, i + 4).map((n) => n as Record<string, unknown>),
    );
  }
  const hasChildCards = unionChildren.length > 0;
  const hasPartnerChildren = hasChildCards || unknownCount > 0 || showChildExtras;

  return html`
    <div class="tree-scroll">
      <div class="tree-box view-tree">
        ${showGpRow
          ? this._renderTreeRow(
              this._tt("grandparents"),
              html`<div class="tree-grid-row tree-grid-row--gp">
                ${renderGpPair(gpSlots[0], gpSlots[1], father, "tree-grid-pair--left")}
                ${renderGpPair(gpSlots[2], gpSlots[3], mother, "tree-grid-pair--right")}
              </div>`,
            )
          : nothing}
        ${this._renderTreeRow(
          this._tt("parents"),
          html`<div class="tree-grid-row tree-grid-row--parents">
            ${this._treeCell(1, 2, renderParentSlot(father, !father), "tree-grid-cell--span2")}
            ${this._treeCell(3, 2, renderParentSlot(mother ?? undefined, !mother), "tree-grid-cell--span2")}
          </div>`,
        )}
        ${this._renderTreeRow(
          null,
          html`<div class="tree-grid-row tree-grid-row--focus">
            ${this._treeCell(
              2,
              2,
              this._treeCard(focusNode),
              "tree-grid-cell--center tree-grid-cell--stem-down",
            )}
          </div>`,
        )}
        ${partners.length
          ? html`<div class="union-tabs">
              ${partners.length > 1
                ? html`<div class="subtabs tree-subtabs">
                    ${partners.map(
                      (u, i) => html`<button
                        class=${i === unionIdx ? "active" : ""}
                        @click=${() => (this._treeUnion = i)}
                      >
                        ${(u.partners || [])
                          .map((pt) => String((pt as Record<string, unknown>).name || ""))
                          .filter(Boolean)
                          .join(" & ") || `${this._tt("partners")} ${i + 1}`}
                      </button>`,
                    )}
                  </div>`
                : nothing}
              ${this._renderTreeRow(
                this._tt("partners"),
                html`<div
                  class="tree-grid-row tree-grid-row--partner ${hasPartnerChildren ? "tree-grid-row--stem-down" : ""}"
                >
                  ${this._treeCell(
                    2,
                    2,
                    html`${(activeUnion?.partners || []).map((partner) =>
                      html`<div class="tree-card-wrap">
                        ${this._renderPersonCard(partner as Record<string, unknown>, {
                          subtitle: marriageSubtitle,
                        })}
                      </div>`,
                    )}`,
                    "tree-grid-cell--center",
                  )}
                </div>`,
              )}
              ${hasChildCards
                ? html`${childChunks.map((chunk, chunkIdx) => {
                    const busStyle = this._childrenBusStyle(chunk.length);
                    const multiBus = chunk.length >= 2;
                    return this._renderTreeRow(
                      chunkIdx === 0 ? this._tt("children") : null,
                      html`<div
                        class="tree-grid-row tree-grid-row--children ${chunkIdx === 0 ? "" : "tree-grid-row--children-cont"} ${multiBus ? "tree-grid-row--children-bus" : ""}"
                        style=${busStyle}
                      >
                        ${this._treeCell(
                          1,
                          4,
                          html`<div class="tree-children-group">
                            ${chunk.map((item) =>
                              this._treeCard(item, "", {
                                hideSiblings: true,
                                stemDown: Number(item.children_count || 0) > 0,
                              }),
                            )}
                          </div>`,
                          "tree-grid-cell--children-group",
                        )}
                      </div>`,
                    );
                  })}`
                : nothing}
              ${showChildExtras
                ? this._renderTreeRow(
                    hasChildCards ? null : this._tt("children"),
                    html`<div class="tree-grid-row tree-grid-row--add-child">
                      ${this._treeCell(
                        2,
                        2,
                        html`<div class="tree-card-wrap">
                          ${this._renderChildExtras(unknownCount, onAddChild)}
                        </div>`,
                        "tree-grid-cell--center",
                      )}
                    </div>`,
                  )
                : nothing}
            </div>`
          : this._canWrite()
            ? this._renderTreeRow(
                this._tt("partners"),
                html`<div class="tree-grid-row">
                  ${this._treeCell(
                    2,
                    2,
                    html`<button
                      type="button"
                      class="add-slot"
                      @click=${() => this._openAddRelation({ kind: "partner", personId: p.id })}
                    >
                      ${icon(MDI_PLUS)} ${this._tt("add_partner")}
                    </button>`,
                    "tree-grid-cell--center",
                  )}
                </div>`,
              )
            : nothing}
      </div>
    </div>
  `;
    }).call(host, d);
}

export function renderSourcesTab(host: FamilyTreePanel, d: PersonDetail) {
  return (function (this: any, d: PersonDetail) {

  const citations = d.citations || [];
  const write = this._canWrite();
  return html`
    ${write
      ? html`<div class="section-head">
          ${mdButton(`+ ${this._tt("add_source")}`, {
            variant: "filled",
            onClick: () => this._openCitationDialog(),
          })}
        </div>`
      : nothing}
    <ul class="plain source-list">
      ${citations.map((c) => {
        const title = String(c.source_title || "Source");
        const url = String(c.source_url || "");
        const author = String(c.source_author || "").trim();
        const repository = String(c.source_repository || "").trim();
        const metaParts = [author, repository].filter(Boolean);
        const titleNode =
          url && isHttpUrl(url)
            ? html`<a href=${url} target="_blank" rel="noopener">${title}</a>`
            : html`<strong>${title}</strong>`;
        return html`<li class="source-row">
          <span class="source-row-main">
            ${titleNode}
            ${c.detail ? html`<span class="muted"> — ${c.detail}</span>` : nothing}
            ${metaParts.length
              ? html`<span class="muted source-row-extra">${metaParts.join(" · ")}</span>`
              : nothing}
          </span>
          ${write
            ? html`<span class="row-actions">
                <button
                  type="button"
                  class="linkish"
                  @click=${() => this._openCitationDialog(c)}
                >
                  ${this._tt("edit")}
                </button>
                <button
                  type="button"
                  class="linkish danger"
                  @click=${() => void this._deleteCitationById(String(c.id))}
                >
                  ${this._tt("delete")}
                </button>
              </span>`
            : nothing}
        </li>`;
      })}
      ${citations.length === 0 ? html`<li class="muted">—</li>` : nothing}
    </ul>
  `;
    }).call(host, d);
}

export function renderPhotosSection(host: FamilyTreePanel, p: PersonDto) {
  return (function (this: any, p: PersonDto) {

  const items = this._personMedia;
  const profileId = p.profile_media_id;
  return html`
    ${this._canWrite()
      ? html`<div class="section-head section-head-actions">
          <input
            id="ft-person-add-photo"
            class="sr-only"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            @change=${this._onPersonPhotoFileChange}
          />
          ${mdButton(`+ ${this._tt("add_photo")}`, {
            variant: "filled",
            onClick: () => {
              const input = this.renderRoot.querySelector(
                "#ft-person-add-photo",
              ) as HTMLInputElement | null;
              input?.click();
            },
          })}
        </div>`
      : nothing}
    ${items.length === 0
      ? html`<p class="muted">${this._tt("no_photos")}</p>`
      : html`<div class="photo-grid">
          ${items.map(
            (m) => html`<div class="photo-tile">
              <button
                type="button"
                class="photo-thumb-btn"
                @click=${() => (this._photoLightbox = m.id)}
              >
                <ft-authenticated-media-img
                  .hass=${this.hass}
                  mediaId=${m.id}
                  variant="thumb"
                ></ft-authenticated-media-img>
                ${profileId === m.id
                  ? html`<span class="photo-profile-badge">${this._tt("profile_photo")}</span>`
                  : nothing}
              </button>
              ${m.caption ? html`<div class="photo-caption">${m.caption}</div>` : nothing}
              ${this._canWrite()
                ? html`<div class="photo-actions">
                    ${profileId !== m.id
                      ? html`<button type="button" class="linkish" @click=${() =>
                          this._setProfilePhoto(m.id)}>
                          ${this._tt("set_profile_photo")}
                        </button>`
                      : nothing}
                    <button
                      type="button"
                      class="linkish danger"
                      @click=${() => void this._deletePersonPhoto(m.id)}
                    >
                      ${this._tt("delete")}
                    </button>
                  </div>`
                : nothing}
            </div>`,
          )}
        </div>`}
  `;
    }).call(host, p);
}

