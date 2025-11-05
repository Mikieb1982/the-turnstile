import type { TeamInfo } from '../types';

// This data is now fetched from the 'teams' collection in Firestore.
// The public /app/teams page has been refactored to fetch live data.
// This file is now empty and can be deleted if no other part of the app imports it.
export const teamsData: TeamInfo[] = [];
