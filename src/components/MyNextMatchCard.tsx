import React from 'react'
import TeamLogo from './TeamLogo'
import type { FixtureSummary, TeamBranding } from '../types/ui'

type Props = {
  fixture: FixtureSummary
  homeTeam: TeamBranding
  awayTeam: TeamBranding
  onLogAttendance: () => void
  isLogged: boolean
}

export default function MyNextMatchCard({ fixture, homeTeam, awayTeam, onLogAttendance, isLogged }: Props) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-surface/80 p-6 shadow-card sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.2),transparent_65%)]" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.18),transparent_45%)]" aria-hidden />
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-center gap-4">
            <TeamLogo team={homeTeam} size="lg" />
            <div className="flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-text-subtle">
              <span>VS</span>
              <span className="rounded-full border border-border/50 bg-surface-alt/60 px-3 py-1 text-[11px] text-text-subtle/90">
                {fixture.date}
              </span>
            </div>
            <TeamLogo team={awayTeam} size="lg" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-text-subtle/80">{fixture.stadium}</p>
            <h3 className="mt-2 text-2xl font-semibold text-text-strong">
              {homeTeam.name} vs {awayTeam.name}
            </h3>
            <p className="text-sm text-text-subtle">Kick-off • {fixture.time}</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <button
            onClick={onLogAttendance}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition ${
              isLogged
                ? 'border border-success/60 bg-success/10 text-success'
                : 'bg-gradient-to-r from-primary via-brand-crimson to-secondary text-text-strong shadow-[0_18px_42px_-24px_rgba(239,68,68,0.8)]'
            }`}
          >
            {isLogged ? 'Attendance Logged' : 'Log Attendance'}
          </button>
          <div className="rounded-2xl border border-border/60 bg-surface-alt/70 px-4 py-3 text-xs text-text-subtle/80">
            <p className="uppercase tracking-[0.28em]">My Match Focus</p>
            <p className="mt-1 text-text">
              Track your badge streaks, share photos, and log memories as soon as the whistle blows.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
