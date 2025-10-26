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
    </div>
  );
};
