import React from 'react';
<<<<<<< HEAD
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPinIcon, TicketIcon, EditIcon, Share2Icon } from 'lucide-react';
import { Match } from '@/types';

interface MatchCardProps {
  match: Match;
  className?: string;
  onEdit?: (match: Match) => void;
  onShare?: (match: Match) => void;
}

const MatchHeader: React.FC<{ homeTeam: Match['homeTeam'], awayTeam: Match['awayTeam'] }> = ({ homeTeam, awayTeam }) => (
  <div className="flex items-center justify-between px-4 py-3">
    <div className="flex items-center gap-3">
      <Image src={homeTeam.logo} alt={homeTeam.name} width={40} height={40} className="h-10 w-10 object-contain" />
      <span className="font-bold text-lg">vs</span>
      <Image src={awayTeam.logo} alt={awayTeam.name} width={40} height={40} className="h-10 w-10 object-contain" />
    </div>
    <div className="text-right">
      <p className="font-semibold">{homeTeam.name}</p>
      <p className="text-sm text-muted-foreground">vs {awayTeam.name}</p>
    </div>
  </div>
);

const Scoreline: React.FC<{ homeTeam: Match['homeTeam'], awayTeam: Match['awayTeam'] }> = ({ homeTeam, awayTeam }) => (
  <div className="bg-muted/30 px-4 py-2 text-center">
    <p className="text-2xl font-bold tracking-tight">{homeTeam.score} - {awayTeam.score}</p>
    <Badge variant="secondary" className="mt-1">Full Time</Badge>
  </div>
);

const MatchDetails: React.FC<{ date: Match['date'], venue: Match['venue'], attendance: Match['attendance'] }> = ({ date, venue, attendance }) => (
  <div className="space-y-2 p-4 text-sm text-muted-foreground">
    <div className="flex items-center">
      <CalendarIcon className="mr-2 h-4 w-4" />
      <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
    <div className="flex items-center">
      <MapPinIcon className="mr-2 h-4 w-4" />
      <span>{venue}</span>
    </div>
    {attendance && (
      <div className="flex items-center">
        <TicketIcon className="mr-2 h-4 w-4" />
        <span>Attendance: {attendance.toLocaleString()}</span>
      </div>
    )}
  </div>
);

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  className = '',
  onEdit,
  onShare,
}) => {
  const { homeTeam, awayTeam, date, venue, attendance, userPhoto } = match;

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg transition-all hover:shadow-xl ${className}`}>
      {userPhoto && (
        <div className="aspect-w-16 aspect-h-9">
          <Image src={userPhoto} alt={`Fan photo from ${homeTeam.name} vs ${awayTeam.name}`} layout="fill" objectFit="cover" />
        </div>
      )}
      <MatchHeader homeTeam={homeTeam} awayTeam={awayTeam} />
      <Scoreline homeTeam={homeTeam} awayTeam={awayTeam} />
      <MatchDetails date={date} venue={venue} attendance={attendance} />
      {(onEdit || onShare) && (
        <div className="absolute top-2 right-2 flex gap-1">
            {onEdit && <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60" onClick={() => onEdit(match)}><EditIcon className="h-4 w-4" /></Button>}
            {onShare && <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60" onClick={() => onShare(match)}><Share2Icon className="h-4 w-4" /></Button>}
        </div>
      )}
=======

interface MatchCardProps {
  round: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  homeLogo: string;
  awayLogo: string;
  score: string;
  venue: string;
  note?: string;
  onClick?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  round,
  homeTeam,
  awayTeam,
  date,
  homeLogo,
  awayLogo,
  score,
  venue,
  note,
  onClick,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <button
      type="button"
      onClick={onClick}
      className="rugby-card group w-full overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050d08]"
    >
      <div className="flex items-center justify-between gap-6 px-5 py-6 sm:px-6">
        <TeamDetail logo={homeLogo} name={homeTeam} alignment="start" />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-[0.65rem] uppercase tracking-[0.38em] text-[#90a590]">Round {round}</span>
          <span className="text-xl font-black tracking-[0.2em] text-[#f6f3e4]">{score}</span>
          <span className="text-xs uppercase tracking-[0.3em] text-[#b4c3b7]">{formattedDate}</span>
          <span className="text-xs font-semibold tracking-[0.12em] text-[#d4af37]">{venue}</span>
          {note && <span className="text-xs text-[#f6f3e4]/70">{note}</span>}
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
      ? 'items-start text-left'
      : 'items-end text-right';

  return (
    <div className={`flex flex-col gap-3 text-[#f6f3e4] ${alignmentClasses}`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#1a2a1f]/80 blur-lg opacity-50" />
        <img
          className="relative h-16 w-16 rounded-full border border-[#d4af37]/30 bg-[#101812]/80 p-1 shadow-[0_10px_22px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
          src={logo}
          alt={`${name} logo`}
        />
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#cfd6cd] group-hover:text-[#f6f3e4]">{name}</span>
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    </div>
  );
};
