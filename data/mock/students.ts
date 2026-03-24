import type { MockStudent } from './types';

const FIRST_NAMES = [
  'Olivia', 'Ethan', 'Maya', 'Noah', 'Ava', 'Liam', 'Zoe', 'Kai',
  'Luna', 'Owen', 'Iris', 'Finn', 'Nadia', 'Henry', 'Clara', 'Diego',
  'Ruby', 'Sam', 'Aria', 'Caleb', 'Mia', 'Jasper', 'Chloe', 'Rowan',
  'Ella', 'Theo', 'Harper', 'Miles', 'Willow', 'Blake',
];

const LAST_NAMES = [
  'Anderson', 'Kim', 'Brown', 'Davis', 'Garcia', 'Martinez', 'Lee',
  'Taylor', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis',
  'Young', 'Walker', 'Hall', 'Allen', 'King', 'Wright', 'Scott',
  'Green', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez',
  'Roberts', 'Turner',
];

function bandForReading(level: number): string {
  if (level >= 489) return 'At/Above';
  if (level >= 440) return 'On Watch';
  if (level >= 394) return 'Intervention';
  return 'Urgent';
}

function bandForMath(level: number): string {
  if (level >= 486) return 'At/Above';
  if (level >= 436) return 'On Watch';
  if (level >= 390) return 'Intervention';
  return 'Urgent';
}

function percentFor(level: number, max: number): number {
  return Math.min(100, Math.round((level / max) * 100));
}

export const highlightedStudents: MockStudent[] = [
  {
    id: 'stu-amara',
    slug: 'amara-johnson',
    name: 'Amara Johnson',
    initials: 'AJ',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '520',
    readingStatus: 'At/Above',
    readingPercent: 87,
    mathLevel: '480',
    mathStatus: 'On Watch',
    mathPercent: 72,
    classCount: 2,
    scoreCount: 8,
    assignmentCount: 5,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30001',
    username: 'ajohnson3',
    language: 'English',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: [],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 8 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/amara-johnson',
  },
  {
    id: 'stu-leo',
    slug: 'leo-vasquez',
    name: 'Leo Vasquez',
    initials: 'LV',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '380',
    readingStatus: 'Urgent',
    readingPercent: 42,
    mathLevel: '510',
    mathStatus: 'At/Above',
    mathPercent: 85,
    classCount: 2,
    scoreCount: 7,
    assignmentCount: 6,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30002',
    username: 'lvasquez3',
    language: 'English, Spanish',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: ['lp-leo-ela'],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 7 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/leo-vasquez',
  },
  {
    id: 'stu-priya',
    slug: 'priya-patel',
    name: 'Priya Patel',
    initials: 'PP',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '450',
    readingStatus: 'On Watch',
    readingPercent: 65,
    mathLevel: '460',
    mathStatus: 'On Watch',
    mathPercent: 68,
    classCount: 2,
    scoreCount: 6,
    assignmentCount: 4,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30003',
    username: 'ppatel3',
    language: 'English',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: ['lp-priya-ela'],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 6 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/priya-patel',
  },
  {
    id: 'stu-marcus',
    slug: 'marcus-williams',
    name: 'Marcus Williams',
    initials: 'MW',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '490',
    readingStatus: 'At/Above',
    readingPercent: 82,
    mathLevel: '495',
    mathStatus: 'At/Above',
    mathPercent: 83,
    classCount: 2,
    scoreCount: 6,
    assignmentCount: 4,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30004',
    username: 'mwilliams3',
    language: 'English',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: [],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 6 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/marcus-williams',
  },
  {
    id: 'stu-sofia',
    slug: 'sofia-chen',
    name: 'Sofia Chen',
    initials: 'SC',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '400',
    readingStatus: 'Intervention',
    readingPercent: 48,
    mathLevel: '430',
    mathStatus: 'Intervention',
    mathPercent: 58,
    classCount: 2,
    scoreCount: 7,
    assignmentCount: 6,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30005',
    username: 'schen3',
    language: 'English, Mandarin',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: ['lp-sofia-ela', 'lp-sofia-math'],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 7 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/sofia-chen',
  },
  {
    id: 'stu-jayden',
    slug: 'jayden-brooks',
    name: 'Jayden Brooks',
    initials: 'JB',
    grade: '3',
    school: 'Lincoln Elementary School',
    readingLevel: '470',
    readingStatus: 'On Watch',
    readingPercent: 72,
    mathLevel: '520',
    mathStatus: 'At/Above',
    mathPercent: 87,
    classCount: 2,
    scoreCount: 6,
    assignmentCount: 4,
    assessmentCount: 5,
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: 'STU-30006',
    username: 'jbrooks3',
    language: 'English',
    schoolId: 'sch-lincoln',
    classIds: ['cls-3a', 'cls-3b'],
    learningPathIds: ['lp-jayden-ela'],
    nestedObjects: [
      { label: 'Classes', count: 2 },
      { label: 'Scores', count: 6 },
      { label: 'Skills', count: 20 },
    ],
    href: '/prototype/students/jayden-brooks',
  },
];

