'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BarChart, Trophy, Star } from 'lucide-react';
import StatCard from '@/components/StatCard';
import RecentMatchesTable from '@/components/RecentMatchesTable';
import Link from 'next/link';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, 'match-logs'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userMatches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
        setMatches(userMatches);
      } else {
        setUser(null);
        setMatches([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-display text-4xl font-bold mb-4">You are not logged in.</h1>
        <p className="font-body text-lg text-center text-text-secondary mb-8">Please sign in to view your dashboard.</p>
        {/* FIX: Added legacyBehavior prop */}
        <Link href="/sign-in" legacyBehavior>
          <a className="bg-primary hover:bg-green-600 text-background font-bold py-3 px-6 rounded-lg transition-colors">
            Sign In
          </a>
        </Link>
      </div>
    );
  }

  const totalMatches = matches.length;
  const achievements = 5; // Placeholder
  const favoriteTeam = 'City Sentinels'; // Placeholder

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="font-display text-5xl font-bold text-text-primary">Welcome, {user.displayName || 'Fan'}!</h1>
        <p className="font-body text-text-secondary mt-2 text-xl">Here's a summary of your fan journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard Icon={BarChart} title="Matches Attended" value={totalMatches} colorClassName="text-primary" />
        <StatCard Icon={Trophy} title="Achievements Unlocked" value={achievements} colorClassName="text-accent" />
        <StatCard Icon={Star} title="Favorite Team" value={favoriteTeam} colorClassName="text-secondary" />
      </div>

      <RecentMatchesTable matches={matches} />
    </div>
  );
}
