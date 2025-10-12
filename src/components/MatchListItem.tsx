import React from 'react'
import TeamLogo from './TeamLogo'
import type { FixtureSummary, TeamBranding } from '../types/ui'

type Props = {
  fixture: FixtureSummary
  homeTeam: TeamBranding
  awayTeam: TeamBranding
  isAttended: boolean
  onToggleAttendance: (fixtureId: string) => void
}

export default function MatchListItem({ fixture, homeTeam, awayTeam, isAttended, onToggleAttendance }: Props) {
  const isFinal = fixture.status === 'FINAL'

  return (
    <article className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface-alt/70 p-4 text-text">
      <div className="flex items-center gap-3">
        <TeamLogo team={homeTeam} size="sm" />
        <div className="text-left">
          <p className="text-sm font-semibold text-text-strong">{homeTeam.name}</p>
          <p className="text-xs uppercase tracking-[0.28em] text-text-subtle/70">
            {isFinal ? fixture.homeScore : fixture.time}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center text-xs font-semibold uppercase tracking-[0.32em] text-text-subtle/70">
        <span>{isFinal ? 'FT' : 'vs'}</span>
        <span className="text-[11px] text-text-subtle">{fixture.round}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-text-strong">{awayTeam.name}</p>
          <p className="text-xs uppercase tracking-[0.28em] text-text-subtle/70">
            {isFinal ? fixture.awayScore : fixture.time}
          </p>
        </div>
        <TeamLogo team={awayTeam} size="sm" />
      </div>
      <div className="ml-auto flex flex-col items-end gap-2 text-right text-xs text-text-subtle/80">
        <span>{fixture.date}</span>
        <span>{fixture.stadium}</span>
      </div>
      <button
        onClick={() => onToggleAttendance(fixture.id)}
        className={`ml-4 flex h-10 w-10 items-center justify-center rounded-full border text-lg transition ${
          isAttended
            ? 'border-success/70 bg-success/10 text-success'
            : 'border-border/60 bg-surface/80 text-text-subtle'
        }`}
        aria-label={isAttended ? 'Mark as not attended' : 'Mark as attended'}
      >
        {isAttended ? '✓' : '+'}
      </button>
    </article>
  )
}
