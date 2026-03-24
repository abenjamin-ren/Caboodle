# Caboodle Site — Requirements Outline

> **Status: Partial** — Phase 0 (Object Library, Object Guides) is mostly built with some differences from this spec. Later phases remain planned. See phasing section for current status.

> **Purpose:** An internal Renaissance resource site that teaches OOUX, provides downloadable tools, houses object definitions, and serves as the canonical home for OOUX practitioners within the organization.

---

## Site Vision

A modern resource site that serves three audiences:

1. **Newcomers** — "What is OOUX? Why should I care?"
2. **Practitioners** — "Give me the tools, templates, and references I need to run ORCA."
3. **Contributors** — "I want to publish case studies, add objects, and share my work."

---

## 1. Landing Page

**Goal:** First impression. Clearly communicate what OOUX is, why it matters, and what's available on the site.

### Sections

- **Hero** — Headline, sub-headline, primary CTA ("Get Started" / "Download the Toolkit")
- **What is OOUX?** — Concise explanation of Object-Oriented UX with visual (the ORCA grid or Four Ancient Truths)
- **The Four Ancient Truths** — Visual cards for Objects, Relationships, CTAs, Attributes — each with the truth statement, anti-pattern, and a one-sentence example
- **The ORCA Process** — Interactive or animated overview of the 3 rounds × 4 pillars = 12 steps
- **Who It's For** — Role cards (Designer, PM, Engineer, Researcher) with tailored value props and links to role-based quickstarts
- **Featured Resources** — Curated highlights (AI Skills, Workshop Kit, Object Directory, Blog)
- **Social Proof / Adoption** — Stats, testimonials, or logos (e.g., "Used across 5 Renaissance product teams")
- **Footer CTA** — "Ready to start? Download the toolkit" or "Read a case study"

---

## 2. Resources Hub

**Goal:** Central library for everything a practitioner needs — tools, templates, guides, and downloads.

### 2a. AI Skills (Agent Tools)

- **Skill Directory** — All skills with name, ID, description, round/step, artifact produced, prerequisites
- **Interactive Skill Selector** — "What are you trying to do?" → recommended skills
- **Skill Dependency Diagram** — Visual flowchart of recommended sequence
- **Example Prompts** — Copy-paste prompt starters

### 2b. Downloadable Cursor Project

- Pre-configured Cursor project with all skills, rules, templates
- Download options: `.zip`, GitHub clone, install script
- Setup guide with screenshots

### 2c. Workshop Templates

- Workshop Playbook — agendas for Discovery, Prioritization, Representation workshops
- Facilitation scripts, printable worksheets, Miro/FigJam board templates

### 2d. Artifact Templates

- All 20+ templates with preview, download, linked skill, and filled-in examples

### 2e. Guides & Learning

- OOUX Primer, ORCA Process Guide, Four Ancient Truths, Glossary, Role-Based Quickstarts

### 2f. External Resources

- Links to X-Ray UX, OOUX.com, certification program, curated articles/talks

---

## 3. Object Directory

**Goal:** A browsable, searchable catalog of object definitions — the "data dictionary for humans."

### Features

- **Object List View** — Grid of all objects with avatar, name, definition, category, product associations, stats
- **Object Detail Page** — Full Object Guide (definition, attributes, nested objects, CTAs, lifecycle, relationships, business rules, card preview, shapeshifter variants, products, related objects)
- **Object Comparison Tool** — Side-by-side comparison (future)
- **Search & Filter** — By category, product, role, attribute type
- **NOM Visualization** — Interactive Nested-Object Matrix (future)

### Object Categories

- **Core Objects** (13): Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight
- **Domain Objects** — Product-specific objects discovered through ORCA projects

---

## 4. ORCA Process Guide

**Goal:** Interactive visual walkthrough of the 12-step ORCA process.

### Features

- **Visual Process Map** — Clickable 3×4 grid
- **Step Detail Pages** — What/why, inputs, outputs, anti-pattern, associated skill/template, worked example
- **Round Overview Pages** — Discovery, Prioritization, Representation summaries

---

## 5. Design System

**Goal:** Object-oriented component library for Renaissance products. Defines how the 13 core objects should be visually represented.

### Contents

- Identity System (colors, avatars, abbreviations)
- Object Card gallery with variants
- Shapeshifter Explorer
- CTA Placement Guide
- Anti-Pattern Checker
- Token Export (CSS, JSON, Figma, Tailwind)

---

## 6. Glossary

**Goal:** Searchable dictionary of OOUX terminology.

- Searchable list with instant filter
- Alphabetical index
- Category grouping (core concepts, ORCA steps, artifact types, anti-patterns)
- Cross-linked terms

---

## Phasing

### Phase 0 — Foundation

| Feature | Status | Notes |
|---------|--------|-------|
| Home page with hero | Built | Landing page with links to Object Library and Resources |
| Object Library | Built (evolved) | Now system-based routing (`/objects/[systemSlug]`) instead of flat card grid. 26 object data files across multiple systems |
| Object Guide pages | Built | All 26 objects render via `[objectSlug]` dynamic route. Tab structure: Views, Attributes, Actions, Relationships |
| View Inspector | Built | Per-shapeshifter-context editing at `/objects/[systemSlug]/[objectSlug]/views/[viewSlug]` |
| Shell pages for Resources, Process, Glossary | Built | Placeholder pages with heading only |
| Design System page | Built | Component style guide exists but not linked in main nav |
| CSS architecture (tokens, layouts, components) | Built | Tokens, Every Layout primitives, component styles |
| Lit Web Component library | Needs rebuild | Previously built, source files deleted. Only `ren-student-row.ts` + `shared/tokens.ts` remain |
| Student roster prototype | Partially built | RosterRing, RosterScoreColumn, RosterOverflowMenu, StudentRosterPreview components exist |
| PWA | Partially built | Serwist service worker and manifest; push actions not wired to UI |

### Phase 1 — Content & Polish

- Populate Resources, Process, Glossary, Design System content
- Rebuild Lit Web Component library (~127 shape components)
- Wire search functionality
- Link Design System page in navigation

### Phase 2 — Content & Community

- Blog with case studies
- Workshop templates section
- Interactive ORCA process map

### Phase 3 — Data Layer & Distribution

- Backend database, API, Confluence sync
- Dynamic search, comparison tools
- Admin CMS
- Publish `@renaissance/object-components` to npm

> **Note:** Phase 3 originally called for migrating to Next.js — this was completed as part of Phase 0. The site runs on Next.js 16 App Router.

---

## Sitemap (current)

```
/                                                    Home
/objects                                             Object Library (system catalog)
/objects/[systemSlug]                                System Detail (object grid)
/objects/[systemSlug]/[objectSlug]                   Object Guide (tabbed detail)
/objects/[systemSlug]/[objectSlug]/views/[viewSlug]  View Inspector
/design-system                                       Design System (not in nav)
/resources                                           Resources (placeholder)
/process                                             Process (placeholder)
/glossary                                            Glossary (placeholder)
```
