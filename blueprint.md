# Project Blueprint

## Overview

This document outlines the structure, features, and development plan for the The Turnstile application. It serves as a single source of truth for the project's design and implementation.

## Project Structure

-   `/app`: Core directory for file-based routing.
-   `/components`: Reusable UI components.
-   `/hooks`: Custom React hooks.
-   `/lib`: Utility functions and libraries.
-   `/public`: Static assets.
-   `/styles`: Global and component-specific styles.

## Implemented Features

-   User authentication and profile management.
-   Real-time match updates and predictions.
-   League tables and team statistics.
-   Social sharing of match outcomes.

## Development Plan

### Linting Error Remediation

1.  **Resolve `no-undef` error:** Delete the old `.eslintrc.cjs` file.
2.  **Resolve `no-explicit-any` errors:** Replace `any` with more specific types.
3.  **Resolve `set-state-in-effect` errors:** Refactor `useEffect` hooks to avoid direct state updates.
4.  **Resolve `exhaustive-deps` warnings:** Add missing dependencies to `useEffect` dependency arrays.
5.  **Resolve `no-unused-vars` errors:** Remove unused variables and imports.
6.  **Resolve `no-unescaped-entities` errors:** Escape special characters in JSX.
7.  **Resolve `no-img-element` warnings:** Replace `<img>` tags with the `next/image` component.
8.  **Resolve `rules-of-hooks` errors:** Ensure that hooks are called in the correct order.
9.  **Resolve `no-require-imports` errors:** Convert `require()` statements to ES6 imports.
10. **Resolve parsing errors:** Fix syntax errors in configuration files.
