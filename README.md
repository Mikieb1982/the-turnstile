
```md
# The Scrum Book

![The Scrum Book logo](public/logo.svg)

The Scrum Book is a tile-based React + Vite application that helps rugby league fans build a personal log of matches they have attended. The MVP focuses on a single competition (the 2026 Betfred Super League), ships with a seeded fixture list, and is ready to connect to your own Firebase project for persistence.

---

## Features

- **Match Browser** — search and filter the full season fixture list and mark games you attended.
- **Match Detail View** — review venue notes, broadcast info, and log a match to your Scrum Book in one click.
- **My Scrum Book** — track total matches, unique venues, and revisit the games you have already logged.
- **Offline-friendly seed data** — local fixtures and venues power the UI until you wire up Firestore.

---

## Project Structure

```

src/
├── App.tsx                  # View orchestration and layout shell
├── components/              # Tile, header, filters, and list components
├── content/fixtures.ts      # Seeded venues and 2026 Super League fixtures
├── firebase.ts              # Optional Firebase initialisation (falls back to local data)
├── hooks/useScrumBook.ts    # Data loading, filtering, and attendance helpers
├── services/matchService.ts # Firestore + local persistence utilities
├── types.ts                 # Shared TypeScript types
└── views/                   # Browser, detail, and My Scrum Book screens

````

---

## Prerequisites

- Node.js 18 or newer  
- npm 9+

---

## Getting Started

### 1. Install dependencies

```bash
npm install
````

### 2. Run the dev server

```bash
npm run dev
```

The server prints a local URL you can open in your browser. Hot module replacement is enabled for rapid iteration on tile copy and layout tweaks.

> ✅ No Firebase account is required to run the MVP. The app works entirely offline using the seeded fixtures and localStorage.

### 3. Build for production

```bash
npm run build
```

The bundled assets are output to `dist/`. Use `npm run preview` to run the production build locally.

---

## Available Scripts

* `npm run dev` — start dev server with HMR
* `npm run build` — bundle production assets
* `npm run preview` — serve production build locally
* `npm run firebase:login` — authenticate with the Firebase CLI before your first deploy
* `npm run firebase:serve` — run the Firebase Hosting emulator to test the built app locally
* `npm run firebase:deploy` — build the project and deploy the `dist/` folder to Firebase Hosting

---

## Firebase Integration (Optional)

Copy the example environment file to start wiring up your own Firebase project:

```bash
cp .env.example .env.local
```

Update `.env.local` with the values from **Project Settings → General → Your apps → Web app** in the Firebase console. If you are not using Analytics you can leave `VITE_FIREBASE_MEASUREMENT_ID` empty. Set `VITE_USE_FIREBASE_EMULATORS=true` to point the app at your local emulators during development.

Restart `npm run dev` after saving the file. When the keys are missing the app falls back to the seeded fixtures and stores attendance locally in `localStorage`.

### Enable Google Sign-In

1. In the Firebase console, open **Build → Authentication → Sign-in method** and enable the **Google** provider. Configure the support email when prompted so users can sign in with their Google account.
2. Still in **Project settings → General**, scroll to **Your apps** and add the SHA-1 release fingerprint for every Android app that should support Google Sign-In. This step is required for Google to trust the OAuth client.
3. In **Project settings → General → Your project**, update the **Public-facing name** so it matches `project-99200945430`. Firebase uses this value during the Google account consent screen.

---

## Firestore Data Model

Create the following collections to mirror the MVP structure:

* **matches**

  * `competitionName: string`
  * `date: string` (ISO "YYYY-MM-DD")
  * `kickoffTime: string` ("HH:MM")
  * `round: string`
  * `homeTeam: string`
  * `awayTeam: string`
  * `venueId: string`
  * `broadcast?: string`
  * `headline?: string`

* **venues**

  * `name: string`
  * `city: string`
  * `capacity?: number`
  * `notes?: string`

* **users**

  * Each document ID should match an authenticated user ID
  * Field: `attendedMatches: (string | { matchId: string; attendedOn: string })[]`

Seed the collections manually in the Firestore console while you build the UI.
The default fixture list in `src/content/fixtures.ts` mirrors the 2026 season so you can copy/paste values during the initial import.

---

## Suggested Security Rules

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /matches/{document=**} {
      allow read;
    }
    match /venues/{document=**} {
      allow read;
    }
  }
}
```

---

## Customising the Template

1. **Branding** — update the CSS custom properties in `index.html` to change gradients and accent colours.
2. **Fixtures** — edit `src/content/fixtures.ts` to swap in a different competition or off-season friendly schedule.
3. **Copy & Tiles** — adjust the hero copy in `src/components/Header.tsx` and tile content in the view components.
4. **Data Sources** — replace the seed fetch helpers in `src/services/matchService.ts` with API calls or additional Firestore queries as you scale beyond the MVP.

---

## Deployment

The repository is pre-configured for Firebase Hosting. To deploy the built app:

1. Install the Firebase CLI if you have not already:

   ```bash
   npm install -g firebase-tools
   ```

2. Authenticate once on your machine:

   ```bash
   npm run firebase:login
   ```

3. Build and deploy:

   ```bash
   npm run firebase:deploy
   ```

The Firebase configuration in `firebase.json` rewrites all routes to `index.html` so that client-side routing works as expected.
Update `.firebaserc` (or run `firebase use --add`) so that the `default` project matches your Firebase Hosting site before deploying.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---

## License

MIT


Would you like me to also add **screenshots / animated GIFs** sections (placeholders) so you can drop visuals of the app UI in the README for GitHub/marketing polish?


