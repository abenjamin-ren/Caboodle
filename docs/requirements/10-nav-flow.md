# Nav Flow Designer — OOUX Resource Site

> **Status: Partial** — The three page types framework and anti-pattern audit remain valid. The global nav structure and many flows described here do not match the current implementation. The current nav is: Home, Object Library, Resources, Process, Glossary (no Skills, Blog, or Search links). Object Library now uses system-based routing (`/objects/[systemSlug]/[objectSlug]`) instead of flat `/objects/:slug`.

**Project:** OOUX Resource Site (Internal Renaissance)

**Ancient Truth:** Humans navigate most naturally through relationships between objects.
**Anti-Pattern Fought:** Isolated Objects — objects with no visible connections to other objects.

This document defines the navigation architecture — how users move between objects — using the NOM relationships and MCSFD specs as the foundation.

---

## Three Page Types

Every page on the site is one of three types:

| Page Type | What It Shows | Example |
|---|---|---|
| **Landing Page** | Mixed cards from different object types | Homepage, Search Results |
| **List Page** | Cards of the SAME object type | Skill Directory, Object Directory, Blog Index |
| **Detail Page** | A single instance with full attributes + nested objects | Skill: 02 NOM Builder, Object: Student |

---

## Site Navigation Structure

### Global Nav (persistent on all pages)

```
┌──────────────────────────────────────────────────────────────────────┐
│  OOUX Hub    Skills  Objects  Design System  Process  Blog  Glossary  🔍│
└──────────────────────────────────────────────────────────────────────┘
```

| Nav Item | Page Type | Destination | Object Type |
|---|---|---|---|
| **OOUX Hub** | Landing | `/` Homepage | Mixed |
| **Skills** | List | `/resources/skills` Skill Directory | Skill |
| **Objects** | List | `/objects` Object Directory | Object Definition |
| **Design System** | Landing | `/design-system` Design System Hub | Mixed (13 core objects) |
| **Process** | Landing* | `/process` ORCA Process Guide | ORCA Step |
| **Blog** | List | `/blog` Blog Index | Blog Post |
| **Glossary** | List | `/glossary` Glossary | Glossary Term |
| **🔍** | Landing | `/search` Search Results | Mixed |

*Process is technically a Landing page because it shows a 3×4 grid (mixed layout), but each cell links to an ORCA Step detail page.

---

## Navigation Flows

### Flow 1: Practitioner Learning Journey

**Entry:** Homepage → "What is OOUX?"

```
Homepage (Landing)
  ├─→ Process Guide (Landing: ORCA Grid)
  │     └─→ ORCA Step Detail (e.g., Step 1)
  │           ├─→ Skill Detail (01 Object Discovery)
  │           │     ├─→ Template Detail (Object Discovery worksheet)
  │           │     │     └─→ ⬇ Download
  │           │     ├─→ 📋 Copy Prompt
  │           │     └─→ ▶ Run in Cursor
  │           ├─→ Template Detail
  │           │     └─→ ⬇ Download
  │           └─→ Next Step (Step 2) →→→ (continues)
  │
  ├─→ Glossary (List)
  │     └─→ Term Detail (e.g., "SIP Test")
  │           ├─→ Related Skills
  │           ├─→ Related Blog Posts
  │           └─→ Related Terms (cross-links)
  │
  └─→ Blog (List)
        └─→ Blog Post Detail (e.g., case study)
              ├─→ Skills Used (sidebar links)
              ├─→ Objects Covered (sidebar links)
              └─→ ORCA Steps (sidebar links)
```

### Flow 2: Practitioner Doing Work

**Entry:** Skills Directory → Find and run a skill

