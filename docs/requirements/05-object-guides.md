# Object Guides — OOUX Resource Site

> **Status: Process artifact** — Prioritized Object Guides for Caboodle's six meta-objects. The Object Definition guide is fully implemented as the Object Guide page (`/objects/[systemSlug]/[objectSlug]`). Other meta-object guides describe planned content types.

**Project:** OOUX Resource Site (Internal Renaissance)

This document contains prioritized Object Guides for all 6 validated objects. Each guide is the single source of truth for that object's definition, attributes, nested objects, CTAs, business rules, and lifecycle.

---

## Object Guide: Skill

**TL;DR:** A Skill is an AI-powered agent workflow — the core tool of the OOUX Resource Site — that guides practitioners through a specific ORCA step, producing a structured artifact using a Template.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Name, ID, type, round, pillar, description, instructions, prerequisites, artifact, prompts, anti-pattern, file path |
| **Instances** | 01 Object Discovery, 02 NOM Builder, s6 ORCA Planner, 09 Object Card Designer (19 total) |
| **Purpose** | Practitioners seek skills to run ORCA workflows; the core tool of the site |

### Definition & Purpose

A **Skill** is an AI-powered agent workflow, stored as a Cursor rule file, that guides a practitioner step-by-step through a specific ORCA task — reading context, collaborating at structured checkpoints, and producing a finished artifact.

### Instances & Examples

- **01 Object Discovery** — Guides noun foraging and SIP validation to produce a validated object list
- **s6 ORCA Planner** — Builds a sequenced workflow plan and guides execution
- **09 Object Card Designer** — Designs visually distinct cards for each object type
- **s1 OOUX Primer** — Teaches OOUX concepts tailored to the user's role

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Name | String | Yes | Human-readable name (e.g., "Object Discovery") |
| Identifiers | Skill ID | String | Yes | Unique code (e.g., "01", "s6", "s10") |
| Classification | Type | Enum | Yes | Core (ORCA steps 1–12) or Supporting (s1–s10) |
| Classification | Round | Enum | Conditional | Discovery, Prioritization, or Representation (Core only) |
| Classification | Step Number | Integer | Conditional | 1–12 for Core skills; null for Supporting |
| Classification | Pillar | Enum | Conditional | Objects, Relationships, CTAs, or Attributes (Core only) |
| Content | Description | String | Yes | One-liner summary |
| Content | Full Instructions | Text (MD) | Yes | The complete skill file body |
| Content | Example Prompts | String[] | Yes | Copy-paste starter prompts |
| Relationships | Prerequisites | Skill[] | No | Skills that should run before this one |
| Relationships | What It Produces | String | Yes | Artifact type (e.g., "Validated object list") |
| ORCA Context | Anti-Pattern Fought | String | Conditional | Only for Representation skills (steps 9–12) |
| ORCA Context | Ancient Truth | String | Conditional | Only for Representation skills (steps 9–12) |
| System | File Path | String | Yes | Location in repo (e.g., `.cursor/rules/ooux-01-object-discovery.md`) |

### Nested Objects (from NOM)

- **Template** — The artifact template this skill produces ("Artifact Template" link)
- **Blog Post** — Case studies and articles that reference this skill ("Case Studies" list)
- **Glossary Term** — OOUX terms used in the skill description (inline tooltips + "Key Terms")
- **ORCA Step** — The process step this skill belongs to ("Process Step" link)

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| View | All | Read | | Read skill description and instructions |
| Copy Prompt | All | Read | | Copy starter prompt to clipboard |
| Run in Cursor | All | Read | | Deep link or instruction to invoke in Cursor |
| Download | All | Read | | Download the `.md` skill file |
| View Template | All | Read | → Template | Navigate to associated template |
| View Step | All | Read | → ORCA Step | Navigate to associated ORCA step |
| Edit | Admin | Write | | Edit description, prompts, metadata |
| Create | Admin | Write | | Add a new skill |
| Delete | Admin | Write | | Remove a skill |

### Business Rules & Constraints

1. Every Core skill (01–12) must have exactly one Round, one Pillar, and one Step Number
2. Supporting skills (s1–s10) have no Round, Pillar, or Step Number
3. A Skill's file path must match the pattern `.cursor/rules/ooux-{id}-{slug}.md`
4. Each Skill must have at least one Example Prompt
5. Only Representation skills (09–12) have Anti-Pattern Fought and Ancient Truth
6. Skills cannot be deleted if they are referenced by an ORCA Step

