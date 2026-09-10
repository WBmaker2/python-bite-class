import { lessons } from '../../content/chapters';
import type { LessonId } from '../../content/types';
import type { StudentProfile } from '../../hooks/useLearningProgress';
import type { StoredProgress } from '../../hooks/progressMigration';
import { statusForLesson } from '../submissions/types';
import { reportDate, sanitizeFilenameSegment, shouldIncludeReportCode } from './format';
import type { ReportLessonSnapshot, ReportTimestamp } from './types';

export type StudentReportScope = 'all' | 'chapter';

export interface LocalStudentReportSnapshot {
  source: 'local';
  generatedAt: ReportTimestamp;
  scope: StudentReportScope;
  chapter?: number;
  school: string;
  name: string;
  curriculumVersion: string;
  requiredLessonCount: number;
  completedRequiredCount: number;
  nextStepLabel?: string;
  progress: ReportLessonSnapshot[];
}

export interface StudentReportSnapshotOptions {
  scope: StudentReportScope;
  chapter?: number;
  currentLessonId?: LessonId;
  includeCode: boolean;
  generatedAt?: string;
}

export function currentReportChapter(currentLessonId?: LessonId): number {
  return lessons.find((lesson) => lesson.id === currentLessonId)?.chapter ?? 1;
}

export function hasLocalLearningRecord(progress: StoredProgress): boolean {
  return progress.completed.length > 0
    || Object.values(progress.codeByLesson).some((code) => code.length > 0)
    || Object.values(progress.executionByLesson).some((evidence) => Object.keys(evidence).length > 0);
}

function rowForLesson(lesson: typeof lessons[number], progress: StoredProgress, includeCode: boolean): ReportLessonSnapshot {
  const completed = progress.completed.includes(lesson.id);
  const currentCode = progress.codeByLesson[lesson.id] ?? lesson.starterCode ?? '';
  const evidence = progress.executionByLesson[lesson.id];
  const row: ReportLessonSnapshot = {
    lessonId: lesson.id,
    title: lesson.title,
    completion: lesson.completion,
    status: statusForLesson(completed, lesson.completion, currentCode, evidence),
    completed,
  };
  const includeLessonCode = includeCode && shouldIncludeReportCode(row);
  return {
    ...row,
    ...(includeLessonCode ? { submittedCode: currentCode, lastExecutedCode: evidence?.lastExecutedCode ?? '', lastSuccessCode: evidence?.lastSuccessCode ?? '' } : {}),
    lastRunStatus: evidence?.lastRunStatus ?? '',
    lastRunPassed: typeof evidence?.lastRunPassed === 'boolean' ? evidence.lastRunPassed : null,
    lastRunAt: evidence?.lastRunAt ?? '',
    lastSuccessAt: evidence?.lastSuccessAt ?? '',
    ...(includeLessonCode ? { outputSummary: evidence?.outputSummary ?? '' } : {}),
  };
}

export function buildLocalStudentReportSnapshot(profile: StudentProfile, progress: StoredProgress, options: StudentReportSnapshotOptions): LocalStudentReportSnapshot {
  const chapter = options.chapter ?? currentReportChapter(options.currentLessonId ?? profile.currentLessonId);
  const selectedLessons = options.scope === 'chapter' ? lessons.filter((lesson) => lesson.chapter === chapter) : lessons;
  const rows = selectedLessons.map((lesson) => rowForLesson(lesson, progress, options.includeCode));
  const required = rows.filter((row) => row.completion !== 'optional');
  const next = required.find((row) => row.status === 'modified_unexecuted' || row.status === 'failed') ?? required.find((row) => row.completed !== true);
  return {
    source: 'local', generatedAt: options.generatedAt ?? new Date().toISOString(), scope: options.scope,
    ...(options.scope === 'chapter' ? { chapter } : {}), school: profile.school.trim(), name: profile.name.trim(), curriculumVersion: '2026-09',
    requiredLessonCount: required.length, completedRequiredCount: required.filter((row) => row.completed === true).length,
    ...(next ? { nextStepLabel: `${next.title} (${next.status === 'failed' || next.status === 'modified_unexecuted' ? '다시 실행' : '이어서 학습'})` } : {}), progress: rows,
  };
}

export function buildLocalReportFilename(snapshot: LocalStudentReportSnapshot, extension: 'pdf'): string {
  const date = reportDate(snapshot.generatedAt);
  const scope = snapshot.scope === 'chapter' ? `제${snapshot.chapter ?? 1}장` : '전체';
  return `${sanitizeFilenameSegment(snapshot.school, '학교')}-${sanitizeFilenameSegment(snapshot.name, '학생')}-${scope}-학습리포트-${date}.${extension}`;
}
