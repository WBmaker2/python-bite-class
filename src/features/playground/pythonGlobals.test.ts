import { describe, expect, it } from 'vitest';
import { createMainModuleGlobals, MAIN_MODULE_NAME } from './pythonGlobals';

describe('createMainModuleGlobals', () => {
  it('passes the main module name into Pyodide globals', () => {
    const toPy = (value: Record<string, string>) => ({ value });

    expect(createMainModuleGlobals({ toPy })).toEqual({ value: { __name__: MAIN_MODULE_NAME } });
  });
});
