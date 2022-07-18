import React, { useEffect, useRef } from "react";
import prismjs from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

export default function HighlightCode({ html }) {
  const ref = useRef(null);
  useEffect(() => {
    prismjs.highlightAll(ref.current);
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }}></div>;
}
