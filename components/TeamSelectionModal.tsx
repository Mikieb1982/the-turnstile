import React from 'react';
import { TEAMS, TEAM_BRANDING } from '../services/mockData';
import { TeamLogo } from './TeamLogo';
import { XMarkIcon } from './Icons';

interface TeamSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (teamId: string) => void;
  currentTeamId?: string;
}

const allTeams = Object.values(TEAMS);

export const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({ isOpen, onClose, onSelectTeam, currentTeamId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="team-select-title">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="team-select-title" className="text-xl font-bold text-text-strong">Select Favorite Team</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-subtle hover:bg-surface-alt" aria-label="Close">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allTeams.map(team => {
              const isSelected = currentTeamId === team.id;
              const branding = TEAM_BRANDING[team.id];
              const style = isSelected && branding ? { borderColor: branding.bg, backgroundColor: `${branding.bg}1A` } : {};

              return (
                <button 
                  key={team.id}
                  onClick={() => onSelectTeam(team.id)}
                  className={`p-4 flex flex-col items-center gap-2 rounded-md transition-all border-2 ${
                    !isSelected ? 'border-transparent hover:bg-surface-alt hover:shadow-md' : ''
                  }`}
                  style={style}
                >
                  <TeamLogo teamId={team.id} teamName={team.name} size="medium" />
                  <span className="text-sm font-semibold text-center text-text-strong">{team.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
