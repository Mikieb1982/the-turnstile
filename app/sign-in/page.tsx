// app/sign-in/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from '@/components/google-signin-button';
import { useAuth } from '@/lib/firebase/auth'; // <-- IMPORT THE HOOK
import Image from 'next/image';

export default function SignInPage() {
  const { user, loading } = useAuth(); // <-- USE THE HOOK
  const router = useRouter();

  useEffect(() => {
    // If auth is loaded and a user exists, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]); // Re-run when auth state changes

  // Show a loading state while auth is checking
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not loading and no user, show the sign-in page
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image 
            src="/logo.png" 
            alt="The Turnstile Logo" 
            width={100} 
            height={100} 
            className="h-24 w-auto" 
          />
          <h1 className="font-display text-5xl font-bold text-text-primary mt-4">Welcome</h1>
          <p className="font-body text-xl text-text-secondary mt-2">Sign in to access your dashboard</p>
        </div>
        
        <div className="bg-card p-8 rounded-xl shadow-lg w-full">
          <h2 className="font-display text-3xl font-semibold text-text-primary text-center mb-6">
            Sign In
          </h2>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
