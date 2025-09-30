import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  User,
  AttendedMatch,
  Profile,
  AuthUser,
  Prediction,
  SaveUserPredictionInput,
} from '../types';
import { checkAndAwardBadges } from '../badges';

interface AuthContextType {
  currentUser: AuthUser | null;
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
  saveUserPrediction: (input: SaveUserPredictionInput) => Promise<void>;
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

const mergeProfileDefaults = (profile: Partial<Profile> | null): Profile => {
  const empty = createEmptyProfile();

  if (!profile) {
    return empty;
  }

  return {
    ...empty,
    ...profile,
    user: { ...empty.user, ...(profile.user ?? {}) },
    attendedMatches: profile.attendedMatches ?? [],
    earnedBadgeIds: profile.earnedBadgeIds ?? [],
    friendIds: profile.friendIds ?? [],
    predictions: profile.predictions ?? [],
  };
};

const loadOfflineProfile = (): Profile | null => {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(LOCAL_PROFILE_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return mergeProfileDefaults(parsed);
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
    persistOfflineProfile(existing);
    return existing;
  }
  const fresh = createEmptyProfile();
  persistOfflineProfile(fresh);
  return fresh;
};

const offlineUser: AuthUser = {
  uid: 'offline-user',
  displayName: 'Offline Fan',
  isAnonymous: true,
};

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

const generatePredictionId = () => {
  const cryptoRef = typeof globalThis !== 'undefined' ? (globalThis.crypto as Crypto | undefined) : undefined;
  if (cryptoRef?.randomUUID) {
    return cryptoRef.randomUUID();
  }
  return `prediction-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

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
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingProfile = ensureOfflineProfile();
    if (hasOfflineSession()) {
      setCurrentUser(offlineUser);
      setProfile(existingProfile);
    }
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    markOfflineAuthenticated(true);
    const existingProfile = ensureOfflineProfile();
    setCurrentUser(offlineUser);
    setProfile(existingProfile);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    markOfflineAuthenticated(false);
    setCurrentUser(null);
    setProfile(null);
    setLoading(false);
  };

  const addAttendedMatch = async (match: AttendedMatch['match']) => {
    if (!profile) {
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
    persistOfflineProfile(nextProfile);
  };

  const removeAttendedMatch = async (matchId: string) => {
    if (!profile) return;

    const updatedMatches = (profile.attendedMatches || []).filter((am) => am.match.id !== matchId);
    const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches };

    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!profile) return;

    const newProfileUser = { ...profile.user, ...updatedUser };
    const nextProfile: Profile = { ...profile, user: newProfileUser };

    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
  };

  const addPhotoToMatch = async (matchId: string, photoFile: File) => {
    if (!profile) return;

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
  };

  const addFriend = async (friendId: string) => {
    if (!profile) return;
    if (profile.friendIds.includes(friendId)) {
      return;
    }

    const updatedFriendIds = [...profile.friendIds, friendId];
    const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
  };

  const removeFriend = async (friendId: string) => {
    if (!profile) return;
    const updatedFriendIds = profile.friendIds.filter((id) => id !== friendId);
    const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
  };

  const saveUserPrediction = async (input: SaveUserPredictionInput) => {
    if (!profile) return;

    const timestamp = new Date().toISOString();
    const existingIndex = profile.predictions.findIndex((prediction) => prediction.matchId === input.matchId);

    let updatedPredictions: Prediction[];

    if (existingIndex >= 0) {
      const existingPrediction = profile.predictions[existingIndex];
      updatedPredictions = [...profile.predictions];
      updatedPredictions[existingIndex] = {
        ...existingPrediction,
        outcome: input.outcome,
        confidence: input.confidence ?? existingPrediction.confidence,
        notes: input.notes,
        updatedAt: timestamp,
      };
    } else {
      const newPrediction: Prediction = {
        id: generatePredictionId(),
        matchId: input.matchId,
        outcome: input.outcome,
        confidence: input.confidence,
        notes: input.notes,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      updatedPredictions = [...profile.predictions, newPrediction];
    }

    const nextProfile: Profile = { ...profile, predictions: updatedPredictions };
    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
  };

  const deleteUserPrediction = async (matchId: string) => {
    if (!profile) return;

    const updatedPredictions = profile.predictions.filter((prediction) => prediction.matchId !== matchId);
    const nextProfile: Profile = { ...profile, predictions: updatedPredictions };

    setProfile(nextProfile);
    persistOfflineProfile(nextProfile);
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
