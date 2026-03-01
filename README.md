# Caboodle

**Caboodle** turns your AI coding assistant into an Object-Oriented UX (OOUX) facilitator. It installs 18 structured Agent Skills that guide you through the ORCA process — from discovering system objects to generating implementation specs — and publishes everything to a local, organized resource site.

No external dependencies. No API keys. Just clone, install, and start designing.

## Quick Start

```bash
# 1. Clone Caboodle
git clone https://github.com/abenjamin-ren/Caboodle.git ~/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install
node ~/Caboodle/bin/install.mjs install
```

Then open Cursor and type:

> "Plan an ORCA workflow for [describe your project]"

## What Gets Installed

| What | Where | Purpose |
|------|-------|---------|
| 18 Agent Skills | `.cursor/rules/caboodle-*.md` | Step-by-step OOUX workflows |
| 7 Cursor Rules | `.cursor/rules/caboodle-*.mdc` | Persistent OOUX context for the agent |
| AGENTS.md | `./AGENTS.md` | High-level agent instructions |
| Quick Reference | `./CABOODLE_QUICKSTART.md` | Human-readable cheat sheet |
| Resource Site | `./site/` | Docusaurus-powered artifact site |

## The 18 Skills

### Start Here
- **ORCA Planner** — Describe your project, get a sequenced plan with progress tracking

### Discovery Round (Steps 1-4)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 01 | Object Discovery | Validated object list (noun foraging + SIP test) |
| 02 | NOM Builder | Nested-Object Matrix |
| 03 | CTA Inventory | Actions per object with role mappings |
| 04 | Attribute Definition | Data fields per object |

### Definition Round (Steps 5-8)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 05 | Object Guide | Comprehensive reference for one object |
| 06 | Relationship Lens | MCSFD analysis for object pairs |
| 07 | CTA Matrix | Cross-reference of objects x actions |
| 08 | Shapeshifter Matrix | Attribute visibility per viewing context |

### Design Round (Steps 9-12)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 09 | Object Map | Visual system architecture diagram |
| 10 | Nav Flow | Navigation paths and entry points |
| 11 | CTA Prioritization | Ranked, phased action backlog |
| 12 | Object Card | Card/list UI component specs |

### Build Round (Steps 13-16)
| # | Skill | What You Produce |
|---|-------|-----------------|
| 13 | OO User Stories | Object-oriented dev stories |
| 14 | Relationship Governance | Technical rules for object interactions |
| 15 | Interaction Spec | Detailed CTA behavior specs |
| 16 | Data Model Spec | Database/API schema |

### Standalone
- **System Audit** — Evaluate an existing product against OOUX principles

## Resource Site

Caboodle includes a Docusaurus-powered resource site that serves as the organized home for all your OOUX artifacts. After installation, preview it:

```bash
cd site && npm install && npm start
```

### Site Structure
```
site/docs/
  objects/        Object Guides (one per object)
  projects/       Project-specific ORCA artifacts
  process/        ORCA methodology docs
  skills/         Skills reference
  workshops/      Facilitation guides
  case-studies/   Completed examples
```

## How Skills Work

1. **You describe** what you want to do in natural language
2. **The agent reads** your existing artifacts from the resource site for context
3. **You collaborate** at structured checkpoints — the agent never guesses
4. **Artifacts are saved** as markdown pages in your resource site

### Key Principle: Collaboration

Every skill has **collaboration checkpoints** where the agent pauses and waits for your input. It will never skip a checkpoint or make assumptions about your domain.

## Commands

```bash
node ~/Caboodle/bin/install.mjs install      # Full install
node ~/Caboodle/bin/install.mjs update       # Re-install latest skills/rules
node ~/Caboodle/bin/install.mjs uninstall    # Remove all Caboodle files
node ~/Caboodle/bin/install.mjs init-site    # Initialize resource site only
node ~/Caboodle/bin/install.mjs --help       # Show all commands
```

## Requirements

- **Node.js 18+** — [Download](https://nodejs.org)
- **Git** — For cloning the repository
- **Cursor** (recommended) or any AI coding assistant that supports custom rules

## What Is OOUX?

Object-Oriented UX (OOUX) is a design philosophy that grounds product decisions in the concrete "things" users interact with — **objects** like Student, Course, or Report — rather than screens or user flows.

The **ORCA process** (Objects, Relationships, CTAs, Attributes) is the framework for systematically discovering and designing those objects.

## Contributing

Contributions welcome! The canonical skill definitions live in `skills/` as `skill.yaml` + `SKILL.md` pairs. Templates and rules are in `templates/`.

## License

MIT
