'use client'

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from '@/app/actions';
import GoogleSignInButton from '@/components/google-signin-button';
import Image from 'next/image'; // Import Image

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Signing In...' : 'Sign In'}
    </button>
  );
}

export default function SignInPage() {
  const [state, formAction] = useFormState(signIn, initialState);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Added Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="The Turnstile Logo" width={80} height={80} />
        </div>
        <h2 className="text-3xl font-bold text-center text-green-400 mb-8">Sign In</h2>
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
          {state.errors?._form && <p className="text-red-500 text-sm mt-1">{state.errors._form}</p>}
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
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-green-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
