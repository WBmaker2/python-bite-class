import { useEffect, useState } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Lesson } from '../../content/types';
import type { ExecutionEvidence } from '../../hooks/progressMigration';
import { PlaygroundPanel } from './PlaygroundPanel';

const runnerControl = vi.hoisted(() => ({
  state: 'idle' as 'idle' | 'running' | 'done' | 'error',
  outputs: [] as Array<{ text: string; kind: 'stdout' | 'stderr' | 'status' }>,
  runtime: undefined as unknown,
  notify: vi.fn(),
  run: vi.fn(),
  stop: vi.fn(),
  resetRunner: vi.fn(),
}));

vi.mock('../../hooks/usePythonRunner', () => ({
  usePythonRunner: () => {
    const [, rerender] = useState(0);
    useEffect(() => {
      runnerControl.notify.mockImplementation(() => { rerender((value) => value + 1); });
    }, []);
    return {
      state: runnerControl.state,
      outputs: runnerControl.outputs,
      runtime: runnerControl.runtime,
      errorHelp: undefined,
      run: runnerControl.run,
      stop: runnerControl.stop,
      resetRunner: runnerControl.resetRunner,
    };
  },
}));

vi.mock('./CodeEditor', () => ({
  CodeEditor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea aria-label="Python 코드 편집기" value={value} onChange={(event) => onChange(event.target.value)} />
  ),
}));

const challengeLesson: Lesson = {
  id: 'chapter-8-1', chapter: 8, order: 1, title: '근거 기록 도전', summary: '실행 결과를 기록합니다.',
  completion: 'challenge', objectives: [], concepts: [], starterCode: 'print("원본")', expectedOutput: '실행 결과',
  challenge: { prompt: '실행 결과를 확인하세요.', hint: '실행하세요.', checks: [{ mode: 'contains', value: '실행 결과', feedback: '통과했어요.' }] }, glossary: [],
};

const runLesson: Lesson = { ...challengeLesson, id: 'chapter-8-2', order: 2, completion: 'run', challenge: undefined, expectedOutput: undefined };

function resetRunnerControl() {
  runnerControl.state = 'idle';
  runnerControl.outputs = [];
  runnerControl.runtime = undefined;
  runnerControl.notify.mockReset();
  runnerControl.run.mockReset();
  runnerControl.stop.mockReset();
  runnerControl.resetRunner.mockReset();
}

function renderPanel(lesson: Lesson, onEvidence: (item: ExecutionEvidence) => void = vi.fn(), onComplete: (complete: boolean) => void = vi.fn(), savedEvidence?: ExecutionEvidence) {
  return render(<PlaygroundPanel lesson={lesson} savedEvidence={savedEvidence} onCodeChange={vi.fn()} onExecutionEvidence={onEvidence} onPracticeComplete={onComplete} />);
}

