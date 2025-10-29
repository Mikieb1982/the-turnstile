import React from 'react';
import { mockUserData, mockNextMatch } from '@/services/mockData';
import Image from 'next/image';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-4xl font-bold">{mockUserData.stats.matchesAttended}</p>
              <p className="text-gray-400">Matches Attended</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{mockUserData.stats.stadiumsVisited}</p>
              <p className="text-gray-400">Stadiums Visited</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{mockUserData.stats.badgesEarned}</p>
              <p className="text-gray-400">Badges Earned</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Next Match</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={mockNextMatch.homeLogo} alt={mockNextMatch.homeTeam} width={48} height={48} className="mr-4" />
              <span className="text-xl font-bold">{mockNextMatch.homeTeam}</span>
            </div>
            <span className="text-2xl font-bold mx-4">vs</span>
            <div className="flex items-center">
              <span className="text-xl font-bold">{mockNextMatch.awayTeam}</span>
              <Image src={mockNextMatch.awayLogo} alt={mockNextMatch.awayTeam} width={48} height={48} className="ml-4" />
            </div>
          </div>
          <div className="text-center mt-4 text-gray-400">
            {new Date(mockNextMatch.date).toLocaleString()} at {mockNextMatch.stadium}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
