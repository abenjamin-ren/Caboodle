---
name: orca-to-ui
description: Translate ORCA artifacts into concrete UI design decisions — mapping object definitions, priorities, and relationships to visual hierarchy, layout, interaction patterns, and component specs. Use when the user has ORCA outputs (Object Guides, NOM, CTA Matrix, P/S/T/Q rankings, attribute priorities, MCSFD specs) and needs to turn them into UI design.
---

# ORCA → UI Design Translator

Bridge the gap between ORCA analysis and interface design. This skill takes structured OOUX artifacts and translates them into concrete, implementable UI decisions — applying the Caboodle UI design rules throughout.

## When to Use This Skill

- The user has completed one or more ORCA steps and wants to design a UI
- The user has an Object Guide and needs to design a page, card, or component
- The user wants to translate P/S/T/Q rankings into button styles and placement
- The user wants to turn force-ranked attributes into content hierarchy
- The user needs to map NOM relationships to navigation structure
- The user has MCSFD specs and needs to decide how relationships appear in the UI

## Prerequisites

Before running, read the applicable UI design rules (all in `.cursor/rules/`):

1. `ui-accessibility.mdc` — WCAG 2.2 compliance for all outputs
2. `ui-typography.mdc` — Type hierarchy for attribute display
3. `ui-visual-design.mdc` — Visual hierarchy, color, spacing, attention management
4. `ui-content.mdc` — Grice's Maxims for labels, microcopy, content prioritization
5. `ui-interaction.mdc` — Usability heuristics, progressive enhancement, state management
6. `ui-data-visualization.mdc` — For data-heavy object views and dashboards
7. `ui-navigation.mdc` — IA, wayfinding, navigation patterns
8. `ui-forms.mdc` — For CTA-driven input flows

Also read the Caboodle-specific rules:

9. `caboodle-layouts.mdc` — Every Layout composition system
10. `caboodle-conventions.mdc` — Project conventions
11. `caboodle-css.mdc` — CSS authoring rules

## Instructions

### Step 1 — Inventory available ORCA artifacts

Ask the user which ORCA artifacts are available. Check Confluence (OOUX space) or local docs for:

| Artifact | ORCA Step | What it tells the UI |
|---|---|---|
| Object list (SIP-validated) | 01 Discovery | What distinct things exist in the system |
| NOM (Nested-Object Matrix) | 02 Discovery | Which objects live inside other objects → navigation hierarchy |
| CTA Matrix | 03 Discovery | All possible user actions → interaction inventory |
| Object Map | 04 Discovery | All attributes per object → content model |
| Object Guide | 05 Prioritization | Complete object reference → single source of truth |
| MCSFD Specs | 06 Prioritization | Relationship details → how objects connect in the UI |
| CTA Prioritization (P/S/T/Q) | 07 Prioritization | Action hierarchy → button prominence and placement |
| Attribute Prioritization | 08 Prioritization | Content hierarchy → what shows on cards vs detail pages |
| Object Cards | 09 Representation | Card design specs → component implementation |
| Nav Flow | 10 Representation | Page tree and routing → navigation implementation |
| CTA Placement | 11 Representation | Button positions on cards and pages → interaction implementation |
| Shapeshifter Matrix | 12 Representation | Variant rules → design system consistency |

Present: "I'll translate your ORCA artifacts into UI design decisions. Which artifacts do we have to work with?"

If the user provides a Confluence space or page IDs, read the artifacts directly. If artifacts are missing, note which UI decisions will need to be made without ORCA guidance (and flag them as assumptions).

### Step 2 — Determine the design target

Ask the user what they need designed:

- **A single object's pages** (card, list view, detail page)
- **A multi-object view** (dashboard, landing page, comparison)
- **A navigation structure** (site IA, page tree, routing)
- **A component** (a specific card type, data table, interaction pattern)
- **A full feature flow** (multi-step task involving several objects)

This determines which translation tables to apply.

### Step 3 — Apply the translation tables

Work through the relevant translation tables below. For each ORCA artifact, map its outputs to specific UI decisions. Present each set of decisions to the user for confirmation before proceeding.

---

## Translation Tables

### A. Object Identity → Visual System

**Input:** Object Discovery (step 1), Object Guide (step 5)

