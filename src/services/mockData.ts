export type Team = { id: string; name: string; shortName?: string; logoUrl?: string }
export type Venue = { id: string; name: string; lat?: number; lon?: number }
export type Match = {
  id: string
  homeId: string
  awayId: string
  venueId: string
  date: string
}

export const teams: Team[] = [
  { id: "WIG", name: "Wigan Warriors" },
  { id: "STH", name: "St Helens" },
  { id: "LEE", name: "Leeds Rhinos" }
]

export const venues: Venue[] = [
  { id: "WIGV", name: "DW Stadium" },
  { id: "STHV", name: "Totally Wicked Stadium" }
]

export const matches: Match[] = [
  { id: "m1", homeId: "WIG", awayId: "STH", venueId: "WIGV", date: new Date().toISOString() }
]

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id)
}
export function getVenueById(id: string): Venue | undefined {
  return venues.find(v => v.id === id)
}
