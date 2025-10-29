import React from 'react';
import { mockFixtures } from '@/services/mockData';
import Image from 'next/image';

const FixturesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Fixtures</h1>
      <div className="space-y-8">
        {mockFixtures.map((fixture) => (
          <div key={fixture.id} className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-400">Round {fixture.round}</span>
              <span className="text-sm text-gray-400">{new Date(fixture.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image src={fixture.homeLogo} alt={fixture.homeTeam} width={48} height={48} className="mr-4" />
                <span className="text-xl font-bold">{fixture.homeTeam}</span>
              </div>
              <span className="text-2xl font-bold mx-4">{fixture.score}</span>
              <div className="flex items-center">
                <span className="text-xl font-bold">{fixture.awayTeam}</span>
                <Image src={fixture.awayLogo} alt={fixture.awayTeam} width={48} height={48} className="ml-4" />
              </div>
            </div>
            <div className="text-center mt-4 text-gray-400">{fixture.venue}</div>
            {fixture.note && <div className="text-center mt-2 text-sm text-yellow-500">{fixture.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixturesPage;
