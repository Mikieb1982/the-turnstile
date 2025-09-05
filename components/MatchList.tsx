import React, { useState, useMemo } from 'react';
import type { Match } from '../types';
import { MatchListItem } from './MatchListItem';
import { SearchIcon, RefreshIcon } from './Icons';

interface MatchListProps {
  matches: Match[];
  attendedMatchIds: string[];
  onAttend: (match: Match) => void;
  onUnattend: (matchId: string) => void;
  onRefresh: () => void;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, attendedMatchIds, onAttend, onUnattend, onRefresh }) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const upcomingMatches = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today for accurate comparison

        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(today.getDate() + 7);

        return matches.filter(match => {
            const matchDate = new Date(match.startTime);
            return matchDate >= today && matchDate < sevenDaysFromNow;
        });
    }, [matches]);

    const filteredMatches = useMemo(() => {
        if (!searchQuery) {
            return upcomingMatches;
        }
        return upcomingMatches.filter(match =>
            (match.homeTeam?.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (match.awayTeam?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [upcomingMatches, searchQuery]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-text-strong">Matches in the Next 7 Days</h1>
                    <button 
                        onClick={onRefresh}
                        className="p-2 rounded-full text-text-subtle hover:bg-surface-alt transition-colors"
                        aria-label="Refresh matches"
                    >
                        <RefreshIcon className="w-6 h-6"/>
                    </button>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-text-subtle" />
                    </div>
                    <input
                        type="text"
                        placeholder="Filter by team name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-64 bg-surface text-text placeholder-text-subtle border border-border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                </div>
            </div>

            {upcomingMatches.length === 0 ? (
                <div className="text-center py-20 bg-surface rounded-md text-text">
                    <h2 className="text-2xl font-bold text-text-strong">No Matches Scheduled</h2>
                    <p className="text-text-subtle mt-2">There are no matches scheduled in the next 7 days.</p>
                </div>
            ) : filteredMatches.length === 0 ? (
                <div className="text-center py-20 bg-surface rounded-md text-text">
                    <h2 className="text-2xl font-bold text-text-strong">No Matches Found</h2>
                    <p className="text-text-subtle mt-2">No upcoming matches found for "{searchQuery}". Try a different search.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredMatches
                        .sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                        .map(match => (
                        <MatchListItem
                            key={match.id}
                            match={match}
                            isAttended={attendedMatchIds.includes(match.id)}
                            onAttend={onAttend}
                            onUnattend={onUnattend}
                         />
                    ))}
                </div>
            )}
        </div>
    );
};
