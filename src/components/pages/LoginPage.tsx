import React, { useState } from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
} from '../Icons';

const GOOGLE_CLIENT_ID = typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === 'string'
  ? import.meta.env.VITE_GOOGLE_CLIENT_ID.trim()
  : '';

type AuthMode = 'login' | 'signup' | 'forgot';

interface LoginPromptViewProps {
  theme: 'light' | 'dark';
  onLogin?: () => Promise<void>;
  onEmailLogin: (identifier: string, password: string) => Promise<void>;
  onSignup: (input: { name: string; email: string; password: string }) => Promise<void>;
  onPasswordReset: (identifier: string) => Promise<void>;
}

type ActiveRequest = AuthMode | 'google' | null;

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

export const LoginPage: React.FC<LoginPromptViewProps> = ({
  onLogin,
  onEmailLogin,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [activeRequest, setActiveRequest] = useState<ActiveRequest>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });

  const canUseGoogle = Boolean(onLogin) && Boolean(GOOGLE_CLIENT_ID);

  const setRequest = (request: ActiveRequest) => {
    setActiveRequest(request);
    if (request) {
      setFeedback(null);
    }
  };

  const resetRequest = () => setActiveRequest(null);

  const handleCredentialLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeRequest) return;

    if (!loginForm.identifier.trim() || !loginForm.password.trim()) {
      setFeedback({ type: 'error', message: 'Enter your email and password to continue.' });
      return;
    }

    setRequest('login');
    try {
      await onEmailLogin(loginForm.identifier, loginForm.password);
      setFeedback({ type: 'success', message: 'Welcome back! Loading your profile…' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'Unable to sign in with those details. Please try again.'),
      });
    } finally {
      resetRequest();
    }
  };

  const handleGoogleLogin = async () => {
    if (!canUseGoogle || activeRequest) return;

    setRequest('google');
    try {
      await onLogin?.();
      setFeedback({ type: 'success', message: 'Connecting you with Google…' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'Google sign-in failed. Please try again.'),
      });
    } finally {
      resetRequest();
    }
  };

  const busy = (request: ActiveRequest) => activeRequest === request;

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-[36px] bg-[color:var(--clr-surface-0)] px-8 pb-12 pt-14 text-white shadow-[0px_25px_60px_rgba(11,16,32,0.55)]">
        <div className="relative flex flex-col items-center text-center">
          <h1 className="mt-3 text-3xl font-heading font-bold leading-snug">Sign In</h1>
        </div>

        <form className="relative mt-8 space-y-5" onSubmit={handleCredentialLogin}>
          <div>
            <label className="sr-only" htmlFor="auth-identifier">
              Email
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
              <EnvelopeIcon className="h-5 w-5 text-white/70" />
              <input
                id="auth-identifier"
                type="text"
                autoComplete="username"
                placeholder="Email"
                className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                value={loginForm.identifier}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, identifier: event.target.value }))}
                disabled={busy('login')}
              />
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="auth-password">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
              <LockClosedIcon className="h-5 w-5 text-white/70" />
              <input
                id="auth-password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                value={loginForm.password}
                onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                disabled={busy('login')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-medium text-white/70">
            <button
              type="button"
              className="underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white"
              onClick={() => setMode('forgot')}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-brand-navy shadow-[0px_12px_35px_rgba(11,16,32,0.45)] transition hover:bg-white/90 disabled:opacity-70"
            disabled={busy('login')}
          >
           Sign In
          </button>

          <div className="flex items-center gap-4 text-white/40">
            <span className="h-px flex-1 bg-white/20" />
            <span className="text-xs uppercase tracking-[0.5em]">or</span>
            <span className="h-px flex-1 bg-white/20" />
          </div>
          {canUseGoogle ? (
            <button
              type="button"
              className="w-full rounded-full border border-white/20 bg-transparent py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              onClick={handleGoogleLogin}
              disabled={busy('google')}
            >
             Sign in with Google
            </button>
          ) : null}
            <button
            type="button"
            className="w-full rounded-full border border-white/20 bg-transparent py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            onClick={() => setMode('signup')}
          >
            Create an account
          </button>

        </form>
      </div>
    </div>
  );
}
