import React, { useMemo, useState } from 'react';
import type { Match } from '../types';
import MatchListItem from './MatchListItem';
import { RefreshIcon, SearchIcon } from './Icons';

interface MatchListProps {
  matches: Match[];
  attendedMatchIds: string[];
  onAttend: (match: Match) => void;
  onRefresh: () => void;
}

export const MatchList: React.FC<MatchListProps> = ({ matches, attendedMatchIds, onAttend, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { upcomingMatches, filteredMatches } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const upcoming = matches
      .filter(match => {
        const matchDate = new Date(match.startTime);
        return matchDate >= today && matchDate < sevenDaysFromNow;
      })
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const filtered = normalizedQuery
      ? upcoming.filter(match => {
          const home = match.homeTeam?.name?.toLowerCase() ?? '';
          const away = match.awayTeam?.name?.toLowerCase() ?? '';
          return home.includes(normalizedQuery) || away.includes(normalizedQuery);
        })
      : upcoming;

    return { upcomingMatches: upcoming, filteredMatches: filtered };
  }, [matches, searchQuery]);

  const showNoMatchesMessage = upcomingMatches.length === 0;
  const showNoResultsMessage = !showNoMatchesMessage && filteredMatches.length === 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-text-strong">Matches in the Next 7 Days</h1>
          <button
            onClick={onRefresh}
            className="rounded-full p-2 text-text-subtle transition-colors hover:bg-surface-alt"
            aria-label="Refresh matches"
          >
            <RefreshIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-5 w-5 text-text-subtle" />
          </div>
          <input
            type="text"
            placeholder="Filter by team name..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-4 text-text placeholder:text-text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary md:w-64"
          />
        </div>
      </div>

      {showNoMatchesMessage && (
        <div className="rounded-md bg-surface py-20 text-center text-text">
          <h2 className="text-2xl font-bold text-text-strong">No Matches Scheduled</h2>
          <p className="mt-2 text-text-subtle">There are no matches scheduled in the next 7 days.</p>
        </div>
      )}

      {showNoResultsMessage && (
        <div className="rounded-md bg-surface py-20 text-center text-text">
          <h2 className="text-2xl font-bold text-text-strong">No Matches Found</h2>
          <p className="mt-2 text-text-subtle">
            No upcoming matches found for "{searchQuery}". Try a different search.
          </p>
        </div>
      )}

      {!showNoMatchesMessage && !showNoResultsMessage && (
        <div className="space-y-4">
          {filteredMatches.map(match => (
            <MatchListItem
              key={match.id}
              match={match}
              isAttended={attendedMatchIds.includes(match.id)}
              onAttend={onAttend}
            />
          ))}
        </div>
      )}
    </div>
  );
};