Each validated object needs a visual identity that makes it instantly recognizable. This fights the **Masked Objects** anti-pattern.

| ORCA element | UI design decision | Design rule applied |
|---|---|---|
| Object name | Display label, page title, nav label | Content: Manner (clear, unambiguous) |
| Object definition | Subtitle text, tooltip content, meta description | Content: Quantity (enough to distinguish, no more) |
| Synonyms | Search keywords, "also known as" display | Content: Relation (relevant context) |
| Object category (Core vs Domain) | Badge style, section grouping, icon variant | Visual: Similarity (same category = same badge pattern) |
| Number of attributes/CTAs/relationships | Stats display on cards | Visual: Information density |

**Identity system decisions (confirm with user):**

- **Color:** Assign each object a distinctive hue from the palette. Use for avatar background, accent borders, and badges. Ensure 3:1 contrast for non-text elements.
- **Avatar pattern:** Initials, icon, or illustration. Must be distinguishable at 24px.
- **Shape language:** Can objects have distinct container shapes? (Rounded for people, angular for data, etc.)
- **Typography treatment:** All objects share the same type scale. Distinction comes from color and icon, not font variation.

### B. Force-Ranked Attributes → Content Hierarchy

**Input:** Attribute Prioritization (step 8)

The force-ranked top 5 attributes become the card's visible content. Everything else goes on the detail page. This directly translates to visual hierarchy.

| Attribute rank | UI zone | Typography | Visibility |
|---|---|---|---|
| Rank 1 (Primary identifier) | Card title, page heading | Largest, boldest (`h2`/`h3` on cards, `h1` on detail) | Always visible — card, list row, and detail page |
| Rank 2 (Key descriptor) | Card subtitle, page subheading | Second-largest, medium weight | Always visible on card and detail |
| Rank 3 (Status/state) | Status badge or inline indicator | Small, colored badge or dot + label | Visible on card; prominent on detail |
| Rank 4 (Critical metric) | Card metric area, detail sidebar | Numeric emphasis, monospace or tabular figures | Visible on card; detail page metric section |
| Rank 5 (Context/parent) | Card footer or breadcrumb link | Small, muted color (`--color-mid`) | Visible on card; breadcrumb on detail |
| Rank 6+ (Supporting) | Detail page body sections | Normal body text | Detail page only — behind tabs or in expandable sections |

**Design decisions to confirm:**

- Which attributes get their own visual treatment (badge, pill, icon)?
- Are any attributes dynamic enough to need real-time updates?
- Should any Rank 6+ attributes surface conditionally (e.g., on hover, in expanded view)?

### C. CTA Prioritization (P/S/T/Q) → Button Hierarchy

**Input:** CTA Prioritization (step 7)

The P/S/T/Q ranking maps directly to visual prominence and placement. This fights the **Broken Objects** anti-pattern.

| CTA tier | Button style | Placement | Interaction |
|---|---|---|---|
| **Primary** | Filled button, brand color, full label (verb + noun) | Card: always visible, bottom row. Detail: header action bar, largest button | Click/tap → immediate action or confirmation dialog |
| **Secondary** | Outlined button or icon + text link | Card: visible alongside Primary (2–3 max). Detail: header action bar, secondary style | Click/tap → action or modal |
| **Tertiary** | Text in overflow menu (...) | Card: overflow menu trigger. Detail: "More actions" dropdown | Click overflow → select from menu |
| **Quaternary** | Settings/admin panel item | Not on card. Detail: admin section, settings tab, or separate page | Navigate to settings → find action |

**Design rules applied:**

- **Fitts's Law:** Primary CTA is the largest interactive element in the card. On detail pages, it's near the top, in the user's primary scan area
- **Hick's Law:** Only 1 Primary + 2–3 Secondary visible at once. More choices go into overflow menus
- **Attention management:** Primary uses the strongest visual signal (filled, brand color). Secondary is subdued. Tertiary is hidden until requested

**Decisions to confirm:**

- Does the Primary CTA navigate (link) or act in place (button)?
- Which Secondary CTAs are icon-only vs icon+text?
- Are any CTAs role-dependent? (Teacher sees "Assign," Student sees "Start")
- Are any CTAs state-dependent? (Active → "Archive," Archived → "Restore")

