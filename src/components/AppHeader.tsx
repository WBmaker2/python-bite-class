interface Props { chapter: number; completedCount: number; total: number; onMenu: () => void; onUpdates: () => void; menuOpen: boolean; profileLabel?: string; onLogin: () => void; onSubmit: () => void; onTeacher: () => void; }

export function AppHeader({ chapter, completedCount, total, onMenu, onUpdates, menuOpen, profileLabel, onLogin, onSubmit, onTeacher }: Props) {
  return <header className="app-header">
    <div className="brand-lockup"><button className="brand-mark" aria-label="교사 관리자 진입" onDoubleClick={onTeacher} onContextMenu={(event) => { event.preventDefault(); onTeacher(); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onTeacher(); } }}>{'>_'}</button><div><p className="eyebrow">중학생을 위한 코딩 실험실</p><h1>파이썬 한입 교실</h1></div></div>
    <div className="header-status"><span className="chapter-badge">CH {chapter}</span><span>{completedCount}/{total} 학습 완료</span><button id="mobile-menu-button" className="text-button mobile-only" aria-expanded={menuOpen} aria-controls="chapter-navigation" onClick={onMenu}>목차</button><button className="text-button" onClick={onUpdates}>업데이트 내역</button><button className="secondary-button header-action" title={profileLabel} onClick={onLogin}>{profileLabel ?? '로그인'}</button><button className="primary-button header-action gi-pulse" onClick={onSubmit}>과제 제출</button></div>
  </header>;
}
