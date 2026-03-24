# ORCA Plan: OOUX Resource Site

> **Status: Process artifact** — This ORCA plan and its 12 step artifacts describe the structural analysis of Caboodle's own meta-objects. All 12 steps were completed. The analysis informed the site architecture, though implementation evolved (e.g., system-based routing at `/objects/[systemSlug]/[objectSlug]` instead of flat `/objects/:slug`; icon-based identity instead of color-based). Path references below use the original static `caboodle/` structure; the current site is a Next.js App Router application at `packages/caboodle-site/`.

**Goal:** New Product — Comprehensive ORCA cycle to fully define the objects, relationships, CTAs, and attributes for the internal OOUX Resource Site (Caboodle), producing a complete structural blueprint before design or development begins.

**Depth:** Comprehensive (full 3-round cycle)

**Status:** Complete — 12 of 12

---

## Scope

**What:** An internal Renaissance resource site that teaches OOUX, provides downloadable AI tools (Cursor skills), houses an Object Directory, and serves as the canonical home for OOUX practitioners within the organization.

**Primary Users:**
- **Newcomers** — Renaissance designers, PMs, and engineers learning OOUX for the first time
- **Practitioners** — Team members actively running ORCA on their projects
- **Contributors** — Authors publishing case studies, adding domain objects, sharing artifacts

**In Scope:**
- Landing page, Resources Hub, Object Directory, Blog/Case Studies
- Backend data model for object definitions
- Design system (object-oriented)
- Interactive ORCA Process Guide, Glossary, Search
- Admin/CMS for content management
- Downloadable Cursor project with skills and templates

**Out of Scope:**
- Public-facing or external community features
- Monetization or gated content
- Video production (placeholder only)
- Mobile native apps

**Source Materials:**
- `docs/requirements/caboodle-site-outline.md` — Full requirements outline
- `docs/research/ooux-designsystems.md` — Design system philosophy
- `docs/plans/ooux-case-study-framework.md` — Case study structure
- `.cursor/skills/` — All 28 skill definitions
- `docs/templates/` — All 20 artifact templates

---

## Progress

| # | Skill | Description | Effort | Status |
|---|-------|------------|--------|--------|
| 1 | Object Discovery | Forage for nouns across the site outline, validate each with SIP | 1.5 hr | ✅ Complete |
| 2 | NOM Builder | Map which objects nest inside other objects on the site | 45 min | ✅ Complete |
| 3 | CTA Matrix Builder | Inventory every action users can take on each object, per role | 1 hr | ✅ Complete |
| 4 | Object Map Builder | Build a visual diagram of all objects with attributes and connections | 1 hr | ✅ Complete |
| 5 | Object Guide Builder | Write a comprehensive guide for each key object (repeat per object) | 3 hr | ✅ Complete |
| 6 | MCSFD Spec Writer | Specify key relationships using the 5 lenses | 1.5 hr | ✅ Complete |
| 7 | CTA Prioritization | Force-rank CTAs as P/S/T/Q for each object | 1 hr | ✅ Complete |
| 8 | Attribute Prioritization | Force-rank attributes to determine card vs. detail display | 1 hr | ✅ Complete |
| 9 | Object Card Designer | Design visually distinct cards for each object type | 1.5 hr | ✅ Complete |
| 10 | Nav Flow Designer | Map how users navigate between objects on the site | 1 hr | ✅ Complete |
| 11 | CTA Placement Designer | Position P/S/T/Q CTAs on cards and detail pages | 1 hr | ✅ Complete |
| 12 | Shapeshifter Matrix Builder | Map how each object appears across different site contexts | 1 hr | ✅ Complete |

---

## Reuse Opportunities

- **Renaissance Core Objects** — The 13 core objects (Student, Teacher, etc.) already have full Object Guides in Confluence. The resource site's "Object Definition" object will *reference* these but is itself a different meta-object (the guide *about* an object, not the object itself).
- **Case Study Framework** — `docs/plans/ooux-case-study-framework.md` already defines the structure for Blog Post / Case Study objects.
- **Artifact Templates** — All 20 templates in `docs/templates/` define the content structure for the Template object.
- **Skill Files** — All 28 skills in `.cursor/skills/` define the content structure for the Skill object.

---

## Candidate Objects (Pre-Discovery)

Based on the preliminary read of `docs/requirements/caboodle-site-outline.md`, these were the candidate nouns before SIP validation in Step 1:

