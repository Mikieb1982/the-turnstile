import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto border-t border-[#213625]/70 bg-[#080f0b]/95">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-[#aebcab] sm:px-6 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-semibold tracking-[0.25em] text-[#f1f0e7]">© {new Date().getFullYear()} The Turnstile</p>
          <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#7e8d7f]">
            Built for rugby league die-hards. Honour the badge, log every turnstile.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.28em]">
          <a href="/privacy" className="transition-colors duration-300 hover:text-[#d4af37]">
            Privacy Policy
          </a>
          <span className="text-[#445442]">•</span>
          <a href="/terms" className="transition-colors duration-300 hover:text-[#d4af37]">
            Terms of Service
          </a>
          <span className="text-[#445442]">•</span>
          <a href="mailto:hello@turnstile.app" className="transition-colors duration-300 hover:text-[#d4af37]">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
