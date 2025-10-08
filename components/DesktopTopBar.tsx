import React from 'react';
import type { View } from '../types';
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
    <nav className="hidden md:flex fixed inset-x-0 top-0 z-30 border-b border-border/70 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-3">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 rounded-full border border-border/70 bg-surface-alt/70 px-3 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-border hover:text-primary"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </button>
        <div className="h-6 w-px bg-border/60" aria-hidden="true" />
        <ul className="flex flex-wrap items-center gap-1.5">
          {mainNavigationItems.map(({ label, view }) => {
            const isActive = currentView === view;
            return (
              <li key={view}>
                <button
                  type="button"
                  onClick={() => setView(view)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/40 shadow-sm'
                      : 'text-brand-navy hover:text-primary hover:bg-surface-alt/80 border border-transparent'
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
