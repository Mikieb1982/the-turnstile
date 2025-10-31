
# The Turnstile Blueprint

## Overview

The Turnstile is a Next.js application designed for rugby league fans. It allows users to track their favorite teams, log matches they've attended, and view upcoming fixtures and recent results.

## Implemented Features

### Core

*   **Framework**: Next.js with App Router
*   **Styling**: Tailwind CSS
*   **Authentication**: Firebase Authentication (Google Sign-In)
*   **Database**: Firestore
*   **Authentication UI**: Provides a clear sign-in/sign-out button (`AuthButton`) that reflects the user's current authentication state.

### "Match Log" Feature

*   **Log a New Match**: Users can log a new match they have attended by providing the home team, away team, date, and final score.
*   **Data Persistence**: Match data is saved to a "match-logs" collection in Firestore.
*   **Display Logged Matches**: Logged matches are displayed in a list on the "Match Log" page, showing the teams, date, and score.
*   **Real-time Updates**: The list of logged matches is updated in real-time after a new match is logged, edited, or deleted.
*   **Edit and Delete Matches**:
    *   Users can now edit or delete their logged matches.
    *   Each match entry has an "Edit" icon, which opens a modal pre-filled with the match details, allowing for easy updates.
    *   A "Delete" icon is also present, which prompts the user for confirmation before permanently removing the match log.
    *   Both editing and deleting are handled via server actions, ensuring data integrity and a smooth user experience.
*   **Component Structure**: The "Match Log" page is built with a server component to fetch data and a client component to handle user interaction and display the data.
*   **Server Actions**: Form submissions for creating, updating, and deleting matches are handled by Next.js server actions for a seamless user experience and improved performance.
*   **User-specific Matches**: Users can only view and interact with matches they have logged under their own account.
*   **Form Validation**: The "Log a New Match" form now includes form validation using the `zod` library to ensure data integrity.
*   **Loading State**: A loading skeleton is displayed while the match data is being fetched, providing a better user experience.

### User Profile

*   **Profile Page**: A dedicated profile page where users can view and update their profile information.
*   **Edit Profile**: Users can edit their display name and profile picture.
*   **Profile Picture Uploads**: Users can upload a profile picture, which is stored in Firebase Storage.

## Design

*   **Theme**: Dark theme with a modern, clean aesthetic.
*   **Color Palette**: The primary color is cyan, used for highlights, buttons, and interactive elements. The background is a dark gray (`gray-900`), and the text is white.
*   **Typography**: A clean, sans-serif font is used for readability.
*   **Layout**: The layout is responsive and uses a two-column grid on larger screens to separate the "Log a New Match" form from the "Logged Matches" list.
*   **Components**: Custom components are used for a consistent look and feel. The edit functionality utilizes a modal window for a focused user experience.

## Next Steps

*   [X] Add the ability to edit and delete logged matches.
*   [X] Secure Firestore Rules: Implement Firestore security rules to restrict access to the `match-logs` collection, ensuring users can only read and write their own documents.
*   [X] Add form validation to the "Log a New Match" form.
*   [X] Resolve build error related to Firebase Storage initialization.
*   [X] Add a loading state to the "Logged Matches" list while the data is being fetched.
*   [ ] Add pagination to the "Logged Matches" list.
