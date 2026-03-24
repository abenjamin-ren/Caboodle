# MCSFD Relationship Specifications — OOUX Resource Site

> **Status: Process artifact** — MCSFD relationship specs for 12 pairs of Caboodle's meta-objects. Relationship display is implemented in the Object Guide Relationships tab using the MCSFD spec format from `data/schema.ts`.

**Project:** OOUX Resource Site (Internal Renaissance)

Each relationship from the NOM is specified across 5 lenses: **M**echanics, **C**ardinality, **S**orts, **F**ilters, **D**ependency ("My Cat Saving Fire Department").

The NOM has 26 nesting cells across 12 unique object pairs. Relationships are specified per pair, noting directionality.

---

## 1. Skill ↔ ORCA Step

**NOM:** Skill nests ORCA Step ✅ · ORCA Step nests Skill ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (1:1 mapping)** — Each Core Skill is permanently linked to its ORCA Step. Supporting Skills (s1–s10) have no Step. The link is system-defined, not user-created. |
| **Cardinality** | **1:1** — One Core Skill maps to exactly one ORCA Step, and vice versa. Supporting Skills have zero Steps. |
| **Sorts** | Default: **Step Number (ascending)**. No user-configurable sort needed — the order is fixed by the ORCA process (1–12). |
| **Filters** | On Skill page: no filter needed (single Step link). On ORCA Step page: no filter needed (single Skill link). |
| **Dependency** | **Required (bidirectional)** — A Core Skill cannot exist without an ORCA Step, and an ORCA Step cannot exist without a Skill. Deleting either requires Admin approval and updating the other. Supporting Skills are independent. |

---

## 2. Skill ↔ Template

**NOM:** Skill nests Template ✅ · Template nests Skill ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Manual (Admin-configured)** — Admin links a Template to a Skill when creating/editing either. The link represents "this Skill produces this Template's artifact." |
| **Cardinality** | **1:1** — One Skill produces one Template, and one Template is produced by one Skill. (Some Supporting Skills may not have a template.) |
| **Sorts** | N/A — single item on each side. Displayed as a direct link, not a list. |
| **Filters** | N/A — single item. |
| **Dependency** | **Optional** — A Skill can exist without a Template (especially Supporting Skills). A Template requires an associated Skill. Deleting a Template leaves the Skill intact; deleting a Skill orphans its Template (Admin warned). |

---

## 3. Skill ↔ Blog Post

**NOM:** Skill nests Blog Post ✅ · Blog Post nests Skill ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Manual** — Authors tag Skills when writing a Blog Post ("Link Skill" CTA). The reverse view is auto-generated: Skill pages show all posts that reference them. |
| **Cardinality** | **Many:Many** — A Blog Post can reference multiple Skills; a Skill can be mentioned in many Blog Posts. Typical: 1–4 Skills per post. |
| **Sorts** | On Skill page ("Case Studies" list): **Publish Date (newest first)**. On Blog Post ("Skills Used" sidebar): **Step Number (ascending)** to show process order. |
| **Filters** | On Skill page: filter Blog Posts by Category (Case Study, Article, Tutorial). On Blog Post: no filter needed (small sidebar list). |
| **Dependency** | **Optional (both directions)** — Skills exist without Blog Posts. Blog Posts exist without Skills. Deleting a Blog Post removes the link; Skill is unaffected. Deleting a Skill removes references from Blog Posts (soft unlink). |

---

## 4. Skill ↔ Glossary Term

**NOM:** Skill nests Glossary Term ✅ · Glossary Term nests Skill ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (text scanning)** — The system scans Skill descriptions for known Glossary Terms and auto-links them for tooltip rendering. Admins can manually add/remove links. |
| **Cardinality** | **Many:Many** — A Skill references many terms (typically 5–15). A term appears in many Skills. |
| **Sorts** | On Skill page ("Key Terms" section): **Alphabetical by Term**. On Glossary Term page ("Used in Skills"): **Step Number (ascending)**. |
| **Filters** | On Skill page: filter terms by Category (Core Concept, Anti-Pattern, etc.). On Glossary page: no filter for Skill links. |
| **Dependency** | **Optional (both directions)** — Neither depends on the other for existence. Deleting a Glossary Term removes tooltips from Skill pages. Deleting a Skill removes it from the term's "Used in" list. |

---

## 5. Template ↔ ORCA Step

