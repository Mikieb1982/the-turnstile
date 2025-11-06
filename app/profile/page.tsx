// app/profile/page.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/firebase/auth';
import ProfileClientPage from './ProfileClientPage'; // Import the new client component
import Loading from '../loading'; // Import the main loading component

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();

  // Show main loading spinner while auth is checking
  if (authLoading) {
    // Use the app-wide loading component
    return <Loading />;
  }

  // If auth is done and there is no user, show login prompt
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-primary">
        <h1 className="font-display text-4xl font-bold mb-4">You are not logged in.</h1>
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

  // If we are here, user is logged in
  // Render the client component with the user data
  return <ProfileClientPage user={user} />;
}
