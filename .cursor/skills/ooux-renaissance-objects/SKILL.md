---
name: ooux-renaissance-objects
description: "When working with Renaissance products or any of: Student, Teacher, Class, School, District, Assessment, Assignment, Skill, Resource, Score, Standard, Proficiency Prediction, Insight"
---
# Renaissance Core Objects

Renaissance products share 13 core objects. Use this reference when discussing any Renaissance product, feature, or domain concept.

## Object Directory

Full Object Guide data lives in `data/objects/`. Read the JSON file for any object to get its complete definition, attributes, CTAs, relationships, **`objectViews`** (context-specific `ObjectView` entries: list vs. detail, with `ShapeSpec`s for list/grid/table where applicable), and more.

## The 13 Core Objects

### Student
- **Definition**: A learner enrolled in the Renaissance platform who takes assessments, completes assignments, and consumes resources.
- **Key Attributes**: Name, grade level, reading level, math level, enrollment date, status (active/inactive)
- **Key Relationships**: Belongs to Class (many:many), belongs to School (many:1), takes Assessment (many:many), completes Assignment (many:many), earns Score (1:many)
- **Shapeshifter**: Appears differently across Star (test-taker), myON (reader), Freckle (practice learner), Nearpod (participant)
- See `data/objects/student.json` for the full Object Guide data

### Teacher
- **Definition**: An educator who manages classes, assigns assessments and assignments, and monitors student progress.
- **Key Attributes**: Name, email, role, subjects taught, school affiliation, status
- **Key Relationships**: Manages Class (1:many), belongs to School (many:1), assigns Assessment (1:many), creates Assignment (1:many)
- See `data/objects/teacher.json` for the full Object Guide data

### Class
- **Definition**: A group of students organized for instruction, serving as the primary container for academic activity.
- **Key Attributes**: Name, subject, grade level, academic year, period, status
- **Key Relationships**: Contains Student (many:many), managed by Teacher (many:1), belongs to School (many:1), contains Assignment (1:many), contains Assessment (1:many)
- **Hub Object**: Many objects nest inside Class — it is a central organizing concept.
- See `data/objects/class.json` for the full Object Guide data

### School
- **Definition**: An educational institution that contains classes, teachers, and students.
- **Key Attributes**: Name, address, type (elementary/middle/high), district affiliation, NCES ID, status
- **Key Relationships**: Contains Class (1:many), contains Teacher (1:many), contains Student (1:many), belongs to District (many:1)
- See `data/objects/school.json` for the full Object Guide data

### District
- **Definition**: An administrative region managing multiple schools with shared policies and reporting.
- **Key Attributes**: Name, state, region, admin contact, license details, status
- **Key Relationships**: Contains School (1:many), defines policies for Assessment (1:many)
- **Top-level Object**: Highest in the organizational hierarchy.
- See `data/objects/district.json` for the full Object Guide data

### Assessment
- **Definition**: A formal or informal evaluation instrument used to measure student knowledge and skills.
- **Key Attributes**: Title, type (Star, formative, benchmark), subject, grade range, duration, scoring method, status
- **Key Relationships**: Assigned to Student (many:many), assigned to Class (many:many), created by Teacher (many:1), produces Score (1:many), measures Skill (many:many)
- **Often confused with**: Assignment (assessments measure; assignments practice)
- See `data/objects/assessment.json` for the full Object Guide data

### Assignment
- **Definition**: A task or activity assigned to students for practice, reinforcement, or enrichment.
- **Key Attributes**: Title, type (practice, homework, project), subject, due date, status, completion criteria
- **Key Relationships**: Assigned to Student (many:many), belongs to Class (many:1), created by Teacher (many:1), uses Resource (many:many), targets Skill (many:many)
- **Often confused with**: Assessment (assignments practice; assessments measure)
- See `data/objects/assignment.json` for the full Object Guide data

### Skill
- **Definition**: A discrete learning competency or standard that students develop and assessments measure.
- **Key Attributes**: Name, domain (reading/math/science), grade band, standard code, description, progression level
- **Key Relationships**: Measured by Assessment (many:many), practiced in Assignment (many:many), mastered by Student (many:many)
- See `data/objects/skill.json` for the full Object Guide data

### Resource
- **Definition**: A digital content item (book, article, video, interactive) used for instruction or independent learning.
- **Key Attributes**: Title, type (book/article/video/interactive), subject, reading level, lexile, format, status
- **Key Relationships**: Used in Assignment (many:many), consumed by Student (many:many), targets Skill (many:many)
- See `data/objects/resource.json` for the full Object Guide data

### Score
- **Definition**: A recorded result from an assessment, representing a student's measured performance.
- **Key Attributes**: Value, scale type (scaled score, percentile, grade equivalent), date, benchmark status (at/above/below), growth measure
- **Key Relationships**: Belongs to Student (many:1), produced by Assessment (many:1), measures Skill (many:many)
- **System-generated**: Scores are created by the system, not by users directly.
- See `data/objects/score.json` for the full Object Guide data

### Standard
- **Definition**: A grade-level learning standard from a customer's standard set (e.g., Common Core, state standards) that defines what students should know and be able to do.
- **Key Attributes**: Standard code, title, domain, grade level, description, standard set, parent standard
- **Key Relationships**: Contains Skill (1:many), measured by Assessment (many:many), column axis of Skills Grid, has Proficiency Predictions per Student
- **Introduced by**: Student Proficiency (Skills Grid) project
- See `data/objects/standard.json` for the full Object Guide data

### Proficiency Prediction
- **Definition**: An SPS-generated prediction of how proficient a specific student is on a specific skill, categorized into instructional groups (Enrichment, Instructional, Approaching).
- **Key Attributes**: Prediction value (percentage), instructional group (enum), confidence level, prediction type (has_star/practice_only), student reference, skill reference
- **Key Relationships**: Belongs to Student (many:1), belongs to Skill (many:1), derived from Score (many:many), displayed in Skills Grid cells
- **System-generated**: Produced by the Student Proficiency Service (SPS), not by users.
- See `data/objects/proficiency-prediction.json` for the full Object Guide data

### Insight
- **Definition**: An AI-generated, data-grounded recommendation that transforms Skills Grid proficiency data into specific, actionable instructional suggestions for teachers.
- **Key Attributes**: Insight type (classwide_learning_need/student_grouping_suggestion), title, body, referenced students, referenced standard, feedback status, session ID
- **Key Relationships**: References Student (many:many), references Standard (many:1), scoped to Class (many:1), derived from Proficiency Prediction data
- **V1 scope**: Introduced in Skills Grid V1 (Q2 2026). 3-5 per session, supports teacher feedback.
- See `data/objects/insight.json` for the full Object Guide data

## Cross-Object Artifacts

The compiled Nested-Object Matrix (NOM) and CTA Matrix for all objects are available in `data/objects/`. Read each object's JSON file for its relationships and CTAs.

## Common Gotchas

- **Assessment vs. Assignment**: Assessments measure learning; assignments provide practice. They have different lifecycles and CTAs.
- **Student as shapeshifter**: A Student looks very different in Star (test scores, benchmarks) vs. myON (reading history, bookshelf) vs. Freckle (practice stats, adaptive levels).
- **Class as hub**: Most cross-object views are scoped to a Class. If you're designing a feature, check if it should be Class-scoped.
- **Score is read-only**: Users cannot directly create or edit Scores — they are system-generated outputs of Assessments.
