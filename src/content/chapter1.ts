import { chapter, makeLesson } from './lessonFactory';

const sources = [
  { label: '공식 원문: A Byte of Python', href: 'https://python.swaroopch.com', note: 'Swaroop C H의 공식 영문판' },
  { label: '한국어판: Byte of Python', href: 'https://byteofpython-korean.sourceforge.net/byte_of_python.html', note: 'Jeongbin Park 번역 참고본' },
  { label: 'CC BY-SA 4.0 라이선스 안내', href: 'https://creativecommons.org/licenses/by-sa/4.0/deed.ko', note: '원문 교재의 공유·변경·출처 표시 조건' },
];

export const chapter1 = chapter(1, '이 프로그램 소개', [
  makeLesson(1, 1, '왜 이 프로그램을 만들었나요?', '파이썬을 처음 만나는 중학생이 설명을 읽고 바로 실험하며 자신감을 얻도록 만든 교실입니다.', 'read', undefined, undefined, undefined, [
    { type: 'explanation', title: '생각을 코드로', body: '코딩은 컴퓨터에게 일을 시키는 방법을 배우는 일입니다. 이 프로그램은 어려운 말을 짧게 나누고, 직접 실행하며 답을 찾아가도록 설계했어요.' },
    { type: 'tip', title: '정답보다 과정', body: '오류가 나도 괜찮아요. 오류 메시지를 읽고 한 부분씩 고치는 과정이 진짜 실력입니다.' },
  ], [{ term: '코딩', definition: '컴퓨터가 할 일을 명령어로 표현하는 활동' }, { term: '오류 메시지', definition: '코드에서 문제가 난 곳과 이유를 알려 주는 안내' }]),
  makeLesson(1, 2, '이렇게 학습해요', '왼쪽 목차에서 순서대로 소단원을 열고, 가운데 설명을 읽은 뒤 오른쪽 실습실에서 확인하세요.', 'read', undefined, undefined, undefined, [
    { type: 'explanation', title: '세 칸으로 배우기', body: '왼쪽은 전체 지도, 가운데는 오늘의 설명, 오른쪽은 코드를 실행하는 실험실입니다. 아래의 학습 완료 버튼을 눌러야 다음 소단원이 열려요.' },
    { type: 'example', title: '학습 순서', body: '읽기 → 코드 실행 → 도전 결과 확인 → 학습 완료 → 다음 소단원 순서로 진행합니다.', code: '생각하기  →  고치기  →  실행하기  →  설명하기' },
  ], [{ term: '소단원', definition: '큰 단원을 작은 학습 주제로 나눈 한 단계' }]),
  makeLesson(1, 3, '교재와 저작권', '이 수업은 공개된 원문 교재를 바탕으로 핵심을 중학생 눈높이에 맞게 다시 설명합니다.', 'read', undefined, undefined, undefined, [
    { type: 'explanation', title: '어디에서 배웠나요?', body: '기본 흐름은 Swaroop C H의 A Byte of Python을 참고했고, 한국어판은 Jeongbin Park 번역본을 확인했습니다. 이 앱의 문장은 원문을 길게 복사하지 않고 학습용으로 재서술했어요.' },
    { type: 'warning', title: '라이선스를 함께 지켜요', body: '원문 교재는 CC BY-SA 4.0 조건으로 공유됩니다. 출처를 밝히고 같은 조건으로 공유해야 하며, 아래 링크에서 정확한 조건을 확인할 수 있어요. 교재 코드 예제는 별도로 3-clause BSD 조건(unless otherwise noted)이 안내되어 있습니다. 앱의 재서술 콘텐츠와 앱 코드는 교재와 별도의 권리를 가집니다.' },
  ], [{ term: '출처 표시', definition: '누가 만든 자료인지 밝히는 약속' }, { term: '라이선스', definition: '자료를 어떻게 사용하고 공유할 수 있는지 정한 이용 규칙' }, { term: 'CC BY-SA 4.0', definition: '저작자 표시와 같은 조건으로 공유하도록 안내하는 공개 라이선스' }, { term: '재서술', definition: '원문을 그대로 복사하지 않고 내 말로 다시 쓰는 일' }, { term: '3-clause BSD', definition: '코드 예제를 사용하고 공유할 때 지켜야 할 공개 이용 조건' }], sources),
  makeLesson(1, 4, '첫 실행 준비', '설치 없이 브라우저에서 첫 문장을 실행하고 출력 창을 확인해 봅니다.', 'run', 'print("첫 실행 성공!")', '첫 실행 성공!', undefined, [
    { type: 'explanation', title: '안전한 실험실', body: '코드는 이 웹페이지의 안전한 실행 공간 안에서만 실행됩니다. 이름이나 이메일을 입력할 필요가 없고, 실행 시간이 길어지면 자동으로 멈춰요.' },
    { type: 'example', title: '첫 명령', body: 'print()는 괄호 안의 글을 출력 창에 보여 줍니다. 이번 과정에서 처음 만나는 명령이니 결과 창의 글자와 꼭 비교해 보세요.', code: 'print("첫 실행 성공!")' },
  ], [{ term: '출력', definition: '프로그램이 실행 결과로 보여 주는 내용' }, { term: '명령', definition: '컴퓨터에게 무엇을 하라고 시키는 코드 한 줄' }, { term: 'print()', definition: '괄호 안의 값을 출력 창에 보여 주는 파이썬 함수' }, { term: '브라우저', definition: '웹페이지를 열어 보는 프로그램' }]),
]);
