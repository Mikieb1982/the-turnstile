import { db } from '../firebase';
import type { Match, LeagueStanding } from "../types";
import { mockMatches, mockLeagueTable } from './mockData';

/**
 * Fetches all matches from Firestore, with a fallback to mock data on failure.
 */
export const fetchMatches = async (): Promise<Match[]> => {
    try {
        const snapshot = await db.collection('matches').orderBy('startTime', 'asc').get();
        // If Firestore is offline and cache is empty, or the collection is empty on the server,
        // it's better to fall back to mock data than show an empty screen.
        if (snapshot.empty) {
            console.warn('Firestore "matches" collection is empty or unavailable from cache. Using mock data.');
            return mockMatches;
        }
        const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
        return matches;
    } catch (error: any) {
        if (error.code === 'unavailable') {
            console.warn("Firestore is offline. Falling back to mock data for matches.");
        } else {
            console.error("Error fetching matches from Firestore:", error.message);
            console.warn("Falling back to mock data for matches.");
        }
        return mockMatches;
    }
};

/**
 * Fetches the league table from Firestore, with a fallback to mock data on failure.
 */
export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
    try {
        const snapshot = await db.collection('leagueTable').orderBy('rank', 'asc').get();
        if (snapshot.empty) {
            console.warn('Firestore "leagueTable" collection is empty or unavailable from cache. Using mock data.');
            return mockLeagueTable;
        }
        const table = snapshot.docs.map(doc => doc.data() as LeagueStanding);
        return table;
    } catch (error: any) {
        if (error.code === 'unavailable') {
             console.warn("Firestore is offline. Falling back to mock data for league table.");
        } else {
            console.error("Error fetching league table from Firestore:", error.message);
            console.warn("Falling back to mock data for league table.");
        }
        return mockLeagueTable;
    }
}