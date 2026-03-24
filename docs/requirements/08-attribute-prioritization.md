# Attribute Prioritization — OOUX Resource Site

> **Status: Process artifact** — Force-ranked attributes for card and detail views. Attribute rankings are reflected in `shapeshifterMatrix` entries within object JSON files, driving which attributes appear in each context.

**Project:** OOUX Resource Site (Internal Renaissance)

Force-ranking attributes determines what appears on **cards** (compact views in lists/grids) vs. **detail pages only**. The top 5 attributes per object define the card; everything else is detail-page content.

**Rule:** Attributes are ranked by "what would a user need to see to identify and decide whether to click?" — recognition over recall.

---

## Skill

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Name** | ✅ | Primary identifier — "Object Discovery" |
| 2 | **Skill ID** | ✅ | Quick scan code — "01", "s6" |
| 3 | **Round** | ✅ | Tells users where in the process — "Discovery" (color-coded badge) |
| 4 | **Type** | ✅ | Core vs. Supporting — immediate classification |
| 5 | **Description** | ✅ | One-liner preview — "Guides noun foraging and SIP validation" |
| 6 | Pillar | | Detail — shown on card implicitly via avatar/color |
| 7 | What It Produces | | Detail — important but secondary to identity |
| 8 | Prerequisites | | Detail — only relevant when planning a workflow |
| 9 | Example Prompts | | Detail — valuable but too long for a card |
| 10 | Anti-Pattern Fought | | Detail — only applies to Representation skills |
| 11 | Ancient Truth | | Detail — only applies to Representation skills |
| 12 | Full Instructions | | Detail — the full body content |
| 13 | Step Number | | Detail — embedded in Skill ID display |
| 14 | File Path | | Detail — technical reference for downloads |

**Card shows:** Name, ID badge, Round badge, Type badge, Description snippet

---

