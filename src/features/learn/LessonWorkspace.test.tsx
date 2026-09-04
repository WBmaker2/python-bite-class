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

  it('resizes with pointer capture, clamps the ratio, and cleans up drag state', () => {
    render(<LessonWorkspace lesson={readLesson} index={1} total={69} completed={false} onCodeChange={vi.fn()} onComplete={vi.fn()} onNavigate={vi.fn()} />);
    const separator = screen.getByRole('separator', { name: '설명과 코드 실습 너비 조절' });
    const workspace = document.querySelector('.workspace');
    if (!(workspace instanceof HTMLElement)) throw new Error('workspace element not found');

    vi.spyOn(workspace, 'getBoundingClientRect').mockReturnValue({ left: 0, width: 1000 } as DOMRect);
    vi.spyOn(separator, 'getBoundingClientRect').mockReturnValue({ width: 16 } as DOMRect);
    const setPointerCapture = vi.fn();
    const hasPointerCapture = vi.fn(() => true);
    const releasePointerCapture = vi.fn();
    Object.defineProperties(separator, {
      setPointerCapture: { configurable: true, value: setPointerCapture },
      hasPointerCapture: { configurable: true, value: hasPointerCapture },
      releasePointerCapture: { configurable: true, value: releasePointerCapture },
    });
    const dispatchPointer = (type: string, clientX: number) => {
      const event = new Event(type, { bubbles: true });
      Object.defineProperties(event, {
        clientX: { configurable: true, value: clientX },
        pointerId: { configurable: true, value: 7 },
      });
      fireEvent(separator, event);
    };

    dispatchPointer('pointerdown', 500);
    expect(setPointerCapture).toHaveBeenCalledTimes(1);
    const capturedPointerId = setPointerCapture.mock.calls[0][0];
    expect(document.body).toHaveClass('is-workspace-resizing');

    dispatchPointer('pointermove', 0);
    expect(separator).toHaveAttribute('aria-valuenow', '30');
    dispatchPointer('pointermove', 1000);
    expect(separator).toHaveAttribute('aria-valuenow', '70');

    dispatchPointer('pointerup', 1000);
    expect(hasPointerCapture).toHaveBeenCalledWith(capturedPointerId);
    expect(releasePointerCapture).toHaveBeenCalledWith(capturedPointerId);
    expect(document.body).not.toHaveClass('is-workspace-resizing');
  });
});
