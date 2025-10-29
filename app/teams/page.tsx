import React from 'react';
import { teams } from '@/services/mockData';
import Image from 'next/image';

const TeamsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teams.map((team) => (
          <div key={team.id} className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <Image
              src={team.logoUrl || ''}
              alt={`${team.name} logo`}
              width={96}
              height={96}
              className="mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{team.name}</h2>
            <p className="text-gray-400">{team.shortName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
