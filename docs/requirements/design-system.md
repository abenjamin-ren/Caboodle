# Design System — Object-Oriented Component Library for Renaissance Products

> **Status: Partial** — The two-layer model, structural category system, shapeshifter framework, CTA placement framework, and anti-pattern checklists remain valid design guidance. However, the identity system was implemented differently: the current codebase uses an **icon-based** identity system (three tiers: core, domain, variation) instead of the per-object color and avatar shape system proposed below. See `docs/decisions/004-icon-identity.md` for the rationale. The Lit WC library that would implement these card recipes needs rebuilding.

**Project:** OOUX Resource Site (Internal Renaissance)
**Purpose:** A browsable, adoptable design system organized around the 13 core Renaissance objects — enabling product teams across Star, Freckle, myON, Nearpod, and Lalilo to render objects consistently and fight the four OOUX anti-patterns.

---

## Why This Exists

Renaissance has 13 core objects that appear across multiple products. Today, a **Student** looks completely different in Star (test scores dashboard) vs. Freckle (adaptive practice view) vs. myON (reading profile) vs. Nearpod (participation feed). Some of those differences are intentional (different product contexts emphasize different attributes). Many are not — they're accidental shapeshifters created by teams working independently.

This design system doesn't replace each product's existing component library. It sits **on top** as a "recipes" layer that defines how objects should be represented, which attributes to prioritize, which CTAs belong on which surfaces, and what stays constant across contexts.

> *"A good design system provides the language for how objects should present themselves across the board."* — Sophia Prater

> *"If the choices aren't linked to objects, teams might as well be flipping a coin."* — Brad Frost

---

## The Two-Layer Model

| Layer | What It Contains | Who Owns It | Purpose |
|---|---|---|---|
| **Ingredients** (primitives) | Buttons, inputs, spacing, color tokens, typography, layout grids | Each product's design system team | UI consistency within a product |
| **Recipes** (object representations) | How a Student card looks, how an Assessment detail page is structured, how CTA buttons are hierarchized on a Class page | OOUX / cross-product design | **Object consistency across products** |

The ingredients layer is product-specific. Renaissance products already have their own component libraries and that's fine.

The recipes layer is what this design system provides. It answers: *"When a user encounters a Student — in any product, any context — what should they always see, and what can change?"*

---

## The Four Anti-Patterns This System Fights

| # | Ancient Truth | Anti-Pattern | What Goes Wrong | How the Design System Prevents It |
|---|---|---|---|---|
| 1 | Things that are different should look different | **Masked Objects** | A Student card and a Class card use the same generic tile. Users can't tell what they're looking at. | Every object gets a unique identity color, avatar shape, and card structure. |
| 2 | Humans navigate through relationships | **Isolated Objects** | A Score appears with no link to the Student who earned it or the Assessment that produced it. | Every object card and detail page must surface its NOM relationships. |
| 3 | Humans act through direct manipulation | **Broken Objects** | A Teacher can see an Assessment on screen but has to navigate to a different page to schedule it. | CTAs are placed directly on object cards using the P/S/T/Q framework. |
| 4 | Same objects should look the same | **Shapeshifters** | A Student's profile photo is circular in Star, square in Freckle, and absent in Nearpod — for no reason. | The Shapeshifter Matrix defines invariants and documents every intentional variant. |

---

## Identity System — The 13 Core Objects

Every object gets three invariants that **never change** across any context, product, or variant:

1. **Identity Color** — The object's signature color for stripes, avatar backgrounds, and accent borders
2. **Avatar** — Shape (circle or rounded square) + content (abbreviation, photo, or numeral)
3. **Name Treatment** — Bold, consistent font weight, predictable position relative to the avatar

### Color Assignments

| # | Object | Color Name | Hex | Rationale | Avatar Shape | Abbreviation |
|---|---|---|---|---|---|---|
| 1 | **Student** | Royal Blue | `#2563EB` | Learners are the heart of the system — blue signals trust, knowledge | Circle (photo or initials) | ST |
| 2 | **Teacher** | Indigo | `#4F46E5` | Educators guide — indigo is deeper blue, authority and mentorship | Circle (photo or initials) | TC |
| 3 | **Class** | Violet | `#7C3AED` | The group container — violet suggests community, cohort | Rounded square | CL |
| 4 | **School** | Slate | `#475569` | The institution — neutral and grounded, stable | Rounded square | SC |
| 5 | **District** | Dark Slate | `#1E293B` | Top-level administration — the darkest and most authoritative | Rounded square | DI |
| 6 | **Assessment** | Red | `#DC2626` | Evaluation and urgency — red is high-stakes, attention | Rounded square | AS |
| 7 | **Assignment** | Orange | `#EA580C` | Tasks and work — orange signals activity, doing | Rounded square | AG |
| 8 | **Skill** | Green | `#16A34A` | Competency and growth — green is mastery, learning trajectory | Circle | SK |
| 9 | **Resource** | Amber | `#D97706` | Content and materials — amber is warm, approachable, craft | Rounded square | RS |
| 10 | **Score** | Gold | `#CA8A04` | Measured results — gold signals achievement, outcomes | Circle | SR |
| 11 | **Standard** | Teal | `#0D9488` | Clarity and precision — teal is measured, systematic | Circle | SD |
| 12 | **Proficiency Prediction** | Pink | `#DB2777` | AI-generated forecast — pink is forward-looking, distinctive | Circle | PP |
| 13 | **Insight** | Cyan | `#0891B2` | AI-generated recommendation — cyan is intelligent, analytical | Circle | IN |

> **Note:** These colors are a starting proposal. They need validation for:
> - Accessibility (WCAG contrast ratios against white/dark backgrounds)
> - Sufficient visual separation between similar hues (Blue vs. Indigo, Orange vs. Amber)
> - Alignment with existing Renaissance brand palette
> - Colorblind-safe combinations (shape + abbreviation provide non-color differentiation)

### Avatar Shape Logic

