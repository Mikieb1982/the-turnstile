/**
 * @deprecated This file is no longer in use.
 * All data fetching logic has been moved to `apiService.ts`
 * to work with the new local MSW-based backend.
 */
import type { Match, LeagueStanding } from "../types";
import { mockMatches, mockLeagueTable } from "./mockData";


export const fetchMatches = async (): Promise<Match[]> => {
    console.warn("DEPRECATED: fetchMatches from theSportsDbService is called. Use apiService instead.");
    await new Promise(resolve => setTimeout(resolve, 300));
    return Promise.resolve(mockMatches);
};


export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
    console.warn("DEPRECATED: fetchLeagueTable from theSportsDbService is called. Use apiService instead.");
    await new Promise(resolve => setTimeout(resolve, 300));
    return Promise.resolve(mockLeagueTable);
}