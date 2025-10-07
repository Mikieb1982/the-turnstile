import type { Match, LeagueStanding } from '../types';
import { mockMatches, mockLeagueTable } from './mockData';

const logOfflineFallback = (collection: string) => {
  console.info(`Using local mock data for ${collection}.`);
};

export const fetchMatches = async (): Promise<Match[]> => {
  logOfflineFallback('matches');
  return mockMatches;
};

export const fetchLeagueTable = async (): Promise<LeagueStanding[]> => {
  logOfflineFallback('league table');
  return mockLeagueTable;
};
