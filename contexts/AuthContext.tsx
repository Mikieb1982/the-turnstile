import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type {
  User,
  AttendedMatch,
  Profile,
  AuthUser,
  Prediction,
  SaveUserPredictionInput,
} from '../types';
import { checkAndAwardBadges } from '../badges';

interface GoogleIdentityServices {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        prompt?: string;
        callback: (response: GoogleTokenResponse) => void;
        error_callback?: (error: GoogleTokenErrorResponse) => void;
      }) => GoogleTokenClient;
    };
  };
}

interface GoogleTokenClient {
  requestAccessToken: (config?: { prompt?: string }) => void;
}

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
}

interface GoogleTokenErrorResponse {
  error: string;
  error_description?: string;
}

interface GoogleUserInfoResponse {
  sub: string;
  name?: string;
  picture?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
}

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

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

const LOCAL_PROFILE_KEY = 'scrum-book:profile';
const LOCAL_AUTH_KEY = 'scrum-book:auth-user';
const GOOGLE_IDENTITY_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const createEmptyProfile = (overrides?: Partial<User>): Profile => ({
  user: { name: overrides?.name ?? 'Guest', favoriteTeamId: overrides?.favoriteTeamId, avatarUrl: overrides?.avatarUrl },
  attendedMatches: [],
  earnedBadgeIds: [],
  friendIds: [],
  predictions: [],
});

const mergeProfileDefaults = (profile: Partial<Profile> | null, userOverrides?: Partial<User>): Profile => {
  const empty = createEmptyProfile(userOverrides);

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

const getProfileStorageKey = (uid: string) => `${LOCAL_PROFILE_KEY}:${uid}`;

const loadStoredProfile = (uid: string, userOverrides?: Partial<User>): Profile | null => {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(getProfileStorageKey(uid));
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return mergeProfileDefaults(parsed, userOverrides);
  } catch (error) {
    console.warn('Failed to parse stored profile. Resetting to defaults.', error);
    window.localStorage.removeItem(getProfileStorageKey(uid));
    return null;
  }
};

const persistProfileForUser = (uid: string, profile: Profile) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(getProfileStorageKey(uid), JSON.stringify(profile));
};

const ensureProfileForUser = (uid: string, overrides?: Partial<User>): Profile => {
  const existing = loadStoredProfile(uid, overrides);
  if (existing) {
    persistProfileForUser(uid, existing);
    return existing;
  }
  const fresh = createEmptyProfile(overrides);
  persistProfileForUser(uid, fresh);
  return fresh;
};

const readStoredAuthUser = (): AuthUser | null => {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(LOCAL_AUTH_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthUser;
  } catch (error) {
    console.warn('Failed to parse stored auth user. Clearing session.', error);
    window.localStorage.removeItem(LOCAL_AUTH_KEY);
    return null;
  }
};

const persistAuthUser = (user: AuthUser | null) => {
  if (!isBrowser()) {
    return;
  }
  if (user) {
    window.localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(LOCAL_AUTH_KEY);
  }
};

const getDefaultUserDetails = (user: AuthUser | null): Partial<User> => ({
  name: user?.displayName || user?.email || 'Rugby Fan',
  avatarUrl: user?.avatarUrl || undefined,
});

const loadGoogleIdentityServices = async (): Promise<GoogleIdentityServices> => {
  if (!isBrowser()) {
    throw new Error('Google Sign-In requires a browser environment.');
  }

  if (window.google?.accounts?.oauth2) {
    return window.google;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${GOOGLE_IDENTITY_SCRIPT_SRC}"]`);
  if (existingScript && window.google?.accounts?.oauth2) {
    return window.google;
  }

  const script = existingScript ?? document.createElement('script');
  if (!existingScript) {
    script.src = GOOGLE_IDENTITY_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }

  await new Promise<void>((resolve, reject) => {
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Failed to load Google Identity Services.')), { once: true });
  });

  if (!window.google?.accounts?.oauth2) {
    throw new Error('Google Identity Services failed to initialise.');
  }

  return window.google;
};

const requestGoogleAccessToken = async (google: GoogleIdentityServices, clientId: string): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        callback: (response) => {
          if (response.error) {
            reject(new Error(response.error_description || 'Google sign-in was cancelled.'));
            return;
          }
          if (!response.access_token) {
            reject(new Error('Google did not return an access token.'));
            return;
          }
          resolve(response.access_token);
        },
        error_callback: (error) => {
          reject(new Error(error.error_description || error.error || 'Google sign-in failed.'));
        },
      });

      tokenClient.requestAccessToken({ prompt: 'consent' });

    } catch (error) {
      reject(error instanceof Error ? error : new Error('Failed to initialise Google sign-in.'));
    }
  });

