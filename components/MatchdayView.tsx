import React, { useMemo } from 'react';
import type { Match } from '../types';
import { MatchListItem } from './MatchListItem';

interface MatchdayViewProps {
  matches: Match[];
  attendedMatchIds: string[];
  onAttend: (match: Match) => void;
  onUnattend: (matchId: string) => void;
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const MatchdayView: React.FC<MatchdayViewProps> = ({ matches, attendedMatchIds, onAttend, onUnattend }) => {
    const groupedMatches = useMemo(() => {
        if (!matches || matches.length === 0) {
            return {};
        }

        const sortedMatches = [...matches].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        
        return sortedMatches.reduce((acc, match) => {
            const dateKey = new Date(match.startTime).toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(match);
            return acc;
        }, {} as Record<string, Match[]>);

    }, [matches]);

    const sortedDateKeys = Object.keys(groupedMatches).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    if (sortedDateKeys.length === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-md">
                <h2 className="text-2xl font-bold text-text-strong">No Fixtures Found</h2>
                <p className="text-text-subtle mt-2">Could not find any match fixtures for the season.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-text-strong">Fixtures & Results</h1>
                <p className="text-text-subtle mt-1">All matches for the season, grouped by date.</p>
            </div>

            <div className="space-y-8">
                {sortedDateKeys.map(dateKey => (
                    <div key={dateKey}>
                        <h2 className="text-xl font-bold text-text-strong border-b-2 border-primary pb-2 mb-4">
                            {formatDate(dateKey)}
                        </h2>
                        <div className="space-y-4">
                            {groupedMatches[dateKey].map(match => (
                                <MatchListItem
                                    key={match.id}
                                    match={match}
                                    isAttended={attendedMatchIds.includes(match.id)}
                                    onAttend={onAttend}
                                    onUnattend={onUnattend}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
