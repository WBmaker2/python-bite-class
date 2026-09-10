import { PDFDocument, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { buildReportFilename, chapterReportSummaries, completionLabel, formatReportTimestamp, progressRate, reportId, reportString, runStatusLabel, statusLabel } from './format';
import type { ReportFile, ReportLessonSnapshot, SubmissionReportSnapshot } from './types';

const KOREAN_FONT_COMMIT = '16680f8688ffcd467d2eb2146a9ce0343404581d';
export const KOREAN_FONT_URL = `https://cdn.jsdelivr.net/gh/google/fonts@${KOREAN_FONT_COMMIT}/ofl/nanumgothic/NanumGothic-Regular.ttf`;
export const BUNDLED_KOREAN_FONT_URL = `${import.meta.env.BASE_URL}fonts/NanumGothic-Regular.ttf`;
export const KOREAN_FONT_PROVENANCE = {
  family: 'Nanum Gothic',
  source: `https://github.com/google/fonts/tree/${KOREAN_FONT_COMMIT}/ofl/nanumgothic`,
  license: 'SIL Open Font License 1.1',
  licenseUrl: 'https://scripts.sil.org/OFL',
};
const PDF_MIME = 'application/pdf';
export const PAGE_WIDTH = 595.28;
export const PAGE_HEIGHT = 841.89;
export const MARGIN = 42;
const BODY_SIZE = 9.5;
const LINE_HEIGHT = 13;

export interface PdfReportOptions {
  /** Pass bytes from a same-origin public font when available. If omitted, fetch occurs only during export. */
  fontBytes?: Uint8Array;
  fontUrl?: string;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const sourceLine of reportString(text).replace(/\r\n/g, '\n').split('\n')) {
    if (!sourceLine) { lines.push(''); continue; }
    let line = '';
    for (const char of Array.from(sourceLine)) {
      const candidate = line + char;
      if (line && font.widthOfTextAtSize(candidate, size) > maxWidth) {
        lines.push(line);
        line = char;
      } else line = candidate;
    }
    if (line || sourceLine) lines.push(line);
  }
  return lines;
}

export class PdfWriter {
  private page: PDFPage;
  private y = PAGE_HEIGHT - MARGIN;

  constructor(private readonly document: PDFDocument, private readonly font: PDFFont) {
    this.page = document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  }

  private ensure(height: number): void {
    if (this.y - height >= MARGIN) return;
    this.page = this.document.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    this.y = PAGE_HEIGHT - MARGIN;
  }

  text(value: unknown, size = BODY_SIZE, color = { r: 0.12, g: 0.16, b: 0.2 }, gap = 0): void {
    const lines = wrapText(reportString(value), this.font, size, PAGE_WIDTH - MARGIN * 2);
    for (const line of lines) {
      this.ensure(LINE_HEIGHT);
      this.page.drawText(line, { x: MARGIN, y: this.y, size, font: this.font, color: rgb(color.r, color.g, color.b) });
      this.y -= LINE_HEIGHT;
    }
    this.y -= gap;
  }

  heading(value: string, size = 14): void {
    for (const line of wrapText(value, this.font, size, PAGE_WIDTH - MARGIN * 2)) {
      this.ensure(size + 5 + LINE_HEIGHT * 2);
      this.page.drawText(line, { x: MARGIN, y: this.y, size, font: this.font, color: rgb(0.05, 0.28, 0.3) });
      this.y -= size + 5;
    }
    this.y -= 3;
  }

  code(value: unknown): void {
    for (const line of wrapText(reportString(value).replace(/\t/g, '    '), this.font, 8.2, PAGE_WIDTH - MARGIN * 2 - 18)) {
      this.ensure(12);
      this.page.drawText(line, { x: MARGIN + 9, y: this.y, size: 8.2, font: this.font, color: rgb(0.15, 0.2, 0.25) });
      this.y -= 12;
    }
    this.y -= 3;
  }
}

export async function resolveFontBytes(options: PdfReportOptions): Promise<Uint8Array> {
  if (options.fontBytes) return options.fontBytes;
  const urls = options.fontUrl ? [options.fontUrl] : [BUNDLED_KOREAN_FONT_URL, KOREAN_FONT_URL];
  let lastStatus = '';
  for (const url of urls) {
    try {
      const response = await fetch(url, { credentials: 'omit' });
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
      lastStatus = String(response.status);
    } catch { /* try the pinned source after a missing local asset or offline relative URL */ }
  }
  throw new Error(`한글 폰트를 불러오지 못했습니다${lastStatus ? ` (${lastStatus})` : ''}.`);
}

