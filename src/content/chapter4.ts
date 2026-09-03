import { chapter, makeLesson } from './lessonFactory';

export const chapter4 = chapter(4, '첫걸음', [
  makeLesson(4, 1, '코드를 읽는 순서', '인터프리터는 사람이 쓴 코드를 읽어 실행하는 프로그램입니다. 파이썬 코드는 보통 위에서 아래로 한 줄씩 진행됩니다.', 'read'),
  makeLesson(4, 2, '브라우저 편집기 사용법', '이 프로그램의 편집기는 이미 준비되어 있습니다. 코드 칸을 클릭하고 필요한 부분을 고친 뒤 실행합니다.', 'read'),
  makeLesson(4, 3, '한 줄씩 고쳐 보기', '코드 한 줄을 바꾸면 결과도 달라집니다. 작은 부분만 고치고 다시 실행하며 변화의 원인을 찾아봅니다.', 'challenge', 'message = "첫 번째 결과"\nprint(message)\nprint("두 번째 결과")\nprint("세 번째 결과")', '첫 번째 결과\n두 번째 결과\n세 번째 결과', { prompt: 'message 변수의 첫 문장을 나만의 말로 바꾸고, 첫 번째 출력 줄만 달라지는지 확인하세요.', hint: 'message = 줄의 따옴표 안을 찾으세요. 그 문장만 바꾼 뒤 다시 실행해 첫 번째 줄만 달라지고 나머지 줄은 그대로인지 관찰하세요.', checks: [{ mode: 'changed', value: '', feedback: '변수의 글자를 바꾸어 결과를 바꿨어요.' }] }),
  makeLesson(4, 4, '도움말 읽는 습관', '모르는 함수는 이름과 괄호를 살펴보고, 공식 문서에서 사용법을 확인하는 습관을 기릅니다.', 'challenge', 'word = "help"\nprint(word, "를 찾아보면 새 기능을 배울 수 있어요.")', 'help 를 찾아보면 새 기능을 배울 수 있어요.', { prompt: 'word 변수에 도움말을 찾고 싶은 함수 이름을 넣고, 결과 문장이 그 이름을 보여 주는지 확인하세요.', hint: 'word = 줄의 따옴표 안을 찾으세요. help 대신 함수 이름을 넣고 다시 실행해 결과 문장에 그 이름이 나타나는지 관찰하세요.', checks: [{ mode: 'changed', value: '', feedback: '도움말을 찾을 대상을 정했어요.' }] }),
  makeLesson(4, 5, '첫걸음 확인 실습', '세 개의 이름표에 문장을 담아 코드 작성, 실행, 결과 확인, 수정을 한 번에 연습합니다.', 'challenge', 'greeting = "안녕하세요!"\nintro = "저는 파이썬 새내기예요."\ngoal = "오늘도 한 줄씩!"\nprint(greeting)\nprint(intro)\nprint(goal)', '안녕하세요!\n저는 파이썬 새내기예요.\n오늘도 한 줄씩!', { prompt: 'greeting, intro, goal의 세 문장을 나만의 말로 바꾸고, 세 줄의 출력이 모두 바뀌는지 확인하세요.', hint: 'greeting, intro, goal 각 변수의 따옴표 안을 차례로 찾으세요. 세 문장을 바꾼 뒤 다시 실행해 출력 세 줄이 내 문장으로 바뀌었는지 관찰하세요.', checks: [{ mode: 'changed', value: '', feedback: '나만의 자기소개 프로그램을 완성했어요.' }] }),
]);
