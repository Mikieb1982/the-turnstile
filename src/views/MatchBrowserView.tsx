import type { FC } from 'react';
import type { MatchWithVenue } from '../types';
import { formatDateTimeDE } from '../utils/formatDateTime';

interface MatchGridProps {
  matches: MatchWithVenue[];
  attendedIds: Set<string>;
  onSelect: (matchId: string) => void;
  onToggleAttendance: (matchId: string, attended: boolean) => void;
}

export const MatchGrid: FC<MatchGridProps> = ({
  matches,
  attendedIds,
  onSelect,
  onToggleAttendance,
}) => {
  if (!matches?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/60 p-8 text-center text-sm text-slate-600 dark:border-white/5 dark:bg-slate-900/70 dark:text-slate-300">
        No fixtures match your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((m) => {
        const attended = attendedIds.has(m.id);
        const dateTime = formatDateTimeDE(m.date, m.kickoffTime);

        return (
          <article
            key={m.id}
            className="group rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/70"
          >
            <header className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {m.round ?? 'Fixture'}
                </p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {m.homeTeam} vs {m.awayTeam}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onToggleAttendance(m.id, !attended)}
                className={`h-9 rounded-full px-3 text-xs font-semibold uppercase tracking-wide transition ${
                  attended
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
                aria-pressed={attended}
                aria-label={attended ? 'Remove from attended' : 'Mark as attended'}
                title={attended ? 'Logged in my Scrum Book' : 'I was there'}
              >
                {attended ? 'Logged' : 'I was there'}
              </button>
            </header>

            <p className="text-sm text-slate-700 dark:text-slate-200">
              {dateTime}
              {m.venue?.city ? ` · ${m.venue.city}` : ''}
            </p>

            <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
              {m.headline ?? 'No notes yet.'}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {m.venue?.name ?? 'Unknown venue'}
              </p>
              <button
                type="button"
                onClick={() => onSelect(m.id)}
                className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-800 ring-1 ring-black/10 transition hover:bg-white dark:bg-slate-800/70 dark:text-slate-100 dark:ring-white/10 dark:hover:bg-slate-800"
                aria-label="View details"
              >
                Details
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};
