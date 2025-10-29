'use client';

import { useState } from 'react';

export default function MatchLogPage() {
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ homeTeam, awayTeam, date, score });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-400 mb-8">Log a New Match</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg card-lifted max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="homeTeam" className="block text-gray-300 mb-2">Home Team</label>
            <input
              type="text"
              id="homeTeam"
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="awayTeam" className="block text-gray-300 mb-2">Away Team</label>
            <input
              type="text"
              id="awayTeam"
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="score" className="block text-gray-300 mb-2">Final Score</label>
            <input
              type="text"
              id="score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 24-18"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-glow">
            Log Match
          </button>
        </form>
      </div>
    </div>
  );
}
