import React, { useMemo, useState } from 'react';
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

type ActiveTab = 'fixtures' | 'results';

export const MatchdayView: React.FC<MatchdayViewProps> = ({ matches, attendedMatchIds, onAttend, onUnattend }) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('results');

    const { fixtures, results } = useMemo(() => {
        const fixturesList = matches
            .filter(match => match.status === 'SCHEDULED')
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        
        const resultsList = matches
            .filter(match => match.status === 'FULL-TIME')
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
            
        return { fixtures: fixturesList, results: resultsList };
    }, [matches]);

    const matchesToDisplay = activeTab === 'fixtures' ? fixtures : results;

    const groupedMatches = useMemo(() => {
        return matchesToDisplay.reduce((acc, match) => {
            const dateKey = new Date(match.startTime).toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(match);
            return acc;
        }, {} as Record<string, Match[]>);
    }, [matchesToDisplay]);

    const sortedDateKeys = Object.keys(groupedMatches); // Keys are already in order due to pre-sorting matchesToDisplay

    const TabButton: React.FC<{ tab: ActiveTab; label: string; }> = ({ tab, label }) => {
        const isActive = activeTab === tab;
        return (
             <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-transparent text-text-subtle hover:bg-surface hover:text-text'
                }`}
            >
                {label}
            </button>
        )
    }

    const renderMatchList = () => {
        if (sortedDateKeys.length === 0) {
            return (
                <div className="text-center py-20 bg-surface rounded-md">
                    <h2 className="text-2xl font-bold text-text-strong">
                        {activeTab === 'fixtures' ? 'No Upcoming Fixtures' : 'No Past Results'}
                    </h2>
                    <p className="text-text-subtle mt-2">
                        {activeTab === 'fixtures' 
                            ? 'Check back later for more scheduled matches.' 
                            : 'There are no results to display for this season.'}
                    </p>
                </div>
            );
        }

        return (
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
        );
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-text-strong">Fixtures & Results</h1>
                <p className="text-text-subtle mt-1">View upcoming matches or past results for the season.</p>
            </div>

            <div className="flex items-center gap-2 p-1 bg-surface-alt rounded-xl w-fit">
                <TabButton tab="results" label="Results" />
                <TabButton tab="fixtures" label="Fixtures" />
            </div>

            {renderMatchList()}
        </div>
    );
};