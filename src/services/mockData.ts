import type { LeagueStanding, Team as AppTeam, Venue as AppVenue } from '../types';

import {
  TEAMS as baseTeamsRecord,
  teams as baseTeams,
  TEAM_BRANDING as baseBranding,
  ALL_VENUES as baseVenues,
  teamIdToVenue,
  matches,
  mockMatches,
  mockUserData,
  mockNextMatch,
  mockFixtures as baseFixtures,
  mockLeagueTable as baseTableRows,
  superLeague2025Summary,
  individualAwards,
  playoffResults,
  selectedFixtureResults,
  TEAM_FORMS,
} from '../../services/mockData';

type Team = AppTeam & { shortName?: string };

type TeamBranding = {
  bg: string;
  text: string;
  palette?: [string, string?, string?];
};

type Venue = AppVenue & { id: string; city?: string; team?: string };

export type Fixture = (typeof baseFixtures)[number];

const buildTeamsRecord = (): Record<string, Team> => {
  const teamsById: Record<string, Team> = {};

  baseTeams.forEach(team => {
    const baseTeam = baseTeamsRecord[team.id];
    teamsById[team.id] = {
      id: team.id,
      name: team.name,
      logoUrl: team.logoUrl ?? '',
      shortName: baseTeam?.shortName,
    };
  });

  return teamsById;
};

export const TEAMS: Record<string, Team> = buildTeamsRecord();

export const teams: Team[] = Object.values(TEAMS);

export const TEAM_BRANDING: Record<string, TeamBranding> = baseBranding;

export const ALL_VENUES: Venue[] = baseVenues as Venue[];

export { teamIdToVenue, matches, mockMatches, mockUserData, mockNextMatch };

export const mockFixtures: Fixture[] = baseFixtures;

export const mockLeagueTable: LeagueStanding[] = baseTableRows.map(row => {
  const team = TEAMS[row.teamId];

  return {
    rank: row.position,
    teamId: row.teamId,
    teamName: team?.name ?? row.teamName,
    teamLogoUrl: team?.logoUrl ?? '',
    played: row.played,
    wins: row.won,
    draws: row.drawn,
    losses: row.lost,
    points: row.points,
    form: TEAM_FORMS[row.teamId] ?? '-----',
  };
});

export { superLeague2025Summary, individualAwards, playoffResults, selectedFixtureResults };

export function getTeamById(id: string): Team | undefined {
  return TEAMS[id];
}

export function getVenueById(id: string): Venue | undefined {
  return ALL_VENUES.find(venue => venue.id === id);
}
