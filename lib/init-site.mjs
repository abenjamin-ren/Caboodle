/**
 * Initialize the Caboodle resource site content directories in the target project.
 *
 * Creates the Docusaurus content structure and starter pages so users
 * can immediately begin generating and organizing OOUX artifacts.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

/**
 * Content directory structure for the Caboodle resource site.
 */
const CONTENT_DIRS = [
  "site/docs/process",
  "site/docs/skills",
  "site/docs/objects",
  "site/docs/projects",
  "site/docs/workshops",
  "site/docs/case-studies",
  "site/src/css",
];

/**
 * Initialize the Docusaurus-based resource site in the target project.
 * Creates content directories and starter files if they don't already exist.
 * @param {string} targetDir - The project root
 * @returns {{ created: string[], skipped: string[] }}
 */
export function initSite(targetDir) {
  const created = [];
  const skipped = [];

  // Create directory structure
  for (const dir of CONTENT_DIRS) {
    const fullPath = join(targetDir, dir);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
      created.push(dir);
    } else {
      skipped.push(dir);
    }
  }

  // Create docusaurus.config.js if missing
  const configPath = join(targetDir, "site", "docusaurus.config.js");
  if (!existsSync(configPath)) {
    writeFileSync(configPath, DOCUSAURUS_CONFIG, "utf-8");
    created.push("site/docusaurus.config.js");
  }

  // Create site/package.json if missing
  const sitePkgPath = join(targetDir, "site", "package.json");
  if (!existsSync(sitePkgPath)) {
    writeFileSync(sitePkgPath, SITE_PACKAGE_JSON, "utf-8");
    created.push("site/package.json");
  }

  // Create sidebars.js if missing
  const sidebarsPath = join(targetDir, "site", "sidebars.js");
  if (!existsSync(sidebarsPath)) {
    writeFileSync(sidebarsPath, SIDEBARS_CONFIG, "utf-8");
    created.push("site/sidebars.js");
  }

  // Create custom CSS
  const cssPath = join(targetDir, "site", "src", "css", "custom.css");
  if (!existsSync(cssPath)) {
    writeFileSync(cssPath, CUSTOM_CSS, "utf-8");
    created.push("site/src/css/custom.css");
  }

  // Create starter content pages
  const starterPages = {
    "site/docs/intro.md": INTRO_PAGE,
    "site/docs/process/index.md": PROCESS_INDEX,
    "site/docs/skills/index.md": SKILLS_INDEX,
    "site/docs/objects/index.md": OBJECTS_INDEX,
    "site/docs/projects/index.md": PROJECTS_INDEX,
    "site/docs/workshops/index.md": WORKSHOPS_INDEX,
    "site/docs/case-studies/index.md": CASE_STUDIES_INDEX,
    "site/docs/contributing.md": CONTRIBUTING_PAGE,
  };

  for (const [relPath, content] of Object.entries(starterPages)) {
    const fullPath = join(targetDir, relPath);
    if (!existsSync(fullPath)) {
      writeFileSync(fullPath, content, "utf-8");
      created.push(relPath);
    }
  }

  return { created, skipped };
}

// ─── Template Content ──────────────────────────────────────────────

const DOCUSAURUS_CONFIG = `// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Caboodle',
  tagline: 'Your Object-Oriented UX Resource Site',
  url: 'https://your-site-url.example.com',
  baseUrl: '/',
  organizationName: 'your-org',
  projectName: 'caboodle-site',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  staticDirectories: [],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Caboodle',
        items: [
          { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Docs' },
          { to: '/objects', label: 'Objects', position: 'left' },
          { to: '/projects', label: 'Projects', position: 'left' },
          { to: '/workshops', label: 'Workshops', position: 'left' },
          { href: 'https://github.com/abenjamin-ren/Caboodle', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Getting Started', to: '/' },
              { label: 'ORCA Process', to: '/process' },
              { label: 'Skills Reference', to: '/skills' },
            ],
          },
          {
            title: 'Build',
            items: [
              { label: 'Object Directory', to: '/objects' },
              { label: 'Projects', to: '/projects' },
              { label: 'Case Studies', to: '/case-studies' },
            ],
          },
        ],
        copyright: 'Built with Caboodle + OOUX.',
      },
    }),
};

module.exports = config;
`;

