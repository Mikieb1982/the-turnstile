'use client';

import { useState, useRef, useActionState } from 'react'; // <-- Make sure useActionState is imported
import Image from 'next/image';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile, User as AuthUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useFormStatus } from 'react-dom';
import { updateUserProfile, ProfileFormState } from './actions';
import { TeamInfo, User as FirestoreUser } from '@//types';

type Team = TeamInfo & { id: string };

interface ProfileClientPageProps {
  user: AuthUser;
  profile: Partial<FirestoreUser> | null;
  teams: Team[];
}

const initialState: ProfileFormState = {
  message: '',
  success: false,
};

// 1.
// VVVV THIS FUNCTION MUST BE HERE, AT THE TOP LEVEL VVVV
//
/* ---------- submit button ---------- */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold
                 text-slate-900 shadow-lg shadow-emerald-500/20 transition
                 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Saving…' : 'Save Profile'}
    </button>
  );
}
//
// ^^^^ THIS FUNCTION MUST BE HERE, AT THE TOP LEVEL ^^^^
//

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction] = useActionState(updateUserProfile, initialState);

  //
  // !!! DO NOT DEFINE SubmitButton() HERE !!!
  //

  /* ---- image upload ---- */
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (rest of this function is fine)
  };

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          {/* ... (header content is fine) ... */}
        </header>

        <form
          action={formAction} // This is correct
          className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-800/40
                     p-6 shadow-lg shadow-black/20 ring-1 ring-white/5"
        >
          {/* ... (avatar, inputs, etc. are fine) ... */}
          
          {/* messages */}
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

          {/* 2. This will now work correctly */}
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
