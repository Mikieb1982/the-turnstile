import React from 'react'

interface StatsCardProps {
  label: string
  value: string
  icon: string
}

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="glass group cursor-pointer overflow-hidden rounded-2xl border border-border/60 p-6 transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
      <div className="mb-3 text-3xl opacity-80">{icon}</div>
      <div className="mb-1 text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  )
}