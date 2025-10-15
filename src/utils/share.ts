export async function share(title: string, text: string, url?: string) {
  if (navigator.share) {
    await navigator.share({ title, text, url })
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText([title, text, url ?? ""].filter(Boolean).join("\n"))
  }
}
