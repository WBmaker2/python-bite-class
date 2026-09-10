import { useEffect, useRef, useState } from 'react';
import type { StudentProfile } from '../../hooks/useLearningProgress';
export type { StudentProfile } from '../../hooks/useLearningProgress';

export interface StudentProfileDialogProps {
  profile?: StudentProfile;
  profiles?: StudentProfile[];
  guestHasProgress?: boolean;
  onSave: (school: string, name: string) => void;
  onCreate?: (school: string, name: string, adoptGuest: boolean) => void;
  onSwitch?: (id: string) => void;
  onClose: () => void;
  onLogout?: () => void;
  onClear?: () => void;
  onReport?: () => void;
}

export function StudentProfileDialog({ profile, profiles = [], guestHasProgress = false, onSave, onCreate, onSwitch, onClose, onLogout, onClear, onReport }: StudentProfileDialogProps) {
  const [school, setSchool] = useState(profile?.school ?? '');
  const [name, setName] = useState(profile?.name ?? '');
  const [creating, setCreating] = useState(!profile?.school || !profile?.name);
  const [adoptGuest, setAdoptGuest] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const namedProfile = Boolean(profile?.school && profile.name);
  const otherProfiles = profiles.filter((item) => item.id !== profile?.id && item.id !== 'guest' && item.school && item.name);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const save = () => {
    if (!school.trim() || !name.trim()) { setError('소속(학교)과 이름을 모두 입력해 주세요.'); return; }
    if (creating) (onCreate ?? ((nextSchool: string, nextName: string) => onSave(nextSchool, nextName)))(school, name, adoptGuest);
    else onSave(school, name);
    onClose();
  };
  const startCreate = () => { setCreating(true); setSchool(''); setName(''); setError(''); setAdoptGuest(false); };
  const switchTo = (id: string) => { onSwitch?.(id); onClose(); };

  return <div className="dialog-backdrop" role="presentation" onClick={onClose}>
    <section className="update-dialog profile-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(event) => event.stopPropagation()}>
      <div className="dialog-header"><div><p className="eyebrow">LOCAL PROFILE</p><h2 id="profile-title">{creating ? '학생 정보 등록' : '학생 정보 수정'}</h2></div><button ref={closeRef} type="button" className="icon-button" aria-label="학생 정보 닫기" onClick={onClose}>×</button></div>
      <p className="dialog-lead">{creating ? '새 학생의 소속과 이름을 이 브라우저에 저장합니다.' : '현재 학생의 소속과 이름을 수정합니다. 같은 학교·이름이어도 새 학생으로 만들 수 있습니다.'}</p>
      <label className="field-label" htmlFor="school">소속(학교)<input id="school" value={school} maxLength={120} autoComplete="organization" onChange={(event) => setSchool(event.target.value)} /></label>
      <label className="field-label" htmlFor="student-name">이름<input id="student-name" value={name} maxLength={80} autoComplete="name" onChange={(event) => setName(event.target.value)} /></label>
      {creating && guestHasProgress && <label className="checkbox-label"><input type="checkbox" checked={adoptGuest} onChange={(event) => setAdoptGuest(event.target.checked)} /> 이 브라우저의 게스트 진도와 코드를 새 학생에게 옮깁니다.</label>}
      <p className="privacy-callout">소속과 이름은 로컬에만 저장되고, ‘과제 제출’을 누르기 전에는 학생 정보·진도·답 코드를 전송하지 않습니다. 제출한 자료는 로그아웃해도 서버에서 삭제되지 않습니다.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="dialog-actions"><button type="button" className="secondary-button" onClick={onClose}>취소</button><button type="button" className="primary-button gi-pulse" onClick={save}>{creating ? '새 학생 저장' : '현재 정보 저장'}</button></div>
      {namedProfile && <div className="profile-tools"><button type="button" className="text-button" onClick={startCreate}>새 학생 추가</button>{onReport && <button type="button" className="text-button" onClick={() => { onReport(); onClose(); }}>내 학습 리포트</button>}<button type="button" className="text-button" onClick={() => { onLogout?.(); onClose(); }}>로그아웃</button><button type="button" className="text-button danger-text" onClick={() => { if (window.confirm('이 기기의 현재 학생 정보와 진도를 지울까요?')) { onClear?.(); onClose(); } }}>이 기기 기록 지우기</button></div>}
      {otherProfiles.length > 0 && <div className="profile-switcher"><p className="eyebrow">SAVED STUDENTS</p><p className="admin-note">저장된 다른 학생으로 전환하면 그 학생의 진도와 현재 단계를 이어갑니다.</p>{otherProfiles.map((item) => <button type="button" className="secondary-button" key={item.id} onClick={() => switchTo(item.id)}>{item.school} · {item.name}</button>)}</div>}
    </section>
  </div>;
}
