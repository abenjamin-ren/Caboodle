# Component API Reference

This document covers both the Lit Web Component library (`@renaissance/object-components`) and the React components used in the Caboodle site.

---

## Lit Web Component Library

Package: `@renaissance/object-components`
Location: `packages/object-components/`
Status: **Rebuilding** — only `ren-student-row` and `shared/tokens.ts` exist on disk. This document describes the target API.

### Shape System

Every object can be rendered in multiple shapes. Each shape family is a separate component file:

| Shape Family | Component Tag | Shapes | Purpose | Group |
|-------------|---------------|--------|---------|-------|
| Card | `<ren-{obj}-card>` | `card`, `compact-card` | Grid cards, dashboard tiles, search results | All |
| Row | `<ren-{obj}-row>` | `row`, `mini-row` | List views, rosters, tables | All |
| Data Row | `<ren-{obj}-data-row>` | `data-row` | Reports, score tables | A only |
| Profile | `<ren-{obj}-profile>` | `profile` | Detail/profile views | All |
| Header | `<ren-{obj}-header>` | `header` | Page headers, expanded view | A + B |

**Group classification:**
- **Group A** (8 objects — 5 shapes each): student, teacher, class, school, district, assessment, skill, score
- **Group B** (13 objects — 4 shapes each): activity-event, activity, assignment, insight, lesson, live-session, product-assignment, product, proficiency-prediction, report, resource, solution, standard
- **Group C** (5 objects — 3 shapes each): educator-academy-module, learning-path, onboarding-checklist, onboarding-step, student-group

### Generic Component

`<ren-object-card>` renders any object from the library grid using the shared identity system. Used by the Object Library page.

### Component API Pattern

All shape components follow this property pattern (using `ren-student-row` as reference):

| Property | Type | Description |
|----------|------|-------------|
| `data` | `{Object}Data` | Object data (name, attributes, metrics) |
| `shape` | string union | Shape variant within the family (e.g., `'row' \| 'mini-row'`) |
| `state` | string | Lifecycle state (e.g., `'active'`, `'transferred'`) |
| `role` | string | Viewing user's role (affects visible CTAs) |
| `ctx-*` | various | Context-specific data attributes (prefixed with `ctx-`) |
| `selected` | boolean | Whether the item is selected (for multi-select contexts) |
| `selectable` | boolean | Whether selection UI is shown |

### Usage Example

```html
<ren-student-row
  .data=${{ name: 'Jane Doe', grade: '3', readingLevel: '3.2 GE' }}
  shape="row"
  state="active"
  role="teacher"
></ren-student-row>
```

### Events

Components dispatch standard Custom Events:

| Event | Detail | When |
|-------|--------|------|
| `ren-action` | `{ action: string, data: object }` | User triggers a CTA |
| `ren-select` | `{ selected: boolean, data: object }` | Selection state changes |
| `ren-navigate` | `{ target: string, slug: string }` | Navigation link clicked |

### Shared Infrastructure (planned)

| Module | Purpose |
|--------|---------|
| `shared/tokens.ts` | Design token CSS custom properties (exists) |
| `shared/{slug}.base.ts` | Shared types (`{Object}Data`, `{Object}State`) and constants (`OVERFLOW_CTAS`, `STATUS_CLASS`) per object |
| `shared/context.ts` | `shouldShow(attr, context)` and `ctx(element, key)` helpers for context-aware rendering |
| `shared/identity.ts` | Object identity rendering (icons, type badges, registry) |
| `shared/shape-tags.ts` | `resolveShapeTag(baseTag, shape)` utility for dynamic tag resolution |
| `shared/primitives.styles.ts` | Shared CSS primitives (resets, utilities) |
| `shared/shapes/*.styles.ts` | Per-shape-family shared CSS (card, row, profile, header) |
| `shared/utility-menu.styles.ts` | Overflow/utility menu styling |
| `shared/utility-menu.controller.ts` | `UtilityMenuController` for managing menu open/close state |

---

## Design Token Reference

All `--ren-*` tokens defined in `shared/tokens.ts`. Each falls back to a page-level `--{name}` variable, then to a hardcoded default.

### Typography

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-font-plain` | `--font-plain` | Roboto, system-ui, sans-serif |
| `--ren-font-mono` | `--font-mono` | ui-monospace, Cascadia Code, monospace |
| `--ren-tracking` | `--tracking` | 0.5px |

### Colors — Text & Background

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-color-dark` | `--color-dark` | #1a1a2e |
| `--ren-color-mid` | `--color-mid` | #4a4a68 |
| `--ren-color-text` | `--color-text` | #202020 |
| `--ren-color-text-secondary` | `--color-text-secondary` | #4d4d4d |
| `--ren-color-text-muted` | `--color-text-muted` | #707070 |
| `--ren-color-bg` | `--color-bg` | #fff |
| `--ren-color-bg-muted` | `--color-bg-muted` | #fafafa |
| `--ren-color-bg-tertiary` | `--color-bg-tertiary` | #fff4f4 |
| `--ren-color-bg-hover` | `--color-bg-hover` | #f5f5f5 |

### Colors — Brand & Interactive

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-color-brand` | `--color-brand` | #cf3a4e |
| `--ren-color-accent` | `--color-accent` | #2B87FF |
| `--ren-color-interactive` | `--color-interactive` | #146EB3 |
| `--ren-color-link` | `--color-link` | #146EB3 |
| `--ren-color-success` | `--color-success` | #398b26 |
| `--ren-color-warning` | `--color-warning` | #e6a817 |

### Colors — Borders

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-color-border` | `--color-border` | #e5e5e5 |
| `--ren-color-border-light` | `--color-border-light` | #eee |

