# Nested-Object Matrix (NOM) — OOUX Resource Site

> **Status: Process artifact** — Nested-Object Matrix for Caboodle's six meta-objects. Object nesting is partially reflected in Object Guide tabs (relationships tab shows MCSFD specs and nested objects). The full NOM visualization described here is not implemented.

**Project:** OOUX Resource Site (Internal Renaissance)

---

## How to Read This Matrix

Read each row as: "When I'm looking at [row object]'s detail page, do I see [column object] nested inside it?"

- ✅ = Yes, the column object appears nested inside the row object
- Empty = Relationship not surfaced in this context

---

## NOM (6×6)

| Parent ↓ / Nested → | Skill | Obj Def | Template | Blog Post | Glossary Term | ORCA Step |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Skill** | — | | ✅ | ✅ | ✅ | ✅ |
| **Object Definition** | | — | | ✅ | ✅ | |
| **Template** | ✅ | | — | ✅ | ✅ | ✅ |
| **Blog Post** | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| **Glossary Term** | ✅ | | | ✅ | — | ✅ |
| **ORCA Step** | ✅ | | ✅ | ✅ | ✅ | — |

---

## Row-by-Row Explanation

### Skill Row

When looking at a **Skill** (e.g., 02 NOM Builder):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Template** ✅ | "Artifact Template" link/preview | The template this skill produces (e.g., NOM Builder → `nom.md`) |
| **Blog Post** ✅ | "Case Studies & Articles" list | Posts that used or reference this skill |
| **Glossary Term** ✅ | Inline tooltips + "Key Terms" section | OOUX terms referenced in the skill description |
| **ORCA Step** ✅ | "Process Step" link + prerequisite/next step links | The step this skill belongs to, plus navigation to adjacent steps |

### Object Definition Row

When looking at an **Object Definition** (e.g., Student):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Blog Post** ✅ | "Related Articles" list | Case studies and articles that feature this object |
| **Glossary Term** ✅ | Inline tooltips + "Related Terms" section | OOUX terms used in the definition, attributes, and rules |

### Template Row

When looking at a **Template** (e.g., CTA Matrix template):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Skill** ✅ | "Used By" link | The skill that produces this template |
| **Blog Post** ✅ | "Examples in Practice" list | Articles/case studies that show this template filled in |
| **Glossary Term** ✅ | Inline tooltips | Terms used in the template fields and instructions |
| **ORCA Step** ✅ | "Process Step" link | The step this template belongs to |

### Blog Post Row

When looking at a **Blog Post** (e.g., a case study):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Skill** ✅ | "Skills Used" sidebar section | Skills referenced or demonstrated in the article |
| **Object Definition** ✅ | "Objects Covered" sidebar section | Objects discussed or analyzed in the post |
| **Template** ✅ | "Artifacts" section with previews | Templates used or shown filled-in within the case study |
| **Glossary Term** ✅ | Inline tooltip annotations (site-wide) | All OOUX terms in the post body get tooltip definitions |
| **ORCA Step** ✅ | "ORCA Steps Covered" sidebar section | Process steps referenced in the post |

### Glossary Term Row

When looking at a **Glossary Term** (e.g., SIP Test):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Skill** ✅ | "Used in Skills" link list | Skills that reference or use this term |
| **Blog Post** ✅ | "Articles About This Term" list | Posts that discuss or explain this term |
| **ORCA Step** ✅ | "Relevant Steps" link list | Process steps where this term is key |

### ORCA Step Row

When looking at an **ORCA Step** (e.g., Step 2: NOM Builder):

| Nested Object | How It Appears | Notes |
|---|---|---|
| **Skill** ✅ | "Associated Skill" link/preview | The skill that runs this step |
| **Template** ✅ | "Artifact Template" link/preview | The template produced by this step |
| **Blog Post** ✅ | "Case Studies" list | Case studies that cover this step |
| **Glossary Term** ✅ | Inline tooltips + "Key Terms" section | Terms defined or introduced at this step |

---

## Pattern Analysis

### Hub Objects (richest detail pages)

| Object | Nested Object Count | Notes |
|--------|:---:|-------|
| **Blog Post** | 5 | Nests all other objects — the super-hub. Richest pages with sidebars pulling in skills, objects, templates, terms, and steps. |
| **Skill** | 4 | Rich detail pages linking to templates, posts, terms, and steps. |
| **ORCA Step** | 4 | Similar to Skill — links to its skill, template, posts, and terms. |
| **Template** | 4 | Links back to its skill, step, related posts, and terms. |

### Popular Nested Objects (appear in most parents)

| Object | Appears In (count) | Notes |
|--------|:---:|-------|
| **Glossary Term** | 5 parents | Shows up in nearly every context via tooltips. Most cross-cutting object. |
| **Blog Post** | 5 parents | Related articles appear on almost every detail page. |
| **ORCA Step** | 4 parents | Process context surfaces on skills, templates, terms, and posts. |
| **Skill** | 4 parents | Referenced from templates, posts, terms, and steps. |

### Leaf Objects (simplest detail pages)

| Object | Nested Object Count | Notes |
|--------|:---:|-------|
| **Object Definition** | 2 | Self-contained pages. Nest only blog posts and glossary terms. Rich in their own attributes/CTAs but fewer outgoing relationships. |
| **Glossary Term** | 3 | Relatively simple pages with links to skills, posts, and steps. |

### Isolated Objects

**None** ✅ — Every object has at least 2 incoming and 2 outgoing connections. No dead ends in the navigation.

---

## Key Insights

1. **Blog Post is the super-hub** — the only object that nests all 5 other objects. Case studies and articles are the primary "glue" connecting process content (skills, steps) with domain content (objects, terms). The blog post detail page needs a rich sidebar or "Related Content" panel.

2. **Glossary Term is the most cross-cutting object** — it appears nested in 5 of 6 objects (everything except Object Definition's nesting, though it IS nested there too). This validates the site-wide tooltip pattern: terms should be annotated everywhere, not just on a glossary page.

3. **Object Definition is the most self-contained** — it has the fewest outgoing nesting relationships (2), which makes sense. Object definitions are reference material; users go *to* them, but the pages themselves focus on the object's own attributes, CTAs, and relationships rather than linking out to process content.

4. **Skill ↔ ORCA Step is a tight pair** — each nests the other. They're tightly coupled (1:1 in most cases) but remain distinct objects because they serve different purposes: Skills are *tools you use*, Steps are *phases you're in*.

5. **Template is the bridge between doing and learning** — it nests both process objects (Skill, ORCA Step) and content objects (Blog Post, Glossary Term), acting as the tangible artifact that connects theory to practice.

---

## Next Steps

→ **Step 3: CTA Matrix** — Inventory the actions users can take on each of these 6 objects.
