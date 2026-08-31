import { chapter, makeLesson } from './lessonFactory';

export const chapter9 = chapter(9, '모듈', [
  makeLesson(9, 1, 'import와 코드 묶음', 'import는 다른 파일이나 표준 라이브러리의 도구를 가져오는 명령입니다.', 'challenge', 'import math\nprint(round(math.sqrt(25)))', '5', { prompt: 'math 도구로 다른 계산을 해 보세요.', hint: 'math.pi 또는 math.ceil()을 찾아 사용해요.', checks: [{ mode: 'contains', value: '3', feedback: '모듈의 도구를 가져왔어요.' }] }),
  makeLesson(9, 2, 'from ... import', '모듈 이름을 매번 쓰기 싫을 때 필요한 이름만 가져올 수 있습니다.', 'challenge', 'from math import pi\nprint(round(pi, 2))', '3.14', { prompt: 'pi의 자릿수를 바꾸어 출력하세요.', hint: 'round의 두 번째 숫자를 고쳐요.', checks: [{ mode: 'contains', value: '3.14', feedback: '모듈에서 필요한 이름만 가져왔어요.' }] }),
  makeLesson(9, 3, '__name__ 살펴보기', '파일이 직접 실행되는지 다른 코드에서 불린 것인지 구분할 때 __name__을 사용합니다.', 'challenge', 'if __name__ == "__main__":\n    print("이 파일을 직접 실행했어요")', '이 파일을 직접 실행했어요', { prompt: '직접 실행 안내 문장을 바꾸세요.', hint: 'print 안의 문자열을 고쳐요.', checks: [{ mode: 'contains', value: '실행', feedback: '__name__ 조건을 확인했어요.' }] }),
  makeLesson(9, 4, '사용자 모듈과 브라우저 제약', '내 컴퓨터에서는 파일을 나누어 모듈을 만들 수 있지만, 이 브라우저 실습은 미리 준비된 표준 도구 중심입니다.', 'read'),
  makeLesson(9, 5, 'dir()로 살펴보기', 'dir()은 모듈이나 객체에서 사용할 수 있는 이름을 살펴보는 데 도움을 줍니다.', 'challenge', 'import math\nprint("sqrt" in dir(math))', 'True', { prompt: 'math에서 pi 이름도 있는지 확인하세요.', hint: 'sqrt를 pi로 바꿔 보세요.', checks: [{ mode: 'equals', value: 'True', feedback: 'dir()로 모듈의 이름을 찾아봤어요.' }] }),
  makeLesson(9, 6, '패키지와 모듈 정리', '여러 모듈을 폴더로 묶은 것이 패키지입니다. 기능별로 나누면 큰 프로그램도 읽기 쉬워집니다.', 'challenge', 'import math\nprint("도구 상자:", math.__name__)', '도구 상자: math', { prompt: '다른 표준 모듈을 가져와 이름을 출력해 보세요.', hint: 'random 같은 모듈도 시도할 수 있어요.', checks: [{ mode: 'contains', value: '도구 상자', feedback: '모듈을 도구 상자로 이해했어요.' }] }),
  makeLesson(9, 7, '모듈 확인 실습', '필요한 기능을 모듈에서 가져와 원의 넓이를 계산합니다.', 'challenge', 'import math\nradius = 3\narea = math.pi * radius ** 2\nprint("원의 넓이:", round(area, 2))', '원의 넓이: 28.27', { prompt: '원의 반지름을 바꾸어 넓이를 관찰하세요.', hint: 'radius 숫자를 5로 바꿔 보세요.', checks: [{ mode: 'contains', value: '원의 넓이', feedback: 'math 모듈을 사용해 계산했어요.' }] }),
]);
