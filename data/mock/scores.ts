import type { MockScore } from './types';
import { highlightedStudents } from './students';

const HIGHLIGHTED_SCORES: MockScore[] = [
  // Amara Johnson — Star Reading BOY→MOY→EOY, Star Math BOY→MOY
  { id: 'scr-amara-sr-boy', value: 480, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Amara Johnson', assessmentName: 'Star Reading — BOY', date: '2025-09-12', growth: undefined, percentile: 55, gradeEquivalent: 2.8, duration: 22, studentId: 'stu-amara', assessmentId: 'asmt-sr-boy', skillBreakdown: [{ name: 'Key Ideas & Details', level: 'Developing', percent: 60 }, { name: 'Craft & Structure', level: 'Developing', percent: 55 }, { name: 'Vocabulary', level: 'Proficient', percent: 75 }] },
  { id: 'scr-amara-sr-moy', value: 520, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Amara Johnson', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 65, percentile: 72, gradeEquivalent: 3.4, duration: 20, studentId: 'stu-amara', assessmentId: 'asmt-sr-moy', skillBreakdown: [{ name: 'Key Ideas & Details', level: 'Proficient', percent: 78 }, { name: 'Craft & Structure', level: 'Proficient', percent: 72 }, { name: 'Vocabulary', level: 'Advanced', percent: 88 }] },
  { id: 'scr-amara-sm-boy', value: 460, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Amara Johnson', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 48, gradeEquivalent: 2.6, duration: 24, studentId: 'stu-amara', assessmentId: 'asmt-sm-boy', skillBreakdown: [{ name: 'Multiplication', level: 'Developing', percent: 50 }, { name: 'Place Value', level: 'Developing', percent: 55 }] },
  { id: 'scr-amara-sm-moy', value: 480, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Amara Johnson', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 42, percentile: 52, gradeEquivalent: 2.9, duration: 23, studentId: 'stu-amara', assessmentId: 'asmt-sm-moy', skillBreakdown: [{ name: 'Multiplication', level: 'Developing', percent: 58 }, { name: 'Place Value', level: 'Proficient', percent: 70 }] },

  // Leo Vasquez — Reading Urgent, Math At/Above
  { id: 'scr-leo-sr-boy', value: 350, scoreType: 'Scaled Score', proficiencyBand: 'Urgent', studentName: 'Leo Vasquez', assessmentName: 'Star Reading — BOY', date: '2025-09-12', percentile: 12, gradeEquivalent: 1.6, duration: 28, studentId: 'stu-leo', assessmentId: 'asmt-sr-boy', skillBreakdown: [{ name: 'Key Ideas & Details', level: 'Beginning', percent: 25 }, { name: 'Phonics', level: 'Developing', percent: 40 }] },
  { id: 'scr-leo-sr-moy', value: 380, scoreType: 'Scaled Score', proficiencyBand: 'Urgent', studentName: 'Leo Vasquez', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 55, percentile: 18, gradeEquivalent: 1.9, duration: 26, studentId: 'stu-leo', assessmentId: 'asmt-sr-moy', skillBreakdown: [{ name: 'Key Ideas & Details', level: 'Beginning', percent: 32 }, { name: 'Phonics', level: 'Developing', percent: 48 }] },
  { id: 'scr-leo-sm-boy', value: 490, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Leo Vasquez', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 70, gradeEquivalent: 3.2, duration: 20, studentId: 'stu-leo', assessmentId: 'asmt-sm-boy', skillBreakdown: [{ name: 'Multiplication', level: 'Proficient', percent: 82 }, { name: 'Word Problems', level: 'Proficient', percent: 75 }] },
  { id: 'scr-leo-sm-moy', value: 510, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Leo Vasquez', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 68, percentile: 78, gradeEquivalent: 3.5, duration: 18, studentId: 'stu-leo', assessmentId: 'asmt-sm-moy', skillBreakdown: [{ name: 'Multiplication', level: 'Advanced', percent: 90 }, { name: 'Word Problems', level: 'Proficient', percent: 80 }] },

  // Priya Patel — On Watch both
  { id: 'scr-priya-sr-boy', value: 430, scoreType: 'Scaled Score', proficiencyBand: 'Intervention', studentName: 'Priya Patel', assessmentName: 'Star Reading — BOY', date: '2025-09-12', percentile: 35, gradeEquivalent: 2.4, duration: 24, studentId: 'stu-priya', assessmentId: 'asmt-sr-boy' },
  { id: 'scr-priya-sr-moy', value: 450, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Priya Patel', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 50, percentile: 42, gradeEquivalent: 2.7, duration: 23, studentId: 'stu-priya', assessmentId: 'asmt-sr-moy' },
  { id: 'scr-priya-sm-boy', value: 440, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Priya Patel', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 38, gradeEquivalent: 2.5, duration: 25, studentId: 'stu-priya', assessmentId: 'asmt-sm-boy' },
  { id: 'scr-priya-sm-moy', value: 460, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Priya Patel', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 45, percentile: 45, gradeEquivalent: 2.7, duration: 24, studentId: 'stu-priya', assessmentId: 'asmt-sm-moy' },

  // Marcus Williams — At/Above both
  { id: 'scr-marcus-sr-boy', value: 470, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Marcus Williams', assessmentName: 'Star Reading — BOY', date: '2025-09-12', percentile: 60, gradeEquivalent: 3.0, duration: 19, studentId: 'stu-marcus', assessmentId: 'asmt-sr-boy' },
  { id: 'scr-marcus-sr-moy', value: 490, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Marcus Williams', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 58, percentile: 68, gradeEquivalent: 3.3, duration: 18, studentId: 'stu-marcus', assessmentId: 'asmt-sr-moy' },
  { id: 'scr-marcus-sm-boy', value: 480, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Marcus Williams', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 62, gradeEquivalent: 3.0, duration: 21, studentId: 'stu-marcus', assessmentId: 'asmt-sm-boy' },
  { id: 'scr-marcus-sm-moy', value: 495, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Marcus Williams', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 55, percentile: 70, gradeEquivalent: 3.3, duration: 20, studentId: 'stu-marcus', assessmentId: 'asmt-sm-moy' },

  // Sofia Chen — Intervention both
  { id: 'scr-sofia-sr-boy', value: 375, scoreType: 'Scaled Score', proficiencyBand: 'Urgent', studentName: 'Sofia Chen', assessmentName: 'Star Reading — BOY', date: '2025-09-12', percentile: 15, gradeEquivalent: 1.8, duration: 30, studentId: 'stu-sofia', assessmentId: 'asmt-sr-boy' },
  { id: 'scr-sofia-sr-moy', value: 400, scoreType: 'Scaled Score', proficiencyBand: 'Intervention', studentName: 'Sofia Chen', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 60, percentile: 22, gradeEquivalent: 2.1, duration: 28, studentId: 'stu-sofia', assessmentId: 'asmt-sr-moy' },
  { id: 'scr-sofia-sm-boy', value: 410, scoreType: 'Scaled Score', proficiencyBand: 'Intervention', studentName: 'Sofia Chen', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 25, gradeEquivalent: 2.2, duration: 28, studentId: 'stu-sofia', assessmentId: 'asmt-sm-boy' },
  { id: 'scr-sofia-sm-moy', value: 430, scoreType: 'Scaled Score', proficiencyBand: 'Intervention', studentName: 'Sofia Chen', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 48, percentile: 30, gradeEquivalent: 2.4, duration: 27, studentId: 'stu-sofia', assessmentId: 'asmt-sm-moy' },

  // Jayden Brooks — On Watch reading, At/Above math
  { id: 'scr-jayden-sr-boy', value: 445, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Jayden Brooks', assessmentName: 'Star Reading — BOY', date: '2025-09-12', percentile: 42, gradeEquivalent: 2.6, duration: 23, studentId: 'stu-jayden', assessmentId: 'asmt-sr-boy' },
  { id: 'scr-jayden-sr-moy', value: 470, scoreType: 'Scaled Score', proficiencyBand: 'On Watch', studentName: 'Jayden Brooks', assessmentName: 'Star Reading — MOY', date: '2026-01-10', growth: 52, percentile: 50, gradeEquivalent: 2.9, duration: 21, studentId: 'stu-jayden', assessmentId: 'asmt-sr-moy' },
  { id: 'scr-jayden-sm-boy', value: 505, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Jayden Brooks', assessmentName: 'Star Math — BOY', date: '2025-09-15', percentile: 75, gradeEquivalent: 3.4, duration: 19, studentId: 'stu-jayden', assessmentId: 'asmt-sm-boy' },
  { id: 'scr-jayden-sm-moy', value: 520, scoreType: 'Scaled Score', proficiencyBand: 'At/Above', studentName: 'Jayden Brooks', assessmentName: 'Star Math — MOY', date: '2026-01-14', growth: 62, percentile: 80, gradeEquivalent: 3.6, duration: 17, studentId: 'stu-jayden', assessmentId: 'asmt-sm-moy' },
];

function bandForValue(v: number): string {
  if (v >= 489) return 'At/Above';
  if (v >= 440) return 'On Watch';
  if (v >= 394) return 'Intervention';
  return 'Urgent';
}

function generateScoresForStudent(
  studentId: string, studentName: string,
  assessmentId: string, assessmentName: string, date: string,
  baseValue: number,
): MockScore {
  const v = baseValue + Math.floor(Math.random() * 40) - 20;
  return {
    id: `scr-${studentId}-${assessmentId}`,
    value: v,
    scoreType: 'Scaled Score',
    proficiencyBand: bandForValue(v),
    studentName,
    assessmentName,
    date,
    percentile: Math.max(5, Math.min(95, Math.round(v / 6))),
    studentId,
    assessmentId,
  };
}

const generatedScores: MockScore[] = [];
const generatedStudents = [
  'stu-olivia', 'stu-ethan', 'stu-maya', 'stu-noah', 'stu-ava', 'stu-liam',
  'stu-zoe', 'stu-kai', 'stu-luna', 'stu-owen', 'stu-iris', 'stu-finn',
  'stu-nadia', 'stu-henry', 'stu-clara', 'stu-diego', 'stu-ruby', 'stu-sam',
];
const FIRST_NAMES = [
  'Olivia', 'Ethan', 'Maya', 'Noah', 'Ava', 'Liam', 'Zoe', 'Kai',
  'Luna', 'Owen', 'Iris', 'Finn', 'Nadia', 'Henry', 'Clara', 'Diego',
  'Ruby', 'Sam',
];

for (let i = 0; i < generatedStudents.length; i++) {
  const sid = generatedStudents[i];
  const sname = FIRST_NAMES[i];
  const base = 380 + Math.floor(Math.random() * 160);
  generatedScores.push(
    generateScoresForStudent(sid, sname, 'asmt-sr-boy', 'Star Reading — BOY', '2025-09-12', base),
    generateScoresForStudent(sid, sname, 'asmt-sr-moy', 'Star Reading — MOY', '2026-01-10', base + 15),
    generateScoresForStudent(sid, sname, 'asmt-sm-boy', 'Star Math — BOY', '2025-09-15', base - 10),
    generateScoresForStudent(sid, sname, 'asmt-sm-moy', 'Star Math — MOY', '2026-01-14', base + 5),
  );
}

export const scores: MockScore[] = [...HIGHLIGHTED_SCORES, ...generatedScores];
