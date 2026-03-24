# Object Card Designer — OOUX Resource Site

> **Status: Process artifact** — Object card design specs for the Object Library. The library now uses system-based routing with an icon-based identity system (three tiers) instead of the per-object color stripes described here. Category-based tabs were replaced by product system groupings.

**Project:** OOUX Resource Site (Internal Renaissance)

**Ancient Truth:** Things that are different should look different.
**Anti-Pattern Fought:** Masked Objects — different objects disguised as the same thing.

Each object gets a visually distinct card design using the prioritized attributes (step 8), identity colors, and unique structural elements so users can instantly tell what kind of thing they're looking at.

> **Scope Note:** This document defines card designs for the **6 resource site objects** (Skill, Object Definition, Template, Blog Post, Glossary Term, ORCA Step). For the cross-product design system covering the **13 core Renaissance objects** (Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight), see [`design-system.md`](design-system.md). The resource site's Object Directory and Design System section will render the 13-object cards using the patterns defined there.

---

## Identity System

### Icon-Based Object Type Differentiation

Rather than unique colors and 2-letter abbreviations, object cards use **type-specific icons** to communicate what kind of object the user is looking at. This applies to cards in the Object Library and on detail pages.

| Object Type | Icon File | Visual | Usage |
|---|---|---|---|
| **Core Object** | `object_icon.svg` | 3D cube outline (40×40px) | The 13 core Renaissance objects: Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight |
| **Object Variation** | `object-variation_icon.svg` | Dashed hexagon with link icon (40×40px) | Product-specific specializations of a core object, e.g. Student (Lesson Participant) in Nearpod |
| **Domain Object** | `domain-object_icon.svg` | Detailed 3D cube with facets (40×40px) | Domain-specific objects that are not variations of a core object |

### What Differentiates Cards

With icons handling object *type*, the following elements differentiate individual objects:

| Signal | How It Differentiates |
|---|---|
| **Object name** | Primary identifier — always bold, prominent |
| **Type badge** | "(Core)", "(Domain)", or variant qualifier in parentheses after the name |
| **Product tags** | "Used in: All products" or specific product list — shows where the object appears |
| **Category** | People, Organizations, Activities, Curriculum, Insights — used for tab filtering on the library page |
| **Stats footer** | Attribute, CTA, and relationship counts — unique per object |
| **Definition** | One-sentence description providing context |

---

## Card Designs

