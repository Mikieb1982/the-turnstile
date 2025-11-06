// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUserProfile, ProfileFormState } from './actions';
import { TeamInfo, User as FirestoreUser } from '@/types';

const storage = getStorage();

type Team = TeamInfo & { id: string };

interface ProfileClientPageProps {
  user: AuthUser;
  profile: Partial<FirestoreUser> | null;
  teams: Team[];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-primary hover:bg-green-600 text-background font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
    >
      {pending ? 'Saving...' : 'Save Profile'}
    </button>
  );
}

export default function ProfileClientPage({
  user,
  profile,
  teams,
}: ProfileClientPageProps) {
  // State for image URL and upload status
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || '/user-placeholder.png',
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form action state
  const initialState: ProfileFormState = { message: '', success: false };
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  // State to show a success message temporarily
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0] && user) {
      const file = event.target.files[0];
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      setUploading(true);
      try {
        await uploadBytes(storageRef, file);
        const newPhotoURL = await getDownloadURL(storageRef);

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
        }
        setPhotoURL(newPhotoURL);
      } catch (error) {
        console.error('Error uploading file: ', error);
        // You could set an error state here
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-primary p-4">
      <div className="w-full max-w-md mx-auto bg-card rounded-2xl shadow-card-glow p-6 text-center">
        {/* Image Upload */}
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

        <p className="text-text-secondary mb-4">{user.email}</p>

        {/* Profile Form */}
        <form action={formAction} className="space-y-4">
          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-text-secondary mb-1 text-left"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              defaultValue={user.displayName || ''}
              className="bg-surface text-text-primary text-lg font-bold rounded-lg px-3 py-2 w-full"
              required
            />
            {state.errors?.displayName && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {state.errors.displayName[0]}
              </p>
            )}
          </div>

          {/* Favorite Team */}
          <div>
            <label
              htmlFor="favoriteTeamId"
              className="block text-sm font-medium text-text-secondary mb-1 text-left"
            >
              Favorite Team
            </label>
            <select
              id="favoriteTeamId"
              name="favoriteTeamId"
              defaultValue={profile?.favoriteTeamId || ''}
              className="bg-surface text-text-primary text-lg font-bold rounded-lg px-3 py-2 w-full appearance-none"
            >
              <option value="">-- Select your team --</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Form Messages */}
          {showSuccess && state.message && (
            <p className="text-green-400 text-sm">{state.message}</p>
          )}
          {!state.success && state.message && (
            <p className="text-red-500 text-sm">{state.message}</p>
          )}
          {state.errors?._form && (
            <p className="text-red-500 text-sm">{state.errors._form[0]}</p>
          )}

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