**NOM:** Template nests ORCA Step ✅ · ORCA Step nests Template ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (via Skill)** — Template and ORCA Step are linked through their shared Skill. If Template→Skill and Skill→ORCA Step, then Template→ORCA Step is inferred. Admin can override. |
| **Cardinality** | **1:1** — One Template maps to one ORCA Step (via the Skill), and vice versa. |
| **Sorts** | N/A — single item on each side. Displayed as a direct link. |
| **Filters** | N/A — single item. |
| **Dependency** | **Optional** — A Template can exist without an explicit Step link (it gets it via Skill). An ORCA Step requires a Template. Cascade: if the Template is deleted, the Step's "Download Template" CTA breaks (Admin warned). |

---

## 6. Template ↔ Blog Post

**NOM:** Template nests Blog Post ✅ · Blog Post nests Template ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Manual** — Authors embed Templates in Blog Posts ("Embed Template" CTA). The reverse view is auto-generated: Template pages show posts that feature them. |
| **Cardinality** | **Many:Many** — A Blog Post can embed multiple Templates (especially case studies showing multiple artifacts). A Template can appear in many Blog Posts. Typical: 1–3 Templates per post. |
| **Sorts** | On Template page ("Examples in Practice"): **Publish Date (newest first)**. On Blog Post ("Artifacts" section): **Step Number (ascending)** to show process order. |
| **Filters** | On Template page: filter Blog Posts by Category. On Blog Post: no filter (small inline section). |
| **Dependency** | **Optional (both directions)** — Neither depends on the other. Deleting a Blog Post removes the reference; Template is unaffected. Deleting a Template removes embedded previews from Blog Posts (graceful fallback: show "Template unavailable"). |

---

## 7. Template ↔ Glossary Term

**NOM:** Template nests Glossary Term ✅ · Glossary Term does NOT nest Template

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (text scanning)** — System scans Template instructions for known Glossary Terms and renders tooltips. One-directional nesting: terms appear on Templates, but Templates don't appear on term pages. |
| **Cardinality** | **Many:Many (one-directional display)** — A Template references many terms (typically 3–8). A term can appear in many Templates. But the term detail page doesn't show which Templates use it. |
| **Sorts** | On Template page: **Alphabetical by Term** (inline tooltips; no explicit list). |
| **Filters** | N/A — tooltips are inline, not filterable. |
| **Dependency** | **Optional** — Neither depends on the other. Deleting a term removes tooltips from Templates. |

---

## 8. Object Definition ↔ Blog Post

**NOM:** Object Definition nests Blog Post ✅ · Blog Post nests Object Definition ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Manual** — Authors tag Object Definitions in Blog Posts ("Link Object" CTA). The reverse view is auto-generated: Object Definition pages show posts that discuss them. |
| **Cardinality** | **Many:Many** — A Blog Post can discuss multiple objects (especially cross-object case studies). An Object Definition can appear in many posts. Typical: 2–6 objects per case study, 0–2 per article. |
| **Sorts** | On Object Definition page ("Related Articles"): **Publish Date (newest first)**. On Blog Post ("Objects Covered" sidebar): **Alphabetical by Object Name**. |
| **Filters** | On Object Definition page: filter Blog Posts by Category (Case Study, Article, Tutorial). On Blog Post: no filter (sidebar list). |
| **Dependency** | **Optional (both directions)** — Object Definitions exist without Blog Posts and vice versa. Deleting an Object Definition removes it from Blog Post sidebars (soft unlink). Deleting a Blog Post removes it from the Object Definition's "Related Articles" list. |

---

## 9. Object Definition ↔ Glossary Term

**NOM:** Object Definition nests Glossary Term ✅ · Glossary Term does NOT nest Object Definition

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (text scanning)** — System scans Object Definition content for known Glossary Terms and renders tooltips. One-directional: terms appear on Object Definitions, but Object Definitions don't appear on term pages. |
| **Cardinality** | **Many:Many (one-directional display)** — An Object Definition references many terms (typically 5–20 given its density). A term can appear in many Object Definitions. |
| **Sorts** | On Object Definition page: **Alphabetical by Term** (inline tooltips + "Related Terms" section). |
| **Filters** | On Object Definition: filter terms by Category if displayed as a list. |
| **Dependency** | **Optional** — Neither depends on the other. Deleting a term removes tooltips. |

---

## 10. Blog Post ↔ Glossary Term

**NOM:** Blog Post nests Glossary Term ✅ · Glossary Term nests Blog Post ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (text scanning, bidirectional)** — System scans Blog Post body for known Glossary Terms and renders tooltips. Glossary Term pages auto-generate a list of Blog Posts that use them. |
| **Cardinality** | **Many:Many** — A Blog Post uses many terms (typically 10–30 for dense content). A term appears in many Blog Posts. |
| **Sorts** | On Blog Post: inline tooltips (no sort needed). On Glossary Term page ("Articles About This Term"): **Publish Date (newest first)**. |
| **Filters** | On Glossary Term page: filter Blog Posts by Category. On Blog Post: no filter (tooltips are inline). |
| **Dependency** | **Optional (both directions)** — Neither depends on the other. Deleting a term removes tooltips from all Blog Posts. Deleting a Blog Post removes it from term pages. |

