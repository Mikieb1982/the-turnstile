import React from 'react'
import TeamLogo from './TeamLogo'
import type { RecentResult, TeamBranding } from '../types/ui'

type Props = {
  results: RecentResult[]
  teamsById: Record<string, TeamBranding>
}

export default function RecentResultsCarousel({ results, teamsById }: Props) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-strong">Recent Results</h2>
        <span className="text-xs uppercase tracking-[0.28em] text-text-subtle">Last 5</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {results.map((result) => {
          const homeTeam = teamsById[result.homeTeamId]
          const awayTeam = teamsById[result.awayTeamId]
          return (
            <div
              key={result.id}
              className="flex min-w-[12rem] flex-col gap-3 rounded-2xl border border-border/60 bg-surface-alt/70 p-4"
            >
              <div className="flex items-center justify-between">
                <TeamLogo team={homeTeam} size="sm" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-text-subtle/80">{result.date}</span>
                <TeamLogo team={awayTeam} size="sm" />
              </div>
              <div className="text-center text-sm font-semibold text-text-strong">
                {homeTeam.nickname} {result.homeScore} - {result.awayScore} {awayTeam.nickname}
              </div>
              <div className="text-center text-[11px] uppercase tracking-[0.28em] text-text-subtle/80">
                Final Score
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
