import { useEffect, useState } from 'react';
import { chapters, getChapterProgress, isLessonUnlocked, lessons } from '../content/chapters';
import type { LessonId } from '../content/types';

interface Props { currentId: LessonId; completed: Set<LessonId>; onSelect: (id: LessonId) => void; onReset: () => void; open: boolean; onClose: () => void; onUpdates: () => void; }

export function ChapterNav({ currentId, completed, onSelect, onReset, open, onClose, onUpdates }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const currentChapter = chapters.find((chapter) => chapter.lessons.some((lesson) => lesson.id === currentId))?.number ?? 1;
  const [expanded, setExpanded] = useState(() => new Set([currentChapter]));
  useEffect(() => { const query = window.matchMedia('(max-width: 767px)'); const update = () => setIsMobile(query.matches); update(); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  useEffect(() => { const nav = document.getElementById('chapter-navigation'); if (isMobile && !open && nav?.contains(document.activeElement)) document.getElementById('mobile-menu-button')?.focus(); }, [isMobile, open]);
  useEffect(() => { setExpanded((current) => new Set(current).add(currentChapter)); }, [currentChapter]);
  const toggleChapter = (number: number) => setExpanded((current) => { const next = new Set(current); if (next.has(number)) next.delete(number); else next.add(number); return next; });
  return <aside id="chapter-navigation" className={`chapter-nav ${open ? 'is-open' : ''}`} aria-label="학습 목차" aria-hidden={isMobile && !open}>
    <div className="nav-heading"><div><p className="eyebrow">COURSE MAP</p><h2>학습 목차</h2></div><button className="icon-button mobile-only" aria-label="목차 닫기" onClick={onClose}>×</button></div>
    <nav>{chapters.map((chapter) => { const chapterProgress = getChapterProgress(chapter, completed); return <section className="nav-chapter" key={chapter.number}>
      <button className={`nav-chapter-header ${chapter.number === chapters.find((item) => item.lessons.some((lesson) => lesson.id === currentId))?.number ? 'active' : ''}`} onClick={() => toggleChapter(chapter.number)} aria-expanded={expanded.has(chapter.number)}><span className="nav-number chapter-number">{chapterProgress === chapter.lessons.length ? '✓' : chapter.number}</span><span className="nav-chapter-copy"><strong>{chapter.number}. {chapter.title}</strong><small>{chapterProgress}/{chapter.lessons.length} 단계</small></span><span className="nav-chevron" aria-hidden="true">{expanded.has(chapter.number) ? '⌃' : '⌄'}</span></button>
      {expanded.has(chapter.number) && <div className="nav-lessons">{chapter.lessons.map((lesson) => { const index = lessons.findIndex((item) => item.id === lesson.id); const unlocked = isLessonUnlocked(index, completed); const done = completed.has(lesson.id); return <button key={lesson.id} className={`nav-item nav-lesson ${lesson.id === currentId ? 'active' : ''} ${!unlocked ? 'locked' : ''}`} aria-current={lesson.id === currentId ? 'step' : undefined} aria-disabled={!unlocked} disabled={!unlocked} onClick={() => { onSelect(lesson.id); onClose(); }}><span className={`nav-number ${done ? 'complete' : ''}`}>{done ? '✓' : unlocked ? `${chapter.number}.${lesson.order}` : '•'}</span><span><strong>{lesson.title}</strong><small>{done ? '완료했어요' : lesson.completion === 'read' ? '읽기 단계' : lesson.completion === 'run' ? '실행 단계' : '도전 단계'}</small></span></button>; })}</div>}
    </section>; })}</nav>
    <div className="progress-footer"><div className="progress-label"><span>전체 진도</span><strong>{completed.size}/{lessons.length}</strong></div><div className="progress-track"><span style={{ transform: `scaleX(${completed.size / lessons.length})` }} /></div><button className="reset-link" onClick={onReset}>진도 초기화</button><button className="text-button mobile-only nav-updates" onClick={onUpdates}>업데이트 내역</button></div>
  </aside>;
}
