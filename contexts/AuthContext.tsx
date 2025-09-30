import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type firebase from 'firebase/compat/app';
import { auth, storage } from '../firebase';
import type { User, AttendedMatch, Profile, Prediction } from '../types';
import {
  getUserProfile,
  createUserProfile,
  addAttendedMatchToProfile,
  removeAttendedMatchFromProfile,
  updateUserProfile,
  addBadgeToProfile,
  updateAttendedMatchPhotoInProfile,
  addFriendToProfile,
  removeFriendFromProfile,
  savePrediction,
  deletePrediction,
} from '../services/userService';
import { checkAndAwardBadges } from '../badges';

interface AuthContextType {
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

const LOCAL_PROFILE_KEY = 'scrum-book:offline-profile';
const LOCAL_AUTH_KEY = 'scrum-book:offline-auth';

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const createEmptyProfile = (): Profile => ({
  user: { name: 'Guest' },
  attendedMatches: [],
  earnedBadgeIds: [],
  friendIds: [],
  predictions: [],
});

const loadOfflineProfile = (): Profile | null => {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(LOCAL_PROFILE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as Profile;
  } catch (error) {
    console.warn('Failed to parse offline profile. Resetting to defaults.', error);
    return null;
  }
};

const persistOfflineProfile = (profile: Profile) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profile));
};

const ensureOfflineProfile = (): Profile => {
  const existing = loadOfflineProfile();
  if (existing) {
    return existing;
  }
  const fresh = createEmptyProfile();
  persistOfflineProfile(fresh);
  return fresh;
};

const offlineUser = {
  uid: 'offline-user',
  displayName: 'Offline Fan',
  isAnonymous: true,
} as unknown as firebase.User;

const markOfflineAuthenticated = (authenticated: boolean) => {
  if (!isBrowser()) {
    return;
  }
  if (authenticated) {
    window.localStorage.setItem(LOCAL_AUTH_KEY, 'true');
  } else {
    window.localStorage.removeItem(LOCAL_AUTH_KEY);
  }
};

