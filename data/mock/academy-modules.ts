import type { MockEducatorAcademyModule } from './types';

export const academyModules: MockEducatorAcademyModule[] = [
  {
    id: 'eam-1', slug: 'getting-started-star', title: 'Getting Started with Star Assessments',
    featureArea: 'Star Assessments', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 30, completionCriteria: 'Complete all sections and pass quiz (80%)',
    status: 'Available', badge: 'Star Fundamentals',
    description: 'Learn the basics of Star Reading and Star Math — how adaptive assessments work, what scores mean, and how to use results to guide instruction.',
  },
  {
    id: 'eam-2', slug: 'interpreting-star-data', title: 'Interpreting Star Data',
    featureArea: 'Star Assessments', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 45, completionCriteria: 'Complete all sections and pass quiz (80%)',
    status: 'Available', badge: 'Data-Driven Instruction',
    description: 'Dive deeper into Star scores: scaled scores, percentile ranks, grade equivalents, growth percentiles, and proficiency bands. Learn to read the Screening and Growth reports.',
  },
  {
    id: 'eam-3', slug: 'freckle-adaptive-practice', title: 'Freckle Adaptive Practice',
    featureArea: 'Freckle', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 25, completionCriteria: 'Complete walkthrough and create one assignment',
    status: 'Available', badge: 'Freckle Foundations',
    description: 'Set up Freckle for your classroom: create adaptive practice assignments in ELA and Math, monitor student progress, and use the teacher dashboard.',
  },
  {
    id: 'eam-4', slug: 'nearpod-interactive-lessons', title: 'Nearpod Interactive Lessons',
    featureArea: 'Nearpod', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 40, completionCriteria: 'Create and deliver one lesson',
    status: 'Available', badge: 'Nearpod Navigator',
    description: 'Build and deliver interactive lessons with Nearpod — add activities, polls, quizzes, and collaborative boards. Review the post-session report to assess understanding.',
  },
  {
    id: 'eam-5', slug: 'ar-reading-practice', title: 'Accelerated Reader Best Practices',
    featureArea: 'AR', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 35, completionCriteria: 'Complete all sections',
    status: 'Available', badge: 'AR Champion',
    description: 'Maximize independent reading with Accelerated Reader — set reading goals, manage quiz taking, and use the TOPS report to monitor reading growth.',
  },
  {
    id: 'eam-6', slug: 'data-driven-grouping', title: 'Data-Driven Grouping Strategies',
    featureArea: 'Insights & Groups', targetRole: 'Teacher', format: 'Self-Paced',
    duration: 30, completionCriteria: 'Create one student group based on data',
    status: 'Available', badge: 'Differentiation Pro',
    description: 'Use Star data and AI-powered insights to form small groups for targeted instruction. Learn when to regroup and how to track group progress.',
  },
  {
    id: 'eam-7', slug: 'school-admin-dashboard', title: 'School Admin Dashboard',
    featureArea: 'Administration', targetRole: 'School Admin', format: 'Self-Paced',
    duration: 20, completionCriteria: 'Complete all sections',
    status: 'Available', badge: 'Admin Essentials',
    description: 'Navigate the school admin view: monitor teacher usage, review school-wide assessment results, and manage product assignments.',
  },
  {
    id: 'eam-8', slug: 'district-reporting', title: 'District-Level Reporting',
    featureArea: 'Administration', targetRole: 'District Admin', format: 'Self-Paced',
    duration: 45, completionCriteria: 'Complete all sections and generate one report',
    status: 'Available', badge: 'District Leader',
    description: 'Access district-wide data: compare school performance, track assessment completion, review product utilization, and export data for state reporting.',
  },
];
