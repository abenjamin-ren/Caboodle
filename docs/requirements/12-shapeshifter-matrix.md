# Object Views — OOUX Resource Site

> **Status: Process artifact** — Variant matrix for consistent display of Caboodle's six meta-objects. Object view data is stored in object JSON files as `objectViews` entries (`ListView` with `shapes.list` / `shapes.grid` / `shapes.table`, or `DetailView`). The View Inspector at `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]` provides per-context attribute/CTA editing.
>
> **ORCA:** This artifact is produced by **Step 12: Shapeshifter Matrix Builder** (same ancient truth: Attributes; anti-pattern: **Shapeshifters**).

**Project:** OOUX Resource Site (Internal Renaissance)

**Ancient Truth:** Objects that are the same should look the same, unless they have a stellar reason not to.
**Anti-Pattern Fought:** Shapeshifters — the same object looking arbitrarily different across contexts for no semantic reason.

This matrix defines every intentional variant for each object — documenting what changes, what stays constant, and WHY. If a difference isn't documented here, it's a bug.

> **Scope Note:** This document covers contextual variation for the **6 resource site objects**. For **cross-product object view rules** covering the 13 core Renaissance objects — including cross-product invariant rules (e.g., "Student in Star vs. Student in Freckle must share identity color, avatar shape, and name treatment") — see [`design-system.md`](design-system.md), Section 4: Cross-Product Object View Rules. The invariant rules and variant definitions below establish the pattern that the product design system extends to all 13 objects.

> **Data model:** In Caboodle JSON, each context is an `ObjectView`: **`viewType: 'list'`** exposes optional `ShapeSpec` entries under `shapes` for **`list`**, **`grid`**, and **`table`** (see `ValidShape` in `data/schema.ts`). **`viewType: 'detail'`** carries `visibleAttributes` and `availableCTAs` for full-record views. The presentation columns below (Tooltip, Compact, Standard, Expanded, Embedded) are **design-language variants**; map them to list/detail views and list shapes when promoting to `objectViews`.

---

## Object view invariants (consistency rule)

Across ALL variants of ANY object, these three elements **never change**:

| Invariant | What It Is | Why |
|---|---|---|
| **Identity Color** | The object's signature color (stripe + avatar background) | Instant type recognition |
| **Avatar** | Shape (circle/square) + content (abbreviation or numeral) | Persistent visual anchor |
| **Name Treatment** | Bold, consistent font weight, predictable position | Users scan for names first |

Everything else may adapt — but only for a documented reason.

---

## Variant Definitions

Every object can appear in up to 5 contexts:

| Variant | Context | Space Available | Purpose |
|---|---|---|---|
| **Tooltip** | Hovering over a link or inline mention | ~200px wide, 2–3 lines | Quick preview without leaving the page |
| **Compact** | Table rows, sidebar lists, embedded links | Single line, ~400px | Scannable in dense lists |
| **Standard** | Grid cards, search results, list cards | ~300px card | Primary browsing format — enough to decide whether to click |
| **Expanded** | Detail page header | Full width | Complete identity + all Primary/Secondary CTAs |
| **Embedded** | Nested inside another object's detail page | ~250px mini-card or list item | Show relationship without overwhelming the parent page |

---

## Object views matrix

### Skill

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar (SK)** | ❌ | ✅ small | ✅ medium | ✅ large | ✅ small |
| **Name** | ✅ bold | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold |
| Skill ID | ✅ badge | ✅ inline | ✅ badge | ✅ badge | ✅ inline |
| Round | ❌ | ✅ badge | ✅ badge | ✅ badge + label | ❌ |
| Type | ❌ | ❌ | ✅ badge | ✅ badge | ❌ |
| Description | ✅ 1 line | ❌ | ✅ 2 lines | ✅ full | ❌ |
| Primary CTA | ❌ | ❌ | ✅ Run button | ✅ Run + Copy + Download | ❌ |
| Prerequisites | ❌ | ❌ | ❌ | ✅ full list | ❌ |

**Why it changes:** Tooltip strips to essentials (name + ID + 1-line description). Compact is a scannable row in a sidebar. Standard is the full browsing card. Expanded adds all CTAs and metadata. Embedded shows just enough to identify the skill in a parent context.

---

