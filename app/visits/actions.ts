'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Visit } from '@/types';

const VisitSchema = z.object({
  stadium: z.string().min(1, 'Stadium is required'),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
  userId: z.string(),
});

export async function addVisit(prevState: any, formData: FormData) {
  const validatedFields = VisitSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const visitsCol = collection(db, 'visits');
    await addDoc(visitsCol, validatedFields.data);
    revalidatePath('/visits');
    return { message: 'Visit added successfully', success: true };
  } catch (e) {
    return { message: 'Failed to add visit', success: false };
  }
}

export async function updateVisit(id: string, prevState: any, formData: FormData) {
  const validatedFields = VisitSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const visitDoc = doc(db, 'visits', id);
    await updateDoc(visitDoc, validatedFields.data);
    revalidatePath('/visits');
    return { message: 'Visit updated successfully', success: true };
  } catch (e) {
    return { message: 'Failed to update visit', success: false };
  }
}

export async function deleteVisit(id: string) {
  try {
    const visitDoc = doc(db, 'visits', id);
    await deleteDoc(visitDoc);
    revalidatePath('/visits');
    return { message: 'Visit deleted successfully', success: true };
  } catch (e) {
    return { message: 'Failed to delete visit', success: false };
  }
}
