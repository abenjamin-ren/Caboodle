# CTA Matrix — OOUX Resource Site

> **Status: Process artifact** — CTA inventory for Caboodle's six meta-objects across Viewer/Contributor/Admin roles. Viewer CTAs (browse, view, navigate) are partially implemented in the Object Library and Object Guide pages. Contributor and Admin CTAs (create, edit, publish) require backend infrastructure planned for future phases.

**Project:** OOUX Resource Site (Internal Renaissance)

---

## User Roles

| Role | Who | Scope |
|------|-----|-------|
| **Viewer** | Any Renaissance employee | Browse, read, download, search |
| **Contributor** | Practitioners who publish content | Write blog posts, suggest glossary terms, submit object definitions |
| **Admin** | Site maintainers | Full CRUD on everything, publish/unpublish, manage site settings |

---

## CTA Matrix

### Skill

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the skill description, steps, and examples |
| Copy Prompt | All | Read | | Copy a starter prompt to clipboard |
| Run in Cursor | All | Read | | Deep link or instruction to invoke skill in Cursor |
| Download | All | Read | | Download the `.md` skill file |
| View Template | All | Read | ✓ → Template | Navigate to this skill's artifact template |
| View Step | All | Read | ✓ → ORCA Step | Navigate to the associated ORCA step |
| Edit | Admin | Write | | Edit skill description, prompts, metadata |
| Create | Admin | Write | | Add a new skill to the directory |
| Delete | Admin | Write | | Remove a skill |

### Object Definition

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the full object guide |
| Compare | All | Read | ✓ → Object Definition | Side-by-side comparison with another object |
| Export | All | Read | | Export as JSON, Markdown, or CSV |
| Bookmark | All | Read | | Save to personal favorites |
| Create | Contributor, Admin | Write | | Submit a new object definition |
| Edit | Contributor, Admin | Write | | Modify attributes, CTAs, relationships |
| Delete | Admin | Write | | Remove an object from the directory |
| Tag Product | Admin | Write | | Associate object with a Renaissance product |

### Template

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| View / Preview | All | Read | | See the template with instructions |
| Download | All | Read | | Download in Markdown, PDF, or Google Doc |
| Copy | All | Read | | Copy template content to clipboard |
| View Filled Example | All | Read | | See a real completed version |
| View Skill | All | Read | ✓ → Skill | Navigate to the skill that uses this template |
| Create | Admin | Write | | Add a new template |
| Edit | Admin | Write | | Update template content or metadata |
| Delete | Admin | Write | | Remove a template |

### Blog Post

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| Read | All | Read | | Read the full article |
| Share | All | Read | | Copy link, share internally |
| Comment | All | Write | | Leave a comment or question |
| Create / Draft | Contributor, Admin | Write | | Author a new blog post or case study |
| Edit | Author, Admin | Write | | Modify an existing post |
| Publish | Admin | Write | | Move from Draft → Published |
| Unpublish | Admin | Write | | Revert to draft status |
| Feature | Admin | Write | | Pin post as featured/hero |
| Tag | Author, Admin | Write | | Add tags and categories |
| Archive | Admin | Write | | Remove from active listing, keep accessible |
| Delete | Admin | Write | | Permanently remove |
| Link Skill | Author, Admin | Write | ✓ → Skill | Associate skills referenced in the post |
| Link Object | Author, Admin | Write | ✓ → Object Def | Associate objects discussed in the post |
| Embed Template | Author, Admin | Write | ✓ → Template | Show a template artifact inline |

### Glossary Term

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the definition |
| Search | All | Read | | Search/filter glossary |
| Suggest | All | Write | | Suggest a new term or correction |
| Create | Contributor, Admin | Write | | Add a new glossary term |
| Edit | Contributor, Admin | Write | | Update definition or cross-links |
| Cross-link | Admin | Write | ✓ → Glossary Term | Link related terms |
| Delete | Admin | Write | | Remove a term |

### ORCA Step

| CTA (Verb) | Roles | Permission | Cross-Object? | Notes |
|---|---|---|---|---|
| View | All | Read | | Read the step detail page |
| Navigate Next/Prev | All | Read | ✓ → ORCA Step | Move to adjacent step in the process |
| Run Skill | All | Read | ✓ → Skill | Launch the associated skill |
| Download Template | All | Read | ✓ → Template | Download the step's artifact template |
| View Examples | All | Read | ✓ → Blog Post | See case studies that cover this step |
| Edit | Admin | Write | | Edit step description, examples |
| Create | Admin | Write | | Add a new step (rare — only if ORCA evolves) |
| Delete | Admin | Write | | Remove a step |

---

## Summary

| Object | Total CTAs | Viewer CTAs | Contributor CTAs | Admin CTAs | Cross-Object CTAs |
|---|:---:|:---:|:---:|:---:|:---:|
| **Skill** | 9 | 6 | 6 | 9 | 2 |
| **Object Definition** | 8 | 4 | 6 | 8 | 1 |
| **Template** | 8 | 5 | 5 | 8 | 1 |
| **Blog Post** | 14 | 3 | 7 | 14 | 3 |
| **Glossary Term** | 7 | 3 | 5 | 7 | 1 |
| **ORCA Step** | 8 | 5 | 5 | 8 | 4 |
| **Totals** | **54** | **26** | **34** | **54** | **12** |

---

## Key Observations

1. **Blog Post has the most CTAs (14)** — consistent with it being the NOM super-hub. The richest interaction surface, especially for Contributors and Admins.

2. **ORCA Step has the most cross-object CTAs (4)** — it's a natural launchpad, linking users to skills, templates, and examples.

3. **No broken objects** ✅ — every object has at least 3 Viewer-accessible CTAs. Users can always act on what they see.

4. **Viewer CTAs are predominantly Read + Copy/Download** — makes sense for an internal reference site. Viewers consume; Contributors create.

5. **Admin is the only role that can delete** — standard safety pattern for an internal tool.

6. **Cross-object CTAs (12 total)** reveal navigation and interaction hotspots — Blog Post authoring involves the most cross-object linking (3), reinforcing its super-hub role from the NOM.

---

## Next Steps

→ **Step 4: Object Map** — Forage for attributes and create a visual overview of all objects and their connections.
