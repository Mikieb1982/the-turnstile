import styles from './ProfileView.module.css';
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
      <div className="tile-grid">
        {/* Profile Tile */}
        <div className="tile profile-tile color-deep-red">
          <div className="profile-avatar">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile avatar" className="avatar-img" />
            ) : (
              <UserCircleIcon className="avatar-placeholder" />
            )}
            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="edit-avatar-button"
              aria-label="Edit avatar"
            >
              <PencilIcon />
            </button>
          </div>
          <div className="profile-info">
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="name-edit-form">
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
              <h1 onClick={() => setIsEditingName(true)} className="profile-name">
                {user.name} <PencilIcon className="edit-name-icon" />
              </h1>
            )}
            <p className="profile-status">
              {attendedMatches.length} matches attended | {earnedBadgeIds.length} badges earned
            </p>
          </div>
        </div>

        {/* My Team Tile */}
        <div className="tile color-dark-blue">
          <h3 className="tile-title">My Team</h3>
          {favouriteTeam ? (
            <div className="team-info">
              <TeamLogo teamId={favouriteTeam.id} teamName={favouriteTeam.name} />
              <span className="team-name">{favouriteTeam.name}</span>
            </div>
          ) : (
            <p className="tile-description">No favorite team selected.</p>
          )}
          <button onClick={() => setIsTeamModalOpen(true)} className="tile-button">
            {favouriteTeam ? 'Change' : 'Select'} Team
          </button>
        </div>

        {/* Last Match Stats Tile */}
        <div className="tile color-deep-red">
            <h3 className="tile-title">Last Match</h3>
            {recentMatch ? (
                <div className="match-recap">
                    <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
                    <p className="match-score">{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</p>
                </div>
            ) : (
                <p className='tile-description'>No matches attended yet.</p>
            )}
        </div>


        {/* Navigation Tiles */}
        <button onClick={() => setView('MY_MATCHES')} className="tile nav-tile color-yellow">
          <ListBulletIcon className="icon" />
          <h4>My Matches</h4>
        </button>
        <button onClick={() => setView('GROUNDS')} className="tile nav-tile color-dark-blue">
          <BuildingStadiumIcon className="icon" />
          <h4>Grounds</h4>
        </button>
        <button onClick={() => setView('STATS')} className="tile nav-tile color-deep-red">
          <ChartBarIcon className="icon" />
          <h4>My Stats</h4>
        </button>
        <button onClick={() => setView('BADGES')} className="tile nav-tile color-yellow">
          <TrophyIcon className="icon" />
          <h4>Badges</h4>
        </button>
        <button onClick={() => setView('ADMIN')} className="tile nav-tile color-dark-blue">
          <UserCircleIcon className="icon" />
          <h4>Admin Tools</h4>
        </button>
        <button onClick={onLogout} className="tile nav-tile color-deep-red">
          <ArrowRightOnRectangleIcon className="icon" />
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
