# Object Map — OOUX Resource Site

> **Status: Process artifact** — Attribute map for Caboodle's six meta-objects. The attribute structure informed `data/schema.ts` for the Object Definition type. Other meta-object attributes remain as design reference for future content types.

**Project:** OOUX Resource Site (Internal Renaissance)

---

## How to Read This Map

Each card represents a validated object. Cards show:
- **Attributes** — Properties that describe the object and differentiate instances
- **Nested Objects** — Other objects that appear on this object's detail page (from the NOM)
- **CTAs** — Actions users can perform on this object (from the CTA Matrix)

This is a Discovery-round artifact — attributes are listed broadly, not yet ranked. Attribute Prioritization (step 8) will force-rank them.

---

## Object Map Cards

### Skill

```
┌────────────────────────────────────┐
│             SKILL                  │
├────────────────────────────────────┤
│ • Name                             │
│ • Skill ID (01, s6, etc.)          │
│ • Type (Core / Supporting)         │
│ • Round (Disc / Prior / Repr)      │
│ • Step Number (1–12, s1–s10)       │
│ • Pillar (Obj / Rel / CTA / Attr)  │
│ • Description (one-liner)          │
│ • Full Instructions (body)         │
│ • Prerequisites (skill links)      │
│ • What It Produces (artifact)      │
│ • Example Prompts                  │
│ • Anti-Pattern Fought              │
│ • Ancient Truth                    │
│ • File Path (.cursor/rules/...)    │
├────────────────────────────────────┤
│ Nested: Template, Blog Post,       │
│   Glossary Term, ORCA Step         │
├────────────────────────────────────┤
│ CTAs: View, Copy Prompt, Run,      │
│   Download, Edit, Create, Delete   │
└────────────────────────────────────┘
```

**14 attributes · 4 nested objects · 9 CTAs**

---

### Object Definition

```
┌────────────────────────────────────┐
│        OBJECT DEFINITION           │
├────────────────────────────────────┤
│ • Name                             │
│ • Definition (one-liner)           │
│ • Category (Core / Domain)         │
│ • SIP Validation (S/I/P)           │
│ • Attributes List                  │
│ • CTAs List                        │
│ • Nested Objects (from NOM)        │
│ • Relationships (MCSFD)            │
│ • Lifecycle States                 │
│ • Business Rules                   │
│ • Product Associations             │
│ • Avatar Color                     │
│ • Avatar Abbreviation (2-letter)   │
│ • Card Preview (visual)            │
│ • Created Date                     │
│ • Last Updated                     │
├────────────────────────────────────┤
│ Nested: Blog Post, Glossary Term   │
├────────────────────────────────────┤
│ CTAs: View, Compare, Export,       │
│   Bookmark, Create, Edit, Delete   │
└────────────────────────────────────┘
```

**16 attributes · 2 nested objects · 8 CTAs**

---

### Template

```
┌────────────────────────────────────┐
│            TEMPLATE                │
├────────────────────────────────────┤
│ • Name                             │
│ • Template ID                      │
│ • Type (Worksheet / Matrix /       │
│         Guide / Spec / Map)        │
│ • Associated Skill (link)          │
│ • Associated ORCA Step (link)      │
│ • Description                      │
│ • Instructions / How to Use        │
│ • Download Formats (MD, PDF, etc.) │
│ • Preview Content (rendered)       │
│ • Filled-In Example                │
│ • File Path (docs/templates/...)   │
│ • Created Date                     │
│ • Last Updated                     │
├────────────────────────────────────┤
│ Nested: Skill, Blog Post,          │
│   Glossary Term, ORCA Step         │
├────────────────────────────────────┤
│ CTAs: View, Download, Copy,        │
│   View Example, Edit, Create,      │
│   Delete                           │
└────────────────────────────────────┘
```

**13 attributes · 4 nested objects · 8 CTAs**

---

### Blog Post

```
┌────────────────────────────────────┐
│           BLOG POST                │
├────────────────────────────────────┤
│ • Title                            │
│ • Slug (URL path)                  │
│ • Author Name                      │
│ • Author Role                      │
│ • Author Avatar                    │
│ • Publish Date                     │
│ • Last Updated                     │
│ • Category (Case Study / Article / │
│   Tutorial / Community Spotlight)  │
│ • Tags                             │
│ • Body (Markdown)                  │
│ • Featured Image                   │
│ • Reading Time (calculated)        │
│ • Featured (boolean)               │
│ • Status (Draft / Published /      │
│          Archived)                 │
│ • Excerpt (summary)                │
│ • Comment Count                    │
├────────────────────────────────────┤
│ Nested: Skill, Object Definition,  │
│   Template, Glossary Term,         │
│   ORCA Step                        │
├────────────────────────────────────┤
│ CTAs: Read, Share, Comment, Draft, │
│   Edit, Publish, Unpublish,        │
│   Feature, Tag, Archive, Delete,   │
│   Link Skill, Link Object,         │
│   Embed Template                   │
└────────────────────────────────────┘
```

**17 attributes · 5 nested objects · 14 CTAs**

