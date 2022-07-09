import { useRef, useEffect, useState } from "react";
import { ConversionLayout } from "./ConversionLayout";
import JSONWorker from "worker-loader!../workers/json-typegen.worker.ts";
import { createWorkerQueue } from "../utils/workers";

export const JsonToTypeLayout: React.FC<{
  mode: "typescript" | "rust";
}> = ({ mode }) => {
  const worker = useRef(null);
  useEffect(() => {
    worker.current = createWorkerQueue(JSONWorker);

    return () => {
      worker.current.terminate();
    };
  }, []);

  const convert = async (input: string) => {
    if (worker.current) {
      const res = await worker.current.emit({
        input,
        options: { output_mode: mode },
      });

      return res.result;
    }
  };

  return (
    <ConversionLayout
      inputTitle="JSON"
      mode={mode}
      resultTitle="Result"
      convert={convert}
    />
  );
};
