import React, { useRef, useState, useCallback } from "react";
import { Layout } from "../components/Layout";
import clsx from "clsx";
import { CopyButton } from "../components/Button";

import type { editor as MonacoEditor } from "monaco-editor";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

export const MONACO_LANGUAGES = [
  "json",
  "javascript",
  "typescript",
  "css",
  "less",
  "scss",
  "markdown",
  "graphql",
  "handlebars",
  "html",
  "xml",
  "yaml",
];

export default function JsonFormatPage() {
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState("json");

  const getValue = () => {
    return editorRef.current.getValue();
  };

  const inRef = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <header className="border-b h-16 dark:border-neutral-800 flex-shrink-0 flex items-center justify-between p-3 space-x-5">
          <div className="space-x-3">
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
          </div>
          <div className="flex items-center">
            <CopyButton getValue={getValue} />
          </div>
        </header>
        <CodeEditor
          inRef={inRef}
          className={clsx(`h-full  w-full`)}
          value={""}
          language={language}
        />
      </div>
    </Layout>
  );
}
