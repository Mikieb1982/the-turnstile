'use server';

import { db } from '@/lib/firebase/firestore';
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const MatchSchema = z.object({
  homeTeam: z.string().min(1, { message: 'Home team is required.' }),
  awayTeam: z.string().min(1, { message: 'Away team is required.' }),
  date: z.string().min(1, { message: 'Date is required.' }),
  score: z.string().regex(/^\d+-\d+$/, { message: 'Score must be in the format "X-Y".' }),
});

export async function logMatch(prevState: any, formData: FormData) {
  const validatedFields = MatchSchema.safeParse({
    homeTeam: formData.get('homeTeam'),
    awayTeam: formData.get('awayTeam'),
    date: formData.get('date'),
    score: formData.get('score'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Match.',
    };
  }

  const matchData = {
    ...validatedFields.data,
    userId: formData.get('userId'),
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, 'match-logs'), matchData);
    console.log('Document written with ID: ', docRef.id);
    revalidatePath('/match-log');
    return { success: true, message: 'Match logged successfully!' };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, message: 'Failed to log match.' };
  }
}

export async function updateMatch(matchId: string, prevState: any, formData: FormData) {
  const validatedFields = MatchSchema.safeParse({
    homeTeam: formData.get('homeTeam'),
    awayTeam: formData.get('awayTeam'),
    date: formData.get('date'),
    score: formData.get('score'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Match.',
    };
  }

  try {
    const matchRef = doc(db, 'match-logs', matchId);
    await updateDoc(matchRef, validatedFields.data);
    console.log('Document updated with ID: ', matchId);
    revalidatePath('/match-log');
    return { success: true, message: 'Match updated successfully!' };
  } catch (error) {
    console.error('Error updating document: ', error);
    return { success: false, message: 'Failed to update match.' };
  }
}

export async function deleteMatch(matchId: string) {
  try {
    const matchRef = doc(db, 'match-logs', matchId);
    await deleteDoc(matchRef);
    console.log('Document deleted with ID: ', matchId);
    revalidatePath('/match-log');
    return { success: true, message: 'Match deleted successfully!' };
  } catch (error) {
    console.error('Error deleting document: ', error);
    return { success: false, message: 'Failed to delete match.' };
  }
}
