import { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

interface Props { value: string; onChange: (value: string) => void; }

export function CodeEditor({ value, onChange }: Props) {
  const host = useRef<HTMLDivElement>(null); const viewRef = useRef<EditorView | undefined>(undefined); const initialValue = useRef(value); const onChangeRef = useRef(onChange); onChangeRef.current = onChange;
  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView({ state: EditorState.create({ doc: initialValue.current, extensions: [basicSetup, oneDark, python(), keymap.of([indentWithTab]), EditorView.updateListener.of((update) => { if (update.docChanged) onChangeRef.current(update.state.doc.toString()); })] }), parent: host.current });
    viewRef.current = view; return () => view.destroy();
  }, []);
  useEffect(() => { const view = viewRef.current; if (view && view.state.doc.toString() !== value) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } }); }, [value]);
  return <div ref={host} className="code-editor" aria-label="Python 코드 편집기" />;
}
