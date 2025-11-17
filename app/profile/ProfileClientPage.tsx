// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef, useActionState } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth, storage } from '@/lib/firebase/config'; // Corrected import path
import { updateUserProfile } from '@/app/actions';
import { UserProfile, Team } from '@/lib/firebase/firestore';
import SubmitButton from '@/components/SubmitButton';

interface ProfileClientPageProps {
  user: AuthUser;
  profile: UserProfile | null;
  teams: Team[] | null;
}

const initialState: any = {};

export default function ProfileClientPage({
  user,
  profile,
  teams,
}: ProfileClientPageProps) {
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || '/user-placeholder.png'
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateProfile(auth.currentUser!, { photoURL: downloadURL });
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <form action={formAction}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
          accept="image/png, image/jpeg"
        />
        
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={handleImageClick}
            disabled={uploading}
            className="relative mx-auto h-24 w-24 rounded-full"
          >
            <Image
              src={photoURL}
              alt="Profile"
              width={96}
              height={96}
              className={`rounded-full object-cover ${uploading ? 'opacity-50' : ''}`}
            />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ... Other form fields ... */}
        </div>
        
        <SubmitButton />
      </form>
    </main>
  );
}
