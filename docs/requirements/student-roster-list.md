# Student Roster List — Component Requirements

> **Status: Partial** — Core visualization and menu components are built. The following exist: `RosterRing` (dual-arc SVG), `RosterScoreColumn`, `RosterOverflowMenu`, `StudentRosterPreview` (registered as `student:class-roster` preview). The Lit `<ren-student-row>` component exists with row + mini-row shapes. The full `StudentRosterRow` React composition and prototype route integration remain incomplete.

**Object:** Student
**Context:** Class Roster (shapeshifter value: `class-roster`)
**Shape:** Row (compact)
**Primary user:** Teacher viewing their class
**User intent:** "Who is in my class and how are they performing?"

**Figma source:** [Common Objects — Roster](https://www.figma.com/design/cvYcOvHomKCMt3uGOFSEdR/Common-Objects?node-id=141-2205)

**OOUX sources:**
- [Object Guide: Student](https://illuminate.atlassian.net/wiki/spaces/OOUX/pages/19015172104/Object+Guide+Student) — Shapeshifter Matrix, CTAs, attributes
- [Object Guide: Class](https://illuminate.atlassian.net/wiki/spaces/OOUX/pages/19012387599/Object+Guide+Class) — Student↔Class MCSFD (sorts, filters)
- Student object data: `data/objects/student.json`

---

## Row anatomy

Each student row is a single horizontal strip, 72px tall, with three zones:

```
┌──────────────────────────────────────────────────────────────────┐
│  [Ring]  Name + meta       • Reading 820L >  • Math 4.2 >  [⋮] │
│          zone                At/Above          At/Above         │
└──────────────────────────────────────────────────────────────────┘
```

### Zone 1 — Identity (left, flex: 1)

| Element | Spec |
|---------|------|
| **Ring visualization** | 40px dual-arc donut. Purple arc = reading proportion, teal arc = math proportion. Always uses subject colors, never shifts to alert colors. Replaces the avatar — no initials circle. |
| **Full Name** | Bold 16px `#333`, single line |
| **Meta line** | Regular 14px `#666`: `{Grade Level} · {Assignment Count} Assignments` |

The ring occupies the position where the avatar circle used to be. It encodes relative reading/math performance in the same 40px footprint while providing a unique visual anchor per student.

### Zone 2 — Performance (center, shrink-to-fit)

Two score columns arranged horizontally with 16px gap between them. Each column is 120px wide and contains two lines:

**Score line (top):** Subject dot (4px) + "Subject **{value}**" + right chevron (`>`). Mixed-weight text: subject name in regular 14px `#666`, score value in bold 14px `#333`. The chevron indicates the score is tappable (View Scores CTA).

**Band line (bottom):** Proficiency band label in regular 12px `#999`, indented 12px to align with the score text. When alerting, the band label turns red with an exclamation icon.

| Column | Dot color | Normal band | Alert band |
|--------|-----------|-------------|------------|
| Reading | `--color-subject-reading` (`#8385F6`) | "At/Above" in `#999` | Exclamation icon + band name in `#CF3A4E` |
| Math | `--color-subject-math` (`#41C395`) | "At/Above" in `#999` | Exclamation icon + band name in `#CF3A4E` |

### Zone 3 — Overflow menu (right, 64px)

The three-dot vertical icon (`⋮`) sits in a 32px square centered in a 64px hit area.

---

## Row states

The Figma section contains 8 states:

### Default

Both subjects display normally. Band labels show in muted `#999`.

- Reading: purple dot + gray/bold score + chevron, "At/Above" beneath in `#999`
- Math: teal dot + gray/bold score + chevron, "At/Above" beneath in `#999`
- Ring: purple and teal arcs in normal subject colors
- Background: `#FFFFFF`

### Single subject alert (Math On Watch)

One subject needs attention. The alert appears on the **band line only** — the score line above stays in normal colors.

- Alert band line: 12px red exclamation icon + band name (e.g., "On watch") in `#CF3A4E`
- Score line: unchanged (normal gray/bold text, subject dot stays its subject color)
- Other subject: stays in default state
- Ring: unchanged

### Row hover

Row background shifts from `#FFFFFF` to `#FAFAFA`. Cursor changes to `pointer`. All other elements remain unchanged.

### Score hover

When hovering over the scores zone specifically, the score columns get a subtle background treatment — 8px padding with a light background to indicate the score area is interactive. This differentiates the score click target (View Scores) from the general row click target (View Profile).

### Menu trigger hover

When hovering over the three-dot icon, its background changes to `#F4F4F4` (32px square, 8px radius) to indicate it's a separate interactive target.

### Menu open

The overflow menu appears below the three-dot trigger, aligned to the right edge of the row. The menu drops from the row with a small shadow (`0px 1px 5px rgba(0,0,0,0.3)`).

- Menu container: white background, 200px wide, 8px border-radius, 4px padding
- Menu items: 16px regular `#333`, 12px horizontal padding, 8px vertical padding, 8px border-radius
- Item hover state: `#F4F4F4` background
- Trigger: background stays `#F4F4F4` while menu is open

### Transferred

The student has been transferred to another school. The row is visually de-emphasized:

- Identity zone (ring + name + meta): `opacity: 0.40`
- Ring arcs rendered as empty/gray (no score data to visualize)
- Meta line replaced with italic "Transferred" in 14px `#666`
- Performance zone (score columns) hidden entirely
- Overflow menu remains visible at full opacity
- Row is still clickable (View Profile still works)

### Graduated

Same visual treatment as Transferred:

- Identity zone: `opacity: 0.40`, empty ring
- Meta line replaced with italic "Graduated" in 14px `#666`
- Performance zone hidden
- Overflow menu remains visible

---

## States still to design

- **Row focus** — keyboard focus indicator for accessibility
- **Inactive student** — expected to match Transferred/Graduated pattern
- **No score data** — what shows when reading or math level is missing but student is active
- **Loading / skeleton** — placeholder while data loads

---

## CTAs

Derived from `data/objects/student.json` shapeshifter entry for `class-roster`:

| CTA | Priority | Placement | Behavior |
|-----|----------|-----------|----------|
| **View Profile** | P (Primary) | Row click (identity zone) | Navigates to `/prototype/students/{slug}` |
| **View Scores** | S (Secondary) | Score column click (chevrons) | Navigates to subject score detail |
| **Add to Student Group** | T (Tertiary) | Overflow menu | Opens group assignment flow |

Additional overflow menu items TBD — the mockup uses placeholder labels ("Another action", "Some other action") for the remaining slots.

---

## Visible attributes

| Attribute | Source | Where it appears |
|-----------|--------|------------------|
| Full Name | `student.name` | Zone 1, bold |
| Grade Level | `student.grade` | Zone 1, meta line |
| Assignment Count | `student.assignmentCount` | Zone 1, meta line |
| Reading Level | `student.readingLevel` | Zone 2, score line |
| Reading Status | `student.readingStatus` | Zone 2, band line (drives alert) |
| Math Level | `student.mathLevel` | Zone 2, score line |
| Math Status | `student.mathStatus` | Zone 2, band line (drives alert) |
| Reading Percent | `student.readingPercent` | Ring arc proportion |
| Math Percent | `student.mathPercent` | Ring arc proportion |
| Enrollment Status | `student.enrollmentStatus` | Drives transferred/graduated state |

---

## Alert logic

A subject enters alert state when its proficiency band indicates the student needs attention. The threshold is binary: normal vs. alert. The alert appears on the band label line only — the score value line stays neutral.

| Proficiency Band | Alert? | Band label color |
|------------------|--------|------------------|
| At/Above | No | `#999` (muted) |
| On Watch | Yes | `#CF3A4E` + exclamation icon |
| Intervention | Yes | `#CF3A4E` + exclamation icon |
| Urgent | Yes | `#CF3A4E` + exclamation icon |

---

## Subject color tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-subject-reading` | `#8385F6` | Reading dot, ring arc |
| `--color-subject-math` | `#41C395` | Math dot, ring arc |
| `--brand-website-red` | `#CF3A4E` | Alert icon, alert band text |

The ring visualization always uses subject colors. Alert state is communicated through the band label line and exclamation icon only — never through the ring arcs or score values. This separation keeps three concerns in distinct visual channels: subject identity (dots), data (scores), and judgment (band labels).

---

## List-level controls (TBD)

Not yet designed. Requirements to define when ready:

- **Search** — filter roster by student name (S-priority CTA: Search/Filter)
- **Sort** — alpha by last name (default), by reading level, by math level (from Student↔Class MCSFD)
- **Filter** — by proficiency band: All, At/Above, Needs Attention (from Student↔Class MCSFD)
- **Student count** — total students in the class
- **Band distribution** — summary of how many students per proficiency tier

---

## Accessibility

- Row click target uses an `<a>` tag on the student name for proper link semantics; the click area extends to the full row via CSS
- Score chevrons are separately focusable links
- Overflow trigger has `aria-label="More actions"`, `aria-haspopup="menu"`, `aria-expanded` toggled on open
- Menu items have `role="menuitem"`
- Alert icons include `aria-label` text (e.g., "Needs attention") for screen readers
- Ring SVG includes `role="img"` and `aria-label` describing the reading/math balance
- Focus order: student name link → reading score link → math score link → overflow trigger
- All color-coded information (subject dots, alert state) is paired with non-color signals (text labels, exclamation icon)

---

## Implementation notes

### Approach

Build as a React component (`StudentRosterRow`) for the Next.js prototype. The Lit `<ren-student-row>` can be updated separately to match this spec.

### New files

- `packages/caboodle-site/components/prototype/StudentRosterRow.tsx` — the row component
- `packages/caboodle-site/components/prototype/StudentRosterMenu.tsx` — overflow dropdown

### Modified files

- `packages/caboodle-site/app/prototype/classes/[slug]/ClassDetailClient.tsx` — replace the Roster tab `<table>` with `<StudentRosterRow>` list
- `packages/caboodle-site/styles/components.css` — add `.roster-*` class styles

### Ring SVG

Inline SVG donut using two `<circle>` elements with `stroke-dasharray` and `stroke-dashoffset`. The reading and math percentages determine arc lengths. Ring always uses `--color-subject-reading` and `--color-subject-math` for stroke colors.

### Mock data

`data/mock/students.ts` already provides `readingStatus`, `mathStatus`, `readingPercent`, `mathPercent`, `assignmentCount`, and `enrollmentStatus` — all fields needed for the component states.

### What to build

1. Create `StudentRosterRow` with ring SVG, horizontal score columns, band labels, alert logic
2. Create `StudentRosterMenu` with overflow dropdown and outside-click-to-close
3. Add roster CSS classes to `components.css`
4. Replace `ClassDetailClient.tsx` Roster tab table with row components
