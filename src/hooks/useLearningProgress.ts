import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LessonId } from '../content/types';
import { migrateProgress, type StoredProgress } from './progressMigration';

const STORAGE_KEY = 'python-bite-class-progress-v3';
const LEGACY_STORAGE_KEY = 'python-bite-class-progress-v2';
const LEGACY_V1_STORAGE_KEY = 'python-bite-class-progress-v1';
const ARCHIVE_KEY = 'python-bite-class-progress-chapter11-v1';
type Progress = StoredProgress;
const initial: Progress = { completed: [], codeByLesson: {} };

function load(): Progress {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (current) return migrateProgress(current);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) ?? localStorage.getItem(LEGACY_V1_STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (!legacy) return initial;
    const oldCompleted = Array.isArray(legacy.completed) ? legacy.completed : [];
    const oldCode = legacy.codeByLesson ?? {};
    const chapter11Ids = oldCompleted.filter((id) => String(id).startsWith('chapter-11-'));
    const chapter11Code = Object.fromEntries(Object.entries(oldCode).filter(([id]) => id.startsWith('chapter-11-')));
    if (chapter11Ids.length || Object.keys(chapter11Code).length) localStorage.setItem(ARCHIVE_KEY, JSON.stringify({ completed: chapter11Ids, codeByLesson: chapter11Code, archivedAt: new Date().toISOString() }));
    const migrated = migrateProgress({ completed: oldCompleted.filter((id) => !String(id).startsWith('chapter-11-')), codeByLesson: Object.fromEntries(Object.entries(oldCode).filter(([id]) => !id.startsWith('chapter-11-'))) });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    return migrated;
  } catch { return initial; }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<Progress>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  const completed = useMemo(() => new Set(progress.completed), [progress.completed]);
  const markComplete = useCallback((id: LessonId) => setProgress((current) => current.completed.includes(id) ? current : ({ ...current, completed: [...current.completed, id] })), []);
  const saveCode = useCallback((id: LessonId, code: string) => setProgress((current) => ({ ...current, codeByLesson: { ...current.codeByLesson, [id]: code } })), []);
  const resetProgress = useCallback(() => setProgress(initial), []);
  return { progress, completed, markComplete, saveCode, resetProgress };
}
