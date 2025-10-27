<<<<<<< HEAD
import React, { useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { ALL_MATCHES, TEAMS } from '../services/mockData';
import { TrophyIcon, TrendingUpIcon, FlameIcon, ZapIcon, BarChart3Icon } from 'lucide-react';

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string | React.ReactNode; footer: string }> = ({ icon, label, value, footer }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{label}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{footer}</p>
    </CardContent>
  </Card>
);

const TeamStatRow: React.FC<{ rank: number; logo: string; name: string; value: string | number }> = ({ rank, logo, name, value }) => (
    <div className="flex items-center space-x-4 py-2">
      <div className="w-6 text-center text-sm font-semibold text-muted-foreground">{rank}</div>
      <Image src={logo} alt={name} width={32} height={32} className="h-8 w-8 object-contain" />
      <div className="flex-grow font-semibold">{name}</div>
      <div className="w-12 text-right text-lg font-bold">{value}</div>
    </div>
  );

export const StatsView: React.FC = () => {
  const { currentUser } = useAuth();

  const userStats = useMemo(() => {
    const attendedMatches = currentUser?.attendedMatches || [];
    const totalGoals = attendedMatches.reduce((sum, am) => sum + (am.match.homeTeam.score + am.match.awayTeam.score), 0);
    const homeGames = attendedMatches.filter(am => am.match.homeTeam.id === currentUser?.favoriteTeamId).length;
    const awayGames = attendedMatches.filter(am => am.match.awayTeam.id === currentUser?.favoriteTeamId).length;

    const biggestWin = attendedMatches.length > 0 ?
      attendedMatches.reduce((max, am) => {
        const margin = Math.abs(am.match.homeTeam.score - am.match.awayTeam.score);
        return margin > max.margin ? { match: am.match, margin } : max;
      }, { match: attendedMatches[0].match, margin: 0 })
      : null;

    return {
      totalGoals,
      homeGames,
      awayGames,
      biggestWinMargin: biggestWin?.margin,
      biggestWinMatch: biggestWin?.match,
    };
  }, [currentUser]);

  const globalStats = useMemo(() => {
    const mostAttendedTeam = TEAMS.map(team => ({
        ...team,
        attendance: ALL_MATCHES.filter(m => m.homeTeam.id === team.id || m.awayTeam.id === team.id).length
    })).sort((a,b) => b.attendance - a.attendance);

    const highestScoringTeam = TEAMS.map(team => ({
        ...team,
        goals: ALL_MATCHES.reduce((total, m) => {
            if (m.homeTeam.id === team.id) return total + m.homeTeam.score;
            if (m.awayTeam.id === team.id) return total + m.awayTeam.score;
            return total;
        }, 0)
    })).sort((a,b) => b.goals - a.goals);

    const topGoalScorer = {
      name: "Bevan French",
      team: "Wigan Warriors",
      goals: 28,
      teamLogo: TEAMS.find(t => t.name === "Wigan Warriors")?.logo || ''
    }

    return {
      mostAttendedTeam,
      highestScoringTeam,
      topGoalScorer
    };
  }, []);

  return (
    <div className="space-y-6 pb-20">
        <div>
            <h2 className="text-lg font-bold">Your Stats</h2>
            <p className="text-muted-foreground">A detailed look at your match attendance history.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatItem
          icon={<FlameIcon className="h-4 w-4" />}
          label="Total Goals Seen"
          value={userStats.totalGoals}
          footer="Across all matches you have attended"
        />
        <StatItem
          icon={<BarChart3Icon className="h-4 w-4" />}
          label="Favorite Team Mix"
          value={`${userStats.homeGames} Home / ${userStats.awayGames} Away`}
          footer="Your home vs. away game ratio"
        />
        <StatItem
          icon={<TrophyIcon className="h-4 w-4" />}
          label="Biggest Win Margin"
          value={userStats.biggestWinMargin !== null ? `${userStats.biggestWinMargin} Points` : 'N/A'}
          footer={userStats.biggestWinMatch ? `${userStats.biggestWinMatch.homeTeam.name} vs ${userStats.biggestWinMatch.awayTeam.name}` : 'Attend a match to see'}
        />
         <StatItem
          icon={<ZapIcon className="h-4 w-4" />}
          label="Attendance Streak"
          value={"5"}
          footer="You have attended 5 consecutive matches!"
        />
      </div>

      <div>
        <h2 className="text-lg font-bold mt-8">Super League Stats</h2>
        <p className="text-muted-foreground">League-wide statistics for the current season.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Top Goal Scorer</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Image src={globalStats.topGoalScorer.teamLogo} alt={globalStats.topGoalScorer.team} width={96} height={96} className="h-24 w-24 mb-4" />
            <p className="text-xl font-bold">{globalStats.topGoalScorer.name}</p>
            <p className="text-muted-foreground">{globalStats.topGoalScorer.team}</p>
            <p className="text-4xl font-extrabold mt-2">{globalStats.topGoalScorer.goals}</p>
            <p className="text-sm text-muted-foreground">Goals</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><TrendingUpIcon className="mr-2 h-4 w-4" />Most Attended Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
                {globalStats.mostAttendedTeam.slice(0, 5).map((team, index) => (
                    <TeamStatRow key={team.id} rank={index + 1} logo={team.logo} name={team.name} value={team.attendance} />
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center"><FlameIcon className="mr-2 h-4 w-4" />Highest Scoring Teams</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {globalStats.highestScoringTeam.slice(0, 5).map((team, index) => (
                        <TeamStatRow key={team.id} rank={index + 1} logo={team.logo} name={team.name} value={`${team.goals} gls`} />
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};
=======
import { ShareOutcome, getAppShareUrl, attemptShare } from '../utils/share';
import React, { useMemo, useState } from 'react';
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

    const [shareStatus, setShareStatus] = useState<ShareOutcome | null>(null);
    const [isSharing, setIsSharing] = useState(false);

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

    const shareSummary = useMemo(() => {
        if (!stats) {
            return 'Check out my Turnstile rugby league season summary!';
        }
        const parts = [
            `I've checked in to ${stats.totalMatches} matches`,
            `seen ${stats.totalPoints} total points`,
            `and visited ${stats.totalGrounds} different grounds`,
        ];
        return `${parts.join(', ')} on The Turnstile.`;
    }, [stats]);

    const handleShare = async () => {
        if (!stats || isSharing) {
            return;
        }
        setIsSharing(true);
        try {
            const outcome = await attemptShare(
                `${user.name}'s season on The Turnstile`,
                shareSummary,
                getAppShareUrl()
            );
            setShareStatus(outcome);
        } finally {
            setIsSharing(false);
        }
    };

    const shareFeedback = useMemo(() => {
        if (shareStatus === ShareOutcome.Shared) {
            return 'Thanks! Your season summary is on its way.';
        }
        if (shareStatus === ShareOutcome.Copied) {
            return 'Link copied to your clipboard. Paste it anywhere to brag about your stats!';
        }
        if (shareStatus === ShareOutcome.Failed) {
            return 'We could not share automatically. Try copying the link instead.';
        }
        return null;
    }, [shareStatus]);

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
                <h1 className="text-xl font-bold">The Turnstile</h1>
                <button
                    className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm font-semibold text-text-subtle transition hover:border-primary hover:text-primary disabled:opacity-50"
                    onClick={handleShare}
                    disabled={isSharing}
                >
                    <ShareIcon className="w-4 h-4"/>
                    {isSharing ? 'Sharing…' : 'Share season'}
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

            {shareFeedback && (
                <div className="rounded-full border border-border bg-surface-alt px-4 py-2 text-center text-xs font-semibold text-text-subtle" role="status" aria-live="polite">
                    {shareFeedback}
                </div>
            )}
        </div>
    );
};
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
