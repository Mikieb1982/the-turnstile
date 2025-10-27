<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, MapPinIcon, BellIcon, SparklesIcon } from 'lucide-react';
import { Match } from '@/types';

interface NextMatchCardProps {
  match: Match;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

const MatchHeader: React.FC<{ homeTeam: Match['homeTeam'], awayTeam: Match['awayTeam'] }> = ({ homeTeam, awayTeam }) => (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
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

  const Countdown: React.FC<{ timeLeft: TimeLeft | object }> = ({ timeLeft }) => {
    const formatTimeLeft = () => {
        const { days, hours, minutes } = timeLeft as TimeLeft;
        if (days > 0) return `${days}d ${hours}h left`;
        if (hours > 0) return `${hours}h ${minutes}m left`;
        if (minutes > 0) return `${minutes}m left`;
        return "Kick-off soon";
      };

    return (
        <div className="bg-primary/10 px-4 py-2 text-center text-primary">
            <p className="font-bold tracking-tight text-lg">{formatTimeLeft()}</p>
            <p className="text-xs font-semibold uppercase">Until Kick-off</p>
        </div>
    );
  }

  const MatchDetails: React.FC<{ date: Match['date'], venue: Match['venue'], tvDetails: Match['tvDetails'] }> = ({ date, venue, tvDetails }) => (
    <div className="space-y-2 p-4 text-sm text-muted-foreground">
        <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>{venue}</span>
        </div>
        {tvDetails && (
        <div className="flex items-center">
          <Image src={tvDetails.logo} alt={tvDetails.channel} width={16} height={16} className="mr-2 h-4 w-4 object-contain" />
          <span>Live on {tvDetails.channel}</span>
        </div>
      )}
    </div>
  );

export const NextMatchCard: React.FC<NextMatchCardProps> = ({
  match,
  className = '',
}) => {
  const { homeTeam, awayTeam, date, venue, tvDetails } = match;
  const [isReminderSet, setReminderSet] = useState(false);

  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft: TimeLeft | object = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleSetReminder = () => {
    setReminderSet(true);
    // Here you could integrate with a notification service
  };

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-lg transition-all hover:shadow-xl ${className}`}>
        <Badge variant="secondary" className="absolute top-2 left-2 flex items-center gap-1 text-yellow-600 bg-yellow-100 border-yellow-200">
            <SparklesIcon className="h-3 w-3" />
            Next Fixture
        </Badge>
      <MatchHeader homeTeam={homeTeam} awayTeam={awayTeam} />
      <Countdown timeLeft={timeLeft} />
      <MatchDetails date={date} venue={venue} tvDetails={tvDetails} />
       <div className="border-t p-3">
          <Button
            onClick={handleSetReminder}
            disabled={isReminderSet}
            className="w-full"
          >
            <BellIcon className="mr-2 h-4 w-4" />
            {isReminderSet ? "Reminder is Set" : "Set Reminder"}
          </Button>
        </div>
=======
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
  onAddToCalendar?: () => void;
}

export const NextMatchCard: React.FC<NextMatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  stadium,
  homeLogo,
  awayLogo,
  onLogAttendance,
  onAddToCalendar,
}) => {
  const gameDate = new Date(date);
  const formattedDate = gameDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
  });
  const time = gameDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  const now = new Date();
  const diffMs = gameDate.getTime() - now.getTime();
  const isPast = diffMs <= 0;
  const totalHoursUntil = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));
  const daysUntil = Math.floor(totalHoursUntil / 24);
  const hoursUntil = totalHoursUntil % 24;
  const countdownLabel = isPast
    ? 'Kick-off complete'
    : `${daysUntil}d ${hoursUntil}h until kick-off`;

  return (
    <div className="rugby-card rugby-card--hero relative overflow-hidden rounded-3xl border border-[#2f4632]/80 bg-[radial-gradient(circle_at_top,_rgba(52,99,63,0.25),_transparent_55%)] bg-[#0f1912]/90 p-6 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-[#2f7d45]/60 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-[#2f7d45]/40 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.15),_transparent_70%)]" />

      <div className="relative flex flex-col gap-6 text-[#f6f3e4]">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-start sm:text-left">
            <TeamBlock logo={homeLogo} name={homeTeam} align="end" />
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-[#2f4632]/60 to-transparent sm:block" />
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="rounded-full border border-[#d4af37]/60 bg-[#132318]/80 px-5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#d4af37]">
              Next Kick-Off
            </span>
            <div className="text-[2.75rem] font-black tracking-[0.32em] text-[#f8f5e6] sm:text-5xl">VS</div>
            <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-[0.35em] text-[#9fb09c] sm:text-sm">
              <span>{formattedDate}</span>
              <span className="text-[#f6f3e4]">{time}</span>
              <span className="flex items-center gap-2 text-[0.65rem] text-[#b6c6b4]">
                <span className="text-base">📍</span>
                {stadium}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-end sm:text-right">
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent via-[#2f4632]/60 to-transparent sm:block" />
            <TeamBlock logo={awayLogo} name={awayTeam} align="start" />
          </div>
        </div>

        <div className="grid gap-4 border-t border-[#2f4632]/70 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-col gap-2 text-left text-[#9fb09c] sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2 rounded-full border border-[#2f4632]/60 bg-[#101812]/80 px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-[#d4af37]">
              <span className="text-sm">⏱</span>
              {countdownLabel}
            </div>
            <p className="text-[0.8rem] uppercase tracking-[0.28em] text-[#98aa99]">
              Log it. Wear it. Share the story.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button variant="primary" onClick={onLogAttendance} className="sm:w-auto">
              <span className="text-base">✓</span>
              Log Attendance
            </Button>
            <Button
              variant="outline"
              onClick={onAddToCalendar}
              className="border-[#2f4632]/80 text-[#d4af37] hover:border-[#d4af37]/80 hover:bg-[#d4af37]/10"
            >
              <span className="text-base">🗓</span>
              Add Reminder
            </Button>
          </div>
        </div>
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
      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#f6f3e4]/90 sm:text-sm">{name}</span>
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    </div>
  );
};
