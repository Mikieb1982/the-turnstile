import React, { useEffect, useMemo, useState } from 'react';
import type { User, AttendedMatch } from '../types';
import { TEAMS, teamIdToVenue } from '../services/mockData';
import { TeamLogo } from './TeamLogo';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AvatarModal } from './AvatarModal';
import type { View } from '../types';
import {
  UserCircleIcon,
  PencilIcon,
  ListBulletIcon,
  Squares2X2Icon,
  TrophyIcon,
  ArrowLeftOnRectangleIcon,
  BuildingStadiumIcon,
  LocationMarkerIcon,
  CalendarIcon,
} from './Icons';
import { allBadges } from '../badges';

type TileSize = 'small' | 'medium' | 'large';
type TileType = 'high-emphasis' | 'cta' | 'user-input' | 'data-grid' | 'navigational' | 'progress' | 'icon-link';

type TileId = 'hero' | 'matches' | 'stats' | 'grounds' | 'badges' | 'team' | 'logout';

interface TileLayoutItem {
  id: TileId;
  size: TileSize;
}

interface TileDefinition {
  id: TileId;
  label: string;
  type: TileType;
  allowedSizes: TileSize[];
  defaultSize: TileSize;
}

interface ProfileViewProps {
  user: User;
  setUser: (updates: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

const TILE_LAYOUT_STORAGE_KEY = 'profile-tile-layout-v1';

const tileDefinitions: Record<TileId, TileDefinition> = {
  hero: {
    id: 'hero',
    label: 'Welcome banner',
    type: 'high-emphasis',
    allowedSizes: ['large', 'medium', 'small'],
    defaultSize: 'large',
  },
  matches: {
    id: 'matches',
    label: 'My matches',
    type: 'data-grid',
    allowedSizes: ['large', 'medium', 'small'],
    defaultSize: 'large',
  },
  stats: {
    id: 'stats',
    label: 'Stats overview',
    type: 'data-grid',
    allowedSizes: ['large', 'medium', 'small'],
    defaultSize: 'medium',
  },
  grounds: {
    id: 'grounds',
    label: 'Grounds visited',
    type: 'navigational',
    allowedSizes: ['medium', 'small'],
    defaultSize: 'medium',
  },
  badges: {
    id: 'badges',
    label: 'Badges & achievements',
    type: 'progress',
    allowedSizes: ['large', 'medium'],
    defaultSize: 'medium',
  },
  team: {
    id: 'team',
    label: 'Team information',
    type: 'navigational',
    allowedSizes: ['medium', 'small'],
    defaultSize: 'medium',
  },
  logout: {
    id: 'logout',
    label: 'Sign out',
    type: 'cta',
    allowedSizes: ['medium', 'small'],
    defaultSize: 'medium',
  },
};

const defaultLayout: TileLayoutItem[] = Object.values(tileDefinitions).map(({ id, defaultSize }) => ({
  id,
  size: defaultSize,
}));

const sanitizeLayout = (layout: TileLayoutItem[]): TileLayoutItem[] => {
  const seen = new Set<TileId>();
  let changed = false;
  const sanitized: TileLayoutItem[] = [];

  layout.forEach((item) => {
    const definition = tileDefinitions[item.id];
    if (!definition) {
      changed = true;
      return;
    }

    if (seen.has(definition.id)) {
      changed = true;
      return;
    }

    const isSizeAllowed = definition.allowedSizes.includes(item.size);
    const size = isSizeAllowed ? item.size : definition.defaultSize;
    const sanitizedItem: TileLayoutItem = { id: definition.id, size };

    if (!changed && (item.id !== sanitizedItem.id || item.size !== sanitizedItem.size)) {
      changed = true;
    }

    sanitized.push(sanitizedItem);
    seen.add(definition.id);
  });

  Object.values(tileDefinitions).forEach(({ id, defaultSize }) => {
    if (!seen.has(id)) {
      sanitized.push({ id, size: defaultSize });
      seen.add(id);
      changed = true;
    }
  });

  return changed ? sanitized : layout;
};

const sizeClassMatrix: Record<TileType, Partial<Record<TileSize, string>>> = {
  'high-emphasis': {
    large: 'md:col-span-4 md:row-span-2',
    medium: 'md:col-span-3 md:row-span-1',
    small: 'md:col-span-2 md:row-span-1',
  },
  cta: {
    large: 'md:col-span-2 md:row-span-1',
    medium: 'md:col-span-2 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  },
  'user-input': {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-2 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  },
  'data-grid': {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-2 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  },
  navigational: {
    large: 'md:col-span-3 md:row-span-1',
    medium: 'md:col-span-2 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  },
  progress: {
    large: 'md:col-span-3 md:row-span-2',
    medium: 'md:col-span-2 md:row-span-1',
    small: 'md:col-span-1 md:row-span-1',
  },
  'icon-link': {
    small: 'md:col-span-1 md:row-span-1',
  },
};

const getTileSizeClasses = (tile: TileDefinition, size: TileSize) => {
  const fallback = 'md:col-span-2 md:row-span-1';
  return `col-span-full ${sizeClassMatrix[tile.type]?.[size] ?? fallback}`;
};

const getTileTypeHint = (tile: TileDefinition) => {
  switch (tile.type) {
    case 'high-emphasis':
      return 'High-emphasis tile';
    case 'cta':
      return 'Call-to-action tile';
    case 'user-input':
      return 'User input tile';
    case 'data-grid':
      return 'Data grid tile';
    case 'navigational':
      return 'Navigation tile';
    case 'progress':
      return 'Progress tile';
    case 'icon-link':
      return 'Icon tile';
    default:
      return 'Tile';
  }
};

const readStoredLayout = (): TileLayoutItem[] => {
  if (typeof window === 'undefined') {
    return sanitizeLayout(defaultLayout);
  }

  try {
    const stored = window.localStorage.getItem(TILE_LAYOUT_STORAGE_KEY);
    if (!stored) {
      return sanitizeLayout(defaultLayout);
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return sanitizeLayout(defaultLayout);
    }

    return sanitizeLayout(parsed as TileLayoutItem[]);
  } catch (error) {
    console.warn('Failed to read stored tile layout', error);
    return sanitizeLayout(defaultLayout);
  }
};

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
  const [isCustomisingLayout, setIsCustomisingLayout] = useState(false);
  const [tileLayout, setTileLayout] = useState<TileLayoutItem[]>(() => readStoredLayout());

  useEffect(() => {
    const sanitised = sanitizeLayout(tileLayout);
    if (sanitised !== tileLayout) {
      setTileLayout(sanitised);
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(TILE_LAYOUT_STORAGE_KEY, JSON.stringify(tileLayout));
    } catch (error) {
      console.warn('Failed to store tile layout', error);
    }
  }, [tileLayout]);

  const layoutForRender = useMemo(() => sanitizeLayout(tileLayout), [tileLayout]);

  const favoriteTeam = useMemo(() => {
    if (!user.favoriteTeamId) return null;
    return Object.values(TEAMS).find((t) => t.id === user.favoriteTeamId) || null;
  }, [user.favoriteTeamId]);

  const statsSummary = useMemo(() => {
    const totalMatches = attendedMatches.length;
    const currentYear = new Date().getFullYear();
    const matchesThisSeason = attendedMatches.filter((match) => {
      const attendedDate = match.attendedOn ? new Date(match.attendedOn) : new Date(match.match.startTime);
      return attendedDate.getFullYear() === currentYear;
    });

    const totalPoints = attendedMatches.reduce(
      (sum, attendedMatch) => sum + attendedMatch.match.scores.home + attendedMatch.match.scores.away,
      0,
    );

    const uniqueVenues = new Set(attendedMatches.map((am) => am.match.venue));
    const uniqueVenuesThisSeason = new Set(matchesThisSeason.map((am) => am.match.venue));

    return {
      totalMatches,
      matchesThisSeason: matchesThisSeason.length,
      totalPoints,
      averagePoints: totalMatches > 0 ? Math.round(totalPoints / totalMatches) : 0,
      uniqueVenues: uniqueVenues.size,
      newGroundsThisSeason: uniqueVenuesThisSeason.size,
    };
  }, [attendedMatches]);

  const uniqueVenuesCount = statsSummary.uniqueVenues;

  const recentMatches = useMemo(() => {
    return [...attendedMatches]
      .sort((a, b) => {
        const dateA = a.attendedOn ? new Date(a.attendedOn).getTime() : new Date(a.match.startTime).getTime();
        const dateB = b.attendedOn ? new Date(b.attendedOn).getTime() : new Date(b.match.startTime).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [attendedMatches]);

  const favoriteTeamAppearances = useMemo(() => {
    if (!favoriteTeam) return 0;
    return attendedMatches.filter(
      (am) => am.match.homeTeam.id === favoriteTeam.id || am.match.awayTeam.id === favoriteTeam.id,
    ).length;
  }, [attendedMatches, favoriteTeam]);

  const earnedBadges = useMemo(() => allBadges.filter((badge) => earnedBadgeIds.includes(badge.id)), [earnedBadgeIds]);

  const handleSelectTeam = (teamId: string) => {
    setUser({ favoriteTeamId: teamId });
    setIsTeamModalOpen(false);
  };

  const handleSaveAvatar = (avatarUrl: string) => {
    setUser({ avatarUrl });
    setIsAvatarModalOpen(false);
  };

  const handleMoveTile = (tileId: TileId, direction: 'up' | 'down') => {
    setTileLayout((previous) => {
      const next = [...previous];
      const index = next.findIndex((tile) => tile.id === tileId);
      if (index === -1) return previous;
      const targetIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(next.length - 1, index + 1);
      if (targetIndex === index) return previous;
      const [moved] = next.splice(index, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  const handleResizeTile = (tileId: TileId) => {
    const definition = tileDefinitions[tileId];
    if (!definition) return;
    setTileLayout((previous) =>
      previous.map((tile) => {
        if (tile.id !== tileId) return tile;
        const sizes = definition.allowedSizes;
        const currentIndex = sizes.indexOf(tile.size);
        const nextSize = sizes[(currentIndex + 1) % sizes.length];
        return { ...tile, size: nextSize };
      }),
    );
  };

  const firstName = user.name ? user.name.split(' ')[0] : 'there';

  const renderers: Record<TileId, () => React.ReactNode> = {
    hero: () => (
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-6 text-white shadow-card">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="User avatar"
                  className="h-20 w-20 rounded-full border-4 border-white/60 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/40 bg-white/10">
                  <UserCircleIcon className="h-12 w-12 text-white/70" />
                </div>
              )}
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="absolute -bottom-1 -right-1 rounded-full bg-white p-2 text-primary shadow-md transition hover:bg-white/90"
                aria-label="Edit avatar"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80">Welcome back</p>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl">Ready for kick-off, {firstName}?</h1>
              <p className="mt-2 max-w-xl text-sm text-white/80 md:text-base">
                Your rugby journey is gathering pace. Review your latest matches, celebrate new badges, and plan the
                next away day.
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 md:ml-auto md:mt-0">
            <button
              onClick={() => setView('UPCOMING')}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:bg-white/90"
            >
              View Fixtures
            </button>
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="rounded-full border border-white/50 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Update Avatar
            </button>
          </div>
        </div>
      </div>
    ),
    matches: () => (
      <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">My Matches</h2>
            <p className="text-sm text-text-subtle">Your most recent rugby adventures</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ListBulletIcon className="h-4 w-4" />
            {attendedMatches.length}
          </span>
        </div>
        <div className="mt-4 flex-1 space-y-4">
          {recentMatches.length > 0 ? (
            recentMatches.map((attendedMatch) => {
              const { match } = attendedMatch;
              const playedOn = attendedMatch.attendedOn
                ? new Date(attendedMatch.attendedOn)
                : new Date(match.startTime);
              const formattedDate = playedOn.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              });
              return (
                <div key={match.id} className="rounded-xl border border-border/60 bg-surface-alt px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-text-strong">
                        {match.homeTeam.name} vs {match.awayTeam.name}
                      </p>
                      <p className="text-xs text-text-subtle">
                        <CalendarIcon className="mr-1 inline h-3.5 w-3.5" />
                        {formattedDate} · {match.venue}
                      </p>
                    </div>
                    <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary [font-variant-numeric:tabular-nums]">
                      {match.scores.home} – {match.scores.away}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-text-subtle">
              <p>No matches logged yet.</p>
              <button
                onClick={() => setView('UPCOMING')}
                className="mt-3 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Explore fixtures
              </button>
            </div>
          )}
        </div>
        <button
          onClick={() => setView('MY_MATCHES')}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          See all matches
        </button>
      </div>
    ),
    stats: () => (
      <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">Stats Overview</h2>
            <p className="text-sm text-text-subtle">Headline numbers from your season</p>
          </div>
          <button
            onClick={() => setView('STATS')}
            className="text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            View full stats
          </button>
        </div>
        <div className="mt-6 grid flex-1 grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface-alt p-4 text-center">
            <p className="text-3xl font-extrabold text-primary [font-variant-numeric:tabular-nums]">{statsSummary.totalMatches}</p>
            <p className="text-xs font-semibold uppercase text-text-subtle">Matches</p>
          </div>
          <div className="rounded-xl bg-surface-alt p-4 text-center">
            <p className="text-3xl font-extrabold text-primary [font-variant-numeric:tabular-nums]">{statsSummary.matchesThisSeason}</p>
            <p className="text-xs font-semibold uppercase text-text-subtle">This Season</p>
          </div>
          <div className="rounded-xl bg-surface-alt p-4 text-center">
            <p className="text-3xl font-extrabold text-primary [font-variant-numeric:tabular-nums]">{statsSummary.totalPoints}</p>
            <p className="text-xs font-semibold uppercase text-text-subtle">Total Points Seen</p>
          </div>
          <div className="rounded-xl bg-surface-alt p-4 text-center">
            <p className="text-3xl font-extrabold text-primary [font-variant-numeric:tabular-nums]">{statsSummary.averagePoints}</p>
            <p className="text-xs font-semibold uppercase text-text-subtle">Avg Points / Match</p>
          </div>
        </div>
      </div>
    ),
    grounds: () => (
      <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">Grounds Visited</h2>
            <p className="text-sm text-text-subtle">Track your stadium tour</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Squares2X2Icon className="h-4 w-4" />
            {uniqueVenuesCount}
          </span>
        </div>
        <div className="mt-6 space-y-3 text-sm text-text-subtle">
          <p>
            You have stepped inside <span className="font-semibold text-text-strong">{uniqueVenuesCount}</span> different grounds so far.
          </p>
          <p>
            New grounds in {new Date().getFullYear()}: <span className="font-semibold text-text-strong">{statsSummary.newGroundsThisSeason}</span>
          </p>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setView('GROUNDS')}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            Explore grounds map
          </button>
        </div>
      </div>
    ),
    badges: () => (
      <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">Badges &amp; Achievements</h2>
            <p className="text-sm text-text-subtle">Your growing trophy cabinet</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <TrophyIcon className="h-4 w-4" />
            {earnedBadges.length}
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {earnedBadges.length > 0 ? (
            earnedBadges.slice(0, 4).map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className="flex w-24 flex-col items-center rounded-xl border border-border/60 bg-surface-alt px-3 py-4 text-center"
                >
                  <Icon className="h-8 w-8 text-primary" />
                  <p className="mt-2 text-xs font-semibold text-text-strong">{badge.name}</p>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-text-subtle">
              Earn badges by logging your matchdays.
            </div>
          )}
        </div>
        <button
          onClick={() => setView('BADGES')}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          View badge collection
        </button>
      </div>
    ),
    team: () => (
      <div className="flex h-full flex-col rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">Team Information</h2>
            <p className="text-sm text-text-subtle">Keep your club colours close</p>
          </div>
          {favoriteTeam && <TeamLogo teamId={favoriteTeam.id} teamName={favoriteTeam.name} size="small" />}
        </div>
        {favoriteTeam ? (
          <div className="mt-5 space-y-3 text-sm text-text-subtle">
            <p className="flex items-center gap-2 text-text-strong">
              <BuildingStadiumIcon className="h-5 w-5 text-primary" />
              {favoriteTeam.name}
            </p>
            <p className="flex items-center gap-2">
              <LocationMarkerIcon className="h-4 w-4 text-primary" />
              Home ground: {teamIdToVenue[favoriteTeam.id] || 'TBC'}
            </p>
            <p>
              Matches seen with the {favoriteTeam.name}:{' '}
              <span className="font-semibold text-text-strong">{favoriteTeamAppearances}</span>
            </p>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-dashed border-border p-4 text-sm text-text-subtle">
            Pick your side to tailor fixtures, badges, and matchday highlights.
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setIsTeamModalOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            {favoriteTeam ? 'Change team' : 'Choose your team'}
          </button>
          <button
            onClick={() => setView('TEAM_STATS')}
            className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-strong transition hover:border-primary/50 hover:text-primary"
          >
            Team stats
          </button>
        </div>
      </div>
    ),
    logout: () => (
      <div className="flex h-full flex-col justify-between rounded-2xl bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-strong">Sign out</h2>
            <p className="text-sm text-text-subtle">Wrap up your session safely</p>
          </div>
          <ArrowLeftOnRectangleIcon className="h-6 w-6 text-danger" />
        </div>
        <button
          onClick={onLogout}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-danger px-4 py-2 text-sm font-semibold text-white transition hover:bg-danger/90"
        >
          Logout
        </button>
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-text-strong">Personalise your dashboard</h2>
          <p className="text-sm text-text-subtle">
            Use the tile controls to reorder and resize panels so the right rugby intel is always in view.
          </p>
        </div>
        <button
          onClick={() => setIsCustomisingLayout((prev) => !prev)}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-text-strong transition hover:border-primary/60 hover:text-primary"
        >
          {isCustomisingLayout ? 'Done customising' : 'Customise layout'}
        </button>
      </div>

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
        {layoutForRender.map((tile, index) => {
          const definition = tileDefinitions[tile.id];
          const content = renderers[tile.id];
          if (!definition || typeof content !== 'function') {
            return null;
          }
          const sizeClasses = getTileSizeClasses(definition, tile.size);

          return (
            <section
              key={tile.id}
              aria-label={definition.label}
              className={`${sizeClasses} relative transition`}
            >
              <div className={`h-full rounded-2xl ${isCustomisingLayout ? 'ring-2 ring-primary/60 ring-offset-2' : ''}`}>
                {content()}
              </div>

              {isCustomisingLayout && (
                <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap justify-end gap-2 text-xs font-semibold uppercase tracking-wide text-text-subtle">
                  <span className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-surface-alt/90 px-3 py-1 shadow-sm">
                    {getTileTypeHint(definition)}
                  </span>
                  <div className="pointer-events-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleMoveTile(tile.id, 'up')}
                      disabled={index === 0}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move up
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveTile(tile.id, 'down')}
                      disabled={index === layoutForRender.length - 1}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move down
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResizeTile(tile.id)}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary/20"
                    >
                      Resize ({tile.size})
                    </button>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <TeamSelectionModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelectTeam={handleSelectTeam}
        currentTeamId={user.favoriteTeamId}
      />
      <AvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onSave={handleSaveAvatar}
        currentAvatar={user.avatarUrl}
      />
    </div>
  );
};