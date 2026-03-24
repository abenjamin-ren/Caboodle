# Requirements Status Index

Status of all requirement and specification documents in `docs/requirements/`. Last reviewed: March 2026.

## Status Key

- **Built** — Implemented and matches the current codebase
- **Partial** — Some aspects implemented, others remain planned
- **Planned** — Describes features or patterns not yet implemented
- **Archived** — Describes an approach that was superseded; kept for historical reference
- **Process** — ORCA process artifact (not an implementation spec)

## Site Infrastructure & Architecture

| Document | Description | Status | Notes |
|----------|-------------|--------|-------|
| [caboodle-layout-system.md](caboodle-layout-system.md) | Every Layout primitives and modular scale tokens | **Built** | Accurately describes `layouts.css` and `tokens.css` |
| [caboodle-page-blueprint.md](caboodle-page-blueprint.md) | Static HTML page shell and section patterns | **Archived** | Replaced by Next.js App Router; kept for historical reference |
| [caboodle-site-outline.md](caboodle-site-outline.md) | Product vision, major sections, phasing | **Partial** | Phase 0 (Object Library, Object Guides) mostly built; later phases (Blog, CMS, backend) remain planned |
| [engineering-handoff.md](engineering-handoff.md) | As-built architecture and roadmap | **Partial** | Best "as-built" doc but needs updates for system-based routing and WC library rebuild status |

## Object Directory & Components

| Document | Description | Status | Notes |
|----------|-------------|--------|-------|
| [design-system.md](design-system.md) | Object identity, card recipes, shapeshifter variants, token exports | **Partial** | Proposes per-object colors; implementation chose icon-based identity instead (see ADR-004). Shape system and token architecture sections remain relevant |
| [object-guide-page.md](object-guide-page.md) | Object Guide UI spec (tabs, showcases, tables) | **Partial** | Tab structure and data tables match implementation; path references and some tab names are outdated |
| [object-data-template.md](object-data-template.md) | Template for authoring `{slug}.json` files | **Built** | Still the correct guide for creating object data files |
| [student-roster-list.md](student-roster-list.md) | Student row component for class roster context | **Partial** | RosterRing, RosterScoreColumn, RosterOverflowMenu, and StudentRosterPreview exist; row component is `ren-student-row.ts` in WC library |

## Navigation & Information Architecture

| Document | Description | Status | Notes |
|----------|-------------|--------|-------|
| [10-nav-flow.md](10-nav-flow.md) | Navigation architecture, page types, user flows | **Partial** | Global nav structure doesn't match current MainNav; system-based Object Library routing not reflected |

## ORCA Process Artifacts (Site Meta-Objects)

These documents record the ORCA process applied to Caboodle's own information model — six meta-objects (Skill, Object Definition, Template, Blog Post, Glossary Term, ORCA Step) that describe the site's content types. They are design artifacts, not direct implementation specs.

| Document | Description | Status | Notes |
|----------|-------------|--------|-------|
| [orca-plan.md](orca-plan.md) | ORCA program plan for site meta-objects | **Process** | All 12 steps marked complete; path references use old static `caboodle/` paths |
| [01-object-discovery.md](01-object-discovery.md) | Noun foraging and SIP validation for 6 site objects | **Process** | Object Definition implemented as Object Library; Glossary, Blog Post remain planned |
| [02-nom.md](02-nom.md) | Nested-Object Matrix for 6 site objects | **Process** | Object nesting partially reflected in Object Guide tabs |
| [03-cta-matrix.md](03-cta-matrix.md) | CTA inventory (54 CTAs across Viewer/Contributor/Admin) | **Process** | Viewer CTAs partially implemented; Contributor/Admin CTAs require backend |
| [04-object-map.md](04-object-map.md) | Attribute map for 6 site objects (82 attributes) | **Process** | Attribute structure reflected in `data/schema.ts` for object data |
| [05-object-guides.md](05-object-guides.md) | Prioritized Object Guides for 6 site objects | **Process** | Object Definition Guide fully implemented; others are stubs or planned |
| [06-mcsfd-specs.md](06-mcsfd-specs.md) | MCSFD relationship specs for 12 pairs | **Process** | Relationship display implemented in Object Guide Relationships tab |
| [07-cta-prioritization.md](07-cta-prioritization.md) | P/S/T/Q rankings for all site CTAs | **Process** | CTA priority data stored in object JSON; UI display in Actions tab |
| [08-attribute-prioritization.md](08-attribute-prioritization.md) | Force-ranked attributes for card/detail views | **Process** | Attribute rankings reflected in `shapeshifterMatrix` entries |
| [09-object-cards.md](09-object-cards.md) | Object card designs and library layout | **Process** | Object Library uses system-based card grid; icon identity system adopted |
| [11-cta-placement.md](11-cta-placement.md) | CTA zone placement on cards and detail pages | **Process** | Zone model referenced in design-system.md; partially visible in View Inspector |
| [12-shapeshifter-matrix.md](12-shapeshifter-matrix.md) | Variant matrix for consistent object display | **Process** | Shapeshifter data in object JSON; View Inspector shows per-context views |

## Summary

| Status | Count |
|--------|-------|
| Built | 2 |
| Partial | 6 |
| Planned | 0 |
| Archived | 1 |
| Process | 12 |
| **Total** | **21** |
