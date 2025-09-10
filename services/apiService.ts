import { db } from '../firebase';
import type { Match, LeagueStanding } from "../types";
import { mockMatches, mockLeagueTable } from './mockData';

/**
 * Fetches all matches from Firestore, with a fallback to mock data on failure.
 */
export const fetchMatches = async (): Promise<Match[]> => {
    try {
        const matchesCollection = db.collection('matches');
        const q = matchesCollection.orderBy('startTime', 'asc');
        const snapshot = await q.get();
        
        if (snapshot.empty) {
            console.warn('Firestore "matches" collection is empty or unavailable from cache. Using mock data.');
            return mockMatches;
        }
        
        const matches = snapshot.docs.map(doc => {
            const data = doc.data();
            // Firestore may return a Timestamp object; convert it to an ISO string the app expects.
            if (data.startTime && typeof data.startTime.toDate === 'function') {
                data.startTime = data.startTime.toDate().toISOString();
            }
            return { id: doc.id, ...data } as Match;
        });
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