import { describe, expect, it } from 'vitest';
import { lessons } from './chapters';

const challenge = (id: string) => {
  const lesson = lessons.find((candidate) => candidate.id === id);
  expect(lesson?.completion).toBe('challenge');
  return lesson?.challenge?.checks ?? [];
};

describe('challenge answer audit', () => {
  it('defines a checker for every challenge in chapters 2 through 11', () => {
    const auditedLessons = lessons.filter((lesson) => lesson.chapter >= 2 && lesson.challenge);
    expect(auditedLessons.length).toBeGreaterThan(40);
    auditedLessons.forEach((lesson) => expect(lesson.challenge?.checks?.length, lesson.id).toBeGreaterThan(0));
  });

  it('gives every challenge a student-facing path, criteria, and recovery tips', () => {
    lessons.filter((lesson) => lesson.chapter >= 2 && lesson.challenge).forEach((lesson) => {
      const current = lesson.challenge;
      expect(current?.steps?.length, `${lesson.id}:steps`).toBeGreaterThanOrEqual(2);
      expect(current?.successCriteria?.length, `${lesson.id}:successCriteria`).toBeGreaterThan(0);
      expect(current?.commonMistakes?.length, `${lesson.id}:commonMistakes`).toBeGreaterThan(0);
      current?.steps?.forEach((step) => expect(step.length, `${lesson.id}:step`).toBeGreaterThan(8));
      current?.successCriteria?.forEach((criterion) => expect(criterion.length, `${lesson.id}:criterion`).toBeGreaterThan(8));
      current?.commonMistakes?.forEach((mistake) => expect(mistake.length, `${lesson.id}:mistake`).toBeGreaterThan(8));
    });
  });

  it('uses change or append checks for free-choice and collection additions', () => {
    const changedIds = ['chapter-2-2', 'chapter-3-3', 'chapter-4-4', 'chapter-4-5', 'chapter-5-2', 'chapter-5-3', 'chapter-5-5', 'chapter-5-7', 'chapter-5-8', 'chapter-6-1', 'chapter-6-2', 'chapter-8-2', 'chapter-8-7', 'chapter-8-8', 'chapter-9-1', 'chapter-9-2', 'chapter-9-7', 'chapter-10-1', 'chapter-10-3', 'chapter-10-8', 'chapter-11-1', 'chapter-11-2', 'chapter-11-3', 'chapter-11-5', 'chapter-11-6'];
    changedIds.forEach((id) => expect(challenge(id).some((check) => check.mode === 'changed'), id).toBe(true));

    const appendedIds = ['chapter-2-3', 'chapter-10-4', 'chapter-10-5'];
    appendedIds.forEach((id) => expect(challenge(id).some((check) => check.mode === 'appended'), id).toBe(true));
  });

  it('anchors every chapter 11 changed challenge to runtime evidence', () => {
    lessons.filter((lesson) => lesson.chapter === 11 && lesson.challenge?.checks?.some((check) => check.mode === 'changed')).forEach((lesson) => {
      expect(lesson.challenge?.runtimeCheck, `${lesson.id}:runtimeCheck`).toBeTruthy();
    });
  });

  it('keeps exact checks only for explicit target results', () => {
    const quotient = lessons.find((lesson) => lesson.id === 'chapter-6-1');
    expect(quotient?.starterCode).toContain('a // b');
    expect(quotient?.expectedOutput).toBe('3\n2');
    expect(challenge('chapter-6-3')).toEqual([{ mode: 'equals', value: '20', feedback: '괄호로 계산 순서를 바꿨어요.' }]);
    expect(challenge('chapter-7-3')[0].value).toBe('1\n2\n3\n4\n5\n6\n7\n8\n9\n10');
    expect(challenge('chapter-7-6')).toEqual([{ mode: 'equals', value: '3\n6\n9\n12\n15\n18\n21\n24\n27\n30', feedback: '조건과 반복으로 여러 값을 골랐어요.' }]);
    expect(lessons.find((lesson) => lesson.id === 'chapter-8-6')?.completion).toBe('optional');
    expect(challenge('chapter-8-8').some((check) => check.mode === 'equals')).toBe(false);
  });

  it('provides an else branch for the different-message if challenge', () => {
    const lesson = lessons.find((candidate) => candidate.id === 'chapter-7-1');
    expect(lesson?.starterCode).toContain('else:');
    expect(lesson?.starterCode).toContain('시원해요');
    expect(challenge('chapter-7-1')).toEqual([{ mode: 'changed', value: '', feedback: 'if와 else 조건에 따라 다른 메시지를 확인했어요.' }]);
  });

  it('explains sqrt and fabs in the first module lesson', () => {
    const lesson = lessons.find((candidate) => candidate.id === 'chapter-9-1');
    const lessonText = [lesson?.summary, ...(lesson?.concepts ?? []).flatMap((concept) => [concept.title ?? '', concept.body, concept.code ?? '']), ...(lesson?.glossary ?? []).flatMap((item) => [item.term, item.definition])].join(' ');
    expect(lessonText).toContain('math.sqrt(x)');
    expect(lessonText).toContain('제곱근');
    expect(lessonText).toContain('math.fabs(x)');
    expect(lessonText).toContain('절대값');
    expect(lesson?.challenge?.hint).toContain('math.fabs(-3.5)');
    expect(lesson?.expectedOutput).toBe('5.0\n3.5');
    expect(lesson?.starterCode).toContain('print(math.fabs(-3.5))');
  });

  it('keeps collection additions observable in the output', () => {
    const dictionary = lessons.find((lesson) => lesson.id === 'chapter-10-4');
    expect(dictionary?.starterCode).toContain('scores.items()');
    expect(dictionary?.expectedOutput).toBe('수학 90\n과학 85');

    expect(challenge('chapter-11-4')).toEqual([{ mode: 'changed', value: '', feedback: '새 준비물까지 목록과 개수를 확인했어요.' }]);
  });

  it('defines the six real-life runtime challenges', () => {
    ['chapter-11-1', 'chapter-11-2', 'chapter-11-3', 'chapter-11-4', 'chapter-11-5', 'chapter-11-6'].forEach((id) => {
      expect(lessons.find((lesson) => lesson.id === id)?.challenge?.runtimeCheck, id).toBeTruthy();
    });
  });
});
