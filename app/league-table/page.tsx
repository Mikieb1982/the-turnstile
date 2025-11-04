'use client';

// This page now renders the Results page, which contains the
// main League Table, Match Results, and Playoffs tabs.
// This consolidates the UI and removes the old LeagueTable-v4.
import ResultsPage from '../results/page';

export default function LeagueTablePage() {
  return <ResultsPage />;
}