### D. NOM (Nested Objects) → Page Architecture & Navigation

**Input:** NOM (step 2), Nav Flow (step 10)

The NOM tells you exactly which objects appear inside other objects. This translates directly to page content and navigation structure.

| NOM relationship | UI pattern | Layout |
|---|---|---|
| Object A nests Object B (many) | Object A's detail page has a card list of Object B instances | `.grid` or data table inside a tab or section |
| Object A nests Object B (few) | Object A's detail page shows Object B inline or as embedded cards | `.cluster` or `.reel` of compact cards |
| Object A nests Object B (one) | Object A's detail page shows Object B's key attributes inline | Inline display, not a separate card |
| Hub object (nests 4+ objects) | Multi-section detail page with tabs or vertical sections per nested type | `.secondary-tabs` → `.content-area` with sections per type |
| Leaf object (nests 0–1 objects) | Simple detail page, no nested card lists | `.center .stack` with attribute display |

**Navigation tier assignment:**

| NOM characteristic | Navigation tier | UI treatment |
|---|---|---|
| Hub object (most connections) | Primary nav | Always-visible nav tab, dedicated list page |
| Medium object (2–3 connections) | Secondary nav | Reachable from hub detail pages, may have own list page |
| Leaf object (0–1 connections) | Deep nav | Reached by drilling into parent, no dedicated list page |

**IA decisions to confirm:**

- Which objects get top-level nav tabs? (Max 5–7)
- Which nested objects are shown as card grids vs data tables vs inline mentions?
- Are there cross-links between objects that aren't direct NOM relationships?
- What breadcrumb path leads to each object?

### E. MCSFD Specs → Relationship UI Patterns

**Input:** MCSFD Specs (step 6)

Each MCSFD dimension maps to a specific UI decision:

| MCSFD dimension | UI translation |
|---|---|
| **Mechanics** (how does the relationship work?) | Does relating objects use a modal, inline add, drag-drop, or autocomplete? |
| **Cardinality** (how many?) | One-to-many → card list with count badge. One-to-one → inline display. Many-to-many → filterable table with add/remove |
| **Sorts** (default order) | Default sort control on the nested card list. Which attribute is the initial sort key? |
| **Filters** (narrowing criteria) | Filter controls above the nested card list. Which meta-attributes drive filters? |
| **Dependency** (lifecycle coupling) | Visual indicators: parent badge on dependent objects, cascade warnings on delete, "Required" labels |

**Relationship display patterns:**

| Relationship type | Display pattern |
|---|---|
| Parent → Children (one-to-many) | Tab or section on parent detail page containing child cards |
| Child → Parent (many-to-one) | Breadcrumb link, parent badge, or contextual label on child card |
| Peers (many-to-many) | "Related {Object}" section on detail page, compact card list or tag cluster |
| Composition (tightly coupled) | Embedded inline on parent — not a separate card, but integrated content |
| Aggregation (loosely coupled) | Linked card with "View" CTA — navigates to independent detail page |

### F. Shapeshifter Matrix → Design System Constraints

**Input:** Shapeshifter Matrix (step 12)

The Shapeshifter Matrix defines what MUST stay the same and what MAY change across contexts. This translates to design system invariants.

| Shapeshifter rule | Design system constraint |
|---|---|
| Name must be consistent | Use canonical name everywhere; synonyms only in explicit "also known as" displays |
| Icon/avatar must be consistent | One avatar pattern per object type, stored as a design token |
| Identity color must be consistent | Object color defined in `tokens.css`, used for avatar, accent, and badges everywhere |
| Core attributes (top 3) always shown | Card components must always include Ranks 1–3, regardless of context |
| Primary CTA always the same | One Primary CTA per object per role, same verb and label everywhere |
| Allowed variations | Document explicitly: which attributes, CTAs, or visual elements may change per context, and why |

### G. Object Card Spec → Component Implementation

**Input:** Object Cards (step 9)

Translate the card anatomy directly to HTML/CSS:

