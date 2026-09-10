/**
 * The report input is the immutable snapshot saved with a submission.
 * Keep this shape independent from the live curriculum so old reports keep
 * the lesson order, titles, and progress that were submitted.
 */
export type ReportTimestamp = string | number | { seconds: number; nanoseconds?: number } | { _seconds: number; _nanoseconds?: number };

export interface ReportLessonSnapshot {
  lessonId: string;
  title: string;
  completion: string;
  status: string;
  /** Completion is the saved snapshot flag, independent from the last execution result. */
  completed?: boolean;
  submittedCode?: string;
  lastExecutedCode?: string;
  lastRunStatus?: string;
  lastRunPassed?: boolean | null;
  lastRunAt?: ReportTimestamp;
  lastSuccessCode?: string;
  lastSuccessAt?: ReportTimestamp;
  outputSummary?: string;
}

export interface SubmissionReportSnapshot {
  submissionId?: string;
  id?: string;
  schemaVersion: number;
  studentUid?: string;
  profileId: string;
  school: string;
  name: string;
  curriculumVersion: string;
  submittedAt?: ReportTimestamp;
  requiredLessonCount: number;
  completedRequiredCount: number;
  progress: ReportLessonSnapshot[];
}

export interface ReportFile {
  bytes: Uint8Array;
  filename: string;
  mimeType: string;
}
