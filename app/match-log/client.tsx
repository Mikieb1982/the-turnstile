'use client';

import { useState } from 'react';
import { logMatch, updateMatch, deleteMatch } from './actions';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score: string;
}

export default function MatchLogClient({ loggedMatches, userId }: { loggedMatches: Match[], userId: string | undefined }) {
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (match: Match) => {
    setEditingMatch(match);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (matchId: string) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      await deleteMatch(matchId);
    }
  };

  const handleModalClose = () => {
    setEditingMatch(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">Log a New Match</h1>
            <form action={logMatch} className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
              <input type="hidden" name="userId" value={userId} />
              <div className="mb-4">
                <label htmlFor="homeTeam" className="block text-gray-300 mb-2">Home Team</label>
                <input
                  type="text"
                  id="homeTeam"
                  name="homeTeam"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="awayTeam" className="block text-gray-300 mb-2">Away Team</label>
                <input
                  type="text"
                  id="awayTeam"
                  name="awayTeam"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="score" className="block text-gray-300 mb-2">Final Score</label>
                <input
                  type="text"
                  id="score"
                  name="score"
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., 24-18"
                />
              </div>
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                Log Match
              </button>
            </form>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-8">Logged Matches</h1>
            <div className="space-y-4">
              {loggedMatches.map((match: Match) => (
                <div key={match.id} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold">{match.homeTeam} vs {match.awayTeam}</p>
                      <p className="text-gray-400">{new Date(match.date).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-2xl font-bold text-cyan-400">{match.score}</p>
                      <button onClick={() => handleEditClick(match)} className="text-gray-400 hover:text-white">
                        <FiEdit size={20} />
                      </button>
                      <button onClick={() => handleDeleteClick(match.id)} className="text-gray-400 hover:text-white">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && editingMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Edit Match</h2>
            <form action={async (formData) => {
              await updateMatch(editingMatch.id, formData);
              handleModalClose();
            }}>
              <div className="mb-4">
                <label htmlFor="homeTeam" className="block text-gray-300 mb-2">Home Team</label>
                <input
                  type="text"
                  id="homeTeam"
                  name="homeTeam"
                  required
                  defaultValue={editingMatch.homeTeam}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="awayTeam" className="block text-gray-300 mb-2">Away Team</label>
                <input
                  type="text"
                  id="awayTeam"
                  name="awayTeam"
                  required
                  defaultValue={editingMatch.awayTeam}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={editingMatch.date}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="score" className="block text-gray-300 mb-2">Final Score</label>
                <input
                  type="text"
                  id="score"
                  name="score"
                  required
                  defaultValue={editingMatch.score}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="e.g., 24-18"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={handleModalClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
                  Cancel
                </button>
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg">
                  Update Match
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
