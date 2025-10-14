import React from 'react'

interface FixtureTileProps {
  home: string
  away: string
  date: string
  venue: string
  attended: boolean
  result?: string
  highlight: string
  round: string
  onClick: () => void
}

export default function FixtureTile({
  home,
  away,
  date,
  venue,
  attended,
  result,
  highlight,
  round,
  onClick,
}: FixtureTileProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-border/60 bg-surface/80 p-5 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-surface/90 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {round}
        </span>
        {attended && (
          <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
            Attended
          </span>
        )}
      </div>
      
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text-strong">{home}</span>
          {result && <span className="text-sm font-bold text-primary">{result.split('–')[0]}</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-text-strong">{away}</span>
          {result && <span className="text-sm font-bold text-text-subtle">{result.split('–')[1]}</span>}
        </div>
      </div>

      <div className="space-y-1 border-t border-border/40 pt-3 text-sm text-text-subtle">
        <div className="flex items-center gap-2">
          <span>📅</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{venue}</span>
        </div>
        <div className="mt-2 rounded-lg bg-accent/50 px-3 py-2 text-center font-medium text-accent-foreground">
          {highlight}
        </div>
      </div>
    </div>
  )
}