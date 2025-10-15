import React from 'react';

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeLogo: string;
  awayLogo: string;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  homeLogo,
  awayLogo,
  onClick,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const time = gameDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <button
      type="button"
      onClick={onClick}
      className="rugby-card group w-full overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d08]"
    >
      <div className="flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <TeamDetail logo={homeLogo} name={homeTeam} alignment="start" />
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[#90a590]">{formattedDate}</span>
          <span className="text-xl font-bold tracking-[0.2em] text-[#f6f3e4]">{time}</span>
          <div className="mt-2 h-px w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <TeamDetail logo={awayLogo} name={awayTeam} alignment="end" />
      </div>
    </button>
  );
};

const TeamDetail = ({
  logo,
  name,
  alignment,
}: {
  logo: string;
  name: string;
  alignment: 'start' | 'end';
}) => {
  const alignmentClasses =
    alignment === 'start'
      ? 'sm:items-start sm:text-left'
      : 'sm:items-end sm:text-right';

  return (
    <div className={`flex flex-col items-center gap-3 text-center text-[#f6f3e4] ${alignmentClasses}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#1a2a1f]/80 blur-lg opacity-50" />
        <img
          className="relative h-16 w-16 rounded-full border border-[#d4af37]/30 bg-[#101812]/80 p-1 shadow-[0_10px_22px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
          src={logo}
          alt={`${name} logo`}
        />
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#cfd6cd] group-hover:text-[#f6f3e4]">{name}</span>
    </div>
  );
};
