import React, { useState, useEffect } from 'react';
import type { Profile } from '../types';
import { fetchAllUsers } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { UsersIcon, UserCircleIcon, UserPlusIcon, UserMinusIcon, CheckCircleIcon } from './Icons';
import { TeamLogo } from './TeamLogo';
import { TEAMS } from '../services/mockData';

const UserCard: React.FC<{
    userProfile: Profile & { uid: string };
    isFriend: boolean;
    onAddFriend: (uid: string) => void;
    onRemoveFriend: (uid: string) => void;
}> = ({ userProfile, isFriend, onAddFriend, onRemoveFriend }) => {
    
    const favoriteTeam = userProfile.user.favoriteTeamId 
        ? Object.values(TEAMS).find(t => t.id === userProfile.user.favoriteTeamId) 
        : null;

    return (
        <div className="bg-surface rounded-xl shadow-card p-4 flex flex-col items-center text-center">
            {userProfile.user.avatarUrl ? (
                <img src={userProfile.user.avatarUrl} alt={userProfile.user.name} className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-border" />
            ) : (
                <div className="w-20 h-20 rounded-full bg-surface-alt flex items-center justify-center mb-3 border-2 border-border">
                    <UserCircleIcon className="w-12 h-12 text-text-subtle" />
                </div>
            )}
            <h3 className="font-bold text-text-strong text-lg">{userProfile.user.name}</h3>
            
            {favoriteTeam && (
                <div className="flex items-center gap-2 mt-1 text-sm text-text-subtle">
                    <TeamLogo teamId={favoriteTeam.id} teamName={favoriteTeam.name} size="small" />
                    <span>{favoriteTeam.name}</span>
                </div>
            )}

            <p className="text-sm font-semibold text-primary mt-3 [font-variant-numeric:tabular-nums]">
                {userProfile.attendedMatches?.length || 0} matches attended
            </p>

            <div className="mt-4 w-full">
                {isFriend ? (
                    <button 
                        onClick={() => onRemoveFriend(userProfile.uid)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors bg-secondary/10 text-secondary hover:bg-secondary/20"
                    >
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Friends</span>
                    </button>
                ) : (
                    <button
                        onClick={() => onAddFriend(userProfile.uid)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-colors bg-info text-white hover:bg-info/90"
                    >
                        <UserPlusIcon className="w-4 h-4" />
                        <span>Add Friend</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export const CommunityView: React.FC = () => {
    const { currentUser, profile, addFriend, removeFriend } = useAuth();
    const [users, setUsers] = useState<(Profile & { uid: string })[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = async () => {
        if (!currentUser) return;
        setLoading(true);
        setError(null);
        try {
            const fetchedUsers = await fetchAllUsers(currentUser.uid);
            setUsers(fetchedUsers);
        } catch (err) {
            console.error(err);
            setError("Failed to load community members. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner />
                <p className="mt-4 text-text-subtle">Finding other fans...</p>
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={loadUsers} />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border pb-4">
                <UsersIcon className="w-8 h-8 text-primary" />
                <div>
                    <h1 className="text-3xl font-bold text-text-strong">Community Hub</h1>
                    <p className="text-text-subtle mt-1">Connect with other rugby league supporters.</p>
                </div>
            </div>

            {users.length === 0 ? (
                 <div className="text-center py-20 bg-surface rounded-md">
                    <h2 className="text-2xl font-bold text-text-strong">It's Quiet in Here...</h2>
                    <p className="text-text-subtle mt-2">Looks like you're one of the first fans! Check back soon to connect with others.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map(userProfile => (
                        <UserCard 
                            key={userProfile.uid}
                            userProfile={userProfile}
                            isFriend={profile?.friendIds?.includes(userProfile.uid) || false}
                            onAddFriend={addFriend}
                            onRemoveFriend={removeFriend}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};