```
Skills Directory (List)
  ├─→ Filter by Round (Discovery / Prioritization / Representation)
  ├─→ Filter by Type (Core / Supporting)
  │
  └─→ Skill Detail (e.g., 02 NOM Builder)
        ├─→ ▶ Run in Cursor (PRIMARY — leaves site)
        ├─→ 📋 Copy Prompt (SECONDARY)
        ├─→ ⬇ Download Skill File (SECONDARY)
        ├─→ Template: NOM Template
        │     └─→ ⬇ Download Template
        ├─→ Step: Step 2 - NOM Builder
        │     └─→ Adjacent steps (Step 1 ← → Step 3)
        ├─→ Case Studies (Blog Posts)
        │     └─→ Blog Post Detail
        └─→ Key Terms (Glossary Terms)
              └─→ Term Detail (tooltip or click)
```

### Flow 3: Reference Lookup

**Entry:** Object Directory → Find an object definition

```
Object Directory (List)
  ├─→ Filter by Category (Core / Domain)
  ├─→ Filter by Product
  ├─→ Compare (side-by-side tool)
  │
  └─→ Object Definition Detail (e.g., Student)
        ├─→ Attributes (full list)
        ├─→ CTAs (full list)
        ├─→ Nested Objects (from NOM)
        ├─→ Relationships (MCSFD)
        ├─→ Related Articles (Blog Posts)
        │     └─→ Blog Post Detail
        ├─→ Related Terms (Glossary Terms)
        │     └─→ Term Detail
        └─→ Related Objects (via NOM)
              └─→ Other Object Definition Details
```

### Flow 4: Content Discovery

**Entry:** Blog Index → Browse articles

```
Blog Index (List)
  ├─→ Filter by Category (Case Study / Article / Tutorial / Spotlight)
  ├─→ Filter by Tag
  ├─→ Featured Post (hero card)
  │
  └─→ Blog Post Detail
        ├─→ Skills Used → Skill Detail
        ├─→ Objects Covered → Object Definition Detail
        ├─→ Templates Used → Template Detail
        ├─→ ORCA Steps → ORCA Step Detail
        ├─→ Glossary Terms (inline tooltips → Term Detail)
        ├─→ Share (internal link)
        ├─→ Comment
        └─→ Related Posts → Other Blog Post Details
```

### Flow 5: Design System Adoption

**Entry:** Design System Hub → Browse object component patterns

```
Design System Hub (Landing)
  ├─→ Identity System (gallery of 13 objects with colors + avatars)
  │     └─→ Object Definition Detail (e.g., Student) via Object Directory
  │
  ├─→ Component Library (live examples)
  │     ├─→ Object Cards Gallery
  │     │     ├─→ Toggle variant (Tooltip / Compact / Standard / Expanded / Embedded / Data Row)
  │     │     └─→ Object Definition Detail (click any card → full Object Guide)
  │     ├─→ CTA Placement Guide
  │     │     └─→ Toggle user role (Teacher / Student / Admin)
  │     └─→ Relationship Connectors
  │
  ├─→ Shapeshifter Explorer
  │     ├─→ Select object → see appearance across all Renaissance products
  │     └─→ Highlights invariants vs. product-specific adaptations
  │
  ├─→ Anti-Pattern Checker (interactive audit)
  │     └─→ Product teams run checklist against their screens
  │
  ├─→ Token Export
  │     └─→ ⬇ Download (CSS, JSON, Figma Variables, Tailwind)
  │
  └─→ Adoption Guide
        └─→ 7-step onboarding path for product teams
```

### Flow 6: Global Search

**Entry:** Search bar → Mixed results

```
Search (Landing — mixed results)
  ├─→ Result Type: Skill → Skill Detail
  ├─→ Result Type: Object Definition → Object Definition Detail
  ├─→ Result Type: Template → Template Detail
  ├─→ Result Type: Blog Post → Blog Post Detail
  ├─→ Result Type: Glossary Term → Term Detail
  └─→ Result Type: ORCA Step → ORCA Step Detail
```

Search results use the standard card for each object type — the visual differentiation from Step 9 ensures users can instantly identify result types.

---

## Detail Page Layouts