beforeEach(resetRunnerControl);
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe('PlaygroundPanel execution evidence', () => {
  it('keeps the lesson completable when editing after a passed execution snapshot', async () => {
    const evidence: Array<Record<string, unknown>> = [];
    const complete = vi.fn();
    runnerControl.run.mockImplementation(() => { runnerControl.state = 'running'; runnerControl.notify(); });
    renderPanel(challengeLesson, (item) => { evidence.push(item); }, complete);

    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("실행 스냅샷")' } });
    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("현재 편집본")' } });
    runnerControl.state = 'done';
    runnerControl.outputs = [{ text: '실행 결과', kind: 'stdout' }];
    runnerControl.notify();

    await waitFor(() => expect(evidence).toHaveLength(1));
    expect(evidence[0]).toMatchObject({ lastExecutedCode: 'print("실행 스냅샷")', lastRunStatus: 'done', lastRunPassed: true });
    expect(complete).toHaveBeenLastCalledWith(true);
  });

  it('keeps a previously passed challenge completable after a later failed run', async () => {
    const complete = vi.fn();
    runnerControl.run.mockImplementation(() => {
      runnerControl.state = 'done';
      runnerControl.outputs = [{ text: '실패 결과', kind: 'stdout' }];
      runnerControl.notify();
    });
    renderPanel(challengeLesson, vi.fn(), complete, { lastSuccessCode: 'print("통과 당시 코드")', lastSuccessAt: '2026-09-11T00:00:00.000Z' });

    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("추가 실습")' } });
    expect(screen.getByRole('status')).toHaveTextContent('이미 통과했어요');
    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(complete).toHaveBeenLastCalledWith(true));
    expect(screen.getByRole('status')).toHaveTextContent('이미 통과했어요');
  });

  it('retains the in-session pass through a failed run, error, and editor reset', async () => {
    const evidence: ExecutionEvidence[] = [];
    const complete = vi.fn();
    let runCount = 0;
    runnerControl.run.mockImplementation(() => {
      runCount += 1;
      runnerControl.state = runCount === 1 ? 'done' : 'error';
      runnerControl.outputs = runCount === 1 ? [{ text: '실행 결과', kind: 'stdout' }] : [{ text: '문법 오류', kind: 'stderr' }];
      runnerControl.notify();
    });
    renderPanel(challengeLesson, (item) => evidence.push(item), complete);

    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("성공 실습")' } });
    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(evidence[0]).toMatchObject({ lastRunPassed: true }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("오류 실습")' } });
    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(evidence[1]).toMatchObject({ lastRunStatus: 'error', lastRunPassed: false }));
    expect(complete).toHaveBeenLastCalledWith(true);
    fireEvent.click(screen.getByRole('button', { name: '초기화' }));
    expect(complete).toHaveBeenLastCalledWith(true);
  });

  it('stores failed challenge runs and reports each repeated same-code run once without rerender duplicates', async () => {
    const evidence: Array<Record<string, unknown>> = [];
    runnerControl.run.mockImplementation(() => {
      runnerControl.state = 'done';
      runnerControl.outputs = [{ text: '실패 결과', kind: 'stdout' }];
      runnerControl.notify();
    });
    const view = renderPanel(challengeLesson, (item) => { evidence.push(item); });

    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(evidence).toHaveLength(1));
    expect(evidence[0]).toMatchObject({ lastRunStatus: 'done', lastRunPassed: false, lastExecutedCode: 'print("원본")' });
    view.rerender(<PlaygroundPanel lesson={challengeLesson} onCodeChange={vi.fn()} onExecutionEvidence={(item) => { evidence.push(item); }} onPracticeComplete={vi.fn()} />);
    view.rerender(<PlaygroundPanel lesson={challengeLesson} onCodeChange={vi.fn()} onExecutionEvidence={(item) => { evidence.push(item); }} onPracticeComplete={vi.fn()} />);
    expect(evidence).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(evidence).toHaveLength(2));
    expect(evidence[1]).toMatchObject({ lastRunStatus: 'done', lastRunPassed: false });
  });

  it('records an empty code execution and marks run mode dirty after editing a completed snapshot', async () => {
    const evidence: Array<Record<string, unknown>> = [];
    runnerControl.run.mockImplementation(() => {
      runnerControl.state = 'done';
      runnerControl.outputs = [];
      runnerControl.notify();
    });
    renderPanel(runLesson, (item) => { evidence.push(item); });
    const editor = screen.getByRole('textbox', { name: 'Python 코드 편집기' });
    fireEvent.change(editor, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: '▶ 코드 실행' }));
    await waitFor(() => expect(evidence).toHaveLength(1));
    expect(evidence[0]).toMatchObject({ lastExecutedCode: '', lastRunStatus: 'done', lastRunPassed: true });
    fireEvent.change(screen.getByRole('textbox', { name: 'Python 코드 편집기' }), { target: { value: 'print("다시")' } });
    expect(screen.getByRole('button', { name: '▶ 코드 실행' })).toHaveClass('gi-pulse');
  });
});
