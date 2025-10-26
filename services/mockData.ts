// services/mockData.ts

export type Team = {
  id: string;
  name: string;
  shortName?: string;
  logoUrl?: string;
};

export type Venue = {
  id: string;
  name: string;
  lat?: number;
  lon?: number;
  city?: string;
};

export type Match = {
  id: string;
  homeId: string;
  awayId: string;
  venueId: string;
  date: string;
};

export type LeagueSummary = {
  Season: number;
  Champion: string;
  RunnersUp: string;
  LeagueLeadersShield: string;
  GrandFinalScore: string;
};

export type IndividualAwards = {
  ManOfSteel: string;
  TopTryScorer: string;
  TopPointsScorer: string;
  YoungPlayerOfTheYear: string;
};

export type FinalTableEntry = {
  Position: number;
  Team: string;
  Pld: number;
  W: number;
  D: number;
  L: number;
  PF: number;
  PA: number;
  PD: string;
  Pts: number;
  Qualification?: string;
  Relegation?: string;
};

export type SelectedMatchResult = {
  Round: number;
  Date: string;
  HomeTeam: string;
  AwayTeam: string;
  Score: string;
  Venue: string;
  Note?: string;
};

export type PlayoffMatchResult = {
  Match: string;
  HomeTeam: string;
  AwayTeam: string;
  Score: string;
  Winner: string;
};

export type PlayoffResults = {
  Eliminators: PlayoffMatchResult[];
  SemiFinals: PlayoffMatchResult[];
  GrandFinal: {
    Date: string;
    HomeTeam: string;
    AwayTeam: string;
    Score: string;
    Venue: string;
    Champion: string;
  };
};

export type FixtureResult = {
  id: string;
  round: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  venue: string;
  note?: string;
  homeLogo: string;
  awayLogo: string;
};

const createPlaceholderLogo = (label: string, colour: string) =>
  `https://placehold.co/96x96/${colour.replace('#', '')}/FFFFFF?text=${encodeURIComponent(label)}`;

export const TEAMS: Record<string, Team> = {
  HKR: { id: 'HKR', name: 'Hull Kingston Rovers', shortName: 'Hull KR' },
  WIG: { id: 'WIG', name: 'Wigan Warriors', shortName: 'Wigan' },
  LEP: { id: 'LEP', name: 'Leigh Leopards', shortName: 'Leigh' },
  LEE: { id: 'LEE', name: 'Leeds Rhinos', shortName: 'Leeds' },
  STH: { id: 'STH', name: 'St Helens', shortName: 'Saints' },
  WAK: { id: 'WAK', name: 'Wakefield Trinity', shortName: 'Wakefield' },
  HFC: { id: 'HFC', name: 'Hull FC', shortName: 'Hull FC' },
  WAR: { id: 'WAR', name: 'Warrington Wolves', shortName: 'Warrington' },
  CAT: { id: 'CAT', name: 'Catalans Dragons', shortName: 'Catalans' },
  HUD: { id: 'HUD', name: 'Huddersfield Giants', shortName: 'Huddersfield' },
  CAS: { id: 'CAS', name: 'Castleford Tigers', shortName: 'Castleford' },
  SAL: { id: 'SAL', name: 'Salford Red Devils', shortName: 'Salford' },
};

const TEAM_COLOURS: Record<string, string> = {
  HKR: '#d71920',
  WIG: '#6c1d45',
  LEP: '#f1a40e',
  LEE: '#0057b8',
  STH: '#d10000',
  WAK: '#003399',
  HFC: '#101820',
  WAR: '#0047ba',
  CAT: '#f6b600',
  HUD: '#6c2c2f',
  CAS: '#f47b20',
  SAL: '#c8102e',
};

export const teams: Team[] = Object.values(TEAMS).map(team => ({
  ...team,
  logoUrl: createPlaceholderLogo(team.shortName ?? team.id, TEAM_COLOURS[team.id] ?? '#1a2c20'),
}));

