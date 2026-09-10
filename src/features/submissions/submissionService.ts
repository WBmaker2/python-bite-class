import { buildSubmissionPayload, parseSubmissionRecord, type SubmissionPayload, type SubmissionRecord, type InvalidSubmissionRecord } from './types';
import { commitSubmission, ensureStudentUser, getSubmission, isTeacherUser, listSubmissions, signInTeacher, teacherAuth } from '../../firebase/client';
import { PENDING_SUBMISSION_STORAGE_PREFIX, type StudentProfile } from '../../hooks/useLearningProgress';
import type { StoredProgress } from '../../hooks/progressMigration';
import { lessons } from '../../content/chapters';

export function buildStudentSubmission(profile: StudentProfile, progress: StoredProgress) { return buildSubmissionPayload(profile, progress, lessons, 'pending'); }
export interface PendingSubmission { id: string; payload: SubmissionPayload; }
export function readPendingSubmission(profileId: string): PendingSubmission | undefined {
  try {
    const raw = localStorage.getItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${profileId}`); if (!raw) return undefined;
    const candidate = JSON.parse(raw) as PendingSubmission;
    if (!candidate || typeof candidate.id !== 'string' || !candidate.payload || candidate.payload.schemaVersion !== 1 || candidate.payload.profileId !== profileId || candidate.payload.studentUid === undefined) throw new Error('corrupt');
    parseSubmissionRecord({ id: candidate.id, ...candidate.payload, submittedAt: new Date().toISOString() });
    return candidate;
  } catch { localStorage.removeItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${profileId}`); return undefined; }
}
export function discardPendingSubmission(profileId: string) { localStorage.removeItem(`${PENDING_SUBMISSION_STORAGE_PREFIX}${profileId}`); }
function snapshotComparable(value: Record<string, unknown>) { const copy = { ...value }; delete copy.submittedAt; delete copy.id; const stable = (item: unknown): unknown => Array.isArray(item) ? item.map(stable) : item && typeof item === 'object' ? Object.fromEntries(Object.entries(item as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, stable(child)])) : item; return JSON.stringify(stable(copy)); }
export async function submitStudentProgress(profile: StudentProfile, progress: StoredProgress, existingId?: string) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) throw new Error('현재 오프라인이에요. 연결한 뒤 제출 버튼을 다시 눌러 주세요.');
  const pendingKey = `${PENDING_SUBMISSION_STORAGE_PREFIX}${profile.id}`;
  const pending = readPendingSubmission(profile.id);
  const id = existingId ?? pending?.id ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `submission-${Date.now()}`);
  let payload = pending?.id === id ? pending.payload : buildSubmissionPayload(profile, progress, lessons, 'pending');
  if (!pending || pending.id !== id) localStorage.setItem(pendingKey, JSON.stringify({ id, payload }));
  const user = await ensureStudentUser();
  if (payload.studentUid === 'pending') { payload = { ...payload, studentUid: user.uid }; localStorage.setItem(pendingKey, JSON.stringify({ id, payload })); }
  if (payload.studentUid !== user.uid) throw new Error('이 제출을 만든 학생 인증을 확인할 수 없습니다. 새 제출을 시작해 주세요.');
  const result = await commitSubmission(id, payload as unknown as Record<string, unknown>, user);
  if (result.accepted) { localStorage.removeItem(pendingKey); return { id, duplicate: false, receiptAt: result.receiptAt };
  }
  const existing = await getSubmission(id, user) as Record<string, unknown> | undefined;
  if (!existing || snapshotComparable(existing) !== snapshotComparable(payload as unknown as Record<string, unknown>)) throw new Error('같은 제출 ID의 다른 자료가 있어 접수를 확인할 수 없습니다. 새로 제출해 주세요.');
  localStorage.removeItem(pendingKey);
  return { id, duplicate: true, receiptAt: typeof existing.submittedAt === 'string' ? existing.submittedAt : undefined };
}
export async function authenticateTeacher() { const user = await signInTeacher(); if (!isTeacherUser(user)) throw new Error('교사 권한을 확인하지 못했어요.'); return user; }
export async function loadTeacherSubmissions(): Promise<Array<SubmissionRecord | InvalidSubmissionRecord>> {
  const user = teacherAuth().currentUser;
  if (!isTeacherUser(user)) throw new Error('교사 Google 계정으로 먼저 로그인해 주세요.');
  const rows = await listSubmissions(user!);
  return rows.map((row) => { try { return parseSubmissionRecord(row); } catch (error) { return { id: row.id, invalid: true as const, error: error instanceof Error ? error.message : '자료 검증 실패', submittedAt: typeof row.submittedAt === 'string' ? row.submittedAt : undefined }; } });
}
