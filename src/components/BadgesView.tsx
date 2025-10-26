
import React, { useMemo, useState } from 'react';
import type { Badge } from '../types';
import { TrophyIcon } from './Icons';

interface BadgesViewProps {
    allBadges: Badge[];
    earnedBadgeIds: string[];
}

const BadgeCard: React.FC<{ badge: Badge; isEarned: boolean }> = ({ badge, isEarned }) => {
    const Icon = badge.icon;
    return (
        <div 
            key={badge.id}
            className={`p-4 rounded-xl flex flex-col items-center text-center transition-all duration-300 ${
                isEarned ? 'bg-surface shadow-card' : 'bg-surface-alt opacity-60'
            }`}
        >
            <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                isEarned ? 'bg-accent/20' : 'bg-border/20'
            }`}>
                <Icon className={`w-7 h-7 ${isEarned ? 'text-accent' : 'text-text-subtle'}`} />
            </div>
            <h2 className={`font-bold text-sm mb-1 ${
                isEarned ? 'text-text-strong' : 'text-text-subtle'
            }`}>{badge.name}</h2>
            <p className={`text-xs flex-grow ${isEarned ? 'text-text' : 'text-text-subtle'}`}>
                {badge.description}
            </p>
        </div>
    );
};

export const BadgesView: React.FC<BadgesViewProps> = ({ allBadges, earnedBadgeIds }) => {

    const earnedCount = earnedBadgeIds.length;
    const totalCount = allBadges.length;

    const [showLocked, setShowLocked] = useState(true);

    const milestones = useMemo(() => allBadges.filter(b => b.category === 'Milestone'), [allBadges]);
    const tournaments = useMemo(() => allBadges.filter(b => b.category === 'Tournament'), [allBadges]);

    const filteredMilestones = useMemo(
        () => milestones.filter(badge => showLocked || earnedBadgeIds.includes(badge.id)),
        [earnedBadgeIds, milestones, showLocked]
    );

    const filteredTournaments = useMemo(
        () => tournaments.filter(badge => showLocked || earnedBadgeIds.includes(badge.id)),
        [earnedBadgeIds, showLocked, tournaments]
    );

    const nextLockedBadge = useMemo(() => allBadges.find(badge => !earnedBadgeIds.includes(badge.id)), [allBadges, earnedBadgeIds]);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
                <h1 className="text-3xl font-bold text-text-strong">Badge Collection</h1>
                <div className="text-lg font-semibold text-text-subtle">
                    <TrophyIcon className="w-5 h-5 inline-block mr-2 text-accent" />
                    {earnedCount} / {totalCount} Unlocked
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-text-subtle">
                    {earnedCount === totalCount
                        ? 'Every badge unlocked—what a season!'
                        : `Only ${totalCount - earnedCount} to go until the full set.`}
                </p>
                <label className="flex items-center gap-2 text-sm font-semibold text-text-subtle">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                        checked={showLocked}
                        onChange={(event) => setShowLocked(event.target.checked)}
                    />
                    Show locked badges
                </label>
            </div>

            {filteredMilestones.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold text-text-strong uppercase tracking-wider mb-4">Milestones</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredMilestones.map(badge => (
                           <BadgeCard key={badge.id} badge={badge} isEarned={earnedBadgeIds.includes(badge.id)} />
                        ))}
                    </div>
                </section>
            )}

            {filteredTournaments.length > 0 && (
                 <section>
                    <h2 className="text-xl font-bold text-text-strong uppercase tracking-wider mb-4 mt-8">Tournaments</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredTournaments.map(badge => (
                           <BadgeCard key={badge.id} badge={badge} isEarned={earnedBadgeIds.includes(badge.id)} />
                        ))}
                    </div>
                </section>
            )}

            {earnedCount < totalCount && (
                <div className="text-center py-10 bg-surface rounded-md mt-8 shadow-card">
                    <h2 className="text-xl font-bold text-text-strong">Keep Going!</h2>
                    <p className="text-text-subtle mt-2">
                        Attend more matches to unlock the remaining badges and complete your collection.
                        {nextLockedBadge ? ` Next up: the ${nextLockedBadge.name} badge.` : ''}
                    </p>
                </div>
            )}
        </div>
    );
};