// app/visits/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/firebase/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import VisitsClient from './client';
import Loading from './loading';
import { Visit } from '@/types';

export default function VisitsPage() {
  const { user, loading: authLoading } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      if (!authLoading) setIsLoading(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        const visitsQuery = query(
          collection(db, 'visits'),
          where('userId', '==', user.uid),
        );

        const visitsSnap = await getDocs(visitsQuery);

        const fetchedVisits: Visit[] = visitsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Visit));

        setVisits(fetchedVisits);
      } catch (e) {
        console.error('Fetch data error:', e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user, authLoading]);

  if (authLoading || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="text-center">
        Please sign in to view your visits.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <VisitsClient visits={visits} userId={user.uid} />
    </Suspense>
  );
}
