import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-primary/15 bg-card/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-foreground/70 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="space-y-2">
          <p className="text-base font-semibold text-foreground">© {new Date().getFullYear()} The Turnstile</p>
          <p className="max-w-lg text-sm text-foreground/70">
            Built for rugby league fans worldwide. Keep a joyful record of every match you attend and every badge you earn.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium" aria-label="Footer links">
          <a
            href="/privacy"
            className="rounded-full bg-secondary/60 px-3 py-1 text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            Privacy policy
          </a>
          <a
            href="/terms"
            className="rounded-full bg-secondary/60 px-3 py-1 text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            Terms of use
          </a>
          <a
            href="mailto:hello@turnstile.app"
            className="rounded-full bg-secondary/60 px-3 py-1 text-foreground transition-colors duration-200 hover:bg-secondary"
          >
            Contact support
          </a>
        </nav>
      </div>
    </footer>
  );
};
