import React from 'react'
import TeamLogo from './TeamLogo'
import type { LeagueTableRow, TeamBranding } from '../types/ui'

type Props = {
  rows: LeagueTableRow[]
  teamsById: Record<string, TeamBranding>
  favoriteTeamId?: string
}

export default function LeagueTableView({ rows, teamsById, favoriteTeamId }: Props) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-surface/80 p-6 shadow-card">
      <h2 className="text-2xl font-semibold text-text-strong">League Table</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-text-subtle">
          <thead className="text-[11px] uppercase tracking-[0.28em] text-text-subtle/80">
            <tr className="border-b border-border/60 text-xs">
              <th className="py-3 pr-4">Pos</th>
              <th className="py-3 pr-4">Team</th>
              <th className="py-3 pr-4">P</th>
              <th className="py-3 pr-4">W</th>
              <th className="py-3 pr-4">D</th>
              <th className="py-3 pr-4">L</th>
              <th className="py-3 pr-4">PD</th>
              <th className="py-3 pr-4">Pts</th>
              <th className="py-3">Form</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const team = teamsById[row.teamId]
              const isFavorite = favoriteTeamId === row.teamId
              return (
                <tr
                  key={row.teamId}
                  className={`border-b border-border/60 text-sm ${
                    isFavorite ? 'bg-surface-alt/60 text-text-strong' : 'text-text-subtle'
                  }`}
                >
                  <td className="py-3 pr-4 font-semibold">{row.position}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <TeamLogo team={team} size="sm" />
                      <span className="font-semibold text-text-strong">{team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">{row.played}</td>
                  <td className="py-3 pr-4">{row.wins}</td>
                  <td className="py-3 pr-4">{row.draws}</td>
                  <td className="py-3 pr-4">{row.losses}</td>
                  <td className="py-3 pr-4">{row.pointsDifference}</td>
                  <td className="py-3 pr-4 font-semibold text-text-strong">{row.totalPoints}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {row.form.map((result, index) => (
                        <span
                          key={`${row.teamId}-form-${index}`}
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            background:
                              result === 'W'
                                ? '#34D399'
                                : result === 'D'
                                ? '#FACC15'
                                : '#EF4444',
                          }}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
