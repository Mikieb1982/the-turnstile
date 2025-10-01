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
import { TEAMS } from '../services/mockData';
import styles from './ProfileView.module.css'; // Import the CSS module

// Helper to get team details by ID
const getTeamById = (teamId?: string) => {
  if (!teamId) return undefined;
  return Object.values(TEAMS).find(team => team.id === teamId);
};

// Props interface remains the same
interface ProfileViewProps {
  user: User;
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

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
  const recentMatch = useMemo(() => {
      if (attendedMatches.length === 0) return null;
      return [...attendedMatches].sort((a, b) => new Date(b.attendedOn).getTime() - new Date(a.attendedOn).getTime())[0];
  }, [attendedMatches]);


  const handleSaveName = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = pendingName.trim();
    if (trimmed) {
      setUser({ name: trimmed });
    }
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
    <>
      <div className={styles.tile_grid}>
        {/* Profile Tile */}
        <div className={`${styles.tile} ${styles.profile_tile} ${styles.color_deep_red}`}>
          <div className={styles.profile_avatar}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile avatar" className={styles.avatar_img} />
            ) : (
              <UserCircleIcon className={styles.avatar_placeholder} />
            )}
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className={styles.edit_avatar_button}
              aria-label="Edit avatar"
            >
              <PencilIcon />
            </button>
          </div>
          <div className={styles.profile_info}>
            {isEditingName ? (
              <form onSubmit={handleSaveName} className={styles.name_edit_form}>
                <input
                  type="text"
                  value={pendingName}
                  onChange={(e) => setPendingName(e.target.value)}
                  onBlur={handleSaveName}
                  autoFocus
                />
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
        <div className={`${styles.tile} ${styles.color_dark_blue}`}>
          <h3 className={styles.tile_title}>My Team</h3>
          {favouriteTeam ? (
            <div className={styles.team_info}>
              <TeamLogo teamId={favouriteTeam.id} teamName={favouriteTeam.name} />
              <span className={styles.team_name}>{favouriteTeam.name}</span>
            </div>
          ) : (
            <p className={styles.tile_description}>No favorite team selected.</p>
          )}
          <button onClick={() => setIsTeamModalOpen(true)} className={styles.tile_button}>
            {favouriteTeam ? 'Change' : 'Select'} Team
          </button>
        </div>

        {/* Last Match Stats Tile */}
        <div className={`${styles.tile} ${styles.color_deep_red}`}>
            <h3 className={styles.tile_title}>Last Match</h3>
            {recentMatch ? (
                <div className={styles.match_recap}>
                    <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
                    <p className={styles.match_score}>{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</p>
                </div>
            ) : (
                <p className={styles.tile_description}>No matches attended yet.</p>
            )}
        </div>


        {/* Navigation Tiles */}
        <button onClick={() => setView('MY_MATCHES')} className={`${styles.tile} ${styles.nav_tile} ${styles.color_yellow}`}>
          <ListBulletIcon className={styles.icon} />
          <h4>My Matches</h4>
        </button>
        <button onClick={() => setView('GROUNDS')} className={`${styles.tile} ${styles.nav_tile} ${styles.color_dark_blue}`}>
          <BuildingStadiumIcon className={styles.icon} />
          <h4>Grounds</h4>
        </button>
        <button onClick={() => setView('STATS')} className={`${styles.tile} ${styles.nav_tile} ${styles.color_deep_red}`}>
          <ChartBarIcon className={styles.icon} />
          <h4>My Stats</h4>
        </button>
        <button onClick={() => setView('BADGES')} className={`${styles.tile} ${styles.nav_tile} ${styles.color_yellow}`}>
          <TrophyIcon className={styles.icon} />
          <h4>Badges</h4>
        </button>
        <button onClick={() => setView('ADMIN')} className={`${styles.tile} ${styles.nav_tile} ${styles.color_dark_blue}`}>
          <UserCircleIcon className={styles.icon} />
          <h4>Admin Tools</h4>
        </button>
        <button onClick={onLogout} className={`${styles.tile} ${styles.nav_tile} ${styles.color_deep_red}`}>
          <ArrowRightOnRectangleIcon className={styles.icon} />
          <h4>Logout</h4>
        </button>
      </div>

      {/* Modals are kept outside the grid for proper stacking context */}
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
    </>
  );
};
