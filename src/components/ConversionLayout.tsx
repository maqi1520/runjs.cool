import { useEffect, useState } from "react";
import { Input } from "./Input";
import { Layout } from "./Layout";
import { Column, TwoColumns } from "./TwoColumns";
import { Button, CopyButton } from "./Button";
import SampleIcon from "./Icon/SampleIcon";

import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

const sample = JSON.stringify(
  {
    name: "Allen",
    age: 18,
  },
  null,
  2
);

export const ConversionLayout: React.FC<{
  mode: "typescript" | "rust";
  inputTitle: string;
  resultTitle: string;
  defaultInput?: string;
  convert: (input: string) => Promise<string> | string;
}> = ({ inputTitle, resultTitle, convert, defaultInput, mode }) => {
  const [input, setInput] = useState(defaultInput || "");
  const [result, setResult] = useState("");
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    setConverting(true);

    Promise.resolve(convert(input || "{}"))
      .then((result) => {
        setResult(result);
      })
      .catch(console.error)
      .finally(() => {
        setConverting(false);
      });
  }, [input, convert]);

  return (
    <Layout>
      <TwoColumns>
        <Column
          renderRight={() => (
            <>
              <Button onClick={() => setInput(sample)}>
                <SampleIcon className="w-5 h-5" />
                样例
              </Button>
              <CopyButton getValue={() => input} />
            </>
          )}
          title={inputTitle}
        >
          <div className="p-3">
            <Input rows={10} value={input} onChange={setInput} />
          </div>
        </Column>
        <Column
          title={resultTitle}
          renderRight={() => <CopyButton getValue={() => result} />}
        >
          <CodeEditor
            className="w-full h-full"
            value={result}
            language={mode}
          />
        </Column>
      </TwoColumns>
    </Layout>
  );
};
