import type { LessonId } from '../content/types';

export type StoredProgress = { completed: LessonId[]; codeByLesson: Record<string, string> };

/** 통합된 소단원의 예전 기록을 살아남은 소단원으로 연결합니다. */
export const lessonRedirects: Record<string, LessonId> = {
  'chapter-2-4': 'chapter-2-3',
  'chapter-3-4': 'chapter-3-3',
  'chapter-4-3': 'chapter-4-5',
  'chapter-10-9': 'chapter-10-4',
};

export function migrateLessonId(id: string): LessonId | string {
  return lessonRedirects[id] ?? id;
}

export function migrateProgress(value: unknown): StoredProgress {
  if (!value || typeof value !== 'object') return { completed: [], codeByLesson: {} };
  const candidate = value as { completed?: unknown; codeByLesson?: unknown };
  const completed = Array.isArray(candidate.completed)
    ? candidate.completed.filter((id): id is LessonId => typeof id === 'string').map((id) => migrateLessonId(id) as LessonId)
    : [];
  const sourceCode = candidate.codeByLesson && typeof candidate.codeByLesson === 'object' ? candidate.codeByLesson as Record<string, unknown> : {};
  const codeByLesson: Record<string, string> = {};
  Object.entries(sourceCode).forEach(([id, code]) => { if (typeof code === 'string') codeByLesson[id] = code; });
  return { completed: [...new Set(completed)], codeByLesson };
}
