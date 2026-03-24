# Caboodle Page Blueprint

> **Status: Archived** — This document describes a static HTML page shell pattern (`caboodle/` directory, standalone `styles/main.css`) that was used before the site migrated to Next.js App Router. The layout principles (Every Layout primitives, modular scale tokens, section patterns) remain valid and are implemented in `packages/caboodle-site/styles/`. For current page creation guidance, see `docs/developer-guide.md` and the Page Builder skill.

> Checklist for creating consistent pages using the Caboodle layout system.

---

## Page Shell

Every Caboodle page uses this outer structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title — Caboodle</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
  <!-- Adjust path depth: styles/main.css (root), ../styles/main.css (1 level), ../../styles/main.css (2 levels) -->
  <link rel="stylesheet" href="styles/main.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="page">
  <header class="page-header">
    <!-- main-nav (copy from index.html) -->
  </header>

  <main>
    <!-- page content sections -->
  </main>

  <footer class="page-footer">
    <div class="center cluster" style="--justify: space-between">
      <span>&copy; 2026 Caboodle</span>
      <span>An OOUX resource site</span>
    </div>
  </footer>
</body>
</html>
```

---

## New Page Checklist

- [ ] **DOCTYPE + lang attribute** — `<!DOCTYPE html>` and `<html lang="en">`
- [ ] **Viewport meta** — `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] **Title** — format: `Page Name — Caboodle`
- [ ] **Font preconnect** — `fonts.googleapis.com` and `fonts.gstatic.com` preconnect links
- [ ] **Roboto font** — Google Fonts link for Roboto (400, 500, 700, italic)
- [ ] **Material Icons** — Google Fonts link for Material Icons
- [ ] **Stylesheet link** — `<link rel="stylesheet" href="styles/main.css">` (adjust relative path for page depth)
- [ ] **Body class** — `class="page"` on `<body>`
- [ ] **Header** — `<header class="page-header">` containing the shared nav
- [ ] **Main** — `<main>` as the primary content area
- [ ] **Footer** — `<footer class="page-footer">` with standard footer content
- [ ] **Sections** — wrap each content block in `<section class="section">`
- [ ] **Center** — use `.center` inside sections to constrain width
- [ ] **Stack** — use `.stack` to add vertical rhythm between elements
- [ ] **Prose** — use `.prose` on text-heavy containers for comfortable measure
- [ ] **Accessibility** — landmarks (`nav`, `main`, `header`, `footer`), `aria-label` where needed, `aria-current="page"` on active nav link

---

## Section Patterns

Most pages consist of repeating sections. Choose the right inner layout:

| Section Type       | Inner Layout                                   |
|--------------------|-------------------------------------------------|
| Text content       | `.center .stack .prose`                         |
| Card grid          | `.center .stack` → `.grid` (children: `.card`)  |
| Hero / intro       | `.cover .center` → `.cover-centered .stack`     |
| Sidebar + content  | `.center .with-sidebar` → `.sidebar` + `.not-sidebar` |
| Feature columns    | `.center .switcher` (2–4 children)              |
| Scrolling strip    | `.center` → `.reel`                             |
| Stats / icon row   | `.center .cluster`                              |

---

## Customizing Spacing

Override spacing per element with inline custom properties:

```html
<!-- Tighter card grid -->
<div class="grid" style="--space: var(--s-1); --min: 12rem">

<!-- Wider stack gaps in a hero -->
<div class="stack" style="--space: var(--s2)">

<!-- Narrow sidebar -->
<div class="with-sidebar" style="--sidebar-width: 14rem">
```

---

## Adding Page-Specific CSS

If a page needs styles beyond the layout system:

1. Prefer composing existing primitives before adding new CSS.
2. If truly needed, add a `<style>` block in the page `<head>` or create a page-specific file like `styles/page-objects.css` and import it in `main.css`.
3. Scope new classes to the page context (e.g., `.objects-comparison { … }`).
4. Never override layout primitive internals from page-level CSS.