| Shape | Used For | Semantic Meaning |
|---|---|---|
| **Circle** | Student, Teacher, Skill, Score, Standard, Proficiency Prediction, Insight | Represents singular entities — individuals, competencies, data points |
| **Rounded Square** | Class, School, District, Assessment, Assignment, Resource | Represents containers, activities, and resources — things that hold or produce other things |

People objects (Student, Teacher) can use **photos** inside the circle. All others use the 2-letter abbreviation on the identity color background.

### Visual Differentiation Matrix

No two objects should be confusable at a glance. This matrix shows how — **structure is the primary differentiator**, with color as a reinforcing signal:

| Signal | Student | Teacher | Class | School | District | Assessment | Assignment | Skill | Resource | Score | Standard | Prof. Pred. | Insight |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Layout** | People | People | Container | Container | Container | Activity | Activity | Knowledge | Knowledge | Data/AI | Knowledge | Data/AI | Data/AI |
| **Dominant Visual** | Photo | Photo | Stat blocks | Stat blocks | Stat blocks | Progress bar | Progress bar | Taxonomy | Cover image | Big number | Code badge | Percentage | Body text |
| **Unique Element** | Grade band | Subject tag | Hierarchy breadcrumb | Hierarchy breadcrumb | Hierarchy breadcrumb | Status badge | Due date | Domain path | Thumbnail | Trend arrow | Standard code | Confidence | Feedback btns |
| **Color** | Blue | Indigo | Violet | Slate | Dark Slate | Red | Orange | Green | Amber | Gold | Teal | Pink | Cyan |
| **Shape** | ⚪ | ⚪ | ▢ | ▢ | ▢ | ▢ | ▢ | ⚪ | ▢ | ⚪ | ⚪ | ⚪ | ⚪ |
| **Avatar** | Photo/ST | Photo/TC | CL | SC | DI | AS | AG | SK | RS | SR | SD | PP | IN |
| **Has Photo** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### Structural Distinctness Test

Color is a **reinforcing** signal, not the primary one. Every card must pass this test:

1. **Grayscale test:** Convert the page to grayscale. Can you still identify which of the 5 categories a card belongs to? (Yes — different layouts, different dominant visuals.)
2. **Remove-text test:** Remove all text content. Can you tell People from Containers from Activities? (Yes — photos vs. stat block grids vs. progress bars vs. cover images vs. big numbers.)
3. **Side-by-side test:** Show two cards from different categories next to each other. Can a new user tell they represent fundamentally different kinds of things? (Yes — the structural shape is different.)

If a card fails any of these tests, it is a Masked Object and needs structural revision.

---

## Structural Differentiation — Category-Based Card Templates

The 13 core objects are grouped into **5 semantic categories**. Each category has a structurally distinct card layout — different anatomy, proportions, content zones, and dominant visual elements. The layout itself communicates what *kind* of thing the card represents before the user reads a single word.

| Category | Objects | Structural Signature | Dominant Visual |
|---|---|---|---|
| **People** | Student, Teacher | Photo-forward, horizontal header | Large circular photo |
| **Container** | Class, School, District | Metrics dashboard, stat blocks grid | Nested object counts |
| **Activity** | Assessment, Assignment | Status-driven, progress indicator | Progress bar + status badge |
| **Knowledge** | Skill, Resource, Standard | Taxonomy-forward, classification badges | Code badge / cover image / domain path |
| **Data / AI** | Score, Proficiency Prediction, Insight | Number-forward or recommendation text | Big number / percentage / body text |

### Category 1: People Cards (Student, Teacher)

**Design intent:** These are the only objects with photos. The photo IS the visual anchor — no color stripe needed. The layout is warm and personal.

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  Jane Doe                [T]  │
│  │      │  Grade 3 · Lincoln Elem.      │
│  │ PHOTO│                               │
│  │      │  Reading: 3.2 GE              │
│  └──────┘  Math: 320 SS                 │
│                                         │
│  3 classes · 12 scores · Active         │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ View     │  │ Scores   │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

| Element | Rule |
|---|---|
| **Photo avatar** | Large circle (48–56px). Photo or initials on identity color background. Dominates the left side. |
| **No color stripe** | The photo is the visual anchor. No top-border stripe needed — the avatar does the work. |
| **Name** | Bold, immediately right of the photo. |
| **Grade / role** | Subtitle immediately below name — personal context. |
| **Key metrics** | Domain-specific metrics (reading level, math score, subject, class count) adjacent to photo. |
| **Relationship counts** | Compact footer: classes, scores, status. |
| **CTAs** | Bottom row: View Profile (primary), View Scores / View Classes (secondary). |

**Why this is distinct:** Photo-forward horizontal layout. No other category has photos. Even in grayscale, a People card is instantly recognizable.

### Category 2: Container Cards (Class, School, District)

**Design intent:** Containers hold other objects. The card should feel like a dashboard — stat blocks showing what's inside are the dominant visual.

