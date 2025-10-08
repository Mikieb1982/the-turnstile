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
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border shadow-soft p-4 md:p-5 bg-[color:var(--bg-1)] border-[color:var(--border)] hover:border-brand-600"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{home} vs {away}</h3>
        {attended && (
          <span className="px-2 py-0.5 text-xs rounded bg-[color:var(--field)]/20 text-[color:var(--field)] border border-[color:var(--field)]/30">
            Attended
          </span>
        )}
      </div>
      <p className="text-sm text-[color:var(--text-lo)] mt-1">{date} • {venue}</p>
    </button>
  )
}
