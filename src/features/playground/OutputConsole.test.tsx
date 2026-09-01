import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OutputConsole } from './OutputConsole';

describe('OutputConsole', () => {
  it('puts friendly error recovery guidance before the traceback', () => {
    render(<OutputConsole state="error" outputs={[{ kind: 'stderr', text: 'SyntaxError: ...' }]} errorHelp={{ type: '문법 오류', message: '괄호를 확인해 보세요.' }} />);

    const help = screen.getByRole('alert');
    const consoleScreen = document.querySelector('.console-screen');
    expect(consoleScreen).not.toBeNull();
    expect(help.compareDocumentPosition(consoleScreen as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