```
┌─────────────────────────────────────────┐
│  ┌────┐  3rd Grade Math — Period 2      │
│  │ CL │  Ms. Rodriguez · Lincoln Elem.  │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │    28    │ │     5    │ │    12    ││
│  │ Students │ │ Teachers │ │ Scores   ││
│  └──────────┘ └──────────┘ └──────────┘│
│─────────────────────────────────────────│
│  Springfield USD > Lincoln Elem.        │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ View     │  │ Students │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

| Element | Rule |
|---|---|
| **Compact header** | Small rounded-square avatar + name inline. Not photo-forward — the stats below are the star. |
| **Stat blocks grid** | The dominant visual. 2–4 blocks showing nested object counts (students, teachers, assessments, scores). Each block: large number + label. |
| **Hierarchy breadcrumb** | Unique to containers: shows parent chain (District > School > Class). Provides structural context. |
| **CTAs** | View (primary), View Students / View Classes (secondary). |

**Why this is distinct:** The stat blocks grid is unique to containers. No other category uses large number blocks as the dominant content zone. The hierarchy breadcrumb is also unique.

### Category 3: Activity Cards (Assessment, Assignment)

**Design intent:** Activities are time-bound and status-driven. The card should feel urgent — progress and status are the dominant visuals.

```
┌─────────────────────────────────────────┐
│  ┌────┐  Star Reading — Fall 2026  ⬤ In │
│  │ AS │  Star · ELA · Grades 3–5   Prog │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ████████████░░░░░░  18/25 completed    │
│─────────────────────────────────────────│
│  Window: Mar 1 – Mar 15                │
│  Avg: 520 SS · 3 skills targeted        │
│                                         │
│  ┌────────────┐  ┌──────────────┐       │
│  │ View Results│  │ Schedule     │       │
│  └────────────┘  └──────────────┘       │
└─────────────────────────────────────────┘
```

| Element | Rule |
|---|---|
| **Status badge** | Top-right corner. Color-coded: Scheduled (gray), In Progress (blue), Completed (green), Overdue (red). Unique to activities. |
| **Progress bar** | The dominant visual. Full-width bar with fraction label (`18/25 completed`). Unique to activities. |
| **Time context** | Due date or assessment window prominently displayed. Activities are time-bound — this separates them from static knowledge objects. |
| **Type badge** | Star / Benchmark / Formative (Assessment) or Practice / Homework / Project (Assignment). Differentiates the two activity types. |
| **CTAs** | Role-sensitive: Teacher sees Schedule/View Results; Student sees Start/Continue. |

**Why this is distinct:** Progress bar + status badge. No other category shows completion progress as a dominant visual. The time-bound urgency is also unique.

### Category 4: Knowledge Cards (Skill, Resource, Standard)

**Design intent:** Knowledge objects are reference material. They emphasize taxonomy, classification, and cross-references. Each subtype has a unique element:

#### Skill — Domain path

```
┌─────────────────────────────────────────┐
│  Math > Number & Operations > 3.NBT     │
│─────────────────────────────────────────│
│  ┌────┐  Number & Operations            │
│  │ SK │  Grades 3–5 · 3.NBT             │
│  └────┘                                 │
│                                         │
│  4 sub-skills · Measured by 3 assess.   │
│  Linked to 8 resources                  │
│                                         │
│  ┌────────────┐                         │
│  │ View Skill │                         │
│  └────────────┘                         │
└─────────────────────────────────────────┘
```

#### Resource — Cover image

```
┌─────────────────────────────────────────┐
│  ┌───────────┐                          │
│  │           │  Charlotte's Web         │
│  │  📚 COVER │  Book · ELA · 680L       │
│  │   IMAGE   │                          │
│  │           │  Fiction · Grades 3–4    │
│  └───────────┘                          │
│                                         │
│  Targets 3 skills · Used in 2 assigns.  │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ Assign   │  │ Preview  │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

#### Standard — Code badge

```
┌─────────────────────────────────────────┐
│  ┌───────────────┐                      │
│  │   3.NBT.A.2   │  ← monospace badge   │
│  └───────────────┘                      │
│                                         │
│  Number & Operations · Grade 3          │
│                                         │
│  Fluently add and subtract within 1000  │
│                                         │
│  Measured by 4 assessments · 6 skills   │
│                                         │
│  ┌─────────────┐                        │
│  │ View Detail │                        │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

| Element | Rule |
|---|---|
| **Taxonomy path** (Skill) | Breadcrumb-style domain path at the top: `Math > Number & Operations > 3.NBT`. |
| **Cover image** (Resource) | Thumbnail or cover art on the left side. Unique to Resources — the only object with a media preview. |
| **Code badge** (Standard) | Large monospace badge with the standard code (`3.NBT.A.2`). The code IS the identity — displayed prominently. |
| **Cross-reference counts** | All knowledge cards show linked objects: "Measured by X assessments · Y resources." |
| **Classification badges** | Domain, grade, content type. More taxonomic metadata than other categories. |

**Why this is distinct:** Taxonomy-forward layout with cross-references. Resource has a cover image (unique across all 13 objects). Standard has a monospace code badge. The encyclopedic, reference-material feel is unlike People, Container, or Activity cards.

### Category 5: Data / AI Cards (Score, Proficiency Prediction, Insight)

**Design intent:** System-generated data. These are not user-created objects — they feel like data readouts. Numbers and recommendations are the dominant visuals, plus a "system-generated" indicator.

#### Score — Big number

```
┌─────────────────────────────────────────┐
│  ◈ System Generated                    │
│─────────────────────────────────────────│
│                                         │
│       520 SS        ↑ +32              │
│       ──────────────────                │
│  Star Reading · Mar 10, 2026            │
│  Jane Doe · At/Above Benchmark  🟢     │
│                                         │
│  ┌─────────────┐                        │
│  │ View Detail │                        │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

#### Proficiency Prediction — Percentage

```
┌─────────────────────────────────────────┐
│  ◈ AI Prediction                        │
│─────────────────────────────────────────│
│                                         │
│       78%           Confidence: High    │
│       Proficient    ──────────────────  │
│                                         │
│  Jane Doe × 3.NBT.A.2                  │
│  Group: Approaching                     │
│  Based on: Star + Practice              │
│                                         │
└─────────────────────────────────────────┘
```

#### Insight — Recommendation text

```
┌─────────────────────────────────────────┐
│  ◈ AI Insight                           │
│─────────────────────────────────────────│
│  Classwide Learning Need                │
│  3.NBT.A.2 · 3rd Grade Math            │
│─────────────────────────────────────────│
│                                         │
│  12 of 28 students are in the           │
│  Approaching group for this standard.   │
│  Consider targeted small-group          │
│  instruction.                           │
│                                         │
│  ┌────────────┐  ┌─────┐  ┌─────┐      │
│  │ View Detail│  │ 👍  │  │ 👎  │      │
│  └────────────┘  └─────┘  └─────┘      │
└─────────────────────────────────────────┘
```

