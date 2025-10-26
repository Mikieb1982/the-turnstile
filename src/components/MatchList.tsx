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
