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
} from './Icons';
import { TEAMS } from '../services/mockData';
import styles from './ProfileView.module.css';

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

  const favoriteTeam = useMemo(() => getTeamById(user.favoriteTeamId), [user.favoriteTeamId]);
  const recentMatch = useMemo(() => {
    if (attendedMatches.length === 0) return null;
    return [...attendedMatches].sort((a, b) => new Date(b.attendedOn).getTime() - new Date(a.attendedOn).getTime())[0];
  }, [attendedMatches]);

  const profileTagline = useMemo(() => {
    const matchCount = attendedMatches.length;
    if (matchCount >= 20) {
      return 'Stadium Trailblazer';
    }
    if (matchCount >= 10) {
      return 'Matchday Mainstay';
    }
    if (matchCount >= 3) {
      return 'Clubhouse Regular';
    }
    if (matchCount > 0) {
      return 'Fresh on the Pitch';
    }
    return 'Ready for Kick-off';
  }, [attendedMatches.length]);

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

  return (
    <>
      <div className={styles.dashboardGrid}>

        {/* Profile Header Tile */}
        <section className={`${styles.dashboardCard} ${styles.span2}`}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="Profile avatar" className={styles.avatarImg} />
              ) : (
                <UserCircleIcon className={styles.avatarPlaceholder} />
              )}
              <button onClick={() => setIsAvatarModalOpen(true)} className={styles.editAvatarButton} aria-label="Edit avatar">
                <PencilIcon />
              </button>
            </div>
            <div className={styles.profileInfo}>
              {isEditingName ? (
                <form onSubmit={handleSaveName} className={styles.nameEditForm}>
                  <input type="text" value={pendingName} onChange={(e) => setPendingName(e.target.value)} onBlur={handleSaveName} autoFocus />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <h1 onClick={() => setIsEditingName(true)} className={styles.profileName}>
                  {user.name} <PencilIcon className={styles.editNameIcon} />
                </h1>
              )}
              <span className={styles.profileTagline}>{profileTagline}</span>
            </div>
          </div>
        </section>

        {/* Stats Tiles */}
        <section className={`${styles.dashboardCard} ${styles.statCard}`}>
            <h2 className={styles.statValue}>{attendedMatches.length}</h2>
            <p className={styles.statLabel}>Matches Attended</p>
        </section>
        <section className={`${styles.dashboardCard} ${styles.statCard}`}>
            <h2 className={styles.statValue}>{earnedBadgeIds.length}</h2>
            <p className={styles.statLabel}>Badges Unlocked</p>
        </section>
        <section className={`${styles.dashboardCard} ${styles.statCard}`}>
            <h2 className={styles.statValue}>{new Set(attendedMatches.map(am => am.match.venue)).size}</h2>
            <p className={styles.statLabel}>Grounds Visited</p>
        </section>


        {/* My Team Tile */}
        <section className={`${styles.dashboardCard} ${styles.teamTile}`}>
            <h3 className={styles.tileTitle}>My Team</h3>
            <div className={styles.tileContent}>
            {favoriteTeam ? (
                <div className={styles.teamInfo}>
                <TeamLogo teamId={favoriteTeam.id} teamName={favoriteTeam.name} />
                <span className={styles.teamName}>{favoriteTeam.name}</span>
                </div>
            ) : (
                <p className={styles.tileDescription}>No favorite team selected.</p>
            )}
            </div>
            <button onClick={() => setIsTeamModalOpen(true)} className={styles.tileButton}>
                {favoriteTeam ? 'Change Team' : 'Select Team'}
            </button>
        </section>

        {/* Last Match Tile */}
        <section className={`${styles.dashboardCard} ${styles.matchTile}`}>
            <h3 className={styles.tileTitle}>Last Match</h3>
            <div className={styles.tileContent}>
            {recentMatch ? (
                <div className={styles.matchRecap}>
                <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
                <p className={styles.matchScore}>{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</p>
                </div>
            ) : (
                <p className={styles.tileDescription}>No matches attended yet.</p>
            )}
            </div>
        </section>

        {/* Navigation Tiles */}
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={() => setView('MY_MATCHES')}>
          <ListBulletIcon className={styles.navIcon} />
          <h4>My Matches</h4>
        </button>
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={() => setView('GROUNDS')}>
          <BuildingStadiumIcon className={styles.navIcon} />
          <h4>Grounds</h4>
        </button>
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={() => setView('STATS')}>
          <ChartBarIcon className={styles.navIcon} />
          <h4>My Stats</h4>
        </button>
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={() => setView('BADGES')}>
          <TrophyIcon className={styles.navIcon} />
          <h4>Badges</h4>
        </button>
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={() => setView('ADMIN')}>
          <UserCircleIcon className={styles.navIcon} />
          <h4>Admin Tools</h4>
        </button>
        <button className={`${styles.dashboardCard} ${styles.navTile}`} onClick={onLogout}>
          <ArrowRightOnRectangleIcon className={styles.navIcon} />
          <h4>Logout</h4>
        </button>
      </div>

      <TeamSelectionModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} onSelectTeam={handleTeamSelect} currentTeamId={user.favoriteTeamId} />
      <AvatarModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} onSave={handleAvatarSave} currentAvatar={user.avatarUrl} />
    </>
  );
};
