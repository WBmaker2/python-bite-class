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

  it('gives every execution lesson an example and an observe loop', () => {
    lessons.filter((lesson) => lesson.chapter >= 2 && lesson.starterCode).forEach((lesson) => {
      const example = lesson.concepts.find((concept) => concept.type === 'example');
      expect(example?.code, lesson.id).toBeTruthy();
      expect(example?.body, lesson.id).toMatch(/예상|실행|관찰/);
    });
  });

  it('explains beginner-facing functions and methods at their first code use', () => {
    const requiredTermsByLesson: Record<string, string[]> = {
      'chapter-2-2': ['변수', '할당', '='],
      'chapter-2-3': ['리스트', 'for ... in', '반복'],
      'chapter-5-6': ['type(...).__name__', '자료형 이름', 'float', 'bool'],
      'chapter-5-7': ['if', 'True', '조건'],
      'chapter-6-2': ['+=', '-=', '갱신'],
      'chapter-7-1': ['>=', '참', '거짓'],
      'chapter-7-2': ['<='],
      'chapter-7-4': ['==', '같은지', 'for', 'range()', 'if', 'print()'],
      'chapter-8-6': ['len()', 'sum()', '*numbers', 'tuple', '펼쳐'],
      'chapter-8-9': ['int()'],
      'chapter-8-8': ['**', '거듭제곱', '3 ** 2'],
      'chapter-9-1': ['round()', '자릿수'],
      'chapter-9-2': ['pi', '원주율', 'round()', 'round(number, ndigits)', 'ndigits', '3.14159', '3.14'],
      'chapter-9-5': ['dir()', 'dir(math)', 'sqrt', 'math.sqrt(25)', 'pi', 'True', 'False'],
      'chapter-9-7': ['round()', '**', 'math.pi'],
      'chapter-10-4': ['items()'],
      'chapter-10-7': ['append()', 'for'],
      'chapter-11-3': ['stock.get()', '기본값'],
      'chapter-11-4': ['items()', 'get()', 'append()', 'return', '언패킹'],
      'chapter-11-8': ['리스트 컴프리헨션', '조건식', '[item for item, amount in plan.items() if stock.get(item, 0) < amount]'],
    };

    Object.entries(requiredTermsByLesson).forEach(([lessonId, requiredTerms]) => {
      const lesson = lessons.find((candidate) => candidate.id === lessonId);
      const guideText = [
        lesson?.summary,
        ...(lesson?.concepts ?? []).flatMap((concept) => [concept.title ?? '', concept.body, concept.code ?? '']),
        ...(lesson?.glossary ?? []).flatMap((item) => [item.term, item.definition]),
        lesson?.challenge?.hint,
      ].join(' ');
      requiredTerms.forEach((term) => expect(guideText, `${lessonId} 설명에 ${term} 필요`).toContain(term));
    });
  });

  it('removes the deleted package lesson and stale cross-lesson references', () => {
    const typeNameText = chapterText(5);
    expect(typeNameText).toContain('자료형의 이름');
    expect(lessons.some((lesson) => lesson.id === 'chapter-9-6')).toBe(false);
    expect(lessons.some((lesson) => lesson.title === '패키지와 모듈 정리')).toBe(false);
    expect(typeNameText).not.toContain('9.6');
  });

  it('keeps repeated code glossary entries unique while retaining old aliases', () => {
    lessons.forEach((lesson) => {
      const terms = lesson.glossary.map((item) => item.term);
      expect(new Set(terms).size, lesson.id).toBe(terms.length);
    });
    const lesson95 = lessons.find((lesson) => lesson.id === 'chapter-9-5');
    expect(lesson95?.glossary.some((item) => item.term === 'sqrt')).toBe(true);
    expect(lesson95?.glossary.some((item) => item.term === 'sqrt')).toBe(true);
  });

  it('puts print() in the glossary of every executable lesson', () => {
    const executableLessons = lessons.filter((lesson) => Boolean(lesson.starterCode));
    expect(executableLessons.length).toBe(52);
    executableLessons.forEach((lesson) => {
      expect(lesson.glossary.some((item) => item.term === 'print()'), lesson.id).toBe(true);
    });
  });

  it('keeps representative repeated-code terms in the glossary itself', () => {
    const glossaryTerms = (id: string) => new Set(lessons.find((lesson) => lesson.id === id)?.glossary.map((item) => item.term));
    [
      ['chapter-7-4', ['for', 'range()', 'if', 'break', 'print()']],
      ['chapter-8-2', ['def', 'return', 'print()']],
      ['chapter-9-7', ['math.pi', 'round()', '**', '*', 'print()']],
      ['chapter-11-4', ['items()', 'get()', 'append()', '메서드', '언패킹']],
      ['chapter-11-8', ['리스트 컴프리헨션', '빈 리스트 조건', '언패킹']],
    ].forEach(([id, expected]) => {
      const terms = glossaryTerms(id as string);
      (expected as string[]).forEach((term) => expect(terms).toContain(term));
    });
  });
});
