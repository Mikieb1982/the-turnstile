// blueprint.md
# Project Blueprint: The Turnstile

## Overview

This project is a Next.js application integrated with Firebase. It provides user authentication (sign up and sign in) and allows users to track rugby league matches they've attended, view league tables, fixtures, and achievements.

## Implemented Features

### Styling and Design
* **Layout:** A clean, modern, dark-mode layout. Uses a responsive grid system and a fixed bottom navigation bar for mobile.
* **Colors:** A dark theme with a vibrant green primary color (`#32FF84`) and purple secondary color (`#A768FF`).
* **Typography:** Uses "Teko" for display fonts and "Roboto" for body text.
* **Iconography:** Uses Material Symbols (via Google Fonts) and `lucide-react` for icons.
* **Effects:** Custom `shadow-card-glow` utility for a green glow effect on interactive cards.

### Authentication
* **Sign Up/Sign In:** Email/password sign-up and sign-in using Firebase Auth.
* **Google Sign-In:** OAuth flow using Google as a provider.
* **Server Actions:** Auth mutations (`signUp`, `signIn`) are handled securely via Next.js Server Actions.
* **Validation:** Zod is used for schema validation on auth forms.
* **UI:** Auth pages include the app logo for branding.

### Core Features
* **Landing Page:** A static landing page (`app/page.tsx`) describing the app's features.
* **Dashboard:** (`app/dashboard/page.tsx`) A protected route showing user stats (matches attended) and a list of recent matches from Firestore. Includes an empty state to guide users to log a match.
* **Match Log:** (`app/match-log/*`) A protected page where users can log new matches via a form. Logged matches are displayed in a list with edit and delete functionality (using a modal for edits).
* **League Table:** (`app/league-table/page.tsx`) Displays a sortable league table with team crests.
* **Teams Page:** (`app/teams/page.tsx`) A grid display of all Super League teams and their stadium information, using consistent placeholder logos.
* **Achievements:** (`app/achievements/page.tsx`) A list of achievements, visually distinguishing between locked, unlocked, and in-progress items.
* **Profile Page:** (`app/profile/page.tsx`) A protected route allowing users to view their email, update their display name, and upload a custom profile picture to Firebase Storage.
* **Visits Page:** (`app/visits/page.tsx`) Allows users to track stadium visits manually.

## Current Request: Fix Build Error

**Completed Steps:**
1.  **Fixed Dashboard Query:** Updated `app/dashboard/page.tsx` to query the correct `match-logs` Firestore collection instead of `matches`.
2.  **Improved Dashboard Empty State:** Added a message and a "Log Your First Match" button to the dashboard's "Recent Matches" section when the user has no matches.
3.  **Standardized Team Logos:** Modified `app/teams/page.tsx` to use the same `getTeamLogo` function from `app/results/page.tsx`, ensuring consistent team placeholders.
4.  **Standardized Card Glow:** Replaced a hard-coded blue shadow on `app/teams/page.tsx` with the standard `shadow-card-glow` utility to match the primary green theme.
5.  **Themed Profile Button:** Changed the "Edit Profile" button in `app/components/profile/Profile-v2.tsx` from blue to the primary green color.
6.  **Branded Auth Pages:** Added the app logo to `app/sign-in/page.tsx` and `app/sign-up/page.tsx` to improve brand trust.
7.  **Improved Match Log Empty State:** Added a "No matches logged yet" message to the `app/match-log/client.tsx` component when the match list is empty.
8.  **Fixed Auth Import Error:** Resolved a `Module not found` error by renaming `lib/firebase/auth.tsx` to `lib/firebase/AuthContext.tsx`.
9.  **Fixed Dashboard Type Error:** Resolved a TypeScript error in `app/dashboard/page.tsx` related to score parsing.
10. **Fixed Visits Build Error:** Resolved a `Type 'object' is not assignable to type 'ReactNode'` error in `app/visits/actions.ts` by ensuring the returned `message` property is always a string, while moving validation errors to a separate `errors` property.
