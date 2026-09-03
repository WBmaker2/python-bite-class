# 파이썬 한입 교실 전체 콘텐츠 보강 결과

작성일: 2026-09-03
대상: 중학교 1학년 파이썬 입문자

## 변경 내용

- `src/content/types.ts`: 도전 과제에 `steps`, `successCriteria`, `commonMistakes` 선택 필드를 추가했습니다.
- `src/content/lessonGuides.ts`: `LessonGuide.exampleCode`를 추가하고, 코드에 처음 등장하는 보조 함수·메서드·표현식도 쉬운 정의와 예제로 연결했습니다.
- `src/content/lessonFactory.ts`: 2~11단원 실행·도전 단계에 예제 코드, 예상·실행·관찰 안내를 자동 보강하고 도전 기본 안내를 안전하게 채웠습니다.
- `src/features/learn/LessonContent.tsx`: 한국어 라벨과 도전 안내 세 영역을 표시합니다.
- `src/features/playground/PlaygroundPanel.tsx`, `src/styles/components.css`: 한국어 실습 라벨과 예제·도전 안내 레이아웃을 유지합니다.
- `src/content/contentQuality.test.ts`, `src/content/challengeAudit.test.ts`: 예제/관찰과 도전 안내 계약을 자동 검사합니다.
- `src/content/updateHistory.ts`: 2026-09-03 콘텐츠 보강 내역을 추가했습니다.
- `src/content/chapter2.ts`~`src/content/chapter11.ts`: 도전 문구를 두 문장 이상으로 확장해 정확한 변수·수정 위치·실행 후 관찰 결과를 안내합니다.
- 코드 토큰 전수 대조: `round()`, `type(...).__name__`, `float`, `bool`, `tuple`, `*numbers`, `len()`, `sum()`, `**`, `int()`, `items()`, `add()`, `stock.get()`, 리스트 컴프리헨션·조건식을 최초 등장 단계의 본문·용어집·예제로 보강했습니다. 앞 단원에서 이미 설명한 `print`, `range`, `type`, `append`, `upper`, `return`, `math.sqrt`, `math.fabs`, `dir`은 중복을 피했습니다.
- 추가 첫 등장 대조: 변수·할당(`=`), 리스트·`for ... in`, `if`·`True`, `+=`·`-=`, `>=`·`<=`·`==`, `pi`·원주율도 처음 코드가 나타나는 단계에 쉬운 풀이와 실행 예제를 연결했습니다.
- `src/styles/layout.css`, `src/styles/responsive.css`, `src/styles/tokens.css`: 320px 폭에서 긴 용어·코드가 레이아웃을 밀어내지 않도록 최소 폭과 줄바꿈을 정리했습니다.
- `work/elementary-webapp-ux-audit-2026-09-03.md`: 중학생 관점의 기준선·우선 이슈·검증 계약을 기록했습니다.
- 용어와 예시의 사실성은 [Python 공식 튜토리얼](https://docs.python.org/3/tutorial/), [제어 흐름](https://docs.python.org/3/tutorial/controlflow.html), [자료 구조](https://docs.python.org/3/tutorial/datastructures.html), [모듈](https://docs.python.org/3/tutorial/modules.html), [round() 내장 함수 문서](https://docs.python.org/3/library/functions.html#round)를 교차 확인했습니다.

## 검증 결과

- `npm test -- --run`: 통과, 7개 파일 / 36개 테스트
- `npm run typecheck`: 통과
- `npm run lint`: 통과
- `npm run build`: 통과
- `git diff --check`: 통과

### 실제 브라우저 확인

- 로컬 Vite 학습 화면에서 2.2, 2.3, 5.4, 6.2, 7.3, 8.7, 9.1, 10.4, 11.8을 순서대로 열었습니다.
- 각 실행 단계에 `예제`, `예상 → 실행 → 관찰`, `도전 순서 → 통과 기준 → 막힐 때`가 표시되는 것을 확인했습니다.
- 2.3에서 `자동화` 항목을 추가하고 6.2에서 `+=` 숫자를 바꿔 실행했을 때 출력과 도전 통과 피드백, 완료 버튼 활성화를 확인했습니다.
- 9.1에서 `math.fabs(-3.5)`를 실행해 두 번째 출력 `3.5`와 통과 피드백을 확인했습니다.
- 9.2에서 `from math import pi`의 `round(pi, 2)`를 먼저 실행해 `3.14`를 확인한 뒤, `round(pi, 3)`으로 바꾸어 `3.142`와 도전 통과·완료 버튼 활성화를 확인했습니다.
- 5.6, 8.6, 11.8을 실제 화면에서 열어 `.__name__`·`float`·`bool`, `tuple`·`*numbers`·`len()`·`sum()`, 리스트 컴프리헨션·조건식의 설명·용어집·예제가 표시되는 것을 확인했습니다.
- 진도를 비운 cold start에서 1.1의 완료 버튼이 활성화되고, 완료 후 `다음 학습 →`으로 1.2가 열리는 것을 확인했습니다.
- 320×800, 375×812, 768×900, 1280×900에서 `scrollWidth === clientWidth`였고, 콘솔 오류·실패 요청은 없었습니다. 새로 늘어난 11.8 최종 프로젝트 설명도 320px에서 가로 넘침이 없었습니다.
- Stage 0 preflight는 `route=design-system`, `status=ready`로 재실행했습니다.

빌드에서 번들 500kB 초과 경고가 남지만 기존 의존성 번들 크기 경고이며 이번 콘텐츠 변경으로 새 의존성은 추가하지 않았습니다.

## 미확인

이번 작업에서는 커밋·푸시·배포와 공개 주소의 새 버전 수동 검증을 실행하지 않았습니다. 실제 학생의 장시간 학습 관찰이나 교사 검토도 포함하지 않았습니다. 배포를 요청하시면 공개 URL에서 동일한 대표 흐름과 좁은 화면을 다시 확인해야 합니다.
