import { Match, Team } from '../types';

// The new base URL for your local backend server
const API_BASE_URL = 'http://localhost:3001/api';

export const apiService = {
  // Fetches matches from your new backend
  getMatches: async (): Promise<Match[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      // Return an empty array or handle the error as you see fit
      return [];
    }
  },

  // Fetches the league table from your new backend
  getLeagueTable: async (): Promise<Team[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/league-table`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch league table:", error);
      // Return an empty array or handle the error as you see fit
      return [];
    }
  },
};