### Lifecycle / Status Model

```
[Draft] → [Published] → [Deprecated]
```

- **Draft** — Being written or revised; not visible to Viewers
- **Published** — Active and visible on the site
- **Deprecated** — Superseded by a newer version; visible with a warning banner

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| View / Read | ✅ | ✅ | ✅ |
| Copy Prompt | ✅ | ✅ | ✅ |
| Download | ✅ | ✅ | ✅ |
| Create / Edit / Delete | | | ✅ |

---

## Object Guide: Object Definition

**TL;DR:** An Object Definition is the structured reference entry in the Object Directory — the heart of the site — describing a system object's attributes, CTAs, relationships, and business rules.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Name, definition, category, SIP, attributes, CTAs, relationships, lifecycle, business rules, product associations, avatar, card preview |
| **Instances** | Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight (13 core + domain) |
| **Purpose** | Users browse the directory to understand system objects and reference them during design |

### Definition & Purpose

An **Object Definition** is a structured, canonical description of a system object — including its attributes, CTAs, relationships, lifecycle states, and business rules — that serves as the single source of truth in the Object Directory.

### Instances & Examples

- **Student** — Core object representing a learner in the Renaissance ecosystem
- **Assessment** — Core object representing a test or evaluation
- **Activity** (Nearpod) — Domain object specific to one product

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Name | String | Yes | Object name (e.g., "Student") |
| Descriptors | Definition | String | Yes | One-sentence definition |
| Descriptors | SIP Validation | Object | Yes | Structure, Instances, Purpose evidence |
| Classification | Category | Enum | Yes | Core, Domain, or Variation |
| Classification | Object Type Icon | Enum | Yes | `object_icon` (Core), `object-variation_icon` (Variation), `domain-object_icon` (Domain) |
| Classification | Semantic Category | Enum | Yes | People, Organizations, Activities, Curriculum, or Insights — used for library tab filtering |
| Classification | Parent Object | Reference → Object Def | Conditional | Required for Variations; links to the core object this variation specializes |
| Classification | Product Associations | String[] | No | Renaissance products where this object appears |
| Content | Attributes List | Attribute[] | Yes | Full attribute inventory with types and priorities |
| Content | CTAs List | CTA[] | Yes | Full CTA inventory with P/S/T/Q |
| Content | Nested Objects | String[] | Yes | From the NOM |
| Content | Relationships | MCSFD[] | No | Relationship specs for each connected object |
| Content | Lifecycle States | String[] | No | Ordered list of states |
| Content | Business Rules | String[] | No | Domain constraints and validations |
| Visual | Card Preview | Image/HTML | No | Visual representation of the object card |
| System | Created Date | DateTime | Yes | Auto-set |
| System | Last Updated | DateTime | Yes | Auto-set |

### Nested Objects (from NOM)

- **Blog Post** — Articles and case studies featuring this object ("Related Articles" list)
- **Glossary Term** — OOUX terms used in the definition (inline tooltips + "Related Terms")

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the full object guide |
| Compare | All | Read | → Object Definition | Side-by-side comparison |
| Export | All | Read | | Export as JSON, MD, or CSV |
| Bookmark | All | Read | | Save to personal favorites |
| Create | Contributor, Admin | Write | | Submit a new object definition |
| Edit | Contributor, Admin | Write | | Modify attributes, CTAs, relationships |
| Delete | Admin | Write | | Remove from directory |
| Tag Product | Admin | Write | | Associate with a Renaissance product |

### Business Rules & Constraints

1. Every Object Definition must pass the SIP test before being published
2. Object names must be unique within the directory
3. Core objects (13) cannot be deleted, only edited
4. Object type icon must match the object's classification: `object_icon.svg` for Core, `object-variation_icon.svg` for Variation, `domain-object_icon.svg` for Domain
5. Variation objects must have a Parent Object reference linking to the core object they specialize
6. Deleting an Object Definition removes it from all NOM relationships and CTA matrices

### Lifecycle / Status Model

```
[Draft] → [Published] → [Archived]
```

- **Draft** — Being defined; visible only to Contributors and Admins
- **Published** — Active in the Object Directory; visible to all
- **Archived** — Removed from active listing but retained for historical reference

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| View / Compare / Export | ✅ | ✅ | ✅ |
| Bookmark | ✅ | ✅ | ✅ |
| Create / Edit | | ✅ | ✅ |
| Delete / Tag Product | | | ✅ |

