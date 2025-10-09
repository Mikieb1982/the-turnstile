The TurnstileThe Turnstile is a modern React application designed for rugby league fans to track match attendance, view fixtures, and log their support. It's built to work offline-first with local data and offers seamless integration with Firebase for cloud features like authentication and database persistence.FeaturesMatch Browser: Search and filter the full season fixture list.Attendance Logging: Mark games you've attended with a single click.Personalized Dashboards: Get tailored views for upcoming fixtures or matches near your location.Fan Profile: Track stats like total matches attended and unique venues visited.Offline-First: The app works out of the box with local data, no backend configuration required.Tech StackFramework: React 19 with ViteLanguage: TypeScriptStyling: Tailwind CSSBackend (Optional): Firebase (Authentication, Firestore, Hosting)Getting StartedPrerequisitesNode.js version 20.x or highernpm (usually comes with Node.js)1. Clone & Install DependenciesFirst, clone the repository to your local machine and install the required npm packages.git clone [https://github.com/mikieb1982/the-turnstile.git](https://github.com/mikieb1982/the-turnstile.git)
cd the-turnstile
npm install
2. Configure Environment VariablesThe application uses environment variables for connecting to Firebase and Google Authentication.Copy the example environment file:cp .env.example .env.local
Open .env.local and add your Firebase project credentials and your Google OAuth Client ID.# Firebase configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
# ... and so on

# Google OAuth configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
Note: The app will run in a fully offline mode, using localStorage for all data, if these variables are not provided. This is useful for UI development without a backend setup.3. Run the Development ServerStart the local Vite development server.npm run dev
The application will now be running on http://localhost:5173.Firebase IntegrationThis project is configured to work seamlessly with Firebase services.Firestore Data ModelThe app expects the following collections in your Firestore database. You can create these manually in the Firebase Console.matches: Stores the fixture list for the season.venues: Contains details about each stadium.users/{userId}: Each document is keyed by a user's authentication UID and contains user-specific data.attendedMatches: An array of match IDs that the user has attended.Security RulesFor a production environment, use the following Firestore security rules to protect user data while allowing public read access to matches and venues.rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Matches and venues are publically readable
    match /matches/{document=**} {
      allow read;
    }
    match /venues/{document=**} {
      allow read;
    }
  }
}
DeploymentThe repository is pre-configured for deployment to Firebase Hosting and includes a GitHub Actions workflow for continuous deployment.Manual DeploymentLogin to Firebase:npm run firebase:login
Build and Deploy:npm run firebase:deploy
Continuous Deployment (CI/CD)The .github/workflows/firebase-hosting-merge.yml workflow automatically builds and deploys the application to Firebase Hosting whenever code is pushed to the main branch.To enable this, you need to add your Firebase project details as secrets in your GitHub repository settings:FIREBASE_SERVICE_ACCOUNT: The JSON service account key from your Firebase project.FIREBASE_PROJECT_ID: Your Firebase project ID.Available ScriptsScriptDescriptionnpm run devStarts the local development server with HMR.npm run buildBundles the app for production into the dist/ folder.npm run previewServes the production build locally for testing.npm run firebase:serveRuns the local Firebase Hosting emulator.npm run firebase:deployBuilds and deploys the app to Firebase Hosting.
