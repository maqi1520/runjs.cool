import { useRef, useEffect } from "react";
import type { editor as MonacoEditor } from "monaco-editor";
import * as monaco from "monaco-editor";
import { getTheme, onDidChangeTheme } from "@/utils/themes";

import { CommandsRegistry } from "monaco-editor/esm/vs/platform/commands/common/commands";
import { registerDocumentFormattingEditProviders } from "./manaco/format";

function setupKeybindings(editor) {
  let formatCommandId = "editor.action.formatDocument";
  const { handler, when } = CommandsRegistry.getCommand(formatCommandId);
  editor._standaloneKeybindingService.addDynamicKeybinding(
    formatCommandId,
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
    handler,
    when
  );
}

interface Props {
  value: string;
  className: string;
  language: string;
  onChange?: (value: string) => void;
  inRef?: (value: MonacoEditor.IStandaloneCodeEditor) => void;
}

function CodeEditor({
  value = "",
  className,
  language = "javascript",
  onChange = () => {},
  inRef = () => {},
}: Props) {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const modelRef = useRef<MonacoEditor.ITextModel | null>(null);

  const initEditor = async () => {
    const model = monaco.editor.createModel(value, language);
    const editor = monaco.editor.create(editorContainer.current, {
      minimap: { enabled: false },
      theme: getTheme() === "dark" ? "vs-dark" : "vs-light",
    });

    editor.setModel(model);
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
    setupKeybindings(editor);
    inRef(editor);
    modelRef.current = model;
    editorRef.current = editor;
  };

  useEffect(() => {
    initEditor();
    let { dispose } = registerDocumentFormattingEditProviders();
    return () => {
      if (editorRef) editorRef.current.dispose();
      dispose();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const value = model.getValue();
      model.dispose();
      const newModel = monaco.editor.createModel(value, language);
      editorRef.current.setModel(newModel);
    }
  }, [language]);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      const val = model.getValue();

      if (val !== value) {
        model.setValue(value);
      }
    }
  }, [value]);

  useEffect(() => {
    function handleThemeChange(theme) {
      monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs-light");
    }
    const dispose = onDidChangeTheme(handleThemeChange);
    return () => dispose();
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      window.setTimeout(() => editorRef.current.layout(), 0);
    });
    observer.observe(editorContainer.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={editorContainer} className={className}></div>;
}

export default CodeEditor;
