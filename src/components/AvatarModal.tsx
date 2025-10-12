import React from 'react'

type Props = {
  name: string
  onEdit?: () => void
}

export default function AvatarModal({ name, onEdit }: Props) {
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-border/60 bg-surface-alt/80 text-xl font-semibold text-text-strong">
        {initials}
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="rounded-full border border-border/60 bg-surface/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-text-subtle transition hover:border-accent/70 hover:text-text"
        >
          Edit Avatar
        </button>
      )}
    </div>
  )
}
