import React, { useEffect, useMemo, useState, useCallback } from 'react';

// --- TYPE DEFINITIONS (assuming these are in a central types file) ---

interface Team {
    id: string;
    name: string;
    logo: string;
}

interface Match {
    id: string;
    startTime: string;
    homeTeam: Team;
    awayTeam: Team;
    scores: {
        home: number;
        away: number;
    };
    venue: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    favoriteTeamId?: string;
    isAdmin?: boolean;
}

export interface AttendedMatch {
    id: string;
    userId: string;
    match: Match;
    attendedOn?: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type View = 'profile' | 'matches' | 'grounds' | 'admin';


// --- MOCK DATA & SERVICES (assuming these are in separate service files) ---

export const TEAMS: Record<string, Team> = {
  'team-1': { id: 'team-1', name: 'Rhinos', logo: '🦏' },
  'team-2': { id: 'team-2', name: 'Bulls', logo: '🐂' },
  'team-3': { id: 'team-3', name: 'Sharks', logo: '🦈' },
  'team-4': { id: 'team-4', name: 'Lions', logo: '🦁' },
};

export const teamIdToVenue: Record<string, string> = {
    'team-1': 'Rhino Stadium',
    'team-2': 'Bull Ring',
    'team-3': 'The Aquarium',
    'team-4': 'Savanna Field',
};

export const allBadges: Badge[] = [
    { id: 'first-match', name: 'First Match', description: 'Attend your first match.', icon: (props) => <TrophyIcon {...props} /> },
    { id: 'five-matches', name: 'Five Pointer', description: 'Attend five matches.', icon: (props) => <TrophyIcon {...props} /> },
    { id: 'home-ground', name: 'Home Ground Hero', description: 'Visit your favorite team\'s home ground.', icon: (props) => <BuildingStadiumIcon {...props} /> },
];

// --- COMPONENT IMPORTS (assuming these are in separate component files) ---
// For simplicity in this single file, these will be defined below.

// --- ICONS (assuming these are in an Icons.tsx file) ---
const UserCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
);
const ListBulletIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
);
const Squares2X2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
);
const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9 9 0 119 0zM16.5 18.75a9 9 0 00-9 0m9 0c.234-.083.463-.174.686-.272m-9.972 0c.223.098.452.189.686.272m9.286 0A9.002 9.002 0 0112 21a9.002 9.002 0 01-4.643-1.524M12 9.75L12.75 12h-1.5L12 9.75z" /></svg>
);
const ArrowLeftOnRectangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l-3-3m0 0l-3 3m3-3V9" /></svg>
);
const ServerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.65H8.228a3.375 3.375 0 00-3.285 2.65l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" /></svg>
);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.5 21.75l-.398-1.197a3.375 3.375 0 00-2.456-2.456L12.75 18l1.197-.398a3.375 3.375 0 002.456-2.456L16.5 14.25l.398 1.197a3.375 3.375 0 002.456 2.456L20.25 18l-1.197.398a3.375 3.375 0 00-2.456 2.456z" /></svg>
);
const BuildingStadiumIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>
);
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" /></svg>
);
const ChevronUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
);
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
);
const ArrowsPointingOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 4.5l-4.5 4.5m4.5-4.5h-4.5m4.5 0v-4.5" /></svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
);
const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);


// --- DUMMY COMPONENTS (placeholders for external components) ---
const TeamLogo: React.FC<{ team: Team, size?: string }> = ({ team, size = 'h-8 w-8' }) => (
    <div className={`${size} flex items-center justify-center rounded-full bg-gray-200 text-xl`}>{team.logo}</div>
);

const TeamSelectionModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSelectTeam: (teamId: string) => void;
    currentTeamId?: string;
}> = ({ isOpen, onClose, onSelectTeam, currentTeamId }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Select Your Team</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.values(TEAMS).map(team => (
                        <button key={team.id} onClick={() => onSelectTeam(team.id)} className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition ${currentTeamId === team.id ? 'bg-primary text-white border-primary' : 'hover:bg-gray-100'}`}>
                            <TeamLogo team={team} size="h-12 w-12" />
                            <span>{team.name}</span>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-6 w-full py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300">Close</button>
            </div>
        </div>
    );
};

const AvatarModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;
    const [url, setUrl] = useState('');
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update Avatar</h2>
                <p className="text-gray-600 mb-4">Enter a new image URL for your avatar.</p>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/avatar.png"
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300">Cancel</button>
                    <button onClick={() => onSave(url)} className="py-2 px-4 rounded-lg bg-primary text-white hover:bg-primary/90">Save</button>
                </div>
            </div>
        </div>
    );
};


// --- TILE LAYOUT CONFIGURATION ---

type TileSize = 'small' | 'medium' | 'large';
type TileType = 'high-emphasis' | 'cta' | 'user-input' | 'data-grid' | 'navigational' | 'progress' | 'icon-link';
type TileId = 'hero' | 'matches' | 'stats' | 'grounds' | 'badges' | 'team' | 'daily' | 'admin' | 'logout';

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
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

const TILE_LAYOUT_STORAGE_KEY = 'profile-tile-layout-v1';

const tileDefinitions: Record<TileId, TileDefinition> = {
  hero: { id: 'hero', label: 'Welcome banner', type: 'high-emphasis', allowedSizes: ['large', 'medium', 'small'], defaultSize: 'large' },
  matches: { id: 'matches', label: 'My matches', type: 'data-grid', allowedSizes: ['large', 'medium', 'small'], defaultSize: 'large' },
  stats: { id: 'stats', label: 'Stats overview', type: 'data-grid', allowedSizes: ['large', 'medium', 'small'], defaultSize: 'medium' },
  grounds: { id: 'grounds', label: 'Grounds visited', type: 'navigational', allowedSizes: ['medium', 'small'], defaultSize: 'medium' },
  badges: { id: 'badges', label: 'Badges & achievements', type: 'progress', allowedSizes: ['large', 'medium'], defaultSize: 'medium' },
  team: { id: 'team', label: 'Team information', type: 'navigational', allowedSizes: ['medium', 'small'], defaultSize: 'medium' },
  daily: { id: 'daily', label: 'Daily scrum', type: 'icon-link', allowedSizes: ['small'], defaultSize: 'small' },
  admin: { id: 'admin', label: 'Admin tools', type: 'cta', allowedSizes: ['medium', 'small'], defaultSize: 'medium' },
  logout: { id: 'logout', label: 'Sign out', type: 'cta', allowedSizes: ['small'], defaultSize: 'small' },
};

const defaultLayout: TileLayoutItem[] = Object.values(tileDefinitions).map(({ id, defaultSize }) => ({ id, size: defaultSize }));

const ensureAllTilesPresent = (layout: TileLayoutItem[]): TileLayoutItem[] => {
  const seen = new Set<TileId>();
  const result: TileLayoutItem[] = [];

  layout.forEach((item) => {
    const definition = tileDefinitions[item.id];
    if (!definition || seen.has(definition.id)) return;
    const size = definition.allowedSizes.includes(item.size) ? item.size : definition.defaultSize;
    result.push({ id: definition.id, size });
    seen.add(definition.id);
  });

  Object.values(tileDefinitions).forEach(({ id, defaultSize }) => {
    if (!seen.has(id)) {
      result.push({ id, size: defaultSize });
    }
  });
  return result;
};

const layoutsAreEqual = (a: TileLayoutItem[], b: TileLayoutItem[]) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every((item, index) => item.id === b[index]?.id && item.size === b[index]?.size);
};

const sizeClassMatrix: Record<TileType, Partial<Record<TileSize, string>>> = {
  'high-emphasis': { large: 'md:col-span-4 md:row-span-2', medium: 'md:col-span-3 md:row-span-1', small: 'md:col-span-2 md:row-span-1' },
  'cta': { large: 'md:col-span-2 md:row-span-1', medium: 'md:col-span-2 md:row-span-1', small: 'md:col-span-1 md:row-span-1' },
  'user-input': { large: 'md:col-span-2 md:row-span-2', medium: 'md:col-span-2 md:row-span-1', small: 'md:col-span-1 md:row-span-1' },
  'data-grid': { large: 'md:col-span-2 md:row-span-2', medium: 'md:col-span-2 md:row-span-1', small: 'md:col-span-1 md:row-span-1' },
  'navigational': { large: 'md:col-span-3 md:row-span-1', medium: 'md:col-span-2 md:row-span-1', small: 'md:col-span-1 md:row-span-1' },
  'progress': { large: 'md:col-span-3 md:row-span-2', medium: 'md:col-span-2 md:row-span-1', small: 'md:col-span-1 md:row-span-1' },
  'icon-link': { small: 'md:col-span-1 md:row-span-1' },
};

const getTileSizeClasses = (tile: TileDefinition, size: TileSize) => {
  const fallback = 'md:col-span-2 md:row-span-1';
  return `col-span-full ${sizeClassMatrix[tile.type]?.[size] ?? fallback}`;
};


// --- MAIN PROFILE VIEW COMPONENT ---

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, setView, attendedMatches, earnedBadgeIds, onLogout }) => {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isCustomisingLayout, setIsCustomisingLayout] = useState(false);
  
  const [tileLayout, setTileLayout] = useState<TileLayoutItem[]>(() => {
    if (typeof window === 'undefined') return defaultLayout;
    try {
      const saved = window.localStorage.getItem(TILE_LAYOUT_STORAGE_KEY);
      return saved ? ensureAllTilesPresent(JSON.parse(saved)) : defaultLayout;
    } catch (error) {
      console.warn('Failed to read stored tile layout', error);
      return defaultLayout;
    }
  });

  const currentLayout = useMemo(() => ensureAllTilesPresent(tileLayout), [tileLayout]);

  useEffect(() => {
    if (!layoutsAreEqual(tileLayout, currentLayout)) {
      setTileLayout(currentLayout);
      return;
    }
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(TILE_LAYOUT_STORAGE_KEY, JSON.stringify(currentLayout));
    } catch (error) {
      console.warn('Failed to store tile layout', error);
    }
  }, [currentLayout, tileLayout]);

  const favoriteTeam = useMemo(() => {
    if (!user.favoriteTeamId) return null;
    return Object.values(TEAMS).find((t) => t.id === user.favoriteTeamId) || null;
  }, [user.favoriteTeamId]);

  const statsSummary = useMemo(() => {
    const totalMatches = attendedMatches.length;
    const totalPoints = attendedMatches.reduce((sum, am) => sum + am.match.scores.home + am.match.scores.away, 0);
    const uniqueVenues = new Set(attendedMatches.map((am) => am.match.venue));
    return {
      totalMatches,
      totalPoints,
      averagePoints: totalMatches > 0 ? Math.round(totalPoints / totalMatches) : 0,
      uniqueVenues: uniqueVenues.size,
    };
  }, [attendedMatches]);

  const recentMatches = useMemo(() => {
    return [...attendedMatches]
      .sort((a, b) => new Date(b.match.startTime).getTime() - new Date(a.match.startTime).getTime())
      .slice(0, 3);
  }, [attendedMatches]);

  const favoriteTeamAppearances = useMemo(() => {
    if (!favoriteTeam) return 0;
    return attendedMatches.filter(am => am.match.homeTeam.id === favoriteTeam.id || am.match.awayTeam.id === favoriteTeam.id).length;
  }, [attendedMatches, favoriteTeam]);

  const earnedBadges = useMemo(() => allBadges.filter((badge) => earnedBadgeIds.includes(badge.id)), [earnedBadgeIds]);

  const dailyScrumTip = useMemo(() => {
    const tips = [
      { title: 'Pause, notice, breathe', question: "What's your focus today?", tip: 'Bring the calm of a steady scrum to your day.' },
      { title: 'Lead the defensive line', question: 'Where can you lift a teammate?', tip: 'Great captains communicate early.' },
      { title: 'Own the gain line', question: 'What small win are you chasing?', tip: 'Break big goals into short carries.' },
      { title: 'Recover like a pro', question: 'What will keep your energy up?', tip: 'Fuel, hydrate, and reset.' },
    ];
    const index = (new Date().getDate()) % tips.length;
    return tips[index];
  }, []);

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

  const renderers: Record<TileId, (size: TileSize) => React.ReactNode> = {
    hero: (size) => (
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 text-white shadow-lg">
        <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" />
        <div className="relative flex flex-col gap-4">
            <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                    {user.avatarUrl ? <img src={user.avatarUrl} alt="User avatar" className="h-16 w-16 rounded-full border-2 border-white/50 object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10"><UserCircleIcon className="h-10 w-10 text-white/70" /></div>}
                    <button onClick={() => setIsAvatarModalOpen(true)} className="absolute bottom-0 right-0 rounded-full bg-white p-1.5 text-primary shadow-md transition hover:bg-white/90" aria-label="Edit avatar"><PencilIcon className="h-4 w-4" /></button>
                </div>
                <div>
                    <p className="text-sm uppercase tracking-wide text-white/80">Welcome back</p>
                    <h1 className="text-3xl font-bold">Hi {firstName}!</h1>
                </div>
            </div>
            {size === 'large' && <p className="text-white/90">Here's your personal dashboard. Track your stats, view your badges, and manage your profile.</p>}
        </div>
      </div>
    ),
    matches: (size) => (
      <div className="h-full flex flex-col p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Recent Matches</h2>
          <div className="flex-grow flex flex-col gap-3">
              {recentMatches.length > 0 ? recentMatches.map(am => (
                  <div key={am.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <TeamLogo team={am.match.homeTeam} />
                      <span className="font-semibold">{am.match.scores.home} - {am.match.scores.away}</span>
                      <TeamLogo team={am.match.awayTeam} />
                      <span className="text-sm text-gray-500 ml-auto">{new Date(am.match.startTime).toLocaleDateString()}</span>
                  </div>
              )) : <p className="text-gray-500">No matches attended yet.</p>}
          </div>
          <button onClick={() => setView('matches')} className="mt-4 text-primary font-semibold hover:underline">View all</button>
      </div>
    ),
    stats: (size) => (
        <div className="h-full flex flex-col p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Stats</h2>
            <div className={`grid ${size === 'small' ? 'grid-cols-2' : 'grid-cols-2'} gap-4 flex-grow content-center`}>
                <div className="text-center"><p className="text-3xl font-bold text-primary">{statsSummary.totalMatches}</p><p className="text-sm text-gray-600">Matches</p></div>
                <div className="text-center"><p className="text-3xl font-bold text-primary">{statsSummary.uniqueVenues}</p><p className="text-sm text-gray-600">Grounds</p></div>
                {size !== 'small' && <>
                    <div className="text-center"><p className="text-3xl font-bold text-primary">{statsSummary.totalPoints}</p><p className="text-sm text-gray-600">Total Points</p></div>
                    <div className="text-center"><p className="text-3xl font-bold text-primary">{statsSummary.averagePoints}</p><p className="text-sm text-gray-600">Avg. Points</p></div>
                </>}
            </div>
        </div>
    ),
    grounds: (size) => (
        <button onClick={() => setView('grounds')} className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 transition">
            <BuildingStadiumIcon className="h-12 w-12 mb-2"/>
            <h2 className="text-xl font-bold">Grounds Visited</h2>
            {size === 'medium' && <p className="text-green-200">See all the stadiums you've been to.</p>}
        </button>
    ),
    badges: (size) => (
        <div className="h-full flex flex-col p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Achievements</h2>
            <div className="flex-grow flex items-center justify-center gap-4">
                {earnedBadges.slice(0, size === 'large' ? 6 : 3).map(badge => (
                    <div key={badge.id} title={badge.name} className="flex flex-col items-center text-center">
                        <div className="p-3 bg-yellow-400 rounded-full text-white"><badge.icon className="h-8 w-8"/></div>
                        {size !== 'medium' && <p className="text-xs mt-1 text-gray-600">{badge.name}</p>}
                    </div>
                ))}
                {earnedBadges.length === 0 && <p className="text-gray-500">No badges yet.</p>}
            </div>
        </div>
    ),
    team: () => (
        <div className="h-full flex flex-col p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Favorite Team</h2>
            {favoriteTeam ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <TeamLogo team={favoriteTeam} size="h-16 w-16"/>
                    <p className="text-2xl font-bold mt-2">{favoriteTeam.name}</p>
                    <p className="text-gray-600">Watched {favoriteTeamAppearances} times</p>
                </div>
            ) : <div className="flex-grow flex items-center justify-center"><p className="text-gray-500">No team selected.</p></div>}
             <button onClick={() => setIsTeamModalOpen(true)} className="mt-4 text-primary font-semibold hover:underline">Change team</button>
        </div>
    ),
    daily: () => (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-blue-500 text-white rounded-2xl shadow-lg">
             <SparklesIcon className="h-8 w-8 mb-2" />
             <h2 className="font-bold text-center">{dailyScrumTip.title}</h2>
             <p className="text-sm text-center text-blue-200">{dailyScrumTip.question}</p>
        </div>
    ),
    admin: () => (
        <button onClick={() => setView('admin')} className={`h-full w-full flex items-center justify-center gap-3 p-4 bg-gray-800 text-white rounded-2xl shadow-lg hover:bg-gray-900 transition ${!user.isAdmin && 'hidden'}`}>
            <ServerIcon className="h-8 w-8"/>
            <h2 className="text-xl font-bold">Admin Panel</h2>
        </button>
    ),
    logout: () => (
        <button onClick={onLogout} className="h-full w-full flex items-center justify-center gap-3 p-4 bg-red-500 text-white rounded-2xl shadow-lg hover:bg-red-600 transition">
            <ArrowLeftOnRectangleIcon className="h-8 w-8"/>
            <h2 className="text-xl font-bold">Sign Out</h2>
        </button>
    ),
  };
  
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
            <button onClick={() => setIsCustomisingLayout(c => !c)} className={`py-2 px-4 rounded-lg font-semibold transition flex items-center gap-2 ${isCustomisingLayout ? 'bg-green-500 text-white' : 'bg-white shadow-md'}`}>
                {isCustomisingLayout ? <><CheckIcon className="h-5 w-5"/>Done</> : <><PencilIcon className="h-5 w-5"/>Customise</>}
            </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[160px]">
            {currentLayout.map(({ id, size }, index) => {
                const definition = tileDefinitions[id];
                if (!definition) return null;
                // Hide admin tile for non-admins
                if (id === 'admin' && !user.isAdmin) return null;
                
                return (
                    <div key={id} className={`relative transition-all duration-300 ${getTileSizeClasses(definition, size)}`}>
                        {renderers[id](size)}
                        {isCustomisingLayout && (
                            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white z-10">
                                <div className="flex flex-col items-center gap-2">
                                     <p className="font-bold">{definition.label}</p>
                                     <div className="flex gap-2 bg-white/20 p-1 rounded-md">
                                        <button onClick={() => handleMoveTile(id, 'up')} disabled={index === 0} className="p-1.5 rounded disabled:opacity-50 hover:bg-white/30"><ChevronUpIcon className="h-5 w-5"/></button>
                                        <button onClick={() => handleMoveTile(id, 'down')} disabled={index === currentLayout.length -1} className="p-1.5 rounded disabled:opacity-50 hover:bg-white/30"><ChevronDownIcon className="h-5 w-5"/></button>
                                        <button onClick={() => handleResizeTile(id)} disabled={definition.allowedSizes.length <= 1} className="p-1.5 rounded disabled:opacity-50 hover:bg-white/30"><ArrowsPointingOutIcon className="h-5 w-5"/></button>
                                     </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>

        <TeamSelectionModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} onSelectTeam={handleSelectTeam} currentTeamId={user.favoriteTeamId} />
        <AvatarModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} onSave={handleSaveAvatar}/>
    </div>
  );
};

// Define a placeholder App component to make this file runnable
export default function App() {
  const [user, setUserState] = useState<User>({
    id: 'user-1',
    name: 'Alex Doe',
    email: 'alex@example.com',
    isAdmin: true,
    favoriteTeamId: 'team-1'
  });
  
  const [attendedMatches] = useState<AttendedMatch[]>([
    // ... mock match data
  ]);
  
  const [earnedBadgeIds] = useState<string[]>(['first-match', 'home-ground']);

  const setUser = (userData: Partial<User>) => {
    setUserState(prev => ({...prev, ...userData}));
  }

  return (
    // This is a basic setup. In a real app, you'd have routing and more complex state management.
    <div className="font-sans">
       {/* Added a theme color for the primary button actions */}
      <style>{`:root { --color-primary: #4f46e5; } .bg-primary { background-color: var(--color-primary); } .text-primary { color: var(--color-primary); } .border-primary { border-color: var(--color-primary); }`}</style>
      <ProfileView 
        user={user}
        setUser={setUser}
        setView={(view) => alert(`Navigating to ${view}`)}
        attendedMatches={attendedMatches}
        earnedBadgeIds={earnedBadgeIds}
        onLogout={() => alert('Logged out')}
      />
    </div>
  );
}

