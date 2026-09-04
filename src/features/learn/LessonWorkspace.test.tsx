import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Lesson } from '../../content/types';
import { LessonWorkspace } from './LessonWorkspace';

const readLesson: Lesson = {
  id: 'chapter-3-2', chapter: 3, order: 2, title: '운영체제와 Python 설치', completion: 'read',
  summary: '컴퓨터에 Python을 설치하면 파일로 저장하고 터미널에서도 실행할 수 있습니다.',
  objectives: ['설명을 읽고 핵심 생각을 한 문장으로 정리할 수 있어요.'], concepts: [], glossary: [],
};

describe('LessonWorkspace', () => {
  it('keeps read lessons completable after the playground effect runs', async () => {
    render(<LessonWorkspace lesson={readLesson} index={1} total={69} completed={false} onCodeChange={vi.fn()} onComplete={vi.fn()} onNavigate={vi.fn()} />);
    await waitFor(() => expect(screen.getByRole('button', { name: '학습 완료' })).toBeEnabled());
  });

  it('exposes an adjustable desktop separator with keyboard controls', () => {
    render(<LessonWorkspace lesson={readLesson} index={1} total={69} completed={false} onCodeChange={vi.fn()} onComplete={vi.fn()} onNavigate={vi.fn()} />);
    const separator = screen.getByRole('separator', { name: '설명과 코드 실습 너비 조절' });

    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveAttribute('aria-valuemin', '30');
    expect(separator).toHaveAttribute('aria-valuemax', '70');
    expect(separator).toHaveAttribute('aria-valuenow', '48');
    expect(separator).toHaveAttribute('aria-controls', 'lesson-pane playground-pane');
    expect(separator).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(separator, { key: 'ArrowRight' });
    expect(separator).toHaveAttribute('aria-valuenow', '52');
    fireEvent.keyDown(separator, { key: 'Home' });
    expect(separator).toHaveAttribute('aria-valuenow', '30');
    fireEvent.keyDown(separator, { key: 'End' });
    expect(separator).toHaveAttribute('aria-valuenow', '70');
  });
});
