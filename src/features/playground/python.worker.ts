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

async function execute(code: string, runtimeCheck?: string) {
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
    const executionGlobals: any = createMainModuleGlobals(pyodide);
    await pyodide.runPythonAsync(code, { globals: executionGlobals });
    if (runtimeCheck) {
      executionGlobals.set('__student_code', code);
      const runtime = pyodide.runPython(`
import ast, json
student_globals = globals()
tree = ast.parse(student_globals['__student_code'])
runtime_names = ('total_seconds', 'minutes', 'seconds', 'money', 'price', 'supplies', 'pages', 'prices', 'name')
values = {}
for key in runtime_names:
    if key in student_globals:
        value = student_globals[key]
        try:
            values[key] = value.to_py() if hasattr(value, 'to_py') else value
        except Exception:
            values[key] = str(value)
assignments = []
lookups = []
for node in ast.walk(tree):
    if isinstance(node, ast.Assign) and len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
        try: assignments.append({'name': node.targets[0].id, 'op': '=', 'value': ast.literal_eval(node.value)})
        except Exception: pass
    if isinstance(node, ast.AugAssign) and isinstance(node.target, ast.Name):
        try: assignments.append({'name': node.target.id, 'op': type(node.op).__name__ == 'Sub' and '-=' or 'other', 'value': ast.literal_eval(node.value)})
        except Exception: pass
    if isinstance(node, ast.Subscript) and isinstance(node.value, ast.Name) and node.value.id == 'prices':
        if isinstance(node.slice, ast.Name) and node.slice.id in student_globals:
            lookups.append(str(student_globals[node.slice.id]))
json.dumps({'values': values, 'ast': {
    'floorDivide': any(isinstance(node, ast.FloorDiv) for node in ast.walk(tree)),
    'modulo': any(isinstance(node, ast.Mod) for node in ast.walk(tree)),
    'subtractUpdate': any(isinstance(node, ast.AugAssign) and isinstance(node.op, ast.Sub) for node in ast.walk(tree)),
    'ifBranch': any(isinstance(node, ast.If) for node in ast.walk(tree)),
    'loop': any(isinstance(node, (ast.For, ast.While)) for node in ast.walk(tree)),
    'hasLen': any(isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'len' for node in ast.walk(tree)),
    'hasSum': any(isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'sum' for node in ast.walk(tree)),
    'assignments': assignments,
    'lookups': lookups,
}})
`, { globals: executionGlobals });
      send('runtime', { runtime: JSON.parse(runtime) });
    }
    send('done');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('OUTPUT_LIMIT')) { if (!outputLimitSent) send('output-limit'); }
    else send('error', { message });
  }
}

self.onmessage = (event: MessageEvent<{ type: string; code?: string; runtimeCheck?: string }>) => {
  if (event.data.type === 'run' && event.data.code !== undefined) void execute(event.data.code, event.data.runtimeCheck);
  if (event.data.type === 'reset') { pyodide = undefined; send('status', { status: 'idle' }); }
};
