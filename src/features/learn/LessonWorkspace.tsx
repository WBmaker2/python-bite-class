import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import type { Lesson } from '../../content/types';
import { LessonContent } from './LessonContent';
import { PlaygroundPanel } from '../playground/PlaygroundPanel';

interface Props { lesson: Lesson; index: number; total: number; completed: boolean; savedCode?: string; onCodeChange: (code: string) => void; onComplete: () => void; onNavigate: (index: number) => void; }

export function LessonWorkspace({ lesson, index, total, completed, savedCode, onCodeChange, onComplete, onNavigate }: Props) {
  const [mobileTab, setMobileTab] = useState<'lesson' | 'playground'>('lesson');
  const [practiceComplete, setPracticeComplete] = useState(lesson.completion === 'read');
  const [lessonRatio, setLessonRatio] = useState(48);
  const [isResizing, setIsResizing] = useState(false);
  const workspaceRef = useRef<HTMLElement>(null);
  const resizingRef = useRef(false);
  const hasPlayground = lesson.completion !== 'read';
  useEffect(() => { setMobileTab('lesson'); setPracticeComplete(lesson.completion === 'read'); }, [lesson.id, lesson.completion]);
  useEffect(() => () => { document.body.classList.remove('is-workspace-resizing'); }, []);
  const previous = () => onNavigate(index - 1); const next = () => onNavigate(index + 1);
  const canComplete = completed || practiceComplete;
  const hasNext = index < total - 1 && completed;
  const clampRatio = (value: number) => Math.min(70, Math.max(30, value));
  const stopResizing = (event?: ReactPointerEvent<HTMLDivElement>) => {
    if (event && typeof event.currentTarget.hasPointerCapture === 'function' && event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    resizingRef.current = false;
    setIsResizing(false);
    document.body.classList.remove('is-workspace-resizing');
  };
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (typeof event.currentTarget.setPointerCapture === 'function') event.currentTarget.setPointerCapture(event.pointerId);
    resizingRef.current = true;
    setIsResizing(true);
    document.body.classList.add('is-workspace-resizing');
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!resizingRef.current || !workspaceRef.current) return;
    const workspaceRect = workspaceRef.current.getBoundingClientRect();
    const separatorWidth = event.currentTarget.getBoundingClientRect().width || 16;
    const availableWidth = Math.max(1, workspaceRect.width - separatorWidth);
    const pointerOffset = event.clientX - workspaceRect.left - separatorWidth / 2;
    setLessonRatio(clampRatio((pointerOffset / availableWidth) * 100));
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === 'ArrowLeft' ? -4 : event.key === 'ArrowRight' ? 4 : 0;
    if (event.key === 'Home') {
      event.preventDefault();
      setLessonRatio(30);
    } else if (event.key === 'End') {
      event.preventDefault();
      setLessonRatio(70);
    } else if (step) {
      event.preventDefault();
      setLessonRatio((value) => clampRatio(value + step));
    }
  };
  const workspaceStyle = {
    '--lesson-width': `${lessonRatio}fr`,
    '--practice-width': `${100 - lessonRatio}fr`,
  } as CSSProperties;
  return <main ref={workspaceRef} className={`workspace ${isResizing ? 'is-resizing' : ''}`} style={workspaceStyle}>
    {hasPlayground && <div className="mobile-tabs" role="tablist"><button className={mobileTab === 'lesson' ? 'active' : ''} onClick={() => setMobileTab('lesson')} role="tab" aria-selected={mobileTab === 'lesson'}>학습 내용</button><button className={mobileTab === 'playground' ? 'active' : ''} onClick={() => setMobileTab('playground')} role="tab" aria-selected={mobileTab === 'playground'}>코드 실습</button></div>}
    <div id="lesson-pane" className={`lesson-pane ${mobileTab === 'lesson' ? 'mobile-visible' : ''}`}><LessonContent lesson={lesson} completed={completed} canComplete={canComplete} onComplete={onComplete} onPrevious={previous} onNext={next} hasPrevious={index > 0} hasNext={hasNext} /></div>
    <div
      className="workspace-separator"
      role="separator"
      aria-label="설명과 코드 실습 너비 조절"
      aria-orientation="vertical"
      aria-valuemin={30}
      aria-valuemax={70}
      aria-valuenow={lessonRatio}
      aria-valuetext={`설명 ${lessonRatio}%, 코드 실습 ${100 - lessonRatio}%`}
      aria-controls="lesson-pane playground-pane"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopResizing}
      onPointerCancel={stopResizing}
      onLostPointerCapture={stopResizing}
    >
      <span aria-hidden="true">↔</span>
    </div>
    <div id="playground-pane" className={`playground-pane ${mobileTab === 'playground' ? 'mobile-visible' : ''}`}><PlaygroundPanel lesson={lesson} savedCode={savedCode} onCodeChange={onCodeChange} onPracticeComplete={setPracticeComplete} /></div>
  </main>;
}
