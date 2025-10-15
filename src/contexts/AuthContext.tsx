import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  AttendedMatch,
  AuthUser,
  Prediction,
  Profile,
  SaveUserPredictionInput,
  User,
} from '../types';
import { checkAndAwardBadges } from '../badges';

export interface AuthContextType {
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

const AuthContext = createContext(undefined as unknown as AuthContextType | undefined);

const LOCAL_PROFILE_KEY = 'scrum-book:profile';
const LOCAL_AUTH_SESSION_KEY = 'scrum-book:auth-session';
const GOOGLE_IDENTITY_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

const FIREBASE_API_KEY = typeof import.meta.env.VITE_FIREBASE_API_KEY === 'string'
  ? import.meta.env.VITE_FIREBASE_API_KEY.trim()
  : '';

const GOOGLE_CLIENT_ID = typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === 'string'
  ? import.meta.env.VITE_GOOGLE_CLIENT_ID.trim()
  : '';

type ThemeAvatarSource = User['avatarSource'];

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

interface FirebaseAuthErrorResponse {
  error?: {
    message?: string;
    code?: number;
    errors?: { message?: string }[];
  };
}

interface FirebasePasswordAuthResponse {
  idToken: string;
  email?: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
  photoUrl?: string;
}

interface FirebaseIdpAuthResponse extends FirebasePasswordAuthResponse {
  oauthIdToken?: string;
  oauthAccessToken?: string;
}

interface FirebaseRefreshResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
  id_token: string;
  user_id: string;
  project_id?: string;
}

