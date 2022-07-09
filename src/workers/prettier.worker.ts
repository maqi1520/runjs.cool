import prettier from "prettier";
import parserMarkdown from "prettier/parser-markdown";
import parserHtml from "prettier/parser-html";
import parserTypescript from "prettier/parser-typescript";
import parserPostcss from "prettier/parser-postcss";
import parserFlow from "prettier/parser-flow";
import parserAngular from "prettier/parser-angular";
import parserbabel from "prettier/parser-babel";
import parserGraphql from "prettier/parser-graphql";

let current;

const ctx: Worker = self as any;

const langTopaser = {
  json: "json",
  javascript: "babel",
  typescript: "typescript",
  css: "css",
  less: "less",
  scss: "scss",
  markdown: "markdown",
  graphql: "graphql",
  handlebars: "handlebars",
  html: "html",
  yaml: "yaml",
};

ctx.addEventListener("message", async (event) => {
  if (event.data._current) {
    current = event.data._current;
    return;
  }

  function respond(data) {
    setTimeout(() => {
      if (event.data._id === current) {
        postMessage({ _id: event.data._id, ...data });
      } else {
        postMessage({ _id: event.data._id, canceled: true });
      }
    }, 0);
  }

  try {
    respond({
      pretty: prettier.format(event.data.text, {
        parser: langTopaser[event.data.language],
        plugins: [
          parserMarkdown,
          parserHtml,
          parserTypescript,
          parserPostcss,
          parserAngular,
          parserbabel,
          parserGraphql,
          parserFlow,
        ],
        printWidth: 80,
      }),
    });
  } catch (error) {
    respond({ error });
  }
});
