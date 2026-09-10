import { beforeEach, describe, expect, it, vi } from 'vitest';
const firebaseMocks = vi.hoisted(() => ({ ensureStudentUser: vi.fn(), commitSubmission: vi.fn(), getSubmission: vi.fn(), listSubmissions: vi.fn(), signInTeacher: vi.fn(), isTeacherUser: vi.fn(), teacherAuth: vi.fn() }));
vi.mock('../../firebase/client', () => firebaseMocks);
import { buildStudentSubmission, discardPendingSubmission, readPendingSubmission, submitStudentProgress } from './submissionService';
import { PENDING_SUBMISSION_STORAGE_PREFIX } from '../../hooks/useLearningProgress';
import type { StudentProfile } from '../../hooks/useLearningProgress';

beforeEach(() => localStorage.clear());
describe('pending submission recovery', () => {
  const profile = (): StudentProfile => ({ id: 'profile-1', school: '이전학교', name: '이전 학생', createdAt: new Date().toISOString(), progress: { completed: [], codeByLesson: {}, executionByLesson: {} } });
  const buildSubmissionForServer = (student: StudentProfile) => ({ ...buildStudentSubmission(student, student.progress), studentUid: 'student-1' });
  beforeEach(() => { firebaseMocks.ensureStudentUser.mockReset().mockResolvedValue({ uid: 'student-1', getIdToken: vi.fn().mockResolvedValue('token') }); firebaseMocks.getSubmission.mockReset(); firebaseMocks.commitSubmission.mockReset(); Object.defineProperty(navigator, 'onLine', { configurable: true, value: true }); });

  it('reads a frozen snapshot and discards corrupted or intentionally abandoned data', () => {
    const student = profile();
    const payload = buildStudentSubmission(student, student.progress);
    const key = `${PENDING_SUBMISSION_STORAGE_PREFIX}${student.id}`;
    localStorage.setItem(key, JSON.stringify({ id: 'submission-1', payload }));
    const recovered = readPendingSubmission(student.id);
    expect(recovered?.payload.school).toBe('이전학교');
    expect(recovered?.payload.name).toBe('이전 학생');
    localStorage.setItem(key, '{bad json');
    expect(readPendingSubmission(student.id)).toBeUndefined();
    localStorage.setItem(key, JSON.stringify({ id: 'submission-2', payload }));
    discardPendingSubmission(student.id);
    expect(localStorage.getItem(key)).toBeNull();
  });

  it('keeps the exact frozen snapshot after a failed request and retries it after edits', async () => {
    const first = profile(); const codeProgress = { ...first.progress, codeByLesson: { 'chapter-1-1': 'print("old")' } };
    firebaseMocks.commitSubmission.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce({ accepted: false, duplicate: true });
    await expect(submitStudentProgress(first, codeProgress)).rejects.toThrow('network');
    const pending = readPendingSubmission(first.id); expect(pending?.id).toBeTruthy(); expect(pending?.payload.name).toBe('이전 학생'); expect(pending?.payload.progress.some((row) => row.submittedCode.includes('old'))).toBe(true);
    const edited = { ...first, name: '수정 학생' }; const changedProgress = { ...codeProgress, codeByLesson: { 'chapter-1-1': 'print("new")' } };
    const stored = { id: pending!.id, ...pending!.payload, submittedAt: '2026-09-10T00:00:00.000Z' }; firebaseMocks.getSubmission.mockResolvedValue(stored);
    const result = await submitStudentProgress(edited, changedProgress, pending!.id);
    expect(result.duplicate).toBe(true); expect(firebaseMocks.commitSubmission.mock.calls[1][1].school).toBe('이전학교'); expect(firebaseMocks.commitSubmission.mock.calls[1][1].name).toBe('이전 학생'); expect(firebaseMocks.commitSubmission.mock.calls[1][1].progress[0].submittedCode).toContain('old'); expect(readPendingSubmission(first.id)).toBeUndefined();
  });

  it('rejects a duplicate ID when the server snapshot differs in any field', async () => {
    const student = profile(); firebaseMocks.commitSubmission.mockResolvedValue({ accepted: false, duplicate: true });
    firebaseMocks.getSubmission.mockResolvedValue({ id: 'submission-1', ...buildSubmissionForServer(student), submittedAt: '2026-09-10T00:00:00.000Z', name: '다른 학생' });
    await expect(submitStudentProgress(student, student.progress, 'submission-1')).rejects.toThrow('다른 자료');
  });

  it('does not authenticate or send while offline', async () => {
    Object.defineProperty(navigator, 'onLine', { configurable: true, value: false }); const student = profile();
    await expect(submitStudentProgress(student, student.progress)).rejects.toThrow('오프라인');
    expect(firebaseMocks.ensureStudentUser).not.toHaveBeenCalled(); expect(firebaseMocks.commitSubmission).not.toHaveBeenCalled();
  });
});
