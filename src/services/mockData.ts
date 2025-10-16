import type { LeagueStanding, Team as AppTeam, Venue as AppVenue } from '../types'

type Team = AppTeam & { shortName?: string }

type TeamBranding = {
  bg: string
  text: string
  palette: [string, string?, string?]
}

type Venue = AppVenue & { id: string; city: string; team: string }

type Match = {
  id: string
  homeId: string
  awayId: string
  venueId: string
  date: string
}

export type Fixture = {
  id: number
  homeTeam: string
  awayTeam: string
  date: string
  homeLogo: string
  awayLogo: string
}

export const TEAMS: Record<string, Team> = {
  WIG: { id: 'WIG', name: 'Wigan Warriors', shortName: 'Wigan', logoUrl: '/logos/wigan.svg' },
  STH: { id: 'STH', name: 'St Helens', shortName: 'Saints', logoUrl: '/logos/st-helens.svg' },
  LEE: { id: 'LEE', name: 'Leeds Rhinos', shortName: 'Leeds', logoUrl: '/logos/leeds.svg' },
  WAR: { id: 'WAR', name: 'Warrington Wolves', shortName: 'Wolves', logoUrl: '/logos/warrington.svg' },
  CAT: { id: 'CAT', name: 'Catalans Dragons', shortName: 'Catalans', logoUrl: '/logos/catalans.svg' },
  HUL: { id: 'HUL', name: 'Hull KR', shortName: 'Hull KR', logoUrl: '/logos/hull-kr.svg' },
}

export const teams: Team[] = Object.values(TEAMS)

export const TEAM_BRANDING: Record<string, TeamBranding> = {
  WIG: { bg: '#7c0202', text: '#ffffff', palette: ['#7c0202', '#c0392b', '#ffe0e0'] },
  STH: { bg: '#d90429', text: '#ffffff', palette: ['#d90429', '#ef233c', '#ffe5e5'] },
  LEE: { bg: '#0057b8', text: '#ffffff', palette: ['#0057b8', '#f9b000', '#d0e4ff'] },
  WAR: { bg: '#003087', text: '#ffffff', palette: ['#003087', '#1a73e8', '#d6e4ff'] },
  CAT: { bg: '#fca311', text: '#1b1b1b', palette: ['#fca311', '#ffd166', '#fff3d4'] },
  HUL: { bg: '#ef233c', text: '#ffffff', palette: ['#ef233c', '#ff7b7b', '#ffe3e3'] },
}

export const ALL_VENUES: Venue[] = [
  { id: 'WIGV', name: 'DW Stadium', city: 'Wigan', team: TEAMS.WIG.name, lat: 53.547, lon: -2.653 },
  { id: 'STHV', name: 'Totally Wicked Stadium', city: 'St Helens', team: TEAMS.STH.name, lat: 53.453, lon: -2.74 },
  { id: 'LEEV', name: 'Headingley Stadium', city: 'Leeds', team: TEAMS.LEE.name, lat: 53.818, lon: -1.582 },
  { id: 'WARV', name: 'Halliwell Jones Stadium', city: 'Warrington', team: TEAMS.WAR.name, lat: 53.392, lon: -2.596 },
  { id: 'CATV', name: 'Stade Gilbert Brutus', city: 'Perpignan', team: TEAMS.CAT.name, lat: 42.709, lon: 2.899 },
  { id: 'HULV', name: 'Craven Park', city: 'Hull', team: TEAMS.HUL.name, lat: 53.742, lon: -0.275 },
]

export const teamIdToVenue: Record<string, string> = {
  WIG: 'DW Stadium',
  STH: 'Totally Wicked Stadium',
  LEE: 'Headingley Stadium',
  WAR: 'Halliwell Jones Stadium',
  CAT: 'Stade Gilbert Brutus',
  HUL: 'Craven Park',
}

export const matches: Match[] = [
  { id: 'm1', homeId: 'WIG', awayId: 'STH', venueId: 'WIGV', date: new Date().toISOString() },
  { id: 'm2', homeId: 'LEE', awayId: 'WAR', venueId: 'LEEV', date: new Date(Date.now() + 86400000).toISOString() },
  { id: 'm3', homeId: 'CAT', awayId: 'HUL', venueId: 'CATV', date: new Date(Date.now() + 2 * 86400000).toISOString() },
]

/** for DataUploader.tsx */
export const mockMatches = matches
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

export const mockFixtures: Fixture[] = [
  {
    id: 1,
    homeTeam: 'St Helens',
    awayTeam: 'Wigan Warriors',
    date: '2025-11-18T19:45:00',
    homeLogo: 'https://placehold.co/64x64/E63946/FFFFFF?text=SH',
    awayLogo: 'https://placehold.co/64x64/A8202D/FFFFFF?text=WW',
  },
  {
    id: 2,
    homeTeam: 'Leeds Rhinos',
    awayTeam: 'Castleford Tigers',
    date: '2025-11-19T15:00:00',
    homeLogo: 'https://placehold.co/64x64/005596/FFFFFF?text=LR',
    awayLogo: 'https://placehold.co/64x64/F47C20/FFFFFF?text=CT',
  },
  {
    id: 3,
    homeTeam: 'Warrington Wolves',
    awayTeam: 'Catalans Dragons',
    date: '2025-11-19T17:30:00',
    homeLogo: 'https://placehold.co/64x64/00539F/FFFFFF?text=WW',
    awayLogo: 'https://placehold.co/64x64/F8E000/000000?text=CD',
  },
]

export const mockLeagueTable: LeagueStanding[] = [
  {
    rank: 1,
    teamId: 'WIG',
    teamName: TEAMS.WIG.name,
    teamLogoUrl: TEAMS.WIG.logoUrl,
    played: 12,
    wins: 10,
    draws: 1,
    losses: 1,
    points: 21,
    form: 'WWWWW',
  },
  {
    rank: 2,
    teamId: 'STH',
    teamName: TEAMS.STH.name,
    teamLogoUrl: TEAMS.STH.logoUrl,
    played: 12,
    wins: 9,
    draws: 1,
    losses: 2,
    points: 19,
    form: 'WWLWW',
  },
  {
    rank: 3,
    teamId: 'LEE',
    teamName: TEAMS.LEE.name,
    teamLogoUrl: TEAMS.LEE.logoUrl,
    played: 12,
    wins: 8,
    draws: 0,
    losses: 4,
    points: 16,
    form: 'WLWLW',
  },
  {
    rank: 4,
    teamId: 'WAR',
    teamName: TEAMS.WAR.name,
    teamLogoUrl: TEAMS.WAR.logoUrl,
    played: 12,
    wins: 7,
    draws: 1,
    losses: 4,
    points: 15,
    form: 'LWWWW',
  },
  {
    rank: 5,
    teamId: 'CAT',
    teamName: TEAMS.CAT.name,
    teamLogoUrl: TEAMS.CAT.logoUrl,
    played: 12,
    wins: 6,
    draws: 2,
    losses: 4,
    points: 14,
    form: 'WDWLW',
  },
  {
    rank: 6,
    teamId: 'HUL',
    teamName: TEAMS.HUL.name,
    teamLogoUrl: TEAMS.HUL.logoUrl,
    played: 12,
    wins: 5,
    draws: 1,
    losses: 6,
    points: 11,
    form: 'LWLWL',
  },
]

export function getTeamById(id: string): Team | undefined {
  return TEAMS[id]
}

export function getVenueById(id: string): Venue | undefined {
  return ALL_VENUES.find((venue) => venue.id === id)
}
