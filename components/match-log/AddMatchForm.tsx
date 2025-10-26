'use client';

import { useState } from 'react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddMatchForm = () => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [homeScore, setHomeScore] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user) {
      setError("You must be logged in to add a match.");
      return;
    }

    try {
      await addDoc(collection(db, 'matches'), {
        userId: user.uid,
        date,
        homeTeam,
        homeScore: parseInt(homeScore, 10),
        awayTeam,
        awayScore: parseInt(awayScore, 10),
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
      // Reset form
      setDate('');
      setHomeTeam('');
      setHomeScore('');
      setAwayTeam('');
      setAwayScore('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Add New Match</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Match added successfully!</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            required
          />
        </div>
        <div>
          <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-300 mb-1">Home Team</label>
          <input
            type="text"
            id="homeTeam"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Home Team"
            required
          />
        </div>
        <div>
          <label htmlFor="homeScore" className="block text-sm font-medium text-gray-300 mb-1">Home Score</label>
          <input
            type="number"
            id="homeScore"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Score"
            required
          />
        </div>
        <div>
          <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-300 mb-1">Away Team</label>
          <input
            type="text"
            id="awayTeam"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Away Team"
            required
          />
        </div>
        <div>
          <label htmlFor="awayScore" className="block text-sm font-medium text-gray-300 mb-1">Away Score</label>
          <input
            type="number"
            id="awayScore"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            placeholder="Score"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Add Match
      </button>
    </form>
  );
};

export default AddMatchForm;
