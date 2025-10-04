export type ShareOutcome = 'shared' | 'copied' | 'failed';

export interface ShareContent {
  title: string;
  text: string;
  url?: string;
  clipboardFallbackText?: string;
}

const getClipboardPayload = ({ text, url, clipboardFallbackText }: ShareContent) => {
  if (clipboardFallbackText) {
    return clipboardFallbackText;
  }

  if (text && url) {
    return `${text} ${url}`.trim();
  }

  return text || url || '';
};

export const attemptShare = async (content: ShareContent): Promise<ShareOutcome> => {
  if (typeof navigator !== 'undefined' && 'share' in navigator) {
    try {
      await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
        title: content.title,
        text: content.text,
        url: content.url,
      });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'shared';
      }
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(getClipboardPayload(content));
      return 'copied';
    } catch {
      // no-op fallthrough
    }
  }

  return 'failed';
};

export const getAppShareUrl = () => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return 'https://thescrumbook.com';
};