### Object Definition

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar (2-letter)** | ❌ | ✅ small circle | ✅ medium circle | ✅ large circle | ✅ small circle |
| **Name** | ✅ bold | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold |
| Definition | ✅ 1 line | ❌ | ✅ 2 lines | ✅ full | ❌ |
| Category | ❌ | ✅ badge | ✅ badge | ✅ badge + label | ✅ badge |
| Products | ❌ | ❌ | ✅ tags | ✅ full tags | ❌ |
| Stats footer | ❌ | ❌ | ✅ counts | ✅ full counts | ❌ |
| CTAs | ❌ | ❌ | ❌ | ✅ Compare + Export + Bookmark | ❌ |
| Attributes list | ❌ | ❌ | ❌ | ✅ full ranked list | ❌ |

**Why it changes:** The colored circle avatar with 2-letter abbreviation is the strongest visual anchor. It persists from Compact through Expanded. Tooltip is for quick "what is this?" context. Embedded (e.g., in a Blog Post sidebar) shows avatar + name + category badge.

---

### Template

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar (TM)** | ❌ | ✅ small | ✅ medium | ✅ large | ✅ small |
| **Name** | ✅ bold | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold |
| Type | ❌ | ✅ badge | ✅ badge | ✅ badge + label | ✅ badge |
| Associated Skill | ✅ link | ❌ | ✅ link | ✅ link + skill card | ❌ |
| Description | ✅ 1 line | ❌ | ✅ 2 lines | ✅ full | ❌ |
| Format icons | ❌ | ❌ | ✅ MD/PDF/Doc | ✅ MD/PDF/Doc + sizes | ❌ |
| Primary CTA | ❌ | ❌ | ✅ Download button | ✅ Download + Copy | ✅ Download icon |
| Preview | ❌ | ❌ | ❌ | ✅ rendered preview | ❌ |

**Why it changes:** The Download button persists from Standard through Expanded because it's the core action. Format icons (MD/PDF/Doc) are a unique visual signature — they appear on Standard cards and detail pages. Embedded shows a minimal card with a download icon button.

---

### Blog Post

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar** | ❌ (no avatar) | ❌ | ❌ | ❌ | ❌ |
| **Title** | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold, xlarge | ✅ bold |
| Category | ✅ badge | ✅ badge | ✅ overline badge | ✅ overline badge | ✅ badge |
| Author | ❌ | ✅ name | ✅ name + date | ✅ name + role + avatar + date | ❌ |
| Date | ❌ | ✅ relative | ✅ formatted | ✅ formatted | ✅ relative |
| Excerpt | ✅ 1 line | ❌ | ✅ 2–3 lines | ❌ (full body instead) | ❌ |
| Featured Image | ❌ | ❌ | Optional hero | ✅ hero image | ❌ |
| CTAs | ❌ | ❌ | ❌ (card is clickable) | ✅ Share + Comment | ❌ |
| Tags | ❌ | ❌ | ❌ | ✅ full tag list | ❌ |
| Reading time | ❌ | ❌ | Optional badge | ✅ shown | ❌ |

**Why it changes:** Blog Post is unique — it has no avatar (article-style layout). The **Category badge** serves as its type indicator instead. The article layout (overline category, large title, byline) is distinct from the tool/reference cards. Title is always bold, category always badged.

---

### Glossary Term

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar (GT)** | ❌ | ❌ | ✅ circle | ✅ large circle | ❌ |
| **Term** | ✅ bold | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold |
| Abbreviation | ✅ badge | ✅ badge | ✅ badge | ✅ badge | ✅ badge |
| Definition | ✅ full (this IS the tooltip) | ✅ truncated (1 line) | ✅ full | ✅ full | ✅ truncated |
| Category | ❌ | ❌ | ✅ badge | ✅ badge | ❌ |
| Related Terms | ❌ | ❌ | ✅ linked tags | ✅ linked tags + descriptions | ❌ |
| Example | ❌ | ❌ | ❌ | ✅ shown | ❌ |
| Source | ❌ | ❌ | ❌ | ✅ shown | ❌ |

**Why it changes:** Glossary Term is unique — the **Tooltip IS the Standard card**. When you hover an OOUX term anywhere on the site, the tooltip shows the full definition. This is the same content as the Standard card. The Tooltip variant is the most-seen variant of this object. Compact is used in the "Related Terms" tag list on other glossary entries.

---

### ORCA Step

