# Firebase 설정 작업 기록

작성일: 2026-09-10

## 현재 상태

- 구현 계획: `work/firebase-submission-implementation-plan-2026-09-10.md` 확인 완료
- 지정 계정 확인 전 상태: 최초 Firebase Console 화면은 `ketarou85@gmail.com`으로 로그인되어 있었음
- 생성한 ego-browser TaskSpace: `14` (최초 생성 후 즉시 ID 보고)
- 사용자 계정 전환을 위해 TaskSpace 14를 handoff했으나, 사용자 확인 이후 `takeOverTaskSpace(14)`와 `taskSpace(14)` 모두 `task space not found`를 반환함
- 현재 `listTaskSpaces()` 결과는 빈 목록이며 새 TaskSpace는 생성하지 않음

## 다음 작업

루트 에이전트의 활성 ego-browser TaskSpace에서 `wbmaker01@gmail.com` 계정을 확인한 뒤, Firebase 프로젝트 생성 및 웹 앱/Auth/Firestore 설정을 이어서 기록한다. 서비스 계정 키나 OAuth 토큰은 저장하거나 출력하지 않는다.

## 사전 확인 메모

- Firebase 공식 웹 설정 문서 기준으로 프로젝트 생성 시 프로젝트 ID를 생성 전에 직접 편집할 수 있으며 Google Analytics는 선택 항목이다. 이번 설정에서는 Analytics를 활성화하지 않는다.
- Firestore regional location `asia-northeast3`는 Seoul이다.
- 신규 Firebase 프로젝트에서는 `localhost`가 Auth 승인 도메인 기본값에 포함되지 않을 수 있으므로 콘솔에서 `localhost`와 `wbmaker2.github.io`를 직접 확인·추가한다.
- 구현 코드가 기대하는 공개 웹 설정 키는 `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`이다.

