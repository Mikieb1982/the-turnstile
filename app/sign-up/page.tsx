'use client'

import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUp } from '@/app/actions';
import GoogleSignInButton from '@/components/google-signin-button';

const initialState = {
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg"
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
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-8">Sign Up</h2>
        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              id="email"
              name="email"
              required
            />
            {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative px-2 bg-gray-800 text-gray-400">OR</div>
        </div>
        <GoogleSignInButton />
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-green-400 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