export const ALL_VENUES: Venue[] = [
  { id: 'HKRV', name: 'Sewell Group Craven Park', city: 'Hull', lat: 53.752, lon: -0.276 },
  { id: 'WIGV', name: 'Brick Community Stadium', city: 'Wigan', lat: 53.547, lon: -2.653 },
  { id: 'LEPV', name: 'Leigh Sports Village', city: 'Leigh', lat: 53.483, lon: -2.516 },
  { id: 'LEEV', name: 'Headingley Stadium', city: 'Leeds', lat: 53.819, lon: -1.582 },
  { id: 'STHV', name: 'Totally Wicked Stadium', city: 'St Helens', lat: 53.453, lon: -2.74 },
  { id: 'WAKV', name: 'Belle Vue', city: 'Wakefield', lat: 53.671, lon: -1.484 },
  { id: 'HFCV', name: 'MKM Stadium', city: 'Hull', lat: 53.746, lon: -0.366 },
  { id: 'WARV', name: 'Halliwell Jones Stadium', city: 'Warrington', lat: 53.391, lon: -2.602 },
  { id: 'CATV', name: 'Stade Gilbert Brutus', city: 'Perpignan', lat: 42.697, lon: 2.903 },
  { id: 'HUDV', name: "John Smith's Stadium", city: 'Huddersfield', lat: 53.654, lon: -1.768 },
  { id: 'CASV', name: 'Mend-A-Hose Jungle', city: 'Castleford', lat: 53.725, lon: -1.362 },
  { id: 'SALV', name: 'Salford Community Stadium', city: 'Salford', lat: 53.483, lon: -2.358 },
];

export const teamIdToVenue: Record<string, string> = {
  HKR: 'Sewell Group Craven Park',
  WIG: 'Brick Community Stadium',
  LEP: 'Leigh Sports Village',
  LEE: 'Headingley Stadium',
  STH: 'Totally Wicked Stadium',
  WAK: 'Belle Vue',
  HFC: 'MKM Stadium',
  WAR: 'Halliwell Jones Stadium',
  CAT: 'Stade Gilbert Brutus',
  HUD: "John Smith's Stadium",
  CAS: 'Mend-A-Hose Jungle',
  SAL: 'Salford Community Stadium',
};

export const TEAM_BRANDING: Record<
  string,
  {
    bg: string;
    text: string;
    palette?: [string, string?, string?];
  }
> = {
  HKR: { bg: '#d71920', text: '#ffffff', palette: ['#d71920', '#a40016'] },
  WIG: { bg: '#6c1d45', text: '#ffffff', palette: ['#6c1d45', '#a61f2b'] },
  LEP: { bg: '#000000', text: '#f5f5f5', palette: ['#000000', '#f1a40e'] },
  LEE: { bg: '#0057b8', text: '#f9b000', palette: ['#0057b8', '#f9b000'] },
  STH: { bg: '#d10000', text: '#ffffff', palette: ['#d10000', '#ffffff'] },
  WAK: { bg: '#003399', text: '#ffffff', palette: ['#003399', '#ffcc00'] },
  HFC: { bg: '#101820', text: '#ffffff', palette: ['#101820', '#c5c5c5'] },
  WAR: { bg: '#0047ba', text: '#fcd116', palette: ['#0047ba', '#fcd116'] },
  CAT: { bg: '#f6b600', text: '#9e1b32', palette: ['#f6b600', '#9e1b32'] },
  HUD: { bg: '#6c2c2f', text: '#f8b500', palette: ['#6c2c2f', '#f8b500'] },
  CAS: { bg: '#f47b20', text: '#101820', palette: ['#f47b20', '#101820'] },
  SAL: { bg: '#c8102e', text: '#ffffff', palette: ['#c8102e', '#ffffff'] },
};

export const matches: Match[] = [
  { id: 'm1', homeId: 'WIG', awayId: 'STH', venueId: 'WIGV', date: new Date().toISOString() },
];

/** for DataUploader.tsx */
export const mockMatches: Match[] = matches;

export const superLeague2025Summary: LeagueSummary = {
  Season: 2025,
  Champion: 'Hull Kingston Rovers',
  RunnersUp: 'Wigan Warriors',
  LeagueLeadersShield: 'Hull Kingston Rovers',
  GrandFinalScore: 'Hull Kingston Rovers 24 - 6 Wigan Warriors',
};

export const individualAwards: IndividualAwards = {
  ManOfSteel: 'Mikey Lewis (Hull KR)',
  TopTryScorer: 'Adam Swift (Huddersfield Giants)',
  TopPointsScorer: 'Harry Smith (Wigan Warriors)',
  YoungPlayerOfTheYear: 'Jack Sinfield (Leeds Rhinos)',
};

