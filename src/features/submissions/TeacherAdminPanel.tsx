import { useEffect, useMemo, useRef, useState } from 'react';
import { authenticateTeacher, deleteTeacherSubmission, loadTeacherSubmissions } from './submissionService';
import type { InvalidSubmissionRecord, SubmissionRecord } from './types';
import type { SubmissionReportSnapshot } from '../reports';
import { completionLabel, formatReportTimestamp, runStatusLabel, statusLabel } from '../reports/format';
import { teacherAuth } from '../../firebase/client';
import { AdminPagination } from './AdminPagination';
import { dedupeSubmissionRows, groupStudentSubmissions, paginateStudentGroups } from './adminGrouping';
import '../../styles/admin.css';

interface Props { onClose: () => void; }
type Row = SubmissionRecord | InvalidSubmissionRecord;

function completionText(row: SubmissionRecord): string { return `${row.completedRequiredCount}/${row.requiredLessonCount} 필수 단계`; }
function reportSnapshot(row: SubmissionRecord): SubmissionReportSnapshot {
  return { submissionId: row.id, id: row.id, schemaVersion: row.schemaVersion, studentUid: row.studentUid, profileId: row.profileId, school: row.school, name: row.name, curriculumVersion: row.curriculumVersion, submittedAt: row.submittedAt, requiredLessonCount: row.requiredLessonCount, completedRequiredCount: row.completedRequiredCount, progress: row.progress };
}
function isInvalidRow(row: Row): row is InvalidSubmissionRecord { return 'invalid' in row; }

interface DeleteButtonProps {
  row: Row;
  deletingId?: string;
  disabled?: boolean;
  onDelete: (row: Row) => void;
}

function DeleteButton({ row, deletingId, disabled, onDelete }: DeleteButtonProps) {
  const label = isInvalidRow(row) ? `제출 ID ${row.id}` : `${row.school} · ${row.name}`;
  return <button type="button" className="text-button danger-text submission-delete" aria-label={`${label} 제출 삭제`} disabled={disabled || Boolean(deletingId)} onClick={(event) => { event.stopPropagation(); onDelete(row); }}>{deletingId === row.id ? '삭제 중…' : '삭제'}</button>;
}

