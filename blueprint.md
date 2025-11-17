# Project Blueprint: The Turnstile

## Overview

This document outlines the plan for updating the visual design of "The Turnstile" application to match the provided mockups. The goal is to create a modern, mobile-first, and visually appealing user interface.

## Current State Analysis

The existing application has a basic structure with a dark theme, but it does not fully align with the design vision presented in the mockups. Key areas for improvement include layout, color scheme, typography, and component styling.

## Design Plan

The following changes will be implemented to align the application with the mockups.

### 1. Color Palette & Theme

- **Primary Background:** A dark navy/charcoal color (`#1a202c`).
- **Card/Secondary Background:** A slightly lighter shade of the primary background (`#2d3748`).
- **Accent Color:** A bright cyan/blue for interactive elements and highlights.
- **Text Color:** White or a light gray for readability.

### 2. Typography

- Review and update the font stack to use a clean, modern sans-serif font that matches the mockups.

### 3. Layout and Structure

- **`app/layout.tsx`**: Update the root layout to include the main background color.
- **Header (`components/Header.tsx`)**: Redesign the header to feature the "The Turnstile" logo, the page title, and the user's profile information.
- **Bottom Navigation**: Replace the existing footer with a mobile-friendly bottom navigation bar containing links to "Dashboard", "Fixtures", "Table", and "Profile".

### 4. Component Redesign

- **Dashboard (`app/page.tsx`)**:
    - "Your Next Match" Card: Create a prominent card to display the user's next upcoming match.
    - "Nearby Matches": Implement a horizontally scrolling section for nearby matches.
    - "My Stats Snapshot": Display key statistics like "Total Matches" and "Grounds Visited".
- **Profile Page (`app/profile/page.tsx`)**:
    - Redesign the profile page to showcase user stats, badges/achievements, and photos in a visually engaging way.
- **Cards**: Update the general card styles to have rounded corners and subtle shadows as seen in the mockups.

### 5. Implementation Steps

1. **Update `tailwind.config.ts`** with the new color palette.
2. **Update `app/globals.css`** to apply the base background styles.
3. **Create a new `components/BottomNav.tsx`** component for the bottom navigation bar.
4. **Modify `app/layout.tsx`** to use the new `BottomNav` component instead of the existing `Footer`.
5. **Redesign `components/Header.tsx`**.
6. **Rebuild the `app/page.tsx` (Dashboard)** using the new design and components.
7. **Rebuild the `app/profile/page.tsx`** to match the mockup.
8. **Run `npm run lint -- --fix`** to ensure code quality after the changes.
