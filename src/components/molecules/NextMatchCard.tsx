import React from 'react';
import { Button } from '../atoms/Button';

interface NextMatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  homeLogo: string;
  awayLogo: string;
  onLogAttendance?: () => void;
}

export const NextMatchCard: React.FC<NextMatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  stadium,
  homeLogo,
  awayLogo,
  onLogAttendance,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', weekday: 'short' });
  const time = gameDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="rugby-card rugby-card--hero relative overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col items-center justify-between gap-8 text-center text-[#f6f3e4] sm:flex-row sm:text-left">
        <TeamBlock logo={homeLogo} name={homeTeam} align="end" />
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="rounded-full border border-[#d4af37]/60 bg-[#132318]/80 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#d4af37]">
            Next Kick-Off
          </span>
          <div className="text-4xl font-black tracking-[0.3em] text-[#f8f5e6] sm:text-5xl">VS</div>
          <div className="flex flex-col items-center gap-1 text-sm uppercase tracking-[0.35em] text-[#9fb09c]">
            <span>{formattedDate}</span>
            <span className="text-[#f6f3e4]">{time}</span>
            <span className="flex items-center gap-2 text-[0.6rem] text-[#b6c6b4]">
              <span className="text-base">📍</span>
              {stadium}
            </span>
          </div>
        </div>
        <TeamBlock logo={awayLogo} name={awayTeam} align="start" />
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-[#2f4632]/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm uppercase tracking-[0.35em] text-[#98aa99]">
          Log it. Wear it. Share the story.
        </p>
        <Button variant="primary" onClick={onLogAttendance} className="sm:w-auto">
          <span className="text-base">✓</span>
          Log Attendance
        </Button>
      </div>
    </div>
  );
};

const TeamBlock = ({
  logo,
  name,
  align,
}: {
  logo: string;
  name: string;
  align: 'start' | 'end';
}) => {
  const alignmentClasses =
    align === 'start'
      ? 'sm:items-start sm:text-left'
      : 'sm:items-end sm:text-right';

  return (
    <div className={`flex flex-col items-center gap-4 text-center ${alignmentClasses}`}>
      <div className="group relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
        <img
          className="relative h-24 w-24 rounded-full border border-[#d4af37]/40 bg-[#101812]/80 p-2 shadow-[0_12px_28px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-105"
          src={logo}
          alt={`${name} logo`}
        />
      </div>
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f6f3e4]">{name}</span>
    </div>
  );
};
