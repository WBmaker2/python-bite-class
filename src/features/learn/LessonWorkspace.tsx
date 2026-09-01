import { useEffect, useState } from 'react';
import type { Lesson } from '../../content/types';
import { LessonContent } from './LessonContent';
import { PlaygroundPanel } from '../playground/PlaygroundPanel';

interface Props { lesson: Lesson; index: number; total: number; completed: boolean; savedCode?: string; onCodeChange: (code: string) => void; onComplete: () => void; onNavigate: (index: number) => void; }

export function LessonWorkspace({ lesson, index, total, completed, savedCode, onCodeChange, onComplete, onNavigate }: Props) {
  const [mobileTab, setMobileTab] = useState<'lesson' | 'playground'>('lesson');
  const [practiceComplete, setPracticeComplete] = useState(lesson.completion === 'read');
  const hasPlayground = lesson.completion !== 'read';
  useEffect(() => { setMobileTab('lesson'); setPracticeComplete(lesson.completion === 'read'); }, [lesson.id, lesson.completion]);
  const previous = () => onNavigate(index - 1); const next = () => onNavigate(index + 1);
  const canComplete = completed || practiceComplete;
  const hasNext = index < total - 1 && completed;
  return <main className="workspace">{hasPlayground && <div className="mobile-tabs" role="tablist"><button className={mobileTab === 'lesson' ? 'active' : ''} onClick={() => setMobileTab('lesson')} role="tab" aria-selected={mobileTab === 'lesson'}>학습 내용</button><button className={mobileTab === 'playground' ? 'active' : ''} onClick={() => setMobileTab('playground')} role="tab" aria-selected={mobileTab === 'playground'}>코드 실습</button></div>}<div className={`lesson-pane ${mobileTab === 'lesson' ? 'mobile-visible' : ''}`}><LessonContent lesson={lesson} completed={completed} canComplete={canComplete} onComplete={onComplete} onPrevious={previous} onNext={next} hasPrevious={index > 0} hasNext={hasNext} /></div><div className={`playground-pane ${mobileTab === 'playground' ? 'mobile-visible' : ''}`}><PlaygroundPanel lesson={lesson} savedCode={savedCode} onCodeChange={onCodeChange} onPracticeComplete={setPracticeComplete} /></div></main>;
}
