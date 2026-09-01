# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/python-edu-starter`
- Files scanned: `41`
- Candidates: `1012`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| index.html:8:12 | text | 파이썬 한입 교실 | learner-text-candidate | repeated-text |
| src/App.tsx:24:22 | text | { if (window.confirm('저장된 학습 진도와 코드를 모두 지울까요?')) { resetProgress(); setCurrentId(lessons[0].id); } }; return | learner-text-candidate | long-or-dense, technical-or-internal |
| src/App.tsx:24:45 | text | 저장된 학습 진도와 코드를 모두 지울까요? | learner-text-candidate | — |
| src/components/AppHeader.tsx:5:124 | text | 중학생을 위한 코딩 실험실 | heading | — |
| src/components/AppHeader.tsx:5:146 | text | 파이썬 한입 교실 | heading | repeated-text |
| src/components/AppHeader.tsx:6:68 | text | CH {chapter} | button-or-action | technical-or-internal |
| src/components/AppHeader.tsx:6:93 | text | {completedCount}/{total} 학습 완료 | button-or-action | — |
| src/components/AppHeader.tsx:6:238 | text | chapter-navigation | button-or-action | repeated-text |
| src/components/AppHeader.tsx:6:275 | text | 목차 | button-or-action | — |
| src/components/AppHeader.tsx:6:338 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:12:58 | text | chapter-navigation | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:12:169 | text | mobile-menu-button | button-or-action | — |
| src/components/ChapterNav.tsx:14:69 | text | { const next = new Set(current); if (next.has(number)) next.delete(number); else next.add(number); return next; }); return | learner-text-candidate | long-or-dense |
| src/components/ChapterNav.tsx:15:104 | aria-label | 학습 목차 | aria-label | repeated-text |
| src/components/ChapterNav.tsx:16:62 | text | COURSE MAP | heading, button-or-action | technical-or-internal |
| src/components/ChapterNav.tsx:16:80 | text | 학습 목차 | heading, button-or-action | repeated-text |
| src/components/ChapterNav.tsx:16:152 | aria-label | 목차 닫기 | aria-label, heading, button-or-action | — |
| src/components/ChapterNav.tsx:18:309 | text | {chapterProgress === chapter.lessons.length ? '✓' : chapter.number} | button-or-action | long-or-dense |
| src/components/ChapterNav.tsx:18:426 | text | {chapter.number}. {chapter.title} | button-or-action | — |
| src/components/ChapterNav.tsx:18:475 | text | {chapterProgress}/{chapter.lessons.length} 단계 | button-or-action | — |
| src/components/ChapterNav.tsx:18:578 | text | true | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:18:584 | text | {expanded.has(chapter.number) ? '⌃' : '⌄'} | button-or-action | — |
| src/components/ChapterNav.tsx:18:642 | text | {expanded.has(chapter.number) && | button-or-action | — |
| src/components/ChapterNav.tsx:19:145 | text | item.id === lesson.id); const unlocked = isLessonUnlocked(index, completed); const done = completed.has(lesson.id); return | button-or-action | long-or-dense, technical-or-internal |
| src/components/ChapterNav.tsx:19:440 | text | step | button-or-action | — |
| src/components/ChapterNav.tsx:19:615 | text | {done ? '✓' : unlocked ? `${chapter.number}.${lesson.order}` : '•'} | button-or-action | long-or-dense |
| src/components/ChapterNav.tsx:19:641 | text | ${chapter.number}.${lesson.order} | button-or-action | — |
| src/components/ChapterNav.tsx:19:733 | text | {done ? '완료했어요' : lesson.completion === 'read' ? '읽기 단계' : lesson.completion === 'run' ? '실행 단계' : '도전 단계'} | button-or-action | long-or-dense |
| src/components/ChapterNav.tsx:19:742 | text | 완료했어요 | button-or-action | — |
| src/components/ChapterNav.tsx:19:774 | text | read | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:19:783 | text | 읽기 단계 | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:19:815 | text | run | button-or-action | repeated-text |
| src/components/ChapterNav.tsx:19:823 | text | 실행 단계 | button-or-action | — |
| src/components/ChapterNav.tsx:19:833 | text | 도전 단계 | button-or-action | — |
| src/components/ChapterNav.tsx:21:76 | text | 전체 진도 | button-or-action | — |
| src/components/ChapterNav.tsx:21:96 | text | {completed.size}/{lessons.length} | button-or-action | — |
| src/components/ChapterNav.tsx:21:203 | text | scaleX(${completed.size / lessons.length}) | button-or-action | — |
| src/components/ChapterNav.tsx:21:307 | text | 진도 초기화 | button-or-action | — |
| src/components/ChapterNav.tsx:21:398 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:4:66 | text | void }) { const closeButton = useRef | learner-text-candidate | technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:10:17 | text | document.removeEventListener('keydown', handleKeyDown); }, [onClose]); return | heading, button-or-action | long-or-dense |
| src/components/UpdateHistoryDialog.tsx:12:142 | text | true | heading, button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:165 | text | updates-title | heading, button-or-action | — |
| src/components/UpdateHistoryDialog.tsx:12:284 | text | CHANGELOG | heading, button-or-action | technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:12:320 | text | 업데이트 내역 | heading, button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:400 | aria-label | 업데이트 내역 닫기 | aria-label, heading, button-or-action | — |
| src/components/UpdateHistoryDialog.tsx:12:684 | text | 교재와 출처 | heading, button-or-action | — |
| src/components/UpdateHistoryDialog.tsx:12:698 | text | 학습 내용은 원문을 중학생 눈높이에 맞게 다시 쓰고, 코드 예시는 교육 목적에 맞게 구성했습니다. | heading, button-or-action | abstract-or-formal |
| src/components/UpdateHistoryDialog.tsx:12:829 | text | _blank | heading, button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:842 | text | noreferrer | heading, button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:887 | text | true | heading, button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:935 | text | A Byte of Python의 원저작자·번역자 및 CC BY-SA 4.0 조건을 존중합니다. 이 앱은 개인정보를 받지 않으며 코드가 브라우저 밖으로 전송되지 않습니다. | heading, button-or-action | long-or-dense, technical-or-internal |
| src/content/challengeAudit.test.ts:29:23 | text | chapter-6-3 | feedback-or-error | — |
| src/content/challengeAudit.test.ts:29:56 | text | equals | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:29:89 | text | 괄호로 계산 순서를 바꿨어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:31:23 | text | chapter-7-6 | feedback-or-error | — |
| src/content/challengeAudit.test.ts:31:56 | text | equals | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:31:122 | text | 조건과 반복으로 여러 값을 골랐어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:33:16 | text | contains | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:33:35 | text | 숫자 개수: 4 | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:33:57 | text | 숫자를 하나 더 넣었어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:34:16 | text | changed | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:34:48 | text | 추가한 숫자까지 합계를 확인했어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:37:23 | text | chapter-10-6 | feedback-or-error | — |
| src/content/challengeAudit.test.ts:37:57 | text | equals | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:37:74 | text | 3 True | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:37:95 | text | 새 태그를 추가해 집합의 크기가 늘었어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:43:44 | text | 시원해요 | learner-text-candidate | — |
| src/content/challengeAudit.test.ts:44:23 | text | chapter-7-1 | feedback-or-error | — |
| src/content/challengeAudit.test.ts:44:56 | text | changed | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:44:88 | text | if와 else 조건에 따라 다른 메시지를 확인했어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:50:46 | text | 수학 90 과학 85 | learner-text-candidate | repeated-text |
| src/content/challengeAudit.test.ts:54:23 | text | chapter-11-3 | feedback-or-error | — |
| src/content/challengeAudit.test.ts:54:57 | text | appended | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:54:90 | text | 새 물건의 재고와 필요한 양을 비교했어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:56:16 | text | contains | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:56:35 | text | 테이프 | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:56:52 | text | 테이프 부족 결과를 확인했어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:57:16 | text | changed | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:57:48 | text | 함수가 여러 준비물의 부족 여부를 확인했어요. | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:59:23 | text | chapter-11-5 | feedback-or-error, instruction | — |
| src/content/challengeAudit.test.ts:59:57 | text | appended | feedback-or-error, instruction | repeated-text |
| src/content/challengeAudit.test.ts:59:90 | text | 준비가 끝난 물건 안내도 추가했어요. | feedback-or-error, instruction | repeated-text |
| src/content/challengeAudit.test.ts:64:55 | text | 준비 필요 결과가 달라지도록 | learner-text-candidate | — |
| src/content/challengeAudit.test.ts:65:62 | text | changed | feedback-or-error | repeated-text |
| src/content/challengeAudit.test.ts:65:94 | text | 나의 준비물과 수량으로 프로젝트 결과를 바꿨어요. | feedback-or-error | repeated-text |
| src/content/chapter1.ts:4:13 | text | 공식 원문: A Byte of Python | learner-text-candidate | — |
| src/content/chapter1.ts:4:84 | text | Swaroop C H의 공식 영문판 | learner-text-candidate | — |
| src/content/chapter1.ts:5:13 | text | 한국어판: Byte of Python | learner-text-candidate | — |
| src/content/chapter1.ts:5:116 | text | Jeongbin Park 번역 참고본 | learner-text-candidate | — |
| src/content/chapter1.ts:6:13 | text | CC BY-SA 4.0 라이선스 안내 | instruction | technical-or-internal |
| src/content/chapter1.ts:6:107 | text | 원문 교재의 공유·변경·출처 표시 조건 | instruction | — |
| src/content/chapter1.ts:9:37 | text | 이 프로그램 소개 | learner-text-candidate | — |
| src/content/chapter1.ts:10:21 | text | 왜 이 프로그램을 만들었나요? | learner-text-candidate | — |
| src/content/chapter1.ts:10:41 | text | 파이썬을 처음 만나는 중학생이 설명을 읽고 바로 실험하며 자신감을 얻도록 만든 교실입니다. | learner-text-candidate | — |
| src/content/chapter1.ts:11:14 | text | explanation | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:11:36 | text | 생각을 코드로 | learner-text-candidate | — |
| src/content/chapter1.ts:11:53 | text | 코딩은 컴퓨터에게 일을 시키는 방법을 배우는 일입니다. 이 프로그램은 어려운 말을 짧게 나누고, 직접 실행하며 답을 찾아가도록 설계했어요. | learner-text-candidate | long-or-dense |
| src/content/chapter1.ts:12:14 | text | tip | feedback-or-error | repeated-text |
| src/content/chapter1.ts:12:28 | text | 정답보다 과정 | feedback-or-error | — |
| src/content/chapter1.ts:12:45 | text | 오류가 나도 괜찮아요. 오류 메시지를 읽고 한 부분씩 고치는 과정이 진짜 실력입니다. | feedback-or-error | — |
| src/content/chapter1.ts:13:16 | text | 코딩 | learner-text-candidate | — |
| src/content/chapter1.ts:13:34 | text | 컴퓨터가 할 일을 명령어로 표현하는 활동 | learner-text-candidate | — |
| src/content/chapter1.ts:14:21 | text | 이렇게 학습해요 | learner-text-candidate | — |
| src/content/chapter1.ts:14:33 | text | 왼쪽 목차에서 순서대로 소단원을 열고, 가운데 설명을 읽은 뒤 오른쪽 실습실에서 확인하세요. | learner-text-candidate | — |
| src/content/chapter1.ts:15:14 | text | explanation | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:15:36 | text | 세 칸으로 배우기 | learner-text-candidate | — |
| src/content/chapter1.ts:15:55 | text | 왼쪽은 전체 지도, 가운데는 오늘의 설명, 오른쪽은 코드를 실행하는 실험실입니다. 아래의 학습 완료 버튼을 눌러야 다음 소단원이 열려요. | learner-text-candidate | long-or-dense |
| src/content/chapter1.ts:16:14 | text | example | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:16:32 | text | 학습 순서 | learner-text-candidate | — |
| src/content/chapter1.ts:16:47 | text | 읽기 → 코드 실행 → 도전 결과 확인 → 학습 완료 → 다음 소단원 순서로 진행합니다. | learner-text-candidate | — |
| src/content/chapter1.ts:16:106 | text | 생각하기 → 고치기 → 실행하기 → 설명하기 | learner-text-candidate | — |
| src/content/chapter1.ts:17:16 | text | 소단원 | learner-text-candidate | — |
| src/content/chapter1.ts:17:35 | text | 큰 단원을 작은 학습 주제로 나눈 한 단계 | learner-text-candidate | — |
| src/content/chapter1.ts:18:21 | text | 교재와 저작권 | learner-text-candidate | — |
| src/content/chapter1.ts:18:32 | text | 이 수업은 공개된 원문 교재를 바탕으로 핵심을 중학생 눈높이에 맞게 다시 설명합니다. | learner-text-candidate | — |
| src/content/chapter1.ts:19:14 | text | explanation | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:19:36 | text | 어디에서 배웠나요? | learner-text-candidate | — |
| src/content/chapter1.ts:19:56 | text | 기본 흐름은 Swaroop C H의 A Byte of Python을 참고했고, 한국어판은 Jeongbin Park 번역본을 확인했습니다. 이 앱의 문장은 원문을 길게 복사하지 않고 학습용으로 재서술했어요. | learner-text-candidate | long-or-dense |
| src/content/chapter1.ts:20:14 | text | warning | instruction | repeated-text |
| src/content/chapter1.ts:20:32 | text | 라이선스를 함께 지켜요 | instruction | — |
| src/content/chapter1.ts:20:54 | text | 원문 교재는 CC BY-SA 4.0 조건으로 공유됩니다. 출처를 밝히고 같은 조건으로 공유해야 하며, 아래 링크에서 정확한 조건을 확인할 수 있어요. 교재 코드 예제는 별도로 3-clause BSD 조건(unless otherwise noted)이 안내되어 있습니다. 앱의 재서술 콘텐츠와 앱 코드는 교재와 별도의 권리를 가집니다. | instruction | long-or-dense, multiple-conditions, technical-or-internal |
| src/content/chapter1.ts:21:16 | text | 출처 표시 | learner-text-candidate | — |
| src/content/chapter1.ts:21:37 | text | 누가 만든 자료인지 밝히는 약속 | learner-text-candidate | — |
| src/content/chapter1.ts:21:96 | text | 저작자 표시와 동일조건변경허락을 요구하는 공개 라이선스 | learner-text-candidate | — |
| src/content/chapter1.ts:22:21 | text | 첫 실행 준비 | learner-text-candidate | — |
| src/content/chapter1.ts:22:32 | text | 설치 없이 브라우저에서 첫 문장을 실행하고 출력 창을 확인해 봅니다. | learner-text-candidate | abstract-or-formal |
| src/content/chapter1.ts:22:81 | text | print("첫 실행 성공!") | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:22:102 | text | 첫 실행 성공! | learner-text-candidate | — |
| src/content/chapter1.ts:23:14 | text | explanation | input | repeated-text |
| src/content/chapter1.ts:23:36 | text | 안전한 실험실 | input | — |
| src/content/chapter1.ts:23:53 | text | 코드는 이 브라우저의 Python Worker 안에서만 실행됩니다. 이름이나 이메일을 입력할 필요가 없고, 실행 시간이 길어지면 자동으로 멈춰요. | input | abstract-or-formal, long-or-dense |
| src/content/chapter1.ts:24:14 | text | example | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:24:32 | text | 첫 명령 | learner-text-candidate | — |
| src/content/chapter1.ts:24:46 | text | print()는 괄호 안의 글을 출력 창에 보여 줍니다. | learner-text-candidate | abstract-or-formal |
| src/content/chapter1.ts:24:87 | text | print("첫 실행 성공!") | learner-text-candidate | repeated-text |
| src/content/chapter1.ts:25:16 | text | 출력 | learner-text-candidate | abstract-or-formal |
| src/content/chapter1.ts:25:34 | text | 프로그램이 실행 결과로 보여 주는 내용 | learner-text-candidate | — |
| src/content/chapter10.ts:3:39 | text | 자료 구조 | learner-text-candidate | — |
| src/content/chapter10.ts:4:22 | text | 리스트 | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:29 | text | 리스트는 순서가 있는 여러 값을 한 번에 담는 상자입니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:65 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:4:78 | text | colors = ["빨강", "초록", "파랑"] print(colors[0]) print(len(colors)) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:4:147 | text | 빨강 3 | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:166 | text | 리스트에 좋아하는 색을 하나 더 넣으세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:199 | text | append()를 사용해 보세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:238 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:4:272 | text | 리스트의 크기가 늘었어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:4:300 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:4:332 | text | 좋아하는 색을 추가해 리스트 크기가 늘었어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:5:22 | text | 객체와 클래스 맛보기 | learner-text-candidate | — |
| src/content/chapter10.ts:5:37 | text | 클래스는 비슷한 객체를 만들 설계도입니다. 지금은 객체가 값과 기능을 함께 가질 수 있다는 점만 기억해요. | learner-text-candidate | long-or-dense |
| src/content/chapter10.ts:6:22 | text | 튜플 | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:28 | text | 튜플은 여러 값을 순서대로 담지만 만든 뒤 내용을 바꾸지 않는 묶음입니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:73 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:6:86 | text | point = (3, 5) print("x:", point[0]) print("y:", point[1]) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:6:150 | text | x: 3 y: 5 | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:174 | text | 좌표를 다른 값으로 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:202 | text | 튜플 안의 두 숫자를 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:239 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:6:258 | text | x: | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:274 | text | 튜플의 위치별 값을 꺼냈어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:6:304 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:6:336 | text | 바꾼 좌표의 위치별 값을 꺼냈어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:7:22 | text | 딕셔너리 | feedback-or-error, hint | — |
| src/content/chapter10.ts:7:30 | text | 딕셔너리는 key와 value를 짝으로 저장해 이름표로 값을 찾습니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:7:73 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:7:86 | text | scores = {"수학": 90, "과학": 85} for subject, score in scores.items(): print(subject, score) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:7:185 | text | 수학 90 과학 85 | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:7:211 | text | 좋아하는 과목과 점수를 하나 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:7:243 | text | 딕셔너리에 원하는 과목과 점수 항목을 넣어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:7:289 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:7:322 | text | 새 과목과 점수를 한 줄 추가했어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:8:22 | text | 시퀀스와 순회 | feedback-or-error, hint | — |
| src/content/chapter10.ts:8:33 | text | for 문으로 리스트의 항목을 하나씩 꺼내면 목록 전체를 다룰 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:8:79 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:8:92 | text | todos = ["수학 숙제", "물 마시기"] for todo in todos: print("할 일:", todo) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:8:167 | text | 할 일: 수학 숙제 할 일: 물 마시기 | feedback-or-error, hint | — |
| src/content/chapter10.ts:8:203 | text | 할 일을 하나 더 추가해 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter10.ts:8:233 | text | todos 리스트에 문자열을 추가해요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:8:275 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:8:308 | text | 새 할 일을 추가하고 목록을 순회했어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:22 | text | 집합 | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:28 | text | 집합은 중복을 없애고 값이 있는지 빠르게 확인하는 자료 구조입니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:69 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:9:82 | text | tags = {"python", "coding", "python"} print(len(tags)) print("coding" in tags) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:9:166 | text | 2 True | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:187 | text | 새 태그를 하나 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:212 | text | add()로 원하는 문자열을 넣어 보세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:9:256 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:9:273 | text | 3 True | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:9:294 | text | 새 태그를 추가해 집합의 크기가 늘었어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:10:22 | text | 참조 | feedback-or-error, hint | — |
| src/content/chapter10.ts:10:28 | text | 변수는 값이 있는 곳을 가리킬 수 있어, 같은 리스트를 함께 바꾸는 일이 생깁니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:10:78 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:10:91 | text | first = ["연필"] second = first second.append("지우개") for item in first: print(item) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:10:184 | text | 연필 지우개 | feedback-or-error, hint | — |
| src/content/chapter10.ts:10:205 | text | 리스트에 준비물을 하나 더 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:10:236 | text | second에 append를 한 줄 더 적어 보세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:10:286 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:10:319 | text | 같은 리스트에 새 준비물을 추가했어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:11:22 | text | 문자열 더 알아보기 | feedback-or-error, hint | — |
| src/content/chapter10.ts:11:36 | text | 문자열도 순서가 있는 시퀀스라 인덱스, len(), upper() 등을 사용할 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter10.ts:11:91 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:11:104 | text | word = "python" print(word[0]) print(word.upper()) print(len(word)) | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:11:178 | text | p PYTHON 6 | feedback-or-error, hint | technical-or-internal |
| src/content/chapter10.ts:11:204 | text | 문자열을 다른 단어로 바꾸어 관찰하세요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:11:236 | text | word의 값을 영어 단어로 바꿔요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:11:277 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:11:309 | text | 다른 문자열의 여러 기능을 사용했어요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:12:22 | text | 자료 구조 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter10.ts:12:37 | text | 리스트와 딕셔너리를 함께 순회해 과목별 점수를 출력합니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter10.ts:12:73 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:12:86 | text | scores = {"수학": 90, "과학": 85, "미술": 95} for subject, score in scores.items(): print(subject, score, "점") | feedback-or-error, hint | long-or-dense |
| src/content/chapter10.ts:12:200 | text | 수학 90 점 과학 85 점 미술 95 점 | feedback-or-error, hint | — |
| src/content/chapter10.ts:12:239 | text | 좋아하는 과목을 하나 더 추가하고 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter10.ts:12:274 | text | 딕셔너리에 새 항목을 추가해요. | feedback-or-error, hint | — |
| src/content/chapter10.ts:12:312 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter10.ts:12:345 | text | 새 과목을 추가하고 자료 구조를 순회했어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:3:39 | text | 실생활 문제 해결 | learner-text-candidate | — |
| src/content/chapter11.ts:4:22 | text | 문제 정의 | input | — |
| src/content/chapter11.ts:4:31 | text | 학교 축제 준비물 관리 문제를 데이터와 필요한 기능으로 나누어 봅니다. | input | — |
| src/content/chapter11.ts:4:74 | text | read | input | repeated-text |
| src/content/chapter11.ts:4:124 | text | explanation | input | repeated-text |
| src/content/chapter11.ts:4:146 | text | 문제를 쪼개기 | input | — |
| src/content/chapter11.ts:4:163 | text | 무엇을 입력받고, 어떤 기준으로 판단하고, 어떤 결과를 보여 줄지 먼저 적습니다. | input | abstract-or-formal |
| src/content/chapter11.ts:4:222 | text | tip | input | repeated-text |
| src/content/chapter11.ts:4:236 | text | 이번 프로젝트 | input | — |
| src/content/chapter11.ts:4:253 | text | 준비물 재고와 필요한 수량을 비교해 부족한 물건을 찾는 프로그램을 만듭니다. | input | — |
| src/content/chapter11.ts:5:22 | text | 첫 번째 버전: 목록 출력 | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter11.ts:5:40 | text | 가장 작은 프로그램으로 준비물 이름을 먼저 출력합니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter11.ts:5:74 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:5:87 | text | supplies = ["색종이", "가위", "테이프"] for item in supplies: print("준비물:", item) | feedback-or-error, hint | long-or-dense |
| src/content/chapter11.ts:5:170 | text | 준비물: 색종이 준비물: 가위 준비물: 테이프 | feedback-or-error, hint | — |
| src/content/chapter11.ts:5:211 | text | 준비물 하나를 더 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:5:237 | text | supplies 리스트에 문자열을 넣어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:5:281 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:5:314 | text | 첫 번째 버전에 새 준비물을 추가했어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:6:22 | text | 두 번째 버전: 필요한 양 비교 | feedback-or-error, hint | — |
| src/content/chapter11.ts:6:43 | text | 재고와 계획을 딕셔너리로 담고 부족한지 비교합니다. | feedback-or-error, hint | — |
| src/content/chapter11.ts:6:75 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:6:88 | text | stock = {"색종이": 30} needed = {"색종이": 50} for item, amount in needed.items(): if stock.get(item, 0) < amount: print("준비 필요:", item) else: print("준비 완료:", item) | feedback-or-error, hint | long-or-dense |
| src/content/chapter11.ts:6:280 | text | 준비 필요: 색종이 | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:6:304 | text | 가위의 재고와 필요한 양도 비교하세요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:6:335 | text | 두 딕셔너리에 원하는 가위 항목을 추가하면 부족하거나 충분한 결과가 한 줄 더 나와요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:6:404 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:6:437 | text | 새 물건의 재고와 필요한 양을 비교했어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:22 | text | 세 번째 버전: 함수로 정리 | feedback-or-error, hint | — |
| src/content/chapter11.ts:7:41 | text | 반복되는 비교를 함수로 묶으면 다른 준비물에도 재사용할 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter11.ts:7:83 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:96 | text | def check_missing(stock, plan): missing = [] for item, amount in plan.items(): if stock.get(item, 0) < amount: missing.append(item) return missing print(check_missing({"색종이": 30}, {"색종이": 50})) | feedback-or-error, hint | long-or-dense |
| src/content/chapter11.ts:7:333 | text | ['색종이'] | feedback-or-error, hint | — |
| src/content/chapter11.ts:7:356 | text | 테이프도 부족한 상황을 데이터에 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:7:390 | text | 두 딕셔너리에 테이프 수량을 넣어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:7:431 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:450 | text | 테이프 | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:467 | text | 테이프 부족 결과를 확인했어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:498 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:7:530 | text | 함수가 여러 준비물의 부족 여부를 확인했어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:8:22 | text | 네 번째 버전: 결과 안내 | feedback-or-error, hint, instruction | — |
| src/content/chapter11.ts:8:40 | text | 찾은 부족 목록을 for 문으로 읽기 좋은 안내문으로 바꿉니다. | feedback-or-error, hint, instruction | — |
| src/content/chapter11.ts:8:79 | text | challenge | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter11.ts:8:92 | text | missing = ["색종이", "테이프"] for item in missing: print("준비 필요:", item) | feedback-or-error, hint, instruction | long-or-dense |
| src/content/chapter11.ts:8:169 | text | 준비 필요: 색종이 준비 필요: 테이프 | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter11.ts:8:205 | text | 준비가 끝난 물건 안내도 추가하세요. | feedback-or-error, hint, instruction | — |
| src/content/chapter11.ts:8:235 | text | 기존 두 줄 뒤에 준비 완료를 알리는 print를 한 줄 더 적어 보세요. | feedback-or-error, hint, instruction | — |
| src/content/chapter11.ts:8:297 | text | appended | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter11.ts:8:330 | text | 준비가 끝난 물건 안내도 추가했어요. | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter11.ts:9:22 | text | 개선 아이디어 | input, instruction | — |
| src/content/chapter11.ts:9:33 | text | 입력 검증, 정렬, 더 친절한 안내처럼 다음 버전의 아이디어를 적어 봅니다. | input, instruction | abstract-or-formal |
| src/content/chapter11.ts:10:22 | text | 개발 단계 돌아보기 | feedback-or-error, hint | — |
| src/content/chapter11.ts:10:36 | text | 문제 정의 → 작은 실행 → 함수와 자료 구조로 개선하는 과정을 되돌아봅니다. | feedback-or-error, hint | — |
| src/content/chapter11.ts:10:83 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:10:96 | text | steps = ["문제 정의", "작은 실행", "테스트", "개선"] for step in steps: print(step) | feedback-or-error, hint | long-or-dense |
| src/content/chapter11.ts:10:176 | text | 문제 정의 작은 실행 테스트 개선 | feedback-or-error, hint | — |
| src/content/chapter11.ts:10:211 | text | 나만의 개발 단계를 하나 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:10:241 | text | steps 리스트에 단계를 넣어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:10:281 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:10:314 | text | 나만의 개발 단계를 순서대로 추가했어요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:11:22 | text | 프로젝트 완성 | feedback-or-error, hint | — |
| src/content/chapter11.ts:11:33 | text | 자료 구조·함수·조건·반복을 모두 연결한 최종 프로그램을 실행합니다. | feedback-or-error, hint | — |
| src/content/chapter11.ts:11:75 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:11:88 | text | supplies = {"색종이": 30, "가위": 4, "테이프": 2} needed = {"색종이": 50, "가위": 4, "테이프": 3} def check_missing(stock, plan): return [item for item, amount in plan.items() if stock.get(item, 0) < amount] for item in check_missing(supplies, needed): print("준비 필요:", item) | feedback-or-error, hint | long-or-dense |
| src/content/chapter11.ts:11:367 | text | 준비 필요: 색종이 준비 필요: 테이프 | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:11:403 | text | 준비 필요 결과가 달라지도록 나의 축제 준비물과 수량으로 프로젝트를 완성하세요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:11:457 | text | supplies와 needed의 항목 또는 수량을 바꾸어 부족한 준비물 결과가 달라지게 실행해요. | feedback-or-error, hint | — |
| src/content/chapter11.ts:11:532 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter11.ts:11:564 | text | 나의 준비물과 수량으로 프로젝트 결과를 바꿨어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:3:37 | text | 파이썬 소개 | learner-text-candidate | — |
| src/content/chapter2.ts:4:21 | text | 파이썬의 특징 | learner-text-candidate | — |
| src/content/chapter2.ts:4:32 | text | 파이썬은 읽기 쉬운 문장과 풍부한 도구를 가진 프로그래밍 언어입니다. | learner-text-candidate | — |
| src/content/chapter2.ts:4:81 | text | print("읽기 쉬운 코드") | learner-text-candidate | — |
| src/content/chapter2.ts:4:102 | text | 읽기 쉬운 코드 | learner-text-candidate | — |
| src/content/chapter2.ts:5:21 | text | Python 3를 사용하는 이유 | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:42 | text | 새로 배우는 우리는 현재 널리 쓰이는 Python 3 문법과 도구를 사용합니다. | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:90 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:5:103 | text | language = "Python 3" print("오늘 배우는 언어:", language) | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:159 | text | 오늘 배우는 언어: Python 3 | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:192 | text | 문장에 나의 이름을 덧붙여 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter2.ts:5:223 | text | print() 안에 쉼표로 값을 하나 더 넣어 보세요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:274 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:5:293 | text | Python 3 | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:315 | text | Python 3를 잘 확인했어요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:5:347 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:5:379 | text | 나의 이름을 덧붙여 문장을 바꿨어요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:6:21 | text | 사람들은 어디에 사용할까요? | feedback-or-error, hint | — |
| src/content/chapter2.ts:6:40 | text | 웹, 데이터, 인공지능, 자동화처럼 파이썬은 여러 분야의 문제를 해결합니다. | feedback-or-error, hint | — |
| src/content/chapter2.ts:6:86 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:6:99 | text | uses = ["웹", "데이터", "인공지능"] for use in uses: print(use) | feedback-or-error, hint | long-or-dense, repeated-text |
| src/content/chapter2.ts:6:164 | text | 웹 데이터 인공지능 | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:6:190 | text | 파이썬 활용 분야를 하나 더 추가하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter2.ts:6:222 | text | uses 리스트의 마지막에 새 글자를 넣어 보세요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:6:271 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:6:304 | text | 새 활용 분야를 추가했어요. | feedback-or-error, hint | abstract-or-formal, repeated-text |
| src/content/chapter2.ts:7:21 | text | 소개 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter2.ts:7:33 | text | 파이썬이 좋은 이유를 짧은 문장으로 출력하며 첫 장을 정리합니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter2.ts:7:73 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:7:86 | text | reason = "쉽게 읽고 바로 고칠 수 있어서" print("나는 파이썬을", reason, "좋아해요.") | feedback-or-error, hint | long-or-dense |
| src/content/chapter2.ts:7:153 | text | 나는 파이썬을 쉽게 읽고 바로 고칠 수 있어서 좋아해요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:7:198 | text | 내가 파이썬을 배우는 이유를 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter2.ts:7:230 | text | reason 변수의 따옴표 안을 바꾸면 됩니다. | feedback-or-error, hint | — |
| src/content/chapter2.ts:7:277 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:7:296 | text | 파이썬 | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:7:313 | text | 파이썬을 배우는 이유를 표현했어요. | feedback-or-error, hint | — |
| src/content/chapter2.ts:7:346 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter2.ts:7:378 | text | 나만의 이유로 문장을 바꿨어요. | feedback-or-error, hint | — |
| src/content/chapter3.ts:3:37 | text | 설치와 실행 환경 | learner-text-candidate | — |
| src/content/chapter3.ts:4:21 | text | 설치 없이 브라우저에서 실행 | learner-text-candidate | — |
| src/content/chapter3.ts:4:40 | text | 이 앱은 브라우저 안의 작은 Python 실험실이라 설치 과정 없이 시작할 수 있습니다. | learner-text-candidate | — |
| src/content/chapter3.ts:4:100 | text | print("브라우저 실험실 준비 완료") | learner-text-candidate | — |
| src/content/chapter3.ts:4:127 | text | 브라우저 실험실 준비 완료 | learner-text-candidate | — |
| src/content/chapter3.ts:5:21 | text | 운영체제와 Python 설치 | learner-text-candidate | — |
| src/content/chapter3.ts:5:40 | text | 컴퓨터에 Python을 설치하면 파일로 저장하고 터미널에서도 실행할 수 있습니다. | learner-text-candidate | — |
| src/content/chapter3.ts:6:21 | text | 명령줄과 파일 실행 | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:35 | text | 터미널은 글자로 컴퓨터에 명령하는 공간이고, .py 파일은 Python 프로그램 파일입니다. | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:90 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter3.ts:6:103 | text | file_name = "hello.py" print("실행할 파일:", file_name) | feedback-or-error, hint | long-or-dense |
| src/content/chapter3.ts:6:158 | text | 실행할 파일: hello.py | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:188 | text | 실행할 나만의 파일 이름을 만들어 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter3.ts:6:223 | text | .py로 끝나는 이름을 file_name에 넣어 보세요. | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:275 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter3.ts:6:294 | text | .py | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:311 | text | Python 파일 이름을 확인했어요. | feedback-or-error, hint | — |
| src/content/chapter3.ts:6:345 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter3.ts:6:377 | text | 나만의 Python 파일 이름을 만들었어요. | feedback-or-error, hint | — |
| src/content/chapter3.ts:7:21 | text | 환경 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter3.ts:7:33 | text | 실행 환경의 약속을 글자로 정리하고, 코드가 위에서 아래로 실행되는지 봅니다. | feedback-or-error, hint | — |
| src/content/chapter3.ts:7:80 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter3.ts:7:93 | text | print("1. 코드 작성") print("2. 실행 버튼") print("3. 결과 확인") | feedback-or-error, hint | long-or-dense, multiple-actions |
| src/content/chapter3.ts:7:152 | text | 1. 코드 작성 2. 실행 버튼 3. 결과 확인 | feedback-or-error, hint | multiple-actions |
| src/content/chapter3.ts:7:194 | text | 나만의 실습 순서를 한 줄 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter3.ts:7:225 | text | print()를 하나 더 적으면 됩니다. | feedback-or-error, hint | — |
| src/content/chapter3.ts:7:268 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter3.ts:7:301 | text | 실행 흐름을 잘 정리했어요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:3:37 | text | 첫걸음 | learner-text-candidate | — |
| src/content/chapter4.ts:4:21 | text | 인터프리터와 print() | learner-text-candidate | — |
| src/content/chapter4.ts:4:39 | text | 인터프리터는 코드를 읽어 실행하고, print()는 결과를 화면에 보여 줍니다. | learner-text-candidate | — |
| src/content/chapter4.ts:4:94 | text | print("한 줄씩 실행해요") | learner-text-candidate | — |
| src/content/chapter4.ts:4:116 | text | 한 줄씩 실행해요 | learner-text-candidate | — |
| src/content/chapter4.ts:5:21 | text | 편집기 선택하기 | learner-text-candidate | — |
| src/content/chapter4.ts:5:33 | text | 편집기는 코드를 쓰고 고치는 도구입니다. 이 앱에서는 오른쪽 편집기를 사용합니다. | learner-text-candidate | — |
| src/content/chapter4.ts:6:21 | text | 소스 파일과 실행 순서 | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:37 | text | 소스는 사람이 읽는 프로그램 글이며 보통 위에서 아래 순서로 실행됩니다. | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:81 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:6:94 | text | print("첫 번째") print("두 번째") print("세 번째") | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:141 | text | 첫 번째 두 번째 세 번째 | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:171 | text | 순서가 드러나는 네 번째 줄을 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:204 | text | print("네 번째")처럼 적어 보세요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:6:248 | text | appended | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:6:281 | text | 실행 순서를 코드로 표현했어요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:21 | text | 도움말 읽는 습관 | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:34 | text | 모르는 함수는 이름과 괄호를 살펴보고, 공식 문서에서 사용법을 확인하는 습관을 기릅니다. | feedback-or-error, hint | multiple-actions |
| src/content/chapter4.ts:7:87 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:7:100 | text | word = "help" print(word, "를 찾아보면 새 기능을 배울 수 있어요.") | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:156 | text | help 를 찾아보면 새 기능을 배울 수 있어요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:197 | text | 도움말을 찾고 싶은 함수 이름으로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:231 | text | word 변수 안의 글자를 바꾸면 됩니다. | feedback-or-error, hint | — |
| src/content/chapter4.ts:7:275 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:7:307 | text | 도움말을 찾을 대상을 정했어요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:21 | text | 첫걸음 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:34 | text | 세 줄 인사 프로그램으로 지금까지 배운 실행 흐름을 묶어 봅니다. | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:74 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:8:87 | text | print("안녕하세요!") print("저는 파이썬 새내기예요.") print("오늘도 한 줄씩!") | feedback-or-error, hint | long-or-dense |
| src/content/chapter4.ts:8:150 | text | 안녕하세요! 저는 파이썬 새내기예요. 오늘도 한 줄씩! | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:196 | text | 세 줄 자기소개를 나만의 말로 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:230 | text | print를 지우지 말고 따옴표 안을 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter4.ts:8:276 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter4.ts:8:308 | text | 나만의 자기소개 프로그램을 완성했어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:3:37 | text | 기초 | learner-text-candidate | — |
| src/content/chapter5.ts:4:21 | text | 주석 | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:27 | text | 숫자 기호 # 뒤의 글은 메모가 되어 실행되지 않습니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:4:62 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:75 | text | # 오늘의 메모 print("주석은 설명을 도와줘요") | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:110 | text | 주석은 설명을 도와줘요 | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:136 | text | 코드에 나만의 주석을 한 줄 추가하세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:4:168 | text | #로 시작하는 문장을 위에 적어 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:4:211 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:230 | text | 주석 | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:4:246 | text | 메모와 실행 코드를 잘 구분했어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:5:21 | text | 리터럴 상수와 숫자형 | feedback-or-error, hint | — |
| src/content/chapter5.ts:5:36 | text | 코드에 직접 적은 10, 3.14 같은 값은 리터럴입니다. 정수와 실수를 구분해요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:5:86 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:5:99 | text | apples = 3 price = 1200.0 print(apples) print(price) | feedback-or-error, hint | long-or-dense |
| src/content/chapter5.ts:5:181 | text | 사과 개수와 가격을 나의 값으로 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:5:216 | text | 정수와 소수의 모양을 비교해 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:5:257 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:5:289 | text | 나만의 숫자 리터럴을 출력했어요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter5.ts:6:21 | text | 문자열과 따옴표 | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:33 | text | 작은따옴표와 큰따옴표로 글자를 감싸면 문자열이 됩니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:67 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:6:80 | text | message = "파이썬은 재미있어요" print(message) | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:122 | text | 파이썬은 재미있어요 | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:146 | text | message를 나만의 응원 문장으로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:182 | text | 따옴표는 남겨 두고 안쪽만 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:6:222 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:6:254 | text | 나만의 문자열을 변수에 담았어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:21 | text | 문자열 포매팅과 이스케이프 | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:39 | text | f-string과 같은 이스케이프 문자를 사용하면 출력 모양을 쉽게 만들 수 있습니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter5.ts:7:95 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:7:108 | text | name = "민준" print(f"안녕, {name}!") print("첫 줄 둘째 줄") | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:167 | text | 안녕, 민준! 첫 줄 둘째 줄 | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:199 | text | 이름을 바꾸어 나만의 인사를 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter5.ts:7:231 | text | name 변수의 값을 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:271 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:7:290 | text | 안녕 | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:7:306 | text | 문자열 포매팅을 사용했어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:7:335 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:7:367 | text | 이름을 바꾸어 나만의 인사를 만들었어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:21 | text | 변수와 식별자 이름 | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:35 | text | 변수는 값에 붙이는 이름표입니다. 이름은 역할이 드러나고 규칙에 맞아야 합니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:83 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:8:96 | text | student_name = "지우" score = 95 print(student_name, score) | feedback-or-error, hint | long-or-dense |
| src/content/chapter5.ts:8:159 | text | 지우 95 | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:178 | text | 변수 이름과 값을 나의 정보로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:210 | text | 영문과 밑줄로 역할이 보이는 이름을 지어 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:8:258 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:8:290 | text | 나의 변수 이름과 값으로 바꿨어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:21 | text | 자료형과 객체 | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:32 | text | type()으로 값의 종류를 살펴봅니다. 숫자와 문자열은 서로 다른 자료형입니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:81 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:9:94 | text | print(type(7).__name__) print(type("seven").__name__) | feedback-or-error, hint | long-or-dense |
| src/content/chapter5.ts:9:152 | text | int str | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:174 | text | 실수나 참·거짓 값의 자료형도 확인하세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:207 | text | type(3.14) 또는 type(True)를 사용해요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:9:259 | text | regex | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:9:275 | text | (?:^\| )(?:float\|bool)(?:$\| ) | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:9:321 | text | 실수 또는 참·거짓 자료형을 직접 확인했어요. | feedback-or-error, hint | multiple-conditions |
| src/content/chapter5.ts:10:21 | text | 프로그램 작성과 들여쓰기 | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:38 | text | 콜론 뒤 블록은 같은 칸만큼 들여써야 합니다. 공백은 코드의 구조를 보여 줍니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:87 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:10:100 | text | ready = True if ready: print("시작!") | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:145 | text | 시작! | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:162 | text | 시작 메시지를 나만의 문장으로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:194 | text | if 블록 안의 print를 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:10:235 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:10:267 | text | 조건 블록의 들여쓰기를 지키며 메시지를 바꿨어요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:21 | text | 기초 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:33 | text | 주석·변수·문자열·숫자를 한 프로그램 안에서 연결해 봅니다. | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:70 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:11:83 | text | # 오늘의 기록 name = "지우" days = 5 print(name, "는", days, "일째 연습 중") | feedback-or-error, hint | long-or-dense |
| src/content/chapter5.ts:11:153 | text | 지우 는 5 일째 연습 중 | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:181 | text | 이름과 연습 날짜를 바꿔 기록하세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:211 | text | name과 days 값을 함께 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter5.ts:11:256 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter5.ts:11:288 | text | 나의 이름과 연습 날짜를 기록했어요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:3:37 | text | 연산자와 수식 | learner-text-candidate | — |
| src/content/chapter6.ts:4:21 | text | 연산자 | feedback-or-error, hint | — |
| src/content/chapter6.ts:4:28 | text | 더하기·빼기·곱하기·나누기와 나머지를 기호로 표현합니다. | feedback-or-error, hint | — |
| src/content/chapter6.ts:4:63 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:4:76 | text | a = 17 b = 5 print(a // b) print(a % b) | feedback-or-error, hint | — |
| src/content/chapter6.ts:4:140 | text | 두 수를 바꾸어 몫과 나머지를 관찰하세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:4:173 | text | a와 b에 다른 정수를 넣어 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:4:214 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:4:246 | text | 바꾼 두 수의 몫과 나머지를 관찰했어요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:5:21 | text | 연산 및 할당 연산자 | feedback-or-error, hint | — |
| src/content/chapter6.ts:5:36 | text | 계산한 결과를 변수에 다시 저장할 때 +=, -= 같은 할당 연산자를 쓸 수 있습니다. | feedback-or-error, hint | multiple-conditions |
| src/content/chapter6.ts:5:88 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:5:101 | text | score = 10 score += 5 score -= 2 print(score) | feedback-or-error, hint | — |
| src/content/chapter6.ts:5:169 | text | 점수를 더하고 빼는 과정을 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:5:201 | text | += 뒤 숫자를 고쳐 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:5:238 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:5:270 | text | 값을 계산하며 갱신했어요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:6:21 | text | 연산 순서 | feedback-or-error, hint | — |
| src/content/chapter6.ts:6:30 | text | 곱셈과 나눗셈이 덧셈보다 먼저 계산됩니다. 순서를 모르면 괄호로 분명히 해요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:6:77 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:6:90 | text | answer = 2 + 3 * 4 print(answer) | feedback-or-error, hint | — |
| src/content/chapter6.ts:6:143 | text | 괄호를 넣어 계산 결과를 20으로 만들어 보세요. | feedback-or-error, hint | multiple-actions |
| src/content/chapter6.ts:6:180 | text | (2 + 3) * 4처럼 묶어 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:6:222 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:6:255 | text | 괄호로 계산 순서를 바꿨어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:7:21 | text | 수식 예제 | feedback-or-error, hint | — |
| src/content/chapter6.ts:7:30 | text | 간식 가격과 개수로 예산을 계산해 실제 문제에 수식을 적용합니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter6.ts:7:70 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:7:83 | text | price = 1200 count = 3 budget = 5000 spent = price * count print("사용 금액:", spent) print("남은 금액:", budget - spent) | feedback-or-error, hint | long-or-dense |
| src/content/chapter6.ts:7:205 | text | 사용 금액: 3600 남은 금액: 1400 | feedback-or-error, hint | — |
| src/content/chapter6.ts:7:243 | text | 간식 가격과 개수를 바꿔 남은 예산을 다시 계산하세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:7:283 | text | price, count, budget 중 하나를 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:7:338 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:7:357 | text | 남은 금액 | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:7:376 | text | 예산 계산 결과를 확인했어요. | feedback-or-error, hint | multiple-actions |
| src/content/chapter6.ts:7:406 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:7:438 | text | 바꾼 값으로 예산을 다시 계산했어요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:21 | text | 연산 확인 문제 | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:33 | text | 수식을 읽고 결과를 예상한 뒤 실행 결과로 확인합니다. | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:67 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:8:80 | text | width = 8 height = 5 print("넓이:", width * height) print("둘레:", (width + height) * 2) | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/content/chapter6.ts:8:171 | text | 넓이: 40 둘레: 26 | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:199 | text | 직사각형의 가로와 세로를 바꾸어 보세요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:231 | text | width와 height를 다른 숫자로 바꿔요. | feedback-or-error, hint | missing-term-explanation, technical-or-internal |
| src/content/chapter6.ts:8:278 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:8:297 | text | 넓이 | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:313 | text | 수식과 결과를 연결했어요. | feedback-or-error, hint | — |
| src/content/chapter6.ts:8:341 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter6.ts:8:373 | text | 바꾼 가로와 세로로 다시 계산했어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:3:37 | text | 흐름 제어 | learner-text-candidate | — |
| src/content/chapter7.ts:4:21 | text | if 문 | feedback-or-error, hint | — |
| src/content/chapter7.ts:4:29 | text | 조건이 참인지 확인하고 상황에 맞는 코드를 선택합니다. | feedback-or-error, hint | multiple-actions |
| src/content/chapter7.ts:4:63 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:4:76 | text | temperature = 24 if temperature >= 20: print("따뜻해요") else: print("시원해요") | feedback-or-error, hint | long-or-dense |
| src/content/chapter7.ts:4:110 | text | = 20: print("따뜻해요") else: print("시원해요")', '따뜻해요', { prompt: '온도를 바꾸어 다른 메시지도 확인하세요.', hint: '조건의 기준 숫자를 살펴보고, 낮은 온도에서 else 메시지도 확인해 보세요.', checks: [{ mode: 'changed', value: '', feedback: 'if와 else 조건에 따라 다른 메시지를 확인했어요.' }] }), makeLesson(7, 2, 'while 문', '조건이 참인 동안 같은 코드를 반복합니다. 반복이 끝나는 변화도 꼭 넣어요.', 'challenge', 'count = 1 while count | feedback-or-error, hint | long-or-dense, multiple-actions, multiple-conditions |
| src/content/chapter7.ts:4:164 | text | 따뜻해요 | feedback-or-error, hint | — |
| src/content/chapter7.ts:4:182 | text | 온도를 바꾸어 다른 메시지도 확인하세요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:4:214 | text | 조건의 기준 숫자를 살펴보고, 낮은 온도에서 else 메시지도 확인해 보세요. | feedback-or-error, hint | multiple-actions |
| src/content/chapter7.ts:4:278 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:4:310 | text | if와 else 조건에 따라 다른 메시지를 확인했어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:5:21 | text | while 문 | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:32 | text | 조건이 참인 동안 같은 코드를 반복합니다. 반복이 끝나는 변화도 꼭 넣어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:78 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:5:91 | text | count = 1 while count <= 3: print("연습", count) count += 1 | feedback-or-error, hint | long-or-dense |
| src/content/chapter7.ts:5:163 | text | 연습 1 연습 2 연습 3 | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:193 | text | 반복 횟수를 5번으로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:220 | text | while의 기준 숫자를 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:259 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:5:276 | text | 연습 1 연습 2 연습 3 연습 4 연습 5 | feedback-or-error, hint | — |
| src/content/chapter7.ts:5:318 | text | while 반복을 안전하게 끝냈어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:6:21 | text | for 루프 | feedback-or-error, hint | — |
| src/content/chapter7.ts:6:31 | text | 목록이나 range의 값을 하나씩 꺼내 같은 작업을 반복합니다. | feedback-or-error, hint | — |
| src/content/chapter7.ts:6:70 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:6:83 | text | for number in range(1, 6): print(number) | feedback-or-error, hint | — |
| src/content/chapter7.ts:6:159 | text | 1부터 10까지 출력하도록 바꾸세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter7.ts:6:189 | text | range의 끝 숫자는 포함되지 않아요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:6:232 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:6:292 | text | for 루프로 1부터 10까지 순회했어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:21 | text | break 문 | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:32 | text | break는 반복을 즉시 멈춥니다. 원하는 대상을 찾았을 때 유용합니다. | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:76 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:7:89 | text | for number in range(1, 10): if number == 4: print("찾았어요", number) break | feedback-or-error, hint | long-or-dense |
| src/content/chapter7.ts:7:187 | text | 찾았어요 4 | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:207 | text | 멈출 숫자를 7로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:232 | text | if 비교 숫자와 출력 숫자를 함께 고쳐요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter7.ts:7:277 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:7:294 | text | 찾았어요 7 | feedback-or-error, hint | — |
| src/content/chapter7.ts:7:314 | text | break 시점을 바꿨어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:8:21 | text | continue 문 | feedback-or-error, hint | — |
| src/content/chapter7.ts:8:35 | text | continue는 현재 반복만 건너뛰고 다음 반복으로 이동합니다. | feedback-or-error, hint | — |
| src/content/chapter7.ts:8:75 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:8:88 | text | for number in range(1, 6): if number == 3: continue print(number) | feedback-or-error, hint | long-or-dense |
| src/content/chapter7.ts:8:200 | text | 건너뛸 숫자를 4로 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:8:226 | text | continue 앞의 비교 숫자를 바꿔요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:8:270 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:8:311 | text | 반복 한 번을 건너뛰었어요. | feedback-or-error, hint | — |
| src/content/chapter7.ts:9:21 | text | 흐름 제어 실습 | feedback-or-error, hint | — |
| src/content/chapter7.ts:9:33 | text | 조건과 반복을 함께 사용해 짝수만 골라 출력합니다. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter7.ts:9:65 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:9:78 | text | for number in range(1, 11): if number % 2 == 0: print(number) | feedback-or-error, hint | long-or-dense |
| src/content/chapter7.ts:9:185 | text | 1부터 30까지 중 3의 배수만 출력해 보세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter7.ts:9:221 | text | number % 3 == 0인지 확인하면 됩니다. | feedback-or-error, hint | — |
| src/content/chapter7.ts:9:269 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter7.ts:9:335 | text | 조건과 반복으로 여러 값을 골랐어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:3:37 | text | 함수 | learner-text-candidate | — |
| src/content/chapter8.ts:4:21 | text | 함수와 매개변수 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:33 | text | def로 자주 쓸 동작을 묶고 매개변수로 재료를 받습니다. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:69 | text | challenge | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:4:82 | text | def greet(name): print("안녕,", name) greet("민준") | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:141 | text | 안녕, 민준 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:161 | text | 다른 이름으로 함수를 호출하세요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:189 | text | greet 괄호 안의 이름을 바꿔요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:4:230 | text | contains | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:4:249 | text | 안녕 | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:4:265 | text | 함수에 입력을 전달했어요. | feedback-or-error, hint, input | abstract-or-formal |
| src/content/chapter8.ts:4:293 | text | changed | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:4:325 | text | 다른 이름을 함수에 전달했어요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:5:21 | text | 지역 변수 | feedback-or-error, hint | — |
| src/content/chapter8.ts:5:30 | text | 함수 안에서 만든 변수는 그 함수 안에서 주로 사용됩니다. | feedback-or-error, hint | — |
| src/content/chapter8.ts:5:66 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:5:79 | text | def make_message(): message = "함수 안의 메시지" return message print(make_message()) | feedback-or-error, hint | long-or-dense |
| src/content/chapter8.ts:5:174 | text | 함수 안의 메시지 | feedback-or-error, hint | — |
| src/content/chapter8.ts:5:197 | text | 함수가 돌려줄 메시지를 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:5:225 | text | return 뒤 문자열을 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:5:264 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:5:296 | text | 함수가 돌려줄 나만의 메시지를 만들었어요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:6:21 | text | global은 신중하게 | learner-text-candidate | — |
| src/content/chapter8.ts:6:37 | text | 바깥 변수와 안쪽 변수를 섞기보다 매개변수와 return으로 값을 주고받는 편이 안전합니다. | learner-text-candidate | — |
| src/content/chapter8.ts:7:21 | text | 기본 인수 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:30 | text | 매개변수에 기본값을 정하면 입력을 생략해도 함수가 동작합니다. | feedback-or-error, hint, input | abstract-or-formal |
| src/content/chapter8.ts:7:68 | text | challenge | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:7:81 | text | def cheer(name="친구"): print(name, "힘내!") cheer() cheer("지우") | feedback-or-error, hint, input | long-or-dense |
| src/content/chapter8.ts:7:154 | text | 친구 힘내! 지우 힘내! | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:182 | text | 기본 이름을 바꾸고 다시 실행하세요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:212 | text | name="친구" 부분을 고쳐요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:251 | text | contains | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:7:270 | text | 힘내 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:286 | text | 기본 인수를 사용했어요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:7:313 | text | changed | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:7:345 | text | 기본 인수를 나만의 이름으로 바꿨어요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:8:21 | text | 키워드 인수 | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:31 | text | 매개변수 이름을 함께 적으면 순서를 헷갈리지 않고 값을 전달할 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:77 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:8:90 | text | def profile(name, grade): print(name, grade, "학년") profile(grade=2, name="민준") | feedback-or-error, hint | long-or-dense |
| src/content/chapter8.ts:8:180 | text | 민준 2 학년 | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:201 | text | 키워드 인수의 값을 나에게 맞게 바꾸세요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:234 | text | name과 grade 뒤의 값만 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:277 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:8:296 | text | 학년 | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:312 | text | 키워드로 값을 전달했어요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:8:340 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:8:372 | text | 나에게 맞는 키워드 인수 값을 전달했어요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:9:21 | text | 가변 인수 | feedback-or-error, hint | — |
| src/content/chapter8.ts:9:30 | text | 몇 개가 들어올지 모르는 값은 *args로 받아 반복할 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter8.ts:9:72 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:85 | text | def total(*numbers): return sum(numbers) numbers = (2, 3, 5) print("숫자 개수:", len(numbers)) print("합계:", total(*numbers)) | feedback-or-error, hint | long-or-dense |
| src/content/chapter8.ts:9:219 | text | 숫자 개수: 3 합계: 10 | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:249 | text | 숫자를 하나 더 넣어 합계를 확인하세요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:9:281 | text | numbers에 숫자를 하나 추가하고 total(*numbers)를 실행해요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:9:345 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:364 | text | 숫자 개수: 4 | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:386 | text | 숫자를 하나 더 넣었어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:414 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:9:446 | text | 추가한 숫자까지 합계를 확인했어요. | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:10:21 | text | return | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:31 | text | return은 함수의 계산 결과를 호출한 곳으로 돌려줍니다. | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:68 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:10:81 | text | def average(a, b): return (a + b) / 2 print("평균:", average(80, 90)) | feedback-or-error, hint | long-or-dense |
| src/content/chapter8.ts:10:160 | text | 평균: 85.0 | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:182 | text | 두 점수를 바꾸어 평균을 계산하세요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:212 | text | average 호출 부분의 두 숫자를 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:258 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:10:277 | text | 평균 | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:293 | text | return 결과를 사용했어요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:10:324 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter8.ts:10:356 | text | 바꾼 점수의 평균을 계산했어요. | feedback-or-error, hint | — |
| src/content/chapter8.ts:11:21 | text | 문서 문자열 | feedback-or-error, hint, instruction | — |
| src/content/chapter8.ts:11:31 | text | 함수 첫 줄의 설명 문자열은 함수의 목적을 알려 주는 작은 안내문입니다. | feedback-or-error, hint, instruction | — |
| src/content/chapter8.ts:11:75 | text | challenge | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter8.ts:11:88 | text | def square(number): """숫자를 제곱해 돌려줘요.""" return number ** 2 print(square(4)) | feedback-or-error, hint, instruction | long-or-dense |
| src/content/chapter8.ts:11:196 | text | 제곱할 숫자를 바꾸세요. | feedback-or-error, hint, instruction | — |
| src/content/chapter8.ts:11:219 | text | square 호출 숫자를 고쳐요. | feedback-or-error, hint, instruction | — |
| src/content/chapter8.ts:11:258 | text | changed | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter8.ts:11:290 | text | 바꾼 숫자의 제곱 결과를 확인했어요. | feedback-or-error, hint, instruction | — |
| src/content/chapter8.ts:12:21 | text | 함수 확인 실습 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:33 | text | 할인 가격 함수를 만들며 입력·처리·결과의 흐름을 정리합니다. | feedback-or-error, hint, input | abstract-or-formal, multiple-actions |
| src/content/chapter8.ts:12:71 | text | challenge | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:12:84 | text | def discount(price, rate): return price * (1 - rate / 100) print("할인 가격:", int(discount(10000, 20))) | feedback-or-error, hint, input | long-or-dense |
| src/content/chapter8.ts:12:196 | text | 할인 가격: 8000 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:221 | text | 가격이나 할인율을 바꾸어 보세요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:249 | text | discount 호출의 숫자를 바꾸면 됩니다. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:295 | text | contains | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:12:314 | text | 할인 가격 | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:333 | text | 함수로 계산을 재사용했어요. | feedback-or-error, hint, input | — |
| src/content/chapter8.ts:12:362 | text | changed | feedback-or-error, hint, input | repeated-text |
| src/content/chapter8.ts:12:394 | text | 바꾼 가격과 할인율로 다시 계산했어요. | feedback-or-error, hint, input | — |
| src/content/chapter9.ts:3:37 | text | 모듈 | learner-text-candidate | — |
| src/content/chapter9.ts:4:21 | text | import와 코드 묶음 | feedback-or-error, hint | — |
| src/content/chapter9.ts:4:38 | text | import는 다른 파일이나 표준 라이브러리의 도구를 가져오는 명령입니다. | feedback-or-error, hint | — |
| src/content/chapter9.ts:4:83 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:4:96 | text | import math print(round(math.sqrt(25))) | feedback-or-error, hint | — |
| src/content/chapter9.ts:4:155 | text | math 도구로 다른 계산을 해 보세요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:4:187 | text | math.pi 또는 math.ceil()을 찾아 사용해요. | feedback-or-error, hint | multiple-conditions |
| src/content/chapter9.ts:4:240 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:4:272 | text | 모듈의 다른 도구로 계산했어요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:5:21 | text | from ... import | feedback-or-error, hint | — |
| src/content/chapter9.ts:5:40 | text | 모듈 이름을 매번 쓰기 싫을 때 필요한 이름만 가져올 수 있습니다. | feedback-or-error, hint | — |
| src/content/chapter9.ts:5:81 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:5:94 | text | from math import pi print(round(pi, 2)) | feedback-or-error, hint | — |
| src/content/chapter9.ts:5:156 | text | pi의 자릿수를 바꾸어 출력하세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter9.ts:5:185 | text | round의 두 번째 숫자를 고쳐요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:5:226 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:5:258 | text | 원하는 자릿수로 모듈 값을 출력했어요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter9.ts:6:21 | text | __name__ 살펴보기 | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:38 | text | 파일이 직접 실행되는지 다른 코드에서 불린 것인지 구분할 때 __name__을 사용합니다. | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:92 | text | challenge | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter9.ts:6:105 | text | if __name__ == "__main__": print("이 파일을 직접 실행했어요") | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:164 | text | 이 파일을 직접 실행했어요 | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:192 | text | 직접 실행 안내 문장을 바꾸세요. | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:220 | text | print 안의 문자열을 고쳐요. | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:6:259 | text | changed | feedback-or-error, hint, instruction | repeated-text |
| src/content/chapter9.ts:6:291 | text | __name__ 조건 안의 안내 문장을 바꿨어요. | feedback-or-error, hint, instruction | — |
| src/content/chapter9.ts:7:21 | text | 사용자 모듈과 브라우저 제약 | learner-text-candidate | — |
| src/content/chapter9.ts:7:40 | text | 내 컴퓨터에서는 파일을 나누어 모듈을 만들 수 있지만, 이 브라우저 실습은 미리 준비된 표준 도구 중심입니다. | learner-text-candidate | long-or-dense |
| src/content/chapter9.ts:8:21 | text | dir()로 살펴보기 | feedback-or-error, hint | — |
| src/content/chapter9.ts:8:36 | text | dir()은 모듈이나 객체에서 사용할 수 있는 이름을 살펴보는 데 도움을 줍니다. | feedback-or-error, hint | — |
| src/content/chapter9.ts:8:85 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:8:98 | text | import math print("sqrt" in dir(math)) | feedback-or-error, hint | — |
| src/content/chapter9.ts:8:141 | text | True | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:8:159 | text | math에서 pi 이름도 있는지 확인하세요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:8:193 | text | sqrt를 pi로 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:8:231 | text | equals | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:8:248 | text | True | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:8:266 | text | dir()로 모듈의 이름을 찾아봤어요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:21 | text | 패키지와 모듈 정리 | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:35 | text | 여러 모듈을 폴더로 묶은 것이 패키지입니다. 기능별로 나누면 큰 프로그램도 읽기 쉬워집니다. | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:90 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:9:103 | text | import math print("도구 상자:", math.__name__) | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:150 | text | 도구 상자: math | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:175 | text | 다른 표준 모듈을 가져와 이름을 출력해 보세요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter9.ts:9:211 | text | random 같은 모듈도 시도할 수 있어요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:256 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:9:275 | text | 도구 상자 | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:294 | text | 모듈을 도구 상자로 이해했어요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:9:325 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:9:357 | text | 다른 표준 모듈의 이름을 출력했어요. | feedback-or-error, hint | abstract-or-formal |
| src/content/chapter9.ts:10:21 | text | 모듈 확인 실습 | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:33 | text | 필요한 기능을 모듈에서 가져와 원의 넓이를 계산합니다. | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:67 | text | challenge | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:10:80 | text | import math radius = 3 area = math.pi * radius ** 2 print("원의 넓이:", round(area, 2)) | feedback-or-error, hint | long-or-dense |
| src/content/chapter9.ts:10:170 | text | 원의 넓이: 28.27 | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:196 | text | 원의 반지름을 바꾸어 넓이를 관찰하세요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:228 | text | radius 숫자를 5로 바꿔 보세요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:270 | text | contains | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:10:289 | text | 원의 넓이 | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:308 | text | math 모듈을 사용해 계산했어요. | feedback-or-error, hint | — |
| src/content/chapter9.ts:10:341 | text | changed | feedback-or-error, hint | repeated-text |
| src/content/chapter9.ts:10:373 | text | 바꾼 반지름으로 원의 넓이를 다시 계산했어요. | feedback-or-error, hint | — |
| src/content/lessonFactory.ts:4:12 | text | explanation | learner-text-candidate | repeated-text |
| src/content/lessonFactory.ts:5:12 | text | tip | learner-text-candidate | repeated-text |
| src/content/lessonFactory.ts:5:26 | text | 작게 확인하기 | learner-text-candidate | — |
| src/content/lessonFactory.ts:5:43 | text | 한 번에 많이 바꾸지 말고 한 줄을 고친 뒤 실행 결과를 관찰해 보세요. | learner-text-candidate | — |
| src/content/lessonFactory.ts:8:89 | text | 이번 소단원에서 새로 만나는 파이썬 개념 | learner-text-candidate | — |
| src/content/lessonFactory.ts:24:10 | text | chapter-${chapter}-${order} | learner-text-candidate | — |
| src/content/lessonFactory.ts:24:50 | text | id | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/lessonFactory.ts:25:43 | text | 설명을 읽고 핵심 생각을 한 문장으로 정리할 수 있어요. | learner-text-candidate | — |
| src/content/lessonFactory.ts:25:81 | text | 예제 코드를 실행하고 결과를 관찰할 수 있어요. | learner-text-candidate | — |
| src/content/lessonFactory.ts:25:111 | text | 한 줄을 바꾸어 나만의 결과를 만들 수 있어요. | learner-text-candidate | — |
| src/content/updateHistory.ts:2:35 | text | 전체 도전 과제 감사 | feedback-or-error | — |
| src/content/updateHistory.ts:2:58 | text | 자유롭게 고르는 답·목록 추가·명확한 목표값을 구분해 여러 정답을 인정하도록 판정을 넓혔어요. | feedback-or-error | — |
| src/content/updateHistory.ts:3:35 | text | 도전 판정 개선 | learner-text-candidate | — |
| src/content/updateHistory.ts:3:55 | text | 활용 분야를 아무거나 하나 더 넣어도 통과하고, 출력 줄도 올바르게 확인해요. | learner-text-candidate | abstract-or-formal |
| src/content/updateHistory.ts:4:35 | text | 목차 확장 | instruction | — |
| src/content/updateHistory.ts:4:52 | text | 1장 안내와 2~11장 세부 소단원, 순차 잠금 해제를 추가했어요. | instruction | — |
| src/content/updateHistory.ts:5:35 | text | 교재 출처 안내 | instruction | — |
| src/content/updateHistory.ts:5:55 | text | 원저자·번역자·공식 원문·한국어판·CC BY-SA 4.0·코드 예제 조건을 1.3에 표시했어요. | instruction | long-or-dense, technical-or-internal |
| src/content/updateHistory.ts:6:35 | text | 첫 공개 | learner-text-candidate | — |
| src/content/updateHistory.ts:6:51 | text | 2장부터 11장까지 학습 흐름과 브라우저 Python 실습기를 만들었어요. | learner-text-candidate | — |
| src/content/updateHistory.ts:7:35 | text | 학습 안전장치 | learner-text-candidate | — |
| src/content/updateHistory.ts:7:54 | text | 5초 실행 제한, 출력 제한, Worker 중지·재시작을 추가했어요. | learner-text-candidate | abstract-or-formal |
| src/content/updateHistory.ts:11:13 | text | A Byte of Python 한국어판 | learner-text-candidate | — |
| src/content/updateHistory.ts:12:13 | text | A Byte of Python 원문 | learner-text-candidate | — |
| src/content/updateHistory.ts:13:13 | text | CC BY-SA 4.0 라이선스 | learner-text-candidate | technical-or-internal |
| src/features/learn/LessonContent.tsx:7:46 | text | {lesson.chapter === 2 && | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:89 | alt | 노트북으로 파이썬을 배우는 학생 | alt, feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:167 | text | none | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:218 | text | 파이썬 | feedback-or-error | repeated-text |
| src/features/learn/LessonContent.tsx:8:236 | text | 오늘의 첫 코드 | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:256 | text | 생각을 코드로 바꿔 보세요. | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:343 | text | CHAPTER {lesson.chapter} | feedback-or-error | technical-or-internal |
| src/features/learn/LessonContent.tsx:8:382 | text | 처음 만나는 | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:8:394 | text | 파이썬 | feedback-or-error | repeated-text |
| src/features/learn/LessonContent.tsx:8:436 | text | 한 줄씩, 직접 실행해요 | feedback-or-error | — |
| src/features/learn/LessonContent.tsx:9:70 | text | CHAPTER {String(lesson.chapter).padStart(2, '0')} · LESSON {lesson.order} | heading | long-or-dense, technical-or-internal |
| src/features/learn/LessonContent.tsx:10:41 | text | 오늘 할 일 | heading | — |
| src/features/learn/LessonContent.tsx:11:136 | text | ${concept.title ?? concept.type}-${index} | heading | — |
| src/features/learn/LessonContent.tsx:11:211 | text | {concept.type === 'example' ? 'TRY IT' : concept.type === 'tip' ? 'TIP' : concept.type === 'warning' ? 'NOTE' : 'CONCEPT'} | heading | long-or-dense, technical-or-internal |
| src/features/learn/LessonContent.tsx:11:230 | text | example | heading | repeated-text |
| src/features/learn/LessonContent.tsx:11:242 | text | TRY IT | heading | technical-or-internal |
| src/features/learn/LessonContent.tsx:11:270 | text | tip | heading | repeated-text |
| src/features/learn/LessonContent.tsx:11:278 | text | TIP | heading | repeated-text, technical-or-internal |
| src/features/learn/LessonContent.tsx:11:303 | text | warning | heading | repeated-text |
| src/features/learn/LessonContent.tsx:11:315 | text | NOTE | heading | technical-or-internal |
| src/features/learn/LessonContent.tsx:11:324 | text | CONCEPT | heading | technical-or-internal |
| src/features/learn/LessonContent.tsx:11:389 | text | {concept.code && | heading | — |
| src/features/learn/LessonContent.tsx:12:58 | text | glossary-title | heading | — |
| src/features/learn/LessonContent.tsx:12:105 | text | GLOSSARY | heading | technical-or-internal |
| src/features/learn/LessonContent.tsx:12:148 | text | 핵심 용어 | heading | — |
| src/features/learn/LessonContent.tsx:12:289 | text | {lesson.challenge && | heading, hint | — |
| src/features/learn/LessonContent.tsx:13:144 | text | true | heading, hint | repeated-text |
| src/features/learn/LessonContent.tsx:13:196 | text | YOUR TURN | heading, hint | technical-or-internal |
| src/features/learn/LessonContent.tsx:13:216 | text | 도전 과제 | heading, hint | — |
| src/features/learn/LessonContent.tsx:13:288 | text | 힌트 보기 | heading, hint | — |
| src/features/learn/LessonContent.tsx:13:353 | text | } {lesson.resources && | heading, hint | — |
| src/features/learn/LessonContent.tsx:14:79 | text | resource-title | heading | — |
| src/features/learn/LessonContent.tsx:14:126 | text | SOURCES | heading | technical-or-internal |
| src/features/learn/LessonContent.tsx:14:168 | text | 교재 출처와 라이선스 | heading | — |
| src/features/learn/LessonContent.tsx:14:252 | text | _blank | heading | repeated-text |
| src/features/learn/LessonContent.tsx:14:265 | text | noreferrer | heading | repeated-text |
| src/features/learn/LessonContent.tsx:14:319 | text | {resource.note ?? '↗'} | heading | — |
| src/features/learn/LessonContent.tsx:15:122 | text | ← 이전 | button-or-action | — |
| src/features/learn/LessonContent.tsx:15:291 | text | {completed ? '✓ 학습 완료됨' : canComplete ? '학습 완료' : lesson.completion === 'run' ? '코드를 먼저 실행해요' : lesson.completion === 'challenge' ? '도전을 통과해요' : '학습 완료'} | button-or-action | long-or-dense |
| src/features/learn/LessonContent.tsx:15:305 | text | ✓ 학습 완료됨 | button-or-action | — |
| src/features/learn/LessonContent.tsx:15:332 | text | 학습 완료 | button-or-action | repeated-text |
| src/features/learn/LessonContent.tsx:15:364 | text | run | button-or-action | repeated-text |
| src/features/learn/LessonContent.tsx:15:372 | text | 코드를 먼저 실행해요 | button-or-action | — |
| src/features/learn/LessonContent.tsx:15:410 | text | challenge | button-or-action | repeated-text |
| src/features/learn/LessonContent.tsx:15:424 | text | 도전을 통과해요 | button-or-action | — |
| src/features/learn/LessonContent.tsx:15:437 | text | 학습 완료 | button-or-action | repeated-text |
| src/features/learn/LessonContent.tsx:15:539 | text | 다음 학습 → | button-or-action | — |
| src/features/learn/LessonWorkspace.tsx:15:116 | text | lesson | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:127 | text | active | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:170 | text | lesson | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:221 | text | lesson | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:230 | text | 학습 내용 | button-or-action | — |
| src/features/learn/LessonWorkspace.tsx:15:278 | text | playground | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:293 | text | active | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:336 | text | playground | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:391 | text | playground | button-or-action | repeated-text |
| src/features/learn/LessonWorkspace.tsx:15:404 | text | 코드 실습 | button-or-action | — |
| src/features/playground/CodeEditor.tsx:18:18 | text | { const view = viewRef.current; if (view && view.state.doc.toString() !== value) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } }); }, [value]); return | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/playground/CodeEditor.tsx:19:62 | aria-label | Python 코드 편집기 | aria-label | — |
| src/features/playground/OutputConsole.tsx:3:196 | text | void; } export function OutputConsole({ state, outputs, errorHelp, challengeMessage }: Props) { return | heading, feedback-or-error, hint, input | long-or-dense, technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:57 | text | polite | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:136 | text | OUTPUT | heading, feedback-or-error, hint, input | technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:153 | text | 실행 결과 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:208 | text | {state === 'running' \|\| state === 'loading' ? '실행 중' : state === 'done' ? '완료' : state === 'error' ? '확인 필요' : state === 'timeout' ? '시간 초과' : state === 'stopped' ? '중지됨' : '대기 중'} | heading, feedback-or-error, hint, input | long-or-dense, technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:220 | text | running | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:243 | text | loading | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:255 | text | 실행 중 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:274 | text | done | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:283 | text | 완료 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:300 | text | error | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:310 | text | 확인 필요 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:330 | text | timeout | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:342 | text | 시간 초과 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:362 | text | stopped | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:374 | text | 중지됨 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:382 | text | 대기 중 | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:433 | text | {outputs.length === 0 && state === 'idle' && | heading, feedback-or-error, hint, input | technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:469 | text | idle | heading, feedback-or-error, hint, input | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:513 | text | 실행 버튼을 누르면 결과가 여기에 나타나요. | heading, feedback-or-error, hint, input | ambiguous-reference |
| src/features/playground/OutputConsole.tsx:6:625 | text | ${index}-${output.text} | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:668 | text | )}{state === 'loading' && | heading, feedback-or-error, hint, input | technical-or-internal |
| src/features/playground/OutputConsole.tsx:6:682 | text | loading | heading, feedback-or-error, hint, input | repeated-text |
| src/features/playground/OutputConsole.tsx:6:729 | text | 처음 한 번만 Python을 준비해요… | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:761 | text | {errorHelp && | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:868 | text | }{challengeMessage && | heading, feedback-or-error, hint, input | — |
| src/features/playground/OutputConsole.tsx:6:977 | text | {challengeMessage.passed ? '✓' : '↗'} | heading, feedback-or-error, hint, input | — |
| src/features/playground/PlaygroundPanel.tsx:20:39 | text | { setCode(next); onCodeChange(next); }; if (!lesson.starterCode) return | heading, input, instruction | long-or-dense |
| src/features/playground/PlaygroundPanel.tsx:21:106 | aria-label | 코드 실습 안내 | aria-label, heading, input, instruction | — |
| src/features/playground/PlaygroundPanel.tsx:21:149 | text | READ FIRST | heading, input, instruction | technical-or-internal |
| src/features/playground/PlaygroundPanel.tsx:21:170 | text | 읽기 단계 | heading, input, instruction | repeated-text |
| src/features/playground/PlaygroundPanel.tsx:21:183 | text | 가운데 설명을 읽고 핵심을 정리하면 다음 소단원이 열립니다. 다음 실행 단계에서 코드를 직접 다뤄 볼게요. | heading, input, instruction | long-or-dense |
| src/features/playground/PlaygroundPanel.tsx:21:256 | text | ; const needsRun = lesson.completion === 'run' ? runner.state !== 'done' : lesson.completion === 'challenge' && !challengeMessage?.passed; return | heading, button-or-action, feedback-or-error, hint, input, instruction | long-or-dense, technical-or-internal |
| src/features/playground/PlaygroundPanel.tsx:23:60 | aria-label | Python 코드 실습 | aria-label, heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:148 | text | LIVE LAB | heading, button-or-action, feedback-or-error, hint | technical-or-internal |
| src/features/playground/PlaygroundPanel.tsx:23:167 | text | 직접 실행해 보기 | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:337 | text | 초기화 | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:349 | text | {runner.state === 'running' \|\| runner.state === 'loading' ? | heading, button-or-action, feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/features/playground/PlaygroundPanel.tsx:23:368 | text | running | heading, button-or-action, feedback-or-error, hint | repeated-text |
| src/features/playground/PlaygroundPanel.tsx:23:398 | text | loading | heading, button-or-action, feedback-or-error, hint | repeated-text |
| src/features/playground/PlaygroundPanel.tsx:23:473 | text | ■ 중지 | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:585 | text | ▶ 코드 실행 | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:909 | text | true | heading, button-or-action, feedback-or-error, hint | repeated-text |
| src/features/playground/PlaygroundPanel.tsx:23:923 | text | 코드는 이 브라우저 안에서만 실행돼요. | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/PlaygroundPanel.tsx:23:991 | text | 실행 기록 지우기 | heading, button-or-action, feedback-or-error, hint | — |
| src/features/playground/challengeCheck.test.ts:6:7 | text | passes contains checks after the starter output changes | feedback-or-error | long-or-dense |
| src/features/playground/challengeCheck.test.ts:6:94 | text | 남은 금액: 1200 | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:6:109 | text | 남은 금액: 1400 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:6:133 | text | contains | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:6:152 | text | 남은 금액 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:6:171 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:6:215 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:7 | text | asks learners to change the starter code | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:7:79 | text | 남은 금액: 1400 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:94 | text | 남은 금액: 1400 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:118 | text | contains | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:137 | text | 남은 금액 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:156 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:7:201 | text | 시작 코드를 한 줄 이상 바꿔 보세요. | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:8:7 | text | returns learner feedback when output misses goal | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:8:87 | text | 다른 결과 | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:8:116 | text | equals | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:8:133 | text | 정답 | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:8:149 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:7 | text | accepts a real code change even when the output intentionally stays the same | feedback-or-error | long-or-dense |
| src/features/playground/challengeCheck.test.ts:9:115 | text | 주석은 설명을 도와줘요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:131 | text | 주석은 설명을 도와줘요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:156 | text | contains | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:175 | text | 주석 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:191 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:201 | text | # 나의 주석 print("주석은 설명을 도와줘요") | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:9:235 | text | # 오늘의 메모 print("주석은 설명을 도와줘요") | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:9:304 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:7 | text | rejects unchanged source code even when another output check would pass | feedback-or-error | long-or-dense |
| src/features/playground/challengeCheck.test.ts:10:110 | text | True | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:118 | text | True | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:135 | text | equals | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:152 | text | True | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:170 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:180 | text | print(True) | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:10:195 | text | print(True) | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:11:7 | text | passes when a learner appends 자동화 after the three starter outputs | feedback-or-error | long-or-dense |
| src/features/playground/challengeCheck.test.ts:11:104 | text | 웹 데이터 인공지능 자동화 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:11:125 | text | 웹 데이터 인공지능 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:11:150 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:11:183 | text | 새 활용 분야를 추가했어요. | feedback-or-error | abstract-or-formal, repeated-text |
| src/features/playground/challengeCheck.test.ts:11:205 | text | uses = ["웹", "데이터", "인공지능", "자동화"] for use in uses: print(use) | feedback-or-error | long-or-dense |
| src/features/playground/challengeCheck.test.ts:11:277 | text | uses = ["웹", "데이터", "인공지능"] for use in uses: print(use) | feedback-or-error | long-or-dense, repeated-text |
| src/features/playground/challengeCheck.test.ts:11:376 | text | 새 활용 분야를 추가했어요. | feedback-or-error | abstract-or-formal, repeated-text |
| src/features/playground/challengeCheck.test.ts:12:7 | text | rejects unchanged chapter 2.3 starter code | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:12:81 | text | 웹 데이터 인공지능 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:12:97 | text | 웹 데이터 인공지능 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:12:122 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:12:155 | text | 새 활용 분야를 추가했어요. | feedback-or-error | abstract-or-formal, repeated-text |
| src/features/playground/challengeCheck.test.ts:12:177 | text | uses = ["웹", "데이터", "인공지능"] for use in uses: print(use) | feedback-or-error | long-or-dense, repeated-text |
| src/features/playground/challengeCheck.test.ts:12:242 | text | uses = ["웹", "데이터", "인공지능"] for use in uses: print(use) | feedback-or-error | long-or-dense, repeated-text |
| src/features/playground/challengeCheck.test.ts:12:342 | text | 시작 코드를 한 줄 이상 바꿔 보세요. | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:15:32 | text | 웹 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:16:32 | text | 데이터 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:17:32 | text | 인공지능 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:18:32 | text | 자동화 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:19:32 | text | 무시할 오류 | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:21:26 | text | 웹 데이터 인공지능 자동화 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:22:36 | text | 웹 데이터 인공지능 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:22:61 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:22:94 | text | 새 활용 분야를 추가했어요. | feedback-or-error | abstract-or-formal, repeated-text |
| src/features/playground/challengeCheck.test.ts:22:116 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:22:127 | text | starter | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:22:172 | text | 새 활용 분야를 추가했어요. | feedback-or-error | abstract-or-formal, repeated-text |
| src/features/playground/challengeCheck.test.ts:25:28 | text | 나만의 문장 | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:25:38 | text | 시작 문장 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:25:56 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:25:88 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:25:98 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:25:109 | text | starter | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:25:154 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:28:32 | text | 시작 문장 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:28:50 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:28:82 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:28:92 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:28:103 | text | starter | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:28 | text | 시작 문장 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:37 | text | 시작 문장 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:55 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:87 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:97 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:29:108 | text | starter | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:32:29 | text | regex | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:32:54 | text | (?:^\| )(?:float\|bool)(?:$\| ) | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:32:100 | text | 좋아요 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:39:16 | text | contains | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:39:44 | text | 숫자 개수: 4 | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:39:66 | text | 개수를 확인했어요. | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:40:16 | text | changed | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:40:57 | text | 합계를 확인했어요. | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:42:28 | text | 숫자 개수: 4 합계: 42 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:42:48 | text | 숫자 개수: 3 합계: 10 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:43:28 | text | 숫자 개수: 3 합계: 42 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:43:48 | text | 숫자 개수: 3 합계: 10 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:46:29 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:46:71 | text | 비교했어요. | feedback-or-error | — |
| src/features/playground/challengeCheck.test.ts:47:28 | text | 준비 필요: 색종이 준비 완료: 가위 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:47:53 | text | 준비 필요: 색종이 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:48:28 | text | 준비 필요: 색종이 준비 필요: 가위 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:48:53 | text | 준비 필요: 색종이 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:51:29 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:51:71 | text | 목록을 확장했어요. | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:52:28 | text | 새 항목 첫 줄 둘째 줄 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:52:47 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:53:28 | text | 첫 줄 새 항목 둘째 줄 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:53:47 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:54:28 | text | 첫 줄 둘째 줄 새 항목 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:54:47 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:57:29 | text | appended | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:57:71 | text | 목록을 확장했어요. | feedback-or-error | repeated-text |
| src/features/playground/challengeCheck.test.ts:58:28 | text | 새 항목 첫 줄 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:58:41 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:59:28 | text | 둘째 줄 첫 줄 새 항목 | learner-text-candidate | — |
| src/features/playground/challengeCheck.test.ts:59:47 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:60:28 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.test.ts:60:41 | text | 첫 줄 둘째 줄 | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.ts:10:57 | text | 실행 결과를 살펴보고 스스로 설명해 보세요. | learner-text-candidate | — |
| src/features/playground/challengeCheck.ts:14:39 | text | 시작 코드를 한 줄 이상 바꿔 보세요. | learner-text-candidate | repeated-text |
| src/features/playground/challengeCheck.ts:37:60 | text | 아직 목표 결과와 달라요. 힌트를 참고해 한 줄씩 고쳐 보세요. | feedback-or-error, hint | — |
| src/features/playground/errorGuidance.test.ts:4:11 | text | getErrorGuidance | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/playground/errorGuidance.test.ts:5:7 | text | explains common Python errors in Korean | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:6:30 | text | NameError: name x is not defined | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:6:77 | text | NameError | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:7:30 | text | IndentationError: unexpected indent | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:7:88 | text | 들여쓰기 | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:9:7 | text | has a calm fallback for an unfamiliar error | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:10:30 | text | RuntimeError | feedback-or-error | — |
| src/features/playground/errorGuidance.test.ts:10:57 | text | Python 오류 | feedback-or-error | repeated-text |
| src/features/playground/errorGuidance.ts:2:17 | text | 괄호와 따옴표가 모두 닫혔는지, if·for 뒤에 콜론(:)이 있는지 확인해 보세요. | feedback-or-error | — |
| src/features/playground/errorGuidance.ts:3:22 | text | 같은 블록 안의 줄이 같은 칸만큼 들여쓰기 되었는지 확인해 보세요. | feedback-or-error | — |
| src/features/playground/errorGuidance.ts:4:15 | text | 변수 이름의 철자와, 변수를 사용하기 전에 먼저 만든 순서를 확인해 보세요. | feedback-or-error | — |
| src/features/playground/errorGuidance.ts:5:15 | text | 숫자와 글자처럼 서로 다른 자료형을 바로 계산하고 있지 않은지 살펴보세요. | feedback-or-error | multiple-actions |
| src/features/playground/errorGuidance.ts:6:23 | text | 나누는 값이 0이 되지 않도록 계산을 확인해 보세요. | feedback-or-error | multiple-actions |
| src/features/playground/errorGuidance.ts:11:71 | text | Python 오류 | feedback-or-error | repeated-text |
| src/features/playground/errorGuidance.ts:11:93 | text | 오류가 난 줄 주변을 천천히 읽고 변수와 괄호를 확인해 보세요. | feedback-or-error | — |
| src/features/playground/python.worker.ts:29:26 | text | OUTPUT_LIMIT | feedback-or-error | — |
| src/features/playground/python.worker.ts:34:51 | text | capture(text, 'stderr') }); await pyodide.runPythonAsync(code, { globals: pyodide.toPy({}) }); send('done'); } catch (error) { const message = error instanceof Error ? error.message : String(error); if (message.includes('OUTPUT_LIMIT')) { if (!outputLimitSent) send('output-limit'); } else send('error', { message }); } } self.onmessage = (event: MessageEvent | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/playground/python.worker.ts:40:16 | text | error | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:28 | text | idle | feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/hooks/usePythonRunner.ts:4:37 | text | loading | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:49 | text | running | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:61 | text | done | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:70 | text | error | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:80 | text | stopped | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:4:92 | text | timeout | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:11:57 | text | ([]); const [errorHelp, setErrorHelp] = useState | feedback-or-error, hint | technical-or-internal |
| src/hooks/usePythonRunner.ts:20:44 | text | { stop(); setOutputs([]); setErrorHelp(undefined); setState('running'); const worker = new Worker(new URL('../features/playground/python.worker.ts', import.meta.url), { type: 'module' }); workerRef.current = worker; worker.onmessage = (event: MessageEvent | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/hooks/usePythonRunner.ts:21:64 | text | running | feedback-or-error, hint | repeated-text |
| src/hooks/usePythonRunner.ts:29:21 | text | output-limit | feedback-or-error | — |
| src/hooks/usePythonRunner.ts:29:80 | text | 출력이 너무 많아 실행을 멈췄어요. 반복문을 확인해 보세요. | feedback-or-error | abstract-or-formal |
| src/hooks/usePythonRunner.ts:29:123 | text | status | feedback-or-error | — |
| src/hooks/usePythonRunner.ts:29:142 | text | error | feedback-or-error | repeated-text |
| src/hooks/usePythonRunner.ts:30:21 | text | error | feedback-or-error, hint | repeated-text |
| src/hooks/usePythonRunner.ts:30:153 | text | 오류 | feedback-or-error, hint | — |
| src/hooks/usePythonRunner.ts:30:165 | text | stderr | feedback-or-error, hint | — |
| src/hooks/usePythonRunner.ts:30:184 | text | error | feedback-or-error, hint | repeated-text |
| src/hooks/usePythonRunner.ts:32:57 | text | 실행 오류 | feedback-or-error, hint | — |
| src/hooks/usePythonRunner.ts:32:98 | text | error | feedback-or-error, hint | repeated-text |
| src/hooks/usePythonRunner.ts:33:64 | text | 5초가 지나 실행을 멈췄어요. 반복문이 끝나는지 확인해 보세요. | learner-text-candidate | — |
| src/hooks/usePythonRunner.ts:38:102 | text | idle | feedback-or-error, hint | missing-term-explanation, repeated-text, technical-or-internal |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
