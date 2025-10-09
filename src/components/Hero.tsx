// src/components/Hero.tsx
import React from 'react'

const statHighlights = [
  { label: 'Grounds visited', value: '12', delta: '+3 YoY' },
  { label: 'Tries celebrated', value: '41', delta: 'Club record pace' },
  { label: 'Friends invited', value: '8', delta: 'Keep the squad growing' },
]

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14 pt-14 text-text">
      <div className="relative overflow-hidden rounded-[40px] border border-border/20 bg-white px-6 pb-10 pt-12 shadow-[0_35px_80px_-55px_rgba(15,23,42,0.45)] md:px-12 md:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(30,64,175,0.22),transparent_68%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.16),transparent_72%)] blur-[120px]"
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-surface-alt px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-text-subtle">
              Season 2026 ready
            </span>
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-text-strong sm:text-4xl lg:text-[2.8rem]">
              Chronicle every try, journey, and roar from the terraces.
            </h1>
            <p className="mt-4 max-w-xl text-base text-text-subtle sm:text-lg">
              The Scrum Book is your digital matchday companion. Capture the fixtures you&apos;re chasing, celebrate the grounds you&apos;ve conquered, and build the ultimate scrapbook of rugby league memories.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#fixtures"
                className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white shadow-[0_24px_50px_-28px_rgba(11,16,32,0.55)] transition hover:-translate-y-[1px] hover:bg-brand-700"
              >
                Browse fixtures
                <span aria-hidden="true" className="text-white/70">
                  →
                </span>
              </a>
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-white px-6 py-3 text-sm font-semibold text-text transition hover:border-border/50 hover:text-text-strong"
              >
                Open my book
              </a>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-text-subtle">
                No paywall • Syncs across devices
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-5 rounded-[28px] border border-border/20 bg-surface-alt/70 p-6 shadow-[0_25px_60px_-48px_rgba(15,23,42,0.4)] backdrop-blur-sm">
            <span className="text-sm font-semibold text-text">This week at a glance</span>
            <div className="space-y-4 text-sm text-text-subtle">
              <div className="rounded-2xl border border-border/20 bg-white px-5 py-5 text-text">
                <p className="text-[11px] uppercase tracking-[0.32em] text-text-subtle/80">Upcoming</p>
                <p className="mt-2 text-lg font-semibold text-text-strong">Wigan vs St Helens</p>
                <p className="text-xs text-text-subtle">Fri 06 Mar • DW Stadium</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border/10 bg-white/80 px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary">
                  12
                </div>
                <p className="flex-1 text-xs text-text-subtle">
                  Grounds on your list this season. Keep ticking them off!
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
              {statHighlights.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/10 bg-white p-4 text-text-subtle">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.32em] text-text-subtle/80">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-text-strong">{stat.value}</dd>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">{stat.delta}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
