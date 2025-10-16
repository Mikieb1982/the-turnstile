import React, { useState } from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
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
  onSignup,
  onPasswordReset,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [activeRequest, setActiveRequest] = useState<ActiveRequest>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [forgotForm, setForgotForm] = useState({ identifier: '' });

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

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeRequest) return;

    if (!signupForm.name.trim() || !signupForm.email.trim() || !signupForm.password.trim()) {
      setFeedback({ type: 'error', message: 'Please fill out all fields to create an account.' });
      return;
    }

    setRequest('signup');
    try {
      await onSignup(signupForm);
      setFeedback({ type: 'success', message: 'Welcome! Check your email for a verification link.' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'Could not create an account. Please try again.'),
      });
    } finally {
      resetRequest();
    }
  };

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeRequest) return;

    if (!forgotForm.identifier.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your email to reset your password.' });
      return;
    }

    setRequest('forgot');
    try {
      await onPasswordReset(forgotForm.identifier);
      setFeedback({ type: 'success', message: 'Password reset email sent! Check your inbox.' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'Could not send reset email. Please try again.'),
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
          <h1 className="mt-3 text-3xl font-heading font-bold leading-snug">
            {mode === 'login' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h1>
        </div>

        {mode === 'login' && (
          <form className="relative mt-8 space-y-5" onSubmit={handleCredentialLogin}>
            {/* Login form fields */}
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
          </form>
        )}

        {mode === 'signup' && (
          <form className="relative mt-8 space-y-5" onSubmit={handleSignup}>
            {/* Signup form fields */}
            <div>
              <label className="sr-only" htmlFor="signup-name">
                Name
              </label>
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
                <UserIcon className="h-5 w-5 text-white/70" />
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                  value={signupForm.name}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
                  disabled={busy('signup')}
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="signup-email">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
                <EnvelopeIcon className="h-5 w-5 text-white/70" />
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                  value={signupForm.email}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
                  disabled={busy('signup')}
                />
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="signup-password">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
                <LockClosedIcon className="h-5 w-5 text-white/70" />
                <input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                  value={signupForm.password}
                  onChange={(event) => setSignupForm((prev) => ({ ...prev, password: event.target.value }))}
                  disabled={busy('signup')}
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-brand-navy shadow-[0px_12px_35px_rgba(11,16,32,0.45)] transition hover:bg-white/90 disabled:opacity-70"
              disabled={busy('signup')}
            >
              Create Account
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <form className="relative mt-8 space-y-5" onSubmit={handlePasswordReset}>
            {/* Forgot password form fields */}
            <div>
              <label className="sr-only" htmlFor="forgot-identifier">
                Email
              </label>
              <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
                <EnvelopeIcon className="h-5 w-5 text-white/70" />
                <input
                  id="forgot-identifier"
                  type="text"
                  autoComplete="username"
                  placeholder="Email"
                  className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                  value={forgotForm.identifier}
                  onChange={(event) => setForgotForm((prev) => ({ ...prev, identifier: event.target.value }))}
                  disabled={busy('forgot')}
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-brand-navy shadow-[0px_12px_35px_rgba(11,16,32,0.45)] transition hover:bg-white/90 disabled:opacity-70"
              disabled={busy('forgot')}
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="relative mt-6 text-center">
          {feedback && (
            <div
              className={`text-sm font-medium ${
                feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-center text-sm font-medium text-white/70">
          {mode === 'login' && (
            <>
              Don't have an account?
              <button
                type="button"
                className="ml-2 font-semibold text-white underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white"
                onClick={() => setMode('signup')}
              >
                Sign Up
              </button>
            </>
          )}
          {mode === 'signup' && (
            <>
              Already have an account?
              <button
                type="button"
                className="ml-2 font-semibold text-white underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white"
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
            </>
          )}
          {mode === 'forgot' && (
            <button
              type="button"
              className="font-semibold text-white underline decoration-white/40 decoration-dotted underline-offset-4 hover:text-white"
              onClick={() => setMode('login')}
            >
              Back to Sign In
            </button>
          )}
        </div>

        <div className="my-6 flex items-center gap-4 text-white/40">
          <span className="h-px flex-1 bg-white/20" />
          <span className="text-xs uppercase tracking-[0.5em]">or</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>
        {canUseGoogle && (
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5 disabled:opacity-70"
            onClick={handleGoogleLogin}
            disabled={busy('google')}
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};
