# ADR-005: System-Based Routing for Object Library

**Status:** Accepted
**Date:** 2026

## Context

The original site outline and ORCA process artifacts described a flat Object Library at `/objects/:slug`. As the object count grew to 26 (13 core + domain objects across multiple products), a flat list became unwieldy. Objects naturally belong to product systems — some are shared across all products, others are specific to Renaissance Intelligence, Nearpod, Freckle, etc.

## Decision

Use system-based nested routing:

```
/objects                          → System catalog
/objects/[systemSlug]             → Objects in one system
/objects/[systemSlug]/[objectSlug] → Object Guide
/objects/.../views/[viewSlug]     → View Inspector
```

Systems are derived at build time from each object's `identity.products` field via `lib/systems.ts`. `SYSTEM_META` provides display metadata (name, description, owner) for known systems.

## Consequences

- Objects are organized by product context, making the library navigable at scale
- Adding a new object to a system requires only setting `identity.products` in its JSON — no route changes needed
- New systems emerge automatically when an object references a new product name
- URLs communicate context: `/objects/renaissance-intelligence/insight` is more informative than `/objects/insight`
- `generateStaticParams` crosses all systems × objects to produce static paths
- Trade-off: URLs are longer and the routing structure is more complex than flat `/objects/:slug`
- Trade-off: objects that belong to multiple systems appear under each one, which could cause confusion
