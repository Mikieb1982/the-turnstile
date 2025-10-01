import React, { useState } from 'react';
import { LogoIcon } from './Icons';

interface LoginPromptViewProps {
  onLogin: () => Promise<void>;
  theme: 'light' | 'dark';
}

const MISSING_CLIENT_ID_MESSAGE =
  'Google Sign-In requires configuration. Set VITE_GOOGLE_CLIENT_ID in your .env.local file to your OAuth web client ID.';

export const LoginPromptView: React.FC<LoginPromptViewProps> = ({ onLogin, theme }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isGoogleConfigured = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  const handleLogin = async () => {
    setError(null);
    if (!isGoogleConfigured) {
      setError(MISSING_CLIENT_ID_MESSAGE);
      return;
    }
    setIsLoading(true);
    try {
      await onLogin();
    } catch (err) {
      console.error('Google sign-in failed', err);
      const message =
        err instanceof Error
          ? err.message
          : 'Google Sign-In failed. Please check your internet connection and try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface p-8 rounded-xl text-center flex flex-col items-center shadow-card max-w-lg mx-auto mt-4 md:mt-10">
        <LogoIcon className="w-20 h-20 mb-4" theme={theme} />
        <h2 className="text-2xl font-bold text-text-strong mb-2">Create a Profile to Continue</h2>
        <p className="text-text-subtle mb-6">
            Sign in with your Google account to track your attended matches, earn badges, view your personal stats, and connect
            with the community.
        </p>
        <button
            onClick={handleLogin}
            disabled={isLoading || !isGoogleConfigured}

            className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-transform hover:scale-105 shadow-md focus:outline-none focus:ring-4 focus:ring-primary/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {isLoading ? 'Connecting...' : 'Continue with Google'}
        </button>

        {!isGoogleConfigured ? (
            <p className="mt-4 text-sm text-amber-600" role="alert">
                {MISSING_CLIENT_ID_MESSAGE}
            </p>
        ) : null}
        {error ? <p className="mt-4 text-sm text-red-500" role="alert">{error}</p> : null}
    </div>
  );
};
