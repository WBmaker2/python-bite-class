import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorGuidance } from '../features/playground/errorGuidance';

export type RunnerState = 'idle' | 'loading' | 'running' | 'done' | 'error' | 'stopped' | 'timeout';
export interface RunnerOutput { text: string; kind: 'stdout' | 'stderr' | 'status'; }

export function usePythonRunner() {
  const workerRef = useRef<Worker | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [state, setState] = useState<RunnerState>('idle');
  const [outputs, setOutputs] = useState<RunnerOutput[]>([]);
  const [errorHelp, setErrorHelp] = useState<{ type: string; message: string }>();

  const stop = useCallback((next: RunnerState = 'stopped') => {
    workerRef.current?.terminate(); workerRef.current = undefined;
    if (timerRef.current) clearTimeout(timerRef.current);
    setState(next);
  }, []);

  const run = useCallback((code: string) => {
    stop(); setOutputs([]); setErrorHelp(undefined); setState('running');
    const worker = new Worker(new URL('../features/playground/python.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent<Record<string, string>>) => {
      const { type } = event.data;
      if (type === 'status') { setState(event.data.status === 'loading' ? 'loading' : 'running'); return; }
      if (type === 'stdout' || type === 'stderr') setOutputs((items) => [...items, { text: event.data.text ?? '', kind: type }]);
      if (type === 'done') { setState('done'); stop('done'); }
      if (type === 'output-limit') { setOutputs((items) => [...items, { text: '출력이 너무 많아 실행을 멈췄어요. 반복문을 확인해 보세요.', kind: 'status' }]); stop('error'); }
      if (type === 'error') { setErrorHelp(getErrorGuidance(event.data.message ?? '')); setOutputs((items) => [...items, { text: event.data.message ?? '오류', kind: 'stderr' }]); stop('error'); }
    };
    worker.onerror = (event) => { setErrorHelp({ type: '실행 오류', message: event.message }); stop('error'); };
    timerRef.current = setTimeout(() => { setOutputs([{ text: '5초가 지나 실행을 멈췄어요. 반복문이 끝나는지 확인해 보세요.', kind: 'status' }]); stop('timeout'); }, 5000);
    worker.postMessage({ type: 'run', code });
  }, [stop]);

  useEffect(() => () => stop(), [stop]);
  const resetRunner = useCallback(() => { stop(); setOutputs([]); setErrorHelp(undefined); setState('idle'); }, [stop]);
  return { state, outputs, errorHelp, run, stop: () => stop(), resetRunner };
}
