// app/dashboard/page.tsx
'use client';

import WelcomeCard from '@/components/WelcomeCard';
import StatsDashboard from '@/components/StatsDashboard';
import MatchCard from '@/components/MatchCard';
import SeasonProgress from '@/components/SeasonProgress';
import ActionButton from '@/components/ActionButton';
import TeamBadge from '@/components/TeamBadge';
import RecentMatchesTable from '@/components/RecentMatchesTable';
import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
// No longer importing Match from '@/types' to avoid conflict

// Define the shape of the data expected by RecentMatchesTable
interface LoggedMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [matches, setMatches] = useState<LoggedMatch[]>([]); // Use the correct local type
  const [isLoadingMatches, setIsLoadingMatches] = useState(true);

  // Mock data for stats (replace with real data later)
  const userData = {
    name: user?.displayName || 'Fan',
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
            collection(db, 'match-logs'),
            where('userId', '==', user.uid),
            orderBy('date', 'desc'), // Order by date
          );
          const querySnapshot = await getDocs(q);

          // Transform Firestore data to match what RecentMatchesTable expects
          const fetchedMatches: LoggedMatch[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const [homeScoreStr, awayScoreStr] = (data.score || '0-0').split(
              '-',
            );
            return {
              id: doc.id,
              homeTeam: data.homeTeam,
              awayTeam: data.awayTeam,
              date: data.date, // This is already a string
              homeScore: parseInt(homeScoreStr, 10) || 0,
              awayScore: parseInt(awayScoreStr, 10) || 0,
            };
          });

          setMatches(fetchedMatches);
        } catch (error) {
          console.error('Error fetching matches: ', error);
        }
        setIsLoadingMatches(false);
      };
      fetchMatches();
    } else if (!loading) {
      setIsLoadingMatches(false);
    }
  }, [user, loading]);

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

  if (loading) {
    return <div>Loading user...</div>; // You can replace this with your main Loading component
  }

  if (!user) {
    return (
      <div className="text-center">
        <p>
          Please <Link href="/sign-in">sign in</Link> to see your dashboard.
        </p>
      </div>
    );
  }

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
