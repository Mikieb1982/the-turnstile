export function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

export function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
}
