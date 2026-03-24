# ADR-003: Every Layout for Page Composition

**Status:** Accepted
**Date:** 2025

## Context

Page layout needs to be responsive without a proliferation of media query breakpoints. The site displays object cards, data tables, and configuration panels across varying viewport widths.

## Decision

Adopt the Every Layout composition system. All page layout is built from a small set of primitives (`.stack`, `.box`, `.center`, `.cluster`, `.grid`, `.with-sidebar`, `.switcher`, `.cover`, `.frame`, `.reel`, `.imposter`, `.container`) configured via CSS custom properties.

## Consequences

- Layouts respond intrinsically based on content and available space — no `@media` breakpoints needed for layout
- New pages compose existing primitives rather than writing custom layout CSS
- Spacing uses a modular scale (`--s-5` through `--s5`) for consistency
- The `layouts.css` file is treated as infrastructure: never modified for page-specific needs
- Logical properties (`margin-block-start`, `padding-inline`) are used throughout for internationalization readiness
- Trade-off: developers must learn the primitive vocabulary, but the set is small and well-documented
