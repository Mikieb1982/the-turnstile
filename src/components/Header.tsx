import React from 'react'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 via-brand-700 to-blue-900 text-lg font-semibold text-white shadow-[0_12px_30px_-20px_rgba(37,99,235,0.85)]">
            SB
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">The Scrum Book</p>
            <p className="text-xs text-white/60">Log, relive, and share every matchday.</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-white/70 md:flex">
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-white/10 hover:text-white" href="/">Matches</a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-white/10 hover:text-white" href="/book">
            My Book
          </a>
          <a className="rounded-full px-4 py-1.5 font-medium transition hover:bg-white/10 hover:text-white" href="/community">
            Community
          </a>
        </nav>

        <button
          className="inline-flex items-center gap-2 rounded-xl border border-brand-600/60 bg-brand-600/90 px-4 py-2 text-sm font-medium text-white shadow-[0_12px_30px_-24px_rgba(37,99,235,0.8)] transition hover:-translate-y-[1px] hover:bg-brand-500"
          onClick={() => {
            const evt = new CustomEvent('open-install')
            window.dispatchEvent(evt)
          }}
        >
          Install app
          <span aria-hidden="true" className="text-white/60">↗</span>
        </button>
      </div>
    </header>
  )
}
