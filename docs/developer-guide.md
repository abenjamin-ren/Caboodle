# Caboodle Developer Guide

This guide covers the architecture, patterns, and workflows for developing Caboodle. For quick start instructions, see [README.md](../README.md). For the full project reference (ORCA skills, agent guidelines, slash commands), see [AGENTS.md](../AGENTS.md).

---

## Architecture Overview

Caboodle is a monorepo with two packages that share a data layer:

```
┌─────────────────────────────────────────────────────┐
│                    data/                             │
│    schema.ts (types)    objects/*.json (26 files)    │
├──────────────────────┬──────────────────────────────┤
│   caboodle-site      │    object-components          │
│   (Next.js 16)       │    (Lit 3 + Vite)             │
│                      │                               │
│   React components   │    <ren-{obj}-{shape}>        │
│   for site UI        │    for object representations │
│                      │                               │
│   Pages, routing,    │    Framework-agnostic          │
│   data loading       │    Custom Elements             │
└──────────────────────┴──────────────────────────────┘
```

The **site package** handles everything specific to the Caboodle web application: routing, navigation, data loading, and site-specific UI. The **component package** produces distributable Web Components that render object representations (cards, rows, profiles) and can be imported by any Renaissance product team.

---

## Data Architecture

### Object Data Files

Each object is defined in a single JSON file at `data/objects/{slug}.json`. There are 26 files covering 13 core objects plus domain-specific objects. These files are the source of truth for everything the site displays.

A minimal object file needs at minimum:

```json
{
  "identity": {
    "slug": "student",
    "name": "Student",
    "objectType": "core",
    "category": "people",
    "definition": "A learner enrolled in one or more classes.",
    "products": "All products"
  },
  "variations": [],
  "representations": [],
  "stories": [],
  "businessRules": [],
  "lifecycle": { "states": [], "transitions": [] },
  "relationships": [],
  "relatedObjects": [],
  "nestedObjects": [],
  "allAttributes": [],
  "allCTAs": [],
  "sipValidation": {
    "structure": { "pass": true, "evidence": "..." },
    "instances": { "pass": true, "evidence": "..." },
    "purpose": { "pass": true, "evidence": "..." },
    "verdict": "Valid object"
  },
  "synonyms": []
}
```

### TypeScript Schema

All types are defined in `data/schema.ts` and shared by both packages. Key types:

| Type | Purpose |
|------|---------|
| `ObjectDefinition` | Top-level container for an object's complete specification |
| `ObjectIdentity` | Name, slug, type, category, definition, products |
| `SystemDefinition` | Product system grouping (slug, name, objectSlugs) |
| `ObjectAttribute` | Attribute with data type, source, roles, description |
| `ObjectCTA` | Call to action with P/S/T/Q priority, roles, permissions |
| `ObjectView` | `ListView` \| `DetailView` — context-specific visibility rules for attributes and CTAs (`shapes.list` / `grid` / `table` for list views) |
| `MCSFDSpec` | Relationship spec (Mechanics, Cardinality, Sorts, Filters, Dependencies) |
| `RepresentationSection` | Showcase configuration for card/list/detail views |

### Data Loading

The site loads object data at build time through two modules:

**`lib/objects.ts`** reads JSON files directly:
- `getObjectBySlug(slug)` — returns one `ObjectDefinition` or `null`
- `getAllObjects()` — returns all objects as an array
- `getAllObjectSlugs()` — returns slug strings for static path generation

**`lib/systems.ts`** derives product system groupings:
- Reads each object's `identity.products` field
- `"All products"` maps to the `common-objects` system
- Other product names are slugified and matched against `SYSTEM_META`
- `getAllSystems()` — returns all systems with their object slugs
- `getSystemBySlug(slug)` — returns a system and its resolved objects

### Server Actions

`app/actions.ts` provides two server actions that modify object JSON at runtime:

- `updateAttribute(objectSlug, attributeName, updates)` — edits attribute fields and syncs changes across `allAttributes` and `representations`
- `updateCTA(objectSlug, ctaName, updates)` — edits CTA permission, roles, and priority

These power the View Inspector's inline editing. Changes are written directly to `data/objects/{slug}.json`.

---

## Routing

The site uses Next.js App Router with system-based nesting for the Object Library.