const SITE_PACKAGE_JSON = `{
  "name": "caboodle-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "clear": "docusaurus clear"
  },
  "dependencies": {
    "@docusaurus/core": "^3.7.0",
    "@docusaurus/preset-classic": "^3.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "overrides": {
    "minimatch": "^3.1.5",
    "serialize-javascript": "^7.0.3"
  }
}
`;

const SIDEBARS_CONFIG = `/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'ORCA Process',
      link: { type: 'doc', id: 'process/index' },
      items: [{ type: 'autogenerated', dirName: 'process' }],
    },
    {
      type: 'category',
      label: 'Agent Skills',
      link: { type: 'doc', id: 'skills/index' },
      items: [{ type: 'autogenerated', dirName: 'skills' }],
    },
    {
      type: 'category',
      label: 'Object Directory',
      link: { type: 'doc', id: 'objects/index' },
      items: [{ type: 'autogenerated', dirName: 'objects' }],
    },
    {
      type: 'category',
      label: 'Projects',
      link: { type: 'doc', id: 'projects/index' },
      items: [{ type: 'autogenerated', dirName: 'projects' }],
    },
    {
      type: 'category',
      label: 'Workshops',
      link: { type: 'doc', id: 'workshops/index' },
      items: [{ type: 'autogenerated', dirName: 'workshops' }],
    },
    {
      type: 'category',
      label: 'Case Studies',
      link: { type: 'doc', id: 'case-studies/index' },
      items: [{ type: 'autogenerated', dirName: 'case-studies' }],
    },
  ],
};

module.exports = sidebars;
`;

const CUSTOM_CSS = `:root {
  --ifm-color-primary: #2e5a88;
  --ifm-color-primary-dark: #294f78;
  --ifm-color-primary-darker: #264b71;
  --ifm-color-primary-darkest: #1f3d5d;
  --ifm-color-primary-light: #336598;
  --ifm-color-primary-lighter: #36699f;
  --ifm-color-primary-lightest: #3d77b3;
  --ifm-code-font-size: 95%;
}

[data-theme='dark'] {
  --ifm-color-primary: #5ba3d9;
  --ifm-color-primary-dark: #3e93d3;
  --ifm-color-primary-darker: #3089ce;
  --ifm-color-primary-darkest: #276faa;
  --ifm-color-primary-light: #78b3df;
  --ifm-color-primary-lighter: #86bae2;
  --ifm-color-primary-lightest: #b1d2ed;
}
`;

const INTRO_PAGE = `---
slug: /
sidebar_position: 1
title: Welcome to Caboodle
---

# Welcome to Caboodle

**Caboodle** is your team's OOUX resource site — a living, organized home for all the objects, relationships, and design artifacts you discover using Object-Oriented UX.

## What Is OOUX?

Object-Oriented UX (OOUX) is a design philosophy that grounds product decisions in the concrete "things" users interact with — **objects** like Student, Assignment, or Report — rather than in screens or flows.

The **ORCA process** (Objects, Relationships, CTAs, Attributes) is the 4-round framework for discovering and defining those objects and turning them into design artifacts.

## What Caboodle Does

Caboodle pairs **AI-powered Agent Skills** with a **structured resource site** to help you:

1. **Discover** the objects in your system by foraging for nouns in your research materials
2. **Map** how objects relate to each other through nested-object matrices and relationship specs
3. **Define** what users can do with each object via CTA inventories
4. **Design** navigation flows, object cards, and cross-context consistency matrices
5. **Publish** everything into this organized, searchable, shareable site

## Getting Started

1. **New to OOUX?** Start with the [ORCA Process overview](/process) to learn the concepts
2. **Ready to work?** Ask the agent: *"Plan an ORCA workflow for [your project]"*
3. **Just browsing?** Check out the [Object Directory](/objects) to see documented objects

## How to Use Agent Skills

Skills are step-by-step workflows that run inside Cursor (or any AI coding assistant). They:

- Accept **any source material** you provide — links, files, images, pasted text
- **Collaborate** with you at structured checkpoints (they never guess or assume)
- **Publish** finished artifacts as markdown pages in this resource site

See the [Skills Reference](/skills) for the full catalog.
`;