| Element | Rule |
|---|---|
| **System-generated badge** | Top of card: `◈ System Generated`, `◈ AI Prediction`, or `◈ AI Insight`. Unique to Data/AI. No other category has this. |
| **Big number** (Score) | Large, bold numeric value as the dominant visual. Trend arrow (↑↓→) shows change. Benchmark indicator (colored dot). |
| **Percentage** (Prof. Prediction) | Large percentage as dominant visual. Confidence indicator. Instructional group badge. |
| **Recommendation body** (Insight) | The recommendation text IS the content. Multi-line body text with an actionable suggestion. Feedback buttons (👍/👎) unique to Insight. |
| **No user-created CTAs** | Score and Prof. Prediction are read-only. Insight has View Detail + Feedback. No Create/Edit/Delete. |

**Why this is distinct:** The `◈ System Generated` badge immediately flags these as non-user-created. Big numbers, percentages, and recommendation text are structurally unlike any other category. No progress bars, no photos, no stat block grids.

---

## Component Patterns

These are the reusable "recipe" components that product teams adopt. Each recipe is built from whatever ingredients (buttons, inputs, layout) the product already uses — the recipe defines the **structure and content**, not the pixel-level styling.

### 1. Object Card

The atomic unit of the design system. Every object has a card recipe based on its **structural category** (see above). The category determines the card's layout template, dominant visual, and content zones.

| Element | Source | Rule |
|---|---|---|
| **Layout template** | Structural Category | People, Container, Activity, Knowledge, or Data/AI — determines the card's anatomy. |
| **Identity color** | Identity System | Used for avatar background, CTA fills, and accent borders. Reinforces (but does not solely determine) the object type. |
| **Avatar** | Identity System | Circle or rounded square, identity color background, abbreviation or photo. |
| **Name** | Object Guide: Attribute #1 | Bold, always visible. |
| **Category-specific elements** | Structural Category | Photo (People), stat blocks (Container), progress bar (Activity), taxonomy (Knowledge), system badge (Data/AI). |
| **Primary CTA** | CTA Prioritization | The #1 CTA. Solid fill button in identity color. |
| **Secondary CTA** | CTA Prioritization | The #2 CTA. Outline button. |
| **Tertiary CTAs** | CTA Prioritization | Icon buttons or overflow menu `···`. |
| **Stats footer** | NOM | Nested object counts, status badge. |

### 2. Object Card Variants (Shapeshifter System)

Every object can appear in up to 6 contexts. The design system defines what to show in each:

| Variant | Context | Space | What's Shown | What's Hidden |
|---|---|---|---|---|
| **Tooltip** | Hovering a link/mention | ~200px, 2–3 lines | Color stripe, name (bold), 1-line definition | Avatar, CTAs, attributes, stats |
| **Compact** | Table rows, sidebar lists | Single line, ~400px | Color dot, avatar (small), name (bold), key attribute | Description, CTAs, stats |
| **Standard** | Grid cards, search results | ~300px card | Full card anatomy (see above) | Tertiary/Quaternary CTAs |
| **Expanded** | Detail page header | Full width | Large avatar, full definition, all P/S CTAs, lifecycle badge | Nothing hidden — this is the complete view |
| **Embedded** | Nested inside another object's page | ~250px mini-card | Color dot, avatar (small), name, relationship label | Description, CTAs, most attributes |
| **Data Row** | Reports, score tables | Full width, single row | Name, key metrics, status | Avatar (optional), description |

**The Shapeshifter Rule:** Across ALL variants, the three invariants (identity color, avatar, name treatment) **never change**. If a visual difference isn't documented in the Shapeshifter Matrix, it's a bug.

### 3. Object Card Recipes — Per Object

Each object's card uses its **structural category template** and emphasizes different attributes and CTAs based on its Object Guide.

#### Student Card — People Template

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  Jane Doe                     │
│  │      │  Grade 3  ·  Lincoln Elem.    │
│  │ PHOTO│                               │
│  │      │  Reading: 3.2 GE              │
│  └──────┘  Math: 320 SS                 │
│                                         │
│  3 classes  ·  12 scores  ·  Active     │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ Profile  │  │ Scores   │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** People — photo-forward layout, no color stripe
- **Unique signature:** Photo avatar (or initials), grade level subtitle, reading/math levels as key metrics
- **Primary CTA:** View Profile
- **Contextual CTAs:** View Scores (class context), Assign (assignment context), Select (picker context)
- **Shapeshifter note:** Student is the #1 shapeshifter in Renaissance. Appears in 9+ contexts. Photo + blue color are the anchors.

#### Teacher Card — People Template

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌──────┐  Ms. Rodriguez               │
│  │      │  Math  ·  Lincoln Elementary  │
│  │ PHOTO│                               │
│  │      │  4 classes · 87 students      │
│  └──────┘                               │
│                                         │
│  Active                                 │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ Profile  │  │ Classes  │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** People — photo-forward layout, no color stripe
- **Unique signature:** Photo avatar (or initials), subject + school subtitle, class/student counts
- **Primary CTA:** View Profile
- **Contextual CTAs:** View Classes, Message

#### Class Card — Container Template

```
┌─────────────────────────────────────────┐
│  ┌────┐  3rd Grade Math — Period 2      │
│  │ CL │  Ms. Rodriguez · Lincoln Elem.  │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │    28    │ │     5    │ │   Active ││
│  │ Students │ │ Assess.  │ │  Status  ││
│  └──────────┘ └──────────┘ └──────────┘│
│─────────────────────────────────────────│
│  Springfield USD > Lincoln Elem.        │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ View     │  │ Students │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** Container — stat blocks grid, hierarchy breadcrumb
- **Unique signature:** Rounded square avatar, teacher + school subtitle, stat blocks for nested counts
- **Hub object:** Class is the most-connected object — the stat blocks should always show nested counts
- **Primary CTA:** View Class
- **Contextual CTAs:** View Students, View Assessments, Assign

#### School Card — Container Template

```
┌─────────────────────────────────────────┐
│  ┌────┐  Lincoln Elementary             │
│  │ SC │  Springfield USD  ·  K–5        │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │    24    │ │   412    │ │    15    ││
│  │ Teachers │ │ Students │ │ Classes  ││
│  └──────────┘ └──────────┘ └──────────┘│
│─────────────────────────────────────────│
│  Springfield USD                        │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ View     │  │ Classes  │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** Container — stat blocks grid, hierarchy breadcrumb
- **Unique signature:** Slate-colored square avatar, district + grade band subtitle, nested counts as stat blocks
- **Primary CTA:** View School
- **Contextual CTAs:** View Classes, View Reports

