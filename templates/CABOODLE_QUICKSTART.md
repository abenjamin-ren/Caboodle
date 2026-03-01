# Caboodle Quick-Start Reference

> **One-line summary:** Caboodle turns your AI coding assistant into an OOUX facilitator that reads your research, collaborates with you, and publishes structured artifacts to a local resource site.

---

## Installation

```bash
# 1. Install Caboodle globally from GitHub
npm install -g github:abenjamin-ren/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install skills, rules, and site scaffold
caboodle install
```

## Getting Started

### Step 1: Start with the Planner

Every Caboodle project starts the same way: **tell the agent about your project**. Open your AI assistant (Cursor, Claude Code, etc.) and describe what you're working on:

> "I'm building a learning management system where instructors create courses and students enroll in them. Help me plan the OOUX process."

The planner will:
1. **Ask about your project**: what you're building, who the users are, and your timeline
2. **Check for existing work**: scan your resource site for Object Guides or prior artifacts
3. **Recommend a workflow**: suggest the right skill sequence for your situation
4. **Save a plan**: create a project directory with a step-by-step plan you can track

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

### Step 3: Collaborate at Checkpoints

Every skill has **collaboration checkpoints**. At these moments, the agent pauses and waits for your input. It does not guess or assume. You review, correct, and confirm before it moves to the next step.

### Step 4: Artifacts Save to Your Resource Site

Every finished artifact is saved as a markdown file in `site/docs/`. You'll build up a structured library over time. Preview it locally with `cd site && npm install && npm start`.

---

## The 18 Skills at a Glance

### 🔍 Discovery: "What's in our system?"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 01 | Object Discovery | Research materials | Validated object list |
| 02 | NOM Builder | Object list | Nesting matrix |
| 03 | CTA Inventory | Objects + context | Action list per object |
| 04 | Attribute Definition | Objects + CTAs | Data field map |

### 📐 Definition: "Tell me everything"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 05 | Object Guide | Object name + context | Comprehensive reference |
| 06 | Relationship Lens | Object pairs | MCSFD analysis |
| 07 | CTA Matrix | Objects + CTAs | Prioritized matrix |
| 08 | Shapeshifter Matrix | Attributes + views | Context visibility map |

### 🎨 Design: "How does it look?"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 09 | Object Map | All artifacts | Architecture diagram |
| 10 | Nav Flow | Object Map | Navigation blueprint |
| 11 | CTA Prioritization | CTA Matrix | Ranked backlog |
| 12 | Object Card | Shapeshifter data | Card/list specs |

### 🏗️ Build: "Make it real"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 13 | OO User Stories | All artifacts | Dev-ready stories |
| 14 | Relationship Governance | Relationships | Technical rules |
| 15 | Interaction Spec | Prioritized CTAs | Behavior specs |
| 16 | Data Model Spec | Attributes + rules | DB/API schema |

### 🔧 Standalone
| Skill | Purpose |
|-------|---------|
| System Audit | Evaluate an existing product against OOUX principles |
| ORCA Planner | Plan and track your ORCA workflow |

---

## Quick Prompts

| What You Want | What to Say |
|---------------|-------------|
| Start a project | "Plan an ORCA workflow for [project]" |
| Find objects | "Help me discover the objects in [feature/product]" |
| Document an object | "Build an Object Guide for [object name]" |
| Map relationships | "Create a NOM for [project]" |
| Audit a product | "Audit [product] against OOUX principles" |
| Design navigation | "Design nav flows for [project]" |
| Generate stories | "Write user stories for [project]" |

---

## Resource Site

Your resource site lives at `site/docs/`. Preview it locally:

```bash
cd site && npm install && npm start
```

### Structure
```
site/docs/
  objects/       ← Object Guides
  projects/      ← ORCA project artifacts
  process/       ← ORCA methodology
  workshops/     ← Facilitation guides
  case-studies/  ← Completed examples
```

---

## Updating

```bash
caboodle update      # Re-install latest skills/rules
caboodle uninstall   # Remove all Caboodle files
```

---

## Key OOUX Concepts

**SIP Test**: Every object must have **S**tructure (attributes), **I**nstances (examples), and **P**urpose (user value).

**MCSFD**: Five relationship lenses: **M**echanics, **C**ardinality, **S**orts, **F**ilters, and **D**ependency.

**Noun Foraging**: Extract every noun from research materials. Quantity first, then filter.

**Shapeshifting**: Objects look different in different contexts (card, list, detail, and search result).

**Object Guide**: A complete reference that documents one object.
