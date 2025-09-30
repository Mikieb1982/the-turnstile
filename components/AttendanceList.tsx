import type { FC } from 'react';
import type { MatchAttendance, MatchWithVenue } from '../types';
import { formatDateTimeDE } from '../utils/formatDateTime';

interface AttendanceListProps {
  attendance: MatchAttendance[];
  lookup: Record<string, MatchWithVenue>;
  onSelect: (matchId: string) => void;
  onRemove: (matchId: string) => void;
}

export const AttendanceList: FC<AttendanceListProps> = ({ attendance, lookup, onSelect, onRemove }) => {
  if (!attendance?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/30 bg-white/70 p-8 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
        Log your first match to start building your Scrum Book memories.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/40 bg-white/80 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
      <ul className="divide-y divide-white/50 text-sm dark:divide-white/10">
        {attendance.map((entry) => {
          const match = lookup[entry.matchId];
          const attendedOn = formatDateTimeDE(entry.attendedOn);

          return (
            <li key={entry.matchId} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {match ? `${match.homeTeam} vs ${match.awayTeam}` : 'Match removed'}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  {match?.venue?.name ?? 'Unknown venue'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Attended on {attendedOn}</p>
                {entry.notes && <p className="mt-2 text-slate-600 dark:text-slate-300">{entry.notes}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(entry.matchId)}
                  className="rounded-full border border-white/40 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(entry.matchId)}
                  className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-orange-600"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
