# Caboodle Quick-Start Reference

> **One-line summary:** Caboodle turns your AI coding assistant into an OOUX facilitator that reads your research, collaborates with you, and publishes structured artifacts to a local resource site.

---

## Installation

```bash
# 1. Clone Caboodle
git clone https://github.com/abenjamin-ren/Caboodle.git ~/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install skills, rules, and site scaffold
node ~/Caboodle/bin/install.mjs install
```

## Getting Started

**Start with the Planner.** Open Cursor and type:

> "Plan an ORCA workflow for [describe your project]"

The ORCA Planner will:
1. Ask about your project and goals
2. Check for existing work in your resource site
3. Recommend the right skill sequence
4. Save a plan with progress tracking

---

## The 18 Skills at a Glance

### 🔍 Discovery — "What's in our system?"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 01 | Object Discovery | Research materials | Validated object list |
| 02 | NOM Builder | Object list | Nesting matrix |
| 03 | CTA Inventory | Objects + context | Action list per object |
| 04 | Attribute Definition | Objects + CTAs | Data field map |

### 📐 Definition — "Tell me everything"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 05 | Object Guide | Object name + context | Comprehensive reference |
| 06 | Relationship Lens | Object pairs | MCSFD analysis |
| 07 | CTA Matrix | Objects + CTAs | Prioritized matrix |
| 08 | Shapeshifter Matrix | Attributes + views | Context visibility map |

### 🎨 Design — "How does it look?"
| # | Skill | You Provide | You Get |
|---|-------|-------------|---------|
| 09 | Object Map | All artifacts | Architecture diagram |
| 10 | Nav Flow | Object Map | Navigation blueprint |
| 11 | CTA Prioritization | CTA Matrix | Ranked backlog |
| 12 | Object Card | Shapeshifter data | Card/list specs |

### 🏗️ Build — "Make it real"
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
node ~/Caboodle/bin/install.mjs update      # Re-install latest skills/rules
node ~/Caboodle/bin/install.mjs uninstall    # Remove all Caboodle files
```

---

## Key OOUX Concepts

**SIP Test** — Every object must have **S**tructure (attributes), **I**nstances (examples), **P**urpose (user value).

**MCSFD** — Five relationship lenses: **M**echanics, **C**ardinality, **S**orts, **F**ilters, **D**ependency.

**Noun Foraging** — Extract every noun from research materials. Quantity first, filter later.

**Shapeshifting** — Objects look different in different contexts (card, list, detail, search result).

**Object Guide** — A "glossary entry on steroids" documenting everything about one object.