참고한 공식 문서: [웹 앱에 Firebase 추가](https://firebase.google.com/docs/web/setup), [Cloud Firestore 위치](https://firebase.google.com/docs/firestore/locations), [웹 Google 로그인](https://firebase.google.com/docs/auth/web/google-signin), [웹 익명 인증](https://firebase.google.com/docs/auth/web/anonymous-auth), [Authentication FAQ](https://firebase.google.com/docs/auth/faq-and-troubleshooting).

## 로컬 에뮬레이터 런타임 점검

- 시스템 Java와 `/usr/libexec/java_home -V` 모두 설치된 JDK가 없음을 확인했다.
- 시스템과 저장소를 변경하지 않기 위해 Temurin JDK 21.0.12.1을 `/private/tmp/firebase-jdk21/jdk-21.0.12.1+1/Contents/Home`에 임시 설치했다.
- `firebase-tools`는 PATH에 없지만 `/private/tmp/firebase-tools-cache`를 npm 캐시로 지정한 `npx --yes --package firebase-tools@15.30.0 firebase`로 CLI `15.30.0`을 실행할 수 있다.
- 에뮬레이터 명령 확인:

  ```bash
  JAVA_HOME=/private/tmp/firebase-jdk21/jdk-21.0.12.1+1/Contents/Home \
  PATH=/private/tmp/firebase-jdk21/jdk-21.0.12.1+1/Contents/Home/bin:$PATH \
  npm_config_cache=/private/tmp/firebase-tools-cache \
  FIREBASE_CLI_DISABLE_UPDATE_CHECK=1 \
  npx --yes --package firebase-tools@15.30.0 firebase emulators:start --only firestore,auth
  ```

- CLI가 실행 후 사용자 설정 디렉터리(`/Users/kimhongnyeon/.config`) 업데이트 확인 권한 오류를 출력하지만, 버전과 `emulators:start --help` 본문은 정상 실행됐다.

## Firestore Rules 테스트 하네스

- `tests/firestore.rules.test.mjs`를 추가했다. 비인증·익명 소유자·타인 읽기/목록·수정/삭제·교사 이메일/인증/제공자 위조·역할 위조·서버 시각·루트 스키마·진도 합계·자료 크기와 단계 형식을 검증한다.
- 테스트는 기본적으로 저장소 `node_modules`를 사용하며, 아직 규칙 테스트 패키지를 설치하지 않은 환경에서는 `FIREBASE_RULES_TEST_NODE_MODULES=/private/tmp/firebase-rules-test/node_modules`로 임시 모듈 루트를 지정한다.
- `@firebase/rules-unit-testing`과 Firebase SDK를 `/private/tmp/firebase-rules-test`에 설치하고 Firestore Emulator Standard 모드에서 실행했다.
- 최신 `progressJson` 규칙 반영 후 결과: 12개 모두 통과. `completedRequiredCount` 정수·범위, `progressJson` 480,000자 허용 및 480,001자 거부 경계, 루트 형식·서버 시각과 권한 경계를 확인했다.
- 에뮬레이터 JAR/UI 캐시는 `FIREBASE_EMULATORS_PATH=/private/tmp/firebase-emulators-cache`로 지정해야 샌드박스에서 쓸 수 있다.
- REST 검증을 추가한 뒤 총 13개 테스트가 모두 통과했다. Firestore `documents:commit`의 `REQUEST_TIME`이 저장된 `submittedAt`과 1초 이내로 일치하고, 동일 ID에 `currentDocument.exists=false`로 재시도하면 실제 HTTP `409`가 반환됨을 확인했다. 이 상태는 클라이언트의 중복 재시도 분기와 일치한다.

## Firebase CLI 계정 확인

- `firebase login:list`에서 지정 계정이 캐시된 Other available account로 보였지만 현재 활성 계정은 다른 계정이었다.
- 활성 계정을 바꾸지 않고 `firebase projects:list --account wbmaker01@gmail.com`을 실행했으며, 해당 계정의 자격 증명이 만료되어 `firebase login --reauth`가 필요하다는 인증 오류를 확인했다.
- 재로그인·재인증·토큰 출력은 수행하지 않았다.

## 실제 Firebase 프로젝트 구성 완료

- 새 ego-browser TaskSpace `19`에서 `wbmaker01@gmail.com` 계정을 확인한 뒤 구성했다. 기존 TaskSpace `14`는 복구하지 않았고 새 공간은 이번 작업에서 `19` 하나만 사용했다.
- Firebase 프로젝트: `python-bite-class-wbmaker01`
- 프로젝트 번호: `744865576382`
- 요금제: Spark 무료($0/월). 결제 계정은 연결하지 않았다.
- 프로젝트 생성 단계의 Firebase Gemini 및 Google Analytics는 사용 설정하지 않았다.
- Cloud Firestore 기본 데이터베이스 `(default)`: Standard 버전, `asia-northeast3`(Seoul), 프로덕션 모드 잠금 규칙으로 생성했다.
- Firebase Authentication: 익명 및 Google 제공자를 사용 설정했다. Google 지원 이메일은 `wbmaker01@gmail.com`으로 설정했다.
- Authentication 승인 도메인: 기본 `localhost`, 기본 `python-bite-class-wbmaker01.firebaseapp.com`, 기본 `python-bite-class-wbmaker01.web.app`, 추가 `wbmaker2.github.io`.
- 웹 앱: 닉네임 `python-bite-class-web`, 앱 ID `1:744865576382:web:fdd10a0c565516899375ef`.
- 공개 웹 설정은 저장소의 무시 대상 파일 `.env.local`에 기록했다. 서비스 계정 키와 OAuth 토큰은 저장하거나 출력하지 않았다.
- Firebase Console 프로젝트 URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/overview
- Firebase Console Firestore URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/firestore/databases/-default-/data
- Firebase Console Authentication URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/authentication/providers
- Firebase Console 승인 도메인 URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/authentication/settings
- Firebase Console 프로젝트 설정/웹 앱 URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/settings/general

### Rules 배포 완료

- 로컬 에뮬레이터에서 13개 규칙/REST 테스트를 통과한 `firestore.rules`와 동일한 내용을 Firebase Console 규칙 편집기에 게시했다.
- 게시 후 콘솔에는 미게시 변경사항이 남지 않았고, 최신 규칙 본문에 `teacher`, `validSubmission`, 익명 create, 교사 list/get, update/delete 거부가 표시되는 것을 확인했다.
- Firestore 규칙 URL: https://console.firebase.google.com/u/1/project/python-bite-class-wbmaker01/firestore/databases/-default-/security/rules

## 로컬 앱 QA 및 남은 프로덕션 현상

- TaskSpace 19의 p2(`http://localhost:5173/`)를 새로고침한 뒤 `Firebase QA 학교 · 김QA학생` 프로필을 저장했다.
- 실제 제출 전송은 세 차례 확인했다: 최초 제출, 실패한 pending 제출 재시도, pending 폐기 후 현재 내용으로 새 제출. 세 번 모두 production Firestore REST `documents:commit`에서 HTTP 403 `PERMISSION_DENIED`가 반환되었다. 동일 실패를 반복하지 않고 추가 production 재시도는 중단했다.
- 실패 요청의 인증 provider는 익명이고, 실제 payload는 `requiredLessonCount=57`, `completedRequiredCount=0`, progress 62행, `progressJson` 19,872자였다. 토큰이나 인증 비밀값은 이 문서에 기록하지 않는다.
- 동일 QA payload를 로컬 Firestore Rules Emulator에 넣은 결과는 통과했다. 저장 후 문서가 존재하고 예상된 루트 필드 10개와 `progressJson` 19,872자를 확인했다.
- Firebase Console에서 게시된 Rules 본문과 저장소 `firestore.rules`를 대조했으며 미게시 변경사항은 없다. 따라서 현재 남은 문제는 데이터 형식이나 로컬 Rules Emulator가 아니라 production REST commit의 403 현상으로, 규칙 완화 없이 별도 원인 분석이 필요하다.

### 재진단 및 active Rules 릴리스 확인

- 위 기록의 “Rules 배포 완료” 판단은 편집기 본문을 확인한 결과였고 active release 확인이 아니었다. 새 진단에서 p1에 `게시되지 않은 변경사항`과 `게시` 버튼이 실제로 남아 있음을 확인했다.
- 실제 요청 조건 비교 결과: REST project/database `(default)` 일치, ID token issuer 일치, audience 일치, `anonymous` provider 일치, token UID와 제출 `studentUid` 일치, App Check 헤더 없음, 루트 필드 allowlist 일치, `REQUEST_TIME` transform 사용, `currentDocument.exists=false` 모두 참이었다. 토큰 원문은 출력하거나 저장하지 않았다.
- production 403을 확인한 뒤 현재 검토된 `firestore.rules`를 Console에서 1회 게시했다. 새 active 릴리스가 `2026-09-10 22:22 KST`에 생성되었고, 페이지 새로고침 후 규칙 본문이 유지되며 미게시 변경사항이 0건임을 확인했다.
- 전파 대기 15초 후 동일 pending 제출을 진단 목적 1회 재검증했다. HTTP 200으로 저장되었고 p2에 접수 ID `50e66de1-8b1b-471b-8833-d2a2cb0eb488`, 서버 시각 `2026. 9. 10. 오후 10:25:25`가 표시되었다.
- 결론: 기존 403의 원인은 편집 초안과 active release의 혼동이었다. 규칙 완화나 서비스 계정 생성 없이 검토 Rules를 active release에 게시한 것이 최소 변경이었다.
- 교사 관리자 Google 인증은 `wbmaker01@gmail.com`이 선택된 동의 화면까지 도달했다. Google `계속`은 사용자 전용 동의 단계이므로 TaskSpace 19를 handoff했으며, 동의 완료 후 교사 제출 조회를 이어갈 수 있다.

### 교사 인증 및 실제 제출 조회 확인

- 사용자가 Google 동의를 완료한 뒤 TaskSpace 19를 재개했다. `wbmaker01@gmail.com` Google 인증이 완료되어 교사 관리자 패널이 열렸다.
- 교사 목록에서 `Firebase QA 학교 · 김QA학생` 1명이 표시되었고 최신 제출은 `0/57 필수 단계`, 서버 시각 `2026. 9. 10. 22:25:25`로 확인했다.
- 상세 화면에서 접수 ID `50e66de1-8b1b-471b-8833-d2a2cb0eb488`와 첫 실행 준비 단계의 제출 코드 `print("첫 실행 성공!")`가 표시되었다. 상세 화면에는 제출 코드와 실행 기록 안내도 함께 표시되었다.
- 교사 관리자 모달을 닫고 p2 로컬 앱 화면을 다음 QA를 위해 남겨 두었다. 별도 소스 수정은 하지 않았다.
