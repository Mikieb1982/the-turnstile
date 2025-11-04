import React from 'react';
import Link from 'next/link';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
}

interface RecentMatchesTableProps {
  matches: Match[];
}

const RecentMatchesTable: React.FC<RecentMatchesTableProps> = ({ matches }) => {
  return (
    <div className="bg-card-dark p-6 rounded-lg shadow-card-glow">
      <h2 className="font-display text-3xl font-bold mb-6 text-white">Recent Matches</h2>
      {matches.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-surface-dark">
                <th className="p-4 font-body text-gray-400">Date</th>
                <th className="p-4 font-body text-gray-400">Home Team</th>
                <th className="p-4 font-body text-gray-400">Away Team</th>
                <th className="p-4 font-body text-gray-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {matches.slice(0, 5).map((match) => (
                <tr key={match.id} className="border-b border-surface-dark hover:bg-surface-dark/50">
                  <td className="p-4 font-body text-white">{new Date(match.date).toLocaleDateString()}</td>
                  <td className="p-4 font-body font-medium text-white">{match.homeTeam}</td>
                  <td className="p-4 font-body font-medium text-white">{match.awayTeam}</td>
                  <td className="p-4 font-body text-white">{match.homeScore} - {match.awayScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <p className="mb-4 font-body">You haven't logged any matches yet.</p>
          <Link href="/match-log">
            <a className="bg-primary hover:bg-green-600 text-background-dark font-bold py-2 px-4 rounded-lg transition-colors">
              Log Your First Match
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentMatchesTable;
