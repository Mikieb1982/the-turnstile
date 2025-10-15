export type Badge = { id: string; name: string; description?: string }

const badges: Badge[] = [
  { id: "first_visit", name: "First Ground Visit", description: "Logged your first stadium visit" },
  { id: "derby_day", name: "Derby Day", description: "Attended a local derby" }
]

export default badges
