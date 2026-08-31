import type { Lesson } from '../../content/types';

interface Props { lesson: Lesson; completed: boolean; onComplete: () => void; onPrevious: () => void; onNext: () => void; hasPrevious: boolean; hasNext: boolean; }

export function LessonContent({ lesson, completed, onComplete, onPrevious, onNext, hasPrevious, hasNext }: Props) {
  const bannerSrc = `${import.meta.env.BASE_URL}assets/python-learning-banner.png`;
  return <article className="lesson-content">
    {lesson.chapter === 2 && <div className="learning-banner"><img src={bannerSrc} alt="노트북으로 파이썬을 배우는 학생" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><div className="banner-fallback"><span>파이썬</span><strong>오늘의 첫 코드</strong><p>생각을 코드로 바꿔 보세요.</p></div><div className="banner-copy"><span className="chapter-kicker">CHAPTER {lesson.chapter}</span><strong>처음 만나는<br />파이썬</strong><span className="banner-note">한 줄씩, 직접 실행해요</span></div></div>}
    <div className="lesson-heading"><span className="chapter-kicker">CHAPTER {String(lesson.chapter).padStart(2, '0')} · LESSON {lesson.order}</span><h2>{lesson.title}</h2><p>{lesson.summary}</p></div>
    <section className="objectives"><h3>오늘 할 일</h3><ul>{lesson.objectives.map((objective) => <li key={objective}><span>✓</span>{objective}</li>)}</ul></section>
    <div className="concept-stack">{lesson.concepts.map((concept, index) => <section className={`concept-block ${concept.type}`} key={`${concept.title ?? concept.type}-${index}`}><div className="concept-label">{concept.type === 'example' ? 'TRY IT' : concept.type === 'tip' ? 'TIP' : concept.type === 'warning' ? 'NOTE' : 'CONCEPT'}</div><div><h3>{concept.title}</h3><p>{concept.body}</p>{concept.code && <pre><code>{concept.code}</code></pre>}</div></section>)}</div>
    <section className="glossary-block" aria-labelledby="glossary-title"><div className="concept-label">GLOSSARY</div><div><h3 id="glossary-title">핵심 용어</h3><dl>{lesson.glossary.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}</dd></div>)}</dl></div></section>
    <section className="challenge-block"><div className="challenge-heading"><span className="challenge-icon" aria-hidden="true">✦</span><div><span className="chapter-kicker">YOUR TURN</span><h3>도전 과제</h3></div></div><p>{lesson.challenge.prompt}</p><details><summary>힌트 보기</summary><p>{lesson.challenge.hint}</p></details></section>
    <footer className="lesson-actions"><button className="secondary-button" onClick={onPrevious} disabled={!hasPrevious}>← 이전</button><button className={`primary-button ${completed ? 'is-complete' : 'gi-pulse'}`} onClick={onComplete}>{completed ? '✓ 학습 완료됨' : '학습 완료'}</button><button className="secondary-button next-button" onClick={onNext} disabled={!hasNext}>다음 학습 →</button></footer>
  </article>;
}
