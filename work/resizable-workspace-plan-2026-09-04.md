# 설명·실습 패널 가로 조절 개선 계획

- 작성일: 2026-09-04
- 대상: `파이썬 한입 교실` 데스크톱 학습 화면
- 요청: 왼쪽 목차 폭을 조금 줄이고, 가운데 설명과 오른쪽 코드 실습 사이 경계선을 드래그해 두 패널의 가로 폭을 조절
- 상태: 구현·브라우저 검증·커밋·푸시·GitHub Pages 배포 완료
- 선행 변경: 지난 사이클의 viewport 고정·목차/설명 내부 스크롤 변경이 작업 트리에 아직 커밋되지 않았으므로 그대로 보존

## 1. 기준선 확인

현재 공개 화면을 브라우저에서 확인했습니다.

| 항목 | 기준선 | 개선 방향 |
| --- | ---: | --- |
| 왼쪽 목차 폭 | 250px | 데스크톱 기본 220px로 축소 |
| 설명 폭(1280px 브라우저) | 약 482.6px | 사용자가 드래그로 조절 |
| 실습 폭(1280px 브라우저) | 약 533.4px | 사용자가 드래그로 조절 |
| 설명·실습 경계 | 고정 grid 경계 | 901px 이상에서 `col-resize` 분할선 추가 |
| 좁은 화면 | 모바일 탭/태블릿 세로 배치 | 분할선 숨김, 기존 흐름 유지 |

## 2. 상호작용 설계

### 데스크톱(901px 이상)

1. `.main-grid` 첫 열을 250px에서 220px로 줄여 목차에 필요한 정보는 유지하면서 학습 공간을 넓힙니다.
2. `.workspace`를 `설명 pane → 분할선 → 실습 pane` 3열 grid로 바꿉니다. 설명 열의 기본값은 약 48%로 두고 실습 열은 남은 폭을 차지합니다.
3. 경계선은 16px hit area의 `<div role="separator">`로 구현합니다.
   - 마우스 포인터가 올라가거나 포커스가 있을 때 `↔` 양쪽 화살표와 `col-resize` 커서를 표시합니다.
   - `pointerdown/move/up`과 pointer capture로 경계선을 좌우로 드래그합니다.
   - 설명 폭은 30–70% 범위로 제한해 어느 한쪽이 사라지지 않게 합니다.
   - 드래그 중 선택·텍스트 커서가 생기지 않도록 일시적으로 `user-select: none`을 적용합니다.
4. 키보드 사용자도 separator에 포커스한 뒤 `ArrowLeft/ArrowRight`(4%씩), `Home/End`(최소/최대)로 같은 조절을 할 수 있게 합니다.
5. `aria-orientation="vertical"`, `aria-valuemin/max/now`, `aria-valuetext`, `aria-controls`를 제공해 현재 폭과 조절 대상을 알립니다.

### 태블릿·모바일(900px 이하)

- 현재 768–900px 세로 배치와 767px 이하 학습/실습 탭 흐름을 유지합니다.
- 분할선은 숨기고 `grid-template-columns: 1fr` 또는 기존 block 흐름을 사용해 좁은 화면에서 드래그 영역이 콘텐츠를 가리지 않게 합니다.
- 320/375px에서 가로 넘침과 고정 높이 회귀가 없어야 합니다.

## 3. 구현 파일과 안전 범위

- `src/features/learn/LessonWorkspace.tsx`: 분할 비율 상태, pointer 드래그, 키보드 separator, 설명/실습 pane 식별자
- `src/styles/layout.css`: 목차 폭 기본값, 3열 workspace, separator 화살표·커서·드래그 상태
- `src/styles/responsive.css`: 900px 이하 분할선 숨김과 현재 반응형 흐름 보존
- `src/content/updateHistory.ts`: 가로 패널 조절 기능 추가 기록
- `src/features/learn/LessonWorkspace.test.tsx`: separator 접근성 이름·초기 값·키보드 조절 회귀 테스트

