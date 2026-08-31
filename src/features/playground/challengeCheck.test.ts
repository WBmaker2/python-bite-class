import { describe, expect, it } from 'vitest';
import { checkChallenge } from './challengeCheck';

describe('checkChallenge', () => {
  it('passes contains checks after the starter output changes', () => expect(checkChallenge('남은 금액: 1200', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: true, message: '좋아요' }));
  it('asks learners to change the starter code', () => expect(checkChallenge('남은 금액: 1400', '남은 금액: 1400', [{ mode: 'contains', value: '남은 금액', feedback: '좋아요' }])).toEqual({ passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' }));
  it('returns learner feedback when output misses goal', () => expect(checkChallenge('다른 결과', undefined, [{ mode: 'equals', value: '정답', feedback: '좋아요' }]).passed).toBe(false));
});