#### District Card — Container Template

```
┌─────────────────────────────────────────┐
│  ┌────┐  Springfield USD                │
│  │ DI │  Illinois  ·  Region 3          │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │    12    │ │  3,200   │ │   280    ││
│  │ Schools  │ │ Students │ │ Teachers ││
│  └──────────┘ └──────────┘ └──────────┘│
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ View     │  │ Schools  │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** Container — stat blocks grid (top-level, no parent breadcrumb)
- **Unique signature:** Dark slate, the most authoritative card. Region + state subtitle. Largest aggregate numbers.
- **Primary CTA:** View District
- **Contextual CTAs:** View Schools, View Reports

#### Assessment Card — Activity Template

```
┌─────────────────────────────────────────┐
│  ┌────┐  Star Reading — Fall 2026  ⬤ In │
│  │ AS │  Star · ELA · Grades 3–5   Prog │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ████████████░░░░░░  18/25 completed    │
│─────────────────────────────────────────│
│  Window: Mar 1 – Mar 15                │
│  Avg: 520 SS                            │
│                                         │
│  ┌────────────┐  ┌──────────────┐       │
│  │ View Results│  │ Schedule     │       │
│  └────────────┘  └──────────────┘       │
└─────────────────────────────────────────┘
```

- **Category:** Activity — progress bar + status badge as dominant visuals
- **Unique signature:** Status badge (Scheduled/In Progress/Completed). Progress bar. Assessment window dates. Score summary.
- **Primary CTA (Teacher):** View Results (post-completion), Schedule (pre-admin)
- **Primary CTA (Student):** Start Assessment
- **Shapeshifter note:** Assessment is context-sensitive — Teacher sees scheduling/results CTAs, Student sees start/review CTAs
- **No longer confused with Assignment** — both share the Activity template (progress bar + status badge), but Assessment shows a date *window* while Assignment shows a *due date*. Type badges (Star/Benchmark vs. Practice/Homework) provide additional differentiation.

#### Assignment Card — Activity Template

```
┌─────────────────────────────────────────┐
│  ┌────┐  Fractions Practice Set 3  ⬤ In │
│  │ AG │  Practice · Math           Prog │
│  └────┘                                 │
│─────────────────────────────────────────│
│  ██████████░░░░░░░░  14/28 completed    │
│─────────────────────────────────────────│
│  Due: Mar 15  ·  3 skills targeted      │
│                                         │
│  ┌────────────┐  ┌──────────────┐       │
│  │ View       │  │ Edit         │       │
│  └────────────┘  └──────────────┘       │
└─────────────────────────────────────────┘
```

- **Category:** Activity — progress bar + status badge as dominant visuals
- **Unique signature:** Due date (single date, not a window). Targeted skills count. Practice/Homework type badge.
- **Primary CTA (Teacher):** View (results), Edit
- **Primary CTA (Student):** Start, Continue
- **Differentiated from Assessment** by: single due date vs. assessment window, different type badges, different CTA verbs

#### Skill Card — Knowledge Template

```
┌─────────────────────────────────────────┐
│  Math > Number & Operations > 3.NBT     │
│─────────────────────────────────────────│
│  ┌────┐  Number & Operations            │
│  │ SK │  Grades 3–5 · 3.NBT             │
│  └────┘                                 │
│                                         │
│  4 sub-skills · Measured by 3 assess.   │
│  Linked to 8 resources                  │
│                                         │
│  ┌────────────┐                         │
│  │ View Skill │                         │
│  └────────────┘                         │
└─────────────────────────────────────────┘
```

- **Category:** Knowledge — taxonomy path at top, cross-reference counts
- **Unique signature:** Domain path breadcrumb at top (`Math > Number & Operations > 3.NBT`). Standard code in subtitle. Cross-reference counts (assessments, resources).
- **Primary CTA:** View Skill Detail
- **Contextual CTAs:** View Standards Alignment, View Student Proficiency

#### Resource Card — Knowledge Template

```
┌─────────────────────────────────────────┐
│  ┌───────────┐                          │
│  │           │  Charlotte's Web         │
│  │  📚 COVER │  Book · ELA · 680L       │
│  │   IMAGE   │                          │
│  │           │  Fiction · Grades 3–4    │
│  └───────────┘                          │
│                                         │
│  Targets 3 skills · Used in 2 assigns.  │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ Assign   │  │ Preview  │             │
│  └──────────┘  └──────────┘             │
└─────────────────────────────────────────┘
```

- **Category:** Knowledge — cover image as dominant visual (unique across all 13 objects), cross-reference counts
- **Unique signature:** Cover image/thumbnail on the left side. Content type (Book/Article/Video/Interactive) in subtitle. Lexile/reading level. Only object with a media preview.
- **Primary CTA (Teacher):** Assign
- **Primary CTA (Student):** Read / Watch / Start
- **Contextual CTAs:** Preview, Bookmark

#### Score Card — Data/AI Template

```
┌─────────────────────────────────────────┐
│  ◈ System Generated                    │
│─────────────────────────────────────────│
│                                         │
│       520 SS        ↑ +32              │
│       ──────────────────                │
│  Star Reading · Mar 10, 2026            │
│  Jane Doe · At/Above Benchmark  🟢     │
│                                         │
│  ┌─────────────┐                        │
│  │ View Detail │                        │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

- **Category:** Data/AI — big number as dominant visual, system-generated badge
- **Unique signature:** `◈ System Generated` badge. Large bold score value as the visual anchor. Trend arrow (↑ +32). Benchmark indicator (🟢 at/above, 🟡 approaching, 🔴 below).
- **System-generated:** No user-facing Create/Edit CTAs. View-only.
- **Primary CTA:** View Details (score breakdown by skill)

