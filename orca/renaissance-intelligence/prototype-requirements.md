# Renaissance Intelligence — Prototype Requirements

**Goal:** Demonstrate the end-to-end educator experience across all 26 Renaissance objects in a functional prototype with mock data.

**Primary Users:** Teacher, School Admin, District Admin

**Scope:** All 26 objects unified into a single application — Renaissance Intelligence — the cross-product hub where educators manage instruction, monitor student progress, analyze data, and act on AI-driven recommendations.

---

## 1. Object Inventory

### 1.1 Objects by Category

| Category | Objects | Count |
|----------|---------|-------|
| People | Student, Teacher | 2 |
| Container | Class, School, District, Student Group, Product Assignment, Product, Solution, Onboarding Checklist | 8 |
| Activity | Assessment, Assignment, Activity Event, Learning Path, Live Session, Onboarding Step | 6 |
| Knowledge | Skill, Standard, Resource | 3 |
| Data / AI | Score, Insight, Proficiency Prediction | 3 |
| Content | Activity (Nearpod), Lesson, Educator Academy Module | 3 |
| Analytics | Report | 1 |

### 1.2 Object Relationship Graph

The 26 objects form a dense relationship web. The five hub objects — **Student**, **Class**, **Teacher**, **Assessment**, and **Score** — serve as the connective tissue.

```
District
 └── School
      └── Class ──────────────── Teacher
           ├── Student ──────── Score ──── Assessment
           │    ├── Learning Path        ├── Skill ── Standard
           │    ├── Activity Event       └── Proficiency Prediction
           │    └── Onboarding Checklist
           │         └── Onboarding Step ── Educator Academy Module
           ├── Assignment ──── Resource
           ├── Student Group ── Insight
           └── Live Session ── Lesson ── Activity ── Report

Product ── Solution ── Product Assignment
```

### 1.3 Object Connectivity (Ranked by Relationship Count)

| Object | Relationships | Role in IA |
|--------|---------------|------------|
| Student | 11 | Central hub — nearly every screen connects back to a student |
| Class | 9 | Primary navigation container for day-to-day instruction |
| Learning Path | 8 | Deep relationship node connecting assessment → instruction |
| Student Group | 8 | Differentiation hub connecting insights → action |
| Score | 7 | Data backbone — feeds skills, predictions, and reports |
| Assessment | 6 | Evaluation engine connecting students to skills |
| Assignment | 6 | Instructional delivery connecting teachers to students |
| Teacher | 5 | Identity anchor for educator-facing views |
| Resource | 5 | Content library connecting curriculum to practice |
| Skill | 5 | Learning standard connecting assessments to instruction |

---

## 2. User Roles and Permissions

### 2.1 Role Definitions

| Role | Scope | Primary Objects | Description |
|------|-------|-----------------|-------------|
| **Teacher** | Own classes | Class, Student, Assessment, Assignment, Score, Skill, Resource, Student Group, Learning Path, Insight, Activity Event | Creates and delivers instruction, monitors student progress, acts on AI recommendations |
| **School Admin** | All classes and teachers at their school | School, Class, Teacher, Student, Assessment, Score, Report, Onboarding Checklist | Manages school-level operations, monitors staff onboarding, reviews aggregate performance |
| **District Admin** | All schools in their district | District, School, Teacher, Student, Product, Solution, Product Assignment, Report | Manages district-wide licensing, provisioning, and aggregate reporting |

### 2.2 Data Visibility Rules

| Data | Teacher | School Admin | District Admin |
|------|---------|--------------|----------------|
| Student PII (DOB, demographics) | No | Yes | Yes |
| Student academic data | Own classes only | All school students | All district students |
| Class data | Own classes | All school classes | All district classes |
| Teacher accounts | Own profile | All school teachers | All district teachers |
| Product/Solution management | No | View only | Full access |
| Scores | Own students | All school scores | All district scores |
| Insights | Own classes | No | No |
| Onboarding checklists | Own checklist | All school checklists | All district checklists |
| Reports | Own lesson reports | School-level reports | District-level reports |

---

## 3. Information Architecture

### 3.1 Primary Navigation

The top-level navigation follows the educator's mental model: what they teach (Classes), who they teach (Students), how they measure (Assessments), what they assign (Resources), and what the data says (Reports).

| Nav Item | Route | Primary Object(s) | Available To |
|----------|-------|--------------------|--------------|
| **Home** | `/` | Dashboard (Insights, Activity Events, Onboarding) | All |
| **Classes** | `/classes` | Class | Teacher, School Admin |
| **Students** | `/students` | Student | Teacher, School Admin, District Admin |
| **Assessments** | `/assessments` | Assessment | Teacher, School Admin |
| **Resources** | `/resources` | Resource, Lesson | Teacher |
| **Reports** | `/reports` | Report, Score | Teacher, School Admin, District Admin |
| **Academy** | `/academy` | Educator Academy Module | Teacher, School Admin |
| **Admin** | `/admin` | School, District, Product, Solution, Product Assignment, Teacher | School Admin, District Admin |

### 3.2 Object-to-Screen Mapping

Every object surfaces in at least one screen. This table maps where each object appears and in which shape.

