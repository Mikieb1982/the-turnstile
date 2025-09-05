import React from 'react';

interface TeamLogoProps {
  logoUrl?: string | null; // Kept for prop compatibility but will not be used
  teamName: string;
  size?: 'small' | 'medium';
  className?: string;
}

// Generates initials from the team name, taking the first letter of up to the first two words.
const getInitials = (name: string): string => {
    if (!name) return '?';
    return name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

// A list of tailwind background colors for variety.
const BG_COLORS = [
    'bg-red-500',
    'bg-blue-600',
    'bg-sky-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-indigo-600',
    'bg-pink-500',
    'bg-slate-700',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-purple-600',
    'bg-lime-500',
];

// Creates a consistent hash from a string to pick a color.
// This ensures that a team always gets the same color.
const getColorForTeam = (teamName: string): string => {
    if (!teamName) return 'bg-gray-400';
    let hash = 0;
    for (let i = 0; i < teamName.length; i++) {
        hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    const index = Math.abs(hash % BG_COLORS.length);
    return BG_COLORS[index];
};


export const TeamLogo: React.FC<TeamLogoProps> = ({ teamName, size = 'medium', className }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10 md:w-12 md:h-12',
    };

    const textSizeClasses = {
        small: 'text-[10px]',
        medium: 'text-base md:text-lg',
    };
    
    const initials = getInitials(teamName);
    const colorClass = getColorForTeam(teamName);

    return (
        <div className={`rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border border-black/10 dark:border-white/10 ${sizeClasses[size]} ${colorClass} ${className}`}>
            <span className={`font-bold text-white select-none ${textSizeClasses[size]}`}>{initials}</span>
        </div>
    );
};
