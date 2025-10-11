import { defineFlow } from "@genkit-ai/flow";

console.log("GENKIT_ENV =", process.env.GENKIT_ENV);

export const ping = defineFlow({ name: "ping" }, async () => "pong");

console.log("Reflection API should be on http://localhost:3100");

// keep the process alive
setInterval(() => {}, 1e9);
