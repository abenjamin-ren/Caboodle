---
sidebar_position: 1
title: The ORCA Process
---

# The ORCA Process

ORCA stands for **Objects, Relationships, CTAs, Attributes** - the four pillars of Object-Oriented UX. The process has 4 rounds with 16 core steps.

## Round 1: Discovery - "What exists in our system?"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 1 | Object Discovery | Validated object list (noun foraging + SIP test) |
| 2 | NOM Builder | Nested-Object Matrix showing containment |
| 3 | CTA Inventory | Action inventory per object with role mappings |
| 4 | Attribute Definition | Data fields per object with types |

## Round 2: Definition - "Deep-dive into each object"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 5 | Object Guide | Comprehensive reference for one object |
| 6 | Relationship Lens | MCSFD analysis for all object pairs |
| 7 | CTA Matrix | Cross-reference of objects x actions |
| 8 | Shapeshifter Matrix | How objects appear in different views |

## Round 3: Design - "Shape the solution"

| Step | Skill | What You Produce |
|------|-------|-----------------|
| 9 | Object Map | Visual system architecture diagram |
| 10 | Nav Flow | Navigation paths and entry points |
| 11 | CTA Prioritization | Ranked, phased action backlog |
| 12 | Object Card | Card/list UI component specifications |

## Round 4: Build - "Implementation specs"

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
