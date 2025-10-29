# Set your Gemini API key as an environment variable
# $env:GEMINI_API_KEY = "YOUR_API_KEY"
$env:GENKIT_GOOGLEAI_API_VERSION = "v1"
$env:GOOGLE_MODEL_ID = "googleai/gemini-2.5-flash"
"Env ready. keylen=$($env:GEMINI_API_KEY.Length) model=$env:GOOGLE_MODEL_ID api=$env:GENKIT_GOOGLEAI_API_VERSION"