function drawLesson(writer: PdfWriter, item: ReportLessonSnapshot, index: number): void {
  writer.heading(`${index + 1}. ${item.title}`, 11);
  writer.text(`단계 ID: ${item.lessonId} · 종류: ${completionLabel(item.completion)} · 제출 당시 상태: ${statusLabel(item.status)} · 완료 여부: ${item.completed === true ? '완료' : '미완료'}`);
  writer.text(`마지막 실행: ${runStatusLabel(item.lastRunStatus)} (${item.lastRunPassed === true ? '통과' : item.lastRunPassed === false ? '실패' : '판정 없음'}) / ${formatReportTimestamp(item.lastRunAt)} · 마지막 성공: ${formatReportTimestamp(item.lastSuccessAt)}`);
  if (item.outputSummary) writer.text(`출력 요약: ${item.outputSummary}`);
  if (item.submittedCode) { writer.text('제출 코드', 9.5, { r: 0.05, g: 0.28, b: 0.3 }, 2); writer.code(item.submittedCode); }
  if (item.lastExecutedCode && item.lastExecutedCode !== item.submittedCode) { writer.text('마지막 실행 코드', 9.5, { r: 0.05, g: 0.28, b: 0.3 }, 2); writer.code(item.lastExecutedCode); }
  if (item.lastSuccessCode && item.lastSuccessCode !== item.submittedCode && item.lastSuccessCode !== item.lastExecutedCode) { writer.text('마지막 성공 코드', 9.5, { r: 0.05, g: 0.28, b: 0.3 }, 2); writer.code(item.lastSuccessCode); }
}

export async function buildStudentPdf(snapshot: SubmissionReportSnapshot, options: PdfReportOptions = {}): Promise<ReportFile> {
  const document = await PDFDocument.create();
  document.registerFontkit(fontkit);
  // Full embedding avoids missing CJK glyphs in pdf-lib's subsetter for some
  // Hangul blocks. The font is still fetched only when export is requested.
  const font = await document.embedFont(await resolveFontBytes(options), { subset: false });
  const writer = new PdfWriter(document, font);
  writer.heading('파이썬 한입 교실 학습 보고서', 18);
  writer.text(`${snapshot.school} · ${snapshot.name}`, 12, { r: 0.05, g: 0.28, b: 0.3 }, 8);
  writer.text(`제출 ID: ${reportId(snapshot)}`);
  writer.text(`서버 접수 시각: ${formatReportTimestamp(snapshot.submittedAt)}`);
  writer.text(`커리큘럼 버전: ${snapshot.curriculumVersion} · 스키마 버전: ${snapshot.schemaVersion}`);
  writer.text(`필수 단계 진도: ${snapshot.completedRequiredCount}/${snapshot.requiredLessonCount} (${progressRate(snapshot)})`, 10, { r: 0.05, g: 0.28, b: 0.3 }, 10);
  writer.text('이 보고서는 제출 당시 저장된 학생 스냅샷을 보여 줍니다. 단계의 성공 여부는 학생 브라우저 실행 기록이며 서버 채점 결과가 아닙니다.', 8.5, { r: 0.32, g: 0.36, b: 0.4 }, 12);
  writer.heading('장별 요약', 13);
  chapterReportSummaries(snapshot).forEach((item) => writer.text(`${item.chapter}: ${item.completedCount}/${item.requiredCount} (${item.rate})`));
  writer.heading('단계별 진도와 코드', 13);
  snapshot.progress.forEach((item, index) => drawLesson(writer, item, index));
  const pages = document.getPages();
  pages.forEach((page: PDFPage, index: number) => {
    page.drawText(`페이지 ${index + 1} / ${pages.length}`, { x: PAGE_WIDTH - MARGIN - 72, y: 20, size: 7.5, font, color: rgb(0.35, 0.4, 0.44) });
  });
  const bytes = await document.save();
  return { bytes, filename: buildReportFilename(snapshot, 'pdf'), mimeType: PDF_MIME };
}

export async function downloadStudentPdf(snapshot: SubmissionReportSnapshot, options: PdfReportOptions = {}): Promise<void> {
  const file = await buildStudentPdf(snapshot, options);
  const blob = new Blob([file.bytes], { type: file.mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.filename;
  anchor.rel = 'noopener';
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
