# Firebase Blueprint: The Turnstile

This document outlines the Firebase architecture for "The Turnstile," a digital match day diary for rugby league fans.

## 1. Core Firebase Services

### Firebase Authentication

*   **Purpose**: To manage user accounts, secure user data, and enable personalized features.
*   **Providers**:
    *   Email/Password
    *   Google Sign-In (recommended for ease of use)
*   **Security**: User-specific data in Firestore will be secured using Authentication UID-based rules.

### Cloud Firestore (Database)

*   **Purpose**: To store all application and user data. This is the core backend for the app.
*   **Location**: eur3 (Frankfurt), as suggested in the Action Plan.
*   **Security Rules**:
    *   Public data (matches, teams, grounds, leagueTables, badges) will be readable by all.
    *   User-specific data (`users/{userId}`) will be readable/writable only by the authenticated user matching `{userId}`.

### Firebase Hosting

*   **Purpose**: To host the React (and future Next.js) Progressive Web App (PWA).
*   **Configuration**:
    *   Connected to GitHub for CI/CD via GitHub Actions.
    *   Serves the `dist` (for Vite/React) or `.next` (for Next.js) build directory.

### Cloud Storage

*   **Purpose**: To store user-uploaded content, primarily photos for match logs (a premium feature).
*   **Security Rules**: Files will be stored in user-specific folders (e.g., `user-uploads/{userId}/{matchId}.jpg`) and will be writable only by the owning user.

### Cloud Functions

*   **Purpose**: To run backend logic and asynchronous tasks.
*   **Triggers**:
    *   `onUserCreate`: A function to create a new user document in Firestore when a new user signs up via Auth.
    *   `onAttendedMatchWrite`: A function that triggers when a user logs a new match to recalculate their personal stats (e.g., totalMatches, uniqueGroundsVisited).
    *   `http-callable`: For any complex server-side actions needed by the app.

### Genkit (AI & Agents)

*   **Purpose**: To power the "Agent-First" strategy for operations, marketing, and development.
*   **Integration**: Deployed as Firebase Functions or Cloud Run services.
*   **Agents (as per strategy document)**:
    *   **Operations Agent**: (Gemini Flash-Lite) Manages support@theturnstile.app inbox, classifies emails, and logs feedback to a feedback collection in Firestore.
    *   **Growth Crew**: (Gemini Flash) Generates social media content by querying anonymized, aggregated stats from Firestore (e.g., "most attended match this weekend").
    *   **DevOps Crew**: (Gemini Pro) Assists in development, not directly deployed as a production service but used in the development workflow.

## 2. Firestore Data Model

This data model defines the collections and document structures for the app.

### users

*   **Path**: `users/{userId}`
*   **Description**: Stores private data and stats for each authenticated user.
*   **Document Fields**:
    ```json
    {
      "profile": {
        "displayName": "String",
        "email": "String",
        "createdAt": "Timestamp",
        "favoriteTeamId": "String (Ref to 'teams' collection)"
      },
      "stats": {
        "totalMatchesAttended": "Number",
        "uniqueGroundsVisited": "Number",
        "homeGamesAttended": "Number",
        "awayGamesAttended": "Number"
      },
      "premium": {
        "isActive": "Boolean",
        "passExpiryDate": "Timestamp",
        "tier": "String ('Season Pass')"
      }
    }
    ```
*   **Subcollections**:
    *   **attendedMatches** (`users/{userId}/attendedMatches/{matchId}`): A record of every match the user has logged. The `{matchId}` references a doc in the root `matches` collection.
        *   Fields: `{ "attendedAt": "Timestamp", "photoUrl": "String (URL to Cloud Storage)", "notes": "String" }`
    *   **unlockedBadges** (`users/{userId}/unlockedBadges/{badgeId}`): A record of all badges the user has earned. The `{badgeId}` references a doc in the root `badges` collection.
        *   Fields: `{ "unlockedAt": "Timestamp" }`

### matches (or fixtures)

*   **Path**: `matches/{matchId}`
*   **Description**: Stores all match fixtures and results for all seasons.
*   **Document Fields**:
    ```json
    {
      "season": "Number (e.g., 2025)",
      "competitionId": "String (Ref to 'competitions' collection)",
      "date": "Timestamp",
      "groundId": "String (Ref to 'grounds' collection)",
      "homeTeamId": "String (Ref to 'teams' collection)",
      "awayTeamId": "String (Ref to 'teams' collection)",
      "result": {
        "homeScore": "Number",
        "awayScore": "Number",
        "status": "String ('Scheduled', 'Full-Time', 'Postponed')"
      }
    }
    ```

### teams

*   **Path**: `teams/{teamId}`
*   **Description**: Public data for all teams.
*   **Document Fields**:
    ```json
    {
      "name": "String (e.g., 'Wigan Warriors')",
      "shortName": "String (e.g., 'Wigan')",
      "primaryColor": "String (Hex code)",
      "secondaryColor": "String (Hex code)",
      "groundId": "String (Ref to 'grounds' collection)"
    }
    ```

### grounds

*   **Path**: `grounds/{groundId}`
*   **Description**: Public data for all stadiums.
*   **Document Fields**:
    ```json
    {
      "name": "String (e.g., 'The Brick Community Stadium')",
      "location": "Geopoint",
      "capacity": "Number"
    }
    ```

### leagueTables

*   **Path**: `leagueTables/{tableId}` (e.g., `superLeague2025`)
*   **Description**: Stores the current standings for a specific competition and season. Updated via a Cloud Function or admin process.
*   **Document Fields**:
    ```json
    {
      "competitionName": "String (e.g., 'Betfred Super League')",
      "season": "Number (e.g., 2025)",
      "lastUpdated": "Timestamp",
      "tableRows": [
        {
          "position": "Number",
          "teamId": "String (Ref to 'teams' collection)",
          "played": "Number",
          "wins": "Number",
          "losses": "Number",
          "draws": "Number",
          "points": "Number",
          "form": ["W", "L", "W"]
        }
      ]
    }
    ```

### badges

*   **Path**: `badges/{badgeId}`
*   **Description**: Public definitions for all achievable badges.
*   **Document Fields**:
    ```json
    {
      "name": "String (e.g., 'On Tour')",
      "description": "String (e.g., 'Visit 5 different away grounds.')",
      "iconUrl": "String",
      "criteria": {
        "type": "String ('uniqueGrounds', 'totalMatches', 'derbyClash')",
        "value": "Number (e.g., 5)"
      }
    }
    ```
