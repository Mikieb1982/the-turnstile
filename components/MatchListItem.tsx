
import React, { useState } from 'react';
import type { Match } from '../types';
import { CheckCircleIcon, PlusCircleIcon, ClockIcon, LocationMarkerIcon, CalendarPlusIcon, MiniSpinnerIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { ALL_VENUES } from '../services/mockData';
import { getDistance } from '../utils/geolocation';

interface MatchListItemProps {
  match: Match;
  isAttended: boolean;
  onAttend: (match: Match) => void;
  onUnattend: (matchId: string) => void;
  distance?: number;
}

const CHECKIN_RADIUS_MILES = 1.0;

const isToday = (dateString: string): boolean => {
    const today = new Date();
    const someDate = new Date(dateString);
    return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear();
};


export const MatchListItem: React.FC<MatchListItemProps> = ({ match, isAttended, onAttend, onUnattend, distance }) => {
    const [checkinState, setCheckinState] = useState<{
        status: 'idle' | 'checking' | 'error_distance' | 'error_location';
        message: string;
    }>({ status: 'idle', message: '' });

    const isFT = match.status === 'FULL-TIME';
    const isScheduled = match.status === 'SCHEDULED';
    const matchIsToday = isToday(match.startTime);
    
    const handleMarkAsAttended = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAttend(match);
    };

    const handleAddToCalendar = (e: React.MouseEvent) => {
        e.stopPropagation();

        const formatICalDate = (date: Date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const startDate = new Date(match.startTime);
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
    
    const handleCheckIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCheckinState({ status: 'checking', message: 'Checking Location...' });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const stadium = ALL_VENUES.find(v => v.name === match.venue);

                if (!stadium) {
                    setCheckinState({ status: 'error_location', message: 'Stadium location unknown' });
                    setTimeout(() => setCheckinState({ status: 'idle', message: '' }), 3000);
                    return;
                }

                const distance = getDistance(latitude, longitude, stadium.lat, stadium.lon);

                if (distance <= CHECKIN_RADIUS_MILES) {
                    onAttend(match);
                } else {
                    setCheckinState({ status: 'error_distance', message: `Too far away (${distance.toFixed(1)} mi)` });
                     setTimeout(() => setCheckinState({ status: 'idle', message: '' }), 3000);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                setCheckinState({ status: 'error_location', message: 'Location unavailable' });
                setTimeout(() => setCheckinState({ status: 'idle', message: '' }), 3000);
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    };

    const time = new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    const renderAttendButton = () => {
        if (isAttended) {
            return (
                <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-secondary text-white cursor-default"
                    disabled
                >
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Attended</span>
                </button>
            );
        }
    
        if (matchIsToday && !isFT) {
            const isChecking = checkinState.status === 'checking';
            const isError = checkinState.status.startsWith('error');
            
            let buttonClass = 'bg-info text-white hover:bg-info/90';
            if (isError) buttonClass = 'bg-danger text-white';
            if (isChecking) buttonClass = 'bg-info/80 text-white cursor-wait';
    
            return (
                <button
                    onClick={handleCheckIn}
                    disabled={isChecking}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-alt focus:ring-primary w-32 ${buttonClass}`}
                >
                    {isChecking && <MiniSpinnerIcon className="w-4 h-4" />}
                    {!isChecking && <LocationMarkerIcon className="w-4 h-4" />}
                    <span>{checkinState.status !== 'idle' ? checkinState.message : 'Check In'}</span>
                </button>
            );
        }
        
        return (
            <button
                onClick={handleMarkAsAttended}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-alt focus:ring-primary bg-transparent border border-secondary text-secondary hover:bg-secondary/10"
            >
                <PlusCircleIcon className="w-4 h-4" />
                <span className="hidden sm:inline">I was there</span>
                <span className="sm:hidden">Attend</span>
            </button>
        );
    };

    return (
    <article className="bg-surface rounded-md shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="p-4 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
            {/* Home Team */}
            <div className="flex items-center gap-3 min-w-0">
                <TeamLogo teamId={match.homeTeam?.id} teamName={match.homeTeam?.name || 'Home'} size="medium" />
                <span className="font-semibold text-sm md:text-base text-text-strong truncate">{match.homeTeam?.name || 'Home Team'}</span>
            </div>

            {/* Score & Status */}
            <div className="text-center">
                <div className="text-4xl font-extrabold text-text-strong [font-variant-numeric:tabular-nums] flex justify-center items-center gap-2 min-h-[40px]">
                    {isFT ? (
                        <>
                            <span>{match.scores.home}</span>
                            <span>-</span>
                            <span>{match.scores.away}</span>
                        </>
                    ) : (
                        <span className="text-2xl font-semibold text-text-subtle tracking-wider">VS</span>
                    )}
                </div>
                <div className={`inline-flex items-center gap-2 px-2 py-1 mt-1 rounded-md text-xs font-semibold ${
                    isFT ? 'bg-accent text-text-strong' : 'bg-surface-alt text-text-subtle'
                }`}>
                    {isFT ? 'FT' : time}
                </div>
            </div>

            {/* Away Team */}
            <div className="flex items-center gap-3 justify-end min-w-0">
                <span className="font-semibold text-sm md:text-base text-text-strong truncate text-right">{match.awayTeam?.name || 'Away Team'}</span>
                <TeamLogo teamId={match.awayTeam?.id} teamName={match.awayTeam?.name || 'Away'} size="medium" />
            </div>
        </div>

        <div className="bg-surface-alt px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm border-t border-border">
            <div className="flex items-center gap-x-4 gap-y-1 text-text-subtle flex-wrap">
                <div className="flex items-center gap-1.5">
                    <LocationMarkerIcon className="w-4 h-4" />
                    <span>{match.venue}</span>
                </div>
                 <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-4 h-4" />
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
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 bg-transparent border border-info text-info hover:bg-info/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-surface-alt focus:ring-primary"
                        aria-label="Add match to calendar"
                    >
                        <CalendarPlusIcon className="w-4 h-4" />
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