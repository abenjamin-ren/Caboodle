# Caboodle

**Caboodle** turns your AI coding assistant into an Object-Oriented UX (OOUX) facilitator. It installs 18 structured Agent Skills that guide you through the ORCA process — from discovering system objects to generating implementation specs — and publishes everything to a local, organized resource site.

No external dependencies. No API keys. Install in one command and start designing.

---

## Quick Start

### Option A: GitHub Package (recommended)

```bash
# 1. Authenticate with GitHub Packages (one-time setup)
npm login --registry=https://npm.pkg.github.com

# 2. Install Caboodle globally
npm install -g @abenjamin-ren/caboodle

# 3. Navigate to your project
cd /path/to/your/project

# 4. Install skills and resource site into your project
caboodle install
```

> **Auth note:** GitHub Packages requires authentication. When prompted, use your GitHub username and a [Personal Access Token](https://github.com/settings/tokens) with `read:packages` scope as the password. Alternatively, add `//npm.pkg.github.com/:_authToken=YOUR_TOKEN` to your `~/.npmrc`.

### Option B: Git Clone (any OS)

```bash
# 1. Clone Caboodle
git clone https://github.com/abenjamin-ren/Caboodle.git ~/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install
node ~/Caboodle/bin/install.mjs install
```

Then open Cursor and type:

> "Plan an ORCA workflow for my project"

---

## How to Use Caboodle

### Step 1: Start with the Planner

Every Caboodle project starts the same way — **tell the agent about your project**. The ORCA Planner skill activates automatically and walks you through scoping the right workflow.

Open your AI assistant (Cursor, Claude Code, etc.) and describe what you're working on:

> "I'm building a learning management system where instructors create courses and students enroll in them. Help me plan the OOUX process."

The planner will:
1. **Ask about your project** — what you're building, who the users are, your timeline
2. **Check for existing work** — scan your resource site for Object Guides or prior artifacts
3. **Recommend a workflow** — suggest the right skill sequence for your situation
4. **Save a plan** — create a project directory with a step-by-step plan you can track

### Step 2: Follow the Plan

The planner recommends a sequence of skills based on your project type:

| Project Type | Typical Workflow |
|---|---|
| **New product** | All 16 steps: Discovery → Definition → Design → Build |
| **Existing product audit** | System Audit → Object Discovery → Object Guides → Object Map |
| **New feature** | Object Discovery → CTA Inventory → Attributes → CTA Matrix → User Stories |
| **Documentation only** | Object Discovery → NOM → Object Guides → Object Map |
| **Engineering handoff** | Relationship Lens → Governance → User Stories → Interaction Spec → Data Model |

To run any skill, just ask:

> "Run Object Discovery for my LMS project"

> "Build an Object Guide for the Course object"

> "Create a NOM for the objects we've discovered"

### Step 3: Collaborate at Checkpoints

Every skill has **collaboration checkpoints** — moments where the agent pauses and waits for your input. It won't guess or assume. Here's what that looks like in practice:

> **Agent:** "I've extracted 14 candidate nouns from your PRD. Here's what I found:
>
> | # | Noun | SIP: Structure? | SIP: Instances? | SIP: Purpose? |
> |---|------|:---:|:---:|:---:|
> | 1 | Course | ✅ Has title, description, duration | ✅ Math 101, Bio 201 | ✅ Users browse and enroll |
> | 2 | Lesson | ✅ Has title, content, order | ✅ Lesson 1, Lesson 2 | ✅ Users complete lessons |
> | 3 | Registration | ❓ Might be a CTA (Register), not an object | — | — |
> | ...
>
> **Do any of these seem wrong? Are there objects I missed?**"

You review, correct, and confirm. The agent moves to the next step.

### Step 4: Artifacts Save to Your Resource Site

Every finished artifact is saved as a markdown file in `site/docs/`. You'll build up a structured library:

```
site/docs/
  projects/
    lms/
      orca-plan.md            ← Your plan with progress tracking
      object-discovery.md     ← Validated object list
      nom.md                  ← Nested-Object Matrix
      cta-inventory.md        ← Actions per object
      ...
  objects/
    course.md                 ← Object Guide: Course
    student.md                ← Object Guide: Student
    lesson.md                 ← Object Guide: Lesson
```

Preview it locally: `cd site && npm install && npm start`

---

## Example: LMS Project Walkthrough

Here's what a typical session looks like from start to finish:

**You:** "I'm building a learning management system. Instructors create courses with lessons and assignments. Students enroll, complete work, and earn certificates. Help me plan the OOUX process."

**Agent (ORCA Planner):** Asks about your users, timeline, and goals. Recommends the Full ORCA workflow. Saves a plan to `site/docs/projects/lms/orca-plan.md`.

**You:** "Let's start with Object Discovery."

**Agent (Object Discovery):** "What source materials do you have? Share any PRDs, user interviews, UI screenshots, or requirements docs."

**You:** _Paste your PRD or share a file._

**Agent:** Extracts nouns, groups them, runs the SIP test. Presents a table of candidates. **Waits for your review.**

**You:** "Looks good, but Registration should be a CTA on Course, not its own object. And we need a Notification object."

**Agent:** Updates the list, confirms, saves to `site/docs/projects/lms/object-discovery.md`.

**You:** "Now build the NOM."

**Agent (NOM Builder):** Reads the object discovery results. Maps containment:

```
COURSE
  └── LESSON
  └── ASSIGNMENT
        └── SUBMISSION
STUDENT
  └── ENROLLMENT → COURSE
  └── CERTIFICATE
```

**Waits for your review.** You refine. Artifact saved.

**You:** "Create an Object Guide for Course."

**Agent (Object Guide):** Deep-dives into Course — attributes, CTAs, relationships, lifecycle states, edge cases. Builds a comprehensive reference. Saves to `site/docs/objects/course.md`.

_...and so on through the plan._

---

## The 18 Skills

### Start Here
- **ORCA Planner** — Describe your project, get a sequenced plan with progress tracking

### Discovery Round (Steps 1–4)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 01 | Object Discovery | Validated object list (noun foraging + SIP test) |
| 02 | NOM Builder | Nested-Object Matrix showing containment |
| 03 | CTA Inventory | Actions per object with role mappings |
| 04 | Attribute Definition | Data fields per object with types |

### Definition Round (Steps 5–8)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 05 | Object Guide | Comprehensive reference for one object |
| 06 | Relationship Lens | MCSFD analysis for object pairs |
| 07 | CTA Matrix | Cross-reference of objects × actions |
| 08 | Shapeshifter Matrix | Attribute visibility per viewing context |

### Design Round (Steps 9–12)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 09 | Object Map | Visual system architecture diagram |
| 10 | Nav Flow | Navigation paths and entry points |
| 11 | CTA Prioritization | Ranked, phased action backlog |
| 12 | Object Card | Card/list UI component specs |

### Build Round (Steps 13–16)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 13 | OO User Stories | Object-oriented dev stories with acceptance criteria |
| 14 | Relationship Governance | Technical rules for object interactions |
| 15 | Interaction Spec | Detailed CTA behavior specs |
| 16 | Data Model Spec | Database/API schema |

### Standalone
- **System Audit** — Evaluate an existing product against OOUX principles

---

## When to Use Each Skill

| You want to... | Use this skill |
|---|---|
| Figure out what to do first | **ORCA Planner** |
| Find the objects in a product or feature | **Object Discovery** |
| See how objects nest inside each other | **NOM Builder** |
| List what users can do with each object | **CTA Inventory** |
| Define the data fields on each object | **Attribute Definition** |
| Create a detailed reference for one object | **Object Guide** |
| Analyze how two objects relate (rules, cardinality, dependency) | **Relationship Lens** |
| See all actions across all objects in one view | **CTA Matrix** |
| Understand how an object looks in different contexts | **Shapeshifter Matrix** |
| Visualize the whole system architecture | **Object Map** |
| Design how users navigate between objects | **Nav Flow** |
| Decide which actions to build first | **CTA Prioritization** |
| Design the card/list UI for an object | **Object Card** |
| Write dev stories for engineering | **OO User Stories** |
| Specify technical rules for relationships | **Relationship Governance** |
| Detail exactly how a CTA behaves | **Interaction Spec** |
| Generate database tables and API schemas | **Data Model Spec** |
| Audit an existing product for OOUX issues | **System Audit** |

---

## What Gets Installed

| What | Where | Purpose |
|------|-------|---------|
| 18 Agent Skills | `.cursor/rules/caboodle-*.md` | Step-by-step OOUX workflows |
| 7 Cursor Rules | `.cursor/rules/caboodle-*.mdc` | Persistent OOUX context for the agent |
| AGENTS.md | `./AGENTS.md` | High-level agent instructions |
| Quick Reference | `./CABOODLE_QUICKSTART.md` | Human-readable cheat sheet |
| Resource Site | `./site/` | Docusaurus-powered artifact site |

## Commands

After installing the package globally (`npm install -g @abenjamin-ren/caboodle`), the `caboodle` CLI is available everywhere. If you cloned the repo instead, substitute `node ~/Caboodle/bin/install.mjs` for `caboodle`.

```bash
caboodle install        # Full install (skills, rules, site scaffold)
caboodle update         # Re-install latest skills and rules
caboodle uninstall      # Remove all Caboodle files from your project
caboodle init-site      # Initialize the resource site only
caboodle verify         # Check your installation
caboodle --help         # Show all commands
caboodle --version      # Show version
```

## Requirements

- **Node.js 18+** — [Download](https://nodejs.org)
- **npm** — Comes with Node.js; used to install the package from GitHub Packages
- **Cursor** (recommended) or any AI coding assistant that supports custom rules

## What Is OOUX?

Object-Oriented UX (OOUX) is a design philosophy that grounds product decisions in the concrete "things" users interact with — **objects** like Student, Course, or Report — rather than screens or user flows.

The **ORCA process** (Objects, Relationships, CTAs, Attributes) is the framework for systematically discovering and designing those objects across four rounds: Discovery, Definition, Design, and Build.

## Contributing

Contributions welcome! The canonical skill definitions live in `skills/` as `skill.yaml` + `SKILL.md` pairs. Templates and rules are in `templates/`.

## License

MIT