| Object | Primary Screen | Shape | Secondary Screens | Shapes |
|--------|---------------|-------|-------------------|--------|
| Student | Students list | row | Class roster, Assignment progress, Score report, Student Group members, Search results | row, data-row, compact-card, mini-row, header |
| Teacher | Admin > Users | row | Class header, Report attribution | profile, header, data-row |
| Class | Classes list | card | Student detail (nested), Assessment picker, Report header | card, row, compact-card, profile, mini-row, nested-card, header |
| School | Admin > Schools | data-row | Report header, School picker | profile, card, row, mini-row, header |
| District | Admin > District | profile | Report header, District picker | data-row, card, row, mini-row, header |
| Assessment | Assessments list | card | Class schedule, Student history, Admin dashboard | card, row, profile, compact-card, data-row, header |
| Assignment | Class > Assignments | card | Student task list, Progress report, Calendar, Activity feed | card, row, profile, header |
| Score | Student > Scores | card | Class report, School/District report, Growth report, Student profile (embedded) | card, row, data-row, profile, header |
| Skill | Class > Curriculum Performance | card | Mastery report, Student proficiency, Assignment builder, Assessment breakdown | card, row, profile, compact-card, mini-row, data-row, header |
| Standard | Class > Curriculum Performance | card | Assessment alignment, Freckle tags | card, row, header |
| Resource | Resources library | card | Search results, Assignment builder, Student reading log, Recommendations | card, row, profile |
| Insight | Home dashboard | card | Admin dashboard (future), Star dashboard (future) | card, row, header |
| Proficiency Prediction | Class > Curriculum Performance | card | Tooltip, Standard aggregate, Student row | card, row, header |
| Student Group | Class > Groups | card | Assignment target picker, Group detail | card, row, profile |
| Learning Path | Student > Path | card | Teacher class view, Detail view | card, row, profile |
| Activity Event | Home > Activity feed | card | Class activity log, Activity detail | card, row, profile |
| Score | Student > Scores | card | Class report rows, District report | card, row, data-row, profile, header |
| Live Session | Resources > Lessons | card | During session, Post-session list | card, profile, row |
| Lesson | Resources > Lessons | card | Lesson editor, Live delivery header, Lesson report | card, profile, row, header |
| Activity (Nearpod) | Lesson editor | card | During session, In report | card, profile, row |
| Report | Reports dashboard | card | Full report, Export view | card, profile, row |
| Solution | Admin > Solutions | card | Assignment workflow, Detail | card, row, profile |
| Product | Admin > Products | card | Solution detail, Product detail | card, row, profile |
| Product Assignment | Admin > Provisioning | card | Assignment list, Detail, School overview | card, row, profile |
| Onboarding Checklist | Home dashboard widget | card | Full checklist, Admin view | card, profile, row |
| Onboarding Step | Onboarding checklist | row | Step detail | row, profile |
| Educator Academy Module | Academy catalog | card | Module detail, Checklist context | card, profile, row |

### 3.3 Navigation Flows

These are the primary paths educators take through the app, mapped as object-to-object transitions:

**Flow 1: Class → Students → Scores → Skills (Daily instruction)**
```
Classes list (Class cards)
  → Class detail (profile)
    → Roster tab (Student rows)
      → Student detail (profile)
        → Scores tab (Score cards)
          → Score detail (profile)
            → Skill Breakdown (Skill data-rows)
```

**Flow 2: Assessment → Results → Follow-up (Assessment cycle)**
```
Assessments list (Assessment cards)
  → Assessment detail (profile)
    → Results tab (Student × Score data-rows)
      → Student detail OR
      → Assign Follow-Up → Assignment builder
```

**Flow 3: Curriculum Performance → Insight → Student Group → Assignment (Data-driven instruction)**
```
Class detail → Curriculum Performance tab
  → View student proficiency across skills/standards
  → Notice patterns (which skills are weakest? which students need help?)
  → AI Insights surface recommendations (Insight cards)
    → Accept grouping suggestion → Student Group created
      → Assign to Group → Assignment builder
```

**Flow 4: Dashboard → Activity → Student (Monitoring)**
```
Home dashboard
  → Activity feed (Activity Event cards)
    → Activity detail (profile)
      → Student detail (profile)
```

**Flow 5: Onboarding → Academy → Completion (New user)**
```
Home dashboard → Onboarding Checklist widget (card)
  → Full checklist (profile)
    → Start step → Target action in app OR
    → View Help → Educator Academy Module (profile)
      → Complete Module → Step auto-completes
```

**Flow 6: Resource → Lesson → Live Session → Report (Nearpod delivery)**
```
Resources → Lessons tab (Lesson cards)
  → Lesson detail (profile)
    → Launch Live → Live Session (profile)
      → Advance slides → Launch Activities
        → End Session → Report (profile)
          → Activity Breakdown → Student Detail
```

**Flow 7: Admin → Schools → Products → Provisioning (District admin)**
```
Admin → District dashboard (profile)
  → Manage Schools → School list (data-rows)
    → School detail (profile)
      → Configure Products → Product Assignment (profile)
        → Solution catalog (cards) → Assign to school
```

---

## 4. Screen Specifications

### 4.1 Home Dashboard

**Route:** `/`
**Role:** All educators
**Purpose:** Orientation point — what needs attention right now.

#### Layout

```
┌──────────────────────────────────────────────────────┐
│  Navigation Bar                                       │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Onboarding Checklist (if incomplete)            │ │
│  │  Progress bar + next step CTA                    │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │  Insights Panel       │  │  Quick Actions        │ │
│  │  AI recommendation    │  │  Create Assignment    │ │
│  │  cards (2-3)          │  │  Schedule Assessment  │ │
│  │                       │  │  Browse Resources     │ │
│  └──────────────────────┘  └──────────────────────┘  │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  My Classes (Class cards — teacher-class-list)   │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │ │
│  │  │ 3-A  │ │ 3-B  │ │ 4-A  │ │ 4-B  │           │ │
│  │  └──────┘ └──────┘ └──────┘ └──────┘           │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Recent Activity (Activity Event cards — feed)   │ │
│  │  Scrollable feed of student activity events      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
└──────────────────────────────────────────────────────┘
```

#### Objects and Shapes

| Object | Shape | Visible Attributes | Available CTAs |
|--------|-------|-------------------|----------------|
| Onboarding Checklist | card | Role Variant, Progress, Status, Steps | View Checklist, Resume Checklist, Dismiss Checklist |
| Insight | card | Title, Body, Insight Type, Referenced Students, Referenced Standard, Feedback Status | View Insight, Give Feedback (Helpful/Not Helpful), Dismiss |
| Class | card | Class Name, Grade Level, Subject, Student Count | View, Create Assignment, Schedule Assessment, View Class Report |
| Activity Event | card | Activity Label, Activity Type, Source Product, Score Summary, Started At, Completed At | Open Details |

#### Behavior

- Onboarding Checklist appears only when the user's checklist status is Not Started or In Progress. It disappears after completion or dismissal.
- Insights are scoped to the teacher's classes and the most recently viewed domain. If no domain has been viewed yet, show the most recent session's insights.
- My Classes shows all active classes the teacher is assigned to. School Admins see a summary of all classes at their school instead.
- Activity feed shows the 20 most recent Activity Events across all the teacher's classes, sorted by date descending.

---

### 4.2 Classes List

**Route:** `/classes`
**Role:** Teacher, School Admin
**Purpose:** See all your classes at a glance and jump into one.

#### Layout

**Teacher View:** Grid of Class cards (teacher-class-list shape)
**School Admin View:** Data table of all classes (admin-class-list shape)

