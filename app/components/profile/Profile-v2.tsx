'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged, updateProfile, User } from 'firebase/auth';
import { UserCircle, X } from 'lucide-react';

const storage = getStorage();

export default function ProfileV2() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('/user-placeholder.png');
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
        setPhotoURL(currentUser.photoURL || '/user-placeholder.png');
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && user) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      setUploading(true);
      try {
        await uploadBytes(storageRef, file);
        const newPhotoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: newPhotoURL });
        setPhotoURL(newPhotoURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (user && displayName) {
      try {
        await updateProfile(user, { displayName });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">You are not logged in.</h1>
        <p className="text-lg text-center mb-8">Please log in to view and edit your profile.</p>
        <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={photoURL}
            alt="Profile Picture"
            width={128}
            height={128}
            className="rounded-full object-cover cursor-pointer"
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          {uploading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full"><div className="loader"></div></div>}
        </div>

        {isEditing ? (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-gray-700 text-white text-center text-2xl font-bold rounded-lg px-2 py-1 mb-4 w-full"
            />
            <div className="flex justify-center gap-4">
              <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">{displayName || 'No display name'}</h1>
            <p className="text-gray-400">{user.email}</p>
            <button onClick={() => setIsEditing(true)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
