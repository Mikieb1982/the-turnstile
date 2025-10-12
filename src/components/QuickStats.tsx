import React from 'react'
import type { QuickStat } from '../types/ui'

type Props = {
  stats: QuickStat[]
}

export default function QuickStats({ stats }: Props) {
  return (
    <section className="rounded-[1.75rem] border border-border/60 bg-surface/80 p-5">
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col gap-2 rounded-2xl border border-border/50 bg-surface-alt/70 px-4 py-5 text-text"
          >
            <span className="text-[11px] uppercase tracking-[0.32em] text-text-subtle/80">{stat.label}</span>
            <span className="text-3xl font-semibold text-text-strong">{stat.value}</span>
            <span className="text-xs uppercase tracking-[0.28em] text-text-subtle/70">{stat.helper}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
