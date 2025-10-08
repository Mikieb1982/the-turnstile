import React from 'react'
import { Link } from 'react-router-dom' // remove if not using router

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-[color:var(--bg-0)]/80 border-b border-[color:var(--border)]">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="The Scrum Book logo" className="h-7 w-7" />
          <span className="font-semibold tracking-wide">The Scrum Book</span>
        </div>

        <nav className="flex items-center gap-3">
          {/* Replace Link with <a> if not using react-router */}
          <Link className="text-sm text-[color:var(--text-lo)] hover:text-white" to="/">Matches</Link>
          <Link className="text-sm text-[color:var(--text-lo)] hover:text-white" to="/book">My Book</Link>
          <button
            className="px-3 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-600 text-white text-sm shadow-soft"
            onClick={() => {
              // wire up your PWA install handler here if you have one
              const evt = new CustomEvent('open-install')
              window.dispatchEvent(evt)
            }}
          >
            Install
          </button>
        </nav>
      </div>
    </header>
  )
}
