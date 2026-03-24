import type { MockProficiencyPrediction } from './types';

const HIGHLIGHTED_IDS = ['stu-amara', 'stu-leo', 'stu-priya', 'stu-marcus', 'stu-sofia', 'stu-jayden'];
const HIGHLIGHTED_NAMES = ['Amara Johnson', 'Leo Vasquez', 'Priya Patel', 'Marcus Williams', 'Sofia Chen', 'Jayden Brooks'];
const ELA_SKILLS = ['sk-rl3-1', 'sk-ri3-1', 'sk-rf3-1', 'sk-l3-2', 'sk-w3-1'];
const ELA_SKILL_NAMES = ['Key Ideas & Details', 'Informational Key Ideas', 'Phonics & Word Recognition', 'Vocabulary Acquisition', 'Opinion Writing'];
const MATH_SKILLS = ['sk-oa3-1', 'sk-nbt3-1', 'sk-nf3-1', 'sk-md3-1', 'sk-g3-1'];
const MATH_SKILL_NAMES = ['Multiplication Within 100', 'Place Value Understanding', 'Fractions as Numbers', 'Tell & Write Time', 'Reason with Shapes'];

const predictions: MockProficiencyPrediction[] = [];

for (let s = 0; s < HIGHLIGHTED_IDS.length; s++) {
  for (let sk = 0; sk < ELA_SKILLS.length; sk++) {
    const base = s === 0 ? 75 : s === 1 ? 30 : s === 2 ? 50 : s === 3 ? 70 : s === 4 ? 35 : 55;
    const proficiency = Math.min(100, Math.max(5, base + (sk * 3) - 5 + Math.floor(Math.random() * 10)));
    predictions.push({
      id: `pred-${HIGHLIGHTED_IDS[s]}-ela-${sk}`,
      studentName: HIGHLIGHTED_NAMES[s],
      skillName: ELA_SKILL_NAMES[sk],
      proficiency,
      predictedPctCorrect: proficiency + Math.floor(Math.random() * 5),
      instructionalGroup: proficiency >= 70 ? 'ENRICHMENT' : proficiency >= 45 ? 'INSTRUCTIONAL' : 'APPROACHING',
      predictionType: 'has_star',
      isPracticed: sk < 3,
      predictionModel: 'Star + Practice v3.2',
      predictionTimestamp: '2026-03-15T00:00:00Z',
      studentId: HIGHLIGHTED_IDS[s],
      skillId: ELA_SKILLS[sk],
    });
  }
  for (let sk = 0; sk < MATH_SKILLS.length; sk++) {
    const base = s === 0 ? 55 : s === 1 ? 80 : s === 2 ? 50 : s === 3 ? 72 : s === 4 ? 40 : 78;
    const proficiency = Math.min(100, Math.max(5, base + (sk * 2) - 3 + Math.floor(Math.random() * 10)));
    predictions.push({
      id: `pred-${HIGHLIGHTED_IDS[s]}-math-${sk}`,
      studentName: HIGHLIGHTED_NAMES[s],
      skillName: MATH_SKILL_NAMES[sk],
      proficiency,
      predictedPctCorrect: proficiency + Math.floor(Math.random() * 5),
      instructionalGroup: proficiency >= 70 ? 'ENRICHMENT' : proficiency >= 45 ? 'INSTRUCTIONAL' : 'APPROACHING',
      predictionType: 'has_star',
      isPracticed: sk < 2,
      predictionModel: 'Star + Practice v3.2',
      predictionTimestamp: '2026-03-15T00:00:00Z',
      studentId: HIGHLIGHTED_IDS[s],
      skillId: MATH_SKILLS[sk],
    });
  }
}

export { predictions };
