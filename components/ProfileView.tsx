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
  LogoIcon,
  PencilIcon,
  SparklesIcon,
  TrophyIcon,
  UserCircleIcon,
} from './Icons';
import { TEAMS } from '../services/mockData';
import styles from './ProfileView.module.css';
import { formatDateUK } from '../utils/date';

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
      <div className={styles.profilePage}>
        <section className={styles.hero}>
          <div className={styles.heroBackdrop} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.identityRow}>
              <div className={styles.identityMain}>
                <div className={styles.avatarWrap}>
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Profile avatar" className={styles.avatarImage} />
                  ) : (
                    <UserCircleIcon className={styles.avatarPlaceholder} />
                  )}
                  <button
                    onClick={() => setIsAvatarModalOpen(true)}
                    className={styles.avatarEdit}
                    aria-label="Edit avatar"
                  >
                    <PencilIcon />
                  </button>
                </div>
                <div className={styles.identityText}>
                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className={styles.nameForm}>
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
                    <button type="button" onClick={() => setIsEditingName(true)} className={styles.nameButton}>
                      <span>{user.name}</span>
                      <PencilIcon aria-hidden="true" />
                    </button>
                  )}
                  <span className={styles.tagline}>
                    <SparklesIcon aria-hidden="true" />
                    {profileTagline}
                  </span>
                  {favoriteTeam && (
                    <span className={styles.teamBadge}>
                      <TeamLogo
                        teamId={favoriteTeam.id}
                        teamName={favoriteTeam.name}
                        size="small"
                        className={styles.teamLogoBadge}
                      />
                      {favoriteTeam.name}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.logoWrap} aria-hidden="true">
                <LogoIcon className={styles.logoImage} theme="light" />
              </div>
            </div>

            <dl className={styles.statRow}>
              <div className={styles.statCard}>
                <ListBulletIcon aria-hidden="true" />
                <dt>Matches Attended</dt>
                <dd>{attendedMatches.length}</dd>
              </div>
              <div className={styles.statCard}>
                <TrophyIcon aria-hidden="true" />
                <dt>Badges Unlocked</dt>
                <dd>{earnedBadgeIds.length}</dd>
              </div>
              <div className={styles.statCard}>
                <BuildingStadiumIcon aria-hidden="true" />
                <dt>Grounds Visited</dt>
                <dd>{new Set(attendedMatches.map(am => am.match.venue)).size}</dd>
              </div>
            </dl>
          </div>
        </section>

        <main className={styles.mainContent}>
          <div className={styles.summaryGrid}>
            <section className={`${styles.detailCard} ${styles.myTeamCard}`}>
              <header className={styles.cardHeader}>
                <h2>My Team</h2>
                <button type="button" onClick={() => setIsTeamModalOpen(true)}>
                  {favoriteTeam ? 'Change Team' : 'Select Team'}
                </button>
              </header>
              <div className={styles.cardBody}>
                {favoriteTeam ? (
                  <div className={styles.teamSummary}>
                    <TeamLogo
                      teamId={favoriteTeam.id}
                      teamName={favoriteTeam.name}
                      className={styles.teamLogoSummary}
                    />
                    <span>{favoriteTeam.name}</span>
                  </div>
                ) : (
                  <p>No favorite team selected yet.</p>
                )}
              </div>
            </section>

            <section className={`${styles.detailCard} ${styles.lastMatchCard}`}>
              <header className={styles.cardHeader}>
                <h2>Last Match</h2>
              </header>
              <div className={styles.cardBody}>
                {recentMatch ? (
                  <div className={styles.matchSummary}>
                    <p>{`${recentMatch.match.homeTeam.name} vs ${recentMatch.match.awayTeam.name}`}</p>
                    <span className={styles.matchScore}>{`${recentMatch.match.scores.home} - ${recentMatch.match.scores.away}`}</span>
                    <span className={styles.matchMeta}>
                      {recentMatch.match.venue}
                      {' · '}
                      {formatDateUK(recentMatch.attendedOn)}
                    </span>
                  </div>
                ) : (
                  <p>No matches attended yet.</p>
                )}
              </div>
            </section>

            <section className={`${styles.detailCard} ${styles.actionCard}`}>
              <header className={styles.cardHeader}>
                <h2>Quick Links</h2>
              </header>
              <nav className={`${styles.quickActions} ${styles.quickActionsRail}`} aria-label="Profile navigation">
                <button type="button" onClick={() => setView('MY_MATCHES')}>
                  <ListBulletIcon aria-hidden="true" />
                  <span>My Matches</span>
                </button>
                <button type="button" onClick={() => setView('BADGES')}>
                  <TrophyIcon aria-hidden="true" />
                  <span>Badges</span>
                </button>
                <button type="button" onClick={() => setView('ADMIN')}>
                  <UserCircleIcon aria-hidden="true" />
                  <span>Admin Tools</span>
                </button>
                <button type="button" onClick={() => setView('STATS')}>
                  <ChartBarIcon aria-hidden="true" />
                  <span>My Stats</span>
                </button>
                <button type="button" onClick={onLogout}>
                  <ArrowRightOnRectangleIcon aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </nav>
            </section>
          </div>
        </main>
      </div>

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
