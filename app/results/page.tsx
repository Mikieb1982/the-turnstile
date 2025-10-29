import React from 'react';
import { finalLeagueTable } from '@/services/mockData';

const ResultsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">League Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4 font-bold">Pos</th>
              <th className="p-4 font-bold">Team</th>
              <th className="p-4 font-bold">Pld</th>
              <th className="p-4 font-bold">W</th>
              <th className="p-4 font-bold">D</th>
              <th className="p-4 font-bold">L</th>
              <th className="p-4 font-bold">PF</th>
              <th className="p-4 font-bold">PA</th>
              <th className="p-4 font-bold">PD</th>
              <th className="p-4 font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {finalLeagueTable.map((row) => (
              <tr key={row.Position} className="border-b border-gray-700">
                <td className="p-4">{row.Position}</td>
                <td className="p-4">{row.Team}</td>
                <td className="p-4">{row.Pld}</td>
                <td className="p-4">{row.W}</td>
                <td className="p-4">{row.D}</td>
                <td className="p-4">{row.L}</td>
                <td className="p-4">{row.PF}</td>
                <td className="p-4">{row.PA}</td>
                <td className="p-4">{row.PD}</td>
                <td className="p-4 font-bold">{row.Pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;
