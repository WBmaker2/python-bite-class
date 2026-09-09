import { useEffect, useMemo, useState } from 'react';
import { lessons, getCompletedLessonCount, getLesson, getNextRequiredLessonIndex, getRequiredLessonCount, isLessonUnlocked } from './content/chapters';
import type { LessonId } from './content/types';
import { migrateLessonId } from './hooks/progressMigration';
import { useLearningProgress } from './hooks/useLearningProgress';
import { AppHeader } from './components/AppHeader';
import { ChapterNav } from './components/ChapterNav';
import { UpdateHistoryDialog } from './components/UpdateHistoryDialog';
import { LessonWorkspace } from './features/learn/LessonWorkspace';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

const CURRENT_KEY = 'python-bite-class-current-v3';
const CHAPTER11_NOTICE_KEY = 'python-bite-class-chapter11-notice-v1';
function initialLessonId(): LessonId {
  const current = localStorage.getItem(CURRENT_KEY);
  if (current) {
    const migratedCurrent = migrateLessonId(current);
    if (lessons.some((lesson) => lesson.id === migratedCurrent)) return migratedCurrent as LessonId;
  }
  const legacy = localStorage.getItem('python-bite-class-current-v2') ?? localStorage.getItem('python-bite-class-current-v1');
  const candidate = legacy?.startsWith('chapter-11-') ? 'chapter-11-1' : legacy ? migrateLessonId(legacy) : lessons[0].id;
  return (lessons.some((lesson) => lesson.id === candidate) ? candidate : lessons[0].id) as LessonId;
}

export default function App() {
  const [currentId, setCurrentId] = useState<LessonId>(initialLessonId); const [navOpen, setNavOpen] = useState(false); const [showUpdates, setShowUpdates] = useState(false);
  const { progress, completed, markComplete, saveCode, resetProgress } = useLearningProgress();
  const [showChapter11Notice, setShowChapter11Notice] = useState(() => Boolean(localStorage.getItem('python-bite-class-progress-chapter11-v1') && !localStorage.getItem(CHAPTER11_NOTICE_KEY)));
  const index = Math.max(0, lessons.findIndex((lesson) => lesson.id === currentId)); const lesson = useMemo(() => getLesson(currentId), [currentId]);
  useEffect(() => { localStorage.setItem(CURRENT_KEY, currentId); }, [currentId]);
  useEffect(() => { if (!isLessonUnlocked(index, completed)) { const firstOpen = lessons.findIndex((_, lessonIndex) => isLessonUnlocked(lessonIndex, completed)); setCurrentId(lessons[firstOpen < 0 ? 0 : firstOpen].id); } }, [completed, index]);
  const navigate = (nextIndex: number) => { const targetIndex = nextIndex > index ? getNextRequiredLessonIndex(index) : nextIndex; const next = lessons[targetIndex]; if (next && isLessonUnlocked(targetIndex, completed)) setCurrentId(next.id); };
  const reset = () => { if (window.confirm('저장된 학습 진도와 코드를 모두 지울까요?')) { resetProgress(); setCurrentId(lessons[0].id); } };
  const dismissChapter11Notice = () => { localStorage.setItem(CHAPTER11_NOTICE_KEY, 'seen'); setShowChapter11Notice(false); };
  return <div className="app-shell"><AppHeader chapter={lesson.chapter} completedCount={getCompletedLessonCount(completed)} total={getRequiredLessonCount()} onMenu={() => setNavOpen((value) => !value)} onUpdates={() => setShowUpdates(true)} menuOpen={navOpen} />{showChapter11Notice && <aside className="migration-notice" role="status"><div><strong>11단원이 새로 바뀌었어요</strong><p>이전 11단원 기록은 따로 보관하고, 새 실생활 문제 풀이를 시작해요.</p></div><div><button className="primary-button gi-pulse" onClick={() => { setCurrentId('chapter-11-1'); dismissChapter11Notice(); }}>새 11단원 시작하기</button><button className="secondary-button" onClick={dismissChapter11Notice}>닫기</button></div></aside>}<div className="main-grid"><ChapterNav currentId={lesson.id} completed={completed} onSelect={(id) => { const nextIndex = lessons.findIndex((item) => item.id === id); if (isLessonUnlocked(nextIndex, completed)) setCurrentId(id); }} onReset={reset} open={navOpen} onClose={() => setNavOpen(false)} onUpdates={() => setShowUpdates(true)} /><LessonWorkspace lesson={lesson} index={index} total={lessons.length} completed={completed.has(lesson.id)} savedCode={progress.codeByLesson[lesson.id]} onCodeChange={(code) => saveCode(lesson.id, code)} onComplete={() => markComplete(lesson.id)} onNavigate={navigate} /></div>{showUpdates && <UpdateHistoryDialog onClose={() => setShowUpdates(false)} />}</div>;
}
