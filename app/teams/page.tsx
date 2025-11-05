import React from 'react';
import Image from 'next/image';
import { TEAMS } from '@/services/mockData'; // Still used for placeholder logos
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import { TeamInfo } from '@/types'; // Ensure this type matches your Firestore structure

// Fetch data from Firestore
async function getTeams() {
  try {
    const teamsCollection = collection(db, 'teams');
    const q = query(teamsCollection, orderBy('name', 'asc'));
    const querySnapshot = await getDocs(q);
    const teams = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (TeamInfo & { id: string })[];
    return teams;
  } catch (error) {
    console.error("Error fetching teams: ", error);
    return [];
  }
}

const TeamsPage = async () => {
  const teamsData = await getTeams();

  // Use the same logo function as the results page
  const getTeamLogo = (teamName: string) => {
    const team = Object.values(TEAMS).find(t => t.name === teamName || t.shortName === teamName);
    // Fallback logic for team names that might not be in the mock TEAMS constant
    const fallbackId = teamName.split(' ').pop()?.slice(0, 3).toUpperCase() || '??';
    return team?.logoUrl || `https://placehold.co/64x64/1a2c20/FFFFFF?text=${fallbackId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Super League Teams</h1>
      {teamsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamsData.map((team) => (
            <div key={team.id} className="bg-gray-800 rounded-lg shadow-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 shadow-card-glow">
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
      ) : (
        <div className="text-center text-gray-400 py-10">
            <p className="text-lg">No teams found in the database.</p>
            <p className="text-sm">An administrator needs to add teams via the admin panel.</p>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
