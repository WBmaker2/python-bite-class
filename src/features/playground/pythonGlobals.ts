export const MAIN_MODULE_NAME = '__main__';

interface PyodideGlobalFactory {
  toPy(value: Record<string, string>): unknown;
}

/** Create the Pyodide global mapping used for code run as the browser's main module. */
export function createMainModuleGlobals(pyodide: PyodideGlobalFactory): unknown {
  return pyodide.toPy({ __name__: MAIN_MODULE_NAME });
}
