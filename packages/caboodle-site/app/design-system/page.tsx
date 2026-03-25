import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Design System — Component Style Guide' };

const TOKEN_GROUPS = [
  {
    title: 'Colors — Text',
    tokens: [
      { name: '--ren-color-text', value: '#202020', desc: 'Primary body text' },
      { name: '--ren-color-text-secondary', value: '#4d4d4d', desc: 'Secondary text, meta lines' },
      { name: '--ren-color-text-muted', value: '#707070', desc: 'Helper text, labels, section titles' },
    ],
  },
  {
    title: 'Colors — Interactive',
    tokens: [
      { name: '--ren-color-interactive', value: '#146EB3', desc: 'Interactive blue — links, data headlines' },
      { name: '--ren-color-link', value: '#146EB3', desc: 'Link color (alias of interactive)' },
      { name: '--ren-color-accent', value: '#2B87FF', desc: 'Accent blue for highlights' },
      { name: '--ren-color-brand', value: '#cf3a4e', desc: 'Brand red for emphasis' },
    ],
  },
  {
    title: 'Colors — Surfaces',
    tokens: [
      { name: '--ren-color-bg', value: '#fff', desc: 'Card and component background' },
      { name: '--ren-color-bg-muted', value: '#fafafa', desc: 'Card footer, muted sections' },
      { name: '--ren-color-bg-tertiary', value: '#fff4f4', desc: 'Tinted cell background' },
      { name: '--ren-color-bg-hover', value: '#f5f5f5', desc: 'Interactive hover state' },
      { name: '--ren-color-border', value: '#e5e5e5', desc: 'Card and row borders' },
      { name: '--ren-color-border-light', value: '#eee', desc: 'Internal dividers, light borders' },
    ],
  },
  {
    title: 'Colors — Object Types',
    tokens: [
      { name: '--ren-color-core-object', value: '#2563EB', desc: 'Core object accent' },
      { name: '--ren-color-domain-object', value: '#7C3AED', desc: 'Domain object accent' },
      { name: '--ren-color-variation-object', value: '#059669', desc: 'Variation object accent' },
    ],
  },
  {
    title: 'Colors — Status',
    tokens: [
      { name: '--ren-color-success', value: '#398b26', desc: 'Success / active states' },
      { name: '--ren-color-warning', value: '#e6a817', desc: 'Warning / on-watch states' },
    ],
  },
  {
    title: 'Typography',
    tokens: [
      { name: '--ren-font-plain', value: 'Roboto, system-ui, sans-serif', desc: 'Body font stack' },
      { name: '--ren-font-mono', value: 'ui-monospace, Cascadia Code, monospace', desc: 'Code and monospace' },
      { name: '--ren-tracking', value: '0.5px', desc: 'Global letter-spacing' },
    ],
  },
  {
    title: 'Spacing',
    tokens: [
      { name: '--ren-space-xs', value: '0.25rem', desc: '4px — tight gaps' },
      { name: '--ren-space-sm', value: '0.5rem', desc: '8px — small gaps' },
      { name: '--ren-space-md', value: '1rem', desc: '16px — default spacing' },
      { name: '--ren-space-lg', value: '1.5rem', desc: '24px — section padding' },
      { name: '--ren-space-xl', value: '2rem', desc: '32px — large gaps' },
    ],
  },
  {
    title: 'Border Radius',
    tokens: [
      { name: '--ren-radius-xs', value: '3px', desc: 'Tight radius for data cells' },
      { name: '--ren-radius-sm', value: '4px', desc: 'Small elements, mini icons' },
      { name: '--ren-radius-md', value: '8px', desc: 'Cards, buttons, rows' },
      { name: '--ren-radius-lg', value: '12px', desc: 'Badges, large elements' },
      { name: '--ren-radius-pill', value: '9999px', desc: 'Pill-shaped badges' },
    ],
  },
];

const SHAPES = [
  {
    name: 'Card',
    desc: 'Standard card for grid views and search results. Shows avatar/icon, name, meta, optional details, and a footer with stats and CTA.',
    file: 'shapes/card.styles.ts',
    classes: '.card-wrap, .card-body, .card-footer, .footer-stat, .card-details',
  },
  {
    name: 'Row',
    desc: 'Horizontal list item with avatar/icon, name, meta, performance metrics, and CTA. Supports mini-row (compact) and data-row (tabular) density variants.',
    file: 'shapes/row.styles.ts',
    classes: '.row-wrap, .row-info, .row-perf, .score-item, .score-bar, .row-data, .row-data-label',
  },
  {
    name: 'Profile',
    desc: 'Full detail view with header (avatar, name, badge, actions), info-grid sections, and nested object cards.',
    file: 'shapes/profile.styles.ts',
    classes: '.profile-wrap, .profile-header, .profile-identity, .section, .section-title, .info-grid, .nested, .nested-card',
  },
  {
    name: 'Header',
    desc: 'Compact inline bar for breadcrumbs or in-context object references. Shows avatar/icon, name, meta, and a CTA link.',
    file: 'shapes/header.styles.ts',
    classes: '.header-bar',
  },
];

