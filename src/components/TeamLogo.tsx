import React from 'react'
import type { TeamBranding } from '../types/ui'

type Props = {
  team: TeamBranding
  size?: 'sm' | 'md' | 'lg'
  isSelected?: boolean
  showLabel?: boolean
}

const sizeMap: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-10 w-10 text-xs',
  md: 'h-14 w-14 text-sm',
  lg: 'h-20 w-20 text-base',
}

export default function TeamLogo({ team, size = 'md', isSelected = false, showLabel = false }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={[
          'relative flex items-center justify-center rounded-3xl font-semibold uppercase text-text-strong shadow-soft transition',
          sizeMap[size],
          isSelected ? 'ring-4 ring-offset-2 ring-offset-background ring-accent/80' : 'ring-2 ring-transparent',
        ].join(' ')}
        style={{
          background: team.gradient,
        }}
      >
        <span>{team.abbreviation}</span>
        <span
          aria-hidden
          className="absolute -bottom-1 h-1.5 w-8 rounded-full opacity-60"
          style={{ background: team.secondaryColor }}
        />
      </div>
      {showLabel && (
        <span className="max-w-[6rem] text-center text-[11px] font-medium uppercase tracking-[0.2em] text-text-subtle">
          {team.nickname}
        </span>
      )}
    </div>
  )
}
