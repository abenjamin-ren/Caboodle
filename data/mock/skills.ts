import type { MockSkill } from './types';

export const skills: MockSkill[] = [
  // ELA — Reading: Literature (RL.3)
  { id: 'sk-rl3-1', slug: 'rl3-key-ideas', code: 'RL.3.1', name: 'Key Ideas & Details', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Literature', framework: 'Common Core', standardId: 'std-rl3' },
  { id: 'sk-rl3-2', slug: 'rl3-craft-structure', code: 'RL.3.2', name: 'Craft & Structure', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Literature', framework: 'Common Core', standardId: 'std-rl3' },
  { id: 'sk-rl3-3', slug: 'rl3-integration', code: 'RL.3.3', name: 'Integration of Knowledge', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Literature', framework: 'Common Core', standardId: 'std-rl3' },
  { id: 'sk-rl3-4', slug: 'rl3-range-complexity', code: 'RL.3.4', name: 'Range & Text Complexity', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Literature', framework: 'Common Core', standardId: 'std-rl3' },

  // ELA — Reading: Informational Text (RI.3)
  { id: 'sk-ri3-1', slug: 'ri3-key-ideas', code: 'RI.3.1', name: 'Key Ideas & Details', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Informational Text', framework: 'Common Core', standardId: 'std-ri3' },
  { id: 'sk-ri3-2', slug: 'ri3-craft-structure', code: 'RI.3.2', name: 'Craft & Structure', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Informational Text', framework: 'Common Core', standardId: 'std-ri3' },
  { id: 'sk-ri3-3', slug: 'ri3-integration', code: 'RI.3.3', name: 'Integration of Knowledge', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Informational Text', framework: 'Common Core', standardId: 'std-ri3' },
  { id: 'sk-ri3-4', slug: 'ri3-range-complexity', code: 'RI.3.4', name: 'Range & Text Complexity', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Informational Text', framework: 'Common Core', standardId: 'std-ri3' },

  // ELA — Reading: Foundational Skills (RF.3)
  { id: 'sk-rf3-1', slug: 'rf3-phonics', code: 'RF.3.1', name: 'Phonics & Word Recognition', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Foundational Skills', framework: 'Common Core', standardId: 'std-rf3' },
  { id: 'sk-rf3-2', slug: 'rf3-fluency', code: 'RF.3.2', name: 'Fluency', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Foundational Skills', framework: 'Common Core', standardId: 'std-rf3' },
  { id: 'sk-rf3-3', slug: 'rf3-decode', code: 'RF.3.3', name: 'Decoding Multi-Syllable Words', subject: 'ELA', gradeLevel: '3', domain: 'Reading: Foundational Skills', framework: 'Common Core', standardId: 'std-rf3' },

  // ELA — Writing (W.3)
  { id: 'sk-w3-1', slug: 'w3-opinion', code: 'W.3.1', name: 'Opinion Writing', subject: 'ELA', gradeLevel: '3', domain: 'Writing', framework: 'Common Core', standardId: 'std-w3' },
  { id: 'sk-w3-2', slug: 'w3-informative', code: 'W.3.2', name: 'Informative/Explanatory Writing', subject: 'ELA', gradeLevel: '3', domain: 'Writing', framework: 'Common Core', standardId: 'std-w3' },
  { id: 'sk-w3-3', slug: 'w3-narrative', code: 'W.3.3', name: 'Narrative Writing', subject: 'ELA', gradeLevel: '3', domain: 'Writing', framework: 'Common Core', standardId: 'std-w3' },

  // ELA — Language (L.3)
  { id: 'sk-l3-1', slug: 'l3-conventions', code: 'L.3.1', name: 'Conventions of Standard English', subject: 'ELA', gradeLevel: '3', domain: 'Language', framework: 'Common Core', standardId: 'std-l3' },
  { id: 'sk-l3-2', slug: 'l3-vocabulary', code: 'L.3.2', name: 'Vocabulary Acquisition & Use', subject: 'ELA', gradeLevel: '3', domain: 'Language', framework: 'Common Core', standardId: 'std-l3' },
  { id: 'sk-l3-3', slug: 'l3-knowledge-language', code: 'L.3.3', name: 'Knowledge of Language', subject: 'ELA', gradeLevel: '3', domain: 'Language', framework: 'Common Core', standardId: 'std-l3' },

  // ELA — Speaking & Listening (SL.3)
  { id: 'sk-sl3-1', slug: 'sl3-comprehension', code: 'SL.3.1', name: 'Comprehension & Collaboration', subject: 'ELA', gradeLevel: '3', domain: 'Speaking & Listening', framework: 'Common Core', standardId: 'std-sl3' },
  { id: 'sk-sl3-2', slug: 'sl3-presentation', code: 'SL.3.2', name: 'Presentation of Knowledge', subject: 'ELA', gradeLevel: '3', domain: 'Speaking & Listening', framework: 'Common Core', standardId: 'std-sl3' },
  { id: 'sk-sl3-3', slug: 'sl3-evaluate-speaker', code: 'SL.3.3', name: 'Evaluate a Speaker\'s Point of View', subject: 'ELA', gradeLevel: '3', domain: 'Speaking & Listening', framework: 'Common Core', standardId: 'std-sl3' },

  // Math — Operations & Algebraic Thinking (OA.3)
  { id: 'sk-oa3-1', slug: 'oa3-multiplication', code: 'OA.3.1', name: 'Multiplication Within 100', subject: 'Math', gradeLevel: '3', domain: 'Operations & Algebraic Thinking', framework: 'Common Core', standardId: 'std-oa3' },
  { id: 'sk-oa3-2', slug: 'oa3-division', code: 'OA.3.2', name: 'Division Within 100', subject: 'Math', gradeLevel: '3', domain: 'Operations & Algebraic Thinking', framework: 'Common Core', standardId: 'std-oa3' },
  { id: 'sk-oa3-3', slug: 'oa3-word-problems', code: 'OA.3.3', name: 'Two-Step Word Problems', subject: 'Math', gradeLevel: '3', domain: 'Operations & Algebraic Thinking', framework: 'Common Core', standardId: 'std-oa3' },
  { id: 'sk-oa3-4', slug: 'oa3-patterns', code: 'OA.3.4', name: 'Arithmetic Patterns', subject: 'Math', gradeLevel: '3', domain: 'Operations & Algebraic Thinking', framework: 'Common Core', standardId: 'std-oa3' },

  // Math — Number & Operations in Base Ten (NBT.3)
  { id: 'sk-nbt3-1', slug: 'nbt3-place-value', code: 'NBT.3.1', name: 'Place Value Understanding', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations in Base Ten', framework: 'Common Core', standardId: 'std-nbt3' },
  { id: 'sk-nbt3-2', slug: 'nbt3-add-subtract', code: 'NBT.3.2', name: 'Add & Subtract Within 1000', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations in Base Ten', framework: 'Common Core', standardId: 'std-nbt3' },
  { id: 'sk-nbt3-3', slug: 'nbt3-multiply-multiples', code: 'NBT.3.3', name: 'Multiply by Multiples of 10', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations in Base Ten', framework: 'Common Core', standardId: 'std-nbt3' },

  // Math — Number & Operations — Fractions (NF.3)
  { id: 'sk-nf3-1', slug: 'nf3-understand-fractions', code: 'NF.3.1', name: 'Understand Fractions as Numbers', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations — Fractions', framework: 'Common Core', standardId: 'std-nf3' },
  { id: 'sk-nf3-2', slug: 'nf3-number-line', code: 'NF.3.2', name: 'Fractions on a Number Line', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations — Fractions', framework: 'Common Core', standardId: 'std-nf3' },
  { id: 'sk-nf3-3', slug: 'nf3-equivalence', code: 'NF.3.3', name: 'Fraction Equivalence & Comparison', subject: 'Math', gradeLevel: '3', domain: 'Number & Operations — Fractions', framework: 'Common Core', standardId: 'std-nf3' },

  // Math — Measurement & Data (MD.3)
  { id: 'sk-md3-1', slug: 'md3-time', code: 'MD.3.1', name: 'Tell & Write Time', subject: 'Math', gradeLevel: '3', domain: 'Measurement & Data', framework: 'Common Core', standardId: 'std-md3' },
  { id: 'sk-md3-2', slug: 'md3-area', code: 'MD.3.2', name: 'Measure Areas', subject: 'Math', gradeLevel: '3', domain: 'Measurement & Data', framework: 'Common Core', standardId: 'std-md3' },
  { id: 'sk-md3-3', slug: 'md3-data-graphs', code: 'MD.3.3', name: 'Represent & Interpret Data', subject: 'Math', gradeLevel: '3', domain: 'Measurement & Data', framework: 'Common Core', standardId: 'std-md3' },

  // Math — Geometry (G.3)
  { id: 'sk-g3-1', slug: 'g3-shapes', code: 'G.3.1', name: 'Reason with Shapes', subject: 'Math', gradeLevel: '3', domain: 'Geometry', framework: 'Common Core', standardId: 'std-g3' },
  { id: 'sk-g3-2', slug: 'g3-partition', code: 'G.3.2', name: 'Partition Shapes into Equal Parts', subject: 'Math', gradeLevel: '3', domain: 'Geometry', framework: 'Common Core', standardId: 'std-g3' },
  { id: 'sk-g3-3', slug: 'g3-attributes', code: 'G.3.3', name: 'Describe & Compare Shape Attributes', subject: 'Math', gradeLevel: '3', domain: 'Geometry', framework: 'Common Core', standardId: 'std-g3' },

  // Math — Practices (MP)
  { id: 'sk-mp-1', slug: 'mp-problem-solving', code: 'MP.1', name: 'Make Sense of Problems', subject: 'Math', gradeLevel: '3', domain: 'Standards for Mathematical Practice', framework: 'Common Core', standardId: 'std-mp' },
  { id: 'sk-mp-2', slug: 'mp-reasoning', code: 'MP.2', name: 'Reason Abstractly & Quantitatively', subject: 'Math', gradeLevel: '3', domain: 'Standards for Mathematical Practice', framework: 'Common Core', standardId: 'std-mp' },
  { id: 'sk-mp-3', slug: 'mp-construct-arguments', code: 'MP.3', name: 'Construct Viable Arguments', subject: 'Math', gradeLevel: '3', domain: 'Standards for Mathematical Practice', framework: 'Common Core', standardId: 'std-mp' },
];
