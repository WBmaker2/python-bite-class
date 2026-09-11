import * as XLSX from 'xlsx';
import { buildReportFilename, chapterReportSummaries, completionLabel, formatReportTimestamp, progressRate, reportCodeVariants, reportId, reportString, runStatusLabel, statusLabel } from './format';
import type { ReportFile, ReportLessonSnapshot, SubmissionReportSnapshot } from './types';

const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

/** A CellObject with `t: s` is serialized as a text cell, including values that start with `=`. */
function textCell(value: unknown): XLSX.CellObject {
  return { t: 's', v: reportString(value) };
}

function textRows(rows: unknown[][]): XLSX.WorkSheet {
  return XLSX.utils.aoa_to_sheet(rows.map((row) => row.map((cell) => textCell(cell))));
}

function setWidths(sheet: XLSX.WorkSheet, widths: number[]): void {
  sheet['!cols'] = widths.map((wch) => ({ wch }));
  sheet['!rows'] = Array.from({ length: 256 }, () => ({ hpt: 22 }));
}

function summarySheet(snapshot: SubmissionReportSnapshot): XLSX.WorkSheet {
  const rows = [
    ['파이썬 한입 교실 학습 보고서', ''],
    ['학교', snapshot.school],
    ['이름', snapshot.name],
    ['제출 ID', reportId(snapshot)],
    ['서버 접수 시각', formatReportTimestamp(snapshot.submittedAt)],
    ['커리큘럼 버전', snapshot.curriculumVersion],
    ['스키마 버전', snapshot.schemaVersion],
    ['필수 단계 수', snapshot.requiredLessonCount],
    ['완료한 필수 단계 수', snapshot.completedRequiredCount],
    ['필수 단계 진도율', progressRate(snapshot)],
    [],
    ['자료 안내', '이 보고서는 제출 당시 저장된 학생 스냅샷을 보여 줍니다. 단계의 성공 여부는 학생 브라우저 실행 기록이며 서버 채점 결과가 아닙니다.'],
  ];
  const sheet = textRows(rows);
  setWidths(sheet, [26, 100]);
  return sheet;
}

function statusSheet(snapshot: SubmissionReportSnapshot): XLSX.WorkSheet {
  const header = ['순서', '단계 ID', '단계 이름', '학습 종류', '제출 당시 상태', '완료 여부', '마지막 실행 판정', '마지막 실행 통과', '마지막 실행 시각', '마지막 성공 시각', '출력 요약'];
  const rows: unknown[][] = [header];
  snapshot.progress.forEach((item: ReportLessonSnapshot, index) => {
    rows.push([
      index + 1,
      item.lessonId,
      item.title,
      completionLabel(item.completion),
      statusLabel(item.status),
      item.completed === true ? '완료' : '미완료',
      runStatusLabel(item.lastRunStatus),
      item.lastRunPassed === true ? '통과' : item.lastRunPassed === false ? '실패' : '기록 없음',
      formatReportTimestamp(item.lastRunAt),
      formatReportTimestamp(item.lastSuccessAt),
      item.outputSummary,
    ]);
  });
  const sheet = textRows(rows);
  setWidths(sheet, [8, 18, 32, 14, 18, 14, 18, 16, 24, 24, 50]);
  return sheet;
}

function chapterSheet(snapshot: SubmissionReportSnapshot): XLSX.WorkSheet {
  const rows: unknown[][] = [['장', '완료한 필수 단계 수', '필수 단계 수', '진도율']];
  chapterReportSummaries(snapshot).forEach((item) => rows.push([item.chapter, item.completedCount, item.requiredCount, item.rate]));
  const sheet = textRows(rows);
  setWidths(sheet, [14, 24, 18, 14]);
  return sheet;
}

function codeSheet(snapshot: SubmissionReportSnapshot): XLSX.WorkSheet {
  const rows: unknown[][] = [['순서', '단계 ID', '단계 이름', '마지막 성공 코드', '마지막 실행 코드']];
  snapshot.progress.forEach((item, index) => {
    const variants = reportCodeVariants(item);
    const byLabel = new Map(variants.map((variant) => [variant.label, variant.code]));
    rows.push([index + 1, item.lessonId, item.title, byLabel.get('마지막 성공 코드'), byLabel.get('마지막 실행 코드')]);
  });
  const sheet = textRows(rows);
  setWidths(sheet, [8, 18, 32, 90, 90]);
  return sheet;
}

export function buildStudentWorkbook(snapshot: SubmissionReportSnapshot): ReportFile {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, summarySheet(snapshot), '요약');
  XLSX.utils.book_append_sheet(workbook, chapterSheet(snapshot), '장별 요약');
  XLSX.utils.book_append_sheet(workbook, statusSheet(snapshot), '단계별 진도');
  XLSX.utils.book_append_sheet(workbook, codeSheet(snapshot), '코드 모음');
  workbook.Props = { Title: '파이썬 한입 교실 학습 보고서', Subject: `${snapshot.school} ${snapshot.name}`, Author: '파이썬 한입 교실' };
  const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true }) as ArrayBuffer;
  return { bytes: new Uint8Array(bytes), filename: buildReportFilename(snapshot, 'xlsx'), mimeType: XLSX_MIME };
}

export function downloadStudentWorkbook(snapshot: SubmissionReportSnapshot): void {
  const file = buildStudentWorkbook(snapshot);
  const blob = new Blob([file.bytes], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.filename;
  anchor.rel = 'noopener';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
