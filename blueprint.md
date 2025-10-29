# Project Blueprint

## Overview

This document outlines the plan for improving the codebase by addressing security vulnerabilities, cleaning up redundant code, and preparing for a transition to a real backend.

## Implemented Changes

*   **Resolved Merge Conflicts:** Fixed the merge conflicts in the `.gitignore` file to ensure proper version control.
*   **Enhanced Security:** Removed the hardcoded API key from `ai/devops-env.ps1` to prevent security vulnerabilities.
*   **Cleaned Up Redundancies:**
    *   Removed the deprecated `services/profileService.ts` file.
    *   Removed the redundant `lib/teams.ts` file, which contained data for a different league.
    *   Removed the empty `types.js` file.

## Future Plans: Backend Migration

The application currently relies on mock data. The next phase of development will focus on migrating to a real backend using Node.js/Express and Firestore.

### Action Plan:

1.  **Set up Firebase:**
    *   Create a new Firebase project.
    *   Configure Firestore as the database.
2.  **Backend Development:**
    *   Create a new Node.js/Express server.
    *   Implement API endpoints for fetching and updating data.
3.  **Frontend Integration:**
    *   Create a new service `services/firestoreService.ts` to interact with the new backend.
    *   Replace the mock data with data from the new backend.