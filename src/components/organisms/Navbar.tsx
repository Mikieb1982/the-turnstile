import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <header className="relative sticky top-0 z-30 border-b border-[#203726]/70 bg-gradient-to-r from-[#08130d]/95 via-[#0a1310]/92 to-[#121b24]/95 backdrop-blur">
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#d4af37]/50 bg-[#142319]/80 shadow-[0_14px_30px_rgba(0,0,0,0.55)]">
            <img
              src="/logodark.png"
              alt="The Turnstile Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="absolute -bottom-3 rounded-full bg-[#1c2a1f] px-2 py-0.5 text-[0.6rem] font-semibold tracking-[0.22em] text-[#d4af37] uppercase shadow-[0_6px_14px_rgba(0,0,0,0.6)]">
              Rugby
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-[0.22em] text-[#f6f3e4]">The Turnstile</h1>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.5em] text-[#96b09a]">Rugby League Passport</p>
          </div>
        </div>
        <button
          type="button"
          className="group relative flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#0b150f]/80 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#f8f5e6] shadow-[0_10px_25px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-[#d4af37]/80 hover:text-white"
        >
          <span className="text-lg">👤</span>
          <span className="hidden sm:inline">Member</span>
          <span className="absolute inset-x-0 -bottom-3 mx-auto h-0.5 w-8 rounded-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      </div>
    </header>
  );
};
