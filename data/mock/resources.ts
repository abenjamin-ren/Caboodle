import type { MockResource } from './types';

export const resources: MockResource[] = [
  { id: 'res-1', slug: 'context-clues-detective', title: 'Context Clues Detective', type: 'Interactive', subject: 'ELA', readingLevel: '3.0-3.5', product: 'Freckle', format: 'Practice Set', author: 'Renaissance', topic: 'Vocabulary', skillCount: 2, language: 'English', availability: 'Licensed', skillIds: ['sk-l3-2', 'sk-ri3-2'], href: '/prototype/resources' },
  { id: 'res-2', slug: 'finding-main-idea', title: 'Finding the Main Idea', type: 'Article', subject: 'ELA', readingLevel: '2.8-3.2', product: 'myON', format: 'Article', author: 'Capstone Press', topic: 'Comprehension', skillCount: 2, language: 'English', availability: 'Licensed', skillIds: ['sk-ri3-1', 'sk-ri3-3'], href: '/prototype/resources' },
  { id: 'res-3', slug: 'charlottes-web', title: 'Charlotte\'s Web', type: 'Book', subject: 'ELA', readingLevel: '4.4', product: 'AR', format: 'Digital Book', author: 'E.B. White', topic: 'Fiction', skillCount: 3, language: 'English', availability: 'Free', skillIds: ['sk-rl3-1', 'sk-rl3-4'], href: '/prototype/resources' },
  { id: 'res-4', slug: 'magic-tree-house-1', title: 'Magic Tree House #1: Dinosaurs Before Dark', type: 'Book', subject: 'ELA', readingLevel: '3.5', product: 'AR', format: 'Digital Book', author: 'Mary Pope Osborne', topic: 'Fiction', skillCount: 2, language: 'English', availability: 'Free', skillIds: ['sk-rl3-1', 'sk-rf3-2'], href: '/prototype/resources' },
  { id: 'res-5', slug: 'opinion-writing-workshop', title: 'Opinion Writing Workshop', type: 'Lesson', subject: 'ELA', readingLevel: '3.0', product: 'Nearpod', format: 'Interactive Lesson', author: 'Nearpod', topic: 'Writing', skillCount: 1, language: 'English', availability: 'Licensed', skillIds: ['sk-w3-1'], href: '/prototype/resources' },
  { id: 'res-6', slug: 'vocabulary-builders-3', title: 'Vocabulary Builders: Grade 3', type: 'Practice Set', subject: 'ELA', readingLevel: '3.0-3.5', product: 'Freckle', format: 'Adaptive Practice', author: 'Renaissance', topic: 'Vocabulary', skillCount: 1, language: 'English', availability: 'Licensed', skillIds: ['sk-l3-2'], href: '/prototype/resources' },
  { id: 'res-7', slug: 'fraction-fundamentals', title: 'Fraction Fundamentals', type: 'Interactive', subject: 'Math', readingLevel: '3.0', product: 'Freckle', format: 'Practice Set', author: 'Renaissance', topic: 'Fractions', skillCount: 2, language: 'English', availability: 'Licensed', skillIds: ['sk-nf3-1', 'sk-nf3-2'], href: '/prototype/resources' },
  { id: 'res-8', slug: 'measuring-area', title: 'Measuring Area with Unit Squares', type: 'Lesson', subject: 'Math', readingLevel: '3.0', product: 'Nearpod', format: 'Interactive Lesson', author: 'Nearpod', topic: 'Measurement', skillCount: 1, language: 'English', availability: 'Licensed', skillIds: ['sk-md3-2'], href: '/prototype/resources' },
  // Additional resources
  ...Array.from({ length: 42 }, (_, i) => {
    const subjects = ['ELA', 'Math', 'ELA', 'Math', 'ELA'];
    const types = ['Book', 'Practice Set', 'Interactive', 'Article', 'Video'];
    const products = ['AR', 'Freckle', 'Nearpod', 'myON', 'Lalilo'];
    const topics = ['Comprehension', 'Vocabulary', 'Multiplication', 'Fractions', 'Writing', 'Phonics', 'Geometry', 'Data', 'Grammar', 'Fluency'];
    return {
      id: `res-${9 + i}`,
      slug: `resource-${9 + i}`,
      title: `${topics[i % topics.length]} ${types[i % types.length]} ${i + 1}`,
      type: types[i % types.length],
      subject: subjects[i % subjects.length],
      readingLevel: `${2 + Math.floor(i / 10)}.${(i % 10)}`,
      product: products[i % products.length],
      format: types[i % types.length],
      author: 'Renaissance',
      topic: topics[i % topics.length],
      skillCount: 1 + (i % 3),
      language: 'English',
      availability: i % 4 === 0 ? 'Free' : 'Licensed',
      skillIds: [] as string[],
      href: '/prototype/resources',
    };
  }),
];
