import { LitElement, html, css, nothing, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokenDefaults } from './shared/tokens.js';
import { primitiveStyles } from './shared/primitives.styles.js';
import { rowStyles } from './shared/shapes/row.styles.js';
import { utilityMenuStyles } from './shared/utility-menu.styles.js';
import { UtilityMenuController, type UtilityMenuItem } from './shared/utility-menu.controller.js';
import { shouldShow, ctx } from './shared/context.js';
import type { StudentData } from './shared/student.base.js';
import {
  OVERFLOW_CTAS, OVERFLOW_CTA_NAMES,
  resolvePreset, type StudentContext,
} from './shared/student.base.js';

export type { StudentData };
export type StudentRowShape = 'row' | 'mini-row';

export interface StudentRowContext {
  assignmentCompletion?: number;
  assignmentStatus?: string;
  assignmentDueDate?: string;
  assignmentScore?: number;
  enrollmentDate?: string;
  classNames?: string[];
}

function needsAttention(band?: string): boolean {
  return !!band && band !== 'At/Above';
}

function isInactive(status?: string): boolean {
  return status === 'Transferred' || status === 'Graduated';
}

@customElement('ren-student-row')
export class RenStudentRow extends LitElement {
  static styles = [
    tokenDefaults,
    primitiveStyles,
    rowStyles,
    utilityMenuStyles,
    css`
      :host { display: block; position: relative; }

      .roster-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--ren-space-md);
        background: var(--ren-color-bg);
        border: 1px solid var(--ren-color-border);
        gap: var(--ren-space-md);
        cursor: pointer;
        transition: background 0.15s ease;
      }

      :host(:first-of-type) .roster-row {
        border-radius: var(--ren-radius-md) var(--ren-radius-md) 0 0;
      }

      :host(:last-of-type) .roster-row {
        border-radius: 0 0 var(--ren-radius-md) var(--ren-radius-md);
      }

      :host(:only-of-type) .roster-row {
        border-radius: var(--ren-radius-md);
      }

      :host + :host .roster-row {
        margin-block-start: -1px;
      }

      .roster-row:hover {
        background: var(--ren-color-bg-muted);
      }

      .roster-identity {
        display: flex;
        align-items: center;
        gap: var(--ren-space-sm);
        flex: 1;
        min-width: 0;
      }

      .roster-identity--faded {
        opacity: 0.4;
      }

      .roster-ring {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
      }

      .roster-name-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }

      .roster-name {
        font-weight: 700;
        color: var(--ren-color-text);
        font-size: 1rem;
        line-height: 1.33;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .roster-meta {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.875rem;
        color: var(--ren-color-text-secondary);
        line-height: 1.33;
      }

      .roster-meta-dot {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: var(--ren-color-text-secondary);
        flex-shrink: 0;
      }

      .roster-meta--italic {
        font-style: italic;
      }

      .roster-scores {
        display: flex;
        align-items: center;
        gap: var(--ren-space-md);
        padding: var(--ren-space-sm);
        border-radius: var(--ren-radius-md);
        transition: background 0.15s ease;
        flex-shrink: 0;
      }

      .roster-scores:hover {
        background: var(--ren-color-bg-hover);
      }

      .roster-score-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 120px;
      }

      .roster-score-line {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .roster-score-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .roster-score-dot--reading {
        background: var(--ren-color-subject-reading);
      }

      .roster-score-dot--math {
        background: var(--ren-color-subject-math);
      }

      .roster-score-label {
        font-size: 0.875rem;
        color: var(--ren-color-text-secondary);
        white-space: nowrap;
        line-height: 1.4;
      }

      .roster-score-value {
        font-weight: 700;
        color: var(--ren-color-text);
      }

      .roster-chevron {
        width: 6px;
        height: 12px;
        flex-shrink: 0;
        color: var(--ren-color-text-muted);
        margin-inline-start: -4px;
      }

      .roster-band {
        font-size: 0.75rem;
        color: var(--ren-color-text-muted);
        padding-inline-start: 12px;
        line-height: 1.4;
      }

      .roster-band--alert {
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--ren-color-brand);
      }

      .roster-alert-icon {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
      }

      /* Legacy row shape — keep existing styles for non-roster contexts */
      :host([state='inactive']),
      :host([state='graduated']) { opacity: 0.55; }
      :host([state='transferred']) { opacity: 0.75; }

      .status--success { color: var(--ren-color-status-success); }
      .status--warning { color: var(--ren-color-status-warning); }
      .status--danger { color: var(--ren-color-status-danger); }

      .score-fill--reading { background: var(--ren-color-subject-reading); }
      .score-fill--math { background: var(--ren-color-subject-math); }

      .ctx-progress {
        display: flex;
        align-items: center;
        gap: var(--ren-space-xs);
        font-size: 0.75rem;
        color: var(--ren-color-text-secondary);
      }

      .ctx-bar {
        width: 4rem;
        height: 4px;
        background: var(--ren-color-border-light);
        border-radius: var(--ren-radius-xs);
        overflow: hidden;
      }

      .ctx-fill {
        height: 100%;
        border-radius: var(--ren-radius-xs);
        background: var(--ren-color-link);
      }

      .ctx-label {
        font-size: 0.75rem;
        color: var(--ren-color-text-muted);
      }

      .ctx-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--ren-space-xs);
        padding: 2px var(--ren-space-sm);
        border-radius: var(--ren-radius-sm);
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1.5;
      }

      .ctx-badge--default { background: var(--ren-color-status-neutral-bg); color: var(--ren-color-status-neutral); }

      .row-checkbox {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid var(--ren-color-border);
        border-radius: var(--ren-radius-xs);
        background: var(--ren-color-bg);
        cursor: pointer;
        flex-shrink: 0;
        position: relative;
        margin: 0;
      }

      .row-checkbox:checked {
        background: var(--ren-color-link);
        border-color: var(--ren-color-link);
      }

      .row-checkbox:checked::after {
        content: '';
        position: absolute;
        inset-block-start: 2px;
        inset-inline-start: 5px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }

      .row-checkbox:focus-visible {
        outline: 2px solid var(--ren-color-link);
        outline-offset: 2px;
      }

      .row-wrap--selectable {
        cursor: pointer;
      }

      .row-wrap--selectable:hover {
        background: var(--ren-color-bg-hover);
      }

      .ctx-classes {
        font-size: 0.75rem;
        color: var(--ren-color-text-muted);
      }
    `,
  ];

