import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';

interface MobileBottomBarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentView, setView }) => {
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-surface/95 backdrop-blur">
      <div className="mx-auto w-full max-w-2xl px-2 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-1">
        <div className="grid grid-flow-col auto-cols-fr items-center gap-1">
          {mainNavigationItems.map(({ label, view, icon: Icon }) => {
            const isActive = currentView === view;
            return (
              <button
                key={view}
                type="button"
                onClick={() => setView(view)}
                className={`flex aspect-square w-full items-center justify-center rounded-full transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-sm'
                    : 'text-text-subtle hover:text-text hover:bg-surface-alt/80 border border-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={label}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
