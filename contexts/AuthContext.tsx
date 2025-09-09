import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';
import type { User, AttendedMatch, Profile } from '../types';
import { getUserProfile, createUserProfile, addAttendedMatchToProfile, removeAttendedMatchFromProfile, updateUserProfile, addBadgeToProfile } from '../services/userService';
import { checkAndAwardBadges } from '../badges';

interface AuthContextType {
    currentUser: firebase.User | null;
    profile: Profile | null;
    loading: boolean;
    logout: () => Promise<void>;
    addAttendedMatch: (match: AttendedMatch['match']) => Promise<void>;
    removeAttendedMatch: (matchId: string) => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                try {
                    const userProfile = await getUserProfile(user.uid);
                    if (userProfile) {
                        setProfile(userProfile);
                    } else {
                        // Create a profile for a new anonymous user
                        const newProfile: Profile = {
                            user: { name: 'Rugby Fan' },
                            attendedMatches: [],
                            earnedBadgeIds: [],
                        };
                        await createUserProfile(user.uid, newProfile);
                        setProfile(newProfile);
                    }
                } catch (error: any) {
                    if (error.code === 'unavailable') {
                         console.warn("Failed to get user profile (client is offline). Using a temporary local profile for this session.");
                    } else {
                        console.error("Failed to get or create user profile:", error.message);
                        console.warn("Using a temporary local profile for this session.");
                    }
                    // Create a temporary profile for offline use to allow the app to function.
                    const temporaryProfile: Profile = {
                        user: { name: 'Guest' },
                        attendedMatches: [],
                        earnedBadgeIds: [],
                    };
                    setProfile(temporaryProfile);
                } finally {
                    setLoading(false);
                }
            } else {
                // If no user, automatically sign in as guest
                auth.signInAnonymously().catch(error => {
                    console.error("Auto anonymous sign-in failed", error);
                    setLoading(false); // Stop loading on failure
                });
            }
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        setLoading(true);
        // Signing out will trigger onAuthStateChanged, which will create a new anonymous user.
        await auth.signOut();
    };

    const addAttendedMatch = async (match: AttendedMatch['match']) => {
        if (!currentUser || !profile) return;
        
        const newAttendedMatch: AttendedMatch = {
            match,
            attendedOn: new Date().toISOString()
        };

        const updatedMatches = [...profile.attendedMatches, newAttendedMatch];
        const newlyEarnedBadges = checkAndAwardBadges(updatedMatches, profile.earnedBadgeIds, profile.user);

        // Optimistically update state for a responsive UI
        setProfile(prev => {
            if (!prev) return null;
            const updatedBadgeIds = [...prev.earnedBadgeIds, ...newlyEarnedBadges];
            return { ...prev, attendedMatches: updatedMatches, earnedBadgeIds: updatedBadgeIds };
        });

        // Sync with Firestore, handling offline state
        try {
            await addAttendedMatchToProfile(currentUser.uid, newAttendedMatch);
            if (newlyEarnedBadges.length > 0) {
                await addBadgeToProfile(currentUser.uid, newlyEarnedBadges);
            }
        } catch (error: any) {
            if (error.code === 'unavailable') {
                console.warn('Offline: Attended match saved locally. It will sync when connection is restored.');
            } else {
                console.error("Error adding attended match:", error);
            }
        }
    };

    const removeAttendedMatch = async (matchId: string) => {
        if (!currentUser || !profile) return;
        
        // Optimistically update state
        const updatedMatches = profile.attendedMatches.filter(am => am.match.id !== matchId);
        setProfile(prev => prev ? { ...prev, attendedMatches: updatedMatches } : null);

        // Sync with Firestore, handling offline state
        try {
            await removeAttendedMatchFromProfile(currentUser.uid, matchId);
        } catch (error: any) {
            if (error.code === 'unavailable') {
                console.warn('Offline: Match removal saved locally. It will sync when connection is restored.');
            } else {
                console.error("Error removing attended match:", error);
            }
        }
    };
    
    const updateUser = async (updatedUser: Partial<User>) => {
        if (!currentUser || !profile) return;

        const newProfileUser = { ...profile.user, ...updatedUser };

        // Optimistically update state
        setProfile(prev => prev ? { ...prev, user: newProfileUser } : null);

        // Sync with Firestore, handling offline state
        try {
            await updateUserProfile(currentUser.uid, { user: newProfileUser });
        } catch (error: any) {
            if (error.code === 'unavailable') {
                console.warn('Offline: User profile update saved locally. It will sync when connection is restored.');
            } else {
                console.error("Error updating user profile:", error);
            }
        }
    };

    const value = {
        currentUser,
        profile,
        loading,
        logout,
        addAttendedMatch,
        removeAttendedMatch,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};