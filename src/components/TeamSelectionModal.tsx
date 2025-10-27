<<<<<<< HEAD
import React, { useState, useMemo } from 'react';
import { TEAMS } from '../services/mockData';
import { TeamLogo } from './Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TeamSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTeam: (teamId: string) => void;
    title?: string;
    description?: string;
}

export const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
    isOpen,
    onClose,
    onSelectTeam,
    title = "Select a Team",
    description = "Choose a team from the list below."
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeams = useMemo(() => {
        return TEAMS.filter(team =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-muted-foreground mb-4">{description}</p>

                <Input
                    type="text"
                    placeholder="Search teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                />

                <div className="max-h-96 overflow-y-auto pr-2">
                    <div className="grid grid-cols-1 gap-2">
                        {filteredTeams.map(team => (
                            <button
                                key={team.id}
                                onClick={() => onSelectTeam(team.id)}
                                className="flex w-full items-center gap-4 rounded-md p-2 text-left transition-colors hover:bg-muted/50"
                            >
                                <TeamLogo logo={team.logo} alt={team.name} size={32} />
                                <span className="font-semibold">{team.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </div>
    );
=======
import React, { useMemo } from 'react';
import { TEAMS, TEAM_BRANDING } from '../services/mockData';
import { TeamLogo } from './TeamLogo';
import { XMarkIcon } from './Icons';
import { createTeamAwareTheme, type ThemeMode } from '../../utils/themeUtils';

interface TeamSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (teamId: string) => void;
  currentTeamId?: string;
  themeMode?: ThemeMode;
}

const allTeams = Object.values(TEAMS);

export const TeamSelectionModal: React.FC<TeamSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectTeam,
  currentTeamId,
  themeMode = 'light',
}) => {
  if (!isOpen) return null;

  const themedTeams = useMemo(
    () =>
      allTeams.map((team) => ({
        team,
        theme: createTeamAwareTheme(themeMode, team.id),
      })),
    [themeMode]
  );

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
          <div className="grid grid-cols-1 gap-4 text-xs text-text-subtle">
            <p>
              Pick the club you follow to automatically adapt colours, gradients, and surfaces across the app. You can change
              this at any time—perfect for switching allegiances on derby day.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {themedTeams.map(({ team, theme }) => {
              const isSelected = currentTeamId === team.id;
              const branding = TEAM_BRANDING[team.id];
              const style =
                isSelected && branding
                  ? { borderColor: branding.bg, backgroundColor: `${branding.bg}1A` }
                  : {};

              return (
                <button
                  key={team.id}
                  onClick={() => onSelectTeam(team.id)}
                  className={`p-4 flex flex-col items-center gap-2 rounded-xl transition-all border-2 ${
                    isSelected
                      ? 'border-primary shadow-md shadow-primary/20'
                      : 'border-transparent hover:bg-surface-alt hover:shadow-md'
                  }`}
                  style={style}
                >
                  <TeamLogo teamId={team.id} teamName={team.name} size="medium" />
                  <span className="text-sm font-semibold text-center text-text-strong">{team.name}</span>
                  <div className="mt-3 w-full rounded-lg overflow-hidden border border-border/60">
                    <div className="h-6 w-full" style={{ background: theme.gradient1 }} aria-hidden />
                    <div className="flex h-8 w-full">
                      <div className="flex-1" style={{ background: theme.primary }} aria-hidden />
                      <div className="flex-1" style={{ background: theme.secondary }} aria-hidden />
                      <div className="flex-1" style={{ background: theme.accent }} aria-hidden />
                    </div>
                  </div>
                  {isSelected ? (
                    <span className="text-xs font-semibold text-primary">Active theme</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
};
