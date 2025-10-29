# Project Blueprint

## Overview

This project is a Next.js application for Rugby League Super League fans. The goal is to integrate Firebase for backend services, including authentication and provide a rich user experience with a navigation bar.

## Existing Features

* Next.js application with App Router.
* A `useLocalStorage` hook for client-side storage.
* ESLint configured for TypeScript and React.
* Firebase integration.
* A visually appealing and informative landing page for "The Turnstile", specifically for Rugby League Super League fans.
* Firebase Authentication with sign-in, sign-up, and sign-out functionality, including Google Sign-In.
* A responsive navigation bar with links to the different features of the application.
* Placeholder pages for the "Dashboard", "Match Log", and "Achievements" navigation links.
* Multi-layered drop shadows on cards for a "lifted" effect.
* A glow effect on the primary call-to-action button.
* An improved "Gamification & Social Sharing" section with a more engaging title and description, and a more relevant icon.
* A populated dashboard with relevant tiles for Lifetime Stats, Recent Activity, and Achievements.
* A form on the "Match Log" page to enable users to submit match details.
* An "Achievements" page that displays a gallery of achievements.
* A "Super League News" component on the dashboard that fetches and displays the latest news from an RSS feed.
* An improved `AuthButton` component with a more user-friendly design, including a welcome message, profile icon, and a dropdown menu with profile and sign-out links.
* A "Profile" page that displays the user's profile information.

## Linting and Code Quality (Completed)

* Resolved various `eslint` errors to improve code quality and maintainability.
* Fixed `any` type errors in `app/actions.ts` by introducing a specific `AuthState` interface and using `unknown` for the catch block error type.
* Removed an unused `Shield` import and fixed an unescaped apostrophe in `app/dashboard/page.tsx`.
* Replaced the `<img>` tag with the `next/image` component in `app/profile/page.tsx` to resolve the `no-img-element` warning and improve performance.
* Fixed an unescaped apostrophe in `app/sign-in/page.tsx`.
* Resolved issues with the `lint` command by first attempting to modify the `package.json` script and then by running `eslint` directly.

## Plan for Profile Page (Completed)

1.  **Create Profile Page:** Create a new page at `app/profile/page.tsx`.
2.  **Display Profile Information:** Display the user's profile picture, display name, and email address.
3.  **Add Edit Button:** Include an "Edit Profile" button to allow users to update their profile information.

## Security Vulnerabilities (Resolved)

* Updated the `firebase` package to the latest version to resolve all security vulnerabilities.