export const finalLeagueTable: FinalTableEntry[] = [
  {
    Position: 1,
    Team: 'Hull Kingston Rovers',
    Pld: 27,
    W: 22,
    D: 0,
    L: 5,
    PF: 786,
    PA: 292,
    PD: '+494',
    Pts: 44,
    Qualification: 'Advance to Semi-finals',
  },
  {
    Position: 2,
    Team: 'Wigan Warriors',
    Pld: 27,
    W: 21,
    D: 0,
    L: 6,
    PF: 794,
    PA: 333,
    PD: '+461',
    Pts: 42,
    Qualification: 'Advance to Semi-finals',
  },
  {
    Position: 3,
    Team: 'Leigh Leopards',
    Pld: 27,
    W: 19,
    D: 1,
    L: 7,
    PF: 619,
    PA: 452,
    PD: '+167',
    Pts: 39,
    Qualification: 'Advance to Eliminators',
  },
  {
    Position: 4,
    Team: 'Leeds Rhinos',
    Pld: 27,
    W: 18,
    D: 0,
    L: 9,
    PF: 610,
    PA: 310,
    PD: '+300',
    Pts: 36,
    Qualification: 'Advance to Eliminators',
  },
  {
    Position: 5,
    Team: 'St Helens',
    Pld: 27,
    W: 17,
    D: 0,
    L: 10,
    PF: 677,
    PA: 314,
    PD: '+363',
    Pts: 34,
    Qualification: 'Advance to Eliminators',
  },
  {
    Position: 6,
    Team: 'Wakefield Trinity',
    Pld: 27,
    W: 15,
    D: 0,
    L: 12,
    PF: 688,
    PA: 458,
    PD: '+230',
    Pts: 30,
    Qualification: 'Advance to Eliminators',
  },
  {
    Position: 7,
    Team: 'Hull FC',
    Pld: 27,
    W: 13,
    D: 1,
    L: 13,
    PF: 539,
    PA: 461,
    PD: '+78',
    Pts: 27,
  },
  {
    Position: 8,
    Team: 'Warrington Wolves',
    Pld: 27,
    W: 10,
    D: 0,
    L: 17,
    PF: 480,
    PA: 641,
    PD: '-161',
    Pts: 20,
  },
  {
    Position: 9,
    Team: 'Catalans Dragons',
    Pld: 27,
    W: 10,
    D: 0,
    L: 17,
    PF: 425,
    PA: 652,
    PD: '-227',
    Pts: 20,
  },
  {
    Position: 10,
    Team: 'Huddersfield Giants',
    Pld: 27,
    W: 7,
    D: 0,
    L: 20,
    PF: 347,
    PA: 738,
    PD: '-391',
    Pts: 14,
  },
  {
    Position: 11,
    Team: 'Castleford Tigers',
    Pld: 27,
    W: 6,
    D: 0,
    L: 21,
    PF: 396,
    PA: 815,
    PD: '-419',
    Pts: 12,
  },
  {
    Position: 12,
    Team: 'Salford Red Devils',
    Pld: 27,
    W: 3,
    D: 0,
    L: 24,
    PF: 234,
    PA: 1129,
    PD: '-895',
    Pts: 4,
    Relegation: 'Demoted to Championship',
  },
];

export const selectedMatchResults: SelectedMatchResult[] = [
  {
    Round: 1,
    Date: '13 Feb 2025',
    HomeTeam: 'Wigan Warriors',
    AwayTeam: 'Leigh Leopards',
    Score: '0-1 (g.p.)',
    Venue: 'Brick Community Stadium',
  },
  {
    Round: 1,
    Date: '15 Feb 2025',
    HomeTeam: 'St Helens',
    AwayTeam: 'Salford Red Devils',
    Score: '82-0',
    Venue: 'Totally Wicked Stadium',
    Note: 'Biggest home win of the season',
  },
  {
    Round: 3,
    Date: '1 Mar 2025',
    HomeTeam: 'Wigan Warriors',
    AwayTeam: 'Warrington Wolves',
    Score: '48-24',
    Venue: 'Allegiant Stadium (Las Vegas)',
  },
  {
    Round: 6,
    Date: '28 Mar 2025',
    HomeTeam: 'Hull FC',
    AwayTeam: 'Hull Kingston Rovers',
    Score: '12-22',
    Venue: 'MKM Stadium (Hull Derby)',
    Note: 'Good Friday Derby',
  },
  {
    Round: 8,
    Date: '18 Apr 2025',
    HomeTeam: 'Wigan Warriors',
    AwayTeam: 'St Helens',
    Score: '24-14',
    Venue: 'Brick Community Stadium (Rivals Round)',
  },
  {
    Round: 19,
    Date: '31 Jul 2025',
    HomeTeam: 'Salford Red Devils',
    AwayTeam: 'Hull KR',
    Score: '12-74',
    Venue: 'Salford Community Stadium',
    Note: 'Biggest away win of the season',
  },
];

