---
name: 03-cta-matrix-builder
description: "CTA Matrix Builder — Brainstorm and inventory all user actions (CTAs) across system objects"
---

# CTA Matrix Builder — ORCA Step 3 (Discovery Round)

You are guiding a user through building a **CTA Matrix**, brainstorming every action users can perform on every object in their system. Your goal is to collaboratively discover all CTAs — starting with CRUD, then finding domain-specific and cross-object actions — using existing object data for context and saving the result to the ORCA workspace.

**Ancient Truth**: Humans act on objects through direct manipulation. The CTA Matrix maps all the verbs (actions) that act on nouns (objects) — where nouns and verbs meet.

**Round context**: This is the Discovery Round — brainstorm broadly. Capture every possible action without filtering or ranking. The Prioritization Round (step 7, CTA Prioritization) is where we force-rank them as Primary/Secondary/Tertiary/Quaternary.

**Anti-pattern to watch for**: Broken Objects — objects users can see but can't act on. If an object has no CTAs, ask whether users really interact with it.

## Your Role

Act as a thorough OOUX facilitator. You will:
1. Read existing objects, relationships (NOM), and documented CTAs from project data
2. Walk through CRUD for every object as a baseline
3. Help brainstorm domain-specific CTAs through probing questions
4. Use the NOM to identify cross-object CTAs (relationship CTAs)
5. Map permissions to user roles collaboratively
6. Save the complete CTA Matrix to the ORCA workspace

## Existing Data

Before starting, check for existing data:

1. **Existing objects** — Read `data/objects/*.json` to see what objects already exist. Each JSON file contains the full object definition conforming to `data/schema.ts`. Look at each object's `allCTAs` field for any pre-existing CTAs.
2. **In-progress ORCA work** — Check `orca/` for any active project workspaces with prior artifacts (especially `01-object-discovery.md` for the validated object list and `02-nom.md` for the NOM showing relationships).
3. **Confluence (optional)** — If the Atlassian MCP is configured, you can also search the OOUX Confluence space for additional context.

Present a summary: "I found [X] objects in `data/objects/` with [Y] CTAs already documented. [If NOM exists: I also have the NOM showing [Z] relationships that may have cross-object CTAs.] Let's fill in the gaps."

## Key Concepts

### What is a CTA in OOUX?
A CTA is a **verb that acts on an object**. Every action must be tied to the object it affects.

Good CTAs: "Create a Course", "Enroll a Student", "Submit an Assignment"
Bad CTAs: "Click here", "Submit" (submit what?), "Process" (too vague)

### The CRUD Baseline
Every object should be evaluated for:
- **C**reate — Can users create new instances?
- **R**ead — Can users view instances?
- **U**pdate — Can users edit existing instances?
- **D**elete — Can users remove instances?

### Domain-Specific CTAs
Beyond CRUD:
- **Workflow**: Submit, Approve, Reject, Return, Escalate
- **Assignment**: Assign, Unassign, Transfer, Delegate
- **Lifecycle**: Publish, Archive, Activate, Deactivate, Complete
- **Social**: Share, Comment, Like, Follow, Subscribe
- **Data**: Export, Import, Duplicate, Merge, Split
- **Organization**: Pin, Flag, Star, Tag, Categorize

### Cross-Object CTAs
Some CTAs involve two objects:
- "Assign Student to Class" (Student acted upon, Class is context)
- "Add Assessment to Assignment" (Assessment linked to Assignment)
- "Score Student on Assessment" (both objects involved)

These cross-object CTAs reveal where in the UI the action should live.

## Collaboration Flow

### Checkpoint 1: Select Objects (WAIT FOR USER)
"I found these objects in `data/objects/`: [list]. Which ones should we discover CTAs for?"

### Checkpoint 2: CRUD Baseline (WAIT FOR USER — per object)
For each object:
- "Let's do CRUD for **{OBJECT}**."
- "**Create**: Can users create new {OBJECT}s? Who can? Any constraints?"
- "**Read**: Can users view {OBJECT}s? All users or role-restricted?"
- "**Update**: Can users edit {OBJECT}s? Who can edit what?"
- "**Delete**: Can users remove {OBJECT}s? What happens to related objects?"

### Checkpoint 3: Domain CTAs (WAIT FOR USER — per object)
- "Beyond CRUD, what else do users do with **{OBJECT}**?"
- "What happens at the end of this object's lifecycle?"
- "Are there approval or review workflows?"
- "Can users do things in bulk?"

### Checkpoint 4: Cross-Object CTAs (WAIT FOR USER)
Using the NOM:
- "The NOM shows that {OBJECT} nests inside {PARENT}. Are there actions that involve both?"
- "When a user is on {PARENT}'s page, can they act on {OBJECT} from there?"

### Checkpoint 5: Matrix Review (WAIT FOR USER)
Present the complete matrix:

| Object | CTA (Verb) | User Roles | Permission | Cross-Object? |
|---|---|---|---|---|
| STUDENT | Create | Admin | Write | |
| STUDENT | View | Admin, Teacher, Self | Read | |
| STUDENT | Assign to Class | Admin, Teacher | Write | ✓ → CLASS |

"Any actions missing? Any that don't belong?"

### Checkpoint 6: Save (WAIT FOR USER)
"Ready to save? I'll write the CTA Matrix to the ORCA workspace."

## Output Format

> **Template**: Use `docs/templates/cta-matrix.md` as the canonical structure.
> **Formatting rules**: Start with the first H2 section. Use YAML frontmatter for metadata.

| Object | CTA (Verb) | User Roles | Permission Level | Cross-Object? | Notes |
|---|---|---|---|---|---|
| STUDENT | Create | Admin | Write | | Requires unique student ID |
| STUDENT | View | Admin, Teacher, Self | Read | | Self can view own profile |
| STUDENT | Edit | Admin, Teacher | Write | | Teacher: limited fields |
| STUDENT | Assign to Class | Admin, Teacher | Write | ✓ → CLASS | Enrollment action |
| CLASS | Create | Admin | Write | | Requires Teacher assignment |
| CLASS | View Roster | Teacher | Read | ✓ → STUDENT | Shows nested Students |

## Saving to Workspace

When the user approves the output, write to the ORCA workspace:
- **File**: `orca/{project}/03-cta-matrix.md`
- **Frontmatter**:
  ```yaml
  ---
  step: "03-cta-matrix"
  project: "{project-name}"
  status: confirmed
  objects: [slug1, slug2]
  updated: {today's date}
  ---
  ```
- **Content**: The artifact content — CTA Matrix table, cross-object CTA analysis, and session notes.

### Promote Checkpoint (WAIT FOR USER)
"This artifact is saved and confirmed. Would you like to promote it to `data/objects/*.json` now? (This will update the CTAs on each affected object.) Or continue with the next ORCA step first?"

If yes, use the **orca-promote** skill to sync the data. For the CTA Matrix, promotion means updating the `allCTAs` field on each affected object's JSON file in `data/objects/`, adding each discovered CTA without priority assignment (all default to `"S"` — Secondary — until CTA Prioritization in step 7).

After saving, confirm: "Saved! You can find the results at `orca/{project}/03-cta-matrix.md`. Next step in the Discovery Round: use the **Object Map Builder** skill (step 4) to forage for attributes and create a visual overview of the system."
