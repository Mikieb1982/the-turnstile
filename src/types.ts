// View state
export type AppView = 'BROWSER' | 'DETAIL' | 'SCRUM_BOOK';

// Narrow string “brands” for safer dates/times
export type DateISO = `${number}-${number}-${number}`;           // e.g. "2025-09-30"
export type TimeHHMM = `${number}${number}:${number}${number}`;  // e.g. "20:45"
export type DateTimeISO = string;                                // full ISO if you store timestamps

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity?: number;
  notes?: string;
}

export interface Match {
  id: string;
  competitionName: string;
  round: string;
  date: DateISO;          // "YYYY-MM-DD"
  kickoffTime: TimeHHMM;  // "HH:MM" 24h local
  homeTeam: string;
  awayTeam: string;
  venueId: string;
  broadcast?: string;
  headline?: string;
}

export interface MatchWithVenue extends Match {
  venue: Venue;
}

export interface MatchAttendance {
  matchId: string;
  attendedOn: DateTimeISO; // when the user marked attendance
}

export interface UserProfile {
  id: string;
  attendedMatches: MatchAttendance[];
}

export interface MatchFilters {
  query: string;
  round?: string;
  venueId?: string;
}

export interface AttendanceStats {
  totalMatches: number;
  upcomingCount: number;
  uniqueVenues: number;
  recentAttendance?: MatchWithVenue;
}
// Fast lookup shape (pairs well with your Set<string> attendedIds)
export type AttendanceIndex = Record<string, MatchAttendance | undefined>;

// Type guard to ensure a joined object really has a venue
export const hasVenue = (m: Match | MatchWithVenue): m is MatchWithVenue =>
  (m as MatchWithVenue).venue !== undefined;
// Fast lookup shape (pairs well with your Set<string> attendedIds)
export type AttendanceIndex = Record<string, MatchAttendance | undefined>;

// Type guard to ensure a joined object really has a venue
export const hasVenue = (m: Match | MatchWithVenue): m is MatchWithVenue =>
  (m as MatchWithVenue).venue !== undefined;
