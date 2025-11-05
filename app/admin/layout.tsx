'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading'; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Force refresh the token to get the latest custom claims
          const idTokenResult = await currentUser.getIdTokenResult(true);
          const claims = idTokenResult.claims;
          
          if (claims.admin === true) {
            setIsAdmin(true);
          } else {
            // User is logged in but not an admin
            console.warn('User is not an admin. Redirecting...');
            router.push('/dashboard'); 
          }
        } catch (error) {
          console.error("Error fetching user claims:", error);
          router.push('/dashboard');
        }
      } else {
        // Not logged in
        router.push('/sign-in');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    // This provides a fallback UI while redirecting
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark text-white p-4">
        <h1 className="font-display text-4xl font-bold mb-4">Access Denied</h1>
        <p className="font-body text-lg text-center text-gray-400 mb-8">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  // Render the admin layout for verified admins
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-5xl font-bold text-primary mb-6">Admin Panel</h1>
        <nav className="flex gap-6 mb-8 border-b border-gray-700 pb-3">
            <Link href="/admin" className="font-body text-lg text-gray-300 hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/admin/teams" className="font-body text-lg text-gray-300 hover:text-primary transition-colors">Teams</Link>
            <Link href="/admin/fixtures" className="font-body text-lg text-gray-300 hover:text-primary transition-colors">Fixtures & Results</Link>
        </nav>
        <div>
            {children}
        </div>
      </div>
    </div>
  );
}
