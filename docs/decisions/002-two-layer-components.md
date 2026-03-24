# ADR-002: Two-Layer Component Architecture (React + Lit)

**Status:** Accepted
**Date:** 2025

## Context

Caboodle serves two audiences: (1) internal users browsing the site, and (2) product teams across Renaissance who need to render objects in their own applications (Star, Freckle, myON, Nearpod, etc.). These product teams use different frameworks (React, Angular, Vue, vanilla JS).

## Decision

Use two component layers:

- **React components** (`packages/caboodle-site/components/`) for site-specific UI: navigation, tabs, data tables, configuration panels. These only run inside the Next.js site.
- **Lit Web Components** (`packages/object-components/src/`) for object representations: cards, rows, profiles, headers. These are framework-agnostic Custom Elements distributable as `@renaissance/object-components`.

## Consequences

- Product teams can `npm install @renaissance/object-components` and use `<ren-student-card>` in any framework
- The site uses React for everything it doesn't need to distribute
- Lit components use CSS custom properties for theming, which cross shadow DOM boundaries
- Two build systems are needed (Next.js for the site, Vite for the WC library)
- Developers need familiarity with both React and Lit patterns
