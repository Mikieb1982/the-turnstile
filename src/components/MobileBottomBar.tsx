import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';

interface MobileBottomBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setView }) => {
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface backdrop-blur">
      <div className="mx-auto w-full max-w-2xl px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-1">
        {/* Changed from a grid to a flexbox for a single row layout */}
        <div className="flex items-center justify-around">
          {mainNavigationItems.map(({ label, view, icon: Icon }) => {
            const isActive = currentView === view;
            return (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                // Updated styles for an icon-only button
                className={`flex h-12 w-16 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-text-subtle hover:text-text hover:bg-surface-alt'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
              >
                {/* Removed the text label and increased icon size for better visibility */}
                <Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
