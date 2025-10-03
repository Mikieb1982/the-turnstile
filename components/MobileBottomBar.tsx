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
      <div className="mx-auto w-full max-w-2xl px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+10px)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-full rounded-full border border-border/70 bg-surface-alt/70 px-3 py-2 text-[11px] font-semibold leading-tight text-text-subtle transition-colors hover:border-border hover:text-text"
            aria-label="Go back"
          >
            <span className="flex items-center justify-center gap-1">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Back</span>
            </span>
          </button>
          {mainNavigationItems.map(({ label, view }) => {
            const isActive = currentView === view;
            return (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                className={`w-full rounded-full px-3 py-2 text-[11px] font-semibold leading-tight transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary border border-primary/40 shadow-sm'
                    : 'text-text-subtle hover:text-text hover:bg-surface-alt/80 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="block whitespace-normal break-words text-center">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