#### Teacher — Class Cards

| Attribute | Display |
|-----------|---------|
| Class Name | Card title |
| Grade Level | Subtitle |
| Subject | Tag |
| Student Count | Badge |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View | P | Navigate to `/classes/{slug}` |
| Create Assignment | S | Open assignment builder scoped to this class |
| Schedule Assessment | S | Open assessment scheduler scoped to this class |
| View Class Report | S | Navigate to class report |

#### School Admin — Class Data Table

| Column | Source |
|--------|--------|
| Class Name | identity |
| Teacher | Teacher relationship |
| Grade Level | attribute |
| Subject | attribute |
| Student Count | attribute |
| Period / Block | attribute |

| CTA | Behavior |
|-----|----------|
| View | Navigate to class detail |
| Edit | Open class edit form |

---

### 4.3 Class Detail

**Route:** `/classes/{slug}`
**Role:** Teacher, School Admin
**Purpose:** The primary workspace for day-to-day instruction. Everything about a class in one place.

#### Tabs

| Tab | Objects Displayed | Primary Shape |
|-----|-------------------|---------------|
| **Roster** | Student | row (class-roster) |
| **Assignments** | Assignment | card (class-dashboard) |
| **Assessments** | Assessment | row (class-schedule) |
| **Curriculum Performance** | Standard, Skill, Proficiency Prediction, Insight | TBD — see design exploration below |
| **Groups** | Student Group | card (class-view) |
| **Reports** | Score (aggregated) | data-row |

#### Roster Tab

| Attribute | Display |
|-----------|---------|
| Full Name | Primary text |
| Grade Level | Secondary text |
| Profile Photo | Avatar |
| Enrollment Status | Status badge |
| Reading Level | Data cell |
| Math Level | Data cell |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View Profile | P | Navigate to `/students/{slug}` |
| View Scores | S | Navigate to student scores tab |
| Add to Student Group | T | Open group picker |

#### Assignments Tab

| Attribute | Display |
|-----------|---------|
| Assignment Name | Card title |
| Subject | Tag |
| Assignment Type | Tag |
| Due Date | Metadata |
| Status | Status badge (Assigned, In Progress, Completed, Overdue) |
| Product | Icon |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View | P | Navigate to assignment detail |
| View Progress | S | Open progress overlay showing per-student completion |
| Edit | T | Open assignment edit form |
| Create (global) | S | Open assignment builder |

#### Curriculum Performance Tab

**Problem to solve:** Teachers need to understand how their students are doing across the curriculum — which skills are strong, which need attention, and where to focus instruction next. This is the core value proposition of Renaissance Intelligence.

**Design status:** Open — the specific UI pattern for this tab is an active design exploration. The requirements below describe what the view must accomplish, not how it should look.

**Objects involved:** Standard, Skill, Proficiency Prediction, Insight, Student

**What the teacher needs to answer:**
1. Which skills/standards has the class mastered? Which need the most work?
2. Which students are struggling on specific skills? Which are ahead?
3. Are there clusters of students with similar gaps I could group together?
4. What should I teach or assign next based on the data?
5. Has proficiency changed since the last assessment window?

**Data available per student-skill pair:**
| Data Point | Source |
|------------|--------|
| Proficiency % | Proficiency Prediction |
| Instructional Group | Proficiency Prediction (Enrichment / Instructional / Approaching) |
| Predicted % Correct | Proficiency Prediction |
| Prediction Type | Proficiency Prediction (has_star / practice_only) |
| Skill Is Practiced | Proficiency Prediction |
| Skill Name + Code | Skill |
| Standard Name + Domain | Standard |
| Student Name + Level | Student |

**AI layer — Insights:**
Insights surface alongside curriculum performance data. They are system-generated recommendations scoped to the currently visible domain.

| Attribute | Display |
|-----------|---------|
| Title | Card title |
| Body/Description | Recommendation text |
| Insight Type | Tag (classwide_learning_need / student_grouping_suggestion) |
| Referenced Students | Student list within card |
| Referenced Standard/Domain | Tag |
| Feedback Status | Button group |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View Insight | P | Expand insight card |
| Give Feedback Helpful | S | Record positive feedback |
| Give Feedback Not Helpful | S | Record negative feedback |
| Dismiss Insight | T | Hide insight from view |
| Accept grouping suggestion | S | Create Student Group from referenced students |

**Design approaches to explore:**

| Approach | Strengths | Risks |
|----------|-----------|-------|
| **Student × Skill matrix (grid)** | Compact, shows every data point, pattern recognition through color | Dense, overwhelming on mobile, hard to act on |
| **Skill-first cards** | Each skill gets a card showing class distribution and struggling students | Loses the per-student cross-skill view |
| **Student-first list** | Each student row shows proficiency across key skills as inline indicators | Familiar roster pattern, easy to scan by student |
| **Domain summary → drill-down** | Start with domain-level aggregates, expand into skills, then into students | Progressive disclosure reduces overwhelm, but adds clicks |
| **Narrative + data hybrid** | AI-generated summary text paired with targeted data visualizations | Feels actionable, but risks obscuring the raw data |

The prototype should start with one approach and validate whether it answers the five teacher questions above. The pattern may evolve during implementation.

#### Groups Tab

| Attribute | Display |
|-----------|---------|
| Group Name | Card title |
| Student Count | Badge |
| Grouping Criteria | Subtitle |
| Source | Tag (teacher-created / system-suggested) |
| Status | Status badge |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View Group | P | Navigate to group detail |
| Assign to Group | P | Open assignment builder scoped to group |
| Edit Group | S | Open group membership editor |
| Create Group | P | Open new group form |

---

### 4.4 Student Detail

**Route:** `/students/{slug}`
**Role:** Teacher, School Admin, District Admin
**Purpose:** Everything about one student — academic standing, enrollment, scores, activity, and learning path.

#### Header (student-detail shape)

| Attribute | Display | Visibility |
|-----------|---------|------------|
| Full Name | Page title | All |
| Grade Level | Subtitle | All |
| Profile Photo | Avatar | All |
| Reading Level | Metric card | All |
| Math Level | Metric card | All |
| Student ID | Detail | Admin only |
| School | Link | All |
| Class(es) | Tags (linked) | All |
| Enrollment Status | Status badge | All |
| Date of Birth | Detail | Admin only |
| Username / Login | Detail | Admin only |
| Demographic Data | Detail | Admin only |
| Guardian/Parent Contact | Detail | Admin only |
| State/District Student ID | Detail | Admin only |
| Language Preference | Detail | Admin only |

