import { StrictMode } from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { PROFILE_STORAGE_KEY } from './hooks/useLearningProgress';

const firebaseBoundary = vi.hoisted(() => ({
  ensureStudentUser: vi.fn(),
  commitSubmission: vi.fn(),
  getSubmission: vi.fn(),
  listSubmissions: vi.fn(),
  isTeacherUser: vi.fn(() => false),
  signInTeacher: vi.fn(),
  studentAuth: vi.fn(),
  teacherAuth: vi.fn(() => ({ currentUser: null, signOut: vi.fn() })),
}));

vi.mock('./firebase/client', () => firebaseBoundary);

const originalMatchMedia = window.matchMedia;

function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function seedLegacyProgress(progress: Record<string, unknown>, currentLessonId?: string) {
  localStorage.setItem('python-bite-class-progress-v3', JSON.stringify(progress));
  if (currentLessonId) localStorage.setItem('python-bite-class-current-v3', currentLessonId);
}

function readProfiles() {
  return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) ?? '{}') as {
    activeProfileId: string;
    profiles: Record<string, { id: string; school: string; name: string; progress: { completed: string[]; codeByLesson: Record<string, string> }; currentLessonId?: string }>;
  };
}

function fillProfile(school: string, name: string) {
  fireEvent.change(screen.getByLabelText('소속(학교)'), { target: { value: school } });
  fireEvent.change(screen.getByLabelText('이름'), { target: { value: name } });
}

beforeEach(() => {
  localStorage.clear();
  mockMatchMedia();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: originalMatchMedia });
  localStorage.clear();
});

describe('App profile and submission boundary', () => {
  it('migrates v3 guest progress, then completes and advances the first lesson', async () => {
    seedLegacyProgress({ completed: [], codeByLesson: { 'chapter-1-4': 'print("saved")' } });

    render(<StrictMode><App /></StrictMode>);

    expect(screen.getByRole('heading', { name: '왜 이 프로그램을 만들었나요?' })).toBeInTheDocument();
    await waitFor(() => expect(readProfiles().profiles.guest.progress.codeByLesson['chapter-1-4']).toBe('print("saved")'));
    fireEvent.click(screen.getByRole('button', { name: '학습 완료' }));
    expect(await screen.findByRole('button', { name: '✓ 학습 완료됨' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '다음 학습 →' }));

    expect(await screen.findByRole('heading', { name: '이렇게 학습해요' })).toBeInTheDocument();
    expect(firebaseBoundary.ensureStudentUser).not.toHaveBeenCalled();
  });

  it('adopts guest work explicitly and keeps another student isolated while switching back resumes their stage', async () => {
    seedLegacyProgress({ completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-4': 'print("첫 학생 코드")' } }, 'chapter-1-2');
    render(<StrictMode><App /></StrictMode>);

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    fillProfile('학교 A', '학생 A');
    fireEvent.click(screen.getByRole('checkbox', { name: /게스트 진도와 작성한 코드/ }));
    fireEvent.click(screen.getByRole('button', { name: '새 학생 저장' }));
    expect(await screen.findByRole('button', { name: '학교 A · 학생 A' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '이렇게 학습해요' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '학교 A · 학생 A' }));
    fireEvent.click(screen.getByRole('button', { name: '새 학생 추가' }));
    fillProfile('학교 B', '학생 B');
    fireEvent.click(screen.getByRole('button', { name: '새 학생 저장' }));
    expect(await screen.findByRole('button', { name: '학교 B · 학생 B' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '왜 이 프로그램을 만들었나요?' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '학교 B · 학생 B' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.click(within(dialog).getByRole('button', { name: '학교 A · 학생 A' }));
    expect(await screen.findByRole('button', { name: '학교 A · 학생 A' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '이렇게 학습해요' })).toBeInTheDocument();

    await waitFor(() => {
      const { profiles } = readProfiles();
      const first = Object.values(profiles).find((profile) => profile.name === '학생 A');
      const second = Object.values(profiles).find((profile) => profile.name === '학생 B');
      expect(first?.progress.codeByLesson['chapter-1-4']).toBe('print("첫 학생 코드")');
      expect(second?.progress.codeByLesson).toEqual({});
      expect(first?.currentLessonId).toBe('chapter-1-2');
    });
    expect(firebaseBoundary.ensureStudentUser).not.toHaveBeenCalled();
    expect(firebaseBoundary.commitSubmission).not.toHaveBeenCalled();
  });

  it('keeps profile and learning entry local without Firebase auth, commit, or fetch', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<StrictMode><App /></StrictMode>);

    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    fillProfile('로컬 학교', '로컬 학생');
    fireEvent.click(screen.getByRole('button', { name: '새 학생 저장' }));
    fireEvent.click(screen.getByRole('button', { name: '학습 완료' }));
    fireEvent.click(await screen.findByRole('button', { name: '다음 학습 →' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: '이렇게 학습해요' })).toBeInTheDocument());

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(firebaseBoundary.studentAuth).not.toHaveBeenCalled();
    expect(firebaseBoundary.ensureStudentUser).not.toHaveBeenCalled();
    expect(firebaseBoundary.commitSubmission).not.toHaveBeenCalled();
  });

  it('returns to the report after selecting a saved student from the registration route', async () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({
      activeProfileId: 'guest',
      profiles: {
        guest: { id: 'guest', school: '', name: '', createdAt: '2026-09-10', progress: { completed: [], codeByLesson: {}, executionByLesson: {} } },
        saved: { id: 'saved', school: '저장 학교', name: '저장 학생', createdAt: '2026-09-10', progress: { completed: ['chapter-1-1'], codeByLesson: {}, executionByLesson: {} }, currentLessonId: 'chapter-1-1' },
      },
    }));
    render(<StrictMode><App /></StrictMode>);

    fireEvent.click(screen.getByRole('button', { name: '내 학습 리포트' }));
    const profileDialog = screen.getByRole('dialog');
    fireEvent.click(within(profileDialog).getByRole('button', { name: '저장 학교 · 저장 학생' }));
    const reportDialog = await screen.findByRole('dialog', { name: '내 학습 리포트' });
    expect(reportDialog).toBeInTheDocument();
    expect(within(reportDialog).getByText('저장 학교 · 저장 학생')).toBeInTheDocument();
  });

  it('clears the report return intent when registration is cancelled', async () => {
    render(<StrictMode><App /></StrictMode>);
    fireEvent.click(screen.getByRole('button', { name: '내 학습 리포트' }));
    expect(screen.getByRole('heading', { name: '학생 정보 등록' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '취소' }));
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(screen.getByRole('heading', { name: '학생 정보 등록' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '내 학습 리포트' })).not.toBeInTheDocument();
  });
});
