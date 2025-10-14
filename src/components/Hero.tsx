import React from 'react'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-strong md:text-6xl">
        Your Rugby League Journey
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-text-subtle md:text-xl">
        Track every match, collect badges, and celebrate your passion for rugby league.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          View Fixtures
        </button>
        <button className="rounded-lg border border-border bg-surface/50 px-6 py-3 font-semibold text-text-strong backdrop-blur transition-colors hover:bg-surface">
          My Stats
        </button>
      </div>
    </section>
  )
}