import type { Match, LeagueStanding } from '@/types';
import { mockMatches, mockLeagueTable } from './mockData';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/$/, '');

const logOfflineFallback = (collection: string, reason?: string) => {
  const suffix = reason ? ` (${reason})` : '';
  console.info(`Using local mock data for ${collection}.${suffix}`);
};

const fetchFromApi = async <T>(path: string, fallback: () => T, collection: string): Promise<T> => {
  if (!API_BASE_URL) {
    logOfflineFallback(collection, 'API base URL not configured');
    return fallback();
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`Failed to fetch ${collection}:`, error);
    logOfflineFallback(collection);
    return fallback();
  }
};

export const fetchMatches = async (): Promise<Match[]> =>
  fetchFromApi<Match[]>('/matches', () => mockMatches, 'matches');

export const fetchLeagueTable = async (): Promise<LeagueStanding[]> =>
  fetchFromApi<LeagueStanding[]>('/league-table', () => mockLeagueTable, 'league table');
