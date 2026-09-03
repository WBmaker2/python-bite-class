import type { Challenge, CompletionMode, ConceptBlock, GlossaryItem, Lesson, ResourceLink } from './types';
import { getLessonGuide } from './lessonGuides';

const defaultConcepts = (title: string, summary: string): ConceptBlock[] => [
  { type: 'explanation', title, body: summary },
  { type: 'tip', title: '작게 확인하기', body: '한 번에 많이 바꾸지 말고 한 줄을 고친 뒤 실행 결과를 관찰해 보세요.' },
];

const defaultGlossary = (title: string): GlossaryItem[] => [{ term: title, definition: '이번 소단원에서 새로 만나는 파이썬 개념' }];

const chapterPracticeFocus: Record<number, string> = {
  2: '파이썬이 어떤 일을 하는지',
  3: '브라우저 실험실의 실행 흐름을',
  4: '코드를 위에서 아래로 읽는 방법을',
  5: '값과 이름을 코드로 표현하는 방법을',
  6: '숫자와 연산자가 만드는 계산을',
  7: '조건과 반복이 바꾸는 실행 흐름을',
  8: '함수가 입력을 받아 결과를 돌려주는 과정을',
  9: '모듈에서 필요한 도구를 꺼내 쓰는 방법을',
  10: '자료를 알맞은 상자에 담고 꺼내는 방법을',
  11: '작은 문제를 단계별 프로그램으로 바꾸는 과정을',
};

const chapterLifeExample: Record<number, string> = {
  2: '게임 점수나 알림처럼 반복되는 일을 컴퓨터에게 맡기는 상황을 떠올려요.',
  3: '실험 노트에서 실행한 방법과 결과를 나란히 기록하는 것처럼 확인해요.',
  4: '레시피를 위에서 아래로 따라 읽고 한 재료만 바꾸는 것처럼 연습해요.',
  5: '이름표가 붙은 준비물 상자에 글자와 숫자를 담는 것처럼 생각해요.',
  6: '간식값과 남은 용돈을 계산하는 것처럼 숫자의 변화를 확인해요.',
  7: '비가 오면 우산을 챙기고 같은 준비를 반복하는 것처럼 조건과 반복을 살펴봐요.',
  8: '자판기에서 돈과 상품을 넣으면 결과가 나오는 것처럼 함수의 입출력을 읽어요.',
  9: '필요한 계산 도구만 공구함에서 꺼내 쓰는 것처럼 모듈을 사용해요.',
  10: '색깔별 바구니에 물건을 담고 이름표로 찾는 것처럼 자료를 정리해요.',
  11: '축제 준비물 목록을 확인하고 부족한 물건을 알려 주는 상황으로 연결해요.',
};

const firstMeaningfulLine = (code: string) => code.split(/\r?\n/).map((line) => line.trim()).find((line) => line && !line.startsWith('#')) ?? code.trim();

function makePracticeExample(chapterNumber: number, title: string, summary: string, starterCode: string, expectedOutput: string | undefined, challenge: Challenge | undefined, guideCode?: string): ConceptBlock {
  const focus = chapterPracticeFocus[chapterNumber] ?? '이번 소단원의 핵심 개념을';
  const lifeExample = chapterLifeExample[chapterNumber] ?? '주변에서 같은 규칙을 찾아 코드와 연결해요.';
  const keyLine = firstMeaningfulLine(starterCode);
  const output = expectedOutput ? `예상 결과는 다음과 같아요:\n${expectedOutput}` : '예상 결과는 실행한 뒤 출력창에서 확인해요.';
  return {
    type: 'example',
    title: '예제로 따라 하기',
    body: `${focus} 살펴봅니다. 핵심 줄(${keyLine})을 실행하면 ${focus} 확인할 수 있어요.\n생활 예시 → ${lifeExample}\n\n예상 → ${output}\n실행 → 코드 실행 버튼을 눌러요.\n관찰 → 출력창에서 이 줄이 만든 값과 줄 수를 예상과 비교해요.\n${challenge ? `도전에서 바꿀 대상 → ${challenge.prompt}` : `따라 하기 → ${title}의 핵심 줄을 한 번 실행해요.`}`,
    code: guideCode ?? starterCode,
  };
}

