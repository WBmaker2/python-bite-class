# 9.1 수학 함수 안내 보강 계획

상태: 구현 완료·로컬 검증 완료 (커밋·푸시·배포 진행)

## 목표

- 9.1 본문에서 `math.sqrt(x)`를 제곱근 함수로 설명합니다.
- `math.fabs(x)`를 절대값 함수로 설명하고 음수 예시를 보여 줍니다.
- 도전 힌트에서 `math.fabs(-3.5)` 실행을 추천합니다.
- 공식 문서 기준이 콘텐츠에 반영되었는지 회귀 테스트로 고정합니다.

## 구현 범위

- `src/content/chapter9.ts`: 9.1 요약과 도전 힌트
- `src/content/lessonGuides.ts`: 쉬운 설명·예제 코드·용어집
- `src/content/challengeAudit.test.ts`: 함수 설명과 힌트 검증
- `src/content/updateHistory.ts`: 업데이트 내역

## 기준

- `math.sqrt(x)`는 x의 제곱근을 반환합니다.
- `math.fabs(x)`는 x의 절대값을 반환하며 결과는 실수로 표시될 수 있습니다.
- 참고: https://docs.python.org/3/library/math.html

## 검증

콘텐츠 테스트, 전체 테스트, 타입 검사, 린트, 빌드 후 9.1 화면에서 본문과 힌트가 실제로 표시되는지 확인합니다.