기존 Python 실행기, 과제 판정, 학습 콘텐츠, 사용자 데이터 형식은 변경하지 않습니다. 새 의존성·이미지·음성 기능은 필요하지 않습니다.

## 4. 검증 기준

### 자동 검사

- `npm test -- --run`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `git diff --check`

### 브라우저 검사

- 1280×900: 분할선 hover 시 `↔` 표시와 `col-resize` 커서, 좌우 드래그로 설명·실습 폭이 함께 반대로 변하는지 확인
- 같은 화면에서 설명·실습의 top/bottom이 맞고 body/document 세로 스크롤이 생기지 않는지 확인
- separator에 `Tab`으로 포커스한 뒤 ArrowLeft/Right/Home/End 조작과 `aria-valuenow` 변화를 확인
- 1024px·901px: 최소 폭 제한, 목차 220px, 가로 넘침·겹침 없음 확인
- 375×812·320×800: 분할선이 보이지 않고 기존 모바일 탭/세로 흐름과 `scrollWidth === clientWidth` 유지 확인
- `prefers-reduced-motion: reduce`: 새 애니메이션을 추가하지 않고 기존 focus/커서 단서가 유지되는지 확인
- 콘솔 오류와 실패 요청 0건 확인

### 교육 UX 판정

- 중학교 1학년 입문 학습자용 기존 화면을 simulated learner panel로 확인하며 실제 학생 연구로 표현하지 않습니다.
- 이번 기능은 학습용 시뮬레이션이 아니므로 시뮬레이션 결정 장부는 `not-needed`입니다.
- VoiceOver 검증은 수행하지 않습니다.
- 계획에 없는 모바일 재설계나 학습 문구 변경은 하지 않습니다.

## 5. 완료 조건

- 데스크톱에서 사용자가 경계선을 보고 잡아 설명·실습 폭을 원하는 방향으로 조절할 수 있습니다.
- 키보드 조작과 ARIA 값이 동일한 폭 상태를 반영합니다.
- 목차는 220px로 줄고 텍스트가 잘리지 않으며, 기존 내부 스크롤·고정 높이가 유지됩니다.
- 좁은 화면에 분할선이 침투하지 않고 기존 학습 흐름이 유지됩니다.
- 업데이트 내역에서 이번 개선이 확인됩니다.

## 6. 구현·검증 결과

- 구현 완료: 목차 폭을 220px로 줄이고, 설명 48%·실습 52%를 기본값으로 하는 16px 분할선을 추가했습니다.
- 데스크톱 브라우저(1280×900): 분할선에 `↔` 단서와 `col-resize` 커서가 표시되며, 드래그 후 설명 622px·분할선 16px·실습 422px로 폭이 반대로 조절되었습니다. 조절 중 선택 방지와 pointer capture도 확인했습니다.
- 키보드: separator 포커스 상태에서 `ArrowLeft/Right`가 4%씩 이동하고 `Home`은 30%, `End`는 70%로 이동했습니다. 좌우 끝을 넘는 포인터 드래그도 각각 30%·70%에서 clamp되었습니다.
- 반응형: 375×812 및 320×800에서 분할선은 숨겨지고 workspace는 세로 흐름으로 유지되며, body/document 가로 `scrollWidth`가 `clientWidth`와 같았습니다. 768px·900px에서도 숨김, 901px에서만 데스크톱 분할선을 확인했습니다.
- 콘솔: 로컬 브라우저 오류 로그 0건.
- 자동 검사: `npm test -- --run` 7개 파일·38개 통과, `npm run typecheck`, `npm run lint`, `npm run build`, `git diff --check` 통과 (빌드의 기존 chunk 크기 안내만 출력). 포인터 down/move/up, 30–70% clamp, pointer capture 정리 회귀 테스트도 포함했습니다.
- 공개 결과: [GitHub Pages](https://wbmaker2.github.io/python-bite-class/)에 v0.2.2.0이 배포되었습니다. PR #1 병합 커밋은 `e6babe4`이며 Pages Actions `33848280198`의 build/deploy가 모두 성공했습니다.
