// app/achievements/page.tsx
import { Milestone, CalendarCheck, Target, Shield, Trophy } from 'lucide-react';
import React from 'react'; // Import React

const achievements = [
  {
    category: 'Milestone',
    title: 'First Win Recorded',
    description: 'You secured your first victory with the team.',
    unlocked: '15 Oct 2023',
    Icon: Milestone,
    progress: null,
  },
  {
    category: 'Consistency',
    title: '10 Matches Logged',
    description: "You've successfully logged 10 official matches.",
    unlocked: '28 Nov 2023',
    Icon: CalendarCheck,
    progress: null,
  },
  {
    category: 'In Progress',
    title: 'Team Top Scorer',
    description: 'Finish the season with the most goals on your team.',
    unlocked: null,
    Icon: Target,
    progress: { current: 8, total: 10 },
  },
  {
    category: 'Defensive Prowess',
    title: '5 Clean Sheets',
    description: 'Kept the opposition from scoring in 5 matches.',
    unlocked: '05 Dec 2023',
    Icon: Shield,
    progress: null,
  },
  {
    category: 'Ultimate Honour',
    title: 'Lift The Trophy',
    description: 'Win the league and hoist silverware above your head.',
    unlocked: null,
    Icon: Trophy,
    progress: { current: 1, total: 1 },
  },
];

export default function AchievementsPage() {
  return (
    <main className="relative isolate min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* subtle radial glow behind headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2
                      h-[30rem] w-[60rem] rounded-full bg-emerald-500/20 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Achievements
          </h1>
          <p className="mt-3 text-base text-slate-400">
            Celebrate every milestone on your footballing journey.
          </p>
        </header>

        <section className="mt-12 grid gap-5">
          {achievements.map((a, i) => (
            <Card key={i} {...a} />
          ))}
        </section>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Glass-morphic achievement card                                     */
/* ------------------------------------------------------------------ */
function Card({
  category,
  title,
  description,
  unlocked,
  Icon,
  progress,
}: (typeof achievements)[0]) {
  const locked = !unlocked;
  const progressPct = progress
    ? Math.round((progress.current / progress.total) * 100)
    : 0;

  return (
    <div
      className={`group relative flex gap-4 rounded-2xl p-5 ring-1 transition
                ${
                  locked
                    ? 'bg-slate-800/40 ring-white/10'
                    : 'bg-emerald-900/30 ring-emerald-400/50'
                }`}
    >
      {/* left accent bar */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl
                    ${locked ? 'bg-slate-600' : 'bg-emerald-400'}`}
      />

      {/* icon */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center
                    rounded-xl backdrop-blur
                    ${
                      locked
                        ? 'bg-slate-700/50 text-slate-400'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
      >
        <Icon className="h-7 w-7" />
      </div>

      {/* content */}
      <div className="flex-1">
        <p
          className={`text-xs font-semibold uppercase tracking-widest
                          ${locked ? 'text-slate-400' : 'text-emerald-400'}`}
        >
          {category}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>

        {unlocked && (
          <p className="mt-3 text-xs text-slate-400">
            Unlocked on <span className="font-medium text-slate-200">{unlocked}</span>
          </p>
        )}

        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span className="font-semibold text-white">
                {progress.current} / {progress.total}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all
                                duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* locked overlay */}
      {locked && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
          <span className="rounded bg-slate-900/50 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
            Locked
          </span>
        </div>
      )}
    </div>
  );
}
