import React from 'react';
import { TEAM_BRANDING } from '../services/mockData';

interface TeamLogoProps {
  teamId: string;
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

export const TeamLogo: React.FC<TeamLogoProps> = ({ teamId, teamName, size = 'medium', className = '' }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10 md:w-12 md:h-12',
    };

    const textSizeClasses = {
        small: 'text-[10px]',
        medium: 'text-base md:text-lg',
    };
    
    const initials = getInitials(teamName);
    const branding = TEAM_BRANDING[teamId] || {
        bg: '#6B7280',
        text: '#FFFFFF',
        palette: ['#6B7280', '#9CA3AF'],
    }; // Default palette if no ID match
    const palette = branding.palette ?? [branding.bg, branding.bg];
    const background =
        palette.length > 1
            ? `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`
            : branding.bg;
    const outline = palette.length > 2 ? palette[2] : 'rgba(255, 255, 255, 0.24)';

    return (
        <div
            className={`rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}
            style={{
                background,
                boxShadow: `0 0 0 1px ${outline}`,
            }}
        >
            <span
                className={`font-bold select-none ${textSizeClasses[size]}`}
                style={{ color: branding.text }}
            >
                {initials}
            </span>
        </div>
    );
};
