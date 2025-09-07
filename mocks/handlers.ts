import { http, HttpResponse } from 'msw';
import { mockMatches, mockLeagueTable } from '../services/mockData';
import type { Profile } from '../types';
import { API_PREFIX } from '../config';

// In-memory "database" using localStorage
const getDb = (): { profiles: Record<string, Profile> } => {
    const data = localStorage.getItem('scrumBookDb');
    if (data) {
        return JSON.parse(data);
    }
    // Initialize with empty profiles if it doesn't exist
    const initialDb = { profiles: {} };
    localStorage.setItem('scrumBookDb', JSON.stringify(initialDb));
    return initialDb;
};

const saveDb = (db: { profiles: Record<string, Profile> }) => {
    localStorage.setItem('scrumBookDb', JSON.stringify(db));
};

export const handlers = [
  // Handler for fetching all matches
  http.get(`${API_PREFIX}/api/matches`, () => {
    return HttpResponse.json(mockMatches);
  }),

  // Handler for fetching the league table
  http.get(`${API_PREFIX}/api/league-table`, () => {
    return HttpResponse.json(mockLeagueTable);
  }),
  
  // --- Profile Handlers ---

  // Get all profiles
  http.get(`${API_PREFIX}/api/profiles`, () => {
    const db = getDb();
    return HttpResponse.json(db.profiles);
  }),

  // Add a new profile
  http.post(`${API_PREFIX}/api/profiles`, async ({ request }) => {
    const { name } = await request.json() as { name: string };
    if (!name) {
        return new HttpResponse('Profile name is required', { status: 400 });
    }
    
    const db = getDb();
    const id = `profile_${Date.now()}`;
    const newProfile: Profile = {
        user: { name },
        attendedMatches: [],
        earnedBadgeIds: [],
    };
    
    db.profiles[id] = newProfile;
    saveDb(db);

    return HttpResponse.json({ id, profile: newProfile }, { status: 201 });
  }),

  // Update a profile
  http.put(`${API_PREFIX}/api/profiles/:id`, async ({ params, request }) => {
    const { id } = params;
    const updatedProfile = await request.json() as Profile;
    const db = getDb();

    if (db.profiles[id as string]) {
      db.profiles[id as string] = updatedProfile;
      saveDb(db);
      return HttpResponse.json(updatedProfile);
    }
    
    return new HttpResponse('Profile not found', { status: 404 });
  }),

  // Delete a profile
  http.delete(`${API_PREFIX}/api/profiles/:id`, ({ params }) => {
    const { id } = params;
    const db = getDb();

    if (db.profiles[id as string]) {
        delete db.profiles[id as string];
        saveDb(db);
        return new HttpResponse(null, { status: 204 }); // No Content
    }
    
    return new HttpResponse('Profile not found', { status: 404 });
  }),
];