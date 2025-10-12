import React from 'react'

type View = 'home' | 'fixtures' | 'table' | 'community' | 'profile'

type Props = {
  currentView: View
  onNavigate: (view: View) => void
}

const items: Array<{ id: View; label: string; icon: string }> = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'fixtures', label: 'Fixtures', icon: '📅' },
  { id: 'table', label: 'Table', icon: '📊' },
  { id: 'community', label: 'Community', icon: '🗣️' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

export default function MobileBottomBar({ currentView, onNavigate }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/70 bg-surface/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.28em]"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-base transition ${
                currentView === item.id
                  ? 'border-accent/80 bg-accent/10 text-text-strong'
                  : 'border-border/60 bg-surface-alt/70 text-text-subtle'
              }`}
            >
              {item.icon}
            </span>
            <span className={currentView === item.id ? 'text-text-strong' : 'text-text-subtle'}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
