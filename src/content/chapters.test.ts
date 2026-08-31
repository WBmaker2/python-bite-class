import { describe, expect, it } from 'vitest';
import { chapters, lessons } from './chapters';

describe('lesson content', () => {
  it('covers chapters 1 through 11 with hierarchical steps', () => {
    expect(chapters.map((chapter) => chapter.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(lessons.length).toBeGreaterThan(50);
    lessons.forEach((lesson) => { expect(lesson.objectives.length).toBeGreaterThan(0); if (lesson.completion !== 'read') { expect(lesson.starterCode).toBeTruthy(); } if (lesson.completion === 'challenge') { expect(lesson.challenge?.prompt).toBeTruthy(); } });
  });

  it('includes attribution and license links in the introduction chapter', () => {
    const attribution = chapters[0].lessons.find((lesson) => lesson.id === 'chapter-1-3');
    expect(attribution?.resources?.map((resource) => resource.href)).toEqual([
      'https://python.swaroopch.com',
      'https://byteofpython-korean.sourceforge.net/byte_of_python.html',
      'https://creativecommons.org/licenses/by-sa/4.0/deed.ko',
    ]);
  });
});
