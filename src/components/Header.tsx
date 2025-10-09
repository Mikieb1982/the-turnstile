import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 text-text">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/70 via-secondary/60 to-brand-navy/90 text-lg font-semibold text-text-strong shadow-[0_18px_42px_-26px_rgba(37,99,235,0.85)]">
            SB
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-subtle">The Scrum Book</p>
            <p className="text-xs text-text-subtle">Log, relive, and share every matchday.</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-surface-alt/70 p-1 text-sm text-text-subtle md:flex">
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface hover:text-text-strong" href="/">
            Matches
          </a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface hover:text-text-strong" href="/book">
            My Book
          </a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-surface hover:text-text-strong" href="/community">
            Community
          </a>
        </nav>

        <button
          className="inline-flex items-center gap-2 rounded-xl border border-primary/50 bg-primary/90 px-4 py-2 text-sm font-medium text-text-strong shadow-[0_12px_34px_-22px_rgba(37,99,235,0.85)] transition hover:-translate-y-[1px] hover:bg-primary"
          onClick={() => {
            const evt = new CustomEvent('open-install')
            window.dispatchEvent(evt)
          }}
        >
          Install app
          <span aria-hidden="true" className="text-text-subtle">↗</span>
        </button>
      </div>
    </header>
  )
}
