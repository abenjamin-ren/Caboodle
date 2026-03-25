# CTA Placement Designer — OOUX Resource Site

> **Status: Process artifact** — CTA placement zones for cards and detail pages. The P/S/T/Q zone model is referenced in `design-system.md` and partially visible in the View Inspector, which allows toggling CTA visibility per **object view** (per `objectViews` context).

**Project:** OOUX Resource Site (Internal Renaissance)

**Ancient Truth:** Humans act on objects through direct manipulation.
**Anti-Pattern Fought:** Broken Objects — objects users can see but can't act on directly.

This document maps each P/S/T/Q CTA to its exact placement on cards and detail pages, ensuring users can always act on objects right where they see them.

> **Scope Note:** This document covers CTA placement for the **6 resource site objects**. For the cross-product CTA placement framework covering the **13 core Renaissance objects** — including role-sensitive CTAs (Teacher vs. Student vs. Admin) and product-specific action placement — see [`design-system.md`](design-system.md), Section 5: CTA Placement Framework. The P/S/T/Q zone model and button style hierarchy defined below apply to both scopes.

---

## Placement Zones

Every card and detail page has defined zones where CTAs appear based on their priority:

### Card Zones

```
┌─────────────────────────────────────────┐
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  (color stripe)
│                                         │
│  [Avatar]  Name                 [ZONE T]│  ← T: icon buttons (bookmark, pin)
│            Description                  │
│                                         │
│  Attributes...                          │
│                                         │
│  ┌─────────┐  ┌─────────┐      [ZONE S]│  ← S: secondary button(s)
│  │ PRIMARY │  │ SECOND. │              │
│  └─────────┘  └─────────┘      [ZONE P]│  ← P: primary button
│                                         │
│  Stats footer                           │
└─────────────────────────────────────────┘
```

- **Zone P** — Bottom-left, solid fill button. Always visible.
- **Zone S** — Adjacent to Primary, outline buttons. Always visible.
- **Zone T** — Top-right corner or inline icons. Visible on hover or always as icon-only.
- **Zone Q** — Not on cards. Only in admin panels.

### Detail Page Zones

```
┌─────────────────────────────────────────────────────────┐
│  ← Back                                                 │
├─────────────────────────────────────────────────────────┤
│  [Avatar]  Name                                         │
│            Description  ·  Status badge                 │
│                                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───┐            │
│  │ PRIMARY │ │ SECOND. │ │ SECOND. │ │···│ ← overflow  │
│  └─────────┘ └─────────┘ └─────────┘ └───┘            │
│                                       [ZONE P/S + T]    │
├─────────────────────────────────────────────────────────┤
│  Tab bar...                                             │
├─────────────────────────────────────────────────────────┤
│  Content...                                             │
│                                          ┌─────────┐   │
│  Admin bar (if Admin):                   │ Q: Delete│   │
│                                          └─────────┘   │
│                                          [ZONE Q]       │
└─────────────────────────────────────────────────────────┘
```

- **Zone P** — Detail header, prominent solid button.
- **Zone S** — Detail header, adjacent outline buttons.
- **Zone T** — Overflow menu `···` in header, or icon buttons.
- **Zone Q** — Admin bar at bottom, or Settings panel. Red/danger styling.

---

## CTA Placement by Object

### Skill

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| Run in Cursor | **P** | Zone P — bottom-left, solid emerald | Header — large solid button with ▶ icon | Solid fill, emerald, bold |
| Copy Prompt | S | Zone S — adjacent to Primary, outline | Header — outline button with 📋 icon | Outline, emerald border |
| Download | S | Not on card (keep card focused) | Header — outline button with ⬇ icon | Outline, emerald border |
| View Template | T | Not on card | Overflow `···` or inline link in content | Ghost text link |
| View Step | T | Not on card | Overflow `···` or inline link in content | Ghost text link |
| Edit | T | Not on card | Overflow `···` (Admin only) | Ghost text, muted |
| Create | T | List page header "＋ Add Skill" button | List page — top-right solid button (Admin) | Solid fill, small |
| Delete | Q | Not on card | Admin bar — bottom, red outline | Red outline, danger |

### Object Definition

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| View | **P** | Entire card is clickable (implicit) | N/A — you're already viewing | Card click target |
| Compare | S | Zone S — outline button "Compare" | Header — outline button | Outline, blue border |
| Bookmark | S | Zone T — top-right ★ icon toggle | Header — ★ icon button | Icon only, fill on active |
| Export | T | Not on card | Overflow `···` menu | Ghost text |
| Edit | T | Not on card | Overflow `···` (Contributor/Admin) | Ghost text, muted |
| Create | T | List page header "＋ Add Object" | List page — top-right button (Contributor/Admin) | Solid fill, small |
| Tag Product | T | Not on card | Detail page admin section | Ghost text |
| Delete | Q | Not on card | Admin bar — bottom, red outline | Red outline, danger |

