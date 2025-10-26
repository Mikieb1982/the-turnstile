import { devopsCheck } from "./devops-agent";

console.log(
  "model:", process.env.GOOGLE_MODEL_ID,
  "api:", process.env.GENKIT_GOOGLEAI_API_VERSION,
  "keylen:", (process.env.GEMINI_API_KEY||"").length
);

devopsCheck.run({ context: "ping" })
  .then(r => { console.log("OK:", r); })
  .catch(e => { console.error("FAIL:", e?.message || e); process.exit(1); });
