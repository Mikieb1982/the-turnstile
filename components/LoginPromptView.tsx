import React, { useEffect, useMemo, useState } from 'react';
import {
  LogoIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MiniSpinnerIcon,
} from './Icons';

const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID ??
  '99200945430-kr928f1b59vma8d9ulck20un5mqw6sfl.apps.googleusercontent.com').trim();

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

const getFeedbackClasses = (mode: AuthMode, type: 'success' | 'error') => {
  const palette = {
    login: {
      success: 'bg-emerald-400/10 text-emerald-100 border-emerald-300/60',
      error: 'bg-rose-500/10 text-rose-100 border-rose-400/60',
    },
    signup: {
      success: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      error: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    forgot: {
      success: 'bg-emerald-400/10 text-emerald-100 border-emerald-300/60',
      error: 'bg-rose-500/10 text-rose-100 border-rose-400/60',
    },
  } as const;

  return palette[mode][type];
};

export const LoginPromptView: React.FC<LoginPromptViewProps> = ({
  theme,
  onLogin,
  onEmailLogin,
  onSignup,
  onPasswordReset,
}) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [activeRequest, setActiveRequest] = useState<ActiveRequest>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptsTerms: false,
  });
  const [forgotForm, setForgotForm] = useState({ email: '' });

  const isGoogleConfigured = useMemo(() => Boolean(GOOGLE_CLIENT_ID), []);
  const canUseGoogle = Boolean(onLogin) && isGoogleConfigured;

  useEffect(() => {
    setFeedback(null);
  }, [mode]);

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
      setFeedback({ type: 'error', message: 'Enter your email (or phone) and password to continue.' });
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

    if (!signupForm.acceptsTerms) {
      setFeedback({ type: 'error', message: 'Please agree to the Terms & Privacy to continue.' });
      return;
    }

    if (!signupForm.name.trim()) {
      setFeedback({ type: 'error', message: 'Enter your full name so we know what to call you.' });
      return;
    }

    if (!signupForm.email.trim()) {
      setFeedback({ type: 'error', message: 'Enter an email address to create your account.' });
      return;
    }

    if (signupForm.password.length < 6) {
      setFeedback({ type: 'error', message: 'Passwords need to be at least 6 characters long.' });
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setFeedback({ type: 'error', message: 'Passwords do not match. Please re-type them.' });
      return;
    }

    setRequest('signup');
    try {
      await onSignup({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
      });
      setFeedback({ type: 'success', message: 'Account created! Setting up your experience…' });
      setSignupForm({ name: '', email: '', password: '', confirmPassword: '', acceptsTerms: false });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'We could not create your account just yet. Try again shortly.'),
      });
    } finally {
      resetRequest();
    }
  };

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeRequest) return;

    if (!forgotForm.email.trim()) {
      setFeedback({ type: 'error', message: 'Enter the email linked to your account.' });
      return;
    }

    setRequest('forgot');
    try {
      await onPasswordReset(forgotForm.email);
      setFeedback({
        type: 'success',
        message: 'Check your inbox for reset instructions (they may be in spam).',
      });
      setForgotForm({ email: '' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: getErrorMessage(error, 'We could not find that email. Double check and try again.'),
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

  const renderFeedback = () => {
    if (!feedback) {
      return null;
    }
    return (
      <div
        className={`mt-5 rounded-full border px-5 py-2 text-sm font-medium tracking-wide ${getFeedbackClasses(
          mode,
          feedback.type
        )}`}
      >
        {feedback.message}
      </div>
    );
  };

  const busy = (request: ActiveRequest) => activeRequest === request;

  const renderLoginCard = () => (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-[36px] bg-[#031a29] px-8 pb-12 pt-14 text-white shadow-[0px_25px_60px_rgba(3,26,41,0.55)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#103852] opacity-50 blur-3xl" />
          <LogoIcon
            className="absolute -top-28 left-1/2 h-60 w-60 -translate-x-1/2 opacity-[0.08]"
            theme="dark"
            aria-hidden
          />
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/5 shadow-[0px_15px_35px_rgba(3,19,31,0.45)]">
            <LogoIcon className="h-12 w-12 drop-shadow" theme={theme} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.55em] text-white/70">The Scrum Book</p>
          <h1 className="mt-3 text-3xl font-heading font-bold leading-snug">Rugby League Check In</h1>
          <p className="mt-3 max-w-xs text-sm text-white/60">
            Sign in to manage your matchdays, track your stats, and stay connected with the rugby league community.
          </p>
        </div>

        <form className="relative mt-8 space-y-5" onSubmit={handleCredentialLogin}>
          <div>
            <label className="sr-only" htmlFor="auth-identifier">
              Email or phone number
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-base transition focus-within:border-white/60 focus-within:bg-white/10">
              <EnvelopeIcon className="h-5 w-5 text-white/70" />
              <input
                id="auth-identifier"
                type="text"
                autoComplete="username"
                placeholder="Email or Phone"
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
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-[#032130] shadow-[0px_12px_35px_rgba(3,19,31,0.45)] transition hover:bg-white/90 disabled:opacity-70"
            disabled={busy('login')}
          >
            {busy('login') ? (
              <>
                <MiniSpinnerIcon className="h-5 w-5 animate-spin text-[#032130]" />
                Logging in…
              </>
            ) : (
              'Login'
            )}
          </button>

          <div className="flex items-center gap-4 text-white/40">
            <span className="h-px flex-1 bg-white/20" />
            <span className="text-xs uppercase tracking-[0.5em]">or</span>
            <span className="h-px flex-1 bg-white/20" />
          </div>

          <button
            type="button"
            className="w-full rounded-full border border-white/20 bg-transparent py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            onClick={() => setMode('signup')}
          >
            Create an account
          </button>

          {canUseGoogle ? (
            <button
              type="button"
              className="w-full rounded-full border border-white/20 bg-transparent py-3 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              onClick={handleGoogleLogin}
              disabled={busy('google')}
            >
              {busy('google') ? 'Connecting to Google…' : 'Continue with Google'}
            </button>
          ) : null}

          {!canUseGoogle && onLogin && !isGoogleConfigured ? (
            <p className="text-center text-xs text-white/50">
              Google Sign-In isn&apos;t configured. Set <code className="rounded bg-black/30 px-1">VITE_GOOGLE_CLIENT_ID</code> to enable it.
            </p>
          ) : null}

          {renderFeedback()}
        </form>
      </div>
    </div>
  );

  const renderSignupCard = () => (
    <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[36px] bg-white shadow-[0px_25px_60px_rgba(3,26,41,0.35)]">
      <div className="relative bg-[#031d2c] px-10 pb-12 pt-16 text-white">
        <LogoIcon className="absolute -right-14 -top-14 h-40 w-40 opacity-[0.08]" theme="dark" aria-hidden />
        <p className="text-lg font-semibold uppercase tracking-[0.35em] text-white/60">Let&apos;s</p>
        <h2 className="mt-3 text-4xl font-heading leading-[1.15]">
          Create
          <br />
          Your Account
        </h2>
        <p className="mt-4 max-w-sm text-sm text-white/70">
          Join the community, track your matchdays, and unlock exclusive rugby league stats.
        </p>
      </div>

      <form className="bg-white px-10 py-10" onSubmit={handleSignup}>
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-full border border-[#0b2a2f1f] bg-[#f5f7fa] px-5 py-3 transition focus-within:border-[#0B2A2F]">
            <UserCircleIcon className="h-5 w-5 text-[#0B2A2F]/60" />
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="w-full bg-transparent text-base text-[#0B2A2F] placeholder:text-[#0B2A2F]/40 focus:outline-none"
              value={signupForm.name}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, name: event.target.value }))}
              disabled={busy('signup')}
            />
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#0b2a2f1f] bg-[#f5f7fa] px-5 py-3 transition focus-within:border-[#0B2A2F]">
            <EnvelopeIcon className="h-5 w-5 text-[#0B2A2F]/60" />
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              className="w-full bg-transparent text-base text-[#0B2A2F] placeholder:text-[#0B2A2F]/40 focus:outline-none"
              value={signupForm.email}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, email: event.target.value }))}
              disabled={busy('signup')}
            />
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#0b2a2f1f] bg-[#f5f7fa] px-5 py-3 transition focus-within:border-[#0B2A2F]">
            <LockClosedIcon className="h-5 w-5 text-[#0B2A2F]/60" />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full bg-transparent text-base text-[#0B2A2F] placeholder:text-[#0B2A2F]/40 focus:outline-none"
              value={signupForm.password}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, password: event.target.value }))}
              disabled={busy('signup')}
            />
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#0b2a2f1f] bg-[#f5f7fa] px-5 py-3 transition focus-within:border-[#0B2A2F]">
            <LockClosedIcon className="h-5 w-5 text-[#0B2A2F]/60" />
            <input
              type="password"
              placeholder="Retype Password"
              autoComplete="new-password"
              className="w-full bg-transparent text-base text-[#0B2A2F] placeholder:text-[#0B2A2F]/40 focus:outline-none"
              value={signupForm.confirmPassword}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
              disabled={busy('signup')}
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-[#0B2A2F]/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-[#0B2A2F]/30 text-[#0B2A2F] focus:ring-[#0B2A2F]"
              checked={signupForm.acceptsTerms}
              onChange={(event) => setSignupForm((prev) => ({ ...prev, acceptsTerms: event.target.checked }))}
              disabled={busy('signup')}
            />
            <span>
              I agree to the <span className="font-semibold text-[#0B2A2F]">Terms &amp; Privacy</span>
            </span>
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d9e4ec] py-3 text-base font-semibold text-[#0B2A2F] transition hover:bg-[#c8d7e2] disabled:opacity-60"
            disabled={busy('signup')}
          >
            {busy('signup') ? (
              <>
                <MiniSpinnerIcon className="h-5 w-5 animate-spin text-[#0B2A2F]" />
                Signing you up…
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          {renderFeedback()}

          <p className="mt-6 text-center text-sm text-[#0B2A2F]/70">
            Have an account?
            <button
              type="button"
              className="ml-1 font-semibold text-[#0B2A2F] underline decoration-dotted underline-offset-4"
              onClick={() => setMode('login')}
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );

  const renderForgotCard = () => (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[36px] bg-white text-[#0B2A2F] shadow-[0px_25px_60px_rgba(3,26,41,0.35)]">
      <div className="px-10 pb-8 pt-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0B2A2F]/10 text-[#0B2A2F]">
          <LockClosedIcon className="h-7 w-7" />
        </div>
        <h2 className="text-3xl font-heading font-semibold text-[#133347]">Forgot Password?</h2>
        <p className="mt-3 text-sm text-[#375566]">No worries, we&apos;ll send you reset instructions.</p>
      </div>

      <div className="relative bg-[#031d2c] px-10 pb-10 pt-10 text-white">
        <LogoIcon className="pointer-events-none absolute -bottom-10 right-8 h-28 w-28 opacity-[0.08]" theme="dark" aria-hidden />
        <form className="space-y-6" onSubmit={handleForgotPassword}>
          <div>
            <label className="sr-only" htmlFor="forgot-email">
              Email address
            </label>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 transition focus-within:border-white focus-within:bg-white/20">
              <EnvelopeIcon className="h-5 w-5 text-white/80" />
              <input
                id="forgot-email"
                type="email"
                placeholder="Enter your Email"
                autoComplete="email"
                className="w-full bg-transparent text-base text-white placeholder:text-white/60 focus:outline-none"
                value={forgotForm.email}
                onChange={(event) => setForgotForm({ email: event.target.value })}
                disabled={busy('forgot')}
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-base font-semibold text-[#031d2c] shadow-[0px_10px_40px_rgba(0,0,0,0.35)] transition hover:bg-white/95 disabled:opacity-70"
            disabled={busy('forgot')}
          >
            {busy('forgot') ? (
              <>
                <MiniSpinnerIcon className="h-5 w-5 animate-spin text-[#031d2c]" />
                Sending reset link…
              </>
            ) : (
              'Reset Password'
            )}
          </button>

          {renderFeedback()}

          <button
            type="button"
            className="mx-auto block text-sm font-semibold text-white/80 underline decoration-dotted underline-offset-4 hover:text-white"
            onClick={() => setMode('login')}
          >
            Back to Login
          </button>
        </form>
        <div className="mt-8 flex justify-center">
          <LogoIcon className="h-8 w-8 opacity-80" theme="dark" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-10 sm:py-12">
      {mode === 'login' ? renderLoginCard() : null}
      {mode === 'signup' ? renderSignupCard() : null}
      {mode === 'forgot' ? renderForgotCard() : null}
    </div>
  );
};
