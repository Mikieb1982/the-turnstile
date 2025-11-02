The Turnstile (Next.js Edition)
The Turnstile is a modern Next.js application designed for rugby league fans to track match attendance, view fixtures, and log their support. It's built with Next.js (App Router), TypeScript, and Tailwind CSS, and it integrates with Firebase for authentication and database persistence.
This project also includes an ai/ directory with Genkit tools to assist in development and a functions/ directory for a Python-based AI DevOps agent.
Tech Stack
 * Framework: Next.js (App Router)
 * Language: TypeScript
 * Styling: Tailwind CSS
 * Backend: Firebase
   * Authentication
   * Firestore
   * Hosting
   * Cloud Functions (Python)
 * Dev Tools: Genkit (for AI-assisted development)
Getting Started
 * Clone the repository:
   git clone [your-repo-url]
cd the-turnstile

 * Install dependencies:
   npm install

 * Configure Environment Variables:
   Copy the example environment file:
   cp .env.example .env.local

   Open .env.local and add your Firebase project configuration. You can get this from your Firebase project settings.
 * Run the Development Server:
   npm run dev

   The application will be running on http://localhost:3000.
Environment Variables
Your .env.local file should contain the following variables:
 * NEXT_PUBLIC_FIREBASE_CONFIG: A JSON string containing your client-side Firebase config (apiKey, authDomain, etc.). See .env.example.
 * GEMINI_API_KEY: (Optional) Your Google AI API key, required to run the local Genkit AI tools in the ai/ directory.
Deployment
This project is configured for deployment to Firebase Hosting and includes GitHub Actions workflows for continuous deployment (CI/CD).
When pushing to main or creating a Pull Request, the workflows in .github/workflows/ will automatically build and deploy the application.
GitHub Secrets
For the GitHub Actions to work, you must set the following secrets in your repository settings:
 * FIREBASE_SERVICE_ACCOUNT: The JSON service account key from your Firebase project.
 * FIREBASE_PROJECT_ID: Your Firebase project ID.
Available Scripts
 * npm run dev: Starts the local development server.
 * npm run build: Bundles the app for production.
 * npm run start: Starts the production server.
 * npm run lint: Runs ESLint to check for code quality issues.
