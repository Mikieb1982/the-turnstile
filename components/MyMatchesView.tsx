
import React from 'react';
import type { AttendedMatch } from '../types';
import { TrashIcon, CalendarIcon, LocationMarkerIcon } from './Icons';
import { TeamLogo } from './TeamLogo';

interface MyMatchesViewProps {
    attendedMatches: AttendedMatch[];
    onRemove: (matchId: string) => void;
}

export const MyMatchesView: React.FC<MyMatchesViewProps> = ({ attendedMatches, onRemove }) => {
    if (attendedMatches.length === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-md">
                <h2 className="text-2xl font-bold text-text-strong">No Matches Attended Yet</h2>
                <p className="text-text-subtle mt-2">Go to "Today's Matches" and click "I was there" to build your collection of attended Super League games!</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text-strong border-b border-border pb-4">My Attended Matches</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendedMatches
                    .sort((a,b) => new Date(b.attendedOn).getTime() - new Date(a.attendedOn).getTime())
                    .map(({ match, attendedOn }) => (
                    <div key={match.id} className="bg-surface rounded-md shadow-card flex flex-col text-text-strong">
                        <div className="p-4 flex-grow">
                            <div className="flex justify-between items-start mb-3">
                                <p className="text-sm text-primary font-semibold">{match.competition?.name || 'Super League'}</p>
                                <p className="text-xs text-text-subtle">
                                    {new Date(attendedOn).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2 w-2/5 truncate">
                                    <TeamLogo teamId={match.homeTeam?.id} teamName={match.homeTeam?.name || 'Home Team'} size="small" />
                                    <span className="font-semibold text-sm">{match.homeTeam?.name || 'Home Team'}</span>
                                </div>
                                
                                {match.status === 'FULL-TIME' ? (
                                    <div className="font-extrabold text-lg text-primary [font-variant-numeric:tabular-nums]">
                                        {match.scores.home} - {match.scores.away}
                                    </div>
                                ) : (
                                    <div className="font-semibold text-base text-text-subtle">
                                        {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 w-2/5 truncate justify-end">
                                    <span className="font-semibold text-sm text-right">{match.awayTeam?.name || 'Away Team'}</span>
                                    <TeamLogo teamId={match.awayTeam?.id} teamName={match.awayTeam?.name || 'Away Team'} size="small" />
                                </div>
                            </div>

                            <div className="text-xs text-text-subtle space-y-1 mt-4">
                               <div className="flex items-center gap-2">
                                    <LocationMarkerIcon className="w-3 h-3"/>
                                    <span>{match.venue}</span>
                               </div>
                               <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-3 h-3"/>
                                    <span>Match Date: {new Date(match.startTime).toLocaleDateString()}</span>
                               </div>
                            </div>
                        </div>
                        <div className="bg-surface-alt p-2 text-right rounded-b-md">
                             <button onClick={() => onRemove(match.id)} className="text-danger hover:bg-danger/10 transition-colors p-1 rounded-full">
                                <TrashIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
