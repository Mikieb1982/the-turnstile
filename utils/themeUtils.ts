import { TEAM_BRANDING } from '../services/mockData';

type TeamBranding = (typeof TEAM_BRANDING)[string];

export type ThemeMode = 'light' | 'dark';

export interface ThemeVariables {
  primary: string;
  secondary: string;
  accent: string;
  danger: string;
  warning: string;
  info: string;
  success: string;
  textStrong: string;
  text: string;
  textSubtle: string;
  border: string;
  surface: string;
  surfaceAlt: string;
  gradient1: string;
  gradient2: string;
  gradient3: string;
}

interface ThemeComputationOptions {
  mode: ThemeMode;
  teamBranding?: TeamBranding;
}

const DEFAULT_LIGHT_THEME: ThemeVariables = {
  primary: '#7F1028',
  secondary: '#FFD447',
  accent: '#0052CC',
  danger: '#7F1028',
  warning: '#FFD447',
  info: '#0052CC',
  success: '#00A86B',
  textStrong: '#0A1D4D',
  text: '#152A63',
  textSubtle: '#31406F',
  border: '#DDDDDD',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F5',
  gradient1: 'linear-gradient(140deg, rgba(127, 16, 40, 0.12), rgba(0, 82, 204, 0.1))',
  gradient2: 'radial-gradient(circle at 20% 15%, rgba(255, 212, 71, 0.18), transparent 55%)',
  gradient3: 'radial-gradient(circle at 80% 0%, rgba(127, 16, 40, 0.14), transparent 45%)',
};

const DEFAULT_DARK_THEME: ThemeVariables = {
  primary: '#1E3A8A',
  secondary: '#2563EB',
  accent: '#F59E0B',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#2563EB',
  success: '#06B6D4',
  textStrong: '#F8FAFC',
  text: '#F8FAFC',
  textSubtle: '#CBD5E1',
  border: '#334155',
  surface: '#0F172A',
  surfaceAlt: '#111827',
  gradient1: 'linear-gradient(140deg, rgba(30, 58, 138, 0.24), rgba(37, 99, 235, 0.16))',
  gradient2: 'radial-gradient(circle at 18% 20%, rgba(245, 158, 11, 0.22), transparent 58%)',
  gradient3: 'radial-gradient(circle at 78% -10%, rgba(11, 16, 32, 0.24), transparent 48%)',
};

const VARIABLE_NAME_MAP: Record<keyof ThemeVariables, string> = {
  primary: '--clr-primary',
  secondary: '--clr-secondary',
  accent: '--clr-accent',
  danger: '--clr-danger',
  warning: '--clr-warning',
  info: '--clr-info',
  success: '--clr-success',
  textStrong: '--clr-text-strong',
  text: '--clr-text',
  textSubtle: '--clr-text-subtle',
  border: '--clr-border',
  surface: '--clr-surface',
  surfaceAlt: '--clr-surface-alt',
  gradient1: '--gradient-1',
  gradient2: '--gradient-2',
  gradient3: '--gradient-3',
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string): [number, number, number] | null => {
  const normalised = hex.replace('#', '');
  if (normalised.length === 3) {
    const [r, g, b] = normalised.split('').map((component) => component.repeat(2));
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  }
  if (normalised.length !== 6) {
    return null;
  }
  const r = Number.parseInt(normalised.slice(0, 2), 16);
  const g = Number.parseInt(normalised.slice(2, 4), 16);
  const b = Number.parseInt(normalised.slice(4, 6), 16);

  return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (component: number) => clamp(Math.round(component), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const mixHexColors = (hexA: string, hexB: string, amount: number): string => {
  const weight = clamp(amount, 0, 1);
  const rgbA = hexToRgb(hexA);
  const rgbB = hexToRgb(hexB);

  if (!rgbA || !rgbB) {
    return rgbA ? rgbToHex(...rgbA) : hexA;
  }

  const [rA, gA, bA] = rgbA;
  const [rB, gB, bB] = rgbB;

  const r = rA + (rB - rA) * weight;
  const g = gA + (gB - gA) * weight;
  const b = bA + (bB - bA) * weight;

  return rgbToHex(r, g, b);
};

const hexToHsl = (hex: string): [number, number, number] | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return null;
  }

  const [r, g, b] = rgb.map((component) => component / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    return [0, 0, l];
  }

  const delta = max - min;
  s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  switch (max) {
    case r:
      h = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / delta + 2;
      break;
    case b:
      h = (r - g) / delta + 4;
      break;
    default:
      h = 0;
  }

  return [h / 6, s, l];
};

const hslToHex = (h: number, s: number, l: number): string => {
  const hue = ((h % 1) + 1) % 1;

  const hueToRgb = (p: number, q: number, t: number) => {
    let temp = t;
    if (temp < 0) temp += 1;
    if (temp > 1) temp -= 1;
    if (temp < 1 / 6) return p + (q - p) * 6 * temp;
    if (temp < 1 / 2) return q;
    if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
    return p;
  };

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, hue + 1 / 3);
    g = hueToRgb(p, q, hue);
    b = hueToRgb(p, q, hue - 1 / 3);
  }

  return rgbToHex(r * 255, g * 255, b * 255);
};

