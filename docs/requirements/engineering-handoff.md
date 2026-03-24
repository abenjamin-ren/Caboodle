# Engineering Handoff — Caboodle (OOUX Resource Site)

**Project:** Caboodle — OOUX Resource Site (Internal Renaissance)
**Status:** Object Library with system-based routing, 26 object data files, View Inspector with inline editing. Lit WC library needs rebuilding.
**Source Artifacts:** Steps 01–12 in `docs/requirements/`, status index at `docs/requirements/STATUS.md`

---

## Implemented Architecture

### Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| **Monorepo** | npm workspaces | Root `package.json` with `packages/*` |
| **Site** | Next.js 16 App Router | React 19, TypeScript, `packages/caboodle-site/` |
| **Web Components** | Lit 3 + Vite | TypeScript, `packages/object-components/` (rebuilding) |
| **Styling** | CSS custom properties | Every Layout primitives + modular scale tokens |
| **Fonts** | Google Fonts CDN + Font Awesome | Roboto (body), Georgia (display), Material Icons |
| **Data** | JSON files + TypeScript schema | `data/objects/*.json`, `data/schema.ts` |
| **PWA** | Serwist | Service worker, web app manifest, push actions (not yet wired) |
| **Build** | Vite (WC) → Next.js (site) | `npm run build` chains both |

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (from root) |
| `npm run build` | Build WC library then Next.js site |
| `npm run build:components` | Build Lit Web Component library only |
| `npm run build:site` | Build Next.js site only |

---

## Two-Layer Component Architecture

Caboodle uses two distinct component layers that serve different audiences.

### Layer 1: React Components (site UI)

Located in `packages/caboodle-site/components/`. Standard React components for site-level UI — used only within the Next.js site.

| Component | Location | Purpose |
|-----------|----------|---------|
| `MainNav` | `nav/MainNav.tsx` | Primary navigation with search trigger (non-functional) and profile stub |
| `Tabs` | `ui/Tabs.tsx` | Accessible tab interface with ARIA tablist/tab/tabpanel |
| `DataTable` | `ui/DataTable.tsx` | `AttributeTable` and `CTATable` for object data display |
| `ConfigPanel` | `ui/ConfigPanel.tsx` | Role/lifecycle toggle controls |
| `CodeBlock` | `ui/CodeBlock.tsx` | Syntax-highlighted code examples |
| `ShareURL` | `ui/ShareURL.tsx` | Copy-to-clipboard URL sharing |
| `BackLink` | `ui/BackLink.tsx` | Back navigation pattern |
| `ObjectIcon` | `ui/ObjectIcon.tsx` | Resolves icon path by object type (core/domain/variation) |
| `StudentRosterPreview` | `preview/StudentRosterPreview.tsx` | Preview renderer for student:class-roster context |
| `RosterRing` | `roster/RosterRing.tsx` | Dual-arc score ring visualization |
| `RosterScoreColumn` | `roster/RosterScoreColumn.tsx` | Score column in roster row |
| `RosterOverflowMenu` | `roster/RosterOverflowMenu.tsx` | Overflow menu for roster actions |
| `BreadcrumbNav` | `prototype/BreadcrumbNav.tsx` | Breadcrumbs for prototype views |

### Layer 2: Lit Web Components (object representations) — Rebuilding

Located in `packages/object-components/src/`. Framework-agnostic Custom Elements distributable as `@renaissance/object-components`.

**Current state:** The library was previously built and source files have been deleted. Only two files remain:
- `ren-student-row.ts` — the `<ren-student-row>` component (row + mini-row shapes)
- `shared/tokens.ts` — design token CSS custom properties (`--ren-*` variables)

**Target architecture:** Components follow the `<ren-{object}-{shapeFamily}>` naming convention. Each object gets shape-specific components (card, row, data-row, profile, header) depending on its group classification (A/B/C).

### Server Actions

`app/actions.ts` provides two server actions that read/write `data/objects/{slug}.json`:
- `updateAttribute()` — edit attribute description, source, data type
- `updateCTA()` — edit CTA permission, roles, priority, role keys

These power the View Inspector's inline editing capability.

### Preview System

`lib/preview-registry.ts` maps `{objectSlug}:{viewValue}` keys to React preview components. Currently registered: `student:class-roster` → `StudentRosterPreview`. The View Inspector renders the matched preview component when available.

### Server/Client Split

Object Guide pages follow a consistent pattern:
- **Server component** (`page.tsx`) — loads JSON data at build time via `lib/objects.ts`, passes typed props
- **Client component** (e.g. `ObjectDetailClient.tsx`) — receives data as props, renders interactive tabs, controls, and data tables

---

