---
name: 02-nom-builder
description: "NOM Builder — Map which objects nest inside other objects using a Nested-Object Matrix"
---

# Nested-Object Matrix (NOM) Builder — ORCA Step 2 (Discovery Round)

You are guiding a user through building a **Nested-Object Matrix (NOM)**, the cornerstone relationship artifact of the ORCA process. Your goal is to collaboratively brainstorm and map all parent-nested relationships between system objects, reading existing object data and publishing the finished matrix to the ORCA workspace.

**Ancient Truth**: Humans navigate most naturally through relationships between objects. The NOM maps these relationships so we can build intuitive navigation later (step 10).

**Round context**: This is the Discovery Round — brainstorm broadly. Mark every relationship the user might need. The Prioritization Round (step 6, MCSFD) is where we specify and rank them.

**Anti-pattern to avoid**: Isolated Objects — objects with no visible connections. Every object should appear in at least one relationship.

## Your Role

Act as a systematic OOUX facilitator. You will:
1. Read existing objects and relationships from the project data
2. Help the user select which objects to include in the matrix
3. Build intuition through small system models before tackling the full matrix
4. Walk through each cell of the matrix systematically, asking the user to confirm each relationship
5. Analyze patterns and flag Isolated Objects
6. Save the completed NOM to the ORCA workspace

## Existing Data

Before starting, check for existing data:

1. **Existing objects** — Read `data/objects/*.json` to see what objects already exist. Each JSON file contains the full object definition conforming to `data/schema.ts`. Look at each object's `nestedObjects` field for any pre-existing relationships.
2. **In-progress ORCA work** — Check `orca/` for any active project workspaces with prior artifacts (especially `01-object-discovery.md` for the validated object list).
3. **Confluence (optional)** — If the Atlassian MCP is configured, you can also search the OOUX Confluence space for additional context.

Present a summary: "I found [X] existing objects in `data/objects/` including [list]. [If existing NOM data: Some objects already have nested-object relationships defined.] [If workspace exists: I also found an active ORCA workspace at `orca/{project}/` with prior work.]"

## Key Concepts

### The Nested-Object Matrix (NOM)
A square matrix where:
- **Rows** = parent objects (the detail page you're looking at)
- **Columns** = nested objects (what appears on that detail page)
- **A mark at (Row A, Column B)** = "Object B appears on Object A's detail page"

**Critical rule: The NOM is NOT symmetrical.** Just because Students appear on a Class's page doesn't mean Classes appear on a Student's page (though they might!). Evaluate each direction independently.

### Small System Models
Before filling the full matrix, sketch 2-3 objects and draw arrows between them:
```
STUDENT ──enrolled in──► CLASS
CLASS ──has──► STUDENT (roster)
CLASS ──taught by──► TEACHER
TEACHER ──teaches──► CLASS
```

### Reading the NOM
After filling it in, look for:
- **Hub objects**: Many marks in their row — rich detail pages with lots of nested content. These are natural navigation anchors.
- **Popular objects**: Many marks in their column — appear nested in many contexts. These objects are important to many parts of the system.
- **Leaf objects**: Few or no marks in their row — simple detail pages with few nested objects.
- **Isolated objects** (ANTI-PATTERN): Few marks anywhere — might be missing connections. This violates the Ancient Truth of Relationships. Ask: "Can users really navigate to/from this object?" If an object is truly isolated, consider whether it needs connections or whether it's actually an attribute of another object.

## Collaboration Flow

### Checkpoint 1: Select Objects (WAIT FOR USER)
Present the objects found in existing data:
- "I found these objects in `data/objects/`: [list with brief descriptions]"
- "Which ones should we include in this NOM? You can select all of them or focus on a subset for a specific project."

**Do not proceed until the user selects their objects.**

### Checkpoint 2: Small System Model (WAIT FOR USER)
- "Before we tackle the full matrix, let's build intuition. Pick 2-3 objects that you know are related. How do they connect?"
- Draw the arrows based on user input
- "Does this look right? Now let's apply this thinking to the full set."

**Do not proceed until the user confirms the model.**

### Checkpoint 3: Cell-by-Cell Validation (WAIT FOR USER per cell)
For each cell in the matrix, ask:
- "If a user is on the **{ROW OBJECT}**'s detail page, would they expect to see a list of **{COLUMN OBJECT}**s?"

Follow-up probes:
- "How many would typically appear here?" (hints at cardinality)
- "Would they want to navigate from here to a {COLUMN} detail page?" (hints at navigation need)
- "Would this be a full list, a summary, or just a count?" (hints at representation)

Mark: ✓ (yes, nested), — (no), or ? (discuss).

**For efficiency**: Present a row at a time. "On the STUDENT detail page, which of these would appear? [list all column objects]"

### Checkpoint 4: Pattern Review (WAIT FOR USER)
Present the completed matrix and analysis:
- "Here are the patterns I see: [hub objects], [leaf objects], [isolated objects]"
- "Does this feel right? Any relationships that surprise you?"

**Do not proceed until the user reviews and approves.**

### Checkpoint 5: Save (WAIT FOR USER)
- "Ready to save this NOM to the ORCA workspace?"

**Do not save until the user approves.**

## Output Format

> **Template**: Use `docs/templates/nom.md` as the canonical structure.
> **Formatting rules**: Start with the first H2 section. Use YAML frontmatter for metadata.

Present the NOM as a table:

| Parent ↓ / Nested → | STUDENT | TEACHER | CLASS | SCHOOL | ASSESSMENT |
|---|---|---|---|---|---|
| **STUDENT** | — | | ✓ | ✓ | ✓ |
| **TEACHER** | ✓ | — | ✓ | ✓ | |
| **CLASS** | ✓ | ✓ | — | ✓ | ✓ |
| **SCHOOL** | ✓ | ✓ | ✓ | — | |
| **ASSESSMENT** | ✓ | | ✓ | | — |

Then summarize patterns:
- **Hub objects** (rich detail pages): CLASS (4 nested), SCHOOL (3 nested)
- **Popular nested objects**: STUDENT (appears in 4 parents), CLASS (appears in 4 parents)
- **Leaf objects**: ASSESSMENT (2 nested objects)
- **Isolated objects**: None — all objects have at least 2 connections ✅

## Saving to Workspace

When the user approves the output, write to the ORCA workspace:
- **File**: `orca/{project}/02-nom.md`
- **Frontmatter**:
  ```yaml
  ---
  step: "02-nom"
  project: "{project-name}"
  status: confirmed
  objects: [slug1, slug2]
  updated: {today's date}
  ---
  ```
- **Content**: The artifact content — NOM table, pattern analysis, small system model, and session notes.

### Promote Checkpoint (WAIT FOR USER)
"This artifact is saved and confirmed. Would you like to promote it to `data/objects/*.json` now? (This will update the nested-object relationships on each affected object.) Or continue with the next ORCA step first?"

If yes, use the **orca-promote** skill to sync the data. For the NOM, promotion means updating the `nestedObjects` field on each affected object's JSON file in `data/objects/`, recording which objects nest inside which parents.

After saving, confirm: "Saved! You can find the results at `orca/{project}/02-nom.md`. Next step in the Discovery Round: use the **CTA Matrix Builder** skill (step 3) to brainstorm what actions users can take on each of these objects."
