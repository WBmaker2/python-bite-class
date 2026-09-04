# 패널 높이·내부 스크롤 UX 검증 보고서

- mode: `full` (이번 사이클은 레이아웃 회귀에 집중)
- target: `파이썬 한입 교실` 데스크톱 학습 화면
- date: 2026-09-04
- public result: [GitHub Pages](https://wbmaker2.github.io/python-bite-class/) (이번 사이클은 배포하지 않아 현재 공개본은 이전 릴리스)
- Stage 0 status: `ready`
- route=design-system
- observed-statuses=ui-ux-pro-max:filesystem-only, design-system:runtime-available, impeccable:runtime-available, product-design:audit:runtime-available, design-review:runtime-available, qa:runtime-available, built-in:built-in
- action=continue
- fallback-reason=앞선 후보가 현재 턴에 runtime-available이 아니어서 첫 fallback을 선택했습니다.

## 기준선과 수정 후

기존 공개 화면을 1280×900에서 확인했을 때 viewport 높이는 886px인데 `.app-shell`은 1217px, `.main-grid`는 1139px까지 늘어났습니다. 목차는 `scrollHeight`와 `clientHeight`가 같아 독립 스크롤이 되지 않았고, 설명 pane만 내부 스크롤되는 상태였습니다.

수정 후 로컬 화면에서는 다음을 확인했습니다.

| viewport | 문서 높이 | 목차 | 설명 pane | 실습 pane | 가로 넘침 |
| --- | --- | --- | --- | --- | --- |
| 1280×900 | body/document 900px로 고정 | 818 > 636 내부 스크롤 | 1392 > 822 내부 스크롤 | 822px 기준 높이 유지 | 없음 |
| 1024×768 | body/document 768px로 고정 | 831 > 504 내부 스크롤 | 1721 > 690 내부 스크롤 | 690px 기준 높이 유지 | 없음 |
| 901×768 | body/document 768px로 고정 | 데스크톱 내부 스크롤 규칙 | 데스크톱 내부 스크롤 규칙 | 같은 행 높이 | 없음 |
| 375×812 | 자동 높이, 기존 탭 흐름 | 기존 모바일 흐름 | 페이지 읽기 유지 | 탭 전환 시 표시 | 없음 |
| 320×800 | 자동 높이, 기존 탭 흐름 | 기존 모바일 흐름 | 페이지 읽기 유지 | 탭 전환 시 표시 | 없음 |

## 변경 파일

- `src/styles/layout.css`: 901px 이상 viewport 높이 계약, grid/flex `min-height: 0`, pane 내부 스크롤, `overscroll-behavior: contain`, 안정적인 스크롤바 폭
- `src/styles/responsive.css`: 900px 이하 자동 높이·페이지 스크롤 복원, 기존 모바일 탭/세로 배치 보존
- `src/content/updateHistory.ts`: 2026-09-04 개선 내역 추가
- `work/layout-scroll-plan-2026-09-04.md`: 구현 전 계획과 완료 증거 기록

## 판정 및 장부

- layout P1: **해결** — 문서가 콘텐츠 길이에 따라 늘어나던 문제를 viewport 계약과 내부 스크롤로 수정했습니다.
- layout P2: **해결** — 901–1100px에서 세 열 폭과 스크롤바로 인한 가로 넘침을 확인하고 방지했습니다.
- P0/P3: 이번 변경에서 관찰되지 않음
- language audit: **not run** — 학습 문구를 변경하지 않았습니다.
- simulation decision-test ledger: `not-needed` — Python 실행 모델과 과제 판정은 변경하지 않았습니다.
- image decision: 새 이미지가 필요하지 않은 레이아웃 수정이라 생성·삽입하지 않았습니다.
- VoiceOver: 계획대로 제외
- baseline/final full-course score: 이번 사이클에서는 레이아웃 회귀만 측정하여 재채점하지 않음
- gate result: **레이아웃 회귀 pass**; 전체 과정 수용 게이트는 변경 범위 밖 항목을 재실행하지 않아 별도 판정하지 않음

## 자동 검사

- `npm test -- --run`: 7개 파일, 36개 테스트 통과
- `npm run typecheck`: 통과
- `npm run lint`: 통과
- `npm run build`: 통과
- `git diff --check`: 통과

## 브라우저·페르소나 증거

- 브라우저: Codex in-app browser의 로컬 Vite 화면에서 DOM 높이·스크롤·가로 폭을 `playwright.evaluate`로 측정했습니다. 1280×900 실습 단계에서 목차를 끝으로 이동하면 `nav.scrollTop=182`, 설명을 끝으로 이동하면 `lesson.scrollTop=570`으로 바뀌고 `documentElement.scrollTop=0`, body/document `scrollHeight=900`이 유지되었습니다.
- 페르소나: 중학교 1학년 입문 학습자 화면을 대신하는 일관된 시뮬레이션 휴리스틱이며 실제 학생 연구 결과가 아닙니다.
- 확인 행동: 긴 단원 화면에서 목차와 설명의 `scrollHeight > clientHeight`, body/document의 viewport 고정, 실습창의 같은 행 높이를 확인했습니다.
- 콘솔: 확인한 화면에서 오류 0건
- 시뮬레이션 결정: `not-needed` (코드 실행은 기존 기능으로 유지)

## 학습자 takeaway와 다음 행동

데스크톱에서는 오른쪽 실습창을 기준 높이로 두고 왼쪽 목차 또는 가운데 설명 위에서만 스크롤하면 됩니다. 900px 이하에서는 화면 폭이 좁으므로 기존처럼 세로로 읽거나 학습/실습 탭을 전환하면 됩니다. 다음 권장 행동은 공개 배포 전에 동일한 viewport 측정을 Pages에서 한 번 더 확인하는 것입니다.

이번 요청에는 커밋·푸시·배포가 포함되지 않았으며, 기존 사용자 변경 파일은 stage·삭제·복원하지 않았습니다.
