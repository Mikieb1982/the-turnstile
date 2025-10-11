import type { Match } from '../types';
import { fetchMatches } from '../../services/apiService';

const LOCAL_PROFILE_KEY_PREFIX = 'scrum-book:profile';

export interface AttendanceMatchSummary {
  matchId: string;
  homeTeamId: string;
  homeTeam: string;
  awayTeamId: string;
  awayTeam: string;
  venue: string;
  startTime: string;
  competition: string;
  status: Match['status'];
  finalScore?: string;
}

export interface AttendanceOverview {
  totalMatchesAttended: number;
  uniqueVenuesVisited: number;
  seasonsCovered: string[];
  favouriteTeamId?: string;
  favouriteTeamName?: string;
  recentVenue?: string;
  lastAttendedMatch?: AttendanceMatchSummary;
  recommendedMatch?: AttendanceMatchSummary | null;
}

export interface FormattedAttendanceData {
  overview: AttendanceOverview;
  attendedMatches: AttendanceMatchSummary[];
  upcomingMatches: AttendanceMatchSummary[];
}

export interface FanInsightResult {
  type: 'journey' | 'matchRecommendation';
  message: string;
  data: FormattedAttendanceData;
}

let firestorePromise: Promise<import('firebase/firestore').Firestore | null> | null = null;

const hasFirebaseConfig = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  return typeof apiKey === 'string' && apiKey.length > 0 && typeof projectId === 'string' && projectId.length > 0;
};

const initialiseFirestore = async (): Promise<import('firebase/firestore').Firestore | null> => {
  if (!hasFirebaseConfig()) {
    return null;
  }

  try {
    const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ]);

    const existing = getApps();
    const app = existing.length > 0
      ? existing[0]
      : initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      });

    return getFirestore(app);
  } catch (error) {
    console.info('[aiIntegrationService] Falling back to offline data – Firebase unavailable.', error);
    return null;
  }
};

const ensureFirestore = () => {
  if (!firestorePromise) {
    firestorePromise = initialiseFirestore();
  }
  return firestorePromise;
};

const readAttendanceFromLocalProfile = (userId: string): string[] => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(`${LOCAL_PROFILE_KEY_PREFIX}:${userId}`);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as { attendedMatches?: unknown[] } | null;
    const attended = Array.isArray(parsed?.attendedMatches) ? parsed?.attendedMatches ?? [] : [];

    return attended
      .map(entry => {
        if (!entry) {
          return null;
        }
        if (typeof entry === 'string') {
          return entry;
        }
        if (typeof entry === 'object') {
          const matchId = (entry as { matchId?: string; match?: { id?: string } }).matchId
            ?? (entry as { match?: { id?: string } }).match?.id;
          return typeof matchId === 'string' ? matchId : null;
        }
        return null;
      })
      .filter((value): value is string => typeof value === 'string');
  } catch (error) {
    console.warn('[aiIntegrationService] Failed to parse local attendance data.', error);
    return [];
  }
};

const readAttendanceFromFirestore = async (userId: string): Promise<string[]> => {
  const firestore = await ensureFirestore();
  if (!firestore) {
    return [];
  }

  try {
    const { doc, getDoc } = await import('firebase/firestore');
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    if (!userDoc.exists()) {
      return [];
    }

    const data = userDoc.data() as { attendedMatches?: unknown[] };
    if (!Array.isArray(data.attendedMatches)) {
      return [];
    }

    return data.attendedMatches
      .map(entry => {
        if (!entry) {
          return null;
        }
        if (typeof entry === 'string') {
          return entry;
        }
        if (typeof entry === 'object') {
          const matchId = (entry as { matchId?: string; match?: { id?: string } }).matchId
            ?? (entry as { match?: { id?: string } }).match?.id;
          return typeof matchId === 'string' ? matchId : null;
        }
        return null;
      })
      .filter((value): value is string => typeof value === 'string');
  } catch (error) {
    console.warn('[aiIntegrationService] Failed to read Firestore attendance data – using offline cache.', error);
    return [];
  }
};

