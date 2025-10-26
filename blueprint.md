
# The Turnstile: Blueprint

## I. Project Summary and Vision

"The Turnstile" is a digital companion for rugby league fans, designed as a Progressive Web App (PWA) and planned for future mobile application release via the Google Play Store.

### A. Mission and Unique Value Proposition

The central mission of "The Turnstile" is to deepen fan engagement by providing a dedicated platform where users can log their match attendance, track personal statistics, and celebrate their lifelong support for the sport.

*   **Unique Market Position**: While major sports apps are saturated with live scores and news, "The Turnstile" fills a niche by focusing on the individual fan's personal history and connection to the sport. It transforms passive viewership into an active, rewarding experience, serving as a digital record of a fan's dedication.
*   **Vision**: The long-term vision is to become the essential app for every rugby league fan.
*   **Target Audience**: The primary audience is the dedicated, passionate rugby league fan, likely based in the UK, Australia, or New Zealand, who is a regular match attendee or dedicated follower of a specific club. The initial focus will be on fans of the Betfred Super League.

## II. Core Features and Monetization

The application operates on a freemium model, offering a rich set of core features for free to maximize user acquisition, with specialized features available via a premium subscription for monetization.

### A. Free Tier (Focus on Acquisition)

The core features are designed to build a large user base:

*   **Match Log**: Users can browse fixtures and log every match they attend, building a personal history.
*   **Personal Dashboard**: Users view key statistics such as total matches attended, unique stadiums visited, and total points witnessed.
*   **Badge System**: Digital badges are earned for reaching milestones (e.g., "First Kick-Off," "On Tour") to gamify their support.
*   **Core Information**: Access to fixtures, results, the league table, and information on all team grounds.

### B. Premium Tier (Focus on Monetization)

Once a stable user base is established (e.g., 1,000+ active users), a low-cost subscription (e.g., €1.99/month or €15/year) will be introduced for specialized features:

*   **Advanced Statistics**: In-depth analytics, including head-to-head records for attended matches and performance stats for their favorite team on days they attended.
*   **Data Export**: The ability to export their complete match history to a CSV or PDF file.
*   **Customization**: Access to exclusive app themes, custom icons, or special profile badges.
*   **Photo Gallery Enhancements**: Increased cloud storage for uploading more photos to their match logs.

## III. The AI Operational Model: Agent-First Strategy

The project's competitive advantage and operational viability hinge on an "Agent-First" methodology, which transforms the solo founder venture into a highly automated business. This is achieved using a Google-Centric Hybrid Architecture.

### A. The Architecture

The architecture systematically combines different tools and models:

*   **Hybrid Approach**: It uses code-based agent frameworks (like CrewAI or Genkit) for complex, core business functions (e.g., software development assistance). Conversely, it uses no-code platforms (like n8n or Make.com) for linear, repetitive operational workflows (e.g., email triage).
*   **Google-Centric Ecosystem**: The entire system is centered on Google Gemini as the cognitive engine and the Canva Connect API as the creative engine.
*   **Portfolio of Models**: Different Gemini models are used based on the task complexity, speed, and cost, ensuring efficiency:
    *   Gemini 2.5 Pro: Reserved for advanced reasoning and coding tasks (DevOps Crew).
    *   Gemini 2.5 Flash: Used for creative tasks, balancing price and performance (Growth Crew).
    *   Gemini 2.5 Flash-Lite: Used for high-throughput, low-cost, simple tasks (Operations Agent).

### B. The Three Agent Crews (The Digital Workforce)

The business functions are delegated to three specialized AI agent crews:

| Agent Crew          | Primary Function                                                                                                 | Core Technology & Autonomy                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Operations Agent** | Automates customer support and the user feedback loop. Provides the highest immediate ROI by handling foundational administrative tasks. | Built with No-Code Platforms (n8n/Make.com) and Gemini 2.5 Flash-Lite. Tasks like email triage and FAQ responses are **Fully Automated**.                |
| **2. Growth Crew**      | Automates the marketing content pipeline from data analysis to visual creation.                               | Uses Gemini 2.5 Flash for content drafting and the Canva Connect API (Autofill API and Exports API) for automated visual graphics. Content drafting and visual creation are **Human-Augmented** tasks. |
| **3. DevOps Crew**      | Acts as an AI pair programmer to accelerate software development by automating boilerplate code and quality assurance. | Uses Code-Based Frameworks (CrewAI/Genkit) and Gemini 2.5 Pro. Code generation is a **Human-Augmented** task, while deployment is **Fully Automated**. |

## IV. The Founder’s Elevated Role

The implementation of these crews fundamentally augments and elevates the solo founder's role from a multi-disciplinary "doer" to a strategic "orchestrator".

The founder focuses on high-leverage, **Human-Led** activities that AI cannot replicate, such as:

*   Defining the overall product roadmap and long-term vision.
*   Making key architectural decisions (e.g., migrating to Next.js for SSR or setting Firestore security rules).
*   Setting the brand’s authentic voice and vision for marketing content.
*   Handling sensitive customer escalations and building personal relationships within the community.

## V. Current Development Plan

### A. Objective: Build the Match Log (CRUD Functionality)

This phase focuses on building the core functionality of the match log, allowing users to create, read, and delete match entries.

### B. Key Components

1.  **Add Match Form (`components/match-log/AddMatchForm.tsx`):**
    *   The form now includes logic to save match data to a `matches` collection in Firestore.
    *   User feedback is provided via success and error messages.
2.  **Match List (`components/match-log/MatchList.tsx`):**
    *   A new component is created to display the user's matches.
    *   The component fetches match data from Firestore and displays it in a list.
    *   A "Delete" button is included for each match, allowing users to remove entries.
3.  **Match Log Page (`/dashboard/match-log`):**
    *   The `MatchList` component is integrated into the page, displaying the user's matches.

### C. Technology Stack

*   **Frontend:** Next.js, React, Tailwind CSS
*   **Authentication:** Firebase Authentication
*   **Database:** Cloud Firestore
*   **Icons:** `lucide-react`

---

## VI. Previous Development Plans

### Build the Match Log (Form Integration)

... (rest of the blueprint) ...