function generateStudent(
  id: string,
  firstName: string,
  lastName: string,
  grade: string,
  school: string,
  schoolId: string,
  classIds: string[],
): MockStudent {
  const rBase = 350 + Math.floor(Math.random() * 200);
  const mBase = 350 + Math.floor(Math.random() * 200);
  const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  return {
    id,
    slug,
    name: `${firstName} ${lastName}`,
    initials: `${firstName[0]}${lastName[0]}`,
    grade,
    school,
    readingLevel: String(rBase),
    readingStatus: bandForReading(rBase),
    readingPercent: percentFor(rBase, 600),
    mathLevel: String(mBase),
    mathStatus: bandForMath(mBase),
    mathPercent: percentFor(mBase, 600),
    classCount: classIds.length,
    scoreCount: 2 + Math.floor(Math.random() * 6),
    assignmentCount: 2 + Math.floor(Math.random() * 4),
    assessmentCount: 2 + Math.floor(Math.random() * 4),
    skillCount: 20,
    enrollmentStatus: 'Active',
    studentId: `STU-${id.replace('stu-', '').toUpperCase()}`,
    username: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}${grade}`,
    language: 'English',
    schoolId,
    classIds,
    learningPathIds: [],
    nestedObjects: [
      { label: 'Classes', count: classIds.length },
      { label: 'Scores', count: 2 + Math.floor(Math.random() * 6) },
    ],
    href: `/prototype/students/${slug}`,
  };
}

const class3aFill: MockStudent[] = [];
for (let i = 0; i < 18; i++) {
  const fn = FIRST_NAMES[i];
  const ln = LAST_NAMES[i];
  const id = `stu-${fn.toLowerCase()}`;
  class3aFill.push(generateStudent(
    id, fn, ln, '3', 'Lincoln Elementary School', 'sch-lincoln', ['cls-3a', 'cls-3b'],
  ));
}

const class4Students: MockStudent[] = [];
for (let i = 0; i < 26; i++) {
  const fn = FIRST_NAMES[i % FIRST_NAMES.length];
  const ln = LAST_NAMES[(i + 5) % LAST_NAMES.length];
  const id = `stu-4a-${i + 1}`;
  class4Students.push(generateStudent(
    id, fn, ln, '4', 'Lincoln Elementary School', 'sch-lincoln', ['cls-4a', 'cls-4b'],
  ));
}

const class6Students: MockStudent[] = [];
for (let i = 0; i < 28; i++) {
  const fn = FIRST_NAMES[i % FIRST_NAMES.length];
  const ln = LAST_NAMES[(i + 10) % LAST_NAMES.length];
  const id = `stu-6a-${i + 1}`;
  class6Students.push(generateStudent(
    id, fn, ln, '6', 'Washington Middle School', 'sch-washington', ['cls-6a', 'cls-6b'],
  ));
}

const class9Students: MockStudent[] = [];
for (let i = 0; i < 30; i++) {
  const fn = FIRST_NAMES[i % FIRST_NAMES.length];
  const ln = LAST_NAMES[(i + 15) % LAST_NAMES.length];
  const id = `stu-9a-${i + 1}`;
  class9Students.push(generateStudent(
    id, fn, ln, '9', 'Central High School', 'sch-central', ['cls-9a', 'cls-9b'],
  ));
}

export const students: MockStudent[] = [
  ...highlightedStudents,
  ...class3aFill,
  ...class4Students,
  ...class6Students,
  ...class9Students,
];
