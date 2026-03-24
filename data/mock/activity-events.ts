import type { MockActivityEvent } from './types';

const PRODUCTS = ['Star Reading', 'Star Math', 'Freckle', 'AR', 'myON', 'Nearpod'];
const TYPES = ['Assessment Completed', 'Practice Session', 'Book Finished', 'Lesson Participated', 'Assignment Submitted', 'Quiz Completed'];

function makeEvent(
  id: string, label: string, type: string, product: string,
  subject: string, student: string, studentId: string, classId: string,
  date: string, score?: string, assignmentId?: string, assessmentId?: string,
): MockActivityEvent {
  return {
    id, activityLabel: label, activityType: type, sourceProduct: product,
    subject, studentName: student, startedAt: date,
    completedAt: date, scoreSummary: score,
    studentId, classId, assignmentId, assessmentId,
    href: `/prototype/students/${studentId.replace('stu-', '')}`,
  };
}

const handcraftedEvents: MockActivityEvent[] = [
  makeEvent('evt-1', 'Amara completed Star Reading MOY', 'Assessment Completed', 'Star Reading', 'ELA', 'Amara Johnson', 'stu-amara', 'cls-3a', '2026-01-10T09:15:00Z', '520 SS', undefined, 'asmt-sr-moy'),
  makeEvent('evt-2', 'Leo completed Star Reading MOY', 'Assessment Completed', 'Star Reading', 'ELA', 'Leo Vasquez', 'stu-leo', 'cls-3a', '2026-01-10T09:22:00Z', '380 SS', undefined, 'asmt-sr-moy'),
  makeEvent('evt-3', 'Sofia completed Star Reading MOY', 'Assessment Completed', 'Star Reading', 'ELA', 'Sofia Chen', 'stu-sofia', 'cls-3a', '2026-01-10T09:30:00Z', '400 SS', undefined, 'asmt-sr-moy'),
  makeEvent('evt-4', 'Leo practiced Freckle ELA', 'Practice Session', 'Freckle', 'ELA', 'Leo Vasquez', 'stu-leo', 'cls-3a', '2026-03-17T10:05:00Z', '6/10 correct', 'asgn-1'),
  makeEvent('evt-5', 'Amara finished Charlotte\'s Web on AR', 'Book Finished', 'AR', 'ELA', 'Amara Johnson', 'stu-amara', 'cls-3a', '2026-03-16T14:30:00Z', '90% quiz score', 'asgn-3'),
  makeEvent('evt-6', 'Marcus submitted Opinion Writing Draft', 'Assignment Submitted', 'Nearpod', 'ELA', 'Marcus Williams', 'stu-marcus', 'cls-3a', '2026-03-15T11:00:00Z', undefined, 'asgn-4'),
  makeEvent('evt-7', 'Jayden practiced multiplication facts', 'Practice Session', 'Freckle', 'Math', 'Jayden Brooks', 'stu-jayden', 'cls-3b', '2026-03-17T13:20:00Z', '18/20 correct', 'asgn-7'),
  makeEvent('evt-8', 'Priya worked on fractions intro', 'Practice Session', 'Freckle', 'Math', 'Priya Patel', 'stu-priya', 'cls-3b', '2026-03-16T10:45:00Z', '5/10 correct', 'asgn-8'),
  makeEvent('evt-9', 'Sofia completed Star Math MOY', 'Assessment Completed', 'Star Math', 'Math', 'Sofia Chen', 'stu-sofia', 'cls-3b', '2026-01-14T09:15:00Z', '430 SS', undefined, 'asmt-sm-moy'),
  makeEvent('evt-10', 'Amara read on myON for 25 min', 'Practice Session', 'myON', 'ELA', 'Amara Johnson', 'stu-amara', 'cls-3a', '2026-03-14T08:30:00Z', '25 min reading'),
  makeEvent('evt-11', 'Leo participated in Nearpod lesson', 'Lesson Participated', 'Nearpod', 'ELA', 'Leo Vasquez', 'stu-leo', 'cls-3a', '2026-03-13T14:00:00Z', '8/10 responses'),
  makeEvent('evt-12', 'Jayden completed Star Math MOY', 'Assessment Completed', 'Star Math', 'Math', 'Jayden Brooks', 'stu-jayden', 'cls-3b', '2026-01-14T09:40:00Z', '520 SS', undefined, 'asmt-sm-moy'),
  makeEvent('evt-13', 'Marcus practiced Freckle Math', 'Practice Session', 'Freckle', 'Math', 'Marcus Williams', 'stu-marcus', 'cls-3b', '2026-03-17T09:00:00Z', '14/15 correct', 'asgn-7'),
  makeEvent('evt-14', 'Priya finished Magic Tree House #1', 'Book Finished', 'AR', 'ELA', 'Priya Patel', 'stu-priya', 'cls-3a', '2026-03-12T15:00:00Z', '80% quiz score', 'asgn-3'),
  makeEvent('evt-15', 'Sofia practiced Freckle ELA phonics', 'Practice Session', 'Freckle', 'ELA', 'Sofia Chen', 'stu-sofia', 'cls-3a', '2026-03-17T10:30:00Z', '4/10 correct', 'asgn-5'),
];

const CLASS_3A_STUDENTS = [
  'stu-olivia', 'stu-ethan', 'stu-maya', 'stu-noah', 'stu-ava', 'stu-liam',
  'stu-zoe', 'stu-kai', 'stu-luna', 'stu-owen', 'stu-iris', 'stu-finn',
  'stu-nadia', 'stu-henry', 'stu-clara', 'stu-diego', 'stu-ruby', 'stu-sam',
];
const NAMES_3A = [
  'Olivia', 'Ethan', 'Maya', 'Noah', 'Ava', 'Liam', 'Zoe', 'Kai',
  'Luna', 'Owen', 'Iris', 'Finn', 'Nadia', 'Henry', 'Clara', 'Diego', 'Ruby', 'Sam',
];

const generatedEvents: MockActivityEvent[] = [];
let eventCounter = 16;
for (let day = 0; day < 10; day++) {
  const date = `2026-03-${String(8 + day).padStart(2, '0')}`;
  for (let s = 0; s < CLASS_3A_STUDENTS.length; s++) {
    if (Math.random() > 0.4) continue;
    const typeIdx = Math.floor(Math.random() * TYPES.length);
    generatedEvents.push({
      id: `evt-${eventCounter++}`,
      activityLabel: `${NAMES_3A[s]} — ${TYPES[typeIdx]}`,
      activityType: TYPES[typeIdx],
      sourceProduct: PRODUCTS[typeIdx % PRODUCTS.length],
      subject: typeIdx % 2 === 0 ? 'ELA' : 'Math',
      studentName: NAMES_3A[s],
      startedAt: `${date}T${String(8 + Math.floor(Math.random() * 8)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00Z`,
      studentId: CLASS_3A_STUDENTS[s],
      classId: 'cls-3a',
    });
  }
}

export const activityEvents: MockActivityEvent[] = [...handcraftedEvents, ...generatedEvents];
