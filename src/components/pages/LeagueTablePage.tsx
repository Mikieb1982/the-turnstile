import React from 'react';

interface TeamStanding {
  pos: number;
  team: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
}

interface LeagueTablePageProps {
  table: TeamStanding[];
}

export const LeagueTablePage: React.FC<LeagueTablePageProps> = ({ table }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">League Table</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
            <tr>
              <th scope="col" className="px-4 py-3">Pos</th>
              <th scope="col" className="px-6 py-3">Team</th>
              <th scope="col" className="px-2 py-3 text-center">P</th>
              <th scope="col" className="px-2 py-3 text-center">W</th>
              <th scope="col" className="px-2 py-3 text-center">L</th>
              <th scope="col" className="px-4 py-3 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.pos} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{row.pos}</td>
                <th scope="row" className="px-6 py-3 font-medium text-white whitespace-nowrap">
                  {row.team}
                </th>
                <td className="px-2 py-3 text-center">{row.played}</td>
                <td className="px-2 py-3 text-center text-green-400">{row.wins}</td>
                <td className="px-2 py-3 text-center text-red-400">{row.losses}</td>
                <td className="px-4 py-3 text-center font-bold text-cyan-400">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};