const readPublicMatchesFromFirestore = async (): Promise<Match[] | null> => {
  const firestore = await ensureFirestore();
  if (!firestore) {
    return null;
  }

  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const snapshot = await getDocs(collection(firestore, 'matches'));
    if (snapshot.empty) {
      return null;
    }

    const matches: Match[] = [];
    snapshot.forEach((docSnapshot: import('firebase/firestore').DocumentSnapshot) => {
      const data = docSnapshot.data() ?? {};
      if (typeof data !== 'object') {
        return;
      }

      const competitionSource = (data as { competition?: { id?: string; name?: string } }).competition ?? {};
      const homeSource = (data as { homeTeam?: Match['homeTeam'] }).homeTeam ?? null;
      const awaySource = (data as { awayTeam?: Match['awayTeam'] }).awayTeam ?? null;

      if (!homeSource || !awaySource) {
        return;
      }

      const competitionId = typeof competitionSource.id === 'string' && competitionSource.id.trim().length > 0
        ? competitionSource.id
        : `comp-${docSnapshot.id}`;
      const competitionName = typeof competitionSource.name === 'string' && competitionSource.name.trim().length > 0
        ? competitionSource.name
        : 'Fixture';

      const homeTeam: Match['homeTeam'] = {
        id: typeof homeSource.id === 'string' && homeSource.id.length > 0 ? homeSource.id : `${docSnapshot.id}-home`,
        name: typeof homeSource.name === 'string' && homeSource.name.length > 0 ? homeSource.name : 'Home Team',
        logoUrl: typeof homeSource.logoUrl === 'string' ? homeSource.logoUrl : '',
      };

      const awayTeam: Match['awayTeam'] = {
        id: typeof awaySource.id === 'string' && awaySource.id.length > 0 ? awaySource.id : `${docSnapshot.id}-away`,
        name: typeof awaySource.name === 'string' && awaySource.name.length > 0 ? awaySource.name : 'Away Team',
        logoUrl: typeof awaySource.logoUrl === 'string' ? awaySource.logoUrl : '',
      };

      const match: Match = {
        id: docSnapshot.id,
        competition: {
          id: competitionId,
          name: competitionName,
        },
        homeTeam,
        awayTeam,
        status: (data as { status?: Match['status'] }).status ?? 'SCHEDULED',
        startTime: (data as { startTime?: string }).startTime ?? new Date().toISOString(),
        venue: (data as { venue?: string }).venue ?? 'TBC',
        scores: (data as { scores?: Match['scores'] }).scores ?? { home: 0, away: 0 },
        stats: (data as { stats?: Match['stats'] }).stats,
      };

      matches.push(match);
    });

    return matches;
  } catch (error) {
    console.warn('[aiIntegrationService] Failed to read matches from Firestore – using mock data.', error);
    return null;
  }
};

const loadAttendanceForUser = async (userId: string): Promise<string[]> => {
  const [cloudAttendance, localAttendance] = await Promise.all([
    readAttendanceFromFirestore(userId),
    Promise.resolve(readAttendanceFromLocalProfile(userId)),
  ]);

  if (cloudAttendance.length > 0) {
    return cloudAttendance;
  }

  return localAttendance;
};

const loadPublicMatches = async (): Promise<Match[]> => {
  const [cloudMatches, localMatches] = await Promise.all([
    readPublicMatchesFromFirestore(),
    fetchMatches(),
  ]);

  return cloudMatches && cloudMatches.length > 0 ? cloudMatches : localMatches;
};

const formatMatchSummary = (match: Match): AttendanceMatchSummary => ({
  matchId: match.id,
  homeTeamId: match.homeTeam.id,
  homeTeam: match.homeTeam.name,
  awayTeamId: match.awayTeam.id,
  awayTeam: match.awayTeam.name,
  venue: match.venue,
  startTime: match.startTime,
  competition: match.competition.name,
  status: match.status,
  finalScore: match.status === 'FULL-TIME' ? `${match.scores.home}-${match.scores.away}` : undefined,
});

const normaliseDate = (value: string) => new Date(value).getTime();

