// app/league-table/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LeagueTablePage() {
  const router = useRouter();

  // instant redirect keeps the URL clean while preserving any aesthetic tweaks you made to /results
  useEffect(() => {
    router.replace('/results');
  }, [router]);

  // a tiny, branded splash while the redirect happens
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <div className="text-center">
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center
                     rounded-full bg-emerald-500/20 text-emerald-300 ring-1
                     ring-emerald-500/30"
        >
          <svg
            className="h-8 w-8 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-semibold text-white">
          League Table
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Redirecting to results…
        </p>
      </div>
    </main>
  );
}
