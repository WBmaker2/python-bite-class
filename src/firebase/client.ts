import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInAnonymously, signInWithPopup, type User } from 'firebase/auth';
import { firebaseConfig, firebaseConfigured } from './config';

function app(name: string): FirebaseApp {
  const existing = getApps().find((item) => item.name === name);
  return existing ?? initializeApp(firebaseConfig, name);
}
function requireConfig() { if (!firebaseConfigured) throw new Error('Firebase 설정이 아직 연결되지 않았습니다. 교사에게 설정을 요청해 주세요.'); }
export function studentAuth() { requireConfig(); return getAuth(app('student')); }
export function teacherAuth() { requireConfig(); return getAuth(app('teacher')); }
export async function ensureStudentUser(): Promise<User> { const auth = studentAuth(); await auth.authStateReady(); if (auth.currentUser?.isAnonymous) return auth.currentUser; return (await signInAnonymously(auth)).user; }
export async function signInTeacher(): Promise<User> { const auth = teacherAuth(); const provider = new GoogleAuthProvider(); provider.setCustomParameters({ login_hint: 'wbmaker01@gmail.com' }); const result = await signInWithPopup(auth, provider); const user = result.user; if (user.email !== 'wbmaker01@gmail.com' || !user.emailVerified || user.providerData.some((item) => item.providerId === 'password')) { await auth.signOut(); throw new Error('wbmaker01@gmail.com Google 계정으로만 관리자 페이지를 열 수 있습니다.'); } return user; }
export function isTeacherUser(user: User | null) { return Boolean(user?.email === 'wbmaker01@gmail.com' && user.emailVerified && user.providerData.some((item) => item.providerId === 'google.com')); }

function firestoreValue(value: unknown): Record<string, unknown> {
  if (value === null) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
  if (typeof value === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, firestoreValue(item)])) } };
  return { nullValue: null };
}
function firestoreFields(value: Record<string, unknown>) { return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firestoreValue(item)])); }
async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(input, { ...init, signal: controller.signal }); } catch (error) { if (error instanceof DOMException && error.name === 'AbortError') throw new Error('Firebase 응답이 늦어 제출 상태를 확인하지 못했어요. 연결을 확인하고 다시 시도해 주세요.'); throw error; } finally { clearTimeout(timer); }
}
function fromFirestoreValue(value: Record<string, any>): any {
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('integerValue' in value) return Number(value.integerValue);
  if ('doubleValue' in value) return value.doubleValue;
  if ('timestampValue' in value) return value.timestampValue;
  if ('nullValue' in value) return null;
  if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(fromFirestoreValue);
  if ('mapValue' in value) return Object.fromEntries(Object.entries(value.mapValue.fields ?? {}).map(([key, item]) => [key, fromFirestoreValue(item as Record<string, any>)]));
  return undefined;
}
export async function commitSubmission(id: string, payload: Record<string, unknown>, user: User) {
  requireConfig();
  const token = await user.getIdToken();
  const endpoint = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:commit`;
  const fieldsPayload: Record<string, unknown> = { ...payload, progressJson: JSON.stringify(payload.progress) }; delete fieldsPayload.submittedAt; delete fieldsPayload.progress;
  const response = await fetchWithTimeout(endpoint, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ writes: [{ update: { name: `projects/${firebaseConfig.projectId}/databases/(default)/documents/submissions/${id}`, fields: firestoreFields(fieldsPayload) }, updateTransforms: [{ fieldPath: 'submittedAt', setToServerValue: 'REQUEST_TIME' }], currentDocument: { exists: false } }] }) });
  if (response.ok) { const body = await response.json().catch(() => ({})) as { commitTime?: string }; return { accepted: true, receiptAt: body.commitTime }; }
  if (response.status === 409) return { accepted: false, duplicate: true };
  const detail = await response.text();
  throw new Error(`제출을 저장하지 못했어요 (${response.status}). ${detail.slice(0, 180)}`);
}
export async function getSubmission(id: string, user: User) {
  const token = await user.getIdToken();
  const path = `projects/${firebaseConfig.projectId}/databases/(default)/documents/submissions/${encodeURIComponent(id)}`;
  const response = await fetchWithTimeout(`https://firestore.googleapis.com/v1/${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('제출 접수 상태를 확인하지 못했어요.');
  const raw = await response.json() as { name: string; fields?: Record<string, Record<string, unknown>>; createTime?: string };
  const fields = Object.fromEntries(Object.entries(raw.fields ?? {}).map(([key, value]) => [key, fromFirestoreValue(value)]));
  if (typeof fields.progressJson === 'string') { try { fields.progress = JSON.parse(fields.progressJson); } catch { fields.progress = undefined; } delete fields.progressJson; }
  return { id, ...fields, submittedAt: raw.createTime };
}
export async function listSubmissions(user: User) {
  const token = await user.getIdToken();
  const response = await fetchWithTimeout(`https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents:runQuery`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'submissions' }], orderBy: [{ field: { fieldPath: 'submittedAt' }, direction: 'DESCENDING' }] } }) });
  if (!response.ok) throw new Error('제출 목록을 불러오지 못했어요.');
  const rows = await response.json() as Array<{ document?: { name: string; fields?: Record<string, Record<string, unknown>>; createTime?: string } }>;
  return rows.filter((row) => row.document).map((row) => { const doc = row.document!; const id = doc.name.split('/').pop() ?? ''; const fields = Object.fromEntries(Object.entries(doc.fields ?? {}).map(([key, value]) => [key, fromFirestoreValue(value)])); if (typeof fields.progressJson === 'string') { try { fields.progress = JSON.parse(fields.progressJson); } catch { fields.progress = undefined; } delete fields.progressJson; } return { id, ...fields, submittedAt: doc.createTime }; });
}
