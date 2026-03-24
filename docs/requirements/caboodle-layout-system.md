# Caboodle Layout System

> A framework-agnostic layout toolkit built on [Every Layout](https://every-layout.dev/) principles.
> All primitives live in `styles/layouts.css` and are configured through CSS custom properties.

---

## Quick Reference — When to Use Which Layout

| I need to…                                              | Use            | Key property             |
|---------------------------------------------------------|----------------|--------------------------|
| Space elements vertically (headings, paragraphs, lists) | `.stack`        | `--space`                |
| Add padding inside a box                                | `.box`          | `--padding`              |
| Center a column of content                              | `.center`       | `--max-inline-size`      |
| Lay items out horizontally with wrapping (nav, tags)     | `.cluster`      | `--space`, `--justify`   |
| Create a fixed-width sidebar + fluid content            | `.with-sidebar` | `--sidebar-width`, `--content-min` |
| Switch from horizontal to vertical at a threshold       | `.switcher`     | `--threshold`            |
| Vertically center content within a tall container        | `.cover`        | `--min-height`           |
| Auto-fill a grid of equal-width cards                   | `.grid`         | `--min`, `--space`       |
| Constrain media to an aspect ratio                      | `.frame`        | `--ratio`                |
| Create a horizontal scrolling strip                     | `.reel`         | `--item-width`           |
| Center an overlay on a relative-positioned parent       | `.imposter`     | —                        |
| Size an inline icon and pair it with text               | `.icon` / `.with-icon` | `--space`         |
| Wrap the full page width                                | `.container`    | `--max-width`, `--gutter`|

---

## Design Tokens

Tokens live in `styles/tokens.css`. The spacing scale uses a **1.5 ratio (perfect fifth)** centered on `--s0: 1rem`:

```
--s-5  --s-4  --s-3  --s-2  --s-1  --s0  --s1  --s2  --s3  --s4  --s5
 tiny  ──────────────────────────────────────────────────────────  large
```

Use scale steps in custom properties:

```css
.my-section { --space: var(--s2); }
```

---

## Copy/Paste Examples

### Hero Section

```html
<section class="section">
  <div class="cover center" style="--min-height: 60vh">
    <div></div>
    <div class="cover-centered stack" style="--space: var(--s1)">
      <h1>Headline text</h1>
      <p class="prose">Supporting paragraph.</p>
      <div class="cluster">
        <a href="#">Primary CTA</a>
        <a href="#">Secondary CTA</a>
      </div>
    </div>
    <div></div>
  </div>
</section>
```

### Card Grid

```html
<section class="section">
  <div class="center stack">
    <h2>Section heading</h2>
    <div class="grid" style="--min: 18rem">
      <article class="card stack">
        <h3>Card title</h3>
        <p>Card description.</p>
      </article>
      <!-- repeat cards -->
    </div>
  </div>
</section>
```

### Sidebar Content

```html
<div class="center with-sidebar" style="--sidebar-width: 16rem">
  <aside class="sidebar stack">
    <nav aria-label="Section navigation">
      <!-- sidebar nav -->
    </nav>
  </aside>
  <div class="not-sidebar stack prose">
    <h2>Main content heading</h2>
    <p>Body text.</p>
  </div>
</div>
```

### Navigation Cluster

```html
<nav class="main-nav" aria-label="Primary">
  <a class="logo-link" href="/">
    <img src="logo.png" alt="">
    <span>Caboodle</span>
  </a>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/resources">Resources</a></li>
  </ul>
</nav>
```

### Horizontal Reel (scrolling cards)

```html
<div class="reel" style="--item-width: 20rem">
  <article class="card stack">…</article>
  <article class="card stack">…</article>
  <article class="card stack">…</article>
  <article class="card stack">…</article>
</div>
```

---

## Composing Layouts

Primitives stack and nest. A few common combos:

| Combo                         | Effect                                               |
|-------------------------------|------------------------------------------------------|
| `.center.stack`               | Centered column with vertical rhythm                 |
| `.section > .center.stack`    | Full-width section → centered, spaced content        |
| `.grid` inside `.center`      | Centered card grid                                   |
| `.cluster` inside `.card`     | Tag row or button group inside a card                |
| `.cover > .cover-centered`    | Vertically + horizontally centered hero block        |
| `.with-sidebar > .sidebar.stack` | Sidebar with stacked internal content             |

---

## Do / Avoid

### Do

- **Reuse** an existing layout primitive before writing one-off CSS.
- **Configure** via CSS custom properties on the element (inline `style` or a class override).
- **Nest** primitives to compose complex layouts from simple pieces.
- **Use the modular scale** (`--s0` through `--s5`) for all spacing.
- **Use logical properties** (`margin-block-start`, `inline-size`) for writing-mode safety.

### Avoid

- Magic-number spacing (`margin-top: 37px`). If a scale step doesn't fit, adjust the token, not the element.
- Fixed `@media` breakpoints for layout changes. Intrinsic sizing handles this.
- Overriding layout class internals from outside. Prefer adding a new composition.
- Adding `!important` to layout rules.
- Pixel-based widths on layout containers. Use `ch`, `rem`, or `%`.
