import { chapter, makeLesson } from './lessonFactory';

export const chapter3 = chapter(3, '설치와 실행 환경', [
  makeLesson(3, 1, '설치 없이 브라우저에서 실행', '이 앱은 브라우저 안의 작은 Python 실험실이라 설치 과정 없이 시작할 수 있습니다.', 'run', 'print("브라우저 실험실 준비 완료")', '브라우저 실험실 준비 완료'),
  makeLesson(3, 2, '운영체제와 Python 설치', '컴퓨터에 Python을 설치하면 파일로 저장하고 터미널에서도 실행할 수 있습니다.', 'read'),
  makeLesson(3, 3, '명령줄과 파일 실행', '터미널은 글자로 컴퓨터에 명령하는 공간이고, .py 파일은 Python 프로그램 파일입니다.', 'challenge', 'file_name = "hello.py"\nprint("실행할 파일:", file_name)', '실행할 파일: hello.py', { prompt: '실행할 나만의 파일 이름을 만들어 출력하세요.', hint: '.py로 끝나는 이름을 file_name에 넣어 보세요.', checks: [{ mode: 'contains', value: '.py', feedback: 'Python 파일 이름을 확인했어요.' }, { mode: 'changed', value: '', feedback: '나만의 Python 파일 이름을 만들었어요.' }] }),
  makeLesson(3, 4, '환경 확인 실습', '실행 환경의 약속을 글자로 정리하고, 코드가 위에서 아래로 실행되는지 봅니다.', 'challenge', 'print("1. 코드 작성")\nprint("2. 실행 버튼")\nprint("3. 결과 확인")', '1. 코드 작성\n2. 실행 버튼\n3. 결과 확인', { prompt: '나만의 실습 순서를 한 줄 추가하세요.', hint: 'print()를 하나 더 적으면 됩니다.', checks: [{ mode: 'appended', value: '', feedback: '실행 흐름을 잘 정리했어요.' }] }),
]);
