// app/sign-in/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GoogleSignInButton from '@/components/google-signin-button';
import { useAuth } from '@/lib/firebase/AuthContext';
import Image from 'next/image';
import Loading from '../loading';

export default function SignInPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <Loading />;
  }

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
          <h1 className="font-display text-5xl font-bold text-text-primary mt-4">
            Welcome to The Turnstile
          </h1>
          <p className="font-body text-xl text-text-secondary mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="bg-card p-8 rounded-xl shadow-card-glow w-full">
          <h2 className="font-display text-3xl font-semibold text-text-primary text-center mb-6">
            Sign In
          </h2>
          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
}
