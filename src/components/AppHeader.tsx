interface Props { chapter: number; completedCount: number; total: number; onMenu: () => void; onUpdates: () => void; menuOpen: boolean; }

export function AppHeader({ chapter, completedCount, total, onMenu, onUpdates, menuOpen }: Props) {
  return <header className="app-header">
    <div className="brand-lockup"><span className="brand-mark" aria-hidden="true">{'>_'}</span><div><p className="eyebrow">중학생을 위한 코딩 실험실</p><h1>파이썬 한입 교실</h1></div></div>
    <div className="header-status"><span className="chapter-badge">CH {chapter}</span><span>{completedCount}/{total} 학습 완료</span><button id="mobile-menu-button" className="text-button mobile-only" aria-expanded={menuOpen} aria-controls="chapter-navigation" onClick={onMenu}>목차</button><button className="text-button" onClick={onUpdates}>업데이트 내역</button></div>
  </header>;
}
