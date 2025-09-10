import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// FIX: Update Firebase imports for v9 compat API.
import type firebase from 'firebase/compat/app';
import { auth, storage } from '../firebase';
import type { User, AttendedMatch, Profile, Prediction } from '../types';
import { getUserProfile, createUserProfile, addAttendedMatchToProfile, removeAttendedMatchFromProfile, updateUserProfile, addBadgeToProfile, updateAttendedMatchPhotoInProfile, addFriendToProfile, removeFriendFromProfile, savePrediction, deletePrediction } from '../services/userService';
import { checkAndAwardBadges } from '../badges';

interface AuthContextType {
    // FIX: Use firebase.User type from the compat library.
    currentUser: firebase.User | null;
    profile: Profile | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    addAttendedMatch: (match: AttendedMatch['match']) => Promise<void>;
    removeAttendedMatch: (matchId: string) => Promise<void>;
    updateUser: (user: Partial<User>) => Promise<void>;
    addPhotoToMatch: (matchId: string, photoFile: File) => Promise<void>;
    addFriend: (friendId: string) => Promise<void>;
    removeFriend: (friendId: string) => Promise<void>;
    saveUserPrediction: (prediction: Prediction) => Promise<void>;
    deleteUserPrediction: (matchId: string) => Promise<void>;
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
        // FIX: Use v8-compatible onAuthStateChanged method.
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setCurrentUser(user);
                try {
                    const userProfile = await getUserProfile(user.uid);
                    if (userProfile) {
                        // Sanitize the profile to ensure all required fields are present and of the correct type.
                        const finalUser = (userProfile.user && typeof userProfile.user === 'object') 
                            ? (userProfile.user as User)
                            : { name: user.displayName || 'Rugby Fan' };

                        const sanitizedProfile: Profile = {
                            user: {
                                name: finalUser.name || user.displayName || 'Rugby Fan',
                                favoriteTeamId: finalUser.favoriteTeamId,
                                avatarUrl: finalUser.avatarUrl,
                            },
                            attendedMatches: (Array.isArray(userProfile.attendedMatches) ? userProfile.attendedMatches : [])
                                .filter(am => am && am.match && typeof am.match.id === 'string'),
                            earnedBadgeIds: Array.isArray(userProfile.earnedBadgeIds) ? userProfile.earnedBadgeIds : [],
                            friendIds: Array.isArray(userProfile.friendIds) ? userProfile.friendIds : [],
                            predictions: (Array.isArray(userProfile.predictions) ? userProfile.predictions : [])
                                .filter(p => p && typeof p.matchId === 'string'),
                        };
                        setProfile(sanitizedProfile);
                    } else {
                        // Create a profile for a new anonymous user
                        const newProfile: Profile = {
                            user: { name: user.displayName || 'Rugby Fan' },
                            attendedMatches: [],
                            earnedBadgeIds: [],
                            friendIds: [],
                            predictions: [],
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
                        friendIds: [],
                        predictions: [],
                    };
                    setProfile(temporaryProfile);
                } finally {
                    setLoading(false);
                }
            } else {
                // User is signed out. Update the state and stop loading.
                setCurrentUser(null);
                setProfile(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const login = async () => {
        setLoading(true);
        try {
            // FIX: Use v8-compatible signInAnonymously method.
            await auth.signInAnonymously();
            // onAuthStateChanged will handle setting the user and profile
        } catch (error) {
            console.error("Anonymous sign-in failed", error);
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        // Signing out will trigger onAuthStateChanged, which will clear user and profile.
        // FIX: Use v8-compatible signOut method.
        await auth.signOut();
    };

    const addAttendedMatch = async (match: AttendedMatch['match']) => {
        if (!currentUser || !profile) return;
        
        const newAttendedMatch: AttendedMatch = {
            match,
            attendedOn: new Date().toISOString()
        };

        const updatedMatches = [...(profile.attendedMatches || []), newAttendedMatch];
        const newlyEarnedBadges = checkAndAwardBadges(updatedMatches, profile.earnedBadgeIds || [], profile.user);

        // Optimistically update state for a responsive UI
        setProfile(prev => {
            if (!prev) return null;
            const updatedBadgeIds = [...(prev.earnedBadgeIds || []), ...newlyEarnedBadges];
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
        const updatedMatches = (profile.attendedMatches || []).filter(am => am.match.id !== matchId);
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

    const addPhotoToMatch = async (matchId: string, photoFile: File) => {
        if (!currentUser || !profile) return;

        const filePath = `users/${currentUser.uid}/photos/${matchId}-${photoFile.name}`;
        // FIX: Use v8-compatible Storage API.
        const storageRef = storage.ref(filePath);
        const fileSnapshot = await storageRef.put(photoFile);
        const photoUrl = await fileSnapshot.ref.getDownloadURL();

        const updatedMatches = (profile.attendedMatches || []).map(am => {
            if (am.match.id === matchId) {
                return { ...am, photoUrl };
            }
            return am;
        });

        // Optimistically update local state
        setProfile(prev => prev ? { ...prev, attendedMatches: updatedMatches } : null);

        // Sync with Firestore
        try {
            await updateAttendedMatchPhotoInProfile(currentUser.uid, matchId, photoUrl);
        } catch (error: any) {
            if (error.code === 'unavailable') {
                console.warn('Offline: Photo URL update saved locally and will sync when connection is restored.');
            } else {
                console.error("Error updating photo URL in profile:", error);
                // Optional: revert optimistic update on failure
            }
        }
    };

    const addFriend = async (friendId: string) => {
        if (!currentUser || !profile) return;
        const updatedFriendIds = [...profile.friendIds, friendId];
        setProfile({ ...profile, friendIds: updatedFriendIds });
        try {
            await addFriendToProfile(currentUser.uid, friendId);
        } catch (error) {
            console.error("Error adding friend:", error);
            setProfile(profile); // Revert on error
        }
    };

    const removeFriend = async (friendId: string) => {
        if (!currentUser || !profile) return;
        const updatedFriendIds = profile.friendIds.filter(id => id !== friendId);
        setProfile({ ...profile, friendIds: updatedFriendIds });
        try {
            await removeFriendFromProfile(currentUser.uid, friendId);
        } catch (error) {
            console.error("Error removing friend:", error);
            setProfile(profile); // Revert on error
        }
    };

    const saveUserPrediction = async (prediction: Prediction) => {
        if (!currentUser || !profile) return;
        const otherPredictions = (profile.predictions || []).filter(p => p.matchId !== prediction.matchId);
        const updatedPredictions = [...otherPredictions, prediction];
        setProfile(prev => prev ? { ...prev, predictions: updatedPredictions } : null);

        try {
            await savePrediction(currentUser.uid, prediction);
        } catch (error) {
            console.error("Error saving prediction:", error);
            setProfile(profile); // Revert on error
        }
    };

    const deleteUserPrediction = async (matchId: string) => {
        if (!currentUser || !profile) return;
        const updatedPredictions = (profile.predictions || []).filter(p => p.matchId !== matchId);
        setProfile(prev => prev ? { ...prev, predictions: updatedPredictions } : null);

        try {
            await deletePrediction(currentUser.uid, matchId);
        } catch (error) {
            console.error("Error deleting prediction:", error);
            setProfile(profile); // Revert on error
        }
    };

    const value = {
        currentUser,
        profile,
        loading,
        login,
        logout,
        addAttendedMatch,
        removeAttendedMatch,
        updateUser,
        addPhotoToMatch,
        addFriend,
        removeFriend,
        saveUserPrediction,
        deleteUserPrediction,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
