import { useEffect, useMemo, useRef, useState } from 'react';
import type { LessonId } from '../../content/types';
import type { StudentProfile } from '../../hooks/useLearningProgress';
import type { StoredProgress } from '../../hooks/progressMigration';
import { chapterReportSummaries, completionLabel, runStatusLabel, statusLabel } from './format';
import { buildLocalStudentReportSnapshot, currentReportChapter, hasLocalLearningRecord, type StudentReportScope } from './student';

interface Props {
  profile?: StudentProfile;
  progress: StoredProgress;
  currentLessonId?: LessonId;
  onClose: () => void;
  onNeedProfile: () => void;
}

export function StudentReportDialog({ profile, progress, currentLessonId, onClose, onNeedProfile }: Props) {
  const [scope, setScope] = useState<StudentReportScope>('all');
  const [includeCode, setIncludeCode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const chapter = currentReportChapter(currentLessonId);
  const preview = useMemo(() => profile ? buildLocalStudentReportSnapshot(profile, progress, { scope, chapter, currentLessonId, includeCode }) : undefined, [profile, progress, scope, chapter, currentLessonId, includeCode]);
  const hasRecord = hasLocalLearningRecord(progress);

  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape' && !busy) onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [busy, onClose]);

  const download = async () => {
    if (!profile || !preview || busy) return;
    setBusy(true); setError('');
    try {
      const frozen = buildLocalStudentReportSnapshot(profile, progress, { scope, chapter, currentLessonId, includeCode });
      const { downloadLocalStudentPdf } = await import('./studentPdf');
      await downloadLocalStudentPdf(frozen);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '리포트를 만들지 못했어요. 다시 시도해 주세요.');
    } finally { setBusy(false); }
  };

  return <div className="dialog-backdrop" role="presentation" onClick={() => { if (!busy) onClose(); }}>
    <section className="update-dialog report-dialog" role="dialog" aria-modal="true" aria-labelledby="student-report-title" onClick={(event) => event.stopPropagation()}>
      <div className="dialog-header"><div><p className="eyebrow">LOCAL LEARNING REPORT</p><h2 id="student-report-title">내 학습 리포트</h2></div><button ref={closeRef} type="button" className="icon-button" aria-label="학습 리포트 닫기" onClick={onClose} disabled={busy}>×</button></div>
      {!profile ? <><div className="report-dialog-body"><p className="dialog-lead">리포트를 만들려면 먼저 이 기기에 학생 정보를 등록해 주세요.</p><p className="privacy-callout">PDF를 내려받아도 학교·이름·학습 기록은 Firebase로 전송되지 않습니다. 이름으로 다른 기기의 기록을 불러오지도 않습니다.</p></div><div className="report-dialog-footer"><div className="dialog-actions"><button type="button" className="secondary-button" onClick={onClose}>돌아가기</button><button type="button" className="primary-button gi-pulse" onClick={onNeedProfile}>학생 정보 등록</button></div></div></> : !hasRecord ? <><div className="report-dialog-body"><p className="dialog-lead"><strong>{profile.school} · {profile.name}</strong>님의 저장된 학습 기록이 아직 없어요.</p><p className="report-empty">단계를 완료하거나 코드를 작성·실행한 뒤 리포트를 만들어 보세요. 실패한 실행 기록도 학습 기록으로 표시됩니다.</p></div><div className="report-dialog-footer"><div className="dialog-actions"><button type="button" className="primary-button gi-pulse" onClick={onClose}>학습으로 돌아가기</button></div></div></> : <>
        <div className="report-dialog-body"><p className="dialog-lead"><strong>{profile.school} · {profile.name}</strong>님의 이 기기 학습 기록입니다.</p>
        <div className="report-controls"><label className="field-label" htmlFor="report-scope">보고서 범위<select id="report-scope" value={scope} onChange={(event) => setScope(event.target.value as StudentReportScope)}><option value="all">전체 학습</option><option value="chapter">현재 {chapter}장</option></select></label><label className="checkbox-label"><input type="checkbox" checked={includeCode} onChange={(event) => setIncludeCode(event.target.checked)} /> 작성한 코드 포함</label></div>
        {preview && <><div className="report-summary-grid"><div><span>완료한 필수 단계</span><strong>{preview.completedRequiredCount}/{preview.requiredLessonCount}</strong></div><div><span>리포트 범위</span><strong>{scope === 'all' ? '전체 학습' : `현재 ${chapter}장`}</strong></div><div className="report-next-step"><span>이어서 할 일</span><strong>{preview.nextStepLabel ?? '모든 필수 단계를 완료했어요.'}</strong></div></div><section className="report-chapters"><h3>장별 진도</h3>{chapterReportSummaries(preview).map((item) => <div className="report-chapter-row" key={item.chapter}><span>{item.chapter}</span><div className="report-progress-track"><i style={{ transform: `scaleX(${item.requiredCount ? item.completedCount / item.requiredCount : 0})` }} /></div><strong>{item.completedCount}/{item.requiredCount}</strong></div>)}</section><section className="report-lesson-list"><h3>단계별 기록</h3>{preview.progress.map((item) => <details key={item.lessonId}><summary><strong>{item.title}</strong><span>{completionLabel(item.completion)} · {statusLabel(item.status)} · {item.completed ? '완료' : '미완료'}</span>{item.lastRunStatus && <small>{runStatusLabel(item.lastRunStatus)}{item.lastRunPassed === true ? ' · 통과' : item.lastRunPassed === false ? ' · 실패' : ''}</small>}</summary><div className="report-lesson-detail">{item.lastRunStatus ? `마지막 실행: ${runStatusLabel(item.lastRunStatus)}` : '아직 실행 기록이 없어요.'}{item.lastRunAt ? ` · ${item.lastRunAt}` : ''}</div></details>)}</section></>}
        <p className="privacy-callout">PDF는 이 기기의 학습 기록으로 만들며, 과제로 제출되지 않습니다.{includeCode ? ' 작성한 코드 원문도 함께 넣습니다.' : ''}</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        </div><div className="report-dialog-footer"><div className="dialog-actions"><button type="button" className="secondary-button" onClick={onClose} disabled={busy}>닫기</button><button type="button" className="primary-button gi-pulse" onClick={() => void download()} disabled={busy}>{busy ? 'PDF 만드는 중…' : 'PDF 내려받기'}</button></div></div>
      </>}
    </section>
  </div>;
}
