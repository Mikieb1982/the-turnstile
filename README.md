
```md
# The Scrum Book

![The Scrum Book logo](public/logo.png)

The Scrum Book is a modern React + Vite application that helps rugby league fans build a personal log of matches they have attended. The MVP focuses on a single competition (the 2026 Betfred Super League), ships with a seeded fixture list, and is ready to connect to your own Firebase project for persistence.

---

## Features

- **Match Browser** — search and filter the full season fixture list and mark games you attended.
- **Match Day dashboards** — jump to the fixtures happening soon or near you with tailored views.
- **My Scrum Book** — track total matches, unique venues, and revisit the games you have already logged.
- **Offline-friendly seed data** — local fixtures and venues power the UI until you wire up Firestore.

---

## Project Structure

```

.
├── App.tsx                # Root view orchestration and layout shell
├── components/            # Feature views and shared UI components
├── contexts/              # React context providers (auth, theme, etc.)
├── hooks/                 # Custom hooks for theme, storage, and location
├── services/              # Data fetching, Firebase helpers, and mock data
├── utils/                 # Small shared utilities
├── index.tsx              # Vite entry point that renders <App />
├── public/                # Static assets (logo, favicon, manifest)
├── types.ts               # Shared TypeScript models
└── vite.config.ts         # Vite build configuration

```

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

### 2. Configure Google Sign-In

Copy the example environment file and update the placeholder with your Google OAuth web client ID. The value must match the
client configured for this project's origin in the Google Cloud Console.

```bash
cp .env.example .env.local
# then edit .env.local and replace the placeholder client ID
```

Restart the dev server after editing `.env.local` so Vite can pick up the new environment variable.

### 3. Run the dev server

```bash
npm run dev
```

The server prints a local URL you can open in your browser. Hot module replacement is enabled for rapid iteration on copy and layout tweaks.

> ✅ No Firebase account is required to run the MVP. The app works entirely offline using the seeded fixtures and localStorage.

### 4. Build for production

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

This build runs entirely offline using localStorage. To connect your own Firebase project, reinstall the `firebase` dependency and recreate a `firebase.ts` initialiser that exports `auth`, `db`, and `storage` instances. Copy `.env.example` to `.env.local`, populate the keys from the Firebase console, and restart the dev server so Vite picks up the changes.

### Enable Google Sign-In

1. In the Firebase console, open **Build → Authentication → Sign-in method** and enable the **Google** provider. Configure the support email when prompted so users can sign in with their Google account.
2. Still in **Project settings → General**, scroll to **Your apps** and add the SHA-1 release fingerprint for every Android app that should support Google Sign-In. This step is required for Google to trust the OAuth client.
3. In **Project settings → General → Your project**, update the **Public-facing name** so it matches `project-99200945430`. Firebase uses this value during the Google account consent screen.
4. Update your `.env.local` file in the project root with your web client ID so the frontend can call Google directly:

   ```bash
   # If you have not already created the file:
   cp .env.example .env.local
   # Then edit .env.local and replace the placeholder with your client ID

   ```

   Restart the dev server after saving the file. Without this value the Google button shows an actionable error instead of opening the consent screen.


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
The default fixture list in `services/mockData.ts` mirrors the 2026 season so you can copy/paste values during the initial import.

---

## Continuous Deployment to Firebase Hosting

This repository includes a GitHub Actions workflow (`.github/workflows/firebase-hosting.yml`) that builds the app and deploys it to Firebase Hosting every time you push to the `main` branch.

1. Create a Firebase service account with the **Firebase Hosting Admin** role and download the JSON credentials file.
2. In your GitHub repository settings, add the following secrets:
   - `FIREBASE_SERVICE_ACCOUNT` — the full JSON of the service account credentials.
   - `FIREBASE_PROJECT_ID` — the target Firebase project ID (for example, `the-scrum-book`).
3. Update `.firebaserc` so the `default` project matches the value of `FIREBASE_PROJECT_ID`.
4. Push to `main` (or trigger the workflow manually from the **Actions** tab) to build the project and deploy to Firebase Hosting.

The workflow uses `npm ci` and `npm run build` to ensure the production bundle is valid before publishing. Deployment status is reported directly in the pull request or commit checks.

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
2. **Fixtures** — edit `services/mockData.ts` to swap in a different competition or off-season friendly schedule.
3. **Copy & Layout** — adjust the hero copy in `components/Header.tsx` and the supporting view components.
4. **Data Sources** — replace the seed fetch helpers in `services/apiService.ts` with API calls or additional Firestore queries as you scale beyond the MVP.

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

## FAQ

### What are "binary files" and why do tools mention them?

Binary files are assets that are not stored as plain human-readable text—think images (`.png`, `.jpg`), fonts, audio, or compiled application bundles. Git can version these files, but many automated review tools skip showing their diffs because the raw bytes do not translate into meaningful text comparisons. When you see a warning such as "Binary files are not supported," it usually means the tool cannot preview changes to those assets inline. The files themselves are still tracked in the repository and ship with the app as expected.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

---
## License

MIT


Would you like me to also add **screenshots / animated GIFs** sections (placeholders) so you can drop visuals of the app UI in the README for GitHub/marketing polish?


