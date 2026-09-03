import { chapter, makeLesson } from './lessonFactory';

export const chapter2 = chapter(2, '파이썬 소개', [
  makeLesson(2, 1, '파이썬은 어떤 언어일까요?', '파이썬은 사람이 읽기 쉬운 문장으로 생각을 표현하는 프로그래밍 언어입니다. 먼저 문제를 작은 순서로 나누는 방법을 살펴봅니다.', 'read'),
  makeLesson(2, 2, 'Python 3를 사용하는 이유', '새로 배우는 우리는 현재 널리 쓰이는 Python 3 문법과 도구를 사용합니다.', 'challenge', 'language = "Python 3"\nprint("오늘 배우는 언어:", language)', '오늘 배우는 언어: Python 3', { prompt: 'language 변수의 Python 3를 그대로 두고, print() 결과에 나의 이름을 한 번 더 보여 주세요.', hint: 'print("오늘 배우는 언어:", language) 줄의 괄호 안을 찾으세요. 쉼표 뒤에 내 이름을 문자열로 하나 더 넣고 다시 실행해 Python 3와 이름이 함께 보이는지 관찰하세요.', checks: [{ mode: 'contains', value: 'Python 3', feedback: 'Python 3를 잘 확인했어요.' }, { mode: 'changed', value: '', feedback: '나의 이름을 덧붙여 문장을 바꿨어요.' }] }),
  makeLesson(2, 3, '사람들은 어디에 사용할까요?', '웹, 데이터, 인공지능, 자동화처럼 파이썬은 여러 분야의 문제를 해결합니다.', 'challenge', 'uses = ["웹", "데이터", "인공지능"]\nfor use in uses:\n    print(use)', '웹\n데이터\n인공지능', { prompt: 'uses 리스트에 파이썬을 사용할 분야를 하나 더 추가하고, 반복문 결과에 그 분야가 나타나는지 확인하세요.', hint: 'uses 리스트의 마지막 항목 뒤를 찾으세요. 쉼표와 문자열을 추가한 뒤 다시 실행해 새 분야가 한 줄로 출력되는지 관찰하세요.', checks: [{ mode: 'appended', value: '', feedback: '새 활용 분야를 추가했어요.' }] }),
  makeLesson(2, 4, '소개 확인', '파이썬을 어디에 쓰고 싶은지, 어떤 점이 편리한지 말로 정리하며 첫 장을 마칩니다.', 'read'),
]);
