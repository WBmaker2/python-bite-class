# 10.6 집합 단계 삭제 계획

- 요청: 중학교 1학년 입문자에게 부담이 되는 10.6 ‘집합’ 단계의 본문, 예제, 도전 과제, 핵심 용어를 교육 과정에서 제거한다.
- 10.5 다음에 기존 10.7 ‘참조’가 이어지도록 단계 ID와 다른 단원의 번호는 변경하지 않는다.
- 집합 전용 용어 매핑과 테스트 기대값을 함께 정리하고, 다른 레슨의 설명은 보존한다.
- 저장된 10.6 완료 기록은 삭제된 레슨 ID가 현재 lessons에 없으므로 진도 계산에서 자동 제외되는지 회귀 테스트로 확인한다.
- 업데이트 내역을 기록하고 전체 테스트, 타입 검사, 린트, 빌드로 검증한다.
- 사용자가 2026. 09. 09에 커밋·푸시·GitHub Pages 배포를 승인했으며, 오늘 `main` 직접 푸시와 기존 Pages workflow 완료까지 진행한다.

## 구현 기록

- `src/content/chapter10.ts`에서 10.6 집합 레슨만 삭제하고, 10.5 다음에 기존 `chapter-10-7` 참조가 오도록 레슨 ID와 다른 순서는 유지한다.
- `src/content/lessonGuides.ts`에서 `10-6` 안내를 삭제한다.
- `src/content/codeGlossary.ts`에서 `chapter-10-6` 전용 매핑을 삭제한다. `add()` 공용 catalog 항목은 다른 레슨 사용 여부를 확인한 뒤, 사용처가 없으면 함께 정리한다.
- `contentQuality.test.ts`, `challengeAudit.test.ts`, `chapters.test.ts`의 삭제 레슨·실행 레슨 수·회귀 기대값을 갱신하고, 저장된 `chapter-10-6` 진도가 완료 수에 포함되지 않는지 확인한다.
- `src/content/updateHistory.ts`에 10.6 삭제 내역을 추가한다.
- fresh 상태에서 `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `git diff --check`를 실행하고, 변경 파일·시크릿을 별도로 검토한다.
- 현재 `main` 기반 direct push 정책과 `.github/workflows/deploy-pages.yml`의 `main` push 트리거를 따른다. PR은 만들지 않는다.

## 구현·검증·release 기록

- 구현: 10.6 집합 레슨·도전·가이드·전용 용어(`add()`)를 삭제하고 10.5 다음에 기존 10.7 참조가 이어지도록 정리했다. 저장된 `chapter-10-6` 완료 기록은 현재 레슨 목록에 포함되지 않아 완료 수에 다시 반영되지 않는다.
- 변경 기록: `updateHistory.ts`에 2026. 09. 09 삭제 내역을 추가했다. 프로젝트 버전 `0.2.4`와 기존 CHANGELOG 정책을 확인한 뒤, 이번 콘텐츠 삭제에 불필요한 대규모 버전 변경은 하지 않는다.
- release: 검증 통과 후 승인된 8개 대상 파일만 커밋하고 `main`에 push한다. push로 `Deploy to GitHub Pages` workflow를 실행하고 build/deploy 완료, remote SHA, Pages URL을 확인한다.
- 공개 검증: 배포 완료 후 메인 에이전트가 ego-browser로 공개 학습 흐름과 10.6 삭제 상태를 확인한다.
