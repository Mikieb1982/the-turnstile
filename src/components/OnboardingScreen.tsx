import React from 'react'

type Props = {
  onSignIn: () => void
  onGuest: () => void
}

export default function OnboardingScreen({ onSignIn, onGuest }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <img
        src="/background.png"
        alt="Stadium turnstiles"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/85 to-background" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center text-text">
        <div className="space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-surface/80 text-2xl font-semibold text-text-strong shadow-card">
            TT
          </div>
          <h1 className="text-3xl font-semibold text-text-strong sm:text-4xl">The Turnstile</h1>
          <p className="max-w-md text-sm text-text-subtle sm:text-base">
            Log every roar. Track every away day. Your personal rugby league companion is ready when you are.
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-4">
          <button
            onClick={onSignIn}
            className="flex items-center justify-center gap-3 rounded-2xl bg-white/90 px-6 py-3 text-sm font-semibold text-background transition hover:bg-white"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4285F4] text-xs font-bold text-white">
              G
            </span>
            Sign In with Google
          </button>
          <button
            onClick={onGuest}
            className="rounded-2xl border border-border/70 bg-surface/70 px-6 py-3 text-sm font-semibold text-text transition hover:border-text/40 hover:text-text-strong"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
