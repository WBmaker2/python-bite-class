import { useEffect, useRef } from 'react';
import { sources, updates } from '../content/updateHistory';

export function UpdateHistoryDialog({ onClose }: { onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return <div className="dialog-backdrop" role="presentation" onClick={onClose}><section className="update-dialog" role="dialog" aria-modal="true" aria-labelledby="updates-title" onClick={(event) => event.stopPropagation()}><div className="dialog-header"><div><p className="eyebrow">CHANGELOG</p><h2 id="updates-title">업데이트 내역</h2></div><button ref={closeButton} className="icon-button" aria-label="업데이트 내역 닫기" onClick={onClose}>×</button></div><div className="update-list">{updates.map((update) => <article key={update.date + update.label}><time>{update.date}</time><div><strong>{update.label}</strong><p>{update.detail}</p></div></article>)}</div><div className="source-block"><h3>교재와 출처</h3><p>학습 내용은 원문을 중학생 눈높이에 맞게 다시 쓰고, 코드 예시는 교육 목적에 맞게 구성했습니다.</p>{sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.title}<span aria-hidden="true">↗</span></a>)}<p className="license-note">A Byte of Python의 원저작자·번역자 및 CC BY-SA 4.0 조건을 존중합니다. 이 앱은 개인정보를 받지 않으며 코드가 브라우저 밖으로 전송되지 않습니다.</p></div></section></div>;
}
