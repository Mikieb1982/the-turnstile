import type { AuthUser } from '../types';

type AuthProvider = 'password' | 'google';

interface StoredUser {
  uid: string;
  name: string;
  email: string;
  password: string;
  provider: AuthProvider;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthSession {
  uid: string;
}

type AuthListener = (user: AuthUser | null) => void;

const USERS_STORAGE_KEY = 'turnstile.auth.users';
const SESSION_STORAGE_KEY = 'turnstile.auth.session';

const memoryStorage = new Map<string, string>();

const storage = {
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        console.warn('Local storage getItem failed', error);
      }
    }
    return memoryStorage.get(key) ?? null;
  },
  setItem(key: string, value: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (error) {
        console.warn('Local storage setItem failed', error);
      }
    }
    memoryStorage.set(key, value);
  },
  removeItem(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (error) {
        console.warn('Local storage removeItem failed', error);
      }
    }
    memoryStorage.delete(key);
  },
};

const listeners = new Set<AuthListener>();

const parseJson = <T,>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse stored JSON', error);
    return fallback;
  }
};

const persistUsers = (users: StoredUser[]) => {
  storage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const readUsers = (): StoredUser[] => parseJson(storage.getItem(USERS_STORAGE_KEY), [] as StoredUser[]);

const setSession = (session: AuthSession | null) => {
  if (!session) {
    storage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
};

const readSession = (): AuthSession | null => parseJson(storage.getItem(SESSION_STORAGE_KEY), null as AuthSession | null);

const toAuthUser = (user: StoredUser): AuthUser => ({
  uid: user.uid,
  displayName: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
});

const notifyListeners = (user: AuthUser | null) => {
  listeners.forEach((listener) => {
    try {
      listener(user);
    } catch (error) {
      console.error('Auth listener threw an error', error);
    }
  });
};

const getCurrentUser = (): AuthUser | null => {
  const session = readSession();
  if (!session) return null;

  const users = readUsers();
  const match = users.find((user) => user.uid === session.uid);
  return match ? toAuthUser(match) : null;
};

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `uid_${Math.random().toString(36).slice(2, 10)}`;
};

const normaliseEmail = (email: string) => email.trim().toLowerCase();

export const onAuthStateChanged = (callback: AuthListener): (() => void) => {
  listeners.add(callback);
  callback(getCurrentUser());
  return () => {
    listeners.delete(callback);
  };
};

export const signUp = async (name: string, email: string, password: string) => {
  const trimmedName = name.trim();
  const normalisedEmail = normaliseEmail(email);

  if (!trimmedName || !normalisedEmail || !password.trim()) {
    throw new Error('All fields are required to create an account.');
  }

  const users = readUsers();
  const existing = users.find((user) => user.email === normalisedEmail);
  if (existing) {
    throw new Error('An account already exists for that email address.');
  }

  const newUser: StoredUser = {
    uid: generateId(),
    name: trimmedName,
    email: normalisedEmail,
    password: password,
    provider: 'password',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  persistUsers(users);
  setSession({ uid: newUser.uid });
  const authUser = toAuthUser(newUser);
  notifyListeners(authUser);
  return authUser;
};

export const signIn = async (email: string, password: string) => {
  const normalisedEmail = normaliseEmail(email);
  const users = readUsers();
  const user = users.find((candidate) => candidate.email === normalisedEmail && candidate.password === password);

  if (!user) {
    throw new Error('The email or password you entered is incorrect.');
  }

  setSession({ uid: user.uid });
  const authUser = toAuthUser(user);
  notifyListeners(authUser);
  return authUser;
};

export const signInWithGoogle = async () => {
  const users = readUsers();
  const existingGoogleUser = users.find((user) => user.provider === 'google');

  const user = existingGoogleUser ?? {
    uid: generateId(),
    name: 'Google Rugby Fan',
    email: 'google-user@example.com',
    password: '',
    provider: 'google' as const,
    avatarUrl: 'https://avatars.dicebear.com/api/avataaars/google-rugby-fan.svg',
    createdAt: new Date().toISOString(),
  };

  if (!existingGoogleUser) {
    users.push(user);
    persistUsers(users);
  }

  setSession({ uid: user.uid });
  const authUser = toAuthUser(user);
  notifyListeners(authUser);
  return authUser;
};

export const passwordReset = async (identifier: string) => {
  const normalisedEmail = normaliseEmail(identifier);
  const users = readUsers();
  const match = users.find((user) => user.email === normalisedEmail);
  if (!match) {
    throw new Error('No account found with that email address.');
  }
  // In a real implementation we would trigger an email. Here we simply resolve.
  return true;
};

export const logOut = async () => {
  setSession(null);
  notifyListeners(null);
};

export const updateProfile = async (updates: Partial<Pick<StoredUser, 'name' | 'avatarUrl'>>) => {
  const session = readSession();
  if (!session) {
    throw new Error('No active session found.');
  }

  const users = readUsers();
  const index = users.findIndex((user) => user.uid === session.uid);
  if (index === -1) {
    throw new Error('The current user record could not be found.');
  }

  const updated: StoredUser = {
    ...users[index],
    ...updates,
  };

  users[index] = updated;
  persistUsers(users);
  const authUser = toAuthUser(updated);
  notifyListeners(authUser);
  return authUser;
};
