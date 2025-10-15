import type { LeagueStanding } from '../types'
import { mockLeagueTable } from './mockData'

export async function getLeagueTable(): Promise<LeagueStanding[]> {
  return mockLeagueTable
}

export const fetchLeagueTable = getLeagueTable
