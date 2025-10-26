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
    </div>
  );
};