const CATEGORIES = [
  {
    name: 'People',
    objects: 'Student, Teacher',
    component: '<ren-student-card>, <ren-student-row>, <ren-student-data-row>, <ren-student-profile>, <ren-student-header>',
    signature: 'Photo-forward layout with circular avatar (photo or initials). Key metrics: reading/math levels. People cards are the only objects with photos.',
    uniqueStyles: 'card-levels, score-fill--reading/math, level bars, level-status',
  },
  {
    name: 'Container',
    objects: 'Class, School, District',
    component: '<ren-class-card>, <ren-class-row>, <ren-class-data-row>, <ren-class-profile>, <ren-class-header>',
    signature: 'Left accent border on card. Stat blocks grid showing nested object counts. Hierarchy breadcrumb for parent chain.',
    uniqueStyles: 'card-accent, card-subject, object-icon (rounded square)',
  },
  {
    name: 'Activity',
    objects: 'Assessment, Assignment',
    component: '<ren-assessment-card>, <ren-assessment-row>, <ren-assessment-data-row>, <ren-assessment-profile>, <ren-assessment-header>',
    signature: 'Top accent bar with type color. Progress bar and status badge as dominant visuals. Type badge (Star/Benchmark/Formative).',
    uniqueStyles: 'accent-bar, type-badge, completion-bar, progress-bar/fill',
  },
  {
    name: 'Knowledge',
    objects: 'Skill, Resource, Standard',
    component: '<ren-skill-card>, <ren-skill-row>, <ren-skill-data-row>, <ren-skill-profile>, <ren-skill-header>',
    signature: 'Taxonomy-forward with monospace code, domain path breadcrumb, and cross-reference counts. Mastery ring visualization.',
    uniqueStyles: 'code (monospace), desc, mastery-ring, mastery-big-ring, mastery-band',
  },
  {
    name: 'Data / AI',
    objects: 'Score, Proficiency Prediction, Insight',
    component: '<ren-score-card>, <ren-score-row>, <ren-score-data-row>, <ren-score-profile>, <ren-score-header>',
    signature: 'Big number as dominant visual. Proficiency band color border. System-generated badge. No user-created CTAs.',
    uniqueStyles: 'value (2rem), proficiency-border, band-badge, skill-bar breakdown',
  },
];

