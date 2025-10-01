import React, { useEffect, useMemo, useState } from 'react';
import type { AttendedMatch, User, View } from '../types';
import { allBadges } from '../badges';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AvatarModal } from './AvatarModal';
import { TeamLogo } from './TeamLogo';
import {
  ArrowRightOnRectangleIcon,
  BuildingStadiumIcon,
  CalendarIcon,
  ChartBarIcon,
  ListBulletIcon,
  PencilIcon,
  TrophyIcon,
  UserCircleIcon,
} from './Icons';
import { TEAMS, teamIdToVenue } from '../services/mockData';

interface ProfileViewProps {
  user: User;
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

const getTeamById = (teamId?: string) => {
  if (!teamId) return undefined;
  return Object.values(TEAMS).find(team => team.id === teamId);
};

const formatMatchDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatMatchScore = (match: AttendedMatch['match']) =>
  `${match.homeTeam.name} ${match.scores.home} – ${match.scores.away} ${match.awayTeam.name}`;

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  setUser,
  setView,
  attendedMatches,
  earnedBadgeIds,
  onLogout,
}) => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [pendingName, setPendingName] = useState(user.name ?? '');

  useEffect(() => {
    setPendingName(user.name ?? '');
  }, [user.name]);

  const favouriteTeam = useMemo(() => getTeamById(user.favoriteTeamId), [user.favoriteTeamId]);

  const badgeDetails = useMemo(
    () => allBadges.filter(badge => earnedBadgeIds.includes(badge.id)),
    [earnedBadgeIds],
  );

  const stats = useMemo(() => {
    if (attendedMatches.length === 0) {
      return {
        totalMatches: 0,
        uniqueVenues: 0,
        favouriteVenue: undefined as string | undefined,
        recentMatches: [] as AttendedMatch[],
      };
    }

    const sortedMatches = [...attendedMatches].sort((a, b) => {
      const dateA = new Date(a.attendedOn ?? a.match.startTime).getTime();
      const dateB = new Date(b.attendedOn ?? b.match.startTime).getTime();
      return dateB - dateA;
    });

    const venueCounts = new Map<string, number>();
    sortedMatches.forEach(({ match }) => {
      const venue = match.venue;
      venueCounts.set(venue, (venueCounts.get(venue) ?? 0) + 1);
    });

    let favouriteVenue: string | undefined;
    let highestCount = 0;
    venueCounts.forEach((count, venue) => {
      if (count > highestCount) {
        highestCount = count;
        favouriteVenue = venue;
      }
    });

    return {
      totalMatches: attendedMatches.length,
      uniqueVenues: venueCounts.size,
      favouriteVenue,
      recentMatches: sortedMatches.slice(0, 3),
    };
  }, [attendedMatches]);

  const handleSaveName = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = pendingName.trim();
    if (!trimmed) {
      setPendingName(user.name ?? '');
      setIsEditingName(false);
      return;
    }
    setUser({ name: trimmed });
    setIsEditingName(false);
  };

  const handleTeamSelect = (teamId: string) => {
    setUser({ favoriteTeamId: teamId });
    setIsTeamModalOpen(false);
  };

  const handleAvatarSave = (avatarUrl: string) => {
    setUser({ avatarUrl });
    setIsAvatarModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl bg-surface border border-border shadow-sm p-6 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative w-24 h-24">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Profile avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/40"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-surface-alt border border-border flex items-center justify-center text-text-subtle">
                  <UserCircleIcon className="w-14 h-14" />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90"
                aria-label="Change avatar"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-2">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <input
                    value={pendingName}
                    onChange={event => setPendingName(event.target.value)}
                    className="flex-1 rounded-lg border border-border bg-surface-alt px-3 py-2 text-base"
                    placeholder="Your name"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPendingName(user.name ?? '');
                        setIsEditingName(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-surface-alt border border-border font-semibold text-text"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-text-strong">
                    {user.name || 'Rugby Fan'}
                  </h1>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(true)}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    Edit name
                  </button>
                </div>
              )}

              {favouriteTeam ? (
                <div className="flex items-center gap-3 text-text-subtle">
                  <TeamLogo teamId={favouriteTeam.id} teamName={favouriteTeam.name} size="small" />
                  <div>
                    <p className="text-sm uppercase tracking-wide text-text-subtle/70">Favourite team</p>
                    <p className="font-semibold text-text">{favouriteTeam.name}</p>
                    {teamIdToVenue[favouriteTeam.id] ? (
                      <p className="text-sm">Home ground: {teamIdToVenue[favouriteTeam.id]}</p>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-surface-alt px-4 py-3 text-text-subtle">
                  <p className="font-semibold text-text">Choose your favourite club to personalise your dashboard.</p>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-surface-alt"
                >
                  <BuildingStadiumIcon className="w-5 h-5" />
                  {favouriteTeam ? 'Change favourite team' : 'Select favourite team'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <ProfileStatCard
              icon={<CalendarIcon className="w-6 h-6 text-primary" />}
              label="Matches attended"
              value={stats.totalMatches.toString()}
            />
            <ProfileStatCard
              icon={<BuildingStadiumIcon className="w-6 h-6 text-secondary" />}
              label="Venues visited"
              value={stats.uniqueVenues.toString()}
            />
            <ProfileStatCard
              icon={<TrophyIcon className="w-6 h-6 text-accent" />}
              label="Badges earned"
              value={badgeDetails.length.toString()}
            />
          </div>
        </div>

        <aside className="rounded-2xl bg-surface border border-border shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-text-strong">Quick actions</h2>
          <ActionButton
            icon={<ListBulletIcon className="w-5 h-5" />}
            label="My attended matches"
            description="Review and add notes to games you have been to."
            onClick={() => setView('MY_MATCHES')}
          />
          <ActionButton
            icon={<ChartBarIcon className="w-5 h-5" />}
            label="View my stats"
            description="Track streaks, favourite venues and more."
            onClick={() => setView('STATS')}
          />
          <ActionButton
            icon={<TrophyIcon className="w-5 h-5" />}
            label="Badges"
            description="See the achievements you have unlocked so far."
            onClick={() => setView('BADGES')}
          />
          <button
            type="button"
            onClick={onLogout}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg bg-danger text-white py-2.5 font-semibold hover:bg-danger/90"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Sign out
          </button>
        </aside>
      </section>

      <section className="rounded-2xl bg-surface border border-border shadow-sm p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-text-strong">Recent matches</h2>
          {stats.totalMatches > 0 ? (
            <button
              type="button"
              onClick={() => setView('MY_MATCHES')}
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all
            </button>
          ) : null}
        </div>
        {stats.recentMatches.length === 0 ? (
          <p className="mt-4 text-text-subtle">You have not logged any matches yet. Tap the fixtures list to mark games you attend.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {stats.recentMatches.map(attended => (
              <li
                key={attended.match.id}
                className="rounded-xl border border-border bg-surface-alt px-4 py-3 flex flex-col gap-1"
              >
                <p className="font-semibold text-text">{formatMatchScore(attended.match)}</p>
                <p className="text-sm text-text-subtle">
                  {formatMatchDate(attended.attendedOn ?? attended.match.startTime)} · {attended.match.venue}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl bg-surface border border-border shadow-sm p-6">
        <h2 className="text-xl font-semibold text-text-strong">Earned badges</h2>
        {badgeDetails.length === 0 ? (
          <p className="mt-4 text-text-subtle">Start attending matches to unlock achievements and grow your collection.</p>
        ) : (
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {badgeDetails.map(badge => {
              const Icon = badge.icon;
              return (
                <div key={badge.id} className="rounded-xl border border-border bg-surface-alt p-4 flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-text">{badge.name}</p>
                    <p className="text-sm text-text-subtle">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {stats.favouriteVenue ? (
        <section className="rounded-2xl bg-surface border border-border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-text-strong">Favourite venue</h2>
          <p className="mt-2 text-text-subtle">
            You have checked in at <span className="font-semibold text-text">{stats.favouriteVenue}</span> more than any other ground.
          </p>
        </section>
      ) : null}

      <TeamSelectionModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelectTeam={handleTeamSelect}
        currentTeamId={user.favoriteTeamId}
      />

      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleAvatarSave}
        currentAvatar={user.avatarUrl}
      />
    </div>
  );
};

interface ProfileStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileStatCard: React.FC<ProfileStatCardProps> = ({ icon, label, value }) => (
  <div className="rounded-xl border border-border bg-surface-alt px-4 py-5 flex items-center gap-4">
    <div className="p-3 rounded-full bg-white/70 shadow-sm">{icon}</div>
    <div>
      <p className="text-sm text-text-subtle uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-text-strong">{value}</p>
    </div>
  </div>
);

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-start gap-3 rounded-xl border border-border bg-surface-alt px-4 py-3 text-left hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
  >
    <div className="mt-1 text-primary">{icon}</div>
    <div>
      <p className="font-semibold text-text">{label}</p>
      <p className="text-sm text-text-subtle">{description}</p>
    </div>
  </button>
);
