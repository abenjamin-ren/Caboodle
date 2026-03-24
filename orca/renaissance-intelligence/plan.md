---
project: "Renaissance Intelligence Prototype"
goal: "New Feature / Product"
depth: "Comprehensive"
status: "in_progress"
current_step: 1
created: 2026-03-18
updated: 2026-03-18
---

# ORCA Plan: Renaissance Intelligence Prototype

**Goal:** Build a functional prototype demonstrating the end-to-end educator experience across all 26 Renaissance objects with mock data.

**Depth:** Comprehensive — full ORCA cycle applied to prototype definition, mock data creation, and implementation.

**Status:** In Progress — Step 1 of 8

---

## Progress

| # | Skill | Description | Effort | Status |
|---|-------|------------|--------|--------|
| 1 | Prototype Requirements | Draft detailed prototype requirements doc from existing object data | 2 hr | ✅ Completed |
| 2 | Mock Data Generation | Create realistic mock data for all 26 objects following the data strategy | 4 hr | ⬜ Not started |
| 3 | Route Scaffolding | Set up Next.js App Router routes for all prototype screens | 2 hr | ⬜ Not started |
| 4 | Dashboard + Home | Build the Home dashboard with onboarding, insights, classes, activity feed | 3 hr | ⬜ Not started |
| 5 | Class Detail + Skills Grid | Build the Class detail page with all tabs including the Skills Grid | 4 hr | ⬜ Not started |
| 6 | Student Detail | Build the Student detail page with all tabs | 3 hr | ⬜ Not started |
| 7 | Assessment + Resource + Reports | Build assessment management, resource library, and report views | 4 hr | ⬜ Not started |
| 8 | Admin + Onboarding + Academy | Build admin views, onboarding flow, and academy catalog | 3 hr | ⬜ Not started |

---

## Reuse Opportunities

- All 26 object JSON files in `data/objects/` provide complete attribute, CTA, and relationship data — no new ORCA Discovery needed
- 127+ Lit Web Components in `packages/object-components/` already implement card, row, profile, header, and data-row shapes for all objects
- Existing React components (Tabs, DataTable, ConfigPanel, CodeBlock) from `packages/caboodle-site/components/` can be reused
- CSS design system (tokens, layouts, components) is fully established
- Shapeshifter matrices in each object JSON define exactly which attributes and CTAs appear in each context

## Source Materials

- [Prototype Requirements](prototype-requirements.md) — Detailed screen specs, IA, mock data strategy
- [Object Data](../../data/objects/) — 26 object JSON files with full OOUX data
- [Data Schema](../../data/schema.ts) — Shared TypeScript types
- [Design System](../../docs/requirements/design-system.md) — Visual design reference

## Artifacts Created

| Artifact | Path |
|----------|------|
| Prototype Requirements | `orca/renaissance-intelligence/prototype-requirements.md` |
| ORCA Plan | `orca/renaissance-intelligence/plan.md` |
