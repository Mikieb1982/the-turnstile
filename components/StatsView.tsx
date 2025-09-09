
import React, { useMemo } from 'react';
import type { AttendedMatch, User } from '../types';
import { TEAMS } from '../services/mockData';
import { TeamLogo } from './TeamLogo';
import { ShareIcon, ShieldCheckIcon, UserCircleIcon } from './Icons';

interface StatsViewProps {
    attendedMatches: AttendedMatch[];
    user: User;
}

const StatCard: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`bg-surface p-4 rounded-xl shadow-card flex flex-col justify-center items-center text-center ${className}`}>
        <div className="text-3xl md:text-4xl font-extrabold text-primary [font-variant-numeric:tabular-nums]">
            {children}
        </div>
        <h3 className="text-xs font-semibold text-text-subtle uppercase mt-1">{label}</h3>
    </div>
);

export const StatsView: React.FC<StatsViewProps> = ({ attendedMatches, user }) => {

    const stats = useMemo(() => {
        if (attendedMatches.length === 0) {
            return null;
        }
        
        const currentYear = new Date().getFullYear();
        const matchesThisSeason = attendedMatches.filter(am => new Date(am.match.startTime).getFullYear() === currentYear);

        const uniqueVenues = new Set(attendedMatches.map(am => am.match.venue));
        const uniqueVenuesThisSeason = new Set(matchesThisSeason.map(am => am.match.venue));

        const teamCounts = attendedMatches.reduce((acc, { match }) => {
            const home = match.homeTeam?.name || 'N/A';
            const away = match.awayTeam?.name || 'N/A';
            acc[home] = (acc[home] || 0) + 1;
            acc[away] = (acc[away] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const favoriteTeamEntry = Object.entries(teamCounts).sort((a, b) => b[1] - a[1])[0];
        const favoriteTeam = favoriteTeamEntry ? Object.values(TEAMS).find(t => t.name === favoriteTeamEntry[0]) : null;

        const totalPoints = attendedMatches.reduce((sum, am) => sum + am.match.scores.home + am.match.scores.away, 0);

        const hasVisitedFrance = attendedMatches.some(am => am.match.homeTeam.name === 'Catalans Dragons' || am.match.awayTeam.name === 'Catalans Dragons');
        const countryCount = hasVisitedFrance ? 2 : 1;

        const highestScoringMatch = attendedMatches.reduce((highest, am) => {
            const currentTotal = am.match.scores.home + am.match.scores.away;
            const highestTotal = (highest?.match.scores.home || 0) + (highest?.match.scores.away || 0);
            return currentTotal > highestTotal ? am : highest;
        }, attendedMatches[0]);
        
        const bestMatchOfSeason = matchesThisSeason.length > 0
            ? [...matchesThisSeason].sort((a, b) => new Date(b.match.startTime).getTime() - new Date(a.match.startTime).getTime())[0]
            : null;

        return {
            totalMatches: attendedMatches.length,
            totalPoints,
            countryCount,
            highestScoringMatch,
            favoriteTeam: favoriteTeam || null,
            favoriteTeamCount: favoriteTeamEntry ? favoriteTeamEntry[1] : 0,
            bestMatchOfSeason,
            totalGrounds: uniqueVenues.size,
            newGroundsThisSeason: uniqueVenuesThisSeason.size,
        };
    }, [attendedMatches]);

    if (!stats) {
        return (
            <div className="text-center py-20 bg-surface rounded-xl">
                <h2 className="text-2xl font-bold text-text-strong">No Statistics Yet</h2>
                <p className="text-text-subtle mt-2">Attend some matches to start building your personal stats dashboard!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 text-text-strong">
             <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">The Scrum Book</h1>
                <button className="p-2 text-text-subtle hover:text-primary">
                    <ShareIcon className="w-6 h-6"/>
                </button>
            </div>

            <div className="flex items-center gap-4">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="User avatar" className="w-20 h-20 rounded-full object-cover border-4 border-surface" />
                ) : (
                    <div className="w-20 h-20 rounded-full object-cover border-4 border-surface bg-surface-alt flex items-center justify-center">
                        <UserCircleIcon className="w-12 h-12 text-text-subtle" />
                    </div>
                )}
                <div>
                    <h2 className="text-4xl font-extrabold text-primary">2024</h2>
                    <p className="text-lg font-semibold text-text-strong">{user.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <StatCard label="Matches">{stats.totalMatches}</StatCard>
                <StatCard label="Total Points">{stats.totalPoints}</StatCard>
                <StatCard label="Countries">{stats.countryCount}</StatCard>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-xl shadow-card text-center">
                    <h3 className="text-xs font-semibold text-text-subtle uppercase mb-2">Highest Scoring Match</h3>
                    <div className="flex items-center justify-center gap-3">
                        <ShieldCheckIcon className="w-8 h-8 text-text-subtle/50"/>
                        <span className="text-2xl font-bold">{stats.highestScoringMatch.match.scores.home} - {stats.highestScoringMatch.match.scores.away}</span>
                        <ShieldCheckIcon className="w-8 h-8 text-text-subtle/50"/>
                    </div>
                </div>
                <div className="bg-surface p-4 rounded-xl shadow-card text-center flex flex-col justify-center">
                    <h3 className="text-xs font-semibold text-text-subtle uppercase mb-2">Most Seen Team</h3>
                    <div className="flex items-center justify-center gap-3">
                       {stats.favoriteTeam && <TeamLogo teamId={stats.favoriteTeam.id} teamName={stats.favoriteTeam.name} size="small"/>}
                        <span className="text-2xl font-bold">{stats.favoriteTeamCount}</span>
                    </div>
                </div>
            </div>

            {stats.bestMatchOfSeason && (
                 <div className="bg-surface rounded-xl shadow-card overflow-hidden">
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1594498742294-967252041133?q=80&w=2670&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Stadium view" className="w-full h-32 object-cover"/>
                        <div className="absolute inset-0 bg-black/40"></div>
                        <h3 className="absolute top-2 left-4 text-white font-bold text-sm">BEST MATCH OF 2024</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-xs font-semibold text-text-subtle">{new Date(stats.bestMatchOfSeason.match.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}</p>
                        <p className="font-bold">{stats.bestMatchOfSeason.match.venue}</p>
                        <div className="flex items-center justify-between mt-2">
                             <div className="flex items-center gap-2">
                                <TeamLogo teamId={stats.bestMatchOfSeason.match.homeTeam.id} teamName={stats.bestMatchOfSeason.match.homeTeam.name} size="small"/>
                                <span className="font-semibold text-sm">{stats.bestMatchOfSeason.match.homeTeam.name}</span>
                            </div>
                            <span className="font-bold text-lg">{stats.bestMatchOfSeason.match.scores.home}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                             <div className="flex items-center gap-2">
                                <TeamLogo teamId={stats.bestMatchOfSeason.match.awayTeam.id} teamName={stats.bestMatchOfSeason.match.awayTeam.name} size="small"/>
                                <span className="font-semibold text-sm">{stats.bestMatchOfSeason.match.awayTeam.name}</span>
                            </div>
                            <span className="font-bold text-lg">{stats.bestMatchOfSeason.match.scores.away}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard label="Grounds">{stats.totalGrounds}</StatCard>
                <StatCard label="New Grounds (2024)">{stats.newGroundsThisSeason}</StatCard>
            </div>
        </div>
    );
};