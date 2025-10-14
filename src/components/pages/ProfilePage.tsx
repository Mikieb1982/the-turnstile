import React from 'react';
import { BadgeIcon } from '../atoms/BadgeIcon';

const mockBadges = [
  { id: 1, name: 'First Kick-Off', icon: '🏉', earned: true },
  { id: 2, name: 'On Tour', icon: '🚌', earned: true },
  { id: 3, name: 'Season Ticket', icon: '🎫', earned: false },
  { id: 4, name: 'Stadium Hunter', icon: '🏟️', earned: true },
  { id: 5, name: 'Super Fan', icon: '⭐', earned: false },
  { id: 6, name: 'Derby Day', icon: '⚔️', earned: false },
];

export const ProfilePage: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">My Profile</h2>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Rugby Fan</h3>
            <p className="text-gray-400">Member since Oct 2025</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-3">My Badges</h3>
        <div className="grid grid-cols-3 gap-3">
          {mockBadges.map((badge) => (
            <BadgeIcon
              key={badge.id}
              name={badge.name}
              icon={badge.icon}
              earned={badge.earned}
              onClick={() => alert(`Badge: ${badge.name}`)}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6 text-center text-gray-400">
        <p>More profile features coming soon!</p>
      </div>
    </div>
  );
};