#### Standard Card — Knowledge Template

```
┌─────────────────────────────────────────┐
│  ┌───────────────┐                      │
│  │   3.NBT.A.2   │  ← monospace badge   │
│  └───────────────┘                      │
│                                         │
│  Number & Operations · Grade 3          │
│                                         │
│  Fluently add and subtract within 1000  │
│                                         │
│  Measured by 4 assessments · 6 skills   │
│                                         │
│  ┌─────────────┐                        │
│  │ View Detail │                        │
│  └─────────────┘                        │
└─────────────────────────────────────────┘
```

- **Category:** Knowledge — monospace code badge as dominant visual, cross-reference counts
- **Unique signature:** Large monospace badge with standard code (`3.NBT.A.2`). The code IS the identity. Domain + grade subtitle. Full standard text as description.
- **Primary CTA:** View Standard Detail
- **Contextual CTAs:** View Student Proficiency

#### Proficiency Prediction Card — Data/AI Template

```
┌─────────────────────────────────────────┐
│  ◈ AI Prediction                        │
│─────────────────────────────────────────│
│                                         │
│       78%           Confidence: High    │
│       Proficient    ──────────────────  │
│                                         │
│  Jane Doe × 3.NBT.A.2                  │
│  Group: Approaching                     │
│  Based on: Star + Practice              │
│                                         │
└─────────────────────────────────────────┘
```

- **Category:** Data/AI — percentage as dominant visual, AI prediction badge
- **Unique signature:** `◈ AI Prediction` badge. Large percentage value. Confidence indicator. Instructional group badge. Student × Standard intersection.
- **System-generated by SPS.** Read-only.
- **Displayed in:** Skills Grid cells, Student proficiency views

#### Insight Card — Data/AI Template

```
┌─────────────────────────────────────────┐
│  ◈ AI Insight                           │
│─────────────────────────────────────────│
│  Classwide Learning Need                │
│  3.NBT.A.2 · 3rd Grade Math            │
│─────────────────────────────────────────│
│                                         │
│  12 of 28 students are in the           │
│  Approaching group for this standard.   │
│  Consider targeted small-group          │
│  instruction.                           │
│                                         │
│  ┌────────────┐  ┌─────┐  ┌─────┐      │
│  │ View Detail│  │ 👍  │  │ 👎  │      │
│  └────────────┘  └─────┘  └─────┘      │
└─────────────────────────────────────────┘
```

- **Category:** Data/AI — recommendation body text as dominant content, AI insight badge, feedback buttons
- **Unique signature:** `◈ AI Insight` badge. Insight type as "name". Referenced standard + class. Multi-line actionable recommendation body. Feedback buttons (👍/👎) unique to Insight.
- **Primary CTA:** View Detail (drill into referenced students)
- **Secondary CTA:** Feedback (👍 Helpful / 👎 Not Helpful)
- **V1 scope:** 3–5 insights per session

---

### 4. Detail Page Template

Every object gets a detail page that follows a consistent structure:

```
┌────────────────────────────────────────────────┐
│  ← Back to [List]                               │
├────────────────────────────────────────────────┤
│                                                 │
│  ┌────┐  Object Name                           │
│  │ AV │  Type · Classification · Status badge   │
│  └────┘                                         │
│                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───┐    │
│  │ Primary │ │ Second. │ │ Second. │ │···│    │
│  └─────────┘ └─────────┘ └─────────┘ └───┘    │
│                                                 │
├────────────────────────────────────────────────┤
│  Overview | Attributes | Relationships | ...    │
├────────────────────────────────────────────────┤
│                                                 │
│  SECTION: Key Attributes (force-ranked)         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│  │ Attr 1  │ │ Attr 2  │ │ Attr 3  │          │
│  └─────────┘ └─────────┘ └─────────┘          │
│                                                 │
│  SECTION: Nested Objects (from NOM)             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Related  │ │ Related  │ │ Related  │       │
│  │ (embed.) │ │ (embed.) │ │ (embed.) │       │
│  └──────────┘ └──────────┘ └──────────┘       │
│                                                 │
│  SECTION: Lifecycle                             │
│  [State A] → [State B] → [State C]             │
│                                                 │
│  SECTION: Business Rules                        │
│  SECTION: Relationship Specs (MCSFD)            │
│                                                 │
│  ─── Admin Bar (if Admin role) ───              │
│  [Archive] [Transfer] [Delete]                  │
│                                                 │
└────────────────────────────────────────────────┘
```

**Rules:**
- The header uses the **Expanded** variant from the Shapeshifter Matrix
- Nested objects use the **Embedded** variant — small cards or list items
- Tab bar sections are force-ranked: most important attributes/relationships first
- The Admin bar appears at the bottom, only for authorized roles

### 5. Three Page Types

From OOUX theory, every page in the system is one of three types:

| Page Type | Purpose | Object Cards Shown | Example |
|---|---|---|---|
| **Landing Page** | Mixed object cards from different types | Multiple object types | Dashboard showing Classes, recent Assessments, Insights |
| **List Page** | Cards of the same object type | Single object type, filterable | All Students in a Class, all Assessments in a School |
| **Detail Page** | Single instance with all attributes, CTAs, relationships | One object (expanded) + nested objects (embedded) | Student profile, Assessment detail |

**Rule:** On a Landing Page, the identity color system is critical. When cards of different object types sit side by side, the color stripe + avatar shape must make the type immediately obvious.

---

## CTA Placement Framework

### The P/S/T/Q Hierarchy

Every CTA in the system has a priority rank from the CTA Prioritization step. That rank maps directly to visual treatment:

| Priority | Visual Treatment | Placement | Behavior |
|---|---|---|---|
| **Primary (P)** | Solid fill button, identity color, white text | Card: Zone P (bottom-left). Detail: Header. | Always visible. |
| **Secondary (S)** | Outline button, identity color border | Card: Zone S (adjacent to Primary). Detail: Header. | Always visible, less prominent. |
| **Tertiary (T)** | Ghost/text button or icon-only | Card: Top-right corner or hover. Detail: Overflow `···` menu. | Visible on interaction. |
| **Quaternary (Q)** | Danger styling (red outline) | Card: Never. Detail: Admin bar at page bottom. | Only visible to Admin roles. |

