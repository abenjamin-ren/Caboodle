---
name: ooux-relationships
description: "When discussing relationships between objects, MCSFD specs, cardinality, nested objects, dependency, or how objects connect to each other"
---
# OOUX Relationships

Use this knowledge when helping users understand, map, or specify how objects relate to each other.

## The Ancient Truth of Relationships

> Humans navigate most naturally through relationships between objects.

Users don't navigate through menus and feature lists — they navigate from one object to a related object. "Show me this Student's Classes" then "Show me this Class's Assessments" then "Show me this Assessment's Scores." Relationships are the highways of your system's navigation.

## The Nested-Object Matrix (NOM)

The NOM is a grid that maps which objects appear inside other objects. Read it as: "When I'm looking at [row object], do I see a list of [column object]?"

Example:

|  | Student | Class | Assessment | Score |
|---|---|---|---|---|
| **Student** | — | Yes | Yes | Yes |
| **Class** | Yes | — | Yes | No |
| **Assessment** | No | No | — | Yes |
| **Score** | No | No | No | — |

Reading: "When I'm looking at a Student, I see a list of Classes, Assessments, and Scores."

### NOM Rules
- Asymmetry is normal: Student shows Classes, but Class also shows Students
- If A nests B and B nests C, A does NOT automatically nest C (no transitive nesting)
- Every "Yes" cell implies a list view of that object in the context of the parent
- "No" means users don't see that relationship — even if it exists in the database
- The NOM directly feeds the Nav Flow Designer (step 10), where nested objects become list views on detail pages

## The Five Relationship Lenses (MCSFD)

"My Cat Saving Fire Department" — a mnemonic for five lenses to analyze every relationship:

For each relationship between two objects, specify all five lenses:

### M — Mechanics
How are the objects connected?
- **Nested**: B appears inside A's detail page (e.g., Scores nested inside Student)
- **Linked**: A references B but B has its own page (e.g., Student linked to School)
- **Embedded**: B's data appears inline within A (e.g., Teacher name shown on Class)
- **Aggregated**: A shows a summary of B (e.g., Class shows average Score)

### C — Cardinality
How many of each?
- **1:1** — One Student has one Profile
- **1:many** — One Class has many Students
- **many:many** — Many Students take many Assessments
- **0-or-1:many** — A Student may or may not have a Tutor

Always specify from both directions: "A Student belongs to many Classes; a Class contains many Students."

### S — Sorts
How are related items ordered?
- Default sort (e.g., Students sorted by last name)
- Available sort options (e.g., by grade level, by score, by enrollment date)
- Force-rank: which sort is most useful to users?

### F — Filters
How can users narrow the related list?
- Available filters (e.g., filter Students by grade level, by status)
- Default filter state (e.g., show only active Students)
- Combined filters (e.g., grade + reading level)

### D — Dependency
What happens to B when A changes or is deleted?
- **Cascade delete**: Deleting a Class deletes its Assignments
- **Orphan**: Deleting a Class leaves Students intact (they exist independently)
- **Block**: Cannot delete a School if it has active Classes
- **Archive**: Deleting a Teacher archives their Classes, doesn't destroy them

## Relationship Anti-Patterns

**Isolated Objects** (the key anti-pattern) — Objects that exist in the system but have no visible connections to other objects. Users hit dead ends or can't discover related information. This violates the Ancient Truth of Relationships.
- Example: A Score page with no link back to the Student who earned it or the Assessment it came from.
- Fix: Check the NOM — every object should nest inside at least one other object, and most objects should have at least one nested object of their own.

Other anti-patterns:
1. **Junk drawer**: An object that nests too many unrelated things (like a "Dashboard" that shows everything). Fix: identify what objects actually belong there.
2. **Hidden relationship**: Two objects are related but the UI doesn't show it. Fix: add the NOM cell.
3. **Forced intermediary**: Users must navigate through C to get from A to B when a direct link would be simpler. Fix: add a shortcut.
4. **Circular dependency**: A depends on B which depends on A. Fix: identify which dependency is primary.
5. **Missing reverse**: A shows B but B doesn't show A, even though users need both directions. Fix: add the reverse nesting.

## Questions to Ask Users

1. "When you're looking at [Object A], do you need to see a list of [Object B]?"
2. "How many [Object B]s can one [Object A] have?"
3. "If we delete [Object A], what should happen to its [Object B]s?"
4. "How would you sort the [Object B]s inside [Object A]?"
5. "Do you ever need to filter [Object B]s by some criteria?"
6. "Can you get from [Object A] to [Object B] in the current UI? How many clicks does it take?"

## Related Skills

- For building the full Nested-Object Matrix (Discovery): use skill `02-nom-builder`
- For writing detailed MCSFD specs (Prioritization): use skill `06-mcsfd-spec-writer`
- For designing navigation with nested objects (Representation): use skill `10-nav-flow-designer`
- For mapping all objects and relationships visually: use skill `04-object-map-builder`
