// src/components/Hero.tsx
import React from 'react'

const statHighlights = [
  { label: 'Total matches', value: '47', delta: '+12 this season' },
  { label: 'Grounds conquered', value: '19', delta: '3 new on tour' },
  { label: 'Badges earned', value: '8', delta: '2 away-day streaks' },
]

const heroSteps = [
  'Experience the match day.',
  'Log the fixture in seconds.',
  'Track your legacy forever.',
]

const recentMatches = [
  { opponent: 'Northern Stallions', result: 'W 32 – 18', venue: 'Trident Stadium' },
  { opponent: 'Coastal Raiders', result: 'L 20 – 24', venue: 'Fortress Field' },
  { opponent: 'Steel City Giants', result: 'W 40 – 16', venue: 'Ironlight Arena' },
]

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 text-text">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-surface/80 p-8 shadow-card md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.35),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-36 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.3),transparent_72%)] blur-3xl"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(239,68,68,0.08),transparent_45%,rgba(20,20,35,0.75))]" />

        <div className="relative grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface-alt/70 px-4 py-1 text-[11px] uppercase tracking-[0.32em] text-text-subtle/80">
              Dedicated to rugby league fans
            </span>
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
              Stay pitch-side between fixtures with a cinematic fan dashboard.
            </h1>
            <p className="mt-5 max-w-xl text-base text-text-subtle sm:text-lg">
              The Turnstile captures every match you attend, every badge you unlock, and every streak you chase. It&apos;s your lifetime logbook for terrace legends and travelling supporters alike.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/download"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-brand-crimson to-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-text-strong shadow-[0_26px_52px_-28px_rgba(239,68,68,0.85)] transition hover:-translate-y-[1px]"
              >
                Download Free
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#stories"
                className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-surface-alt/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-text-subtle transition hover:border-primary/50 hover:text-text-strong"
              >
                View Fan Stories
              </a>
              <span className="text-[11px] uppercase tracking-[0.32em] text-text-subtle/70">
                Syncs in the cloud • Built for away days
              </span>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {statHighlights.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/60 bg-surface-alt/70 p-5 text-text-subtle">
                  <dt className="text-[10px] uppercase tracking-[0.35em] text-text-subtle/70">{stat.label}</dt>
                  <dd className="mt-3 text-3xl font-semibold text-text-strong">{stat.value}</dd>
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-primary/80">{stat.delta}</p>
                </div>
              ))}
            </dl>

            <ul className="mt-10 space-y-3 text-sm text-text-subtle">
              {heroSteps.map((step, idx) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border/60 bg-surface-alt/60 text-[11px] font-semibold uppercase tracking-[0.32em] text-text-subtle/80">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.35),rgba(10,15,28,0.92))] p-6 shadow-card">
              <div className="flex items-center justify-between text-text-subtle/80">
                <p className="text-xs uppercase tracking-[0.32em]">Dynamic Dashboard</p>
                <span className="rounded-full border border-border/60 bg-surface-alt/50 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-text-subtle/70">
                  Live sync
                </span>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-text-subtle/70">Total Matches</p>
                  <p className="mt-2 text-6xl font-semibold text-text-strong">47</p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/40 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-accent">
                    12 logged in 2024
                  </p>
                </div>
                <div className="flex flex-col items-end text-right text-xs text-text-subtle">
                  <span>Fortress Field</span>
                  <span>Trident Stadium</span>
                  <span>Ironlight Arena</span>
                </div>
              </div>
            </div>

            <div id="badges" className="rounded-[1.75rem] border border-border/60 bg-surface-alt/80 p-6">
              <div className="flex items-center justify-between text-text-subtle/80">
                <p className="text-xs uppercase tracking-[0.32em]">Exclusive Badges</p>
                <a href="/leaderboard" className="text-[10px] uppercase tracking-[0.32em] text-accent transition hover:text-text-strong">
                  View leaderboard
                </a>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 text-center text-[10px] uppercase tracking-[0.3em] text-text-subtle/70">
                {['Earned', 'Tour', 'Kick-Off', 'Streak', 'Logged', 'Legends', 'Away', 'Lock'].map((badge) => (
                  <div
                    key={badge}
                    className="flex h-16 flex-col items-center justify-center gap-1 rounded-xl border border-border/50 bg-surface/60"
                  >
                    <span className="h-8 w-8 rounded-full border border-border/60 bg-gradient-to-br from-surface/60 to-black/50" aria-hidden />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-text-subtle/70">
                Unlock digital silverware as you hit fan milestones and share progress with the global leaderboard.
              </p>
            </div>

            <div id="stories" className="rounded-[1.75rem] border border-border/60 bg-surface-alt/80 p-6">
              <div className="flex items-center justify-between text-text-subtle/80">
                <p className="text-xs uppercase tracking-[0.32em]">Personal Match Log</p>
                <button className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-primary transition hover:border-primary/60 hover:bg-primary/20">
                  Log a match
                </button>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-text-subtle">
                {recentMatches.map((match) => (
                  <li
                    key={match.opponent}
                    className="flex items-center justify-between rounded-xl border border-border/40 bg-surface/70 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-strong">{match.opponent}</p>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-text-subtle/70">{match.venue}</p>
                    </div>
                    <span className="rounded-full border border-border/50 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-accent">
                      {match.result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
