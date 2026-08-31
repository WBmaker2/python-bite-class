import { describe, expect, it } from 'vitest';
import { lessons } from './chapters';

describe('lesson content', () => {
  it('covers chapters 2 through 11 with required fields', () => {
    expect(lessons.map((lesson) => lesson.chapter)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    lessons.forEach((lesson) => { expect(lesson.objectives.length).toBeGreaterThan(0); expect(lesson.starterCode.length).toBeGreaterThan(0); expect(lesson.challenge.prompt).toBeTruthy(); });
  });
});