#### Tabs

| Tab | Objects | Primary Shape | Description |
|-----|---------|---------------|-------------|
| **Overview** | Score (latest), Skill (proficiency), Class (nested) | header, compact-card, nested-card | At-a-glance academic standing |
| **Scores** | Score | card (timeline) | Assessment score history with trend lines |
| **Skills** | Skill, Proficiency Prediction | compact-card, data-row | Per-skill proficiency with practice recommendations |
| **Assignments** | Assignment | row | Active and completed assignments with status |
| **Activity** | Activity Event | card (feed) | Unified activity timeline across all products |
| **Learning Path** | Learning Path | card → profile | Personalized adaptive sequence (if active) |

#### Overview Tab

- **Latest Scores:** 3 most recent Score cards (student-profile-score-history shape) showing value, proficiency band, and assessment name
- **Skill Proficiency:** Top 6 skills as compact-cards with mastery percentage and proficiency band
- **Enrolled Classes:** Class nested-cards with subject, teacher, and upcoming due dates
- **Learning Path:** Summary card if an active path exists (subject, focus skills, progress percentage)

#### Scores Tab

Score cards arranged as a vertical timeline, grouped by assessment type (Star Reading, Star Math, AR, etc.).

| Attribute | Display |
|-----------|---------|
| Score Value | Primary metric |
| Proficiency Band | Color-coded badge |
| Assessment/Assignment | Label |
| Date | Timeline marker |
| Growth SGP | Trend indicator |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View | P | Expand score detail inline |
| View Trend | S | Show trend chart overlay |
| View Skill Breakdown | S | Navigate to skill-level analysis |
| Assign Follow-Up | T | Open assignment builder pre-populated with gap skills |
| Share with Parent | T | Generate parent-friendly PDF |
| Export | T | Download score data |

#### Skills Tab

| Attribute | Display |
|-----------|---------|
| Skill Code | Code badge |
| Skill Name | Primary text |
| Subject | Tag |
| Grade Level | Tag |
| Domain/Strand | Group header |
| Mastery % | Progress bar |
| Instructional Group | Color indicator |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View | P | Expand skill detail |
| Assign Practice | S | Create targeted assignment for this skill |
| View Mastery Report | S | Navigate to class-wide mastery for this skill |

#### Activity Tab

Unified activity feed (Activity Event cards in student-activity-feed shape), showing all interactions across products.

| Attribute | Display |
|-----------|---------|
| Activity Label | Card title |
| Activity Type | Icon + label |
| Source Product | Product icon |
| Score Summary | Metric (if scored) |
| Started At | Timestamp |
| Completed At | Timestamp |

| CTA | Priority | Behavior |
|-----|----------|----------|
| Open Details | P | Navigate to full activity event detail |
| Open Report | S | Navigate to related report |

#### Learning Path Tab

If the student has an active Learning Path, display it as a full profile view.

| Attribute | Display |
|-----------|---------|
| Path Name | Title |
| Subject | Tag |
| Focus Skills | Skill tags |
| Current Level | Metric |
| Target Level | Metric |
| Progress | Progress bar with percentage |
| Status | Status badge (Active, Paused, Complete, Stale) |
| Activities | Ordered list of assignments |
| Estimated Remaining | Duration estimate |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View Learning Path | P | Already on this tab |
| Customize Path | S | Open path editor for reordering/modifying activities |
| Accept Recommendation | P | Approve a system-suggested activity |
| Reject Recommendation | T | Remove a system-suggested activity |
| View Path Progress | S | Show progress chart |
| Reset Path | T | Regenerate the path from latest assessment data |

---

### 4.5 Assessment Management

**Route:** `/assessments`
**Role:** Teacher, School Admin
**Purpose:** Browse available assessments, schedule them for classes, and review results.

#### Assessment Library (assessment-library shape)

Grid of Assessment cards with filtering by type, subject, and status.

| Attribute | Display |
|-----------|---------|
| Assessment Name | Card title |
| Assessment Type | Tag (Star Reading, Star Math, DnA, etc.) |
| Subject | Tag |
| Grade Range | Badge |
| Status | Status badge |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View | P | Navigate to assessment detail |
| View Results | S | Navigate to results tab |
| Schedule | S | Open class picker for scheduling |

#### Assessment Detail (assessment-detail shape)

**Route:** `/assessments/{slug}`

| Attribute | Display |
|-----------|---------|
| Assessment Name | Title |
| Assessment Type | Tag |
| Subject | Tag |
| Grade Range | Badge |
| Status | Status badge |
| Testing Window | Date range |
| Duration | Time estimate |
| Item Count | Count |
| Scoring Method | Label |
| Accommodations | List |
| Standards Alignment | Skill tags |

**Tabs within detail:**

| Tab | Content |
|-----|---------|
| Overview | Configuration, standards, accommodations |
| Results | Score data-rows with student performance |
| Skill Breakdown | Per-skill performance (Skill data-rows) |

**Results tab (class-score-report shape):**

| Column | Source |
|--------|--------|
| Student (Full Name, Grade) | Student relationship |
| Score Value | Score |
| Proficiency Band | Score → calculated |
| Growth SGP | Score |

| CTA | Behavior |
|-----|----------|
| View | Navigate to student detail |
| Compare | Open comparison overlay |
| Assign Follow-Up | Pre-populate assignment builder with gap skills |

---

### 4.6 Resource Library

**Route:** `/resources`
**Role:** Teacher
**Purpose:** Browse, search, preview, and assign instructional content.

#### Tabs

| Tab | Content |
|-----|---------|
| **Library** | Resources as browsable cards (library-browse shape) |
| **Lessons** | Nearpod Lessons as cards (browse-library shape) |
| **My Favorites** | Bookmarked resources and lessons |
| **Recently Used** | Last 20 resources accessed |

#### Resource Cards (library-browse shape)

| Attribute | Display |
|-----------|---------|
| Title | Card title |
| Resource Type | Icon |
| Subject | Tag |
| Reading/Difficulty Level | Badge |
| Product | Product icon |

| CTA | Priority | Behavior |
|-----|----------|----------|
| View / Read / Play | P | Open resource |
| Preview | S | Open in preview mode |
| Assign | S | Open assignment builder with resource pre-selected |
| Add to Favorites | T | Bookmark |

