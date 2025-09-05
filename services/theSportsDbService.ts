import type { Match, LeagueStanding } from "../types";
import { mockMatches, mockLeagueTable } from "./mockData";

// const API_KEY = '3'; // Free public API key from TheSportsDB
// const SUPER_LEAGUE_ID = '4415'; // English Rugby League Super League ID

// TheSportsDB is unreliable. We will use mock data instead.
// The original code is commented out below for reference.

/**
 * Fetches the upcoming matches for the Super League.
 * This function now returns stable mock data.
 */
export const fetchMatches = async (): Promise<Match[]> => {
    console.log("Using mock match data.");
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return Promise.resolve(mockMatches);
};

/**
 * Fetches the Super League table.
 * This function now returns stable mock data.
 */
export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
    console.log("Using mock league table data.");
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return Promise.resolve(mockLeagueTable);
}

/*
// --- ORIGINAL TheSportsDB IMPLEMENTATION ---

// Define the structure of the API response from TheSportsDB
interface SportsDBEvent {
    idEvent: string;
    strEvent: string;
    idLeague: string;
    strLeague: string;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string | null;
    intAwayScore: string | null;
    strStatus: string;
    dateEvent: string;
    strTime: string;
    strVenue: string;
    idHomeTeam: string;
    idAwayTeam: string;
    strHomeTeamBadge: string | null;
    strAwayTeamBadge: string | null;
}

interface SportsDBTableEntry {
    intRank: string;
    idTeam: string;
    strTeam: string;
    strTeamBadge: string;
    intPlayed: string;
    intWin: string;
    intLoss: string;
    intDraw: string;
    intPoints: string;
    strForm: string;
}

const mapEventToMatch = (event: SportsDBEvent): Match => {
    const statusMap: Record<string, 'SCHEDULED' | 'FULL-TIME'> = {
        "Match Finished": 'FULL-TIME',
    };

    const startTime = new Date(`${event.dateEvent}T${event.strTime}`).toISOString();

    return {
        id: event.idEvent,
        competition: {
            id: event.idLeague,
            name: event.strLeague,
        },
        homeTeam: {
            id: event.idHomeTeam,
            name: event.strHomeTeam,
            logoUrl: event.strHomeTeamBadge || `https://picsum.photos/seed/${event.strHomeTeam}/100`,
        },
        awayTeam: {
            id: event.idAwayTeam,
            name: event.strAwayTeam,
            logoUrl: event.strAwayTeamBadge || `https://picsum.photos/seed/${event.strAwayTeam}/100`,
        },
        status: statusMap[event.strStatus] || 'SCHEDULED',
        startTime,
        venue: event.strVenue || "TBC",
        scores: {
            home: event.intHomeScore ? parseInt(event.intHomeScore, 10) : 0,
            away: event.intAwayScore ? parseInt(event.intAwayScore, 10) : 0,
        },
        live: undefined,
        stats: undefined,
    };
};

const mapTableEntryToLeagueStanding = (entry: SportsDBTableEntry): LeagueStanding => ({
    rank: parseInt(entry.intRank, 10),
    teamId: entry.idTeam,
    teamName: entry.strTeam,
    teamLogoUrl: entry.strTeamBadge,
    played: parseInt(entry.intPlayed, 10),
    wins: parseInt(entry.intWin, 10),
    draws: parseInt(entry.intDraw, 10),
    losses: parseInt(entry.intLoss, 10),
    points: parseInt(entry.intPoints, 10),
    form: entry.strForm || "",
});

export const fetchMatches_original = async (): Promise<Match[]> => {
    const currentSeason = new Date().getFullYear(); 

    try {
        const url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/eventsseason.php?id=${SUPER_LEAGUE_ID}&s=${currentSeason}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        if (!responseText) {
            console.warn(`Received empty response from TheSportsDB for season ${currentSeason}.`);
            return [];
        }
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse JSON for matches:', responseText);
            throw new Error('Invalid JSON response from TheSportsDB API.');
        }

        const events: SportsDBEvent[] = data.events || [];

        if (events.length === 0) {
            console.warn(`No events found for Super League season ${currentSeason}.`);
            return [];
        }

        const matches = events.map(mapEventToMatch);
        return matches;
    } catch (error) {
        console.error("Error fetching matches from TheSportsDB:", error);
        throw new Error("Could not fetch match data from TheSportsDB.");
    }
};

export const fetchLeagueTable_original = async (): Promise<LeagueStanding[]> => {
    const url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${SUPER_LEAGUE_ID}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        if (!responseText) {
            console.warn('Received empty response from TheSportsDB for league table.');
            return [];
        }
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('Failed to parse JSON for league table:', responseText);
            throw new Error('Invalid JSON response from TheSportsDB API.');
        }

        const tableData: SportsDBTableEntry[] = data.table || [];
        
        if (tableData.length === 0) {
             console.warn(`No league table data found.`);
             return [];
        }

        return tableData.map(mapTableEntryToLeagueStanding);

    } catch (error) {
        console.error("Error fetching league table from TheSportsDB:", error);
        throw new Error("Could not fetch league table data from TheSportsDB.");
    }
}
*/