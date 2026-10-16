import { css } from "lit";
import { PROFILE_CROP_CANVAS_PX } from "./profile-photo-editor";

export const panelStyles = css`
    :host {
      display: block;
      height: 100%;
      color: var(--primary-text-color);
      background: var(--primary-background-color, transparent);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .shell {
      margin: 0 auto;
      padding: 20px 24px 48px;
      box-sizing: border-box;
      width: 100%;
    }
    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .brand-logo {
      height: 36px;
      width: auto;
      display: block;
      object-fit: contain;
    }
    .tabs { display: flex; flex-wrap: wrap; gap: 4px; margin-left: auto; }
    .tabs button, .subtabs button, .toolbar button:not(.md-btn), .inline-form button:not(.md-btn), .row-actions button:not(.md-btn), .chip {
      appearance: none;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      border-radius: var(--ha-border-radius-pill, 9999px);
      padding: 6px 12px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tabs button.active, .subtabs button.active, .chip.on {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      border-color: transparent;
    }
    button.danger { color: var(--error-color); }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--primary-text-color);
      cursor: pointer;
      flex-shrink: 0;
    }
    .icon-btn:hover {
      background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.06);
    }
    .icon-btn svg { width: 24px; height: 24px; }
    .mdi { width: 20px; height: 20px; fill: currentColor; display: block; }
    .banner, .error {
      padding: 8px 12px;
      border-radius: var(--ha-border-radius-md, 8px);
      margin: 0 0 12px;
    }
    .banner { background: var(--secondary-background-color); }
    .error { background: color-mix(in srgb, var(--error-color) 18%, transparent); color: var(--error-color); }
    .muted { color: var(--secondary-text-color); font-size: 0.9em; }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .stat {
      padding: 16px;
      border-radius: var(--ha-border-radius-md, 8px);
      border-left: 3px solid var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .stat-n { display: block; font-size: 1.5rem; font-weight: 600; }
    .stat-label {
      display: block;
      margin-top: 4px;
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }
    .family-stats-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }
    .family-stat {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      text-align: left;
      padding: 16px;
      border: none;
      border-radius: var(--ha-border-radius-md, 8px);
      border-left: 3px solid var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
      color: inherit;
      cursor: pointer;
      font: inherit;
    }
    .family-stat-name {
      font-weight: 600;
      font-size: 0.95rem;
      line-height: 1.25;
      word-break: break-word;
    }
    .family-stat-n {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-top: 6px;
    }
    .family-stat-span {
      font-size: 0.85rem;
      margin-top: 4px;
    }
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .chart-card {
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .chart-card h3 { margin: 0 0 8px; font-size: 0.95rem; font-weight: 500; }
    .chart-wrap { height: 200px; position: relative; }
    .two-col {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }
    .dashboard-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: start;
    }
    @media (max-width: 960px) {
      .dashboard-row {
        grid-template-columns: 1fr;
      }
    }
    .dashboard-panel {
      padding: 12px;
      border-radius: var(--ha-card-border-radius, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: var(--ha-card-box-shadow, none);
      margin-bottom: 0;
    }
    .dashboard-linked-cards {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .parent-slot-row {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .parent-slot-head {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .source-row {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: 8px;
    }
    .source-row-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .source-row-extra {
      display: block;
      font-size: 0.85em;
    }
    .block { margin-bottom: 20px; }
    .block h3 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 500; }
    .heading-with-tip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .info-tip {
      display: inline-flex;
      color: var(--secondary-text-color);
      cursor: help;
    }
    .info-tip svg { width: 16px; height: 16px; }
    .ft-tooltip {
      position: relative;
      display: inline-flex;
      align-items: center;
    }
    .ft-tooltip__popup {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      padding: 6px 10px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font-size: 0.8rem;
      line-height: 1.35;
      max-width: 240px;
      white-space: normal;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      opacity: 0;
      pointer-events: none;
      z-index: 99999;
      transition: opacity 0.15s;
      width: max-content;
    }
    .ft-tooltip:hover .ft-tooltip__popup,
    .ft-tooltip:focus-visible .ft-tooltip__popup {
      opacity: 1;
    }
    ul.plain, ul.people { list-style: none; padding: 0; margin: 0; }
    ul.plain li, ul.people li {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--divider-color);
    }
    .person-row, .linkish {
      appearance: none; border: none; background: none; color: var(--primary-color);
      font: inherit; cursor: pointer; text-align: left; display: inline-flex; gap: 8px; align-items: center;
    }
    .person-row { color: inherit; width: 100%; padding: 8px 0; }
    .toolbar {
      display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; align-items: center;
    }
    .toolbar input[type="search"], .toolbar select, .filters select, .filters input[type="date"],
    .inline-form input, .inline-form select,
    .dialog input, .dialog select, .dialog textarea,
    .settings-me-body input, .settings-me-body select,
    .user-link-form input {
      font: inherit;
      padding: 8px 12px;
      min-height: 40px;
      border-radius: var(--ha-border-radius-lg, 12px);
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--primary-background-color));
      color: var(--primary-text-color);
      box-sizing: border-box;
      width: 100%;
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23666' d='M1.41 0L6 4.58 10.59 0 12 1.41 6 7.41 0 1.41z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 36px;
    }
    .toolbar input[type="search"] { flex: 1; min-width: 160px; width: auto; }
    .toolbar select, .filters select, .filters input[type="date"] { width: auto; }
    .filters {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .date-filter {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-left: auto;
    }
    .subtabs { display: flex; gap: 4px; margin-bottom: 16px; flex-wrap: wrap; }
    .kv { display: grid; grid-template-columns: 140px 1fr; gap: 6px 12px; margin: 0 0 16px; }
    .kv dt { color: var(--secondary-text-color); }
    .kv dd { margin: 0; }
    .person-head {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 16px;
      padding: 12px 0;
    }
    .person-head h2 { margin: 0; font-size: 1.3rem; font-weight: 500; }
    .person-avatar-edit-btn {
      appearance: none;
      border: none;
      padding: 0;
      margin: 0;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      flex-shrink: 0;
      line-height: 0;
      position: relative;
    }
    .person-avatar-edit-label {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-primary-color, #fff);
      background: color-mix(in srgb, var(--primary-text-color, #000) 45%, transparent);
      opacity: 0;
      transition: opacity 0.15s ease;
      pointer-events: none;
    }
    .person-avatar-edit-btn:hover .person-avatar-edit-label,
    .person-avatar-edit-btn:focus-visible .person-avatar-edit-label {
      opacity: 1;
    }
    .person-avatar-edit-btn:hover,
    .person-avatar-edit-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .tree-scroll {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      width: 100%;
    }
    .tree-box {
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: stretch;
    }
    .tree-box.view-tree {
      gap: 0;
      align-items: stretch;
      width: max-content;
      min-width: 100%;
    }
    .view-tree {
      min-width: 0;
      padding: 24px 0 32px;
      --tree-line-color: var(--divider-color);
      --tree-card-width: 280px;
      --tree-gap: 12px;
      --tree-row-gap: 36px;
      --tree-connector: 1.4rem;
    }
    .tree-grid-row {
      display: grid;
      grid-template-columns: repeat(4, var(--tree-card-width));
      column-gap: var(--tree-gap);
      width: fit-content;
      min-width: max-content;
      flex-shrink: 0;
      padding-bottom: var(--tree-row-gap);
      position: relative;
      align-items: stretch;
    }
    .tree-grid-row--children-cont::before {
      display: none;
    }
    .tree-grid-row--gp {
      padding-top: var(--tree-connector);
    }
    .tree-grid-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      min-width: 0;
    }
    .tree-grid-cell--span2,
    .tree-grid-cell--center {
      justify-content: center;
    }
    .tree-grid-pair {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: span 2;
      position: relative;
      align-items: stretch;
      justify-items: center;
    }
    .tree-grid-pair--left { grid-column: 1 / 3; }
    .tree-grid-pair--right { grid-column: 3 / 5; }
    .tree-grid-pair::before {
      content: "";
      position: absolute;
      bottom: calc(-1 * var(--tree-connector));
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-pair:has(.tree-card-wrap--gp-add)::before {
      display: none;
    }
    .tree-grid-row--parents::before {
      content: "";
      position: absolute;
      bottom: calc(var(--tree-connector) - 0.2rem);
      left: calc(25% - var(--tree-gap) / 4);
      right: calc(25% - var(--tree-gap) / 4);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--span2::before {
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
    .tree-grid-row--focus .tree-grid-cell--stem-down::before,
    .tree-grid-row--partner .tree-grid-cell--center::before {
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
    .tree-grid-row--partner {
      padding-bottom: calc(var(--tree-row-gap) / 2);
    }
    .tree-grid-row--children-bus::before {
      content: "";
      position: absolute;
      top: 0;
      left: var(--tree-bus-left, 12.5%);
      right: var(--tree-bus-right, 12.5%);
      border-top: 2px solid var(--tree-line-color);
      z-index: 0;
      pointer-events: none;
    }
    .tree-grid-cell--children-group {
      width: 100%;
      align-items: center;
    }
    .tree-children-group {
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-wrap: nowrap;
      gap: var(--tree-gap);
      width: fit-content;
      max-width: 100%;
      margin-inline: auto;
      position: relative;
    }
    .tree-grid-row--children-bus .tree-children-group {
      padding-top: calc(var(--tree-connector) + 2px);
    }
    .tree-grid-row--children .tree-card-wrap:not(.tree-card-wrap--empty)::before {
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
    .tree-grid-row--add-child {
      padding-top: 0;
    }
    .tree-card-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: var(--tree-card-width);
      min-width: var(--tree-card-width);
      max-width: var(--tree-card-width);
      flex: 0 0 auto;
      z-index: 1;
    }
    /* Grid cells are column flex: grow height only to match taller siblings on the same row. */
    .tree-grid-cell > .tree-card-wrap {
      flex: 1 0 auto;
    }
    /* Children group is row flex: lock width; stretch height to tallest sibling. */
    .tree-children-group > .tree-card-wrap {
      flex: 0 0 var(--tree-card-width);
      align-self: stretch;
    }
    .tree-card-wrap--gp-add {
      grid-column: 1 / -1;
      justify-self: center;
    }
    .tree-card-wrap--empty {
      min-height: 1px;
      width: var(--tree-card-width);
      min-width: var(--tree-card-width);
      max-width: var(--tree-card-width);
      flex: 0 0 auto;
    }
    .tree-grid-row:not(.tree-grid-row--children):not(.tree-grid-row--add-child) .tree-card-wrap:not(.tree-card-wrap--empty)::after,
    .tree-grid-row--children .tree-card-wrap--stem-down::after {
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
    .tree-grid-row--gp .tree-card-wrap--stem-up::before {
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
    .tree-card-wrap .person-card,
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      width: 100%;
      box-sizing: border-box;
      position: relative;
      z-index: 1;
      background: var(--card-background-color, var(--secondary-background-color));
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .tree-card-wrap .add-slot,
    .tree-card-wrap .more-children-card {
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 6px;
    }
    .tree-card-wrap .person-card-footer {
      margin-top: auto;
    }
    .tree-subtabs {
      justify-content: center;
      width: 100%;
    }
    .gen { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: center; }
    .node {
      padding: 10px 14px; border-radius: var(--ha-border-radius-lg, 12px);
      background: var(--secondary-background-color);
      cursor: pointer; min-width: 100px; text-align: center;
    }
    .node.self { background: var(--primary-color); color: var(--text-primary-color, #fff); font-weight: 600; }

    .section-head {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px; margin: 16px 0 8px;
    }
    .section-head-actions {
      justify-content: flex-start;
    }
    .section-head h3 { margin: 0; }
    .card-list {
      display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;
    }
    .person-card, .event-card {
      appearance: none; border: 1px solid var(--divider-color);
      background: var(--card-background-color, var(--secondary-background-color));
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 14px; text-align: left; color: inherit;
      box-shadow: var(--ha-card-box-shadow, none);
      width: 100%; box-sizing: border-box;
    }
    button.person-card { cursor: pointer; font: inherit; display: block; }
    .person-card-title {
      font-weight: 600;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: nowrap;
    }
    .person-card-formal { margin-top: 2px; }
    .person-card-meta, .event-card-meta {
      color: var(--secondary-text-color); font-size: 0.9em; margin-top: 4px;
    }
    .person-card-meta.accent, .person-card-footer {
      color: var(--primary-color); font-size: 0.9em; margin-top: 6px;
    }
    button.person-card-footer,
    span.person-card-footer {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      cursor: pointer;
      font: inherit;
      text-align: left;
    }
    .event-card-head {
      display: flex; justify-content: space-between; align-items: center; gap: 8px;
    }
    .event-card-title .linkish {
      font-weight: 400;
      padding: 0;
      min-height: 0;
      gap: 0;
    }
    .event-card-desc { margin-top: 6px; }
    .import-counts li { justify-content: space-between; }
    .tree-grid {
      display: grid;
      gap: 8px;
      width: 100%;
    }
    .tree-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .tree-grid--2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .tree-grid .person-card,
    .tree-grid .add-slot,
    .tree-grid .unknown-children {
      width: 100%;
      max-width: none;
      min-height: 88px;
      box-sizing: border-box;
    }
    .gen .person-card { max-width: 280px; width: 280px; }
    .chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
    .settings-shortcut-chips .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .chip-remove {
      padding: 0 4px;
      font-size: 1.1em;
      line-height: 1;
    }
    .inline-form { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; align-items: center; }
    .event-date-field {
      display: flex; flex-wrap: wrap; align-items: center; gap: 8px;
      flex: 1; min-width: 200px;
    }
    .event-date-field input { flex: 1; min-width: 140px; width: auto; }
    .vital-date-field input[type="date"] {
      width: auto;
      max-width: min(100%, 11.5rem);
      align-self: flex-start;
    }
    .date-input-row {
      display: flex; align-items: center; gap: 8px; flex: 1; min-width: 200px;
    }
    .date-label-grow {
      flex: 1; min-width: 140px;
      display: flex; flex-direction: column; gap: 4px;
    }
    .date-mode-toggle {
      font-size: 0.85em;
      white-space: nowrap;
      flex-shrink: 0;
      align-self: center;
      padding-top: 1.5rem;
    }
    .event-form input, .event-form select { width: auto; min-width: 120px; flex: 1; }
    .check { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      padding: 48px 16px;
      color: var(--secondary-text-color);
    }
    .empty-state .brand-logo { height: 56px; width: auto; }
    .empty-state p { margin: 0; max-width: 28rem; }
    .empty-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 8px; }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
    }
    .req { color: var(--error-color, #c62828); margin-left: 2px; }
    .field-label { display: inline-flex; align-items: baseline; gap: 2px; }
    .field-error {
      color: var(--error-color);
      font-size: 0.75rem;
      margin-top: 2px;
    }
    .dialog input.invalid,
    .dialog select.invalid,
    .dialog textarea.invalid {
      border-color: var(--error-color);
    }
    .deceased-icon {
      color: var(--secondary-text-color);
      display: inline-flex;
      vertical-align: middle;
    }
    .deceased-icon svg { width: 1em; height: 1em; }
    .person-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .person-card-head--with-avatar {
      align-items: center;
      gap: 10px;
    }
    .person-card-head-text {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      min-height: 32px;
    }
    .person-card-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      width: 100%;
    }
    .person-card-title-main {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      flex: 1;
    }
    .person-card-sex {
      flex-shrink: 0;
      margin-left: auto;
    }
    .person-card-title--clamp {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-width: 0;
    }
    .person-head-main {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
      width: 100%;
    }
    .person-head-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      flex: 1;
    }
    .lineage-sentence {
      margin: 0;
      font-size: 0.9rem;
      line-height: 1.35;
    }
    .person-head-main h2 {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      margin: 0;
    }
    .people-table .avatar-col {
      width: 40px;
      padding-right: 4px;
    }
    .person-avatar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      flex-shrink: 0;
      overflow: hidden;
      box-sizing: border-box;
      border: 1px solid var(--divider-color);
      font-weight: 600;
      font-size: 0.75rem;
      line-height: 1;
    }
    .person-avatar__inner {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .person-avatar img,
    .person-avatar ft-authenticated-media-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .person-avatar--male.person-avatar--initials {
      background: rgba(33, 150, 243, 0.15);
      color: var(--primary-text-color, #1a1a1a);
    }
    .person-avatar--female.person-avatar--initials {
      background: rgba(233, 30, 99, 0.12);
      color: var(--primary-text-color, #1a1a1a);
    }
    .person-avatar--unknown.person-avatar--initials {
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
    .person-avatar__deceased-mark {
      position: absolute;
      top: 1px;
      left: 1px;
      z-index: 1;
      color: var(--secondary-text-color);
      filter: drop-shadow(0 0 1px var(--card-background-color, #fff));
      pointer-events: none;
      line-height: 0;
    }
    .person-avatar--lg {
      font-size: 1.5rem;
    }
    .person-avatar--detail {
      font-size: 1.1rem;
    }
    .profile-photo-editor {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .profile-crop-wrap {
      position: relative;
      width: min(100%, ${PROFILE_CROP_CANVAS_PX}px);
      aspect-ratio: 1;
    }
    .profile-crop-canvas {
      display: block;
      width: 100%;
      height: auto;
      touch-action: none;
      cursor: grab;
      background: var(--secondary-background-color);
      border-radius: 50%;
    }
    .profile-crop-canvas:active {
      cursor: grabbing;
    }
    .profile-crop-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 12px;
      pointer-events: none;
    }
    .profile-zoom-label {
      width: 100%;
      max-width: ${PROFILE_CROP_CANVAS_PX}px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 12px;
    }
    .photo-tile {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .photo-thumb-btn ft-authenticated-media-img,
    .photo-thumb-btn img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
    .photo-thumb-btn {
      appearance: none;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      padding: 0;
      background: var(--secondary-background-color);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
    }
    .photo-thumb-btn img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .photo-profile-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .photo-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 0.85em;
    }
    .photo-caption {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .photo-lightbox {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(0, 0, 0, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .photo-lightbox img,
    .photo-lightbox-img {
      max-width: min(100%, 900px);
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
      display: block;
    }
    .file-btn {
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      padding: 8px 16px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font-size: 0.9em;
    }
    .person-card-wrap { display: flex; flex-direction: column; gap: 6px; }
    .card-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px 8px;
    }
    .person-subtabs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .subtabs-left { display: flex; flex-wrap: wrap; gap: 4px; }
    .subtabs-actions {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
    .rel-section h3 { margin: 0; font-size: 1rem; }
    .rel-union-card {
      padding: 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .rel-union-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .rel-union-meta {
      margin: 12px 0;
      padding: 12px 14px;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      font-size: 0.95rem;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .rel-union-meta strong { color: var(--primary-text-color); }
    .place-field { position: relative; }
    .place-suggest {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      margin: 2px 0 0;
      padding: 0;
      list-style: none;
      background: var(--card-background-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0,0,0,0.12));
      max-height: 180px;
      overflow: auto;
    }
    .place-suggest button {
      display: block;
      width: 100%;
      text-align: left;
      padding: 8px 12px;
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
    }
    .place-suggest button:hover { background: var(--secondary-background-color); }
    .union-tabs .gen + .gen { margin-top: 16px; }
    .md-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      align-self: flex-start;
      width: auto;
      max-width: 100%;
      height: 36px;
      padding: 0 16px;
      border-radius: var(--ha-button-border-radius, var(--ha-border-radius-pill, 9999px));
      border: none;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      white-space: nowrap;
      box-sizing: border-box;
      background: transparent;
      color: var(--primary-color);
      font-family: inherit;
    }
    .md-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .md-btn-filled {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .md-btn-outlined {
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .md-btn-active.md-btn-outlined {
      background: color-mix(
        in srgb,
        var(--primary-color) 8%,
        var(--card-background-color, var(--secondary-background-color))
      );
    }
    .md-btn-text {
      color: var(--primary-color);
      background: transparent;
      padding: 0 8px;
    }
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
      box-sizing: border-box;
    }
    .dialog {
      background: var(--card-background-color, var(--secondary-background-color));
      color: var(--primary-text-color);
      padding: 20px;
      border-radius: var(--ha-dialog-border-radius, var(--ha-border-radius-lg, 12px));
      width: min(520px, 100%);
      max-height: 90vh;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-sizing: border-box;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .dialog-header h2 {
      margin: 0;
      flex: 1;
      min-width: 0;
      font-size: 1.25rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .dialog-title-text { min-width: 0; }
    .dialog-preview-head {
      align-items: center;
      gap: 12px;
    }
    .dialog-preview-head-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      min-width: 0;
      flex: 1;
    }
    .dialog-title-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .dialog-close {
      flex-shrink: 0;
      margin: -8px -8px -8px 0;
    }
    .dialog-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .dialog-body .collapse-body {
      background: transparent;
    }
    .dialog.dialog-narrow {
      width: 100%;
      height: auto;
      max-height: calc(
        100dvh - max(12px, env(safe-area-inset-top, 0px)) - max(12px, env(safe-area-inset-bottom, 0px)) - 24px
      );
      overflow: hidden;
      padding-bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    }
    .dialog-backdrop:has(.dialog-narrow) {
      align-items: center;
      padding-top: max(12px, env(safe-area-inset-top, 0px));
      padding-right: max(12px, env(safe-area-inset-right, 0px));
      padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
      padding-left: max(12px, env(safe-area-inset-left, 0px));
    }
    .form-stack,
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .settings-subhead {
      margin: 16px 0 4px;
      font-size: 0.95rem;
      font-weight: 600;
    }
    .settings-linked-users {
      align-items: stretch;
    }
    .settings-linked-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: stretch;
    }
    .settings-linked-grid > .person-card-wrap {
      width: min(100%, 280px);
      flex: 0 1 280px;
      display: flex;
      flex-direction: column;
    }
    .settings-linked-grid > .person-card-wrap > .person-card {
      flex: 1 1 auto;
      height: 100%;
      box-sizing: border-box;
    }
    .settings-page .collapse-body {
      background: transparent;
    }
    .form-section-title {
      display: block;
      margin: 0 0 8px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .me-linked-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
    }
    .user-link-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .user-link-form label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
    }
    .settings-subsections {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .settings-gedcom-export {
      border-top: 1px solid var(--divider-color);
      padding-top: 16px;
      margin-top: 4px;
    }
    .settings-me-body {
      gap: 8px;
    }
    .settings-me-body .settings-subhead {
      margin: 12px 0 0;
    }
    .settings-me-body .settings-subhead:first-of-type {
      margin-top: 0;
    }
    .settings-me-body p {
      margin: 0;
    }
    .settings-me-username {
      margin: 0;
    }
    .dialog label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 0.9rem;
    }
    .row2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .check-row .check-control {
      display: flex;
      align-items: center;
      min-height: 40px;
    }
    .check-row input[type="checkbox"] {
      width: auto;
      margin: 0;
      accent-color: var(--primary-color);
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 4px;
    }
    .filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .table-wrap { overflow-x: auto; overflow-y: visible; margin-bottom: 16px; }
    .people-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.92rem;
    }
    .people-table th, .people-table td {
      padding: 10px 8px;
      border-bottom: 1px solid var(--divider-color);
      text-align: left;
      vertical-align: middle;
    }
    .people-table th { color: var(--secondary-text-color); font-weight: 500; }
    .sort-btn {
      appearance: none;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 0;
    }
    .people-table .num, .people-table .center { text-align: center; }
    .date-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      background: var(--secondary-background-color);
      font-size: 0.88em;
      white-space: nowrap;
    }
    .sex-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      border-radius: var(--ha-border-radius-pill, 9999px);
      font-size: 0.85em;
      white-space: nowrap;
    }
    .sex-badge svg { width: 14px; height: 14px; }
    .sex-badge--icon-only {
      padding: 4px 6px;
      gap: 0;
    }
    .sex-male { background: color-mix(in srgb, #2196f3 15%, transparent); color: #1565c0; }
    .sex-female { background: color-mix(in srgb, #e91e63 15%, transparent); color: #ad1457; }
    .sex-other { background: var(--secondary-background-color); }
    .lineage-marker {
      color: var(--primary-color);
      display: inline-flex;
      flex-shrink: 0;
      pointer-events: none;
    }
    .lineage-marker svg { width: 16px; height: 16px; }
    .lineage-legend {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin: 0 0 12px;
      line-height: 1.4;
    }
    .name-cell { font-weight: 500; }
    .menu-cell { width: 40px; position: relative; }
    .row-menu-wrap { position: relative; }
    .icon-btn.sm { width: 32px; height: 32px; }
    .row-menu {
      z-index: 100;
      min-width: 140px;
      background: var(--card-background-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-card-box-shadow, 0 4px 16px rgba(0,0,0,.12));
      display: flex;
      flex-direction: column;
      padding: 4px;
    }
    .row-menu--fixed { position: fixed; }
    .row-menu button {
      appearance: none;
      border: none;
      background: none;
      text-align: left;
      padding: 8px 10px;
      font: inherit;
      cursor: pointer;
      border-radius: 6px;
    }
    .row-menu button:hover { background: var(--secondary-background-color); }
    .people-cards .person-card-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 8px;
    }
    .back-link {
      appearance: none;
      border: none;
      background: none;
      padding: 0;
      font: inherit;
      font-size: 0.9rem;
      color: var(--primary-color);
      cursor: pointer;
      margin-bottom: 4px;
      text-align: left;
    }
    .back-link:hover { text-decoration: underline; }
    .collapse {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      margin-bottom: 12px;
      overflow: hidden;
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .collapse-head {
      appearance: none;
      border: none;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 14px;
      background: var(--secondary-background-color);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
      color: inherit;
    }
    .collapse-body {
      padding: 8px 14px 14px;
      background: var(--card-background-color, var(--secondary-background-color));
    }
    .collapse--cards .collapse-body {
      padding: 10px 14px 14px;
      background: color-mix(
        in srgb,
        var(--divider-color) 8%,
        var(--card-background-color, var(--secondary-background-color))
      );
    }
    .gen-row {
      position: relative;
      display: flex;
      justify-content: center;
      width: max-content;
      min-width: 100%;
      box-sizing: border-box;
      align-items: stretch;
    }
    .gen-label {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 6rem;
      text-align: left;
      font-size: 0.85rem;
    }
    .gen-label--empty {
      visibility: hidden;
    }
    .siblings-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .preview-body { margin-bottom: 8px; }
    .rel-card-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
    }
    .rel-card-list .person-card,
    .rel-card-list .add-slot,
    .rel-card-list .more-children-card,
    .rel-card-list .unknown-children {
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      box-sizing: border-box;
    }
    .rel-person-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 280px;
      max-width: 100%;
      flex: 0 1 280px;
      align-self: flex-start;
    }
    .rel-person-wrap .person-card {
      width: 100%;
      height: fit-content;
      flex: none;
    }
    .rel-person-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      padding: 0 4px;
    }
    .rel-union-children { margin-top: 16px; }
    .rel-union-children > .muted {
      display: block;
      margin-bottom: 8px;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .union-tabs {
      width: max-content;
      min-width: 100%;
    }
    .add-slot {
      appearance: none;
      border: 1px dashed var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 12px 16px;
      cursor: pointer;
      font: inherit;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .more-children-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 120px;
      padding: 12px 16px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      box-sizing: border-box;
      text-align: center;
    }
    .more-children-label {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .more-children-add {
      font-size: 0.9rem;
    }
    .unknown-children {
      padding: 8px 12px;
      border: 1px dashed var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .me-hits li { flex-direction: column; align-items: flex-start; }
    .me-create { margin-top: 8px; }
    @media (max-width: 720px) {
      .shell { padding: 12px 16px 40px; }
      .view-tree { zoom: 0.8; }
      .siblings-grid { grid-template-columns: 1fr; }
      .stats-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      .family-stats-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }
      .family-stat { padding: 10px 8px; }
      .family-stat-n { font-size: 1.15rem; }
      .stat { padding: 8px 6px; }
      .stat-n { font-size: 1.15rem; }
      .stat-label { font-size: 0.7rem; }
      .row2 { grid-template-columns: 1fr; }
      .subtabs-actions { width: 100%; justify-content: flex-end; }
      .rel-card-list .person-card,
      .rel-card-list .add-slot,
      .rel-card-list .more-children-card,
      .rel-person-wrap {
        width: 100%;
        flex: 1 1 100%;
      }
    }
  `;
