# Object Data Template — Building the Remaining 12 Object Guides

This document is the operationalization guide for building out the Caboodle Object Directory. It uses `data/objects/student.json` as the reference implementation and walks through every section of the JSON schema.

---

## Prerequisites

Before creating a new Object Guide, gather these OOUX artifacts:

- **Object Guide** (step 5) — definition, SIP validation, synonyms
- **CTA Matrix** (step 3/7) — all CTAs with roles and priorities
- **Attribute Prioritization** (step 8) — force-ranked attributes per representation
- **MCSFD Specs** (step 6) — relationship details for all connected objects
- **Object Cards** (step 9) — card/list/detail representation designs
- **Lifecycle Flow** — states, transitions, and triggers

---

## The 13 Core Objects

| # | Object | Slug | Category | Products |
|---|--------|------|----------|----------|
| 1 | **Student** | `student` | `people` | All products |
| 2 | **Teacher** | `teacher` | `people` | All products |
| 3 | **Class** | `class` | `container` | All products |
| 4 | **School** | `school` | `container` | All products |
| 5 | **District** | `district` | `container` | All products |
| 6 | **Assessment** | `assessment` | `activity` | Star, AR, myON |
| 7 | **Assignment** | `assignment` | `activity` | Freckle, Lalilo |
| 8 | **Skill** | `skill` | `knowledge` | Freckle, Lalilo |
| 9 | **Resource** | `resource` | `knowledge` | myON, AR, Freckle |
| 10 | **Score** | `score` | `data-ai` | Star, AR, Freckle |
| 11 | **Standard** | `standard` | `knowledge` | All products |
| 12 | **Proficiency Prediction** | `proficiency-prediction` | `data-ai` | Star |
| 13 | **Insight** | `insight` | `data-ai` | All products |

**Student is complete.** The remaining 12 need JSON data files and Web Components.

### Categories

| Category | Slug | Description |
|----------|------|-------------|
| People | `people` | Human actors in the system (Student, Teacher) |
| Container | `container` | Organizational groupings (Class, School, District) |
| Activity | `activity` | Things users do or take (Assessment, Assignment) |
| Knowledge | `knowledge` | Content, skills, and standards (Skill, Resource, Standard) |
| Data & AI | `data-ai` | System-generated data and predictions (Score, Proficiency Prediction, Insight) |

---

## JSON Schema Reference

All types are defined in `data/schema.ts`. The top-level type is `ObjectDefinition`:

```typescript
interface ObjectDefinition {
  identity: ObjectIdentity;
  variations?: ObjectVariation[];
  representations: RepresentationSection[];    // card, list, detail
  stories: UserStory[];
  businessRules: BusinessRule[];
  lifecycle: LifecycleFlow;
  relationships: MCSFDSpec[];
  relatedObjects: string[];                    // slugs of related objects
  nestedObjects: NestedObject[];
  allAttributes: ObjectAttribute[];            // complete attribute list
  allCTAs: ObjectCTA[];                        // complete CTA list
  sipValidation: SIPValidation;
  synonyms: SynonymEntry[];
}
```

---

## Section-by-Section Walkthrough

### 1. `identity` — ObjectIdentity

The object's core identity metadata. Appears in the Object Guide header and Object Library card.

