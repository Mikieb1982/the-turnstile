import type { FC } from 'react';
import type { MatchWithVenue } from '../types';
import { Tile } from '../../components/Tile';

interface MatchDetailViewProps {
  match?: MatchWithVenue;
  isAttended: boolean;
  onBack: () => void;
  onToggleAttendance: (matchId: string, attended: boolean) => void;
}

const formatDateTimeDE = (dateISO: string, timeHHMM?: string) => {
  const iso = timeHHMM ? `${dateISO}T${timeHHMM}` : dateISO;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const date = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
  const time =
    timeHHMM &&
    new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  return time ? `${date} ${time}` : date;
};

export const MatchDetailView: FC<MatchDetailViewProps> = ({
  match,
  isAttended,
  onBack,
  onToggleAttendance,
}) => {
  if (!match) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/60 p-10 text-center text-sm text-slate-500 dark:border-white/5 dark:bg-slate-900/70 dark:text-slate-300">
        Select a fixture from the browser to view full match information.
      </div>
    );
  }

  const formattedDateTime = formatDateTimeDE(match.date, match.kickoffTime);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-white/40 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-800"
          aria-label="Back to browser"
        >
          ← Back to browser
        </button>
        <button
          type="button"
          onClick={() => onToggleAttendance(match.id, !isAttended)}
          className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
            isAttended
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
          aria-pressed={isAttended}
        >
          {isAttended ? 'Logged in my Scrum Book' : 'I was there'}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Tile title="Fixture" eyebrow={match.round} highlight>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {match.homeTeam} vs {match.awayTeam}
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-200">{formattedDateTime}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            {match.headline ?? 'Add your own notes once you have saved this match to your Scrum Book.'}
          </p>
        </Tile>

        <Tile title="Venue" eyebrow={match.venue.city}>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{match.venue.name}</p>
          {match.venue.notes && <p className="mt-2 text-sm">{match.venue.notes}</p>}
          {typeof match.venue.capacity === 'number' && (
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Capacity {match.venue.capacity.toLocaleString('de-DE')} supporters
            </p>
          )}
        </Tile>

        <Tile title="Broadcast" eyebrow="How to follow">
          <p className="text-sm">
            {match.broadcast ?? 'Coverage to be announced. Add your streaming or radio notes when you attend.'}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Competition</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{match.competitionName}</p>
        </Tile>
      </div>
    </div>
  );
};
