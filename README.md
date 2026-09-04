# 파이썬 한입 교실

중학생이 파이썬의 기초 문법을 짧은 설명과 바로 실행해 보는 코드 실험으로 익히는 교육용 웹 앱입니다. 1장 「이 프로그램 소개」에서 사용법과 출처를 확인한 뒤, 『A Byte of Python』의 2장 「파이썬 소개」부터 11장 「실생활 문제 해결」까지를 세부 소단원 순서로 학습합니다.

## 공개 학습 화면

- [파이썬 한입 교실 바로가기](https://wbmaker2.github.io/python-bite-class/)
- [GitHub 저장소](https://github.com/WBmaker2/python-bite-class)

## 앱 구조

```text
src/
├── content/       # 2~11장 학습 콘텐츠와 콘텐츠 타입
├── components/    # 목차, 헤더, 업데이트 내역
├── features/learn # 설명문과 학습 흐름
├── features/playground
│   ├── CodeEditor.tsx       # 파이썬 코드 편집기
│   ├── OutputConsole.tsx    # 실행 결과와 오류 안내
│   └── python.worker.ts     # Pyodide 실행 워커
├── hooks/         # 실행 상태와 학습 진도 저장
└── styles/        # 반응형 레이아웃과 디자인 토큰
```

화면은 왼쪽 세로 목차, 가운데 학습 설명, 오른쪽 코드 실험실의 3열 구조입니다. 좁은 화면에서는 목차와 학습 영역을 먼저 보여 주고 코드 실험실을 이어서 배치합니다.

## 주요 기능

- 1장 안내와 2~11장 계층형 목차, 장별 핵심 개념·예제·미션
- 필수 읽기·실행·도전 단계를 완료해야 다음 소단원이 열리고, 선택 참고 단계는 건너뛸 수 있는 순차 학습
- 장별 진도, 잠김·진행·완료 상태와 새로고침 후 진도 복원
- CodeMirror 기반 파이썬 편집 및 실행
- 실행 결과, 오류 메시지, 중학생 눈높이 오류 도움말 표시
- 학습 완료 상태를 브라우저 `localStorage`에 저장
- 업데이트 내역과 교재 출처를 앱 안에서 확인
- 키보드 탐색, 명확한 포커스, 모션 줄이기 설정 지원

## 코드 실행 안전장치

코드는 서버로 전송하지 않고 브라우저의 Web Worker 안에서 Pyodide로 실행합니다. 실행 시 다음 제한을 적용합니다.

- 실행 시간 5초 제한 및 무한 반복 중단
- 출력 300줄 또는 30KB 제한
- 실행 중 취소와 워커 재시작
- 출력 스트림 캡처 및 오류의 학습용 안내 변환
- `localStorage`에는 진도와 마지막 코드만 저장하고 외부 전송은 하지 않음

Pyodide 런타임은 CDN에서 처음 실행할 때 내려받으므로 첫 실행에는 잠시 기다림이 필요할 수 있습니다.

## 로컬 실행과 검증

Node.js 22 이상을 권장합니다.

```bash
npm ci
npm run dev
```

품질 검증 명령은 다음과 같습니다.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 교재 출처와 라이선스

학습 내용은 Swaroop C H의 『A Byte of Python』을 바탕으로 중학생용으로 요약·재구성했습니다. 원문은 [A Byte of Python 원문](https://python.swaroopch.com/)에서 확인할 수 있으며, 한국어 번역 참고본은 [Byte of Python 한국어판](https://byteofpython-korean.sourceforge.net/byte_of_python.html)입니다.

원문 교재의 저작자 표시는 다음과 같습니다.

> Swaroop C H, *A Byte of Python*. Licensed under the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0). 한국어 번역본의 번역자와 번역 라이선스는 [한국어판 출처](https://byteofpython-korean.sourceforge.net/byte_of_python.html)를 함께 확인해 주세요.

코드 예제는 교재에 안내된 BSD 계열 조건을 존중하며, 이 저장소의 앱 코드 라이선스와 교재의 라이선스는 별도로 확인해야 합니다. 이 앱은 교재의 원문을 그대로 재배포하지 않고 학습 목적에 맞게 요약한 콘텐츠를 제공합니다.

## 구현 계획

- [전체 학습 구조·화면 설계·콘텐츠 모델·실행 안전장치 계획](work/python-education-app-plan.md)

## 버전

현재 버전은 [`VERSION`](VERSION)에서 확인할 수 있으며, 변경 내역은 [`CHANGELOG.md`](CHANGELOG.md)에 기록합니다.
