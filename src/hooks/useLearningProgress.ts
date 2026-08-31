import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LessonId } from '../content/types';

const STORAGE_KEY = 'python-bite-class-progress-v2';
const LEGACY_STORAGE_KEY = 'python-bite-class-progress-v1';
type Progress = { completed: LessonId[]; codeByLesson: Record<string, string> };
const initial: Progress = { completed: [], codeByLesson: {} };

function load(): Progress {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (current) return { completed: Array.isArray(current.completed) ? current.completed : [], codeByLesson: current.codeByLesson ?? {} };
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (!legacy) return initial;
    const migrated = { completed: Array.isArray(legacy.completed) ? legacy.completed : [], codeByLesson: legacy.codeByLesson ?? {} };
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
