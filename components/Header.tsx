import React from 'react';
import { CalendarIcon, InformationCircleIcon, TableCellsIcon, SunIcon, MoonIcon, CalendarDaysIcon, UserCircleIcon, BuildingStadiumIcon, LogoIcon, LocationMarkerIcon, UsersIcon, ArrowRightOnRectangleIcon, ClipboardDocumentCheckIcon } from './Icons';
import type { View } from '../types';
import type firebase from 'firebase/compat/app';


interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  theme: string;
  toggleTheme: () => void;
  currentUser: firebase.User | null;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, theme, toggleTheme, currentUser }) => {
  const NavButton: React.FC<{
    view: View;
    label: string;
    icon: React.ReactNode;
  }> = ({ view, label, icon }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => setView(view)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors duration-200 border-b-[3px] rounded-t-sm ${
          isActive
            ? 'text-primary border-primary'
            : 'text-text-subtle border-transparent hover:text-text hover:bg-surface-alt'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  const isProfileActive = ['PROFILE', 'MY_MATCHES', 'STATS', 'BADGES', 'GROUNDS', 'ADMIN'].includes(currentView);

  return (
    <header className="bg-surface shadow-sm sticky top-0 z-10 border-b border-border">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <LogoIcon className="w-8 h-8 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold text-text-strong">The Scrum Book</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setView('PROFILE')}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors duration-200 border-b-[3px] rounded-t-sm ${
                  isProfileActive
                    ? 'text-primary border-primary'
                    : 'text-text-subtle border-transparent hover:text-text hover:bg-surface-alt'
                }`}
              >
                {currentUser ? (
                  <>
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Profile</span>
                  </>
                ) : (
                  <>
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span>Login</span>
                  </>
                )}
              </button>
              <NavButton view="UPCOMING" label="Next 7 Days" icon={<CalendarIcon className="w-5 h-5" />} />
              <NavButton view="NEARBY" label="Nearby" icon={<LocationMarkerIcon className="w-5 h-5" />} />
              <NavButton view="MATCH_DAY" label="Fixtures & Results" icon={<CalendarDaysIcon className="w-5 h-5" />} />
              <NavButton view="LEAGUE_TABLE" label="League Table" icon={<TableCellsIcon className="w-5 h-5" />} />
              <NavButton view="GROUNDS" label="Grounds" icon={<BuildingStadiumIcon className="w-5 h-5" />} />
              <NavButton view="PREDICTION_GAMES" label="Predictions" icon={<ClipboardDocumentCheckIcon className="w-5 h-5" />} />
              <NavButton view="COMMUNITY" label="Community" icon={<UsersIcon className="w-5 h-5" />} />
              <NavButton view="ABOUT" label="About" icon={<InformationCircleIcon className="w-5 h-5" />} />
            </nav>
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-text-subtle hover:bg-surface-alt transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
        </div>
      </div>
    </header>
  );
};
