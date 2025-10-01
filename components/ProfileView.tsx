import React, { useEffect, useMemo, useState } from 'react';
import type { AttendedMatch, User, View } from '../types';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AvatarModal } from './AvatarModal';
import { TeamLogo } from './TeamLogo';
import {
  ArrowRightOnRectangleIcon,
  BuildingStadiumIcon,
  ChartBarIcon,
  ListBulletIcon,
  PencilIcon,
  TrophyIcon,
  UserCircleIcon,
  LockClosedIcon,
  LockOpenIcon,
} from './Icons';
import { TEAMS } from '../services/mockData';
import styles from './ProfileView.module.css';

// --- React Grid Layout Imports ---
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Helper to get team details by ID
const getTeamById = (teamId?: string) => {
  if (!teamId) return undefined;
  return Object.values(TEAMS).find(team => team.id === teamId);
};

interface ProfileViewProps {
  user: User;
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

// Define the initial layout for the tiles
const initialLayouts = {
  lg: [
    { i: 'profile', x: 0, y: 0, w: 12, h: 2, static: true }, // Profile tile is static
    { i: 'team', x: 0, y: 2, w: 4, h: 2 },
    { i: 'last_match', x: 4, y: 2, w: 4, h: 2 },
    { i: 'my_matches', x: 8, y: 2, w: 4, h: 1 },
    { i: 'grounds', x: 8, y: 3, w: 4, h: 1 },
    { i: 'stats', x: 0, y: 4, w: 4, h: 1 },
    { i: 'badges', x: 4, y: 4, w: 4, h: 1 },
    { i: 'admin', x: 8, y: 4, w: 4, h: 1 },
    { i: 'logout', x: 8, y: 5, w: 4, h: 1 },
  ],
};

const LAYOUT_STORAGE_KEY = 'profile-tile-layout';

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
  const [isEditable, setIsEditable] = useState(false);

  // Load layout from local storage, or use the initial layout
  const [layouts, setLayouts] = useState(() => {
    try {
      const storedLayouts = localStorage.getItem(LAYOUT_STORAGE_KEY);
      return storedLayouts ? JSON.parse(storedLayouts) : initialLayouts;
    } catch (error) {
      return initialLayouts;
    }
  });

  useEffect(() => {
    setPendingName(user.name ?? '');
  }, [user.name]);

  const favouriteTeam = useMemo(() => getTeamById(user.favoriteTeamId), [user.favoriteTeamId]);
  const recentMatch = useMemo(() => {
    if (attendedMatches.length === 0) return null;
    return [...attendedMatches].sort((a, b) => new Date(b.attendedOn).getTime() - new Date(a.attendedOn).getTime())[0];
  }, [attendedMatches]);

  const handleSaveName = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = pendingName.trim();
    if (trimmed) { setUser({ name: trimmed }); }
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

  // Save layout changes to local storage
  const onLayoutChange = (layout: any, allLayouts: any) => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(allLayouts));
    setLayouts(allLayouts);
  };

  return (
    <>
      <div className={styles.edit_mode_toggle}>
        <button onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? <LockOpenIcon /> : <LockClosedIcon />}
          {isEditable ? 'Lock Layout' : 'Edit Layout'}
        </button>
      </div>

      <ResponsiveGridLayout
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditable}
        isResizable={isEditable}
        draggableCancel=".no-drag"
      >
        {/* Profile Tile */}
        <div key="profile" className={`${styles.tile} ${styles.profile_tile}`}>
          <div className={styles.profile_avatar}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile avatar" className={styles.avatar_img} />
            ) : (
              <UserCircleIcon className={styles.avatar_placeholder} />
            )}
            <button onClick={() => setIsAvatarModalOpen(true)} className={`${styles.edit_avatar_button} no-drag`} aria-label="Edit avatar">
              <PencilIcon />
            </button>
          </div>
          <div className={`${styles.profile_info} no-drag`}>
            {isEditingName ? (
              <form onSubmit={handleSaveName} className={styles.name_edit_form}>
                <input type="text" value={pendingName} onChange={(e) => setPendingName(e.target.value)} onBlur={handleSaveName} autoFocus />
                <button type="submit">Save</button>
              </form>
            ) : (
              <h1 onClick={() => setIsEditingName(true)} className={styles.profile_name}>
                {user.name} <PencilIcon className={styles.edit_name_icon} />
              </h1>
            )}
            <p className={styles.profile_status}>
              {attendedMatches.length} matches attended | {earnedBadgeIds.length} badges earned
            </p>
          </div>
        </div>

        {/* My Team Tile */}
        <div key="team" className={styles.tile}>
          <h3 className={`${styles.tile_title} no-drag`}>My Team</h3>
          {favouriteTeam ? (
            <div className={`${styles.team_info} no-drag`}>
              <TeamLogo teamId={favouriteTeam.id} teamName={favouriteTeam.name} />
              <span className={styles.team_name}>{favouriteTeam.name}</span>
            </div>
          ) : (
            <p className={`${styles.tile_description} no-drag`}>No favorite team selected.</p>
          )}
          <button onClick={() => setIsTeamModalOpen(true)} className={`${styles.tile_button} no-drag`}>
            {favouriteTeam ? 'Change' : 'Select'} Team
          </button>
        </div>
        
        {/* Last Match Stats Tile */}
        <div key="last_match" className={styles.tile}>
          <h3 className={`${styles.tile_title} no-drag`}>Last Match</h3>
          {recentMatch ? (
            <div className={`${styles.match_recap} no-drag`}>
              <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
              <p className={styles.match_score}>{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</p>
            </div>
          ) : (
            <p className={`${styles.tile_description} no-drag`}>No matches attended yet.</p>
          )}
        </div>

        {/* Navigation Tiles */}
        <div key="my_matches" className={`${styles.tile} ${styles.nav_tile}`} onClick={() => !isEditable && setView('MY_MATCHES')}>
          <ListBulletIcon className={`${styles.icon} no-drag`} />
          <h4 className="no-drag">My Matches</h4>
        </div>
        <div key="grounds" className={`${styles.tile} ${styles.nav_tile}`} onClick={() => !isEditable && setView('GROUNDS')}>
          <BuildingStadiumIcon className={`${styles.icon} no-drag`} />
          <h4 className="no-drag">Grounds</h4>
        </div>
        <div key="stats" className={`${styles.tile} ${styles.nav_tile}`} onClick={() => !isEditable && setView('
