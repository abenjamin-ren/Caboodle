---
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

1. Create a new file in `site/docs/objects/`, e.g., `student.md`
2. Add Docusaurus frontmatter at the top:

```yaml
---
title: "Object Guide: Student"
tags: [object-guide, student]
---
```

3. Follow the Object Guide template structure:
   - Overview (title, purpose, core user)
   - Instances (3-5 concrete examples)
   - Attributes (table with name, type, required, views)
   - CTAs (table with action, category, roles, context)
   - Relationships (parents, children, references)
   - Lifecycle (state transitions)
   - Edge Cases and Business Rules

### Adding Project Artifacts

1. Create a directory under `site/docs/projects/` with your project name
2. Add individual artifact files (object-discovery.md, nom.md, etc.)
3. Each file should have frontmatter with title and tags

### Adding a Workshop Guide

1. Create a file in `site/docs/workshops/`
2. Include: agenda, facilitator notes, participant handouts, time estimates

### Adding a Case Study

1. Create a file in `site/docs/case-studies/`
2. Document: project context, objects discovered, insights, artifacts produced, outcomes

## Previewing Your Site

```bash
cd site
npm install    # First time only
npm start      # Opens at http://localhost:3000
```

## Tips

- Use **relative links** between pages: `[see Student](../objects/student.md)`
- Add **tags** in frontmatter for better searchability
- Keep Object Guide titles consistent: "Object Guide: [Name]"
- Use **tables** for attributes, CTAs, and relationships
- The sidebar auto-generates from the directory structure
