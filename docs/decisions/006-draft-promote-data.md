# ADR-006: Draft-Then-Promote Data Workflow

**Status:** Accepted
**Date:** 2025

## Context

ORCA is an iterative design process. Artifacts go through multiple rounds of drafting, review, and refinement before they're considered final. Object definitions, CTAs, attributes, and relationships all evolve during ORCA sessions. Writing directly to the published data files (`data/objects/*.json`) during iteration would create instability — half-finished changes would immediately affect the site.

## Decision

Use a two-layer data model:

1. **ORCA workspace** (`orca/{project-name}/`) — iterative drafts as markdown files. Each file tracks status in YAML frontmatter: `draft` → `confirmed` → `promoted`.
2. **Published data** (`data/objects/*.json`) — the source of truth for the site. Only updated via the `orca-promote` skill when artifacts are confirmed.

## Consequences

- ORCA sessions can iterate freely without affecting live data
- The promotion step is an explicit checkpoint — artifacts must be confirmed before syncing
- Workspace files serve as an audit trail of the design process
- The site always reflects the latest promoted state, not work-in-progress
- Trade-off: there's a manual step between design work and published data
- Trade-off: workspace artifacts and published JSON can drift if promotion is delayed