### Placement Zones

```
Card:                           Detail Page:
┌──────────────────────┐        ┌──────────────────────────┐
│                 [T] │        │ ← Back                    │
│  [Avatar] Name       │        │                          │
│  Description         │        │  [Avatar]  Name          │
│                      │        │  [P]  [S]  [S]  [···T]  │
│  [P]    [S]          │        │                          │
│  Stats footer        │        │  ─── Admin ───           │
└──────────────────────┘        │  [Q: Delete]             │
                                └──────────────────────────┘
```

### Role-Sensitive CTAs

Some objects show different CTAs to different user roles. The card must adapt:

| Object | Teacher Sees | Student Sees | Admin Sees |
|---|---|---|---|
| **Assessment** | Schedule, View Results | Start Assessment, View Score | Schedule, View Results, Export, Cancel |
| **Assignment** | View, Edit, Assign | Start, Continue, View Score | View, Edit, Delete |
| **Resource** | Assign, Preview | Read/Watch, Bookmark | Assign, Edit, Delete |
| **Student** | View Profile, View Scores | (own profile) | View, Transfer, Deactivate |

---

## Cross-Product Shapeshifter Rules

This is the most critical section. Renaissance objects appear across multiple products — and the Shapeshifter problem is biggest here.

### The Cross-Product Invariant Rule

When the same object appears across different Renaissance products, these elements **must stay the same**:

| Invariant | What It Means | Example |
|---|---|---|
| **Identity Color** | Same hex value across all products | Student is `#2563EB` in Star, Freckle, myON, Nearpod |
| **Avatar Shape** | Same circle/square across all products | Student is always a circle photo/initials avatar |
| **Name Treatment** | Same bold weight, same relative position | Student name is always bold, always left of or below the avatar |
| **Abbreviation** | Same 2-letter code | Student is always "ST" (when no photo is available) |

### What CAN Change Across Products

| Element | Can It Change? | Rule |
|---|---|---|
| Which attributes appear on the card | ✅ Yes | Different products emphasize different attributes (Star shows test scores; Freckle shows practice stats; myON shows reading history). Use the product-specific Attribute Prioritization. |
| Which CTAs appear | ✅ Yes | Star Assessment card shows "View Results"; Freckle Assignment card shows "Start Practice". CTAs are object × product × role specific. |
| Card layout/proportions | ✅ Yes, within reason | Products can use their own card dimensions, padding, and grid. But the anatomy order (stripe → avatar → name → attributes → CTAs → footer) should be consistent. |
| Detail page structure | ✅ Yes, within reason | Products can arrange tabs and sections differently. But the header (expanded variant) should follow the template. |
| Color palette for non-identity elements | ✅ Yes | Products use their own background colors, text colors, and UI chrome. Only the identity color must be shared. |

### Student: The Ultimate Shapeshifter

Student is the object that appears in the most contexts across the most products. Here's what intentional shapeshifting looks like:

| Product | Context | Key Attributes Shown | Key CTAs | Card Shape |
|---|---|---|---|---|
| **Star** | Assessment results | Name, Grade, Scaled Score, Benchmark Band, Growth | View Scores, View Skills | Score-focused card |
| **Freckle** | Adaptive practice | Name, Grade, Adaptive Level, Practice Stats, Streak | Start Practice, View Progress | Practice-focused card |
| **myON** | Digital library | Name, Grade, Lexile, Books Read, Reading Time | Read, View Bookshelf | Reading-focused card |
| **Nearpod** | Live lesson | Name, Participation Status, Response Count | View Responses | Participation-focused card |
| **Lalilo** | Literacy | Name, Grade, Literacy Level, Module Progress | Continue Lesson | Progress-focused card |
| **Admin (School)** | Roster | Name, Grade, ID, Status, Enrollment Date | View, Transfer, Deactivate | Data row |

**What stays constant:** Blue `#2563EB`, circle avatar (photo or initials "ST"), bold name, grade level.

**What changes (intentionally):** Which attributes are shown (each product emphasizes its domain-specific metrics), which CTAs are available (product-specific actions), card proportions (some products use compact rows, others use medium cards).

---

## Relationship Display Patterns

Objects don't exist in isolation. The NOM defines which objects nest inside which. The design system provides patterns for rendering these relationships:

### Nested Object Display

When an object's detail page shows its nested objects:

| Pattern | When to Use | Example |
|---|---|---|
| **Embedded card grid** | 3–12 nested objects | Student detail page showing their Classes as embedded cards |
| **Compact list** | 13+ nested objects | Class detail page showing its 28 Students as compact rows |
| **Count badge** | When the relationship exists but space is limited | Assessment card footer: "25 students · 25 scores" |
| **Inline link** | Single related object | Score card: "Star Reading — Fall 2026" links to Assessment |

### Relationship Connectors (for NOM Visualizations)

| Connector | Meaning | Visual |
|---|---|---|
| **Solid line + arrow** | Nesting: "A contains B" | Solid 2px line with arrowhead |
| **Dashed line** | Association: "A relates to B" | Dashed 1px line |
| **Cardinality badge** | How many | `1:1`, `1:N`, `N:N` at line endpoints |
| **Red dot** | Dependency: removing A breaks B | Red 6px circle on the connector |

### Breadcrumb Trail

Objects that have hierarchical relationships should show their lineage:

```
District > School > Class > Student
```

This helps users understand where they are in the object hierarchy and navigate upward.

---

## Anti-Pattern Detection Checklist

Product teams should audit their UIs against these checks. The Design System section of the resource site should provide this as an interactive tool.

### Masked Objects Audit

For every list/grid view in your product:

- [ ] Can the user tell what kind of object each card represents without reading the text?
- [ ] Do different object types in the same view have different colors, avatar shapes, or card structures?
- [ ] If you removed the text, could a user still distinguish a Student card from an Assessment card?

