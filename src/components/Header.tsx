import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 text-text">
        <div className="flex items-center gap-4">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/90 via-brand-crimson/70 to-brand-ember/70 text-lg font-semibold text-text-strong shadow-[0_22px_48px_-24px_rgba(239,68,68,0.85)]">
            <span className="relative">TT</span>
            <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" aria-hidden />
          </span>
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-text-subtle/80">The Turnstile</p>
            <p className="text-sm font-medium text-text-strong">Document every roar, badge, and away day.</p>
            <div className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-surface-alt/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-text-subtle/80">
              <span>2024 Season</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-accent/70" />
              <span>Fan Beta</span>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border/50 bg-surface-alt/70 p-1.5 text-xs font-medium uppercase tracking-[0.2em] text-text-subtle md:flex">
          <a className="rounded-full px-4 py-1.5 transition hover:bg-surface hover:text-text-strong" href="#fixtures">
            Fixtures
          </a>
          <a className="rounded-full px-4 py-1.5 transition hover:bg-surface hover:text-text-strong" href="#badges">
            Badges
          </a>
          <a className="rounded-full px-4 py-1.5 transition hover:bg-surface hover:text-text-strong" href="#stories">
            Stories
          </a>
        </nav>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary via-brand-crimson to-secondary px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-text-strong shadow-[0_18px_48px_-22px_rgba(239,68,68,0.8)] transition hover:shadow-[0_24px_60px_-26px_rgba(239,68,68,0.9)]"
          onClick={() => {
            const evt = new CustomEvent('open-install')
            window.dispatchEvent(evt)
          }}
        >
          Download App
          <span aria-hidden="true" className="text-text-strong/80">
            ↗
          </span>
        </button>
      </div>
    </header>
  )
}
