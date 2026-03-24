# Object Guide Detail Page

> **Status: Partial** — Tab structure and data tables match the current implementation. Routes, tab names, and some details have diverged. See notes below.

**Route (current):** `/objects/[systemSlug]/[objectSlug]`
**Route (original spec):** `/objects/:slug`
**Purpose:** The canonical reference page for a single object — leading with how it looks and behaves across roles, states, and contexts (the visual story), with OOUX data woven in as context and the full spec available as a reference appendix.
**Reference design:** [Figma — Common Objects, node 88:4139](https://www.figma.com/design/cvYcOvHomKCMt3uGOFSEdR/Common-Objects?node-id=88-4139)

### Implementation Status

| Aspect | Spec | Current Implementation |
|--------|------|----------------------|
| Route | `/objects/:slug` | `/objects/[systemSlug]/[objectSlug]` (system-based nesting) |
| Tab names | Overview, Stories & Rules, Relationships, Reference | Views, Attributes, Actions, Relationships |
| Overview tab | Two-column layout with card/list/detail showcases + sidebar | Views tab shows shapeshifter context cards linking to View Inspector |
| Showcase rendering | Inline rendered components | View Inspector at `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]` |
| Configuration controls | Sidebar radio buttons (Role/State/Context) | View Inspector has role selection and attribute/CTA toggles |
| Framework code examples | Web Components, React, Angular, Vue tabs | Not currently shown in Object Guide (was in Reference tab) |
| Back link | `←` to `/objects` | BackLink component to system page |
| Variation links | `/objects/{parent-slug}-{variant-slug}` | Not implemented — variations are listed but not separately routable |

---

## Page Zones

### 1. Identity Header (white background)

| Element | Spec | Notes |
|---|---|---|
| **Back link** | `←` arrow linking to `/objects` | Returns to Object Library index |
| **Object icon** | 40×40px, inline before object name | `object_icon.svg` for Core objects, `object-variation_icon.svg` for Variations, `domain-object_icon.svg` for Domain objects |
| **Object name** | Georgia Bold 32px | e.g. "Student" |
| **Type badge** | Georgia Regular 32px, inline after name | "(Core)", "(Domain)", or variation qualifier e.g. "(Lesson Participant)" |
| **Synonyms pill** | Gray bordered pill, 14px Roboto | e.g. "~ learner, pupil, child, kid" |
| **Definition** | Roboto 16px, black, full paragraph | Inline links to related objects |
| **Product tag** | `#fafafa` pill with Renaissance logo icon + product name(s) | e.g. "All products" or "Nearpod" |

### 1.5 Variations (conditional — core objects only)

This zone appears **only on core object pages that have product-specific variations**. It sits between the Identity Header and the Secondary Tabs. Variations are product-specific specializations of a core object — for example, "Student (Lesson Participant)" is Nearpod's specialization of the core Student object.

**Reference design:** [Figma — Common Objects, node 85:4068](https://www.figma.com/design/cvYcOvHomKCMt3uGOFSEdR/Common-Objects?node-id=85-4068)

| Element | Spec | Notes |
|---|---|---|
| **Section label** | "VARIATIONS" — Roboto Bold 16px, uppercase, `#666` | Left-aligned above the card row |
| **Variation cards** | Horizontal row of compact cards, max 356px wide each | White background, 1px `#CCC` border, 8px border-radius, 24px padding |
| **Variation icon** | 40×40px `object-variation_icon.svg` | Left side of each card |
| **Variation name** | Roboto Bold 16px `#333` for parent name, Roboto Regular 16px for variant qualifier in parentheses | e.g. **Student** (Lesson Participant) |
| **Product line** | Roboto Regular 14px, `#666` | "Used in: Nearpod" |
| **Chevron** | 24×24px right-pointing chevron, `#999` | Right side; the entire card is a clickable link |
| **Horizontal scroll** | Cards scroll horizontally when they exceed the container width | 4px progress bar below cards: `#EEE` track, `#CCC` thumb, 960px max track width |
| **Divider** | 4px rounded bar separating Variations from the tabs below | Visual separator between the two zones |

**Linking:** Each variation card links to its own variation page at `/objects/{parent-slug}-{variant-slug}` (e.g., `/objects/student-lesson-participant`). Variation pages use the same page structure as core object pages but document product-specific differences in attributes, CTAs, and business rules.

**When absent:** If a core object has no variations, this zone is omitted entirely — the Secondary Tabs appear directly below the Identity Header.

### 2. Secondary Tabs (underline-style, `<button>` elements with `aria-selected`)

| Tab | Content | Default |
|---|---|---|
| **Overview** | Two-column layout: visual representations (main) + configuration controls & nested objects (sidebar) | **Active** |
| **Stories & Rules** | User stories, business rules, and lifecycle — merged into a single narrative tab | |
| **Relationships** | MCSFD spec cards for each connected object + related object card grid | |
| **Reference** | Full attribute table, CTA table, SIP validation — the appendix | |

### 3. Content Area (gradient background, `linear-gradient(-82deg, #fff 0%, #f4f4f4 99%)`)

Content below the tabs changes based on which tab is active. Tab switching is handled by inline JS using `data-tab-panel` attributes.

---

## Overview Tab (Default) — Two-Column Layout

The Overview tab uses a **two-column layout**: main content area (800px) on the left and a persistent sidebar (376px) on the right. The sidebar stays visible as the user scrolls through the main content.

### Sidebar (right, 376px, sticky)

The sidebar contains configuration controls and contextual information. It is composed of stacked cards.

#### Share Section

| Element | Spec | Notes |
|---|---|---|
| **Heading** | "Share" — Roboto Bold 16px | Top of sidebar |
| **URL field** | Read-only text input with copy icon | Displays a shareable URL that encodes the current Role/State/Context configuration, e.g. `https://ren-design.com/objects/student&config=...` |
| **Copy icon** | 16×16px content_copy icon | Copies the URL to clipboard on click |

#### Configuration Controls

A single card containing three radio button groups. Changing any control updates all visual representations in the main content area simultaneously.

| Control Group | Options | Default |
|---|---|---|
| **Role** | All users, Teacher, Student, Admin | All users |
| **State** | Active, Inactive, Transferred, Graduated | Active |
| **Context** | Dashboard, Class roster, Search results | Dashboard |

Radio buttons use standard filled/unfilled circle indicators. Labels are Roboto Regular 16px.

#### Nested Objects Section

A card showing the object's nested objects (from the NOM) as a vertical stack of compact relationship cards.

| Element | Spec | Notes |
|---|---|---|
| **Heading** | "Nested Objects" — Roboto Bold 16px | Top of the card |
| **Nested object cards** | Stacked vertically, full sidebar width | White background, 1px `#CCC` border, 8px border-radius |
| **Object icon** | 40×40px `object_icon.svg` | Left side of each card |
| **Object name** | Roboto Bold 16px, `#333` | e.g. "Score", "Class", "Assessment" |
| **Cardinality** | Roboto Regular 14px, `#666` | e.g. "One-to-many", "Many-to-many" |
| **Chevron** | 24×24px right-pointing chevron | Links to the nested object's guide page |
| **Relationship description** | Roboto Regular 14px, dashed top border, `#FAFAFA` background | e.g. "System-generated on assessment completion" |

Each nested object should be a different object — not duplicates. For Student, the nested objects are: Score (1:Many), Class (Many:Many), Assessment (Many:Many), Assignment (Many:Many).

### Main Content (left, 800px, scrollable)

The main content flows vertically through three representation sections, each following the same pattern: **visual showcase → attribute/CTA data tables → framework code block**.

#### Card Layout Section

| Element | Spec | Notes |
|---|---|---|
| **Section heading** | "Card layout" — Roboto Bold 24px, `#333` | |
| **Section description** | "How a **Student** appears in grids and dashboards" — Roboto 16px, object name bold | |
| **Card showcase** | 2 example cards side by side on a textured container | White container with subtle grid pattern, inset shadow, 8px border-radius |
| **Card previews** | Rendered inline (not screenshots), 356px wide each | Realistic sample data: "Harry Potter" (HP, green bubble, On watch) and "Hermione Granger" (HG, blue bubble, At/Above) |
| **Card content** | Name, grade/school, reading level + benchmark status, math level, nested object counts, "View profile" link, overflow menu (⋮) | Cards respond to Role/State/Context controls in the sidebar |

Below the card showcase:

| Element | Spec | Notes |
|---|---|---|
| **Attribute/CTA pill tabs** | Pill-style tabs: "Attributes" (active, dark fill) and "Calls-to-action (CTAs)" | Rounded pill buttons, 36px height, 20px border-radius |
| **Attribute table** | 4-column table: Attribute, Data type, Source, Description | 800px wide, bordered cells. Reference attributes (School, Class) show a link icon and arrow. Rows respond to Role filter. |
| **Framework code tabs** | Pill tabs with framework logos: Web Components (active), React, Angular, Vue | Rounded pills with 24×24px framework icons |
| **Code block** | Dark background (`#333`), `<Student/>` placeholder, copy button (bottom-right) | 300px height |

#### List Layout Section

Same structure as Card Layout, with these differences:

| Element | Spec | Notes |
|---|---|---|
| **Section heading** | "List layout" — Roboto Bold 24px | |
| **Section description** | "How a **Student** appears in rosters and tables" | |
| **List showcase** | 2 example cards in roster/list format on a textured container | Same container styling as Card Layout |
| **Attribute/CTA tables** | Same pill tabs and table structure, scoped to list view attributes | |
| **Framework code block** | Same framework tabs and code block | |

#### Detail Page Section

Same structure as Card and List Layout, showing the full student profile:

| Element | Spec | Notes |
|---|---|---|
| **Section heading** | "Detail page layout" — Roboto Bold 24px | |
| **Section description** | "What users see when they open a full **Student** record" | |
| **Detail page mock** | Rendered inside the content area on a textured container | Full-width profile header (avatar, name, grade, school, status, attributes), info grid, nested object chips |
| **Attribute/CTA tables** | Scoped to detail view context — shows all attributes visible on the detail page | |
| **Framework code block** | Detail-view-specific component usage | |

---

## Stories & Rules Tab

Merges the previous User Stories and Business Rules tabs into a single narrative tab.

### User Stories

- **Section heading**: "User Stories"
- Story cards (`.story-card`) displayed in a responsive grid, each containing:
  - **Story title**: Bold heading (e.g., "View Student Profile")
  - **Story body**: "As a [role], I want to [action] so that [outcome]"
  - **Acceptance criteria**: Bulleted list of testable conditions
- Reference implementation shows 3 stories: View Profile, View Scores, Transfer Student

### Business Rules

- **Section heading**: "Business Rules"
- Numbered rule items (`.rule-item`), each with a rule number badge and description
- Reference implementation shows rules covering enrollment, status transitions, data retention, etc.

### Status / Lifecycle

- **Section heading**: "Status / Lifecycle"
- **Lifecycle flow diagram**: A visual flow (`.lifecycle-flow`) showing state transitions with arrows
  - Example: Active → Transferred, Active → Inactive, Active → Graduated
- **Status table**: Data table with columns:
  - Status name, Description, Transitions (what states it can move to), Who can trigger

---

## Relationships Tab

### Relationship Specs (MCSFD)

Relationship cards (`.relationship-card`) for each connected object, each showing:

| Element | Content |
|---|---|
| **Target object name** | Linked to that object's guide page |
| **Mechanics** | How the relationship is formed (Manual, Automatic, System) |
| **Cardinality** | 1:1, 1:Many, Many:Many |
| **Default sort** | How related items are sorted by default |
| **Filters** | Available filter dimensions |
| **Dependency** | Required vs. optional; cascade behavior |

Reference implementation shows specs for Student↔Class, Student↔Score, Student↔School.

### Related Objects

A grid of object cards (`.obj-card`) linking to directly connected objects. Each card shows the object's icon, name, type badge, definition, and stats footer (attribute/CTA/relationship counts).

Reference implementation links to: Class, School, Assessment, Assignment, Score.

---

## Reference Tab

The appendix — full OOUX data tables for engineers, analysts, and contributors who need the complete spec.

### Attributes (full inventory)

Sortable 4-column table: Attribute, Data type, Source, Description. Shows ALL attributes, not just the ones visible in a specific role/context.

### CTAs (full inventory)

Sortable table with columns: CTA, Priority (P/S/T/Q badge), Roles, Cross-Object link. Shows ALL CTAs across all roles.

### SIP Validation

| Section | Content |
|---|---|
| **SIP Test** | 3-column table (Structure, Instances, Purpose) with evidence |
| **Verdict Banner** | Colored badge with pass/fail result and explanation |
| **Synonyms table** | Alternate names, product/context, official status |

---

## Implementation Notes

### Interactive Behavior (inline JS)

The page includes a `<script>` block at the bottom handling:

1. **Tab switching** — Click a `.secondary-tab` button to show the corresponding `[data-tab-panel]` and hide others
2. **Pill tab switching** — Click a `.pill-tab` to toggle `aria-selected` and show/hide `[data-panel]` content within data sub-tab sections and framework code sections
3. **Sidebar configuration controls** — Radio button changes in Role, State, and Context groups update all visual representations (card, list, detail page) in the main content simultaneously. This includes: swapping visible attributes and CTAs, updating status badges and indicators, adjusting card content to reflect the selected role's perspective, and updating the attribute/CTA data tables below each showcase section.
4. **Share URL generation** — Changing any configuration control updates the Share URL to encode the current Role/State/Context, allowing users to link directly to a specific configuration.
5. **Code copy** — `.code-block-copy` buttons copy the adjacent `<code>` text to clipboard

### CSS Components Used

Key component classes from `components.css`:

| Class | Purpose |
|---|---|
| `.guide-header` | Identity header zone |
| `.guide-title`, `.guide-back`, `.guide-definition` | Header elements |
| `.synonyms-pill` | Gray bordered synonym display |
| `.product-tag` | Product association pill |
| `.secondary-tabs`, `.secondary-tab` | Tab bar and tab buttons |
| `.content-area` | Tab panel container |
| `.overview-layout` | Two-column grid: main (800px) + sidebar (376px) |
| `.overview-main` | Left column — scrollable representation sections |
| `.overview-sidebar` | Right column — sticky configuration + nested objects |
| `.sidebar-card` | Stacked card containers in sidebar |
| `.config-controls` | Radio button groups for Role, State, Context |
| `.nested-object-card` | Compact nested object display with icon, name, cardinality |
| `.showcase-section` | Visual representation section (card, list, or detail) |
| `.showcase-container` | Textured container with grid pattern for showcasing rendered UI |
| `.pill-tabs`, `.pill-tab` | Sub-tab toggles for Attributes/CTAs and framework code |
| `.data-table`, `.col-attr`, `.col-type`, `.col-source` | Data tables with fixed column widths |
| `.code-block`, `.code-block-copy` | Dark code display with copy button |
| `.profile-list`, `.profile-item` | List view roster rows |
| `.story-card` | User story cards |
| `.relationship-card` | MCSFD spec display |
| `.related-objects`, `.obj-card` | Related object card grid |
| `.rule-item` | Business rule display |
| `.lifecycle-flow` | State transition diagram |
| `.verdict-banner`, `.sip-badge` | SIP validation result |

### Resolved Decisions

1. **"Showcase-first" philosophy** — The Overview tab leads with visual representations (Card, List, Detail Page) as the focal point. OOUX data (attributes, CTAs) is woven in directly below each representation as contextual support, not the primary content.
2. **Two-column layout** — The Overview tab uses a persistent sidebar for configuration controls and nested objects, keeping controls visible while scrolling through representations.
3. **Unified sidebar controls** — Role, State, and Context are radio button groups in a sticky sidebar, replacing the previous inline pill controls. Changes apply globally across all three representation sections.
4. **Merged Stories & Rules** — The previous separate "User Stories" and "Business Rules" tabs are combined into a single "Stories & Rules" tab, since both describe how the object behaves in narrative form.
5. **Reference tab as appendix** — SIP Validation, previously its own tab, is folded into the "Reference" tab alongside full attribute and CTA inventories. This tab is the OOUX data appendix for contributors who need the complete specification.
6. **Four tabs total** — Reduced from six tabs (Collection View, Detail View, SIP Validation, User Stories, Relationships, Business Rules) to four (Overview, Stories & Rules, Relationships, Reference).
7. **Shareable configurations** — The Share URL feature encodes the current Role/State/Context selection, enabling teams to link to a specific configuration for discussion.
8. **Detail Page section kept** — The full student profile mock remains in the Overview tab as the third representation section (after Card Layout and List Layout).
9. **Nested Objects in sidebar** — Nested objects from the NOM are surfaced in the sidebar with cardinality and relationship descriptions, providing relationship context without leaving the Overview.