const shiftLightness = (hex: string, amount: number): string => {
  const hsl = hexToHsl(hex);
  if (!hsl) {
    return hex;
  }
  const [h, s, l] = hsl;
  return hslToHex(h, s, clamp(l + amount, 0, 1));
};

const buildTeamOverride = ({ mode, teamBranding }: ThemeComputationOptions): Partial<ThemeVariables> | null => {
  if (!teamBranding) {
    return null;
  }

  const basePrimary = teamBranding.primary;
  const secondary = teamBranding.secondary ?? '#ffffff';
  const accent = mixHexColors(teamBranding.primary, teamBranding.secondary ?? '#ffffff', 0.4);
  const textStrong = teamBranding.text ?? (mode === 'dark' ? '#F8FAFC' : '#0F172A');
  const surface = mode === 'dark' ? shiftLightness(teamBranding.primary, -0.6) : shiftLightness(teamBranding.secondary ?? '#ffffff', 0.55);
  const surfaceAlt = mixHexColors(surface, mode === 'dark' ? '#000000' : '#ffffff', mode === 'dark' ? 0.25 : 0.15);
  const border = mixHexColors(basePrimary, secondary, mode === 'dark' ? 0.65 : 0.25);
  const text = mixHexColors(textStrong, mode === 'dark' ? '#CBD5E1' : '#1F2937', 0.25);
  const textSubtle = mixHexColors(text, mode === 'dark' ? '#94A3B8' : '#64748B', 0.35);

  const gradientBase = mixHexColors(basePrimary, secondary, 0.35);
  const gradientAccent = mixHexColors(basePrimary, '#111827', mode === 'dark' ? 0.15 : 0.05);

  return {
    primary: basePrimary,
    secondary,
    accent,
    textStrong,
    text,
    textSubtle,
    surface,
    surfaceAlt,
    border,
    gradient1: `linear-gradient(140deg, ${mixHexColors(gradientBase, surface, 0.2)}55, ${gradientAccent}30)`,
    gradient2: `radial-gradient(circle at 18% 20%, ${mixHexColors(basePrimary, '#ffffff', 0.25)}22, transparent 58%)`,
    gradient3: `radial-gradient(circle at 78% -10%, ${mixHexColors(basePrimary, '#000000', 0.4)}24, transparent 48%)`,
  };
};

export const createThemeVariables = ({ mode, teamBranding }: ThemeComputationOptions): ThemeVariables => {
  const base = mode === 'dark' ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
  const override = buildTeamOverride({ mode, teamBranding });
  if (!override) {
    return { ...base };
  }
  return { ...base, ...override };
};

export const applyThemeToDocument = (theme: ThemeVariables, root?: HTMLElement) => {
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : undefined);
  if (!target) {
    return;
  }
  Object.entries(VARIABLE_NAME_MAP).forEach(([key, cssVar]) => {
    const property = key as keyof ThemeVariables;
    target.style.setProperty(cssVar, theme[property]);
  });
};

export const getTeamBranding = (teamId?: string | null): TeamBranding | undefined => {
  if (!teamId) {
    return undefined;
  }
  return TEAM_BRANDING[teamId];
};

export const createTeamAwareTheme = (mode: ThemeMode, teamId?: string | null): ThemeVariables => {
  const branding = getTeamBranding(teamId);
  return createThemeVariables({ mode, teamBranding: branding });
};

export const getThemeSnapshot = (mode: ThemeMode, teamId?: string | null) => ({
  mode,
  teamId: teamId ?? null,
  variables: createTeamAwareTheme(mode, teamId),
});

export const applyThemeFromSettings = (mode: ThemeMode, teamId?: string | null, root?: HTMLElement) => {
  const theme = createTeamAwareTheme(mode, teamId);
  const target = root ?? (typeof document !== 'undefined' ? document.documentElement : undefined);
  applyThemeToDocument(theme, target);
  if (target) {
    target.dataset.themeMode = mode;
    if (teamId) {
      target.dataset.themeTeam = teamId;
    } else {
      delete target.dataset.themeTeam;
    }
  }
};

export const resolveInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const stored = window.localStorage.getItem('theme-mode') as ThemeMode | null;
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const persistThemeMode = (mode: ThemeMode) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem('theme-mode', mode);
};

export const persistTeamPreference = (teamId: string | null) => {
  if (typeof window === 'undefined') {
    return;
  }
  if (teamId) {
    window.localStorage.setItem('theme-team', teamId);
  } else {
    window.localStorage.removeItem('theme-team');
  }
};

export const readPersistedTeam = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const stored = window.localStorage.getItem('theme-team');
  return stored ?? null;
};
