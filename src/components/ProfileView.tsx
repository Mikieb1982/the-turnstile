import React from 'react'
import AvatarModal from './AvatarModal'
import TeamLogo from './TeamLogo'
import type { QuickStat, TeamBranding } from '../types/ui'

type Props = {
  userName: string
  joinDate: string
  favoriteTeam: TeamBranding
  stats: QuickStat[]
}

const profileLinks = [
  { id: 'matches', label: 'My Matches', description: 'Every roar you logged' },
  { id: 'stats', label: 'My Stats', description: 'Win/loss and streaks' },
  { id: 'grounds', label: 'My Grounds', description: 'Stadium map and list' },
  { id: 'badges', label: 'My Badges', description: 'Earned & upcoming' },
]

export default function ProfileView({ userName, joinDate, favoriteTeam, stats }: Props) {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-border/60 bg-surface/80 p-6 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
            <AvatarModal name={userName} />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-semibold text-text-strong">{userName}</h2>
              <p className="text-sm text-text-subtle">Joined • {joinDate}</p>
              <div className="mt-3 inline-flex items-center gap-3 rounded-2xl border border-border/50 bg-surface-alt/70 px-4 py-2">
                <TeamLogo team={favoriteTeam} size="sm" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-text-subtle/80">
                  {favoriteTeam.name}
                </span>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.id} className="rounded-2xl border border-border/50 bg-surface-alt/70 px-4 py-3 text-left">
                <p className="text-[11px] uppercase tracking-[0.32em] text-text-subtle/80">{stat.label}</p>
                <p className="text-2xl font-semibold text-text-strong">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.28em] text-text-subtle/70">{stat.helper}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {profileLinks.map((link) => (
          <div
            key={link.id}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-border/60 bg-surface/80 p-5 text-text"
          >
            <div>
              <h3 className="text-lg font-semibold text-text-strong">{link.label}</h3>
              <p className="text-sm text-text-subtle/80">{link.description}</p>
            </div>
            <button className="self-start rounded-full border border-border/50 bg-surface-alt/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-subtle transition hover:border-accent/60 hover:text-text">
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
