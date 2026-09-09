import { chapter, makeLesson } from './lessonFactory';

export const chapter3 = chapter(3, '브라우저에서 실행하기', [
  makeLesson(3, 1, '브라우저에서 바로 시작해요', '이 수업은 별도 준비 없이 웹브라우저에서 파이썬 실험실을 열고 바로 코드를 실행합니다.', 'read'),
  makeLesson(3, 2, '코드 실행실 살펴보기', '가운데 설명을 읽고 오른쪽 편집기에 코드를 적습니다. 실행 버튼을 누르면 아래 결과 창에서 바로 확인합니다.', 'read'),
  makeLesson(3, 3, '실행 결과 읽기', '실행 결과는 코드가 끝난 뒤 보여 주는 답입니다. 결과를 읽고 코드가 하려던 일과 맞는지 비교합니다. 코드가 오래 걸리거나 결과가 너무 많으면 브라우저가 안전을 위해 실행을 멈출 수 있으므로 작은 코드부터 확인합니다.', 'challenge', 'message = "결과 창에서 확인해요"\nprint(message)', '결과 창에서 확인해요', { prompt: 'message 변수의 안내 문장을 나만의 말로 바꾸고, 결과 창에 새 문장이 보이는지 확인하세요.', hint: 'message = 뒤의 따옴표 안을 찾으세요. 따옴표는 남기고 문장만 바꾼 뒤 다시 실행해 결과 창의 문장이 달라졌는지 관찰하세요. 실행은 작은 코드로 시작하면 안전해요.', sourcePatterns: ['message', 'print\\s*\\('], checks: [{ mode: 'changed', value: '', feedback: '나만의 결과 안내 문장을 만들고 실행 약속도 확인했어요.' }] }),
]);
