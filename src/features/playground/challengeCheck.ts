import type { OutputCheck, Challenge } from '../../content/types';
import type { RunnerRuntime } from '../../hooks/usePythonRunner';
import { validateRuntimeResult } from './runtimeValidation';

function normalizeCodeForChallenge(code: string) {
  return code.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#')).join('\n');
}
function replacedStarterLine(code: string, starterCode: string) {
  const current = normalizeCodeForChallenge(code).split('\n').filter(Boolean);
  return normalizeCodeForChallenge(starterCode).split('\n').filter(Boolean).some((line) => !current.includes(line));
}
function addedNonPrintLine(code: string, starterCode: string) {
  const current = normalizeCodeForChallenge(code).split('\n').filter(Boolean);
  const remaining = normalizeCodeForChallenge(starterCode).split('\n').filter(Boolean);
  return current.filter((line) => { const index = remaining.indexOf(line); if (index < 0) return true; remaining.splice(index, 1); return false; }).some((line) => !/^print\s*\(/.test(line));
}

export function checkChallenge(output: string, expectedOutput: string | undefined, checks: OutputCheck[] = [], code?: string, starterCode?: string, sourcePatterns: string[] = [], runtimeCheck?: Challenge['runtimeCheck'], runtime?: RunnerRuntime) {
  if (!checks.length) return { passed: false, message: '실행 결과를 살펴보고 스스로 설명해 보세요.' };
  const unchanged = code !== undefined && starterCode !== undefined && code.trim() === starterCode.trim();
  const changedSource = code !== undefined && starterCode !== undefined && normalizeCodeForChallenge(code) !== normalizeCodeForChallenge(starterCode);
  if (unchanged || (code === undefined && expectedOutput !== undefined && output.trim() === expectedOutput.trim())) return { passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' };
  if (sourcePatterns.length && code !== undefined && !sourcePatterns.every((pattern) => { try { return new RegExp(pattern, 'm').test(normalizeCodeForChallenge(code)); } catch { return false; } })) return { passed: false, message: '이번 도전의 핵심 코드 흐름을 남겨 두고 안내된 부분을 바꿔 보세요.' };
  if (runtimeCheck) {
    if (!runtime) return { passed: false, message: '실행 결과를 준비하는 중이에요. 코드를 다시 실행해 주세요.' };
    const result = validateRuntimeResult(runtimeCheck, runtime, output);
    if (!result.passed) return result;
  }
  const passed = checks.every((check) => {
    if (check.mode === 'contains') return output.includes(check.value);
    if (check.mode === 'equals') return output.trim() === check.value.trim();
    if (check.mode === 'changed') return output.trim().length > 0 && (output.trim() !== expectedOutput?.trim() || (changedSource && code !== undefined && starterCode !== undefined && replacedStarterLine(code, starterCode)));
    if (check.mode === 'appended') {
      const original = expectedOutput?.trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean) ?? [];
      const actual = output.trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (!original.length || actual.length <= original.length) return false;
      if (code !== undefined && starterCode !== undefined && !replacedStarterLine(code, starterCode) && !addedNonPrintLine(code, starterCode)) return false;
      let index = 0; for (const line of actual) { if (line === original[index]) index += 1; if (index === original.length) return true; } return false;
    }
    try { return new RegExp(check.value).test(output); } catch { return false; }
  });
  return { passed, message: passed ? checks[0].feedback : '아직 목표 결과와 달라요. 힌트를 참고해 한 줄씩 고쳐 보세요.' };
}