### Skill Card

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (#059669 stripe)
│
│  ┌────┐  Object Discovery          01
│  │ SK │  ─────────────────────────────
│  └────┘  Discovery  ·  Core
│
│  Guides noun foraging and SIP
│  validation to produce a validated
│  object list.
│
│  ┌──────────────────┐  ┌──────────┐
│  │ ▶ Run in Cursor  │  │ 📋 Copy  │
│  └──────────────────┘  └──────────┘
│
└─────────────────────────────────────────┘
```

**Unique signature:** Skill ID badge (top-right), Round-colored badge, "Run in Cursor" primary button with play icon. No other card type has a "Run" action.

### Object Definition Card (Core)

```
┌─────────────────────────────────────────┐
│
│  ┌────┐
│  │ 🔷 │  Student (Core)
│  └────┘  ─────────────────────────────
│          Used in: All products
│
│  A learner enrolled in an educational
│  institution who takes assessments
│  and builds skills.
│
│  14 attrs  ·  8 CTAs  ·  5 rels
│
└─────────────────────────────────────────┘
```

*(🔷 = `object_icon.svg` — 3D cube, 40×40px)*

**Unique signature:** Object type icon, "(Core)" or "(Domain)" type badge after name, product association line, stats footer (attr/CTA/rel counts), one-sentence definition.

### Object Definition Card (Variation — compact, detail page only)

Variation cards appear **only on the parent object's detail page**, not in the Object Library grid. See `object-guide-page.md` § 1.5 Variations for full spec.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌────┐  Student (Lesson Participant)        ❯   │
│  │ 🔗 │  Used in: Nearpod                       │
│  └────┘                                          │
│                                                  │
└──────────────────────────────────────────────────┘
```

*(🔗 = `object-variation_icon.svg` — dashed hexagon with link icon, 40×40px)*

**Unique signature:** Compact horizontal card, variation icon, parent name + variant qualifier, product line, right chevron for navigation. No stats footer, no definition text — this is a navigation affordance, not a reference card.

### Template Card

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (#D97706 stripe)
│
│  ┌────┐  NOM Template
│  │ TM │  ─────────────────────────────
│  └────┘  Matrix  ·  Used by: 02 NOM
│
│  Maps parent-nested relationships
│  between objects as a square grid.
│
│  ┌─────────┐   📄 MD  📄 PDF  📄 Doc
│  │ ⬇ Download│
│  └─────────┘
│
└─────────────────────────────────────────┘
```

**Unique signature:** Format icons (MD/PDF/Doc), "Download" primary button with arrow icon, "Used by" skill link. No other card type has download format icons.

### Blog Post Card

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (#7C3AED stripe)
│
│  Case Study
│
│  How We Used ORCA to Redesign
│  Assignment Management
│  ─────────────────────────────────────
│  By Aaron Benjamin  ·  Mar 12, 2026
│
│  A deep dive into how the Assignment
│  team applied all 12 ORCA steps to
│  redesign teacher workflows...
│
│  ┌────────┐  ┌─────────┐
│  │  Read  │  │  Share  │
│  └────────┘  └─────────┘
│
└─────────────────────────────────────────┘
```

**Unique signature:** Article-style layout — Category overline, large title, author + date byline, excerpt paragraph. No avatar circle. Resembles a news/blog card, visually distinct from the tool-oriented cards.

### Glossary Term Card

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (#0D9488 stripe)
│
│  ┌────┐
│  │ GT │  SIP Test                  SIP
│  └────┘  ─────────────────────────────
│          Core Concept
│
│  Structure, Instances, Purpose — the
│  three-part validation test for
│  whether something qualifies as an
│  object in OOUX.
│
│  Related: Object, NOM, Noun Foraging
│
└─────────────────────────────────────────┘
```

**Unique signature:** Full definition as primary content (not truncated), abbreviation badge (top-right), related terms as linked tags at bottom. The card IS the definition — functions as a mini-dictionary entry.

### ORCA Step Card

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (#EA580C stripe)
│
│  ┌────┐
│  │ 02 │  NOM Builder
│  └────┘  ─────────────────────────────
│  Discovery  ·  Relationships
│
│  Maps parent-nested relationships
│  between objects to build intuitive
│  navigation.
│
│  ┌──────────────────┐  ┌──────────┐
│  │ ▶ Run Skill      │  │ ⬇ Template│
│  └──────────────────┘  └──────────┘
│
└─────────────────────────────────────────┘
```

**Unique signature:** Large step number in avatar (numeral, not letters), Round + Pillar badges (dual classification), "Run Skill" + "Download Template" dual action buttons. The dual badges and numeral avatar are unique to ORCA Steps.

---

## Visual Differentiation Matrix

How to tell cards apart at a glance:

| Signal | Skill | Obj Def | Template | Blog Post | Glossary | ORCA Step |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Primary Button** | Run | (implicit View) | Download | Read | (implicit Search) | Run Skill |
| **Unique Element** | Skill ID badge | Stats footer | Format icons | Author byline | Full definition | Step numeral |
| **Layout Style** | Tool card | Reference card | Resource card | Article card | Dictionary entry | Process card |

**Anti-Pattern Check:** ✅ No two cards share the same layout style or unique element. A user scanning a mixed list (e.g., search results) can identify the object type from layout structure alone, without relying on color.

---

## The Shapeshifter Rule

Across ALL card variants (compact, standard, expanded, embedded), these three elements **never change** for any object:

1. **Type icon** — `object_icon.svg` (Core), `object-variation_icon.svg` (Variation), or `domain-object_icon.svg` (Domain) — always present
2. **Name + type badge** — Bold name followed by type qualifier in parentheses, e.g. "Student (Core)"
3. **Name Treatment** — Bold, same font size relative to context

Everything else may adapt to the variant's space constraints, but the object must always be recognizable as itself.

---

## Object Library Page Structure

The Object Library (`/objects`) displays Object Definition cards in a filterable grid. Key requirements:

### Category Filter Tabs

The secondary tabs filter the card grid by semantic category:

| Tab | Objects Shown |
|---|---|
| **All Objects** (default) | All core + domain objects |
| **People** | Student, Teacher |
| **Organizations** | Class, School, District |
| **Activities** | Assessment, Assignment |
| **Curriculum** | Skill, Resource, Standard |
| **Insights** | Score, Proficiency Prediction, Insight |

Tabs must be wired to filter cards — clicking a tab shows only the objects in that category. Each object's card has a `data-category` attribute for filtering.

### Card Metadata Tags

Every Object Definition card in the library must display:

| Tag | Example | Purpose |
|---|---|---|
| **Type** | "(Core)" or "(Domain)" after the object name | Distinguishes core objects from domain-specific objects |
| **Product** | "Used in: All products" or "Used in: Nearpod" | Shows which Renaissance products include this object |

### Where Variations Appear

**Variations do NOT appear in the Object Library grid.** They are product-specific specializations of a core object and live on the parent object's detail page (see `object-guide-page.md` § 1.5 Variations).

- **Library page:** Shows only core objects and standalone domain objects
- **Detail page:** Shows variation cards in a horizontal row between the identity header and tabs
- **Variation pages:** Each variation has its own detail page at `/objects/{parent-slug}-{variant-slug}`

### Object Count

The library grid currently contains:
- 13 core objects (Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight)
- Domain objects as they are documented (e.g., standalone domain objects not covered by a core object)

---

## Next Steps

→ **Step 10: Nav Flow Designer** — Design navigation paths showing how users move between these objects using the NOM relationships.