const fetchGoogleUserInfo = async (accessToken: string): Promise<GoogleUserInfoResponse> => {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Google profile information.');
  }

  return (await response.json()) as GoogleUserInfoResponse;
};

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

  const activeProfileStorageKey = useMemo(() => currentUser?.uid ?? 'offline-user', [currentUser?.uid]);

  useEffect(() => {
    const storedUser = readStoredAuthUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      const existingProfile = ensureProfileForUser(storedUser.uid, getDefaultUserDetails(storedUser));
      setProfile(existingProfile);
      setLoading(false);
      return;
    }

    // Fallback to a guest profile so the app remains usable offline
    const guestProfile = ensureProfileForUser('offline-user', { name: 'Guest' });
    setProfile(guestProfile);
    setLoading(false);
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error(
          'Google Sign-In is not configured. Set the VITE_GOOGLE_CLIENT_ID environment variable to your OAuth client ID.'
        );
      }

      const google = await loadGoogleIdentityServices();
      const accessToken = await requestGoogleAccessToken(google, clientId);
      const userInfo = await fetchGoogleUserInfo(accessToken);

      const authUser: AuthUser = {
        uid: userInfo.sub,
        displayName: userInfo.name || userInfo.given_name || undefined,
        avatarUrl: userInfo.picture || null,
        email: userInfo.email || null,
        isAnonymous: false,
      };

      persistAuthUser(authUser);
      setCurrentUser(authUser);
      const existingProfile = ensureProfileForUser(authUser.uid, getDefaultUserDetails(authUser));
      setProfile(existingProfile);
    } catch (error) {
      persistAuthUser(null);
      setCurrentUser(null);
      setProfile((prev) => prev ?? ensureProfileForUser('offline-user', { name: 'Guest' }));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    persistAuthUser(null);
    setCurrentUser(null);
    const guestProfile = ensureProfileForUser('offline-user', { name: 'Guest' });
    setProfile(guestProfile);
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
    persistProfileForUser(activeProfileStorageKey, nextProfile);
  };

  const removeAttendedMatch = async (matchId: string) => {
    if (!profile) return;

    const updatedMatches = (profile.attendedMatches || []).filter((am) => am.match.id !== matchId);
    const nextProfile: Profile = { ...profile, attendedMatches: updatedMatches };

    setProfile(nextProfile);
    persistProfileForUser(activeProfileStorageKey, nextProfile);
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!profile) return;

    const newProfileUser = { ...profile.user, ...updatedUser };
    const nextProfile: Profile = { ...profile, user: newProfileUser };

    setProfile(nextProfile);
    persistProfileForUser(activeProfileStorageKey, nextProfile);
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
      persistProfileForUser(activeProfileStorageKey, nextProfile);
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
    persistProfileForUser(activeProfileStorageKey, nextProfile);
  };

  const removeFriend = async (friendId: string) => {
    if (!profile) return;
    const updatedFriendIds = profile.friendIds.filter((id) => id !== friendId);
    const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

    setProfile(nextProfile);
    persistProfileForUser(activeProfileStorageKey, nextProfile);
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
    persistProfileForUser(activeProfileStorageKey, nextProfile);
  };

  const deleteUserPrediction = async (matchId: string) => {
    if (!profile) return;

    const updatedPredictions = profile.predictions.filter((prediction) => prediction.matchId !== matchId);
    const nextProfile: Profile = { ...profile, predictions: updatedPredictions };

    setProfile(nextProfile);
    persistProfileForUser(activeProfileStorageKey, nextProfile);
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
