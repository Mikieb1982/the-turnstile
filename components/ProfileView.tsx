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
      <div className={styles.profile_grid}>
        <section className={`${styles.tile} ${styles.profile_tile}`}>
          <div className={styles.profile_avatar}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Profile avatar" className={styles.avatar_img} />
            ) : (
              <UserCircleIcon className={styles.avatar_placeholder} />
            )}
            <button onClick={() => setIsAvatarModalOpen(true)} className={styles.edit_avatar_button} aria-label="Edit avatar">
              <PencilIcon />
            </button>
          </div>
          <div className={styles.profile_info}>
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
            <span className={styles.profile_tagline}>{profileTagline}</span>
            <div className={styles.profile_stats}>
              <div className={styles.stat_chip}>
                <span className={styles.stat_value}>{attendedMatches.length}</span>
                <span className={styles.stat_label}>Matches</span>
              </div>
              <div className={styles.stat_chip}>
                <span className={styles.stat_value}>{earnedBadgeIds.length}</span>
                <span className={styles.stat_label}>Badges</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.tile} ${styles.info_tile}`}>
          <h3 className={styles.tile_title}>My Team</h3>
          {favoriteTeam ? (
            <div className={styles.team_info}>
              <TeamLogo teamId={favoriteTeam.id} teamName={favoriteTeam.name} />
              <span className={styles.team_name}>{favoriteTeam.name}</span>
            </div>
          ) : (
            <p className={styles.tile_description}>No favorite team selected.</p>
          )}
          <button onClick={() => setIsTeamModalOpen(true)} className={styles.tile_button}>
            {favoriteTeam ? 'Change' : 'Select'} Team
          </button>
        </section>

        <section className={`${styles.tile} ${styles.info_tile}`}>
          <h3 className={styles.tile_title}>Last Match</h3>
          {recentMatch ? (
            <div className={styles.match_recap}>
              <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
              <p className={styles.match_score}>{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</p>
            </div>
          ) : (
            <p className={styles.tile_description}>No matches attended yet.</p>
          )}
        </section>

        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={() => setView('MY_MATCHES')}>
          <ListBulletIcon className={styles.icon} />
          <h4>My Matches</h4>
        </button>
        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={() => setView('GROUNDS')}>
          <BuildingStadiumIcon className={styles.icon} />
          <h4>Grounds</h4>
        </button>
        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={() => setView('STATS')}>
          <ChartBarIcon className={styles.icon} />
          <h4>My Stats</h4>
        </button>
        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={() => setView('BADGES')}>
          <TrophyIcon className={styles.icon} />
          <h4>Badges</h4>
        </button>
        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={() => setView('ADMIN')}>
          <UserCircleIcon className={styles.icon} />
          <h4>Admin Tools</h4>
        </button>
        <button className={`${styles.tile} ${styles.nav_tile}`} onClick={onLogout}>
          <ArrowRightOnRectangleIcon className={styles.icon} />
          <h4>Logout</h4>
        </button>
      </div>

      <TeamSelectionModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} onSelectTeam={handleTeamSelect} currentTeamId={user.favoriteTeamId} />
      <AvatarModal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} onSave={handleAvatarSave} currentAvatar={user.avatarUrl} />
    </>
  );
};