```
Card anatomy (from step 9):        HTML/CSS implementation:
┌──────────────────────────────┐
│ [Avatar] Title          [...] │   .obj-card > .obj-card-header
│          Subtitle            │     .obj-card-avatar (identity color bg)
│──────────────────────────────│     .obj-card-name (h3, --font-plain, bold)
│ Status    Metric     Context │     .obj-card-subtitle (--color-mid)
│──────────────────────────────│   .obj-card-body
│ [Primary CTA] [Secondary]   │     .obj-card-stats (cluster of stat items)
└──────────────────────────────┘   .obj-card-actions
                                     .btn.btn-primary, .btn.btn-secondary
```

**Component checklist (from the UI rules):**

- [ ] All 9 states designed: default, hover, focus, active, disabled, loading, error, success, empty
- [ ] Touch target ≥ 24×24 CSS px (prefer 44×44 for buttons)
- [ ] Focus visible with 2px+ outline at ≥3:1 contrast
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for non-text
- [ ] Card is keyboard-navigable (Tab to card → Enter to Primary CTA)
- [ ] Screen reader announces: object type, name, key attributes, available actions
- [ ] Identity color distinguishes this card from other object types (Distinctness Test)
- [ ] Works at 200% zoom without overflow or truncation

### H. User Roles → Conditional UI

**Input:** Object Guide (step 5), CTA Prioritization (step 7)

Different roles may see different content on the same page. Map role-based rules to UI conditionals:

| Role difference | UI treatment |
|---|---|
| Different Primary CTA per role | Swap the Primary button label/action; keep position constant |
| Role sees fewer attributes | Hide attribute sections, not rearrange — keep layout stable |
| Role sees fewer CTAs | Remove lower-tier CTAs from their view; never remove Primary |
| Role has read-only access | Replace action buttons with view-only indicators; disable inputs |
| Role has admin access | Show additional sections (admin panel, settings) — never mix admin and user CTAs in the same zone |

### I. Lifecycle States → Dynamic Visual Indicators

**Input:** Object Guide (step 5) — lifecycle states and business rules

Object state changes should be visually clear without relying on color alone:

| State type | Visual pattern |
|---|---|
| Active/Current | Default appearance (no special indicator needed — the absence of a state indicator IS the "normal" state) |
| Pending/Draft | Subtle visual change: muted colors, dashed border, "Draft" badge |
| Completed/Archived | Reduced opacity or muted palette, "Completed" badge, CTAs reduced or hidden |
| Error/Blocked | Error color + icon + text label, affected attributes highlighted |
| Locked/Read-only | Lock icon, disabled interactive elements, tooltip explaining why |

---

## Step 4 — Synthesize into a design specification

After working through the applicable translation tables, compile the decisions into a design specification document. Structure it as:

### Design Spec: {Object or Feature Name}

**1. Visual Identity**
- Color, avatar, shape language

**2. Content Hierarchy**
- Attribute ranking → card zones → detail page sections

**3. Interaction Model**
- CTA placement (P/S/T/Q → button styles and positions)
- State management (lifecycle states → visual indicators)
- Role-based variations

**4. Information Architecture**
- Page type (landing, list, detail)
- Navigation tier (primary, secondary, deep)
- Nested object display patterns
- Breadcrumb path

**5. Relationship Display**
- How each related object appears on this page
- MCSFD-driven controls (sorts, filters, dependency indicators)

**6. Consistency Rules (from Shapeshifter Matrix)**
- What must stay the same across contexts
- What may vary, and why

**7. Accessibility Checklist**
- Contrast verification
- Keyboard navigation plan
- Screen reader announcement sequence
- Touch target compliance

### Step 5 — Confirm and implement

Present the design spec to the user. After confirmation:

- For Caboodle pages: hand off to the **Page Builder** or **Object Guide Builder** skill for HTML/CSS implementation
- For Confluence documentation: publish the design spec to the OOUX Confluence space
- For engineering handoff: format as a component spec with markup examples

## Collaboration Checkpoints

This skill has checkpoints at:

1. **Artifact inventory** — which ORCA outputs are available?
2. **Design target** — what are we designing?
3. **Identity decisions** — colors, avatars, shape language
4. **Content hierarchy** — attribute ranking confirmation
5. **Interaction model** — CTA placement and state design
6. **IA decisions** — navigation tier and page structure
7. **Full spec review** — before implementation or publishing

Never proceed past a checkpoint without user confirmation. Never invent ORCA data that hasn't been provided.
