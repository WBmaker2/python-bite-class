import { describe, expect, it } from 'vitest';
import { chapters, getChapterLessonCount, getChapterProgress, getCompletedLessonCount, getRequiredLessonCount, isLessonUnlocked, lessons } from './chapters';

describe('lesson content', () => {
  it('covers chapters 1 through 11 with hierarchical steps', () => {
    expect(chapters.map((chapter) => chapter.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
    expect(lessons.length).toBeGreaterThan(50);
    lessons.forEach((lesson) => { expect(lesson.objectives.length).toBeGreaterThan(0); if (lesson.completion === 'run' || lesson.completion === 'challenge') { expect(lesson.starterCode).toBeTruthy(); } if (lesson.completion === 'challenge') { expect(lesson.challenge?.prompt).toBeTruthy(); } });
  });

  it('includes attribution and license links in the introduction chapter', () => {
    const attribution = chapters[0].lessons.find((lesson) => lesson.id === 'chapter-1-3');
    expect(attribution?.resources?.map((resource) => resource.href)).toEqual([
      'https://python.swaroopch.com',
      'https://byteofpython-korean.sourceforge.net/byte_of_python.html',
      'https://creativecommons.org/licenses/by-sa/4.0/deed.ko',
    ]);
  });

  it('keeps the 9.3 module-name note non-blocking and free of runtime setup code', () => {
    const lesson = lessons.find((candidate) => candidate.id === 'chapter-9-3');
    const studentText = [lesson?.title, lesson?.summary, ...(lesson?.concepts ?? []).flatMap((concept) => [concept.title ?? '', concept.body, concept.code ?? '']), ...(lesson?.glossary ?? []).flatMap((item) => [item.term, item.definition])].join(' ');
    expect(lesson?.completion).toBe('optional');
    expect(lesson?.challenge).toBeUndefined();
    expect(lesson?.starterCode).toBeUndefined();
    expect(studentText).not.toContain('__main__');
    expect(studentText).not.toMatch(/__name__\s*=\s*["']__main__["']/);
  });

  it('lets learners skip the optional 9.3 note without blocking 9.4', () => {
    const completedBeforeNote = new Set(['chapter-9-2']);
    const noteIndex = lessons.findIndex((lesson) => lesson.id === 'chapter-9-3');
    const nextIndex = lessons.findIndex((lesson) => lesson.id === 'chapter-9-4');
    expect(isLessonUnlocked(noteIndex, completedBeforeNote)).toBe(true);
    expect(isLessonUnlocked(nextIndex, completedBeforeNote)).toBe(true);
  });

  it('excludes an unread optional note from required progress totals', () => {
    const chapter = chapters.find((candidate) => candidate.number === 9);
    const completedChapterLessons = new Set(chapter?.lessons.filter((lesson) => lesson.id !== 'chapter-9-3').map((lesson) => lesson.id));
    expect(chapter).toBeDefined();
    expect(getChapterProgress(chapter!, completedChapterLessons)).toBe(getChapterLessonCount(chapter!));
    expect(getCompletedLessonCount(completedChapterLessons)).toBe(completedChapterLessons.size);
    expect(getRequiredLessonCount()).toBe(lessons.length - 1);
  });
});
