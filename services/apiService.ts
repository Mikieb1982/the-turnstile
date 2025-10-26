export type TableRow = { teamId: string; played: number; won: number; drawn: number; lost: number; pts: number }

export async function getLeagueTable(): Promise<TableRow[]> {
  return [
    { teamId: "WIG", played: 10, won: 8, drawn: 1, lost: 1, pts: 17 },
    { teamId: "STH", played: 10, won: 7, drawn: 1, lost: 2, pts: 15 },
    { teamId: "LEE", played: 10, won: 6, drawn: 0, lost: 4, pts: 12 },
  ]
}

/** some files import fetchLeagueTable */
export const fetchLeagueTable = getLeagueTable
