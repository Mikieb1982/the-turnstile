// app/teams/page.tsx
import Image from 'next/image';
import { Landmark, MapPin, CalendarDays } from 'lucide-react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { TeamInfo } from '@/types';

/* ---- data ---- */
async function getTeams() {
  try {
    const snap = await getDocs(
      query(collection(db, 'teams'), orderBy('name', 'asc'))
    );
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (TeamInfo & { id: string })[];
  } catch (e) {
    console.error('Fetch teams error:', e);
    return [];
  }
}

/* ---- logo helper ---- */
const getTeamLogo = (name: string) => {
  const fallbackId = name
    .split(' ')
    .pop()
    ?.slice(0, 3)
    .toUpperCase() || '??';
  return `https://placehold.co/128x128/1a2c20/FFFFFF?text=${fallbackId}`;
};

/* -------------------------------------------------- */
/* Page                                               */
/* -------------------------------------------------- */
export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <header className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Super League Teams
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Every club, stadium and story in one place.
          </p>
        </header>

        {teams.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 p-10 text-center">
            <p className="text-slate-300">No teams found.</p>
            <p className="mt-1 text-sm text-slate-400">
              An admin can add teams from the dashboard.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((t) => (
              <article
                key={t.id}
                className="group rounded-2xl border border-slate-800 bg-slate-800/40
                           p-6 shadow-lg shadow-black/20 ring-1 ring-white/5
                           transition hover:scale-[1.02] hover:border-emerald-400/50"
              >
                {/* crest */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={getTeamLogo(t.name)}
                      alt={`${t.name} crest`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">
                      {t.name}
                    </h2>
                    <p className="text-sm text-slate-400">{t.location}</p>
                  </div>
                </div>

                {/* details */}
                <div className="mt-5 grid gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CalendarDays className="h-4 w-4 text-slate-500" />
                    <span>Established {t.established}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>{t.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-300">
                   <Landmark className="h-4 w-4 text-slate-500" />
                    <span>
                      {t.stadium.name}
                      <span className="ml-1 text-slate-400">
                        ({t.stadium.capacity.toLocaleString()})
                      </span>
                    </span>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-slate-900/40 px-4 py-3 ring-1 ring-white/10">
                  <p className="text-xs text-slate-400">{t.stadium.notes}</p>
                </div>

                {/* quick stat */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>League Titles</span>
                  <span className="font-bold text-emerald-400">
                    {t.titles}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
