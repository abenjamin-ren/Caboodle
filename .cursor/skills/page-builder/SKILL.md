# Page Builder Skill

Build new pages for the Caboodle Next.js site.

## Prerequisites

- Read `AGENTS.md` for project structure and conventions
- Read `docs/requirements/caboodle-page-blueprint.md` for page shell patterns
- Read `docs/requirements/caboodle-layout-system.md` for Every Layout primitives

## Steps

1. **Identify the route** — Determine the URL path (e.g., `/resources/skills`)
2. **Create the page file** — `packages/caboodle-site/app/{route}/page.tsx`
3. **Set metadata** — Export `metadata` with title following the `%s — Caboodle` template
4. **Use the page shell** — The root layout provides header, nav, and footer. Pages only render `<main>` content.
5. **Apply layout primitives** — Use CSS classes from `styles/layouts.css` (stack, center, cluster, grid, etc.)
6. **Add to nav if needed** — Update `components/nav/MainNav.tsx` NAV_ITEMS array

## Page template

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page Name' };

export default function PageName() {
  return (
    <section className="section">
      <div className="center stack">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)' }}>Page Title</h1>
        <p className="prose">Page description.</p>
      </div>
    </section>
  );
}
```

## Layout primitives reference

| Primitive | Class | Purpose |
|-----------|-------|---------|
| Stack | `.stack` | Vertical spacing between siblings |
| Center | `.center` | Centered column with max-width |
| Cluster | `.cluster` | Horizontal wrapping group |
| Grid | `.grid` | Auto-filling equal-width columns |
| Sidebar | `.with-sidebar` | Fixed sidebar + fluid content |
| Switcher | `.switcher` | Horizontal row that stacks below threshold |
| Cover | `.cover` | Vertically centered content |

Configure via inline `style` with CSS custom properties, e.g., `style={{ '--space': 'var(--s2)' } as React.CSSProperties}`.
