import { PDFDocument, rgb, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { chapterReportSummaries, completionLabel, formatReportTimestamp, progressRate, reportCodeVariants, runStatusLabel, shouldIncludeReportCode, statusLabel } from './format';
import { MARGIN, PAGE_WIDTH, PdfWriter, resolveFontBytes, type PdfReportOptions } from './pdf';
import { buildLocalReportFilename, type LocalStudentReportSnapshot } from './student';
import type { ReportFile, ReportLessonSnapshot } from './types';

function scopeLabel(snapshot: LocalStudentReportSnapshot): string {
  return snapshot.scope === 'chapter' ? `현재 ${snapshot.chapter ?? 1}장` : '전체 학습';
}

function drawLesson(writer: PdfWriter, item: ReportLessonSnapshot, index: number): void {
  if (!shouldIncludeReportCode(item) || item.submittedCode === undefined) {
    writer.text(`${index + 1}. ${item.title} · ${statusLabel(item.status)} · ${item.completed === true ? '완료' : '미완료'} · 최근 실행 ${runStatusLabel(item.lastRunStatus)}${item.lastRunPassed === true ? '·통과' : item.lastRunPassed === false ? '·실패' : ''}`);
    return;
  }
  writer.heading(`${index + 1}. ${item.title}`, 11);
  writer.text(`단계 ID: ${item.lessonId} · 종류: ${completionLabel(item.completion)} · 상태: ${statusLabel(item.status)} · 완료 여부: ${item.completed === true ? '완료' : '미완료'}`);
  const hasExecutionRecord = Boolean(item.lastRunStatus || item.lastRunAt || item.lastRunPassed !== null || item.lastSuccessAt);
  if ((item.completion !== 'read' && item.completion !== 'optional') || hasExecutionRecord) writer.text(`마지막 실행: ${runStatusLabel(item.lastRunStatus)} (${item.lastRunPassed === true ? '통과' : item.lastRunPassed === false ? '실패' : '판정 없음'}) / ${formatReportTimestamp(item.lastRunAt)} · 마지막 성공: ${formatReportTimestamp(item.lastSuccessAt)}`);
  if (item.outputSummary) writer.text(`출력 요약: ${item.outputSummary}`);
  reportCodeVariants(item).forEach(({ label, code }) => { writer.text(label, 9.5, { r: 0.05, g: 0.28, b: 0.3 }, 2); writer.code(code); });
}

export async function buildLocalStudentPdf(snapshot: LocalStudentReportSnapshot, options: PdfReportOptions = {}): Promise<ReportFile> {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  const font = await document.embedFont(await resolveFontBytes(options), { subset: false });
  const writer = new PdfWriter(document, font);
  writer.heading('파이썬 한입 교실 학습 리포트', 18);
  writer.text(`${snapshot.school} · ${snapshot.name}`, 12, { r: 0.05, g: 0.28, b: 0.3 }, 8);
  writer.text(`작성 시각: ${formatReportTimestamp(snapshot.generatedAt)}`);
  writer.text(`보고서 범위: ${scopeLabel(snapshot)}`);
  if (snapshot.nextStepLabel) writer.text(`이어서 할 일: ${snapshot.nextStepLabel}`);
  writer.text(`커리큘럼 버전: ${snapshot.curriculumVersion}`);
  writer.text(`필수 단계 진도: ${snapshot.completedRequiredCount}/${snapshot.requiredLessonCount} (${progressRate(snapshot)})`, 10, { r: 0.05, g: 0.28, b: 0.3 }, 10);
  writer.text('이 자료는 이 기기에 저장된 현재 학습 기록입니다. 학생 브라우저의 실행 기록을 보여 주며 서버 채점이나 과제 제출을 뜻하지 않습니다.', 8.5, { r: 0.32, g: 0.36, b: 0.4 }, 12);
  writer.heading('장별 요약', 13);
  chapterReportSummaries(snapshot).forEach((item) => writer.text(`${item.chapter}: ${item.completedCount}/${item.requiredCount} (${item.rate})`));
  writer.heading('단계별 진도', 13);
  snapshot.progress.forEach((item, index) => drawLesson(writer, item, index));
  const pages = document.getPages();
  pages.forEach((page: PDFPage, index: number) => {
    page.drawText(`페이지 ${index + 1} / ${pages.length}`, { x: PAGE_WIDTH - MARGIN - 72, y: 20, size: 7.5, font, color: rgb(0.35, 0.4, 0.44) });
  });
  const bytes = await document.save();
  return { bytes, filename: buildLocalReportFilename(snapshot, 'pdf'), mimeType: 'application/pdf' };
}

export async function downloadLocalStudentPdf(snapshot: LocalStudentReportSnapshot, options: PdfReportOptions = {}): Promise<void> {
  const file = await buildLocalStudentPdf(snapshot, options);
  const blob = new Blob([file.bytes], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.filename;
  anchor.rel = 'noopener';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