---

## Object Guide: Template

**TL;DR:** A Template is a downloadable, fillable artifact template — linked to a specific Skill and ORCA Step — that practitioners use to produce structured ORCA deliverables.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Name, ID, type, associated skill, step, description, instructions, download formats, preview, filled-in example, file path |
| **Instances** | Object Discovery worksheet, NOM template, CTA Matrix, Object Guide, MCSFD Spec (20+) |
| **Purpose** | Practitioners download and fill them in to produce ORCA artifacts |

### Definition & Purpose

A **Template** is a downloadable, fillable document that provides the canonical structure for an ORCA artifact — giving practitioners a consistent starting point for producing deliverables like NOMs, CTA Matrices, and Object Guides.

### Instances & Examples

- **nom.md** — The Nested-Object Matrix template (used by Skill 02)
- **object-guide.md** — The Object Guide template (used by Skill 05)
- **cta-matrix.md** — The CTA Matrix template (used by Skill 03)

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Name | String | Yes | Human-readable name |
| Identifiers | Template ID | String | Yes | Unique code (kebab-case) |
| Classification | Type | Enum | Yes | Worksheet, Matrix, Guide, Spec, or Map |
| Relationships | Associated Skill | Skill (link) | Yes | The skill that produces this template |
| Relationships | Associated ORCA Step | ORCA Step (link) | Yes | The step this template belongs to |
| Content | Description | String | Yes | One-liner summary |
| Content | Instructions | Text (MD) | Yes | How to fill it in |
| Content | Download Formats | Enum[] | Yes | Markdown, PDF, Google Doc |
| Content | Preview Content | HTML/MD | No | Rendered preview of the template |
| Content | Filled-In Example | Text (MD) | No | A real completed version |
| System | File Path | String | Yes | Location in repo (e.g., `docs/templates/nom.md`) |
| System | Created Date | DateTime | Yes | Auto-set |
| System | Last Updated | DateTime | Yes | Auto-set |

### Nested Objects (from NOM)

- **Skill** — The skill that uses this template ("Used By" link)
- **Blog Post** — Articles showing this template in practice ("Examples in Practice")
- **Glossary Term** — Terms used in template fields (inline tooltips)
- **ORCA Step** — The process step this template belongs to ("Process Step" link)

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| View / Preview | All | Read | | See the template with instructions |
| Download | All | Read | | Download in selected format |
| Copy | All | Read | | Copy content to clipboard |
| View Filled Example | All | Read | | See a completed version |
| View Skill | All | Read | → Skill | Navigate to associated skill |
| Create | Admin | Write | | Add a new template |
| Edit | Admin | Write | | Update content or metadata |
| Delete | Admin | Write | | Remove a template |

### Business Rules & Constraints

1. Every Template must be associated with exactly one Skill and one ORCA Step
2. Templates must be available in at least Markdown format
3. Template file paths must match `docs/templates/{id}.md`
4. Filled-In Examples are strongly recommended but not required
5. Deleting a Template that is referenced by a Skill requires updating the Skill first

### Lifecycle / Status Model

```
[Draft] → [Published] → [Deprecated]
```

- **Draft** — Being written; not available for download
- **Published** — Active and downloadable
- **Deprecated** — Replaced by a newer version; still downloadable with a notice

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| View / Download / Copy | ✅ | ✅ | ✅ |
| Create / Edit / Delete | | | ✅ |

---

## Object Guide: Blog Post

**TL;DR:** A Blog Post is published content — articles, case studies, tutorials, or spotlights — that connects OOUX theory to practice, referencing Skills, Object Definitions, Templates, and ORCA Steps throughout.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Title, slug, author, dates, category, tags, body, image, reading time, status, excerpt, comments |
| **Instances** | Case studies, concept articles, tutorials, community spotlights (many over time) |
| **Purpose** | Users read and browse for learning, inspiration, and updates |

### Definition & Purpose

A **Blog Post** is a published piece of content — an article, case study, tutorial, or community spotlight — authored by a Renaissance employee, that documents OOUX practice, teaches concepts, or shares project outcomes.

### Instances & Examples