export function TeacherAdminPanel({ onClose }: Props) {
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<SubmissionRecord>();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [exporting, setExporting] = useState<string>();
  const [page, setPage] = useState(1);
  const requestGeneration = useRef(0);

  const loadRows = async (showSignedIn = false) => {
    const generation = ++requestGeneration.current;
    setBusy(true); setError(''); setNotice('');
    try {
      const loaded = dedupeSubmissionRows(await loadTeacherSubmissions());
      if (generation !== requestGeneration.current) return;
      setRows(loaded); if (showSignedIn) setSignedIn(true);
    } catch (cause) {
      if (generation === requestGeneration.current) setError(cause instanceof Error ? cause.message : '자료를 불러오지 못했어요.');
    } finally { if (generation === requestGeneration.current) setBusy(false); }
  };

  const login = async () => {
    const generation = ++requestGeneration.current;
    setBusy(true); setError(''); setNotice('');
    try {
      await authenticateTeacher();
      const loaded = dedupeSubmissionRows(await loadTeacherSubmissions());
      if (generation !== requestGeneration.current) return;
      setRows(loaded); setSignedIn(true);
    } catch (cause) {
      if (generation === requestGeneration.current) setError(cause instanceof Error ? cause.message : '교사 로그인을 완료하지 못했어요.');
    } finally { if (generation === requestGeneration.current) setBusy(false); }
  };

  const teacherLogout = async () => {
    ++requestGeneration.current; setBusy(true);
    try { await teacherAuth().signOut(); }
    finally { setSignedIn(false); setRows([]); setSelected(undefined); setExpanded(new Set()); setNotice(''); setBusy(false); }
  };

  const deleteRow = async (row: Row) => {
    if (deletingId) return;
    const label = isInvalidRow(row) ? `제출 ID ${row.id}` : `${row.school} · ${row.name}`;
    if (!window.confirm(`${label}\n이 제출 자료를 삭제할까요? 삭제 후 복구할 수 없습니다.`)) return;
    setDeletingId(row.id); setError(''); setNotice('');
    try {
      await deleteTeacherSubmission(row.id);
      setRows((current) => current.filter((item) => item.id !== row.id));
      setSelected((current) => current?.id === row.id ? undefined : current);
      setExpanded(new Set());
      setNotice('제출 자료를 삭제했습니다.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '제출 자료를 삭제하지 못했어요.');
    } finally { setDeletingId(undefined); }
  };

  const filteredGroups = useMemo(() => groupStudentSubmissions(rows, query), [rows, query]);
  const paged = useMemo(() => paginateStudentGroups(filteredGroups, page), [filteredGroups, page]);
  const invalidRows = useMemo(() => rows.filter(isInvalidRow), [rows]);

  useEffect(() => {
    if (paged.currentPage !== page) setPage(paged.currentPage);
  }, [page, paged.currentPage]);

  useEffect(() => {
    if (selected && !paged.groups.some((group) => group.latest.id === selected.id || group.history.some((row) => row.id === selected.id))) setSelected(undefined);
  }, [paged.groups, selected]);

  const changePage = (nextPage: number) => { setPage(nextPage); setExpanded(new Set()); };
  const changeQuery = (nextQuery: string) => { setQuery(nextQuery); setPage(1); setExpanded(new Set()); };

  const downloadXlsx = async (row: SubmissionRecord) => {
    if (exporting) return;
    setExporting(`${row.id}:xlsx`); setError('');
    try { const { downloadStudentWorkbook } = await import('../reports'); await downloadStudentWorkbook(reportSnapshot(row)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Excel 파일을 만들지 못했어요.'); }
    finally { setExporting(undefined); }
  };

  const downloadPdf = async (row: SubmissionRecord) => {
    if (exporting) return;
    setExporting(`${row.id}:pdf`); setError('');
    try { const { downloadStudentPdf } = await import('../reports'); await downloadStudentPdf(reportSnapshot(row)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'PDF 파일을 만들지 못했어요.'); }
    finally { setExporting(undefined); }
  };

  if (!signedIn) return <div className="dialog-backdrop" role="presentation" onClick={onClose}><section className="update-dialog admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-title" onClick={(event) => event.stopPropagation()}><div className="dialog-header"><div><p className="eyebrow">TEACHER ADMIN</p><h2 id="admin-title">교사 관리자</h2></div><button className="icon-button" aria-label="관리자 닫기" onClick={onClose}>×</button></div><p className="dialog-lead">관리자 자료는 wbmaker01@gmail.com Google 계정으로만 열 수 있습니다.</p><p className="privacy-callout">학생이 입력한 성공 여부는 브라우저 실행 기록이며, 서버 채점 결과가 아닙니다.</p>{error && <p className="form-error" role="alert">{error}</p>}<div className="dialog-actions"><button className="secondary-button" onClick={onClose}>닫기</button><button className="primary-button gi-pulse" disabled={busy} onClick={() => void login()}>{busy ? '확인 중…' : 'Google 계정으로 관리자 열기'}</button></div></section></div>;

  const resultLabel = query.trim() ? `검색 결과 학생 ${filteredGroups.length}명` : `전체 학생 ${filteredGroups.length}명 · 최근 제출순`;
  return <div className="dialog-backdrop admin-backdrop" role="presentation" onClick={onClose}><section className="update-dialog admin-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-title" onClick={(event) => event.stopPropagation()}><div className="dialog-header"><div><p className="eyebrow">TEACHER ADMIN</p><h2 id="admin-title">학생 제출 자료</h2></div><button className="icon-button" aria-label="관리자 닫기" onClick={onClose}>×</button></div><div className="admin-toolbar"><input aria-label="학교 또는 이름 검색" placeholder="학교·이름 검색" value={query} onChange={(event) => changeQuery(event.target.value)} /><button className="secondary-button" onClick={() => void loadRows()} disabled={busy || Boolean(deletingId)}>새로 고침</button><button className="text-button" onClick={() => void teacherLogout()} disabled={busy || Boolean(deletingId)}>관리자 로그아웃</button></div>{error && <p className="form-error" role="alert">{error}</p>}{notice && <p className="success-callout" role="status">{notice}</p>}<p className="admin-note">{resultLabel} · 현재 페이지 {paged.currentPage}/{paged.pageCount}</p><div className="submission-list">{invalidRows.map((row) => <article className="submission-row invalid-row" key={row.id}><div><strong>검증 실패 제출</strong><span>{row.id}</span><small>{row.error}</small></div><DeleteButton row={row} deletingId={deletingId} disabled={busy} onDelete={(item) => void deleteRow(item)} /></article>)}{filteredGroups.length === 0 && <p className="empty-state">조건에 맞는 제출이 없습니다.</p>}{paged.groups.map((group) => { const open = expanded.has(group.key); return <article className="student-group" key={group.key}><div className="submission-row-line"><button type="button" className={`submission-row group-latest ${selected?.id === group.latest.id ? 'selected' : ''}`} aria-pressed={selected?.id === group.latest.id} onClick={() => setSelected(group.latest)}><span><strong>{group.latest.school} · {group.latest.name}</strong><small>최신 제출 · {formatReportTimestamp(group.latest.submittedAt)}</small></span><b>{completionText(group.latest)}</b></button><DeleteButton row={group.latest} deletingId={deletingId} disabled={busy} onDelete={(item) => void deleteRow(item)} /></div>{group.history.length > 0 && <button type="button" className="history-toggle" aria-expanded={open} onClick={() => setExpanded((current) => { const next = new Set(current); if (next.has(group.key)) next.delete(group.key); else next.add(group.key); return next; })}>{open ? '과거 제출 접기' : `과거 제출 ${group.history.length}건 보기`}</button>}{open && <div className="submission-history">{group.history.map((row) => <div className="submission-row-line" key={row.id}><button type="button" className={`submission-row history-row ${selected?.id === row.id ? 'selected' : ''}`} aria-pressed={selected?.id === row.id} onClick={() => setSelected(row)}><span><strong>{formatReportTimestamp(row.submittedAt)}</strong><small>제출 ID: {row.id}</small></span><b>{completionText(row)}</b></button><DeleteButton row={row} deletingId={deletingId} disabled={busy} onDelete={(item) => void deleteRow(item)} /></div>)}</div>}</article>; })}</div>{paged.pageCount > 1 && <AdminPagination currentPage={paged.currentPage} pageCount={paged.pageCount} onPageChange={changePage} />}{selected && <section className="submission-detail" aria-label="선택한 제출 상세"><div className="detail-heading"><div><h3>{selected.school} · {selected.name}</h3><p>제출 시각: {formatReportTimestamp(selected.submittedAt)} · 제출 ID: {selected.id}</p></div><div className="report-actions"><button className="secondary-button" disabled={Boolean(exporting || deletingId)} onClick={() => void downloadXlsx(selected)}>{exporting === `${selected.id}:xlsx` ? 'Excel 준비 중…' : 'Excel 다운로드'}</button><button className="primary-button" disabled={Boolean(exporting || deletingId)} onClick={() => void downloadPdf(selected)}>{exporting === `${selected.id}:pdf` ? 'PDF 준비 중…' : 'PDF 다운로드'}</button><DeleteButton row={selected} deletingId={deletingId} disabled={busy || Boolean(exporting)} onDelete={(item) => void deleteRow(item)} /></div></div><p className="admin-note">학생 브라우저가 제출한 실행 기록을 표시합니다. 서버 채점 결과가 아닙니다.</p><div className="progress-table"><div className="progress-table-header"><span>단계</span><span>학습 종류 · 상태</span><span>코드</span></div>{selected.progress.map((item) => { const codeVariants = [{ label: '제출 코드', value: item.submittedCode }, ...(item.lastExecutedCode !== item.submittedCode ? [{ label: '마지막 실행 코드', value: item.lastExecutedCode }] : []), ...(item.lastSuccessCode !== item.submittedCode && item.lastSuccessCode !== item.lastExecutedCode ? [{ label: '마지막 성공 코드', value: item.lastSuccessCode }] : [])]; return <details key={item.lessonId}><summary><span>{item.title}</span><span>{completionLabel(item.completion)} · {statusLabel(item.status)}</span><span>{item.submittedCode ? `${item.submittedCode.length}자` : '없음'}</span></summary>{codeVariants.map((code) => <div className="code-variant" key={code.label}><small>{code.label}</small><pre>{code.value || '기록 없음'}</pre></div>)}<small>최근 실행: {runStatusLabel(item.lastRunStatus)} · 통과: {item.lastRunPassed === true ? '예' : item.lastRunPassed === false ? '아니요' : '기록 없음'}</small></details>; })}</div></section>}</section></div>;
}
