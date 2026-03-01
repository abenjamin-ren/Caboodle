# Caboodle

**Caboodle** turns your AI coding assistant into an Object-Oriented UX (OOUX) facilitator. It installs 18 structured Agent Skills that guide you through the ORCA process, from discovering system objects to generating implementation specs. It also publishes everything to a local, organized resource site.

No external dependencies. No API keys. Install in one command and start designing.

---

## Quick Start

### Option A: npm (recommended)

```bash
# 1. Install Caboodle globally from GitHub
npm install -g github:abenjamin-ren/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install skills and resource site into your project
caboodle install
```

### Option B: Git Clone

```bash
# 1. Clone Caboodle
git clone https://github.com/abenjamin-ren/Caboodle.git ~/Caboodle

# 2. Navigate to your project
cd /path/to/your/project

# 3. Install
node ~/Caboodle/bin/cli.js install
```

Then open Cursor and type:

> "Plan an ORCA workflow for my project"

---

## The 18 Skills

| Phase | # | Skill | What You Get |
|-------|---|-------|--------------|
| **Start** | - | ORCA Planner | Sequenced plan with progress tracking |
| **Discovery** | 01 | Object Discovery | Validated object list (noun foraging + SIP test) |
| | 02 | NOM Builder | Nested-Object Matrix showing containment |
| | 03 | CTA Inventory | Actions per object with role mappings |
| | 04 | Attribute Definition | Data fields per object with types |
| **Definition** | 05 | Object Guide | Comprehensive reference for one object |
| | 06 | Relationship Lens | MCSFD analysis for object pairs |
| | 07 | CTA Matrix | Cross-reference of objects × actions |
| | 08 | Shapeshifter Matrix | Attribute visibility per viewing context |
| **Design** | 09 | Object Map | Visual system architecture diagram |
| | 10 | Nav Flow | Navigation paths and entry points |
| | 11 | CTA Prioritization | Ranked, phased action backlog |
| | 12 | Object Card | Card/list UI component specs |
| **Build** | 13 | OO User Stories | Dev stories with acceptance criteria |
| | 14 | Relationship Governance | Technical rules for object interactions |
| | 15 | Interaction Spec | Detailed CTA behavior specs |
| | 16 | Data Model Spec | Database/API schema |
| **Standalone** | - | System Audit | Evaluate an existing product against OOUX principles |

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

```bash
caboodle install        # Full install (skills, rules, site scaffold)
caboodle update         # Re-install latest skills and rules
caboodle uninstall      # Remove all Caboodle files from your project
caboodle init-site      # Initialize the resource site only
caboodle verify         # Check your installation
caboodle --help         # Show all commands
caboodle --version      # Show version
```

> If you cloned the repo instead of installing via npm, substitute `node ~/Caboodle/bin/cli.js` for `caboodle`.

## Requirements

- **Node.js 18+** - [Download](https://nodejs.org)
- **npm** - Comes with Node.js; used to install the package
- **Cursor** (recommended) or any AI coding assistant that supports custom rules

## What Is OOUX?

Object-Oriented UX (OOUX) is a design philosophy that grounds product decisions in the concrete "things" users interact with, such as **objects** like Student, Course, or Report, rather than screens or user flows.

The **ORCA process** (Objects, Relationships, CTAs, Attributes) is the framework for systematically discovering and designing those objects across four rounds: Discovery, Definition, Design, and Build.

## Contributing

Contributions welcome! The canonical skill definitions live in `skills/` as `skill.yaml` + `SKILL.md` pairs. Templates and rules are in `templates/`.

## License

MIT
