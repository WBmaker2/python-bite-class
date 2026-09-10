# Firebase 제출 데이터·보안 설계

## 문서 구조

`submissions/{submissionId}`에 제출 시점에 필요한 자료를 하나의 Firestore 문서로 저장한다. 제출 ID는 브라우저에서 생성한 UUID이며, 같은 ID로 재시도하면 `exists=false` 조건으로 이미 접수된 제출을 덮어쓰지 않는다.

```text
submissions/{submissionId}
  schemaVersion: 1
  studentUid: string
  profileId: string
  school: string
  name: string
  curriculumVersion: string
  submittedAt: server timestamp
  requiredLessonCount: number
  completedRequiredCount: number
  progress: [{ lessonId, title, completion, status, submittedCode,
               lastExecutedCode, lastRunStatus, lastRunAt,
               lastSuccessCode, lastSuccessAt, outputSummary }]
```

코드와 출력 요약에는 길이 제한을 적용하고, `submittedAt`은 클라이언트 값이 아닌 Firestore 서버 시각을 사용한다. 브라우저가 표시하는 성공 여부는 서버 채점 결과가 아니며 제출 당시 학생 브라우저의 실행 기록임을 관리자 화면에 표시한다.

## 권한 경계

- 로그인·진도·코드 입력과 실행은 localStorage에만 기록한다.
- 학생 익명 인증은 제출 버튼을 누른 뒤에만 시작한다.
- 익명 사용자는 자기 UID와 일치하는 새 제출 문서만 만들 수 있다. 읽기·수정·삭제·전체 목록은 거부한다.
- 교사 Firebase Auth는 별도 앱 인스턴스에서 Google 제공자로 로그인한다. 이메일이 `wbmaker01@gmail.com`이고 provider가 Google인 토큰만 교사 화면에서 사용한다.
- Firestore Rules는 교사 이메일을 규칙에서 직접 확인하고, 학생이 입력한 `role`·`isTeacher` 필드는 권한에 사용하지 않는다.

## 네트워크·재시도

제출 함수에만 REST `documents:commit`을 호출한다. 문서 생성 write에 `exists=false` precondition을 설정하여 같은 제출 ID 재시도를 중복 저장하지 않는다. 네트워크 실패 시 localStorage 자료는 유지하고 접수 성공으로 표시하지 않는다.
