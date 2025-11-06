// app/sign-up/page.tsx
'use client'

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUp } from '@/app/actions';
import GoogleSignInButton from '@/components/google-signin-button';
import Image from 'next/image'; 

const initialState = {
  errors: {},
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      // UPDATE: Use semantic color
      className="w-full bg-primary hover:bg-green-600 text-background font-bold py-3 rounded-lg transition-colors"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing Up...' : 'Sign Up'}
    </button>
  );
}

export default function SignUpPage() {
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    // UPDATE: Use semantic colors
    <div className="bg-background text-text-primary min-h-screen flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-card-glow w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="The Turnstile Logo" width={80} height={80} />
        </div>
        {/* UPDATE: Added app name to title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Create your Turnstile Account</h2>
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
              Email
            </label>
            <input
              // UPDATE: Use semantic colors
              className="w-full bg-surface border border-surface rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              type="email"
              id="email"
              name="email"
              required
            />
            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="password">
              Password
            </label>
            <input
              // UPDATE: Use semantic colors
              className="w-full bg-surface border border-surface rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              id="password"
              name="password"
              required
            />
            {state.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>}
          </div>
          <SubmitButton />
        </form>
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            {/* UPDATE: Use semantic colors */}
            <div className="w-full border-t border-surface"></div>
          </div>
          {/* UPDATE: Use semantic colors */}
          <div className="relative px-2 bg-card text-text-secondary">OR</div>
        </div>
        <GoogleSignInButton />
        <p className="text-center text-text-secondary mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
