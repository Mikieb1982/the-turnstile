import React from 'react';
import { mockMatches, mockLeagueTable } from '../services/mockData';
import { ServerIcon, AlertTriangleIcon } from './Icons';

export const DataUploader: React.FC = () => {
  return (
    <div className="bg-surface p-6 md:p-8 rounded-md shadow-card max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6 border-b border-border pb-4">
        <ServerIcon className="w-10 h-10 text-primary" />
        <h1 id="data-uploader-title" className="text-3xl font-bold text-text-strong">
          Admin: Data Management
        </h1>
      </div>

      <p className="text-text-subtle mb-6">
        The Scrum Book runs in offline mode by default. Configure Firebase before attempting to upload the seeded data set.
      </p>

      <div className="rounded-md border border-warning/30 bg-warning/10 p-4 text-warning flex items-center gap-3">
        <AlertTriangleIcon className="w-6 h-6" />
        <p className="font-semibold">
          Firebase is disabled in this build. Add environment variables and reinstall dependencies to sync the {mockMatches.length}{' '}
          matches and {mockLeagueTable.length} league standings to Firestore.
        </p>
      </div>
    </div>
  );
};