### Route Structure

| Route | Server Component | Client Component |
|-------|-----------------|------------------|
| `/` | `app/page.tsx` | — |
| `/objects` | `app/objects/page.tsx` | `SystemLibrary.tsx` |
| `/objects/[systemSlug]` | `app/objects/[systemSlug]/page.tsx` | `SystemDetail.tsx` |
| `/objects/[systemSlug]/[objectSlug]` | `app/objects/[systemSlug]/[objectSlug]/page.tsx` | `ObjectDetailClient.tsx` |
| `/objects/.../views/[viewSlug]` | `app/objects/.../views/[viewSlug]/page.tsx` | `ViewInspector.tsx` |

### Static Path Generation

Each route with dynamic segments uses `generateStaticParams()` to produce all valid paths at build time. The Object Guide route crosses all systems with their objects:

```typescript
export async function generateStaticParams() {
  const systems = getAllSystems();
  const params = [];
  for (const sys of systems) {
    for (const objSlug of sys.objectSlugs) {
      params.push({ systemSlug: sys.slug, objectSlug: objSlug });
    }
  }
  return params;
}
```

### Server/Client Component Split

Pages follow a consistent pattern:
1. **Server component** (`page.tsx`) loads data via `lib/objects.ts` or `lib/systems.ts`
2. **Client component** (e.g., `ObjectDetailClient.tsx`) receives data as props and handles interactivity

Use `'use client'` only when the component needs:
- Event handlers (onClick, onChange)
- Browser APIs (usePathname, useState, useEffect)
- Interactive controls (tabs, toggles, forms)

---

## Component Architecture

### React Components (site UI)

Located in `packages/caboodle-site/components/`, organized by function:

| Directory | Components | Purpose |
|-----------|-----------|---------|
| `nav/` | `MainNav` | Primary site navigation |
| `ui/` | `Tabs`, `DataTable`, `ConfigPanel`, `CodeBlock`, `ShareURL`, `BackLink`, `ObjectIcon` | Reusable UI primitives |
| `preview/` | `StudentRosterPreview` | Preview renderers for View Inspector |
| `roster/` | `RosterRing`, `RosterScoreColumn`, `RosterOverflowMenu` | Student roster components |
| `prototype/` | `BreadcrumbNav` | Prototype-specific navigation |

### Preview Registry

The View Inspector renders live previews when a React component is registered for a specific object + view context. Registration is in `lib/preview-registry.ts`:

```typescript
const PREVIEW_REGISTRY: Record<string, ComponentType<PreviewInspectionProps>> = {
  'student:class-roster': StudentRosterPreview,
};
```

To add a new preview: create a component in `components/preview/`, import it in `preview-registry.ts`, and register it with the key `{objectSlug}:{viewValue}`.

### Lit Web Components (object representations)

Located in `packages/object-components/src/`. Currently rebuilding — only two files remain:

- `ren-student-row.ts` — reference implementation for row components
- `shared/tokens.ts` — design token CSS custom properties

**Component pattern** (from the reference `ren-student-row.ts`):

1. Extend `LitElement` with `@customElement('ren-{object}-{shape}')`
2. Import `tokenDefaults` from `shared/tokens.ts` for CSS custom property fallbacks
3. Define `@property` decorators for data, shape variant, and state
4. Use `static styles` combining shared style modules with component-local CSS
5. Render with Lit's `html` tagged template

**Token system**: Components use `--ren-*` CSS custom properties that fall back to page-level `--color-*`, `--font-*`, `--space-*` tokens. This means components automatically inherit the site's theme when rendered inside Caboodle, and can be re-themed by any consumer setting the outer properties.

---

## CSS Architecture

### File Organization

CSS is loaded through two imports in the root layout:

1. `globals.css` — imports `tokens.css` and `layouts.css`, plus base reset, typography, focus styles, and utility classes
2. `components.css` — all site-specific component styles

### Design Tokens (`tokens.css`)

Spacing uses a **1.5 ratio modular scale** centered on `--s0: 1rem`:

