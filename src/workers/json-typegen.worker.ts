import { run } from "json_typegen_wasm";

let current;

const ctx: Worker = self as any;

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
    const { input, options } = event.data;
    const result = run("Root", input, JSON.stringify(options));
    respond({
      result,
    });
  } catch (error) {
    respond({ error });
  }
});
