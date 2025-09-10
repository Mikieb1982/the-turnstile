import React from 'react';
import type { AttendedMatch } from '../types';
import { XMarkIcon } from './Icons';
import { TeamLogo } from './TeamLogo';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendedMatch: AttendedMatch | null;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({ isOpen, onClose, attendedMatch }) => {
  if (!isOpen || !attendedMatch || !attendedMatch.photoUrl) return null;

  const { match, attendedOn, photoUrl } = attendedMatch;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="bg-surface rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img src={photoUrl} alt={`Photo from ${match.homeTeam.name} vs ${match.awayTeam.name}`} className="w-full h-auto max-h-[70vh] object-contain rounded-t-xl" />
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 p-1.5 rounded-full text-white bg-black/50 hover:bg-black/70" 
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-t border-border bg-surface-alt rounded-b-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <TeamLogo teamId={match.homeTeam.id} teamName={match.homeTeam.name} size="small" />
              <span className="font-semibold">{match.homeTeam.name}</span>
              <span className="text-primary font-bold">{match.scores.home}</span>
            </div>
            <span className="text-text-subtle font-bold">vs</span>
             <div className="flex items-center gap-2 truncate justify-end">
              <span className="text-primary font-bold">{match.scores.away}</span>
              <span className="font-semibold">{match.awayTeam.name}</span>
              <TeamLogo teamId={match.awayTeam.id} teamName={match.awayTeam.name} size="small" />
            </div>
          </div>
          <p className="text-xs text-text-subtle text-center mt-2">
            {match.venue} &bull; Attended on {new Date(attendedOn).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};