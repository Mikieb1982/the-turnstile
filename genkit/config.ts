const FALLBACK_BASE_URL = '/genkit';

const sanitizeBaseUrl = (value: string | undefined | null): string => {
  if (!value) {
    return FALLBACK_BASE_URL;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return FALLBACK_BASE_URL;
  }

  return trimmed.replace(/\/$/, '');
};

/**
 * Returns the configured Genkit base URL.
 *
 * The UI reads from `VITE_GENKIT_BASE_URL` but gracefully falls back to `/genkit`
 * so that it works out of the box with the Firebase emulator suite or local
 * proxies that expose Genkit actions under that path.
 */
export const getGenkitBaseUrl = (): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const configured = (import.meta.env as Record<string, unknown>).VITE_GENKIT_BASE_URL;
    if (typeof configured === 'string') {
      return sanitizeBaseUrl(configured);
    }
  }

  if (typeof process !== 'undefined' && process.env && typeof process.env.VITE_GENKIT_BASE_URL === 'string') {
    return sanitizeBaseUrl(process.env.VITE_GENKIT_BASE_URL);
  }

  return FALLBACK_BASE_URL;
};

export const buildGenkitUrl = (path: string): string => {
  const base = getGenkitBaseUrl();
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}/${cleanPath}`;
};
