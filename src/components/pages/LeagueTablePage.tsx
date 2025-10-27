<<<<<<< HEAD
import React, { useMemo } from 'react';
import { TEAMS } from '@/services/mockData';
import { TeamLogo } from '@/components/Icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trophy, ArrowDown } from 'lucide-react';

interface TeamStanding {
  id: string;
  name: string;
  logo: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export const LeagueTablePage: React.FC = () => {
  const standings: TeamStanding[] = useMemo(() => {
    // In a real app, this data would be fetched from an API
    return TEAMS.map((team, index) => ({
      ...team,
      played: 25,
      wins: 15 + (index % 5),
      draws: 5 - (index % 5),
      losses: 5 + (index % 3),
      points: (15 + (index % 5)) * 2 + (5 - (index % 5)),
      form: ['W', 'L', 'W', 'D', 'W'].sort(() => 0.5 - Math.random()) as ('W' | 'D' | 'L')[],
    })).sort((a, b) => b.points - a.points);
  }, []);

  const topTeam = standings[0];
  const bottomTeam = standings[standings.length - 1];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Super League Standings</h1>
        <p className="mt-3 text-xl text-muted-foreground">The official table for the 2024 Betfred Super League season.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-green-500/50 bg-green-500/5">
          <CardHeader className="flex-row items-center space-x-4">
              <Trophy className="h-10 w-10 text-green-500" />
              <div>
                 <CardTitle>Top of the League</CardTitle>
                <CardDescription>Currently leading the charge for the League Leaders&apos; Shield.</CardDescription>
              </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TeamLogo logo={topTeam.logo} alt={topTeam.name} size={40} />
              <span className="font-bold text-lg">{topTeam.name}</span>
            </div>
            <div className="text-right">
                <p className="font-extrabold text-2xl">{topTeam.points} pts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500/50 bg-red-500/5">
        <CardHeader className="flex-row items-center space-x-4">
              <ArrowDown className="h-10 w-10 text-red-500" />
              <div>
                <CardTitle>Relegation Battle</CardTitle>
                <CardDescription>Fighting to maintain their Super League status.</CardDescription>
              </div>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <TeamLogo logo={bottomTeam.logo} alt={bottomTeam.name} size={40} />
              <span className="font-bold text-lg">{bottomTeam.name}</span>
            </div>
            <div className="text-right">
                <p className="font-extrabold text-2xl">{bottomTeam.points} pts</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">Pos</TableHead>
                <TableHead>Club</TableHead>
                <TableHead className="text-center">Pl</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center font-bold">Pts</TableHead>
                <TableHead className="w-[150px]">Form</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team, index) => (
                <TableRow key={team.id} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                  <TableCell className="text-center font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <TeamLogo logo={team.logo} alt={team.name} size={24} />
                      <span>{team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.wins}</TableCell>
                  <TableCell className="text-center">{team.draws}</TableCell>
                  <TableCell className="text-center">{team.losses}</TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {team.form.map((result, i) => (
                        <span
                          key={i}
                          className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${{
                            W: 'bg-green-500 text-white',
                            D: 'bg-gray-400 text-white',
                            L: 'bg-red-500 text-white',
                          }[result]}`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
=======
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
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    </div>
  );
};
