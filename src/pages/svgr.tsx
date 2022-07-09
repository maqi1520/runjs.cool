import React, { useCallback } from "react";
import { Layout } from "../components/Layout";
import clsx from "clsx";
import { Button, CopyButton } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";
import { Column, TwoColumns } from "../components/TwoColumns";
import SampleIcon from "../components/Icon/SampleIcon";
import dynamic from "next/dynamic";

const debounce = (func, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };
};

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

function fetchSvgr(code: string): Promise<{ output: string }> {
  const data = JSON.stringify({
    code,
    options: {
      icon: false,
      native: false,
      typescript: false,
      ref: false,
      memo: false,
      titleProp: false,
      expandProps: "end",
      replaceAttrValues: {},
      svgProps: {},
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeTitle: false,
              },
            },
          },
        ],
      },
      prettier: true,
      prettierConfig: {
        semi: false,
      },
    },
  });

  return fetch("https://api.react-svgr.com/api/svgr", {
    headers: {
      "content-type": "application/json",
    },
    body: data,
    method: "POST",
    mode: "cors",
    credentials: "omit",
  }).then((res) => res.json());
}

const sample = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="48px" height="1px" viewBox="0 0 48 1" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 46.2 (44496) - http://www.bohemiancoding.com/sketch -->
    <title>Rectangle 5</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="19-Separator" transform="translate(-129.000000, -156.000000)" fill="#063855">
            <g id="Controls/Settings" transform="translate(80.000000, 0.000000)">
                <g id="Content" transform="translate(0.000000, 64.000000)">
                    <g id="Group" transform="translate(24.000000, 56.000000)">
                        <g id="Group-2">
                            <rect id="Rectangle-5" x="25" y="36" width="48" height="1"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>`;

export default function HtmlToMarkdownPage() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  const fetch = useCallback(
    debounce((input) => {
      if (!input) return;
      try {
        fetchSvgr(input).then((res) => {
          setOutput(res.output);
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }, 500),
    []
  );

  React.useEffect(() => {
    setError("");
    fetch(input);
  }, [input]);

  return (
    <Layout>
      <TwoColumns>
        <Column
          title="SVG"
          renderRight={() => (
            <>
              <Button onClick={() => setInput(sample)}>
                <SampleIcon className="w-5 h-5" />
                样例
              </Button>
              <CopyButton getValue={() => input} />
            </>
          )}
        >
          <ErrorMessage className="mb-2" message={error} />

          <CodeEditor
            language="html"
            className="h-full  w-full"
            value={input}
            onChange={setInput}
          ></CodeEditor>
        </Column>
        <Column
          title="React Compenent"
          renderRight={() => <CopyButton getValue={() => output} />}
        >
          <CodeEditor
            language="javascript"
            className={clsx(`h-full  w-full`, error && `text-red-500`)}
            value={error || output}
          ></CodeEditor>
        </Column>
      </TwoColumns>
    </Layout>
  );
}
