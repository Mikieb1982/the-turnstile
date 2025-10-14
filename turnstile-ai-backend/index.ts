// ai/devops-agent.ts
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { z } from "zod";

export const ai = genkit({
  // Force Google Generative AI v1 so flash/pro work consistently
  plugins: [googleAI({ apiVersion: "v1" })],
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
      "You are a strict DevOps reviewer for a React+Vite+TypeScript app. " +
      "Return a MINIFIED JSON object with keys: summary (string), checklist (string[]), patch (string unified diff or empty). " +
      "Only valid JSON in the response. No markdown, no backticks, no extra text.";
    const user = "Context:\n" + context;

    const res = await ai.generate({
      // If your key doesn't serve this ID, switch to "gemini-1.5-flash-8b"
      model: googleAI.model("gemini-1.5-flash"),
      prompt: system + "\n\n" + user,
      config: { temperature: 0.2 },
    });

    const raw = (res.text ?? "").trim();
    try {
      const obj = JSON.parse(raw);
      return {
        summary: typeof obj.summary === "string" ? obj.summary : "No summary.",
        checklist: Array.isArray(obj.checklist)
          ? obj.checklist.filter((x: unknown) => typeof x === "string").slice(0, 10)
          : [],
        patch: typeof obj.patch === "string" ? obj.patch : "",
      };
    } catch {
      return { summary: "Non-JSON output.", checklist: [], patch: "" };
    }
  }
);
