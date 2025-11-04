'use client';

import React, { useState } from 'react';
import { finalLeagueTable, selectedMatchResults, playoffResults, TEAMS } from '@/services/mockData';
import Image from 'next/image';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import Card from '@/components/Card';

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState('table');

  const getTeamLogo = (teamName: string) => {
    const team = Object.values(TEAMS).find(t => t.name === teamName || t.shortName === teamName || t.id === teamName);
    return team?.logoUrl || 'https://placehold.co/64x64/1a2c20/FFFFFF?text=??';
  };

  const renderLeagueTable = () => (
    <div className="space-y-6">
      <Header />
      <Filters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalLeagueTable.map((row) => (
          <Card key={row.Position} team={row} getTeamLogo={getTeamLogo} />
        ))}
      </div>
    </div>
  );

  const renderMatchResults = () => (
    <div className="space-y-6">
      {selectedMatchResults.map((result, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-lg text-cyan-400">Round {result.Round}</span>
            <span className="text-sm text-gray-400">{result.Date}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={getTeamLogo(result.HomeTeam)} alt={result.HomeTeam} width={48} height={48} className="mr-4 rounded-full" />
              <span className="text-xl font-bold">{result.HomeTeam}</span>
            </div>
            <span className="text-2xl font-bold mx-4 p-2 bg-gray-700 rounded-md">{result.Score}</span>
            <div className="flex items-center">
              <span className="text-xl font-bold">{result.AwayTeam}</span>
              <Image src={getTeamLogo(result.AwayTeam)} alt={result.AwayTeam} width={48} height={48} className="ml-4 rounded-full" />
            </div>
          </div>
          <div className="text-center mt-4 text-gray-400">{result.Venue}</div>
          {result.Note && <div className="text-center mt-2 text-sm text-yellow-400">{result.Note}</div>}
        </div>
      ))}
    </div>
  );

  const renderPlayoffResults = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">Eliminators</h2>
        {playoffResults.Eliminators.map((match, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50">
                <p className="text-center font-bold text-lg mb-2">{match.Match}</p>
                <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${match.Winner === match.HomeTeam.split(' (')[0] ? 'text-green-400' : ''}`}>{match.HomeTeam}</span>
                    <span className="text-2xl font-bold p-2 bg-gray-700 rounded-md">{match.Score}</span>
                    <span className={`text-xl font-bold ${match.Winner === match.AwayTeam.split(' (')[0] ? 'text-green-400' : ''}`}>{match.AwayTeam}</span>
                </div>
            </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">Semi-Finals</h2>
        {playoffResults.SemiFinals.map((match, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50">
                <p className="text-center font-bold text-lg mb-2">{match.Match}</p>
                <div className="flex items-center justify-between">
                    <span className={`text-xl font-bold ${match.Winner === match.HomeTeam.split(' (')[0] ? 'text-green-400' : ''}`}>{match.HomeTeam}</span>
                    <span className="text-2xl font-bold p-2 bg-gray-700 rounded-md">{match.Score}</span>
                    <span className={`text-xl font-bold ${match.Winner === match.AwayTeam.split(' (')[0] ? 'text-green-400' : ''}`}>{match.AwayTeam}</span>
                </div>
            </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">Grand Final</h2>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50">
            <p className="text-center font-bold text-lg mb-2">{playoffResults.GrandFinal.Date} - {playoffResults.GrandFinal.Venue}</p>
            <div className="flex items-center justify-around">
                <span className={`text-xl font-bold ${playoffResults.GrandFinal.Champion === playoffResults.GrandFinal.HomeTeam ? 'text-yellow-400' : ''}`}>{playoffResults.GrandFinal.HomeTeam}</span>
                <span className="text-2xl font-bold p-2 bg-gray-700 rounded-md">{playoffResults.GrandFinal.Score}</span>
                <span className={`text-xl font-bold ${playoffResults.GrandFinal.Champion === playoffResults.GrandFinal.AwayTeam ? 'text-yellow-400' : ''}`}>{playoffResults.GrandFinal.AwayTeam}</span>
            </div>
            <p className="text-center mt-4 text-lg">Champion: <span className="font-bold text-yellow-400">{playoffResults.GrandFinal.Champion}</span></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-white">Results</h1>
      <div className="flex justify-center mb-8">
        <div className="flex space-x-4 rounded-lg bg-gray-800 p-2">
          <button onClick={() => setActiveTab('table')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'table' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>League Table</button>
          <button onClick={() => setActiveTab('matches')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'matches' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Match Results</button>
          <button onClick={() => setActiveTab('playoffs')} className={`px-4 py-2 text-lg font-semibold rounded-md ${activeTab === 'playoffs' ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Playoffs</button>
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
