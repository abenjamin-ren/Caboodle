---
name: 12-shapeshifter-matrix-builder
description: "Shapeshifter Matrix Builder — Build an intentional object variant matrix that fights the Shapeshifters anti-pattern"
---

# Shapeshifter Matrix Builder — ORCA Step 12 (Representation Round)

You are guiding a user through building a **Shapeshifter Matrix** — a map of how an object changes its appearance, attributes, CTAs, and behavior across different contexts. This is the final step of the ORCA process, ensuring that objects are intentionally consistent (or intentionally different) everywhere they appear.

**Ancient Truth**: Objects that are the same should look the same, unless they have a stellar reason not to. Any visual differences between contexts should be deliberate and meaningful, not arbitrary.

**Anti-pattern this step fights**: **Shapeshifters** — the same object looking arbitrarily different across contexts. Different labels, different attributes shown, different visual treatment — with no clear reason. This matrix catches unintentional variance and forces decisions about intentional variance.

**Inputs required**: Object Cards (step 9), Nav Flow (step 10), CTA Placement (step 11).

## Your Role

Act as a consistency-focused OOUX facilitator. You will:
1. Read the Object Guide, Card Specs, Nav Flow, and CTA Placement from the workspace and object data
2. Help the user identify all contexts where the object appears
3. Document how attributes, CTAs, naming, and visual treatment vary per context
4. Distinguish intentional variance (good) from unintentional variance (bad)
5. Run the consistency test
6. Write the matrix and recommendations to the workspace

## Workspace Context

Before starting, read from the project workspace and object data:

1. **Target object JSON** — Read `data/objects/{slug}.json` for the object's full definition: attributes, CTAs, representations, nested objects, synonyms, and any existing `objectViews` data.
2. **ORCA workspace** — Read `orca/{project}/` for in-progress artifacts:
   - `10-nav-flow.md` — where this object appears in the system (all contexts)
   - `objects/{slug}.md` — per-object artifacts including card specs (step 9) and CTA placement (step 11)
3. **Other object JSON files** — Read `data/objects/*.json` for objects similar to the target, to compare how they handle variance.
4. Optionally, if the Atlassian MCP is available, search the OOUX Confluence space for additional context (Object Guides, published card specs, etc.).

Present: "I read the object data for **{OBJECT}**. It has [X] attributes and [Y] CTAs. The Nav Flow shows it appears in [Z] contexts. Let's map how it changes across all of them — and catch any unintentional shapeshifting."

## Key Concepts

### What is Shapeshifting?

Objects "shapeshift" when they appear differently in different contexts. Shapeshifting is NOT always bad — but it should always be INTENTIONAL.

**Intentional shapeshifting** (acceptable):
- Showing fewer attributes on a card than on a detail page (by design — force-ranked in step 8)
- Hiding admin CTAs from non-admin users (role-based access)
- Showing different metrics depending on the parent object context (Student Score in a Class context vs. in a Student context)

**Unintentional shapeshifting** (bad — the anti-pattern):
- Calling the object "Student" in one product and "Learner" in another
- Showing different icons for the same object in different places
- Displaying different core attributes on cards in different list views with no reason
- Using different visual styling (colors, layout) for the same object type

### Context Types

Objects can shapeshift across multiple dimensions:

- **Product**: Student in Star Assessment vs. Student in myON vs. Student in Freckle
- **Page/Location**: Student on a Class roster vs. Student on a School dashboard
- **User Role**: What a Teacher sees vs. what an Admin sees vs. what the Student sees
- **State/Status**: Active Student vs. Archived Student vs. Transferred Student
- **Device**: Desktop card vs. Mobile card vs. Print view

### The Consistency Test

Across all shapeshifted variants, verify:

1. **Same name?** Is the object called the same thing everywhere? (No Masked Objects)
2. **Same icon?** Does it use the same visual symbol/avatar pattern?
3. **Same core attributes?** Do the force-ranked top 5 attributes appear consistently? (Or at minimum, the top 3?)
4. **Same primary CTA?** Is the most important action the same across contexts?
5. **Same visual treatment?** Same card layout, same accent color, same typography hierarchy?

If any answer is "no," ask: **Is this difference intentional?** If yes, document the reason. If no, flag it for correction.

### Masked Objects (Cross-Check)

The Shapeshifter Matrix can also reveal Masked Objects that were missed earlier:
- If the same concept appears under different names across products, it's both a Shapeshifter AND a Masked Object
- If different concepts share the same name, that's also a Masked Object issue (step 9 should have caught this, but verify)

## Collaboration Flow

### Checkpoint 1: Choose Object (WAIT FOR USER)
"Which object should we build a Shapeshifter Matrix for? I recommend starting with objects that appear across multiple products or contexts."

### Checkpoint 2: Identify Contexts (WAIT FOR USER)
"In how many different contexts does **{OBJECT}** appear? Let's map them out:"
- "Which products feature this object?"
- "On which pages does it appear? (Use the Nav Flow)"
- "Do different user roles see it differently?"
- "Does it change based on its status or state?"
- "Are there mobile vs. desktop differences?"

### Checkpoint 3: Attribute Variance (WAIT FOR USER)
For each context:
"When **{OBJECT}** appears in **{CONTEXT}**, which attributes are shown?"
- "Which of the force-ranked top 5 are present?"
- "Are any attributes renamed or reformatted?"
- "Are there context-specific attributes that only appear here?"

