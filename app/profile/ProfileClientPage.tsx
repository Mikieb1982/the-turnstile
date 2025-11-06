// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Direct import for updateProfile

const storage = getStorage();

interface ProfileClientPageProps {
  user: User;
}

export default function ProfileClientPage({ user }: ProfileClientPageProps) {
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [photoURL, setPhotoURL] = useState(user.photoURL || '/user-placeholder.png'); // Use a placeholder
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        
        // Use the auth instance directly from firebase lib
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
        }
        setPhotoURL(newPhotoURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (user && displayName && auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName });
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-primary p-4">
      <div className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-card-glow p-6 text-center">
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
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-surface text-text-primary text-center text-2xl font-bold rounded-lg px-2 py-1 mb-4 w-full"
            />
            <div className="flex justify-center gap-4">
              <button onClick={handleSave} className="bg-primary hover:bg-green-600 text-background font-bold py-2 px-4 rounded-lg">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">{displayName || 'No display name'}</h1>
            <p className="text-text-secondary">{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-primary hover:bg-green-600 text-background font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
