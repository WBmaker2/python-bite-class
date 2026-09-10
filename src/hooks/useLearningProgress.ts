import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LessonId } from '../content/types';
import { lessons } from '../content/chapters';
import { migrateLessonId, migrateProgress, type ExecutionEvidence, type StoredProgress } from './progressMigration';

export const PROFILE_STORAGE_KEY = 'python-bite-class-student-profiles-v1';
export const LEGACY_STORAGE_KEYS = ['python-bite-class-progress-v3', 'python-bite-class-progress-v2', 'python-bite-class-progress-v1'] as const;
export const CURRENT_LESSON_KEYS = ['python-bite-class-current-v3', 'python-bite-class-current-v2', 'python-bite-class-current-v1'] as const;
export const CHAPTER11_ARCHIVE_KEY = 'python-bite-class-progress-chapter11-v1';
/** Shared with submission recovery so removing a local profile also removes its pending receipt. */
export const PENDING_SUBMISSION_STORAGE_PREFIX = 'python-bite-class-pending-submission-v1:';

const GUEST_ID = 'guest';
const EMPTY_PROGRESS: StoredProgress = { completed: [], codeByLesson: {}, executionByLesson: {} };

export interface StudentProfile {
  id: string;
  school: string;
  name: string;
  createdAt: string;
  progress: StoredProgress;
  currentLessonId?: LessonId;
}

export interface StoredProfiles { activeProfileId: string; profiles: Record<string, StudentProfile>; }

function emptyProgress(): StoredProgress { return { completed: [], codeByLesson: {}, executionByLesson: {} }; }
function emptyProfile(id = GUEST_ID): StudentProfile { return { id, school: '', name: '', createdAt: new Date().toISOString(), progress: emptyProgress() }; }
function profileId() { return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `profile-${Date.now()}-${Math.random().toString(36).slice(2)}`; }

function validLessonId(value: unknown): LessonId | undefined {
  if (typeof value !== 'string') return undefined;
  const migrated = migrateLessonId(value);
  return lessons.some((lesson) => lesson.id === migrated) ? migrated as LessonId : undefined;
}
function hasWork(progress: StoredProgress): boolean { return progress.completed.length > 0 || Object.keys(progress.codeByLesson).length > 0 || Object.keys(progress.executionByLesson).length > 0; }

function archiveChapter11(value: unknown): void {
  if (!value || typeof value !== 'object') return;
  const candidate = value as { completed?: unknown; codeByLesson?: unknown; executionByLesson?: unknown };
  const completed = Array.isArray(candidate.completed) ? candidate.completed.filter((id) => String(id).startsWith('chapter-11-')) : [];
  const codes = candidate.codeByLesson && typeof candidate.codeByLesson === 'object' ? Object.fromEntries(Object.entries(candidate.codeByLesson as Record<string, unknown>).filter(([id]) => id.startsWith('chapter-11-'))) : {};
  const evidence = candidate.executionByLesson && typeof candidate.executionByLesson === 'object' ? Object.fromEntries(Object.entries(candidate.executionByLesson as Record<string, unknown>).filter(([id]) => id.startsWith('chapter-11-'))) : {};
  if (completed.length || Object.keys(codes).length || Object.keys(evidence).length) localStorage.setItem(CHAPTER11_ARCHIVE_KEY, JSON.stringify({ completed, codeByLesson: codes, executionByLesson: evidence, archivedAt: new Date().toISOString() }));
}

function migrateLegacy(value: unknown, preserveChapter11: boolean): StoredProgress {
  if (!preserveChapter11) archiveChapter11(value);
  const migrated = migrateProgress(value);
  if (preserveChapter11) return migrated;
  return migrateProgress({ ...migrated, completed: migrated.completed.filter((id) => !String(id).startsWith('chapter-11-')), codeByLesson: Object.fromEntries(Object.entries(migrated.codeByLesson).filter(([id]) => !id.startsWith('chapter-11-'))), executionByLesson: Object.fromEntries(Object.entries(migrated.executionByLesson).filter(([id]) => !id.startsWith('chapter-11-'))) });
}

function parseProfile(id: string, value: unknown): StudentProfile | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.id !== 'string' || candidate.id !== id || typeof candidate.school !== 'string' || typeof candidate.name !== 'string') return undefined;
  return { id, school: candidate.school.trim(), name: candidate.name.trim(), createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString(), progress: migrateProgress(candidate.progress), currentLessonId: validLessonId(candidate.currentLessonId) };
}

export function loadLearningState(): StoredProfiles {
  try {
    const stored = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? 'null') as Partial<StoredProfiles> | null;
    if (stored?.profiles && typeof stored.profiles === 'object') {
      const profiles = Object.fromEntries(Object.entries(stored.profiles).map(([id, value]) => [id, parseProfile(id, value)]).filter((entry): entry is [string, StudentProfile] => Boolean(entry[1])));
      if (!profiles[GUEST_ID]) profiles[GUEST_ID] = emptyProfile();
      const activeProfileId = typeof stored.activeProfileId === 'string' && profiles[stored.activeProfileId] ? stored.activeProfileId : GUEST_ID;
      return { activeProfileId, profiles };
    }
    let legacy: unknown = null;
    let legacyKey: typeof LEGACY_STORAGE_KEYS[number] | undefined;
    for (const key of LEGACY_STORAGE_KEYS) { const raw = localStorage.getItem(key); if (raw) { legacy = JSON.parse(raw); legacyKey = key; break; } }
    const guest = emptyProfile();
    if (legacy) guest.progress = migrateLegacy(legacy, legacyKey === 'python-bite-class-progress-v3');
    const currentKey = CURRENT_LESSON_KEYS.find((key) => localStorage.getItem(key));
    guest.currentLessonId = validLessonId(currentKey ? localStorage.getItem(currentKey) : undefined);
    return { activeProfileId: GUEST_ID, profiles: { [GUEST_ID]: guest } };
  } catch { return { activeProfileId: GUEST_ID, profiles: { [GUEST_ID]: emptyProfile() } }; }
}

