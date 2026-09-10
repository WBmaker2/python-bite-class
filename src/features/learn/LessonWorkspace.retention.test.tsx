import { useEffect } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { lessons } from '../../content/chapters';
import type { ExecutionEvidence } from '../../hooks/progressMigration';
import { LessonWorkspace } from './LessonWorkspace';

vi.mock('../playground/PlaygroundPanel', () => ({
  PlaygroundPanel: ({ savedEvidence, onPracticeComplete }: { savedEvidence?: ExecutionEvidence; onPracticeComplete: (complete: boolean) => void }) => {
    useEffect(() => { onPracticeComplete(Boolean(savedEvidence?.lastSuccessAt)); }, [onPracticeComplete, savedEvidence?.lastSuccessAt]);
    return <section aria-label="실습 모형" />;
  },
}));

describe('LessonWorkspace success retention', () => {
  it('opens the completion path for 11.3 from saved success evidence and keeps next navigation available', async () => {
    const lesson = lessons.find((item) => item.id === 'chapter-11-3');
    if (!lesson) throw new Error('chapter 11.3 lesson not found');
    const onComplete = vi.fn();
    const onNavigate = vi.fn();
    const savedEvidence: ExecutionEvidence = { lastSuccessCode: 'money = 1000', lastSuccessAt: '2026-09-11T00:00:00.000Z' };
    const view = render(<LessonWorkspace lesson={lesson} index={lessons.findIndex((item) => item.id === lesson.id)} total={lessons.length} completed={false} savedEvidence={savedEvidence} onCodeChange={vi.fn()} onExecutionEvidence={vi.fn()} onComplete={onComplete} onNavigate={onNavigate} />);

    const complete = await screen.findByRole('button', { name: '학습 완료' });
    expect(complete).toBeEnabled();
    fireEvent.click(complete);
    expect(onComplete).toHaveBeenCalledTimes(1);

    view.rerender(<LessonWorkspace lesson={lesson} index={lessons.findIndex((item) => item.id === lesson.id)} total={lessons.length} completed onCodeChange={vi.fn()} onExecutionEvidence={vi.fn()} onComplete={onComplete} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByRole('button', { name: '다음 학습 →' }));
    expect(onNavigate).toHaveBeenCalledWith(lessons.findIndex((item) => item.id === lesson.id) + 1);
  });

  it('keeps a new 11.3 lesson blocked when no success evidence exists', () => {
    const lesson = lessons.find((item) => item.id === 'chapter-11-3');
    if (!lesson) throw new Error('chapter 11.3 lesson not found');
    render(<LessonWorkspace lesson={lesson} index={lessons.findIndex((item) => item.id === lesson.id)} total={lessons.length} completed={false} onCodeChange={vi.fn()} onExecutionEvidence={vi.fn()} onComplete={vi.fn()} onNavigate={vi.fn()} />);
    expect(screen.getByRole('button', { name: '도전을 통과해요' })).toBeDisabled();
  });
});
