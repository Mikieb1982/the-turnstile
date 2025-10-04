'use client';

import React from 'react';
import type { View } from '@/types';
import { mainNavigationItems } from './navigationItems';
import { ArrowLeftIcon } from './Icons';

interface DesktopTopBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const DesktopTopBar: React.FC<DesktopTopBarProps> = ({ currentView, setView }) => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setView('UPCOMING');
    }
  };

  return (
    <nav className="hidden md:flex fixed inset-x-0 top-0 z-30 bg-[rgba(6,13,31,0.78)] backdrop-blur-2xl border-b border-white/10 shadow-[0_25px_80px_-40px_rgba(2,6,23,0.85)]">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-5 px-6 py-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-heading uppercase tracking-[0.3em] text-white transition-all hover:border-white/30 hover:bg-white/20"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </button>
        <div className="h-6 w-px bg-white/20" aria-hidden="true" />
        <ul className="flex flex-wrap items-center gap-2">
          {mainNavigationItems.map(({ label, view }) => {
            const isActive = currentView === view;
            return (
              <li key={view}>
                <button
                  type="button"
                  onClick={() => setView(view)}
                  className={`rounded-full px-4 py-2 text-sm font-heading uppercase tracking-[0.28em] transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary via-primary/80 to-secondary/80 text-white shadow-[0_18px_40px_-20px_rgba(14,165,233,0.9)]'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
