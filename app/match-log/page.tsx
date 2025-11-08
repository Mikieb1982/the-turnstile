// app/league-table/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Trophy } from 'lucide-react';

export default function LeagueTablePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/results');
  }, [router]);

  /*----------------  aesthetic loader  ----------------*/
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center
                     bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-emerald-500/10 blur-3xl"
      />

      <div className="text-center">
        <div
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center
                     rounded-full bg-emerald-500/20 text-emerald-300 ring-1
                     ring-emerald-500/30"
        >
          <Trophy className="h-8 w-8 animate-pulse" />
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
