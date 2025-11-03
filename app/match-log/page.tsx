'use client'; // Ensures this component runs in the browser
import { useState, useEffect } from 'react'; // Import React hooks
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase'; // Import auth and db
import { onAuthStateChanged, User } from 'firebase/auth'; // Import auth utilities
import MatchLogClient from './client';
import Loading from './loading';

/**
 * Fetches match logs for a specific user from Firestore.
 * This function is now designed to be called from the client-side
 * after the user's ID is known.
 * @param userId The unique ID of the user whose matches to fetch.
 * @returns A promise that resolves to an array of match log objects.
 */
async function getLoggedMatches(userId: string) {
  try {
    const matchLogsCollection = collection(db, 'match-logs');
    
    // Create the query to get matches for the specific user, ordered by creation date
    const q = query(matchLogsCollection, where("userId", "==", userId), orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    
    // Map over the documents to get data and format the timestamp
    const matches = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore Timestamp to a serializable ISO string
      createdAt: doc.data().createdAt.toDate().toISOString(),
    })) as any[]; // You can replace any[] with your specific Match type
    
    return matches;

  } catch (error) {
    console.error("Error fetching match logs: ", error);
    return []; // Return an empty array on error
  }
}

/**
 * This is the main page component. It is now a Client Component
 * that handles user authentication state and fetches data
 * based on the logged-in user.
 */
export default function MatchLogPage() {
  // State to hold the fetched matches
  const [matches, setMatches] = useState<any[]>([]); // Use your Match[] type here
  // State to hold the Firebase user object
  const [user, setUser] = useState<User | null>(null);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);

  // useEffect runs when the component mounts
  useEffect(() => {
    // Set up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // --- User is signed in ---
        setUser(currentUser);
        // Fetch matches for the signed-in user
        const userMatches = await getLoggedMatches(currentUser.uid);
        setMatches(userMatches);
      } else {
        // --- User is signed out ---
        setUser(null);
        setMatches([]); // Clear matches if user signs out
      }
      // Once auth state is determined and initial data is fetched, stop loading
      setLoading(false);
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array [] ensures this runs only once on mount

  // Show a loading spinner while checking for user and fetching data
  if (loading) {
    return <Loading />;
  }

  // Once loaded, render the client component with the fetched matches
  // and the user's ID (which can be undefined if no user is logged in)
  return <MatchLogClient loggedMatches={matches} userId={user?.uid} />;
}
