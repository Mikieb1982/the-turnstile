// app/results/page.tsx
'use client';

import React, { useState } from 'react';
import { finalLeagueTable, selectedMatchResults, playoffResults, TEAMS } from '@/services/mockData';
import Image from 'next/image';
import Filters from '@/components/Filters';
import { ArrowUp, ArrowDown } from 'lucide-react'; 

// Define the keys we can sort the table by
// FIX: Changed 'P' to 'Pld' and 'Points' to 'Pts'
type SortableKeys = 'Position' | 'Team' | 'Pld' | 'W' | 'L' | 'D' | 'Pts';

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState('table');
  
  // State for sorting the league table
  const [sortConfig, setSortConfig] = useState<{ key: SortableKeys; direction: 'ascending' | 'descending' } | null>({
    key: 'Position',
    direction: 'ascending',
  });

  const getTeamLogo = (teamName: string) => {
    const team = Object.values(TEAMS).find(t => t.name === teamName || t.shortName === teamName || t.id === teamName);
    return team?.logoUrl || 'https://placehold.co/64x64/1a2c20/FFFFFF?text=??';
  };

  // --- NEW: Traditional Table Rendering ---
  const renderLeagueTable = () => {
    // Sorting logic for the table
    const sortedTeams = React.useMemo(() => {
      let sortableItems = [...finalLeagueTable];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          // Ensure keys exist on the objects before comparing
          // FIX: Use Pld and Pts for sorting
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [sortConfig]);

    // Function to handle click on column headers
    const requestSort = (key: SortableKeys) => {
      let direction: 'ascending' | 'descending' = 'ascending';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
      setSortConfig({ key, direction });
    };

    // Function to get the correct sort icon
    const getSortIcon = (key: SortableKeys) => {
      if (!sortConfig || sortConfig.key !== key) {
        return <ArrowDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />;
      }
      if (sortConfig.direction === 'ascending') {
        return <ArrowUp className="h-4 w-4" />;
      }
      return <ArrowDown className="h-4 w-4" />;
    };

    return (
      <div className="space-y-6">
        <Filters />
        {/* New Table Container */}
        <div className="bg-card rounded-2xl shadow-card-glow overflow-hidden">
          <table className="w-full min-w-full font-body">
            {/* Table Head */}
            <thead className="border-b border-surface">
              <tr className="font-display uppercase text-sm text-text-secondary">
                <th className="py-4 px-2 text-center group" onClick={() => requestSort('Position')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Pos {getSortIcon('Position')}
                  </div>
                </th>
                <th className="py-4 px-2 text-left group" onClick={() => requestSort('Team')}>
                  <div className="flex items-center gap-1 cursor-pointer">
                    Team {getSortIcon('Team')}
                  </div>
                </th>
                {/* FIX: Changed to 'Pld' */}
                <th className="py-4 px-2 text-center group" onClick={() => requestSort('Pld')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    P {getSortIcon('Pld')}
                  </div>
                </th>
                <th className="py-4 px-2 text-center group" onClick={() => requestSort('W')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    W {getSortIcon('W')}
                  </div>
                </th>
                <th className="py-4 px-2 text-center group" onClick={() => requestSort('L')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    L {getSortIcon('L')}
                  </div>
                </th>
                <th className="py-4 px-2 text-center group" onClick={() => requestSort('D')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    D {getSortIcon('D')}
                  </div>
                </th>
                {/* FIX: Changed to 'Pts' */}
                <th className="py-4 px-2 text-center text-primary group" onClick={() => requestSort('Pts')}>
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Pts {getSortIcon('Pts')}
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-surface">
              {sortedTeams.map((team) => (
                <tr
                  key={team.Position}
                  className={`text-text-primary ${
                    team.Team === 'Wigan Warriors' ? 'bg-primary/10' : 'hover:bg-surface' // Highlight example
                  }`}
                >
                  <td className="py-3 px-2 text-center font-bold">{team.Position}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <Image
                        src={getTeamLogo(team.Team)}
                        alt={`${team.Team} logo`}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="font-medium whitespace-nowrap">{team.Team}</span>
                    </div>
                  </td>
                  {/* FIX: Changed team.P to team.Pld */}
                  <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.Pld}</td>
                  <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.W}</td>
                  <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.L}</td>
                  <td className="py-3 px-2 text-center font-mono text-text-secondary">{team.D}</td>
                  {/* FIX: Changed team.Points to team.Pts */}
                  <td className="py-3 px-2 text-center font-mono font-bold text-primary">{team.Pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  // --- End of new table rendering ---

  // --- UPDATED: Match Results with Theme Colors ---
  const renderMatchResults = () => (
    <div className="space-y-6">
      {selectedMatchResults.map((result, index) => (
        <div key={index} className="bg-card rounded-2xl shadow-card-glow p-6 transform transition duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-primary">Round {result.Round}</span>
            <span className="text-sm text-text-secondary">{result.Date}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={getTeamLogo(result.HomeTeam)} alt={result.HomeTeam} width={48} height={48} className="mr-4 rounded-full" />
              <span className="text-xl font-bold text-text-primary">{result.HomeTeam}</span>
            </div>
            <span className="text-2xl font-bold mx-4 p-2 bg-surface rounded-md">{result.Score}</span>
            <div className="flex items-center">
              <span className="text-xl font-bold text-text-primary">{result.AwayTeam}</span>
              <Image src={getTeamLogo(result.AwayTeam)} alt={result.AwayTeam} width={48} height={48} className="ml-4 rounded-full" />
            </div>
          </div>
          <div className="text-center mt-4 text-text-secondary">{result.Venue}</div>
          {result.Note && <div className="text-center mt-2 text-sm text-accent">{result.Note}</div>}
        </div>
      ))}
    </div>
  );

  // --- UPDATED: Playoff Results with Theme Colors ---
  const renderPlayoffResults = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Eliminators</h2>
        {playoffResults.Eliminators.map((match, index) => (
          <div key={index} className="bg-card rounded-2xl shadow-card-glow p-6 mb-4 transform transition duration-300 hover:scale-[1.02]">
            <p className="text-center font-bold text-lg mb-2 text-text-primary">{match.Match}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${match.Winner === match.HomeTeam.split(' (')[0] ? 'text-primary' : 'text-text-primary'}`}>{match.HomeTeam}</span>
              <span className="text-2xl font-bold p-2 bg-surface rounded-md">{match.Score}</span>
              <span className={`text-xl font-bold ${match.Winner === match.AwayTeam.split(' (')[0] ? 'text-primary' : 'text-text-primary'}`}>{match.AwayTeam}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Semi-Finals</h2>
        {playoffResults.SemiFinals.map((match, index) => (
          <div key={index} className="bg-card rounded-2xl shadow-card-glow p-6 mb-4 transform transition duration-300 hover:scale-[1.02]">
            <p className="text-center font-bold text-lg mb-2 text-text-primary">{match.Match}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${match.Winner === match.HomeTeam.split(' (')[0] ? 'text-primary' : 'text-text-primary'}`}>{match.HomeTeam}</span>
              <span className="text-2xl font-bold p-2 bg-surface rounded-md">{match.Score}</span>
              <span className={`text-xl font-bold ${match.Winner === match.AwayTeam.split(' (')[0] ? 'text-primary' : 'text-text-primary'}`}>{match.AwayTeam}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Grand Final</h2>
        <div className="bg-card rounded-2xl shadow-card-glow p-6 transform transition duration-300 hover:scale-[1.02]">
          <p className="text-center font-bold text-lg mb-2 text-text-secondary">{playoffResults.GrandFinal.Date} - {playoffResults.GrandFinal.Venue}</p>
          <div className="flex items-center justify-around">
            <span className={`text-xl font-bold ${playoffResults.GrandFinal.Champion === playoffResults.GrandFinal.HomeTeam ? 'text-accent' : 'text-text-primary'}`}>{playoffResults.GrandFinal.HomeTeam}</span>
            <span className="text-2xl font-bold p-2 bg-surface rounded-md">{playoffResults.GrandFinal.Score}</span>
            <span className={`text-xl font-bold ${playoffResults.GrandFinal.Champion === playoffResults.GrandFinal.AwayTeam ? 'text-accent' : 'text-text-primary'}`}>{playoffResults.GrandFinal.AwayTeam}</span>
          </div>
          <p className="text-center mt-4 text-lg text-text-primary">Champion: <span className="font-bold text-accent">{playoffResults.GrandFinal.Champion}</span></p>
        </div>
      </div>
    </div>
  );

  return (
    // --- UPDATED: Main Page with Theme Colors ---
    <div className="container mx-auto px-4 py-8">
      {/* The main page title is handled by Header.tsx, so this "Results" h1 is likely redundant */}
      {/* <h1 className="text-5xl font-extrabold mb-8 text-center text-text-primary">Results</h1> */}
      
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 rounded-lg bg-surface p-2">
          <button onClick={() => setActiveTab('table')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'table' ? 'bg-primary text-background' : 'text-text-secondary hover:bg-card'}`}>League Table</button>
          <button onClick={() => setActiveTab('matches')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'matches' ? 'bg-primary text-background' : 'text-text-secondary hover:bg-card'}`}>Match Results</button>
          <button onClick={() => setActiveTab('playoffs')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'playoffs' ? 'bg-primary text-background' : 'text-text-secondary hover:bg-card'}`}>Playoffs</button>
        </div>
      </div>
      <div>
        {activeTab === 'table' && renderLeagueTable()}
        {activeTab === 'matches' && renderMatchResults()}
        {activeTab === 'playoffs' && renderPlayoffResults()}
      </div>
    </div>
  );
};

export default ResultsPage;
