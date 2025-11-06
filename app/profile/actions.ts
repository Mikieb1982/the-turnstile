'use server';

import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { updateProfile } from 'firebase/auth';

// Schema for profile data stored in Firestore
const ProfileSchema = z.object({
  favoriteTeamId: z.string().optional(),
});

// Schema for the form
const FormSchema = z.object({
  displayName: z.string().min(1, 'Display name cannot be empty.'),
  favoriteTeamId: z.string().optional(),
});

export interface ProfileFormState {
  message: string;
  success: boolean;
  errors?: {
    displayName?: string[];
    favoriteTeamId?: string[];
    _form?: string[];
  };
}

export async function updateUserProfile(
  prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return {
      message: 'Not authenticated.',
      success: false,
    };
  }

  const validatedFields = FormSchema.safeParse({
    displayName: formData.get('displayName'),
    favoriteTeamId: formData.get('favoriteTeamId'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid data.',
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { displayName, favoriteTeamId } = validatedFields.data;

  try {
    // 1. Update Firebase Auth user (displayName)
    if (currentUser.displayName !== displayName) {
      await updateProfile(currentUser, { displayName });
    }

    // 2. Update Firestore user document (custom data)
    const userDocRef = doc(db, 'users', currentUser.uid);
    await setDoc(
      userDocRef,
      {
        favoriteTeamId: favoriteTeamId || null,
        // any other custom fields can go here
      },
      { merge: true }, // Use merge to avoid overwriting other fields
    );

    revalidatePath('/profile');
    return { message: 'Profile updated successfully!', success: true };
  } catch (e: unknown) {
    console.error('Error updating profile:', e);
    return {
      message: 'Failed to update profile.',
      success: false,
      errors: {
        _form: ['An unknown error occurred.'],
      },
    };
  }
}