| Candidate Noun | Source Section | Likely Object? | Notes |
|---------------|---------------|:-:|-------|
| Skill | 2a. AI Skills | ✅ | 19 instances, rich structure, users seek them out |
| Object Definition | 3. Object Directory | ✅ | The meta-object: a guide *about* a system object |
| Template | 2d. Artifact Templates | ✅ | 20+ instances, downloadable, tied to skills |
| Blog Post | 6. Blog | ✅ | Articles, tutorials, spotlights |
| Case Study | 6. Blog | ❓ | Might be a variant of Blog Post, or its own object |
| Workshop | 2c. Workshop Templates | ❓ | Could be a Template variant or standalone |
| Glossary Term | 8. Glossary | ✅ | Many instances, searchable, cross-linked |
| ORCA Step | 7. Process Guide | ✅ | 12 instances, each with detail page |
| Project | 9. Community | ❓ | ORCA project in the gallery — SIP test needed |
| Author | 6. Blog | ❓ | May be an attribute of Blog Post, not a standalone object |
| Download | 2b. Cursor Project | ❓ | Could be a CTA on Skill/Template, not its own object |
| Resource (External) | 2f. External Resources | ❓ | Links to books, talks, podcasts — SIP test needed |
| Guide (Learning) | 2e. Guides | ❓ | Could be a Blog Post variant or standalone |
| ORCA Round | 7. Process Guide | ❓ | Grouping of Steps — may be an attribute |

SIP validation in Step 1 confirmed 6 objects: **Skill**, **Object Definition**, **Template**, **Blog Post**, **Glossary Term**, and **ORCA Step**. Case Study was validated as a variant of Blog Post. Workshop, Project, Author, Download, Resource (External), Guide, and ORCA Round were rejected (see `01-object-discovery.md`).

---

## Artifacts Created

### ORCA Artifacts (Steps 1–12)

| # | Artifact | File |
|---|----------|------|
| — | ORCA Plan | `docs/requirements/orca-plan.md` (this file) |
| 1 | Object Discovery | `docs/requirements/01-object-discovery.md` |
| 2 | Nested-Object Matrix | `docs/requirements/02-nom.md` |
| 3 | CTA Matrix | `docs/requirements/03-cta-matrix.md` |
| 4 | Object Map | `docs/requirements/04-object-map.md` |
| 5 | Object Guides | `docs/requirements/05-object-guides.md` |
| 6 | MCSFD Specs | `docs/requirements/06-mcsfd-specs.md` |
| 7 | CTA Prioritization | `docs/requirements/07-cta-prioritization.md` |
| 8 | Attribute Prioritization | `docs/requirements/08-attribute-prioritization.md` |
| 9 | Object Cards | `docs/requirements/09-object-cards.md` |
| 10 | Nav Flow | `docs/requirements/10-nav-flow.md` |
| 11 | CTA Placement | `docs/requirements/11-cta-placement.md` |
| 12 | Shapeshifter Matrix | `docs/requirements/12-shapeshifter-matrix.md` |

### Supporting Documents

| Artifact | File |
|----------|------|
| Site Outline | `docs/requirements/caboodle-site-outline.md` |
| Design System (13 Core Objects) | `docs/requirements/design-system.md` |
| Engineering Handoff | `docs/requirements/engineering-handoff.md` |
| Object Guide Page Spec | `docs/requirements/object-guide-page.md` |
| Caboodle Page Blueprint | `docs/requirements/caboodle-page-blueprint.md` |
| Caboodle Layout System | `docs/requirements/caboodle-layout-system.md` |

### Built Artifacts

The Caboodle static site lives at `caboodle/` and includes:

| Page | Path | Status |
|------|------|--------|
| Home | `caboodle/index.html` | Built |
| Object Library | `caboodle/objects/index.html` | Built (15 object cards) |
| Student Object Guide | `caboodle/objects/student/index.html` | Built (6 tabs, full detail) |
| Resources | `caboodle/resources/index.html` | Shell |
| Process | `caboodle/process/index.html` | Shell |
| Glossary | `caboodle/glossary/index.html` | Shell |
| Design System | `caboodle/design-system/index.html` | Shell |

CSS architecture: `caboodle/styles/main.css` → imports `tokens.css`, `layouts.css`, `components.css`

---

## Notes

- All ORCA artifacts are saved as markdown in `docs/requirements/` — no Confluence publishing for this project.
- This is an **internal Renaissance** site — no public access, no monetization.
- The resource site's objects are **meta-objects**: objects *about* OOUX concepts (Skills, Object Definitions, Templates), not the Renaissance product objects themselves (Student, Teacher, etc.).
- The site is named **Caboodle** and is built as static HTML with vanilla CSS (Every Layout primitives). An eventual migration to a framework (Astro, Next.js, or similar) is planned for templating and dynamic features.
