// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef, useActionState } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth, storage } from '@/lib/firebase/config';
import { updateUserProfile } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';

// --- START OF FIX ---

// Import the correct User type for the profile document
import { User as UserProfile, TeamInfo } from '@/types';

// Define the Team type locally, just like in page.tsx
type Team = TeamInfo & { id: string };

interface ProfileClientPageProps {
  user: AuthUser;
  // The profile prop should be the (Partial) Firestore document,
  // which is the 'User' type from types.ts (aliased as UserProfile here)
  profile: Partial<UserProfile> | null;
  teams: Team[] | null;
}
// --- END OF FIX ---

const initialState: any = {};

export default function ProfileClientPage({
  user,
  profile,
  teams,
}: ProfileClientPageProps) {
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || '/user-placeholder.png'
  );
  // ... rest of your component ...
  
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
