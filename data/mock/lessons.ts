import type { MockLesson } from './types';

export const lessons: MockLesson[] = [
  {
    id: 'lsn-1', slug: 'opinion-writing-workshop', title: 'Opinion Writing Workshop', subject: 'ELA',
    gradeBand: 'Grade 3', lessonType: 'Interactive', slideCount: 24, duration: 45, source: 'Nearpod',
    status: 'Published', usageCount: 3, averageScore: 78, author: 'Maria Rodriguez',
    activityIds: ['act-1', 'act-2', 'act-3'], skillIds: ['sk-w3-1'],
    nestedObjects: [{ label: 'Activities', count: 3 }], href: '/prototype/resources',
  },
  {
    id: 'lsn-2', slug: 'main-idea-detective', title: 'Main Idea Detective', subject: 'ELA',
    gradeBand: 'Grade 3', lessonType: 'Interactive', slideCount: 18, duration: 35, source: 'Nearpod',
    status: 'Published', usageCount: 2, averageScore: 72, author: 'Maria Rodriguez',
    activityIds: ['act-4', 'act-5', 'act-6'], skillIds: ['sk-ri3-1', 'sk-ri3-3'],
    nestedObjects: [{ label: 'Activities', count: 3 }], href: '/prototype/resources',
  },
  {
    id: 'lsn-3', slug: 'fractions-pizza-party', title: 'Fractions Pizza Party', subject: 'Math',
    gradeBand: 'Grade 3', lessonType: 'Interactive', slideCount: 20, duration: 40, source: 'Nearpod',
    status: 'Published', usageCount: 1, averageScore: 68, author: 'Maria Rodriguez',
    activityIds: ['act-7', 'act-8', 'act-9'], skillIds: ['sk-nf3-1', 'sk-nf3-2'],
    nestedObjects: [{ label: 'Activities', count: 3 }], href: '/prototype/resources',
  },
  {
    id: 'lsn-4', slug: 'measuring-our-world', title: 'Measuring Our World', subject: 'Math',
    gradeBand: 'Grade 3', lessonType: 'Interactive', slideCount: 16, duration: 30, source: 'Nearpod',
    status: 'Published', usageCount: 2, averageScore: 75, author: 'Maria Rodriguez',
    activityIds: ['act-10', 'act-11'], skillIds: ['sk-md3-2'],
    nestedObjects: [{ label: 'Activities', count: 2 }], href: '/prototype/resources',
  },
  {
    id: 'lsn-5', slug: 'vocabulary-in-context', title: 'Vocabulary in Context', subject: 'ELA',
    gradeBand: 'Grade 3', lessonType: 'Interactive', slideCount: 22, duration: 35, source: 'Nearpod',
    status: 'Published', usageCount: 4, averageScore: 70, author: 'Maria Rodriguez',
    activityIds: ['act-12', 'act-13', 'act-14'], skillIds: ['sk-l3-2'],
    nestedObjects: [{ label: 'Activities', count: 3 }], href: '/prototype/resources',
  },
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `lsn-${6 + i}`, slug: `lesson-${6 + i}`,
    title: `${['Reading Strategies', 'Math Patterns', 'Writing Process', 'Data & Graphs', 'Grammar Fun'][i]}`,
    subject: i % 2 === 0 ? 'ELA' : 'Math', gradeBand: 'Grade 3', lessonType: 'Interactive',
    slideCount: 14 + i * 2, duration: 25 + i * 5, source: 'Nearpod',
    status: 'Published' as const, usageCount: 1, author: 'Nearpod Library',
    activityIds: [`act-${15 + i * 3}`, `act-${16 + i * 3}`, `act-${17 + i * 3}`],
    skillIds: [] as string[],
    nestedObjects: [{ label: 'Activities', count: 3 }], href: '/prototype/resources',
  })),
];