const PROCESS_INDEX = `---
sidebar_position: 1
title: The ORCA Process
---

# The ORCA Process

ORCA stands for **Objects, Relationships, CTAs, Attributes** — the four pillars of Object-Oriented UX. The process has 4 rounds with 16 core steps.

## Round 1: Discovery — "What exists in our system?"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 1 | Object Discovery | Validated object list (noun foraging + SIP test) |
| 2 | NOM Builder | Nested-Object Matrix showing containment |
| 3 | CTA Inventory | Action inventory per object with role mappings |
| 4 | Attribute Definition | Data fields per object with types |

## Round 2: Definition — "Deep-dive into each object"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 5 | Object Guide | Comprehensive reference for one object |
| 6 | Relationship Lens | MCSFD analysis for all object pairs |
| 7 | CTA Matrix | Cross-reference of objects x actions |
| 8 | Shapeshifter Matrix | How objects appear in different views |

## Round 3: Design — "Shape the solution"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 9 | Object Map | Visual system architecture diagram |
| 10 | Nav Flow | Navigation paths and entry points |
| 11 | CTA Prioritization | Ranked, phased action backlog |
| 12 | Object Card | Card/list UI component specifications |

## Round 4: Build — "Implementation specs"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 13 | OO User Stories | Object-oriented development stories |
| 14 | Relationship Governance | Technical rules for object interactions |
| 15 | Interaction Spec | Detailed CTA behavior specifications |
| 16 | Data Model Spec | Database tables and API schemas |

## Key Concepts

### The SIP Test

Every candidate noun must pass three tests to qualify as a system object:

- **S -- Structure**: Does it have its own attributes? Could you design a detail page for it?
- **I -- Instances**: Does it have multiple examples?
- **P -- Purpose**: Do users care about it for its own sake?

### Noun Foraging

Extract **every noun** from your research materials -- user interviews, PRDs, UI screenshots, domain documents. Don't filter. Quantity first.

### The Five Relationship Lenses (MCSFD)

- **M -- Mechanics**: How are objects connected? (nested, linked, embedded, aggregated)
- **C -- Cardinality**: How many of each? (1:1, 1:many, many:many)
- **S -- Sorts**: How are related items ordered?
- **F -- Filters**: How can users narrow related lists?
- **D -- Dependency**: What happens to B when A is deleted?
`;

