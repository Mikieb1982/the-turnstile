import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';
import { ArrowLeftIcon } from './Icons';

interface MobileBottomBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setView }) => {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setView('UPCOMING');
    }
  };

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface/95 backdrop-blur">
      <div className="flex items-center gap-2 overflow-x-auto px-3 py-2">
        <button
          type="button"
          onClick={handleBack}
          className="flex shrink-0 items-center gap-1 rounded-full border border-border/70 bg-surface-alt/70 px-3 py-1.5 text-xs font-semibold text-text-subtle transition-colors hover:border-border hover:text-text"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </button>
        {mainNavigationItems.map(({ label, view }) => {
          const isActive = currentView === view;
          return (
            <button
              key={view}
              type="button"
              onClick={() => setView(view)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-primary/15 text-primary border border-primary/40 shadow-sm'
                  : 'text-text-subtle hover:text-text hover:bg-surface-alt/80 border border-transparent'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