- **"How We Used ORCA to Redesign Assignment Management"** — Case study
- **"Understanding the Four Ancient Truths"** — Concept article
- **"Step-by-Step: Running Your First Object Discovery"** — Tutorial

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Title | String | Yes | Post title |
| Identifiers | Slug | String | Yes | URL path segment (auto-generated from title) |
| Author | Author Name | String | Yes | From SSO profile |
| Author | Author Role | String | Yes | Job title / team |
| Author | Author Avatar | Image URL | No | From SSO profile |
| Dates | Publish Date | DateTime | Conditional | Required when Published |
| Dates | Last Updated | DateTime | Yes | Auto-set |
| Classification | Category | Enum | Yes | Case Study, Article, Tutorial, Community Spotlight |
| Classification | Tags | String[] | No | Free-form topic tags |
| Content | Body | Text (MD) | Yes | Full post content in Markdown |
| Content | Featured Image | Image URL | No | Hero image for the post |
| Content | Excerpt | String | Yes | Short summary (auto-generated or manual) |
| Metrics | Reading Time | Integer (min) | Yes | Calculated from word count |
| Metrics | Comment Count | Integer | Yes | Auto-calculated, default 0 |
| Status | Status | Enum | Yes | Draft, Published, Archived |
| Status | Featured | Boolean | No | Pinned as hero post, default false |

### Nested Objects (from NOM)

- **Skill** — Skills referenced in the post ("Skills Used" sidebar)
- **Object Definition** — Objects discussed in the post ("Objects Covered" sidebar)
- **Template** — Templates shown filled-in ("Artifacts" section)
- **Glossary Term** — OOUX terms get tooltip annotations throughout the body
- **ORCA Step** — Process steps covered ("ORCA Steps" sidebar)

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| Read | All | Read | | Read the full article |
| Share | All | Read | | Copy link for internal sharing |
| Comment | All | Write | | Leave a comment or question |
| Create / Draft | Contributor, Admin | Write | | Author a new post |
| Edit | Author, Admin | Write | | Modify an existing post |
| Publish | Admin | Write | | Move Draft → Published |
| Unpublish | Admin | Write | | Revert to draft |
| Feature | Admin | Write | | Pin as featured/hero |
| Tag | Author, Admin | Write | | Add tags and categories |
| Archive | Admin | Write | | Remove from active listing |
| Delete | Admin | Write | | Permanently remove |
| Link Skill | Author, Admin | Write | → Skill | Associate skills |
| Link Object | Author, Admin | Write | → Object Def | Associate objects |
| Embed Template | Author, Admin | Write | → Template | Show template inline |

### Business Rules & Constraints

1. Posts must have a Category before being Published
2. Author fields are auto-populated from SSO — cannot be manually overridden
3. Slug is auto-generated from Title but can be manually edited before first publish
4. Only one post can be Featured at a time (featuring a new post un-features the old one)
5. Publishing requires Admin approval (Contributors can Draft, Admins Publish)
6. Archived posts remain accessible via direct URL but are excluded from listings and search
7. Reading Time is calculated at ~200 words per minute

### Lifecycle / Status Model

```
[Draft] → [Published] ⇄ [Unpublished/Draft]
                ↓
          [Archived]
                ↓
          [Deleted]
```

- **Draft** — Being written; visible only to Author and Admins
- **Published** — Live on the blog; visible to all
- **Archived** — Removed from listings; accessible via direct URL
- **Deleted** — Permanently removed (soft delete with 30-day recovery)

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| Read / Share | ✅ | ✅ | ✅ |
| Comment | ✅ | ✅ | ✅ |
| Create / Draft | | ✅ | ✅ |
| Edit (own post) | | ✅ | ✅ |
| Edit (any post) | | | ✅ |
| Publish / Unpublish / Feature / Archive / Delete | | | ✅ |

---

## Object Guide: Glossary Term

**TL;DR:** A Glossary Term is a defined OOUX concept — powering the searchable glossary and site-wide tooltip annotations — that cross-links to related terms, skills, and process steps.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Term, definition, category, related terms, source, example, abbreviation |
| **Instances** | SIP, NOM, MCSFD, P/S/T/Q, Noun Foraging, Force-Ranking, Shapeshifter, Masked Object (50+) |
| **Purpose** | Users search for and reference definitions; powers site-wide tooltips |

### Definition & Purpose

A **Glossary Term** is a defined OOUX concept or vocabulary item — stored in the glossary and surfaced as inline tooltip annotations across the site — that helps practitioners learn and consistently use OOUX terminology.

