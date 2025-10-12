# The Turnstile

The Turnstile is a modern React application designed for rugby league fans to track match attendance, view fixtures, and log their support. It offers an offline-first experience while still integrating seamlessly with Firebase for cloud-powered features like authentication and database persistence.

## Features

- **Match Browser:** Search and filter the full season fixture list.
- **Attendance Logging:** Mark games you've attended with a single click.
- **Personalized Dashboards:** Toggle between upcoming fixtures, local matches, and other tailored views.
- **Fan Profile:** Track stats such as total matches attended and unique venues visited.
- **Offline-First:** Works out of the box with local data without any backend configuration.

## Tech stack

- **Framework:** React 19 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend (optional):** Firebase (Authentication, Firestore, Hosting)

## Getting started

### Prerequisites

- Node.js 20.x or higher
- npm (usually bundled with Node.js)

### 1. Clone and install dependencies

```bash
git clone https://github.com/mikieb1982/the-turnstile.git
cd the-turnstile
npm install
```

### 2. Configure environment variables

Copy the example environment file and update it with your Firebase project credentials and Google OAuth client ID.

```bash
cp .env.example .env.local
```

Fill in the following values in `.env.local`:

```bash
# Firebase configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
# ...and so on

# Google OAuth configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

> **Note:** The app runs fully offline (using `localStorage`) if these variables are not provided, which is useful for UI development without a backend setup.

### 3. Run the development server

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Firebase integration

### Firestore data model

The app expects the following collections in your Firestore database. You can create these manually in the Firebase Console.

- `matches`: Stores the fixture list for the season.
- `venues`: Contains details about each stadium.
- `users/{userId}`: Each document is keyed by a user's authentication UID and contains user-specific data.
- `attendedMatches`: An array of match IDs that the user has attended.

### Security rules

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Matches and venues are publicly readable
    match /matches/{document=**} {
      allow read;
    }
    match /venues/{document=**} {
      allow read;
    }
  }
}
```

## Deployment

The repository is pre-configured for deployment to Firebase Hosting and includes a GitHub Actions workflow for continuous deployment.

### Manual deployment

```bash
npm run firebase:login
npm run firebase:deploy
```

### Continuous deployment (CI/CD)

The `.github/workflows/firebase-hosting-merge.yml` workflow automatically builds and deploys the application to Firebase Hosting whenever code is pushed to the `main` branch.

Add the following secrets in your GitHub repository settings:

- `FIREBASE_SERVICE_ACCOUNT`: The JSON service account key from your Firebase project.
- `FIREBASE_PROJECT_ID`: Your Firebase project ID.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server with HMR. |
| `npm run build` | Bundles the app for production into the `dist/` folder. |
| `npm run preview` | Serves the production build locally for testing. |
| `npm run firebase:serve` | Runs the local Firebase Hosting emulator. |
| `npm run firebase:deploy` | Builds and deploys the app to Firebase Hosting. |

## CLI setup reference

If you want to scaffold a brand-new TypeScript playground outside of this repository, run the following commands:

```bash
mkdir my-genkit-app
cd my-genkit-app
npm init -y
mkdir src
touch src/index.ts
npm install -D typescript tsx
npx tsc --init
```

This snippet mirrors the quick-start notes that previously lived in `src/index.ts` so that the compiler only sees valid TypeScript modules.
