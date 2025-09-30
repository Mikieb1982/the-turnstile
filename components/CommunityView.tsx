import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UsersIcon, ArrowRightOnRectangleIcon } from './Icons';

export const CommunityView: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <UsersIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-text-strong">Community Hub</h1>
          <p className="text-text-subtle mt-1">Connect your Firebase project to unlock shared supporter profiles.</p>
        </div>
      </div>

      <div className="bg-surface rounded-xl shadow-card p-8 text-center space-y-4 border border-dashed border-border">
        <p className="text-lg text-text-subtle">
          Community features are unavailable in offline mode. Link a Firebase project to browse other fans, add friends, and share
          your matchday moments across devices.
        </p>
        {!currentUser && (
          <div className="flex items-center justify-center gap-3 text-text-subtle">
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Sign in once Firebase is configured to join the community.</span>
          </div>
        )}
      </div>
    </div>
  );
};
