import type { Challenge, CompletionMode, ConceptBlock, GlossaryItem, Lesson, ResourceLink } from './types';

const defaultConcepts = (title: string, summary: string): ConceptBlock[] => [
  { type: 'explanation', title, body: summary },
  { type: 'tip', title: '작게 확인하기', body: '한 번에 많이 바꾸지 말고 한 줄을 고친 뒤 실행 결과를 관찰해 보세요.' },
];

const defaultGlossary = (title: string): GlossaryItem[] => [{ term: title, definition: '이번 소단원에서 새로 만나는 파이썬 개념' }];

export function makeLesson(
  chapter: number,
  order: number,
  title: string,
  summary: string,
  completion: CompletionMode = 'challenge',
  starterCode?: string,
  expectedOutput?: string,
  challenge?: Challenge,
  concepts = defaultConcepts(title, summary),
  glossary = defaultGlossary(title),
  resources?: ResourceLink[],
): Lesson {
  return {
    id: `chapter-${chapter}-${order}` as Lesson['id'], chapter, order, title, summary, completion,
    objectives: completion === 'read' ? ['설명을 읽고 핵심 생각을 한 문장으로 정리할 수 있어요.'] : ['예제 코드를 실행하고 결과를 관찰할 수 있어요.', '한 줄을 바꾸어 나만의 결과를 만들 수 있어요.'],
    concepts, starterCode, expectedOutput, challenge, glossary, resources,
  };
}

export function chapter(number: number, title: string, lessons: Lesson[]) {
  return { number, title, lessons };
}
