'use client';

import React from 'react';
import type { TeamInfo } from '@/types';
import { XMarkIcon } from './Icons';

interface StadiumModalProps {
  team: TeamInfo | null;
  onClose: () => void;
}

export const StadiumModal: React.FC<StadiumModalProps> = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
        onClick={onClose} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="stadium-modal-title"
    >
      <div 
        className="bg-surface rounded-xl shadow-lg w-full max-w-lg border border-border relative" 
        onClick={e => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-1 rounded-full text-text-subtle hover:bg-surface-alt" 
            aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="p-6">
            <h2 id="stadium-modal-title" className="text-2xl font-bold text-primary">{team.stadium.name}</h2>
            <p className="text-lg text-text-subtle mb-4">{team.name}</p>
            <div className="space-y-3 text-text">
                <p><span className="font-semibold text-text-strong w-24 inline-block">Location:</span> {team.location}</p>
                <p><span className="font-semibold text-text-strong w-24 inline-block">Capacity:</span> {team.stadium.capacity}</p>
                <p><span className="font-semibold text-text-strong w-24 inline-block">Established:</span> {team.established}</p>
                <p className="pt-2 border-t border-border"><span className="font-semibold text-text-strong w-24 inline-block">Notes:</span> {team.stadium.notes}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
