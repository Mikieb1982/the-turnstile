import { Suspense } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firestore';
import MatchLogClient from './client';
import Loading from './loading';
import { getAuth } from 'firebase/auth';

async function getLoggedMatches(userId: string | null) {
  try {
    const matchLogsCollection = collection(db, 'match-logs');
    let q;
    if (userId) {
        q = query(matchLogsCollection, where("userId", "==", userId), orderBy('createdAt', 'desc'));
    } else {
        q = query(matchLogsCollection, orderBy('createdAt', 'desc'));
    }
    const querySnapshot = await getDocs(q);
    const matches = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert timestamp to a serializable format
      createdAt: doc.data().createdAt.toDate().toISOString(),
    }));
    return matches;
  } catch (error) {
    console.error("Error fetching match logs: ", error);
    return [];
  }
}

async function MatchLogData() {
    const auth = getAuth();
    const user = auth.currentUser;
    const loggedMatches = await getLoggedMatches(user?.uid || null);
  
    return <MatchLogClient loggedMatches={loggedMatches} userId={user?.uid} />;
}

export default function MatchLogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MatchLogData />
    </Suspense>
  );
}
