import { useRef } from 'react';

import { schema } from '@/app/[id]/_constant/schema';
import { sqlKeywords } from '@/app/[id]/_constant/sql-keywords';

import { ProblemDetailResponse } from '@/api/dto';
import { Button } from '@/component/ui/button';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor as MonacoEditor, languages } from 'monaco-editor';

import CompletionItem = languages.CompletionItem;

interface Props {
  problem?: ProblemDetailResponse;
  handleExecuteQuery: (query: string) => void;
  handleSubmitQuery: (query: string) => void;
  isQueryExecuting: boolean;
  isQuerySubmitting: boolean;
}

let completionProviderRegistered = false;

export default function RightPanel({
  problem,
  handleExecuteQuery,
  handleSubmitQuery,
  isQueryExecuting,
  isQuerySubmitting,
}: Props) {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: MonacoEditor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    editor.focus();

    const lines = editor.getValue().split('\n');
    editor.setPosition({ lineNumber: lines.length, column: lines[lines.length - 1].length + 1 });
    editor.revealPositionInCenter({
      lineNumber: lines.length,
      column: lines[lines.length - 1].length + 1,
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
      handleExecuteQuery(editor.getValue() || ''),
    );

    if (!completionProviderRegistered) {
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: () => {
          const suggestions: Omit<CompletionItem, 'range'>[] = [];

          Object.keys(schema).forEach((table) => {
            suggestions.push({
              label: table,
              kind: monaco.languages.CompletionItemKind.Class,
              insertText: table,
              documentation: `Table: ${table}`,
            });
          });

          Object.entries(schema).forEach(([table, columns]) => {
            columns.forEach(({ column_name, data_type }) => {
              suggestions.push({
                label: `${table}.${column_name}`,
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: `${table}.${column_name}`,
                documentation: `Column: ${column_name} (${data_type}) from ${table}`,
              });

              suggestions.push({
                label: column_name,
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: column_name,
                documentation: `Column: ${column_name} (${data_type}) from ${table}`,
              });
            });
          });

          sqlKeywords.forEach((keyword) => {
            suggestions.push({
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword,
              documentation: `SQL Keyword: ${keyword}`,
            });
          });

          return { suggestions: suggestions as CompletionItem[] };
        },
      });
    }
    completionProviderRegistered = true;
  };

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-end gap-2">
        {problem && (
          <Button
            variant="default"
            disabled={isQueryExecuting || isQuerySubmitting}
            onClick={() => handleSubmitQuery(editorRef.current?.getValue() || '')}
          >
            채점
          </Button>
        )}
        <Button
          variant="outline"
          disabled={isQueryExecuting || isQuerySubmitting}
          onClick={() => handleExecuteQuery(editorRef.current?.getValue() || '')}
        >
          실행
        </Button>
      </div>
      <Editor
        language="sql"
        value={problem?.query}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          wordBasedSuggestions: 'off',
          minimap: { enabled: false },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            vertical: 'visible',
            horizontal: 'visible',
            handleMouseWheel: true,
          },
        }}
      />
    </section>
  );
}
