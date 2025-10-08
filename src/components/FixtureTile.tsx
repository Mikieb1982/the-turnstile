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
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.9)] transition hover:-translate-y-[2px] hover:border-brand-600/60 hover:shadow-[0_24px_44px_-30px_rgba(37,99,235,0.8)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-white/70 to-brand-600" />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Round 12</p>
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
          {attended ? 'Logged' : 'Plan it'}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-white/60">{date}</p>
          <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
            {home}
            <span className="block text-sm font-normal text-white/50">vs {away}</span>
          </h3>
        </div>
        <div className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/60">
          <span>
            {venueLine1}
            <br />
            {venueLine2 || 'Venue'}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/60">
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
          Kick-off reminder set
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500/80" />
          {attended ? 'Match logged' : 'Tap to add to your log'}
        </span>
      </div>
    </button>
  )
}
