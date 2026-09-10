import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import * as XLSX from 'xlsx';
import { buildStudentWorkbook } from './xlsx';
import { buildStudentPdf } from './pdf';
import { buildReportFilename, chapterReportSummaries, formatReportTimestamp } from './format';
import type { SubmissionReportSnapshot } from './types';

const fixture: SubmissionReportSnapshot = {
  submissionId: 'submission/qa:01', schemaVersion: 1, profileId: 'profile-1', school: '서울: 테스트학교', name: '김학생',
  curriculumVersion: '2026-09', submittedAt: '2026-09-10T03:00:00.000Z', requiredLessonCount: 2, completedRequiredCount: 1,
  progress: [
    { lessonId: 'chapter-1-1', title: '변수와 출력', completion: 'run', status: 'success', completed: true, submittedCode: '=1+1\nprint("안녕")', lastExecutedCode: '=1+1\nprint("안녕")', lastRunStatus: 'done', lastRunPassed: true, outputSummary: '안녕' },
    { lessonId: 'chapter-1-2', title: '긴 코드 단계', completion: 'run', status: 'modified_unexecuted', completed: false, submittedCode: 'print("긴 코드")\n'.repeat(40), lastExecutedCode: 'print("이전")', lastRunStatus: 'done', lastRunPassed: true },
    { lessonId: 'chapter-2-1', title: '참고 읽기', completion: 'optional', status: 'optional', completed: false, submittedCode: 'print("참고")' },
  ],
};
const longCode = ('print("학생😀")\n'.repeat(1000)).slice(0, 11990);
const longFixture: SubmissionReportSnapshot = {
  ...fixture,
  school: '아주 긴 학교 이름 '.repeat(8), name: '이름이 긴 학생 '.repeat(6),
  progress: [{ ...fixture.progress[0], title: '아주 긴 단계 제목 '.repeat(8), submittedCode: longCode }],
  requiredLessonCount: 1, completedRequiredCount: 1,
};

describe('report formatting', () => {
  it('formats server timestamps in Seoul time and creates a safe filename', () => {
    expect(formatReportTimestamp(fixture.submittedAt)).toContain('2026. 9. 10.');
    expect(buildReportFilename(fixture, 'xlsx')).toBe('서울- 테스트학교-김학생-submission-qa-01.xlsx');
  });

  it('summarizes chapters from saved rows only', () => {
    expect(chapterReportSummaries(fixture)).toEqual([
      { chapter: '1장', completedCount: 1, requiredCount: 2, rate: '50%' },
      { chapter: '2장', completedCount: 0, requiredCount: 0, rate: '0%' },
    ]);
  });
});

describe('xlsx report', () => {
  it('keeps formula-looking code as text and preserves multiline code', () => {
    const file = buildStudentWorkbook(fixture);
    const workbook = XLSX.read(file.bytes, { type: 'array' });
    const codeSheet = workbook.Sheets['코드 모음'];
    const cell = codeSheet.D2;
    expect(cell.t).toBe('s');
    expect(cell.f).toBeUndefined();
    expect(cell.v).toContain('=1+1');
    expect(codeSheet.D3.v).toContain('긴 코드');
    expect(workbook.SheetNames).toEqual(['요약', '장별 요약', '단계별 진도', '코드 모음']);
    if (process.env.REPORT_QA === '1') writeFileSync('/private/tmp/python-bite-class-report-qa.xlsx', file.bytes);
  });

  it('preserves near-limit code and long identity fields exactly', () => {
    const file = buildStudentWorkbook(longFixture);
    const workbook = XLSX.read(file.bytes, { type: 'array' });
    expect(workbook.Sheets['코드 모음'].D2.v).toBe(longCode);
    expect(workbook.Sheets['요약'].B2.v).toBe(longFixture.school);
  });
});

describe('pdf report', () => {
  it.skipIf(!existsSync('/System/Library/Fonts/Supplemental/AppleMyungjo.ttf'))('creates a valid multipage PDF with Korean text', async () => {
    const file = await buildStudentPdf(fixture, { fontBytes: new Uint8Array(readFileSync('/System/Library/Fonts/Supplemental/AppleMyungjo.ttf')) });
    expect(file.bytes.byteLength).toBeGreaterThan(1000);
    const header = new TextDecoder().decode(file.bytes.slice(0, 8));
    expect(header).toBe('%PDF-1.7');
    if (process.env.REPORT_QA === '1') writeFileSync('/private/tmp/python-bite-class-report-qa.pdf', file.bytes);
  });

  it.skipIf(!existsSync('/System/Library/Fonts/Supplemental/AppleMyungjo.ttf') || process.env.REPORT_QA !== '1')('does not crash on near-limit multiline code', async () => {
    const file = await buildStudentPdf(longFixture, { fontBytes: new Uint8Array(readFileSync('/System/Library/Fonts/Supplemental/AppleMyungjo.ttf')) });
    expect(file.bytes.byteLength).toBeGreaterThan(1000);
    writeFileSync('/private/tmp/python-bite-class-report-qa-long.pdf', file.bytes);
  });

  it.skipIf(process.env.REPORT_QA !== '1')('loads the pinned production Noto Sans KR source lazily', async () => {
    const file = await buildStudentPdf(fixture);
    expect(file.bytes.byteLength).toBeGreaterThan(1000);
    writeFileSync('/private/tmp/python-bite-class-report-qa-noto.pdf', file.bytes);
  });
});
