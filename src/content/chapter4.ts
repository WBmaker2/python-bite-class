import { chapter, makeLesson } from './lessonFactory';

export const chapter4 = chapter(4, '첫걸음', [
  makeLesson(4, 1, '인터프리터와 print()', '인터프리터는 코드를 읽어 실행하고, print()는 결과를 화면에 보여 줍니다.', 'run', 'print("한 줄씩 실행해요")', '한 줄씩 실행해요'),
  makeLesson(4, 2, '편집기 선택하기', '편집기는 코드를 쓰고 고치는 도구입니다. 이 앱에서는 오른쪽 편집기를 사용합니다.', 'read'),
  makeLesson(4, 3, '소스 파일과 실행 순서', '소스는 사람이 읽는 프로그램 글이며 보통 위에서 아래 순서로 실행됩니다.', 'challenge', 'print("첫 번째")\nprint("두 번째")\nprint("세 번째")', '첫 번째\n두 번째\n세 번째', { prompt: '순서가 드러나는 네 번째 줄을 추가하세요.', hint: 'print("네 번째")처럼 적어 보세요.', checks: [{ mode: 'contains', value: '네 번째', feedback: '실행 순서를 코드로 표현했어요.' }] }),
  makeLesson(4, 4, '도움말 읽는 습관', '모르는 함수는 이름과 괄호를 살펴보고, 공식 문서에서 사용법을 확인하는 습관을 기릅니다.', 'challenge', 'word = "help"\nprint(word, "를 찾아보면 새 기능을 배울 수 있어요.")', 'help 를 찾아보면 새 기능을 배울 수 있어요.', { prompt: '도움말을 찾고 싶은 함수 이름으로 바꾸세요.', hint: 'word 변수 안의 글자를 바꾸면 됩니다.', checks: [{ mode: 'contains', value: 'print', feedback: '도움말을 찾을 대상을 정했어요.' }] }),
  makeLesson(4, 5, '첫걸음 확인 실습', '세 줄 인사 프로그램으로 지금까지 배운 실행 흐름을 묶어 봅니다.', 'challenge', 'print("안녕하세요!")\nprint("저는 파이썬 새내기예요.")\nprint("오늘도 한 줄씩!")', '안녕하세요!\n저는 파이썬 새내기예요.\n오늘도 한 줄씩!', { prompt: '세 줄 자기소개를 나만의 말로 바꿔 보세요.', hint: 'print를 지우지 말고 따옴표 안을 고쳐요.', checks: [{ mode: 'contains', value: '파이썬', feedback: '첫 자기소개 프로그램을 완성했어요.' }] }),
]);
