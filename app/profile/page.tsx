'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { auth, storage } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserCircle, X } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setDisplayName(user.displayName || '');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (user) {
      try {
        let photoURL = user.photoURL;
        if (profilePicture) {
          const storageRef = ref(storage, `profile-pictures/${user.uid}`);
          await uploadBytes(storageRef, profilePicture);
          photoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(user, { displayName, photoURL });

        // Manually update the user object to reflect the changes immediately
        setUser(prevUser => {
          if (!prevUser) return null;
          const newUser = { ...prevUser, displayName, photoURL };
          return newUser as User;
        });

        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-green-400 mb-8">Your Profile</h1>
        {user ? (
          <div className="bg-gray-800 p-6 rounded-lg card-lifted max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              {user.photoURL ? (
                <Image src={user.photoURL} alt="Profile" width={128} height={128} className="rounded-full mb-4" />
              ) : (
                <UserCircle className="w-32 h-32 text-gray-500 mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2">{user.displayName || 'No display name'}</h2>
              <p className="text-gray-400 mb-6">{user.email}</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full button-glow">
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Please sign in to view your profile.</p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg card-lifted max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Edit Profile</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label htmlFor="profilePicture" className="block text-sm font-medium mb-2">Profile Picture</label>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Choose File
                    </button>
                    <p className="text-gray-400">{profilePicture ? profilePicture.name : 'No file chosen'}</p>
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  ref={fileInputRef}
                  onChange={(e) => setProfilePicture(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full button-glow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
