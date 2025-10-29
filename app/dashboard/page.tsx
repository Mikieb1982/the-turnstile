import { BarChart, Clock, Trophy } from 'lucide-react';
import SuperLeagueNews from '../components/SuperLeagueNews';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-400 mb-8">Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lifetime Stats */}
          <div className="bg-gray-800 p-6 rounded-lg card-lifted">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Lifetime Stats</h2>
              <BarChart className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-lg">
              <p>Matches Attended: <span className="font-bold">0</span></p>
              <p>Unique Grounds Visited: <span className="font-bold">0</span></p>
              <p>Total Points Witnessed: <span className="font-bold">0</span></p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-lg card-lifted">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <Clock className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-gray-400">You haven&apos;t logged any matches yet.</p>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800 p-6 rounded-lg card-lifted">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Achievements</h2>
              <Trophy className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-gray-400">No achievements unlocked yet. Start logging matches to earn them!</p>
          </div>

          {/* Super League Hub */}
          <SuperLeagueNews />

        </div>
      </div>
    </div>
  );
}
