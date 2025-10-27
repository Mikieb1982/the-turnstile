<<<<<<< HEAD
import React from 'react';
import type { AttendedMatch, Match, MatchFilters } from '../types';
import { MatchListItem } from './MatchListItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MatchListProps {
  matches: AttendedMatch[];
  filters: MatchFilters;
  onFilterChange: (filters: Partial<MatchFilters>) => void;
  onEdit: (match: AttendedMatch) => void;
  onDelete: (matchId: string) => void;
  onShare: (match: Match) => void;
  onPhotoUpload: (match: AttendedMatch) => void;
  onPhotoDelete: (match: AttendedMatch) => void;
  onPhotoClick: (match: AttendedMatch) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
  onShare,
  onPhotoUpload,
  onPhotoDelete,
  onPhotoClick,
}) => {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No matches yet!</h3>
        <p className="text-muted-foreground mt-2">Add your first match to start your collection.</p>
      </div>
    );
  }

  const uniqueYears = [...new Set(matches.map(m => new Date(m.match.date).getFullYear()))].sort((a, b) => b - a);
  const uniqueCompetitions = [...new Set(matches.map(m => m.match.competition))];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Select value={filters.sortBy} onValueChange={(value) => onFilterChange({ sortBy: value as MatchFilters['sortBy'] })}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date_desc">Date (Newest First)</SelectItem>
            <SelectItem value="date_asc">Date (Oldest First)</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.year || 'all'} onValueChange={(value) => onFilterChange({ year: value === 'all' ? null : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by year..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {uniqueYears.map(year => (
              <SelectItem key={year} value={String(year)}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.competition || 'all'} onValueChange={(value) => onFilterChange({ competition: value === 'all' ? null : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by competition..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Competitions</SelectItem>
            {uniqueCompetitions.map(comp => (
              <SelectItem key={comp} value={comp}>{comp}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Displaying <span className="font-bold">{matches.length}</span> out of <span className="font-bold">{matches.length}</span> total matches. Filtered by &quot;{filters.sortBy}&quot;, &quot;{filters.year || 'All Years'}&quot; and &quot;{filters.competition || 'All Competitions'}&quot;.
      </p>

      <ul className="space-y-4">
        {matches.map(attendedMatch => (
          <MatchListItem
            key={attendedMatch.id}
            attendedMatch={attendedMatch}
            onEdit={() => onEdit(attendedMatch)}
            onDelete={() => onDelete(attendedMatch.id)}
            onShare={() => onShare(attendedMatch.match)}
            onPhotoUpload={() => onPhotoUpload(attendedMatch)}
            onPhotoDelete={() => onPhotoDelete(attendedMatch)}
            onPhotoClick={() => onPhotoClick(attendedMatch)}
          />
        ))}
      </ul>
    </div>
  );
};
=======
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
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
