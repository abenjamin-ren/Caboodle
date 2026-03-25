# Object Guide Builder Skill

Generate an Object Guide detail page for a Renaissance object (core or domain). This creates a JSON data file and an adaptive `<ren-{slug}>` Lit Web Component. The page renders automatically via the dynamic `[slug]` route.

## Prerequisites

- Read `AGENTS.md` for project structure
- Read `docs/requirements/object-data-template.md` for the full data schema walkthrough
- Read `data/objects/student.json` as the reference implementation
- Read `data/schema.ts` for TypeScript type definitions (`ObjectView`, `ListView`, `DetailView`, `ShapeSpec`, `ValidShape`)
- Read `packages/object-components/src/ren-student-row.ts` as a reference component (library is rebuilding; add other shape families as they land)

## Steps

### 1. Research the object in Confluence

Use the Atlassian MCP tools to fetch the object's Confluence page from the OOUX Space. Extract: definition, attributes, CTAs, user stories, business rules, lifecycle, relationships, nested objects, SIP validation, synonyms, and **object views** (context-specific list/detail specs) if present.

### 2. Create the object data file

Create `data/objects/{slug}.json` following the `ObjectDefinition` schema:

```json
{
  "identity": {
    "slug": "teacher",
    "name": "Teacher",
    "qualifier": "(Core)",
    "objectType": "core",
    "category": "people",
    "definition": "...",
    "synonyms": ["educator", "instructor"],
    "products": "All products"
  },
  "variations": [],
  "representations": [...],
  "stories": [...],
  "businessRules": [...],
  "lifecycle": { "states": [...], "transitions": [...] },
  "relationships": [...],
  "relatedObjects": [...],
  "nestedObjects": [...],
  "allAttributes": [...],
  "allCTAs": [...],
  "sipValidation": { "structure": {...}, "instances": {...}, "purpose": {...}, "verdict": "..." },
  "synonyms": [...],
  "objectViews": []
}
```

**`objectViews`** — array of `ObjectView` (`ListView | DetailView`, discriminated by `viewType`):

- **ListView** (`viewType: "list"`): `context`, `value`, `description`, optional `userIntent` / `contextDataSchema`, and `shapes` with optional `list`, `grid`, and `table` entries. Each entry is a **ShapeSpec**: `{ visibleAttributes: string[], availableCTAs: string[] }`.
- **DetailView** (`viewType: "detail"`): same base fields, plus top-level `visibleAttributes` and `availableCTAs` for the detail surface.

There is no `cardShape` field on views; layout for collection contexts is expressed via `shapes.list` / `shapes.grid` / `shapes.table`.

Key fields for each **representation** (showcase / design-system sections):

- `componentTag`: Lit tag for that section’s default component (e.g. `ren-{slug}-card`, `ren-{slug}-row`)
- `defaultShape`: `list` | `grid` | `table` (see `ValidShape` in `data/schema.ts`)
- `examples`: Object-specific mock data as `ShowcaseExample` (generic key-value pairs)

### 3. Validate the data

Run `node -e "const d = require('./data/objects/{slug}.json'); console.log(d.identity.name, '- OK');"` to verify the JSON is valid.

### 4. Create shape-specific Web Components

Create one component per shape family in `packages/object-components/src/`, following existing object patterns in the repo:

**Shared base** — `shared/{slug}.base.ts`:
```typescript
import type { UtilityMenuItem } from './utility-menu.controller.js';
export interface {Slug}Data { name: string; /* ... */ }
export type {Slug}State = 'active' | 'inactive' | 'archived';
export const STATUS_CLASS: Record<string, string> = { /* ... */ };
export const OVERFLOW_CTAS: UtilityMenuItem[] = [ /* ... */ ];
export const OVERFLOW_CTA_NAMES = new Set(OVERFLOW_CTAS.map(c => c.name));
```

**Shape components** — one file per component family the object needs (names follow `ren-{slug}-{family}.ts`). Map **object view** `ShapeSpec`s (list / grid / table) to the appropriate component and attribute/CTA filtering; detail views map to profile/header/detail-style components as defined in representations and the View Designer skill.

Each component:

- Imports only the shared shape styles it needs
- Declares typed `contextData` where context-specific fields apply
- Shares CTA dispatch, utility menu, and attribute filtering via the base module where possible

### 5. Register exports

Add each new component to barrel, Vite entries, `package.json` subpath exports, and `ComponentShowcase.tsx` dynamic imports — mirror how existing objects are wired when multiple shape families exist.

### 6. Build and verify

```bash
npm run build:components  # Build WC library
npm run build:site        # Build site (generates the new [slug] page)
```

## Data completeness checklist

- [ ] Identity: slug, name, qualifier, objectType, category, definition, synonyms, products
- [ ] At least 3 representations (card, list, detail) with `defaultShape` (`list` | `grid` | `table`) and `componentTag`
- [ ] ShowcaseExample data with object-specific fields (generic key-value pairs)
- [ ] At least 2 user stories with acceptance criteria
- [ ] Business rules (minimum 3)
- [ ] Lifecycle with states and transitions
- [ ] MCSFD relationship specs for all related objects
- [ ] Nested objects with cardinality
- [ ] Complete attribute list with data types and sources
- [ ] Complete CTA list with priorities (P/S/T/Q) and role keys
- [ ] SIP validation (Structure, Instances, Purpose)
- [ ] Synonyms/Also Known As
- [ ] Object views: `objectViews` entries for key contexts (`ListView` / `DetailView`) with `ShapeSpec`s where applicable

## Reference

The Student Object Guide (`data/objects/student.json`) is the reference for published JSON. Use `data/schema.ts` for `objectViews` typing. The dynamic route under `packages/caboodle-site/app/objects/` renders guides from object data; Web Component coverage depends on what exists under `packages/object-components/src/`.