### Instances & Examples

- **SIP Test** — "Structure, Instances, Purpose — the three-part validation for whether something qualifies as an object"
- **NOM** — "Nested-Object Matrix — a grid mapping which objects appear inside other objects' detail pages"
- **Masked Objects** — "An anti-pattern where different objects are disguised as the same thing"

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Term | String | Yes | The term itself (e.g., "SIP Test") |
| Identifiers | Abbreviation | String | No | Short form if it exists (e.g., "NOM", "SIP") |
| Content | Definition | Text | Yes | Clear, concise definition |
| Content | Example | Text | No | Usage in context |
| Content | Source | String | No | Origin reference (e.g., "Sophia Prater, X-Ray UX") |
| Classification | Category | Enum | Yes | Core Concept, ORCA Step, Artifact Type, Anti-Pattern, Framework |
| Relationships | Related Terms | GlossaryTerm[] | No | Cross-links to related entries |
| System | Created Date | DateTime | Yes | Auto-set |
| System | Last Updated | DateTime | Yes | Auto-set |

### Nested Objects (from NOM)

- **Skill** — Skills that reference this term ("Used in Skills" links)
- **Blog Post** — Articles that discuss this term ("Articles About This Term")
- **ORCA Step** — Steps where this term is relevant ("Relevant Steps")

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the definition |
| Search | All | Read | | Search/filter the glossary |
| Suggest | All | Write | | Suggest a new term or correction |
| Create | Contributor, Admin | Write | | Add a new term |
| Edit | Contributor, Admin | Write | | Update definition or metadata |
| Cross-link | Admin | Write | → Glossary Term | Link related terms |
| Delete | Admin | Write | | Remove a term |

### Business Rules & Constraints

1. Term names must be unique within the glossary
2. Every term must have a Category
3. Related Terms are bidirectional — if A links to B, B automatically links to A
4. Abbreviations, if provided, are also indexed for search and tooltips
5. The tooltip system renders the first sentence of the Definition as the tooltip text
6. Terms cannot be deleted if they are cross-linked by other terms (must unlink first)

### Lifecycle / Status Model

```
[Suggested] → [Draft] → [Published] → [Archived]
```

- **Suggested** — Submitted by a Viewer via the "Suggest" CTA; awaiting review
- **Draft** — Being defined by a Contributor or Admin
- **Published** — Active in the glossary; powers tooltips
- **Archived** — Removed from glossary but retained

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| View / Search | ✅ | ✅ | ✅ |
| Suggest | ✅ | ✅ | ✅ |
| Create / Edit | | ✅ | ✅ |
| Cross-link / Delete | | | ✅ |

---

## Object Guide: ORCA Step

**TL;DR:** An ORCA Step is one of the 12 steps in the 3-round ORCA process — each with an associated Skill and Template — that provides the structured methodology for object-oriented design.

### SIP Validation

| Criterion | Evidence |
|---|---|
| **Structure** | Number, name, round, pillar, description, inputs, outputs, skill, template, anti-pattern, ancient truth, sequencing |
| **Instances** | 01 Object Discovery, 02 NOM Builder… 12 Shapeshifter Matrix (12 total) |
| **Purpose** | Users navigate the process guide to understand the methodology and find the right step |

### Definition & Purpose

An **ORCA Step** is one of the 12 sequential steps in the ORCA process — organized into 3 rounds (Discovery, Prioritization, Representation) across 4 pillars (Objects, Relationships, CTAs, Attributes) — that defines what to do, what inputs are needed, and what artifact is produced.

### Instances & Examples

- **Step 02: NOM Builder** — Discovery Round, Relationships Pillar. Input: validated object list. Output: Nested-Object Matrix.
- **Step 09: Object Card Designer** — Representation Round, Objects Pillar. Fights the Masked Objects anti-pattern.
- **Step 07: CTA Prioritization** — Prioritization Round, CTAs Pillar. Produces P/S/T/Q force-ranked CTAs.

### Attributes

