import React from 'react';

interface BadgeIconProps {
  name: string;
  icon: string;
  earned: boolean;
  onClick?: () => void;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ name, icon, earned, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rugby-badge ${earned ? 'rugby-badge--earned' : 'rugby-badge--locked'}`}
    aria-pressed={earned}
  >
    <span className="text-4xl drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">{icon}</span>
    <p className="text-[0.62rem] text-center leading-tight text-current">{name}</p>
    <span
      className={`rounded-full border px-2 py-0.5 text-[0.55rem] tracking-[0.35em] ${
        earned
          ? 'border-[#d4af37]/50 bg-[#d4af37]/15 text-[#f8f5e6]'
          : 'border-transparent bg-[#121a13] text-[#8a998a]'
      }`}
    >
      {earned ? 'Unlocked' : 'Locked'}
    </span>
  </button>
);
