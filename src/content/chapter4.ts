import { chapter, makeLesson } from './lessonFactory';

export const chapter4 = chapter(4, '첫걸음', [
  makeLesson(4, 1, '코드를 읽는 순서', '인터프리터는 사람이 쓴 코드를 읽어 실행하는 프로그램입니다. 파이썬 코드는 보통 위에서 아래로 한 줄씩 진행됩니다.', 'read'),
  makeLesson(4, 2, '브라우저 편집기 사용법', '이 프로그램의 편집기는 이미 준비되어 있습니다. 코드 칸을 클릭하고 필요한 부분을 고친 뒤 실행합니다.', 'read'),
  makeLesson(4, 3, '한 줄씩 고쳐 보기', '코드 한 줄을 바꾸면 결과도 달라집니다. 작은 부분만 고치고 다시 실행하며 변화의 원인을 찾아봅니다.', 'challenge', 'message = "첫 번째 결과"\nprint(message)\nprint("두 번째 결과")\nprint("세 번째 결과")', '첫 번째 결과\n두 번째 결과\n세 번째 결과', { prompt: 'message의 글자를 바꾸어 첫 번째 결과를 나만의 말로 만들어 보세요.', hint: 'message의 따옴표 안만 고치면 됩니다.', checks: [{ mode: 'changed', value: '', feedback: '변수의 글자를 바꾸어 결과를 바꿨어요.' }] }),
  makeLesson(4, 4, '도움말 읽는 습관', '모르는 함수는 이름과 괄호를 살펴보고, 공식 문서에서 사용법을 확인하는 습관을 기릅니다.', 'challenge', 'word = "help"\nprint(word, "를 찾아보면 새 기능을 배울 수 있어요.")', 'help 를 찾아보면 새 기능을 배울 수 있어요.', { prompt: '도움말을 찾고 싶은 함수 이름으로 바꾸세요.', hint: 'word 변수 안의 글자를 바꾸면 됩니다.', checks: [{ mode: 'changed', value: '', feedback: '도움말을 찾을 대상을 정했어요.' }] }),
  makeLesson(4, 5, '첫걸음 확인 실습', '세 개의 이름표에 문장을 담아 코드 작성, 실행, 결과 확인, 수정을 한 번에 연습합니다.', 'challenge', 'greeting = "안녕하세요!"\nintro = "저는 파이썬 새내기예요."\ngoal = "오늘도 한 줄씩!"\nprint(greeting)\nprint(intro)\nprint(goal)', '안녕하세요!\n저는 파이썬 새내기예요.\n오늘도 한 줄씩!', { prompt: 'greeting, intro, goal의 문장을 나만의 말로 바꿔 보세요.', hint: '세 변수의 따옴표 안 글자만 고치면 됩니다.', checks: [{ mode: 'changed', value: '', feedback: '나만의 자기소개 프로그램을 완성했어요.' }] }),
]);
