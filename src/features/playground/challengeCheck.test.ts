import { describe, expect, it } from 'vitest';
import { checkChallenge } from './challengeCheck';
import { combineStdoutOutput } from './outputText';

describe('checkChallenge', () => {
  it('passes contains checks after the starter output changes', () => expect(checkChallenge('남은 금액: 1200', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: true, message: '좋아요' }));
  it('asks learners to change the starter code', () => expect(checkChallenge('남은 금액: 1400', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' }));
  it('returns learner feedback when output misses goal', () => expect(checkChallenge('다른 결과', undefined, [{ mode: 'equals', value: '정답', feedback: '좋아요' }]).passed).toBe(false));
  it('accepts a real code change even when the output intentionally stays the same', () => expect(checkChallenge('주석은 설명을 도와줘요', '주석은 설명을 도와줘요', [{ mode: 'contains', value: '주석', feedback: '좋아요' }], '# 나의 주석\nprint("주석은 설명을 도와줘요")', '# 오늘의 메모\nprint("주석은 설명을 도와줘요")')).toEqual({ passed: true, message: '좋아요' }));
  it('rejects unchanged source code even when another output check would pass', () => expect(checkChallenge('True', 'True', [{ mode: 'equals', value: 'True', feedback: '좋아요' }], 'print(True)', 'print(True)').passed).toBe(false));
  it('passes when a learner appends 자동화 after the three starter outputs', () => expect(checkChallenge('웹\n데이터\n인공지능\n자동화', '웹\n데이터\n인공지능', [{ mode: 'appended', value: '', feedback: '새 활용 분야를 추가했어요.' }], 'uses = ["웹", "데이터", "인공지능", "자동화"]\nfor use in uses:\n    print(use)', 'uses = ["웹", "데이터", "인공지능"]\nfor use in uses:\n    print(use)')).toEqual({ passed: true, message: '새 활용 분야를 추가했어요.' }));
  it('rejects unchanged chapter 2.3 starter code', () => expect(checkChallenge('웹\n데이터\n인공지능', '웹\n데이터\n인공지능', [{ mode: 'appended', value: '', feedback: '새 활용 분야를 추가했어요.' }], 'uses = ["웹", "데이터", "인공지능"]\nfor use in uses:\n    print(use)', 'uses = ["웹", "데이터", "인공지능"]\nfor use in uses:\n    print(use)')).toEqual({ passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' }));
  it('preserves line boundaries from separate batched stdout items', () => {
    const output = combineStdoutOutput([
      { kind: 'stdout', text: '웹' },
      { kind: 'stdout', text: '데이터' },
      { kind: 'stdout', text: '인공지능' },
      { kind: 'stdout', text: '자동화' },
      { kind: 'stderr', text: '무시할 오류' },
    ]);
    expect(output).toBe('웹\n데이터\n인공지능\n자동화');
    expect(checkChallenge(output, '웹\n데이터\n인공지능', [{ mode: 'appended', value: '', feedback: '새 활용 분야를 추가했어요.' }], 'changed', 'starter')).toEqual({ passed: true, message: '새 활용 분야를 추가했어요.' });
  });
  it('accepts any non-empty output that differs for a free-choice challenge', () => {
    expect(checkChallenge('나만의 문장', '시작 문장', [{ mode: 'changed', value: '', feedback: '좋아요' }], 'changed', 'starter')).toEqual({ passed: true, message: '좋아요' });
  });
  it('accepts a meaningful code change when the final result stays the same', () => {
    const starter = 'score = 10\nscore += 5\nscore -= 2\nprint(score)';
    const changed = 'score = 10\nscore += 6\nscore -= 3\nprint(score)';
    expect(checkChallenge('13', '13', [{ mode: 'changed', value: '', feedback: '연산 과정을 바꿨어요.' }], changed, starter)).toEqual({ passed: true, message: '연산 과정을 바꿨어요.' });
  });
  it('does not treat whitespace or comment-only edits as a meaningful change', () => {
    const starter = 'score = 10\nscore += 5\nscore -= 2\nprint(score)';
    const commentOnly = '# 계산 메모\nscore = 10\nscore += 5\nscore -= 2\nprint(score)';
    expect(checkChallenge('13', '13', [{ mode: 'changed', value: '', feedback: '좋아요' }], commentOnly, starter).passed).toBe(false);
  });
  it('rejects empty output or unchanged source for a changed check', () => {
    expect(checkChallenge('', '시작 문장', [{ mode: 'changed', value: '', feedback: '좋아요' }], 'changed', 'starter').passed).toBe(false);
    expect(checkChallenge('시작 문장', '시작 문장', [{ mode: 'changed', value: '', feedback: '좋아요' }], 'same', 'same').passed).toBe(false);
  });
  it('accepts either float or bool for the data type challenge', () => {
    const check = [{ mode: 'regex' as const, value: '(?:^|\\n)(?:float|bool)(?:$|\\n)', feedback: '좋아요' }];
    expect(checkChallenge('int\nstr\nfloat', 'int\nstr', check, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('int\nstr\nbool', 'int\nstr', check, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('int\nstr', 'int\nstr', check, 'changed', 'starter').passed).toBe(false);
  });
  it('requires a fourth number while allowing any resulting sum', () => {
    const checks = [
      { mode: 'contains' as const, value: '숫자 개수: 4', feedback: '개수를 확인했어요.' },
      { mode: 'changed' as const, value: '', feedback: '합계를 확인했어요.' },
    ];
    expect(checkChallenge('숫자 개수: 4\n합계: 42', '숫자 개수: 3\n합계: 10', checks, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('숫자 개수: 3\n합계: 42', '숫자 개수: 3\n합계: 10', checks, 'changed', 'starter').passed).toBe(false);
  });
  it('accepts either sufficient or insufficient inventory for an appended comparison', () => {
    const check = [{ mode: 'appended' as const, value: '', feedback: '비교했어요.' }];
    expect(checkChallenge('준비 필요: 색종이\n준비 완료: 가위', '준비 필요: 색종이', check, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('준비 필요: 색종이\n준비 필요: 가위', '준비 필요: 색종이', check, 'changed', 'starter').passed).toBe(true);
  });
  it('accepts appended lines before, between, or after the original lines', () => {
    const check = [{ mode: 'appended' as const, value: '', feedback: '목록을 확장했어요.' }];
    expect(checkChallenge('새 항목\n첫 줄\n둘째 줄', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('첫 줄\n새 항목\n둘째 줄', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(true);
    expect(checkChallenge('첫 줄\n둘째 줄\n새 항목', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(true);
  });
  it('rejects removed, reordered, or not-added original lines', () => {
    const check = [{ mode: 'appended' as const, value: '', feedback: '목록을 확장했어요.' }];
    expect(checkChallenge('새 항목\n첫 줄', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(false);
    expect(checkChallenge('둘째 줄\n첫 줄\n새 항목', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(false);
    expect(checkChallenge('첫 줄\n둘째 줄', '첫 줄\n둘째 줄', check, 'changed', 'starter').passed).toBe(false);
  });
});
