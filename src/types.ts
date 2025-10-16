// Explicit React type imports so this file compiles without relying on a global React namespace
import type { FC, SVGProps } from 'react';

// This file defines the core data structures for the application.
// By centralizing types, we ensure consistency across components and services.

export type View =
  | 'UPCOMING'
  | 'MATCH_DAY'
  | 'LEAGUE_TABLE'
  | 'GROUNDS'
  | 'MY_MATCHES'
  | 'STATS'
  | 'ABOUT'
  | 'BADGES'
  | 'PROFILE'
  | 'TEAM_STATS'
  | 'NEARBY'
  | 'PREDICTION_GAMES'
  | 'ADMIN'
  | 'COMMUNITY';

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
}

export interface MatchStats {
  possession: {
    home: number;
    away: number;
  };
  territory: {
    home: number;
    away: number;
  };
  tackles: {
    home: number;
    away: number;
  };
}

export interface Match {
  id: string;
  competition: {
    id: string;
    name: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  status: 'SCHEDULED' | 'FULL-TIME';
  startTime: string; // ISO 8601 format
  venue: string;
  scores: {
    home: number;
    away: number;
  };
  stats?: MatchStats;
}

export interface AttendedMatch {
  match: Match;
  attendedOn: string; // ISO 8601 format
  photoUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'Milestone' | 'Tournament';
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface LeagueStanding {
  rank: number;
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  form: string; // e.g., "WWLWL"
}

export interface Venue {
  name: string;
  team: string;
  lat: number;
  lon: number;
  x?: number; // for SVG map
  y?: number; // for SVG map
}

export interface User {
  name: string;
  favoriteTeamId?: string;
  avatarUrl?: string;
  avatarSource?: 'google' | 'custom' | 'generated';
  avatarUpdatedAt?: string;
}

export interface AuthUser {
  uid: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  email?: string | null;
  isAnonymous?: boolean;
}

export interface StadiumInfo {
  name: string;
  capacity: string;
  notes: string;
}

export interface TeamInfo {
  name: string;
  established: number;
  titles: string;
  location: string;
  stadium: StadiumInfo;
}

// New types for multi-profile support
export type PredictionOutcome = 'HOME_WIN' | 'AWAY_WIN' | 'DRAW';

export type PredictionConfidence = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Prediction {
  id: string;
  matchId: string;
  outcome: PredictionOutcome;
  confidence?: PredictionConfidence;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaveUserPredictionInput {
  matchId: string;
  outcome: PredictionOutcome;
  confidence?: PredictionConfidence;
  notes?: string;
}

export interface Profile {
  user: User;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  friendIds: string[];
  predictions: Prediction[];
}

export interface ScrumBookData {
  profiles: Record<string, Profile>;
  activeProfileId: string | null;
}

export interface MatchVenueDetails {
  name: string;
  city?: string;
  capacity?: number;
  notes?: string;
}

export interface MatchWithVenue {
  id: string;
  round?: string;
  competitionName?: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  kickoffTime?: string;
  headline?: string;
  broadcast?: string;
  venue: MatchVenueDetails;
}

export interface MatchAttendance {
  matchId: string;
  attendedOn: string;
  notes?: string;
  rating?: number;
}

export interface AttendanceStats {
  totalMatches: number;
  uniqueVenues: number;
  currentStreak: number;
  favouriteVenue?: string;
  firstMatchDate?: string;
  recentAttendance?: MatchWithVenue;
}
