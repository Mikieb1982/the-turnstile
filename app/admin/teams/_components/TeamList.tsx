'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { createTeam, updateTeam } from './actions';
import { TeamInfo } from '@/types'; // Assuming this is in types.ts
import TeamForm from './TeamForm'; // This import will now work

// Define the shape of the team data as it comes from Firestore
export type TeamDocument = TeamInfo & {
  id: string;
};

interface TeamListProps {
  teams: TeamDocument[];
}

export default function TeamList({ teams }: TeamListProps) {
  const [editingTeam, setEditingTeam] = useState<TeamDocument | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteTeam(id);
    }
  };

  // If a team is being edited, show the form instead of the list item
  if (editingTeam) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
        <button 
          onClick={() => setEditingTeam(null)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Cancel editing"
        >
          <FiX size={24} />
        </button>
        <h3 className="text-xl font-bold text-primary mb-4">Edit {editingTeam.name}</h3>
        <TeamForm team={editingTeam} onDone={() => setEditingTeam(null)} />
      </div>
    );
  }

  // Show the list of all teams
  return (
    <div className="space-y-4">
      {teams.length > 0 ? (
        teams.map((team) => (
          <div key={team.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-bold text-white">{team.name}</p>
                <p className="text-gray-400 text-sm">{team.stadium.name} | Est. {team.established}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => setEditingTeam(team)} className="text-gray-400 hover:text-primary" aria-label={`Edit ${team.name}`}>
                  <FiEdit size={20} />
                </button>
                <button onClick={() => handleDelete(team.id, team.name)} className="text-gray-400 hover:text-red-500" aria-label={`Delete ${team.name}`}>
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-400">
          <p>No teams found. Add one using the form.</p>
        </div>
      )}
    </div>
  );
}
