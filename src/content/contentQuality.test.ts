import { describe, expect, it } from 'vitest';
import { chapters, lessons } from './chapters';

const chapterText = (number: number) => {
  const chapter = chapters.find((candidate) => candidate.number === number);
  return chapter?.lessons.map((lesson) => [lesson.title, lesson.summary, ...lesson.concepts.flatMap((concept) => [concept.title ?? '', concept.body]), ...lesson.glossary.flatMap((item) => [item.term, item.definition])].join(' ')).join(' ') ?? '';
};

describe('beginner content quality', () => {
  it('keeps the first output practice unique and moves later practice to concepts', () => {
    expect(lessons.find((lesson) => lesson.id === 'chapter-1-4')?.completion).toBe('run');
    expect(lessons.find((lesson) => lesson.id === 'chapter-2-1')?.completion).toBe('read');
    expect(lessons.find((lesson) => lesson.id === 'chapter-2-4')?.completion).toBe('read');
    expect(lessons.find((lesson) => lesson.id === 'chapter-3-1')?.completion).toBe('read');
    expect(lessons.find((lesson) => lesson.id === 'chapter-3-2')?.completion).toBe('read');
    expect(lessons.find((lesson) => lesson.id === 'chapter-4-1')?.completion).toBe('read');
    expect(lessons.find((lesson) => lesson.id === 'chapter-4-2')?.completion).toBe('read');
    const printOnlyStarters = lessons.filter((lesson) => lesson.chapter <= 4 && lesson.starterCode && lesson.starterCode.trim().split('\n').every((line) => line.trim().startsWith('print('))).map((lesson) => lesson.id);
    expect(printOnlyStarters).toEqual(['chapter-1-4']);
  });

  it('keeps chapter 3 and 4 focused on the browser learning flow', () => {
    const text = `${chapterText(3)} ${chapterText(4)}`;
    expect(text).not.toMatch(/\b(?:IDE|PC)\b|터미널|운영체제|명령줄|파일 실행|편집기 선택|Python 설치/);
    expect(text).toContain('브라우저');
    expect(text).toContain('편집기');
    expect(text).toContain('결과');
  });

  it('gives every lesson a real, learner-friendly glossary definition', () => {
    lessons.forEach((lesson) => {
      expect(lesson.glossary.length, lesson.id).toBeGreaterThan(0);
      lesson.glossary.forEach((item) => {
        expect(item.definition, `${lesson.id}:${item.term}`).not.toBe('이번 소단원에서 새로 만나는 파이썬 개념');
        expect(item.definition.length, `${lesson.id}:${item.term}`).toBeGreaterThan(8);
      });
    });
  });
});
