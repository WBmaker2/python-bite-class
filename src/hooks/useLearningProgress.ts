import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LessonId } from '../content/types';

const STORAGE_KEY = 'python-bite-class-progress-v1';
type Progress = { completed: LessonId[]; codeByLesson: Record<string, string> };
const initial: Progress = { completed: [], codeByLesson: {} };

function load(): Progress {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<Progress> | null;
    if (!parsed) return initial;
    return { completed: Array.isArray(parsed.completed) ? parsed.completed : [], codeByLesson: parsed.codeByLesson ?? {} };
  } catch { return initial; }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<Progress>(load);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }, [progress]);
  const completed = useMemo(() => new Set(progress.completed), [progress.completed]);
  const toggleComplete = useCallback((id: LessonId) => setProgress((current) => ({ ...current, completed: current.completed.includes(id) ? current.completed.filter((item) => item !== id) : [...current.completed, id] })), []);
  const saveCode = useCallback((id: LessonId, code: string) => setProgress((current) => ({ ...current, codeByLesson: { ...current.codeByLesson, [id]: code } })), []);
  const resetProgress = useCallback(() => setProgress(initial), []);
  return { progress, completed, toggleComplete, saveCode, resetProgress };
}
