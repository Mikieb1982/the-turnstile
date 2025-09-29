import React from 'react';
import type { View } from '../types';
import { CalendarIcon, TableCellsIcon, ListBulletIcon, UserCircleIcon, UsersIcon, LocationMarkerIcon, ArrowRightOnRectangleIcon, ClipboardDocumentCheckIcon, BuildingStadiumIcon } from './Icons';
import type firebase from 'firebase/compat/app';

interface MobileNavProps {
  currentView: View;
  setView: (view: View) => void;
  currentUser: firebase.User | null;
}

const NavButton: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            className={`flex flex-col items-center justify-center flex-1 py-2 rounded-lg transition-colors duration-200 ${
                isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-text-subtle hover:text-text-strong hover:bg-surface-alt'
            }`}
        >
            {icon}
            <span className="text-xs font-semibold">{label}</span>
        </button>
    );
};


export const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView, currentUser }) => {
    const isProfileActive = ['PROFILE', 'MY_MATCHES', 'STATS', 'BADGES', 'GROUNDS'].includes(currentView);
    
    const navItems: { view: View; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; isActive: boolean }[] = [
        { 
            view: 'PROFILE', 
            label: currentUser ? 'Profile' : 'Login', 
            icon: currentUser ? UserCircleIcon : ArrowRightOnRectangleIcon, 
            isActive: isProfileActive 
        },
        { view: 'UPCOMING', label: 'Upcoming', icon: CalendarIcon, isActive: currentView === 'UPCOMING' },
        { view: 'MATCH_DAY', label: 'Fixtures', icon: ListBulletIcon, isActive: currentView === 'MATCH_DAY' },
        { view: 'LEAGUE_TABLE', label: 'Table', icon: TableCellsIcon, isActive: currentView === 'LEAGUE_TABLE' },
        { view: 'GROUNDS', label: 'Grounds', icon: BuildingStadiumIcon, isActive: currentView === 'GROUNDS' },
        { view: 'PREDICTION_GAMES', label: 'Predictions', icon: ClipboardDocumentCheckIcon, isActive: currentView === 'PREDICTION_GAMES' },
        { view: 'COMMUNITY', label: 'Community', icon: UsersIcon, isActive: currentView === 'COMMUNITY' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-lg z-20 border-t border-border">
            <div className="flex justify-around items-center h-16 gap-1 px-1">
                {navItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <NavButton
                            key={item.view}
                            label={item.label}
                            isActive={item.isActive}
                            onClick={() => setView(item.view)}
                            icon={<Icon className="w-6 h-6 mb-1" />}
                        />
                    );
                })}
            </div>
        </nav>
    );
};
