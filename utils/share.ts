// utils/share.ts
export type ShareOutcome = 'shared' | 'copied' | 'dismissed' | 'error';

export const getAppShareUrl = (): string => {
  const envBase = import.meta.env.VITE_PUBLIC_BASE_URL as string | undefined;
  if (envBase) return envBase;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

export async function attemptShare(args: {
  title: string;
  text: string;
  url: string;
}): Promise<ShareOutcome> {
  try {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      await (navigator as any).share(args);
      return 'shared';
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') return 'dismissed';
  }
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(args.url);
      return 'copied';
    }
  } catch {}
  return 'error';
}
