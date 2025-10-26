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
};