### Template

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| Download | **P** | Zone P — solid amber button "⬇ Download" | Header — large solid button with format selector | Solid fill, amber, bold |
| Copy | S | Zone S — outline button "📋 Copy" | Header — outline button | Outline, amber border |
| View Filled Example | S | Not on card (too long) | Tab or section in content area | Inline link or tab |
| View Skill | T | Not on card | Inline link in metadata section | Ghost text link |
| Edit | T | Not on card | Overflow `···` (Admin only) | Ghost text, muted |
| Create | T | List page header "＋ Add Template" | List page — top-right (Admin) | Solid fill, small |
| Delete | Q | Not on card | Admin bar — bottom, red outline | Red outline, danger |

### Blog Post

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| Read | **P** | Entire card is clickable (implicit) | N/A — you're already reading | Card click target |
| Share | S | Zone T — share icon (top-right) | Header — outline button with 🔗 icon | Icon button or outline |
| Comment | S | Not on card | Footer section — comment form | Inline form |
| Draft / Create | — | Blog index "＋ Write Post" button | N/A — this IS the creation action | Solid fill (Contributor+) |
| Edit | — | Not on card | Header — outline "✏ Edit" (Author/Admin) | Outline, muted |
| Publish | — | Not on card | Header — solid "Publish" (Admin, on Draft posts) | Solid fill, green |
| Feature | — | Not on card | Overflow `···` (Admin) | Ghost text |
| Unpublish | T | Not on card | Overflow `···` (Admin) | Ghost text |
| Archive | T | Not on card | Overflow `···` (Admin) | Ghost text, muted |
| Tag | T | Not on card | Edit mode — tag input field | Form field |
| Link Skill/Object/Template | T | Not on card | Edit mode — sidebar panels | Form controls |
| Delete | Q | Not on card | Admin bar — bottom, red | Red outline, danger |

### Glossary Term

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| Search | **P** | N/A — search bar at top of Glossary list page | N/A — search is the list page's primary UI | Search input field |
| View | — | Entire card is clickable (or tooltip) | N/A — you're viewing | Card/tooltip |
| Suggest | S | Glossary list page — "Suggest a Term" button | Detail page — "Suggest Correction" link | Outline, teal |
| Edit | — | Not on card | Header — outline "✏ Edit" (Contributor/Admin) | Outline, muted |
| Create | T | Glossary list page — "＋ Add Term" (Contributor+) | N/A | Solid fill, small |
| Cross-link | T | Not on card | Edit mode — related terms picker | Form control |
| Delete | Q | Not on card | Admin bar — bottom, red | Red outline, danger |

### ORCA Step

| CTA | Priority | Card Placement | Detail Page Placement | Button Style |
|---|:---:|---|---|---|
| Run Skill | **P** | Zone P — solid orange button "▶ Run Skill" | Header — large solid button | Solid fill, orange, bold |
| Download Template | S | Zone S — outline button "⬇ Template" | Header — outline button | Outline, orange border |
| Navigate Next/Prev | S | Not on card (cards are in the grid) | Header — ← → arrows at edges | Icon buttons, large |
| View Examples | T | Not on card | Section in content area | Inline section heading |
| Edit | T | Not on card | Overflow `···` (Admin) | Ghost text, muted |
| Create / Delete | Q | Not on card | Admin settings only | Red outline, danger |

---

## Button Style Guide (from P/S/T/Q)

| Priority | Style | Specs | Behavior |
|---|---|---|---|
| **Primary (P)** | Solid fill | Object identity color, white text, bold, `radius-sm`, `padding: 8px 16px` | Always visible, prominent |
| **Secondary (S)** | Outline | Object identity color border, transparent fill, color text, `radius-sm` | Always visible, less prominent |
| **Tertiary (T)** | Ghost / Icon | No border, muted text color, or icon-only with tooltip | In overflow menu `···` or icon bar |
| **Quaternary (Q)** | Danger outline | Red border, red text, hidden in admin panel | Only visible to Admins in admin zone |

---

## Anti-Pattern Audit: Broken Objects

| Object | Can users act directly from the card? | Can users act from the detail page? | Verdict |
|---|:---:|:---:|---|
| **Skill** | ✅ Run + Copy Prompt | ✅ Run + Copy + Download + more | Not broken |
| **Object Definition** | ✅ Click to View + Compare + Bookmark | ✅ Compare + Export + Edit + more | Not broken |
| **Template** | ✅ Download + Copy | ✅ Download + Copy + View Example + more | Not broken |
| **Blog Post** | ✅ Click to Read + Share | ✅ Read + Share + Comment + more | Not broken |
| **Glossary Term** | ✅ Click to View (or tooltip) | ✅ View + Suggest + Edit + more | Not broken |
| **ORCA Step** | ✅ Run Skill + Download Template | ✅ Run + Download + Navigate + more | Not broken |

**No Broken Objects** ✅ — Every object has at least one actionable CTA directly on its card. Users never have to navigate away from an object to act on it.

---

## Next Steps

→ **Step 12: Shapeshifter Matrix Builder** — Define how each object intentionally varies across contexts while maintaining identity; capture as **`objectViews`** in object JSON (`ListView` / `DetailView`).
