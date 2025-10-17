// src/components/pages/LeagueTablePage.tsx

import React from 'react';
import {
  TableRow,
  superLeague2025Summary,
  individualAwards,
  playoffResults,
} from '../../../services/mockData';

interface LeagueTablePageProps {
  table: TableRow[];
}

export const LeagueTablePage: React.FC<LeagueTablePageProps> = ({ table }) => {
  return (
    <div className="space-y-8">
      <section className="rugby-card grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-[#9fb09c]">Season Summary</h2>
          <ul className="space-y-2 text-sm text-[#d9e0d6]">
            <li><span className="font-semibold text-[#f6f3e4]">Season:</span> {superLeague2025Summary.Season}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Champions:</span> {superLeague2025Summary.Champion}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Runners-up:</span> {superLeague2025Summary.RunnersUp}</li>
            <li><span className="font-semibold text-[#f6f3e4]">League Leaders' Shield:</span> {superLeague2025Summary.LeagueLeadersShield}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Grand Final:</span> {superLeague2025Summary.GrandFinalScore}</li>
          </ul>
        </div>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-[#9fb09c]">Individual Honours</h2>
          <ul className="space-y-2 text-sm text-[#d9e0d6]">
            <li><span className="font-semibold text-[#f6f3e4]">Man of Steel:</span> {individualAwards.ManOfSteel}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Top Try Scorer:</span> {individualAwards.TopTryScorer}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Top Points Scorer:</span> {individualAwards.TopPointsScorer}</li>
            <li><span className="font-semibold text-[#f6f3e4]">Young Player:</span> {individualAwards.YoungPlayerOfTheYear}</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title text-sm">Final League Table</h2>
        <div className="rugby-card overflow-hidden">
          <table className="min-w-full border-collapse text-left text-sm text-[#d9e0d6]">
            <thead className="bg-gradient-to-r from-[#142319] via-[#1a2c20] to-[#142319] text-[0.65rem] uppercase tracking-[0.32em] text-[#9fb09c]">
              <tr>
                <th scope="col" className="px-4 py-4">Pos</th>
                <th scope="col" className="px-4 py-4">Team</th>
                <th scope="col" className="px-4 py-4 text-center">P</th>
                <th scope="col" className="px-4 py-4 text-center">W</th>
                <th scope="col" className="px-4 py-4 text-center">D</th>
                <th scope="col" className="px-4 py-4 text-center">L</th>
                <th scope="col" className="px-4 py-4 text-center">PF</th>
                <th scope="col" className="px-4 py-4 text-center">PA</th>
                <th scope="col" className="px-4 py-4 text-center">PD</th>
                <th scope="col" className="px-4 py-4 text-center">Pts</th>
                <th scope="col" className="px-4 py-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row) => {
                const isPlayoffPosition = row.qualification?.includes('Semi-finals');
                const isEliminator = row.qualification?.includes('Eliminators');
                const rowTone =
                  row.position % 2 === 0 ? 'bg-[#0d150f]/80' : 'bg-[#101a12]/75';

                return (
                  <tr
                    key={row.teamId}
                    className={`${rowTone} border-t border-[#243926]/60 transition-colors duration-200 hover:bg-[#253c2b]/85`}
                  >
                    <td className="px-4 py-4 text-base font-semibold tracking-[0.2em] text-[#f6f3e4]">{row.position}</td>
                    <th scope="row" className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#dce3d8]">
                      {row.teamName}
                    </th>
                    <td className="px-4 py-4 text-center text-[#b3c0b4]">{row.played}</td>
                    <td className="px-4 py-4 text-center text-[#74dd9b]">{row.won}</td>
                    <td className="px-4 py-4 text-center text-[#e7d37f]">{row.drawn}</td>
                    <td className="px-4 py-4 text-center text-[#f47272]">{row.lost}</td>
                    <td className="px-4 py-4 text-center text-[#b3c0b4]">{row.pointsFor}</td>
                    <td className="px-4 py-4 text-center text-[#b3c0b4]">{row.pointsAgainst}</td>
                    <td className="px-4 py-4 text-center font-semibold tracking-[0.12em] text-[#d4af37]">{row.pointsDifference}</td>
                    <td className="px-4 py-4 text-center text-lg font-bold tracking-[0.18em] text-[#f6f3e4]">{row.points}</td>
                    <td className="px-4 py-4">
                      {row.qualification && (
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] ${
                          isPlayoffPosition
                            ? 'bg-[#1f3a27] text-[#74dd9b]'
                            : isEliminator
                            ? 'bg-[#2d2c1a] text-[#e7d37f]'
                            : 'bg-[#1a2220] text-[#9fb09c]'
                        }`}>
                          {row.qualification}
                        </span>
                      )}
                      {row.relegation && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-[#3a1f1f] px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-[#f47272]">
                          {row.relegation}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rugby-card space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-[#9fb09c]">Play-off Results</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Eliminators</h3>
            <ul className="space-y-2 text-xs text-[#d9e0d6]">
              {playoffResults.Eliminators.map(match => (
                <li key={match.Match} className="rounded-md bg-[#111a13]/80 p-3">
                  <p className="font-semibold uppercase tracking-[0.2em] text-[#f6f3e4]">{match.Match}</p>
                  <p>{match.HomeTeam} vs {match.AwayTeam}</p>
                  <p className="text-[#d4af37]">{match.Score}</p>
                  <p className="text-[#74dd9b]">Winner: {match.Winner}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Semi-finals</h3>
            <ul className="space-y-2 text-xs text-[#d9e0d6]">
              {playoffResults.SemiFinals.map(match => (
                <li key={match.Match} className="rounded-md bg-[#111a13]/80 p-3">
                  <p className="font-semibold uppercase tracking-[0.2em] text-[#f6f3e4]">{match.Match}</p>
                  <p>{match.HomeTeam} vs {match.AwayTeam}</p>
                  <p className="text-[#d4af37]">{match.Score}</p>
                  <p className="text-[#74dd9b]">Winner: {match.Winner}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Grand Final</h3>
            <div className="rounded-md bg-[#111a13]/80 p-3 text-xs text-[#d9e0d6]">
              <p className="font-semibold uppercase tracking-[0.2em] text-[#f6f3e4]">{playoffResults.GrandFinal.Date}</p>
              <p>{playoffResults.GrandFinal.HomeTeam} vs {playoffResults.GrandFinal.AwayTeam}</p>
              <p className="text-[#d4af37]">{playoffResults.GrandFinal.Score}</p>
              <p className="text-[#74dd9b]">Champion: {playoffResults.GrandFinal.Champion}</p>
              <p className="text-[#9fb09c]">{playoffResults.GrandFinal.Venue}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
