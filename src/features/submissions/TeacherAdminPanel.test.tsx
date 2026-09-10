import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authenticateTeacher, loadTeacherSubmissions } from './submissionService';
import { teacherAuth } from '../../firebase/client';
import type { SubmissionRecord } from './types';
import { TeacherAdminPanel } from './TeacherAdminPanel';
import { groupStudentSubmissions, paginateStudentGroups } from './adminGrouping';
import { getAdminPageItems } from './adminPaginationItems';

vi.mock('./submissionService', () => ({
  authenticateTeacher: vi.fn(),
  loadTeacherSubmissions: vi.fn(),
}));
vi.mock('../../firebase/client', () => ({ teacherAuth: vi.fn() }));
vi.mock('../reports', () => ({
  downloadStudentWorkbook: vi.fn(),
  downloadStudentPdf: vi.fn(),
}));

const progress = (code: string, status: 'success' | 'failed' = 'success') => [{
  lessonId: 'chapter-1-4' as const,
  title: '첫 실행 준비',
  completion: 'run' as const,
  completed: true,
  status,
  submittedCode: code,
  lastExecutedCode: code,
  lastRunStatus: status === 'success' ? 'done' : 'error',
  lastRunPassed: status === 'success',
  lastRunAt: '2026-09-10T01:00:00.000Z',
  lastSuccessCode: status === 'success' ? code : '',
  lastSuccessAt: status === 'success' ? '2026-09-10T01:00:00.000Z' : '',
  outputSummary: status === 'success' ? '첫 실행 성공!' : '오류',
}];

function row(id: string, studentUid: string, profileId: string, submittedAt: string, code: string, status: 'success' | 'failed' = 'success'): SubmissionRecord {
  return { id, schemaVersion: 1, studentUid, profileId, school: '같은학교', name: '같은이름', curriculumVersion: '2026-09', submittedAt, requiredLessonCount: 1, completedRequiredCount: status === 'success' ? 1 : 0, progress: progress(code, status) };
}

const authMock = vi.mocked(authenticateTeacher);
const loadMock = vi.mocked(loadTeacherSubmissions);
const teacherAuthMock = vi.mocked(teacherAuth);

beforeEach(() => {
  vi.clearAllMocks();
  authMock.mockResolvedValue({} as never);
  loadMock.mockResolvedValue([
    row('student-a-old', 'student-a', 'profile-a', '2026-09-09T01:00:00.000Z', 'old-code'),
    row('student-a-new', 'student-a', 'profile-a', '2026-09-10T01:00:00.000Z', 'new-code'),
    row('student-b-new', 'student-b', 'profile-b', '2026-09-10T02:00:00.000Z', 'other-code', 'failed'),
  ]);
  teacherAuthMock.mockReturnValue({ signOut: vi.fn().mockResolvedValue(undefined) } as never);
});

async function openPanel() {
  render(<TeacherAdminPanel onClose={vi.fn()} />);
  fireEvent.click(screen.getByRole('button', { name: 'Google 계정으로 관리자 열기' }));
  await waitFor(() => expect(screen.getByText(/학생 \d+명/)).toBeInTheDocument());
}

