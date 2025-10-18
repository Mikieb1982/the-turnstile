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

const renderBadge = (text: string, tone: 'success' | 'info' | 'alert') => {
  const toneClasses = {
    success: 'bg-primary/10 text-primary',
    info: 'bg-secondary/70 text-foreground',
    alert: 'bg-accent/20 text-accent-foreground',
  } as const;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${toneClasses[tone]}`}>
      <span aria-hidden="true">{tone === 'success' ? '🏆' : tone === 'alert' ? '⚠️' : '🎯'}</span>
      <span>{text}</span>
    </span>
  );
};

export const LeagueTablePage: React.FC<LeagueTablePageProps> = ({ table }) => {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-primary/10 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Season summary</h2>
          <dl className="mt-4 grid gap-3 text-sm text-foreground/80">
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Season</dt>
              <dd>{superLeague2025Summary.Season}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Champions</dt>
              <dd>{superLeague2025Summary.Champion}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Runners-up</dt>
              <dd>{superLeague2025Summary.RunnersUp}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">League Leaders' Shield</dt>
              <dd>{superLeague2025Summary.LeagueLeadersShield}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Grand Final</dt>
              <dd>{superLeague2025Summary.GrandFinalScore}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-primary/10 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">Individual honours</h2>
          <dl className="mt-4 grid gap-3 text-sm text-foreground/80">
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Man of Steel</dt>
              <dd>{individualAwards.ManOfSteel}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Top try scorer</dt>
              <dd>{individualAwards.TopTryScorer}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Top points scorer</dt>
              <dd>{individualAwards.TopPointsScorer}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="font-medium text-foreground">Young player</dt>
              <dd>{individualAwards.YoungPlayerOfTheYear}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-lg font-semibold text-foreground">Final league table</h2>
          <p className="text-sm text-foreground/70">Wins, draws and losses now include simple icons and colour to improve accessibility.</p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-primary/10">
          <table className="min-w-full border-collapse text-left text-sm text-foreground/80">
            <thead className="bg-secondary/60 text-xs font-semibold uppercase tracking-wide text-foreground">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">Pos</th>
                <th scope="col" className="px-4 py-3 text-left">Team</th>
                <th scope="col" className="px-3 py-3 text-center">P</th>
                <th scope="col" className="px-3 py-3 text-center">W</th>
                <th scope="col" className="px-3 py-3 text-center">D</th>
                <th scope="col" className="px-3 py-3 text-center">L</th>
                <th scope="col" className="px-3 py-3 text-center">PF</th>
                <th scope="col" className="px-3 py-3 text-center">PA</th>
                <th scope="col" className="px-3 py-3 text-center">PD</th>
                <th scope="col" className="px-3 py-3 text-center">Pts</th>
                <th scope="col" className="px-4 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, index) => {
                const rowTone = index % 2 === 0 ? 'bg-card' : 'bg-secondary/40';

                return (
                  <tr
                    key={row.teamId}
                    className={`${rowTone} transition-colors hover:bg-secondary/70`}
                  >
                    <td className="px-4 py-4 text-base font-semibold text-foreground">{row.position}</td>
                    <th scope="row" className="px-4 py-4 text-sm font-semibold text-foreground">
                      {row.teamName}
                    </th>
                    <td className="px-3 py-4 text-center text-foreground/70">{row.played}</td>
                    <td className="px-3 py-4 text-center text-emerald-600">
                      <span className="sr-only">Wins </span>
                      <span aria-hidden="true" className="mr-1">▲</span>
                      <span>{row.won}</span>
                    </td>
                    <td className="px-3 py-4 text-center text-slate-600">
                      <span className="sr-only">Draws </span>
                      <span aria-hidden="true" className="mr-1">–</span>
                      <span>{row.drawn}</span>
                    </td>
                    <td className="px-3 py-4 text-center text-rose-600">
                      <span className="sr-only">Losses </span>
                      <span aria-hidden="true" className="mr-1">▼</span>
                      <span>{row.lost}</span>
                    </td>
                    <td className="px-3 py-4 text-center text-foreground/70">{row.pointsFor}</td>
                    <td className="px-3 py-4 text-center text-foreground/70">{row.pointsAgainst}</td>
                    <td className="px-3 py-4 text-center text-primary font-semibold">{row.pointsDifference}</td>
                    <td className="px-3 py-4 text-center text-base font-semibold text-foreground">{row.points}</td>
                    <td className="px-4 py-4 space-x-2">
                      {row.qualification && renderBadge(row.qualification, row.qualification.includes('Semi') ? 'success' : 'info')}
                      {row.relegation && renderBadge(row.relegation, 'alert')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-primary/10 sm:p-8">
        <h2 className="text-lg font-semibold text-foreground">Play-off results</h2>
        <p className="mt-2 text-sm text-foreground/70">Recap the road to Old Trafford with clear, legible scorecards.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary">Eliminators</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              {playoffResults.Eliminators.map((match) => (
                <li key={match.Match} className="rounded-xl bg-secondary/60 p-4">
                  <p className="font-semibold text-foreground">{match.Match}</p>
                  <p className="text-sm text-foreground/70">{match.HomeTeam} vs {match.AwayTeam}</p>
                  <p className="text-base font-semibold text-primary">{match.Score}</p>
                  <p className="text-sm text-emerald-700">Winner: {match.Winner}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary">Semi-finals</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              {playoffResults.SemiFinals.map((match) => (
                <li key={match.Match} className="rounded-xl bg-secondary/60 p-4">
                  <p className="font-semibold text-foreground">{match.Match}</p>
                  <p className="text-sm text-foreground/70">{match.HomeTeam} vs {match.AwayTeam}</p>
                  <p className="text-base font-semibold text-primary">{match.Score}</p>
                  <p className="text-sm text-emerald-700">Winner: {match.Winner}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary">Grand Final</h3>
            <div className="rounded-xl bg-secondary/60 p-4 text-sm text-foreground/80">
              <p className="font-semibold text-foreground">{playoffResults.GrandFinal.Date}</p>
              <p className="text-foreground/70">{playoffResults.GrandFinal.HomeTeam} vs {playoffResults.GrandFinal.AwayTeam}</p>
              <p className="text-base font-semibold text-primary">{playoffResults.GrandFinal.Score}</p>
              <p className="text-sm text-emerald-700">Champion: {playoffResults.GrandFinal.Champion}</p>
              <p className="text-sm text-foreground/60">{playoffResults.GrandFinal.Venue}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
