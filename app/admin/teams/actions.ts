'use server';

import { db } from '@/lib/firebase/firestore';
import { collection, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Schema based on services/stadiumData.ts and types.ts
const TeamSchema = z.object({
  name: z.string().min(1, { message: 'Team name is required.' }),
  established: z.coerce.number().min(1800, { message: 'Invalid year.' }).max(2100),
  titles: z.string().min(1, { message: 'Titles info is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  stadiumName: z.string().min(1, { message: 'Stadium name is required.' }),
  stadiumCapacity: z.string().min(1, { message: 'Capacity is required.' }),
  stadiumNotes: z.string().optional(),
});

export async function createTeam(prevState: any, formData: FormData) {
  const validatedFields = TeamSchema.safeParse({
    name: formData.get('name'),
    established: formData.get('established'),
    titles: formData.get('titles'),
    location: formData.get('location'),
    stadiumName: formData.get('stadiumName'),
    stadiumCapacity: formData.get('stadiumCapacity'),
    stadiumNotes: formData.get('stadiumNotes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create team.',
      success: false,
    };
  }

  const { stadiumName, stadiumCapacity, stadiumNotes, ...teamData } = validatedFields.data;

  // Nest stadium data as per the 'TeamInfo' type
  const teamPayload = {
    ...teamData,
    stadium: {
      name: stadiumName,
      capacity: stadiumCapacity,
      notes: stadiumNotes || '',
    },
    createdAt: serverTimestamp(), // Add a timestamp
  };

  try {
    await addDoc(collection(db, 'teams'), teamPayload);
    revalidatePath('/admin/teams'); // Refresh admin page
    revalidatePath('/teams');      // Refresh public teams page
    return { success: true, message: 'Team created successfully!' };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, message: 'Failed to create team.' };
  }
}

export async function updateTeam(teamId: string, prevState: any, formData: FormData) {
  const validatedFields = TeamSchema.safeParse({
    name: formData.get('name'),
    established: formData.get('established'),
    titles: formData.get('titles'),
    location: formData.get('location'),
    stadiumName: formData.get('stadiumName'),
    stadiumCapacity: formData.get('stadiumCapacity'),
    stadiumNotes: formData.get('stadiumNotes'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update team.',
      success: false,
    };
  }

  const { stadiumName, stadiumCapacity, stadiumNotes, ...teamData } = validatedFields.data;

  const teamPayload = {
    ...teamData,
    stadium: {
      name: stadiumName,
      capacity: stadiumCapacity,
      notes: stadiumNotes || '',
    },
  };

  try {
    const teamRef = doc(db, 'teams', teamId);
    await updateDoc(teamRef, teamPayload);
    revalidatePath('/admin/teams');
    revalidatePath('/teams');
    return { success: true, message: 'Team updated successfully!' };
  } catch (error) {
    console.error('Error updating document: ', error);
    return { success: false, message: 'Failed to update team.' };
  }
}

export async function deleteTeam(teamId: string) {
  try {
    const teamRef = doc(db, 'teams', teamId);
    await deleteDoc(teamRef);
    revalidatePath('/admin/teams');
    revalidatePath('/teams');
    return { success: true, message: 'Team deleted successfully!' };
  } catch (error) {
    console.error('Error deleting document: ', error);
    return { success: false, message: 'Failed to delete team.' };
  }
}
