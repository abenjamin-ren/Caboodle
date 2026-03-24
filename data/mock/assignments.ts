import type { MockAssignment } from './types';

export const assignments: MockAssignment[] = [
  // Class 3-A (ELA) — Maria Rodriguez
  { id: 'asgn-1', slug: 'vocabulary-context-clues', name: 'Vocabulary: Context Clues', subject: 'ELA', skillCount: 2, dueDate: '2026-02-28', status: 'Completed', completionPercent: 100, studentCount: 24, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: ['res-1'], skillIds: ['sk-l3-2', 'sk-ri3-2'], href: '/prototype/classes/class-3a' },
  { id: 'asgn-2', slug: 'main-idea-nonfiction', name: 'Main Idea in Nonfiction', subject: 'ELA', skillCount: 2, dueDate: '2026-03-07', status: 'Completed', completionPercent: 100, studentCount: 24, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: ['res-2'], skillIds: ['sk-ri3-1', 'sk-ri3-3'], href: '/prototype/classes/class-3a' },
  { id: 'asgn-3', slug: 'reading-log-march', name: 'Reading Log — March', subject: 'ELA', skillCount: 3, dueDate: '2026-03-31', status: 'In Progress', completionPercent: 58, studentCount: 24, product: 'AR', type: 'Reading', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: ['res-3', 'res-4'], skillIds: ['sk-rl3-1', 'sk-rl3-4', 'sk-rf3-2'], href: '/prototype/classes/class-3a' },
  { id: 'asgn-4', slug: 'opinion-writing-draft', name: 'Opinion Writing Draft', subject: 'ELA', skillCount: 1, dueDate: '2026-03-14', status: 'In Progress', completionPercent: 42, studentCount: 24, product: 'Nearpod', type: 'Project', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: ['res-5'], skillIds: ['sk-w3-1'], href: '/prototype/classes/class-3a' },
  { id: 'asgn-5', slug: 'phonics-review-week-12', name: 'Phonics Review — Week 12', subject: 'ELA', skillCount: 2, dueDate: '2026-03-10', status: 'Overdue', completionPercent: 71, studentCount: 24, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: [], skillIds: ['sk-rf3-1', 'sk-rf3-3'], href: '/prototype/classes/class-3a' },
  { id: 'asgn-6', slug: 'vocabulary-gap-practice', name: 'Vocabulary Gap Practice', subject: 'ELA', skillCount: 1, dueDate: '2026-03-21', status: 'Assigned', completionPercent: 0, studentCount: 4, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3a', teacherId: 'tch-rodriguez', resourceIds: ['res-6'], skillIds: ['sk-l3-2'], href: '/prototype/classes/class-3a' },

  // Class 3-B (Math) — Maria Rodriguez
  { id: 'asgn-7', slug: 'multiplication-facts', name: 'Multiplication Facts 0-9', subject: 'Math', skillCount: 2, dueDate: '2026-03-07', status: 'Completed', completionPercent: 100, studentCount: 22, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3b', teacherId: 'tch-rodriguez', resourceIds: [], skillIds: ['sk-oa3-1', 'sk-oa3-2'], href: '/prototype/classes/class-3b' },
  { id: 'asgn-8', slug: 'fractions-intro', name: 'Introduction to Fractions', subject: 'Math', skillCount: 2, dueDate: '2026-03-14', status: 'In Progress', completionPercent: 64, studentCount: 22, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3b', teacherId: 'tch-rodriguez', resourceIds: ['res-7'], skillIds: ['sk-nf3-1', 'sk-nf3-2'], href: '/prototype/classes/class-3b' },
  { id: 'asgn-9', slug: 'word-problems-week-12', name: 'Word Problems — Week 12', subject: 'Math', skillCount: 1, dueDate: '2026-03-21', status: 'Assigned', completionPercent: 0, studentCount: 22, product: 'Freckle', type: 'Practice', createdBy: 'Maria Rodriguez', classId: 'cls-3b', teacherId: 'tch-rodriguez', resourceIds: [], skillIds: ['sk-oa3-3'], href: '/prototype/classes/class-3b' },
  { id: 'asgn-10', slug: 'area-measurement', name: 'Area Measurement Activity', subject: 'Math', skillCount: 1, dueDate: '2026-03-28', status: 'Assigned', completionPercent: 0, studentCount: 22, product: 'Nearpod', type: 'Activity', createdBy: 'Maria Rodriguez', classId: 'cls-3b', teacherId: 'tch-rodriguez', resourceIds: ['res-8'], skillIds: ['sk-md3-2'], href: '/prototype/classes/class-3b' },

  // Class 4-A (ELA) — James Chen
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `asgn-${11 + i}`, slug: `grade4-ela-${i + 1}`, name: `Grade 4 ELA Practice ${i + 1}`, subject: 'ELA', skillCount: 2, dueDate: `2026-03-${String(7 + i * 7).padStart(2, '0')}`, status: i < 2 ? 'Completed' : i < 4 ? 'In Progress' : 'Assigned' as string, completionPercent: i < 2 ? 100 : i < 4 ? 50 : 0, studentCount: 26, product: 'Freckle', type: 'Practice', createdBy: 'James Chen', classId: 'cls-4a', teacherId: 'tch-chen', resourceIds: [] as string[], skillIds: [] as string[],
  })),

  // Class 4-B (Math) — James Chen
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `asgn-${16 + i}`, slug: `grade4-math-${i + 1}`, name: `Grade 4 Math Practice ${i + 1}`, subject: 'Math', skillCount: 2, dueDate: `2026-03-${String(7 + i * 7).padStart(2, '0')}`, status: i < 2 ? 'Completed' : 'In Progress' as string, completionPercent: i < 2 ? 100 : 40, studentCount: 26, product: 'Freckle', type: 'Practice', createdBy: 'James Chen', classId: 'cls-4b', teacherId: 'tch-chen', resourceIds: [] as string[], skillIds: [] as string[],
  })),

  // Class 6-A (ELA) — David Okafor
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `asgn-${20 + i}`, slug: `grade6-ela-${i + 1}`, name: `Grade 6 ELA Assignment ${i + 1}`, subject: 'ELA', skillCount: 2, dueDate: `2026-03-${String(7 + i * 7).padStart(2, '0')}`, status: i < 1 ? 'Completed' : i < 3 ? 'In Progress' : 'Assigned' as string, completionPercent: i < 1 ? 100 : i < 3 ? 55 : 0, studentCount: 28, product: 'Freckle', type: 'Practice', createdBy: 'David Okafor', classId: 'cls-6a', teacherId: 'tch-okafor', resourceIds: [] as string[], skillIds: [] as string[],
  })),

  // Class 6-B (Science) — David Okafor
  ...Array.from({ length: 3 }, (_, i) => ({
    id: `asgn-${24 + i}`, slug: `grade6-science-${i + 1}`, name: `Grade 6 Science Lab ${i + 1}`, subject: 'Science', skillCount: 1, dueDate: `2026-03-${String(14 + i * 7).padStart(2, '0')}`, status: i < 1 ? 'Completed' : 'In Progress' as string, completionPercent: i < 1 ? 100 : 30, studentCount: 28, product: 'Nearpod', type: 'Activity', createdBy: 'David Okafor', classId: 'cls-6b', teacherId: 'tch-okafor', resourceIds: [] as string[], skillIds: [] as string[],
  })),

  // Class 9-A / 9-B — Michael Torres
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `asgn-${27 + i}`, slug: `grade9-${i < 3 ? 'ela' : 'math'}-${(i % 3) + 1}`, name: `Grade 9 ${i < 3 ? 'ELA' : 'Math'} Assignment ${(i % 3) + 1}`, subject: i < 3 ? 'ELA' : 'Math', skillCount: 2, dueDate: `2026-03-${String(7 + i * 7).padStart(2, '0')}`, status: i < 1 ? 'Completed' : 'In Progress' as string, completionPercent: i < 1 ? 100 : 35, studentCount: 30, product: 'Freckle', type: 'Practice', createdBy: 'Michael Torres', classId: i < 3 ? 'cls-9a' : 'cls-9b', teacherId: 'tch-torres', resourceIds: [] as string[], skillIds: [] as string[],
  })),
];
