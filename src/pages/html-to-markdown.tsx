import React from "react";
import Turndown from "turndown";
import * as turndownGFM from "turndown-plugin-gfm";
import { Layout } from "../components/Layout";
import clsx from "clsx";
import { Button, CopyButton } from "../components/Button";
import SampleIcon from "../components/Icon/SampleIcon";
import { ErrorMessage } from "../components/ErrorMessage";
import { Column, TwoColumns } from "../components/TwoColumns";
import dynamic from "next/dynamic";
const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
});

const sample = `<h1>Turndown Demo</h1>

<p>This demonstrates <a href="https://github.com/mixmark-io/turndown">turndown</a> – an HTML to Markdown converter in JavaScript.</p>

<h2>Usage</h2>

<pre><code class="language-js">var turndownService = new TurndownService()
console.log(
  turndownService.turndown('&lt;h1&gt;Hello world&lt;/h1&gt;')
)</code></pre>

<hr />

<p>It aims to be <a href="http://commonmark.org/">CommonMark</a>
 compliant, and includes options to style the output. These options include:</p>

<ul>
  <li>headingStyle (setext or atx)</li>
  <li>horizontalRule (*, -, or _)</li>
  <li>bullet (*, -, or +)</li>
  <li>codeBlockStyle (indented or fenced)</li>
  <li>fence (~ or ~)</li>
  <li>emDelimiter (_ or *)</li>
  <li>strongDelimiter (** or __)</li>
  <li>linkStyle (inlined or referenced)</li>
  <li>linkReferenceStyle (full, collapsed, or shortcut)</li>
</ul>`;

export default function HtmlToMarkdownPage() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setError("");
    if (!input) return;
    try {
      const turndown = new Turndown({
        bulletListMarker: "-",
        codeBlockStyle: "fenced",
        headingStyle: "atx",
      });
      turndown.use(turndownGFM.gfm);
      setOutput(turndown.turndown(input));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [input]);

  return (
    <Layout>
      <TwoColumns>
        <Column
          title="HTML"
          renderRight={() => (
            <>
              <ErrorMessage className="mb-2" message={error} />
              <Button onClick={() => setInput(sample)}>
                <SampleIcon className="w-5 h-5" />
                样例
              </Button>
              <CopyButton getValue={() => input} />
            </>
          )}
        >
          <CodeEditor
            language="html"
            className="h-full w-full"
            value={input}
            onChange={setInput}
          ></CodeEditor>
        </Column>
        <Column
          title="Markdown"
          renderRight={() => <CopyButton getValue={() => output} />}
        >
          <CodeEditor
            language="markdown"
            className={clsx(`h-full  w-full`, error && `text-red-500`)}
            value={error || output}
          ></CodeEditor>
        </Column>
      </TwoColumns>
    </Layout>
  );
}