const SKILLS_INDEX = `---
sidebar_position: 1
title: Agent Skills Reference
---

# Agent Skills Reference

Caboodle includes **18 Agent Skills** — structured workflows that guide you through every step of the ORCA process.

## How Skills Work

1. You describe what you want to do in natural language
2. The agent activates the right skill and reads your existing artifacts for context
3. At each checkpoint, the skill **pauses and asks you** for input or confirmation
4. The finished artifact is saved as a markdown page in your Caboodle site

## Start Here

| Skill | One-Liner |
|-------|-----------|
| ORCA Planner | Describe your project, get a sequenced skill plan with progress tracking |

## Discovery Round

| # | Skill | What You Produce |
|---|-------|-----------------|
| 01 | Object Discovery | Validated object list (noun foraging + SIP test) |
| 02 | NOM Builder | Nested-Object Matrix showing containment hierarchy |
| 03 | CTA Inventory | Action list per object with role mappings |
| 04 | Attribute Definition | Data fields per object with types and view context |

## Definition Round

| # | Skill | What You Produce |
|---|-------|-----------------|
| 05 | Object Guide | Comprehensive reference for one object |
| 06 | Relationship Lens | MCSFD analysis for object pairs |
| 07 | CTA Matrix | Cross-reference of objects x actions with priorities |
| 08 | Shapeshifter Matrix | Attribute visibility per viewing context |

## Design Round

| # | Skill | What You Produce |
|---|-------|-----------------|
| 09 | Object Map | Visual system architecture diagram |
| 10 | Nav Flow | Navigation paths and entry points |
| 11 | CTA Prioritization | Ranked, phased action backlog |
| 12 | Object Card | Card/list UI component specs |

## Build Round

| # | Skill | What You Produce |
|---|-------|-----------------|
| 13 | OO User Stories | Object-oriented development stories with acceptance criteria |
| 14 | Relationship Governance | Technical rules for object interactions |
| 15 | Interaction Spec | Detailed CTA behavior specs |
| 16 | Data Model Spec | Database/API schema design |

## Standalone

| Skill | One-Liner |
|-------|-----------|
| System Audit | Evaluate an existing product against OOUX principles |
`;

const OBJECTS_INDEX = `---
sidebar_position: 1
title: Object Directory
---

# Object Directory

This directory contains **Object Guides** — comprehensive references for every object in your system.

## What Is an Object Guide?

An Object Guide is like a glossary entry on steroids. For each object, it documents:

- **Definition** — What is this thing?
- **SIP Validation** — Structure, Instances, Purpose proof
- **Key Attributes** — What properties does it have?
- **Relationships** — How does it connect to other objects? (MCSFD specs)
- **CTAs** — What can users do with it?
- **Visual Representation** — How does it appear in the UI?

## Adding Objects

Object Guides are generated by the **Object Guide Builder** skill (05). To create one:

1. Ask the agent: *"Build an Object Guide for [object name]"*
2. Provide source materials (PRDs, wireframes, user research)
3. Collaborate through the checkpoints
4. The guide is saved here automatically

You can also create guides manually — just add a markdown file to the \`site/docs/objects/\` directory following the template structure.
`;

const PROJECTS_INDEX = `---
sidebar_position: 1
title: Projects
---

# Projects

This section contains project-specific ORCA work — discovery results, plans, and artifacts scoped to a particular initiative.

## Creating a Project

Use the **ORCA Planner** skill (s6) to start a new project:

1. Ask: *"Plan an ORCA workflow for [your project]"*
2. Describe your project and goals
3. The planner builds a sequenced plan and saves it here
4. As you work through skills, artifacts are organized under your project

## Project Structure

Each project gets its own directory with:

\`\`\`
projects/
  my-project/
    plan.md                    # ORCA Plan with progress tracking
    object-discovery.md        # Step 1 results
    nom.md                     # Nested-Object Matrix
    cta-matrix.md              # CTA Matrix
    object-guides/             # Per-object deep dives
      student.md
      assignment.md
    nav-flow.md                # Navigation blueprint
\`\`\`
`;

const WORKSHOPS_INDEX = `---
sidebar_position: 1
title: Workshops
---

# Workshops

This section contains workshop facilitation guides and materials for running ORCA sessions with your team.

## Creating Workshop Materials

Use the **Facilitation Kit** skill (s4):

1. Ask: *"Help me facilitate an ORCA workshop for [team/project]"*
2. Describe your team, goals, and time constraints
3. The skill generates agendas, scripts, and handouts
4. Materials are saved here for reuse

## Workshop Types

| Workshop | Duration | Best For |
|----------|----------|----------|
| Object Discovery Sprint | 2 hours | Identifying objects in a new feature |
| NOM Jam | 1 hour | Mapping relationships collaboratively |
| CTA Audit | 1.5 hours | Reviewing actions across objects |
| Full ORCA Day | 6 hours | Complete discovery-to-design cycle |
`;

