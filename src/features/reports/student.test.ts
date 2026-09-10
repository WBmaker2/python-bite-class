import { describe, expect, it } from 'vitest';
import { buildLocalReportFilename, buildLocalStudentReportSnapshot, hasLocalLearningRecord } from './student';
import type { StudentProfile } from '../../hooks/useLearningProgress';
import type { StoredProgress } from '../../hooks/progressMigration';

const profile: StudentProfile = { id: 'local-1', school: '우리 학교', name: '학생', createdAt: '2026-09-10T00:00:00.000Z', currentLessonId: 'chapter-1-1', progress: { completed: [], codeByLesson: {}, executionByLesson: {} } };
const progress: StoredProgress = {
  completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-4': '=print("원본")' },
  executionByLesson: { 'chapter-1-4': { lastExecutedCode: '=print("원본")', lastRunStatus: 'error', lastRunPassed: false, lastRunAt: '2026-09-10T00:00:00.000Z', outputSummary: '오류' } },
};

describe('local student report snapshot', () => {
  it('keeps execution metadata when code is off and includes local code only when selected', () => {
    const summary = buildLocalStudentReportSnapshot(profile, progress, { scope: 'chapter', chapter: 1, includeCode: false, generatedAt: '2026-09-10T00:00:00.000Z' });
    const row = summary.progress.find((item) => item.lessonId === 'chapter-1-4');
    expect(row?.lastRunStatus).toBe('error');
    expect(row?.lastRunPassed).toBe(false);
    expect(row?.submittedCode).toBeUndefined();
    expect(summary.nextStepLabel).toContain('다시 실행');
    const withCode = buildLocalStudentReportSnapshot(profile, progress, { scope: 'chapter', chapter: 1, includeCode: true, generatedAt: '2026-09-10T00:00:00.000Z' });
    expect(withCode.progress.find((item) => item.lessonId === 'chapter-1-4')?.submittedCode).toBe('=print("원본")');
  });

  it('recognizes completed, written, and failed execution records as learning records', () => {
    expect(hasLocalLearningRecord(progress)).toBe(true);
    expect(hasLocalLearningRecord({ completed: [], codeByLesson: {}, executionByLesson: {} })).toBe(false);
  });

  it('uses the Seoul calendar date in local filenames', () => {
    const snapshot = buildLocalStudentReportSnapshot(profile, progress, { scope: 'all', includeCode: false, generatedAt: '2026-09-09T15:30:00.000Z' });
    expect(buildLocalReportFilename(snapshot, 'pdf')).toContain('전체-학습리포트-2026-09-10.pdf');
  });
});
