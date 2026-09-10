import type { ReportLessonSnapshot, ReportTimestamp, SubmissionReportSnapshot } from './types';

export function formatReportTimestamp(value: ReportTimestamp | undefined): string {
  if (value === undefined || value === null || value === '') return '기록 없음';
  const date = typeof value === 'string'
    ? new Date(value)
    : typeof value === 'number'
    ? new Date(value)
    : new Date((typeof value === 'object' && 'seconds' in value ? value.seconds : value._seconds) * 1000);
  if (Number.isNaN(date.getTime())) return '기록 없음';
  return new Intl.DateTimeFormat('ko-KR', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    hour12: false,
    timeZone: 'Asia/Seoul',
  }).format(date);
}

export function reportDate(value: ReportTimestamp | undefined): string {
  if (value === undefined || value === null || value === '') return 'report';
  const date = typeof value === 'string' ? new Date(value) : typeof value === 'number' ? new Date(value) : new Date((typeof value === 'object' && 'seconds' in value ? value.seconds : value._seconds) * 1000);
  if (Number.isNaN(date.getTime())) return 'report';
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  return `${parts.find((part) => part.type === 'year')?.value}-${parts.find((part) => part.type === 'month')?.value}-${parts.find((part) => part.type === 'day')?.value}`;
}

export function completionLabel(value: string): string {
  return ({ read: '읽기', run: '실행', challenge: '도전', optional: '참고' } as Record<string, string>)[value] ?? value;
}

export function statusLabel(value: string): string {
  return ({
    not_started: '미시도', success: '성공', failed: '실패', modified_unexecuted: '수정 후 미실행',
    completed_unverified: '과거 완료(검증 기록 없음)', read_complete: '읽기 완료', optional: '참고',
  } as Record<string, string>)[value] ?? value;
}

export function runStatusLabel(value: string | undefined): string {
  return ({ done: '실행 완료', error: '오류', timeout: '시간 초과', stopped: '중지됨' } as Record<string, string>)[value ?? ''] ?? '기록 없음';
}

/** Returns an Excel-safe string cell. It deliberately never creates a formula. */
export function reportString(value: unknown): string {
  if (value === undefined || value === null) return '';
  return String(value);
}

export function shouldIncludeReportCode(item: Pick<ReportLessonSnapshot, 'completed'>): boolean {
  return item.completed === true;
}

export function progressRate(snapshot: Pick<SubmissionReportSnapshot, 'requiredLessonCount' | 'completedRequiredCount'>): string {
  const required = Number.isFinite(snapshot.requiredLessonCount) ? snapshot.requiredLessonCount : 0;
  if (required <= 0) return '0%';
  return `${Math.round((snapshot.completedRequiredCount / required) * 100)}%`;
}

export function reportId(snapshot: SubmissionReportSnapshot): string {
  return snapshot.submissionId || snapshot.id || '제출본';
}

export interface ChapterReportSummary { chapter: string; completedCount: number; requiredCount: number; rate: string; }

export function chapterReportSummaries(snapshot: Pick<SubmissionReportSnapshot, 'progress'>): ChapterReportSummary[] {
  const groups = new Map<string, { completed: number; required: number }>();
  snapshot.progress.forEach((item) => {
    const match = /^chapter-(\d+)-/.exec(item.lessonId);
    const chapter = match ? `${Number(match[1])}장` : '기타';
    const current = groups.get(chapter) ?? { completed: 0, required: 0 };
    if (item.completion !== 'optional') {
      current.required += 1;
      if (item.completed === true) current.completed += 1;
    }
    groups.set(chapter, current);
  });
  return [...groups.entries()].map(([chapter, value]) => ({
    chapter,
    completedCount: value.completed,
    requiredCount: value.required,
    rate: value.required ? `${Math.round(value.completed / value.required * 100)}%` : '0%',
  }));
}

export function sanitizeFilenameSegment(value: unknown, fallback = '보고서'): string {
  const normalized = reportString(value).normalize('NFKC')
    .split('').filter((character) => character.charCodeAt(0) >= 32).join('')
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/[. ]+$/g, '')
    .trim()
    .slice(0, 80);
  return normalized || fallback;
}

export function buildReportFilename(snapshot: SubmissionReportSnapshot, extension: 'xlsx' | 'pdf'): string {
  const school = sanitizeFilenameSegment(snapshot.school, '학교');
  const name = sanitizeFilenameSegment(snapshot.name, '학생');
  const id = sanitizeFilenameSegment(reportId(snapshot), '제출본').slice(0, 36);
  return `${school}-${name}-${id}.${extension}`;
}

export function downloadReport(file: { bytes: Uint8Array; filename: string; mimeType: string }): void {
  const blob = new Blob([file.bytes], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.filename;
  anchor.rel = 'noopener';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
