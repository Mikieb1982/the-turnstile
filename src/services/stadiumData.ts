import type { TeamInfo } from '../types'
import { TEAMS, teamIdToVenue } from './mockData'

type Stadium = TeamInfo['stadium']

type TeamStats = TeamInfo & { teamId: string }

const baseStadiums: Record<string, Stadium> = {
  'DW Stadium': { name: 'DW Stadium', capacity: '25,138', notes: 'Shared with Wigan Athletic' },
  'Totally Wicked Stadium': { name: 'Totally Wicked Stadium', capacity: '18,000', notes: 'Opened in 2012' },
  'Headingley Stadium': { name: 'Headingley Stadium', capacity: '21,062', notes: 'Historic dual-use rugby ground' },
  'Halliwell Jones Stadium': { name: 'Halliwell Jones Stadium', capacity: '15,200', notes: 'Known for its vibrant atmosphere' },
  'Stade Gilbert Brutus': { name: 'Stade Gilbert Brutus', capacity: '13,000', notes: 'Located in Perpignan, France' },
  'Craven Park': { name: 'Craven Park', capacity: '12,000', notes: 'Home of Hull KR since 1989' },
}

const teamFacts: Record<string, Omit<TeamStats, 'teamId' | 'stadium'>> = {
  WIG: { name: TEAMS.WIG.name, established: 1872, titles: '22', location: 'Wigan' },
  STH: { name: TEAMS.STH.name, established: 1873, titles: '16', location: 'St Helens' },
  LEE: { name: TEAMS.LEE.name, established: 1890, titles: '11', location: 'Leeds' },
  WAR: { name: TEAMS.WAR.name, established: 1876, titles: '4', location: 'Warrington' },
  CAT: { name: TEAMS.CAT.name, established: 2000, titles: '1', location: 'Perpignan' },
  HUL: { name: TEAMS.HUL.name, established: 1882, titles: '1', location: 'Hull' },
}

export const teamsData: TeamStats[] = Object.entries(teamFacts).map(([teamId, facts]) => ({
  teamId,
  ...facts,
  stadium: baseStadiums[teamIdToVenue[teamId]] ?? { name: 'TBC', capacity: '—', notes: 'Details coming soon' },
}))

export function getStadiumByTeam(teamId: string): Stadium | undefined {
  return teamsData.find((team) => team.teamId === teamId)?.stadium
}