describe('TeacherAdminPanel', () => {
  it.each([0, 10, 11, 21])('paginates %s students at ten per page', (count) => {
    const rows = Array.from({ length: count }, (_, index) => ({
      ...row(`student-${index}`, `uid-${index}`, `profile-${index}`, `2026-09-10T${String(index).padStart(2, '0')}:00:00.000Z`, `code-${index}`),
      school: `학교-${index}`,
      name: `학생-${index}`,
    }));
    const groups = groupStudentSubmissions(rows);
    expect(groups).toHaveLength(count);
    expect(paginateStudentGroups(groups, 1).pageCount).toBe(Math.max(1, Math.ceil(count / 10)));
    expect(paginateStudentGroups(groups, 1).groups).toHaveLength(Math.min(count, 10));
    expect(paginateStudentGroups(groups, 99).currentPage).toBe(Math.max(1, Math.ceil(count / 10)));
  });

  it('keeps page navigation ordered with ellipses at the middle boundaries', () => {
    expect(getAdminPageItems(4, 8)).toEqual([1, 'ellipsis-start', 3, 4, 5, 'ellipsis-end', 8]);
    expect(getAdminPageItems(5, 8)).toEqual([1, 'ellipsis-start', 4, 5, 6, 'ellipsis-end', 8]);
  });

  it('sorts by latest submission and keeps same-name profiles separate', () => {
    const older = row('older', 'same-uid', 'profile-a', '2026-09-09T01:00:00.000Z', 'old');
    const newer = row('newer', 'same-uid', 'profile-a', '2026-09-10T01:00:00.000Z', 'new');
    const namesake = { ...row('namesake', 'other-uid', 'profile-b', '2026-09-10T02:00:00.000Z', 'namesake'), name: older.name };
    const groups = groupStudentSubmissions([older, newer, namesake]);
    expect(groups.map((group) => group.latest.id)).toEqual(['namesake', 'newer']);
    expect(groups[1].history.map((submission) => submission.id)).toEqual(['older']);
  });

  it('groups by student UID and profile, keeping same-name students distinct', async () => {
    await openPanel();
    expect(screen.getAllByText('같은학교 · 같은이름')).toHaveLength(2);
    expect(screen.getByText(/학생 2명/)).toBeInTheDocument();
    expect(screen.queryByText('old-code')).not.toBeInTheDocument();
    expect(screen.getByText('과거 제출 1건 보기')).toBeInTheDocument();
  });

  it('opens history and renders the selected older snapshot with Korean labels', async () => {
    await openPanel();
    fireEvent.click(screen.getByRole('button', { name: '과거 제출 1건 보기' }));
    fireEvent.click(screen.getByRole('button', { name: /제출 ID: student-a-old/ }));
    expect(screen.getByText('old-code')).toBeInTheDocument();
    expect(screen.getByText('실행 · 성공')).toBeInTheDocument();
    expect(screen.getByText('제출 코드')).toBeInTheDocument();
    expect(screen.getByText('최근 실행: 실행 완료 · 통과: 예')).toBeInTheDocument();
  });

  it('surfaces Excel errors and prevents duplicate exports while busy', async () => {
    await openPanel();
    fireEvent.click(screen.getAllByRole('button', { name: /최신 제출/ })[0]);
    const reports = await import('../reports');
    vi.mocked(reports.downloadStudentWorkbook).mockRejectedValueOnce(new Error('Excel 변환 실패'));
    fireEvent.click(screen.getByRole('button', { name: 'Excel 다운로드' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Excel 변환 실패'));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Excel 다운로드' })).not.toBeDisabled());

    let resolveExport: (() => void) | undefined;
    vi.mocked(reports.downloadStudentWorkbook).mockClear();
    vi.mocked(reports.downloadStudentWorkbook).mockImplementation(() => new Promise<void>((resolve) => { resolveExport = resolve; }));
    fireEvent.click(screen.getByRole('button', { name: 'Excel 다운로드' }));
    fireEvent.click(screen.getByRole('button', { name: 'Excel 준비 중…' }));
    await waitFor(() => expect(reports.downloadStudentWorkbook).toHaveBeenCalledTimes(1));
    resolveExport?.();
  });

  it('disables logout while a refresh query is in flight', async () => {
    await openPanel();
    let resolveRefresh: ((value: SubmissionRecord[]) => void) | undefined;
    loadMock.mockImplementationOnce(() => new Promise((resolve) => { resolveRefresh = resolve; }));
    fireEvent.click(screen.getByRole('button', { name: '새로 고침' }));
    expect(screen.getByRole('button', { name: '관리자 로그아웃' })).toBeDisabled();
    resolveRefresh?.([]);
    await waitFor(() => expect(screen.getByRole('button', { name: '관리자 로그아웃' })).not.toBeDisabled());
  });

  it('shows ten students per page and clears a detail selected on another page', async () => {
    loadMock.mockResolvedValue(Array.from({ length: 21 }, (_, index) => ({
      ...row(`submission-${index}`, `uid-${index}`, `profile-${index}`, `2026-09-10T${String(index).padStart(2, '0')}:00:00.000Z`, `code-${index}`),
      school: `학교-${index}`,
      name: `학생-${index}`,
    })));
    await openPanel();
    expect(screen.getByText(/전체 학생 21명 · 최근 제출순 · 현재 페이지 1\/3/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /최신 제출/ })).toHaveLength(10);
    fireEvent.click(screen.getByRole('button', { name: '페이지 2' }));
    await waitFor(() => expect(screen.getByText(/현재 페이지 2\/3/)).toBeInTheDocument());
    expect(screen.getAllByRole('button', { name: /최신 제출/ })).toHaveLength(10);
    fireEvent.click(screen.getByText('학교-10 · 학생-10'));
    expect(screen.getByRole('region', { name: '선택한 제출 상세' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '페이지 3' }));
    await waitFor(() => expect(screen.queryByRole('region', { name: '선택한 제출 상세' })).not.toBeInTheDocument());
  });

  it('resets to page one on search and clamps the page after refresh', async () => {
    loadMock.mockResolvedValue(Array.from({ length: 11 }, (_, index) => ({
      ...row(`submission-${index}`, `uid-${index}`, `profile-${index}`, `2026-09-10T${String(index).padStart(2, '0')}:00:00.000Z`, `code-${index}`),
      school: '검색 학교',
      name: `학생-${index}`,
    })));
    await openPanel();
    fireEvent.click(screen.getByRole('button', { name: '페이지 2' }));
    await waitFor(() => expect(screen.getByText(/현재 페이지 2\/2/)).toBeInTheDocument());
    fireEvent.change(screen.getByRole('textbox', { name: '학교 또는 이름 검색' }), { target: { value: '학생-0' } });
    await waitFor(() => expect(screen.getByText(/검색 결과 학생 1명 · 현재 페이지 1\/1/)).toBeInTheDocument());
    expect(screen.queryByRole('button', { name: '페이지 2' })).not.toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: '학교 또는 이름 검색' }), { target: { value: '' } });
    await waitFor(() => expect(screen.getByText(/현재 페이지 1\/2/)).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: '페이지 2' }));
    loadMock.mockResolvedValueOnce([]);
    fireEvent.click(screen.getByRole('button', { name: '새로 고침' }));
    await waitFor(() => expect(screen.getByText(/전체 학생 0명 · 최근 제출순 · 현재 페이지 1\/1/)).toBeInTheDocument());
  });
});
