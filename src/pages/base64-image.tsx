import { useState } from "react";
import { CopyButton } from "../components/Button";
import { CodeBlock } from "../components/CodeBlock";
import { Layout } from "../components/Layout";
import { Column, TwoColumns } from "../components/TwoColumns";

export default function Base64ImagePage() {
  const [result, setResult] = useState("");

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setResult(reader.result.toString());
    };
    reader.onerror = (err) => {
      alert(err);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <TwoColumns>
        <Column title="图片">
          <div className="p-3">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="input-file"
              />
            </label>
            {result && (
              <div className="mt-5">
                <img src={result} />
              </div>
            )}
          </div>
        </Column>
        <Column
          title="Base64"
          renderRight={() => <CopyButton getValue={() => result} />}
        >
          {result && (
            <div className="p-3">
              {result.length > 500 && (
                <div className="mb-3 text-zinc-400">
                  Too large, only showing the first 500 characters:
                </div>
              )}
              <CodeBlock
                code={`${result.slice(0, 500)}${
                  result.length > 500 ? `...` : ``
                }`}
              />
            </div>
          )}
        </Column>
      </TwoColumns>
    </Layout>
  );
}
