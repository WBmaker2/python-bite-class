import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StudentProfileDialog } from './StudentProfileDialog';
import type { StudentProfile } from '../../hooks/useLearningProgress';

const guest: StudentProfile = { id: 'guest', school: '', name: '', createdAt: '2026-01-01', progress: { completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-1': 'print(1)' }, executionByLesson: {} } };
const saved: StudentProfile = { id: 'student-2', school: '다른 학교', name: '다른 학생', createdAt: '2026-01-01', progress: { completed: [], codeByLesson: {}, executionByLesson: {} } };
const current: StudentProfile = { id: 'student-1', school: '학교', name: '학생', createdAt: '2026-01-01', progress: { completed: [], codeByLesson: {}, executionByLesson: {} } };

describe('StudentProfileDialog', () => {
  it('keeps guest adoption explicit when creating a first profile', () => {
    const onCreate = vi.fn();
    render(<StudentProfileDialog profile={guest} guestHasProgress profiles={[guest]} onSave={vi.fn()} onCreate={onCreate} onClose={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('소속(학교)'), { target: { value: '우리 학교' } });
    fireEvent.change(screen.getByLabelText('이름'), { target: { value: '새 학생' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: '새 학생 저장' }));
    expect(onCreate).toHaveBeenCalledWith('우리 학교', '새 학생', true);
  });

  it('switches to a named saved profile and closes on Escape', () => {
    const onSwitch = vi.fn(); const onClose = vi.fn();
    render(<StudentProfileDialog profile={current} profiles={[current, saved]} onSave={vi.fn()} onSwitch={onSwitch} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: '다른 학교 · 다른 학생' }));
    expect(onSwitch).toHaveBeenCalledWith('student-2');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
