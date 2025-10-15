import React from 'react';
import { StatDisplay } from '../atoms/StatDisplay';
import { NextMatchCard } from '../molecules/NextMatchCard';
import { ShareButton } from '../molecules/ShareButton';
import { PassportProgressCard } from '../molecules/PassportProgressCard';
import { BadgeShowcase } from '../molecules/BadgeShowcase';

interface DashboardPageProps {
  user: {
    stats: {
      matchesAttended: number;
      stadiumsVisited: number;
      badgesEarned: number;
    };
  };
  nextMatch: {
    id: number;
    homeTeam: string;
    awayTeam: string;
    date: string;
    stadium: string;
    homeLogo: string;
    awayLogo: string;
  };
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, nextMatch }) => {
  const { stats } = user;

  return (
    <div className="space-y-12">
      <div className="grid gap-8 xl:grid-cols-[1.75fr,1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2f4632]/70 bg-[#101812]/80 px-4 py-1 text-[0.62rem] uppercase tracking-[0.36em] text-[#9fb09c]">
              Rugby League Passport
            </span>
            <h2 className="text-2xl font-black uppercase tracking-[0.28em] text-[#f6f3e4] sm:text-3xl">
              Your next kick-off is locked in
            </h2>
            <p className="max-w-xl text-sm text-[#a9b7a8]">
              Track every ground you conquer and badge you unlock. Your passport story grows with every turnstile.
            </p>
          </div>
          <NextMatchCard
            homeTeam={nextMatch.homeTeam}
            awayTeam={nextMatch.awayTeam}
            date={nextMatch.date}
            stadium={nextMatch.stadium}
            homeLogo={nextMatch.homeLogo}
            awayLogo={nextMatch.awayLogo}
            onLogAttendance={() => alert('Log Attendance clicked!')}
            onAddToCalendar={() => alert('Reminder added!')}
          />
        </div>
        <PassportProgressCard
          matchesAttended={stats.matchesAttended}
          stadiumsVisited={stats.stadiumsVisited}
          badgesEarned={stats.badgesEarned}
        />
      </div>

      <div className="space-y-4">
        <h3 className="section-title text-sm">Quick Stats</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatDisplay label="Matches Attended" value={stats.matchesAttended} icon="🎫" />
          <StatDisplay label="Unique Grounds" value={stats.stadiumsVisited} icon="🏟️" />
          <StatDisplay label="Badges Earned" value={stats.badgesEarned} icon="🏆" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        <BadgeShowcase badgesEarned={stats.badgesEarned} />
        <div className="rugby-card relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2f4632]/70 bg-[#101a12]/90 p-6 shadow-[0_18px_38px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-x-6 -top-16 h-32 rounded-full bg-[radial-gradient(circle,_rgba(47,125,70,0.28),_transparent_70%)]" />
          <div className="relative space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d4af37]">Share the Journey</h3>
            <p className="text-[0.9rem] text-[#a9b7a8]">
              Turn your stats into a rallying cry. Post your passport progress and invite your crew to the next away day.
            </p>
          </div>
          <div className="relative mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.28em] text-[#9fb09c]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2f4632]/70 bg-[#142319]/90 text-lg">📣</span>
              Broadcast your latest milestone in a tap.
            </div>
            <ShareButton stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};