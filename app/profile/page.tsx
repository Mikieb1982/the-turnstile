// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/firebase/AuthContext';
import Loading from '@/app/loading';
import ProfileClientPage from './ProfileClientPage';
import { TeamInfo, User as FirestoreUser } from '@/types';

type Team = TeamInfo & { id: string };
type UserProfile = Partial<FirestoreUser>;

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace('/sign-in');
      return;
    }

    if (user) {
      (async () => {
        try {
          const [teamsSnap, userSnap] = await Promise.all([
            getDocs(query(collection(db, 'teams'), orderBy('name', 'asc'))),
            getDoc(doc(db, 'users', user.uid)),
          ]);

          setTeams(teamsSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Team)));
          setProfile(userSnap.exists() ? (userSnap.data() as UserProfile) : {});
        } catch (e) {
          console.error('Profile fetch error:', e);
          setProfile({});
        } finally {
          setLoadingData(false);
        }
      })();
    }
  }, [user, authLoading, router]);

  if (authLoading || loadingData) return <Loading />;

  return <ProfileClientPage user={user!} profile={profile} teams={teams} />;
}
