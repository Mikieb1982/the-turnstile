# The Scrum Book

The Scrum Book is a Vite + React application that curates fixtures, stats, and community resources for rugby league fans. The project has been redesigned with a marketing-style landing page and modular dashboards that can be adapted for future seasons.

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm 9+

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

The dev server prints a local URL you can open in your browser. Hot module replacement is enabled for rapid iteration on layout and content.

### Production Build
```bash
npm run build
```

The output is written to `dist/` and can be deployed to any static host. Use `npm run preview` to verify the production bundle locally.

## Environment Variables

Firebase is used for authentication and data storage. Create a `.env.local` file at the project root with the following keys:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

## Customisation Tips

- Update the colour palette in `index.html` by editing the CSS custom properties within the `<style>` block.
- Landing page content lives in `components/AboutView.tsx`; dashboard cards and stats are under `components/`.
- Tailwind utilities are provided at runtime via the CDN configuration in `index.html`, so no additional build-step changes are required for styling tweaks.

## Deployment

The repository includes a `deploy` script that publishes the built assets to GitHub Pages.
```bash
npm run deploy
```
Make sure the `homepage` field in `package.json` reflects the correct repository URL before deploying.
