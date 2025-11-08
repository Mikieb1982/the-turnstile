// app/profile/ProfileClientPage.tsx
'use client';

// 1. Add useActionState
import { useState, useRef, useEffect, useActionState } from 'react';
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useFormStatus } from 'react-dom';
import { updateUserProfile, ProfileFormState } from './actions'; // This is correct
import { TeamInfo, User as FirestoreUser } from '@//types';

type Team = TeamInfo & { id: string };

interface ProfileClientPageProps {
  user: AuthUser;
  profile: Partial<FirestoreUser> | null;
  teams: Team[];
}

// 2. Define initial state
const initialState: ProfileFormState = {
  message: '',
  success: false,
};

/* ---------- submit button ---------- */
function SubmitButton() {
  // ... (no change needed here)
}

/* ---------- component ---------- */
export default function ProfileClientPage({
  user,
  profile,
  teams,
}: ProfileClientPageProps) {
  const [photoURL, setPhotoURL] = useState(
    user.photoURL || '/user-placeholder.png'
  );
  const [uploading, setUploading] = useState(false);
  // 3. Remove useState for success
  // const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 5. Call useActionState
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  /* ---- image upload ---- */
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (no change needed here)
  };

  /* ---- success toast ---- */
  // 3. Remove this useEffect
  /*
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);
  */

  /* ---- form wrapper ---- */
  // 4. Remove this wrapper function
  /*
  const handleAction = async (fd: FormData) => {
    const res = await updateUserProfile({ message: '', success: false }, fd);
    if (res.success) setSuccess(true);
    return res;
  };
  */

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* ... (header) ... */}

      <div className="mx-auto max-w-2xl">
        {/* ... (header) ... */}

        <form
          // 6. Update the action prop
          action={formAction}
          className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-800/40
                     p-6 shadow-lg shadow-black/20 ring-1 ring-white/5"
        >
          {/* ... (avatar and inputs) ... */}

          {/* 7. Update messages to use state from hook */}
          {state.success && (
            <p className="text-center text-sm text-emerald-400">
              {state.message || 'Profile updated successfully!'}
            </p>
          )}
          {!state.success && state.message && (
             <p className="text-center text-sm text-red-400">
              {state.message}
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
