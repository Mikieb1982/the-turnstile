// app/dashboard/page.tsx
'use client'; // <-- ADDED 'use client'

import WelcomeCard from '@/components/WelcomeCard';
import StatsDashboard from '@/components/StatsDashboard';
import MatchCard from '@/components/MatchCard';
import SeasonProgress from '@/components/SeasonProgress';
import ActionButton from '@/components/ActionButton';
import TeamBadge from '@/components/TeamBadge';
import RecentMatchesTable from '@/components/RecentMatchesTable';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext'; // <-- IMPORT THE HOOK
import { useEffect, useState } from 'react'; // Keep useEffect/useState for match data
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Match } from '@/types'; // Import your Match type

export default function DashboardPage() {
  const { user, loading } = useAuth(); // Use the auth hook
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  // Mock data - replace with real data
  const userData = {
    name: user?.displayName || 'Fan', // Use user's name
    matchesAttended: 24,
    teamsVisited: 8,
    venuesVisited: 12,
    consecutiveWeeks: 5,
    currentWeek: 18,
    totalWeeks: 27,
  };

  // Fetch matches from Firestore
  useEffect(() => {
    if (user) {
      const fetchMatches = async () => {
        setIsLoadingMatches(true);
        try {
          const q = query(
            collection(db, 'match-logs'), // Query the correct collection
            where('userId', '==', user.uid),
          );
          const querySnapshot = await getDocs(q);
          const fetchedMatches = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Match[];
          setMatches(fetchedMatches);
        } catch (error) {
          console.error('Error fetching matches: ', error);
        }
        setIsLoadingMatches(false);
      };
      fetchMatches();
    } else if (!loading) {
      // User is not logged in and auth is not loading
      setIsLoadingMatches(false);
    }
  }, [user, loading]); // Rerun when user or loading state changes

  // Mock data for display components
  const recentMatchesMock = [
    {
      homeTeam: 'Wigan Warriors',
      awayTeam: 'St Helens',
      homeScore: 24,
      awayScore: 18,
      date: '15 Oct 2024',
      venue: 'DW Stadium',
      attended: true,
    },
    {
      homeTeam: 'Leeds Rhinos',
      awayTeam: 'Hull FC',
      homeScore: 32,
      awayScore: 16,
      date: '08 Oct 2024',
      venue: 'Headingley Stadium',
      attended: true,
    },
  ];

  const teams = [
    { name: 'Wigan', visited: true },
    { name: 'St Helens', visited: true },
    { name: 'Leeds', visited: true },
    { name: 'Hull FC', visited: false },
  ];

  // Show a loading state while auth is resolving
  if (loading) {
    return <div>Loading user...</div>; // Or return your <Loading /> component
  }

  // If no user, you could redirect or show a login prompt
  if (!user) {
    return (
      <div>
        Please <Link href="/sign-in">sign in</Link> to see your dashboard.
      </div>
    );
  }

  // User is loaded
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

      {/* Recent Matches Section - Now uses real data */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-display-md text-text-primary uppercase tracking-wide">
            Recent Matches
          </h2>
          <Link href="/match-log" legacyBehavior>
            <ActionButton variant="accent" size="sm" icon="add">
              Log Match
            </ActionButton>
          </Link>
        </div>

        {/* Use the RecentMatchesTable component */}
        <RecentMatchesTable matches={matches} />
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
          <Link href="/teams" legacyBehavior>
            <ActionButton variant="ghost" size="sm">
              View All Teams
            </ActionButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