const CASE_STUDIES_INDEX = `---
sidebar_position: 1
title: Case Studies
---

# Case Studies

Real-world examples of OOUX applied to products and features. Each case study shows the full ORCA journey from discovery to design artifacts.

## Contributing a Case Study

After completing an ORCA workflow, consider documenting it as a case study:

1. What was the project and its goals?
2. What objects were discovered?
3. What insights did the process reveal?
4. What artifacts were produced?
5. How did the artifacts influence the final design?

Save case studies as markdown files in \`site/docs/case-studies/\`.
`;

const CONTRIBUTING_PAGE = `---
sidebar_position: 99
title: Contributing
---

# Contributing to Your Caboodle Site

Your Caboodle site is a living resource. Both **Agent Skills** and **human contributors** can add content.

## How Agent Skills Add Content

When you run a Caboodle skill, the agent:
1. Reads existing pages from this site for context
2. Collaborates with you through the workflow
3. Saves the finished artifact as a markdown file here

You always approve the content before it is saved.

## How to Add Content Manually

### Adding an Object Guide

1. Create a new file in \`site/docs/objects/\`, e.g., \`student.md\`
2. Add Docusaurus frontmatter at the top:

\`\`\`yaml
---
title: "Object Guide: Student"
tags: [object-guide, student]
---
\`\`\`

3. Follow the Object Guide template structure:
   - Overview (title, purpose, core user)
   - Instances (3-5 concrete examples)
   - Attributes (table with name, type, required, views)
   - CTAs (table with action, category, roles, context)
   - Relationships (parents, children, references)
   - Lifecycle (state transitions)
   - Edge Cases and Business Rules

### Adding Project Artifacts

1. Create a directory under \`site/docs/projects/\` with your project name
2. Add individual artifact files (object-discovery.md, nom.md, etc.)
3. Each file should have frontmatter with title and tags

### Adding a Workshop Guide

1. Create a file in \`site/docs/workshops/\`
2. Include: agenda, facilitator notes, participant handouts, time estimates

### Adding a Case Study

1. Create a file in \`site/docs/case-studies/\`
2. Document: project context, objects discovered, insights, artifacts produced, outcomes

## Previewing Your Site

\`\`\`bash
cd site
npm install    # First time only
npm start      # Opens at http://localhost:3000
\`\`\`

## Tips

- Use **relative links** between pages: \`[see Student](../objects/student.md)\`
- Add **tags** in frontmatter for better searchability
- Keep Object Guide titles consistent: "Object Guide: [Name]"
- Use **tables** for attributes, CTAs, and relationships
- The sidebar auto-generates from the directory structure
`;

// ─── Project Placeholder Definitions ───────────────────────────────

/**
 * All standard ORCA artifacts for a project, in workflow order.
 * Each entry defines the file, sidebar position, skill name, and the
 * prompt a user would give their AI assistant to run that skill.
 */