#### Lesson Cards (browse-library shape)

| Attribute | Display |
|-----------|---------|
| Lesson Title | Card title |
| Subject | Tag |
| Grade Band | Badge |
| Lesson Type | Tag (live / self-paced / both) |
| Slide Count | Badge |
| Duration | Metadata |
| Source | Label (library / teacher-created / shared) |

| CTA | Priority | Behavior |
|-----|----------|----------|
| Preview Lesson | S | Open lesson previewer |
| Launch Live Lesson | P | Create Live Session, show join code |
| Assign Self-Paced | P | Open assignment builder |
| Favorite Lesson | T | Bookmark |

---

### 4.7 Live Session

**Route:** `/sessions/{code}` (teacher view during delivery)
**Role:** Teacher (host), Student (participant)
**Purpose:** Real-time lesson delivery with pacing controls and activity launching.

#### Pre-Launch (pre-launch shape)

| Attribute | Display |
|-----------|---------|
| Join Code | Large, copyable code |
| Lesson Reference | Lesson title link |
| Class | Class name |
| Session Status | Status badge |

| CTA | Behavior |
|-----|----------|
| Launch Session | Start the session |
| Share Join Code | Copy code or display QR |

#### During Session (during-session shape)

Full-screen session dashboard with slide content and control bar.

| Attribute | Display |
|-----------|---------|
| Join Code | Persistent display |
| Session Status | Live indicator |
| Participant Count | Real-time counter |
| Participation Rate | Percentage |
| Duration | Timer |

| CTA | Behavior |
|-----|----------|
| Advance Slide | Move to next slide |
| Launch Activity | Present activity to students |
| Skip Activity | Skip current activity |
| Pause Session | Freeze all student screens |
| Resume Session | Unfreeze |
| End Session | Finalize and generate report |

#### Post-Session

Redirect to Report detail for the completed session.

---

### 4.8 Reports

**Route:** `/reports`
**Role:** Teacher, School Admin, District Admin
**Purpose:** Review performance data from lesson deliveries, assessments, and cross-product analytics.

#### Report Dashboard (report-dashboard shape)

| Attribute | Display |
|-----------|---------|
| Report Type | Tag (Live Session / Self-Paced / Assessment / Combined) |
| Lesson/Assessment Reference | Title link |
| Class | Label |
| Generated Date | Date |
| Participation Rate | Percentage |
| Average Score | Score |
| Status | Badge |

| CTA | Behavior |
|-----|----------|
| View Report | Navigate to full report |

#### Full Report (full-report shape)

**Route:** `/reports/{id}`

**Sections:**
1. **Summary** — Participation rate, average score, student count, time period
2. **Activity Breakdown** — Per-activity results (Activity rows with response count, average score)
3. **Student Detail** — Per-student results (Student rows with per-activity scores)

| CTA | Behavior |
|-----|----------|
| View Activity Breakdown | Expand activity section |
| View Student Detail | Drill into individual student responses |
| Export Report | Download as PDF or CSV |
| Share Report | Send to colleagues |
| Compare Reports | Side-by-side comparison of two deliveries |
| Archive Report | Hide from default view |

---

### 4.9 Academy

**Route:** `/academy`
**Role:** Teacher, School Admin
**Purpose:** Self-paced professional learning to build product competency.

#### Module Catalog (browse-academy shape)

| Attribute | Display |
|-----------|---------|
| Module Title | Card title |
| Feature Area | Tag |
| Target Role | Badge (Teacher / Admin / Both) |
| Format | Tag (video / interactive / walkthrough) |
| Duration | Time estimate |
| Status | Badge (Not Started / In Progress / Complete) |

| CTA | Priority | Behavior |
|-----|----------|----------|
| Start Module | P | Begin module (if prerequisites met) |
| Resume Module | S | Continue where left off |
| View Certificate | T | View completion badge/certificate |

#### Module Detail (module-detail shape)

**Route:** `/academy/{slug}`

| Attribute | Display |
|-----------|---------|
| Module Title | Title |
| Description | Body text |
| Feature Area | Tag |
| Target Role | Badge |
| Format | Tag |
| Duration | Time estimate |
| Completion Criteria | Requirements list |
| Prerequisites | Module links (disabled if incomplete) |
| Badge/Certification | Award display |
| Status | Progress indicator |

---

### 4.10 Admin — School & District Management

**Route:** `/admin`
**Role:** School Admin, District Admin
**Purpose:** Manage organizational structure, user accounts, product provisioning.

#### District Admin Tabs

| Tab | Objects | Shape |
|-----|---------|-------|
| **Schools** | School | data-row (district-school-list) |
| **Users** | Teacher | data-row (admin-user-mgmt) |
| **Products** | Product, Solution | card (product-catalog, solution-catalog) |
| **Provisioning** | Product Assignment | card (provisioning-dashboard), row |
| **Reports** | Score (aggregated) | data-row (school-district-report) |

#### School Admin Tabs

| Tab | Objects | Shape |
|-----|---------|-------|
| **Classes** | Class | data-row (admin-class-list) |
| **Teachers** | Teacher | data-row |
| **Students** | Student | data-row |
| **Onboarding** | Onboarding Checklist | row (admin-view) |
| **Products** | Product Assignment | row (school-overview) |

#### Provisioning Workflow (District Admin)

1. Browse Solution catalog (Solution cards)
2. Select Solution → View included Products (Product rows within Solution)
3. Create Product Assignment → Set scope (School / Grade / Class)
4. Set effective date → Confirm → Assignment created
5. View on Provisioning Dashboard (Product Assignment cards)

---

### 4.11 Onboarding (First-time User Experience)

**Trigger:** Automatically generated on first login based on user role.

#### Dashboard Widget (dashboard-widget shape)

Appears as the first section on the Home dashboard when checklist is incomplete.

| Attribute | Display |
|-----------|---------|
| Progress | Progress bar with percentage |
| Status | Not Started / In Progress |
| Next Step | CTA button for next incomplete step |

#### Full Checklist View (full-checklist shape)

**Route:** `/onboarding`

Ordered list of Onboarding Steps (in-checklist shape).

| Step Attribute | Display |
|----------------|---------|
| Icon | Step icon |
| Step Title | Primary text |
| Order | Step number |
| Status | Checkbox (not-started / in-progress / complete / skipped) |
| Target Object | Context text |

