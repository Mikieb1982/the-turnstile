# Project Blueprint: The Turnstile

## Overview

This project is a Next.js application integrated with Firebase. It provides user authentication (sign up and sign in) and displays a feed of articles from various sources.

## Implemented Features

### Styling and Design
*   **Layout:** A clean and modern layout with a responsive design that adapts to different screen sizes.
*   **Colors:** A vibrant color palette to create an energetic look and feel.
*   **Typography:** Expressive and relevant typography with a clear hierarchy for headings and text.
*   **Iconography:** Modern and interactive icons to enhance user understanding and navigation.
*   **Effects:** Subtle noise texture on the background and multi-layered drop shadows for a sense of depth.

### Authentication
*   **Sign Up:** Users can create an account using their email and password.
*   **Sign In:** Registered users can sign in to their accounts.
*   **Server Actions:** User authentication is handled using Next.js Server Actions for secure and efficient data mutations.
*   **Validation:** Input fields are validated using Zod to ensure data integrity.

### Content
*   **Article Feed:** The application fetches and displays a feed of articles from various RSS feeds.
*   **RSS Parser:** The `rss-parser` library is used to parse the RSS feeds.

## Current Request: Project ID Update

**Plan:**
1.  **`package.json`:** Update the `firebase:login` script with the correct project ID: `the-turnstile-89754200-c7f0b`.
2.  **`firebase.json`:**
    *   Update `backendId` with the correct project ID.
    *   Set the `region` to `us-central1`.
    *   Remove the unnecessary `target` field.
3.  **`.firebaserc`:** Create the file and set the default project to `the-turnstile-89754200-c7f0b`.
