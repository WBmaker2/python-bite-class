import { describe, expect, it } from 'vitest';
import { getErrorGuidance } from './errorGuidance';

describe('getErrorGuidance', () => {
  it('explains common Python errors in Korean', () => {
    expect(getErrorGuidance('NameError: name x is not defined').type).toBe('NameError');
    expect(getErrorGuidance('IndentationError: unexpected indent').message).toContain('들여쓰기');
  });
  it('has a calm fallback for an unfamiliar error', () => {
    expect(getErrorGuidance('RuntimeError').type).toBe('Python 오류');
  });
});