export const playoffResults: PlayoffResults = {
  Eliminators: [
    {
      Match: 'Eliminator 1',
      HomeTeam: 'Leigh Leopards (3)',
      AwayTeam: 'Wakefield Trinity (6)',
      Score: '26-10',
      Winner: 'Leigh Leopards',
    },
    {
      Match: 'Eliminator 2',
      HomeTeam: 'Leeds Rhinos (4)',
      AwayTeam: 'St Helens (5)',
      Score: '14-16',
      Winner: 'St Helens',
    },
  ],
  SemiFinals: [
    {
      Match: 'Semi-Final 1',
      HomeTeam: 'Hull Kingston Rovers (1)',
      AwayTeam: 'St Helens (5)',
      Score: '20-12',
      Winner: 'Hull Kingston Rovers',
    },
    {
      Match: 'Semi-Final 2',
      HomeTeam: 'Wigan Warriors (2)',
      AwayTeam: 'Leigh Leopards (3)',
      Score: '18-6',
      Winner: 'Wigan Warriors',
    },
  ],
  GrandFinal: {
    Date: '11 Oct 2025',
    HomeTeam: 'Hull Kingston Rovers',
    AwayTeam: 'Wigan Warriors',
    Score: '24-6',
    Venue: 'Old Trafford',
    Champion: 'Hull Kingston Rovers',
  },
};

export type TableRow = {
  position: number;
  teamId: string;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDifference: string;
  points: number;
  qualification?: string;
  relegation?: string;
};

export const TEAM_FORMS: Record<string, string> = {
  HKR: 'WWWLW',
  WIG: 'WWLWW',
  LEP: 'WLWWW',
  LEE: 'LWWWW',
  STH: 'WLWLW',
  WAK: 'WWLLW',
  HFC: 'LDWLW',
  WAR: 'LLWLL',
  CAT: 'LLWLL',
  HUD: 'LWLLL',
  CAS: 'LLWLL',
  SAL: 'LLLLL',
};

const TEAM_NAME_ALIASES: Record<string, string> = {
  'Hull KR': 'Hull Kingston Rovers',
  'Hull Kingston Rovers': 'Hull Kingston Rovers',
};

const TEAM_IDS_BY_NAME = Object.values(TEAMS).reduce<Record<string, string>>((acc, team) => {
  acc[team.name] = team.id;
  return acc;
}, {});

export const mockLeagueTable: TableRow[] = finalLeagueTable.map(entry => {
  const teamId = TEAM_IDS_BY_NAME[entry.Team];
  return {
    position: entry.Position,
    teamId,
    teamName: entry.Team,
    played: entry.Pld,
    won: entry.W,
    drawn: entry.D,
    lost: entry.L,
    pointsFor: entry.PF,
    pointsAgainst: entry.PA,
    pointsDifference: entry.PD,
    points: entry.Pts,
    qualification: entry.Qualification,
    relegation: entry.Relegation,
  };
});

export const selectedFixtureResults: FixtureResult[] = selectedMatchResults.map((result, index) => {
  const normalizedHomeName = TEAM_NAME_ALIASES[result.HomeTeam] ?? result.HomeTeam;
  const normalizedAwayName = TEAM_NAME_ALIASES[result.AwayTeam] ?? result.AwayTeam;
  const homeId = TEAM_IDS_BY_NAME[normalizedHomeName] ?? normalizedHomeName.slice(0, 3).toUpperCase();
  const awayId = TEAM_IDS_BY_NAME[normalizedAwayName] ?? normalizedAwayName.slice(0, 3).toUpperCase();
  const homeColour = TEAM_COLOURS[homeId] ?? '#1a2c20';
  const awayColour = TEAM_COLOURS[awayId] ?? '#1a2c20';

  return {
    id: `fixture-${index + 1}`,
    round: result.Round,
    date: new Date(result.Date).toISOString(),
    homeTeam: result.HomeTeam,
    awayTeam: result.AwayTeam,
    score: result.Score,
    venue: result.Venue,
    note: result.Note,
    homeLogo: createPlaceholderLogo(TEAMS[homeId]?.shortName ?? homeId, homeColour),
    awayLogo: createPlaceholderLogo(TEAMS[awayId]?.shortName ?? awayId, awayColour),
  };
});

export const mockFixtures: FixtureResult[] = selectedFixtureResults;

export function getTeamById(id: string): Team | undefined {
  return TEAMS[id];
}

export function getVenueById(id: string): Venue | undefined {
  return ALL_VENUES.find(v => v.id === id);
}

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