| Token | Value | Use |
|-------|-------|-----|
| `--s-5` | ~0.13rem | Hairline spacing |
| `--s-3` | ~0.30rem | Tight padding |
| `--s-1` | ~0.67rem | Compact spacing |
| `--s0` | 1rem | Base unit |
| `--s1` | 1.5rem | Standard spacing |
| `--s3` | 3.38rem | Section gaps |
| `--s5` | 7.59rem | Hero spacing |

Colors:
- `--color-dark` (#1a1a2e) — dark backgrounds, text
- `--color-brand` (#cf3a4e) — brand red
- `--color-accent` (#2B87FF) — interactive blue

Typography:
- `--font-display` (Georgia) — headings
- `--font-plain` (Roboto) — body text
- `--font-mono` — code blocks

### Every Layout Primitives (`layouts.css`)

Page layout is built entirely from composition primitives. These are configured via CSS custom properties on the element, not by creating new classes.

| Primitive | What It Does | Configuration |
|-----------|-------------|---------------|
| `.stack` | Vertical spacing between direct children | `--space` sets the gap |
| `.box` | Padded container with optional border | `--padding`, `--border-width` |
| `.center` | Centered column with max-width | `--max-width`, `--gutters` |
| `.cluster` | Horizontal wrapping group | `--space`, `--justify`, `--align` |
| `.with-sidebar` | Sidebar + fluid content | `--sidebar-width`, `--content-min` |
| `.switcher` | Horizontal until too narrow, then stacks | `--threshold`, `--space` |
| `.grid` | Auto-filling equal columns | `--min-width`, `--space` |
| `.cover` | Vertically centered in tall container | `--min-height`, `--space` |
| `.frame` | Aspect ratio container | `--n` (numerator), `--d` (denominator) |
| `.reel` | Horizontal scrolling strip | `--item-width`, `--space` |

**Usage example:**
```html
<div class="stack" style="--space: var(--s2)">
  <h2>Heading</h2>
  <p>Content with 1.5rem gap above</p>
</div>
```

**Rules:**
- Never modify `layouts.css` — compose the existing primitives
- No `@media` breakpoints for layout — intrinsic sizing handles responsiveness
- Use logical properties (`margin-block-start`, `padding-inline`)
- Configure spacing with modular scale tokens

### Component Styles (`components.css`)

Add new component styles here. Check existing classes before creating new ones — the file is substantial (~4000+ lines) and covers navigation, cards, tables, view inspector, roster, and more.

---

## Adding a New Object

End-to-end workflow for adding an object to the system:

### 1. Create the JSON Data File

Create `data/objects/{slug}.json` conforming to the `ObjectDefinition` type. Use an existing file (e.g., `student.json`) as a reference. At minimum, fill in:

- `identity` — slug, name, type, category, definition, products
- `allAttributes` — the object's attributes
- `allCTAs` — the object's calls to action with P/S/T/Q priority
- `sipValidation` — Structure/Instances/Purpose evidence

### 2. Set System Membership

The `identity.products` field determines which system(s) the object appears in:

- `"All products"` → appears in Common Objects
- `"Renaissance Intelligence"` → appears in Renaissance Intelligence system
- `"Nearpod"` → appears in Nearpod system
- Comma-separated for multiple: `"Star, Freckle"`

If the product system is new, add its metadata to `SYSTEM_META` in `lib/systems.ts`.

### 3. Add an Icon

Place the object's icon SVG at `packages/caboodle-site/public/img/{slug}_icon.svg`. Use the appropriate naming convention:

- Core objects: `{slug}_icon.svg`
- Variations: `{slug}-{variation}_icon.svg`
- Domain objects: `{domain}-{slug}_icon.svg`

### 4. Verify

Run `npm run dev` and navigate to `/objects`. The object should appear in the correct system's card grid. Click through to verify the Object Guide page renders with your data.

### 5. Add object views (optional)

Add `objectViews` entries to the object JSON to define context-specific attribute/CTA visibility. Use `viewType: 'list'` with optional `shapes.list`, `shapes.grid`, and `shapes.table` (each a `ShapeSpec`), or `viewType: 'detail'` for full-record views. Each view's `value` contributes to the View Inspector route slug at `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]`.

---

## Building a Page

### Create the Route

Create `packages/caboodle-site/app/{route}/page.tsx`. Use server components by default:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page Title' };

export default function MyPage() {
  return (
    <header className="l-page-header">
      <h1>Page Title</h1>
    </header>
    // page content
  );
}
```

### Use Layout Primitives

Build page structure with Every Layout classes:

```html
<div class="center">
  <div class="stack" style="--space: var(--s2)">
    <section class="box">
      <div class="cluster">
        <!-- horizontal group of items -->
      </div>
    </section>
    <section class="grid" style="--min-width: 250px">
      <!-- auto-filling card grid -->
    </section>
  </div>
</div>
```

### Add Component Styles

If you need new component-specific CSS, add it to `styles/components.css`. Follow existing naming patterns (e.g., `.guide-header`, `.system-card`, `.roster-ring`).

---

## Building Web Components

Use `ren-student-row.ts` as the reference implementation.

### Component Structure

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokenDefaults } from './shared/tokens.js';

@customElement('ren-{object}-{shape}')
export class Ren{Object}{Shape} extends LitElement {
  static styles = [
    tokenDefaults,
    css`/* component-specific styles */`
  ];

  @property({ type: Object }) data: {Object}Data = {};
  @property({ reflect: true }) shape: '{shape}' | '{alt-shape}' = '{shape}';

  render() {
    return html`<!-- template -->`;
  }
}
```

### Component families (list / grid / table / detail)

Each object can have multiple components, one per family. Author **`objectViews`** in JSON with `viewType: 'list'` and `shapes` keys `list`, `grid`, `table`, or `viewType: 'detail'`. `ValidShape` is `'list' | 'grid' | 'table'`.

| Family | File | Typical JSON mapping | Purpose |
|--------|------|---------------------|---------|
| Card | `ren-{obj}-card.ts` | `shapes.grid` | Grids, dashboards |
| Row | `ren-{obj}-row.ts` | `shapes.list`, `shapes.table` | Lists, rosters, tables |
| Data Row | `ren-{obj}-data-row.ts` | `shapes.table` (wide) | Reports (Group A only) |
| Profile | `ren-{obj}-profile.ts` | `DetailView` regions | Detail views |
| Header | `ren-{obj}-header.ts` | `DetailView` header | Page headers (Groups A+B) |

Component-level `shape` props may still use legacy literals (e.g. `'row' \| 'mini-row'`) where the source file has not been refactored; new work should align props with **`objectViews`** shape keys.

### Theming

Components use `--ren-*` CSS custom properties that fall back to page-level tokens. Consumers can override any token:

```css
ren-student-row {
  --ren-color-brand: #custom-brand;
  --ren-font-plain: 'Custom Font', sans-serif;
}
```

---

## PWA Setup

Caboodle is configured as a Progressive Web App:

- **Service Worker**: `app/sw.ts` using Serwist. Handles caching and push notification events. Built to `public/sw.js` at build time.
- **Manifest**: `app/manifest.ts` generates the web app manifest with icons, theme color, and standalone display mode.
- **Push Actions**: `app/push-actions.ts` has VAPID-based push subscription management. Not yet wired to any UI.
- **Next.js Config**: `next.config.ts` wraps the config with `@serwist/next` for SW injection. Serwist is disabled in development.

---

## ORCA Workflow Integration

Caboodle's data follows a **draft-then-promote** model:

1. ORCA skills write artifacts to `orca/{project-name}/` as markdown files
2. Each file tracks status in YAML frontmatter: `draft` → `confirmed` → `promoted`
3. The **orca-promote** skill syncs confirmed artifacts into `data/objects/*.json`

During an ORCA session, never write directly to `data/objects/*.json`. Use the workspace, iterate, confirm, then promote.

---

## Troubleshooting

### Object doesn't appear in the library

- Check that `identity.products` matches a known system (or is `"All products"`)
- Verify the JSON file is valid and parseable
- Check the file is in `data/objects/` (not a subdirectory)

### Object Guide shows empty tabs

- Verify the relevant arrays in the JSON aren't empty (`allAttributes`, `allCTAs`, `relationships`)
- Check that attribute/CTA names match any referenced names in `objectViews` (`visibleAttributes`, `availableCTAs`, and nested `ShapeSpec` fields)

### WC library build fails

- The library needs rebuilding — most source files are missing
- Only `ren-student-row.ts` and `shared/tokens.ts` exist on disk
- The Vite config references many files that don't exist yet
