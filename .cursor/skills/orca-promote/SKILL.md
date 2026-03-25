---
name: orca-promote
description: "Promote confirmed ORCA workspace artifacts into data/objects/*.json — syncing iterative drafts to the published data layer"
---

# ORCA Promote — Workspace to Data Sync

Take confirmed ORCA workspace artifacts from `orca/{project}/` and sync them into `data/objects/*.json`, updating only the relevant sections of each object's JSON file.

## When to Use

- After completing an ORCA step and confirming the output with the user
- When the user wants to sync all confirmed workspace artifacts at once
- When the user runs `/orca-promote`

## Prerequisites

Read:
1. `data/schema.ts` — the target TypeScript types for all object data
2. The workspace files in `orca/{project}/` that are marked `status: confirmed`
3. The existing JSON files in `data/objects/` that will be updated

## How the Workspace Model Works

```
orca/{project}/
  plan.md                    # ORCA plan with progress tracking
  01-object-discovery.md     # SIP-validated object list
  02-nom.md                  # Nested-Object Matrix
  03-cta-matrix.md           # CTA inventory
  04-object-map.md           # Attribute foraging
  objects/                   # Per-object artifacts (steps 5-12)
    {slug}.md                # Object Guide draft
  cross-object/              # System-wide artifacts
    nom.md                   # Compiled NOM
    cta-matrix.md            # Compiled CTA Matrix
```

Each workspace file has YAML frontmatter:

```yaml
---
step: "01-object-discovery"
project: "{project-name}"
status: draft | confirmed | promoted
objects: [student, teacher, class]  # which objects this artifact covers
updated: 2026-03-17
---
```

- **draft**: Work in progress, not ready to promote
- **confirmed**: User has approved, ready to promote
- **promoted**: Already synced to data/objects/*.json

## Instructions

### Step 1 — Scan the workspace

Read all files in `orca/{project}/` and identify which have `status: confirmed`.

Present: "I found these confirmed artifacts ready to promote:"

| File | Step | Objects affected |
|---|---|---|
| `01-object-discovery.md` | Object Discovery | student, teacher, class |
| `objects/student.md` | Object Guide | student |

"Which would you like to promote? (All, or select specific files)"

### Step 2 — Read the target schema

Read `data/schema.ts` to understand the exact TypeScript types. Every promoted value must conform to these types.

### Step 3 — Apply the promote mapping

For each confirmed artifact, apply the appropriate field mapping:

| ORCA Step | Source file | JSON field(s) updated |
|---|---|---|
| 01 Object Discovery | `01-object-discovery.md` | Creates `data/objects/{slug}.json` with `identity` and `sipValidation` |
| 02 NOM Builder | `02-nom.md` | Updates `nestedObjects` array on each object |
| 03 CTA Matrix | `03-cta-matrix.md` | Updates `allCTAs` array (without priority — set to `"S"` as default) |
| 04 Object Map | `04-object-map.md` | Updates `allAttributes` array |
| 05 Object Guide | `objects/{slug}.md` | Full update: `identity`, `sipValidation`, `allAttributes`, `allCTAs`, `nestedObjects`, `businessRules`, `lifecycle`, `synonyms` |
| 06 MCSFD Specs | `objects/{slug}.md` | Updates `relationships` (MCSFDSpec array) |
| 07 CTA Prioritization | `07-cta-prioritization.md` | Updates `allCTAs[].priority` to P/S/T/Q values |
| 08 Attribute Prioritization | `08-attribute-prioritization.md` | Reorders `allAttributes` (force-ranked order, highest priority first) |
| 09 Object Cards | `objects/{slug}.md` | Updates `representations` array (card layout section) |
| 10 Nav Flow | `10-nav-flow.md` | Cross-object artifact — no direct JSON field. Writes to `orca/{project}/cross-object/nav-flow.md` |
| 11 CTA Placement | `objects/{slug}.md` | Updates CTA entries within `representations[].ctas` |
| 12 Shapeshifter Matrix | `objects/{slug}.md` | Updates `objectViews` array |

### Step 4 — Merge into JSON

For each affected object:

1. Read the existing `data/objects/{slug}.json` (or create a new file from the schema defaults if the object is new)
2. Merge only the fields from the promote mapping — preserve all other existing data
3. Validate the merged result against `data/schema.ts` types
4. Write the updated JSON file
5. Present a diff summary to the user

### Step 5 — Mark as promoted

Update the workspace file's frontmatter to `status: promoted`.

### Step 6 — Offer next steps

After promotion, ask:

- "Would you like to generate or update the Object Guide HTML page? (Uses the Object Guide Builder skill)"
- "Would you like to continue with the next ORCA step?"

## Collaboration Checkpoints

1. **Scan results** — show which artifacts are ready to promote
2. **Pre-promote review** — show the diff of what will change in each JSON file
3. **Post-promote confirmation** — confirm files were updated successfully

## Creating New Objects

When step 01 (Object Discovery) introduces new objects that don't have JSON files yet, create a minimal `data/objects/{slug}.json` with:

```json
{
  "identity": {
    "slug": "{slug}",
    "name": "{Name}",
    "objectType": "core",
    "category": "{category}",
    "definition": "{definition from SIP}",
    "products": ""
  },
  "variations": [],
  "representations": [],
  "stories": [],
  "businessRules": [],
  "lifecycle": { "states": [], "transitions": [] },
  "relationships": [],
  "relatedObjects": [],
  "nestedObjects": [],
  "allAttributes": [],
  "allCTAs": [],
  "sipValidation": {
    "structure": { "pass": true, "evidence": "" },
    "instances": { "pass": true, "evidence": "" },
    "purpose": { "pass": true, "evidence": "" },
    "verdict": ""
  },
  "synonyms": [],
  "objectViews": []
}
```

Then fill in the fields from the discovery artifact.

## Constraints

- Never overwrite JSON fields that weren't produced by the ORCA step being promoted
- Always preserve existing data not covered by the promote mapping
- Always validate against `data/schema.ts` before writing
- Always show the user what will change before writing
- Mark workspace files as `promoted` after successful sync
