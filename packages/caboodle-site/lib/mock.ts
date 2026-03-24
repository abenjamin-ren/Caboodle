import {
  district, schools, teachers, students, highlightedStudents, classes,
  assessments, assignments, scores, skills, standards, resources,
  insights, predictions, studentGroups, learningPaths, activityEvents,
  activities, lessons, liveSessions, reports, solutions, products,
  productAssignments, onboardingChecklists, onboardingSteps, academyModules,
} from '../../../data/mock';

import type {
  MockStudent, MockTeacher, MockClass, MockSchool, MockDistrict,
  MockAssessment, MockAssignment, MockScore, MockSkill, MockStandard,
  MockResource, MockInsight, MockProficiencyPrediction, MockStudentGroup,
  MockLearningPath, MockActivityEvent, MockActivity, MockLesson,
  MockLiveSession, MockReport, MockSolution, MockProduct,
  MockProductAssignment, MockOnboardingChecklist, MockOnboardingStep,
  MockEducatorAcademyModule,
} from '../../../data/mock/types';

// --- District & Schools ---

export function getDistrict(): MockDistrict {
  return district;
}

export function getAllSchools(): MockSchool[] {
  return schools;
}

export function getSchoolBySlug(slug: string): MockSchool | null {
  return schools.find(s => s.slug === slug) ?? null;
}

export function getSchoolById(id: string): MockSchool | null {
  return schools.find(s => s.id === id) ?? null;
}

// --- Teachers ---

export function getAllTeachers(): MockTeacher[] {
  return teachers;
}

export function getTeacherBySlug(slug: string): MockTeacher | null {
  return teachers.find(t => t.slug === slug) ?? null;
}

export function getTeacherById(id: string): MockTeacher | null {
  return teachers.find(t => t.id === id) ?? null;
}

export function getTeachersBySchoolId(schoolId: string): MockTeacher[] {
  return teachers.filter(t => t.schoolIds.includes(schoolId));
}

// --- Students ---

export function getAllStudents(): MockStudent[] {
  return students;
}

export function getHighlightedStudents(): MockStudent[] {
  return highlightedStudents;
}

export function getStudentBySlug(slug: string): MockStudent | null {
  return students.find(s => s.slug === slug) ?? null;
}

export function getStudentById(id: string): MockStudent | null {
  return students.find(s => s.id === id) ?? null;
}

export function getStudentsByClassId(classId: string): MockStudent[] {
  return students.filter(s => s.classIds.includes(classId));
}

export function getStudentsBySchoolId(schoolId: string): MockStudent[] {
  return students.filter(s => s.schoolId === schoolId);
}

// --- Classes ---

export function getAllClasses(): MockClass[] {
  return classes;
}

export function getClassBySlug(slug: string): MockClass | null {
  return classes.find(c => c.slug === slug) ?? null;
}

export function getClassById(id: string): MockClass | null {
  return classes.find(c => c.id === id) ?? null;
}

export function getClassesByTeacherId(teacherId: string): MockClass[] {
  return classes.filter(c => c.teacherId === teacherId);
}

export function getClassesBySchoolId(schoolId: string): MockClass[] {
  return classes.filter(c => c.schoolId === schoolId);
}

// --- Assessments ---

export function getAllAssessments(): MockAssessment[] {
  return assessments;
}

export function getAssessmentBySlug(slug: string): MockAssessment | null {
  return assessments.find(a => a.slug === slug) ?? null;
}

export function getAssessmentById(id: string): MockAssessment | null {
  return assessments.find(a => a.id === id) ?? null;
}

export function getAssessmentsByClassId(classId: string): MockAssessment[] {
  return assessments.filter(a => a.classIds.includes(classId));
}

// --- Assignments ---

export function getAllAssignments(): MockAssignment[] {
  return assignments;
}

export function getAssignmentBySlug(slug: string): MockAssignment | null {
  return assignments.find(a => a.slug === slug) ?? null;
}

export function getAssignmentsByClassId(classId: string): MockAssignment[] {
  return assignments.filter(a => a.classId === classId);
}

export function getAssignmentsByTeacherId(teacherId: string): MockAssignment[] {
  return assignments.filter(a => a.teacherId === teacherId);
}

// --- Scores ---

export function getAllScores(): MockScore[] {
  return scores;
}

export function getScoresByStudentId(studentId: string): MockScore[] {
  return scores.filter(s => s.studentId === studentId);
}

export function getScoresByAssessmentId(assessmentId: string): MockScore[] {
  return scores.filter(s => s.assessmentId === assessmentId);
}

// --- Skills ---

export function getAllSkills(): MockSkill[] {
  return skills;
}

export function getSkillBySlug(slug: string): MockSkill | null {
  return skills.find(s => s.slug === slug) ?? null;
}

export function getSkillById(id: string): MockSkill | null {
  return skills.find(s => s.id === id) ?? null;
}

export function getSkillsBySubject(subject: string): MockSkill[] {
  return skills.filter(s => s.subject === subject);
}

export function getSkillsByStandardId(standardId: string): MockSkill[] {
  return skills.filter(s => s.standardId === standardId);
}

// --- Standards ---

export function getAllStandards(): MockStandard[] {
  return standards;
}

export function getStandardBySlug(slug: string): MockStandard | null {
  return standards.find(s => s.slug === slug) ?? null;
}

