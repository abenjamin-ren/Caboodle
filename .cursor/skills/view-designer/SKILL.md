---
name: view-designer
description: "Design and build object views — the full lifecycle from context gathering and ORCA-grounded design proposal through Figma collaboration, multi-role expert review, iteration, artifact writing, and Lit Web Component implementation."
---

# View Designer

Design a specific visual representation of an object in a specific context, then build it. A **view** is how an object appears in a particular product surface — a class roster row, a score report data-row, a student detail page. Each view is grounded in ORCA artifacts: force-ranked attributes determine content hierarchy, P/S/T/Q rankings determine CTA placement, NOM relationships determine nesting, and the Shapeshifter Matrix tracks intentional variance.

## Terminology

- **View** — the design deliverable: a specific visual representation of an object in a specific context
- **Context** — the ORCA concept: where/why this view appears (from the Shapeshifter Matrix)
- **Shape** — the component variant: `card`, `compact-card`, `row`, `mini-row`, `data-row`, `profile`, `header`, `detail`, `nested-card`, `embed` (from `ValidShape` in `data/schema.ts`)
- **View spec** — the documented design decisions for a view

## When to Use This Skill

- User wants to design how an object looks in a specific product surface
- User asks to design a card, list row, detail page, or any object representation
- User wants to build a new context for the Shapeshifter Matrix
- User says "design a view" or runs `/orca-view`

## Prerequisites

Before running, read:

1. `caboodle-conventions.mdc` — project conventions
2. `caboodle-css.mdc` — CSS authoring rules
3. `caboodle-layouts.mdc` — Every Layout composition system

Read the applicable UI design rules as they become relevant during review:

- `ui-accessibility.mdc` — WCAG 2.2 compliance
- `ui-typography.mdc` — type hierarchy
- `ui-visual-design.mdc` — visual hierarchy, Gestalt, attention management
- `ui-content.mdc` — labels, microcopy, Grice's Maxims
- `ui-interaction.mdc` — usability heuristics, state management
- `ui-data-visualization.mdc` — data-heavy views
- `ui-navigation.mdc` — IA, wayfinding
- `ui-forms.mdc` — input-driven views

## Instructions

Work through these 8 phases in order. Each phase has collaboration checkpoints — never proceed past a checkpoint without user confirmation. Never invent ORCA data that hasn't been provided.

---

## Phase 1: Context Gathering

### Step 1 — Validate the object

Check if `data/objects/{slug}.json` exists. If the user hasn't specified an object, list available objects from `data/objects/` and ask them to pick one.

If the object doesn't exist, stop and explain. The object needs to go through Object Discovery (skill 01) first.

### Step 2 — Read the object's full data

Load the object JSON and extract:

| Data | Where to find it | What it tells the view |
|------|-------------------|------------------------|
| Identity | `identity.*` | Name, slug, type, category, definition, synonyms, products |
| Attributes | `allAttributes` | All data points the object carries, with roles and data types |
| CTAs | `allCTAs` | All actions, with priority tier (P/S/T/Q) and role permissions |
| Nested objects | `nestedObjects` | Which objects live inside this one, cardinality |
| Relationships | `relationships` | MCSFD specs for each related object |
| Existing views | `shapeshifterMatrix` | Contexts already defined, with their shapes and visible attributes |
| Representations | `representations` | Layout sections (card, list, detail) with examples |
| User stories | `stories` | Who acts, what CTA, what outcome |
| Business rules | `businessRules` | Constraints that affect the view |
| SIP validation | `sipValidation` | Confirms the object is valid |

### Step 3 — Read related objects

For each entry in `nestedObjects`, load that object's JSON too. Extract its name, existing shapes (from `shapeshifterMatrix` and `representations`), and identity. This surfaces which nested components already exist vs which need designing.

### Step 4 — Search Confluence for additional context

Use the `searchAtlassian` MCP tool to find product specs, wireframes, design decisions, or research relevant to this object and view. Search for the object name, the context name, and related product terms.

If Confluence is unavailable or returns nothing useful, note the gap and proceed with local data.

### Step 5 — Ask clarifying questions

**Checkpoint 1: Object and context selection**

Present a summary of what was found: the object's identity, how many views already exist, which nested objects it contains. Then ask:

- What context is this view for? (Where does the user see this object? What question are they answering?)
- Which user role is primary? (Teacher, School Admin, District Admin, Student, Parent)
- What is the parent context? (Where does the user navigate from to reach this view?)
- Are there known pain points, stakeholder requirements, or product constraints?

**Checkpoint 2: Clarifying questions answered**

Confirm understanding before proceeding to design.

