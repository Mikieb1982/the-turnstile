// fixtures.ts

import type { Match, LeagueStanding, Team, Venue } from 'types';

// ---------- Teams ----------
export const TEAMS = {
  wigan: { id: '1', name: 'Wigan Warriors', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/z328jy1600893040.png' },
  stHelens: { id: '2', name: 'St Helens', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/qsw4741599320017.png' },
  leeds: { id: '3', name: 'Leeds Rhinos', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/p14u931599320349.png' },
  warrington: { id: '4', name: 'Warrington Wolves', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/6990ay1599320138.png' },
  catalans: { id: '5', name: 'Catalans Dragons', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/19k0uq1599320256.png' },
  huddersfield: { id: '6', name: 'Huddersfield Giants', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/yt8cfx1599320478.png' },
  hullKR: { id: '7', name: 'Hull KR', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/u0ypre1599320577.png' },
  hullFC: { id: '8', name: 'Hull FC', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/34tppc1599320649.png' },
  salford: { id: '9', name: 'Salford Red Devils', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/mvx62g1599320875.png' },
  leigh: { id: '10', name: 'Leigh Leopards', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/b5z9g31671732681.png' },
  castleford: { id: '11', name: 'Castleford Tigers', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/8iif5k1599320790.png' },
  london: { id: '12', name: 'London Broncos', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/3k75b41600892790.png' },
  wakefield: { id: '13', name: 'Wakefield Trinity', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/en323k1599320716.png' }
} as const;

const WINNER_SF1: Team = { id: 'winner-sf1', name: 'TBC (Winner SF1)', logoUrl: '' };
const WINNER_SF2: Team = { id: 'winner-sf2', name: 'TBC (Winner SF2)', logoUrl: '' };

// ---------- Team branding ----------
export interface TeamBranding {
  bg: string;
  text: string;
  palette: string[];
}

export const TEAM_BRANDING: Record<string, TeamBranding> = {
  '1': { bg: '#862633', text: '#FFFFFF', palette: ['#862633', '#FFFFFF', '#060805'] },
  '2': { bg: '#B31F1D', text: '#FFFFFF', palette: ['#B31F1D', '#FFFFFF'] },
  '3': { bg: '#00539F', text: '#FFFFFF', palette: ['#00539F', '#FFB81C'] },
  '4': { bg: '#015DAA', text: '#FFFFFF', palette: ['#015DAA', '#FFD700', '#FFFFFF'] },
  '5': { bg: '#E62228', text: '#FFFFFF', palette: ['#E62228', '#FFD700', '#FFFFFF'] },
  '6': { bg: '#8A0035', text: '#FFFFFF', palette: ['#8A0035', '#FFB81C'] },
  '7': { bg: '#E6002A', text: '#FFFFFF', palette: ['#E6002A', '#FFFFFF'] },
  '8': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#FFFFFF'] },
  '9': { bg: '#DA291C', text: '#FFFFFF', palette: ['#DA291C', '#FFFFFF', '#000000'] },
  '10': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#FFFFFF', '#D4AF37'] },
  '11': { bg: '#F47C10', text: '#000000', palette: ['#F47C10', '#000000'] },
  '12': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#E4032C', '#FFFFFF'] },
  '13': { bg: '#0073C0', text: '#FFFFFF', palette: ['#0073C0', '#FFFFFF', '#D71920'] }
};

// ---------- Venues ----------
const VENUES = {
  dw: 'The Brick Community Stadium',
  totallyWicked: 'Totally Wicked Stadium',
  headingley: 'Headingley',
  halliwellJones: 'Halliwell Jones Stadium',
  gilbertBrutus: 'Stade Gilbert Brutus',
  johnSmiths: "John Smith's Stadium",
  cravenPark: 'Sewell Group Craven Park',
  mkm: 'MKM Stadium',
  salfordCommunity: 'Salford Community Stadium',
  leighSportsVillage: 'Leigh Sports Village',
  mendAHose: 'Mend-A-Hose Jungle',
  cherryRed: 'Cherry Red Records Stadium',
  belleVue: 'Belle Vue',
  oldTrafford: 'Old Trafford',
  stJamesPark: "St James' Park"
} as const;

export const teamIdToVenue: Record<string, string> = {
  [TEAMS.wigan.id]: VENUES.dw,
  [TEAMS.stHelens.id]: VENUES.totallyWicked,
  [TEAMS.leeds.id]: VENUES.headingley,
  [TEAMS.warrington.id]: VENUES.halliwellJones,
  [TEAMS.catalans.id]: VENUES.gilbertBrutus,
  [TEAMS.huddersfield.id]: VENUES.johnSmiths,
  [TEAMS.hullKR.id]: VENUES.cravenPark,
  [TEAMS.hullFC.id]: VENUES.mkm,
  [TEAMS.salford.id]: VENUES.salfordCommunity,
  [TEAMS.leigh.id]: VENUES.leighSportsVillage,
  [TEAMS.castleford.id]: VENUES.mendAHose,
  [TEAMS.london.id]: VENUES.cherryRed,
  [TEAMS.wakefield.id]: VENUES.belleVue
};

// If your Venue type makes x and y optional, this matches your data below.
// If not, add x and y to the neutral venues too.
export const ALL_VENUES: Venue[] = [
  { name: VENUES.dw, team: TEAMS.wigan.name, lat: 53.547, lon: -2.651, x: 245, y: 300 },
  { name: VENUES.totallyWicked, team: TEAMS.stHelens.name, lat: 53.453, lon: -2.729, x: 235, y: 310 },
  { name: VENUES.headingley, team: TEAMS.leeds.name, lat: 53.816, lon: -1.583, x: 280, y: 285 },
  { name: VENUES.halliwellJones, team: TEAMS.warrington.name, lat: 53.393, lon: -2.583, x: 250, y: 320 },
  { name: VENUES.gilbertBrutus, team: TEAMS.catalans.name, lat: 42.716, lon: 2.894, x: 450, y: 750 },
  { name: VENUES.johnSmiths, team: TEAMS.huddersfield.name, lat: 53.655, lon: -1.768, x: 275, y: 295 },
  { name: VENUES.cravenPark, team: TEAMS.hullKR.name, lat: 53.75, lon: -0.298, x: 335, y: 280 },
  { name: VENUES.mkm, team: TEAMS.hullFC.name, lat: 53.746, lon: -0.367, x: 330, y: 285 },
  { name: VENUES.salfordCommunity, team: TEAMS.salford.name, lat: 53.468, lon: -2.359, x: 255, y: 310 },
  { name: VENUES.leighSportsVillage, team: TEAMS.leigh.name, lat: 53.492, lon: -2.528, x: 240, y: 305 },
  { name: VENUES.mendAHose, team: TEAMS.castleford.name, lat: 53.719, lon: -1.336, x: 290, y: 290 },
  { name: VENUES.cherryRed, team: TEAMS.london.name, lat: 51.431, lon: -0.188, x: 320, y: 640 },
  { name: VENUES.belleVue, team: TEAMS.wakefield.name, lat: 53.673, lon: -1.481, x: 285, y: 292 },
  { name: VENUES.oldTrafford, team: 'Neutral', lat: 53.4631, lon: -2.2913 },
  { name: VENUES.stJamesPark, team: 'Neutral', lat: 54.9756, lon: -1.6218 }
];

export const VENUE_LOCATIONS: Record<string, { x: number; y: number; name: string }> = {
  [VENUES.dw]: { x: 245, y: 300, name: VENUES.dw },
  [VENUES.totallyWicked]: { x: 235, y: 310, name: VENUES.totallyWicked },
  [VENUES.headingley]: { x: 280, y: 285, name: VENUES.headingley },
  [VENUES.halliwellJones]: { x: 250, y: 320, name: VENUES.halliwellJones },
  [VENUES.gilbertBrutus]: { x: 450, y: 750, name: VENUES.gilbertBrutus },
  [VENUES.johnSmiths]: { x: 275, y: 295, name: VENUES.johnSmiths },
  [VENUES.cravenPark]: { x: 335, y: 280, name: VENUES.cravenPark },
  [VENUES.mkm]: { x: 330, y: 285, name: VENUES.mkm },
  [VENUES.salfordCommunity]: { x: 255, y: 310, name: VENUES.salfordCommunity },
  [VENUES.leighSportsVillage]: { x: 240, y: 305, name: VENUES.leighSportsVillage },
  [VENUES.mendAHose]: { x: 290, y: 290, name: VENUES.mendAHose },
  [VENUES.cherryRed]: { x: 320, y: 640, name: VENUES.cherryRed },
  [VENUES.belleVue]: { x: 285, y: 292, name: VENUES.belleVue },
  [VENUES.oldTrafford]: { x: 260, y: 315, name: VENUES.oldTrafford },
  [VENUES.stJamesPark]: { x: 280, y: 150, name: VENUES.stJamesPark }
};

// ---------- Match factory helpers ----------
const createMatch = (
  id: number,
  homeTeam: Team,
  awayTeam: Team,
  status: Match['status'],
  daysOffset: number,
  homeScore: number,
  awayScore: number,
  venue: string
): Match => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(19, 45, 0, 0);

  return {
    id: `mock-${id}`,
    competition: { id: '4415', name: 'Betfred Super League' },
    homeTeam,
    awayTeam,
    status,
    startTime: date.toISOString(),
    venue,
    scores: { home: homeScore, away: awayScore },
    stats:
      status === 'FULL-TIME'
        ? {
            possession: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            territory: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            tackles: {
              home: 300 + Math.floor(Math.random() * 50),
              away: 300 + Math.floor(Math.random() * 50)
            }
          }
        : undefined
  };
};

const createMatchOnDate = (
  id: number,
  homeTeam: Team,
  awayTeam: Team,
  status: Match['status'],
  date: Date,
  homeScore: number,
  awayScore: number,
  venue: string
): Match => {
  return {
    id: `mock-${id}`,
    competition: { id: '4415', name: 'Betfred Super League' },
    homeTeam,
    awayTeam,
    status,
    startTime: date.toISOString(),
    venue,
    scores: { home: homeScore, away: awayScore },
    stats:
      status === 'FULL-TIME'
        ? {
            possession: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            territory: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            tackles: {
              home: 300 + Math.floor(Math.random() * 50),
              away: 300 + Math.floor(Math.random() * 50)
            }
          }
        : undefined
  };
};

// ---------- Mock data ----------
export const mockMatches: Match[] = [
  // Upcoming play-off fixtures
  createMatchOnDate(
    113,
    TEAMS.wigan,
    TEAMS.leigh,
    'SCHEDULED',
    new Date('2025-10-03T20:00:00+01:00'),
    0,
    0,
    teamIdToVenue[TEAMS.wigan.id]
  ),
  createMatchOnDate(
    114,
    TEAMS.hullKR,
    TEAMS.stHelens,
    'SCHEDULED',
    new Date('2025-10-04T17:30:00+01:00'),
    0,
    0,
    teamIdToVenue[TEAMS.hullKR.id]
  ),
  createMatchOnDate(
    115,
    WINNER_SF1,
    WINNER_SF2,
    'SCHEDULED',
    new Date('2025-10-11T18:00:00+01:00'),
    0,
    0,
    VENUES.oldTrafford
  ),

  // Past
  createMatch(7, TEAMS.wigan, TEAMS.leeds, 'FULL-TIME', -7, 34, 8, VENUES.dw),
  createMatch(8, TEAMS.stHelens, TEAMS.catalans, 'FULL-TIME', -8, 22, 12, VENUES.totallyWicked),
  createMatch(9, TEAMS.warrington, TEAMS.hullKR, 'FULL-TIME', -9, 18, 26, VENUES.halliwellJones),
  createMatch(10, TEAMS.huddersfield, TEAMS.salford, 'FULL-TIME', -10, 16, 16, VENUES.johnSmiths),
  createMatch(11, TEAMS.hullFC, TEAMS.london, 'FULL-TIME', -11, 28, 24, VENUES.mkm),
  createMatch(12, TEAMS.leigh, TEAMS.castleford, 'FULL-TIME', -12, 30, 6, VENUES.leighSportsVillage),

  // Badges
  createMatch(13, TEAMS.wigan, TEAMS.warrington, 'FULL-TIME', -30, 18, 10, VENUES.oldTrafford),
  createMatch(14, TEAMS.leeds, TEAMS.hullFC, 'FULL-TIME', -60, 28, 22, VENUES.stJamesPark),
  createMatch(15, TEAMS.catalans, TEAMS.wigan, 'FULL-TIME', -20, 30, 12, VENUES.gilbertBrutus),

  // Away Day badges
  createMatch(16, TEAMS.huddersfield, TEAMS.stHelens, 'FULL-TIME', -40, 12, 24, VENUES.johnSmiths),
  createMatch(17, TEAMS.warrington, TEAMS.stHelens, 'FULL-TIME', -50, 6, 18, VENUES.halliwellJones),
  createMatch(18, TEAMS.leigh, TEAMS.stHelens, 'FULL-TIME', -25, 10, 30, VENUES.leighSportsVillage),

  // 2025 results
  createMatchOnDate(201, TEAMS.wigan, TEAMS.leigh, 'FULL-TIME', new Date('2025-02-13T13:00:00'), 0, 1, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(202, TEAMS.hullKR, TEAMS.castleford, 'FULL-TIME', new Date('2025-02-14T13:00:00'), 19, 18, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(203, TEAMS.catalans, TEAMS.hullFC, 'FULL-TIME', new Date('2025-02-14T15:00:00'), 4, 24, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(204, TEAMS.leeds, TEAMS.wakefield, 'FULL-TIME', new Date('2025-02-15T13:00:00'), 12, 14, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(205, TEAMS.stHelens, TEAMS.salford, 'FULL-TIME', new Date('2025-02-15T15:00:00'), 82, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(206, TEAMS.huddersfield, TEAMS.warrington, 'FULL-TIME', new Date('2025-02-16T13:00:00'), 12, 20, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(207, TEAMS.wakefield, TEAMS.hullKR, 'FULL-TIME', new Date('2025-02-20T13:00:00'), 12, 14, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(208, TEAMS.hullFC, TEAMS.wigan, 'FULL-TIME', new Date('2025-02-21T13:00:00'), 4, 46, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(209, TEAMS.warrington, TEAMS.catalans, 'FULL-TIME', new Date('2025-02-21T15:00:00'), 18, 12, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(210, TEAMS.salford, TEAMS.leeds, 'FULL-TIME', new Date('2025-02-22T13:00:00'), 6, 32, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(211, TEAMS.castleford, TEAMS.stHelens, 'FULL-TIME', new Date('2025-02-22T15:00:00'), 6, 46, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(212, TEAMS.leigh, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-02-23T13:00:00'), 24, 10, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(213, TEAMS.hullKR, TEAMS.salford, 'FULL-TIME', new Date('2025-02-27T13:00:00'), 42, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(214, TEAMS.huddersfield, TEAMS.hullFC, 'FULL-TIME', new Date('2025-02-28T13:00:00'), 10, 11, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(215, TEAMS.leigh, TEAMS.catalans, 'FULL-TIME', new Date('2025-02-28T15:00:00'), 34, 6, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(216, TEAMS.wakefield, TEAMS.stHelens, 'FULL-TIME', new Date('2025-03-01T13:00:00'), 6, 26, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(217, TEAMS.wigan, TEAMS.warrington, 'FULL-TIME', new Date('2025-03-01T15:00:00'), 48, 24, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(218, TEAMS.leeds, TEAMS.castleford, 'FULL-TIME', new Date('2025-03-02T13:00:00'), 38, 24, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(219, TEAMS.hullFC, TEAMS.leigh, 'FULL-TIME', new Date('2025-03-06T13:00:00'), 22, 22, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(220, TEAMS.castleford, TEAMS.salford, 'FULL-TIME', new Date('2025-03-07T13:00:00'), 22, 14, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(221, TEAMS.stHelens, TEAMS.hullKR, 'FULL-TIME', new Date('2025-03-07T15:00:00'), 10, 20, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(222, TEAMS.catalans, TEAMS.leeds, 'FULL-TIME', new Date('2025-03-08T13:00:00'), 11, 0, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(223, TEAMS.warrington, TEAMS.wakefield, 'FULL-TIME', new Date('2025-03-09T13:00:00'), 16, 30, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(224, TEAMS.wigan, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-03-09T15:00:00'), 44, 18, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(225, TEAMS.salford, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-03-20T13:00:00'), 23, 10, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(226, TEAMS.stHelens, TEAMS.warrington, 'FULL-TIME', new Date('2025-03-21T13:00:00'), 12, 14, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(227, TEAMS.wakefield, TEAMS.hullFC, 'FULL-TIME', new Date('2025-03-21T15:00:00'), 12, 16, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(228, TEAMS.castleford, TEAMS.catalans, 'FULL-TIME', new Date('2025-03-22T13:00:00'), 4, 26, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(229, TEAMS.leeds, TEAMS.wigan, 'FULL-TIME', new Date('2025-03-22T15:00:00'), 12, 10, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(230, TEAMS.hullKR, TEAMS.leigh, 'FULL-TIME', new Date('2025-03-23T13:00:00'), 30, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(231, TEAMS.castleford, TEAMS.hullFC, 'FULL-TIME', new Date('2025-03-27T13:00:00'), 14, 24, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(232, TEAMS.warrington, TEAMS.leeds, 'FULL-TIME', new Date('2025-03-28T13:00:00'), 16, 14, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(233, TEAMS.leigh, TEAMS.wakefield, 'FULL-TIME', new Date('2025-03-28T15:00:00'), 14, 40, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(234, TEAMS.catalans, TEAMS.stHelens, 'FULL-TIME', new Date('2025-03-29T13:00:00'), 13, 14, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(235, TEAMS.huddersfield, TEAMS.hullKR, 'FULL-TIME', new Date('2025-03-30T13:00:00'), 4, 50, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(236, TEAMS.wigan, TEAMS.salford, 'FULL-TIME', new Date('2025-03-30T15:00:00'), 54, 0, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(237, TEAMS.salford, TEAMS.leeds, 'FULL-TIME', new Date('2025-04-10T13:00:00'), 0, 28, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(238, TEAMS.hullKR, TEAMS.wigan, 'FULL-TIME', new Date('2025-04-11T13:00:00'), 12, 28, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(239, TEAMS.stHelens, TEAMS.wakefield, 'FULL-TIME', new Date('2025-04-11T15:00:00'), 26, 14, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(240, TEAMS.warrington, TEAMS.hullFC, 'FULL-TIME', new Date('2025-04-12T13:00:00'), 16, 28, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(241, TEAMS.castleford, TEAMS.leigh, 'FULL-TIME', new Date('2025-04-12T15:00:00'), 6, 20, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(242, TEAMS.huddersfield, TEAMS.catalans, 'FULL-TIME', new Date('2025-04-13T13:00:00'), 18, 38, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(243, TEAMS.wakefield, TEAMS.castleford, 'FULL-TIME', new Date('2025-04-17T13:00:00'), 13, 12, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(244, TEAMS.hullFC, TEAMS.hullKR, 'FULL-TIME', new Date('2025-04-18T13:00:00'), 14, 28, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(245, TEAMS.wigan, TEAMS.stHelens, 'FULL-TIME', new Date('2025-04-18T15:00:00'), 24, 14, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(246, TEAMS.leeds, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-04-18T17:00:00'), 28, 6, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(247, TEAMS.leigh, TEAMS.warrington, 'FULL-TIME', new Date('2025-04-19T13:00:00'), 18, 14, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(248, TEAMS.catalans, TEAMS.salford, 'FULL-TIME', new Date('2025-04-19T15:00:00'), 38, 10, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(249, TEAMS.warrington, TEAMS.stHelens, 'FULL-TIME', new Date('2025-04-24T13:00:00'), 32, 18, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(250, TEAMS.leeds, TEAMS.hullKR, 'FULL-TIME', new Date('2025-04-25T13:00:00'), 14, 20, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(251, TEAMS.huddersfield, TEAMS.castleford, 'FULL-TIME', new Date('2025-04-26T13:00:00'), 12, 30, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(252, TEAMS.catalans, TEAMS.wakefield, 'FULL-TIME', new Date('2025-04-26T15:00:00'), 24, 20, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(253, TEAMS.salford, TEAMS.leigh, 'FULL-TIME', new Date('2025-04-26T17:00:00'), 6, 28, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(254, TEAMS.hullFC, TEAMS.wigan, 'FULL-TIME', new Date('2025-04-27T13:00:00'), 12, 36, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(255, TEAMS.leigh, TEAMS.catalans, 'FULL-TIME', new Date('2025-05-03T13:00:00'), 26, 24, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(256, TEAMS.hullKR, TEAMS.salford, 'FULL-TIME', new Date('2025-05-03T15:00:00'), 54, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(257, TEAMS.stHelens, TEAMS.leeds, 'FULL-TIME', new Date('2025-05-03T17:00:00'), 4, 17, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(258, TEAMS.huddersfield, TEAMS.hullFC, 'FULL-TIME', new Date('2025-05-04T13:00:00'), 12, 10, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(259, TEAMS.wigan, TEAMS.warrington, 'FULL-TIME', new Date('2025-05-04T15:00:00'), 22, 20, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(260, TEAMS.castleford, TEAMS.wakefield, 'FULL-TIME', new Date('2025-05-04T17:00:00'), 8, 32, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(261, TEAMS.stHelens, TEAMS.catalans, 'FULL-TIME', new Date('2025-05-15T13:00:00'), 40, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(262, TEAMS.leeds, TEAMS.hullFC, 'FULL-TIME', new Date('2025-05-16T13:00:00'), 18, 16, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(263, TEAMS.wigan, TEAMS.leigh, 'FULL-TIME', new Date('2025-05-16T15:00:00'), 36, 28, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(264, TEAMS.hullKR, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-05-17T13:00:00'), 34, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(265, TEAMS.wakefield, TEAMS.warrington, 'FULL-TIME', new Date('2025-05-18T13:00:00'), 40, 10, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(266, TEAMS.castleford, TEAMS.salford, 'FULL-TIME', new Date('2025-05-18T15:00:00'), 48, 16, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(267, TEAMS.leigh, TEAMS.hullFC, 'FULL-TIME', new Date('2025-05-22T13:00:00'), 12, 26, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(268, TEAMS.huddersfield, TEAMS.stHelens, 'FULL-TIME', new Date('2025-05-23T13:00:00'), 4, 46, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(269, TEAMS.warrington, TEAMS.hullKR, 'FULL-TIME', new Date('2025-05-23T15:00:00'), 12, 31, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(270, TEAMS.castleford, TEAMS.leeds, 'FULL-TIME', new Date('2025-05-24T13:00:00'), 6, 29, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(271, TEAMS.catalans, TEAMS.wigan, 'FULL-TIME', new Date('2025-05-24T15:00:00'), 0, 48, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(272, TEAMS.wakefield, TEAMS.salford, 'FULL-TIME', new Date('2025-05-25T13:00:00'), 72, 10, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(273, TEAMS.huddersfield, TEAMS.leigh, 'FULL-TIME', new Date('2025-05-29T13:00:00'), 24, 28, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(274, TEAMS.hullKR, TEAMS.stHelens, 'FULL-TIME', new Date('2025-05-30T13:00:00'), 34, 4, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(275, TEAMS.salford, TEAMS.wigan, 'FULL-TIME', new Date('2025-05-30T15:00:00'), 6, 46, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(276, TEAMS.warrington, TEAMS.castleford, 'FULL-TIME', new Date('2025-05-30T17:00:00'), 34, 24, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(277, TEAMS.leeds, TEAMS.wakefield, 'FULL-TIME', new Date('2025-05-31T13:00:00'), 22, 18, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(278, TEAMS.catalans, TEAMS.hullFC, 'FULL-TIME', new Date('2025-05-31T15:00:00'), 0, 34, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(279, TEAMS.hullFC, TEAMS.castleford, 'FULL-TIME', new Date('2025-06-13T13:00:00'), 14, 22, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(280, TEAMS.hullKR, TEAMS.catalans, 'FULL-TIME', new Date('2025-06-13T15:00:00'), 68, 6, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(281, TEAMS.huddersfield, TEAMS.wigan, 'FULL-TIME', new Date('2025-06-14T13:00:00'), 18, 22, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(282, TEAMS.leeds, TEAMS.warrington, 'FULL-TIME', new Date('2025-06-14T15:00:00'), 36, 12, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(283, TEAMS.wakefield, TEAMS.leigh, 'FULL-TIME', new Date('2025-06-15T13:00:00'), 20, 24, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(284, TEAMS.salford, TEAMS.stHelens, 'FULL-TIME', new Date('2025-06-15T15:00:00'), 4, 46, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(285, TEAMS.castleford, TEAMS.hullKR, 'FULL-TIME', new Date('2025-06-19T13:00:00'), 0, 48, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(286, TEAMS.stHelens, TEAMS.leeds, 'FULL-TIME', new Date('2025-06-20T13:00:00'), 18, 4, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(287, TEAMS.wakefield, TEAMS.wigan, 'FULL-TIME', new Date('2025-06-20T15:00:00'), 16, 10, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(288, TEAMS.warrington, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-06-21T13:00:00'), 16, 24, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(289, TEAMS.catalans, TEAMS.leigh, 'FULL-TIME', new Date('2025-06-21T15:00:00'), 12, 26, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(290, TEAMS.salford, TEAMS.hullFC, 'FULL-TIME', new Date('2025-06-22T13:00:00'), 6, 38, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(291, TEAMS.hullKR, TEAMS.wakefield, 'FULL-TIME', new Date('2025-06-27T13:00:00'), 34, 10, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(292, TEAMS.leeds, TEAMS.leigh, 'FULL-TIME', new Date('2025-06-27T15:00:00'), 48, 30, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(293, TEAMS.catalans, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-06-28T13:00:00'), 32, 0, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(294, TEAMS.warrington, TEAMS.hullFC, 'FULL-TIME', new Date('2025-06-28T15:00:00'), 24, 10, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(295, TEAMS.castleford, TEAMS.wigan, 'FULL-TIME', new Date('2025-06-28T17:00:00'), 20, 26, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(296, TEAMS.stHelens, TEAMS.salford, 'FULL-TIME', new Date('2025-06-29T13:00:00'), 58, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(297, TEAMS.castleford, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-07-03T13:00:00'), 12, 30, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(298, TEAMS.leigh, TEAMS.wigan, 'FULL-TIME', new Date('2025-07-04T13:00:00'), 18, 8, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(299, TEAMS.salford, TEAMS.warrington, 'FULL-TIME', new Date('2025-07-04T15:00:00'), 12, 24, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(300, TEAMS.hullFC, TEAMS.stHelens, 'FULL-TIME', new Date('2025-07-05T13:00:00'), 6, 13, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(301, TEAMS.wakefield, TEAMS.catalans, 'FULL-TIME', new Date('2025-07-05T15:00:00'), 44, 6, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(302, TEAMS.hullKR, TEAMS.leeds, 'FULL-TIME', new Date('2025-07-06T13:00:00'), 8, 14, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(303, TEAMS.hullFC, TEAMS.wakefield, 'FULL-TIME', new Date('2025-07-10T13:00:00'), 16, 10, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(304, TEAMS.leeds, TEAMS.stHelens, 'FULL-TIME', new Date('2025-07-11T13:00:00'), 0, 6, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(305, TEAMS.wigan, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-07-11T15:00:00'), 30, 10, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(306, TEAMS.leigh, TEAMS.hullKR, 'FULL-TIME', new Date('2025-07-12T13:00:00'), 28, 10, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(307, TEAMS.catalans, TEAMS.warrington, 'FULL-TIME', new Date('2025-07-12T15:00:00'), 20, 24, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(308, TEAMS.salford, TEAMS.castleford, 'FULL-TIME', new Date('2025-07-13T13:00:00'), 26, 22, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(309, TEAMS.stHelens, TEAMS.leigh, 'FULL-TIME', new Date('2025-07-17T13:00:00'), 4, 16, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(310, TEAMS.huddersfield, TEAMS.wakefield, 'FULL-TIME', new Date('2025-07-18T13:00:00'), 10, 46, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(311, TEAMS.leeds, TEAMS.salford, 'FULL-TIME', new Date('2025-07-18T15:00:00'), 42, 6, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(312, TEAMS.wigan, TEAMS.hullFC, 'FULL-TIME', new Date('2025-07-19T13:00:00'), 12, 32, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(313, TEAMS.catalans, TEAMS.hullKR, 'FULL-TIME', new Date('2025-07-19T15:00:00'), 6, 34, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(314, TEAMS.castleford, TEAMS.warrington, 'FULL-TIME', new Date('2025-07-20T13:00:00'), 20, 14, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(315, TEAMS.wakefield, TEAMS.leeds, 'FULL-TIME', new Date('2025-07-24T13:00:00'), 15, 14, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(316, TEAMS.wigan, TEAMS.catalans, 'FULL-TIME', new Date('2025-07-25T13:00:00'), 28, 18, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(317, TEAMS.hullFC, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-07-26T13:00:00'), 14, 30, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(318, TEAMS.salford, TEAMS.hullKR, 'FULL-TIME', new Date('2025-07-31T13:00:00'), 12, 74, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(319, TEAMS.leigh, TEAMS.warrington, 'FULL-TIME', new Date('2025-08-01T13:00:00'), 20, 16, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(320, TEAMS.stHelens, TEAMS.castleford, 'FULL-TIME', new Date('2025-08-01T15:00:00'), 40, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(321, TEAMS.leigh, TEAMS.leeds, 'FULL-TIME', new Date('2025-08-07T13:00:00'), 14, 22, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(322, TEAMS.wakefield, TEAMS.stHelens, 'FULL-TIME', new Date('2025-08-08T13:00:00'), 4, 34, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(323, TEAMS.warrington, TEAMS.wigan, 'FULL-TIME', new Date('2025-08-08T15:00:00'), 18, 24, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(324, TEAMS.hullKR, TEAMS.castleford, 'FULL-TIME', new Date('2025-08-09T13:00:00'), 36, 6, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(325, TEAMS.huddersfield, TEAMS.catalans, 'FULL-TIME', new Date('2025-08-09T15:00:00'), 18, 6, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(326, TEAMS.hullFC, TEAMS.salford, 'FULL-TIME', new Date('2025-08-10T13:00:00'), 80, 6, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(327, TEAMS.warrington, TEAMS.catalans, 'FULL-TIME', new Date('2025-08-14T13:00:00'), 30, 22, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(328, TEAMS.wigan, TEAMS.hullKR, 'FULL-TIME', new Date('2025-08-15T13:00:00'), 6, 10, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(329, TEAMS.castleford, TEAMS.leeds, 'FULL-TIME', new Date('2025-08-16T13:00:00'), 6, 64, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(330, TEAMS.hullFC, TEAMS.leigh, 'FULL-TIME', new Date('2025-08-16T15:00:00'), 18, 12, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(331, TEAMS.stHelens, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-08-17T13:00:00'), 52, 4, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(332, TEAMS.salford, TEAMS.wakefield, 'FULL-TIME', new Date('2025-08-17T15:00:00'), 0, 48, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(333, TEAMS.leeds, TEAMS.hullKR, 'FULL-TIME', new Date('2025-08-21T13:00:00'), 28, 6, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(334, TEAMS.leigh, TEAMS.salford, 'FULL-TIME', new Date('2025-08-22T13:00:00'), 38, 6, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(335, TEAMS.stHelens, TEAMS.hullFC, 'FULL-TIME', new Date('2025-08-22T15:00:00'), 16, 10, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(336, TEAMS.catalans, TEAMS.castleford, 'FULL-TIME', new Date('2025-08-23T13:00:00'), 38, 4, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(337, TEAMS.huddersfield, TEAMS.warrington, 'FULL-TIME', new Date('2025-08-24T13:00:00'), 23, 10, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(338, TEAMS.wigan, TEAMS.wakefield, 'FULL-TIME', new Date('2025-08-24T15:00:00'), 44, 2, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(339, TEAMS.leigh, TEAMS.castleford, 'FULL-TIME', new Date('2025-08-28T13:00:00'), 46, 6, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(340, TEAMS.hullKR, TEAMS.stHelens, 'FULL-TIME', new Date('2025-08-29T13:00:00'), 12, 8, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(341, TEAMS.warrington, TEAMS.salford, 'FULL-TIME', new Date('2025-08-29T15:00:00'), 12, 25, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(342, TEAMS.hullFC, TEAMS.leeds, 'FULL-TIME', new Date('2025-08-30T13:00:00'), 0, 34, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(343, TEAMS.wakefield, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-08-30T15:00:00'), 48, 2, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(344, TEAMS.catalans, TEAMS.wigan, 'FULL-TIME', new Date('2025-08-30T17:00:00'), 44, 0, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(345, TEAMS.huddersfield, TEAMS.leeds, 'FULL-TIME', new Date('2025-09-04T13:00:00'), 0, 26, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(346, TEAMS.salford, TEAMS.catalans, 'FULL-TIME', new Date('2025-09-04T15:00:00'), 16, 17, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(347, TEAMS.castleford, TEAMS.wakefield, 'FULL-TIME', new Date('2025-09-05T13:00:00'), 26, 22, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(348, TEAMS.stHelens, TEAMS.wigan, 'FULL-TIME', new Date('2025-09-05T15:00:00'), 4, 18, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(349, TEAMS.warrington, TEAMS.leigh, 'FULL-TIME', new Date('2025-09-06T13:00:00'), 12, 34, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(350, TEAMS.hullKR, TEAMS.hullFC, 'FULL-TIME', new Date('2025-09-07T13:00:00'), 18, 4, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(351, TEAMS.leeds, TEAMS.catalans, 'FULL-TIME', new Date('2025-09-11T13:00:00'), 8, 16, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(352, TEAMS.leigh, TEAMS.stHelens, 'FULL-TIME', new Date('2025-09-12T13:00:00'), 28, 10, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(353, TEAMS.wigan, TEAMS.castleford, 'FULL-TIME', new Date('2025-09-12T15:00:00'), 6, 26, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(354, TEAMS.hullFC, TEAMS.warrington, 'FULL-TIME', new Date('2025-09-13T13:00:00'), 34, 2, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(355, TEAMS.wakefield, TEAMS.hullKR, 'FULL-TIME', new Date('2025-09-13T15:00:00'), 28, 12, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(356, TEAMS.huddersfield, TEAMS.salford, 'FULL-TIME', new Date('2025-09-14T13:00:00'), 22, 8, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(357, TEAMS.hullFC, TEAMS.catalans, 'FULL-TIME', new Date('2025-09-18T13:00:00'), 22, 26, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(358, TEAMS.hullKR, TEAMS.warrington, 'FULL-TIME', new Date('2025-09-18T15:00:00'), 28, 20, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(359, TEAMS.leigh, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-09-19T13:00:00'), 30, 16, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(360, TEAMS.salford, TEAMS.wakefield, 'FULL-TIME', new Date('2025-09-19T15:00:00'), 16, 52, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(361, TEAMS.stHelens, TEAMS.castleford, 'FULL-TIME', new Date('2025-09-19T17:00:00'), 26, 24, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(362, TEAMS.wigan, TEAMS.leeds, 'FULL-TIME', new Date('2025-09-19T19:00:00'), 22, 6, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(363, TEAMS.leigh, TEAMS.wakefield, 'FULL-TIME', new Date('2025-09-26T13:00:00'), 26, 10, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(364, TEAMS.leeds, TEAMS.stHelens, 'FULL-TIME', new Date('2025-09-27T13:00:00'), 14, 16, teamIdToVenue[TEAMS.leeds.id]),

];

export const mockLeagueTable: LeagueStanding[] = [
  { rank: 1, teamId: TEAMS.hullKR.id, teamName: 'Hull KR', teamLogoUrl: TEAMS.hullKR.logoUrl, played: 27, wins: 22, draws: 0, losses: 5, points: 44, form: 'L W W W W' },
  { rank: 2, teamId: TEAMS.wigan.id, teamName: 'Wigan Warriors', teamLogoUrl: TEAMS.wigan.logoUrl, played: 27, wins: 21, draws: 0, losses: 6, points: 42, form: 'W W W W W' },
  { rank: 3, teamId: TEAMS.leigh.id, teamName: 'Leigh Leopards', teamLogoUrl: TEAMS.leigh.logoUrl, played: 27, wins: 19, draws: 1, losses: 7, points: 39, form: 'W W W W W' },
  { rank: 4, teamId: TEAMS.leeds.id, teamName: 'Leeds Rhinos', teamLogoUrl: TEAMS.leeds.logoUrl, played: 27, wins: 18, draws: 0, losses: 9, points: 36, form: 'W W W L L' },
  { rank: 5, teamId: TEAMS.stHelens.id, teamName: 'St Helens', teamLogoUrl: TEAMS.stHelens.logoUrl, played: 27, wins: 17, draws: 0, losses: 10, points: 34, form: 'W L L L W' },
  { rank: 6, teamId: TEAMS.wakefield.id, teamName: 'Wakefield Trinity', teamLogoUrl: TEAMS.wakefield.logoUrl, played: 27, wins: 15, draws: 0, losses: 12, points: 30, form: 'L W L W W' },
  { rank: 7, teamId: TEAMS.hullFC.id, teamName: 'Hull FC', teamLogoUrl: TEAMS.hullFC.logoUrl, played: 27, wins: 13, draws: 1, losses: 13, points: 27, form: 'L L L W L' },
  { rank: 8, teamId: TEAMS.warrington.id, teamName: 'Warrington Wolves', teamLogoUrl: TEAMS.warrington.logoUrl, played: 27, wins: 10, draws: 0, losses: 17, points: 20, form: 'L L L L L' },
  { rank: 9, teamId: TEAMS.catalans.id, teamName: 'Catalans Dragons', teamLogoUrl: TEAMS.catalans.logoUrl, played: 27, wins: 10, draws: 0, losses: 17, points: 20, form: 'W L W W W' },
  { rank: 10, teamId: TEAMS.huddersfield.id, teamName: 'Huddersfield Giants', teamLogoUrl: TEAMS.huddersfield.logoUrl, played: 27, wins: 7, draws: 0, losses: 20, points: 14, form: 'W L L W L' },
  { rank: 11, teamId: TEAMS.castleford.id, teamName: 'Castleford Tigers', teamLogoUrl: TEAMS.castleford.logoUrl, played: 27, wins: 6, draws: 0, losses: 21, points: 12, form: 'L L W L L' },
  { rank: 12, teamId: TEAMS.salford.id, teamName: 'Salford Red Devils', teamLogoUrl: TEAMS.salford.logoUrl, played: 27, wins: 3, draws: 0, losses: 24, points: 4, form: 'L W L L L' }
];
