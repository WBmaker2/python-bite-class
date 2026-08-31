const guidance: Record<string, string> = {
  SyntaxError: '괄호와 따옴표가 모두 닫혔는지, if·for 뒤에 콜론(:)이 있는지 확인해 보세요.',
  IndentationError: '같은 블록 안의 줄이 같은 칸만큼 들여쓰기 되었는지 확인해 보세요.',
  NameError: '변수 이름의 철자와, 변수를 사용하기 전에 먼저 만든 순서를 확인해 보세요.',
  TypeError: '숫자와 글자처럼 서로 다른 자료형을 바로 계산하고 있지 않은지 살펴보세요.',
  ZeroDivisionError: '나누는 값이 0이 되지 않도록 계산을 확인해 보세요.',
};

export function getErrorGuidance(errorText: string) {
  const found = Object.keys(guidance).find((name) => errorText.includes(name));
  return found ? { type: found, message: guidance[found] } : { type: 'Python 오류', message: '오류가 난 줄 주변을 천천히 읽고 변수와 괄호를 확인해 보세요.' };
}
