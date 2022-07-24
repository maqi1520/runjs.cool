import type { editor as MonacoEditor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { getTheme, onDidChangeTheme } from "@/utils/themes";

export const MONACO_LANGUAGES = [
  "text",
  "abap",
  "apex",
  "azcli",
  "bat",
  "bicep",
  "cameligo",
  "clojure",
  "coffee",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dart",
  "dockerfile",
  "ecl",
  "elixir",
  "flow9",
  "freemarker2",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "hcl",
  "html",
  "ini",
  "java",
  "javascript",
  "julia",
  "kotlin",
  "less",
  "lexon",
  "liquid",
  "lua",
  "m3",
  "markdown",
  "mips",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "pascaligo",
  "perl",
  "pgsql",
  "php",
  "pla",
  "postiats",
  "powerquery",
  "powershell",
  "protobuf",
  "pug",
  "python",
  "qsharp",
  "r",
  "razor",
  "redis",
  "redshift",
  "restructuredtext",
  "ruby",
  "rust",
  "sb",
  "scala",
  "scheme",
  "scss",
  "shell",
  "solidity",
  "sophia",
  "sparql",
  "sql",
  "st",
  "swift",
  "systemverilog",
  "tcl",
  "twig",
  "typescript",
  "vb",
  "xml",
  "yaml",
];

export default function TextDiffPage() {
  const editorContainer = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState("text");
  const [inlineView, setInlineView] = useState(false);

  const [diffEditor, setDiffEditor] =
    useState<MonacoEditor.IStandaloneDiffEditor | null>(null);

  const createModel = (
    value: string,
    language: string,
    type: "original" | "modified"
  ) => {
    return monaco.editor.createModel(value, language);
  };

  const initEditor = async () => {
    // Disable type errors
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // Tell typescript to use 'react' for jsx files.
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.React,
    });

    const originalModel = createModel(`Hello World`, language, "original");
    const modifiedModel = createModel(`Goodbye World`, language, "modified");
    const editor = monaco.editor.createDiffEditor(editorContainer.current, {
      minimap: { enabled: false },
      theme: getTheme() === "dark" ? "vs-dark" : "vs-light",
      //enableSplitViewResizing: false,
      renderSideBySide: !inlineView,
      originalEditable: true,
    });
    editor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });

    setDiffEditor(editor);
  };

  useEffect(() => {
    initEditor();

    return () => {
      if (diffEditor) diffEditor.dispose();
    };
  }, []);

  useEffect(() => {
    if (diffEditor) {
      if (monaco) {
        const models = diffEditor.getModel();

        if (language === "typescript" || language === "javascript") {
          // Currently no way to change model uri, so we have to recreate the model
          const orignal = models.original.getValue();
          const modified = models.modified.getValue();
          models.original.dispose();
          models.modified.dispose();
          const originalModel = createModel(orignal, language, "original");
          const modifiedModel = createModel(modified, language, "modified");
          diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel,
          });
        } else {
          monaco.editor.setModelLanguage(models.modified, language);
          monaco.editor.setModelLanguage(models.original, language);
        }
      }
    }
  }, [language]);

  useEffect(() => {
    if (diffEditor) {
      diffEditor.updateOptions({
        renderSideBySide: !inlineView,
      });
    }
  }, [inlineView]);

  useEffect(() => {
    function handleThemeChange(theme) {
      monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs-light");
    }
    const dispose = onDidChangeTheme(handleThemeChange);
    return () => dispose();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="h-16 border-b dark:border-neutral-800 flex-shrink-0 flex items-center px-3 space-x-5">
        <select
          value={language}
          className="input"
          onChange={(e) => setLanguage(e.target.value)}
        >
          {MONACO_LANGUAGES.map((lang) => {
            return (
              <option key={lang} value={lang}>
                {lang}
              </option>
            );
          })}
        </select>
        <label className="space-x-1 flex items-center">
          <input
            type="checkbox"
            checked={inlineView}
            onChange={(e) => setInlineView(e.target.checked)}
          />
          <span>Inline diff</span>
        </label>
      </header>
      <div ref={editorContainer} className="h-full"></div>
    </div>
  );
}
