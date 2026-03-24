# ADR-001: npm Workspaces Monorepo

**Status:** Accepted
**Date:** 2025

## Context

Caboodle has two distinct packages: a Next.js site and a Lit Web Component library. Both consume the same object data schema (`data/schema.ts`) and the same JSON object files (`data/objects/*.json`). They need to stay in sync as the data model evolves.

## Decision

Use a single repository with npm workspaces (`packages/*`) to manage both packages. The shared data layer lives at the repo root in `data/`.

## Consequences

- Both packages import from `data/schema.ts` directly, so type changes propagate immediately
- A single `npm install` at the root sets up both packages
- Root-level scripts (`npm run build`) can chain the WC build before the site build
- Contributors only need one clone and one set of tooling
- Trade-off: the root `package.json` must coordinate versions across packages
