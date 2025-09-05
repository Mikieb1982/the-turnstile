import React from 'react';
import type { View } from '../App';
import { CalendarIcon, TableCellsIcon, CalendarDaysIcon, UserCircleIcon, BuildingStadiumIcon } from './Icons';

interface MobileNavProps {
  currentView: View;
  setView: (view: View) => void;
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
            className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-text-subtle hover:text-primary'
            }`}
        >
            {icon}
            <span className={`text-xs font-semibold ${isActive ? 'text-primary' : 'text-text-subtle'}`}>{label}</span>
        </button>
    );
};


export const MobileNav: React.FC<MobileNavProps> = ({ currentView, setView }) => {
    const isProfileActive = ['PROFILE', 'MY_MATCHES', 'STATS', 'BADGES', 'GROUNDS'].includes(currentView);
    
    const navItems: { view: View; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; isActive: boolean }[] = [
        { view: 'PROFILE', label: 'Profile', icon: UserCircleIcon, isActive: isProfileActive },
        { view: 'UPCOMING', label: 'Upcoming', icon: CalendarIcon, isActive: currentView === 'UPCOMING' },
        { view: 'MATCH_DAY', label: 'Fixtures', icon: CalendarDaysIcon, isActive: currentView === 'MATCH_DAY' },
        { view: 'LEAGUE_TABLE', label: 'Table', icon: TableCellsIcon, isActive: currentView === 'LEAGUE_TABLE' },
        { view: 'TEAM_STATS', label: 'Teams', icon: BuildingStadiumIcon, isActive: currentView === 'TEAM_STATS' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-lg z-20 border-t border-border">
            <div className="flex justify-around items-center h-16">
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