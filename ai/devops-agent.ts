<<<<<<< HEAD
import { genkit } from "genkit";
=======
﻿import { genkit } from "genkit";
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
import { googleAI } from "@genkit-ai/googleai";
import { z } from "zod";

export const ai = genkit({
  plugins: [googleAI({ apiVersion: "v1beta" })],
});

export const devopsCheck = ai.defineFlow(
  {
    name: "devops.check",
    inputSchema: z.object({ context: z.string() }),
    outputSchema: z.object({
      summary: z.string(),
      checklist: z.array(z.string()),
      patch: z.string(),
    }),
  },
  async ({ context }) => {
    const system =
      "Return MINIFIED JSON with keys: summary (string), checklist (string[]), patch (string unified diff or empty). Only JSON. No markdown. No backticks.";
<<<<<<< HEAD
    const modelId = (process.env.GOOGLE_MODEL_ID || "googleai/gemini-1.5-flash-8b") as string;
=======
    const modelId = (process.env.GOOGLE_MODEL_ID || "googleai/gemini-1.5-flash-8b") as any;
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9

    const res = await ai.generate({
      model: modelId,
      prompt: system + "\n\nContext:\n" + context,
      config: { temperature: 0.2 },
    });

    const raw = (res.text ?? "").trim();
    try {
      const o = JSON.parse(raw);
      return {
        summary: typeof o.summary === "string" ? o.summary : "No summary.",
        checklist: Array.isArray(o.checklist)
          ? o.checklist.filter((x: unknown) => typeof x === "string").slice(0, 10)
          : [],
        patch: typeof o.patch === "string" ? o.patch : "",
      };
    } catch {
      return { summary: "Non-JSON output.", checklist: [], patch: "" };
    }
  }
);