const COMPONENT_API = [
  {
    tag: '<ren-student-card>',
    properties: 'data: StudentData, shape: "card" | "compact-card", state: string, contextData: StudentCardContext',
    shapes: 'card, compact-card',
    events: 'ren-cta-click (detail: { action, student, contextData })',
    parts: 'card, body, avatar, name, levels, footer, cta, context-data, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-student-row>',
    properties: 'data: StudentData, shape: "row" | "mini-row", state: string, contextData: StudentRowContext',
    shapes: 'row, mini-row',
    events: 'ren-cta-click (detail: { action, student, contextData })',
    parts: 'row, info, avatar, name, performance, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-student-data-row>',
    properties: 'data: StudentData, state: string, contextData: StudentDataRowContext',
    shapes: 'data-row',
    events: 'ren-cta-click (detail: { action, student, contextData })',
    parts: 'row, info, name, data, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-student-profile>',
    properties: 'data: StudentData, state: StudentState',
    shapes: 'profile',
    events: 'ren-cta-click (detail: { action, student })',
    parts: 'profile, header, avatar, name, badge, actions, section-info, info-grid, section-levels, section-nested, nested-grid, nested-card',
  },
  {
    tag: '<ren-student-header>',
    properties: 'data: StudentData, state: string, contextData: StudentHeaderContext',
    shapes: 'header',
    events: 'ren-cta-click (detail: { action, student, contextData })',
    parts: 'header, avatar, name, context-data, cta',
  },
  {
    tag: '<ren-class-card>',
    properties: 'data: ClassData, shape: "card" | "compact-card", state: string, contextData: ClassCardContext',
    shapes: 'card, compact-card',
    events: 'ren-cta-click (detail: { action, class, contextData })',
    parts: 'card, body, icon, name, subject, footer, cta, context-data, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-class-row>',
    properties: 'data: ClassData, shape: "row" | "mini-row", state: string, contextData: ClassRowContext',
    shapes: 'row, mini-row',
    events: 'ren-cta-click (detail: { action, class, contextData })',
    parts: 'row, info, icon, name, stats, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-class-data-row>',
    properties: 'data: ClassData, state: string, contextData: ClassDataRowContext',
    shapes: 'data-row',
    events: 'ren-cta-click (detail: { action, class, contextData })',
    parts: 'row, info, name, data, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-class-profile>',
    properties: 'data: ClassData, state: ClassState',
    shapes: 'profile',
    events: 'ren-cta-click (detail: { action, class })',
    parts: 'profile, header, icon, name, badge, actions, section-info, info-grid, section-nested, nested-grid, nested-card',
  },
  {
    tag: '<ren-class-header>',
    properties: 'data: ClassData, state: string, contextData: ClassHeaderContext',
    shapes: 'header',
    events: 'ren-cta-click (detail: { action, class, contextData })',
    parts: 'header, icon, name, context-data, cta',
  },
  {
    tag: '<ren-assessment-card>',
    properties: 'data: AssessmentData, shape: "card" | "compact-card", state: string, contextData: AssessmentCardContext',
    shapes: 'card, compact-card',
    events: 'ren-cta-click (detail: { action, assessment, contextData })',
    parts: 'card, body, icon, name, details, footer, cta, context-data, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-assessment-row>',
    properties: 'data: AssessmentData, shape: "row" | "mini-row", state: string, contextData: AssessmentRowContext',
    shapes: 'row, mini-row',
    events: 'ren-cta-click (detail: { action, assessment, contextData })',
    parts: 'row, info, icon, name, performance, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-assessment-data-row>',
    properties: 'data: AssessmentData, state: string, contextData: AssessmentDataRowContext',
    shapes: 'data-row',
    events: 'ren-cta-click (detail: { action, assessment, contextData })',
    parts: 'row, info, name, data, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-assessment-profile>',
    properties: 'data: AssessmentData, state: AssessmentState',
    shapes: 'profile',
    events: 'ren-cta-click (detail: { action, assessment })',
    parts: 'profile, header, icon, name, badge, actions, section-info, info-grid, section-progress, progress-grid, section-nested, nested-grid, nested-card',
  },
  {
    tag: '<ren-assessment-header>',
    properties: 'data: AssessmentData, state: string, contextData: AssessmentHeaderContext',
    shapes: 'header',
    events: 'ren-cta-click (detail: { action, assessment, contextData })',
    parts: 'header, icon, name, context-data, cta',
  },
  {
    tag: '<ren-skill-card>',
    properties: 'data: SkillData, shape: "card" | "compact-card", state: string, contextData: SkillCardContext',
    shapes: 'card, compact-card',
    events: 'ren-cta-click (detail: { action, skill, contextData })',
    parts: 'card, body, code, desc, footer, cta, context-data, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-skill-row>',
    properties: 'data: SkillData, shape: "row" | "mini-row", state: string, contextData: SkillRowContext',
    shapes: 'row, mini-row',
    events: 'ren-cta-click (detail: { action, skill, contextData })',
    parts: 'row, info, code, performance, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-skill-data-row>',
    properties: 'data: SkillData, state: string, contextData: SkillDataRowContext',
    shapes: 'data-row',
    events: 'ren-cta-click (detail: { action, skill, contextData })',
    parts: 'row, info, name, data, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-skill-profile>',
    properties: 'data: SkillData, state: SkillState',
    shapes: 'profile',
    events: 'ren-cta-click (detail: { action, skill })',
    parts: 'profile, header, badge, actions, section-info, info-grid, section-mastery, section-nested, nested-grid, nested-card',
  },
  {
    tag: '<ren-skill-header>',
    properties: 'data: SkillData, state: string, contextData: SkillHeaderContext',
    shapes: 'header',
    events: 'ren-cta-click (detail: { action, skill, contextData })',
    parts: 'header, name, context-data, cta',
  },
  {
    tag: '<ren-score-card>',
    properties: 'data: ScoreData, shape: "card" | "compact-card", state: string, contextData: ScoreCardContext',
    shapes: 'card, compact-card',
    events: 'ren-cta-click (detail: { action, score, contextData })',
    parts: 'card, body, value, footer, cta, context-data, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-score-row>',
    properties: 'data: ScoreData, shape: "row" | "mini-row", state: string, contextData: ScoreRowContext',
    shapes: 'row, mini-row',
    events: 'ren-cta-click (detail: { action, score, contextData })',
    parts: 'row, info, value, name, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-score-data-row>',
    properties: 'data: ScoreData, state: string, contextData: ScoreDataRowContext',
    shapes: 'data-row',
    events: 'ren-cta-click (detail: { action, score, contextData })',
    parts: 'row, info, name, data, context-data, cta, utility-trigger, utility-menu',
  },
  {
    tag: '<ren-score-profile>',
    properties: 'data: ScoreData, state: ScoreState',
    shapes: 'profile',
    events: 'ren-cta-click (detail: { action, score })',
    parts: 'profile, header, name, state-badge, actions, section-info, info-grid, section-skills, skills-list, section-nested, nested-grid, nested-card',
  },
  {
    tag: '<ren-score-header>',
    properties: 'data: ScoreData, state: string, contextData: ScoreHeaderContext',
    shapes: 'header',
    events: 'ren-cta-click (detail: { action, score, contextData })',
    parts: 'header, name, context-data, cta',
  },
];

