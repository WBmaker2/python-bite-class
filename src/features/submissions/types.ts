import type { CompletionMode, LessonId } from '../../content/types';
import type { ExecutionEvidence, StoredProgress } from '../../hooks/progressMigration';

export type ProgressStatus = 'not_started' | 'success' | 'failed' | 'modified_unexecuted' | 'completed_unverified' | 'read_complete' | 'optional';
export interface SubmittedLesson {
  lessonId: LessonId;
  title: string;
  completion: CompletionMode;
  completed: boolean;
  status: ProgressStatus;
  submittedCode: string;
  lastExecutedCode: string;
  lastRunStatus: string;
  lastRunPassed: boolean | null;
  lastRunAt: string;
  lastSuccessCode: string;
  lastSuccessAt: string;
  outputSummary: string;
}
export interface SubmissionPayload {
  schemaVersion: 1;
  studentUid: string;
  profileId: string;
  school: string;
  name: string;
  curriculumVersion: string;
  submittedAt: 'SERVER_TIMESTAMP';
  requiredLessonCount: number;
  completedRequiredCount: number;
  progress: SubmittedLesson[];
}
export interface SubmissionRecord extends Omit<SubmissionPayload, 'submittedAt'> { id: string; submittedAt?: string; }
export interface InvalidSubmissionRecord { id: string; invalid: true; error: string; submittedAt?: string; }

const MAX_CODE = 12000;
const MAX_OUTPUT = 1000;
function boundedText(value: unknown, max: number, label: string) { if (typeof value !== 'string') return ''; if (value.length > max) throw new Error(`${label}이(가) 너무 길어요. ${max.toLocaleString()}자 이내로 줄인 뒤 다시 제출해 주세요.`); return value; }
export function statusForLesson(completed: boolean, completion: CompletionMode, code: string, evidence?: ExecutionEvidence): ProgressStatus {
  if (completion === 'optional') return 'optional';
  if (completion === 'read') return completed ? 'read_complete' : 'not_started';
  if (evidence?.lastExecutedCode !== undefined && evidence.lastExecutedCode !== code) return 'modified_unexecuted';
  if (evidence?.lastRunStatus === 'done' && evidence.lastRunPassed === true && evidence.lastExecutedCode === code) return 'success';
  if (evidence?.lastRunStatus === 'done' || evidence?.lastRunStatus === 'error' || evidence?.lastRunStatus === 'timeout' || evidence?.lastRunStatus === 'stopped') return 'failed';
  return completed ? 'completed_unverified' : 'not_started';
}
export function buildSubmissionPayload(profile: { id: string; school: string; name: string }, progress: StoredProgress, lessons: Array<{ id: LessonId; title: string; completion: CompletionMode; starterCode?: string }>, studentUid: string): SubmissionPayload {
  const required = lessons.filter((lesson) => lesson.completion !== 'optional');
  if (!profile.school.trim() || !profile.name.trim()) throw new Error('제출하려면 소속(학교)과 이름을 먼저 입력해 주세요.');
  if (profile.school.trim().length > 120) throw new Error('소속(학교)은 120자 이내로 입력해 주세요.');
  if (profile.name.trim().length > 80) throw new Error('이름은 80자 이내로 입력해 주세요.');
  const rows = lessons.map((lesson) => {
    const code = progress.codeByLesson[lesson.id] ?? String(lesson.starterCode ?? '');
    const evidence = progress.executionByLesson[lesson.id];
    return {
      lessonId: lesson.id, title: lesson.title, completion: lesson.completion,
      completed: progress.completed.includes(lesson.id), status: statusForLesson(progress.completed.includes(lesson.id), lesson.completion, code, evidence),
      submittedCode: boundedText(code, MAX_CODE, `${lesson.title} 답 코드`), lastExecutedCode: boundedText(evidence?.lastExecutedCode, MAX_CODE, `${lesson.title} 실행 코드`), lastRunStatus: boundedText(evidence?.lastRunStatus, 20, `${lesson.title} 실행 상태`), lastRunPassed: typeof evidence?.lastRunPassed === 'boolean' ? evidence.lastRunPassed : null, lastRunAt: boundedText(evidence?.lastRunAt, 40, `${lesson.title} 실행 시각`), lastSuccessCode: boundedText(evidence?.lastSuccessCode, MAX_CODE, `${lesson.title} 성공 코드`), lastSuccessAt: boundedText(evidence?.lastSuccessAt, 40, `${lesson.title} 성공 시각`), outputSummary: boundedText(evidence?.outputSummary, MAX_OUTPUT, `${lesson.title} 출력 요약`),
    } satisfies SubmittedLesson;
  });
  return { schemaVersion: 1, studentUid, profileId: profile.id, school: profile.school.trim(), name: profile.name.trim(), curriculumVersion: '2026-09', submittedAt: 'SERVER_TIMESTAMP', requiredLessonCount: required.length, completedRequiredCount: required.filter((lesson) => progress.completed.includes(lesson.id)).length, progress: rows };
}

