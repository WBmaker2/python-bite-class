export type LessonId = `chapter-${number}-${number}`;
export type CompletionMode = 'read' | 'run' | 'challenge' | 'optional';

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
  /** 도전의 핵심 흐름을 지키는지 확인하는 선택형 정규식입니다. */
  sourcePatterns?: string[];
  /** 학습자가 순서대로 따라 할 수 있는 선택형 안내입니다. */
  steps?: string[];
  /** 출력창에서 무엇을 확인하면 통과인지 알려 주는 문장입니다. */
  successCriteria?: string[];
  /** 자주 생기는 오답을 미리 피하도록 돕는 문장입니다. */
  commonMistakes?: string[];
  /** 실행 결과가 코드의 실제 자료와 맞는지 확인하는 제한된 검증 종류입니다. */
  runtimeCheck?: 'time' | 'allowance' | 'snack' | 'supplies' | 'reading' | 'price';
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
