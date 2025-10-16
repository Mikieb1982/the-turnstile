// src/components/pages/LeagueTablePage.tsx

import React from 'react';
import { TableRow } from '../../../services/mockData';

interface LeagueTablePageProps {
  table: TableRow[];
}

export const LeagueTablePage: React.FC<LeagueTablePageProps> = ({ table }) => {
  return (
    <div className="space-y-4">
      <h2 className="section-title text-sm">League Table</h2>
      <div className="rugby-card overflow-hidden">
        <table className="min-w-full border-collapse text-left text-sm text-[#d9e0d6]">
          <thead className="bg-gradient-to-r from-[#142319] via-[#1a2c20] to-[#142319] text-[0.65rem] uppercase tracking-[0.35em] text-[#9fb09c]">
            <tr>
              <th scope="col" className="px-6 py-4">Pos</th>
              <th scope="col" className="px-6 py-4">Team</th>
              <th scope="col" className="px-4 py-4 text-center">P</th>
              <th scope="col" className="px-4 py-4 text-center">W</th>
              <th scope="col" className="px-4 py-4 text-center">L</th>
              <th scope="col" className="px-4 py-4 text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => {
              const isContender = index < 4;
              const rowTone = isContender
                ? 'bg-[#1a2c20]/80'
                : index % 2 === 0
                ? 'bg-[#0d150f]/80'
                : 'bg-[#101a12]/75';

              return (
                <tr
                  key={row.teamId}
                  className={`${rowTone} border-t border-[#243926]/60 transition-colors duration-200 hover:bg-[#253c2b]/85`}
                >
                  <td className="px-6 py-4 text-base font-semibold tracking-[0.2em] text-[#f6f3e4]">{index + 1}</td>
                  <th scope="row" className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#dce3d8]">
                    {row.teamId}
                  </th>
                  <td className="px-4 py-4 text-center text-[#b3c0b4]">{row.played}</td>
                  <td className="px-4 py-4 text-center text-[#74dd9b]">{row.won}</td>
                  <td className="px-4 py-4 text-center text-[#f47272]">{row.lost}</td>
                  <td className="px-4 py-4 text-center text-lg font-bold tracking-[0.2em] text-[#d4af37]">{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
