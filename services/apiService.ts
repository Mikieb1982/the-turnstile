import type { Match, LeagueStanding } from "../types";

// Use Vite's BASE_URL so fetch requests work in both dev and production builds.
export const API_PREFIX = import.meta.env.BASE_URL.replace(/\/$/, '');

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
}

/**
 * Fetches the upcoming matches from the local API.
 */
export const fetchMatches = async (): Promise<Match[]> => {
    const response = await fetch(`${API_PREFIX}/api/matches`);
    return handleResponse(response);
};

/**
 * Fetches the Super League table from the local API.
 */
export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
    const response = await fetch(`${API_PREFIX}/api/league-table`);
    return handleResponse(response);
};

