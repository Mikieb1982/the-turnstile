export type TeamBranding = {
  id: string
  name: string
  nickname: string
  abbreviation: string
  primaryColor: string
  secondaryColor: string
  gradient: string
}

export type FixtureSummary = {
  id: string
  round: string
  date: string
  time: string
  stadium: string
  homeTeamId: string
  awayTeamId: string
  status: 'UPCOMING' | 'FINAL'
  homeScore?: number
  awayScore?: number
}

export type RecentResult = {
  id: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
  date: string
}

export type QuickStat = {
  id: string
  label: string
  value: string
  helper: string
}

export type LeagueTableRow = {
  position: number
  teamId: string
  played: number
  wins: number
  draws: number
  losses: number
  pointsFor: number
  pointsAgainst: number
  pointsDifference: number
  totalPoints: number
  form: Array<'W' | 'L' | 'D'>
}
