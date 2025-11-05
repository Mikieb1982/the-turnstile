'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, IdTokenResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading'; // Assuming you have a root loading component

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const idTokenResult: IdTokenResult = await currentUser.getIdTokenResult(true); // Force refresh
          const claims = idTokenResult.claims;
          
          if (claims.admin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            router.push('/dashboard'); // Not an admin, redirect
          }
        } catch (error) {
          console.error("Error fetching custom claims:", error);
          setIsAdmin(false);
          router.push('/dashboard');
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        router.push('/sign-in'); // Not logged in, redirect
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    // This will be seen briefly before redirect
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background-dark text-white p-4">
            <h1 className="font-display text-4xl font-bold mb-4">Access Denied</h1>
            <p className="font-body text-lg text-center text-gray-400 mb-8">
                You do not have permission to view this page.
            </p>
            <Link href="/dashboard" legacyBehavior>
                <a className="bg-primary hover:bg-green-600 text-background-dark font-bold py-3 px-6 rounded-lg transition-colors">
                Go to Dashboard
                </a>
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-4">Admin Panel</h1>
        <nav className="flex gap-4 mb-8 border-b border-gray-700 pb-2">
            <Link href="/admin" className="font-body text-lg text-gray-300 hover:text-primary">Dashboard</Link>
            <Link href="/admin/teams" className="font-body text-lg text-gray-300 hover:text-primary">Teams</Link>
            <Link href="/admin/fixtures" className="font-body text-lg text-gray-300 hover:text-primary">Fixtures</Link>
        </nav>
        <div>
            {children}
        </div>
      </div>
    </div>
  );
}
