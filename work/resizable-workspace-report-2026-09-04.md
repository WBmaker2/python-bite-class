# 설명·실습 패널 가로 조절 UX 검증 보고서

- date: 2026-09-04
- target: `파이썬 한입 교실` 데스크톱 학습 화면
- public result: [GitHub Pages](https://wbmaker2.github.io/python-bite-class/) (이번 요청에서는 배포하지 않아 이전 릴리스)
- Stage 0 status: `ready`
- route=design-system
- observed-statuses=ui-ux-pro-max:filesystem-only, design-system:runtime-available, impeccable:runtime-available, product-design:audit:runtime-available, design-review:runtime-available, qa:runtime-available, built-in:built-in
- action=continue
- fallback-reason=앞선 후보가 현재 턴에 runtime-available이 아니어서 첫 fallback을 선택했습니다.

## 요청 범위

왼쪽 목차를 250px에서 220px로 줄이고, 가운데 설명과 오른쪽 코드 실습 사이에 사용자가 폭을 조절할 수 있는 경계선을 추가했습니다. 데스크톱에서는 드래그와 키보드 조작을 제공하고, 900px 이하에서는 기존 모바일·태블릿 흐름을 보존했습니다.

## 구현 결과

- `LessonWorkspace`에 48% 설명·52% 실습 기본 비율, 30–70% clamp, pointer capture 기반 드래그를 넣었습니다.
- 경계선은 `role="separator"`, 세로 방향, 현재 비율을 나타내는 ARIA 속성, 설명·실습 pane 연결 정보를 제공합니다.
- hover/focus/drag 상태에서 `↔` 단서와 `col-resize` 커서를 보여 줍니다.
- `ArrowLeft/Right`는 4%씩 이동하고 `Home/End`는 최소·최대 폭으로 이동합니다.
- 드래그 중에는 문서 선택을 막고, 컴포넌트 해제 시 전역 resizing 상태를 정리합니다.
- 업데이트 내역에 2026-09-04 개선 기록을 추가했습니다.

## 브라우저 증거

Codex in-app browser의 로컬 Vite 화면에서 실제 DOM·스타일·접근성 값을 확인했습니다.

| 확인 화면 | 관찰 결과 |
| --- | --- |
| 1280×900 초기 | 목차 220px, 설명 501.117px, 분할선 16px, 실습 542.883px |
| 1280×900 드래그 | 포인터를 오른쪽으로 이동하자 설명 622px·실습 422px로 함께 반대 방향 조절, `aria-valuenow` 약 59.6 |
| 1280×900 키보드 | `ArrowLeft` 4% 감소, `Home` 30%, `End` 70%, separator 포커스 유지 |
| 1280×900 끝점 | 왼쪽·오른쪽 바깥으로 드래그해도 각각 30%·70%에서 멈춤 |
| 901×900 | 데스크톱 분할선 표시, 가로 넘침 없음 |
| 900×900·768×900 | 분할선 숨김, 한 열 흐름, 가로 넘침 없음 |
| 375×812·320×800 | 분할선 숨김, 모바일 탭 흐름 유지, `scrollWidth === clientWidth` |

hover 상태에서 분할선의 강조 pseudo-element와 화살표 opacity가 1이 되고, 커서가 `col-resize`로 바뀌는 것도 확인했습니다. 브라우저 오류 로그는 0건입니다.

## 수용 게이트 판정

- layout P1: **해결** — 설명·실습 경계선을 발견하고 드래그하여 폭을 바꿀 수 있습니다.
- layout P2: **해결** — 목차 220px, 901px 이상 3열, 900px 이하 기존 반응형 흐름이 유지됩니다.
- accessibility P1: **해결** — separator 이름·방향·범위·현재값·조절 대상과 키보드 대체 조작을 제공합니다.
- responsive P1: **해결** — 320/375px에서 분할선을 숨기고 가로 overflow가 없습니다.
- language audit: **not run** — 이번 변경은 레이아웃·조작 단서만 수정했습니다.
- simulation decision-test ledger: `not-needed` — Python 실행기와 과제 판정은 변경하지 않았습니다.
- image decision: 새 이미지가 필요하지 않은 레이아웃 수정이라 생성·삽입하지 않았습니다.
- VoiceOver: 계획대로 제외했습니다.
- baseline/final full-course score: 전체 과정 점수는 재채점하지 않고 레이아웃 회귀만 판정했습니다.

## 자동 검사

- `npm test -- --run`: 7개 파일, 38개 테스트 통과 (키보드 조절과 포인터 드래그·clamp·정리 회귀 포함)
- `npm run typecheck`: 통과
- `npm run lint`: 통과
- `npm run build`: 통과 (Vite의 기존 chunk 크기 안내만 출력)
- `git diff --check`: 통과

## 학습자 안내

데스크톱에서 설명이 너무 좁거나 코드 실습이 작게 느껴지면 가운데 세로 경계선에 마우스를 올려 `↔` 표시를 확인한 뒤 좌우로 드래그하면 됩니다. 키보드만 사용할 때는 경계선을 Tab으로 선택하고 방향키를 누르며, `Home`과 `End`로 빠르게 끝 폭으로 이동할 수 있습니다. 900px 이하에서는 화면이 좁아 분할선을 숨기고 기존 세로·탭 방식으로 읽습니다.

이번 요청에는 커밋·푸시·배포가 포함되지 않았으며, 기존 사용자 작업 파일은 stage·삭제·복원하지 않았습니다.
