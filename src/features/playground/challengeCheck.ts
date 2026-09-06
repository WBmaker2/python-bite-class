import type { OutputCheck } from '../../content/types';

/** Ignore blank lines and full-line comments when deciding whether code changed. */
function normalizeCodeForChallenge(code: string) {
  return code.split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .join('\n');
}

/** A changed check may accept the same final value only when an existing line changed. */
function replacedStarterLine(code: string, starterCode: string) {
  const currentLines = normalizeCodeForChallenge(code).split('\n').filter(Boolean);
  const starterLines = normalizeCodeForChallenge(starterCode).split('\n').filter(Boolean);
  return starterLines.some((line) => !currentLines.includes(line));
}

/** Collection challenges may add a method/loop line; a print-only addition is not enough. */
function addedNonPrintLine(code: string, starterCode: string) {
  const currentLines = normalizeCodeForChallenge(code).split('\n').filter(Boolean);
  const remainingStarterLines = normalizeCodeForChallenge(starterCode).split('\n').filter(Boolean);
  const additions = currentLines.filter((line) => {
    const index = remainingStarterLines.indexOf(line);
    if (index < 0) return true;
    remainingStarterLines.splice(index, 1);
    return false;
  });
  return additions.some((line) => !/^print\s*\(/.test(line));
}

export function checkChallenge(
  output: string,
  expectedOutput: string | undefined,
  checks: OutputCheck[] = [],
  code?: string,
  starterCode?: string,
  sourcePatterns: string[] = [],
) {
  if (!checks.length) return { passed: false, message: '실행 결과를 살펴보고 스스로 설명해 보세요.' };
  const unchangedCode = code !== undefined && starterCode !== undefined && code.trim() === starterCode.trim();
  const changedSource = code !== undefined && starterCode !== undefined && normalizeCodeForChallenge(code) !== normalizeCodeForChallenge(starterCode);
  const legacyUnchangedOutput = code === undefined && expectedOutput !== undefined && output.trim() === expectedOutput.trim();
  if (unchangedCode || legacyUnchangedOutput) {
    return { passed: false, message: '시작 코드를 한 줄 이상 바꿔 보세요.' };
  }
  if (sourcePatterns.length && code !== undefined) {
    const normalizedCode = normalizeCodeForChallenge(code);
    const keepsLearningFlow = sourcePatterns.every((pattern) => {
      try { return new RegExp(pattern, 'm').test(normalizedCode); } catch { return false; }
    });
    if (!keepsLearningFlow) return { passed: false, message: '이번 도전의 핵심 코드 흐름을 남겨 두고 안내된 부분을 바꿔 보세요.' };
  }
  const passed = checks.every((check) => {
    if (check.mode === 'contains') return output.includes(check.value);
    if (check.mode === 'equals') return output.trim() === check.value.trim();
    if (check.mode === 'changed') {
      const normalizedOutput = output.trim();
      const normalizedExpected = expectedOutput?.trim();
      return normalizedOutput.length > 0 && (normalizedOutput !== normalizedExpected || (changedSource && code !== undefined && starterCode !== undefined && replacedStarterLine(code, starterCode)));
    }
    if (check.mode === 'appended') {
      const originalLines = expectedOutput?.trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean) ?? [];
      const outputLines = output.trim().split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
      if (!originalLines.length || outputLines.length <= originalLines.length) return false;
      if (code !== undefined && starterCode !== undefined && !replacedStarterLine(code, starterCode) && !addedNonPrintLine(code, starterCode)) return false;
      let originalIndex = 0;
      for (const line of outputLines) {
        if (line === originalLines[originalIndex]) originalIndex += 1;
        if (originalIndex === originalLines.length) return true;
      }
      return false;
    }
    try { return new RegExp(check.value).test(output); } catch { return false; }
  });
  return { passed, message: passed ? checks[0].feedback : '아직 목표 결과와 달라요. 힌트를 참고해 한 줄씩 고쳐 보세요.' };
}
