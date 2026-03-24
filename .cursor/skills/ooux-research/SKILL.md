---
name: ooux-research
description: "When the user asks to research a topic, gather background information, do competitive analysis, find UX patterns, explore domain knowledge, or prepare context for design work"
---
# OOUX Research

Use this knowledge when helping users research topics to support design work. The Research skill (`s7-research`) gathers information from multiple sources and produces structured research documents saved to `docs/research/`.

## When to Use

- User asks to "research", "look into", "find out about", or "explore" a topic
- User needs competitive analysis or UX pattern examples
- User wants to understand a domain area before starting ORCA work
- User needs context about how other products solve a problem
- User wants to gather background before Object Discovery or Object Guide building
- User asks "what do we know about [topic]?"

## What It Does

1. Searches **project files** for existing research, documentation, and technical context
2. Searches the **web** for domain knowledge, patterns, and competitive examples
3. Synthesizes findings into a structured markdown document in `docs/research/`

## Research Depths

| Depth | Time | Scope |
|-------|------|-------|
| **Quick scan** | 5–10 min | Key findings from 2–3 sources, bullet-point summary |
| **Standard** | 15–30 min | Multi-source research with synthesis and recommendations |
| **Deep dive** | 30–60 min | Exhaustive research with competitive analysis and detailed design implications |

## Connecting to OOUX

Research findings always connect back to OOUX concepts:
- **Object candidates** — Did research reveal new objects? (Flag for SIP validation)
- **Relationship insights** — Did it reveal connections between objects?
- **CTA discoveries** — Did it reveal unmapped user actions?
- **Attribute insights** — Did it reveal important data points?

## Output

Research documents are saved to `docs/research/` with this naming convention:
```
docs/research/YYYY-MM-DD-{topic-slug}.md
```

## Related Skills

- Before Object Discovery (01): Research the domain to prepare for noun foraging
- Before Object Guide Builder (05): Research the object's real-world context
- With Engineering Handoff (s5): Research technical constraints and APIs
- With ORCA Planner (s6): Research can be added as a preparatory step in any ORCA plan

## Skill File

See skill `s7-research` for the full research procedure.