---

## Phase 2: View Design Proposal

Use the translation tables from the `orca-to-ui` skill (`.cursor/skills/orca-to-ui/SKILL.md`) to generate a design proposal. Present all sections below to the user as a single proposal.

### View Classification

**Shape** — Select from `ValidShape` with rationale:

| Shape | When to use |
|-------|-------------|
| `card` | Default representation. Shows identity + top attributes + primary CTA. |
| `compact-card` | Reduced card for grids with many instances. Fewer attributes, smaller footprint. |
| `row` | List/table context. Scannable, comparable, sortable. |
| `mini-row` | Compact row for picker/selector contexts. Name + minimal metadata. |
| `data-row` | Data-dense row for reports and exports. Tabular, numeric emphasis. |
| `profile` | Full detail view. All attributes, all CTAs, nested object lists. |
| `header` | Page/section header showing identity + key stats. Breadcrumb context. |
| `detail` | Deep single-object view with tabs or sections. |
| `nested-card` | Compact card that appears inside a parent object's view. |
| `embed` | Inline representation within another object's content area. |

**Layout type** — `detail`, `list`, or `input`:
- `detail` — single-object deep dive (profile, header, detail shapes)
- `list` — collection of instances (card, row, data-row shapes)
- `input` — form-driven creation or editing of the object

**Every Layout primitives** — which composition primitives from `styles/layouts.css` apply (stack, grid, cluster, with-sidebar, switcher, etc.)

### ORCA Grounding

For each design decision, tie it to a specific ORCA artifact:

- Which **Ancient Truth** does this view serve? (Objects, Relationships, CTAs, Attributes)
- Which **anti-pattern** does it fight? (Masked Objects, Isolated Objects, Broken Objects, Shapeshifters)
- What specific ORCA data supports the decision? (e.g., "Attribute rank 1 is `name`, so it's the card title")

### Content Hierarchy

Map force-ranked attributes to view zones:

| Attribute rank | View zone | Typography | Visibility |
|----------------|-----------|------------|------------|
| Rank 1 (Primary identifier) | Title | Largest, boldest | Always visible |
| Rank 2 (Key descriptor) | Subtitle | Second-largest, medium weight | Always visible |
| Rank 3 (Status/state) | Status badge or indicator | Small, colored badge | Always visible |
| Rank 4 (Critical metric) | Metric area | Numeric emphasis | Visible on card; prominent on detail |
| Rank 5 (Context/parent) | Footer or breadcrumb | Small, muted | Visible on card; breadcrumb on detail |
| Rank 6+ (Supporting) | Detail page sections | Normal body text | Detail only |

Identify context-specific data — fields that only appear in this context (e.g., `latestScore` on a score-report view, `assignmentCompletion` on an assignment-management view). Define the `contextDataSchema` for the `ShapeshifterEntry`.

### CTA Placement

Map available CTAs to P/S/T/Q tiers for this view:

| Tier | Button style | Placement | Interaction |
|------|-------------|-----------|-------------|
| **Primary** | Filled, brand color, verb + noun label | Always visible, bottom row (card) or header bar (detail) | Direct action or confirmation |
| **Secondary** | Outlined or icon + text | Visible alongside Primary (2-3 max) | Action or modal |
| **Tertiary** | Overflow menu item | Card: overflow trigger. Detail: "More actions" dropdown | Menu selection |
| **Quaternary** | Settings/admin item | Not on card. Detail: admin section or settings tab | Navigate to settings |

Note role-dependent CTA variations (e.g., Teacher sees "Assign," Student sees "Start") and state-dependent variations (e.g., Active shows "Archive," Archived shows "Restore").

### Nested Objects

List which objects appear nested in this view:

