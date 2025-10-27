<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
import { BadgeIcon } from '../atoms/BadgeIcon';

const mockBadges = [
  { id: 1, name: 'First Kick-Off', icon: '🏉', earned: true },
  { id: 2, name: 'On Tour', icon: '🚌', earned: true },
  { id: 3, name: 'Season Ticket', icon: '🎫', earned: false },
  { id: 4, name: 'Stadium Hunter', icon: '🏟️', earned: true },
  { id: 5, name: 'Super Fan', icon: '⭐', earned: false },
  { id: 6, name: 'Derby Day', icon: '⚔️', earned: false },
];

<<<<<<< HEAD
export const ProfilePage = () => {
=======
export const ProfilePage: React.FC = () => {
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
  return (
    <div className="space-y-8">
      <h2 className="section-title text-sm">My Profile</h2>

      <div className="rugby-card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/60 bg-[#1a2c20]/80 text-4xl shadow-[0_16px_30px_rgba(0,0,0,0.55)]">
            👤
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-[0.3em] text-[#f6f3e4]">Rugby Fan</h3>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.35em] text-[#8fa08f]">Member since Oct 2025</p>
          </div>
        </div>
        <div className="rounded-full border border-[#2c4431]/70 bg-[#101a12]/90 px-4 py-2 text-[0.6rem] uppercase tracking-[0.35em] text-[#cfd6cd]">
          Loyal Supporter Tier
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="section-title text-xs">My Badges</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
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

      <div className="rugby-card p-6 text-center text-sm text-[#96aa99] sm:p-8">
        More profile features coming soon!
      </div>
    </div>
  );
};
