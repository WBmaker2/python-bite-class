import type { LessonId } from '../content/types';

export type ExecutionEvidence = {
  lastExecutedCode?: string;
  lastRunStatus?: 'done' | 'error' | 'stopped' | 'timeout';
  lastRunPassed?: boolean;
  lastRunAt?: string;
  lastSuccessCode?: string;
  lastSuccessAt?: string;
  outputSummary?: string;
};

export type StoredProgress = {
  completed: LessonId[];
  codeByLesson: Record<string, string>;
  executionByLesson: Record<string, ExecutionEvidence>;
};

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
  if (!value || typeof value !== 'object') return { completed: [], codeByLesson: {}, executionByLesson: {} };
  const candidate = value as { completed?: unknown; codeByLesson?: unknown; executionByLesson?: unknown };
  const completed = Array.isArray(candidate.completed)
    ? candidate.completed.filter((id): id is LessonId => typeof id === 'string').map((id) => migrateLessonId(id) as LessonId)
    : [];
  const sourceCode = candidate.codeByLesson && typeof candidate.codeByLesson === 'object' ? candidate.codeByLesson as Record<string, unknown> : {};
  const codeByLesson: Record<string, string> = {};
  Object.entries(sourceCode).forEach(([id, code]) => { if (typeof code === 'string') codeByLesson[id] = code; });
  const executionByLesson: Record<string, ExecutionEvidence> = {};
  if (candidate.executionByLesson && typeof candidate.executionByLesson === 'object') {
    Object.entries(candidate.executionByLesson as Record<string, unknown>).forEach(([id, value]) => {
      if (!value || typeof value !== 'object') return;
      const item = value as Record<string, unknown>;
      const evidence: ExecutionEvidence = {};
      if (typeof item.lastExecutedCode === 'string') evidence.lastExecutedCode = item.lastExecutedCode;
      if (item.lastRunStatus === 'done' || item.lastRunStatus === 'error' || item.lastRunStatus === 'stopped' || item.lastRunStatus === 'timeout') evidence.lastRunStatus = item.lastRunStatus;
      if (typeof item.lastRunPassed === 'boolean') evidence.lastRunPassed = item.lastRunPassed;
      if (typeof item.lastRunAt === 'string') evidence.lastRunAt = item.lastRunAt;
      if (typeof item.lastSuccessCode === 'string') evidence.lastSuccessCode = item.lastSuccessCode;
      if (typeof item.lastSuccessAt === 'string') evidence.lastSuccessAt = item.lastSuccessAt;
      if (typeof item.outputSummary === 'string') evidence.outputSummary = item.outputSummary;
      if (Object.keys(evidence).length) executionByLesson[id] = evidence;
    });
  }
  return { completed: [...new Set(completed)], codeByLesson, executionByLesson };
}
