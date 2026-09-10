import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { StudentReportDialog } from './StudentReportDialog';
import type { StudentProfile } from '../../hooks/useLearningProgress';

const pdfMock = vi.hoisted(() => ({ downloadLocalStudentPdf: vi.fn() }));
vi.mock('./studentPdf', () => pdfMock);

const profile: StudentProfile = { id: 'student-1', school: '우리 학교', name: '학생', createdAt: '2026-09-10', currentLessonId: 'chapter-1-1', progress: { completed: ['chapter-1-1'], codeByLesson: {}, executionByLesson: {} } };

beforeEach(() => vi.clearAllMocks());

describe('StudentReportDialog', () => {
  it('shows local scope and keeps code inclusion off by default', () => {
    const view = render(<StudentReportDialog profile={profile} progress={profile.progress} currentLessonId="chapter-1-1" onClose={vi.fn()} onNeedProfile={vi.fn()} />);
    expect(screen.getByText('우리 학교 · 학생')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: '보고서 범위' })).toHaveValue('all');
    expect(screen.getByRole('checkbox', { name: '작성한 코드 포함' })).not.toBeChecked();
    fireEvent.change(screen.getByRole('combobox', { name: '보고서 범위' }), { target: { value: 'chapter' } });
    expect(screen.getByRole('combobox', { name: '보고서 범위' })).toHaveValue('chapter');
    fireEvent.click(screen.getByRole('checkbox', { name: '작성한 코드 포함' }));
    expect(screen.getByRole('checkbox', { name: '작성한 코드 포함' })).toBeChecked();
    expect(view.container.querySelector('.report-dialog-body')).toBeInTheDocument();
    expect(view.container.querySelector('.report-dialog-footer')).toBeInTheDocument();
    expect([...view.container.querySelectorAll('.report-lesson-list details')].every((item) => !item.hasAttribute('open'))).toBe(true);
  });

  it('offers profile registration without loading Firebase when no profile exists', () => {
    const onNeedProfile = vi.fn();
    render(<StudentReportDialog progress={{ completed: [], codeByLesson: {}, executionByLesson: {} }} onClose={vi.fn()} onNeedProfile={onNeedProfile} />);
    fireEvent.click(screen.getByRole('button', { name: '학생 정보 등록' }));
    expect(onNeedProfile).toHaveBeenCalledOnce();
    expect(screen.getByText(/Firebase로 전송되지 않습니다/)).toBeInTheDocument();
  });

  it('freezes the first student snapshot and prevents duplicate clicks while PDF generation is pending', async () => {
    let resolvePdf!: () => void;
    pdfMock.downloadLocalStudentPdf.mockReturnValueOnce(new Promise<void>((resolve) => { resolvePdf = resolve; }));
    const first = { ...profile, progress: { ...profile.progress, codeByLesson: { 'chapter-1-1': 'print("첫 학생")' } } };
    const second = { ...profile, id: 'student-2', school: '다른 학교', name: '다른 학생', progress: { ...profile.progress, codeByLesson: { 'chapter-1-1': 'print("다른 학생")' } } };
    const view = render(<StudentReportDialog profile={first} progress={first.progress} currentLessonId="chapter-1-1" onClose={vi.fn()} onNeedProfile={vi.fn()} />);
    fireEvent.click(screen.getByRole('checkbox', { name: '작성한 코드 포함' }));
    fireEvent.click(screen.getByRole('button', { name: 'PDF 내려받기' }));
    await waitFor(() => expect(pdfMock.downloadLocalStudentPdf).toHaveBeenCalledOnce());
    view.rerender(<StudentReportDialog profile={second} progress={second.progress} currentLessonId="chapter-1-1" onClose={vi.fn()} onNeedProfile={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'PDF 만드는 중…' }));
    expect(pdfMock.downloadLocalStudentPdf).toHaveBeenCalledOnce();
    expect(pdfMock.downloadLocalStudentPdf.mock.calls[0][0]).toMatchObject({ school: '우리 학교', name: '학생', source: 'local', progress: expect.arrayContaining([expect.objectContaining({ submittedCode: 'print("첫 학생")' })]) });
    resolvePdf();
    await waitFor(() => expect(screen.getByRole('button', { name: 'PDF 내려받기' })).toBeEnabled());
  });

  it('shows a generation error and allows a later retry', async () => {
    pdfMock.downloadLocalStudentPdf.mockRejectedValueOnce(new Error('PDF 오류')).mockResolvedValueOnce(undefined);
    render(<StudentReportDialog profile={profile} progress={profile.progress} currentLessonId="chapter-1-1" onClose={vi.fn()} onNeedProfile={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'PDF 내려받기' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('PDF 오류');
    fireEvent.click(screen.getByRole('button', { name: 'PDF 내려받기' }));
    await waitFor(() => expect(pdfMock.downloadLocalStudentPdf).toHaveBeenCalledTimes(2));
  });
});
