import React, { useState, useMemo } from 'react';
import type { User, AttendedMatch } from '../types';
import { TEAMS } from '../services/mockData';
import { TeamLogo } from './TeamLogo';
import { TeamSelectionModal } from './TeamSelectionModal';
import { AvatarModal } from './AvatarModal';
import { View } from '../App';
import { UserCircleIcon, PencilIcon, ListBulletIcon, Squares2X2Icon, ChartBarIcon, TrophyIcon, StarIcon, ArrowLeftOnRectangleIcon, ServerIcon } from './Icons';

interface ProfileViewProps {
  user: User;
  setUser: (user: Partial<User>) => void;
  setView: (view: View) => void;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  onLogout: () => void;
}

const ProfileLink: React.FC<{ icon: React.ReactNode; label: string; count?: number; onClick: () => void; }> = ({ icon, label, count, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 bg-surface rounded-md shadow-sm hover:bg-surface-alt transition-colors text-left text-lg">
        <div className="mr-4 text-primary">{icon}</div>
        <div className="flex-grow">
            <span className="font-semibold text-text-strong">{label}</span>
        </div>
        {typeof count !== 'undefined' && (
            <div className="font-semibold text-text-subtle [font-variant-numeric:tabular-nums]">
                ({count})
            </div>
        )}
    </button>
);


export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser, setView, attendedMatches, earnedBadgeIds, onLogout }) => {
    const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    const favoriteTeam = useMemo(() => {
        if (!user.favoriteTeamId) return null;
        return Object.values(TEAMS).find(t => t.id === user.favoriteTeamId) || null;
    }, [user.favoriteTeamId]);

    const uniqueVenuesCount = useMemo(() => {
        return new Set(attendedMatches.map(am => am.match.venue)).size;
    }, [attendedMatches]);

    const handleSelectTeam = (teamId: string) => {
        setUser({ favoriteTeamId: teamId });
        setIsTeamModalOpen(false);
    };

    const handleSaveAvatar = (avatarUrl: string) => {
        setUser({ avatarUrl });
        setIsAvatarModalOpen(false);
    }

    return (
        <div className="space-y-6">
            <div className="bg-surface rounded-xl shadow-card p-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16">
                           {user.avatarUrl ? (
                                <img src={user.avatarUrl} alt="User avatar" className="w-16 h-16 rounded-full object-cover border-2 border-border" />
                           ) : (
                                <div className="w-16 h-16 bg-surface-alt rounded-full flex items-center justify-center border-2 border-border">
                                    <UserCircleIcon className="w-10 h-10 text-text-subtle" />
                                </div>
                           )}
                           <button 
                             onClick={() => setIsAvatarModalOpen(true)}
                             className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1.5 border-2 border-surface hover:bg-primary/90 transition-colors"
                             aria-label="Edit avatar"
                           >
                                <PencilIcon className="w-3 h-3"/>
                           </button>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-text-strong">{user.name}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        {favoriteTeam ? (
                            <TeamLogo teamId={favoriteTeam.id} teamName={favoriteTeam.name} size="medium" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-surface-alt border-2 border-dashed border-border flex items-center justify-center">
                                <StarIcon className="w-6 h-6 text-text-subtle" />
                            </div>
                        )}
                        <button onClick={() => setIsTeamModalOpen(true)} className="mt-2 text-xs text-primary hover:underline font-semibold flex items-center gap-1 mx-auto">
                            <PencilIcon className="w-3 h-3"/>
                            Change Team
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileLink
                    icon={<ListBulletIcon className="w-6 h-6" />}
                    label="My Matches"
                    count={attendedMatches.length}
                    onClick={() => setView('MY_MATCHES')}
                />
                <ProfileLink
                    icon={<Squares2X2Icon className="w-6 h-6" />}
                    label="Grounds"
                    count={uniqueVenuesCount}
                    onClick={() => setView('GROUNDS')}
                />
                 <ProfileLink
                    icon={<ChartBarIcon className="w-6 h-6" />}
                    label="Stats"
                    onClick={() => setView('STATS')}
                />
                <ProfileLink
                    icon={<TrophyIcon className="w-6 h-6" />}
                    label="Badges"
                    count={earnedBadgeIds.length}
                    onClick={() => setView('BADGES')}
                />
            </div>
            
             <div className="mt-6 border-t border-border pt-6 space-y-4">
                <ProfileLink
                    icon={<ServerIcon className="w-6 h-6" />}
                    label="Admin Tools"
                    onClick={() => setView('ADMIN')}
                />
                <button
                    onClick={onLogout}
                    className="flex items-center w-full p-4 bg-surface rounded-md shadow-sm hover:bg-danger/10 transition-colors text-left text-lg"
                >
                    <div className="mr-4 text-danger"><ArrowLeftOnRectangleIcon className="w-6 h-6" /></div>
                    <div className="flex-grow">
                        <span className="font-semibold text-danger">Logout</span>
                    </div>
                </button>
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