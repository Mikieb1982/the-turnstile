// FIX: Remove v9 modular imports, as the app is being switched to the compat API.
import { db } from '../firebase';
import type { Match, LeagueStanding } from "../types";
import { mockMatches, mockLeagueTable } from './mockData';

/**
 * Fetches all matches from Firestore, with a fallback to mock data on failure.
 */
export const fetchMatches = async (): Promise<Match[]> => {
    try {
        // FIX: Use v8-compatible API for Firestore queries.
        const matchesCollection = db.collection('matches');
        const q = matchesCollection.orderBy('startTime', 'asc');
        const snapshot = await q.get();
        
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
        // FIX: Use v8-compatible API for Firestore queries.
        const leagueTableCollection = db.collection('leagueTable');
        const q = leagueTableCollection.orderBy('rank', 'asc');
        const snapshot = await q.get();

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