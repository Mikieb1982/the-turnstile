import React from 'react'

type Props = {
  home: string
  away: string
  date: string
  venue: string
  attended?: boolean
  result?: string
  highlight?: string
  round?: string
  onClick?: () => void
}

export default function FixtureTile({ home, away, date, venue, attended, result, highlight, round, onClick }: Props) {
  const venueWords = venue.trim().split(/\s+/)
  const midpoint = Math.ceil(venueWords.length / 2)
  const venueLine1 = venueWords.slice(0, midpoint).join(' ')
  const venueLine2 = venueWords.slice(midpoint).join(' ')

  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-surface/80 p-6 text-left shadow-card transition hover:-translate-y-[2px] hover:border-primary/70 hover:bg-surface-strong/90"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_70%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-accent/70 to-secondary/80 opacity-70" aria-hidden />

      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.35em] text-text-subtle/70">{round || 'Fixture Highlight'}</p>
        <span className="rounded-full border border-border/50 bg-surface-alt/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-text-subtle/80">
          {attended ? 'Logged' : 'Plan it'}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-text-subtle/70">{date}</p>
          <h3 className="text-2xl font-semibold leading-tight text-text-strong sm:text-[1.65rem]">
            {home}
            <span className="block text-sm font-normal uppercase tracking-[0.28em] text-text-subtle/70">vs {away}</span>
          </h3>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 rounded-2xl border border-border/50 bg-surface-alt/70 p-4">
            <p className="text-[10px] uppercase tracking-[0.32em] text-text-subtle/70">Scorecard</p>
            <p className="mt-1 text-2xl font-semibold text-text-strong">{result || (attended ? 'Match Logged' : 'Track next')}</p>
            <p className="text-[11px] uppercase tracking-[0.32em] text-accent/80">{highlight || 'Add your story'}</p>
          </div>
          <div className="flex h-20 w-20 flex-none flex-col items-center justify-center gap-1 rounded-2xl border border-border/50 bg-surface-alt/70 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-text-subtle/70">
            <span>{venueLine1}</span>
            <span>{venueLine2 || 'Venue'}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-subtle">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface-alt/60 px-3 py-1 text-[11px] uppercase tracking-[0.32em]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Kick-off reminder
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface-alt/60 px-3 py-1 text-[11px] uppercase tracking-[0.32em]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {attended ? 'Match logged' : 'Tap to add to your log'}
        </span>
      </div>
    </button>
  )
}
