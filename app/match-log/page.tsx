'use client'; // <-- Add this

import { Suspense, useState, useEffect } from 'react'; // <-- Add hooks
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase'; // <-- Import auth
import { onAuthStateChanged, User } from 'firebase/auth'; // <-- Add
import MatchLogClient from './client';
import Loading from './loading';

// Move this function inside the new component or keep it outside
async function getLoggedMatches(userId: string) {
  try {
    const matchLogsCollection = collection(db, 'match-logs');
    const q = query(matchLogsCollection, where("userId", "==", userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const matches = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
    })) as any[]; // Cast to any[] or your Match[] type
    return matches;
  } catch (error) {
    console.error("Error fetching match logs: ", error);
    return [];
  }
}

export default function MatchLogPage() {
  const [matches, setMatches] = useState<any[]>([]); // Use your Match type
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userMatches = await getLoggedMatches(currentUser.uid);
        setMatches(userMatches);
      } else {
        setUser(null);
        setMatches([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Pass the correctly fetched matches and user ID
  return <MatchLogClient loggedMatches={matches} userId={user?.uid} />;
}