export function getStandardById(id: string): MockStandard | null {
  return standards.find(s => s.id === id) ?? null;
}

// --- Resources ---

export function getAllResources(): MockResource[] {
  return resources;
}

export function getResourceBySlug(slug: string): MockResource | null {
  return resources.find(r => r.slug === slug) ?? null;
}

export function getResourcesBySubject(subject: string): MockResource[] {
  return resources.filter(r => r.subject === subject);
}

// --- Insights ---

export function getAllInsights(): MockInsight[] {
  return insights;
}

export function getInsightsByClassId(classId: string): MockInsight[] {
  return insights.filter(i => i.classId === classId);
}

export function getInsightById(id: string): MockInsight | null {
  return insights.find(i => i.id === id) ?? null;
}

// --- Proficiency Predictions ---

export function getAllPredictions(): MockProficiencyPrediction[] {
  return predictions;
}

export function getPredictionsByStudentId(studentId: string): MockProficiencyPrediction[] {
  return predictions.filter(p => p.studentId === studentId);
}

// --- Student Groups ---

export function getAllStudentGroups(): MockStudentGroup[] {
  return studentGroups;
}

export function getStudentGroupsByClassId(classId: string): MockStudentGroup[] {
  return studentGroups.filter(g => g.classId === classId);
}

// --- Learning Paths ---

export function getAllLearningPaths(): MockLearningPath[] {
  return learningPaths;
}

export function getLearningPathsByStudentId(studentId: string): MockLearningPath[] {
  return learningPaths.filter(p => p.studentId === studentId);
}

// --- Activity Events ---

export function getAllActivityEvents(): MockActivityEvent[] {
  return activityEvents;
}

export function getActivityEventsByStudentId(studentId: string): MockActivityEvent[] {
  return activityEvents.filter(e => e.studentId === studentId);
}

export function getActivityEventsByClassId(classId: string): MockActivityEvent[] {
  return activityEvents.filter(e => e.classId === classId);
}

export function getRecentActivityEvents(limit: number = 20): MockActivityEvent[] {
  return [...activityEvents]
    .sort((a, b) => (b.startedAt ?? '').localeCompare(a.startedAt ?? ''))
    .slice(0, limit);
}

// --- Activities ---

export function getAllActivities(): MockActivity[] {
  return activities;
}

export function getActivitiesByLessonId(lessonId: string): MockActivity[] {
  return activities.filter(a => a.lessonId === lessonId);
}

// --- Lessons ---

export function getAllLessons(): MockLesson[] {
  return lessons;
}

export function getLessonBySlug(slug: string): MockLesson | null {
  return lessons.find(l => l.slug === slug) ?? null;
}

export function getLessonById(id: string): MockLesson | null {
  return lessons.find(l => l.id === id) ?? null;
}

// --- Live Sessions ---

export function getAllLiveSessions(): MockLiveSession[] {
  return liveSessions;
}

export function getLiveSessionsByClassId(classId: string): MockLiveSession[] {
  return liveSessions.filter(s => s.classId === classId);
}

// --- Reports ---

export function getAllReports(): MockReport[] {
  return reports;
}

export function getReportById(id: string): MockReport | null {
  return reports.find(r => r.id === id) ?? null;
}

export function getReportsByClassId(classId: string): MockReport[] {
  return reports.filter(r => r.classId === classId);
}

// --- Solutions & Products ---

export function getAllSolutions(): MockSolution[] {
  return solutions;
}

export function getAllProducts(): MockProduct[] {
  return products;
}

export function getProductBySlug(slug: string): MockProduct | null {
  return products.find(p => p.slug === slug) ?? null;
}

export function getAllProductAssignments(): MockProductAssignment[] {
  return productAssignments;
}

export function getProductAssignmentsBySchoolId(schoolId: string): MockProductAssignment[] {
  return productAssignments.filter(pa => pa.schoolId === schoolId);
}

// --- Onboarding ---

export function getAllOnboardingChecklists(): MockOnboardingChecklist[] {
  return onboardingChecklists;
}

export function getOnboardingChecklistByTeacherId(teacherId: string): MockOnboardingChecklist | null {
  return onboardingChecklists.find(c => c.teacherId === teacherId) ?? null;
}

export function getOnboardingStepsByChecklistId(checklistId: string): MockOnboardingStep[] {
  return onboardingSteps.filter(s => s.checklistId === checklistId);
}

// --- Academy ---

export function getAllAcademyModules(): MockEducatorAcademyModule[] {
  return academyModules;
}

export function getAcademyModuleBySlug(slug: string): MockEducatorAcademyModule | null {
  return academyModules.find(m => m.slug === slug) ?? null;
}

// Re-export types for convenience
export type {
  MockStudent, MockTeacher, MockClass, MockSchool, MockDistrict,
  MockAssessment, MockAssignment, MockScore, MockSkill, MockStandard,
  MockResource, MockInsight, MockProficiencyPrediction, MockStudentGroup,
  MockLearningPath, MockActivityEvent, MockActivity, MockLesson,
  MockLiveSession, MockReport, MockSolution, MockProduct,
  MockProductAssignment, MockOnboardingChecklist, MockOnboardingStep,
  MockEducatorAcademyModule,
};
