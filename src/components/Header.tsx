import React from 'react'
import type { TeamBranding } from '../types/ui'

const navItems: Array<{ id: 'fixtures' | 'table' | 'profile'; label: string }> = [
  { id: 'fixtures', label: 'Fixtures' },
  { id: 'table', label: 'Table' },
  { id: 'profile', label: 'My Profile' },
]

type Props = {
  currentView: 'home' | 'fixtures' | 'table' | 'community' | 'profile'
  onNavigate: (view: Props['currentView']) => void
  userName: string
  favoriteTeam?: TeamBranding | null
}

export default function Header({ currentView, onNavigate, userName, favoriteTeam }: Props) {
  const firstInitial = userName.charAt(0).toUpperCase()
  const secondInitial = userName.split(' ')[1]?.charAt(0).toUpperCase() ?? ''

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 text-text">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-brand-crimson to-secondary text-sm font-semibold text-text-strong">
            TT
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-text-subtle/80">The Turnstile</p>
            <p className="text-sm font-medium text-text-strong">Log every roar</p>
          </div>
        </button>

        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.28em] text-text-subtle/80 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                'transition-colors hover:text-text-strong',
                currentView === item.id ? 'text-text-strong' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {favoriteTeam && (
            <div
              className="hidden items-center gap-2 rounded-2xl border border-border/50 bg-surface-alt/60 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-text-subtle/80 md:flex"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: favoriteTeam.primaryColor }}
              />
              {favoriteTeam.nickname}
            </div>
          )}
          <button
            onClick={() => onNavigate('profile')}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 bg-surface-alt/70 text-sm font-semibold text-text-strong"
          >
            {firstInitial}
            {secondInitial}
          </button>
        </div>
      </div>
    </header>
  )
}