| CTA | Behavior |
|-----|----------|
| Start Step | Navigate to target action location in app |
| Complete Step | Mark as done (manual steps) |
| Skip Step | Skip and count toward progress |
| Undo Skip | Return to not-started |
| View Help | Navigate to linked Educator Academy Module |

**Teacher Checklist Steps (5):**
1. View your class roster
2. Schedule your first Star assessment
3. Review student assessment results
4. Create your first assignment
5. Explore the resource library

**Admin Checklist Steps (8):**
1. Review your school's roster
2. Configure product settings
3. Verify SIS integration
4. Add teacher accounts (if needed)
5. Schedule benchmark assessments
6. Set up assessment windows
7. Review onboarding progress for teachers
8. Explore the Educator Academy

---

## 5. Student Group Detail

**Route:** `/classes/{class-slug}/groups/{group-slug}`
**Role:** Teacher
**Purpose:** Manage differentiation group membership and assign targeted work.

#### Group Header

| Attribute | Display |
|-----------|---------|
| Group Name | Title |
| Class | Breadcrumb link |
| Student Count | Badge |
| Grouping Criteria | Subtitle |
| Source | Tag (teacher-created / system-suggested) |
| Associated Skill/Metric | Skill tag |
| Status | Badge (Active / Stale / Archived) |
| Created Date | Metadata |
| Last Refreshed | Metadata (for system-suggested groups) |

#### Members List (Student compact-cards — student-group shape)

| Attribute | Display |
|-----------|---------|
| Full Name | Text |
| Grade Level | Badge |
| Profile Photo | Avatar |
| Reading Level | Metric |
| Math Level | Metric |

#### CTAs

| CTA | Priority | Behavior |
|-----|----------|----------|
| View Group | P | Already on this page |
| Edit Group | S | Toggle membership editing (add/remove students) |
| Assign to Group | P | Open assignment builder scoped to group |
| View Group Report | S | Show aggregated score data for group members |
| Refresh Group | T | Re-evaluate membership based on latest proficiency data |
| Delete Group | Q | Archive and hide from view |

---

## 6. Mock Data Strategy

### 6.1 Mock Data Hierarchy

The mock dataset creates a complete, realistic instance of a Renaissance Intelligence deployment:

```
Westfield Unified School District (District)
├── Lincoln Elementary School (School)
│   ├── Maria Rodriguez (Teacher — Grade 3)
│   │   ├── Class 3-A (ELA, 24 students)
│   │   │   ├── 24 Students with scores, skills, activity events
│   │   │   ├── 6 Assignments (mix of statuses)
│   │   │   ├── 3 Assessments (Star Reading BOY, MOY, EOY)
│   │   │   ├── 2 Student Groups (1 teacher-created, 1 system-suggested)
│   │   │   └── Proficiency Predictions for all student-skill pairs
│   │   └── Class 3-B (Math, 22 students)
│   │       ├── 22 Students (some overlap with 3-A)
│   │       ├── 4 Assignments
│   │       ├── 2 Assessments (Star Math BOY, MOY)
│   │       └── 1 Student Group
│   ├── James Chen (Teacher — Grade 4)
│   │   ├── Class 4-A (ELA, 26 students)
│   │   └── Class 4-B (Math, 26 students)
│   └── Sarah Kim (School Admin)
│       └── Onboarding Checklist (In Progress, 62%)
├── Washington Middle School (School)
│   ├── David Okafor (Teacher — Grade 6)
│   │   ├── Class 6-A (ELA, 28 students)
│   │   └── Class 6-B (Science, 28 students)
│   └── Lisa Park (School Admin)
└── Central High School (School)
    └── Michael Torres (Teacher — Grade 9)
        ├── Class 9-A (ELA, 30 students)
        └── Class 9-B (Math, 30 students)
```

### 6.2 Mock Data Counts

| Object | Count | Notes |
|--------|-------|-------|
| District | 1 | Westfield Unified |
| School | 3 | Elementary, Middle, High |
| Teacher | 5 | Mix of grades and subjects |
| Class | 8 | 2 per teacher |
| Student | ~120 | Unique students across classes |
| Assessment | 12 | Mix of Star, benchmark, formative |
| Assignment | 30 | Mix of statuses and types |
| Score | ~500 | Multiple scores per student across assessments |
| Skill | 40 | ELA and Math skills per grade |
| Standard | 12 | Common Core ELA + Math per grade band |
| Resource | 50 | Books, articles, practice sets, videos |
| Proficiency Prediction | ~2,400 | ~120 students × ~20 skills |
| Insight | 15 | Mix of classwide + grouping suggestion |
| Student Group | 8 | 1-2 per class |
| Learning Path | 30 | Active paths for ~25% of students |
| Activity Event | 200 | Recent activity feed entries |
| Live Session | 4 | Mix of active, ended |
| Lesson | 10 | Nearpod lessons |
| Activity (Nearpod) | 30 | 3 per lesson |
| Report | 8 | Post-session and assessment reports |
| Solution | 3 | Star + Freckle, Nearpod Suite, Full Platform |
| Product | 6 | Star, Freckle, AR, myON, Nearpod, Lalilo |
| Product Assignment | 5 | Various school-level assignments |
| Onboarding Checklist | 5 | One per teacher/admin |
| Onboarding Step | 28 | 5 per teacher, 8 per admin |
| Educator Academy Module | 8 | Mix of feature areas and formats |

### 6.3 Focus Teacher: Maria Rodriguez

The prototype's primary walk-through follows Maria Rodriguez, a Grade 3 teacher at Lincoln Elementary. Her data is the richest and covers the full feature set:

**Maria's Profile:**
- Full Name: Maria Rodriguez
- Role: Teacher
- School: Lincoln Elementary School
- Subject Areas: ELA, Math
- Classes: 3-A (ELA, 24 students), 3-B (Math, 22 students)
- Onboarding: Complete

**Class 3-A — ELA Detail:**
- 24 students with diverse proficiency levels
- 3 Star Reading assessments (BOY: Sept, MOY: Jan, EOY: May) with scores for all students
- 6 assignments: 2 completed, 2 in progress, 1 overdue, 1 assigned
- Proficiency predictions across 20 ELA skills and 6 ELA standards
- 2 Insights: 1 classwide learning need, 1 student grouping suggestion
- 2 Student Groups: "Below Grade Level Readers" (teacher-created, 6 students), "Vocabulary Gap Cluster" (system-suggested from Insight, 4 students)
- 5 students with active Learning Paths
- 30+ Activity Events in the last 7 days
- 2 Nearpod lessons delivered (1 as live session, 1 self-paced)
- 2 Reports generated

