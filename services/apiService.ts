import type { Match, LeagueStanding } from '../types';
import { mockMatches, mockLeagueTable } from './mockData';

const logOfflineFallback = (collection: string) => {
  console.info(`Using local mock data for ${collection}.`);
};

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/matches');
    if (!response.ok) {
      throw new Error(`Failed to fetch matches: ${response.statusText}`);
    }

    return (await response.json()) as Match[];
  } catch (error) {
    logOfflineFallback('matches');
    return mockMatches;
  }
};

export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/league-table');
    if (!response.ok) {
      throw new Error(`Failed to fetch league table: ${response.statusText}`);
    }

    return (await response.json()) as LeagueStanding[];
  } catch (error) {
    logOfflineFallback('league table');
    return mockLeagueTable;
  }
};
