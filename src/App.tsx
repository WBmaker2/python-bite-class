import { useEffect, useMemo, useState } from 'react';
import { lessons, getLesson } from './content/chapters';
import type { LessonId } from './content/types';
import { useLearningProgress } from './hooks/useLearningProgress';
import { AppHeader } from './components/AppHeader';
import { ChapterNav } from './components/ChapterNav';
import { UpdateHistoryDialog } from './components/UpdateHistoryDialog';
import { LessonWorkspace } from './features/learn/LessonWorkspace';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

const CURRENT_KEY = 'python-bite-class-current-v1';
function initialLessonId(): LessonId { const saved = localStorage.getItem(CURRENT_KEY); return (saved && lessons.some((lesson) => lesson.id === saved) ? saved : lessons[0].id) as LessonId; }

export default function App() {
  const [currentId, setCurrentId] = useState<LessonId>(initialLessonId); const [navOpen, setNavOpen] = useState(false); const [showUpdates, setShowUpdates] = useState(false);
  const { progress, completed, toggleComplete, saveCode, resetProgress } = useLearningProgress();
  const index = Math.max(0, lessons.findIndex((lesson) => lesson.id === currentId)); const lesson = useMemo(() => getLesson(currentId), [currentId]);
  useEffect(() => { localStorage.setItem(CURRENT_KEY, currentId); }, [currentId]);
  const navigate = (nextIndex: number) => { const next = lessons[nextIndex]; if (next) setCurrentId(next.id); };
  const reset = () => { if (window.confirm('저장된 학습 진도와 코드를 모두 지울까요?')) { resetProgress(); setCurrentId(lessons[0].id); } };
  return <div className="app-shell"><AppHeader chapter={lesson.chapter} completedCount={completed.size} total={lessons.length} onMenu={() => setNavOpen((value) => !value)} onUpdates={() => setShowUpdates(true)} menuOpen={navOpen} /><div className="main-grid"><ChapterNav currentId={lesson.id} completed={completed} onSelect={setCurrentId} onReset={reset} open={navOpen} onClose={() => setNavOpen(false)} onUpdates={() => setShowUpdates(true)} /><LessonWorkspace lesson={lesson} index={index} total={lessons.length} completed={completed.has(lesson.id)} savedCode={progress.codeByLesson[lesson.id]} onCodeChange={(code) => saveCode(lesson.id, code)} onComplete={() => toggleComplete(lesson.id)} onNavigate={navigate} /></div>{showUpdates && <UpdateHistoryDialog onClose={() => setShowUpdates(false)} />}</div>;
}