### Colors — Status

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-color-status-success` | `--color-status-success` | #2e7d32 |
| `--ren-color-status-success-bg` | `--color-status-success-bg` | #e8f5e9 |
| `--ren-color-status-warning` | `--color-status-warning` | #e65100 |
| `--ren-color-status-warning-bg` | `--color-status-warning-bg` | #fff3e0 |
| `--ren-color-status-danger` | `--color-status-danger` | #c62828 |
| `--ren-color-status-danger-bg` | `--color-status-danger-bg` | #fce4ec |
| `--ren-color-status-info` | `--color-status-info` | #1565c0 |
| `--ren-color-status-info-bg` | `--color-status-info-bg` | #e3f2fd |
| `--ren-color-status-neutral` | `--color-status-neutral` | #666 |
| `--ren-color-status-neutral-bg` | `--color-status-neutral-bg` | #f5f5f5 |

### Colors — Subject & Object Type

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-color-subject-reading` | `--color-subject-reading` | #8385F6 |
| `--ren-color-subject-math` | `--color-subject-math` | #41C395 |
| `--ren-color-core-object` | `--color-core-object` | #2563EB |
| `--ren-color-domain-object` | `--color-domain-object` | #7C3AED |
| `--ren-color-variation-object` | `--color-variation-object` | #059669 |

### Spacing

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-space-xs` | `--space-xs` | 0.25rem |
| `--ren-space-sm` | `--space-sm` | 0.5rem |
| `--ren-space-md` | `--space-md` | 1rem |
| `--ren-space-lg` | `--space-lg` | 1.5rem |
| `--ren-space-xl` | `--space-xl` | 2rem |

### Border Radius

| Token | Fallback | Default |
|-------|----------|---------|
| `--ren-radius-xs` | `--radius-xs` | 3px |
| `--ren-radius-sm` | `--radius-sm` | 4px |
| `--ren-radius-md` | `--radius-md` | 8px |
| `--ren-radius-lg` | `--radius-lg` | 12px |
| `--ren-radius-pill` | `--radius-pill` | 9999px |

### Theming

To re-theme all components at once, set the page-level variables:

```css
:root {
  --color-brand: #your-brand;
  --color-accent: #your-accent;
  --font-plain: 'Your Font', sans-serif;
}
```

Or target specific components:

```css
ren-student-row {
  --ren-color-brand: #custom;
}
```

---

## React Component Catalog

These components are in `packages/caboodle-site/components/` and are used only within the Next.js site.

### Navigation

#### `MainNav`

Primary site navigation. Renders logo, search trigger, tab links, and profile button.

| Feature | Status |
|---------|--------|
| Logo link | Working |
| Tab navigation (Home, Object Library, Resources, Process, Glossary) | Working |
| Active page indicator (`aria-current="page"`) | Working |
| Search trigger | UI only — no search implementation |
| Profile button | UI only — stub |

### UI Primitives

#### `Tabs`

Accessible tab interface with full ARIA support.

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `{ id: string; label: string }[]` | Tab definitions |
| `defaultTab` | `string` | Initial active tab ID |
| `children` | `ReactNode` | Tab panel content keyed by tab ID |

Keyboard navigation: arrow keys cycle through tabs, Home/End jump to first/last.

#### `DataTable` — `AttributeTable`

Renders a table of object attributes.

| Prop | Type | Description |
|------|------|-------------|
| `attributes` | `ObjectAttribute[]` | Attributes to display |
| `onEdit` | `(name, updates) => void` | Callback for inline editing |

Columns: Name, Data Type, Source, Description.

#### `DataTable` — `CTATable`

Renders a table of object CTAs with priority badges.

| Prop | Type | Description |
|------|------|-------------|
| `ctas` | `ObjectCTA[]` | CTAs to display |
| `onEdit` | `(name, updates) => void` | Callback for inline editing |

Columns: Name, Priority (P/S/T/Q badge), Roles, Permission.

#### `ObjectIcon`

Renders the correct icon SVG based on object type.

| Prop | Type | Description |
|------|------|-------------|
| `objectType` | `ObjectType` | `'core'`, `'domain'`, or `'variation'` |
| `size` | `number` | Icon size in pixels |
| `alt` | `string` | Alt text |

#### `BackLink`

Styled back navigation link.

#### `ShareURL`

Copy-to-clipboard URL sharing with visual feedback.

#### `CodeBlock`

Syntax-highlighted code display with copy button.

#### `ConfigPanel`

Radio button groups for role/lifecycle/context toggling.

### Preview Components

#### `StudentRosterPreview`

Preview renderer for the student class-roster shapeshifter context. Composes `RosterRing`, `RosterScoreColumn`, and `RosterOverflowMenu`.

### Roster Components

#### `RosterRing`

Dual-arc SVG donut visualization showing reading/math score proportions.

| Prop | Type | Description |
|------|------|-------------|
| `readingPercent` | `number` | Reading arc proportion (0-100) |
| `mathPercent` | `number` | Math arc proportion (0-100) |

#### `RosterScoreColumn`

Score display with subject dot, value, and proficiency band label.

#### `RosterOverflowMenu`

Three-dot menu with dropdown menu items. Handles outside-click-to-close.