---

## 11. Blog Post ↔ ORCA Step

**NOM:** Blog Post nests ORCA Step ✅ · ORCA Step nests Blog Post ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Automatic (inferred from Skills)** — When a Blog Post links Skills, the system auto-infers which ORCA Steps are covered (via the Skill→Step link). Authors can also manually tag Steps. |
| **Cardinality** | **Many:Many** — A Blog Post (especially case studies) covers multiple Steps. A Step can be featured in many Blog Posts. Typical: 3–8 Steps per case study, 1–2 per article. |
| **Sorts** | On Blog Post ("ORCA Steps Covered" sidebar): **Step Number (ascending)** to show process order. On ORCA Step page ("Case Studies"): **Publish Date (newest first)**. |
| **Filters** | On ORCA Step page: filter Blog Posts by Category. On Blog Post: no filter (sidebar list). |
| **Dependency** | **Optional (both directions)** — Neither depends on the other. Steps are fixed process elements; Blog Posts come and go. |

---

## 12. Glossary Term ↔ ORCA Step

**NOM:** Glossary Term nests ORCA Step ✅ · ORCA Step nests Glossary Term ✅

| Lens | Specification |
|---|---|
| **Mechanics** | **Manual + Automatic** — Admins can manually tag which Steps introduce or heavily use a term. The system also auto-detects terms in Step descriptions. |
| **Cardinality** | **Many:Many** — A Glossary Term can be relevant to multiple Steps (e.g., "NOM" is introduced at Step 2 but referenced at Steps 6 and 10). A Step introduces or uses many terms (typically 3–10). |
| **Sorts** | On Glossary Term page ("Relevant Steps"): **Step Number (ascending)**. On ORCA Step page ("Key Terms"): **Alphabetical by Term**. |
| **Filters** | On Glossary Term page: filter Steps by Round (Discovery, Prioritization, Representation). On Step page: filter terms by Category. |
| **Dependency** | **Optional (both directions)** — Neither depends on the other. Terms and Steps are independently managed. |

---

## Relationship Summary Matrix

| # | Pair | Cardinality | Mechanics | Dependency |
|---|---|---|---|---|
| 1 | Skill ↔ ORCA Step | 1:1 | Automatic | Required (bidirectional) |
| 2 | Skill ↔ Template | 1:1 | Manual | Template requires Skill |
| 3 | Skill ↔ Blog Post | M:M | Manual | Optional |
| 4 | Skill ↔ Glossary Term | M:M | Auto (text scan) | Optional |
| 5 | Template ↔ ORCA Step | 1:1 | Auto (via Skill) | Step requires Template |
| 6 | Template ↔ Blog Post | M:M | Manual | Optional |
| 7 | Template ↔ Glossary Term | M:M | Auto (text scan) | Optional |
| 8 | Obj Def ↔ Blog Post | M:M | Manual | Optional |
| 9 | Obj Def ↔ Glossary Term | M:M | Auto (text scan) | Optional |
| 10 | Blog Post ↔ Glossary Term | M:M | Auto (text scan) | Optional |
| 11 | Blog Post ↔ ORCA Step | M:M | Auto (via Skill) | Optional |
| 12 | Glossary Term ↔ ORCA Step | M:M | Manual + Auto | Optional |

---

## Key Observations

1. **The Skill–Step–Template triad is the backbone** — These three objects are tightly coupled via 1:1 relationships. Skill is the hub: it connects to both Step and Template, and they connect to each other through it.

2. **Text scanning is the most common automatic mechanic** — Glossary Terms surface everywhere via automated text scanning. This is the technical foundation of the site-wide tooltip system.

3. **Blog Post relationships are predominantly manual** — Authors explicitly tag Skills, Objects, and Templates when writing. This is an editorial workflow, not an automated one.

4. **Most relationships are optional** — Only the Skill–Step and Step–Template relationships are required. Everything else is additive — the system degrades gracefully if links are missing.

5. **Sorts follow two patterns**: process content uses **Step Number (ascending)**, time-based content uses **Publish Date (newest first)**, and reference content uses **Alphabetical**.

6. **Filters are lightweight** — Most filtering is by Category or Round. The site doesn't need complex multi-faceted filtering for relationship views because cardinalities are small (typically 1–10 items per view).

---

## Next Steps

→ **Step 7: CTA Prioritization** — Force-rank all 54 CTAs into P/S/T/Q tiers to determine button hierarchy and UI prominence.
