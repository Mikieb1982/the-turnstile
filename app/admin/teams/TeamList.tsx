'use client';

import { useState } from 'react';
import { TeamInfo } from '@/types';
import { FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { deleteTeam } from './actions';
import TeamForm from './TeamForm';

interface TeamListProps {
  teams: (TeamInfo & { id: string })[];
}

export default function TeamList({ teams }: TeamListProps) {
  const [editingTeam, setEditingTeam] = useState<(TeamInfo & { id: string }) | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await deleteTeam(id);
    }
  };

  if (editingTeam) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">Edit {editingTeam.name}</h3>
          <button onClick={() => setEditingTeam(null)} className="text-gray-400 hover:text-white">
            <FiX size={24} />
          </button>
        </div>
        <TeamForm team={editingTeam} onDone={() => setEditingTeam(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {teams.length > 0 ? (
        teams.map((team) => (
          <div key={team.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-bold">{team.name}</p>
                <p className="text-gray-400 text-sm">{team.stadium.name} | Est. {team.established}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={() => setEditingTeam(team)} className="text-gray-400 hover:text-primary">
                  <FiEdit size={20} />
                </button>
                <button onClick={() => handleDelete(team.id)} className="text-gray-400 hover:text-red-500">
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
