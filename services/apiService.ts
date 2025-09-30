import { db, isFirebaseConfigured } from '../firebase';
import type { Match, LeagueStanding } from '../types';
import { mockMatches, mockLeagueTable } from './mockData';

const logOfflineFallback = (collection: string) => {
  if (!isFirebaseConfigured) {
    console.info(`Firebase is not configured. Using local mock data for ${collection}.`);
  }
};

export const fetchMatches = async (): Promise<Match[]> => {
  if (!db) {
    logOfflineFallback('matches');
    return mockMatches;
  }

  try {
    const snapshot = await db.collection('matches').orderBy('startTime', 'asc').get();

    if (snapshot.empty) {
      console.warn('Firestore "matches" collection is empty or unavailable from cache. Using mock data.');
      return mockMatches;
    }

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      if (data.startTime && typeof data.startTime.toDate === 'function') {
        data.startTime = data.startTime.toDate().toISOString();
      }
      return { id: doc.id, ...data } as Match;
    });
  } catch (error: any) {
    if (error.code === 'unavailable') {
      console.warn('Firestore is offline. Falling back to mock data for matches.');
    } else {
      console.error('Error fetching matches from Firestore:', error?.message ?? error);
      console.warn('Falling back to mock data for matches.');
    }
    return mockMatches;
  }
};

export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
  if (!db) {
    logOfflineFallback('league table');
    return mockLeagueTable;
  }

  try {
    const snapshot = await db.collection('leagueTable').orderBy('rank', 'asc').get();

    if (snapshot.empty) {
      console.warn('Firestore "leagueTable" collection is empty or unavailable from cache. Using mock data.');
      return mockLeagueTable;
    }

    return snapshot.docs.map((doc) => doc.data() as LeagueStanding);
  } catch (error: any) {
    if (error.code === 'unavailable') {
      console.warn('Firestore is offline. Falling back to mock data for league table.');
    } else {
      console.error('Error fetching league table from Firestore:', error?.message ?? error);
      console.warn('Falling back to mock data for league table.');
    }
    return mockLeagueTable;
  }
};
