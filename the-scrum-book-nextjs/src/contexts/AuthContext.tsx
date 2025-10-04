'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type {
  User,
  AttendedMatch,
  Profile,
  AuthUser,
  Prediction,
  SaveUserPredictionInput,
} from '@/types';
import { checkAndAwardBadges } from '@/badges';

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
  loginWithCredentials: (identifier: string, password: string) => Promise<void>;
  signup: (input: { name: string; email: string; password: string }) => Promise<void>;
  requestPasswordReset: (identifier: string) => Promise<void>;
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
const LOCAL_ACCOUNTS_KEY = 'scrum-book:accounts';
const LOCAL_PASSWORD_RESET_PREFIX = 'scrum-book:password-reset-requested';

interface StoredAccount {
  id: string;
  identifier: string;
  password: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  avatarSource?: User['avatarSource'];
  avatarUpdatedAt?: string;
}

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const resolveAvatarSource = (overrides?: Partial<User>): User['avatarSource'] => {
  if (overrides?.avatarSource) {
    return overrides.avatarSource;
  }
  if (overrides?.avatarUrl) {
    return 'google';
  }
  return 'generated';
};

const createEmptyProfile = (overrides?: Partial<User>): Profile => ({
  user: {
    name: overrides?.name ?? 'Guest',
    favoriteTeamId: overrides?.favoriteTeamId,
    avatarUrl: overrides?.avatarUrl,
    avatarSource: resolveAvatarSource(overrides),
    avatarUpdatedAt: overrides?.avatarUpdatedAt,
  },
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

  const storedUser: Partial<User> = profile.user ?? {};
  const avatarMatchesOverride =
    typeof storedUser.avatarUrl === 'string' && storedUser.avatarUrl === userOverrides?.avatarUrl;
  const resolvedAvatarSource: User['avatarSource'] = storedUser.avatarSource
    ? storedUser.avatarSource
    : typeof storedUser.avatarUrl === 'string'
    ? avatarMatchesOverride
      ? empty.user.avatarSource
      : 'custom'
    : empty.user.avatarSource;
  const resolvedAvatarUpdatedAt = storedUser.avatarUpdatedAt ?? (avatarMatchesOverride ? empty.user.avatarUpdatedAt : undefined);

  return {
    ...empty,
    ...profile,
    user: {
      ...empty.user,
      ...storedUser,
      avatarSource: resolvedAvatarSource,
      avatarUpdatedAt: resolvedAvatarUpdatedAt,
    },
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

const getDefaultUserDetails = (user: AuthUser | null): Partial<User> => {
  const avatarSource: User['avatarSource'] = user?.avatarUrl ? 'google' : 'generated';

  return {
    name: user?.displayName || user?.email || 'Rugby Fan',
    avatarUrl: user?.avatarUrl || undefined,
    avatarSource,
    avatarUpdatedAt: user?.avatarUrl ? new Date().toISOString() : undefined,
  };
};

const normaliseIdentifier = (identifier: string) => identifier.trim().toLowerCase();

const hashPassword = (password: string) => {
  try {
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(password);
    }
  } catch (error) {
    console.warn('Falling back to deterministic password hashing.', error);
  }
  return Array.from(password)
    .map((char) => char.charCodeAt(0).toString(16))
    .join('-');
};

const loadStoredAccounts = (): StoredAccount[] => {
  if (!isBrowser()) {
    return [];
  }
  const raw = window.localStorage.getItem(LOCAL_ACCOUNTS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as StoredAccount[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    console.warn('Failed to parse stored accounts. Clearing saved credentials.', error);
    window.localStorage.removeItem(LOCAL_ACCOUNTS_KEY);
    return [];
  }
};

const persistStoredAccounts = (accounts: StoredAccount[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts));
};

const createAccountId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `scrum-user-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

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

const resolveAvatarUpdates = (
  updates: Partial<User>
): Partial<Pick<User, 'avatarSource' | 'avatarUpdatedAt'>> => {
  const avatarChanges: Partial<Pick<User, 'avatarSource' | 'avatarUpdatedAt'>> = {};

  if (Object.prototype.hasOwnProperty.call(updates, 'avatarUrl')) {
    const nextSource: User['avatarSource'] = updates.avatarUrl ? 'custom' : 'generated';
    avatarChanges.avatarSource = nextSource;
    avatarChanges.avatarUpdatedAt = updates.avatarUrl ? new Date().toISOString() : undefined;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'avatarSource')) {
    avatarChanges.avatarSource = updates.avatarSource;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'avatarUpdatedAt')) {
    avatarChanges.avatarUpdatedAt = updates.avatarUpdatedAt;
  }

  return avatarChanges;
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
  const [accounts, setAccounts] = useState<StoredAccount[]>(() => (isBrowser() ? loadStoredAccounts() : []));

  const updateStoredAccounts = useCallback(
    (updater: (previous: StoredAccount[]) => StoredAccount[]) => {
      setAccounts((prev) => {
        const next = updater(prev);
        persistStoredAccounts(next);
        return next;
      });
    },
    []
  );

  const getAccountByIdentifier = useCallback(
    (identifier: string) => {
      const normalised = normaliseIdentifier(identifier);
      return accounts.find((account) => account.identifier === normalised) ?? null;
    },
    [accounts]
  );

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
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error(
          'Google Sign-In is not configured. Set the NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable to your OAuth client ID.'
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
      const shouldSyncGoogleAvatar =
        !!authUser.avatarUrl &&
        existingProfile.user.avatarSource !== 'custom' &&
        existingProfile.user.avatarUrl !== authUser.avatarUrl;

      if (shouldSyncGoogleAvatar) {
        const syncedProfile: Profile = {
          ...existingProfile,
          user: {
            ...existingProfile.user,
            avatarUrl: authUser.avatarUrl ?? undefined,
            avatarSource: 'google',
            avatarUpdatedAt: new Date().toISOString(),
          },
        };
        setProfile(syncedProfile);
        persistProfileForUser(authUser.uid, syncedProfile);
      } else {
        setProfile(existingProfile);
      }
    } catch (error) {
      persistAuthUser(null);
      setCurrentUser(null);
      setProfile((prev) => prev ?? ensureProfileForUser('offline-user', { name: 'Guest' }));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithCredentials = async (identifier: string, password: string) => {
    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      throw new Error('Please enter your email or phone number.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    setLoading(true);
    try {
      const account = getAccountByIdentifier(trimmedIdentifier);
      if (!account) {
        throw new Error('We couldn\'t find an account with those details.');
      }
      const hashedInput = hashPassword(password);
      if (account.password !== hashedInput) {
        throw new Error('Incorrect password. Please try again.');
      }

      updateStoredAccounts((prev) =>
        prev.map((existing) =>
          existing.id === account.id
            ? { ...existing, updatedAt: new Date().toISOString() }
            : existing
        )
      );

      const authUser: AuthUser = {
        uid: account.id,
        displayName: account.name,
        email: account.identifier.includes('@') ? account.identifier : null,
        isAnonymous: false,
        avatarUrl: account.avatarUrl ?? null,
      };

      persistAuthUser(authUser);
      setCurrentUser(authUser);
      const existingProfile = ensureProfileForUser(authUser.uid, {
        name: account.name,
        avatarUrl: account.avatarUrl,
        avatarSource: account.avatarSource,
        avatarUpdatedAt: account.avatarUpdatedAt,
      });
      setProfile(existingProfile);
    } catch (error) {
      setProfile((prev) => prev ?? ensureProfileForUser('offline-user', { name: 'Guest' }));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (input: { name: string; email: string; password: string }) => {
    const name = input.name.trim();
    const email = input.email.trim();
    if (!name) {
      throw new Error('Please tell us your name.');
    }
    if (!email) {
      throw new Error('Email is required to create an account.');
    }
    if (input.password.length < 6) {
      throw new Error('Passwords need to be at least 6 characters long.');
    }

    const identifier = normaliseIdentifier(email);
    if (getAccountByIdentifier(identifier)) {
      throw new Error('An account already exists with that email address.');
    }

    setLoading(true);
    try {
      const now = new Date().toISOString();
      const account: StoredAccount = {
        id: createAccountId(),
        identifier,
        password: hashPassword(input.password),
        name,
        createdAt: now,
        updatedAt: now,
      };

      updateStoredAccounts((prev) => [...prev, account]);

      const authUser: AuthUser = {
        uid: account.id,
        displayName: name,
        email: identifier.includes('@') ? identifier : null,
        isAnonymous: false,
        avatarUrl: account.avatarUrl ?? null,
      };

      persistAuthUser(authUser);
      setCurrentUser(authUser);
      const newProfile = ensureProfileForUser(authUser.uid, {
        name,
        avatarUrl: account.avatarUrl,
        avatarSource: account.avatarSource,
        avatarUpdatedAt: account.avatarUpdatedAt,
      });
      setProfile(newProfile);
    } catch (error) {
      setProfile((prev) => prev ?? ensureProfileForUser('offline-user', { name: 'Guest' }));
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (identifier: string) => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      throw new Error('Enter the email associated with your account.');
    }

    const account = getAccountByIdentifier(trimmed);
    if (!account) {
      throw new Error('We couldn\'t find an account with that email.');
    }

    if (isBrowser()) {
      const storageKey = `${LOCAL_PASSWORD_RESET_PREFIX}:${account.id}`;
      window.localStorage.setItem(storageKey, new Date().toISOString());
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
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

    const avatarFields = resolveAvatarUpdates(updatedUser);

    const newProfileUser: User = { ...profile.user, ...updatedUser, ...avatarFields };
    const nextProfile: Profile = { ...profile, user: newProfileUser };

    setProfile(nextProfile);
    persistProfileForUser(activeProfileStorageKey, nextProfile);

    if (currentUser) {
      let shouldPersistAuthUser = false;
      let nextAuthUser: AuthUser = currentUser;
      const accountChanges: Partial<StoredAccount> = {};
      let hasAccountChanges = false;

      if (Object.prototype.hasOwnProperty.call(updatedUser, 'avatarUrl')) {
        nextAuthUser = { ...nextAuthUser, avatarUrl: updatedUser.avatarUrl ?? null };
        shouldPersistAuthUser = true;
        accountChanges.avatarUrl = updatedUser.avatarUrl ?? undefined;
        accountChanges.avatarSource = newProfileUser.avatarSource;
        accountChanges.avatarUpdatedAt = newProfileUser.avatarUpdatedAt;
        hasAccountChanges = true;
      }

      if (Object.prototype.hasOwnProperty.call(updatedUser, 'avatarSource')) {
        accountChanges.avatarSource = newProfileUser.avatarSource;
        hasAccountChanges = true;
      }

      if (Object.prototype.hasOwnProperty.call(updatedUser, 'avatarUpdatedAt')) {
        accountChanges.avatarUpdatedAt = newProfileUser.avatarUpdatedAt;
        hasAccountChanges = true;
      }

      if (Object.prototype.hasOwnProperty.call(updatedUser, 'name')) {
        nextAuthUser = { ...nextAuthUser, displayName: newProfileUser.name };
        shouldPersistAuthUser = true;
        accountChanges.name = newProfileUser.name;
        hasAccountChanges = true;
      }

      if (hasAccountChanges) {
        updateStoredAccounts((prev) =>
          prev.map((account) =>
            account.id === currentUser.uid
              ? { ...account, ...accountChanges, updatedAt: new Date().toISOString() }
              : account
          )
        );
      }

      if (shouldPersistAuthUser) {
        setCurrentUser(nextAuthUser);
        persistAuthUser(nextAuthUser);
      }
    }
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
    loginWithCredentials,
    signup,
    requestPasswordReset,
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
