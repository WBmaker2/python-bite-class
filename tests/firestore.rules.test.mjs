/* global process, URL, fetch */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, before, beforeEach, test } from 'node:test';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// The temporary module root keeps this harness runnable before the workspace
// installs @firebase/rules-unit-testing. CI can omit the variable after adding
// that package as a dev dependency.
const moduleRoot = process.env.FIREBASE_RULES_TEST_NODE_MODULES
  ? pathToFileURL(path.resolve(process.env.FIREBASE_RULES_TEST_NODE_MODULES) + path.sep)
  : new URL('../node_modules/', import.meta.url);
const [{ assertFails, assertSucceeds, initializeTestEnvironment }, firestore, { createMockUserToken }] = await Promise.all([
  import(new URL('@firebase/rules-unit-testing/dist/esm/index.esm.js', moduleRoot)),
  import(new URL('firebase/firestore/dist/index.mjs', moduleRoot)),
  import(new URL('@firebase/util/dist/node-esm/index.node.esm.js', moduleRoot)),
]);
const {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} = firestore;

const PROJECT_ID = 'demo-python-bite-class';
const RULES_PATH = new URL('../firestore.rules', import.meta.url);
let testEnv;

const teacherClaims = {
  email: 'wbmaker01@gmail.com',
  email_verified: true,
  firebase: { sign_in_provider: 'google.com' },
};

const anonymousClaims = (extra = {}) => ({
  firebase: { sign_in_provider: 'anonymous' },
  ...extra,
});

function lessonRow(overrides = {}) {
  return {
    lessonId: 'chapter-1-4',
    title: '첫 실행 준비',
    completion: 'run',
    completed: true,
    status: 'success',
    submittedCode: 'print("안녕")',
    lastExecutedCode: 'print("안녕")',
    lastRunStatus: 'done',
    lastRunPassed: true,
    lastRunAt: '2026-09-10T00:00:00.000Z',
    lastSuccessCode: 'print("안녕")',
    lastSuccessAt: '2026-09-10T00:00:00.000Z',
    outputSummary: '안녕',
    ...overrides,
  };
}

function submission(uid, overrides = {}) {
  return {
    schemaVersion: 1,
    studentUid: uid,
    profileId: 'profile-1',
    school: 'QA 테스트학교',
    name: '김학생',
    curriculumVersion: '2026-09',
    submittedAt: serverTimestamp(),
    requiredLessonCount: 1,
    completedRequiredCount: 1,
    progressJson: JSON.stringify([lessonRow()]),
    ...overrides,
  };
}

function progressJsonOfLength(length) {
  const empty = lessonRow({ submittedCode: '' });
  const emptyLength = JSON.stringify([empty]).length;
  return JSON.stringify([lessonRow({ submittedCode: 'x'.repeat(length - emptyLength) })]);
}

function restFields(uid, name = '김REST학생') {
  return {
    schemaVersion: { integerValue: '1' },
    studentUid: { stringValue: uid },
    profileId: { stringValue: 'profile-rest' },
    school: { stringValue: 'QA REST 테스트학교' },
    name: { stringValue: name },
    curriculumVersion: { stringValue: '2026-09' },
    requiredLessonCount: { integerValue: '1' },
    completedRequiredCount: { integerValue: '1' },
    progressJson: { stringValue: JSON.stringify([lessonRow()]) },
  };
}

