// app/admin/teams/page.tsx
import { Suspense } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { TeamInfo } from '@/types';
import TeamForm from './_components/TeamForm';
import TeamList from './_components/TeamList';

export type TeamDocument = TeamInfo & { id: string };

async function getTeams() {
  try {
    const snap = await getDocs(
      query(collection(db, 'teams'), orderBy('name', 'asc'))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as TeamDocument[];
  } catch (e) {
    console.error('Fetch teams error:', e);
    return [];
  }
}

export default async function AdminTeamsPage() {
  const teams = await getTeams();

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-6 py-16 sm:py-24">
      {/* soft spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20"
      />

      <div className="mx-auto max-w-7xl">
        <header className="mb-10 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Team Management
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Add new squads or edit existing ones in one place.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Add panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white/60 p-6 shadow-lg ring-1
                            ring-slate-900/5 backdrop-blur dark:bg-slate-800/60 dark:ring-white/10">
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                Add New Team
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Fill in the details below to create a team instantly.
              </p>
              <div className="mt-4">
                <Suspense fallback={<p className="text-sm text-slate-500">Loading form…</p>}>
                  <TeamForm />
                </Suspense>
              </div>
            </div>
          </aside>

          {/* Manage panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white/60 shadow-lg ring-1
                            ring-slate-900/5 backdrop-blur dark:bg-slate-800/60 dark:ring-white/10">
              <div className="border-b border-slate-900/10 px-6 py-4 dark:border-white/10">
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                  Manage Teams
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {teams.length} team{teams.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="p-2 sm:p-4">
                <Suspense fallback={<Skeleton />}>
                  <TeamList teams={teams} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
        />
      ))}
    </div>
  );
}