export const PROJECT_ARTIFACTS = [
  {
    file: "orca-plan.md",
    sidebarPosition: 1,
    skill: "ORCA Planner",
    prompt: "Plan an ORCA workflow for {project}",
  },
  {
    file: "object-discovery.md",
    sidebarPosition: 2,
    skill: "Object Discovery (01)",
    prompt: "Run the Object Discovery skill for {project}",
  },
  {
    file: "nom.md",
    sidebarPosition: 3,
    skill: "NOM Builder (02)",
    prompt: "Build the NOM for {project}",
  },
  {
    file: "cta-inventory.md",
    sidebarPosition: 4,
    skill: "CTA Inventory (03)",
    prompt: "Run the CTA Inventory skill for {project}",
  },
  {
    file: "attributes.md",
    sidebarPosition: 5,
    skill: "Attribute Definition (04)",
    prompt: "Define attributes for {project}",
  },
  {
    file: "relationship-lens.md",
    sidebarPosition: 6,
    skill: "Relationship Lens (06)",
    prompt: "Run the Relationship Lens skill for {project}",
  },
  {
    file: "cta-matrix.md",
    sidebarPosition: 7,
    skill: "CTA Matrix (07)",
    prompt: "Build the CTA Matrix for {project}",
  },
  {
    file: "shapeshifter-matrix.md",
    sidebarPosition: 8,
    skill: "Shapeshifter Matrix (08)",
    prompt: "Run the Shapeshifter Matrix skill for {project}",
  },
  {
    file: "object-map.md",
    sidebarPosition: 9,
    skill: "Object Map (09)",
    prompt: "Create the Object Map for {project}",
  },
  {
    file: "nav-flow.md",
    sidebarPosition: 10,
    skill: "Nav Flow (10)",
    prompt: "Build the Nav Flow for {project}",
  },
  {
    file: "cta-prioritization.md",
    sidebarPosition: 11,
    skill: "CTA Prioritization (11)",
    prompt: "Prioritize CTAs for {project}",
  },
  {
    file: "object-cards.md",
    sidebarPosition: 12,
    skill: "Object Card (12)",
    prompt: "Design Object Cards for {project}",
  },
  {
    file: "user-stories.md",
    sidebarPosition: 13,
    skill: "OO User Stories (13)",
    prompt: "Write user stories for {project}",
  },
  {
    file: "relationship-governance.md",
    sidebarPosition: 14,
    skill: "Relationship Governance (14)",
    prompt: "Run the Relationship Governance skill for {project}",
  },
  {
    file: "interaction-specs.md",
    sidebarPosition: 15,
    skill: "Interaction Spec (15)",
    prompt: "Write interaction specs for {project}",
  },
  {
    file: "data-model.md",
    sidebarPosition: 16,
    skill: "Data Model Spec (16)",
    prompt: "Build the data model for {project}",
  },
];

/**
 * Build the markdown content for a placeholder page.
 * @param {string} projectName - Human-readable project name
 * @param {{ skill: string, sidebarPosition: number, prompt: string }} artifact
 * @returns {string}
 */
function buildPlaceholder(projectName, { skill, sidebarPosition, prompt }) {
  const resolvedPrompt = prompt.replace("{project}", projectName);
  return `---
title: "${skill}: ${projectName}"
sidebar_position: ${sidebarPosition}
tags: [placeholder]
---

# ${skill}: ${projectName}

> ⏳ **Not yet started.**
>
> Run the **${skill}** skill to generate this artifact.
>
> Ask your AI assistant: *"${resolvedPrompt}"*
`;
}

/**
 * Create placeholder pages for all standard ORCA artifacts in a project
 * directory that don't already have real content.
 *
 * Call this whenever a new project directory is first created so that
 * every cross-link in the site resolves immediately.
 *
 * @param {string} targetDir - The project root (e.g. /path/to/my-project)
 * @param {string} projectSlug - The kebab-case directory name (e.g. "renaissance-homepage")
 * @param {string} [projectName] - Human-readable name (defaults to projectSlug)
 * @returns {{ created: string[], skipped: string[] }}
 */
export function createProjectPlaceholders(targetDir, projectSlug, projectName) {
  const displayName = projectName || projectSlug;
  const projectDir = join(targetDir, "site", "docs", "projects", projectSlug);
  const created = [];
  const skipped = [];

  mkdirSync(projectDir, { recursive: true });

  for (const artifact of PROJECT_ARTIFACTS) {
    const filePath = join(projectDir, artifact.file);
    if (!existsSync(filePath)) {
      writeFileSync(filePath, buildPlaceholder(displayName, artifact), "utf-8");
      created.push(`site/docs/projects/${projectSlug}/${artifact.file}`);
    } else {
      skipped.push(`site/docs/projects/${projectSlug}/${artifact.file}`);
    }
  }

  return { created, skipped };
}