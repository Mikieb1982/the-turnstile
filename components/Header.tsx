import React from 'react'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-2xl xl:rounded-xl2 bg-[color:var(--bg-1)] shadow-soft border border-[color:var(--border)] p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Log your season</h2>
        <p className="text-[color:var(--text-lo)] mt-2 max-w-prose">
          Track matches you attend, venues you visit, and your personal stats.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#fixtures" className="px-4 py-2 rounded-lg bg-brand-700 hover:bg-brand-600 text-white shadow-soft">
            Browse fixtures
          </a>
          <a
            href="/book"
            className="px-4 py-2 rounded-lg bg-[color:var(--bg-2)] border border-[color:var(--border)] hover:border-brand-600"
          >
            Open my book
          </a>
        </div>
      </div>
    </section>
  )
}