**Highlighted Students in Class 3-A:**

| Student | Reading Level | Math Level | Narrative Role |
|---------|---------------|------------|----------------|
| Amara Johnson | 520 (At/Above) | 480 (On Watch) | High reader, math intervention needed |
| Leo Vasquez | 380 (Urgent) | 510 (At/Above) | Reading intervention, math enrichment |
| Priya Patel | 450 (On Watch) | 460 (On Watch) | Consistent mid-range, monitor |
| Marcus Williams | 490 (At/Above) | 495 (At/Above) | Strong across the board |
| Sofia Chen | 400 (Intervention) | 430 (Intervention) | Needs support in both areas |
| Jayden Brooks | 470 (On Watch) | 520 (At/Above) | Math strength, reading developing |

### 6.4 Mock Data File Structure

Mock data lives alongside real object data and is importable by the component library and prototype:

```
data/
├── mock/
│   ├── district.json          # Westfield Unified + 3 schools
│   ├── teachers.json          # 5 teachers with profiles
│   ├── students.json          # ~120 students with demographics
│   ├── classes.json           # 8 classes with rosters
│   ├── assessments.json       # 12 assessments
│   ├── assignments.json       # 30 assignments across classes
│   ├── scores.json            # ~500 scores
│   ├── skills.json            # 40 skills (ELA + Math)
│   ├── standards.json         # 12 standards
│   ├── resources.json         # 50 resources
│   ├── predictions.json       # ~2,400 proficiency predictions
│   ├── insights.json          # 15 insights
│   ├── student-groups.json    # 8 groups
│   ├── learning-paths.json    # 30 paths
│   ├── activity-events.json   # 200 events
│   ├── lessons.json           # 10 Nearpod lessons
│   ├── activities.json        # 30 Nearpod activities
│   ├── live-sessions.json     # 4 sessions
│   ├── reports.json           # 8 reports
│   ├── solutions.json         # 3 solutions
│   ├── products.json          # 6 products
│   ├── product-assignments.json # 5 provisioning records
│   ├── onboarding.json        # 5 checklists + 28 steps
│   └── academy-modules.json   # 8 modules
└── mock-index.ts              # Typed exports for all mock data
```

### 6.5 Mock Data Sharing with Component Library

Mock data is structured to match the `ShowcaseExample` interface from `data/schema.ts`. Each mock entry includes the same attribute keys used by the Lit Web Components, allowing the prototype and the Caboodle component showcases to share a single source of truth.

```typescript
// data/mock-index.ts
import type { ObjectDefinition } from './schema';

export interface MockDataset {
  district: DistrictMock;
  schools: SchoolMock[];
  teachers: TeacherMock[];
  students: StudentMock[];
  classes: ClassMock[];
  assessments: AssessmentMock[];
  // ... all 26 object types
}

// Each mock type includes the attributes defined in
// the corresponding ObjectDefinition.allAttributes,
// making them directly usable as ShowcaseExample data
// in the Caboodle component library.
```

---

## 7. Interaction Patterns

### 7.1 Global Patterns

| Pattern | Description |
|---------|-------------|
| **Object navigation** | Clicking an object representation (card, row, compact-card) navigates to its detail page. The object's shape determines how much data is visible before clicking. |
| **Cross-object CTAs** | CTAs that create or reference another object (e.g., "Create Assignment" on a Class card) pre-populate the target form with context from the source object. |
| **Breadcrumb context** | Detail pages show breadcrumb navigation reflecting the path the user took (e.g., Classes > 3-A > Students > Amara Johnson). |
| **Inline expansion** | Data-rows and rows can expand inline to show additional attributes without navigating away. |
| **Filter + Sort** | List and grid views support filtering by status, type, and date range. Sort controls reflect the object's defined sorts. |
| **Search** | Global search (accessible from nav bar) returns results across Students, Classes, Assessments, Resources, and Lessons as compact-cards or rows. |
| **Empty states** | When no data exists for a section, show a descriptive message and a CTA to create or configure (e.g., "No assignments yet. Create your first assignment."). |
| **Loading states** | Skeleton screens matching the expected shape (card skeleton, row skeleton, grid skeleton). |

### 7.2 Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>1024px) | Full layout with sidebar navigation, multi-column grids, full curriculum performance view |
| Tablet (768-1024px) | Collapsed sidebar, 2-column grids, adapted curriculum performance layout |
| Mobile (<768px) | Bottom tab navigation, single-column stacking, student-focused curriculum views |

### 7.3 Status Badge Mapping

Consistent color coding across all object lifecycle states:

| Variant | Color | Used By |
|---------|-------|---------|
| `active` | Green | Active, In Progress, Available, Current |
| `default` | Gray | Created, Inactive, Historical, Not Started, Archived |
| `warn` | Amber/Orange | Overdue, Transferred, Stale, Paused, Deprecated, Invalidated |

---

## 8. Technical Architecture (Prototype)

### 8.1 Stack

- **Framework:** Next.js 16 App Router (extends existing Caboodle site)
- **Components:** Lit Web Components for object representations (extends `@renaissance/object-components`)
- **Styling:** CSS custom properties + Every Layout primitives (extends existing design system)
- **Data:** Static JSON mock data loaded at build time via `lib/objects.ts` pattern
- **Routing:** File-based App Router routes under `/prototype/`

### 8.2 Route Structure

```
/prototype/                          # Dashboard (Home)
/prototype/classes/                   # Classes list
/prototype/classes/[slug]/            # Class detail (tabbed)
/prototype/students/                  # Students list
/prototype/students/[slug]/           # Student detail (tabbed)
/prototype/assessments/               # Assessment library
/prototype/assessments/[slug]/        # Assessment detail
/prototype/resources/                 # Resource library + Lessons
/prototype/resources/lessons/[slug]/  # Lesson detail
/prototype/sessions/[code]/           # Live Session view
/prototype/reports/                   # Report dashboard
/prototype/reports/[id]/              # Full report
/prototype/academy/                   # Module catalog
/prototype/academy/[slug]/            # Module detail
/prototype/admin/                     # Admin dashboard
/prototype/admin/schools/             # School management
/prototype/admin/schools/[slug]/      # School detail
/prototype/admin/provisioning/        # Product assignments
/prototype/onboarding/                # Full onboarding checklist
```

