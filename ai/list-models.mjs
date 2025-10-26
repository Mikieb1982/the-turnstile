const vers = ["v1","v1beta"];
const key = process.env.GEMINI_API_KEY;
if (!key) { console.error("No GEMINI_API_KEY"); process.exit(1); }

(async () => {
  for (const v of vers) {
    const res = await fetch(`https://generativelanguage.googleapis.com/${v}/models?key=${key}`);
    const json = await res.json().catch(()=>({}));
    if (!json || !json.models) {
      console.log(v, "FAILED:", JSON.stringify(json));
      continue;
    }
    console.log(`\n=== ${v} models (${json.models.length}) ===`);
    for (const m of json.models) {
      const name = m.name; // e.g. "models/gemini-1.5-flash-8b"
      const supports = (m.supportedGenerationMethods||[]).join(",");
      console.log(name, "|", supports);
    }
  }
})();
