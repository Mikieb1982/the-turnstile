import React from 'react';
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
    </div>
  );
};
