// app/profile/ProfileClientPage.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
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
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ---- image upload ---- */
  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);
      await uploadBytes(storageRef, file);
      const newURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: newURL });
      setPhotoURL(newURL);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  /* ---- success toast ---- */
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  /* ---- form wrapper ---- */
  const handleAction = async (fd: FormData) => {
    const res = await updateUserProfile({ message: '', success: false }, fd);
    if (res.success) setSuccess(true);
    return res;
  };

  return (
    <main className="relative isolate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black px-6 py-16 sm:py-24">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10
                        h-[30rem] w-[60rem] -translate-x-1/2 rounded-full
                        bg-emerald-500/10 blur-3xl"
      />

      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My Profile
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-400">
            Update your display name and favourite team.
          </p>
        </header>

        <form
          action={handleAction}
          className="mt-12 grid gap-6 rounded-2xl border border-slate-800 bg-slate-800/40
                     p-6 shadow-lg shadow-black/20 ring-1 ring-white/5"
        >
          {/* avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-24 w-24">
              <Image
                src={photoURL}
                alt="Avatar"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover ring-2 ring-slate-700"
              />
              {uploading && (
                <div className="absolute inset-0 grid place-items-center rounded-full bg-black/60">
                  <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-emerald-400" />
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="rounded-lg px-3 py-2 text-sm text-slate-300 ring-1 ring-slate-700
                         hover:bg-slate-700/50"
            >
              Change photo
            </button>
          </div>

          {/* display name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-slate-300"
            >
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              defaultValue={user.displayName || ''}
              required
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900/60
                         px-4 py-3 text-white placeholder-slate-400
                         ring-1 ring-transparent transition
                         focus:border-emerald-400 focus:outline-none
                         focus:ring-emerald-400"
            />
          </div>

          {/* favourite team */}
          <div>
            <label
              htmlFor="favoriteTeamId"
              className="block text-sm font-medium text-slate-300"
            >
              Favourite team
            </label>
            <select
              id="favoriteTeamId"
              name="favoriteTeamId"
              defaultValue={profile?.favoriteTeamId || ''}
              className="mt-2 w-full appearance-none rounded-lg border border-slate-700
                         bg-slate-900/60 px-4 py-3 text-white
                         ring-1 ring-transparent transition
                         focus:border-emerald-400 focus:outline-none
                         focus:ring-emerald-400"
            >
              <option value="">-- Select team --</option>
              {teams.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* messages */}
          {success && (
            <p className="text-center text-sm text-emerald-400">
              Profile updated successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
