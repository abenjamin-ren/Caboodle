---
name: ooux-object-thinking
description: "When discussing objects, nouns, SIP validation, entity identification, object discovery, or deciding whether something is an object"
---
# OOUX Object Thinking

Use this knowledge when helping users identify, validate, or reason about objects in their system.

## The Ancient Truth of Objects

> Things that are different should look different.

Every digital system is made of objects — the concrete "things" users care about. The human brain evolved to perceive, categorize, and act upon objects. When digital objects are clearly distinct and recognizable, users build accurate mental models. When they're not, confusion results.

This truth drives everything in OOUX: start with the objects, then build relationships, CTAs, and attributes around them.

## Object Anti-Patterns

**Masked Objects** — Different objects are disguised as the same thing, or the same object is called by different names. This violates the Ancient Truth of Objects because things that are different don't look different.
- Example: An "Activity" in one product that's really an ASSIGNMENT, while "Activity" in another product means a CLASS SESSION.
- Fix: Give each object its own distinct name, visual treatment, and card design.

**Phantom Objects** — Objects that users expect to exist but that aren't in the system yet. Users have a mental model of these things, but the product doesn't surface them.
- Example: Users talk about "Goals" and "Progress" but the system only shows Scores with no goal-tracking object.
- Fix: Validate phantom objects with SIP, then decide whether to build them or clarify why they don't exist.

## The SIP Test

Every candidate noun must pass three tests to qualify as a system object:

**S — Structure**: Does this thing have its own attributes? Could you design a detail page for it?
- Pass: "A STUDENT has a name, grade, reading level, enrollment date"
- Fail: "A title is just a text field on something else"

**I — Instances**: Does this thing have multiple examples?
- Pass: "Jane Doe, John Smith, Maria Garcia are all instances of STUDENT"
- Fail: "The Dashboard is one thing, not many"

**P — Purpose**: Do users care about this thing for its own sake?
- Pass: "Users look up, track, and report on STUDENTS"
- Fail: "A section divider exists for layout but users don't seek it out"

All three must pass. If any fails, the noun is likely an attribute, a CTA, or too vague.

### SIP Edge Cases

- **Passes S and I but fails P**: Probably a system entity, not a user-facing object. Example: "Log Entry" has structure and instances, but users don't seek it out.
- **Passes S and P but fails I**: Might be a singleton page, not an object. Example: "Dashboard" has attributes and purpose, but there's only one.
- **Passes I and P but fails S**: Might be too vague. Example: "Content" has instances and purpose, but what attributes does it have? Push for specificity — is it a Resource, an Article, a Video?

## Noun Foraging

The foundational OOUX technique for finding candidate objects. Extract **every noun** from:
- User interview transcripts
- Personas and journey maps
- Requirements documents and PRDs
- Existing UI screenshots (what nouns appear on screen?)
- Domain glossaries and business docs
- Support tickets and FAQ content
- Documentation and wiki pages

Don't filter during foraging — capture everything. Quantity over quality at this stage. The filtering comes later during SIP validation. Think of it as "casting a wide net."

## Common Traps

1. **Verbs disguised as nouns**: "Registration" might be a CTA (Register), not an object. Ask: "Can I have multiple registrations? Does each one have its own detail page?"
2. **Attributes disguised as objects**: "Name", "Date", "Score Value" are usually properties of something else. Ask: "Does this thing exist independently?"
3. **Too abstract**: "Content" is too vague — what kind? Article? Video? Document? Push for specificity.
4. **Too granular**: "First Name" is an attribute of PERSON, not its own object. Ask: "Would a user ever browse a list of these?"
5. **System internals**: "Database", "API endpoint", "Session" — these aren't user-facing objects. Objects must be things users think about.
6. **Feature masquerading as object**: "Search" or "Dashboard" are features or views, not objects. Ask: "What objects appear in this feature?"

## Object Naming Conventions

- Use **singular nouns**: STUDENT, not Students
- Use **user-friendly language**: TEACHER, not EducatorEntity
- Pick the **most common term** users actually say
- When products use different names for the same thing, pick one canonical name and note the aliases (this is a Masked Object)
- Use ALL CAPS when referring to objects in documentation (e.g., STUDENT, CLASS, ASSESSMENT) to make them stand out

## Object Types to Watch For

- **Hub objects**: Things that many other objects nest inside (e.g., CLASS contains Students, Assignments, Resources). Hub objects are natural navigation anchors.
- **Shapeshifters**: Objects that appear differently across products or contexts (e.g., STUDENT looks different in Star vs. myON). Not always bad — but differences should be intentional.
- **Masked objects**: Different objects hiding behind the same name, or the same object hiding behind different names. Always bad — unmask them.
- **Phantom objects**: Objects users expect but that don't exist in the system yet. Opportunity or gap — validate with SIP.

## Validation Questions

When unsure if something is an object, ask the user:
1. "Could you imagine a detail page for this?"
2. "Can you name 2-3 specific examples?"
3. "Would a user ever search for or browse a list of these?"
4. "Does this thing have its own lifecycle (created, modified, archived)?"
5. "Is this a thing in the real world, or just a UI element?"

## Related Skills

- For full Object Discovery facilitation: use skill `01-object-discovery`
- For building comprehensive Object Guides: use skill `05-object-guide-builder`
- For designing distinct Object Cards: use skill `09-object-card-designer`
- For checking if objects are consistent across contexts: use skill `12-shapeshifter-matrix-builder`