async function restCommit(id, uid, token, name) {
  return fetch(`http://127.0.0.1:8080/v1/projects/${PROJECT_ID}/databases/(default)/documents:commit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      writes: [{
        update: { name: `projects/${PROJECT_ID}/databases/(default)/documents/submissions/${id}`, fields: restFields(uid, name) },
        updateTransforms: [{ fieldPath: 'submittedAt', setToServerValue: 'REQUEST_TIME' }],
      }],
    }),
  });
}

function student(uid, extra = {}) {
  return testEnv.authenticatedContext(uid, anonymousClaims(extra)).firestore();
}

function teacher(extra = {}) {
  return testEnv.authenticatedContext('teacher-uid', { ...teacherClaims, ...extra }).firestore();
}

function namedDoc(db, id = 'submission-1') {
  return doc(db, 'submissions', id);
}

async function createStudent(id = 'submission-1', uid = 'student-a', overrides = {}) {
  return assertSucceeds(setDoc(namedDoc(student(uid), id), submission(uid, overrides)));
}

before(async () => {
  const rules = await readFile(RULES_PATH, 'utf8');
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { host: '127.0.0.1', port: 8080, rules },
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

after(async () => {
  await testEnv?.cleanup();
});

test('비인증 사용자는 제출을 만들거나 읽을 수 없다', async () => {
  const unauthenticated = testEnv.unauthenticatedContext().firestore();
  await assertFails(setDoc(namedDoc(unauthenticated), submission('student-a')));
  await assertFails(getDoc(namedDoc(unauthenticated)));
});

test('익명 학생은 자신의 유효한 제출만 만들고 읽을 수 있다', async () => {
  await createStudent();
  await assertSucceeds(getDoc(namedDoc(student('student-a'))));
  await assertFails(setDoc(namedDoc(student('student-b')), submission('student-a')));
});

test('학생은 다른 학생 자료를 읽거나 목록으로 열람할 수 없다', async () => {
  await createStudent();
  await assertFails(getDoc(namedDoc(student('student-b'))));
  await assertFails(getDocs(collection(student('student-b'), 'submissions')));
  await assertFails(getDocs(collection(student('student-a'), 'submissions')));
});

test('학생은 자신의 제출을 최신 자료로 수정할 수 있지만 삭제할 수 없다', async () => {
  await createStudent();
  const db = student('student-a');
  await assertSucceeds(updateDoc(namedDoc(db), { name: '바뀐이름', submittedAt: serverTimestamp() }));
  await assertFails(updateDoc(namedDoc(db), { studentUid: 'student-b', submittedAt: serverTimestamp() }));
  await assertFails(deleteDoc(namedDoc(db)));
});

test('검증된 wbmaker01 Google 교사는 제출을 읽고 목록을 보고 삭제할 수 있다', async () => {
  await createStudent();
  await assertSucceeds(getDoc(namedDoc(teacher())));
  const result = await assertSucceeds(getDocs(collection(teacher(), 'submissions')));
  assert.equal(result.size, 1);
  await assertFails(updateDoc(namedDoc(teacher()), { name: '교사 수정' }));
  await assertSucceeds(deleteDoc(namedDoc(teacher())));
});

test('교사 이메일·인증·제공자 조건을 위조한 토큰은 열람할 수 없다', async () => {
  await createStudent();
  const cases = [
    { email: 'wbmaker01@gmail.com', email_verified: false, firebase: { sign_in_provider: 'google.com' } },
    { email: 'wbmaker01@gmail.com', email_verified: true, firebase: { sign_in_provider: 'password' } },
    { email: 'attacker@example.com', email_verified: true, firebase: { sign_in_provider: 'google.com' } },
    { role: 'teacher', firebase: { sign_in_provider: 'anonymous' } },
  ];
  for (const [index, claims] of cases.entries()) {
    const db = testEnv.authenticatedContext(`spoof-${index}`, claims).firestore();
    await assertFails(getDoc(namedDoc(db)));
    await assertFails(getDocs(collection(db, 'submissions')));
  }
});

test('학생이 입력한 role 또는 teacher 이메일은 익명 제공자의 권한을 바꾸지 않는다', async () => {
  const db = testEnv.authenticatedContext('spoof-student', {
    email: 'wbmaker01@gmail.com',
    email_verified: true,
    role: 'teacher',
    firebase: { sign_in_provider: 'anonymous' },
  }).firestore();
  await assertFails(getDocs(collection(db, 'submissions')));
  await assertFails(getDoc(namedDoc(db)));
});

test('루트 필드가 빠졌거나 추가된 제출은 거부된다', async () => {
  const missing = submission('student-a');
  delete missing.name;
  await assertFails(setDoc(namedDoc(student('student-a'), 'missing-field'), missing));

  await assertFails(setDoc(namedDoc(student('student-a'), 'extra-field'), {
    ...submission('student-a'),
    role: 'teacher',
  }));
});

test('클라이언트가 고정한 제출 시각은 거부되고 서버 시각만 허용된다', async () => {
  await assertFails(setDoc(namedDoc(student('student-a')), {
    ...submission('student-a'),
    submittedAt: Timestamp.fromMillis(Date.parse('2020-01-01T00:00:00.000Z')),
  }));
  await createStudent('server-time');
  const saved = await assertSucceeds(getDoc(namedDoc(student('student-a'), 'server-time')));
  assert.equal(saved.exists(), true);
  assert.equal(saved.data().submittedAt instanceof Timestamp, true);
});

test('진도 합계가 범위를 벗어나면 거부된다', async () => {
  await assertFails(setDoc(namedDoc(student('student-a'), 'too-many'), submission('student-a', {
    completedRequiredCount: 2,
  })));
  await assertFails(setDoc(namedDoc(student('student-a'), 'negative'), submission('student-a', {
    completedRequiredCount: -1,
  })));
  await assertFails(setDoc(namedDoc(student('student-a'), 'fraction'), submission('student-a', {
    requiredLessonCount: 1.5,
  })));
});

test('제출 자료의 크기 제한과 단계 자료 형식을 지킨다', async () => {
  await assertFails(setDoc(namedDoc(student('student-a'), 'school-too-long'), submission('student-a', {
    school: '가'.repeat(121),
  })));
  await assertSucceeds(setDoc(namedDoc(student('student-a'), 'payload-at-limit'), submission('student-a', {
    progressJson: progressJsonOfLength(480000),
  })));
  await assertFails(setDoc(namedDoc(student('student-a'), 'payload-too-large'), submission('student-a', {
    progressJson: progressJsonOfLength(480001),
  })));
  await assertFails(setDoc(namedDoc(student('student-a'), 'malformed-progress-json-type'), submission('student-a', {
    progressJson: 12,
  })));
});

test('학생 UID를 다른 값으로 제출할 수 없다', async () => {
  await assertFails(setDoc(namedDoc(student('student-a')), submission('student-b')));
});

test('REST commit은 같은 제출 ID를 최신 자료로 덮어쓰고 REQUEST_TIME을 갱신한다', async () => {
  const uid = 'student-rest';
  const id = 'submission-rest-retry';
  const token = createMockUserToken({
    sub: uid,
    user_id: uid,
    firebase: { sign_in_provider: 'anonymous' },
  }, PROJECT_ID);

  const first = await restCommit(id, uid, token);
  assert.equal(first.status, 200);
  const firstBody = await first.json();
  assert.equal(typeof firstBody.commitTime, 'string');

  const ack = await fetch(`http://127.0.0.1:8080/v1/projects/${PROJECT_ID}/databases/(default)/documents/submissions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(ack.status, 200);
  const record = await ack.json();
  assert.ok(
    Math.abs(Date.parse(record.fields.submittedAt.timestampValue) - Date.parse(firstBody.commitTime)) <= 1000,
    'stored submittedAt should match the commit server time within one second',
  );
  assert.equal(record.fields.studentUid.stringValue, uid);

  const retry = await restCommit(id, uid, token, '김REST최신학생');
  assert.equal(retry.status, 200);
  const updated = await fetch(`http://127.0.0.1:8080/v1/projects/${PROJECT_ID}/databases/(default)/documents/submissions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(updated.status, 200);
  const updatedRecord = await updated.json();
  assert.equal(updatedRecord.fields.name.stringValue, '김REST최신학생');
  assert.ok(Date.parse(updatedRecord.fields.submittedAt.timestampValue) >= Date.parse(record.fields.submittedAt.timestampValue));
});