---

### Glossary Term

```
┌────────────────────────────────────┐
│         GLOSSARY TERM              │
├────────────────────────────────────┤
│ • Term                             │
│ • Definition                       │
│ • Category (Core Concept /         │
│   ORCA Step / Artifact Type /      │
│   Anti-Pattern / Framework)        │
│ • Related Terms (cross-links)      │
│ • Source (origin reference)        │
│ • Example (usage in context)       │
│ • Abbreviation (NOM, SIP, etc.)    │
│ • Created Date                     │
│ • Last Updated                     │
├────────────────────────────────────┤
│ Nested: Skill, Blog Post,          │
│   ORCA Step                        │
├────────────────────────────────────┤
│ CTAs: View, Search, Suggest,       │
│   Create, Edit, Cross-link, Delete │
└────────────────────────────────────┘
```

**9 attributes · 3 nested objects · 7 CTAs**

---

### ORCA Step

```
┌────────────────────────────────────┐
│           ORCA STEP                │
├────────────────────────────────────┤
│ • Step Number (1–12)               │
│ • Name                             │
│ • Round (Discovery /               │
│   Prioritization / Representation) │
│ • Pillar (Obj / Rel / CTA / Attr)  │
│ • Description                      │
│ • Inputs (prerequisites)           │
│ • Outputs (what it produces)       │
│ • Associated Skill (link)          │
│ • Associated Template (link)       │
│ • Anti-Pattern Fought              │
│ • Ancient Truth                    │
│ • Worked Example                   │
│ • Previous Step (link)             │
│ • Next Step (link)                 │
├────────────────────────────────────┤
│ Nested: Skill, Template,           │
│   Blog Post, Glossary Term         │
├────────────────────────────────────┤
│ CTAs: View, Navigate, Run Skill,   │
│   Download Template, View Examples, │
│   Edit, Create, Delete             │
└────────────────────────────────────┘
```

**13 attributes · 4 nested objects · 8 CTAs**

---

## Attribute Summary

| Object | Attributes | Nested Objects | CTAs | Total Surface |
|--------|:---:|:---:|:---:|:---:|
| **Skill** | 14 | 4 | 9 | 27 |
| **Object Definition** | 16 | 2 | 8 | 26 |
| **Template** | 13 | 4 | 8 | 25 |
| **Blog Post** | 17 | 5 | 14 | 36 |
| **Glossary Term** | 9 | 3 | 7 | 19 |
| **ORCA Step** | 13 | 4 | 8 | 25 |
| **Totals** | **82** | **22** | **54** | **158** |

---

## Attribute-as-Object Check

| Attribute | On Object | SIP Check | Verdict |
|-----------|-----------|-----------|---------|
| **Author** (name, role, avatar) | Blog Post | Has sub-structure (3 fields) and many instances. But for an internal SSO site, user profiles come from the directory — no standalone CRUD. | **Keep as attribute** — pull from SSO |
| **Comment** | Blog Post | Has author, date, content — classic object structure. Multiple instances per post. | **Possible future object** — for MVP, treat as a feature on Blog Post. Flag for Phase 2. |
| **Tag** | Blog Post | Just a string label, no sub-structure. | **Keep as attribute** — simple string array |

---

## Key Observations

1. **Blog Post is the most attribute-rich (17)** — continues its pattern as the system's super-hub with the largest total surface area (36).

2. **Object Definition has the most descriptive attributes (16)** — appropriately dense as the core reference material of the site.

3. **Skill and ORCA Step share many attributes** (round, pillar, anti-pattern, ancient truth) — they're tightly paired. Key differentiator: Skill has *instructions and prompts*; ORCA Step has *inputs, outputs, and sequencing*.

4. **Glossary Term is the leanest (9 attributes)** — simple by design. Its power comes from being cross-cutting (nested in 5 parents), not from being attribute-heavy.

5. **Comment is a candidate for promotion to object in Phase 2** — if the site adds richer discussion features, Comment should graduate from an attribute to its own SIP-validated object.

---

## Discovery Round Summary

| Step | Artifact | Key Numbers |
|------|----------|-------------|
| **01 Object Discovery** | Validated Object List | 6 objects (SIP-tested) |
| **02 NOM Builder** | Nested-Object Matrix | 6×6 matrix, 26 nesting relationships, 0 isolated objects |
| **03 CTA Matrix** | CTA Inventory | 54 CTAs across 3 roles, 12 cross-object CTAs |
| **04 Object Map** | Attribute Map | 82 attributes, 22 nested-object slots, 54 CTAs |

---

## Next Steps

→ **Prioritization Round** begins:
- **Step 5: Object Guides** — Build a comprehensive, prioritized guide for each of the 6 objects
- **Step 6: MCSFD Specs** — Specify each relationship with Mechanics, Cardinality, Sorts, Filters, Dependency
- **Step 7: CTA Prioritization** — Force-rank all 54 CTAs into P/S/T/Q tiers
- **Step 8: Attribute Prioritization** — Force-rank attributes to determine card vs. detail page placement
