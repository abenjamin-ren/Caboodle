# Caboodle

An internal OOUX resource site for Renaissance. Caboodle houses the Object Directory — structured definitions for 26 objects across Renaissance products — and provides tools, templates, and workflows for Object-Oriented UX practitioners using the ORCA process.

## Prerequisites

- **Node.js** 20+
- **npm** 10+ (ships with Node 20)

## Quick Start

```bash
git clone <repo-url> && cd Caboodle
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

## Project Structure

Caboodle is a monorepo with two packages:

```
Caboodle/
├── data/                    # Shared data layer
│   ├── schema.ts            # TypeScript types (ObjectDefinition, SystemDefinition, etc.)
│   ├── objects/             # One JSON file per object (26 files)
│   └── mock/                # Mock data for prototypes
├── packages/
│   ├── caboodle-site/       # Next.js 16 App Router site (React 19)
│   └── object-components/   # Lit 3 Web Component library (rebuilding)
├── docs/
│   ├── requirements/        # Requirement specs and ORCA process artifacts
│   ├── decisions/           # Architecture Decision Records
│   ├── developer-guide.md   # In-depth developer documentation
│   └── templates/           # Confluence-style ORCA artifact templates
├── orca/                    # ORCA workspace (project-specific iterative drafts)
└── .cursor/
    ├── rules/               # Agent behavior rules
    └── skills/              # ORCA skill definitions
```

## Architecture

Caboodle uses a **two-layer component architecture**:

- **React components** (`packages/caboodle-site/components/`) handle site UI: navigation, tabs, data tables, configuration panels. These are Next.js-specific and not distributed.
- **Lit Web Components** (`packages/object-components/src/`) render object representations: cards, rows, profiles, headers. These are framework-agnostic Custom Elements published as `@renaissance/object-components` for product teams to import. The WC library is currently being rebuilt — see [AGENTS.md](AGENTS.md#current-status) for details.

**Data flows from JSON to pages at build time.** Object definitions live in `data/objects/*.json`, conforming to the `ObjectDefinition` type in `data/schema.ts`. The Next.js site reads these via `lib/objects.ts` at build time. Objects are grouped into product systems via `lib/systems.ts`, which derives system membership from each object's `identity.products` field.

**CSS uses design tokens and composition primitives.** All spacing uses a modular scale (`--s-5` through `--s5`). Page layout uses Every Layout primitives (`.stack`, `.grid`, `.cluster`, etc.) configured via CSS custom properties — no media query breakpoints. Component-specific styles live in `components.css`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build the WC library, then the Next.js site |
| `npm run build:components` | Build the Lit Web Component library only |
| `npm run build:site` | Build the Next.js site only |

## Key Directories

| Directory | What's There |
|-----------|-------------|
| `data/objects/` | Object JSON files — the source of truth for all object data |
| `data/schema.ts` | TypeScript types shared by both packages |
| `packages/caboodle-site/app/` | Next.js pages and routes |
| `packages/caboodle-site/components/` | React components (nav, ui, preview, roster, prototype) |
| `packages/caboodle-site/styles/` | CSS: `tokens.css`, `layouts.css`, `globals.css`, `components.css` |
| `packages/caboodle-site/lib/` | Data loading, system derivation, preview registry |
| `packages/object-components/src/` | Lit Web Components (currently rebuilding) |
| `docs/requirements/` | ORCA process artifacts and implementation specs |
| `docs/decisions/` | Architecture Decision Records |

## Contributing

### Adding a New Object

1. Create `data/objects/{slug}.json` conforming to `ObjectDefinition` in `data/schema.ts`
2. Set `identity.products` to the appropriate product name(s) — this determines system membership
3. The Object Library, system detail, and Object Guide pages generate automatically from the JSON
4. Add an icon at `packages/caboodle-site/public/img/{slug}_icon.svg`

### Adding a New Page

1. Create `packages/caboodle-site/app/{route}/page.tsx`
2. Use server components by default; add `'use client'` only when needed for interactivity
3. Use Every Layout primitives (`.stack`, `.center`, `.grid`, etc.) for page structure
4. Add any new component styles to `styles/components.css`

### Working with Styles

- **Spacing**: Always use modular scale tokens (`--s-5` through `--s5`)
- **Layout**: Compose Every Layout primitives — never write custom layout CSS when a primitive exists
- **Tokens**: Add new design tokens to `tokens.css`
- **Components**: Add new component styles to `components.css`
- **Properties**: Use logical properties (`margin-block-start`, `padding-inline`)

### Building Web Components

Use `ren-student-row.ts` as the reference implementation. Components follow this pattern:
- Tag: `<ren-{object}-{shape}>` (e.g., `<ren-student-row>`)
- Extend `LitElement` with `@customElement` decorator
- Import shared `tokenDefaults` from `shared/tokens.ts`
- Expose data via `@property` decorators
- Use CSS custom properties (`--ren-*`) for theming

## Further Reading

- [AGENTS.md](AGENTS.md) — detailed architecture, ORCA process, agent guidelines
- [docs/developer-guide.md](docs/developer-guide.md) — in-depth development workflows
- [docs/decisions/](docs/decisions/) — architecture decision records
- [docs/requirements/STATUS.md](docs/requirements/STATUS.md) — requirement status index
