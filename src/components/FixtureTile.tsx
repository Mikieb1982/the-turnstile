import React from 'react'

type Props = {
  home: string
  away: string
  date: string
  venue: string
  attended?: boolean
  onClick?: () => void
}

export default function FixtureTile({ home, away, date, venue, attended, onClick }: Props) {
  const venueWords = venue.trim().split(/\s+/)
  const midpoint = Math.ceil(venueWords.length / 2)
  const venueLine1 = venueWords.slice(0, midpoint).join(' ')
  const venueLine2 = venueWords.slice(midpoint).join(' ')

  return (
    <button
      onClick={onClick}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left shadow-card transition hover:-translate-y-[2px] hover:border-primary/60 hover:bg-surface-strong/90"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-text-strong/80 to-primary" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-text-subtle">Round 12</p>
        <span className="rounded-full border border-border bg-surface-alt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-subtle">
          {attended ? 'Logged' : 'Plan it'}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-text-subtle">{date}</p>
          <h3 className="text-xl font-semibold leading-tight text-text-strong sm:text-2xl">
            {home}
            <span className="block text-sm font-normal text-text-subtle">vs {away}</span>
          </h3>
        </div>
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-border bg-surface-alt text-center text-[10px] font-medium uppercase tracking-[0.25em] text-text-subtle">
          <span>
            {venueLine1}
            <br />
            {venueLine2 || 'Venue'}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-subtle">
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-alt px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Kick-off reminder set
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-alt px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {attended ? 'Match logged' : 'Tap to add to your log'}
        </span>
      </div>
    </button>
  )
}
