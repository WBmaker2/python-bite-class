export type LessonId = `chapter-${number}-${number}`;

export interface ConceptBlock {
  type: 'explanation' | 'tip' | 'warning' | 'example';
  title?: string;
  body: string;
  code?: string;
}

export interface OutputCheck {
  mode: 'contains' | 'equals' | 'regex';
  value: string;
  feedback: string;
}

export interface Challenge {
  prompt: string;
  hint: string;
  checks?: OutputCheck[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface Lesson {
  id: LessonId;
  chapter: number;
  order: number;
  title: string;
  summary: string;
  objectives: string[];
  concepts: ConceptBlock[];
  starterCode: string;
  expectedOutput?: string;
  challenge: Challenge;
  glossary: GlossaryItem[];
}