### 8.3 Component Reuse

The prototype maximizes reuse of existing Caboodle components:

| Existing Component | Prototype Usage |
|--------------------|----------------|
| `<ren-student-card>` | Student cards in search, groups, dashboards |
| `<ren-student-row>` | Roster rows, assignment progress, score reports |
| `<ren-student-profile>` | Student detail page header |
| `<ren-class-card>` | Class cards on dashboard, class list |
| `<ren-class-row>` | Admin class tables |
| `<ren-assessment-card>` | Assessment library cards |
| `<ren-score-card>` | Score cards in student profiles |
| `<ren-score-row>` | Score data in class reports |
| `<ren-insight-card>` | Insight panel cards |
| `<ren-assignment-card>` | Assignment cards on class dashboard |
| `Tabs` (React) | All tabbed views |
| `DataTable` (React) | Admin data tables |
| `ConfigPanel` (React) | Role/lifecycle toggle in showcases |

### 8.4 New Components Needed

| Component | Type | Purpose |
|-----------|------|---------|
| `PrototypeNav` | React | Prototype-specific navigation with role switcher |
| `CurriculumPerformance` | React + Lit | Curriculum performance view (pattern TBD during design exploration) |
| `InsightPanel` | React wrapper | AI insight cards alongside curriculum performance data |
| `OnboardingWidget` | React | Dashboard checklist progress card |
| `LearningPathView` | React + Lit | Adaptive path timeline with activity cards |
| `ActivityFeed` | React wrapper | Scrollable feed of Activity Event cards |
| `SessionDashboard` | React | Live Session control panel |
| `RoleSwitcher` | React | Toggle between Teacher / School Admin / District Admin views |
| `BreadcrumbNav` | React | Contextual breadcrumb trail |
| `SearchOverlay` | React | Global search with cross-object results |

---

## 9. Prototype Scenarios

These are the key scenarios the prototype should demonstrate end-to-end:

### Scenario 1: Morning Check-in (Teacher)
1. Maria logs in → Dashboard shows Class 3-A and 3-B cards, 2 Insights, recent Activity Events
2. She notices an Insight about a vocabulary gap → opens the insight, sees 4 referenced students
3. She accepts the grouping suggestion → "Vocabulary Gap Cluster" group is created
4. She assigns a vocabulary practice set to the group → assignment is created

### Scenario 2: Assessment Review (Teacher)
1. Maria navigates to Assessments → sees Star Reading MOY results are ready
2. She opens the assessment → views results sorted by proficiency band
3. She identifies 3 students in Urgent Intervention → clicks "Assign Follow-Up"
4. She creates a targeted reading assignment for the struggling students

### Scenario 3: Curriculum Performance Review (Teacher)
1. Maria opens Class 3-A → navigates to Curriculum Performance tab
2. She sees how her students are doing across ELA standards and skills
3. She focuses on the "Reading Informational Text" domain to see individual skill proficiency
4. She notices a pattern — several students are struggling with "Key Ideas and Details" → an Insight confirms a classwide learning need
5. She drills into the struggling students → navigates to Amara Johnson's profile

### Scenario 4: Student Deep Dive (Teacher)
1. Maria views Amara's profile → sees Reading Level 520 (At/Above), Math Level 480 (On Watch)
2. She checks the Scores tab → sees Star Reading trend (growth from 480 → 520 over 3 tests)
3. She checks the Skills tab → identifies 2 math skills below grade level
4. She checks the Learning Path tab → sees an active Math path with 60% progress
5. She customizes the path by adding a specific practice resource

### Scenario 5: New Teacher Onboarding (Teacher)
1. James Chen (new teacher) logs in for the first time → Dashboard shows Onboarding Checklist at 0%
2. He starts Step 1: "View your class roster" → navigates to Classes → opens Class 4-A
3. Step 1 auto-completes → progress updates to 20%
4. He clicks "View Help" on Step 2 → opens the "Scheduling Star Assessments" Academy module
5. He completes the module → Step 2 auto-completes → progress updates to 40%

### Scenario 6: School Admin Overview (School Admin)
1. Sarah Kim (School Admin at Lincoln Elementary) logs in → Dashboard shows school-level summary
2. She navigates to Admin → sees all classes at Lincoln as data-rows
3. She checks the Onboarding tab → sees James Chen at 40%, Maria at 100%
4. She navigates to school-level Reports → sees aggregate Star Reading performance across grades

### Scenario 7: District Provisioning (District Admin)
1. District Admin logs in → navigates to Admin
2. She opens the Provisioning tab → sees current Product Assignments
3. She creates a new Product Assignment: "Star + Freckle" solution → scoped to Lincoln Elementary
4. She sets the effective date → assignment is created and active

### Scenario 8: Live Lesson Delivery (Teacher — Nearpod)
1. Maria navigates to Resources → Lessons tab → finds "Main Idea Detectives"
2. She clicks "Launch Live Lesson" → a Live Session is created with join code "XKCD5"
3. She shares the code → 22 students join → participant count updates in real time
4. She advances through slides, launches 3 activities → students respond
5. She ends the session → Report is auto-generated
6. She reviews the report: 85% participation, 72% average score, 1 student missed the session

---

## 10. Success Criteria

The prototype succeeds when it can demonstrate:

1. **Object identity** — Each of the 26 objects is visually recognizable through its shape, attributes, and context
2. **Relationship navigation** — Users can navigate between related objects fluidly (class → student → score → skill)
3. **CTA placement** — Primary, Secondary, and Tertiary CTAs appear in the right contexts at the right priority
4. **Shapeshifting with intent** — The same object (e.g., Student) looks appropriately different across contexts (roster row vs. search result vs. score report)
5. **Role-based views** — Switching between Teacher, School Admin, and District Admin shows different data scopes and available actions
6. **AI integration** — Insights and Proficiency Predictions surface naturally within the teacher's workflow
7. **Onboarding flow** — A new user can complete the onboarding checklist by performing real actions in the app
8. **End-to-end data flow** — Assessment → Score → Proficiency Prediction → Insight → Student Group → Assignment demonstrates the full data-to-action cycle
9. **Mock data realism** — Data tells a coherent story about students at different proficiency levels with realistic scores, trends, and activity patterns
10. **Component reuse** — Lit Web Components from `@renaissance/object-components` render correctly with mock data in prototype contexts
