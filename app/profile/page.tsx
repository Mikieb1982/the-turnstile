// app/profile/page.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/firebase/AuthContext';
import ProfileClientPage from './ProfileClientPage';
import Loading from '../loading';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TeamInfo, User as FirestoreUser } from '@/types';

// Define types for data fetching
type Team = TeamInfo & { id: string };
type UserProfile = Partial<FirestoreUser>;

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          // 1. Fetch Teams
          const teamsCollection = collection(db, 'teams');
          const q = query(teamsCollection, orderBy('name', 'asc'));
          const teamsSnapshot = await getDocs(q);
          const teamsData = teamsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Team[];
          setTeams(teamsData);

          // 2. Fetch User Profile from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfile(userDocSnap.data() as UserProfile);
          } else {
            setProfile({}); // No profile exists yet, pass empty object
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
          setProfile({}); // Set empty profile on error
        } finally {
          setLoadingData(false);
        }
      };
      fetchData();
    } else if (!authLoading) {
      // Not logged in, no data to load
      setLoadingData(false);
    }
  }, [user, authLoading]);

  // Show main loading spinner while auth or data is loading
  if (authLoading || (user && loadingData)) {
    return <Loading />;
  }

  // If auth is done and there is no user, show login prompt
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-primary">
        <h1 className="font-display text-4xl font-bold mb-4">
          You are not logged in.
        </h1>
        <p className="font-body text-lg text-center text-text-secondary mb-8">
          Please sign in to view and edit your profile.
        </p>
        <Link href="/sign-in" legacyBehavior>
          <a className="bg-primary hover:bg-green-600 text-background font-bold py-3 px-6 rounded-lg transition-colors">
            Sign In
          </a>
        </Link>
      </div>
    );
  }

  // If we are here, user is logged in and data is loaded
  return <ProfileClientPage user={user} profile={profile} teams={teams} />;
}