## Object Definition

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Name** | ✅ | Primary identifier — "Student" |
| 2 | **Avatar (Color + Abbreviation)** | ✅ | Visual identity — the colored circle with "ST" |
| 3 | **Definition** | ✅ | One-liner — what is this object? |
| 4 | **Category** | ✅ | Core vs. Domain badge — immediate classification |
| 5 | **Product Associations** | ✅ | Which Renaissance products — "Star, AR, Freckle" |
| 6 | Lifecycle States | | Detail — not needed for recognition |
| 7 | Attributes List | | Detail — the full inventory lives on the detail page |
| 8 | CTAs List | | Detail — action inventory on detail page |
| 9 | Nested Objects | | Detail — relationships on detail page |
| 10 | Relationships (MCSFD) | | Detail — specs on detail page |
| 11 | Business Rules | | Detail — constraints and validations |
| 12 | SIP Validation | | Detail — validation evidence |
| 13 | Card Preview | | Detail — meta (the card's own preview) |
| 14 | Created Date | | Detail — system metadata |
| 15 | Last Updated | | Detail — system metadata |

**Card shows:** Avatar (color + abbreviation), Name, Definition snippet, Category badge, Product tags

**Card stats footer:** attribute count, CTA count, relationship count

---

## Template

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Name** | ✅ | Primary identifier — "NOM Template" |
| 2 | **Type** | ✅ | Worksheet, Matrix, Guide, Spec, or Map — immediate classification |
| 3 | **Associated Skill** | ✅ | Context — "Used by: 02 NOM Builder" |
| 4 | **Description** | ✅ | One-liner preview |
| 5 | **Download Formats** | ✅ | Quick scan — "MD, PDF, Google Doc" format icons |
| 6 | Associated ORCA Step | | Detail — inferred from Skill |
| 7 | Instructions | | Detail — full how-to content |
| 8 | Preview Content | | Detail — rendered preview |
| 9 | Filled-In Example | | Detail — completed version |
| 10 | Template ID | | Detail — technical identifier |
| 11 | File Path | | Detail — technical reference |
| 12 | Created Date | | Detail — system metadata |
| 13 | Last Updated | | Detail — system metadata |

**Card shows:** Name, Type badge, Associated Skill link, Description snippet, Format icons

---

## Blog Post

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Title** | ✅ | Primary identifier |
| 2 | **Category** | ✅ | Case Study / Article / Tutorial — color-coded badge |
| 3 | **Author Name** | ✅ | Attribution and credibility |
| 4 | **Publish Date** | ✅ | Freshness signal |
| 5 | **Excerpt** | ✅ | Summary preview — entices the click |
| 6 | Featured Image | | Detail — could be on card if design supports it |
| 7 | Reading Time | | Detail (or could be a subtle badge on card) |
| 8 | Tags | | Detail — too many to show on a card |
| 9 | Author Role | | Detail — secondary to Author Name |
| 10 | Author Avatar | | Detail — or small inline avatar on card |
| 11 | Status | | Detail — admin-only info |
| 12 | Featured | | Detail — reflected in card placement, not on card itself |
| 13 | Comment Count | | Detail — or subtle badge |
| 14 | Slug | | System — never shown to users |
| 15 | Body | | Detail — the full content |
| 16 | Last Updated | | Detail — system metadata |

**Card shows:** Title, Category badge, Author Name, Publish Date, Excerpt snippet

**Optional card enhancements:** Featured Image as card hero, Reading Time badge, Author Avatar inline

---

## Glossary Term

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Term** | ✅ | Primary identifier — "SIP Test" |
| 2 | **Definition** | ✅ | The definition IS the content — front and center |
| 3 | **Abbreviation** | ✅ | Quick recognition — "NOM", "SIP" (shown as badge if exists) |
| 4 | **Category** | ✅ | Core Concept, Anti-Pattern, etc. — color-coded badge |
| 5 | **Related Terms** | ✅ | Cross-links shown as linked tags — helps navigation |
| 6 | Example | | Detail — usage in context |
| 7 | Source | | Detail — origin reference |
| 8 | Created Date | | Detail — system metadata |
| 9 | Last Updated | | Detail — system metadata |

**Card shows:** Term, Definition (full or truncated), Abbreviation badge, Category badge, Related Term tags

**Note:** Glossary Term cards are unique — the Definition is long enough to be the primary content, not just a snippet. The card IS the definition in most contexts (e.g., tooltips show Definition as the card).

---

## ORCA Step

| Rank | Attribute | Card? | Rationale |
|:---:|---|:---:|---|
| 1 | **Step Number** | ✅ | Primary identifier — large "02" numeral |
| 2 | **Name** | ✅ | "NOM Builder" — the step name |
| 3 | **Round** | ✅ | Discovery / Prioritization / Representation — color-coded |
| 4 | **Pillar** | ✅ | Objects / Relationships / CTAs / Attributes — icon |
| 5 | **Description** | ✅ | One-liner preview of what this step does |
| 6 | Inputs | | Detail — prerequisites |
| 7 | Outputs | | Detail — what it produces |
| 8 | Associated Skill | | Detail — link to skill |
| 9 | Associated Template | | Detail — link to template |
| 10 | Anti-Pattern Fought | | Detail — only Representation steps |
| 11 | Ancient Truth | | Detail — only Representation steps |
| 12 | Worked Example | | Detail — long-form content |
| 13 | Previous/Next Step | | Detail — sequential navigation |

**Card shows:** Step Number (large), Name, Round badge (color), Pillar icon, Description snippet

**Note:** In the ORCA Grid (3×4), the card IS the grid cell. Step Number + Name is the cell content; Round and Pillar are the row/column headers.

---

## Summary: Card Attribute Recipes

| Object | Card Attributes (Top 5) | Visual Identity Element | Stats Footer |
|---|---|---|---|
| **Skill** | Name, ID, Round, Type, Description | Round-colored badge | — |
| **Object Definition** | Name, Avatar, Definition, Category, Products | Avatar (color + 2-letter) | Attr count · CTA count · Rel count |
| **Template** | Name, Type, Skill, Description, Formats | Type icon | — |
| **Blog Post** | Title, Category, Author, Date, Excerpt | Category-colored badge | Reading time · Comment count |
| **Glossary Term** | Term, Definition, Abbreviation, Category, Related | Category-colored badge | — |
| **ORCA Step** | Number, Name, Round, Pillar, Description | Round-colored + Pillar icon | — |

### Anti-Pattern Check: Masked Objects

Can users distinguish these 6 object cards from each other at a glance?

| Object | Unique Visual Signature | Distinguishable? |
|---|---|:---:|
| **Skill** | Skill ID badge + Round color + "Run in Cursor" button | ✅ |
| **Object Definition** | Colored avatar circle with 2-letter abbreviation | ✅ |
| **Template** | Format icons (MD/PDF/Doc) + "Download" button | ✅ |
| **Blog Post** | Author name + date + excerpt (article-style layout) | ✅ |
| **Glossary Term** | Full definition text as primary content + abbreviation badge | ✅ |
| **ORCA Step** | Large step number + ORCA grid position | ✅ |

**No Masked Objects** ✅ — Each object type has a unique visual signature that prevents confusion, even when they appear together on a landing page or search results.

---

## Next Steps

→ **Prioritization Round complete!** Moving to the **Representation Round**:
- **Step 9: Object Card Designer** — Design the actual cards using these prioritized attributes
- **Step 10: Nav Flow Designer** — Design navigation paths using the NOM and MCSFD specs
- **Step 11: CTA Placement** — Position P/S/T/Q CTAs on cards and detail pages
- **Step 12: Shapeshifter Matrix** — Define intentional variants for each object across contexts
