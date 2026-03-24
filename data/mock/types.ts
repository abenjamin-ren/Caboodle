interface NestedObjectRef {
  label: string;
  count: number;
  href?: string;
}

export interface MockStudent {
  id: string;
  slug: string;
  classIds: string[];
  schoolId: string;
  learningPathIds: string[];
  name: string;
  initials: string;
  grade: string;
  school: string;
  readingLevel: string;
  readingStatus: string;
  readingPercent: number;
  mathLevel: string;
  mathStatus: string;
  mathPercent: number;
  classCount: number;
  scoreCount: number;
  assignmentCount: number;
  assessmentCount: number;
  skillCount: number;
  enrollmentStatus: string;
  studentId: string;
  username: string;
  language: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockTeacher {
  id: string;
  slug: string;
  classIds: string[];
  schoolIds: string[];
  name: string;
  initials: string;
  role: string;
  subject: string;
  gradeBand: string;
  school: string;
  classCount: number;
  studentCount: number;
  email: string;
  employeeId: string;
  phone?: string;
  productAccess: string;
  username: string;
  language: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockClass {
  id: string;
  slug: string;
  teacherId: string;
  schoolId: string;
  studentIds: string[];
  assignmentIds: string[];
  assessmentIds: string[];
  studentGroupIds: string[];
  name: string;
  teacher: string;
  grade: string;
  subject: string;
  studentCount: number;
  assignmentCount: number;
  school: string;
  schoolYear: string;
  period: string;
  status: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockSchool {
  id: string;
  slug: string;
  districtId: string;
  teacherIds: string[];
  classIds: string[];
  name: string;
  gradeSpan: string;
  studentCount: number;
  teacherCount: number;
  classCount: number;
  district: string;
  address: string;
  ncesId: string;
  stateSchoolId: string;
  productLicenses: string;
  phone: string;
  timeZone: string;
  schoolType: string;
  status: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockDistrict {
  id: string;
  slug: string;
  schoolIds: string[];
  name: string;
  state: string;
  schoolCount: number;
  studentCount: number;
  productLicenses: string;
  address: string;
  ncesId: string;
  phone: string;
  timeZone: string;
  districtType: string;
  status: string;
  contractPeriod: string;
  sisConfig: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockAssessment {
  id: string;
  slug: string;
  classIds: string[];
  skillIds: string[];
  name: string;
  type: string;
  subject: string;
  gradeRange: string;
  status: string;
  completionPercent: number;
  studentCount: number;
  scoreAvg?: string;
  testingWindow: string;
  duration: number;
  itemCount: number;
  scoringMethod: string;
  createdBy: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockAssignment {
  id: string;
  slug: string;
  classId: string;
  teacherId: string;
  resourceIds: string[];
  skillIds: string[];
  name: string;
  subject: string;
  skillCount: number;
  dueDate: string;
  status: string;
  completionPercent: number;
  studentCount: number;
  product: string;
  type: string;
  createdBy: string;
  href?: string;
}

export interface MockScore {
  id: string;
  studentId: string;
  assessmentId?: string;
  assignmentId?: string;
  value: number;
  scoreType: string;
  proficiencyBand: string;
  studentName: string;
  assessmentName: string;
  date: string;
  growth?: number;
  percentile?: number;
  gradeEquivalent?: number;
  duration?: number;
  skillBreakdown?: Array<{ name: string; level: string; percent: number }>;
}

export interface MockSkill {
  id: string;
  slug: string;
  standardId: string;
  code: string;
  name: string;
  subject: string;
  gradeLevel: string;
  domain: string;
  framework: string;
}

export interface MockStandard {
  id: string;
  slug: string;
  skillIds: string[];
  standardId: string;
  name: string;
  domain: string;
  gradeLevel: string;
  subject: string;
  skillCount: number;
}

export interface MockResource {
  id: string;
  slug: string;
  skillIds: string[];
  title: string;
  type: string;
  subject: string;
  readingLevel: string;
  product: string;
  format: string;
  author: string;
  topic: string;
  skillCount: number;
  language: string;
  availability: string;
  href: string;
}

export interface MockInsight {
  id: string;
  classId: string;
  standardId: string;
  studentIds: string[];
  title: string;
  body: string;
  insightType: string;
  studentCount: number;
  standardName?: string;
  feedbackStatus: string;
  timestamp: string;
  referencedStudents?: Array<{ name: string; href: string }>;
  href: string;
}

export interface MockProficiencyPrediction {
  id: string;
  studentId: string;
  skillId: string;
  studentName: string;
  skillName: string;
  proficiency: number;
  predictedPctCorrect: number;
  instructionalGroup: string;
  predictionType: string;
  isPracticed: boolean;
  predictionModel: string;
  predictionTimestamp: string;
}

export interface MockStudentGroup {
  id: string;
  slug: string;
  classId: string;
  studentIds: string[];
  insightId?: string;
  name: string;
  className: string;
  studentCount: number;
  groupingCriteria: string;
  source: string;
  associatedSkill?: string;
  status: string;
  teacherName: string;
}

export interface MockLearningPath {
  id: string;
  studentId: string;
  assignmentIds: string[];
  skillIds: string[];
  studentName: string;
  name: string;
  subject: string;
  focusSkills: string[];
  currentLevel: string;
  targetLevel: string;
  progress: number;
  status: string;
  estimatedRemaining: string;
  activityCount: number;
}

export interface MockActivityEvent {
  id: string;
  studentId: string;
  classId: string;
  assignmentId?: string;
  assessmentId?: string;
  activityLabel: string;
  activityType: string;
  sourceProduct: string;
  subject: string;
  studentName: string;
  startedAt: string;
  completedAt?: string;
  scoreSummary?: string;
  href?: string;
}

export interface MockActivity {
  id: string;
  lessonId: string;
  title: string;
  activityType: string;
  scoringMethod: string;
  pointValue: number;
  responseCount: number;
  averageScore: number;
  questionPrompt?: string;
  position: number;
}

export interface MockLesson {
  id: string;
  slug: string;
  activityIds: string[];
  skillIds: string[];
  title: string;
  subject: string;
  gradeBand: string;
  lessonType: string;
  slideCount: number;
  duration: number;
  source: string;
  status: string;
  usageCount: number;
  averageScore?: number;
  author: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockLiveSession {
  id: string;
  lessonId: string;
  classId: string;
  teacherId: string;
  reportId?: string;
  joinCode: string;
  sessionStatus: string;
  startTime: string;
  endTime: string;
  participantCount: number;
  lessonTitle: string;
  teacherName: string;
  className: string;
  participationRate: number;
  duration: number;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockReport {
  id: string;
  lessonId?: string;
  liveSessionId?: string;
  classId: string;
  reportType: string;
  lessonTitle?: string;
  className: string;
  generatedDate: string;
  studentCount: number;
  participationRate?: number;
  averageScore?: number;
  status: string;
  activityCount?: number;
  nestedObjects?: NestedObjectRef[];
  href?: string;
}

export interface MockSolution {
  id: string;
  slug: string;
  productIds: string[];
  name: string;
  productCount: number;
  status: string;
  nestedObjects: NestedObjectRef[];
  href: string;
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  tier: string;
  availability: string;
  subject: string;
  productType: string;
  solutionNames: string[];
  href: string;
}

export interface MockProductAssignment {
  id: string;
  solutionId?: string;
  productId?: string;
  schoolId: string;
  scopeLevel: string;
  scopeValue: string;
  solutionName: string;
  productName: string;
  state: string;
  createdBy: string;
  createdAt: string;
  effectiveDate: string;
  schoolName: string;
  href: string;
}

export interface MockOnboardingChecklist {
  id: string;
  teacherId: string;
  stepIds: string[];
  roleVariant: string;
  progress: number;
  status: string;
  stepCount: number;
  userName: string;
  daysSinceStart: number;
  completedSteps: number;
}

export interface MockOnboardingStep {
  id: string;
  checklistId: string;
  moduleId?: string;
  title: string;
  description: string;
  order: number;
  status: string;
  targetObject: string;
  targetCTA: string;
  completionMethod: string;
  icon: string;
}

export interface MockEducatorAcademyModule {
  id: string;
  slug: string;
  title: string;
  featureArea: string;
  targetRole: string;
  format: string;
  duration: number;
  completionCriteria: string;
  status: string;
  badge: string;
  description: string;
}
