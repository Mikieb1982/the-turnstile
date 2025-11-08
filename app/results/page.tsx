// app/results/page.tsx
'use client';

import { useState, useMemo } from 'react';
import {
  finalLeagueTable,
  selectedMatchResults,
  playoffResults,
  TEAMS,
} from '@/services/mockData';
import Image from 'next/image';
import Filters from '@/components/Filters';
import {
  ArrowUp,
  ArrowDown,
  Trophy,
  Calendar,
  Medal,
  Landmark,
} from 'lucide-react';

type SortableKeys = 'Position' | 'Team' | 'Pld' | 'W' | 'L' | 'D' | 'Pts';

/* -------------------------------------------------- */
/* Page                                               */
/* -------------------------------------------------- */
export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<'table' | 'matches' | 'playoffs'>(
    'table'
  );

  const [sortConfig, setSortConfig] = useState<{
    key: SortableKeys;
    direction: 'asc' | 'desc';
  }>({ key: 'Position', direction: 'asc' });

  /* ---- sorted league table ---- */
  const sortedTeams = useMemo(() => {
    const list = [...finalLeagueTable];
    list.sort((a, b) => {
      const av = a[sortConfig.key];
      const bv = b[sortConfig.key];
      if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
      if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [sortConfig]);

  /* ---- helpers ---- */
  const getTeamLogo = (name: string) => {
    const t = Object.values(TEAMS).find(
      (v) => v.name === name || v.shortName === name || v.id === name
    );
    return (
      t?.logoUrl ?? 'https://placehold.co/64x64/1a2c20/FFFFFF?text=??'
    );
  };

  const requestSort = (key: SortableKeys) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ column }: { column: SortableKeys }) => {
    if (sortConfig.key !== column)
      return <ArrowDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  /* -------------------------------------------------- */
  /* Renderers                                          */
  /* -------------------------------------------------- */
  const LeagueTable = () => (
    <section className="space-y-6">
      <Filters />
      <div className="rounded-2xl border border-slate-800 bg-slate-800/40 shadow-lg shadow-black/20 ring-1 ring-white/5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] font-body">
            <thead className="border-b border-slate-700">
              <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                {['Pos', 'Team', 'P', 'W', 'L', 'D', 'Pts'].map((h, i) => {
                  const key: SortableKeys =
                    h === 'P'
                      ? 'Pld'
                      : (h as Exclude<SortableKeys, 'Pld'>);
                  return (
                    <th
                      key={h}
                      onClick={() => requestSort(key)}
                      className={`group cursor-pointer px-4 py-4 font-display
                                  ${i === 0 ? 'text-center' : ''}`}
                    >
                      <span className="flex items-center gap-1">
                        {h} <SortIcon column={key} />
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {sortedTeams.map((t) => (
                <tr
                  key={t.Position}
                  className={`text-slate-200 transition
                              ${
                                t.Team === 'Wigan Warriors'
                                  ? 'bg-emerald-500/10'
                                  : 'hover:bg-slate-800/60'
                              }`}
                >
                  <td className="px-4 py-4 text-center font-bold">
                    {t.Position}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={getTeamLogo(t.Team)}
                        alt={t.Team}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="whitespace-nowrap font-medium">
                        {t.Team}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-slate-400">
                    {t.Pld}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-slate-400">
                    {t.W}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-slate-400">
                    {t.L}
                  </td>
                  <td className="px-4 py-4 text-center font-mono text-slate-400">
                    {t.D}
                  </td>
                  <td className="px-4 py-4 text-center font-mono font-bold text-emerald-400">
                    {t.Pts}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const MatchResults = () => (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {selectedMatchResults.map((r) => (
        <div
          key={r.id}
          className="group rounded-2xl border border-slate-800 bg-slate-800/40
                     p-5 shadow-lg shadow-black/20 ring-1 ring-white/5
                     transition hover:scale-[1.02] hover:border-emerald-400/50"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">
              Round {r.Round}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {r.Date}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={getTeamLogo(r.HomeTeam)}
                alt={r.HomeTeam}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-semibold text-white">{r.HomeTeam}</span>
            </div>

            <span className="rounded-md bg-slate-700 px-3 py-1 font-mono text-lg font-bold text-white">
              {r.Score}
            </span>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">{r.AwayTeam}</span>
              <Image
                src={getTeamLogo(r.AwayTeam)}
                alt={r.AwayTeam}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="mt-3 text-center text-sm text-slate-400">
            <Stadium className="mr-1 inline h-3 w-3" />
            {r.Venue}
          </div>
          {r.Note && (
            <div className="mt-2 text-center text-xs text-amber-400">
              {r.Note}
            </div>
          )}
        </div>
      ))}
    </section>
  );

  const PlayoffTree = () => (
    <div className="grid gap-10 lg:grid-cols-3">
      {/* Eliminators */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-white">
          <Medal className="h-5 w-5 text-emerald-400" />
          Eliminators
        </h3>
        <div className="space-y-4">
          {playoffResults.Eliminators.map((m) => (
            <MatchCard key={m.Match} match={m} />
          ))}
        </div>
      </section>

      {/* Semi-finals */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-white">
          <Medal className="h-5 w-5 text-amber-400" />
          Semi-Finals
        </h3>
        <div className="space-y-4">
          {playoffResults.SemiFinals.map((m) => (
            <MatchCard key={m.Match} match={m} />
          ))}
        </div>
      </section>

      {/* Grand Final */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-white">
          <Trophy className="h-5 w-5 text-amber-400" />
          Grand Final
        </h3>
        <div className="rounded-2xl border border-slate-800 bg-slate-800/40 p-5 shadow-lg shadow-black/20 ring-1 ring-white/5">
          <p className="text-center text-xs uppercase tracking-wider text-slate-400">
            {playoffResults.GrandFinal.Date} · {playoffResults.GrandFinal.Venue}
          </p>
          <MatchCard match={playoffResults.GrandFinal} />
          <p className="mt-3 text-center text-sm text-white">
            Champion:{' '}
            <span className="font-bold text-amber-400">
              {playoffResults.GrandFinal.Champion}
            </span>
          </p>
        </div>
      </section>
    </div>
  );

  const MatchCard = ({ match }: { match: any }) => (
    <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold ${
            match.Winner === match.HomeTeam.split(' (')[0]
              ? 'text-emerald-400'
              : 'text-slate-300'
          }`}
        >
          {match.HomeTeam}
        </span>
        <span className="rounded-md bg-slate-700 px-3 py-1 font-mono font-bold text-white">
          {match.Score}
        </span>
        <span
          className={`font-semibold ${
            match.Winner === match.AwayTeam.split(' (')[0]
              ? 'text-emerald-400'
              : 'text-slate-300'
          }`}
        >
          {match.AwayTeam}
        </span>
      </div>
    </div>
  );

  /* ---------- main ---------- */
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
            Results & Standings
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Live table, match results and playoff picture.
          </p>
        </header>

        {/* tabs */}
        <div className="mx-auto mt-10 flex max-w-2xl rounded-full border border-slate-800 bg-slate-800/40 p-1 shadow-lg shadow-black/20 ring-1 ring-white/5">
          {(['table', 'matches', 'playoffs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition
                          ${
                            activeTab === tab
                              ? 'bg-emerald-500 text-slate-900'
                              : 'text-slate-300 hover:bg-slate-700/50'
                          }`}
            >
              {tab === 'table' && 'League Table'}
              {tab === 'matches' && 'Match Results'}
              {tab === 'playoffs' && 'Playoffs'}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="mt-12">
          {activeTab === 'table' && <LeagueTable />}
          {activeTab === 'matches' && <MatchResults />}
          {activeTab === 'playoffs' && <PlayoffTree />}
        </div>
      </div>
    </main>
  );
}
