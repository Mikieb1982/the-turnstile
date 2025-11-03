'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { BarChart, Trophy, Users, Star } from 'lucide-react';

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
        // Note: The query is looking for 'matches', but your firestore.rules
        // and match-log actions refer to 'match-logs'. You may need
        // to change this query to collection(db, 'match-logs')
        const q = query(collection(db, 'matches'), where('userId', '==', currentUser.uid));
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
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">You are not logged in.</h1>
        <p className="text-lg text-center mb-8">Please log in to view your dashboard.</p>
        <a href="/sign-in" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Login
        </a>
      </div>
    );
  }

  const totalMatches = matches.length;
  const achievements = 5; // Placeholder
  const favoriteTeam = 'City Sentinels'; // Placeholder

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Welcome, {user.displayName || 'Fan'}!</h1>
          <p className="text-gray-400 mt-2">Here's a summary of your fan journey.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
            <BarChart className="w-12 h-12 text-green-400 mr-6" />
            <div>
              <h3 className="text-3xl font-bold">{totalMatches}</h3>
              <p className="text-gray-400">Matches Attended</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
            <Trophy className="w-12 h-12 text-yellow-400 mr-6" />
            <div>
              <h3 className="text-3xl font-bold">{achievements}</h3>
              <p className="text-gray-400">Achievements Unlocked</p>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
            <Star className="w-12 h-12 text-blue-400 mr-6" />
            <div>
              <h3 className="text-xl font-bold">{favoriteTeam}</h3>
              <p className="text-gray-400">Favorite Team</p>
            </div>
          </div>
        </div>

        {/* Recent Matches */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Recent Matches</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4">Date</th>
                  <th className="p-4">Home Team</th>
                  <th className="p-4">Away Team</th>
                  <th className="p-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {matches.slice(0, 5).map(match => (
                  <tr key={match.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="p-4">{new Date(match.date).toLocaleDateString()}</td>
                    <td className="p-4 font-medium">{match.homeTeam}</td>
                    <td className="p-4 font-medium">{match.awayTeam}</td>
                    <td className="p-4">{match.homeScore} - {match.awayScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
