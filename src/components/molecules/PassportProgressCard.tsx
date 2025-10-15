import React from 'react';

interface PassportProgressCardProps {
  matchesAttended: number;
  stadiumsVisited: number;
  badgesEarned: number;
}

const GOAL_MATCHES = 20;
const GOAL_STADIUMS = 10;
const GOAL_BADGES = 12;

const formatProgress = (value: number, goal: number) => {
  const progress = Math.min(1, value / goal);
  return { progress, valueLabel: `${Math.min(value, goal)} / ${goal}` };
};

const getNextMilestoneCopy = (matchesAttended: number, badgesEarned: number) => {
  if (matchesAttended < 10) {
    const remaining = 10 - matchesAttended;
    return `Attend ${remaining} more match${remaining === 1 ? '' : 'es'} to unlock the Super Fan badge.`;
  }

  if (badgesEarned < 5) {
    const remaining = Math.max(0, 5 - badgesEarned);
    return `${remaining} more badge${remaining === 1 ? '' : 's'} until you earn the Collector glow-up.`;
  }

  return 'Keep logging those fixtures to climb the passport leaderboard!';
};

export const PassportProgressCard: React.FC<PassportProgressCardProps> = ({
  matchesAttended,
  stadiumsVisited,
  badgesEarned,
}) => {
  const matchProgress = formatProgress(matchesAttended, GOAL_MATCHES);
  const stadiumProgress = formatProgress(stadiumsVisited, GOAL_STADIUMS);
  const badgeProgress = formatProgress(badgesEarned, GOAL_BADGES);

  return (
    <div className="rugby-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#2f4632]/80 bg-gradient-to-br from-[#142319]/95 via-[#101710]/95 to-[#090d11]/95 p-6 shadow-[0_20px_48px_rgba(0,0,0,0.55)]">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.22),_transparent_70%)]" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rotate-12 rounded-full border border-[#2f4632]/50 opacity-60" />

      <div className="relative space-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2f4632]/70 bg-[#0c160f]/80 px-3 py-1 text-[0.62rem] uppercase tracking-[0.38em] text-[#9fb09c]">
          <span className="text-[#d4af37]">★</span> Passport Journey
        </span>
        <h3 className="text-lg font-black uppercase tracking-[0.24em] text-[#f6f3e4]">Season Progress</h3>
        <p className="max-w-xs text-sm text-[#a9b7a8]">
          Log every ground, badge and big away day to level up your Rugby League passport.
        </p>
      </div>

      <div className="relative mt-6 space-y-5">
        <ProgressRow label="Matches Logged" accent="from-[#2f7d45] to-[#73d07a]" {...matchProgress} />
        <ProgressRow label="Grounds Visited" accent="from-[#1f5d32] to-[#58b77a]" {...stadiumProgress} />
        <ProgressRow label="Badges Earned" accent="from-[#d4af37] to-[#f8e589]" {...badgeProgress} />
      </div>

      <div className="relative mt-6 rounded-xl border border-[#2f4632]/70 bg-[#101a12]/70 p-4 text-sm text-[#cfd7cf]">
        <p className="font-semibold uppercase tracking-[0.24em] text-[#d4af37]">Next Milestone</p>
        <p className="mt-2 text-[0.85rem] text-[#b8c5b8]">{getNextMilestoneCopy(matchesAttended, badgesEarned)}</p>
      </div>
    </div>
  );
};

interface ProgressRowProps {
  label: string;
  progress: number;
  accent: string;
  valueLabel: string;
}

const ProgressRow: React.FC<ProgressRowProps> = ({ label, progress, accent, valueLabel }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-[#9fb09c]">
      <span>{label}</span>
      <span className="text-[#f6f3e4]">{valueLabel}</span>
    </div>
    <div className="h-3 overflow-hidden rounded-full border border-[#2f4632]/70 bg-[#0b120c]/80">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${accent} shadow-[0_0_14px_rgba(212,175,55,0.35)] transition-all duration-500`}
        style={{ width: `${progress === 0 ? 0 : Math.max(progress * 100, 12)}%` }}
      />
    </div>
  </div>
);
