import React from 'react';
import { teamsData } from '@/services/stadiumData';
import Image from 'next/image';
import { TEAMS } from '@/services/mockData'; // Import TEAMS

const TeamsPage = () => {
  // Use the same logo function as the results page
  const getTeamLogo = (teamName: string) => {
    const team = Object.values(TEAMS).find(t => t.name === teamName || t.shortName === teamName || t.id === teamName);
    return team?.logoUrl || 'https://placehold.co/64x64/1a2c20/FFFFFF?text=??';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Super League Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamsData.map((team) => (
          <div key={team.name} className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 shadow-card-glow">
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={getTeamLogo(team.name)}
                alt={`${team.name} logo`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">{team.name}</h2>
            <p className="text-gray-400 mb-1"><span className="font-semibold">Established:</span> {team.established}</p>
            <p className="text-gray-400 mb-1"><span className="font-semibold">Titles:</span> {team.titles}</p>
            <p className="text-gray-400 mb-4"><span className="font-semibold">Location:</span> {team.location}</p>
            <div className="bg-gray-700 p-4 rounded-lg w-full">
              <h3 className="text-xl font-bold mb-2 text-white">Stadium</h3>
              <p className="text-gray-300"><span className="font-semibold">{team.stadium.name}</span></p>
              <p className="text-gray-400 text-sm">Capacity: {team.stadium.capacity}</p>
              <p className="text-gray-500 text-xs mt-2">{team.stadium.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
