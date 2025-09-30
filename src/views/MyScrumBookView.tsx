import type { FC } from 'react';
import type { AttendanceStats, MatchAttendance, MatchWithVenue } from '../types';
import { StatsSummary } from '../components/StatsSummary';
import { AttendanceList } from '../components/AttendanceList';
import { Tile } from '../components/Tile';

interface MyScrumBookViewProps {
  stats: AttendanceStats;
  attendance: MatchAttendance[];
  lookup: Record<string, MatchWithVenue>;
  onSelectMatch: (matchId: string) => void;
  onRemoveAttendance: (matchId: string) => void;
}

const formatMatchDateTime = (dateISO: string, timeHHMM?: string) => {
  const iso = timeHHMM ? `${dateISO}T${timeHHMM}` : dateISO;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const date = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
  const time = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
  return `${date} ${time}`;
};

export const MyScrumBookView: FC<MyScrumBookViewProps> = ({
  stats,
  attendance,
  lookup,
  onSelectMatch,
  onRemoveAttendance,
}) => {
  const highlightMatch = stats?.recentAttendance;

  return (
    <div className="flex flex-col gap-6">
      <StatsSummary stats={stats} />

      {highlightMatch && (
        <Tile
          title="Latest memory"
          eyebrow={highlightMatch.venue?.name ?? 'Unknown venue'}
          highlight
          aria-label="Latest attended match"
        >
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            {highlightMatch.homeTeam} vs {highlightMatch.awayTeam}
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            {formatMatchDateTime(highlightMatch.date, highlightMatch.kickoffTime)}
            {' · '}
            {highlightMatch.venue?.city ?? 'Unknown city'}
          </p>

          {highlightMatch.headline && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {highlightMatch.headline}
            </p>
          )}
        </Tile>
      )}

      <AttendanceList
        attendance={attendance}
        lookup={lookup}
        onSelect={onSelectMatch}
        onRemove={onRemoveAttendance}
      />
    </div>
  );
};