interface AuthSession {
  uid: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  providerId: 'password' | 'google';
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const getProfileStorageKey = (uid: string) => `${LOCAL_PROFILE_KEY}:${uid}`;

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

const resolveAvatarSource = (overrides?: Partial<User>): ThemeAvatarSource => {
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
  const resolvedAvatarSource: ThemeAvatarSource = storedUser.avatarSource
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

const readStoredSession = (): AuthSession | null => {
  if (!isBrowser()) {
    return null;
  }
  const raw = window.localStorage.getItem(LOCAL_AUTH_SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as AuthSession;
  } catch (error) {
    console.warn('Failed to parse stored auth session. Clearing session.', error);
    window.localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
    return null;
  }
};

const persistSession = (session: AuthSession | null) => {
  if (!isBrowser()) {
    return;
  }
  if (session) {
    window.localStorage.setItem(LOCAL_AUTH_SESSION_KEY, JSON.stringify(session));
  } else {
    window.localStorage.removeItem(LOCAL_AUTH_SESSION_KEY);
  }
};

const getDefaultUserDetails = (user: AuthUser | null): Partial<User> => {
  const avatarSource: ThemeAvatarSource = user?.avatarUrl ? 'google' : 'generated';

  return {
    name: user?.displayName || user?.email || 'Rugby Fan',
    avatarUrl: user?.avatarUrl || undefined,
    avatarSource,
    avatarUpdatedAt: user?.avatarUrl ? new Date().toISOString() : undefined,
  };
};

const mapSessionToAuthUser = (session: AuthSession): AuthUser => ({
  uid: session.uid,
  displayName: session.displayName,
  avatarUrl: session.avatarUrl ?? null,
  email: session.email,
  isAnonymous: false,
});

const firebaseErrorMessages: Record<string, string> = {
  EMAIL_NOT_FOUND: 'We could not find an account with that email address.',
  INVALID_PASSWORD: 'That password did not match our records. Please try again.',
  USER_DISABLED: 'This account has been disabled. Contact support for help.',
  EMAIL_EXISTS: 'That email address is already associated with an account.',
  OPERATION_NOT_ALLOWED: 'This authentication method is disabled in Firebase.',
  INVALID_IDP_RESPONSE: 'Google did not return a valid sign-in response. Please try again.',
  INVALID_REFRESH_TOKEN: 'Your session has expired. Please sign in again.',
  TOKEN_EXPIRED: 'Your session has expired. Please sign in again.',
};

const resolveFirebaseErrorMessage = (code?: string): string => {
  if (!code) {
    return 'Authentication request failed. Please try again.';
  }
  if (firebaseErrorMessages[code]) {
    return firebaseErrorMessages[code];
  }
  if (code.startsWith('WEAK_PASSWORD')) {
    return 'Passwords need to be at least 6 characters long.';
  }
  if (code.startsWith('MISSING_EMAIL')) {
    return 'Please enter an email address to continue.';
  }
  return 'Authentication request failed. Please try again.';
};

const callFirebaseAuthApi = async (path: string, body: Record<string, unknown>) => {
  if (!FIREBASE_API_KEY) {
    throw new Error('Firebase is not configured. Set VITE_FIREBASE_API_KEY to use authentication.');
  }
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = 'Authentication request failed. Please try again.';
    try {
      const errorBody = (await response.json()) as FirebaseAuthErrorResponse;
      const code = errorBody.error?.message || errorBody.error?.errors?.[0]?.message;
      message = resolveFirebaseErrorMessage(code);
    } catch (parseError) {
      console.warn('Failed to parse Firebase error response', parseError);
    }
    throw new Error(message);
  }

  return response.json();
};

const refreshIdToken = async (refreshToken: string): Promise<{ idToken: string; refreshToken: string; expiresIn: number; uid: string } | null> => {
  if (!FIREBASE_API_KEY) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  if (!response.ok) {
    let code: string | undefined;
    try {
      const data = (await response.json()) as FirebaseAuthErrorResponse;
      code = data.error?.message;
    } catch (error) {
      console.warn('Failed to parse Firebase refresh response', error);
    }
    throw new Error(resolveFirebaseErrorMessage(code));
  }

  const data = (await response.json()) as FirebaseRefreshResponse;
  const expiresIn = Number.parseInt(data.expires_in, 10);
  return {
    idToken: data.id_token,
    refreshToken: data.refresh_token,
    expiresIn: Number.isFinite(expiresIn) ? expiresIn : 3600,
    uid: data.user_id,
  };
};

const loadGoogleIdentityServices = async (): Promise<GoogleIdentityServices> => {
  if (!isBrowser()) {
    throw new Error('Google Sign-In requires a browser environment.');
  }

  if (window.google?.accounts?.oauth2) {
    return window.google;
  }

  const existingScript = document.querySelector(`script[src="${GOOGLE_IDENTITY_SCRIPT_SRC}"]`) as HTMLScriptElement | null;
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

const resolveAvatarUpdates = (
  updates: Partial<User>
): Partial<Pick<User, 'avatarSource' | 'avatarUpdatedAt'>> => {
  const avatarChanges: Partial<Pick<User, 'avatarSource' | 'avatarUpdatedAt'>> = {};

  if (Object.prototype.hasOwnProperty.call(updates, 'avatarUrl')) {
    const nextSource: ThemeAvatarSource = updates.avatarUrl ? 'custom' : 'generated';
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

const GUEST_PROFILE = ensureProfileForUser('offline-user', { name: 'Guest' });

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const sessionState = useState(() => readStoredSession());
  const currentSession = sessionState[0];
  const setCurrentSession = sessionState[1];

  const userState = useState(() => (currentSession ? mapSessionToAuthUser(currentSession) : null));
  const currentUser = userState[0];
  const setCurrentUser = userState[1];

  const profileState = useState(() =>
    currentSession
      ? ensureProfileForUser(currentSession.uid, getDefaultUserDetails(mapSessionToAuthUser(currentSession)))
      : GUEST_PROFILE
  );
  const profile = profileState[0];
  const setProfile = profileState[1];
  const [loading, setLoading] = useState(true);

  const activeProfileStorageKey = useMemo(() => currentSession?.uid ?? 'offline-user', [currentSession?.uid]);

  useEffect(() => {
    if (!currentSession) {
      setProfile(GUEST_PROFILE);
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    if (currentSession.expiresAt > Date.now() + 60_000) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    const refresh = async () => {
      try {
        const refreshed = await refreshIdToken(currentSession.refreshToken);
        if (!refreshed) {
          return;
        }
        if (cancelled) {
          return;
        }
        const nextSession: AuthSession = {
          ...currentSession,
          idToken: refreshed.idToken,
          refreshToken: refreshed.refreshToken,
          expiresAt: Date.now() + refreshed.expiresIn * 1000,
          uid: refreshed.uid,
        };
        persistSession(nextSession);
        setCurrentSession(nextSession);
        setCurrentUser(mapSessionToAuthUser(nextSession));
      } catch (error) {
        console.warn('Failed to refresh Firebase session', error);
        persistSession(null);
        setCurrentSession(null);
        setCurrentUser(null);
        setProfile(GUEST_PROFILE);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    refresh();
    return () => {
      cancelled = true;
    };
  }, [currentSession]);

  useEffect(() => {
    if (!currentSession) {
      setProfile(GUEST_PROFILE);
      return;
    }

    const authUser = mapSessionToAuthUser(currentSession);
    const existingProfile = ensureProfileForUser(currentSession.uid, getDefaultUserDetails(authUser));
    setProfile(existingProfile);
  }, [currentSession]);

  const applySession = useCallback((session: AuthSession, overrides?: Partial<User>) => {
    persistSession(session);
    setCurrentSession(session);
    const authUser = mapSessionToAuthUser(session);
    setCurrentUser(authUser);
    const defaultDetails = getDefaultUserDetails(authUser);
    const profileOverrides: Partial<User> = {
      ...defaultDetails,
      ...overrides,
    };
    const existingProfile = ensureProfileForUser(session.uid, profileOverrides);
    const shouldSyncAvatar =
      !!profileOverrides.avatarUrl &&
      existingProfile.user.avatarSource !== 'custom' &&
      existingProfile.user.avatarUrl !== profileOverrides.avatarUrl;
    const nextProfile = shouldSyncAvatar
      ? {
          ...existingProfile,
          user: {
            ...existingProfile.user,
            avatarUrl: profileOverrides.avatarUrl,
            avatarSource: profileOverrides.avatarSource ?? 'google',
            avatarUpdatedAt: new Date().toISOString(),
          },
        }
      : existingProfile;
    setProfile(nextProfile);
    persistProfileForUser(session.uid, nextProfile);
  }, []);

  const login = useCallback(async () => {
    if (!GOOGLE_CLIENT_ID) {
      throw new Error(
        'Google Sign-In is not configured. Set the VITE_GOOGLE_CLIENT_ID environment variable to your OAuth client ID.'
      );
    }

    setLoading(true);
    try {
      const google = await loadGoogleIdentityServices();
      const accessToken = await requestGoogleAccessToken(google, GOOGLE_CLIENT_ID);
      const userInfo = await fetchGoogleUserInfo(accessToken);

      const firebaseResponse = (await callFirebaseAuthApi('accounts:signInWithIdp', {
        postBody: `access_token=${encodeURIComponent(accessToken)}&providerId=google.com`,
        requestUri: isBrowser() ? window.location.origin : 'http://localhost',
        returnSecureToken: true,
        returnIdpCredential: true,
      })) as FirebaseIdpAuthResponse;

      const expiresInSeconds = Number.parseInt(firebaseResponse.expiresIn ?? '3600', 10);
      const session: AuthSession = {
        uid: firebaseResponse.localId,
        email: firebaseResponse.email ?? userInfo.email,
        displayName: firebaseResponse.displayName || userInfo.name || userInfo.given_name || undefined,
        avatarUrl: firebaseResponse.photoUrl || userInfo.picture || undefined,
        providerId: 'google',
        idToken: firebaseResponse.idToken,
        refreshToken: firebaseResponse.refreshToken,
        expiresAt: Date.now() + (Number.isFinite(expiresInSeconds) ? expiresInSeconds : 3600) * 1000,
      };

      applySession(session, {
        name: session.displayName ?? userInfo.name ?? userInfo.email ?? 'Rugby Fan',
        avatarUrl: session.avatarUrl,
        avatarSource: 'google',
      });
    } finally {
      setLoading(false);
    }
  }, [applySession]);

  const loginWithCredentials = useCallback(
    async (identifier: string, password: string) => {
      const trimmedIdentifier = identifier.trim();
      if (!trimmedIdentifier) {
        throw new Error('Please enter your email address to continue.');
      }
      if (!password) {
        throw new Error('Please enter your password.');
      }

      setLoading(true);
      try {
        const response = (await callFirebaseAuthApi('accounts:signInWithPassword', {
          email: trimmedIdentifier,
          password,
          returnSecureToken: true,
        })) as FirebasePasswordAuthResponse;

        const expiresInSeconds = Number.parseInt(response.expiresIn ?? '3600', 10);
        const session: AuthSession = {
          uid: response.localId,
          email: response.email ?? trimmedIdentifier,
          displayName: response.displayName || undefined,
          avatarUrl: response.photoUrl || undefined,
          providerId: 'password',
          idToken: response.idToken,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + (Number.isFinite(expiresInSeconds) ? expiresInSeconds : 3600) * 1000,
        };

        applySession(session);
      } finally {
        setLoading(false);
      }
    },
    [applySession]
  );

  const signup = useCallback(
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        throw new Error('Enter an email address to create your account.');
      }
      if (!name.trim()) {
        throw new Error('Enter your full name so we know what to call you.');
      }

      setLoading(true);
      try {
        const response = (await callFirebaseAuthApi('accounts:signUp', {
          email: trimmedEmail,
          password,
          returnSecureToken: true,
        })) as FirebasePasswordAuthResponse;

        if (name.trim()) {
          try {
            await callFirebaseAuthApi('accounts:update', {
              idToken: response.idToken,
              displayName: name.trim(),
              returnSecureToken: false,
            });
          } catch (error) {
            console.warn('Failed to set display name in Firebase', error);
          }
        }

        const expiresInSeconds = Number.parseInt(response.expiresIn ?? '3600', 10);
        const session: AuthSession = {
          uid: response.localId,
          email: response.email ?? trimmedEmail,
          displayName: name.trim(),
          avatarUrl: response.photoUrl || undefined,
          providerId: 'password',
          idToken: response.idToken,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + (Number.isFinite(expiresInSeconds) ? expiresInSeconds : 3600) * 1000,
        };

        applySession(session, {
          name: name.trim(),
        });
      } finally {
        setLoading(false);
      }
    },
    [applySession]
  );

  const requestPasswordReset = useCallback(async (identifier: string) => {
    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      throw new Error('Enter the email linked to your account.');
    }
    await callFirebaseAuthApi('accounts:sendOobCode', {
      requestType: 'PASSWORD_RESET',
      email: trimmedIdentifier,
    });
  }, []);

  const logout = useCallback(async () => {
    persistSession(null);
    setCurrentSession(null);
    setCurrentUser(null);
    setProfile(GUEST_PROFILE);
  }, []);

  const addAttendedMatch = useCallback(
    async (match: AttendedMatch['match']) => {
      if (!profile) {
        return;
      }

      const attendedOn = new Date().toISOString();
      const existingIndex = profile.attendedMatches.findIndex((am) => am.match.id === match.id);

      const updatedMatches = [...profile.attendedMatches];
      if (existingIndex >= 0) {
        updatedMatches[existingIndex] = { ...updatedMatches[existingIndex], match, attendedOn };
      } else {
        updatedMatches.unshift({ match, attendedOn });
      }

      const badgeIds = checkAndAwardBadges(updatedMatches, profile.earnedBadgeIds, profile.user);
      const uniqueEarned = Array.from(new Set([...profile.earnedBadgeIds, ...badgeIds]));

      const nextProfile: Profile = {
        ...profile,
        attendedMatches: updatedMatches,
        earnedBadgeIds: uniqueEarned,
      };

      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const removeAttendedMatch = useCallback(
    async (matchId: string) => {
      if (!profile) {
        return;
      }

      const updatedMatches = profile.attendedMatches.filter((am) => am.match.id !== matchId);
      const nextProfile: Profile = {
        ...profile,
        attendedMatches: updatedMatches,
      };

      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const updateUser = useCallback(
    async (updatedUser: Partial<User>) => {
      if (!profile) return;

      const avatarFields = resolveAvatarUpdates(updatedUser);

      const newProfileUser: User = { ...profile.user, ...updatedUser, ...avatarFields };
      const nextProfile: Profile = { ...profile, user: newProfileUser };

      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);

      if (currentSession) {
        const shouldUpdateDisplayName =
          Object.prototype.hasOwnProperty.call(updatedUser, 'name') && updatedUser.name && updatedUser.name.trim();

        if (shouldUpdateDisplayName) {
          try {
            await callFirebaseAuthApi('accounts:update', {
              idToken: currentSession.idToken,
              displayName: updatedUser.name,
            });
          } catch (error) {
            console.warn('Failed to update Firebase display name', error);
          }
        }

        const nextSession: AuthSession = {
          ...currentSession,
          displayName: newProfileUser.name,
          avatarUrl: newProfileUser.avatarUrl,
        };
        persistSession(nextSession);
        setCurrentSession(nextSession);
        setCurrentUser(mapSessionToAuthUser(nextSession));
      }
    },
    [activeProfileStorageKey, currentSession, profile]
  );

  const addPhotoToMatch = useCallback(
    async (matchId: string, photoFile: File) => {
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
    },
    [activeProfileStorageKey, profile]
  );

  const addFriend = useCallback(
    async (friendId: string) => {
      if (!profile) return;
      if (profile.friendIds.includes(friendId)) {
        return;
      }

      const updatedFriendIds = [...profile.friendIds, friendId];
      const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const removeFriend = useCallback(
    async (friendId: string) => {
      if (!profile) return;
      const updatedFriendIds = profile.friendIds.filter((id) => id !== friendId);
      const nextProfile: Profile = { ...profile, friendIds: updatedFriendIds };

      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const saveUserPrediction = useCallback(
    async (input: SaveUserPredictionInput) => {
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
        updatedPredictions = [newPrediction, ...profile.predictions];
      }

      const nextProfile: Profile = { ...profile, predictions: updatedPredictions };
      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const deleteUserPrediction = useCallback(
    async (matchId: string) => {
      if (!profile) return;
      const updatedPredictions = profile.predictions.filter((prediction) => prediction.matchId !== matchId);
      const nextProfile: Profile = { ...profile, predictions: updatedPredictions };
      setProfile(nextProfile);
      persistProfileForUser(activeProfileStorageKey, nextProfile);
    },
    [activeProfileStorageKey, profile]
  );

  const value = useMemo(
    (): AuthContextType => ({
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
    }),
    [
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
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
