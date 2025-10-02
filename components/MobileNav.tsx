import React from 'react';
import type { View, AuthUser } from '../types';
import {
  CalendarIcon,
  CalendarDaysIcon,
  TableCellsIcon,
  ListBulletIcon,
  UserCircleIcon,
  UsersIcon,
  LocationMarkerIcon,
  BuildingStadiumIcon,
  InformationCircleIcon,
  TrophyIcon,
  ChartBarIcon,
  LogoIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from './Icons';

interface MobileNavProps {
  currentView: View;
  setView: (view: View) => void;
  currentUser: AuthUser | null;
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

type NavItem = {
  view: View;
  label: string;
  description?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  isProtected?: boolean;
};

const primaryItems: NavItem[] = [
  { view: 'UPCOMING', label: 'Next 7 Days', description: 'Quick look at the coming week', icon: CalendarIcon },
  { view: 'NEARBY', label: 'Nearby', description: 'Matches closest to you', icon: LocationMarkerIcon },
  { view: 'MATCH_DAY', label: 'Fixtures & Results', description: 'Full calendar of the season', icon: CalendarDaysIcon },
  { view: 'LEAGUE_TABLE', label: 'League Table', description: 'Track club standings', icon: TableCellsIcon },
  { view: 'GROUNDS', label: 'Grounds', description: 'Explore Super League stadiums', icon: BuildingStadiumIcon },
  { view: 'COMMUNITY', label: 'Community', description: 'Connect with fellow supporters', icon: UsersIcon },
  { view: 'ABOUT', label: 'About', description: 'Learn about The Scrum Book', icon: InformationCircleIcon },
];

const supporterItems: NavItem[] = [
  { view: 'MY_MATCHES', label: 'My Matches', description: 'Your attended fixtures', icon: ListBulletIcon, isProtected: true },
  { view: 'STATS', label: 'My Stats', description: 'Personal supporter insights', icon: ChartBarIcon, isProtected: true },
  { view: 'BADGES', label: 'Badges', description: 'Earned supporter milestones', icon: TrophyIcon, isProtected: true },
  { view: 'PROFILE', label: 'Profile', description: 'Manage your supporter profile', icon: UserCircleIcon, isProtected: true },
];

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView, currentUser, isOpen, onClose, theme, toggleTheme }) => {
  const handleNavigate = (view: View) => {
    setView(view);
    onClose();
  };

  return (
    <>
      <div
        className={`md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <nav
        className={`md:hidden fixed inset-y-0 left-0 z-40 w-80 max-w-[calc(100%-4rem)] transform bg-surface border-r border-border shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-border/70 bg-surface-alt/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-10 w-10" theme={theme} />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-subtle">The Scrum Book</span>
              <span className="text-lg font-heading text-text-strong">Matchday Companion</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-subtle transition-colors hover:bg-surface hover:text-text"
            aria-label="Close navigation menu"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-5 py-6 space-y-6 overflow-y-auto h-full pb-24">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-text-subtle mb-4">Main Navigation</h2>
            <ul className="space-y-2">
              {primaryItems.map(({ view, label, description, icon: Icon }) => {
                const isActive = currentView === view;
                return (
                  <li key={view}>
                    <button
                      onClick={() => handleNavigate(view)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                        isActive
                          ? 'border-primary/50 bg-primary/15 text-primary shadow-card'
                          : 'border-transparent bg-surface-alt/50 text-text hover:border-border/80 hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                            isActive
                              ? 'border-primary/40 bg-primary/20 text-primary'
                              : 'border-border/70 bg-surface text-text-subtle'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-heading text-lg text-text-strong">{label}</p>
                          {description && <p className="text-xs text-text-subtle">{description}</p>}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-text-subtle mb-4">Supporter Hub</h2>
            <ul className="space-y-2">
              {supporterItems.map(({ view, label, description, icon: Icon, isProtected }) => {
                const isActive = currentView === view;
                const disabled = isProtected && !currentUser;
                return (
                  <li key={view}>
                    <button
                      onClick={() => !disabled && handleNavigate(view)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors duration-200 ${
                        disabled
                          ? 'cursor-not-allowed border-border/40 bg-surface-alt/30 text-text-subtle'
                          : isActive
                            ? 'border-primary/50 bg-primary/15 text-primary shadow-card'
                            : 'border-transparent bg-surface-alt/50 text-text hover:border-border/80 hover:bg-surface'
                      }`}
                      aria-disabled={disabled}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                            isActive
                              ? 'border-primary/40 bg-primary/20 text-primary'
                              : 'border-border/70 bg-surface text-text-subtle'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-heading text-lg text-text-strong">{label}</p>
                          {description && <p className="text-xs text-text-subtle">{description}</p>}
                          {disabled && (
                            <p className="text-[11px] font-medium text-danger mt-1">Login required</p>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-xl border border-border/70 bg-surface-alt/40 px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-lg text-text-strong">Appearance</p>
                <p className="text-xs text-text-subtle">Switch between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface px-3 py-2 text-sm font-semibold text-text-subtle transition-colors hover:text-text hover:border-border"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <>
                    <SunIcon className="h-4 w-4" />
                    <span>Light</span>
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-4 w-4" />
                    <span>Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-surface-alt/60 px-4 py-4 text-sm text-text-subtle">
            <p className="font-heading text-text-strong text-lg">Matchday Tip</p>
            <p className="mt-2">
              Keep your supporter log up to date to unlock new badges and season-long stats. Tap “My Matches” after every game you attend.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};
