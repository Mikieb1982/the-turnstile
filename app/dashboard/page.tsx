// app/dashboard/page.tsx
import WelcomeCard from '@/components/WelcomeCard';
import StatsDashboard from '@/components/StatsDashboard';
import MatchCard from '@/components/MatchCard';
import SeasonProgress from '@/components/SeasonProgress';
import ActionButton from '@/components/ActionButton';
import TeamBadge from '@/components/TeamBadge';

export default function DashboardPage() {
  // Mock data - replace with real data
  const userData = {
    name: 'Mike',
    matchesAttended: 24,
    teamsVisited: 8,
    venuesVisited: 12,
    consecutiveWeeks: 5,
    currentWeek: 18,
    totalWeeks: 27
  };

  const recentMatches = [
    {
      homeTeam: 'Wigan Warriors',
      awayTeam: 'St Helens',
      homeScore: 24,
      awayScore: 18,
      date: '15 Oct 2024',
      venue: 'DW Stadium',
      attended: true
    },
    {
      homeTeam: 'Leeds Rhinos',
      awayTeam: 'Hull FC',
      homeScore: 32,
      awayScore: 16,
      date: '08 Oct 2024',
      venue: 'Headingley Stadium',
      attended: true
    }
  ];

  const teams = [
    { name: 'Wigan', visited: true },
    { name: 'St Helens', visited: true },
    { name: 'Leeds', visited: true },
    { name: 'Hull FC', visited: false },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <WelcomeCard userName={userData.name} />

      {/* Stats Grid */}
      <StatsDashboard
        matchesAttended={userData.matchesAttended}
        teamsVisited={userData.teamsVisited}
        venuesVisited={userData.venuesVisited}
        consecutiveWeeks={userData.consecutiveWeeks}
      />

      {/* Season Progress */}
      <SeasonProgress
        currentWeek={userData.currentWeek}
        totalWeeks={userData.totalWeeks}
        matchesAttended={userData.matchesAttended}
      />

      {/* Recent Matches Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-display-md text-text-primary uppercase tracking-wide">
            Recent Matches
          </h2>
          <ActionButton variant="accent" size="sm" icon="add">
            Log Match
          </ActionButton>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {recentMatches.map((match, index) => (
            <MatchCard key={index} {...match} />
          ))}
        </div>
      </section>

      {/* Teams Collection */}
      <section className="bg-card rounded-lg p-6 shadow-card">
        <h2 className="font-display text-display-md text-text-primary uppercase tracking-wide mb-6">
          Your Team Collection
        </h2>
        
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {teams.map((team, index) => (
            <TeamBadge
              key={index}
              teamName={team.name}
              visited={team.visited}
              size="md"
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <ActionButton variant="ghost" size="sm">
            View All Teams
          </ActionButton>
        </div>
      </section>
    </div>
  );
}
