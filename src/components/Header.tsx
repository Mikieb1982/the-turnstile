import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 text-text">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/90 via-secondary/70 to-brand-navy text-lg font-semibold text-white shadow-[0_20px_40px_-24px_rgba(30,64,175,0.8)]">
            SB
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-text-subtle">The Scrum Book</p>
            <p className="text-sm font-medium text-text">Log, relive, and share every matchday.</p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-border/30 bg-white/60 p-1 text-sm text-text-subtle shadow-[0_10px_35px_-28px_rgba(15,23,42,0.45)] md:flex">
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface-alt hover:text-text-strong" href="/">
            Matches
          </a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface-alt hover:text-text-strong" href="/book">
            My Book
          </a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface-alt hover:text-text-strong" href="/community">
            Community
          </a>
        </nav>

        <button
          className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(11,16,32,0.45)] transition hover:-translate-y-[1px] hover:bg-brand-700"
          onClick={() => {
            const evt = new CustomEvent('open-install')
            window.dispatchEvent(evt)
          }}
        >
          Install app
          <span aria-hidden="true" className="text-white/70">
            ↗
          </span>
        </button>
      </div>
    </header>
  )
}
