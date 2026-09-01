import { useEffect, useMemo, useState } from 'react';
import type { Lesson } from '../../content/types';
import { usePythonRunner } from '../../hooks/usePythonRunner';
import { checkChallenge } from './challengeCheck';
import { CodeEditor } from './CodeEditor';
import { OutputConsole } from './OutputConsole';
import { combineStdoutOutput } from './outputText';

interface Props { lesson: Lesson; savedCode?: string; onCodeChange: (code: string) => void; onPracticeComplete: (complete: boolean) => void; }

export function PlaygroundPanel({ lesson, savedCode, onCodeChange, onPracticeComplete }: Props) {
  const [code, setCode] = useState(savedCode ?? lesson.starterCode ?? ''); const runner = usePythonRunner();
  const { resetRunner } = runner;
  // A lesson change is the only time the editor should load persisted code;
  // including savedCode here would reset the cursor after every keystroke.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setCode(savedCode ?? lesson.starterCode ?? ''); resetRunner(); }, [lesson.id]);
  const challengeMessage = useMemo(() => runner.state === 'done' && lesson.challenge ? checkChallenge(combineStdoutOutput(runner.outputs), lesson.expectedOutput, lesson.challenge.checks, code, lesson.starterCode) : undefined, [runner.state, runner.outputs, lesson.expectedOutput, lesson.challenge, lesson.starterCode, code]);
  useEffect(() => {
    const complete = lesson.completion === 'read' || (lesson.completion === 'run' ? runner.state === 'done' : lesson.completion === 'challenge' && challengeMessage?.passed === true);
    onPracticeComplete(complete);
  }, [lesson.completion, runner.state, challengeMessage, onPracticeComplete]);
  const changeCode = (next: string) => { setCode(next); onCodeChange(next); };
  if (!lesson.starterCode) return <section className="playground-panel practice-placeholder" aria-label="코드 실습 안내"><span className="chapter-kicker">READ FIRST</span><h2>읽기 단계</h2><p>가운데 설명을 읽고 핵심을 정리하면 다음 소단원이 열립니다. 다음 실행 단계에서 코드를 직접 다뤄 볼게요.</p></section>;
  const needsRun = lesson.completion === 'run' ? runner.state !== 'done' : lesson.completion === 'challenge' && !challengeMessage?.passed;
  return <section className="playground-panel" aria-label="Python 코드 실습"><div className="playground-toolbar"><div><span className="chapter-kicker">LIVE LAB</span><h2>직접 실행해 보기</h2></div><div className="toolbar-actions"><button className="secondary-button" onClick={() => { changeCode(lesson.starterCode ?? ''); runner.resetRunner(); }}>초기화</button>{runner.state === 'running' || runner.state === 'loading' ? <button className="danger-button" onClick={() => runner.stop()}>■ 중지</button> : <button className={`run-button ${needsRun ? 'gi-pulse' : ''}`} onClick={() => runner.run(code)}>▶ 코드 실행</button>}</div></div><div className="editor-wrap"><CodeEditor value={code} onChange={changeCode} /></div><div className="console-wrap"><OutputConsole state={runner.state} outputs={runner.outputs} errorHelp={runner.errorHelp} challengeMessage={challengeMessage} /></div><p className="privacy-note"><span aria-hidden="true">⌁</span> 코드는 이 브라우저 안에서만 실행돼요. <button onClick={() => runner.resetRunner()}>실행 기록 지우기</button></p></section>;
}
