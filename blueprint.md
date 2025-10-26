# Project Blueprint

## Overview

This is a Next.js application that displays a list of NRL teams. It's built with modern technologies and designed to be both visually appealing and performant.

## Core Technologies

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.

## Implemented Features

- **Team Showcase:** The main page displays a grid of NRL teams with their logos.
- **Modern Design:** The UI is designed to be clean, modern, and visually appealing, with a dark theme.
- **Skeleton Loading:** A skeleton loading screen is displayed while the team data is being fetched, providing a smooth user experience.

## Project Structure

- **/app:** The core directory for file-based routing.
- **/app/page.tsx:** The main page of the application.
- **/app/components/SkeletonCard.tsx:** A component for the skeleton loading effect.
- **/app/data.ts:** A file containing the NRL team data.
- **/public:** A directory for static assets like images.

## Current Plan

- **Resolve ESLint Issues:** The immediate next step is to fix the ESLint errors and warnings to ensure code quality.
- **Refactor Image Components:** The current implementation uses the standard `<img>` tag, which is not optimal for performance. The plan is to refactor this to use the `next/image` component for automatic image optimization.