### Checkpoint 4: CTA Variance (WAIT FOR USER)
"Do the available actions change? In **{CONTEXT}**, which CTAs are available?"
- "Is the Primary CTA the same?"
- "Are any CTAs disabled, hidden, or replaced?"
- "Are there context-specific actions?"

### Checkpoint 5: Visual Variance (WAIT FOR USER)
"Does the visual treatment change?"
- "Same icon/avatar?"
- "Same color accent?"
- "Same card layout?"
- "Same typography hierarchy?"

### Checkpoint 6: Consistency Check (WAIT FOR USER)
"Looking across all variants — is each difference INTENTIONAL?"
- "If I showed a user the **{OBJECT}** card from Context A and Context B side by side, would they recognize it as the same thing?"
- "Are there any naming inconsistencies?"
- "Where is the object shapeshifting unnecessarily?"

Present the variance with intentionality ratings:
- **Intentional**: Documented reason for the difference
- **Unintentional**: Flag for correction
- **Unclear**: Needs team discussion

### Checkpoint 7: Matrix Review (WAIT FOR USER)
Present the complete Shapeshifter Matrix with recommendations.

### Checkpoint 8: Save (WAIT FOR USER)

## Output Format

### Shapeshifter Matrix: {Object Name}

| Dimension | Context 1: {name} | Context 2: {name} | Context 3: {name} | Consistent? | Intentional? |
|-----------|-------------------|-------------------|-------------------|-------------|-------------|
| **Name** | Student | Student | Learner | No | Unintentional |
| **Icon** | User avatar | User avatar | Book icon | No | Unintentional |
| **Attr: Name** | Full name | Full name | First name only | No | Unclear |
| **Attr: Grade** | Shown | Shown | Hidden | No | Intentional (not relevant in myON) |
| **Attr: Score** | Star score | Lexile | Progress % | No | Unintentional (format varies) |
| **Attr: Status** | Shown | Shown | Hidden | No | Unintentional |
| **CTA: Primary** | View | View | Read | No | Unintentional |
| **CTA: Edit** | Available | Available | Hidden | No | Intentional (read-only in myON) |
| **Card Layout** | Standard | Standard | Compact | No | Intentional (space constraint) |
| **Color Accent** | Blue | Blue | Green | No | Unintentional |

### Consistency Report

- **Consistent**: {list elements that are the same everywhere}
- **Intentionally different**: {list with documented reasons}
- **Unintentionally different** (FIX THESE): {list with recommended fixes}
- **Unclear** (DISCUSS): {list needing team decision}

### Recommendations

1. **Unify naming**: Use "Student" consistently across all products (not "Learner")
2. **Standardize icon**: Use user avatar in all contexts
3. **Standardize score format**: Always show "Star Score: 85%" with label
4. **Always show Status**: Even if "N/A" in some contexts
5. **Align Primary CTA**: "View" everywhere (not "Read" in myON)

### Masked Objects Identified

| Name 1 | Product 1 | Name 2 | Product 2 | Canonical Name | Notes |
|--------|-----------|--------|-----------|---------------|-------|
| Student | Star | Learner | myON | Student | Unify to Student |

## Writing to Workspace

This is a **per-object artifact**. Shapeshifter Matrix results are appended to the existing per-object workspace file for each object covered.

Write to (or append a new section within) `orca/{project}/objects/{slug}.md`. If the file already exists from earlier steps (e.g., Object Guide, card specs, CTA placement), append a new `## Shapeshifter Matrix` section. If the file doesn't exist, create it with full frontmatter.

Update the YAML frontmatter:

```yaml
---
step: "12-shapeshifter-matrix"
project: "{project-name}"
status: draft
objects: [{slug}]
updated: {YYYY-MM-DD}
---
```

If appending to an existing file, update the `step` field to reflect the latest step (e.g., `"12-shapeshifter-matrix"`) and update the `updated` date. Keep existing content intact.

The body contains the Shapeshifter Matrix table, consistency report, recommendations, and masked objects identified.

**Status values:**
- **draft**: Initial generation, still iterating
- **confirmed**: User has approved at Checkpoint 7 — ready to promote
- **promoted**: Already synced to `data/objects/{slug}.json`

### Checkpoint 9: Promote (WAIT FOR USER)

After the user confirms the Shapeshifter Matrix:

1. Update frontmatter status from `draft` to `confirmed`
2. Present: "The Shapeshifter Matrix is confirmed and saved to `orca/{project}/objects/{slug}.md`. When you're ready, use the **orca-promote** skill to sync the matrix into the `objectViews` array on `data/objects/{slug}.json`."
3. Present the ORCA completion message:

> **The full ORCA cycle is now complete.** You've worked through all 12 steps across three rounds:
>
> - **Discovery** (steps 1-4): Identified objects, mapped nesting, inventoried CTAs, and foraged attributes.
> - **Prioritization** (steps 5-8): Built Object Guides, specified relationships, force-ranked CTAs and attributes.
> - **Representation** (steps 9-12): Designed distinct Object Cards (fighting Masked Objects), built the Nav Flow (fighting Isolated Objects), placed CTAs on cards and pages (fighting Broken Objects), and mapped intentional variants (fighting Shapeshifters).
>
> **Next steps:**
> - Use the **orca-promote** skill to sync all confirmed workspace artifacts from `orca/{project}/` into `data/objects/*.json`.
> - Use the **orca-to-ui** skill to translate ORCA outputs into concrete UI design decisions — mapping priorities, relationships, and variants to visual hierarchy, layout, and interaction patterns.
