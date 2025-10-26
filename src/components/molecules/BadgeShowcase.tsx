import React from 'react';

interface BadgeShowcaseProps {
  badgesEarned: number;
}

const featuredBadges = [
  { label: 'First Kick-Off', emoji: '🥇', description: 'Logged your debut match' },
  { label: 'On Tour', emoji: '🧳', description: 'Visited 5 unique grounds' },
  { label: 'Super Fan', emoji: '🔥', description: 'Hit double-digit attendances' },
];

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ badgesEarned }) => {
  const unlockedCount = Math.min(badgesEarned, featuredBadges.length);

  return (
    <div className="rugby-card relative overflow-hidden rounded-2xl border border-[#2f4632]/70 bg-[#0f1912]/90 p-6 shadow-[0_18px_38px_rgba(0,0,0,0.55)]">
      <div className="absolute inset-x-10 -top-12 h-24 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.25),_transparent_70%)]" />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d4af37]">Badge Shelf</h3>
            <p className="mt-2 text-[0.85rem] text-[#a9b7a8]">
              Unlock badges as you chase big fixtures and away days.
            </p>
          </div>
          <span className="rounded-full border border-[#2f4632] bg-[#121d14]/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-[#9fb09c]">
            {badgesEarned} earned
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {featuredBadges.map((badge, index) => {
            const unlocked = index < unlockedCount;
            return (
              <div
                key={badge.label}
                className={`relative flex flex-col items-center gap-3 rounded-xl border px-4 py-5 text-center transition-all duration-300 ${
                  unlocked
                    ? 'border-[#d4af37]/70 bg-gradient-to-br from-[#1c2a1f]/95 via-[#142319]/95 to-[#0c160f]/95 text-[#f6f3e4] shadow-[0_10px_24px_rgba(0,0,0,0.45)]'
                    : 'border-[#233628]/60 bg-[#0c140e]/70 text-[#6c7b6a]'
                }`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border text-2xl ${
                    unlocked
                      ? 'border-[#d4af37]/80 bg-[#162519]/90 text-[#f6f3e4]'
                      : 'border-[#1f2f24]/80 bg-[#0a110b]/80'
                  }`}
                >
                  {badge.emoji}
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em]">{badge.label}</p>
                  <p className="text-[0.7rem] text-[#9fb09c]">{badge.description}</p>
                </div>
                {!unlocked && (
                  <span className="absolute inset-x-0 bottom-3 mx-auto w-20 rounded-full border border-dashed border-[#233628]/80 bg-[#0f1912]/70 px-2 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-[#5b6a59]">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
