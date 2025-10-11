import { defineFlow } from "@genkit-ai/flow";

// Define a tiny flow so the Dev UI has something to attach to.
export const ping = defineFlow({ name: "ping" }, async () => {
  return "pong";
});

// Keep process alive
setInterval(() => {}, 1e9);