function clearPendingSubmission(profileIdToClear: string): void { try { localStorage.removeItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${profileIdToClear}`); } catch { /* storage may be unavailable during SSR */ } }

export function useLearningProgress() {
  const [state, setState] = useState<StoredProfiles>(loadLearningState);
  const activeProfile = state.profiles[state.activeProfileId] ?? state.profiles[GUEST_ID];
  const progress = activeProfile?.progress ?? EMPTY_PROGRESS;
  const completed = useMemo(() => new Set(progress.completed), [progress.completed]);
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state));
      for (const key of LEGACY_STORAGE_KEYS) localStorage.removeItem(key);
    } catch { /* keep legacy data if the new profile snapshot could not be persisted */ }
  }, [state]);

  const updateProgress = useCallback((updater: (current: StoredProgress) => StoredProgress) => setState((current) => {
    const profile = current.profiles[current.activeProfileId] ?? current.profiles[GUEST_ID] ?? emptyProfile();
    return { ...current, profiles: { ...current.profiles, [profile.id]: { ...profile, progress: migrateProgress(updater(profile.progress)) } } };
  }), []);
  const markComplete = useCallback((id: LessonId) => updateProgress((current) => current.completed.includes(id) ? current : ({ ...current, completed: [...current.completed, id] })), [updateProgress]);
  const saveCode = useCallback((id: LessonId, code: string) => updateProgress((current) => ({ ...current, codeByLesson: { ...current.codeByLesson, [id]: code } })), [updateProgress]);
  const saveExecutionEvidence = useCallback((id: LessonId, evidence: ExecutionEvidence) => updateProgress((current) => ({ ...current, executionByLesson: { ...current.executionByLesson, [id]: { ...current.executionByLesson[id], ...evidence } } })), [updateProgress]);
  const resetProgress = useCallback(() => updateProgress(() => emptyProgress()), [updateProgress]);
  const setCurrentLessonId = useCallback((id: LessonId) => setState((current) => { const profile = current.profiles[current.activeProfileId] ?? current.profiles[GUEST_ID] ?? emptyProfile(); return { ...current, profiles: { ...current.profiles, [profile.id]: { ...profile, currentLessonId: id } } }; }), []);
  const createProfile = useCallback((school: string, name: string, adoptGuest = false) => {
    const id = profileId();
    setState((current) => {
      const guest = current.profiles[GUEST_ID] ?? emptyProfile();
      const profiles = {
        ...current.profiles,
        [GUEST_ID]: adoptGuest ? { ...guest, school: '', name: '', progress: emptyProgress(), currentLessonId: undefined } : guest,
        [id]: { id, school: school.trim(), name: name.trim(), createdAt: new Date().toISOString(), progress: adoptGuest ? guest.progress : emptyProgress(), currentLessonId: adoptGuest ? guest.currentLessonId : undefined },
      };
      return { activeProfileId: id, profiles };
    });
    return id;
  }, []);
  const updateProfile = useCallback((school: string, name: string) => setState((current) => { const profile = current.profiles[current.activeProfileId] ?? current.profiles[GUEST_ID] ?? emptyProfile(); return { ...current, profiles: { ...current.profiles, [profile.id]: { ...profile, school: school.trim(), name: name.trim() } } }; }), []);
  const switchProfile = useCallback((id: string) => setState((current) => current.profiles[id] ? ({ ...current, activeProfileId: id }) : current), []);
  const logout = useCallback(() => setState((current) => ({ ...current, activeProfileId: GUEST_ID, profiles: { ...current.profiles, [GUEST_ID]: current.profiles[GUEST_ID] ?? emptyProfile() } })), []);
  const clearProfile = useCallback(() => setState((current) => { const currentId = current.activeProfileId; clearPendingSubmission(currentId); const profiles = { ...current.profiles }; if (currentId !== GUEST_ID) delete profiles[currentId]; profiles[GUEST_ID] = emptyProfile(); for (const key of [...LEGACY_STORAGE_KEYS, ...CURRENT_LESSON_KEYS]) { try { localStorage.removeItem(key); } catch { /* ignore unavailable storage */ } } return { activeProfileId: GUEST_ID, profiles }; }), []);

  return { progress, completed, activeProfile, profiles: Object.values(state.profiles), currentLessonId: activeProfile?.currentLessonId, markComplete, saveCode, saveExecutionEvidence, resetProgress, setCurrentLessonId, createProfile, updateProfile, switchProfile, logout, clearProfile, guestHasProgress: hasWork(state.profiles[GUEST_ID]?.progress ?? EMPTY_PROGRESS) };
}