## Routing

The site uses **system-based routing** for the Object Library. Objects are grouped by product system (derived from each object's `identity.products` field via `lib/systems.ts`).

| Route | Page | Component | Status |
|-------|------|-----------|--------|
| `/` | Home | `app/page.tsx` | Built — hero, pitch, links |
| `/objects` | Object Library | `app/objects/page.tsx` + `SystemLibrary.tsx` | Built — system catalog with object/view counts |
| `/objects/[systemSlug]` | System Detail | `app/objects/[systemSlug]/page.tsx` + `SystemDetail.tsx` | Built — object card grid per system |
| `/objects/[systemSlug]/[objectSlug]` | Object Guide | `app/objects/[systemSlug]/[objectSlug]/page.tsx` + `ObjectDetailClient.tsx` | Built — 4 tabs (Views, Attributes, Actions, Relationships) |
| `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]` | View Inspector | `views/[viewSlug]/page.tsx` + `ViewInspector.tsx` | Built — attribute/CTA editing, preview rendering |
| `/design-system` | Design System | `app/design-system/page.tsx` | Built — component style guide (not in nav) |
| `/glossary` | Glossary | `app/glossary/page.tsx` | Placeholder |
| `/process` | Process | `app/process/page.tsx` | Placeholder |
| `/resources` | Resources | `app/resources/page.tsx` | Placeholder |

### System Derivation

`lib/systems.ts` derives system groupings at build time:
1. Reads each object's `identity.products` string
2. `"All products"` → maps to `common-objects` system
3. Other values are slugified and mapped to `SYSTEM_META` for display names, descriptions, and owners
4. `generateStaticParams` in route files produces all valid URL paths

Known systems: `common-objects`, `renaissance-intelligence`, `nearpod`, `freckle`, `star`, `ar`, `myon`, `lalilo`

---

## Data Architecture

### Storage

Object data is stored as JSON files in `data/objects/` — one file per object (26 files total). No database. The Next.js site reads these files at build time via `lib/objects.ts`. Server actions in `app/actions.ts` can modify JSON files at runtime for the View Inspector.

### Schema

All types are defined in `data/schema.ts`:

| Type | Purpose |
|------|---------|
| `ObjectDefinition` | Top-level type — everything about an object |
| `ObjectIdentity` | Name, slug, qualifier, objectType, category, definition, synonyms, products |
| `SystemDefinition` | System-level grouping (slug, name, description, owner, objectSlugs) |
| `ObjectAttribute` | Attribute with dataType, source, description, optional role restriction |
| `ObjectCTA` | CTA with roles, permission, priority (P/S/T/Q), optional cross-object link |
| `ObjectVariation` | Domain-specific variant (name, qualifier, slug, products, objectType) |
| `ShapeshifterEntry` | Context-specific attribute/CTA visibility and card shape |
| `RepresentationSection` | Showcase config: layout, examples, attributes, CTAs, componentTag |
| `UserStory` | Role/action/object/benefit with when/then clauses |
| `BusinessRule` | Title + description pairs |
| `LifecycleFlow` | States + transitions |
| `MCSFDSpec` | Relationship spec: target, mechanics, cardinality, sorts, filters, dependencies |
| `NestedObject` | Nested object reference with cardinality |
| `SIPValidation` | Structure/Instances/Purpose validation with evidence |
| `SynonymEntry` | Term, context, notes |

### Type Enums

```typescript
ObjectType:     'core' | 'domain' | 'variation'
ObjectCategory: 'people' | 'container' | 'activity' | 'knowledge' | 'data-ai'
Priority:       'P' | 'S' | 'T' | 'Q'
ValidShape:     'card' | 'compact-card' | 'row' | 'mini-row' | 'data-row' | 'profile' | 'header' | 'detail' | 'embedded' | 'tooltip'
```

---

## Object Identity System

Objects use an **icon-based** identity system with three tiers — no per-object colors or avatar shapes.

| Icon | Object Type | Meaning |
|------|-------------|---------|
| `object_icon.svg` | Core object | A canonical, standalone object |
| `object-variation_icon.svg` | Variation | A contextual variant of a core object |
| `domain-object_icon.svg` | Domain object | A domain-specific specialization |

The `ObjectIcon` React component (`components/ui/ObjectIcon.tsx`) resolves the correct icon path based on object type.

> **Note:** The `design-system.md` requirement doc proposed per-object identity colors and avatar shapes. The implementation chose an icon-based identity system instead. See `docs/decisions/004-icon-identity.md` for the rationale.

---

## CSS Architecture

CSS is imported via `globals.css` in the Next.js root layout:

1. **`tokens.css`** — Design tokens: modular scale spacing (ratio 1.5, `--s-5` through `--s5`), measure (`--measure: 60ch`), color palette (`--color-brand`, `--color-accent`, neutrals), typography (`--font-display`, `--font-plain`, `--font-mono`)
2. **`layouts.css`** — Every Layout composition primitives configured via CSS custom properties. No fixed breakpoints — layouts respond intrinsically.
3. **`components.css`** — Site-specific UI: navigation, cards, object guides, data tables, view inspector, roster components, etc.

CSS custom properties pass through shadow DOM boundaries, allowing Lit Web Components to inherit theming from the site via `--ren-*` tokens defined in `shared/tokens.ts`.

---

## What's Built

### Object Guide — 4 Tabs

1. **Views** — Cards linking to View Inspector pages for each shapeshifter context
2. **Attributes** — `AttributeTable` showing all object attributes with data type, source, description
3. **Actions** — `CTATable` with priority badges + user story cards
4. **Relationships** — MCSFD spec tables + nested object links

### View Inspector

Per-shapeshifter-context editing interface with:
- Role selection controls
- Attribute toggle list with inline editing (description, source, data type)
- CTA toggle list with inline editing (permission, roles, priority)
- Preview rendering when a component is registered in `preview-registry.ts`
- Changes persist to JSON via server actions

### Student Roster Prototype

Partially implemented from `student-roster-list.md` spec:
- `RosterRing` — dual-arc SVG donut (reading/math proportion)
- `RosterScoreColumn` — score value + proficiency band display
- `RosterOverflowMenu` — three-dot menu with menu items
- `StudentRosterPreview` — composition registered as `student:class-roster` preview
- `ren-student-row.ts` — Lit WC row component (row + mini-row shapes)

### Core Object Data

26 object JSON files across 13 core objects + domain-specific objects, covering: Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight, and domain objects for Renaissance Intelligence, Nearpod, Freckle, etc.

---

## What Needs Building

### Lit Web Component Library (rebuild)

Source files were deleted. Reference implementation: `ren-student-row.ts` + `shared/tokens.ts`. Target: ~127 shape components across 26 objects.

Steps to rebuild:
1. Create `shared/` infrastructure: `context.ts`, `identity.ts`, `shape-tags.ts`, `shapes/` CSS, `{slug}.base.ts` per object
2. Create barrel `src/index.ts` exporting all components
3. Create shape components per object following group classification (A: 5 shapes, B: 4 shapes, C: 3 shapes)
4. Verify `vite build` produces the `dist/` output
5. Test components render in Object Guide showcases

### Content Pages

- **Glossary** — searchable OOUX terminology
- **Process** — ORCA process guide (3 rounds, 12 steps)
- **Resources** — templates, downloads, guides
- **Design System** — needs linking in nav

### Site Features

- **Search** — MainNav has search trigger UI, no implementation
- **User profile** — MainNav has profile button stub
- **Push notifications** — server-side VAPID actions exist, not wired to UI
- **Prototype routes** — `ClassDetailClient.tsx` exists but has no `page.tsx`

### Future Phases

| Feature | Notes |
|---------|-------|
| Database | PostgreSQL via Supabase or Prisma |
| Auth | Supabase Auth with SSO/SAML |
| Search | Typesense or Algolia for faceted search |
| Blog/CMS | MDX for posts, database for structured objects |
| npm publishing | Publish `@renaissance/object-components` to npm |
| Figma integration | Design token export |

---

## Development Guidelines

### Adding a New Object

1. Create `data/objects/{slug}.json` conforming to `data/schema.ts`
2. Set `identity.products` to the appropriate product name(s) — this determines system membership
3. The Object Library, system detail, and Object Guide pages generate automatically via `generateStaticParams`
4. Add an icon at `packages/caboodle-site/public/img/{slug}_icon.svg`

### Adding a View Preview

1. Create a React preview component in `components/preview/`
2. Register it in `lib/preview-registry.ts` with key `{objectSlug}:{viewValue}`
3. The View Inspector will render it automatically when that context is selected

### CSS Rules

- New layout needs → compose existing Every Layout primitives
- New component styles → add to `components.css`
- New design tokens → add to `tokens.css`
- Never modify `layouts.css` for page-specific needs
- Use modular scale tokens (`--s-5` through `--s5`) for all spacing
- Use logical properties (`margin-block-start`, `inline-size`)

### Accessibility

- WCAG 2.1 AA target
- All images: `alt` text (decorative: `alt=""` with `aria-hidden="true"`)
- Focus styles via `:focus-visible`
- Keyboard-navigable tab interfaces and toggles
- Material Icons: `aria-hidden="true"` when decorative
