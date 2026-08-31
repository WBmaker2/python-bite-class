import type { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 'chapter-2-1', chapter: 2, order: 1, title: '파이썬 소개',
    summary: '사람의 생각을 컴퓨터에게 전하는 쉬운 언어, 파이썬을 만나 봅니다.',
    objectives: ['파이썬이 어떤 언어인지 말할 수 있어요.', '첫 번째 출력문을 실행할 수 있어요.'],
    concepts: [
      { type: 'explanation', title: '읽기 쉬운 언어', body: '파이썬은 문장이 짧고 자연스러워서 처음 프로그래밍을 배울 때 잘 어울립니다. 코드를 한 줄씩 바로 실행하는 인터프리터 방식도 사용해요.' },
      { type: 'tip', title: '어디에 쓰일까요?', body: '웹사이트, 데이터 분석, 인공지능, 자동화 등 우리 주변의 많은 곳에서 파이썬을 만날 수 있어요.' },
      { type: 'example', title: '첫 인사', body: 'print()는 괄호 안의 내용을 화면에 보여 주는 명령이에요.', code: 'print("파이썬으로 무엇을 만들까?")' },
    ],
    starterCode: 'print("파이썬으로 무엇을 만들까?")', expectedOutput: '파이썬으로 무엇을 만들까?',
    challenge: { prompt: '출력 문장을 내가 만들고 싶은 것으로 바꿔 보세요.', hint: '따옴표 안의 문장만 바꾸면 됩니다.', checks: [{ mode: 'contains', value: '파이썬', feedback: '파이썬으로 만들고 싶은 것을 잘 표현했어요!' }] },
    glossary: [{ term: '인터프리터', definition: '코드를 한 줄씩 읽고 바로 실행하는 프로그램' }, { term: '이식성', definition: '여러 컴퓨터 환경에서 사용할 수 있는 성질' }],
  },
  {
    id: 'chapter-3-1', chapter: 3, order: 1, title: '설치와 실행 환경',
    summary: '이 교실에서는 설치 없이 브라우저에서 파이썬을 실행합니다.',
    objectives: ['브라우저 실습 환경과 내 컴퓨터의 차이를 알 수 있어요.', '실행 버튼으로 코드를 시작할 수 있어요.'],
    concepts: [{ type: 'explanation', title: '브라우저 실습', body: '지금 쓰는 실행기는 웹 브라우저 안의 작은 파이썬 공간이에요. 코드는 서버로 보내지지 않고 이 기기 안에서만 실행됩니다.' }, { type: 'warning', title: '확장 학습', body: '나중에 컴퓨터에 Python을 설치하면 파일을 만들고 저장하는 연습도 할 수 있어요. 이 앱에서는 안전한 기본 문법에 집중합니다.' }],
    starterCode: 'print("설치 없이 바로 실행!")\nprint("내 첫 실습 환경")', expectedOutput: '설치 없이 바로 실행!\n내 첫 실습 환경',
    challenge: { prompt: '두 줄을 더 출력해서 오늘의 기분을 기록해 보세요.', hint: 'print()를 줄마다 하나씩 써 보세요.', checks: [{ mode: 'contains', value: '실행', feedback: '여러 줄을 차례로 실행했어요.' }] }, glossary: [{ term: '실행 환경', definition: '코드가 동작하는 장소와 도구' }],
  },
  {
    id: 'chapter-4-1', chapter: 4, order: 1, title: '첫걸음: print()', summary: '코드는 위에서 아래로 읽힙니다. print()로 자기소개를 만들어 봐요.', objectives: ['문자열과 따옴표를 구분할 수 있어요.', '실행 순서를 설명할 수 있어요.'], concepts: [{ type: 'explanation', title: '위에서 아래로', body: '파이썬은 보통 첫 줄부터 마지막 줄까지 순서대로 실행합니다. 괄호와 따옴표가 짝을 이루는지도 꼭 살펴보세요.' }, { type: 'example', title: '세 줄 자기소개', body: '문장마다 print()를 하나씩 사용해요.', code: 'print("안녕하세요!")\nprint("저는 민준이에요.")\nprint("파이썬을 배워요.")' }], starterCode: 'print("안녕하세요!")\nprint("저는 파이썬 새내기예요.")\nprint("오늘도 한 줄씩!")', expectedOutput: '안녕하세요!\n저는 파이썬 새내기예요.\n오늘도 한 줄씩!', challenge: { prompt: '세 줄 자기소개를 나만의 말로 바꿔 보세요.', hint: 'print를 지우지 말고 따옴표 안을 고쳐요.', checks: [{ mode: 'contains', value: '파이썬', feedback: '자기소개에 파이썬 이야기가 들어갔네요.' }] }, glossary: [{ term: '문자열', definition: '따옴표로 감싼 글자 데이터' }],
  },
  {
    id: 'chapter-5-1', chapter: 5, order: 1, title: '기초: 변수와 자료형', summary: '이름표를 붙인 상자, 변수에 숫자와 글자를 담아 봅니다.', objectives: ['변수에 값을 저장할 수 있어요.', '문자열과 숫자를 구분할 수 있어요.'], concepts: [{ type: 'explanation', title: '변수는 이름표', body: '변수는 값을 담아 두는 이름표입니다. name = "지우"처럼 등호 오른쪽 값을 왼쪽 이름으로 기억해요.' }, { type: 'tip', title: '주석', body: '#으로 시작한 글은 설명 메모입니다. 파이썬은 주석을 실행하지 않아요.' }], starterCode: 'name = "지우"\ngrade = 2\nsubject = "과학"\nprint(name)\nprint(grade)', expectedOutput: '지우\n2', challenge: { prompt: '변수 세 개를 나의 정보로 바꾸고, 좋아하는 과목도 출력해 보세요.', hint: '문자열은 따옴표, 숫자는 따옴표 없이 적어요.', checks: [{ mode: 'contains', value: '과학', feedback: '변수에 담은 값을 잘 꺼냈어요.' }] }, glossary: [{ term: '변수', definition: '값을 저장하고 다시 꺼내는 이름표' }, { term: '자료형', definition: '숫자, 글자처럼 값의 종류를 나타내는 것' }],
  },
  {
    id: 'chapter-6-1', chapter: 6, order: 1, title: '연산자와 수식', summary: '계산과 비교를 코드로 표현해 간식 예산을 계산해요.', objectives: ['산술 연산자를 사용할 수 있어요.', '괄호로 계산 순서를 분명하게 할 수 있어요.'], concepts: [{ type: 'explanation', title: '계산하는 기호', body: '+, -, *, /는 더하기·빼기·곱하기·나누기입니다. **는 거듭제곱, %는 나머지를 구해요.' }, { type: 'example', title: '간식 예산', body: '간식 하나의 가격과 개수를 곱하면 필요한 돈을 구할 수 있어요.', code: 'price = 1200\ncount = 3\nprint(price * count)' }], starterCode: 'price = 1200\ncount = 3\nbudget = 5000\nspent = price * count\nprint("사용 금액:", spent)\nprint("남은 금액:", budget - spent)', expectedOutput: '사용 금액: 3600\n남은 금액: 1400', challenge: { prompt: '간식 가격과 개수를 바꿔 남은 예산을 다시 계산하세요.', hint: 'price, count, budget 중 하나를 바꿔 보세요.', checks: [{ mode: 'contains', value: '남은 금액', feedback: '예산 계산 결과를 확인했어요.' }] }, glossary: [{ term: '연산자', definition: '계산이나 비교를 나타내는 기호' }],
  },
  {
    id: 'chapter-7-1', chapter: 7, order: 1, title: '흐름 제어', summary: '조건과 반복을 사용하면 프로그램이 상황에 맞게 움직입니다.', objectives: ['if로 조건을 나눌 수 있어요.', 'for 반복문으로 여러 값을 처리할 수 있어요.'], concepts: [{ type: 'explanation', title: '조건과 반복', body: 'if는 “만약 ~라면”을 표현하고, for는 같은 일을 여러 번 반복합니다. 콜론 다음 줄은 들여쓰기해야 해요.' }, { type: 'example', title: '짝수 찾기', body: '% 연산자로 나머지가 0인지 확인해 봐요.', code: 'for number in range(1, 8):\n    if number % 2 == 0:\n        print(number)' }], starterCode: 'for number in range(1, 11):\n    if number % 2 == 0:\n        print(number, "은 짝수")', expectedOutput: '2 은 짝수\n4 은 짝수\n6 은 짝수\n8 은 짝수\n10 은 짝수', challenge: { prompt: '1부터 30까지 중 3의 배수만 출력해 보세요.', hint: 'number % 3 == 0인지 확인하면 됩니다.', checks: [{ mode: 'contains', value: '3', feedback: '조건에 맞는 수를 찾았어요!' }] }, glossary: [{ term: '조건문', definition: '조건에 따라 실행할 내용을 고르는 문장' }, { term: '반복문', definition: '같은 코드를 여러 번 실행하는 문장' }],
  },
  {
    id: 'chapter-8-1', chapter: 8, order: 1, title: '함수', summary: '자주 쓰는 코드를 함수라는 이름표 아래 묶고 다시 사용해요.', objectives: ['함수를 정의하고 호출할 수 있어요.', 'return으로 결과를 돌려줄 수 있어요.'], concepts: [{ type: 'explanation', title: '작은 도구 만들기', body: 'def로 함수를 정의하고, 괄호 안에 필요한 재료(매개변수)를 적습니다. return은 계산 결과를 돌려줘요.' }, { type: 'example', title: '평균 함수', body: '함수는 입력을 받아 결과를 만드는 작은 기계와 같아요.', code: 'def average(a, b):\n    return (a + b) / 2\n\nprint(average(80, 90))' }], starterCode: 'def average(a, b):\n    return (a + b) / 2\n\nprint("평균:", average(80, 90))', expectedOutput: '평균: 85.0', challenge: { prompt: '할인 가격을 돌려주는 discount(price, rate) 함수를 완성하세요.', hint: 'price * (1 - rate / 100)을 return하면 됩니다.', checks: [{ mode: 'contains', value: '할인', feedback: '함수로 반복되는 계산을 깔끔하게 만들었어요.' }] }, glossary: [{ term: '함수', definition: '특정 일을 하도록 묶어 둔 코드' }, { term: '매개변수', definition: '함수에 전달하는 입력값의 이름' }],
  },
  {
    id: 'chapter-9-1', chapter: 9, order: 1, title: '모듈', summary: '다른 사람이 만든 도구 상자를 가져와 더 큰 문제를 해결해요.', objectives: ['import로 모듈을 가져올 수 있어요.', '표준 라이브러리의 역할을 알 수 있어요.'], concepts: [{ type: 'explanation', title: '도구 상자 가져오기', body: 'import math처럼 모듈을 가져오면 이미 만들어진 함수와 값을 사용할 수 있습니다.' }, { type: 'warning', title: '브라우저의 약속', body: '브라우저 제약으로 일부 모듈은 다르게 동작하거나 사용할 수 없어요.' }], starterCode: 'import math\nradius = 3\narea = math.pi * radius ** 2\nprint("원의 넓이:", round(area, 2))', expectedOutput: '원의 넓이: 28.27', challenge: { prompt: '원의 반지름을 바꾸고 넓이가 어떻게 달라지는지 관찰하세요.', hint: 'radius 숫자를 5로 바꿔 보세요.', checks: [{ mode: 'contains', value: '원의 넓이', feedback: 'math 모듈을 사용해 계산했어요.' }] }, glossary: [{ term: '모듈', definition: '재사용할 수 있는 코드 묶음' }, { term: '표준 라이브러리', definition: '파이썬에 기본으로 포함된 모듈 모음' }],
  },
  {
    id: 'chapter-10-1', chapter: 10, order: 1, title: '자료 구조', summary: '여러 값을 리스트와 딕셔너리에 담아 질서 있게 다뤄 봅니다.', objectives: ['리스트를 순회할 수 있어요.', '딕셔너리에서 값을 꺼낼 수 있어요.'], concepts: [{ type: 'explanation', title: '값을 모아 두기', body: '리스트는 순서가 있는 목록이고, 딕셔너리는 key와 value를 짝으로 저장합니다. 목적에 맞는 구조를 고르면 코드가 읽기 쉬워져요.' }, { type: 'example', title: '할 일 목록', body: 'for로 목록의 모든 항목을 하나씩 꺼낼 수 있어요.', code: 'todos = ["수학 숙제", "물 마시기"]\nfor todo in todos:\n    print("할 일:", todo)' }], starterCode: 'scores = {"수학": 90, "과학": 85, "미술": 95}\nfor subject, score in scores.items():\n    print(subject, score, "점")', expectedOutput: '수학 90 점\n과학 85 점\n미술 95 점', challenge: { prompt: '좋아하는 과목을 하나 더 추가하고 출력하세요.', hint: '딕셔너리에 "체육": 100 같은 항목을 추가해요.', checks: [{ mode: 'contains', value: '점', feedback: '자료 구조를 순회하며 값을 읽었어요.' }] }, glossary: [{ term: '리스트', definition: '순서대로 여러 값을 담는 구조' }, { term: '딕셔너리', definition: '이름표(key)와 값(value)을 짝으로 담는 구조' }],
  },
  {
    id: 'chapter-11-1', chapter: 11, order: 1, title: '실생활 문제 해결', summary: '학교 축제 준비물 관리 프로그램을 만들며 배운 내용을 연결합니다.', objectives: ['큰 문제를 작은 단계로 나눌 수 있어요.', '자료 구조와 함수를 함께 사용할 수 있어요.'], concepts: [{ type: 'explanation', title: '문제를 쪼개기', body: '요구 사항을 읽고 필요한 데이터, 계산, 화면 출력을 차례로 정합니다. 작은 코드부터 실행하며 고쳐 나가는 것이 핵심이에요.' }, { type: 'tip', title: '프로젝트 순서', body: '준비물 저장 → 부족한지 판정 → 함수로 정리 → 테스트 사례 실행 순서로 완성해 봅니다.' }], starterCode: 'supplies = {"색종이": 30, "가위": 4, "테이프": 2}\nneeded = {"색종이": 50, "가위": 4, "테이프": 3}\n\ndef check_missing(stock, plan):\n    missing = []\n    for item, amount in plan.items():\n        if stock.get(item, 0) < amount:\n            missing.append(item)\n    return missing\n\nfor item in check_missing(supplies, needed):\n    print("준비 필요:", item)', expectedOutput: '준비 필요: 색종이\n준비 필요: 테이프', challenge: { prompt: '부족한 새 준비물을 추가하거나 수량을 바꿔 준비 필요 결과를 갱신하세요.', hint: 'supplies 또는 needed 딕셔너리를 수정한 뒤 실행해요.', checks: [{ mode: 'contains', value: '준비 필요', feedback: '요구 사항을 코드로 나누어 해결했어요!' }] }, glossary: [{ term: '요구 사항', definition: '프로그램이 해야 하는 일을 적은 약속' }, { term: '테스트 사례', definition: '코드가 잘 동작하는지 확인하는 입력과 결과' }],
  },
];

export const chapterNumbers = [...new Set(lessons.map((lesson) => lesson.chapter))];
export const getLesson = (id: string) => lessons.find((lesson) => lesson.id === id) ?? lessons[0];
