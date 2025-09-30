
```md
# The Scrum Book

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
* `npm run deploy` — deploy to GitHub Pages

---

## Firebase Integration (Optional)

Copy the example environment file to start wiring up your own Firebase project:

```bash
cp .env.example .env.local
```

Update `.env.local` with the values from **Project Settings → General → Your apps → Web app** in the Firebase console:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Restart `npm run dev` after saving the file. When the keys are missing the app falls back to the seeded fixtures and stores attendance locally in `localStorage`.

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

The project includes a Pages-friendly script if you want to ship to GitHub Pages:

```bash
npm run deploy
```

Update the `homepage` field in `package.json` to point at your repository slug before deploying. Any static host that can serve the files in `dist/` will work.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---

## License

MIT


Would you like me to also add **screenshots / animated GIFs** sections (placeholders) so you can drop visuals of the app UI in the README for GitHub/marketing polish?


