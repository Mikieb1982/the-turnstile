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
