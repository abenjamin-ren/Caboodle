# Caboodle

Caboodle is an **internal OOUX resource site for Renaissance**. It teaches Object-Oriented UX, houses the Object Directory (26 object definitions across Renaissance products), and provides tools, templates, and guides for ORCA practitioners.

## Tech Stack

- **Monorepo** with npm workspaces
- **Next.js 16 App Router** (React 19, TypeScript) — site package
- **Lit 3 Web Components** (TypeScript, Vite) — distributable object representations (rebuilding; see [Current Status](#current-status))
- **Every Layout** composition system for all page layouts
- **CSS custom properties** — design tokens, no Tailwind, no CSS-in-JS
- **Google Fonts** (Roboto) + **Material Icons** + **Font Awesome** via CDN
- **Serwist** PWA service worker
- **GitHub Actions** for releases (`.github/workflows/release.yml`)

## Project Structure

```
Caboodle/
├── package.json                        # Root — npm workspaces config + top-level scripts
├── caboodle-logo.svg
├── data/
│   ├── schema.ts                       # Shared TypeScript types (ObjectDefinition, SystemDefinition, etc.)
│   ├── mock/                           # Mock data for prototypes and previews
│   └── objects/                        # Object data — one JSON file per object (26 files)
│       └── student.json
├── packages/
│   ├── caboodle-site/                  # Next.js App Router site
│   │   ├── app/
│   │   │   ├── layout.tsx              # Root layout (nav, fonts, global CSS)
│   │   │   ├── page.tsx                # Home
│   │   │   ├── actions.ts             # Server actions (updateAttribute, updateCTA)
│   │   │   ├── manifest.ts            # PWA web app manifest
│   │   │   ├── sw.ts                  # Serwist service worker
│   │   │   ├── push-actions.ts        # VAPID push notification actions (not yet wired to UI)
│   │   │   ├── design-system/page.tsx
│   │   │   ├── glossary/page.tsx      # Placeholder
│   │   │   ├── process/page.tsx       # Placeholder
│   │   │   ├── resources/page.tsx     # Placeholder
│   │   │   ├── objects/
│   │   │   │   ├── page.tsx           # Object Library — system catalog
│   │   │   │   ├── SystemLibrary.tsx  # Client component — system cards
│   │   │   │   └── [systemSlug]/
│   │   │   │       ├── page.tsx       # System detail — object grid
│   │   │   │       ├── SystemDetail.tsx
│   │   │   │       └── [objectSlug]/
│   │   │   │           ├── page.tsx           # Object Guide (server component — data loading)
│   │   │   │           ├── ObjectDetailClient.tsx  # Client component — tabs
│   │   │   │           └── views/
│   │   │   │               └── [viewSlug]/
│   │   │   │                   ├── page.tsx           # View Inspector
│   │   │   │                   └── ViewInspector.tsx  # Client — attribute/CTA editing + preview
│   │   │   └── prototype/
│   │   │       └── classes/[slug]/
│   │   │           └── ClassDetailClient.tsx  # Prototype (no page.tsx — not routed)
│   │   ├── components/
│   │   │   ├── nav/MainNav.tsx        # Primary navigation
│   │   │   ├── ui/
│   │   │   │   ├── BackLink.tsx       # Back navigation link
│   │   │   │   ├── CodeBlock.tsx      # Syntax-highlighted code examples
│   │   │   │   ├── ConfigPanel.tsx    # Role/lifecycle toggle controls
│   │   │   │   ├── DataTable.tsx      # AttributeTable + CTATable
│   │   │   │   ├── ObjectIcon.tsx     # Icon rendering for core/domain/variation objects
│   │   │   │   ├── ShareURL.tsx       # Copy-to-clipboard URL sharing
│   │   │   │   └── Tabs.tsx          # Accessible tab interface (ARIA tablist/tab/tabpanel)
│   │   │   ├── preview/
│   │   │   │   └── StudentRosterPreview.tsx  # Preview renderer for student:class-roster
│   │   │   ├── roster/
│   │   │   │   ├── RosterRing.tsx           # Dual-arc score ring
│   │   │   │   ├── RosterScoreColumn.tsx    # Score column in roster row
│   │   │   │   └── RosterOverflowMenu.tsx   # Overflow menu for roster actions
│   │   │   └── prototype/
│   │   │       └── BreadcrumbNav.tsx  # Breadcrumbs for prototype views
│   │   ├── lib/
│   │   │   ├── objects.ts             # Build-time data loading (getObjectBySlug, getAllObjects)
│   │   │   ├── systems.ts            # System derivation from object products field
│   │   │   ├── preview-registry.ts   # Maps view contexts to preview React components
│   │   │   ├── preview-types.ts      # PreviewInspectionProps type
│   │   │   └── mock.ts               # Mock data utilities
│   │   ├── styles/
│   │   │   ├── globals.css            # Entry point (imports tokens → layouts, resets)
│   │   │   ├── tokens.css             # Modular scale, colors, typography tokens
│   │   │   ├── layouts.css            # Every Layout primitives
│   │   │   └── components.css         # Site-specific component styles
│   │   ├── public/                    # Static assets (logo, icons, framework logos, PWA icons)
│   │   ├── next.config.ts             # Serwist integration, security headers
│   │   └── tsconfig.json
│   └── object-components/             # Lit Web Component library
│       ├── src/
│       │   ├── ren-student-row.ts     # <ren-student-row> — legacy list layout (to align with ListView / ValidShape)
│       │   └── shared/
│       │       └── tokens.ts          # Design tokens (--ren-* CSS custom properties)
│       ├── vite.config.ts             # Library build config (multi-entry Rollup)
│       └── package.json               # Published as @renaissance/object-components
├── docs/
│   ├── requirements/                  # OOUX requirements and spec docs
│   └── templates/                     # Confluence-style ORCA artifact templates
├── orca/                              # ORCA workspace — project-specific iterative drafts
├── img/                               # Shared source images
└── .cursor/
    ├── rules/                         # Agent behavior rules (conventions, UI design, collaboration)
    └── skills/                        # ORCA skill definitions
```

## Routing

The site uses **system-based routing** for the Object Library. Objects are grouped by product system (derived from each object's `identity.products` field via `lib/systems.ts`).

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, pitch, links to Object Library and Resources |
| `/objects` | Object Library | System catalog — cards showing each system's objects and view counts |
| `/objects/[systemSlug]` | System Detail | Object card grid for a single system |
| `/objects/[systemSlug]/[objectSlug]` | Object Guide | Tabbed detail page (Views, Attributes, Actions, Relationships) |
| `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]` | View Inspector | Full-screen view editor with attribute/CTA editing and preview |
| `/design-system` | Design System | Component style guide (not linked in main nav) |
| `/glossary` | Glossary | Placeholder |
| `/process` | Process | Placeholder |
| `/resources` | Resources | Placeholder |

The system derivation works as follows: `lib/systems.ts` reads each object's `identity.products` string. Objects with `"All products"` go into `common-objects`; others are slugified and mapped to system metadata in `SYSTEM_META`. `generateStaticParams` in each route's `page.tsx` uses these to produce all valid URL paths at build time.

## Two-Layer Component Architecture

Caboodle uses two distinct component layers:

### React Components (site UI)

Located in `packages/caboodle-site/components/`. These handle site-level UI: navigation, tabs, data tables, config panels, code blocks, preview renderers, and roster components. They are standard React components used only within the Next.js site.

Key components:
- **MainNav** — primary navigation with search trigger (non-functional) and profile stub
- **Tabs** — accessible tab interface with full ARIA support and keyboard navigation
- **DataTable** — `AttributeTable` and `CTATable` for object data display
- **ObjectIcon** — renders the correct icon tier (core, domain, variation) for any object
- **ViewInspector** — full-screen view editing with role selection, attribute/CTA toggling, and preview rendering via `preview-registry.ts`
- **StudentRosterPreview** — prototype preview for student roster context, using RosterRing, RosterScoreColumn, and RosterOverflowMenu

### Server Actions

`app/actions.ts` provides `updateAttribute()` and `updateCTA()` server actions that read and write `data/objects/{slug}.json` directly. These power the View Inspector's inline editing.

### Lit Web Components (object representations) — Rebuilding

Located in `packages/object-components/src/`. These render object cards, list rows, and profile views — the visual representations of OOUX objects. They are framework-agnostic Custom Elements distributable as `@renaissance/object-components` so product teams can import them directly.

**Current state:** The WC library was previously built and has been deleted. Only two source files remain on disk:
- `ren-student-row.ts` — the `<ren-student-row>` component (legacy list-style row; to be aligned with **ListView** and `ValidShape`: `list` | `grid` | `table`)
- `shared/tokens.ts` — design token CSS custom properties (`--ren-*` variables)

The `dist/` directory is empty and the library cannot be built until source files are restored.

**Target architecture** (to be rebuilt):

Components map to **`objectViews`** in object data. **`ListView`** entries use **`ValidShape`**: `'list' | 'grid' | 'table'` — each optional key under `shapes` (`list`, `grid`, `table`) has a **`ShapeSpec`** (`visibleAttributes`, `availableCTAs`). **`DetailView`** entries use flat `visibleAttributes` and `availableCTAs` for detail surfaces.

Naming convention: `<ren-{object}-{validShape}>` for list layouts (e.g. `<ren-student-list>`, `<ren-student-grid>`, `<ren-student-table>`) plus detail-oriented components for **`DetailView`** contexts. The generic `<ren-object-card>` (or grid cell) can render any object in library browsing contexts.

Planned coverage by object group (driven by each object’s `objectViews`):
- **Group A** (student, teacher, class, school, district, assessment, skill, score): full **ListView** coverage (`list`, `grid`, `table` where defined) plus **DetailView** components as specified
- **Group B** (activity-event, activity, assignment, insight, lesson, live-session, product-assignment, product, proficiency-prediction, report, resource, solution, standard): **ListView** and **DetailView** components per `objectViews`
- **Group C** (educator-academy-module, learning-path, onboarding-checklist, onboarding-step, student-group): **ListView** and **DetailView** components per `objectViews`

Each object will have a base module at `shared/{slug}.base.ts` with shared types (`{Object}Data`, `{Object}State`) and constants. Shared infrastructure includes `shared/context.ts`, `shared/identity.ts`, layout/shape tagging, and `shared/shapes/` (layout-specific CSS).

## Data Architecture

Object data is stored as JSON files in `data/objects/` (one file per object, 26 files total). The shared TypeScript schema at `data/schema.ts` defines all types:

- `ObjectDefinition` — top-level type containing everything about an object, including optional `objectViews?: ObjectView[]`
- `ObjectIdentity` — name, slug, qualifier, type, category, definition, synonyms, products
- `SystemDefinition` — system-level grouping with slug, name, owner, objectSlugs
- `ObjectAttribute`, `ObjectCTA` — attribute and CTA definitions with roles/permissions
- `ObjectVariation` — domain-specific variants
- `ObjectView` — union of **`ListView` | `DetailView`** (discriminated by `viewType`). **`ListView`** (`viewType: 'list'`) has `shapes` with optional `list`, `grid`, and `table` entries, each a **`ShapeSpec`** (`visibleAttributes`, `availableCTAs`). **`DetailView`** (`viewType: 'detail'`) has flat `visibleAttributes` and `availableCTAs`. **`ValidShape`** = `'list' | 'grid' | 'table'` for list layouts
- `RepresentationSection` — card/list/detail showcase configuration
- `UserStory`, `BusinessRule`, `LifecycleFlow` — behavioral specs
- `MCSFDSpec` — relationship specifications (Mechanics, Cardinality, Sorts, Filters, Dependencies)
- `SIPValidation` — Structure/Instances/Purpose validation

The Next.js site loads object data at build time via `lib/objects.ts`, which reads JSON files from `data/objects/` and returns typed `ObjectDefinition` objects. System groupings are derived at build time by `lib/systems.ts`.

## Object Identity System

Objects use an icon-based identity system with three tiers:

| Icon | Object Type | Meaning |
|------|-------------|---------|
| `object_icon.svg` | Core object | A canonical, standalone object |
| `object-variation_icon.svg` | Variation | A contextual variant of a core object |
| `domain-object_icon.svg` | Domain object | A domain-specific specialization |

These icons appear in the Object Library cards, Object Guide headers, and variation cards. The `ObjectIcon` React component (`components/ui/ObjectIcon.tsx`) resolves the correct icon path based on object type.

## Layout System — Every Layout

All page layout is built from composition primitives in `styles/layouts.css`. These are configured via CSS custom properties, not new classes.

| Primitive | Purpose |
|-----------|---------|
| `.stack` | Vertical spacing between siblings |
| `.box` | Padded container with optional border |
| `.center` | Centered column with max-width |
| `.cluster` | Horizontal wrapping group (nav, tags, buttons) |
| `.with-sidebar` | Fixed sidebar + fluid content |
| `.switcher` | Horizontal row that stacks below threshold |
| `.cover` | Vertically centered content in tall container |
| `.grid` | Auto-filling equal-width columns |
| `.frame` | Aspect-ratio media container |
| `.reel` | Horizontal scrolling strip |
| `.imposter` | Absolutely centered overlay |
| `.container` | Page-width wrapper |

**Key rules:**
- Always check existing primitives before writing custom layout CSS
- Configure via `style="--space: var(--s2)"`, not new classes
- Use modular scale tokens (`--s-5` through `--s5`) for all spacing
- No `@media` breakpoints for layout — intrinsic sizing handles responsiveness
- Use logical properties (`margin-block-start`, `inline-size`)

## CSS Architecture

CSS is imported via `globals.css` in the Next.js root layout:
1. `tokens.css` — design tokens (spacing scale, colors, typography, borders)
2. `layouts.css` — Every Layout primitives (never edit for page-specific needs)
3. `components.css` — imported separately, site-specific components (nav, cards, tables, etc.)

**Rules:**
- New layout needs → compose existing primitives
- New component styles → add to `components.css`
- New tokens → add to `tokens.css`
- Never override layout primitive internals from component CSS

## Design Tokens

Spacing uses a **1.5 ratio modular scale** centered on `--s0: 1rem`:

```
--s-5  --s-4  --s-3  --s-2  --s-1  --s0  --s1  --s2  --s3  --s4  --s5
 tiny  ──────────────────────────────────────────────────────────  large
```

Colors: `--color-dark` (#1a1a2e), `--color-brand` (#cf3a4e), `--color-accent` (#2B87FF)
Typography: `--font-display` (Georgia), `--font-plain` (Roboto), `--font-mono`

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server (from root) |
| `npm run build` | Build WC library then Next.js site |
| `npm run build:components` | Build Lit Web Component library only |
| `npm run build:site` | Build Next.js site only |

## Object Directory

The site's primary feature is the **Object Library** — a browsable catalog of OOUX object definitions for Renaissance products, organized by product system.

### Object Library Structure

The Object Library landing page (`/objects`) shows system cards. Each system card links to a system detail page (`/objects/[systemSlug]`) that shows object cards. Each object card links to an Object Guide page (`/objects/[systemSlug]/[objectSlug]`).

Systems are derived from object JSON data — each object's `identity.products` field determines which system(s) it belongs to. `SYSTEM_META` in `lib/systems.ts` provides display names, descriptions, and owners for known systems.

### Object Guide Pages

Each object gets a detail page at `/objects/[systemSlug]/[objectSlug]` with:
- Guide header (icon, name, qualifier, definition, synonyms, action buttons)
- Tabbed content: **Views**, **Attributes**, **Actions**, **Relationships**
- Views tab: cards linking to View Inspector pages for each view context
- Attributes tab: `AttributeTable` showing all object attributes
- Actions tab: `CTATable` + user story cards
- Relationships tab: MCSFD relationship tables + nested object links

### View Inspector

Each view context has a dedicated View Inspector page at `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]`. The inspector shows:
- Role selection controls
- Attribute and CTA toggle lists with inline editing
- Preview rendering (when a preview component is registered in `lib/preview-registry.ts`)
- Changes persist to `data/objects/{slug}.json` via server actions

### Core Objects (13)

Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight

## Current Status

### What's Built
- **Next.js site** with system-based Object Library, Object Guide pages, and View Inspector
- **26 object JSON files** with full schema coverage (identity, attributes, CTAs, relationships, object views)
- **React components**: navigation, tabs, data tables, config panels, code blocks, object icons, share URL, back links
- **Student roster prototype**: RosterRing, RosterScoreColumn, RosterOverflowMenu, StudentRosterPreview
- **Server actions** for inline attribute and CTA editing
- **CSS architecture**: tokens, layouts (Every Layout), and component styles
- **PWA**: Serwist service worker and web app manifest
- **Design system page** (not linked in navigation)

### What Needs Building
- **Lit Web Component library**: Previously built, source files were deleted. Only `ren-student-row.ts` and `shared/tokens.ts` remain. Full library needs rebuilding (ListView layouts for `list` / `grid` / `table` plus DetailView-oriented components across 26 objects, per `objectViews`)
- **Placeholder pages**: Glossary, Process, Resources are stubs with heading only
- **Search**: MainNav has a search trigger UI but no search functionality
- **User profile**: MainNav has a profile button stub
- **Push notifications**: Server-side VAPID actions exist in `push-actions.ts` but aren't wired to any UI
- **Prototype routes**: `ClassDetailClient.tsx` exists but has no `page.tsx` (not routed)

## OOUX Context

Caboodle is built on **Object-Oriented UX (OOUX)** principles using the **ORCA process** (Objects, Relationships, CTAs, Attributes). The ORCA process has 3 rounds:

1. **Discovery** — identify objects, map nesting, brainstorm CTAs, forage attributes
2. **Prioritization** — rank objects, relationships, CTAs, and attributes
3. **Representation** — design cards, navigation, CTA placement, and variant consistency

The Four Ancient Truths of OOUX:
1. **Objects** — things that are different should look different
2. **Relationships** — humans navigate through connections between objects
3. **CTAs** — humans act on objects through direct manipulation
4. **Attributes** — objects that are the same should look the same

## ORCA Process & Skills

Caboodle includes the complete ORCA skill set — 12 core steps, 10 supporting skills, 5 domain knowledge references, and 5 Caboodle-specific skills. All ORCA skills use a **draft-then-promote** workflow:

1. ORCA skills write artifacts to `orca/{project-name}/` as markdown files
2. Each file tracks status in YAML frontmatter: `draft` → `confirmed` → `promoted`
3. The **orca-promote** skill syncs confirmed artifacts into `data/objects/*.json`

### ORCA Workspace Structure

```
orca/
  {project-name}/
    plan.md                    # ORCA plan with progress tracking
    01-object-discovery.md     # SIP-validated object list
    02-nom.md                  # Nested-Object Matrix
    03-cta-matrix.md           # CTA inventory
    04-object-map.md           # Attribute foraging
    07-cta-prioritization.md   # P/S/T/Q rankings
    08-attribute-prioritization.md  # Force-ranked attributes
    10-nav-flow.md             # Navigation flow
    objects/                   # Per-object artifacts (steps 5, 6, 9, 11, 12)
      {slug}.md                # Object Guide draft + MCSFD + cards + CTAs + object views
    cross-object/              # System-wide compiled views
      nom.md                   # Compiled NOM from all objects
      cta-matrix.md            # Compiled CTA Matrix from all objects
```

### Slash Commands

| Command | What it does |
|---|---|
| `/orca-start` | Start an ORCA project (launches the Planner) |
| `/orca-teach` | Learn OOUX and ORCA (launches the Primer) |
| `/orca-objects` | Browse objects in `data/objects/` |
| `/orca-workshop` | Prepare an ORCA workshop |
| `/orca-promote` | Sync confirmed workspace artifacts to `data/objects/*.json` |
| `/orca-view` | Design and build an object view (launches the View Designer) |

### Core ORCA Skills (12 steps)

#### Round 1: Discovery — "What's in our system?"

| # | Skill | What It Produces |
|---|---|---|
| 01 | Object Discovery | Validated object list (SIP-tested) |
| 02 | NOM Builder | Nested-Object Matrix |
| 03 | CTA Matrix Builder | CTA inventory per object |
| 04 | Object Map Builder | Attribute map for all objects |

#### Round 2: Prioritization — "What matters most?"

| # | Skill | What It Produces |
|---|---|---|
| 05 | Object Guide Builder | Comprehensive Object Guide |
| 06 | MCSFD Spec Writer | Relationship specifications |
| 07 | CTA Prioritization | P/S/T/Q ranked CTAs |
| 08 | Attribute Prioritization | Force-ranked attributes |

#### Round 3: Representation — "How does it look and behave?"

| # | Skill | Anti-Pattern Fought | What It Produces |
|---|---|---|---|
| 09 | Object Card Designer | Masked Objects | Distinct card designs |
| 10 | Nav Flow Designer | Isolated Objects | Navigation blueprint |
| 11 | CTA Placement Designer | Broken Objects | CTA-equipped cards/pages |
| 12 | Shapeshifter Matrix Builder | Shapeshifters | Variant consistency rules (captured in data as `objectViews` / `ObjectView`) |

### Supporting Skills

| Skill | Purpose |
|---|---|
| s1 OOUX Primer | Teach OOUX concepts tailored to role |
| s2 ORCA Project Intake | Scope effort, recommend skill sequence |
| s3 Artifact Validator | Check artifact quality and completeness |
| s4 Facilitation Kit | Generate workshop agendas and materials |
| s5 Engineering Handoff | Translate OOUX artifacts to engineering specs |
| s6 ORCA Planner | Build a sequenced workflow plan and guide execution |
| s7 Research | Search local data, web, and project files for context |
| s8 User Story Writer | Write object-oriented user stories from CTAs |
| s9 Cross-Object Artifacts | Compile system-wide NOM + CTA Matrix |
| s10 Case Study Writer | Document completed projects as case studies |

### Caboodle-Specific Skills

| Skill | Purpose |
|---|---|
| Page Builder | Scaffold new Caboodle pages using Every Layout primitives |
| Object Guide Builder | Build Object Guide HTML pages from JSON data |
| ORCA → UI Translator | Map ORCA artifacts to UI design decisions |
| View Designer | Design and build object views — from ORCA-grounded proposal through Figma review to Lit WC |
| ORCA Promote | Sync confirmed workspace artifacts to `data/objects/*.json` |

### Domain Knowledge Skills

| Skill | Purpose |
|---|---|
| ooux-object-thinking | SIP test, noun foraging, object identification |
| ooux-ctas | CTA concepts, P/S/T/Q framework |
| ooux-relationships | NOM, MCSFD relationship lenses |
| ooux-renaissance-objects | 13 core Renaissance object definitions |
| ooux-research | Research skill trigger and guidance |

## UI Design Rules

8 design rules in `.cursor/rules/ui-*.mdc` provide comprehensive guidance:

| Rule | Covers |
|---|---|
| `ui-accessibility` | WCAG 2.2 AA, POUR, color contrast, keyboard, focus, touch targets, motion, cognitive accessibility |
| `ui-typography` | Type scale, measure, line height, hierarchy, font pairing, fluid type, readability |
| `ui-visual-design` | Visual hierarchy, attention management (Fitts/Hick), Gestalt principles, color, spacing, consistency |
| `ui-content` | Grice's Maxims (Quantity, Quality, Relation, Manner), content prioritization, microcopy, error messages |
| `ui-interaction` | Nielsen's 10 heuristics, cognitive load, progressive enhancement, native patterns, state management |
| `ui-data-visualization` | Tufte's principles, chart selection, accessible visualization, table design, color in data |
| `ui-navigation` | IA principles, navigation patterns, wayfinding, continuity, search, link and URL design |
| `ui-forms` | Labels, input types, validation timing, error display, layout, buttons, multi-step flows, touch |

## Agent Guidelines

- Read `docs/requirements/` reference docs before building new pages
- Use the **ORCA Planner** (`/orca-start`) to begin any ORCA workflow
- ORCA skills write to `orca/{project}/` — never write directly to `data/objects/*.json` during an ORCA session
- Use the **orca-promote** skill (or `/orca-promote`) to sync confirmed workspace artifacts to JSON
- Use the **ORCA → UI Translator** skill when turning ORCA outputs into visual design
- Use the **Page Builder** skill for scaffolding new site pages
- Use the **Object Guide Builder** skill for creating Object Guide HTML pages from JSON data
- Check `styles/components.css` for existing component classes before creating new ones
- Use Every Layout primitives for all layout — never write custom layout CSS when a primitive exists
- Always ask, never assume — follow the collaboration rules in `.cursor/rules/ooux-collaboration.mdc`
- The Lit WC library needs rebuilding — use `ren-student-row.ts` and `shared/tokens.ts` as reference implementations when creating new list/grid/table or detail view components