| Category | Attribute | Type | Required | Description |
|---|---|---|---|---|
| Identifiers | Step Number | Integer | Yes | 1–12, sequential |
| Identifiers | Name | String | Yes | Human-readable name |
| Classification | Round | Enum | Yes | Discovery, Prioritization, or Representation |
| Classification | Pillar | Enum | Yes | Objects, Relationships, CTAs, or Attributes |
| Content | Description | Text | Yes | What this step does and why |
| Content | Inputs | String[] | Yes | What's needed before this step |
| Content | Outputs | String[] | Yes | What this step produces |
| Content | Worked Example | Text (MD) | No | Example from a real project |
| Relationships | Associated Skill | Skill (link) | Yes | The skill that runs this step |
| Relationships | Associated Template | Template (link) | Yes | The template produced |
| Relationships | Previous Step | ORCA Step (link) | Conditional | Null for Step 1 |
| Relationships | Next Step | ORCA Step (link) | Conditional | Null for Step 12 |
| ORCA Context | Anti-Pattern Fought | String | Conditional | Representation steps only (9–12) |
| ORCA Context | Ancient Truth | String | Conditional | Representation steps only (9–12) |

### Nested Objects (from NOM)

- **Skill** — The associated skill ("Associated Skill" link/preview)
- **Template** — The artifact template ("Artifact Template" link/preview)
- **Blog Post** — Case studies covering this step ("Case Studies" list)
- **Glossary Term** — Key terms introduced at this step (inline tooltips + "Key Terms")

### CTAs

| CTA | Roles | Permission | Cross-Object | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the step detail page |
| Navigate Next/Prev | All | Read | → ORCA Step | Move to adjacent step |
| Run Skill | All | Read | → Skill | Launch associated skill |
| Download Template | All | Read | → Template | Download artifact template |
| View Examples | All | Read | → Blog Post | See case studies |
| Edit | Admin | Write | | Edit description, examples |
| Create | Admin | Write | | Add a step (rare) |
| Delete | Admin | Write | | Remove a step |

### Business Rules & Constraints

1. Step Numbers must be sequential (1–12) with no gaps
2. Each step must have exactly one Round and one Pillar
3. The ORCA grid is fixed at 3 rounds × 4 pillars = 12 steps
4. Every step must have an Associated Skill and Associated Template
5. Only Representation steps (9–12) have Anti-Pattern Fought and Ancient Truth
6. Previous/Next Step links must form a chain: 1→2→3→…→12
7. Creating or deleting steps (changing the ORCA grid) requires Admin approval and affects the entire process guide

### Lifecycle / Status Model

ORCA Steps have a **fixed lifecycle** — they don't go through draft/publish states. They are always published as long as they exist. The ORCA process is stable.

```
[Active] — the only state (always visible)
```

### Permissions & Visibility

| Action | Viewer | Contributor | Admin |
|---|:---:|:---:|:---:|
| View / Navigate / Run / Download | ✅ | ✅ | ✅ |
| Edit | | | ✅ |
| Create / Delete | | | ✅ (rare) |

---

## Cross-Object Observations

### Shared Attribute Patterns

| Pattern | Objects | Notes |
|---------|---------|-------|
| Created Date / Last Updated | All 6 | Standard system timestamps |
| Name / Title | All 6 | Primary identifier (Name for most, Title for Blog Post, Term for Glossary) |
| Description / Definition | All 6 | One-liner summary field |
| Status / Lifecycle | 5 of 6 | All except ORCA Step (always active) |
| Category / Type / Classification | All 6 | Enum-based grouping |

### Lifecycle Comparison

| Object | States | Key Transition |
|--------|--------|----------------|
| Skill | Draft → Published → Deprecated | Deprecation (replaced by newer version) |
| Object Definition | Draft → Published → Archived | Archive (removed from directory but retained) |
| Template | Draft → Published → Deprecated | Deprecation (replaced by newer version) |
| Blog Post | Draft → Published ⇄ Unpublished → Archived → Deleted | Publish requires Admin; reversible |
| Glossary Term | Suggested → Draft → Published → Archived | Suggestion (Viewer can propose) |
| ORCA Step | Active (always) | N/A — fixed process |

### Permission Tiers

| Tier | Objects | Pattern |
|------|---------|---------|
| **Read-only for all, Admin-only writes** | Skill, Template, ORCA Step | Content managed by site admins |
| **Contributor can create/edit, Admin approves** | Object Definition, Glossary Term | Community-contributed reference content |
| **Contributor creates, Admin publishes** | Blog Post | Editorial workflow with approval gate |

---

## Next Steps

→ **Step 6: MCSFD Specs** — Specify each of the 26 NOM relationships with Mechanics, Cardinality, Sorts, Filters, and Dependency.
