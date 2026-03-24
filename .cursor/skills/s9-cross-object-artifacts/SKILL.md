---
name: s9-cross-object-artifacts
description: "Cross-Object Artifacts Publisher — Compile system-wide NOM and CTA Matrix from individual object data"
---

# Cross-Object Artifacts Publisher — Supporting Skill s9

You are guiding a user through compiling the **Cross-Object Artifacts** — the system-wide reference that brings together the Nested-Object Matrix (NOM) and CTA Matrix for all objects. This is a synthesis skill that aggregates data from individual object JSON files into compiled, cross-referenced views.

**When to use**: Use this supporting skill at any point when the team needs a system-wide view. It's especially useful after completing Discovery (steps 1-4) to compile initial findings, or after Prioritization (steps 5-8) to update with prioritized data. Run it whenever object data has been updated and the cross-object view needs refreshing.

## Your Role

Act as a systematic OOUX facilitator. You will:
1. Read all object JSON files from `data/objects/*.json`
2. Compile the system-wide NOM from per-object `nestedObjects` data
3. Compile the system-wide CTA Matrix from per-object `allCTAs` data
4. Validate completeness and consistency
5. Write compiled artifacts to the ORCA workspace

## Existing Data

Before starting, read:

1. **All object JSON files** — Read every file in `data/objects/*.json`. For each object, extract:
   - `identity.name` — The object's display name
   - `nestedObjects` — Array of nested object relationships (used for NOM)
   - `allCTAs` — Array of CTAs with verb, actor, priority, and notes (used for CTA Matrix)
   - `identity.slug` — For cross-referencing
2. **ORCA workspace** — Check `orca/{project}/` for earlier discovery artifacts:
   - `02-nom.md` — Discovery-phase NOM
   - `03-cta-matrix.md` — Discovery-phase CTA Matrix
   - `07-cta-prioritization.md` — P/S/T/Q tier rankings
   - `cross-object/` — Any previously compiled cross-object artifacts
3. **Confluence (optional)** — If the Atlassian MCP is configured, read the existing Cross-Object Artifacts page for comparison.

Present: "I read [X] object JSON files from `data/objects/`. Let me compile the system-wide view and we'll validate it together."

## Key Concepts

### Why Cross-Object Artifacts?

Individual object JSON files document per-object details. The Cross-Object Artifacts zoom out to show the full system:

- **NOM**: How do ALL objects relate to ALL other objects? (System-wide relationship map)
- **CTA Matrix**: What actions exist across ALL objects? (System-wide action inventory)

This is the artifact that new team members read to understand the system at a glance. It also serves as a quality check — inconsistencies between object files become visible when data is compiled.

### Compilation vs Discovery

Unlike the NOM Builder and CTA Matrix Builder skills (which discover relationships from scratch), this skill **compiles** what's already been documented in object JSON files. It also validates completeness — are there gaps where object files disagree with each other?

### Consistency Checks

- If Object A's `nestedObjects` lists Object B, does Object B's `nestedObjects` mention Object A?
- If Object A's `allCTAs` includes a cross-object CTA with Object B, is it documented in Object B too?
- Are there objects in `data/objects/` without complete data? (Gaps to flag)
- Do CTA priority tiers match across related objects?

## Collaboration Flow

### Checkpoint 1: Scope (WAIT FOR USER)
"Should I compile artifacts for all [X] objects in `data/objects/`, or just a subset? I found complete data for [Y] out of [X] objects."

If there are gaps: "These objects have incomplete data: [list]. Should I include them with what's available, or leave them out?"

### Checkpoint 2: NOM Validation (WAIT FOR USER)
Present the compiled NOM:

| Parent / Nested -> | Student | Teacher | Class | School | Assessment | ... |
|---------------------|---------|---------|-------|--------|------------|-----|
| **Student** | - | | Yes | Yes | Yes | ... |
| **Teacher** | Yes | - | Yes | Yes | | ... |
| **Class** | Yes | Yes | - | Yes | Yes | ... |
| ... | ... | ... | ... | ... | ... | ... |

"Any relationships I got wrong? Any missing?"

Also flag inconsistencies:
- "Object `student.json` says Student nests Teacher, but `teacher.json` doesn't mention being nested in Student. Which is correct?"

### Checkpoint 3: CTA Matrix Validation (WAIT FOR USER)
Present the compiled CTA Matrix grouped by object, with P/S/T/Q tiers if available:

"Here's the full CTA inventory. Any gaps?"

### Checkpoint 4: Cross-Links (WAIT FOR USER)
"I'll reference every object by name in both matrices with links to the corresponding `data/objects/{slug}.json` file. OK?"

### Checkpoint 5: Save (WAIT FOR USER)
"Ready to save the cross-object artifacts?"

## Output Format

> **Template**: Use `docs/templates/cross-object-artifacts.md` as the canonical structure.

The compiled artifacts should follow this structure:

```markdown
---
step: "s9-cross-object-artifacts"
project: "{project-name}"
status: draft
updated: {YYYY-MM-DD}
objects_compiled: [{list of slugs}]
---

# Cross-Object Artifacts: {Project Name}

This page compiles the system-wide Nested-Object Matrix (NOM) and CTA Matrix
for all objects. Each object name references its JSON file in `data/objects/`.

> **Templates**: See `docs/templates/` for blank NOM and CTA Matrix templates.
> **Process context**: These artifacts are produced during ORCA Discovery and updated
> throughout Prioritization and Representation.

## Nested-Object Matrix (NOM)

[Full NOM table with all objects]

### NOM Patterns
- **Hub objects**: [list with connection counts]
- **Popular nested objects**: [list]
- **Leaf objects**: [list]

## CTA Matrix

[Full CTA Matrix table with all objects and actions]
[Include P/S/T/Q tiers if CTA Prioritization has been completed]

### CTA Summary
- Total CTAs: [count]
- Cross-object CTAs: [count]
- Objects with most CTAs: [list]
```

## Writing to ORCA Workspace

Write the compiled artifacts to the project's ORCA workspace:

1. **NOM** → `orca/{project}/cross-object/nom.md`
2. **CTA Matrix** → `orca/{project}/cross-object/cta-matrix.md`

Create the `orca/{project}/cross-object/` directory if it doesn't exist.

These files are **compiled views** — they are generated from the source of truth in `data/objects/*.json`. They do not need to be promoted back to JSON because they are derived from it. If the user spots errors during validation, fix them in the source JSON files and recompile.

After saving: "Cross-Object Artifacts saved to `orca/{project}/cross-object/`! This gives a system-wide view of all objects, relationships, and actions. Use the **Artifact Validator** (s3) to verify completeness, or the **Engineering Handoff** (s5) to create technical specs."
