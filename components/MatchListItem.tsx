import React, { useState } from 'react';
import type { Match } from '../types';
import {
  CalendarPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  LocationMarkerIcon,
  MiniSpinnerIcon,
  PlusCircleIcon,
} from './Icons';
import { TeamLogo } from './TeamLogo';
import { ALL_VENUES } from '../services/mockData';
import { getDistance } from '../utils/geolocation';

interface MatchListItemProps {
  match: Match;
  isAttended: boolean;
  onAttend: (match: Match) => void;
  distance?: number;
}

const CHECKIN_RADIUS_MILES = 1.0;
const CHECKIN_RESET_DELAY = 3000;

const isToday = (dateString: string): boolean => {
  const today = new Date();
  const someDate = new Date(dateString);
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const formatCalendarDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

export const MatchListItem: React.FC<MatchListItemProps> = ({ match, isAttended, onAttend, distance }) => {
  const [checkinState, setCheckinState] = useState<{
    status: 'idle' | 'checking' | 'error_distance' | 'error_location';
    message: string;
  }>({ status: 'idle', message: '' });

  const isFullTime = match.status === 'FULL-TIME';
  const isScheduled = match.status === 'SCHEDULED';
  const matchIsToday = isToday(match.startTime);
  const matchTime = new Date(match.startTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const resetCheckinState = () => {
    setTimeout(() => setCheckinState({ status: 'idle', message: '' }), CHECKIN_RESET_DELAY);
  };

  const handleMarkAsAttended = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAttend(match);
  };

  const handleAddToCalendar = (event: React.MouseEvent) => {
    event.stopPropagation();

    const startDate = new Date(match.startTime);
    const endDate = new Date(startDate.getTime() + 105 * 60 * 1000);
    const summary = `${match.homeTeam.name} vs ${match.awayTeam.name}`;
    const details = `Betfred Super League: ${summary}`;

    const calendarUrl = new URL('https://calendar.google.com/calendar/render');
    calendarUrl.searchParams.set('action', 'TEMPLATE');
    calendarUrl.searchParams.set('text', summary);
    calendarUrl.searchParams.set('dates', `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`);
    calendarUrl.searchParams.set('details', details);
    calendarUrl.searchParams.set('location', match.venue);
    calendarUrl.searchParams.set('sf', 'true');
    calendarUrl.searchParams.set('output', 'xml');

    const newWindow = window.open(calendarUrl.toString(), '_blank');
    if (!newWindow) {
      window.location.href = calendarUrl.toString();
    }
  };

  const handleCheckIn = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCheckinState({ status: 'checking', message: 'Checking location...' });

    const handleLocationError = (message: string, status: 'error_distance' | 'error_location') => {
      setCheckinState({ status, message });
      resetCheckinState();
    };

    if (!navigator.geolocation) {
      handleLocationError('Location not supported', 'error_location');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const stadium = ALL_VENUES.find(venue => venue.name === match.venue);

        if (!stadium) {
          handleLocationError('Stadium location unknown', 'error_location');
          return;
        }

        const userDistance = getDistance(latitude, longitude, stadium.lat, stadium.lon);

        if (userDistance <= CHECKIN_RADIUS_MILES) {
          onAttend(match);
          setCheckinState({ status: 'idle', message: '' });
        } else {
          handleLocationError(`Too far away (${userDistance.toFixed(1)} mi)`, 'error_distance');
        }
      },
      error => {
        console.error('Geolocation error:', error);
        handleLocationError('Location unavailable', 'error_location');
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  const renderAttendButton = () => {
    if (isAttended) {
      return (
        <button className="flex cursor-default items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-white" disabled>
          <CheckCircleIcon className="h-4 w-4" />
          <span>Attended</span>
        </button>
      );
    }

    if (matchIsToday && !isFullTime) {
      const isChecking = checkinState.status === 'checking';
      const isError = checkinState.status.startsWith('error');

      let buttonClass = 'bg-info text-white hover:bg-info/90';
      if (isError) buttonClass = 'bg-danger text-white';
      if (isChecking) buttonClass = 'bg-info/80 text-white cursor-wait';

      return (
        <button
          onClick={handleCheckIn}
          disabled={isChecking}
          className={`flex w-32 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface-alt ${buttonClass}`}
        >
          {isChecking && <MiniSpinnerIcon className="h-4 w-4" />}
          {!isChecking && <LocationMarkerIcon className="h-4 w-4" />}
          <span>{checkinState.status !== 'idle' ? checkinState.message : 'Check In'}</span>
        </button>
      );
    }

    return (
      <button
        onClick={handleMarkAsAttended}
        className="flex items-center gap-1.5 rounded-md border border-secondary px-3 py-1.5 text-xs font-semibold text-secondary transition-colors duration-200 hover:bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface-alt"
      >
        <PlusCircleIcon className="h-4 w-4" />
        <span className="hidden sm:inline">I was there</span>
        <span className="sm:hidden">Attend</span>
      </button>
    );
  };

  return (
    <article className="overflow-hidden rounded-md bg-surface shadow-card transition-shadow duration-300 hover:shadow-lg">
      <div className="grid items-center gap-3 p-4 [grid-template-columns:1fr_auto_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <TeamLogo teamId={match.homeTeam?.id} teamName={match.homeTeam?.name ?? 'Home'} size="medium" />
          <span className="truncate text-sm font-semibold text-text-strong md:text-base">{match.homeTeam?.name ?? 'Home Team'}</span>
        </div>

        <div className="text-center">
          <div className="flex min-h-[40px] items-center justify-center gap-2 text-4xl font-extrabold text-text-strong [font-variant-numeric:tabular-nums]">
            {isFullTime ? (
              <>
                <span>{match.scores.home}</span>
                <span>-</span>
                <span>{match.scores.away}</span>
              </>
            ) : (
              <span className="text-2xl font-semibold tracking-wider text-text-subtle">VS</span>
            )}
          </div>
          <div
            className={`mt-1 inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold ${
              isFullTime ? 'bg-accent text-text-strong' : 'bg-surface-alt text-text-subtle'
            }`}
          >
            {isFullTime ? 'FT' : matchTime}
          </div>
        </div>

        <div className="flex min-w-0 items-center justify-end gap-3">
          <span className="truncate text-right text-sm font-semibold text-text-strong md:text-base">{match.awayTeam?.name ?? 'Away Team'}</span>
          <TeamLogo teamId={match.awayTeam?.id} teamName={match.awayTeam?.name ?? 'Away'} size="medium" />
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border bg-surface-alt px-4 py-3 text-sm text-text-subtle sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5">
            <LocationMarkerIcon className="h-4 w-4" />
            <span>{match.venue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            <span>{new Date(match.startTime).toLocaleDateString()}</span>
          </div>
          {distance !== undefined && (
            <div className="font-semibold text-primary">
              <span>{distance.toFixed(1)} mi away</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isScheduled && (
            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-1.5 rounded-md border border-info px-3 py-1.5 text-xs font-semibold text-info transition-colors duration-200 hover:bg-info/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-surface-alt"
              aria-label="Add match to calendar"
            >
              <CalendarPlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Add to Calendar</span>
              <span className="sm:hidden">Calendar</span>
            </button>
          )}
          {renderAttendButton()}
        </div>
      </div>
    </article>
  );
};
