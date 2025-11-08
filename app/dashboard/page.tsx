// app/dashboard/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/firebase/AuthContext';
import Loading from '@/app/loading';

/* --- components --- */
import WelcomeCard from '@/components/WelcomeCard';
import StatsDashboard from '@/components/StatsDashboard';
import SeasonProgress from '@/components/SeasonProgress';
import RecentMatchesTable from '@/components/RecentMatchesTable';
import TeamBadge from '@/components/TeamBadge';
import ActionButton from '@/components/ActionButton';

/* ---------- types ---------- */
interface LoggedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

/* ---------- page ---------- */
export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [matches, setMatches] = useState<LoggedMatch[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  /* ---- mock stats ---- */
  const userData = {
    name: user?.displayName || 'Fan',
    matchesAttended: 24,
    teamsVisited: 8,
    venuesVisited: 12,
    consecutiveWeeks: 5,
    currentWeek: 18,
    totalWeeks: 27,
  };

  /* ---- fetch matches ---- */
  useEffect(() => {
    if (!user) {
      if (!authLoading) setIsLoadingMatches(false);
      return;
    }

    (async () => {
      setIsLoadingMatches(true);
      try {
        const q = query(
          collection(db, 'match-logs'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        const snap = await getDocs(q);
        const fetched: LoggedMatch[] = snap.docs.map((doc) => {
          const d = doc.data();
          const [homeScoreStr, awayScoreStr] = (d.score || '0-0').split('-');
          return {
            id: doc.id,
            homeTeam: d.homeTeam,
            awayTeam: d.awayTeam,
            date: d.date,
            homeScore: parseInt(homeScoreStr, 10) || 0,
            awayScore: parseInt(awayScoreStr, 10) || 0,
          };
        });
        setMatches(fetched);
      } catch (e) {
        console.error('Fetch matches error:', e);
      } finally {
        setIsLoadingMatches(false);
      }
    })();
  }, [user, authLoading]);

  /* ---- auth guards ---- */
  if (authLoading) return <Loading />;
  if (!user)
    return (
      <div className="text-center">
        Please{' '}
        <Link href="/sign-in" className="text-emerald-400 hover:underline">
          sign in
        </Link>{' '}
        to see your dashboard.
      </div>
    );

  /* ---- render ---- */
  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-6 py-16 sm:py-24">
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-emerald-500/10 blur-3xl dark:bg-emerald-500/20"
      />

      <div className="mx-auto max-w-7xl space-y-10">
        {/* welcome */}
        <WelcomeCard userName={userData.name} />

        {/* stats */}
        <StatsDashboard
          matchesAttended={userData.matchesAttended}
          teamsVisited={userData.teamsVisited}
          venuesVisited={userData.venuesVisited}
          consecutiveWeeks={userData.consecutiveWeeks}
        />

        {/* season progress */}
        <SeasonProgress
          currentWeek={userData.currentWeek}
          totalWeeks={userData.totalWeeks}
          matchesAttended={userData.matchesAttended}
        />

        {/* recent matches */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Recent Matches
            </h2>
            <Link href="/match-log">
              <ActionButton variant="accent" size="sm">
                Log Match
              </ActionButton>
            </Link>
          </div>

          <Suspense fallback={<MatchesSkeleton />}>
            <RecentMatchesTable matches={matches} />
          </Suspense>
        </section>

        {/* team collection */}
        <section className="rounded-2xl bg-white/60 p-6 shadow-lg ring-1
                             ring-slate-900/5 backdrop-blur dark:bg-slate-800/60
                             dark:ring-white/10">
          <h2 className="font-display text-2xl font-semibold tracking-tight
                         text-slate-900 dark:text-white">
            Your Team Collection
          </h2>

          <div className="mt-6 grid grid-cols-4 gap-6 sm:grid-cols-6 lg:grid-cols-8">
            {/* mock badges – replace with real data */}
            {[
              { name: 'Wigan', visited: true },
              { name: 'St Helens', visited: true },
              { name: 'Leeds', visited: true },
              { name: 'Hull FC', visited: false },
            ].map((t) => (
              <TeamBadge
                key={t.name}
                teamName={t.name}
                visited={t.visited}
                size="md"
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/teams">
              <ActionButton variant="ghost" size="sm">
                View All Teams
              </ActionButton>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- skeleton ---------- */
function MatchesSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </div>
  );
}
