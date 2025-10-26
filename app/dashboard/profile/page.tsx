'use client';

import { useState } from 'react';
import { useAuth } from '../../../lib/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) {
      setError('You must be logged in to update your profile.');
      return;
    }

    try {
      // Update the user's display name in Firebase Authentication
      await updateProfile(auth.currentUser, { displayName });

      // Update the user's display name in their Firestore document
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { displayName });

      setSuccess('Your profile has been updated successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-lg font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-700 text-white border-2 border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
            <p id="email" className="text-lg">{user.email}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Update Profile
          </button>
        </form>
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
