import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CHAPTER11_ARCHIVE_KEY, CURRENT_LESSON_KEYS, LEGACY_STORAGE_KEYS, PENDING_SUBMISSION_STORAGE_PREFIX, PROFILE_STORAGE_KEY,
  useLearningProgress,
} from './useLearningProgress';

beforeEach(() => localStorage.clear());
afterEach(() => vi.restoreAllMocks());

describe('useLearningProgress profiles', () => {
  it('keeps chapter 11 from v3 while archiving and removing it from older progress', () => {
    localStorage.setItem('python-bite-class-progress-v3', JSON.stringify({ completed: ['chapter-11-1'], codeByLesson: { 'chapter-11-1': 'print(11)' } }));
    const v3 = renderHook(() => useLearningProgress()).result;
    expect(v3.current.progress.completed).toContain('chapter-11-1');
    localStorage.clear();
    localStorage.setItem('python-bite-class-progress-v2', JSON.stringify({ completed: ['chapter-11-1', 'chapter-1-1'], codeByLesson: { 'chapter-11-1': 'old', 'chapter-1-1': 'new' } }));
    const v2 = renderHook(() => useLearningProgress()).result;
    expect(v2.current.progress.completed).toEqual(['chapter-1-1']);
    expect(JSON.parse(localStorage.getItem(CHAPTER11_ARCHIVE_KEY) ?? '{}').codeByLesson['chapter-11-1']).toBe('old');
    expect(LEGACY_STORAGE_KEYS.every((key) => localStorage.getItem(key) === null)).toBe(true);
  });

  it('requires an explicit guest adoption choice and clears guest work only when moved', () => {
    localStorage.setItem('python-bite-class-progress-v3', JSON.stringify({ completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-1': 'print("guest")' } }));
    const { result } = renderHook(() => useLearningProgress());
    let adoptedId = '';
    act(() => { adoptedId = result.current.createProfile('학교 A', '학생 A', true); });
    expect(result.current.activeProfile?.id).toBe(adoptedId);
    expect(result.current.progress.codeByLesson['chapter-1-1']).toBe('print("guest")');
    act(() => { result.current.createProfile('학교 B', '학생 B', true); });
    expect(result.current.progress.completed).toEqual([]);
    expect(result.current.profiles.find((profile) => profile.id === 'guest')?.progress.completed).toEqual([]);
  });

  it('retains guest work when the user explicitly starts a separate profile', () => {
    localStorage.setItem('python-bite-class-progress-v3', JSON.stringify({ completed: ['chapter-1-1'] }));
    const { result } = renderHook(() => useLearningProgress());
    act(() => { result.current.createProfile('학교', '새 학생', false); });
    expect(result.current.progress.completed).toEqual([]);
    expect(result.current.profiles.find((profile) => profile.id === 'guest')?.progress.completed).toEqual(['chapter-1-1']);
    act(() => { result.current.logout(); });
    expect(result.current.activeProfile?.id).toBe('guest');
    expect(result.current.progress.completed).toEqual(['chapter-1-1']);
  });

  it('keeps legacy data when persisting the new profile snapshot fails', () => {
    localStorage.setItem('python-bite-class-progress-v3', JSON.stringify({ completed: ['chapter-1-1'] }));
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    const { result } = renderHook(() => useLearningProgress(), { reactStrictMode: true });
    expect(result.current.progress.completed).toEqual(['chapter-1-1']);
    expect(localStorage.getItem('python-bite-class-progress-v3')).not.toBeNull();
  });

  it('isolates code and current lesson by profile and resumes the selected profile', () => {
    const { result } = renderHook(() => useLearningProgress());
    let firstId = '';
    act(() => { firstId = result.current.createProfile('학교', '첫 학생'); });
    act(() => { result.current.saveCode('chapter-1-1', 'first'); result.current.setCurrentLessonId('chapter-1-2'); });
    let secondId = '';
    act(() => { secondId = result.current.createProfile('학교', '둘째 학생'); });
    act(() => { result.current.saveCode('chapter-1-1', 'second'); result.current.setCurrentLessonId('chapter-2-1'); result.current.switchProfile(firstId); });
    expect(result.current.activeProfile?.id).toBe(firstId);
    expect(result.current.progress.codeByLesson['chapter-1-1']).toBe('first');
    expect(result.current.currentLessonId).toBe('chapter-1-2');
    act(() => { result.current.switchProfile(secondId); });
    expect(result.current.progress.codeByLesson['chapter-1-1']).toBe('second');
    expect(result.current.currentLessonId).toBe('chapter-2-1');
    const remounted = renderHook(() => useLearningProgress());
    expect(remounted.result.current.currentLessonId).toBe('chapter-2-1');
    act(() => { remounted.result.current.switchProfile(firstId); });
    expect(remounted.result.current.currentLessonId).toBe('chapter-1-2');
  });

  it('sanitizes invalid stored profiles and never logs out to another student', () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ activeProfileId: 'missing', profiles: { broken: { id: 'other', school: 42, name: null, progress: { completed: ['not-a-lesson'] } }, student: { id: 'student', school: '학교', name: '학생', progress: { completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-1': 'ok' } } } } }));
    const { result } = renderHook(() => useLearningProgress());
    expect(result.current.activeProfile?.id).toBe('guest');
    expect(result.current.progress.completed).toEqual([]);
    act(() => { result.current.logout(); });
    expect(result.current.activeProfile?.id).toBe('guest');
    expect(result.current.profiles.find((profile) => profile.id === 'student')?.progress.completed).toEqual(['chapter-1-1']);
  });

  it('deletes only the current student, clears pending submission, and leaves others available', () => {
    const { result } = renderHook(() => useLearningProgress());
    let firstId = '';
    act(() => { firstId = result.current.createProfile('학교', '첫 학생'); });
    localStorage.setItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${firstId}`, 'pending');
    act(() => { result.current.createProfile('학교', '둘째 학생'); result.current.switchProfile(firstId); result.current.clearProfile(); });
    expect(result.current.activeProfile?.id).toBe('guest');
    expect(result.current.profiles.some((profile) => profile.id === firstId)).toBe(false);
    expect(result.current.profiles.some((profile) => profile.name === '둘째 학생')).toBe(true);
    expect(localStorage.getItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${firstId}`)).toBeNull();
    expect(CURRENT_LESSON_KEYS.every((key) => localStorage.getItem(key) === null)).toBe(true);
  });
});
