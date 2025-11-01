import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { z } from "zod";
export const ai = genkit({
    plugins: [googleAI({ apiVersion: "v1" })],
});
export const devopsCheck = ai.defineFlow({
    name: "devops.check",
    inputSchema: z.object({ context: z.string() }),
    outputSchema: z.object({
        summary: z.string(),
        checklist: z.array(z.string()),
        patch: z.string(),
    }),
}, async ({ context }) => {
    const system = "Return MINIFIED JSON with keys: summary (string), checklist (string[]), patch (string unified diff or empty). Only JSON. No markdown. No backticks.";
    const modelId = (process.env.GOOGLE_MODEL_ID || "googleai/gemini-1.5-flash-8b");
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
                ? o.checklist.filter((x) => typeof x === "string").slice(0, 10)
                : [],
            patch: typeof o.patch === "string" ? o.patch : "",
        };
    }
    catch {
        return { summary: "Non-JSON output.", checklist: [], patch: "" };
    }
});
