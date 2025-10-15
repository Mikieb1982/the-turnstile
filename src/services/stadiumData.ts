import type { Team } from "./mockData"

export type Stadium = { id: string; name: string; city?: string; capacity?: number }

export const stadiums: Stadium[] = [
  { id: "WIGV", name: "DW Stadium", city: "Wigan", capacity: 25138 },
  { id: "STHV", name: "Totally Wicked Stadium", city: "St Helens", capacity: 18000 },
]

export function getStadiumById(id: string) { return stadiums.find(s => s.id === id) }

/** some components import teamsData; provide a minimal stub */
export const teamsData: Array<{ team: Team; stadiumId?: string }> = []
