import type { Challenge } from '../../content/types';
import type { RunnerRuntime } from '../../hooks/usePythonRunner';

export function outputNumber(output: string, label: string) {
  const line = output.split(/\r?\n/).find((item) => item.includes(label));
  const match = line?.match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

export function validateRuntimeResult(kind: NonNullable<Challenge['runtimeCheck']>, runtime: RunnerRuntime, output: string) {
  const values = runtime.values;
  const ast = runtime.ast;
  if (kind === 'time') {
    const total = Number(values.total_seconds); const minutes = Number(values.minutes); const seconds = Number(values.seconds);
    if (!Number.isInteger(total) || total === 185 || !Number.isInteger(minutes) || !Number.isInteger(seconds) || total <= 0 || !ast.floorDivide || !ast.modulo) return { passed: false, message: '185가 아닌 다른 양의 정수 초로 몫과 나머지를 확인해 보세요.' };
    return output.includes(`${Math.floor(total / 60)}분 ${total % 60}초`) && minutes === Math.floor(total / 60) && seconds === total % 60
      ? { passed: true, message: '실제 초 값을 분과 초로 정확히 바꾸었어요.' } : { passed: false, message: '출력된 분·초가 몫과 나머지에 맞지 않아요.' };
  }
  if (kind === 'allowance') {
    const remaining = outputNumber(output, '남은 용돈'); const money = Number(values.money);
    const deductions = ast.assignments.filter((item) => item.name === 'money' && item.op === '-=').map((item) => Number(item.value));
    return Number.isInteger(money) && money >= 0 && remaining === money && deductions.length >= 2 && deductions[0] === 1800 && deductions[1] > 0 && deductions[1] <= 3200 ? { passed: true, message: '두 지출 뒤 잔액을 정확히 계산했어요.' } : { passed: false, message: '5,000원에서 1,800원을 먼저 빼고 두 번째 지출을 1~3,200원으로 바꿔 보세요.' };
  }
  if (kind === 'snack') {
    const money = Number(values.money); const price = Number(values.price);
    const short = /부족해요|살 수 없어요|구매할 수 없어요/.test(output);
    return Number.isInteger(money) && money >= 0 && price === 1500 && ast.ifBranch && money < price && short
      ? { passed: true, message: '부족한 상황에 맞는 안내를 확인했어요.' } : { passed: false, message: 'money를 price보다 작게 바꾸고 부족 안내를 확인해 보세요.' };
  }
  if (kind === 'supplies') {
    const items = Array.isArray(values.supplies) ? values.supplies.map(String) : [];
    const count = outputNumber(output, '준비물 개수');
    const printed = output.split(/\r?\n/).filter((line) => line.startsWith('준비물:')).map((line) => line.replace(/^준비물:\s*/, ''));
    return items.length === 4 && items.slice(0, 3).join('|') === '공책|연필|지우개' && count === 4 && printed.length === 4 && items.every((item) => printed.includes(item)) && ast.loop && ast.hasLen
      ? { passed: true, message: '실행된 준비물 목록과 개수를 정확히 확인했어요.' } : { passed: false, message: '추가한 항목까지 for 출력과 len() 결과가 맞는지 확인해 보세요.' };
  }
  if (kind === 'reading') {
    const pages = Array.isArray(values.pages) ? values.pages : []; const total = outputNumber(output, '총 독서 쪽수');
    const initial = [5, 0, 8, 4, 0, 10, 3]; const changed = pages.filter((value, index) => value !== initial[index]).length;
    return pages.length === 7 && pages.every((value) => typeof value === 'number' && Number.isInteger(value) && value >= 0) && changed === 1 && total === pages.reduce((sum, value) => sum + value, 0) && ast.hasSum
      ? { passed: true, message: '실제 7일 기록의 합계를 계산했어요.' } : { passed: false, message: '7개 기록과 sum() 결과를 확인해 보세요.' };
  }
  const prices = values.prices && typeof values.prices === 'object' ? values.prices as Record<string, unknown> : {};
  const name = String(values.name ?? ''); const price = Number(prices[name]); const keys = Object.keys(prices);
  const exactPrice = new RegExp(`가격:\\s*${price}원(?:\\r?\\n|$)`).test(output);
  return keys.length === 3 && keys.includes('우유') && keys.includes('빵') && name && name !== '우유' && name !== '빵' && Number.isInteger(price) && price > 0 && ast.lookups.includes(name) && exactPrice
    ? { passed: true, message: '실제 새 간식 이름표로 가격을 찾았어요.' } : { passed: false, message: '새 항목을 추가하고 그 이름표로 실제 가격을 조회해 보세요.' };
}
