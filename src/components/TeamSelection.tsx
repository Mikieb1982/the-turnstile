import React from 'react'
import TeamLogo from './TeamLogo'
import type { TeamBranding } from '../types/ui'

type Props = {
  teams: TeamBranding[]
  selectedTeamId?: string
  onSelect: (teamId: string) => void
  onConfirm: () => void
  onBack: () => void
}

export default function TeamSelection({ teams, selectedTeamId, onSelect, onConfirm, onBack }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <img
        src="/background.png"
        alt="Stadium turnstiles"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/85 to-background" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-12">
        <button
          onClick={onBack}
          className="self-start rounded-full border border-border/60 bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-text-subtle transition hover:border-text/40 hover:text-text"
        >
          ← Back
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text-strong sm:text-3xl">Select Your Favorite Team</h2>
          <p className="mt-2 text-sm text-text-subtle">
            This will personalize the dashboard, badges, and league highlights just for you.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => onSelect(team.id)}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-surface/70 p-4 text-text transition hover:border-accent/70"
            >
              <TeamLogo team={team} size="md" isSelected={selectedTeamId === team.id} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-subtle/90">{team.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onConfirm}
          disabled={!selectedTeamId}
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary via-brand-crimson to-secondary px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-text-strong shadow-[0_24px_54px_-28px_rgba(239,68,68,0.8)] transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}
