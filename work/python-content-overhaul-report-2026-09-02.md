# 파이썬 입문 콘텐츠 개편 결과

- 작업일: 2026-09-02
- 대상: 중학교 1학년 파이썬 입문자
- 범위: 1. 이 프로그램 소개 ~ 11. 실생활 문제 해결
- 구현 모드: `full`
- 음성/VoiceOver: 범위에서 제외
- 공개 배포: 이번 요청에는 커밋·푸시·배포를 포함하지 않음

## 확인된 문제

- 1.4에서 이미 `print()`와 출력 창을 설명했는데 2.1, 3.1, 4.1에서도 비슷한 한 줄 출력만 반복했습니다.
- 3단원에 이 앱에서 사용하지 않는 PC 설치·운영체제·터미널·명령줄·`.py` 파일 안내가 있었습니다.
- 4.2 `편집기 선택하기`는 브라우저에서 사용할 편집기가 이미 정해져 있어 학습 목표가 겹쳤습니다.
- 5~11단원 대부분이 제목을 그대로 설명하는 임시 용어 정의를 사용해, 처음 만나는 개념의 뜻과 예가 부족했습니다.

## 반영한 변경

### 1~4단원 흐름

1. 1.4 `첫 실행 준비`를 첫 `print()`와 출력 창 확인 단계로 유지했습니다.
2. 2.1 `파이썬은 어떤 언어일까요?`, 2.4 `소개 확인`은 읽기 단계로 바꾸어 소개 내용을 말로 정리하게 했습니다.
3. 3단원 제목은 교재 흐름에 맞춰 유지하고, 3.1 브라우저 시작·3.2 실행실 살펴보기·3.3 결과 읽기·3.4 브라우저 실습 약속으로 구성했습니다. 3.3은 변수의 글자를 바꾸고, 3.4는 목록에 실습 단계를 추가합니다.
4. 4.1 코드를 읽는 순서·4.2 브라우저 편집기 사용법으로 중복을 줄였습니다. 4.3은 변수 한 줄을 바꾸는 도전, 4.4는 도움말 찾기, 4.5는 세 변수로 자기소개를 만드는 종합 도전으로 구분했습니다.

### 전체 용어·설명 보강

- `src/content/lessonGuides.ts`에서 2~11단원 65개 소단원마다 “쉽게 이해하기”, “기억하기”, “핵심 용어”를 제공합니다.
- 파이썬·문법·버전·브라우저·인터프리터·변수·자료형·객체·연산자·조건·반복·함수·매개변수·return·모듈·리스트·딕셔너리·집합·참조·알고리즘 등 첫 등장 용어를 생활 비유와 짧은 문장으로 풀이했습니다.
- 1.3에는 라이선스·CC BY-SA 4.0·재서술을 추가했고, 1.4에는 출력·명령·브라우저를 추가했습니다.
- 업데이트 내역에 이번 개편을 기록했습니다.

## 공식 자료 확인

입문 설명의 사실 관계는 [Python 공식 튜토리얼](https://docs.python.org/3/tutorial/index.html), [비공식적 Python 소개](https://docs.python.org/3.11/tutorial/introduction.html), [Python 용어집](https://docs.python.org/3/glossary.html), [내장 함수 문서](https://docs.python.org/3/library/functions.html), [자료 구조](https://docs.python.org/3/tutorial/datastructures.html), [흐름 제어](https://docs.python.org/3/tutorial/controlflow.html), [모듈](https://docs.python.org/3/tutorial/modules.html)을 기준으로 확인했습니다. 공식 튜토리얼 자체도 프로그래밍을 처음 접하는 독자를 위한 완전한 입문서는 아니므로, 앱에서는 각 용어를 더 짧고 쉬운 말로 다시 설명했습니다.

## 검증 증거

- `npm test -- --run`: 7개 테스트 파일, 30개 테스트 통과
- `npm run typecheck`: 통과
- `npm run lint`: 통과
- `npm run build`: 통과 (Vite의 500 kB 청크 경고만 기존과 동일하게 발생)
- 브라우저 로컬 시나리오: 1.1 → 4.5까지 17개 단계 방문, 2.2 이름 추가·2.3 `자동화` 추가·3.3 결과 문장 변경·3.4 단계 추가·4.3/4.4/4.5 변경 도전 통과
- 반응형 확인: 320px·375px·1280px에서 `scrollWidth === innerWidth`
- 콘솔: 시나리오 중 브라우저 오류 0건
- 정적 회귀: 1~4단원 print-only 시작 코드는 `chapter-1-4` 하나만 남고, 3·4단원에 PC/IDE/터미널/운영체제/명령줄/파일 실행 문구가 없음

### 오케스트레이터 라우팅 계약

```text
route=design-system
observed-statuses=ui-ux-pro-max:filesystem-only, design-system:runtime-available, impeccable:runtime-available, product-design:audit:runtime-available, design-review:runtime-available, qa:runtime-available
action=continue
fallback-reason=ui-ux-pro-max는 현재 호출 가능한 런타임 Skill이 아니므로 첫 runtime-available fallback인 design-system을 선택
```

새 이미지·Canvas/WebGL 시뮬레이션은 추가하지 않았고 기존 배너와 코드 실습으로 학습 목표를 충족했습니다.
