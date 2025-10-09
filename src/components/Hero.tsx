// src/components/Hero.tsx
import React from 'react'

const statHighlights = [
  { label: 'Grounds visited', value: '12', delta: '+3 YoY' },
  { label: 'Tries celebrated', value: '41', delta: 'Club record pace' },
  { label: 'Friends invited', value: '8', delta: 'Keep the squad growing' },
]

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 text-text">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-card md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.32),transparent_70%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.28),transparent_70%)] blur-3xl"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt/70 px-4 py-1 text-xs uppercase tracking-[0.2em] text-text-subtle">
              Season 2026 ready
            </span>
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-text-strong sm:text-4xl lg:text-5xl">
              Chronicle every try, journey, and roar from the terraces.
            </h1>
            <p className="mt-4 max-w-xl text-base text-text-subtle sm:text-lg">
              The Scrum Book is your digital matchday companion. Capture the fixtures you&apos;re chasing, celebrate the grounds you&apos;ve conquered, and build the ultimate scrapbook of rugby league memories.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#fixtures"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-text-strong shadow-[0_24px_48px_-26px_rgba(37,99,235,0.8)] transition hover:-translate-y-[1px] hover:bg-primary/90"
              >
                Browse fixtures
                <span aria-hidden="true" className="text-text-subtle">
                  →
                </span>
              </a>
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-alt px-5 py-3 text-sm font-medium text-text-subtle transition hover:border-primary/50 hover:text-text-strong"
              >
                Open my book
              </a>
              <span className="text-xs text-text-subtle">
                No paywall. Syncs automatically across devices.
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-4 rounded-2xl border border-border bg-surface-alt/80 p-6 backdrop-blur">
            <span className="text-sm font-medium text-text-subtle">This week at a glance</span>
            <div className="space-y-3 text-sm text-text-subtle">
              <div className="rounded-xl border border-border bg-surface px-4 py-4 text-text-strong">
                <p className="text-xs uppercase tracking-[0.3em] text-text-subtle">Upcoming</p>
                <p className="mt-2 text-lg font-semibold text-text-strong">Wigan vs St Helens</p>
                <p className="text-xs text-text-subtle">Fri 06 Mar • DW Stadium</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 text-center leading-10 text-sm font-semibold text-text-strong">
                  12
                </div>
                <p className="flex-1 text-xs text-text-subtle">
                  Grounds on your list this season. Keep ticking them off!
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
              {statHighlights.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-surface p-4 text-text-subtle">
                  <dt className="text-xs uppercase tracking-[0.2em] text-text-subtle/80">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-text-strong">{stat.value}</dd>
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-primary/80">{stat.delta}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