```json
{
  "identity": {
    "slug": "student",
    "name": "Student",
    "qualifier": "(Core)",
    "objectType": "core",
    "category": "people",
    "definition": "A Student is an individual learner enrolled in...",
    "synonyms": ["learner", "pupil", "child", "kid"],
    "products": "All products"
  }
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `slug` | `string` | Yes | URL-safe identifier. Must match the filename (`{slug}.json`). |
| `name` | `string` | Yes | Display name. |
| `qualifier` | `string` | No | Parenthetical label shown next to name, e.g. `"(Core)"`. |
| `objectType` | `ObjectType` | Yes | `"core"`, `"domain"`, or `"variation"`. All 13 core objects use `"core"`. |
| `category` | `ObjectCategory` | Yes | `"people"`, `"container"`, `"activity"`, `"knowledge"`, or `"data-ai"`. |
| `definition` | `string` | Yes | One-sentence definition. Should be thorough — this is the primary description. |
| `synonyms` | `string[]` | No | Alternate names used across Renaissance. |
| `products` | `string` | Yes | Which Renaissance products use this object. |

### 2. `variations` — ObjectVariation[]

Domain-specific or contextual variants of the core object. Optional — not all objects have variations.

```json
{
  "variations": [
    {
      "name": "Student",
      "qualifier": "(Lesson Participant)",
      "slug": "student-lesson-participant",
      "products": "Nearpod",
      "objectType": "variation"
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Usually the same as the core object name. |
| `qualifier` | `string` | What makes this variant distinct. |
| `slug` | `string` | Unique slug for the variation. Convention: `{core-slug}-{qualifier-slug}`. |
| `products` | `string` | Which products use this variation. |
| `objectType` | `ObjectType` | `"variation"` or `"domain"` — determines which icon is displayed. |

### 3. `representations` — RepresentationSection[]

The heart of the Object Guide. Defines how the object looks in card, list, and detail views. Each representation includes showcase examples, the subset of attributes visible in that view, and the CTAs available.

There are exactly **three** representations per object. All use a single adaptive component (`ren-{slug}`) with a `defaultShape` to control rendering:

```json
{
  "representations": [
    {
      "layout": "card",
      "heading": "Card layout",
      "description": "How a Student appears in grids and dashboards",
      "defaultShape": "card",
      "componentTag": "ren-student",
      "examples": [ ... ],
      "attributes": [ ... ],
      "ctas": [ ... ]
    },
    {
      "layout": "list",
      "heading": "List layout",
      "description": "How a Student appears in rosters and tables",
      "defaultShape": "row",
      "componentTag": "ren-student",
      "examples": [ ... ],
      "attributes": [ ... ],
      "ctas": [ ... ]
    },
    {
      "layout": "detail",
      "heading": "Detail page layout",
      "description": "What users see when they open a full Student record",
      "defaultShape": "profile",
      "componentTag": "ren-student",
      "examples": [ ... ],
      "attributes": [ ... ],
      "ctas": [ ... ]
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| `layout` | `"card" \| "list" \| "detail"` | Which view this represents. |
| `heading` | `string` | Section heading in the Object Guide. |
| `description` | `string` | Brief explanation of where this view appears. |
| `defaultShape` | `string` | The shape prop passed to the adaptive component: `card`, `row`, `profile`. |
| `componentTag` | `string` | Always `ren-{slug}` — one adaptive component per object. |
| `examples` | `ShowcaseExample[]` | Mock data for the interactive showcase. Typically 2 examples for card/list, 1 for detail. |
| `attributes` | `ObjectAttribute[]` | Only the attributes visible in this representation (subset of `allAttributes`). |
| `ctas` | `ObjectCTA[]` | Only the CTAs available in this representation (subset of `allCTAs`). |

#### ShowcaseExample

The `examples` array provides mock data for rendering the Web Component showcase. The Student uses these fields, but **other objects will need different fields** tailored to their domain:

```json
{
  "name": "Harry Potter",
  "initials": "HP",
  "color": "#398b26",
  "grade": "3rd Grade",
  "school": "Hogwarts",
  "readingLevel": "3.2 GE",
  "readingStatus": "On watch",
  "mathLevel": "320 SS",
  "classCount": 3,
  "scoreCount": 12
}
```

The `ShowcaseExample` interface in `data/schema.ts` is generic (`[key: string]: unknown`). Each object defines its own example fields. The data is passed directly to the component's `data` property.

### 4. `stories` — UserStory[]

User stories in role/action/object/benefit format with Gherkin-style when/then clauses.

```json
{
  "stories": [
    {
      "title": "View Student Profile",
      "icon": "person",
      "role": "Teacher",
      "action": "view",
      "object": "Student",
      "benefit": "I can understand their current reading and math levels...",
      "whenClause": "I navigate to a Student from my class roster,",
      "thenClause": "their key attributes, recent Scores, current Assignments...",
      "crossObjects": [{ "slug": "score", "name": "Score" }]
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| `title` | `string` | Short descriptive title. |
| `icon` | `string` | Material Icons name for visual identification. |
| `role` | `string` | The actor (Teacher, Admin, Student, District Admin, System). |
| `action` | `string` | The verb (view, create, transfer, assign, etc.). |
| `object` | `string` | The target object name. |
| `benefit` | `string` | Why the user does this ("so that..." continuation). |
| `whenClause` | `string` | Gherkin WHEN — the trigger condition. |
| `thenClause` | `string` | Gherkin THEN — the expected outcome. |
| `crossObjects` | `{slug, name}[]` | Optional. Other objects involved in this story. |

### 5. `businessRules` — BusinessRule[]

Domain constraints and business logic.

```json
{
  "businessRules": [
    {
      "title": "Uniqueness",
      "description": "A Student is uniquely identified within a District by their Student ID."
    }
  ]
}
```

Aim for 5–8 rules covering: uniqueness, creation, relationships, data privacy, lifecycle transitions, deletion/archival, and domain-specific constraints.

### 6. `lifecycle` — LifecycleFlow

State machine defining the object's lifecycle.

```json
{
  "lifecycle": {
    "states": [
      {
        "name": "Created",
        "description": "Initial state upon import or manual creation",
        "triggers": "SIS sync import, manual creation",
        "variant": "default"
      },
      {
        "name": "Active",
        "description": "Currently enrolled and participating",
        "triggers": "SIS sync enrollment, manual creation",
        "variant": "active"
      }
    ],
    "transitions": [
      { "from": "Created", "to": ["Active"] },
      { "from": "Active", "to": ["Transferred", "Inactive", "Graduated"] }
    ]
  }
}
```

| Field | Type | Notes |
|-------|------|-------|
| `states[].name` | `string` | State name. |
| `states[].description` | `string` | What this state means. |
| `states[].triggers` | `string` | What causes entry into this state. |
| `states[].variant` | `"active" \| "default" \| "warn"` | Visual treatment in the lifecycle diagram. |
| `transitions[].from` | `string` | Source state name. |
| `transitions[].to` | `string[]` | Possible target states. |

### 7. `relationships` — MCSFDSpec[]

Relationship specs using the MCSFD framework (Mechanics, Cardinality, Sorts, Filters, Dependencies).

```json
{
  "relationships": [
    {
      "targetSlug": "class",
      "targetName": "Class",
      "mechanics": "Students are enrolled in Classes primarily via SIS roster sync...",
      "cardinality": "Many-to-many. A Student can belong to multiple Classes...",
      "sorts": "Students within a Class: alphabetical by last name (default)...",
      "filters": "By grade level, by enrollment status...",
      "dependencies": "If a Class is archived, students remain in the system..."
    }
  ]
}
```

All five MCSFD fields are strings with detailed prose descriptions — not enums. Include specifics about counts, defaults, and edge cases.

### 8. `relatedObjects` — string[]

Array of slugs for objects that appear in this object's relationships. Used for cross-linking.

```json
{
  "relatedObjects": ["class", "school", "assessment", "assignment", "score"]
}
```

### 9. `nestedObjects` — NestedObject[]

Objects that are directly nested within this object (visible as sections or lists on the detail page).

```json
{
  "nestedObjects": [
    {
      "slug": "score",
      "name": "Score",
      "cardinality": "One-to-many",
      "description": "System-generated on assessment completion"
    }
  ]
}
```

### 10. `allAttributes` — ObjectAttribute[]

The **complete** attribute list for this object across all representations.

```json
{
  "allAttributes": [
    {
      "name": "Full Name",
      "dataType": "String",
      "source": "SIS Import / Manual",
      "description": "Primary identifier. Appears everywhere a Student is shown."
    },
    {
      "name": "Date of Birth",
      "dataType": "Date",
      "source": "SIS Import",
      "description": "Used for age calculations, COPPA compliance. Visible to Admin only.",
      "roles": ["admin"]
    },
    {
      "name": "School",
      "dataType": "Reference → School",
      "source": "SIS Import",
      "description": "Which school the student is enrolled at.",
      "isReference": true,
      "referenceSlug": "school",
      "referenceName": "School"
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Attribute display name. |
| `dataType` | `string` | Type: `"String"`, `"Enum"`, `"Number"`, `"Date"`, `"Image"`, `"Multiple"`, or `"Reference → ObjectName"`. |
| `source` | `string` | Where the data comes from (SIS Import, System, Manual, etc.). |
| `description` | `string` | What this attribute is and why it matters. |
| `roles` | `string[]` | Optional. If present, restricts visibility to these roles (e.g. `["admin"]`). |
| `isReference` | `boolean` | Optional. `true` if this attribute links to another object. |
| `referenceSlug` | `string` | Optional. The slug of the referenced object. |
| `referenceName` | `string` | Optional. The display name of the referenced object. |

### 11. `allCTAs` — ObjectCTA[]

The **complete** CTA list with priority rankings.

```json
{
  "allCTAs": [
    {
      "name": "View Profile",
      "roles": "Teacher, Admin, Student (self)",
      "permission": "Read",
      "priority": "P",
      "roleKeys": ["teacher", "admin", "student"]
    },
    {
      "name": "Enroll in Class",
      "roles": "Admin, System",
      "permission": "Write",
      "priority": "T",
      "crossObjectSlug": "class",
      "crossObjectName": "Class",
      "roleKeys": ["admin"]
    }
  ]
}
```

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Verb phrase: "View Profile", "Enroll in Class", "Export Data". |
| `roles` | `string` | Human-readable role list. |
| `permission` | `string` | `"Read"` or `"Write"`. |
| `priority` | `Priority` | `"P"` (Primary), `"S"` (Secondary), `"T"` (Tertiary), `"Q"` (Quaternary/Danger). |
| `roleKeys` | `string[]` | Machine-readable role identifiers for the ConfigPanel toggle. |
| `crossObjectSlug` | `string` | Optional. Target object slug if this is a cross-object CTA. |
| `crossObjectName` | `string` | Optional. Target object display name. |

### 12. `sipValidation` — SIPValidation

Structure/Instances/Purpose validation — proves this is a real object.

```json
{
  "sipValidation": {
    "structure": {
      "pass": true,
      "evidence": "A Student has a rich set of attributes: name, grade level..."
    },
    "instances": {
      "pass": true,
      "evidence": "Jane Doe (3rd grader at Lincoln Elementary)..."
    },
    "purpose": {
      "pass": true,
      "evidence": "Students are the reason Renaissance products exist..."
    },
    "verdict": "Core system object. The universal anchor across all Renaissance products."
  }
}
```

All 13 core objects should pass all three SIP tests. The evidence should cite specific, concrete examples.

### 13. `synonyms` — SynonymEntry[]

Alternate terms used across Renaissance products and contexts.

```json
{
  "synonyms": [
    {
      "term": "Learner",
      "context": "Renaissance Intelligence, AI/ML teams",
      "notes": "Used in 'Learner Engine' and 'Learning Path' contexts"
    }
  ]
}
```

---

## Creating a New Object Data File

### Step-by-step process

1. **Create the file**: `data/objects/{slug}.json`
   - The slug must be URL-safe (lowercase, hyphens for spaces)
   - Multi-word objects use hyphenated slugs: `proficiency-prediction`

2. **Fill `identity`**: Set all required fields. Use `"objectType": "core"` for all 13 core objects.

3. **Add `variations`** (if any): List domain-specific or product-specific variants. Not all objects have variations.

4. **Build `representations`**: Create three sections — card, list, detail.
   - For each, determine which attributes and CTAs are visible
   - Card: 5–7 attributes, 2–3 CTAs (highest priority)
   - List: 5–8 attributes, 1–2 CTAs
   - Detail: 10–15+ attributes, all CTAs
   - Create 1–2 realistic `ShowcaseExample` entries with mock data
   - Set the `componentTag` to `ren-{slug}-{view}`

5. **Write `stories`**: 3–5 user stories covering primary use cases across different roles.

6. **Define `businessRules`**: 5–8 rules covering uniqueness, creation, relationships, privacy, lifecycle, and deletion.

7. **Map `lifecycle`**: Define states and transitions. Most objects follow a pattern like Created → Active → Archived, but vary the specifics.

8. **Specify `relationships`**: One MCSFDSpec per related object. Be specific about mechanics, cardinality counts, default sorts, and dependency behaviors.

9. **List `relatedObjects`**: Array of slugs for cross-linked objects.

10. **Define `nestedObjects`**: Objects displayed within this object's detail view.

11. **Compile `allAttributes`**: Complete attribute inventory. Mark reference attributes with `isReference`, `referenceSlug`, `referenceName`. Mark role-restricted attributes with `roles`.

12. **Compile `allCTAs`**: Complete CTA inventory with P/S/T/Q priorities and role keys.

13. **Write `sipValidation`**: Concrete evidence for Structure, Instances, and Purpose.

14. **Add `synonyms`**: Known alternate names with context.

### Validation checklist

- [ ] Filename matches `identity.slug` (`{slug}.json`)
- [ ] `objectType` is `"core"` for all 13 core objects
- [ ] `category` is one of: `people`, `container`, `activity`, `knowledge`, `data-ai`
- [ ] Exactly 3 `representations`: card, list, detail
- [ ] Each representation has a valid `componentTag` matching the Web Component naming convention
- [ ] `allAttributes` is a superset of attributes in each representation
- [ ] `allCTAs` is a superset of CTAs in each representation
- [ ] All `crossObjectSlug` values reference valid object slugs
- [ ] All `referenceSlug` values reference valid object slugs
- [ ] `relatedObjects` matches the slugs used in `relationships`
- [ ] `sipValidation` has all three tests with pass/evidence
- [ ] JSON is valid (no trailing commas, proper quoting)

---

## Web Component Per Object

Each object gets a single adaptive Lit Web Component at `packages/object-components/src/ren-{slug}.ts`. The component renders card, row, profile, and header shapes based on a `shape` attribute.

### Adaptive Component Pattern

```typescript
// Example: packages/object-components/src/ren-teacher.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokenDefaults } from './shared/tokens.js';

export type TeacherShape = 'card' | 'compact-card' | 'row' | 'mini-row' | 'data-row' | 'profile' | 'header';
export type TeacherState = 'active' | 'inactive' | 'archived';

export interface TeacherData {
  name: string;
  initials?: string;
  color?: string;
  school?: string;
  subject?: string;
  // ... object-specific fields
}

@customElement('ren-teacher')
export class RenTeacher extends LitElement {
  static styles = [tokenDefaults, css`...`];

  @property({ type: Object }) data: TeacherData | null = null;
  @property({ type: String, reflect: true }) shape: TeacherShape = 'card';
  @property({ type: String, reflect: true }) state: TeacherState = 'active';

  render() {
    if (!this.data) return nothing;
    switch (this.shape) {
      case 'profile': return this._renderProfile();
      case 'header': return this._renderHeader();
      case 'row':
      case 'mini-row':
      case 'data-row': return this._renderRow();
      case 'card':
      case 'compact-card':
      default: return this._renderCard();
    }
  }

  private _renderCard() { /* ... */ }
  private _renderRow() { /* ... */ }
  private _renderProfile() { /* ... */ }
  private _renderHeader() { /* ... */ }
}
```

### Registration Steps

After creating the component:

1. **Add to barrel export** — `packages/object-components/src/index.ts`:
   ```typescript
   export * from './ren-teacher.js';
   ```

2. **Add entry point** — `packages/object-components/vite.config.ts`:
   ```typescript
   'ren-teacher': resolve(__dirname, 'src/ren-teacher.ts'),
   ```

3. **Add subpath export** — `packages/object-components/package.json`:
   ```json
   "./ren-teacher": "./dist/ren-teacher.js"
   ```

4. **Build** — `npm run build:components`

### Pattern Reference

Use `ren-student.ts` as the template. It demonstrates:
- Shape-based rendering (card, row, profile, header)
- State-based opacity (active, inactive, transferred, graduated)
- Graceful degradation when data fields are missing
- CTA event dispatching
- Nested object display in profile view

The shared utilities in `shared/tokens.ts` and `shared/identity.ts` provide design tokens and icon resolution that all components should use.

---

## The 12 Remaining Objects — Quick Reference

### People

#### Teacher (`teacher`)
- **Category:** `people`
- **Products:** All products
- **Key attributes:** Name, School, Subject(s), Classes, Role/Title
- **Key relationships:** Class (teaches), School (belongs to), Student (instructs), Assignment (creates), Assessment (administers)
- **Variations to consider:** Substitute Teacher, Teaching Assistant, Interventionist

### Containers

#### Class (`class`)
- **Category:** `container`
- **Products:** All products
- **Key attributes:** Name, Subject, Grade Level, School, Teacher, Student Count, Period/Section
- **Key relationships:** Student (contains), Teacher (taught by), School (belongs to), Assignment (assigned to), Assessment (administered to)

#### School (`school`)
- **Category:** `container`
- **Products:** All products
- **Key attributes:** Name, District, Address, Type (Elementary/Middle/High), Grade Range, Student Count, Teacher Count
- **Key relationships:** District (belongs to), Student (contains), Teacher (employs), Class (contains)

#### District (`district`)
- **Category:** `container`
- **Products:** All products
- **Key attributes:** Name, State, School Count, Student Count, Subscription/License Info
- **Key relationships:** School (contains), Student (enrolled), Teacher (employs)

### Activities

#### Assessment (`assessment`)
- **Category:** `activity`
- **Products:** Star, AR, myON
- **Key attributes:** Name, Type (Star Reading/Math/Early Literacy, AR Quiz, etc.), Subject, Duration, Grade Range, Status
- **Key relationships:** Student (taken by), Score (produces), Class (administered to), Skill (measures), Standard (aligned to)
- **Variations to consider:** Star Assessment, AR Quiz, myON Literacy Check

#### Assignment (`assignment`)
- **Category:** `activity`
- **Products:** Freckle, Lalilo
- **Key attributes:** Name, Subject, Type (Practice/Assessment/Homework), Due Date, Status, Skill(s) Targeted
- **Key relationships:** Student (assigned to), Teacher (created by), Class (assigned to), Skill (targets), Resource (uses)

### Knowledge

#### Skill (`skill`)
- **Category:** `knowledge`
- **Products:** Freckle, Lalilo
- **Key attributes:** Name, Subject, Domain/Strand, Grade Band, Standard Alignment, Difficulty Level
- **Key relationships:** Student (proficiency measured), Standard (aligned to), Assignment (targeted by), Resource (taught by), Assessment (measured by)
- **Note:** This is a Renaissance product object, distinct from the ORCA "Skill" (AI prompt) on the Caboodle site itself

#### Resource (`resource`)
- **Category:** `knowledge`
- **Products:** myON, AR, Freckle
- **Key attributes:** Name, Type (Book/Article/Video/Activity), Subject, Reading Level, Author, Format
- **Key relationships:** Student (consumed by), Skill (teaches), Assignment (used in), Standard (aligned to)
- **Variations to consider:** Book (myON), Practice Set (Freckle), Lesson (Lalilo)

#### Standard (`standard`)
- **Category:** `knowledge`
- **Products:** All products
- **Key attributes:** Code, Description, Subject, Grade Level, Framework (CCSS, state standards), Domain/Strand
- **Key relationships:** Skill (maps to), Assessment (aligned to), Assignment (aligned to), Resource (aligned to)

### Data & AI

#### Score (`score`)
- **Category:** `data-ai`
- **Products:** Star, AR, Freckle
- **Key attributes:** Value, Scale Type (SS, GE, Lexile, Quantile, Percentile), Assessment Date, Benchmark Category, Student, Assessment
- **Key relationships:** Student (belongs to), Assessment (generated by), Skill (measures), Insight (feeds into)

#### Proficiency Prediction (`proficiency-prediction`)
- **Category:** `data-ai`
- **Products:** Star
- **Key attributes:** Predicted Proficiency Level, Confidence Score, Target Assessment, Prediction Date, Student
- **Key relationships:** Student (predicted for), Score (based on), Standard (predicting toward), Insight (contributes to)

#### Insight (`insight`)
- **Category:** `data-ai`
- **Products:** All products
- **Key attributes:** Type (Growth Alert, Intervention Needed, On Track, etc.), Message, Severity, Generated Date, Data Sources
- **Key relationships:** Student (about), Score (derived from), Skill (related to), Teacher (delivered to)
