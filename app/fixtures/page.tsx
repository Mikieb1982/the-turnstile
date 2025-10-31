import React from 'react';
import { mockFixtures } from '@/services/mockData';
import Image from 'next/image';

const FixturesPage = () => {
  // Group fixtures by round
  const fixturesByRound = mockFixtures.reduce((acc, fixture) => {
    const round = `Round ${fixture.round}`;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(fixture);
    return acc;
  }, {} as Record<string, typeof mockFixtures>);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-white">Fixtures</h1>
      <div className="space-y-12">
        {Object.entries(fixturesByRound).map(([round, fixtures]) => (
          <div key={round}>
            <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">{round}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fixtures.map((fixture) => (
                <div key={fixture.id} className="bg-gray-800 rounded-xl shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-cyan-500/50" style={{boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 20px 5px rgba(59, 130, 246, 0.2)'}}>
                  <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
                    <span className="text-sm font-semibold text-gray-400">{new Date(fixture.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center justify-around mb-4">
                    <div className="flex flex-col items-center">
                      <Image src={fixture.homeLogo} alt={fixture.homeTeam} width={64} height={64} className="mb-2" />
                      <span className="text-lg font-bold text-white">{fixture.homeTeam}</span>
                    </div>
                    <span className="text-4xl font-extrabold text-gray-400 mx-4">vs</span>
                    <div className="flex flex-col items-center">
                      <Image src={fixture.awayLogo} alt={fixture.awayTeam} width={64} height={64} className="mb-2" />
                      <span className="text-lg font-bold text-white">{fixture.awayTeam}</span>
                    </div>
                  </div>
                  <div className="text-center text-gray-500 text-sm mt-4">{fixture.venue}</div>
                  {fixture.note && <div className="text-center mt-2 text-xs text-yellow-400 bg-yellow-900/50 rounded-full px-3 py-1">{fixture.note}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixturesPage;
