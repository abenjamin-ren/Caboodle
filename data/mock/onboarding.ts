import type { MockOnboardingChecklist, MockOnboardingStep } from './types';

export const onboardingChecklists: MockOnboardingChecklist[] = [
  {
    id: 'obc-rodriguez',
    roleVariant: 'teacher',
    progress: 80,
    status: 'In Progress',
    stepCount: 7,
    userName: 'Maria Rodriguez',
    daysSinceStart: 180,
    completedSteps: 5,
    teacherId: 'tch-rodriguez',
    stepIds: ['obs-1', 'obs-2', 'obs-3', 'obs-4', 'obs-5', 'obs-6', 'obs-7'],
  },
  {
    id: 'obc-chen',
    roleVariant: 'teacher',
    progress: 57,
    status: 'In Progress',
    stepCount: 7,
    userName: 'James Chen',
    daysSinceStart: 120,
    completedSteps: 4,
    teacherId: 'tch-chen',
    stepIds: ['obs-8', 'obs-9', 'obs-10', 'obs-11', 'obs-12', 'obs-13', 'obs-14'],
  },
  {
    id: 'obc-kim',
    roleVariant: 'school_admin',
    progress: 100,
    status: 'Completed',
    stepCount: 5,
    userName: 'Sarah Kim',
    daysSinceStart: 200,
    completedSteps: 5,
    teacherId: 'tch-kim',
    stepIds: ['obs-15', 'obs-16', 'obs-17', 'obs-18', 'obs-19'],
  },
  {
    id: 'obc-okafor',
    roleVariant: 'teacher',
    progress: 43,
    status: 'In Progress',
    stepCount: 7,
    userName: 'David Okafor',
    daysSinceStart: 90,
    completedSteps: 3,
    teacherId: 'tch-okafor',
    stepIds: ['obs-20', 'obs-21', 'obs-22', 'obs-23', 'obs-24', 'obs-25', 'obs-26'],
  },
  {
    id: 'obc-torres',
    roleVariant: 'teacher',
    progress: 29,
    status: 'In Progress',
    stepCount: 7,
    userName: 'Michael Torres',
    daysSinceStart: 60,
    completedSteps: 2,
    teacherId: 'tch-torres',
    stepIds: ['obs-27', 'obs-28', 'obs-29', 'obs-30', 'obs-31', 'obs-32', 'obs-33'],
  },
];

const TEACHER_STEPS = [
  { title: 'Complete your profile', description: 'Add your name, photo, and contact information.', targetObject: 'Teacher', targetCTA: 'Edit Profile', completionMethod: 'field_completion', icon: 'person', successMetric: 'All required fields filled' },
  { title: 'Set up your first class', description: 'Create a class and add students from your roster.', targetObject: 'Class', targetCTA: 'Create Class', completionMethod: 'object_creation', icon: 'group', successMetric: 'At least 1 class created' },
  { title: 'Run your first Star assessment', description: 'Schedule and administer a Star Reading or Star Math assessment.', targetObject: 'Assessment', targetCTA: 'Schedule Assessment', completionMethod: 'assessment_completed', icon: 'assessment', successMetric: 'At least 1 assessment completed' },
  { title: 'Review student scores', description: 'View the results from your first Star assessment.', targetObject: 'Score', targetCTA: 'View Scores', completionMethod: 'page_visit', icon: 'insights', successMetric: 'Visited score results page' },
  { title: 'Create an assignment', description: 'Assign a Freckle practice or AR reading goal to your class.', targetObject: 'Assignment', targetCTA: 'Create Assignment', completionMethod: 'object_creation', icon: 'assignment', successMetric: 'At least 1 assignment created' },
  { title: 'Explore insights', description: 'Check the Insights panel on your dashboard for AI-powered suggestions.', targetObject: 'Insight', targetCTA: 'View Insights', completionMethod: 'page_visit', icon: 'lightbulb', successMetric: 'Viewed at least 1 insight' },
  { title: 'Complete an Academy module', description: 'Finish at least one Educator Academy professional learning module.', targetObject: 'Educator Academy Module', targetCTA: 'Start Module', completionMethod: 'module_completed', icon: 'school', successMetric: 'At least 1 module completed' },
];

const ADMIN_STEPS = [
  { title: 'Review school roster', description: 'Verify teachers and students are synced from your SIS.', targetObject: 'School', targetCTA: 'View Roster', completionMethod: 'page_visit', icon: 'domain', successMetric: 'Visited school roster page' },
  { title: 'Configure product licenses', description: 'Assign Renaissance product licenses to your school.', targetObject: 'Product Assignment', targetCTA: 'Assign Products', completionMethod: 'object_creation', icon: 'key', successMetric: 'At least 1 product assigned' },
  { title: 'Set testing windows', description: 'Configure BOY, MOY, and EOY assessment windows.', targetObject: 'Assessment', targetCTA: 'Set Windows', completionMethod: 'configuration', icon: 'calendar_today', successMetric: 'Testing windows configured' },
  { title: 'Invite teachers', description: 'Send onboarding invitations to your teaching staff.', targetObject: 'Teacher', targetCTA: 'Invite', completionMethod: 'invitation_sent', icon: 'person_add', successMetric: 'At least 1 invitation sent' },
  { title: 'Review school reports', description: 'Check aggregate school-level performance data.', targetObject: 'Report', targetCTA: 'View Reports', completionMethod: 'page_visit', icon: 'bar_chart', successMetric: 'Visited reports page' },
];

function buildSteps(checklistId: string, startId: number, steps: typeof TEACHER_STEPS, completed: number): MockOnboardingStep[] {
  return steps.map((s, i) => ({
    id: `obs-${startId + i}`,
    title: s.title,
    description: s.description,
    order: i + 1,
    status: i < completed ? 'Completed' : i === completed ? 'In Progress' : 'Not Started',
    targetObject: s.targetObject,
    targetCTA: s.targetCTA,
    completionMethod: s.completionMethod,
    icon: s.icon,
    checklistId,
  }));
}

export const onboardingSteps: MockOnboardingStep[] = [
  ...buildSteps('obc-rodriguez', 1, TEACHER_STEPS, 5),
  ...buildSteps('obc-chen', 8, TEACHER_STEPS, 4),
  ...buildSteps('obc-kim', 15, ADMIN_STEPS, 5),
  ...buildSteps('obc-okafor', 20, TEACHER_STEPS, 3),
  ...buildSteps('obc-torres', 27, TEACHER_STEPS, 2),
];
