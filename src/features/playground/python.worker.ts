/// <reference lib="webworker" />
import { createMainModuleGlobals } from './pythonGlobals';

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/';
const MAX_LINES = 300;
const MAX_BYTES = 30_000;
let pyodide: any;
let outputLines = 0;
let outputBytes = 0;
let outputLimitSent = false;

function send(type: string, payload: Record<string, unknown> = {}) { self.postMessage({ type, ...payload }); }

async function boot() {
  if (pyodide) return;
  send('status', { status: 'loading' });
  const module = await import(/* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`);
  pyodide = await module.loadPyodide({ indexURL: PYODIDE_URL });
  send('status', { status: 'ready' });
}

async function execute(code: string) {
  outputLines = 0; outputBytes = 0; outputLimitSent = false;
  try {
    await boot();
    const capture = (text: string, type: 'stdout' | 'stderr') => {
      outputLines += text.split('\n').length;
      outputBytes += new TextEncoder().encode(text).length;
      if (outputLines > MAX_LINES || outputBytes > MAX_BYTES) {
        if (!outputLimitSent) { outputLimitSent = true; send('output-limit'); }
        throw new Error('OUTPUT_LIMIT');
      }
      send(type, { text });
    };
    pyodide.setStdout({ batched: (text: string) => capture(text, 'stdout') });
    pyodide.setStderr({ batched: (text: string) => capture(text, 'stderr') });
    await pyodide.runPythonAsync(code, { globals: createMainModuleGlobals(pyodide) });
    send('done');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('OUTPUT_LIMIT')) { if (!outputLimitSent) send('output-limit'); }
    else send('error', { message });
  }
}

self.onmessage = (event: MessageEvent<{ type: string; code?: string }>) => {
  if (event.data.type === 'run' && event.data.code !== undefined) void execute(event.data.code);
  if (event.data.type === 'reset') { pyodide = undefined; send('status', { status: 'idle' }); }
};
