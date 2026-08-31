import type { OutputCheck } from '../../content/types';

export function checkChallenge(output: string, expectedOutput: string | undefined, checks: OutputCheck[] = []) {
  if (!checks.length) return { passed: false, message: '실행 결과를 살펴보고 스스로 설명해 보세요.' };
  if (expectedOutput !== undefined && output.trim() === expectedOutput.trim()) {
    return { passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' };
  }
  const passed = checks.every((check) => {
    if (check.mode === 'contains') return output.includes(check.value);
    if (check.mode === 'equals') return output.trim() === check.value.trim();
    try { return new RegExp(check.value).test(output); } catch { return false; }
  });
  return { passed, message: passed ? checks[0].feedback : '아직 목표 결과와 달라요. 힌트를 참고해 한 줄씩 고쳐 보세요.' };
}