### Isolated Objects Audit

For every object card in your product:

- [ ] Does the card link to at least one related object?
- [ ] Does the object's detail page show its nested objects?
- [ ] Can users navigate from this object to related objects without using global search?

### Broken Objects Audit

For every object the user can see:

- [ ] Can the user act on it directly (at least one CTA on the card)?
- [ ] Is the Primary CTA visible without hovering or expanding a menu?
- [ ] Do role-appropriate CTAs appear without navigating to a different page?

### Shapeshifter Audit

For every object that appears in multiple contexts:

- [ ] Is the identity color the same across all contexts?
- [ ] Is the avatar the same shape and content?
- [ ] Is the name treatment (bold, position) consistent?
- [ ] Are all visual differences between contexts documented and justified?
- [ ] If the object appears in multiple products, do the cross-product invariants hold?

---

## How This Appears on the Resource Site

The Design System is a top-level section of the OOUX Resource Site. Here's what it contains:

### Section Structure

| Page | Contents |
|---|---|
| **Design System Overview** | Philosophy, two-layer model, anti-pattern framework, adoption guide |
| **Identity System** | Browsable grid of all 13 objects with their colors, avatars, and abbreviations. Interactive: click an object to see its full identity spec. |
| **Component Library** | Live examples of every component pattern: Object Card, Detail Page Header, CTA Buttons, Badges, Relationship Connectors, Breadcrumbs |
| **Object Cards Gallery** | All 13 object cards rendered side by side in all variants (Tooltip, Compact, Standard, Expanded, Embedded). Interactive: toggle between variants. |
| **Shapeshifter Explorer** | Interactive tool: select an object, then see how it looks across all Renaissance products. Highlights what changes and what stays constant. |
| **CTA Placement Guide** | Visual reference showing P/S/T/Q zones on cards and detail pages. Interactive: toggle between user roles to see how CTAs change. |
| **Anti-Pattern Checker** | Interactive checklist tool. Teams enter their product name, select an object, and walk through the audit checklist. Results can be exported. |
| **Token Export** | Download design tokens in multiple formats: CSS custom properties, JSON, Figma Variables, Tailwind config |

### Adoption Guide

The resource site should include a "How to Adopt" page targeting product teams:

1. **Start with Identity Colors** — Add the 13 object identity colors to your product's color palette. This is the lowest-effort, highest-impact change.
2. **Add Color Stripes to Cards** — Any card that represents a core object gets a 3–4px top border in the identity color.
3. **Standardize Avatars** — Use the circle/square shape and abbreviation system.
4. **Prioritize CTAs** — Run CTA Prioritization (ORCA step 7) for your product-specific CTAs and map them to P/S/T/Q.
5. **Document Your Shapeshifters** — Run the Shapeshifter Matrix (ORCA step 12) for your product. Cross-reference against the cross-product invariants.
6. **Build Object Cards** — Create card components for each object in your product using the recipes above.
7. **Audit with the Checklist** — Use the Anti-Pattern Checker to verify your implementation.

### Token Export Formats

| Format | Use Case | Contents |
|---|---|---|
| **CSS Custom Properties** | Web products | `--object-student: #2563EB;` for all 13 objects + semantic tokens |
| **JSON** | APIs, build tools, Cursor project configs | `{ "student": { "color": "#2563EB", "avatar": "circle", "abbr": "ST" } }` |
| **Figma Variables** | Design tool integration | Color and typography variables importable into Figma |
| **Tailwind Config** | Tailwind CSS products | `colors: { student: '#2563EB', teacher: '#4F46E5', ... }` |

---

## Relationship to Product Design Systems

Per Brad Frost's recommendation: this OOUX design system **does not replace** a product's existing component library. Instead:

- **The Ingredients layer** remains product-owned. Star, Freckle, myON, etc. each keep their own buttons, inputs, spacing, and typography.
- **The Recipes layer** is what this design system adds. It defines how objects are represented — which attributes, which CTAs, which visual anchors — using whatever ingredients the product already has.
- **Teams adopt the recipes** alongside their existing system, not instead of it.

The result: each product looks and feels like itself (its own ingredients), while core objects remain recognizable across the Renaissance ecosystem (shared recipes).

---

## Data Sources

The design system draws from Object Guides already published in Confluence:

| Object | Confluence Page ID | Has Card Spec? | Has Shapeshifter Matrix? |
|---|---|---|---|
| Student | `19015172104` | ✅ | ✅ |
| Teacher | `19012125424` | ✅ | ✅ |
| Class | `19012387599` | ✅ | ✅ |
| School | `19011339132` | ✅ | ✅ |
| District | `19014418692` | ✅ | ✅ |
| Assessment | `19011699765` | ✅ | ✅ |
| Assignment | `19011699785` | ✅ | ✅ |
| Skill | `19014418726` | ✅ | ✅ |
| Resource | `19012027218` | ✅ | ✅ |
| Score | `19011830623` | ✅ | ✅ |
| Standard | `19037716680` | ✅ | ✅ |
| Proficiency Prediction | `19039027283` | ✅ | ✅ |
| Insight | `19039092809` | ✅ | ✅ |

The Cross-Object Artifacts page (`19011470073`) contains the compiled NOM and CTA Matrix across all 13 objects.

---

## Open Questions

1. **Color validation** — The proposed identity colors need accessibility testing and review against Renaissance's brand palette. Do any products have existing object colors that conflict?
2. **Existing design system integration** — Which products already have component libraries? How do we ensure the recipes layer composes cleanly with their ingredients?
3. **Figma integration** — Should the design system include a Figma component library with object card templates and variants?
4. **Versioning** — When Object Guides in Confluence are updated (new attributes, new CTAs), how does the design system stay in sync?
5. **Adoption metrics** — How do we measure whether product teams are actually adopting the design system? Audit scores? Coverage reports?
6. **Domain objects** — This document covers the 13 core objects. How do product-specific domain objects (e.g., Nearpod's Activity, Lesson, Playlist) get added to the design system? Is there a contribution process?
