import React from 'react';
import type { View } from '../types';
import { mainNavigationItems } from './navigationItems';
import { LogoutIcon } from './Icons';

interface MobileNavProps {
  currentView: View;
  setView: (view: View) => void;
  onLogout: () => void;
  theme: 'light' | 'dark';
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView, onLogout, theme }) => {
  const isDarkMode = theme === 'dark';

  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-surface/95 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] backdrop-blur-lg">
      <ul className="grid h-16 grid-cols-5 items-center">
        {mainNavigationItems.map(({ label, view, icon: Icon }) => {
          const isActive = currentView === view;
          const activeClasses = isDarkMode
            ? 'text-primary'
            : 'text-primary';
          const inactiveClasses = isDarkMode
            ? 'text-text/70 hover:text-primary'
            : 'text-brand-navy/70 hover:text-primary';

          return (
            <li key={view} className="h-full">
              <button
                type="button"
                onClick={() => setView(view)}
                className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[0.6rem] font-medium tracking-wide">{label}</span>
              </button>
            </li>
          );
        })}
        <li className="h-full">
          <button
            type="button"
            onClick={onLogout}
            className="flex h-full w-full flex-col items-center justify-center gap-1 text-text/70 transition-colors hover:text-primary"
            aria-label="Log out"
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="text-[0.6rem] font-medium tracking-wide">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
