// src/components/Hero.tsx
import React from 'react'

const statHighlights = [
  { label: 'Grounds visited', value: '12', delta: '+3 YoY' },
  { label: 'Tries celebrated', value: '41', delta: 'Club record pace' },
  { label: 'Friends invited', value: '8', delta: 'Keep the squad growing' },
]

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_40px_80px_-60px_rgba(37,99,235,0.8)] md:p-12">
        <div className="pointer-events-none absolute -right-24 top-12 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-700/40 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.8fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Season 2026 ready
            </span>
            <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Chronicle every try, journey, and roar from the terraces.
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              The Scrum Book is your digital matchday companion. Capture the fixtures you&apos;re chasing, celebrate the grounds you&apos;ve conquered, and build the ultimate scrapbook of rugby league memories.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#fixtures"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium shadow-[0_20px_40px_-24px_rgba(37,99,235,0.75)] transition hover:-translate-y-[1px] hover:bg-brand-500"
              >
                Browse fixtures
                <span aria-hidden="true" className="text-white/70">→</span>
              </a>
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Open my book
              </a>
              <span className="text-xs text-white/60">
                No paywall. Syncs automatically across devices.
              </span>
            </div>
          </div>

          <div className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur">
            <span className="text-sm font-medium text-white/70">This week at a glance</span>
            <div className="space-y-3 text-sm text-white/60">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Upcoming</p>
                <p className="mt-2 text-lg font-semibold text-white">Wigan vs St Helens</p>
                <p className="text-xs text-white/60">Fri 06 Mar • DW Stadium</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-600/40 text-center leading-10 text-sm font-semibold text-white/80">
                  12
                </div>
                <p className="flex-1 text-xs text-white/70">
                  Grounds on your list this season. Keep ticking them off!
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              {statHighlights.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">
                  <dt className="text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand-600/70">{stat.delta}</p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
