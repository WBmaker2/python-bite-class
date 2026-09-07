# 반복 코드 용어 복습 보강 보고서

## 범위

- 전체 1~11단원 중 실행·예제 코드가 있는 54개 레슨을 명시적으로 감사하고, 시작 코드와 가이드 예제에서 반복되는 초급 Python 기능을 레슨별 용어집에 다시 연결했습니다.
- makeLesson이 기존 레슨 용어를 보존한 뒤 공통 정의를 추가하므로, 이미 자세히 설명한 항목은 유지하고 같은 레슨 안의 정확한 중복은 만들지 않습니다.
- 코드 문자열을 정규식으로 추측해 변수명·문자열·곱셈을 잘못 용어로 만드는 방식은 사용하지 않았습니다. 레슨별 매핑이 실제 코드와 힌트의 학습 의도를 기준으로 관리됩니다.

## 보강 항목

- 내장 함수: print(), len(), sum(), int(), round(), type(), dir(), range()
- 흐름: for, in, if, else, while, break, continue, def, return
- 자료 구조·메서드: 리스트, 튜플, 딕셔너리, 인덱스, 언패킹, items(), get(), append(), add(), upper(), 리스트 컴프리헨션
- 연산: 할당·복합 할당, 사칙 연산, 몫·나머지, 비교, 거듭제곱
- 모듈: math, dir(math), math.sqrt(), math.sqrt(25), sqrt 이름과 괄호를 붙인 호출의 차이, pi, math.pi, True/False
- 11.8의 빈 리스트 조건: 항목이 없으면 거짓, 항목이 있으면 참으로 판단되는 흐름

## 검증

- 9.5 용어집에 sqrt, math.sqrt(25), dir(math), pi, True, False가 도달하는지 회귀 테스트로 확인했습니다.
- 9.5 학습자 화면의 핵심 용어 영역에 sqrt와 math.sqrt(25)의 설명이 실제로 렌더링되는지 UI 회귀 테스트로 확인했습니다.
- 7.4, 9.7, 10.7, 11.4, 11.8의 반복·연산·메서드·언패킹 항목을 회귀 테스트에 추가했습니다.
- 모든 레슨 용어 항목의 표시 이름 중복을 검사합니다.
- 확인 명령: npm run lint, npm run typecheck, npm test (8개 파일·50개 테스트), npm run build

## 한계와 참고 자료

- 이번 변경은 코드 예시의 읽기 지원을 위한 용어집 보강이며, 학습 목표·시작 코드·도전 판정·진도 정책은 바꾸지 않았습니다. 실제 학생 브라우저 사용성 검증은 별도로 수행하지 않았습니다.
- Python 공식 참고: [dir() 내장 함수](https://docs.python.org/ko/3/library/functions.html#dir), [math.sqrt()](https://docs.python.org/ko/3/library/math.html#math.sqrt), [자료 구조와 리스트 컴프리헨션](https://docs.python.org/ko/3/tutorial/datastructures.html)