const hasOfflineSession = () => isBrowser() && window.localStorage.getItem(LOCAL_AUTH_KEY) === 'true';

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

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
    if (!auth) {
      if (hasOfflineSession()) {
        const existingProfile = ensureOfflineProfile();
        setCurrentUser(offlineUser);
        setProfile(existingProfile);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userProfile = await getUserProfile(user.uid);
          if (userProfile) {
            const finalUser =
              userProfile.user && typeof userProfile.user === 'object'
                ? (userProfile.user as User)
                : { name: user.displayName || 'Rugby Fan' };

            const sanitizedProfile: Profile = {
              user: {
                name: finalUser.name || user.displayName || 'Rugby Fan',
                favoriteTeamId: finalUser.favoriteTeamId,
                avatarUrl: finalUser.avatarUrl,
              },
              attendedMatches: (Array.isArray(userProfile.attendedMatches) ? userProfile.attendedMatches : []).filter(
                (am) => am && am.match && typeof am.match.id === 'string'
              ),
              earnedBadgeIds: Array.isArray(userProfile.earnedBadgeIds) ? userProfile.earnedBadgeIds : [],
              friendIds: Array.isArray(userProfile.friendIds) ? userProfile.friendIds : [],
              predictions: (Array.isArray(userProfile.predictions) ? userProfile.predictions : []).filter(
                (p) => p && typeof p.matchId === 'string'
              ),
            };
            setProfile(sanitizedProfile);
          } else {
            const newProfile: Profile = createEmptyProfile();
            newProfile.user.name = user.displayName || 'Rugby Fan';
            await createUserProfile(user.uid, newProfile);
            setProfile(newProfile);
          }
        } catch (error: any) {
          if (error.code === 'unavailable') {
            console.warn('Failed to get user profile (client is offline). Using a temporary local profile for this session.');
          } else {
            console.error('Failed to get or create user profile:', error?.message ?? error);
            console.warn('Using a temporary local profile for this session.');
          }
          const temporaryProfile = createEmptyProfile();
          setProfile(temporaryProfile);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async () => {
    setLoading(true);
    if (!auth) {
      markOfflineAuthenticated(true);
      const existingProfile = ensureOfflineProfile();
      setCurrentUser(offlineUser);
      setProfile(existingProfile);
      setLoading(false);
      return;
    }

    try {
      await auth.signInAnonymously();
    } catch (error) {
      console.error('Anonymous sign-in failed', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    if (!auth) {
      markOfflineAuthenticated(false);
      setCurrentUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    await auth.signOut();
  };

  const addAttendedMatch = async (match: AttendedMatch['match']) => {
    if (!currentUser || !profile) {
      return;
    }

    const newAttendedMatch: AttendedMatch = {
      match,
      attendedOn: new Date().toISOString(),
    };

    const updatedMatches = [...(profile.attendedMatches || []), newAttendedMatch];
    const newlyEarnedBadges = checkAndAwardBadges(updatedMatches, profile.earnedBadgeIds || [], profile.user);
    const updatedBadgeIds = [...(profile.earnedBadgeIds || []), ...newlyEarnedBadges];
    const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches, earnedBadgeIds: updatedBadgeIds };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await addAttendedMatchToProfile(currentUser.uid, newAttendedMatch);
      if (newlyEarnedBadges.length > 0) {
        await addBadgeToProfile(currentUser.uid, newlyEarnedBadges);
      }
    } catch (error: any) {
      if (error.code === 'unavailable') {
        console.warn('Offline: Attended match saved locally. It will sync when connection is restored.');
        persistOfflineProfile(nextProfile);
      } else {
        console.error('Error adding attended match:', error);
      }
    }
  };

  const removeAttendedMatch = async (matchId: string) => {
    if (!currentUser || !profile) return;

    const updatedMatches = (profile.attendedMatches || []).filter((am) => am.match.id !== matchId);
    const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await removeAttendedMatchFromProfile(currentUser.uid, matchId);
    } catch (error: any) {
      if (error.code === 'unavailable') {
        console.warn('Offline: Match removal saved locally. It will sync when connection is restored.');
        persistOfflineProfile(nextProfile);
      } else {
        console.error('Error removing attended match:', error);
      }
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!currentUser || !profile) return;

    const newProfileUser = { ...profile.user, ...updatedUser };
    const nextProfile: Profile = { ...profile, user: newProfileUser };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await updateUserProfile(currentUser.uid, { user: newProfileUser });
    } catch (error: any) {
      if (error.code === 'unavailable') {
        console.warn('Offline: User profile update saved locally. It will sync when connection is restored.');
        persistOfflineProfile(nextProfile);
      } else {
        console.error('Error updating user profile:', error);
      }
    }
  };

  const addPhotoToMatch = async (matchId: string, photoFile: File) => {
    if (!currentUser || !profile) return;

    if (!auth || !storage) {
      try {
        const photoUrl = await readFileAsDataUrl(photoFile);
        const updatedMatches = (profile.attendedMatches || []).map((am) =>
          am.match.id === matchId ? { ...am, photoUrl } : am
        );
        const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches };
        setProfile(nextProfile);
        persistOfflineProfile(nextProfile);
      } catch (error) {
        console.error('Failed to process photo offline:', error);
      }
      return;
    }

    const filePath = `users/${currentUser.uid}/photos/${matchId}-${photoFile.name}`;
    const storageRef = storage.ref(filePath);
    const fileSnapshot = await storageRef.put(photoFile);
    const photoUrl = await fileSnapshot.ref.getDownloadURL();

    const updatedMatches = (profile.attendedMatches || []).map((am) =>
      am.match.id === matchId ? { ...am, photoUrl } : am
    );
    const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches };

    setProfile(nextProfile);

    try {
      await updateAttendedMatchPhotoInProfile(currentUser.uid, matchId, photoUrl);
    } catch (error: any) {
      if (error.code === 'unavailable') {
        console.warn('Offline: Photo URL update saved locally and will sync when connection is restored.');
        persistOfflineProfile(nextProfile);
      } else {
        console.error('Error updating photo URL in profile:', error);
      }
    }
  };

  const addFriend = async (friendId: string) => {
    if (!currentUser || !profile) return;
    const updatedFriendIds = [...profile.friendIds, friendId];
    const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await addFriendToProfile(currentUser.uid, friendId);
    } catch (error) {
      console.error('Error adding friend:', error);
      setProfile(profile);
    }
  };

  const removeFriend = async (friendId: string) => {
    if (!currentUser || !profile) return;
    const updatedFriendIds = profile.friendIds.filter((id) => id !== friendId);
    const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await removeFriendFromProfile(currentUser.uid, friendId);
    } catch (error) {
      console.error('Error removing friend:', error);
      setProfile(profile);
    }
  };

  const saveUserPrediction = async (prediction: Prediction) => {
    if (!currentUser || !profile) return;
    const otherPredictions = (profile.predictions || []).filter((p) => p.matchId !== prediction.matchId);
    const updatedPredictions = [...otherPredictions, prediction];
    const nextProfile: Profile = { ...profile, predictions: updatedPredictions };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await savePrediction(currentUser.uid, prediction);
    } catch (error) {
      console.error('Error saving prediction:', error);
      setProfile(profile);
    }
  };

  const deleteUserPrediction = async (matchId: string) => {
    if (!currentUser || !profile) return;
    const updatedPredictions = (profile.predictions || []).filter((p) => p.matchId !== matchId);
    const nextProfile: Profile = { ...profile, predictions: updatedPredictions };

    setProfile(nextProfile);

    if (!auth) {
      persistOfflineProfile(nextProfile);
      return;
    }

    try {
      await deletePrediction(currentUser.uid, matchId);
    } catch (error) {
      console.error('Error deleting prediction:', error);
      setProfile(profile);
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
