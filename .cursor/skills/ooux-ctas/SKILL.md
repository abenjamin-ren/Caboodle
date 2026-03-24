---
name: ooux-ctas
description: "When discussing user actions, CTAs, interaction patterns, action inventories, calls-to-action, or what users can do with objects"
---
# OOUX Calls-to-Action (CTAs)

Use this knowledge when helping users identify, categorize, prioritize, or map the actions available on objects.

## The Ancient Truth of CTAs

> Humans act on objects through direct manipulation.

Users expect to act on the thing they're looking at, right where they're looking at it. CTAs should be attached directly to the objects they affect. When a user sees a Student card, they should be able to act on that Student right there — not navigate somewhere else first.

## What is a CTA?

A CTA (Call-to-Action) is something a user can **do** to or with an object. In OOUX, every action belongs to a specific object. "Create Assessment" is a CTA on the ASSESSMENT object. "Enroll Student" is a CTA on the STUDENT object (or the CLASS object, depending on perspective).

CTAs are the "verbs" that act on "nouns" (objects). The CTA Matrix is where nouns and verbs meet.

## CTA Categories

### By Lifecycle Stage (CRUD+)

1. **Create**: Bring a new instance into existence
   - Create, Add, Upload, Import, Clone, Generate
2. **Read/View**: Access and consume information
   - View, Open, Preview, Download, Export, Print
3. **Update**: Modify an existing instance
   - Edit, Rename, Move, Reassign, Update, Configure
4. **Delete/Archive**: Remove or retire an instance
   - Delete, Archive, Deactivate, Remove, Trash
5. **Transition**: Change the state of an instance
   - Submit, Approve, Reject, Publish, Complete, Start, Pause

Start with CRUD as a baseline, then look for domain-specific CTAs beyond CRUD (Assign, Score, Enroll, etc.).

### By Actor

- **User CTAs**: Actions a human performs intentionally (Assign Assessment, Grade Student)
- **System CTAs**: Actions the system performs automatically (Auto-score, Sync Data, Send Notification)
- **Batch CTAs**: Actions performed on multiple instances at once (Bulk Assign, Mass Import)

### By Scope

- **Object-level CTAs**: Actions on the object itself (Edit Student, Delete Assessment)
- **Relationship CTAs**: Actions that create/modify relationships (Add Student to Class, Assign Assessment to Student)
- **Attribute-level CTAs**: Actions on specific attributes (Change Grade Level, Update Reading Score)

## The CTA Matrix

A grid mapping CTAs to objects. Each cell answers: "Can a user [CTA] a [Object]?"

Example:

| CTA | Student | Class | Assessment | Score |
|---|---|---|---|---|
| **Create** | Yes (Admin) | Yes (Teacher) | Yes (Admin) | System only |
| **View** | Yes (All) | Yes (All) | Yes (Teacher) | Yes (All) |
| **Edit** | Yes (Admin) | Yes (Teacher) | Yes (Admin) | No |
| **Delete** | Yes (Admin) | Yes (Admin) | Yes (Admin) | No |
| **Assign** | — | — | Yes (Teacher) | — |
| **Archive** | Yes (Admin) | Yes (Admin) | Yes (Admin) | — |

### CTA Matrix Rules
- Note WHO can perform each CTA (role-based access)
- Distinguish between "not applicable" (—) and "not permitted" (No)
- System-generated CTAs still count — note them as "System only"
- If a CTA applies to multiple objects, it appears in each column
- During Discovery (Round 1), brainstorm broadly — don't filter yet
- During Prioritization (Round 2), force-rank each CTA

## P/S/T/Q Force Ranking

In the Prioritization Round, every CTA must be force-ranked into one of four tiers. This ranking directly determines UI placement and visual prominence in the Representation Round:

**P — Primary**: The single most important action for this object. Shown as a prominent button, always visible. Only one CTA per object should be Primary.
- Example: "Take Assessment" for Assessment, "View Report" for Score

**S — Secondary**: Important actions performed regularly but not the main one. Shown as visible but less prominent (smaller buttons, icon buttons, secondary styling).
- Example: "Edit" for Assessment, "Print" for Score

**T — Tertiary**: Occasional actions. Hidden in overflow menus or "more actions" dropdowns.
- Example: "Archive" for Assessment, "Export" for Score

**Q — Quaternary**: Rare or admin-only actions. Buried in settings, admin panels, or batch-operation tools.
- Example: "Bulk Import" for Student, "Configure Scoring" for Assessment

### P/S/T/Q Rules
- Force the ranking — every CTA must land in exactly one tier
- Only ONE Primary per object (if you can't choose, you haven't prioritized enough)
- The ranking is role-aware: a Teacher's Primary CTA for Assessment may differ from an Admin's
- If two CTAs feel equally important, ask: "If a user could only do ONE thing, which would it be?"

## CTA Anti-Patterns

**Broken Objects** (the key anti-pattern) — Objects that users can see but can't act on directly. They have to navigate somewhere else, go to a parent object, or use an indirect pathway. This violates the Ancient Truth of CTAs.
- Example: Having to navigate to "Manage Playlist" to remove a Song, instead of acting on the Song directly.
- Fix: Attach CTAs to the objects they affect. Use the CTA Placement Designer (step 11) to position CTAs on cards and detail pages.

Other anti-patterns:
1. **Orphaned CTA**: An action that doesn't belong to any object. Fix: identify what object it acts upon.
2. **CTA overload**: Too many actions on one object, cluttering the UI. Fix: force-rank with P/S/T/Q and hide tertiary/quaternary actions.
3. **Ambiguous CTA**: "Manage" or "Process" — too vague. Fix: be specific about what the action does.
4. **Missing lifecycle**: An object can be created but not deleted or archived. Fix: consider the full lifecycle.
5. **Wrong object**: "Add Student" on the Class page — is this a CTA on Student or on Class? Answer: it's a relationship CTA (Add Student TO Class).

## Questions to Ask Users

1. "What can a user DO with a [Object]? List every action."
2. "Which action is the MOST important? What do users do first or most often?"
3. "Who is allowed to perform this action? All users, or specific roles?"
4. "Does the system perform any actions automatically on this object?"
5. "Can users perform this action on multiple [Objects] at once?"
6. "If you could only have ONE button on a [Object] card, what would it be?" (forces Primary selection)

## Related Skills

- For building the full CTA Matrix (Discovery): use skill `03-cta-matrix-builder`
- For force-ranking CTAs with P/S/T/Q (Prioritization): use skill `07-cta-prioritization`
- For positioning CTAs on cards and pages (Representation): use skill `11-cta-placement-designer`
- For writing object-oriented user stories: use skill `s8-user-story-writer`
