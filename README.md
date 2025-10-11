# The Turnstile

A lightweight React shell that lets Firebase Hosting teams plug Genkit actions into a match-day
workflow without carrying the weight of the previous full dashboard. The UI ships with mock fixture
data so it works out of the box and exposes a clean hook for invoking Genkit actions from the
browser.

## Features

- 🔌 **Genkit-ready hook** – call `useGenkitAction` with any action path exposed by your Functions or
  Genkit dev server.
- 📅 **Fixture selector** – browse the included mock data and send the selected match to your action
  payload in one click.
- 🧪 **Environment-friendly** – no Tailwind or PostCSS dependencies required; the build works in
  constrained environments.

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm run dev
```

The app boots on [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build
```

## Configuring Genkit

Set `VITE_GENKIT_BASE_URL` to the root where your Genkit actions are exposed. For example, when using
the Firebase emulator suite you can add the following entry to `.env.local`:

```bash
VITE_GENKIT_BASE_URL=http://localhost:3400
```

The app defaults to `/genkit`, which matches the proxy path recommended by the Genkit documentation.
If you are serving from Firebase Hosting, add a rewrite to forward `/genkit/**` to your Cloud
Functions instance.

### Triggering an action

`useGenkitAction` wraps the REST call and normalises common response shapes (`{ output }` or
`{ data }`). Update the action name in `App.tsx` and shape the request payload to suit your workflow.
The hook exposes the following state:

- `status`: `idle | loading | success | error`
- `data`: parsed response payload
- `error`: human-friendly message derived from the response body
- `run(input)`: executes the HTTP request
- `reset()`: cancels the active request (if any) and clears the state

Example usage from `App.tsx`:

```tsx
const { status, data, error, run } = useGenkitAction<MatchInsightInput, MatchInsightResponse>(
  'actions/matchInsights'
);

void run({
  matchId: selectedMatch.id,
  homeTeam: selectedMatch.homeTeam.name,
  awayTeam: selectedMatch.awayTeam.name,
  venue: selectedMatch.venue,
  startTime: selectedMatch.startTime,
});
```

## Firebase Hosting

The existing Firebase Hosting configuration continues to serve `dist/index.html` for every route. To
add a proxy for Genkit when deploying to Firebase, extend `firebase.json` with an additional rewrite
pointing to your Cloud Functions region:

```json
{
  "hosting": {
    "rewrites": [
      { "source": "/genkit/**", "function": "genkitHandler" }
    ]
  }
}
```

That way the same front-end works locally with the emulator suite and in production with your
Genkit-backed Cloud Function.