  @property({ type: Object }) data: StudentData | null = null;
  @property({ type: String, reflect: true }) shape: StudentRowShape = 'row';
  @property({ type: String, reflect: true }) state: string = 'active';
  @property({ type: String }) context?: StudentContext;
  @property({ type: Boolean }) selectable = false;
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Array }) visibleAttributes?: string[];
  @property({ type: Array }) availableCTAs?: string[];
  @property({ type: Object }) contextData?: StudentRowContext;

  private _menu = new UtilityMenuController(this);

  private _resolved() {
    return resolvePreset(this.context, this.visibleAttributes, this.availableCTAs);
  }

  private _show(attr: string) { return shouldShow(attr, this._resolved().attrs); }
  private _showCta(name: string) { return shouldShow(name, this._resolved().ctas); }

  private _showInlineCta(name: string) {
    if (!this._showCta(name)) return false;
    if (OVERFLOW_CTA_NAMES.has(name)) return false;
    return true;
  }

  private _getMenuItems(): UtilityMenuItem[] {
    return OVERFLOW_CTAS.filter(c => this._showCta(c.name));
  }

  private _dispatchCta(action: string) {
    this.dispatchEvent(
      new CustomEvent('ren-cta-click', {
        bubbles: true, composed: true,
        detail: { action, student: this.data, context: this.context, contextData: this.contextData },
      })
    );
  }

  private _handleCtaClick(e: Event) {
    e.preventDefault();
    this._dispatchCta('view-profile');
  }

  private _handleSelectionToggle() {
    this.selected = !this.selected;
    this.dispatchEvent(
      new CustomEvent('ren-selection-change', {
        bubbles: true, composed: true,
        detail: { selected: this.selected, student: this.data },
      })
    );
  }

  private _handleRowClick() {
    if (this.selectable) {
      this._handleSelectionToggle();
    }
  }

  private _isRosterContext(): boolean {
    return this.context === 'class-roster' || this.context === 'school-roster';
  }

  render() {
    if (!this.data) return nothing;

    if (this._isRosterContext() && this.shape === 'row') {
      return this._renderRosterRow();
    }

    return this._renderLegacyRow();
  }

  private _renderRosterRow() {
    const d = this.data!;
    const inactive = isInactive(d.enrollmentStatus);

    return html`
      <div class="roster-row" part="row" @click=${this._handleCtaClick}>
        <div class="roster-identity${inactive ? ' roster-identity--faded' : ''}">
          ${this._renderRing(d, inactive)}
          <div class="roster-name-block">
            <div class="roster-name" part="name">${d.name}</div>
            ${inactive
              ? html`<div class="roster-meta roster-meta--italic">${d.enrollmentStatus}</div>`
              : html`
                  <div class="roster-meta">
                    ${d.grade ? html`<span>Grade ${d.grade}</span>` : nothing}
                    ${d.grade && d.assignmentCount != null ? html`<span class="roster-meta-dot"></span>` : nothing}
                    ${d.assignmentCount != null ? html`<span>${d.assignmentCount} Assignments</span>` : nothing}
                  </div>
                `
            }
          </div>
        </div>
        ${!inactive ? html`
          <div class="roster-scores" part="performance"
            @click=${(e: Event) => { e.stopPropagation(); this._dispatchCta('view-scores'); }}>
            ${this._renderScoreCol('Reading', d.readingLevel, d.readingStatus, 'roster-score-dot--reading')}
            ${this._renderScoreCol('Math', d.mathLevel, d.mathStatus, 'roster-score-dot--math')}
          </div>
        ` : nothing}
        ${this._renderUtilityMenu()}
      </div>
    `;
  }

  private _renderRing(d: StudentData, inactive: boolean) {
    const r = 16;
    const strokeWidth = 3;
    const circumference = 2 * Math.PI * r;
    const usable = circumference * 0.82;
    const gapAngle = circumference * 0.09;

    const rp = d.readingPercent ?? 50;
    const mp = d.mathPercent ?? 50;
    const total = rp + mp;
    const rFrac = total > 0 ? rp / total : 0.5;
    const readingLen = rFrac * usable;
    const mathLen = (1 - rFrac) * usable;

    const inactiveColor = '#DDDEE0';
    const readingColor = inactive ? inactiveColor : 'var(--ren-color-subject-reading)';
    const mathColor = inactive ? inactiveColor : 'var(--ren-color-subject-math)';

    const readingOffset = circumference * 0.25;
    const mathOffset = readingOffset - readingLen - gapAngle;

    return svg`
      <svg class="roster-ring" viewBox="0 0 40 40" role="img"
        aria-label="${inactive ? 'No score data' : `Reading ${rp}%, Math ${mp}%`}">
        <circle cx="20" cy="20" r="${r}" fill="none"
          stroke="${readingColor}" stroke-width="${strokeWidth}"
          stroke-dasharray="${readingLen} ${circumference - readingLen}"
          stroke-dashoffset="${readingOffset}" stroke-linecap="round" />
        <circle cx="20" cy="20" r="${r}" fill="none"
          stroke="${mathColor}" stroke-width="${strokeWidth}"
          stroke-dasharray="${mathLen} ${circumference - mathLen}"
          stroke-dashoffset="${mathOffset}" stroke-linecap="round" />
      </svg>
    `;
  }

  private _renderScoreCol(subject: string, value?: string, band?: string, dotClass?: string) {
    const alert = needsAttention(band);
    return html`
      <div class="roster-score-col">
        <div class="roster-score-line">
          <span class="roster-score-dot ${dotClass ?? ''}"></span>
          <span class="roster-score-label">
            ${subject} <span class="roster-score-value">${value ?? '—'}</span>
          </span>
          <svg class="roster-chevron" viewBox="0 0 6 12" aria-hidden="true">
            <path d="M1 1l4 5-4 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="roster-band${alert ? ' roster-band--alert' : ''}">
          ${alert ? html`
            <svg class="roster-alert-icon" viewBox="0 0 12 12" aria-label="Needs attention">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" stroke-width="1" fill="none" />
              <text x="6" y="8.5" text-anchor="middle" fill="currentColor" font-size="7" font-weight="700">!</text>
            </svg>
          ` : nothing}
          ${band ?? ''}
        </div>
      </div>
    `;
  }

  /** Legacy row render — used for all non-roster contexts */
  private _renderLegacyRow() {
    const d = this.data!;
    const isMini = this.shape === 'mini-row';
    const cd = this.contextData as Record<string, unknown> | undefined;
    const assignCompletion = ctx<number>(cd, 'assignmentCompletion');
    const assignStatus = ctx<string>(cd, 'assignmentStatus');
    const assignDue = ctx<string>(cd, 'assignmentDueDate');
    const assignScore = ctx<number>(cd, 'assignmentScore');
    const classNames = ctx<string[]>(cd, 'classNames');

    const menuItems = this._getMenuItems();
    const menuClass = !isMini && menuItems.length ? ' has-utility-menu' : '';
    const selectableClass = this.selectable ? ' row-wrap--selectable' : '';

    const statusCls = d.readingStatus ? ({ 'On watch': 'status--danger', 'At/Above': 'status--success', 'Below': 'status--danger', 'Intervention': 'status--warning' }[d.readingStatus] ?? '') : '';

    return html`
      <div
        class="row-wrap${isMini ? '' : menuClass}${selectableClass}"
        part="row"
        @click=${isMini && this.selectable ? this._handleRowClick : nothing}
      >
        ${isMini && this.selectable
          ? html`<input
              class="row-checkbox"
              type="checkbox"
              .checked=${this.selected}
              aria-label="Select ${d.name}"
              @change=${this._handleSelectionToggle}
              @click=${(e: Event) => e.stopPropagation()}
            />`
          : nothing}
        <div class="row-info" part="info">
          ${this._show('Profile Photo') && d.initials
            ? html`<div class="avatar" style="background:${d.color ?? '#999'}" part="avatar">${d.initials}</div>`
            : nothing}
          <div style="min-width:0">
            <div class="name" part="name">${d.name}</div>
            <div class="meta">
              ${this._show('Grade Level') && d.grade ? html`Grade ${d.grade}` : nothing}
              ${this._show('Grade Level') && d.grade && this._show('School') && d.school ? html` <span class="dot">&middot;</span> ` : nothing}
              ${this._show('School') ? (d.school ?? '') : ''}
              ${!isMini && this._show('Enrollment Status') && d.enrollmentStatus
                ? html`<span class="dot">&middot;</span> <span style="font-weight:500">${d.enrollmentStatus}</span>`
                : nothing}
              ${!isMini && !d.enrollmentStatus && d.readingStatus
                ? html`<span class="dot">&middot;</span> <span class="${statusCls}" style="font-weight:500">${d.readingStatus}</span>`
                : nothing}
            </div>
            ${!isMini && classNames?.length
              ? html`<div class="ctx-classes" part="context-data">${classNames.join(', ')}</div>`
              : nothing}
          </div>
        </div>
        ${!isMini ? this._renderLegacyPerformance(d, assignCompletion, assignStatus, assignDue, assignScore) : nothing}
      </div>
      ${!isMini ? this._renderUtilityMenu() : nothing}
    `;
  }

  private _renderLegacyPerformance(
    d: StudentData,
    assignCompletion: number | undefined,
    assignStatus: string | undefined,
    assignDue: string | undefined,
    assignScore: number | undefined,
  ) {
    return html`
      <div class="row-perf" part="performance">
        ${assignCompletion != null
          ? html`
              <div class="ctx-progress" part="context-data"
                role="progressbar"
                aria-valuenow="${assignCompletion}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Assignment completion ${assignCompletion}%">
                <div class="ctx-bar"><div class="ctx-fill" style="width:${assignCompletion}%"></div></div>
                <span>${assignCompletion}%</span>
                ${assignDue ? html`<span class="ctx-label">Due ${assignDue}</span>` : nothing}
                ${assignScore != null ? html`<span class="ctx-label">Score: ${assignScore}</span>` : nothing}
              </div>
            `
          : nothing}
        ${assignStatus
          ? html`<span class="ctx-badge ctx-badge--default" part="context-data">${assignStatus}</span>`
          : nothing}
        ${assignCompletion == null && this._show('Reading Level') && d.readingPercent != null
          ? html`
              <div class="score-item"
                role="progressbar"
                aria-valuenow="${d.readingPercent}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Reading level ${d.readingLevel ?? ''}">
                <div class="score-bar"><div class="score-fill score-fill--reading" style="width:${d.readingPercent}%"></div></div>
                <span class="score-value">${d.readingLevel ?? ''}</span>
              </div>
            `
          : nothing}
        ${assignCompletion == null && this._show('Math Level') && d.mathPercent != null
          ? html`
              <div class="score-item"
                role="progressbar"
                aria-valuenow="${d.mathPercent}"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Math level ${d.mathLevel ?? ''}">
                <div class="score-bar"><div class="score-fill score-fill--math" style="width:${d.mathPercent}%"></div></div>
                <span class="score-value">${d.mathLevel ?? ''}</span>
              </div>
            `
          : nothing}
        ${this._renderLegacyCtaZone()}
      </div>
    `;
  }

  private _renderUtilityMenu() {
    const items = this._getMenuItems();
    if (items.length === 0) return nothing;

    return html`
      <button
        class="utility-trigger"
        type="button"
        aria-label="More actions"
        aria-expanded="${this._menu.open}"
        aria-haspopup="menu"
        @click=${(e: Event) => { e.stopPropagation(); this._menu.toggle(); }}
        part="utility-trigger"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
        </svg>
      </button>
      ${this._menu.open ? html`
        <div class="utility-menu" role="menu" part="utility-menu">
          ${items.map(item => html`
            <button
              class="utility-menu-item${item.destructive ? ' utility-menu-item--destructive' : ''}"
              type="button"
              role="menuitem"
              @click=${() => { this._dispatchCta(item.action); this._menu.close(); }}
            >${item.label}</button>
          `)}
        </div>
      ` : nothing}
    `;
  }

  private _renderLegacyCtaZone() {
    const d = this.data!;
    const ctas = [];

    if (this._showInlineCta('View Profile')) {
      ctas.push(html`<a class="cta-btn" href="${d.href ?? '#'}" part="cta" @click=${this._handleCtaClick}>View profile</a>`);
    }
    if (this._showInlineCta('View Scores')) {
      ctas.push(html`<button class="cta-btn" type="button" part="cta-scores" @click=${() => this._dispatchCta('view-scores')}>Scores</button>`);
    }
    if (this._showInlineCta('Add to Student Group')) {
      ctas.push(html`<button class="cta-btn" type="button" part="cta-add-group" @click=${() => this._dispatchCta('add-to-student-group')}>Add to Group</button>`);
    }

    return ctas.length ? ctas : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ren-student-row': RenStudentRow;
  }
}
