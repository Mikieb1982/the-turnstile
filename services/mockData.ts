// services/mockData.ts

export type Team = { id: string; name: string; shortName?: string; logoUrl?: string }
export type Venue = { id: string; name: string; lat?: number; lon?: number; city?: string }
export type Match = { id: string; homeId: string; awayId: string; venueId: string; date: string }

export const TEAMS: Record<string, Team> = {
  WIG: { id: "WIG", name: "Wigan Warriors" },
  STH: { id: "STH", name: "St Helens" },
  LEE: { id: "LEE", name: "Leeds Rhinos" },
}
export const teams: Team[] = Object.values(TEAMS)

export const ALL_VENUES: Venue[] = [
  { id: "WIGV", name: "DW Stadium", city: "Wigan", lat: 53.547, lon: -2.653 },
  { id: "STHV", name: "Totally Wicked Stadium", city: "St Helens", lat: 53.453, lon: -2.740 },
]

export const teamIdToVenue: Record<string, string> = {
  WIG: "DW Stadium",
  STH: "Totally Wicked Stadium",
  LEE: "Headingley Stadium",
}

export const TEAM_BRANDING: Record<
  string,
  { primary: string; secondary: string; text?: string }
> = {
  WIG: { primary: "#660000", secondary: "#ffffff", text: "#ffffff" },
  STH: { primary: "#d10000", secondary: "#ffffff", text: "#ffffff" },
  LEE: { primary: "#0057b8", secondary: "#f9b000", text: "#ffffff" },
}

export const matches: Match[] = [
  { id: "m1", homeId: "WIG", awayId: "STH", venueId: "WIGV", date: new Date().toISOString() },
]

/** for DataUploader.tsx */
export const mockMatches: Match[] = matches

export type TableRow = { teamId: string; played: number; won: number; drawn: number; lost: number; pts: number }
export const mockLeagueTable: TableRow[] = [
  { teamId: "WIG", played: 10, won: 8, drawn: 1, lost: 1, pts: 17 },
  { teamId: "STH", played: 10, won: 7, drawn: 1, lost: 2, pts: 15 },
  { teamId: "LEE", played: 10, won: 6, drawn: 0, lost: 4, pts: 12 },
]

export function getTeamById(id: string): Team | undefined { return TEAMS[id] }
export function getVenueById(id: string): Venue | undefined { return ALL_VENUES.find(v => v.id === id) }

export const mockUserData = {
  stats: {
    matchesAttended: 12,
    stadiumsVisited: 5,
    badgesEarned: 3,
  },
};

export const mockNextMatch = {
  id: 1,
  homeTeam: 'Team Phoenix',
  awayTeam: 'Team Lion',
  date: '2025-10-28T19:30:00',
  stadium: 'National Stadium',
  homeLogo: 'https://placehold.co/64x64/06b6d4/FFFFFF?text=P',
  awayLogo: 'https://placehold.co/64x64/f43f5e/FFFFFF?text=L',
};

export const mockFixtures = [
  {
    id: 1,
    homeTeam: 'St Helens',
    awayTeam: 'Wigan Warriors',
    date: '2025-11-18T19:45:00',
    homeLogo: 'https://placehold.co/64x64/E63946/FFFFFF?text=SH',
    awayLogo: 'https://placehold.co/64x64/A8202D/FFFFFF?text=WW'
  },
  {
    id: 2,
    homeTeam: 'Leeds Rhinos',
    awayTeam: 'Castleford Tigers',
    date: '2025-11-19T15:00:00',
    homeLogo: 'https://placehold.co/64x64/005596/FFFFFF?text=LR',
    awayLogo: 'https://placehold.co/64x64/F47C20/FFFFFF?text=CT'
  },
  {
    id: 3,
    homeTeam: 'Warrington Wolves',
    awayTeam: 'Catalans Dragons',
    date: '2025-11-19T17:30:00',
    homeLogo: 'https://placehold.co/64x64/00539F/FFFFFF?text=WW',
    awayLogo: 'https://placehold.co/64x64/F8E000/000000?text=CD'
  },
];