- Object name and relationship type (parent-child, peer, composition)
- What shape the nested object uses in this context
- Whether that shape already exists (check the nested object's `shapeshifterMatrix`) or needs designing — flag missing shapes for the cascade queue

### User Stories

- Pull existing stories from the object's `stories` array that relate to this view
- Suggest new stories if the view's intent isn't covered by existing ones
- Format: As a **{role}**, I want to **{action}** a **{object}** so that **{benefit}**

### State Coverage Plan

For this view, document how each state affects rendering:

| State | Visual treatment | Attribute changes | CTA changes |
|-------|-----------------|-------------------|-------------|
| Default | Normal rendering | All visible | All available |
| Empty | Empty state message, illustration or prompt | N/A | Creation CTA only |
| Loading | Skeleton or spinner | Placeholders | Disabled |
| Error | Error color + icon + message | Last known values or hidden | Retry CTA |
| Disabled/Locked | Muted palette, lock icon | Visible but non-interactive | Hidden or disabled |
| Completed/Archived | Reduced opacity, "Completed" badge | Visible | Reduced set |

### Accessibility Notes

- Color contrast targets (4.5:1 text, 3:1 non-text)
- Keyboard navigation plan (tab order, arrow key behavior)
- Screen reader announcement sequence (object type, name, key attributes, available actions)
- Touch target sizes (minimum 24x24 CSS px, prefer 44x44 for buttons)

**Checkpoint 3: Design proposal reviewed**

Present the full proposal. Wait for user feedback before proceeding. Revise the proposal if needed.

---

## Phase 3: Cascade Queue

Check the nested objects section of the proposal. For each nested object that appears in a shape that doesn't yet exist:

1. List it as a cascade item with the object name, required shape, and parent context
2. Ask the user: design these now (depth-first) or queue them for later?
3. If designing now, recursively enter Phase 2 for each nested view before continuing to Phase 4

**Checkpoint 4: Cascade queue decisions made**

---

## Phase 4: Figma Collaboration

### Step 1 — Generate a layout wireframe

Use the `generate_diagram` Figma MCP tool to create a FigJam wireframe of the proposed view using Mermaid block-beta syntax. Show zones: header, content areas, nested object regions, CTA bar, sidebar (if applicable).

### Step 2 — Request the Figma mockup

Ask the user to create or refine a design in Figma based on the proposal and wireframe. They can start from scratch or iterate on the wireframe.

**Checkpoint 5: Figma mockup shared**

### Step 3 — Read the design

When the user shares a Figma URL, use the `get_design_context` MCP tool to pull code, screenshot, and metadata. Use `get_screenshot` to capture the design for documentation.

Analyze the design against the proposal:
- Does the content hierarchy match the attribute ranking?
- Are CTAs placed according to P/S/T/Q tiers?
- Are nested objects represented with appropriate shapes?
- Does the layout use the proposed Every Layout primitives?

---

## Phase 5: Multi-Role Expert Review

Review the Figma design from each relevant perspective. Only roles with substantive feedback speak — skip roles with nothing to add.

### UX Designer

Focus: layout hierarchy, visual grouping, Gestalt principles, information density, responsive behavior, visual consistency with existing views.

References: `ui-visual-design.mdc`, `ui-navigation.mdc`

### Copywriter

Focus: labels, descriptions, microcopy, error messages, empty state text, Grice's Maxims (say enough but not too much, be relevant, be clear).

References: `ui-content.mdc`

### UX Researcher

Focus: user story alignment, task flow completeness, learnability, discoverability, cognitive load, whether the view answers the user's question.

References: `ui-interaction.mdc`

### Software Engineer

Focus: data model fit, component boundary decisions, performance (rendering, data loading), state management, integration with existing mock data types.

References: `caboodle-conventions.mdc`, `data/schema.ts`, `data/mock/types.ts`

### Accessibility Specialist

Focus: WCAG 2.2 AA compliance, keyboard navigation, screen reader experience, color contrast verification, touch target sizes, motion and animation.

References: `ui-accessibility.mdc`

### Review format

Each role provides:
- **Observations** — what works, what doesn't (specific, not vague)
- **Revisions** — concrete suggestions with enough detail to act on
- **Priority** — must-fix (blocks approval) vs nice-to-have (can address later)

**Checkpoint 6: Expert review feedback addressed**

Present all feedback. Discuss with the user which revisions to make.

---

## Phase 6: Iteration

Loop between Phases 4 and 5 until the success criteria are met.

### Success Criteria (definition of done)

All of the following must be true:

- [ ] View is grounded in at least one ORCA artifact (attribute ranking, CTA priority, NOM relationship, or user story)
- [ ] All visible attributes map to force-ranked priorities 1-5
- [ ] CTAs follow P/S/T/Q hierarchy with correct button styles
- [ ] All required states are designed (at minimum: default and empty)
- [ ] WCAG 2.2 AA compliance (contrast, keyboard, focus, touch targets)
- [ ] Nested objects use defined shapes (or cascade items are queued)
- [ ] At least one user story justifies the view's existence
- [ ] User explicitly approves the design

**Checkpoint 7: Success criteria confirmed**

Walk through the checklist with the user. If any item fails, return to Phase 4.

---

## Phase 7: Artifact Writing and Data Updates

### Step 1 — Write the view spec

Append a View Specification section to `orca/{project}/objects/{slug}.md`. If the file doesn't exist, create it. Use this format:

```markdown
## View: {Context Name}

**Status:** confirmed
**Shape:** {shape}
**Layout type:** {detail | list | input}
**Primary role:** {role}
**Parent context:** {where the user navigates from}

### User Intent

{What question is the user answering in this view?}

### Content Hierarchy

| Rank | Attribute | Zone | Treatment |
|------|-----------|------|-----------|
| 1 | {attr} | Title | Bold, largest |
| ... | ... | ... | ... |

### Context-Specific Data

| Field | Type | Description |
|-------|------|-------------|
| {field} | {type} | {description} |

### CTA Placement

| CTA | Tier | Style | Conditions |
|-----|------|-------|------------|
| {cta} | Primary | Filled button | {role/state conditions} |
| ... | ... | ... | ... |

### Nested Objects

| Object | Shape | Status |
|--------|-------|--------|
| {object} | {shape} | Exists / Needs design |

### States

| State | Visual Treatment |
|-------|-----------------|
| Default | {description} |
| Empty | {description} |
| ... | ... |

### ORCA Grounding

- Ancient Truth: {which one}
- Anti-pattern avoided: {which one}
- Supporting artifacts: {list}

### Figma

- File: {Figma URL}
- Screenshot: {path or description}
```

### Step 2 — Update the ShapeshifterMatrix

Add or update the `ShapeshifterEntry` in `data/objects/{slug}.json`:

```json
{
  "context": "{Context Name}",
  "value": "{context-slug}",
  "shape": "{shape}",
  "description": "{user intent}",
  "visibleAttributes": ["{attr1}", "{attr2}", "..."],
  "availableCTAs": ["{cta1}", "{cta2}", "..."],
  "cardShape": "{shape}",
  "userIntent": "{what question the user is answering}",
  "contextDataSchema": {
    "{field}": { "type": "{type}", "description": "{description}" }
  }
}
```

### Step 3 — Reconcile the data model

If the view surfaced new attributes or CTAs not in the object data:

1. List each new item with its proposed definition
2. Ask the user whether to add them to the object's `allAttributes` or `allCTAs`
3. If approved, update the object JSON

**Checkpoint 8: Data updates approved**

---

## Phase 8: Implementation

### Step 1 — Create the shared base module (if needed)

If `packages/object-components/src/shared/{slug}.base.ts` doesn't exist, create it with:

- The data type interface (`{Object}Data`) reflecting all attributes from the object JSON
- State type (`{Object}State`) for lifecycle states
- Constants (overflow CTAs, status class maps, attribute presets per context)

### Step 2 — Create shared shape styles (if needed)

If this is a new shape family without existing styles at `packages/object-components/src/shared/shapes/{shape}.styles.ts`, create the shared CSS-in-JS styles for the shape.

### Step 3 — Create the Lit Web Component

Build `packages/object-components/src/ren-{slug}-{shape}.ts`:

- Lit 3 `@customElement` with tag name `ren-{slug}-{shape}`
- Properties: `data` (typed to `{Object}Data`), `shape`, `state`, `context`, `visibleAttributes`, `availableCTAs`, `contextData`
- Shadow DOM with CSS custom properties for theming
- Context-aware rendering using `shouldShow` / `resolvePreset` patterns
- CTA events via `ren-cta-click` custom event
- All states from the state coverage plan
- Accessibility: ARIA roles, keyboard handlers, focus management

### Step 4 — Update package infrastructure

1. Update `packages/object-components/src/index.ts` barrel export
2. Add the component export path to `packages/object-components/package.json` exports

### Step 5 — Build and verify

Run `npm run build:components` to build the Web Component library. Fix any TypeScript or build errors.

### Step 6 — Wire into the Caboodle site

Update the site to load and display the new component. This may involve updating `ObjectGuideClient.tsx` or creating a new showcase mechanism. Verify with `npm run build:site`.

### Step 7 — Process the cascade queue

If there are queued nested views from Phase 3, start the flow for the next one — return to Phase 1 with the next object.

**Checkpoint 9: Component implementation verified**

Confirm the component builds, renders, and matches the approved Figma design. Demonstrate it to the user.

---

## Collaboration Checkpoints Summary

| # | Phase | Gate |
|---|-------|------|
| 1 | Context Gathering | Object and context selected |
| 2 | Context Gathering | Clarifying questions answered |
| 3 | Design Proposal | Proposal reviewed and revised |
| 4 | Cascade Queue | Nested view decisions made |
| 5 | Figma Collaboration | Mockup shared |
| 6 | Expert Review | Feedback addressed |
| 7 | Iteration | Success criteria confirmed |
| 8 | Artifact Writing | Data updates approved |
| 9 | Implementation | Component verified |
