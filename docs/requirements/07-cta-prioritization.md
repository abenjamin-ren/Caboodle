# CTA Prioritization (P/S/T/Q) — OOUX Resource Site

> **Status: Process artifact** — P/S/T/Q rankings for Caboodle's site CTAs. CTA priority data is stored in object JSON files and displayed in the Object Guide Actions tab via `CTATable`.

**Project:** OOUX Resource Site (Internal Renaissance)

Every CTA from the CTA Matrix is force-ranked into one of four tiers. This ranking directly determines button style and UI placement in the Representation Round.

- **P — Primary**: The single most important action. Prominent solid button, always visible.
- **S — Secondary**: Important but not the main action. Visible but lighter (outline button).
- **T — Tertiary**: Occasional action. Hidden in overflow menu or detail page only.
- **Q — Quaternary**: Rare or admin-only. Buried in settings or admin panel.

**Rule:** Only ONE Primary CTA per object per role context.

---

## Skill

| CTA | Viewer | Contributor | Admin | Notes |
|---|:---:|:---:|:---:|---|
| **Run in Cursor** | **P** | **P** | **P** | The core action — practitioners come to Skills to use them |
| Copy Prompt | S | S | S | Quick shortcut, supports the primary action |
| View | — | — | — | Implicit (you're already on the page) |
| Download | S | S | S | Get the skill file for offline/project use |
| View Template | T | T | T | Navigate to related template |
| View Step | T | T | T | Navigate to ORCA Step context |
| Edit | — | — | S | Admin editing is a regular task |
| Create | — | — | T | Rare — new skills added infrequently |
| Delete | — | — | Q | Rare and dangerous |

**Summary:** Run in Cursor is the clear Primary. Copy Prompt and Download support it as Secondary. Navigation links are Tertiary.

---

## Object Definition

| CTA | Viewer | Contributor | Admin | Notes |
|---|:---:|:---:|:---:|---|
| **View** | **P** | **P** | **P** | The core action — users come to read the guide |
| Compare | S | S | S | Powerful feature for understanding object differences |
| Export | T | T | T | Occasional need for offline reference |
| Bookmark | S | S | S | Save for quick return visits |
| Edit | — | S | S | Contributors refine definitions regularly |
| Create | — | T | T | Adding new objects is occasional |
| Delete | — | — | Q | Rare and impacts the whole system |
| Tag Product | — | — | T | Admin maintenance task |

**Summary:** View is Primary — users come to the directory to read. Compare and Bookmark are Secondary for power users.

---

## Template

| CTA | Viewer | Contributor | Admin | Notes |
|---|:---:|:---:|:---:|---|
| **Download** | **P** | **P** | **P** | The core action — practitioners come to get the template |
| View / Preview | — | — | — | Implicit (you're on the page; preview is inline) |
| Copy | S | S | S | Quick clipboard copy as alternative to download |
| View Filled Example | S | S | S | Helps users understand how to fill it in |
| View Skill | T | T | T | Navigate to associated skill |
| Edit | — | — | S | Admin maintains templates |
| Create | — | — | T | New templates added with new skills |
| Delete | — | — | Q | Rare |

**Summary:** Download is the clear Primary — templates exist to be downloaded and used. Copy and View Example are Secondary.

---

## Blog Post

### Reader Context (Viewer)

| CTA | Viewer | Notes |
|---|:---:|---|
| **Read** | **P** | Implicit — you're on the page reading |
| Share | S | Share the post internally |
| Comment | S | Engage with the content |

### Author Context (Contributor)

| CTA | Contributor | Notes |
|---|:---:|---|
| **Create / Draft** | **P** | The core contributor action |
| Edit | S | Refine existing content |
| Tag | T | Add metadata after writing |
| Link Skill | T | Cross-reference (during editing) |
| Link Object | T | Cross-reference (during editing) |
| Embed Template | T | Cross-reference (during editing) |

### Admin Context

| CTA | Admin | Notes |
|---|:---:|---|
| **Publish** | **P** | The key editorial gate — move drafts to live |
| Edit | S | Make corrections |
| Feature | S | Curate the featured post |
| Unpublish | T | Revert to draft |
| Tag | T | Add/change metadata |
| Archive | T | Retire old content |
| Delete | Q | Permanent removal |
| Link Skill / Object / Template | T | Cross-references |

**Summary:** Blog Post has context-dependent Primaries: Read (Viewer), Draft (Contributor), Publish (Admin). This reflects the editorial workflow.

---

## Glossary Term

| CTA | Viewer | Contributor | Admin | Notes |
|---|:---:|:---:|:---:|---|
| **Search** | **P** | **P** | **P** | The core action — users come to find definitions quickly |
| View | — | — | — | Implicit when reading a term |
| Suggest | S | S | S | Any user can suggest new terms |
| Edit | — | S | S | Contributors refine definitions |
| Create | — | T | T | Adding terms is occasional |
| Cross-link | — | — | T | Admin curates term relationships |
| Delete | — | — | Q | Rare |

**Summary:** Search is Primary — the glossary is primarily a lookup tool. Suggest is Secondary to encourage community contribution.

---

## ORCA Step

| CTA | Viewer | Contributor | Admin | Notes |
|---|:---:|:---:|:---:|---|
| **Run Skill** | **P** | **P** | **P** | The core action — go from understanding to doing |
| View | — | — | — | Implicit (you're on the page) |
| Download Template | S | S | S | Get the artifact template for this step |
| Navigate Next/Prev | S | S | S | Move through the process sequentially |
| View Examples | T | T | T | Browse case studies (less urgent than doing) |
| Edit | — | — | S | Admin maintains step content |
| Create | — | — | Q | Adding steps changes the ORCA grid (very rare) |
| Delete | — | — | Q | Removing steps changes the ORCA grid (very rare) |

**Summary:** Run Skill is Primary — the ORCA process guide exists to get practitioners into action. Download Template and Navigate are Secondary navigation aids.

---

## P/S/T/Q Summary Table

| Object | Primary (P) | Secondary (S) | Tertiary (T) | Quaternary (Q) |
|---|---|---|---|---|
| **Skill** | Run in Cursor | Copy Prompt, Download | View Template, View Step, Create | Delete |
| **Object Definition** | View | Compare, Bookmark | Export, Create, Tag Product | Delete |
| **Template** | Download | Copy, View Example | View Skill, Create | Delete |
| **Blog Post** | Read / Draft / Publish (by role) | Share, Comment, Edit, Feature | Tag, Link, Embed, Unpublish, Archive | Delete |
| **Glossary Term** | Search | Suggest, Edit | Create, Cross-link | Delete |
| **ORCA Step** | Run Skill | Download Template, Navigate | View Examples, Edit | Create, Delete |

### Counts by Tier

| Tier | Count | Pattern |
|---|:---:|---|
| **Primary** | 6 (one per object) | The single "reason you're here" action |
| **Secondary** | 16 | Supporting actions visible on cards and detail headers |
| **Tertiary** | 18 | Contextual actions in overflow menus or detail sections |
| **Quaternary** | 8 | Admin-only destructive or rare structural changes |

### Key Insights

1. **Every Primary is about the object's core purpose**: Run (Skill), View (Object Def), Download (Template), Read/Draft/Publish (Blog Post), Search (Glossary), Run Skill (ORCA Step). The P/S/T/Q ranking directly mirrors the site's value proposition.

2. **Delete is universally Quaternary** — destructive actions are always buried. This is consistent across all 6 objects.

3. **Blog Post is the only object with role-dependent Primaries** — Viewers Read, Contributors Draft, Admins Publish. This reflects its unique editorial workflow.

4. **Navigation CTAs are consistently Tertiary** — "View Template," "View Skill," etc. are support links, not primary actions. Users don't come to a Skill page to navigate to a Template; they come to run the Skill.

5. **"Edit" is Secondary for Admins, Tertiary or absent for others** — editing is a regular admin task but not the primary purpose of any object's page.

---

## Next Steps

→ **Step 8: Attribute Prioritization** — Force-rank attributes to determine what appears on cards vs. detail pages only.
