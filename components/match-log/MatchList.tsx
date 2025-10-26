'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';

const MatchList = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'matches'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const matchesData = [];
        querySnapshot.forEach((doc) => {
          matchesData.push({ id: doc.id, ...doc.data() });
        });
        setMatches(matchesData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await deleteDoc(doc(db, 'matches', id));
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  if (loading) {
    return <p className="text-white">Loading matches...</p>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">My Matches</h2>
      {matches.length === 0 ? (
        <p className="text-gray-400 text-center">You haven&apos;t added any matches yet.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li key={match.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-white">{match.homeTeam} vs {match.awayTeam}</p>
                <p className="text-gray-300">{match.date}</p>
                <p className="text-white">{match.homeScore} - {match.awayScore}</p>
              </div>
              <button
                onClick={() => handleDelete(match.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatchList;
