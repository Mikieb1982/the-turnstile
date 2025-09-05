import React, { useState } from 'react';
import { teamsData } from '../services/stadiumData';
import type { TeamInfo } from '../types';
import { StadiumModal } from './StadiumModal';
import { TrophyIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { TEAMS } from '../services/mockData';

export const TeamStatsView: React.FC = () => {
    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null);

    return (
        <div className="space-y-6">
            <div className="text-center border-b border-border pb-4">
                <h1 className="text-3xl font-bold text-text-strong">Rugby League Super League</h1>
                <p className="text-lg text-text-subtle mt-1">Teams, Stats & Stadiums</p>
            </div>

            <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamsData.sort((a,b) => a.name.localeCompare(b.name)).map(team => {
                    const teamDetails = Object.values(TEAMS).find(t => t.name === team.name);
                    return (
                        <button
                            key={team.name}
                            onClick={() => setSelectedTeam(team)}
                            className="card bg-surface rounded-xl p-6 flex flex-col items-center text-center shadow-card hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
                        >
                            <TeamLogo logoUrl={teamDetails?.logoUrl} teamName={team.name} size="medium" className="mb-4" />
                            <h2 className="text-xl font-bold mb-1 text-primary">{team.name}</h2>
                            <p className="text-sm text-text-subtle mb-4">Established: {team.established}</p>
                            <div className="mt-auto pt-4 text-text-strong border-t border-border w-full">
                                <p className="text-base font-semibold flex items-center justify-center gap-2">
                                    <TrophyIcon className="w-5 h-5 text-accent"/>
                                    Super League Titles: <span className="text-text-strong">{team.titles}</span>
                                </p>
                                <p className="text-xs mt-2 text-text-subtle">{team.stadium.name}</p>
                            </div>
                        </button>
                    )
                })}
            </main>

            <StadiumModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
        </div>
    );
};