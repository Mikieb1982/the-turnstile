'use client';

import { Suspense, useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import MatchLogClient from './client';
import Loading from './loading';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function MatchLogData() {
    const [loggedMatches, setLoggedMatches] = useState<any[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
                  })) as any[]; // Cast to any[] or your Match[] type
    return matches;
  } catch (error) {
    console.error("Error fetching match logs: ", error);
    return [];
  }
}
            
         export default function MatchLogPage() {
  const [matches, setMatches] = useState<any[]>([]); // Use your Match type

            const querySnapshot = await getDocs(q);
            const matches = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              // Convert timestamp to a serializable format
              createdAt: doc.data().createdAt.toDate().toISOString(),
            }));
            setLoggedMatches(matches);
          } else {
            setUser(null);
            setLoggedMatches([]);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      }, []);

    if (loading) {
        return <Loading />;
    }
  
    return <MatchLogClient loggedMatches={loggedMatches} userId={user?.uid} />;
}

export default function MatchLogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MatchLogData />
    </Suspense>
  );
}
