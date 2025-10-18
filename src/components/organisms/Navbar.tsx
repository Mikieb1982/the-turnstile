import React from 'react';

const navHighlights = [
  'Track every match you attend',
  'Log fixtures even when you are offline',
  'Celebrate your club loyalty badges',
];

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-primary/15 bg-card/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <img
              src="/logo.png"
              alt="The Turnstile logo"
              className="h-9 w-9 object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">The Turnstile</span>
            <h1 className="text-xl font-semibold text-foreground">Rugby League Passport</h1>
            <p className="mt-1 text-sm text-foreground/70">Support smarter. Remember every turnstile.</p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-sm font-medium text-foreground/70 lg:flex" aria-label="Highlighted features">
          {navHighlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-center gap-2 rounded-full bg-secondary/60 px-4 py-2 text-foreground shadow-sm"
            >
              <span aria-hidden="true" className="text-lg text-primary">★</span>
              <span>{highlight}</span>
            </div>
          ))}
        </nav>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          aria-label="Open member profile"
        >
          <span aria-hidden="true" className="text-lg">👤</span>
          <span className="hidden sm:inline">Member area</span>
        </button>
      </div>
    </header>
  );
};
