import { chapter, makeLesson } from './lessonFactory';

export const chapter2 = chapter(2, '파이썬 소개', [
  makeLesson(2, 1, '파이썬은 어떤 언어일까요?', '파이썬은 사람이 읽기 쉬운 문장으로 생각을 표현하는 프로그래밍 언어입니다. 먼저 문제를 작은 순서로 나누는 방법을 살펴봅니다.', 'read'),
  makeLesson(2, 2, 'Python 3를 사용하는 이유', '새로 배우는 우리는 현재 널리 쓰이는 Python 3 문법과 도구를 사용합니다.', 'challenge', 'language = "Python 3"\nprint("오늘 배우는 언어:", language)', '오늘 배우는 언어: Python 3', { prompt: '문장에 나의 이름을 덧붙여 출력하세요.', hint: 'print() 안에 쉼표로 값을 하나 더 넣어 보세요.', checks: [{ mode: 'contains', value: 'Python 3', feedback: 'Python 3를 잘 확인했어요.' }, { mode: 'changed', value: '', feedback: '나의 이름을 덧붙여 문장을 바꿨어요.' }] }),
  makeLesson(2, 3, '사람들은 어디에 사용할까요?', '웹, 데이터, 인공지능, 자동화처럼 파이썬은 여러 분야의 문제를 해결합니다.', 'challenge', 'uses = ["웹", "데이터", "인공지능"]\nfor use in uses:\n    print(use)', '웹\n데이터\n인공지능', { prompt: '파이썬 활용 분야를 하나 더 추가하세요.', hint: 'uses 리스트의 마지막에 새 글자를 넣어 보세요.', checks: [{ mode: 'appended', value: '', feedback: '새 활용 분야를 추가했어요.' }] }),
  makeLesson(2, 4, '소개 확인', '파이썬을 어디에 쓰고 싶은지, 어떤 점이 편리한지 말로 정리하며 첫 장을 마칩니다.', 'read'),
]);
