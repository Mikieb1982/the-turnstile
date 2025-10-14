import React from 'react';

interface BadgeIconProps {
  name: string;
  icon: string;
  earned: boolean;
  onClick?: () => void;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ name, icon, earned, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-all ${
      earned
        ? 'bg-cyan-500/20 border-2 border-cyan-500'
        : 'bg-gray-800/50 border-2 border-gray-700 opacity-50'
    } hover:scale-105`}
  >
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-xs text-center font-semibold">{name}</p>
  </div>
);