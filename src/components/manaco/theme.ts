import colors from "tailwindcss/colors";
import dlv from "dlv";

function toHex(d) {
  return Number(d).toString(16).padStart(2, "0");
}

function getColor(path): string {
  let [key, opacity = 1] = path.split("/");
  return (
    dlv(colors, key).replace("#", "") +
    toHex(Math.round(parseFloat(opacity) * 255))
  );
}

function makeTheme(themeColors) {
  return Object.entries(themeColors).map(([token, colorPath]) => ({
    token,
    foreground: getColor(colorPath),
  }));
}
export function defineTheme(monaco: typeof import("monaco-editor")) {
  monaco.editor.defineTheme("tw-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "bg", foreground: getColor("gray.800") },
      ...makeTheme({
        comment: "gray.400",
        string: "indigo.600",
        number: "gray.800",
        tag: "sky.600",
        delimiter: "gray.400",
        // HTML
        "attribute.name.html": "sky.500",
        "attribute.value.html": "indigo.600",
        "delimiter.html": "gray.400",
        // JS
        "keyword.js": "sky.600",
        "identifier.js": "gray.800",
        // CSS
        "attribute.name.css": "indigo.600",
        "attribute.value.unit.css": "teal.600",
        "attribute.value.number.css": "gray.800",
        "attribute.value.css": "gray.800",
        "attribute.value.hex.css": "gray.800",
        "keyword.css": "sky.600",
        "function.css": "teal.600",
        "pseudo.css": "sky.600",
        "variable.css": "gray.800",
      }),
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.selectionBackground": "#" + getColor("slate.200"),
      "editor.inactiveSelectionBackground": "#" + getColor("slate.200/0.4"),
      "editorLineNumber.foreground": "#" + getColor("gray.400"),
      "editor.lineHighlightBorder": "#" + getColor("slate.100"),
      "editorBracketMatch.background": "#00000000",
      "editorBracketMatch.border": "#" + getColor("slate.300"),
      "editorSuggestWidget.background": "#" + getColor("slate.50"),
      "editorSuggestWidget.selectedBackground": "#" + getColor("slate.400/0.1"),
      "editorSuggestWidget.selectedForeground": "#" + getColor("slate.700"),
      "editorSuggestWidget.foreground": "#" + getColor("slate.700"),
      "editorSuggestWidget.highlightForeground": "#" + getColor("indigo.500"),
      "editorSuggestWidget.focusHighlightForeground":
        "#" + getColor("indigo.500"),
      "editorHoverWidget.background": "#" + getColor("slate.50"),
      "editorError.foreground": "#" + getColor("red.500"),
      "editorWarning.foreground": "#" + getColor("yellow.500"),
    },
  });

  monaco.editor.defineTheme("tw-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "bg", foreground: getColor("slate.50") },
      ...makeTheme({
        comment: "slate.400",
        string: "sky.300",
        number: "slate.50",
        tag: "pink.400",
        delimiter: "slate.500",
        // HTML
        "attribute.name.html": "slate.300",
        "attribute.value.html": "sky.300",
        "delimiter.html": "slate.500",
        // JS
        "keyword.js": "slate.300",
        "identifier.js": "slate.50",
        // CSS
        "attribute.name.css": "sky.300",
        "attribute.value.unit.css": "teal.200",
        "attribute.value.number.css": "slate.50",
        "attribute.value.css": "slate.50",
        "attribute.value.hex.css": "slate.50",
        "keyword.css": "slate.300",
        "function.css": "teal.200",
        "pseudo.css": "slate.300",
        "variable.css": "slate.50",
      }),
    ],
    colors: {
      "editor.background": "#" + getColor("slate.800"),
      "editor.selectionBackground": "#" + getColor("slate.700"),
      "editor.inactiveSelectionBackground": "#" + getColor("slate.700/0.6"),
      "editorLineNumber.foreground": "#" + getColor("slate.600"),
      "editor.lineHighlightBorder": "#" + getColor("slate.700"),
      "editorBracketMatch.background": "#00000000",
      "editorBracketMatch.border": "#" + getColor("slate.500"),
      "editorSuggestWidget.background": "#" + getColor("slate.700"),
      "editorSuggestWidget.selectedBackground":
        "#" + getColor("slate.400/0.12"),
      "editorSuggestWidget.foreground": "#" + getColor("slate.300"),
      "editorSuggestWidget.selectedForeground": "#" + getColor("slate.300"),
      "editorSuggestWidget.highlightForeground": "#" + getColor("sky.400"),
      "editorSuggestWidget.focusHighlightForeground": "#" + getColor("sky.400"),
      "editorHoverWidget.background": "#" + getColor("slate.700"),
      "editorError.foreground": "#" + getColor("red.400"),
      "editorWarning.foreground": "#" + getColor("yellow.400"),
    },
  });
}
