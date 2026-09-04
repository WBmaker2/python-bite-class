import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import { chapter6 } from './chapter6';
import { chapter7 } from './chapter7';
import { chapter8 } from './chapter8';
import { chapter9 } from './chapter9';
import { chapter10 } from './chapter10';
import { chapter11 } from './chapter11';
import type { Chapter } from './types';

export const chapters: Chapter[] = [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11];
export const lessons = chapters.flatMap((item) => item.lessons);
export const chapterNumbers = chapters.map((item) => item.number);
export const getLesson = (id: string) => lessons.find((lesson) => lesson.id === id) ?? lessons[0];
export const getChapter = (number: number) => chapters.find((item) => item.number === number) ?? chapters[0];

export function isLessonUnlocked(index: number, completed: ReadonlySet<string>) {
  if (index === 0) return true;
  for (let previousIndex = index - 1; previousIndex >= 0; previousIndex -= 1) {
    const previousLesson = lessons[previousIndex];
    if (previousLesson.completion !== 'optional') return completed.has(previousLesson.id);
  }
  return true;
}

export function getChapterProgress(chapter: Chapter, completed: ReadonlySet<string>) {
  return chapter.lessons.filter((lesson) => lesson.completion !== 'optional' && completed.has(lesson.id)).length;
}

export function getChapterLessonCount(chapter: Chapter) {
  return chapter.lessons.filter((lesson) => lesson.completion !== 'optional').length;
}

export function getCompletedLessonCount(completed: ReadonlySet<string>) {
  return lessons.filter((lesson) => lesson.completion !== 'optional' && completed.has(lesson.id)).length;
}

export function getRequiredLessonCount() {
  return lessons.filter((lesson) => lesson.completion !== 'optional').length;
}
