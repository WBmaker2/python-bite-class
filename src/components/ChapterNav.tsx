import { useEffect, useState } from 'react';
import { lessons } from '../content/chapters';
import type { LessonId } from '../content/types';

interface Props { currentId: LessonId; completed: Set<LessonId>; onSelect: (id: LessonId) => void; onReset: () => void; open: boolean; onClose: () => void; onUpdates: () => void; }

export function ChapterNav({ currentId, completed, onSelect, onReset, open, onClose, onUpdates }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { const query = window.matchMedia('(max-width: 767px)'); const update = () => setIsMobile(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return <aside id="chapter-navigation" className={`chapter-nav ${open ? 'is-open' : ''}`} aria-label="학습 목차" aria-hidden={isMobile && !open}>
    <div className="nav-heading"><div><p className="eyebrow">COURSE MAP</p><h2>학습 목차</h2></div><button className="icon-button mobile-only" aria-label="목차 닫기" onClick={onClose}>×</button></div>
    <nav>{lessons.map((lesson, index) => <button key={lesson.id} className={`nav-item ${lesson.id === currentId ? 'active' : ''}`} aria-current={lesson.id === currentId ? 'step' : undefined} onClick={() => { onSelect(lesson.id); onClose(); }}><span className={`nav-number ${completed.has(lesson.id) ? 'complete' : ''}`}>{completed.has(lesson.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><span><strong>{lesson.chapter}. {lesson.title}</strong><small>{completed.has(lesson.id) ? '완료했어요' : '시작하기'}</small></span></button>)}</nav>
    <div className="progress-footer"><div className="progress-label"><span>전체 진도</span><strong>{completed.size}/{lessons.length}</strong></div><div className="progress-track"><span style={{ width: `${(completed.size / lessons.length) * 100}%` }} /></div><button className="reset-link" onClick={onReset}>진도 초기화</button><button className="text-button mobile-only nav-updates" onClick={onUpdates}>업데이트 내역</button></div>
  </aside>;
}
