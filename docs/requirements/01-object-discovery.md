# Object Discovery — OOUX Resource Site

> **Status: Process artifact** — ORCA Discovery output for Caboodle's own meta-objects. Of the six validated objects, **Object Definition** was implemented as the Object Library and Object Guide pages. **Glossary Term** has a placeholder page. **Skill**, **Template**, **Blog Post**, and **ORCA Step** remain planned as content types for future phases.

**Project:** OOUX Resource Site (Internal Renaissance)

---

## Noun Foraging Sources

| Source | Type | Key Findings |
|--------|------|-------------|
| `docs/requirements/caboodle-site-outline.md` | Requirements doc | 60+ candidate nouns across 11 sections |
| `.cursor/rules/ooux-*.md` | Skill files (19) | Skill structure, ORCA steps, artifact types |
| `docs/templates/*.md` | Artifact templates (20+) | Template structure, download formats |
| `.cursor/rules/ooux-overview.mdc` | Overview rule | Core objects, process steps, glossary terms |
| `docs/plans/ooux-case-study-framework.md` | Case study framework | Blog/case study structure, phases |

---

## Candidate Noun Clusters

### Likely Objects (validated below)

| Noun | Source Frequency | Why It Looked Promising |
|------|-----------------|------------------------|
| Skill | 30+ mentions | Core tool of the site, powers all ORCA workflows |
| Object Definition | 20+ mentions | Heart of the Object Directory, what practitioners reference |
| Template | 15+ mentions | Downloadable artifacts, linked to skills |
| Blog Post | 10+ mentions | Content hub, case studies, articles |
| Glossary Term | 10+ mentions | Searchable dictionary, powers tooltips site-wide |
| ORCA Step | 12+ mentions | Process guide, each step has its own detail page |

### Rejected Nouns (failed SIP or are attributes/CTAs)

| Noun | Reason for Rejection |
|------|---------------------|
| Download | CTA, not an object — it's an action on a Template |
| Search | Feature/CTA — users search for objects, it's not an object itself |
| Filter | UI control / attribute modifier — not a standalone thing |
| Role (Designer, PM, etc.) | Attribute of User — no independent structure or purpose |
| Category | Attribute — a tag on objects, not its own entity |
| Phase (case study) | Attribute of Blog Post — structural section, not standalone |
| Tooltip | UI component — presentation of Glossary Terms, not a separate object |
| Sidebar / Nav | UI component — presentation pattern, not content |
| Badge | UI component — visual treatment of attributes |
| Workshop | Subtype of Template — not structurally distinct enough |
| Guide (learning) | Subtype of Blog Post or could be a section of ORCA Step — not distinct |
| Anti-Pattern | Attribute of ORCA Step — each step fights one, but it's data on the step |
| Ancient Truth | Attribute of ORCA Step — the 4 truths map to 4 pillars, metadata on steps |
| Author | Attribute of Blog Post — name, avatar, bio are attributes, not a standalone object |
| Product | Attribute of Object Definition — Renaissance product associations are tags |
| Project | Out of scope — projects live in Confluence, not on the resource site |

### Discussed & Resolved

| Noun | Resolution | Rationale |
|------|-----------|-----------|
| Resource (external link) | **Attribute of a "Resources" page** | No meaningful structure beyond URL + title + description. Curated list, not a browsable object type. |
| User/Practitioner | **Out of scope for MVP** | Internal site uses SSO; no user profiles or accounts in v1. Could become an object later if community features are added. |
| Artifact | **Synonym for Template output** | An artifact is what you get after filling in a template. The template is the object; the artifact is the result. |

---

## SIP Validation

| # | Object | **S**tructure | **I**nstances | **P**urpose | Verdict |
|---|--------|:---:|:---:|:---:|---------|
| 1 | **Skill** | ✅ Name, ID, round, step, pillar, description, prerequisites, artifact type, example prompts, dependency links | ✅ 01 Object Discovery, s6 ORCA Planner, 09 Object Card Designer… (19 total) | ✅ Practitioners seek skills to run ORCA workflows; the core tool of the site | **Object** |
| 2 | **Object Definition** | ✅ Name, definition, SIP validation, attributes list, CTAs list, relationships, lifecycle states, business rules, category, product associations, card preview | ✅ Student, Teacher, Class, Assessment, Assignment… (13 core + domain objects) | ✅ Users browse the directory to understand system objects and reference them during design | **Object** |
| 3 | **Template** | ✅ Name, type, associated skill, preview content, download formats, filled-in example | ✅ Object Discovery worksheet, NOM template, CTA Matrix, Object Guide… (20+) | ✅ Practitioners download and use them to produce ORCA artifacts | **Object** |
| 4 | **Blog Post** | ✅ Title, author, body, publish date, tags, category, reading time, featured image | ✅ Articles, tutorials, case studies, community spotlights (many over time) | ✅ Users read and browse for learning, inspiration, and updates | **Object** |
| 5 | **Glossary Term** | ✅ Term, definition, category, related terms (cross-links), source | ✅ SIP, NOM, MCSFD, P/S/T/Q, Noun Foraging, Force-Ranking… (50+) | ✅ Users search for and reference definitions; powers site-wide tooltips | **Object** |
| 6 | **ORCA Step** | ✅ Number (1–12), name, round, pillar, description, inputs, outputs, associated skill, associated template, anti-pattern fought (Representation steps) | ✅ 01 Object Discovery, 02 NOM Builder… 12 Shapeshifter Matrix (12 total) | ✅ Users navigate the process guide to understand the methodology and find the right step for their task | **Object** |

---

## Validated Object List

1. **Skill** — An AI-powered agent workflow that guides practitioners through an ORCA step
2. **Object Definition** — A structured description of a system object (attributes, CTAs, relationships, rules)
3. **Template** — A downloadable, fillable artifact template used to produce ORCA deliverables
4. **Blog Post** — A published article, case study, tutorial, or community spotlight
5. **Glossary Term** — A defined OOUX concept with cross-links, powering site-wide tooltips
6. **ORCA Step** — One of the 12 steps in the ORCA process, with inputs, outputs, and an associated skill

---

## Next Steps

→ **Step 2: NOM Builder** — Map which objects appear nested inside other objects' detail pages.
