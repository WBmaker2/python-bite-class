import { describe, expect, it } from 'vitest';
import { checkChallenge } from './challengeCheck';

describe('checkChallenge', () => {
  it('passes contains checks after the starter output changes', () => expect(checkChallenge('남은 금액: 1200', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: true, message: '좋아요' }));
  it('asks learners to change the starter code', () => expect(checkChallenge('남은 금액: 1400', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' }));
  it('returns learner feedback when output misses goal', () => expect(checkChallenge('다른 결과', undefined, [{ mode: 'equals', value: '정답', feedback: '좋아요' }]).passed).toBe(false));
  it('accepts a real code change even when the output intentionally stays the same', () => expect(checkChallenge('주석은 설명을 도와줘요', '주석은 설명을 도와줘요', [{ mode: 'contains', value: '주석', feedback: '좋아요' }], '# 나의 주석\nprint("주석은 설명을 도와줘요")', '# 오늘의 메모\nprint("주석은 설명을 도와줘요")')).toEqual({ passed: true, message: '좋아요' }));
  it('rejects unchanged source code even when another output check would pass', () => expect(checkChallenge('True', 'True', [{ mode: 'equals', value: 'True', feedback: '좋아요' }], 'print(True)', 'print(True)').passed).toBe(false));
});