export const formatAttendanceDataForAI = (userAttendance: string[], allMatches: Match[]): FormattedAttendanceData => {
  const matchMap = new Map(allMatches.map(match => [match.id, match]));
  const attendedMatchEntities = userAttendance
    .map(matchId => matchMap.get(matchId))
    .filter((match): match is Match => Boolean(match));

  const attendedMatches = attendedMatchEntities
    .map(formatMatchSummary)
    .sort((a, b) => normaliseDate(a.startTime) - normaliseDate(b.startTime));

  const uniqueVenues = new Set(attendedMatches.map(match => match.venue));
  const seasons = new Set(attendedMatches.map(match => new Date(match.startTime).getFullYear().toString()));

  const teamFrequency = attendedMatchEntities.reduce<Record<string, { id: string; name: string; count: number }>>((acc, match) => {
    const trackTeam = (team: Match['homeTeam']) => {
      const current = acc[team.id] ?? { id: team.id, name: team.name, count: 0 };
      acc[team.id] = { ...current, count: current.count + 1 };
    };
    trackTeam(match.homeTeam);
    trackTeam(match.awayTeam);
    return acc;
  }, {});

  const favouriteTeamEntry = Object.values(teamFrequency)
    .sort((a, b) => b.count - a.count)[0];

  const upcomingMatches = allMatches
    .filter(match => normaliseDate(match.startTime) > Date.now())
    .map(formatMatchSummary)
    .sort((a, b) => normaliseDate(a.startTime) - normaliseDate(b.startTime));

  const favouriteTeamName = favouriteTeamEntry?.name;
  const recommendedMatch = upcomingMatches.find(match =>
    favouriteTeamEntry ? match.homeTeamId === favouriteTeamEntry.id || match.awayTeamId === favouriteTeamEntry.id : false,
  ) ?? upcomingMatches[0] ?? null;

  return {
    overview: {
      totalMatchesAttended: attendedMatches.length,
      uniqueVenuesVisited: uniqueVenues.size,
      seasonsCovered: Array.from(seasons.values()),
      favouriteTeamId: favouriteTeamEntry?.id,
      favouriteTeamName,
      recentVenue: attendedMatches.length > 0 ? attendedMatches[attendedMatches.length - 1].venue : undefined,
      lastAttendedMatch: attendedMatches.length > 0 ? attendedMatches[attendedMatches.length - 1] : undefined,
      recommendedMatch,
    },
    attendedMatches,
    upcomingMatches,
  };
};

export const generateFanInsight = async (userId: string): Promise<FanInsightResult | null> => {
  if (!userId) {
    throw new Error('A valid userId is required to generate fan insights.');
  }

  const [attendanceIds, matches] = await Promise.all([
    loadAttendanceForUser(userId),
    loadPublicMatches(),
  ]);

  if (matches.length === 0) {
    return null;
  }

  const formatted = formatAttendanceDataForAI(attendanceIds, matches);
  const { overview } = formatted;

  if (overview.totalMatchesAttended === 0) {
    if (overview.recommendedMatch) {
      const match = overview.recommendedMatch;
      const dateString = new Date(match.startTime).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
      });
      return {
        type: 'matchRecommendation',
        message: `Predicted Must-Attend Upcoming Match: ${match.homeTeam} vs ${match.awayTeam} on ${dateString} at ${match.venue}.`,
        data: formatted,
      };
    }

    return {
      type: 'journey',
      message: 'Your Fan Journey Stats: Start logging matches to unlock personalised insights and recommendations.',
      data: formatted,
    };
  }

  if (overview.recommendedMatch) {
    const match = overview.recommendedMatch;
    const dateString = new Date(match.startTime).toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
    });

    return {
      type: 'matchRecommendation',
      message: `Predicted Must-Attend Upcoming Match: ${match.homeTeam} vs ${match.awayTeam} on ${dateString} at ${match.venue}.`,
      data: formatted,
    };
  }

  const highlights: string[] = [`You've checked in at ${overview.totalMatchesAttended} matches`];
  if (overview.uniqueVenuesVisited > 0) {
    highlights.push(`visited ${overview.uniqueVenuesVisited} unique venues`);
  }
  if (overview.favouriteTeamName) {
    highlights.push(`backed ${overview.favouriteTeamName} more than any other club`);
  }

  const summaryText = `${highlights.join(', ')}${overview.recentVenue ? `, with your latest adventure at ${overview.recentVenue}` : ''}.`;

  return {
    type: 'journey',
    message: `Your Fan Journey Stats: ${summaryText}`,
    data: formatted,
  };
};
