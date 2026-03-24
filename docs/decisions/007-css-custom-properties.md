# ADR-007: CSS Custom Properties Over Tailwind/CSS-in-JS

**Status:** Accepted
**Date:** 2025

## Context

The project needed a styling approach that works across two layers: React components in the Next.js site and Lit Web Components with shadow DOM. Tailwind CSS and CSS-in-JS (styled-components, Emotion) are popular options but have constraints:

- Tailwind utility classes don't penetrate shadow DOM boundaries
- CSS-in-JS solutions are framework-specific and add runtime overhead
- Both add build dependencies and increase bundle size

## Decision

Use plain CSS with CSS custom properties (variables) for all theming and configuration:

- `tokens.css` defines the design token vocabulary (`--color-*`, `--font-*`, `--s-*`)
- `layouts.css` uses custom properties for primitive configuration (`--space`, `--min-width`)
- `components.css` uses tokens and primitives for site-specific styling
- Lit Web Components define `--ren-*` properties that fall back to the page-level tokens

## Consequences

- Custom properties cross shadow DOM boundaries, so Lit components inherit the site's theme automatically
- No build-time CSS processing beyond what Next.js provides by default
- Token changes propagate everywhere — update one variable, affect all usages
- Any consumer of the WC library can re-theme components by setting outer custom properties
- The modular scale ensures consistent spacing without memorizing arbitrary pixel values
- Trade-off: no utility class shortcuts — all styling requires writing actual CSS rules
- Trade-off: `components.css` is large (~4000+ lines) since all component styles live in one file
