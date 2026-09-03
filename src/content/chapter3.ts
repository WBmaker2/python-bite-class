import { chapter, makeLesson } from './lessonFactory';

export const chapter3 = chapter(3, '설치와 실행 환경', [
  makeLesson(3, 1, '브라우저에서 바로 시작해요', '이 수업은 별도 준비 없이 웹브라우저에서 파이썬 실험실을 열고 바로 코드를 실행합니다.', 'read'),
  makeLesson(3, 2, '코드 실행실 살펴보기', '가운데 설명을 읽고 오른쪽 편집기에 코드를 적습니다. 실행 버튼을 누르면 아래 결과 창에서 바로 확인합니다.', 'read'),
  makeLesson(3, 3, '실행 결과 읽기', '실행 결과는 코드가 끝난 뒤 보여 주는 답입니다. 결과를 읽고 코드가 하려던 일과 맞는지 비교합니다.', 'challenge', 'message = "결과 창에서 확인해요"\nprint(message)', '결과 창에서 확인해요', { prompt: 'message 변수의 안내 문장을 나만의 말로 바꾸고, 결과 창에 새 문장이 보이는지 확인하세요.', hint: 'message = 뒤의 따옴표 안을 찾으세요. 따옴표는 남기고 문장만 바꾼 뒤 다시 실행해 결과 창의 문장이 달라졌는지 관찰하세요.', checks: [{ mode: 'changed', value: '', feedback: '나만의 결과 안내 문장을 만들었어요.' }] }),
  makeLesson(3, 4, '브라우저 실습 약속', '이 실습은 브라우저 안에서만 진행됩니다. 코드가 오래 걸리거나 결과가 너무 많으면 안전을 위해 실행을 멈춥니다.', 'challenge', 'steps = ["코드 작성", "실행 버튼", "결과 확인"]\nfor step in steps:\n    print(step)', '코드 작성\n실행 버튼\n결과 확인', { prompt: 'steps 리스트에 브라우저 실습을 마친 뒤 할 일을 하나 더 넣고 출력하세요.', hint: 'steps 리스트의 닫는 대괄호 앞을 찾으세요. 쉼표와 문자열을 추가한 뒤 다시 실행해 새 단계가 마지막 줄에 출력되는지 관찰하세요.', checks: [{ mode: 'appended', value: '', feedback: '브라우저 실습 흐름을 한 단계 더 만들었어요.' }] }),
]);
