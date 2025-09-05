import React from 'react';
import type { Match } from '../types';
import { CheckCircleIcon, PlusCircleIcon, ClockIcon, LocationMarkerIcon, CalendarPlusIcon } from './Icons';
import { TeamLogo } from './TeamLogo';

interface MatchListItemProps {
  match: Match;
  isAttended: boolean;
  onAttend: (match: Match) => void;
  onUnattend: (matchId: string) => void;
}

export const MatchListItem: React.FC<MatchListItemProps> = ({ match, isAttended, onAttend, onUnattend }) => {
    const handleAttendClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isAttended) {
            onUnattend(match.id);
        } else {
            onAttend(match);
        }
    };

    const handleAddToCalendar = (e: React.MouseEvent) => {
        e.stopPropagation();

        const formatICalDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const startDate = new Date(match.startTime);
        // A rugby league match is 80 minutes + halftime. Let's set the event for 105 minutes.
        const endDate = new Date(startDate.getTime() + 105 * 60 * 1000);

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            `UID:${match.id}@thescrumbook.com`,
            `DTSTAMP:${formatICalDate(new Date())}`,
            `DTSTART:${formatICalDate(startDate)}`,
            `DTEND:${formatICalDate(endDate)}`,
            `SUMMARY:${match.homeTeam.name} vs ${match.awayTeam.name}`,
            `DESCRIPTION:Betfred Super League: ${match.homeTeam.name} vs ${match.awayTeam.name}`,
            `LOCATION:${match.venue}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${match.homeTeam.name.replace(/\s/g, '_')}-vs-${match.awayTeam.name.replace(/\s/g, '_')}.ics`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const time = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const isFT = match.status === 'FULL-TIME';
    const isScheduled = match.status === 'SCHEDULED';
    const isLive = match.status === 'IN_PROGRESS';

    return (
    <article className="bg-surface rounded-md shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="p-4 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
            {/* Home Team */}
            <div className="flex items-center gap-3">
                <TeamLogo logoUrl={match.homeTeam?.logoUrl} teamName={match.homeTeam?.name || 'Home'} size="medium" />
                <span className="font-semibold text-sm md:text-base text-text-strong truncate">{match.homeTeam?.name || 'Home Team'}</span>
            </div>

            {/* Score & Status */}
            <div className="text-center">
                <div className="text-4xl font-extrabold text-text-strong [font-variant-numeric:tabular-nums]">
                    {match.scores.home} - {match.scores.away}
                </div>
                {isLive ? (
                     <div className="inline-flex items-center gap-2 px-2 py-1 mt-1 rounded-md text-xs font-semibold bg-danger text-white">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE {match.live ? `${match.live.minute}'` : ''}
                    </div>
                ) : (
                    <div className={`inline-flex items-center gap-2 px-2 py-1 mt-1 rounded-md text-xs font-semibold ${
                        isFT ? 'bg-accent text-text-strong' : 'bg-surface-alt text-text-subtle'
                    }`}>
                        {isFT ? 'FT' : time}
                    </div>
                )}
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 justify-end">
                <span className="font-semibold text-sm md:text-base text-text-strong truncate text-right">{match.awayTeam?.name || 'Away Team'}</span>
                <TeamLogo logoUrl={match.awayTeam?.logoUrl} teamName={match.awayTeam?.name || 'Away'} size="medium" />
            </div>
        </div>

        <div className="bg-surface-alt px-4 py-2 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4 text-text-subtle">
                <div className="flex items-center gap-1.5">
                    <LocationMarkerIcon className="w-4 h-4" />
                    <span>{match.venue}</span>
                </div>
                 <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4" />
                    <span>{new Date(match.startTime).toLocaleDateString()}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                {isScheduled && (
                    <button
                        onClick={handleAddToCalendar}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 bg-transparent border border-info text-info hover:bg-info/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-alt focus:ring-primary"
                        aria-label="Add match to calendar"
                    >
                        <CalendarPlusIcon className="w-4 h-4" />
                        <span>Add to Calendar</span>
                    </button>
                )}
                <button
                    onClick={handleAttendClick}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-alt focus:ring-primary ${
                        isAttended 
                            ? 'bg-secondary text-white hover:bg-secondary/90'
                            : 'bg-transparent border border-secondary text-secondary hover:bg-secondary/10'
                    }`}
                >
                    {isAttended ? <CheckCircleIcon className="w-4 h-4" /> : <PlusCircleIcon className="w-4 h-4" />}
                    <span>{isAttended ? 'Attended' : 'I was there'}</span>
                </button>
            </div>
        </div>
    </article>
    );
};