### Skill Detail Page

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Skills                                       │
├─────────────────────────────────────────────────────────┤
│  ┌────┐                                                 │
│  │ SK │  Object Discovery                       01      │
│  └────┘  Guides noun foraging and SIP validation        │
│  Discovery  ·  Core  ·  Objects Pillar                  │
│                                                         │
│  ┌──────────────────┐  ┌──────────┐  ┌──────────┐     │
│  │ ▶ Run in Cursor  │  │ 📋 Copy  │  │ ⬇ Download│     │
│  └──────────────────┘  └──────────┘  └──────────┘     │
├─────────────────────────────────────────────────────────┤
│  Tab: Instructions | Template | Case Studies | Terms    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Full skill instructions...                             │
│                                                         │
│  ┌─ NESTED: Template ────────────────────────────────┐ │
│  │  Object Discovery Worksheet         ⬇ Download    │ │
│  │  Worksheet  ·  MD, PDF              Preview →     │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─ NESTED: ORCA Step ───────────────────────────────┐ │
│  │  ← Step 0: (none)    Step 1: Object Discovery     │ │
│  │                       Step 2: NOM Builder →        │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─ NESTED: Case Studies ────────────────────────────┐ │
│  │  [Blog Post Card] [Blog Post Card] [Blog Post Card]│ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌─ NESTED: Key Terms ───────────────────────────────┐ │
│  │  SIP · NOM · Noun Foraging · Object · Attribute    │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Object Definition Detail Page

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Objects                                      │
├─────────────────────────────────────────────────────────┤
│  ┌────┐                                                 │
│  │ ST │  Student                          Core          │
│  └────┘  A learner enrolled in an educational           │
│          institution who takes assessments...            │
│  Star · AR · Freckle                    Published       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ Compare  │  │ Export   │  │ ★ Bookmark│             │
│  └──────────┘  └──────────┘  └──────────┘             │
├─────────────────────────────────────────────────────────┤
│  Tab: Overview | Attributes | CTAs | Relationships      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Section: Attributes (force-ranked)                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │
│  │ Name    │ │ Grade   │ │ Status  │ │ Reading │     │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘     │
│                                                         │
│  Section: Nested Objects (from NOM)                     │
│  ┌─ Related Articles ────────────────────────────────┐ │
│  │  [Blog Post Card] [Blog Post Card]                 │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Section: Related Terms                                 │
│  │  SIP · Attribute · CTA · Lifecycle                  │ │
│                                                         │
│  Section: Relationships (MCSFD summaries)               │
│  Section: Business Rules                                │
│  Section: Lifecycle                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Navigation Anti-Pattern Audit

| Check | Status | Notes |
|---|:---:|---|
| Every object reachable from global nav (≤2 clicks) | ✅ | All 6 site object types have a top-level nav entry |
| No isolated objects (every object links to ≥1 other) | ✅ | All objects have nested content linking to other objects |
| Bidirectional navigation (can go back from detail) | ✅ | "← Back to [List]" on all detail pages |
| Cross-object navigation via NOM relationships | ✅ | Nested objects on detail pages are clickable cards/links |
| Search finds all object types | ✅ | Global search returns results for all 6 types |
| Glossary terms accessible everywhere (tooltips) | ✅ | Site-wide tooltip system surfaces Glossary Terms inline |
| Design System reachable from global nav | ✅ | Top-level "Design System" nav item leads to hub page |
| Design System links to Object Directory | ✅ | Object cards in the design system gallery link to Object Definition details |
| 13 core objects browsable from Design System | ✅ | Identity System and Cards Gallery cover all 13 Renaissance objects |

**No Isolated Objects** ✅ — Every object detail page includes at least 2 nested objects linking to other parts of the system. The Design System section bridges site objects to product objects. Users always have forward paths.

---

## Next Steps

→ **Step 11: CTA Placement** — Position the P/S/T/Q ranked CTAs on these cards and detail page layouts.
