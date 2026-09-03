export type LessonId = `chapter-${number}-${number}`;
export type CompletionMode = 'read' | 'run' | 'challenge';

export interface ConceptBlock {
  type: 'explanation' | 'tip' | 'warning' | 'example';
  title?: string;
  body: string;
  code?: string;
}

export interface OutputCheck {
  mode: 'contains' | 'equals' | 'regex' | 'appended' | 'changed';
  value: string;
  feedback: string;
}

export interface Challenge {
  prompt: string;
  hint: string;
  checks?: OutputCheck[];
  /** 학습자가 순서대로 따라 할 수 있는 선택형 안내입니다. */
  steps?: string[];
  /** 출력창에서 무엇을 확인하면 통과인지 알려 주는 문장입니다. */
  successCriteria?: string[];
  /** 자주 생기는 오답을 미리 피하도록 돕는 문장입니다. */
  commonMistakes?: string[];
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
  completion: CompletionMode;
  summary: string;
  objectives: string[];
  concepts: ConceptBlock[];
  starterCode?: string;
  expectedOutput?: string;
  challenge?: Challenge;
  glossary: GlossaryItem[];
  resources?: ResourceLink[];
}

export interface ResourceLink {
  label: string;
  href: string;
  note?: string;
}

export interface Chapter {
  number: number;
  title: string;
  lessons: Lesson[];
}
