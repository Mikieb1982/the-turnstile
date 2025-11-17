// app/visits/page.tsx
import { Suspense } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { auth } from '@/lib/firebase'; // Direct auth import
import VisitsClient from './client';
import Loading from './loading';
import { Visit } from '@/types';
import { redirect } from 'next/navigation';

// 1. Make the page an async function
export default async function VisitsPage() {
  // 2. Get user on the server
  const user = auth.currentUser; // Or use a server-side session method
  
  if (!user) {
    redirect('/sign-in');
  }

  // 3. Fetch data directly
  let visits: Visit[] = [];
  try {
    const visitsQuery = query(
      collection(db, 'visits'),
      where('userId', '==', user.uid),
    );
    const visitsSnap = await getDocs(visitsQuery);
    visits = visitsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Visit));
  } catch (e) {
    console.error('Fetch data error:', e);
  }

  // 4. Pass data as props. The <Suspense> handles loading.
  return (
    <Suspense fallback={<Loading />}>
      <VisitsClient visits={visits} userId={user.uid} />
    </Suspense>
  );
}