const practiceLoop = (expectedOutput: string | undefined, chapterNumber: number, challenge: Challenge | undefined) => `생활 예시 → ${chapterLifeExample[chapterNumber] ?? '주변에서 같은 규칙을 찾아 코드와 연결해요.'}\n예상 → ${expectedOutput ? `출력창에 다음 결과가 보여요:\n${expectedOutput}` : '실행한 뒤 출력창에서 결과를 확인해요.'}\n실행 → 코드 실행 버튼을 눌러요.\n관찰 → 출력 줄과 값을 예상과 비교해요.\n${challenge ? `도전에서 바꿀 대상 → ${challenge.prompt}` : '따라 하기 → 핵심 줄을 한 번 실행해요.'}`;

const checkCriterion = (check: NonNullable<Challenge['checks']>[number]) => {
  if (check.mode === 'equals') return `출력창이 ${JSON.stringify(check.value)}와 같아요.`;
  if (check.mode === 'contains') return `출력창에 ${JSON.stringify(check.value)}가 보여요.`;
  if (check.mode === 'appended') return '처음 결과를 유지하면서 새 항목이 한 줄 이상 더 보여요.';
  if (check.mode === 'changed') return '시작 코드와 다른 결과가 나오고, 바꾼 부분이 반영됐어요.';
  return '출력창이 안내된 패턴과 맞아요.';
};

function addChallengeGuidance(chapterNumber: number, title: string, challenge: Challenge): Challenge {
  const checks = challenge.checks ?? [];
  return {
    ...challenge,
    steps: challenge.steps ?? [
      '시작 코드를 먼저 실행해 현재 결과를 확인해요.',
      `${title}에서 바꾸라는 값이나 줄을 한 곳만 고쳐요.`,
      '다시 실행하고 출력창에서 통과 기준을 확인해요.',
    ],
    successCriteria: challenge.successCriteria ?? checks.map(checkCriterion),
    commonMistakes: challenge.commonMistakes ?? [
      '코드 전체를 지우지 말고 안내된 값이나 한 줄만 바꿔요.',
      chapterNumber === 7 ? '조건의 콜론(:)과 들여쓰기를 그대로 두고 비교 숫자만 살펴봐요.' : '괄호·따옴표·들여쓰기가 시작 코드와 같은지 비교해요.',
      '실행한 뒤 결과가 다르면 힌트에서 수정할 위치를 다시 확인해요.',
    ],
  };
}

export function makeLesson(
  chapter: number,
  order: number,
  title: string,
  summary: string,
  completion: CompletionMode = 'challenge',
  starterCode?: string,
  expectedOutput?: string,
  challenge?: Challenge,
  concepts?: ConceptBlock[],
  glossary?: GlossaryItem[],
  resources?: ResourceLink[],
): Lesson {
  const lessonGuide = getLessonGuide(chapter, order);
  const resolvedConcepts = concepts ?? lessonGuide?.concepts ?? defaultConcepts(title, summary);
  const conceptsWithExample = completion !== 'read' && starterCode
    ? resolvedConcepts.some((concept) => concept.type === 'example')
      ? resolvedConcepts.map((concept) => concept.type === 'example' && !/예상|실행|관찰/.test(concept.body) ? { ...concept, body: `${concept.body}\n\n${practiceLoop(expectedOutput, chapter, challenge)}` } : concept)
      : [...resolvedConcepts, makePracticeExample(chapter, title, summary, starterCode, expectedOutput, challenge, lessonGuide?.exampleCode)]
    : resolvedConcepts;
  const resolvedChallenge = challenge ? addChallengeGuidance(chapter, title, challenge) : undefined;
  return {
    id: `chapter-${chapter}-${order}` as Lesson['id'], chapter, order, title, summary, completion,
    objectives: lessonGuide?.objectives ?? (completion === 'read' ? ['설명을 읽고 핵심 생각을 한 문장으로 정리할 수 있어요.'] : ['예제 코드를 실행하고 결과를 관찰할 수 있어요.', '한 줄을 바꾸어 나만의 결과를 만들 수 있어요.']),
    concepts: conceptsWithExample, starterCode, expectedOutput, challenge: resolvedChallenge, glossary: glossary ?? lessonGuide?.glossary ?? defaultGlossary(title), resources,
  };
}

export function chapter(number: number, title: string, lessons: Lesson[]) {
  return { number, title, lessons };
}
