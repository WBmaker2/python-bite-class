import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { SubmissionDialog } from './SubmissionDialog';
import { buildStudentSubmission } from './submissionService';
import { PENDING_SUBMISSION_STORAGE_PREFIX, type StudentProfile } from '../../hooks/useLearningProgress';

beforeEach(() => localStorage.clear());
describe('SubmissionDialog pending snapshot', () => {
  it('shows the original retry snapshot and requires an explicit discard for current data', () => {
    const oldProfile: StudentProfile = { id: 'profile-1', school: '이전학교', name: '이전 학생', createdAt: new Date().toISOString(), progress: { completed: [], codeByLesson: {}, executionByLesson: {} } };
    const currentProfile: StudentProfile = { ...oldProfile, school: '현재학교', name: '현재 학생' };
    const payload = buildStudentSubmission(oldProfile, oldProfile.progress);
    localStorage.setItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${oldProfile.id}`, JSON.stringify({ id: 'submission-1', payload }));
    render(<SubmissionDialog profile={currentProfile} progress={currentProfile.progress} onClose={() => undefined} onSubmitted={() => undefined} />);
    expect(screen.getByText(/이전학교 · 이전 학생/)).toBeInTheDocument();
    const discard = screen.getByRole('button', { name: '이전 제출을 버리고 현재 내용으로 새 제출' });
    fireEvent.click(discard);
    expect(screen.queryByRole('button', { name: '이전 제출을 버리고 현재 내용으로 새 제출' })).not.toBeInTheDocument();
    expect(screen.getByText(/현재학교 · 현재 학생/)).toBeInTheDocument();
  });
});
