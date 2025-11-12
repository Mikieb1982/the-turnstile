// components/RecentVisitsTable.tsx
import { Visit } from '@/types';
import { FiMapPin } from 'react-icons/fi';

export default function RecentVisitsTable({ visits }: { visits: Visit[] }) {
  if (visits.length === 0) {
    return (
      <div className="rounded-2xl bg-white/60 p-6 shadow-lg ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-800/60 dark:ring-white/10 text-center">
        <FiMapPin className="mx-auto h-12 w-12 text-slate-400" />
        <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">No visits</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          You haven&apos;t logged any visits yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visits.slice(0, 3).map((visit) => (
        <div
          key={visit.id}
          className="rounded-2xl bg-white/60 p-6 shadow-lg ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-800/60 dark:ring-white/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold break-words">{visit.stadium}</p>
              <p className="text-gray-400">
                {new Date(visit.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
