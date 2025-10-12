import React, { useMemo, useState } from 'react'
import MatchListItem from './MatchListItem'
import type { FixtureSummary, TeamBranding } from '../types/ui'

type Props = {
  fixtures: FixtureSummary[]
  teamsById: Record<string, TeamBranding>
  attendedIds: Set<string>
  onToggleAttendance: (fixtureId: string) => void
}

export default function MatchdayView({ fixtures, teamsById, attendedIds, onToggleAttendance }: Props) {
  const rounds = useMemo(() => Array.from(new Set(fixtures.map((fixture) => fixture.round))), [fixtures])
  const [activeRound, setActiveRound] = useState(rounds[0] ?? '')

  const filteredFixtures = useMemo(
    () => fixtures.filter((fixture) => (activeRound ? fixture.round === activeRound : true)),
    [fixtures, activeRound],
  )

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-text-strong">Fixtures & Results</h2>
        <div className="flex flex-wrap items-center gap-2">
          {rounds.map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] transition ${
                activeRound === round
                  ? 'border-accent/70 bg-accent/10 text-text-strong'
                  : 'border-border/60 bg-surface-alt/70 text-text-subtle'
              }`}
            >
              {round}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredFixtures.map((fixture) => (
          <MatchListItem
            key={fixture.id}
            fixture={fixture}
            homeTeam={teamsById[fixture.homeTeamId]}
            awayTeam={teamsById[fixture.awayTeamId]}
            isAttended={attendedIds.has(fixture.id)}
            onToggleAttendance={onToggleAttendance}
          />
        ))}
      </div>
    </section>
  )
}
