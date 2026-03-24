# Object Guide Builder Skill

Generate an Object Guide detail page for a Renaissance object (core or domain). This creates a JSON data file and an adaptive `<ren-{slug}>` Lit Web Component. The page renders automatically via the dynamic `[slug]` route.

## Prerequisites

- Read `AGENTS.md` for project structure
- Read `docs/requirements/object-data-template.md` for the full data schema walkthrough
- Read `data/objects/student.json` as the reference implementation
- Read `data/schema.ts` for TypeScript type definitions
- Read `packages/object-components/src/ren-student-card.ts` as the reference card component
- Read `packages/object-components/src/shared/student.base.ts` for shared types/constants pattern
- Read `packages/object-components/src/shared/shape-tags.ts` for tag resolution

## Steps

### 1. Research the object in Confluence

Use the Atlassian MCP tools to fetch the object's Confluence page from the OOUX Space. Extract: definition, attributes, CTAs, user stories, business rules, lifecycle, relationships, nested objects, SIP validation, synonyms, and shapeshifter matrix (if present).

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
  "shapeshifterMatrix": [...]
}
```

Key fields for each representation:
- `componentTag`: Shape-specific tag — `ren-{slug}-card`, `ren-{slug}-row`, `ren-{slug}-profile` etc.
- `defaultShape`: The shape this representation uses (`card`, `row`, `profile`)
- `examples`: Object-specific mock data as `ShowcaseExample` (generic key-value pairs)

### 3. Validate the data

Run `node -e "const d = require('./data/objects/{slug}.json'); console.log(d.identity.name, '- OK');"` to verify the JSON is valid.

### 4. Create shape-specific Web Components

Create one component per shape family in `packages/object-components/src/`, following the Student pattern:

**Shared base** — `shared/{slug}.base.ts`:
```typescript
import type { UtilityMenuItem } from './utility-menu.controller.js';
export interface {Slug}Data { name: string; /* ... */ }
export type {Slug}State = 'active' | 'inactive' | 'archived';
export const STATUS_CLASS: Record<string, string> = { /* ... */ };
export const OVERFLOW_CTAS: UtilityMenuItem[] = [ /* ... */ ];
export const OVERFLOW_CTA_NAMES = new Set(OVERFLOW_CTAS.map(c => c.name));
```

**Shape components** — one per shape family:
- `ren-{slug}-card.ts` — card + compact-card shapes, typed `{Slug}CardContext`
- `ren-{slug}-row.ts` — row + mini-row shapes, typed `{Slug}RowContext`
- `ren-{slug}-data-row.ts` — data-row shape, typed `{Slug}DataRowContext`
- `ren-{slug}-profile.ts` — profile shape, no contextData
- `ren-{slug}-header.ts` — header shape, typed `{Slug}HeaderContext`

Each component:
- Imports only the shared shape styles it needs (card doesn't ship row CSS)
- Declares a typed `contextData` interface for only its fields
- Contains only its own render logic and CSS
- Shares CTA dispatch, utility menu, and attribute filtering via the base module

### 5. Register exports

Add each shape component to these three files:

**`packages/object-components/src/index.ts`** — barrel exports:
```typescript
export * from './ren-{slug}-card.js';
export * from './ren-{slug}-row.js';
export * from './ren-{slug}-data-row.js';
export * from './ren-{slug}-profile.js';
export * from './ren-{slug}-header.js';
```

**`packages/object-components/vite.config.ts`** — entry points:
```typescript
'ren-{slug}-card': resolve(__dirname, 'src/ren-{slug}-card.ts'),
'ren-{slug}-row': resolve(__dirname, 'src/ren-{slug}-row.ts'),
'ren-{slug}-data-row': resolve(__dirname, 'src/ren-{slug}-data-row.ts'),
'ren-{slug}-profile': resolve(__dirname, 'src/ren-{slug}-profile.ts'),
'ren-{slug}-header': resolve(__dirname, 'src/ren-{slug}-header.ts'),
```

**`packages/object-components/package.json`** — subpath exports:
```json
"./ren-{slug}-card": "./dist/ren-{slug}-card.js",
"./ren-{slug}-row": "./dist/ren-{slug}-row.js",
"./ren-{slug}-data-row": "./dist/ren-{slug}-data-row.js",
"./ren-{slug}-profile": "./dist/ren-{slug}-profile.js",
"./ren-{slug}-header": "./dist/ren-{slug}-header.js"
```

**`packages/caboodle-site/components/ui/ComponentShowcase.tsx`** — dynamic imports:
```typescript
'ren-{slug}-card': () => import('@renaissance/object-components/ren-{slug}-card'),
// ... one per shape component
```

### 6. Build and verify

```bash
npm run build:components  # Build WC library
npm run build:site        # Build site (generates the new [slug] page)
```

## Data completeness checklist

- [ ] Identity: slug, name, qualifier, objectType, category, definition, synonyms, products
- [ ] At least 3 representations (card, list, detail) with `defaultShape` and shape-specific `componentTag` (e.g. `ren-{slug}-card`)
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
- [ ] Shapeshifter matrix with context entries (if applicable)

## Reference

The Student Object Guide (`data/objects/student.json`) and its shape-specific components (`ren-student-card.ts`, `ren-student-row.ts`, `ren-student-data-row.ts`, `ren-student-profile.ts`, `ren-student-header.ts`) with the shared base module (`shared/student.base.ts`) are the gold standard — use them as templates for all other objects. The `resolveShapeTag()` utility in `shared/shape-tags.ts` maps any shape to its component tag suffix. The dynamic route at `app/objects/[slug]/page.tsx` renders any object automatically from its JSON data file.
