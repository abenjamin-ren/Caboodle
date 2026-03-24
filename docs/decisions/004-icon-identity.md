# ADR-004: Icon-Based Object Identity Over Color-Based

**Status:** Accepted
**Date:** 2025

## Context

The `design-system.md` requirement doc proposed a per-object identity system with 13 unique colors, avatar shapes (circle vs. rounded square), and 2-letter abbreviations. This was a detailed spec: Student = Royal Blue `#2563EB` circle, Class = Violet `#7C3AED` rounded square, etc.

Implementing 13 unique colors raised concerns:
- Accessibility: ensuring sufficient contrast for all 13 colors against both light and dark backgrounds
- Visual noise: 13 colors competing in a single grid view
- Scalability: adding domain objects would require more unique colors
- Brand alignment: the proposed palette hadn't been validated against Renaissance brand guidelines

## Decision

Use an **icon-based** identity system with three tiers instead of per-object colors:

| Icon | Object Type | Meaning |
|------|-------------|---------|
| `object_icon.svg` | Core object | A canonical, standalone object |
| `object-variation_icon.svg` | Variation | A contextual variant of a core object |
| `domain-object_icon.svg` | Domain object | A domain-specific specialization |

The icon itself communicates the object's tier. Object names and type badges provide additional differentiation.

## Consequences

- Three icon types scale to any number of objects without needing new colors
- Accessibility is simpler: fewer color combinations to validate
- The design-system.md structural category system (People, Container, Activity, Knowledge, Data/AI) remains valid for card layout differentiation — it just doesn't map to unique colors
- `ObjectIcon` component in the site resolves the correct icon based on `objectType`
- Trade-off: objects are less visually distinct at a glance than they would be with unique colors. The icon type badge and object name carry more of the differentiation load.
- The per-object color system remains documented in `design-system.md` as a possible future direction if accessibility and brand concerns are resolved
