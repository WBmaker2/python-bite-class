# 패널 높이 기준 내부 스크롤 개선 계획

- 작성일: 2026-09-04
- 대상: `파이썬 한입 교실` 학습 화면
- 요청: 오른쪽 실습창의 세로 길이를 기준으로 목차와 가운데 설명을 각각 내부 스크롤하고, 데스크톱에서 문서 전체가 위·아래로 움직이지 않도록 개선
- 상태: 구현 및 검증 완료(커밋·푸시·배포는 이번 요청 범위에 없음)

## 1. 기준선 확인

공개 학습 화면(`https://wbmaker2.github.io/python-bite-class/`)의 긴 9.2 단계에서 브라우저 실측을 수행했습니다.

| 항목 | 기준선 측정값 | 문제 |
| --- | ---: | --- |
| viewport 높이 | 886px | 기준 높이 |
| `.app-shell` 높이 | 1217px | viewport보다 331px 길어 문서 스크롤 발생 |
| `.main-grid` 높이 | 1139px | header 아래 영역이 내용에 의해 늘어남 |
| `.lesson-pane` | 808px / `scrollHeight` 2272px | 가운데는 내부 스크롤 가능 |
| `.playground-pane` | 808px | 오른쪽 실습창 높이가 전체 레이아웃 기준으로 고정되지 않음 |
| `.chapter-nav nav` | 953px / `scrollHeight` 953px | 목차가 길어져도 독립 스크롤 영역이 되지 않음 |

원인은 `.app-shell`·`.main-grid`·`.workspace`가 viewport 아래에 고정되지 않은 점, grid/flex 자식에 `min-height: 0`이 없는 점, 스크롤 체인이 문서까지 이어지는 점으로 판단했습니다.

## 2. 구현 범위

### 데스크톱·가로형 화면(901px 이상)

1. header를 제외한 `.main-grid`를 `calc(100vh - header 높이)`로 고정합니다.
2. `.app-shell`과 grid/flex 자식에 `min-height: 0`을 적용해 긴 콘텐츠가 부모 높이를 밀어내지 않게 합니다.
3. 왼쪽 목차와 가운데 설명 pane을 `overflow-y: auto`인 독립 스크롤 영역으로 만들고 `overscroll-behavior: contain`으로 문서 스크롤 전파를 막습니다.
4. 오른쪽 실습 pane은 같은 행의 높이를 차지하는 기준 영역으로 유지합니다. 편집기와 출력창은 패널 안에서 각각 줄어들 수 있게 `min-height: 0`을 적용하되, 기존의 읽을 수 있는 비율과 경계는 유지합니다.
5. 스크롤바가 나타나도 세 열의 폭이 흔들리지 않도록 지원 브라우저에서 `scrollbar-gutter: stable`을 사용합니다.

### 태블릿·모바일(900px 이하)

현재 앱은 768–900px에서 세로 배치, 767px 이하에서 학습/실습 탭 배치를 사용합니다. 이 폭에서 세 열을 동시에 고정하면 편집기와 설명이 지나치게 좁아지므로 기존의 읽기 흐름을 보존합니다. 데스크톱용 고정 높이 규칙이 이 구간에 새어 들어가지 않도록 `height`, `overflow`, `overscroll-behavior`를 원래의 자동 높이로 명시적으로 되돌립니다. 320px·375px에서는 가로 넘침이 없어야 합니다.

## 3. 파일별 작업

- `src/styles/layout.css`: viewport 높이 계약, grid/flex `min-height: 0`, pane 내부 스크롤, 스크롤 체인 차단
- `src/styles/responsive.css`: 900px 이하 자동 높이 예외와 현재 모바일 탭/세로 배치 보존
- `src/content/updateHistory.ts`: 패널별 고정 높이와 내부 스크롤 개선 내역 추가
- 필요할 때만 레이아웃 계약을 검증하는 테스트를 추가하며, 기존 학습 콘텐츠·실행기 동작은 변경하지 않습니다.

## 4. 검증 기준

### 자동 검사

- `npm test -- --run`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `git diff --check`

### 브라우저 검사

- 1280×900: `documentElement.scrollHeight === clientHeight`에 가깝고 body 문서 스크롤이 없어야 하며, 목차·설명 pane은 `scrollHeight > clientHeight`일 때 내부 스크롤해야 합니다. 최종 실측에서 body/document는 900px, 목차는 818 > 636, 설명은 1392 > 822, 실습창은 822px였습니다.
- 긴 단원에서 목차를 끝까지, 설명을 끝까지 읽을 수 있고 오른쪽 편집기·출력창은 같은 viewport 안에 남아야 합니다.
- 1024px 폭: 세 열이 겹치거나 가로로 넘치지 않는지 확인합니다.
- 375×812 및 320×800: 현재 탭/세로 흐름, CTA 가시성, `scrollWidth === clientWidth`, 콘솔 오류 0건을 확인합니다.
- 창 크기를 바꾼 뒤 새로고침해도 레이아웃 계약이 유지되는지 확인합니다.

### 교육 UX 판정

- 대상 페르소나: 중학교 1학년 입문 학습자에 맞춘 기존 화면을, 시뮬레이션 패널(실제 학생 표본 아님)으로 확인합니다.
- 이번 변경은 코드 실행 시뮬레이션 자체를 바꾸지 않으므로 시뮬레이션 결정 장부는 `not-needed`입니다.
- VoiceOver 검증은 수행하지 않습니다.
- P0/P1 회귀가 없어야 하며, 동일한 긴 단원 시나리오로 기준선과 수정 후를 비교합니다.

## 5. 완료 조건

- 데스크톱에서 페이지 자체의 세로 스크롤 없이 왼쪽 목차와 가운데 설명만 각각 스크롤할 수 있습니다.
- 오른쪽 실습창의 높이가 기준으로 유지되고 편집기·출력창이 잘리지 않습니다.
- 900px 이하의 기존 학습 흐름과 320/375px 반응형 가독성이 회귀하지 않습니다.
- 업데이트 내역 버튼에서 이번 개선이 확인됩니다.

## 6. 구현·검증 결과

- `src/styles/layout.css`에 901px 이상 viewport 높이 계약, grid/flex `min-height: 0`, pane별 내부 스크롤과 `overscroll-behavior: contain`을 적용했습니다.
- `src/styles/responsive.css`에서 900px 이하의 자동 높이·페이지 스크롤과 기존 375/320px 탭 흐름을 명시적으로 복원했습니다.
- `src/content/updateHistory.ts`에 2026-09-04 개선 내역을 추가했습니다.
- 1280×900, 1024×768, 901×768에서 body/document 스크롤이 viewport를 넘지 않고 목차와 학습 pane의 `scrollHeight`가 `clientHeight`보다 클 때 내부 스크롤되는 것을 확인했습니다.
- 375×812, 320×800에서 기존 모바일 흐름과 가로 넘침 없음(`scrollWidth === clientWidth`)을 확인했습니다.
- `npm test -- --run`, `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check` 모두 통과했습니다.
- 콘솔 오류 0건을 확인했습니다. VoiceOver 검증은 계획대로 제외했습니다.
