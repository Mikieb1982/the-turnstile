// app/profile/actions.ts
'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { updateProfile } from 'firebase/auth';

/* ---------- schemas ---------- */
const ProfileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
  favoriteTeamId: z.string().optional(),
});

export type ProfileFormState = {
  message: string;
  success: boolean;
  errors?: {
    displayName?: string[];
    favoriteTeamId?: string[];
    _form?: string[];
  };
};

/* ---------- server action ---------- */
export async function updateUserProfile(
  prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const currentUser = auth.currentUser;
  if (!currentUser)
    return { message: 'Not authenticated.', success: false };

  const parsed = ProfileSchema.safeParse({
    displayName: formData.get('displayName'),
    favoriteTeamId: formData.get('favoriteTeamId') || undefined,
  });

  if (!parsed.success)
    return {
      message: 'Invalid data.',
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };

  const { displayName, favoriteTeamId } = parsed.data;

  try {
    /* 1. update auth profile */
    if (currentUser.displayName !== displayName)
      await updateProfile(currentUser, { displayName });

    /* 2. update firestore */
    await setDoc(
      doc(db, 'users', currentUser.uid),
      { favoriteTeamId: favoriteTeamId ?? null },
      { merge: true }
    );

    revalidatePath('/profile');
    return { message: 'Profile updated 🎉', success: true };
  } catch (e: unknown) {
    console.error('Profile update error:', e);
    return {
      message: 'Failed to update profile.',
      success: false,
      errors: { _form: ['An unknown error occurred.'] },
    };
  }
}
