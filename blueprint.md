# Project Blueprint

## Overview

This project is a Next.js application with a turnstile component. The goal is to integrate Firebase for backend services.

## Existing Features

* Next.js application with App Router.
* A `useLocalStorage` hook for client-side storage.
* ESLint configured for TypeScript and React.
* Firebase integration.

## Plan for Firebase Integration (Completed)

1.  **Initialize Firebase:** Create the necessary Firebase configuration files (`.firebaserc`, `firebase.json`).
2.  **Create Firebase Config:** Create a `lib/firebase.ts` file to initialize the Firebase app.
3.  **Add Firebase to MCP:** Update the `.idx/mcp.json` file to include the Firebase server configuration.
