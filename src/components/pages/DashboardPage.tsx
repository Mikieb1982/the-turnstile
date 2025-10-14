import React from 'react';
import { StatDisplay } from '../atoms/StatDisplay';
import { NextMatchCard } from '../molecules/NextMatchCard';
import { ShareButton } from '../molecules/ShareButton';

interface DashboardPageProps {
  user: {
    stats: {
      matchesAttended: number;
      stadiumsVisited: number;
      badgesEarned: number;
    };
  };
  nextMatch: {
    id: number;
    homeTeam: string;
    awayTeam: string;
    date: string;
    stadium: string;
    homeLogo: string;
    awayLogo: string;
  };
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, nextMatch }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-3">My Next Match</h2>
        <NextMatchCard
          homeTeam={nextMatch.homeTeam}
          awayTeam={nextMatch.awayTeam}
          date={nextMatch.date}
          stadium={nextMatch.stadium}
          homeLogo={nextMatch.homeLogo}
          awayLogo={nextMatch.awayLogo}
          onLogAttendance={() => alert('Log Attendance clicked!')}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-3">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <StatDisplay label="Matches Attended" value={user.stats.matchesAttended} icon="🎫" />
          <StatDisplay label="Unique Grounds" value={user.stats.stadiumsVisited} icon="🏟️" />
          <StatDisplay label="Badges Earned" value={user.stats.badgesEarned} icon="🏆" />
        </div>
      </div>

      <div>
        <ShareButton stats={user.stats} />
      </div>
    </div>
  );
};