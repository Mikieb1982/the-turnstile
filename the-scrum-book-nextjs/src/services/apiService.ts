import type { Match, LeagueStanding } from '@/types';
import { mockMatches, mockLeagueTable } from './mockData';

const normaliseBaseUrl = (value: string | undefined | null) => {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  return trimmed.replace(/\/$/, '');
};

const resolvedEnvBaseUrl = normaliseBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL);
const API_BASE_URL = resolvedEnvBaseUrl || '/api';

const isRelativeApi = API_BASE_URL === '/api';

const logOfflineFallback = (collection: string, reason?: string) => {
  const suffix = reason ? ` (${reason})` : '';
  console.info(`Using local mock data for ${collection}.${suffix}`);
};

const fetchFromApi = async <T>(path: string, fallback: () => T, collection: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as T;
  } catch (error) {
    const reason = error instanceof Error ? error.message : undefined;
    const isFetchError = reason ? reason.toLowerCase().includes('fetch') : false;
    if (!isRelativeApi || !isFetchError) {
      console.error(`Failed to fetch ${collection}:`, error);
    }
    logOfflineFallback(collection, isRelativeApi ? 'internal API unavailable' : undefined);
    return fallback();
  }
};

export const fetchMatches = async (): Promise<Match[]> =>
  fetchFromApi<Match[]>('/matches', () => mockMatches, 'matches');

export const fetchLeagueTable = async (): Promise<LeagueStanding[]> =>
  fetchFromApi<LeagueStanding[]>('/league-table', () => mockLeagueTable, 'league table');
