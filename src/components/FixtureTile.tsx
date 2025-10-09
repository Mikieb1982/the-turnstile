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
      className="group relative flex w-full flex-col overflow-hidden rounded-[28px] border border-border/20 bg-white p-6 text-left shadow-[0_30px_70px_-55px_rgba(15,23,42,0.45)] transition hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-text-subtle">Round 12</p>
        <span className="rounded-full border border-border/30 bg-surface-alt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-text-subtle">
          {attended ? 'Logged' : 'Plan it'}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-subtle">{date}</p>
          <h3 className="text-2xl font-semibold leading-tight text-text-strong">
            {home}
            <span className="block text-base font-normal text-text">vs {away}</span>
          </h3>
        </div>
        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-2xl border border-border/30 bg-surface-alt text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-text-subtle">
          <span className="leading-tight">
            {venueLine1}
            <br />
            {venueLine2 || 'Venue'}
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-text-subtle">
        <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-surface-alt px-4 py-2 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Kick-off reminder set
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-surface-alt px-4 py-2 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {attended ? 'Match logged' : 'Tap to add to your log'}
        </span>
      </div>
    </button>
  )
}
