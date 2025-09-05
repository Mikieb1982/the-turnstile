import React from 'react';
import { RugbyBallIcon } from './Icons';

interface TeamLogoProps {
  logoUrl?: string | null;
  teamName: string;
  size?: 'small' | 'medium';
  className?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ logoUrl, teamName, size = 'medium', className }) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-10 h-10 md:w-12 md:h-12',
    };
    
    const iconSizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
    };

    return (
        <div className={`rounded-full bg-surface flex items-center justify-center overflow-hidden flex-shrink-0 border border-border p-1 ${sizeClasses[size]} ${className}`}>
            {logoUrl ? (
                <img src={logoUrl} alt={`${teamName} logo`} className="max-w-full max-h-full object-contain" />
            ) : (
                <RugbyBallIcon className={`${iconSizeClasses[size]} text-text-subtle/50`} />
            )}
        </div>
    );
};