import type { MockActivity } from './types';

export const activities: MockActivity[] = [
  // Opinion Writing Workshop (lsn-1)
  { id: 'act-1', title: 'Warm-Up: What\'s Your Opinion?', activityType: 'Open-Ended', scoringMethod: 'Manual', pointValue: 10, responseCount: 24, averageScore: 8, questionPrompt: 'What is the best season and why?', position: 1, lessonId: 'lsn-1' },
  { id: 'act-2', title: 'Opinion vs. Fact Sort', activityType: 'Matching', scoringMethod: 'Auto', pointValue: 20, responseCount: 24, averageScore: 16, position: 2, lessonId: 'lsn-1' },
  { id: 'act-3', title: 'Write Your Opinion Paragraph', activityType: 'Open-Ended', scoringMethod: 'Manual', pointValue: 30, responseCount: 22, averageScore: 22, position: 3, lessonId: 'lsn-1' },

  // Main Idea Detective (lsn-2)
  { id: 'act-4', title: 'Find the Main Idea', activityType: 'Multiple Choice', scoringMethod: 'Auto', pointValue: 10, responseCount: 24, averageScore: 7, position: 1, lessonId: 'lsn-2' },
  { id: 'act-5', title: 'Supporting Details Web', activityType: 'Draw It', scoringMethod: 'Manual', pointValue: 15, responseCount: 24, averageScore: 11, position: 2, lessonId: 'lsn-2' },
  { id: 'act-6', title: 'Main Idea Exit Ticket', activityType: 'Multiple Choice', scoringMethod: 'Auto', pointValue: 10, responseCount: 23, averageScore: 7, position: 3, lessonId: 'lsn-2' },

  // Fractions Pizza Party (lsn-3)
  { id: 'act-7', title: 'Pizza Fraction Intro', activityType: 'Interactive', scoringMethod: 'Auto', pointValue: 10, responseCount: 22, averageScore: 7, position: 1, lessonId: 'lsn-3' },
  { id: 'act-8', title: 'Name That Fraction', activityType: 'Fill-in', scoringMethod: 'Auto', pointValue: 15, responseCount: 22, averageScore: 10, position: 2, lessonId: 'lsn-3' },
  { id: 'act-9', title: 'Fraction Comparison Challenge', activityType: 'Multiple Choice', scoringMethod: 'Auto', pointValue: 20, responseCount: 22, averageScore: 12, position: 3, lessonId: 'lsn-3' },

  // Measuring Our World (lsn-4)
  { id: 'act-10', title: 'Estimate Areas', activityType: 'Interactive', scoringMethod: 'Auto', pointValue: 15, responseCount: 22, averageScore: 11, position: 1, lessonId: 'lsn-4' },
  { id: 'act-11', title: 'Area Word Problems', activityType: 'Open-Ended', scoringMethod: 'Manual', pointValue: 20, responseCount: 22, averageScore: 14, position: 2, lessonId: 'lsn-4' },

  // Vocabulary in Context (lsn-5)
  { id: 'act-12', title: 'Context Clue Warm-Up', activityType: 'Multiple Choice', scoringMethod: 'Auto', pointValue: 10, responseCount: 24, averageScore: 7, position: 1, lessonId: 'lsn-5' },
  { id: 'act-13', title: 'Word Meaning Match', activityType: 'Matching', scoringMethod: 'Auto', pointValue: 15, responseCount: 24, averageScore: 10, position: 2, lessonId: 'lsn-5' },
  { id: 'act-14', title: 'Use It in a Sentence', activityType: 'Open-Ended', scoringMethod: 'Manual', pointValue: 20, responseCount: 23, averageScore: 14, position: 3, lessonId: 'lsn-5' },

  // Generated activities for lessons 6-10
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `act-${15 + i}`,
    title: `Activity ${(i % 3) + 1}`,
    activityType: ['Multiple Choice', 'Open-Ended', 'Interactive'][i % 3],
    scoringMethod: i % 3 === 1 ? 'Manual' : 'Auto',
    pointValue: 10 + (i % 3) * 5,
    responseCount: 20 + Math.floor(Math.random() * 8),
    averageScore: 8 + Math.floor(Math.random() * 8),
    position: (i % 3) + 1,
    lessonId: `lsn-${6 + Math.floor(i / 3)}`,
  })),
];
