import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ChapterNav } from './ChapterNav';

describe('ChapterNav optional references', () => {
  it('keeps optional references collapsed while a required lesson is active', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    const { container } = render(<ChapterNav currentId="chapter-9-2" completed={new Set(['chapter-9-1'])} onSelect={vi.fn()} onReset={vi.fn()} open onClose={vi.fn()} onUpdates={vi.fn()} />);
    const chapter = [...container.querySelectorAll('.nav-chapter')].find((item) => item.textContent?.includes('9.'));
    expect(chapter?.querySelector('details.nav-optional')).not.toHaveAttribute('open');
  });
});