const statuses = new Set<ProgressStatus>(['not_started', 'success', 'failed', 'modified_unexecuted', 'completed_unverified', 'read_complete', 'optional']);
export function parseSubmissionRecord(value: unknown): SubmissionRecord {
  if (!value || typeof value !== 'object') throw new Error('제출 자료가 객체가 아닙니다.');
  const item = value as Record<string, unknown>;
  const allowed = new Set(['id', 'schemaVersion', 'studentUid', 'profileId', 'school', 'name', 'curriculumVersion', 'requiredLessonCount', 'completedRequiredCount', 'progress', 'submittedAt']);
  if (Object.keys(item).some((key) => !allowed.has(key))) throw new Error('알 수 없는 제출 항목이 있습니다.');
  for (const key of ['id', 'schemaVersion', 'studentUid', 'profileId', 'school', 'name', 'curriculumVersion', 'requiredLessonCount', 'completedRequiredCount', 'progress']) if (!(key in item)) throw new Error(`필수 항목 ${key}가 없습니다.`);
  if (item.schemaVersion !== 1) throw new Error('지원하지 않는 제출 버전입니다.');
  if (typeof item.id !== 'string' || typeof item.studentUid !== 'string' || typeof item.profileId !== 'string' || typeof item.school !== 'string' || typeof item.name !== 'string' || typeof item.curriculumVersion !== 'string') throw new Error('제출 기본 항목 형식이 올바르지 않습니다.');
  if (!Number.isInteger(item.requiredLessonCount) || !Number.isInteger(item.completedRequiredCount) || (item.requiredLessonCount as number) < 0 || (item.completedRequiredCount as number) < 0 || (item.completedRequiredCount as number) > (item.requiredLessonCount as number)) throw new Error('진도 합계가 올바르지 않습니다.');
  if (!Array.isArray(item.progress) || item.progress.length > 80) throw new Error('단계별 진도 형식이 올바르지 않습니다.');
  const completionModes = new Set(['read', 'run', 'challenge', 'optional']);
  const progress = item.progress.map((row, index) => {
    if (!row || typeof row !== 'object') throw new Error(`${index + 1}번째 단계 자료가 올바르지 않습니다.`);
    const lesson = row as Record<string, unknown>;
    const allowedLesson = new Set(['lessonId', 'title', 'completion', 'completed', 'status', 'submittedCode', 'lastExecutedCode', 'lastRunStatus', 'lastRunPassed', 'lastRunAt', 'lastSuccessCode', 'lastSuccessAt', 'outputSummary']);
    if (Object.keys(lesson).some((key) => !allowedLesson.has(key))) throw new Error(`${index + 1}번째 단계에 알 수 없는 항목이 있습니다.`);
    if (typeof lesson.lessonId !== 'string' || typeof lesson.title !== 'string' || typeof lesson.completion !== 'string' || !completionModes.has(lesson.completion) || typeof lesson.status !== 'string' || typeof lesson.completed !== 'boolean' || !statuses.has(lesson.status as ProgressStatus)) throw new Error(`${index + 1}번째 단계 상태가 올바르지 않습니다.`);
    for (const key of ['submittedCode', 'lastExecutedCode', 'lastRunStatus', 'lastRunAt', 'lastSuccessCode', 'lastSuccessAt', 'outputSummary']) if (typeof lesson[key] !== 'string') throw new Error(`${index + 1}번째 단계 ${key} 형식이 올바르지 않습니다.`);
    const submittedCode = lesson.submittedCode as string; const lastExecutedCode = lesson.lastExecutedCode as string; const lastSuccessCode = lesson.lastSuccessCode as string; const outputSummary = lesson.outputSummary as string;
    if (submittedCode.length > MAX_CODE || lastExecutedCode.length > MAX_CODE || lastSuccessCode.length > MAX_CODE || outputSummary.length > MAX_OUTPUT) throw new Error(`${index + 1}번째 단계 코드 또는 출력이 너무 깁니다.`);
    if (lesson.lastRunPassed !== null && typeof lesson.lastRunPassed !== 'boolean') throw new Error(`${index + 1}번째 단계 실행 판정이 올바르지 않습니다.`);
    return lesson as unknown as SubmittedLesson;
  });
  return { id: item.id, schemaVersion: 1, studentUid: item.studentUid, profileId: item.profileId, school: item.school, name: item.name, curriculumVersion: item.curriculumVersion, requiredLessonCount: item.requiredLessonCount as number, completedRequiredCount: item.completedRequiredCount as number, progress, submittedAt: typeof item.submittedAt === 'string' ? item.submittedAt : undefined };
}
