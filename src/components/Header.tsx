import React, { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="2">
              <path d="M9 3L5 7m0 0l4 4M5 7h11a5 5 0 015 5v0a5 5 0 01-5 5H9" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-bold leading-none">The Turnstile</div>
            <div className="text-xs text-muted-foreground">Track Your Journey</div>
          </div>
        </div>
        
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#home" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Home
          </a>
          <a href="#fixtures" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Fixtures
          </a>
          <a href="#table" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Table
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 md:flex">
            Sign In
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-card"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="glass border-t border-border">
          <nav className="mx-auto max-w-6xl px-4 py-4">
            <div className="space-y-2">
              <a href="#home" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-card" onClick={() => setIsMenuOpen(false)}>
                Home
              </a>
              <a href="#fixtures" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-card" onClick={() => setIsMenuOpen(false)}>
                Fixtures
              </a>
              <a href="#table" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-card" onClick={() => setIsMenuOpen(false)}>
                Table
              </a>
              <a href="#profile" className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-card" onClick={() => setIsMenuOpen(false)}>
                Profile
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Sign In
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
