import { describe, expect, it } from 'vitest';
import { buildSubmissionPayload, parseSubmissionRecord, statusForLesson } from './types';

describe('submission snapshot', () => {
  it('distinguishes a successful run from a later unexecuted edit', () => {
    const evidence = { lastExecutedCode: 'print(1)', lastRunStatus: 'done' as const, lastRunPassed: true };
    expect(statusForLesson(true, 'run', 'print(1)', evidence)).toBe('success');
    expect(statusForLesson(true, 'run', 'print(2)', evidence)).toBe('modified_unexecuted');
  });

  it('preserves completion separately from the latest execution result', () => {
    const payload = buildSubmissionPayload({ id: 'profile-1', school: '테스트학교', name: '학생' }, { completed: ['chapter-1-1'], codeByLesson: {}, executionByLesson: {} }, [{ id: 'chapter-1-1', title: '읽기', completion: 'read' }], 'student-1');
    const roundTrip = parseSubmissionRecord({ id: 'submission-1', ...payload, submittedAt: '2026-09-10T00:00:00.000Z' });
    expect(roundTrip.progress[0].completed).toBe(true);
    expect(roundTrip.progress[0].status).toBe('read_complete');
  });

  it('rejects an unknown root field and oversized code before rendering', () => {
    expect(() => parseSubmissionRecord({ id: 'bad', schemaVersion: 1, studentUid: 'u', profileId: 'p', school: 's', name: 'n', curriculumVersion: 'v', requiredLessonCount: 0, completedRequiredCount: 0, progress: [], role: 'teacher' })).toThrow();
    expect(() => parseSubmissionRecord({ id: 'bad', schemaVersion: 1, studentUid: 'u', profileId: 'p', school: 's', name: 'n', curriculumVersion: 'v', requiredLessonCount: 1, completedRequiredCount: 0, progress: [{ lessonId: 'chapter-1-1', title: '실행', completion: 'run', completed: false, status: 'not_started', submittedCode: 'x'.repeat(12001), lastExecutedCode: '', lastRunStatus: '', lastRunPassed: null, lastRunAt: '', lastSuccessCode: '', lastSuccessAt: '', outputSummary: '' }] })).toThrow();
  });
});
