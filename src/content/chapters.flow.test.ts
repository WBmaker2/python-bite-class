import { describe, expect, it } from 'vitest';
import { getNextRequiredLessonIndex, getPreviousRequiredLessonIndex, isLessonUnlocked, lessons } from './chapters';

describe('lesson flow', () => {
  it('skips optional lessons when moving between required lessons', () => {
    lessons.forEach((lesson, index) => {
      if (lesson.completion !== 'optional') return;
      const next = getNextRequiredLessonIndex(index);
      const previous = getPreviousRequiredLessonIndex(index);
      if (next >= 0) expect(lessons[next].completion).not.toBe('optional');
      if (previous >= 0) expect(lessons[previous].completion).not.toBe('optional');
    });
  });

  it('lets the next required lesson open without completing an optional note', () => {
    const optionalIndex = lessons.findIndex((lesson) => lesson.completion === 'optional');
    expect(optionalIndex).toBeGreaterThan(0);
    const next = getNextRequiredLessonIndex(optionalIndex);
    expect(next).toBeGreaterThan(optionalIndex);
    expect(isLessonUnlocked(next, new Set([lessons[getPreviousRequiredLessonIndex(next)].id]))).toBe(true);
  });
});