| Element | Tooltip | Compact | Standard | Expanded | Embedded |
|---|---|---|---|---|---|
| **Identity Color** | ✅ stripe | ✅ dot | ✅ stripe | ✅ stripe | ✅ dot |
| **Avatar (numeral)** | ✅ small numeral | ✅ numeral | ✅ large numeral | ✅ xlarge numeral | ✅ numeral |
| **Name** | ✅ bold | ✅ bold | ✅ bold | ✅ bold, large | ✅ bold |
| Round | ❌ | ✅ badge | ✅ badge | ✅ badge + label | ✅ badge |
| Pillar | ❌ | ❌ | ✅ icon | ✅ icon + label | ❌ |
| Description | ✅ 1 line | ❌ | ✅ 2 lines | ✅ full | ❌ |
| Primary CTA | ❌ | ❌ | ✅ Run Skill button | ✅ Run Skill + Download | ❌ |
| Navigation | ❌ | ❌ | ❌ | ✅ ← Prev / Next → | ❌ |
| Inputs/Outputs | ❌ | ❌ | ❌ | ✅ full lists | ❌ |

**Why it changes:** The **step numeral** is the most persistent visual anchor — it appears in ALL variants including tooltips. In the ORCA Grid (3×4), the Standard card IS the grid cell. The numeral replaces the 2-letter abbreviation, making ORCA Steps instantly distinguishable from all other objects.

---

## Cross-Object Consistency Audit

| Check | Skill | Obj Def | Template | Blog Post | Glossary | ORCA Step | Consistent? |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Identity color in ALL variants | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Name is bold in ALL variants | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Avatar in Standard + Expanded | ✅ | ✅ | ✅ | ❌* | ✅ | ✅ | ✅* |
| Primary CTA on Standard card | ✅ | ✅† | ✅ | ✅† | ✅‡ | ✅ | ✅ |
| Tooltip has name + 1-line summary | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

*Blog Post intentionally has no avatar — it uses article-style layout with Category overline as its type indicator. This is documented and intentional.

†Object Definition and Blog Post cards use "click the whole card" as the implicit Primary CTA (View/Read).

‡Glossary Term's Primary (Search) is a list-level UI, not a card-level CTA. The card itself functions as the definition display.

---

## Summary: What Changes vs. What Stays

| | Always Present | Standard + Expanded Only | Expanded Only |
|---|---|---|---|
| **Skill** | Color, SK avatar, Name, Skill ID | Round/Type badges, Description, Run button | Prerequisites, full instructions, all CTAs |
| **Object Definition** | Color, Circle avatar, Name | Category, Products, Definition, Stats | Attributes list, CTAs, Relationships, Business Rules |
| **Template** | Color, TM avatar, Name | Type badge, Formats, Description, Download | Preview, Filled Example, Skill card |
| **Blog Post** | Color, Title, Category badge | Author, Date, Excerpt | Body, Tags, Comments, Sidebars |
| **Glossary Term** | Color, Term, Abbreviation, Definition* | Category, Related Terms | Example, Source |
| **ORCA Step** | Color, Step numeral, Name | Round/Pillar, Description, Run Skill | Inputs, Outputs, Navigation, Examples |

*Glossary Term's Definition is "always present" because the tooltip — the most common variant — IS the definition.

---

## Anti-Pattern Check: No Unintentional Shapeshifters

Every visual difference between variants is documented in this matrix with a reason. If an element appears differently than specified here during implementation, it's a **Shapeshifter bug** and should be corrected.

| Question | Answer |
|---|---|
| Does any object lose its identity color in any variant? | No ✅ |
| Does any object's name treatment change arbitrarily? | No ✅ |
| Are all visual changes between variants documented and justified? | Yes ✅ |
| Could a user confuse one object type for another in any variant? | No ✅ (each has unique structural signature) |

---

## Representation Round Complete! 🎉

All four anti-patterns have been addressed:

| Step | Ancient Truth | Anti-Pattern | Status |
|---|---|---|---|
| **09 Object Cards** | Things different → look different | Masked Objects | ✅ 6 visually distinct cards |
| **10 Nav Flow** | Navigate through relationships | Isolated Objects | ✅ No dead ends, all objects linked |
| **11 CTA Placement** | Act through direct manipulation | Broken Objects | ✅ CTAs on every card and detail page |
| **12 Shapeshifter Matrix Builder** | Same → look the same | Shapeshifters | ✅ All variants documented with invariants |
