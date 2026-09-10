import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lesson } from '../../content/types';
import type { ExecutionEvidence } from '../../hooks/progressMigration';
import { usePythonRunner } from '../../hooks/usePythonRunner';
import { checkChallenge } from './challengeCheck';
import { CodeEditor } from './CodeEditor';
import { OutputConsole } from './OutputConsole';
import { combineStdoutOutput } from './outputText';

interface Props { lesson: Lesson; savedCode?: string; savedEvidence?: ExecutionEvidence; onCodeChange: (code: string) => void; onExecutionEvidence: (evidence: ExecutionEvidence) => void; onPracticeComplete: (complete: boolean) => void; }

export function PlaygroundPanel({ lesson, savedCode, savedEvidence, onCodeChange, onExecutionEvidence, onPracticeComplete }: Props) {
  const [code, setCode] = useState(savedCode ?? lesson.starterCode ?? '');
  const [executedCode, setExecutedCode] = useState<string>();
  const hasPassedInSessionRef = useRef(false);
  const reportedRunRef = useRef('');
  const runner = usePythonRunner();
  const { resetRunner } = runner;
  const hasRecordedSuccess = typeof savedEvidence?.lastSuccessCode === 'string' && typeof savedEvidence.lastSuccessAt === 'string';
  // A lesson change is the only time the editor should load persisted code;
  // including savedCode here would reset the cursor after every keystroke.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setCode(savedCode ?? lesson.starterCode ?? ''); setExecutedCode(undefined); hasPassedInSessionRef.current = false; reportedRunRef.current = ''; resetRunner(); }, [lesson.id]);
  const challengeMessage = useMemo(() => {
    if (runner.state !== 'done' || !lesson.challenge) return undefined;
    if (executedCode !== code) return { passed: false, message: '코드를 바꿨어요. 다시 실행해 주세요.' };
    return checkChallenge(combineStdoutOutput(runner.outputs), lesson.expectedOutput, lesson.challenge.checks, code, lesson.starterCode, lesson.challenge.sourcePatterns, lesson.challenge.runtimeCheck, runner.runtime);
  }, [runner.state, runner.outputs, runner.runtime, lesson.expectedOutput, lesson.challenge, lesson.starterCode, code, executedCode]);
  const executedChallengeMessage = useMemo(() => {
    if (runner.state !== 'done' || !lesson.challenge || executedCode === undefined) return undefined;
    return checkChallenge(combineStdoutOutput(runner.outputs), lesson.expectedOutput, lesson.challenge.checks, executedCode, lesson.starterCode, lesson.challenge.sourcePatterns, lesson.challenge.runtimeCheck, runner.runtime);
  }, [runner.state, runner.outputs, runner.runtime, lesson.expectedOutput, lesson.challenge, lesson.starterCode, executedCode]);
  useEffect(() => {
    const currentPracticeComplete = lesson.completion === 'read' || lesson.completion === 'optional' || (lesson.completion === 'run' ? runner.state === 'done' && executedCode === code : lesson.completion === 'challenge' && challengeMessage?.passed === true && executedCode === code);
    const executedPracticeComplete = lesson.completion === 'run' ? runner.state === 'done' && executedCode !== undefined : lesson.completion === 'challenge' && executedChallengeMessage?.passed === true;
    if (executedPracticeComplete) hasPassedInSessionRef.current = true;
    const complete = hasRecordedSuccess || hasPassedInSessionRef.current || currentPracticeComplete;
    onPracticeComplete(complete);
    const reportKey = `${executedCode ?? ''}:${runner.state}`;
    if (executedCode !== undefined && (runner.state === 'done' || runner.state === 'error' || runner.state === 'stopped' || runner.state === 'timeout') && reportKey !== reportedRunRef.current) {
      reportedRunRef.current = reportKey;
      const passed = runner.state === 'done' && (lesson.completion === 'run' || executedChallengeMessage?.passed === true);
      onExecutionEvidence({ lastExecutedCode: executedCode, lastRunStatus: runner.state, lastRunPassed: passed, lastRunAt: new Date().toISOString(), outputSummary: combineStdoutOutput(runner.outputs).slice(0, 1000), ...(passed ? { lastSuccessCode: executedCode, lastSuccessAt: new Date().toISOString() } : {}) });
    }
  }, [hasRecordedSuccess, lesson.completion, runner.state, runner.outputs, challengeMessage, executedChallengeMessage, executedCode, code, onPracticeComplete, onExecutionEvidence]);
  const changeCode = (next: string) => { setCode(next); onCodeChange(next); };
  if (!lesson.starterCode) return <section className="playground-panel practice-placeholder" aria-label="코드 실습 안내"><span className="chapter-kicker">{lesson.completion === 'optional' ? '선택 참고' : '먼저 읽기'}</span><h2>{lesson.completion === 'optional' ? '원할 때 읽어 보기' : lesson.id === 'chapter-11-7' ? '마무리 읽기' : '읽기 단계'}</h2><p>{lesson.completion === 'optional' ? '이 설명은 선택 참고예요. 건너뛰어도 다음 소단원으로 바로 이어 갈 수 있어요.' : lesson.id === 'chapter-11-7' ? '설명을 읽고 지금까지 해낸 일을 돌아본 뒤 학습 마치기를 눌러 주세요. 여러분의 작은 해결 경험을 응원해요!' : '가운데 설명을 읽고 핵심을 정리하면 다음 소단원이 열립니다. 다음 실행 단계에서 코드를 직접 다뤄 볼게요.'}</p></section>;
  const executionMatchesCurrent = executedCode !== undefined && executedCode === code;
  const needsRun = lesson.completion === 'run'
    ? runner.state !== 'done' || !executionMatchesCurrent
    : lesson.completion === 'challenge' && !challengeMessage?.passed;
  return <section className="playground-panel" aria-label="파이썬 코드 실습"><div className="playground-toolbar"><div><span className="chapter-kicker">실행 실험실</span><h2>직접 실행해 보기</h2></div><div className="toolbar-actions"><button className="secondary-button" onClick={() => { changeCode(lesson.starterCode ?? ''); setExecutedCode(undefined); reportedRunRef.current = ''; runner.resetRunner(); }}>초기화</button>{runner.state === 'running' || runner.state === 'loading' ? <button className="danger-button" onClick={() => runner.stop()}>■ 중지</button> : <button className={`run-button ${needsRun ? 'gi-pulse' : ''}`} onClick={() => { reportedRunRef.current = ''; setExecutedCode(code); runner.run(code, lesson.challenge?.runtimeCheck); }}>▶ 코드 실행</button>}</div></div><div className="editor-wrap"><CodeEditor value={code} onChange={changeCode} /></div><div className="console-wrap"><OutputConsole state={runner.state} outputs={runner.outputs} errorHelp={runner.errorHelp} challengeMessage={challengeMessage} /></div>{hasRecordedSuccess && <p className="success-callout" role="status">✓ 이 단계는 이미 통과했어요. 추가로 실습해도 다음 단계로 계속 진행할 수 있어요.</p>}<p className="privacy-note"><span aria-hidden="true">⌁</span> 코드는 이 브라우저 안에서만 실행돼요. <button onClick={() => { setExecutedCode(undefined); reportedRunRef.current = ''; runner.resetRunner(); }}>실행 기록 지우기</button></p></section>;
}
