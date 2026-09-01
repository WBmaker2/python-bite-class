import type { RunnerOutput } from '../../hooks/usePythonRunner';

/** Preserve line boundaries when the worker reports each print as a separate item. */
export function combineStdoutOutput(outputs: RunnerOutput[]) {
  return outputs.filter((item) => item.kind === 'stdout').map((item) => item.text).join('\n');
}
