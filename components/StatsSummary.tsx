import type { FC } from 'react';
import type { AttendanceStats } from '../types';
import { formatDateTimeDE } from '../utils/formatDateTime';

interface StatsSummaryProps {
  stats: AttendanceStats;
}

const formatValue = (value: number | undefined) =>
  typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('de-DE') : '–';

export const StatsSummary: FC<StatsSummaryProps> = ({ stats }) => {
  const { totalMatches, uniqueVenues, currentStreak, favouriteVenue, firstMatchDate, recentAttendance } = stats ?? {};

  return (
    <section className="grid gap-4 rounded-2xl border border-white/40 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Matches logged</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{formatValue(totalMatches)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Unique venues</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{formatValue(uniqueVenues)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Current streak</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">{formatValue(currentStreak)}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Favourite venue</p>
        <p className="text-base font-semibold text-slate-900 dark:text-white">{favouriteVenue ?? 'Add your first match'}</p>
        {firstMatchDate && (
          <p className="text-xs text-slate-500 dark:text-slate-400">Since {formatDateTimeDE(firstMatchDate)}</p>
        )}
      </div>
      {recentAttendance && (
        <div className="md:col-span-2 lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Most recent memory</p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            {recentAttendance.homeTeam} vs {recentAttendance.awayTeam} ·{' '}
            {formatDateTimeDE(recentAttendance.date, recentAttendance.kickoffTime)}
          </p>
        </div>
      )}
    </section>
  );
};