export default function DesignSystemPage() {
  return (
    <div className="stack" style={{ '--space': 'var(--s3)' } as React.CSSProperties}>
      <section className="section">
        <div className="center stack">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)' }}>
            Component Style Guide
          </h1>
          <p className="prose" style={{ maxWidth: 'var(--measure)' }}>
            Design tokens, shared shapes, structural categories, and the skinning API for the
            Renaissance object component library. All styles are sourced from the Next Design System
            Figma file and expressed as overridable CSS custom properties.
          </p>
        </div>
      </section>

      {/* Token Reference */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Token Reference
          </h2>
          <p className="prose">
            Every visual property in the component library uses <code>--ren-*</code> tokens.
            Each token reads an external custom property first (for skinning), then falls back to the
            default value shown here. Override any token on a parent element or <code>:root</code> to
            re-theme all components at once.
          </p>
          <div className="stack" style={{ '--space': 'var(--s2)' } as React.CSSProperties}>
            {TOKEN_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-1)' }}>
                  {group.title}
                </h3>
                <div className="table-wrap">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Token</th>
                        <th>Default</th>
                        <th>Usage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.tokens.map((t) => (
                        <tr key={t.name}>
                          <td><code>{t.name}</code></td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                              {t.value.startsWith('#') && (
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '3px',
                                    background: t.value,
                                    border: '1px solid #e5e5e5',
                                    flexShrink: 0,
                                  }}
                                  aria-hidden="true"
                                />
                              )}
                              <code>{t.value}</code>
                            </span>
                          </td>
                          <td>{t.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shape Catalog */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Shape Catalog
          </h2>
          <p className="prose">
            Every object component supports multiple shapes (card, row, profile, header).
            Shared styles for each shape are extracted into reusable Lit CSS modules in
            <code>packages/object-components/src/shared/shapes/</code>. Components import
            only the shapes they need.
          </p>
          <div className="grid" style={{ '--minimum': '280px', '--space': 'var(--s1)' } as React.CSSProperties}>
            {SHAPES.map((s) => (
              <div key={s.name} className="box" style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-2)' }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', marginBlockEnd: 'var(--s-1)' }}>
                  {s.desc}
                </p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                  <strong>File:</strong> <code>{s.file}</code>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', marginBlockStart: '4px' }}>
                  <strong>Classes:</strong> <code>{s.classes}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Primitives */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Primitives
          </h2>
          <p className="prose">
            Cross-shape primitives shared by all components, defined in
            <code>primitives.styles.ts</code>. These cover identity elements (avatar, object-icon,
            name), navigation (CTA link, CTA button), and metadata (meta, dot, badge, type-badge, accent-bar).
          </p>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Purpose</th>
                  <th>Key Properties</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><code>.avatar</code></td><td>Circular photo/initials container (People)</td><td>border-radius: 50%, 2px white border, flex center</td></tr>
                <tr><td><code>.object-icon</code></td><td>Rounded-square icon container (Container, Activity)</td><td>border-radius: --ren-radius-md, flex center, white fill</td></tr>
                <tr><td><code>.name</code></td><td>Object name treatment</td><td>font-weight: 700, color: --ren-color-text, line-height: 1.33</td></tr>
                <tr><td><code>.meta</code></td><td>Secondary info line (grade, school, subject)</td><td>font-size: 0.875rem, color: --ren-color-text-secondary</td></tr>
                <tr><td><code>.dot</code></td><td>Middot separator between meta items</td><td>color: --ren-color-border</td></tr>
                <tr><td><code>.cta-link</code></td><td>Inline link CTA with chevron icon</td><td>font-weight: 500, color: --ren-color-link, inline-flex</td></tr>
                <tr><td><code>.cta-btn</code></td><td>Outlined button CTA</td><td>8px 16px padding, 1px border, --ren-radius-md, hover bg</td></tr>
                <tr><td><code>.badge</code></td><td>State/status badge (Active, Archived, etc.)</td><td>4px 12px padding, --ren-radius-lg, 0.75rem, font-weight: 600</td></tr>
                <tr><td><code>.type-badge</code></td><td>Object type badge (Star, Benchmark, etc.)</td><td>2px 8px padding, --ren-radius-lg, 0.6875rem, white on color</td></tr>
                <tr><td><code>.accent-bar</code></td><td>Top color accent stripe on Activity/Knowledge cards</td><td>height: 4px, border-radius top corners only</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Category Templates */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Structural Categories
          </h2>
          <p className="prose">
            The 13 core objects are grouped into 5 structural categories. Each category has a
            distinct card layout with its own anatomy, dominant visuals, and content zones.
            The layout communicates what kind of thing the card represents before the user reads any text.
          </p>
          <div className="stack" style={{ '--space': 'var(--s1)' } as React.CSSProperties}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="box stack"
                style={{
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-md)',
                  '--space': 'var(--s-2)',
                } as React.CSSProperties}
              >
                <h3 style={{ fontSize: 'var(--text-lg)' }}>{cat.name}</h3>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                  <strong>Objects:</strong> {cat.objects}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)' }}>
                  <strong>Reference component:</strong> <code>{cat.component}</code>
                </div>
                <p style={{ fontSize: 'var(--text-sm)' }}>{cat.signature}</p>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                  <strong>Category-specific CSS:</strong> <code>{cat.uniqueStyles}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skinning Guide */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Skinning Guide
          </h2>
          <p className="prose">
            Components are skinnable through three mechanisms, from simplest to most powerful:
          </p>
          <div className="stack" style={{ '--space': 'var(--s1)' } as React.CSSProperties}>
            <div className="box" style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-2)' }}>
                1. CSS Custom Properties (tokens)
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', marginBlockEnd: 'var(--s-1)' }}>
                Override any <code>--ren-*</code> token on a parent element. Every component reads
                tokens via the <code>var(--external, fallback)</code> pattern, so setting
                <code>--color-text</code> on <code>:root</code> changes all components at once.
              </p>
              <pre style={{
                background: 'var(--gray-100)',
                padding: 'var(--s0)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                overflow: 'auto',
              }}>
{`:root {
  --color-text: #1a1a2e;
  --color-link: #0066cc;
  --color-border: #ddd;
  --radius-md: 12px;
}`}
              </pre>
            </div>

            <div className="box" style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-2)' }}>
                2. CSS ::part() selectors
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', marginBlockEnd: 'var(--s-1)' }}>
                Target specific structural elements inside a component&apos;s shadow DOM using
                the <code>::part()</code> pseudo-element. Every key element exposes a <code>part</code> attribute.
              </p>
              <pre style={{
                background: 'var(--gray-100)',
                padding: 'var(--s0)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                overflow: 'auto',
              }}>
{`ren-student-card::part(card) {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

ren-student-card::part(avatar) {
  border-color: #2563EB;
}

ren-score-card::part(value) {
  font-size: 3rem;
}`}
              </pre>
            </div>

            <div className="box" style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-2)' }}>
                3. Extending the component class
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', marginBlockEnd: 'var(--s-1)' }}>
                For deep customization, extend the Lit component class and add or override styles
                in the <code>static styles</code> array. Shared style modules can be mixed and
                matched freely.
              </p>
              <pre style={{
                background: 'var(--gray-100)',
                padding: 'var(--s0)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                overflow: 'auto',
              }}>
{`import { RenStudentCard } from '@renaissance/object-components';
import { css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('my-student-card')
class MyStudentCard extends RenStudentCard {
  static styles = [
    ...RenStudentCard.styles,
    css\`
      .card-wrap { box-shadow: var(--shadow-md); }
      .card-footer { background: #f0f0ff; }
    \`,
  ];
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Component API */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Component API Reference
          </h2>
          <p className="prose">
            Properties, shapes, events, and <code>::part()</code> names for all shape-specific object components.
          </p>
          <div className="stack" style={{ '--space': 'var(--s1)' } as React.CSSProperties}>
            {COMPONENT_API.map((comp) => (
              <div key={comp.tag} className="box" style={{ border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-md)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBlockEnd: 'var(--s-1)' }}>
                  <code>{comp.tag}</code>
                </h3>
                <div className="table-wrap">
                  <table className="data-table" style={{ fontSize: 'var(--text-sm)' }}>
                    <tbody>
                      <tr>
                        <td style={{ fontWeight: 600, width: '120px' }}>Properties</td>
                        <td><code>{comp.properties}</code></td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Shapes</td>
                        <td><code>{comp.shapes}</code></td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Events</td>
                        <td><code>{comp.events}</code></td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: 600 }}>Parts</td>
                        <td style={{ fontSize: 'var(--text-xs)' }}><code>{comp.parts}</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Architecture
          </h2>
          <p className="prose">
            The shared style system is organized into layers. Components compose styles from
            bottom to top: tokens &rarr; primitives &rarr; shapes &rarr; category-specific CSS.
          </p>
          <pre style={{
            background: 'var(--gray-100)',
            padding: 'var(--s1)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.6,
            overflow: 'auto',
          }}>
{`packages/object-components/src/shared/
├── tokens.ts                  ← --ren-* CSS custom properties
├── identity.ts                ← Object registry, icon helpers
├── primitives.styles.ts       ← avatar, name, meta, cta-link, cta-btn, badge
└── shapes/
    ├── card.styles.ts         ← card-wrap, card-body, card-footer
    ├── row.styles.ts          ← row-wrap, row-info, score-bar, mini/data-row
    ├── profile.styles.ts      ← profile-wrap, sections, info-grid, nested
    └── header.styles.ts       ← header-bar

Component composition:
  static styles = [
    tokenDefaults,       // Layer 1: Token defaults
    primitiveStyles,     // Layer 2: Cross-shape primitives
    cardStyles,          // Layer 3: Shape-specific styles
    rowStyles,           //          (import only what you need)
    profileStyles,
    headerStyles,
    css\`...\`,            // Layer 4: Category/object-specific overrides
  ];`}
          </pre>
        </div>
      </section>
      {/* Context-Aware Rendering */}
      <section className="section">
        <div className="center stack">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
            Context-Aware Rendering
          </h2>
          <p className="prose">
            Every shapeshifter component accepts three context props that control what renders
            based on where the component appears. When omitted, everything renders (backward-compatible).
          </p>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBlockStart: 'var(--s1)' }}>
            Context API
          </h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--text-sm)',
          }}>
            <thead>
              <tr style={{ borderBlockEnd: '2px solid var(--gray-200)' }}>
                <th style={{ textAlign: 'start', padding: '8px 12px' }}>Property</th>
                <th style={{ textAlign: 'start', padding: '8px 12px' }}>Type</th>
                <th style={{ textAlign: 'start', padding: '8px 12px' }}>Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBlockEnd: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '8px 12px' }}><code>visibleAttributes</code></td>
                <td style={{ padding: '8px 12px' }}><code>string[]</code></td>
                <td style={{ padding: '8px 12px' }}>Only render attributes whose names are in the list. Empty = show all.</td>
              </tr>
              <tr style={{ borderBlockEnd: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '8px 12px' }}><code>availableCTAs</code></td>
                <td style={{ padding: '8px 12px' }}><code>string[]</code></td>
                <td style={{ padding: '8px 12px' }}>Only render CTAs whose names are in the list. Empty = show all.</td>
              </tr>
              <tr style={{ borderBlockEnd: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '8px 12px' }}><code>contextData</code></td>
                <td style={{ padding: '8px 12px' }}><code>Record&lt;string, unknown&gt;</code></td>
                <td style={{ padding: '8px 12px' }}>Relationship-specific data from the parent context (e.g. assignment completion %).</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBlockStart: 'var(--s1)' }}>
            contextData Schema per Component
          </h3>
          {[
            {
              component: 'ren-student-card',
              fields: [
                ['groupName', 'string', 'Name of the student group'],
                ['groupRole', 'string', 'Role within the group'],
                ['recentActivity', 'string', 'Last activity description (Parent Dashboard)'],
                ['lastLogin', 'string', 'Last login timestamp'],
                ['classNames', 'string[]', 'Enrolled class names'],
              ],
            },
            {
              component: 'ren-student-row',
              fields: [
                ['assignmentCompletion', 'number', 'Completion percentage (0-100)'],
                ['assignmentStatus', 'string', '"Not Started" | "In Progress" | "Completed"'],
                ['assignmentDueDate', 'string', 'Due date display string'],
                ['assignmentScore', 'number', 'Score if assignment is completed'],
              ],
            },
            {
              component: 'ren-student-data-row',
              fields: [
                ['latestScore', 'number', 'Most recent score value (Score Report)'],
                ['scoreBand', 'string', 'Proficiency band for latest score'],
                ['scoreDate', 'string', 'When the score was recorded'],
                ['scoreGrowth', 'number', 'Student Growth Percentile'],
                ['scorePercentile', 'number', 'Percentile rank'],
              ],
            },
            {
              component: 'ren-student-header',
              fields: [
                ['activityCount', 'number', 'Activities this week (Activity Feed)'],
                ['lastActivityTime', 'string', 'Relative timestamp of last activity'],
              ],
            },
            {
              component: 'ren-class-card',
              fields: [
                ['activeAssignmentCount', 'number', 'Live assignments (Teacher Class List)'],
                ['recentAssessment', 'string', 'Name of last assessment given'],
                ['recentAssignment', 'string', 'Name of most recent assignment'],
                ['averageScore', 'number', 'Class average on recent assessment'],
                ['averageGrowth', 'number', 'Class average SGP'],
                ['attendanceRate', 'number', 'Class attendance % (School Admin)'],
                ['benchmarkAbovePercent', 'number', '% at/above benchmark'],
                ['eligibleStudentCount', 'number', 'Students eligible for assessment'],
                ['lastAssessmentDate', 'string', 'When class was last assessed'],
                ['nextAssignment', 'string', 'Next due assignment (Student view)'],
                ['nextDueDate', 'string', 'When next assignment is due'],
                ['myGrade', 'string', 'Current grade (Student view)'],
                ['dueAssignmentCount', 'number', 'Assignments due (Student view)'],
              ],
            },
            {
              component: 'ren-assessment-card',
              fields: [
                ['classCompletionPercent', 'number', 'Class-level completion percentage'],
                ['classAverageScore', 'string', 'Class average score display'],
                ['assignedClassCount', 'number', 'Number of classes assigned'],
                ['studentScore', 'number', 'Individual student score'],
                ['studentBand', 'string', 'Student proficiency band'],
                ['studentDate', 'string', 'Date the student took the assessment'],
                ['studentGrowth', 'number', 'Student Growth Percentile'],
                ['studentPercentile', 'number', 'Student percentile rank'],
                ['schoolCompletionPercent', 'number', 'School-wide completion (Admin)'],
                ['schoolAverageScore', 'string', 'School average score'],
                ['schoolCount', 'number', 'Number of schools (district)'],
                ['classCount', 'number', 'Number of classes assigned (Admin)'],
                ['windowStart', 'string', 'Assessment window start date'],
                ['windowEnd', 'string', 'Assessment window end date'],
              ],
            },
            {
              component: 'ren-skill-card',
              fields: [
                ['classMasteryPercent', 'number', 'Class average mastery percentage'],
                ['classMasteryBand', 'string', 'Distribution label for mastery'],
                ['studentMasteryPercent', 'number', 'Student mastery percentage'],
                ['studentMasteryBand', 'string', 'Student mastery level label'],
                ['lastAssessedDate', 'string', 'When mastery was last measured'],
                ['practiceAvailable', 'boolean', 'Whether practice is assignable'],
                ['studentCount', 'number', 'Students assessed on this skill'],
                ['masteredCount', 'number', 'Students at mastery level'],
                ['developingCount', 'number', 'Students at developing level'],
                ['notStartedCount', 'number', 'Students not yet started'],
                ['belowCount', 'number', 'Students below expectations'],
                ['classAveragePercent', 'number', 'Class average on this skill'],
                ['resourceCount', 'number', 'Available practice resources'],
                ['assessmentCount', 'number', 'Assessments covering this skill'],
              ],
            },
            {
              component: 'ren-score-card',
              fields: [
                ['classAverage', 'number', 'Class average score for comparison'],
                ['classPercentile', 'number', 'Class percentile rank'],
                ['trendDirection', 'string', '"up" | "down" | "flat"'],
                ['priorScore', 'number', 'Previous score in series'],
                ['growthTarget', 'number', 'Expected growth target'],
                ['gradeAverage', 'number', 'Grade-level average (Parent Report)'],
                ['studentName', 'string', 'Student name (when embedded)'],
                ['classCount', 'number', 'Classes included (district report)'],
                ['studentCount', 'number', 'Students included'],
                ['benchmarkAbovePercent', 'number', '% at/above benchmark'],
                ['benchmarkOnWatchPercent', 'number', '% on watch'],
                ['benchmarkInterventionPercent', 'number', '% needing intervention'],
              ],
            },
          ].map((comp) => (
            <div key={comp.component} style={{
              marginBlockStart: 'var(--s0)',
              padding: 'var(--s0)',
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
            }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', marginBlockEnd: 'var(--s-1)' }}>
                &lt;{comp.component}&gt;
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-xs)' }}>
                <thead>
                  <tr style={{ borderBlockEnd: '1px solid var(--gray-200)' }}>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>Key</th>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>Type</th>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {comp.fields.map(([key, type, desc]) => (
                    <tr key={key} style={{ borderBlockEnd: '1px solid var(--gray-100)' }}>
                      <td style={{ padding: '4px 8px' }}><code>{key}</code></td>
                      <td style={{ padding: '4px 8px' }}><code>{type}</code></td>
                      <td style={{ padding: '4px 8px' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBlockStart: 'var(--s1)' }}>
            Usage Example
          </h3>
          <pre style={{
            background: 'var(--gray-100)',
            padding: 'var(--s1)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-mono)',
            lineHeight: 1.6,
            overflow: 'auto',
          }}>
{`// Assignment Management context — each shape has its own component tag
const el = document.createElement('ren-student-row');
el.data = { name: 'Jane Doe', initials: 'JD', grade: '3rd Grade', ... };
el.shape = 'row';

// Filter to context-appropriate attributes
el.visibleAttributes = ['Full Name', 'Grade Level', 'Profile Photo', 'Enrollment Status'];

// Filter to context-appropriate CTAs
el.availableCTAs = ['View Profile', 'Enroll in Class'];

// Typed context data — only fields this shape accepts
el.contextData = {
  assignmentCompletion: 80,
  assignmentDueDate: 'Oct 15',
  assignmentStatus: 'In Progress',
};`}
          </pre>
          <p className="prose" style={{ marginBlockStart: 'var(--s-1)' }}>
            The <code>shouldShow()</code> helper in <code>shared/context.ts</code> handles the
            gating logic. When <code>visibleAttributes</code> or <code>availableCTAs</code> are
            undefined or empty, everything renders — keeping full backward compatibility.
          </p>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', marginBlockStart: 'var(--s2)' }}>
            Per-Context Requirements
          </h3>
          <p className="prose">
            Each view context has a <strong>user intent</strong> (the question the user is answering),
            a <strong>contextDataSchema</strong> (what relationship data the parent must provide), and a set of
            <strong> required CTAs</strong>. These are defined in each object&apos;s <code>objectViews</code> entry.
          </p>

          {[
            {
              object: 'Student',
              contexts: [
                { name: 'Class Roster', intent: 'Who is in my class and how are they performing?', shape: 'row', ctas: 'View Profile, View Scores' },
                { name: 'Assignment Management', intent: 'How is each student progressing on this assignment?', shape: 'row', ctas: 'View Profile, Enroll, Remove' },
                { name: 'Score Report', intent: 'How did each student score on this assessment?', shape: 'data-row', ctas: 'View Profile, View Scores' },
                { name: 'Student Group', intent: 'Who is in this intervention/enrichment group?', shape: 'compact-card', ctas: 'View Profile, Remove, Add to Group' },
                { name: 'Parent Dashboard', intent: 'How is my child doing overall?', shape: 'compact-card', ctas: 'View Profile' },
                { name: 'Activity Feed', intent: 'What has this student been working on recently?', shape: 'header', ctas: 'View Profile, View Activity' },
              ],
            },
            {
              object: 'Class',
              contexts: [
                { name: "Teacher's Class List", intent: "What classes do I have, and what's their status?", shape: 'card', ctas: 'View, New Assignment, Schedule, Report' },
                { name: 'School Admin List', intent: 'How are all classes performing across my school?', shape: 'data-row', ctas: 'View, Edit' },
                { name: "Student's Class List", intent: "What classes am I in, and what's due?", shape: 'compact-card', ctas: 'View' },
                { name: 'Assessment Target Picker', intent: 'Which class should I schedule this for?', shape: 'mini-row', ctas: '(checkbox)' },
              ],
            },
            {
              object: 'Assessment',
              contexts: [
                { name: 'Assessment Library', intent: 'What assessments have I given or need to give?', shape: 'card', ctas: 'View, Results, Schedule' },
                { name: 'Student Score History', intent: 'What did this student take, and what did they score?', shape: 'row', ctas: 'View, Results' },
                { name: 'Admin Dashboard', intent: 'How is this assessment performing school-wide?', shape: 'data-row', ctas: 'View, Results, Export' },
                { name: 'Student Assessment List', intent: "What do I need to take, and how did I do?", shape: 'compact-card', ctas: 'View' },
              ],
            },
            {
              object: 'Skill',
              contexts: [
                { name: 'Mastery Report', intent: 'How has my class mastered each skill?', shape: 'row', ctas: 'View, Mastery Report, Practice' },
                { name: 'Student Proficiency', intent: 'How has this student mastered each skill?', shape: 'compact-card', ctas: 'View, Practice' },
                { name: 'Assignment Builder', intent: 'Which skills should I target?', shape: 'mini-row', ctas: '(checkbox)' },
                { name: 'Assessment Breakdown', intent: 'How did students perform on each skill?', shape: 'data-row', ctas: 'View, Practice' },
              ],
            },
            {
              object: 'Score',
              contexts: [
                { name: 'Student Score View', intent: 'What did I score and what does it mean?', shape: 'card', ctas: 'View' },
                { name: 'Class Score Report', intent: 'How did my class perform?', shape: 'row', ctas: 'View, Compare, Follow-Up' },
                { name: 'Profile Score History', intent: "How has this student's score changed?", shape: 'card', ctas: 'View, Trend' },
                { name: 'School/District Report', intent: 'How are scores distributed?', shape: 'data-row', ctas: 'View, Export' },
                { name: 'Parent Report', intent: 'How is my child doing?', shape: 'card', ctas: 'View' },
              ],
            },
          ].map((obj) => (
            <div key={obj.object} style={{
              marginBlockStart: 'var(--s1)',
              padding: 'var(--s0)',
              background: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
            }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', marginBlockEnd: 'var(--s-1)' }}>
                {obj.object}
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-xs)' }}>
                <thead>
                  <tr style={{ borderBlockEnd: '1px solid var(--gray-200)' }}>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>Context</th>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>User Intent</th>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>Shape</th>
                    <th style={{ textAlign: 'start', padding: '4px 8px' }}>CTAs</th>
                  </tr>
                </thead>
                <tbody>
                  {obj.contexts.map((ctx) => (
                    <tr key={ctx.name} style={{ borderBlockEnd: '1px solid var(--gray-100)' }}>
                      <td style={{ padding: '4px 8px', fontWeight: 500 }}>{ctx.name}</td>
                      <td style={{ padding: '4px 8px', fontStyle: 'italic' }}>{ctx.intent}</td>
                      <td style={{ padding: '4px 8px' }}><code>{ctx.shape}</code></td>
                      <td style={{ padding: '4px 8px' }}>{ctx.ctas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
