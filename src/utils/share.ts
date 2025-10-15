export enum ShareOutcome { Shared = "shared", Copied = "copied", Failed = "failed" }

export function getAppShareUrl(path: string = "/"): string {
  const base = typeof window !== "undefined" ? window.location.origin : "https://the-scrum-book.web.app"
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export async function attemptShare(title: string, text: string, url?: string): Promise<ShareOutcome> {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url })
      return ShareOutcome.Shared
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText([title, text, url ?? ""].filter(Boolean).join("\n"))
      return ShareOutcome.Copied
    }
    return ShareOutcome.Failed
  } catch {
    return ShareOutcome.Failed
  }
}
