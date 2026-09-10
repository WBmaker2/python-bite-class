import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { StudentProfile } from '../../hooks/useLearningProgress';
import { buildLocalStudentReportSnapshot } from './student';
import { buildLocalStudentPdf } from './studentPdf';

const fontPath = 'public/fonts/NanumGothic-Regular.ttf';
const profile: StudentProfile = { id: 'qa-student', school: '서울 한빛 중학교', name: '김하늘', createdAt: '2026-09-10', currentLessonId: 'chapter-1-4', progress: { completed: ['chapter-1-1'], codeByLesson: { 'chapter-1-4': 'print("안녕하세요, 김하늘")\n' + 'print("학습 기록을 확인해요")\n'.repeat(20) }, executionByLesson: { 'chapter-1-4': { lastExecutedCode: 'print("이전 실행")', lastRunStatus: 'error', lastRunPassed: false, lastRunAt: '2026-09-10T00:00:00.000Z', outputSummary: '오류가 있었지만 다시 시도할 수 있어요.' } } } };

describe('student PDF artifact QA', () => {
  it.skipIf(process.env.REPORT_QA !== '1')('creates a Korean local report with and without the code appendix', async () => {
    expect(existsSync(fontPath)).toBe(true);
    const snapshot = buildLocalStudentReportSnapshot(profile, profile.progress, { scope: 'all', includeCode: true, generatedAt: '2026-09-10T00:00:00.000Z' });
    const file = await buildLocalStudentPdf(snapshot, { fontBytes: new Uint8Array(readFileSync(fontPath)) });
    expect(new TextDecoder().decode(file.bytes.slice(0, 8))).toBe('%PDF-1.7');
    mkdirSync('output/student-report-qa', { recursive: true });
    writeFileSync('output/student-report-qa/student-report-code.pdf', file.bytes);
    const summarySnapshot = buildLocalStudentReportSnapshot(profile, profile.progress, { scope: 'all', includeCode: false, generatedAt: '2026-09-10T00:00:00.000Z' });
    const summary = await buildLocalStudentPdf(summarySnapshot, { fontBytes: new Uint8Array(readFileSync(fontPath)) });
    writeFileSync('output/student-report-qa/student-report-summary.pdf', summary.bytes);
  });
});
