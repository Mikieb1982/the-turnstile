import { TEAM_BRANDING } from '../services/mockData';

export type ThemeMode = 'light' | 'dark';

interface ThemeVariables {
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

const DEFAULT_LIGHT_THEME: ThemeVariables = {
  primary: '#7F1028',
  secondary: '#FFD447',
  accent: '#0052CC',
  danger: '#7F1028',
  warning: '#FFD447',
  info: '#0052CC',
  success: '#00A86B',
  textStrong: '#121212',
  text: '#333333',
  textSubtle: '#666666',
  border: '#DDDDDD',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F5',
  gradient1: 'linear-gradient(140deg, rgba(127, 16, 40, 0.12), rgba(0, 82, 204, 0.1))',
  gradient2: 'radial-gradient(circle at 20% 15%, rgba(255, 212, 71, 0.18), transparent 55%)',
  gradient3: 'radial-gradient(circle at 80% 0%, rgba(127, 16, 40, 0.14), transparent 45%)',
};

const DEFAULT_DARK_THEME: ThemeVariables = {
  primary: '#B71E3C',
  secondary: '#FFDD57',
  accent: '#0074FF',
  danger: '#B71E3C',
  warning: '#FFDD57',
  info: '#3B82F6',
  success: '#22C55E',
  textStrong: '#FFFFFF',
  text: '#E0E0E0',
  textSubtle: '#A0A0A0',
  border: '#404040',
  surface: '#1A1A1A',
  surfaceAlt: '#2C2C2C',
  gradient1: 'linear-gradient(140deg, rgba(183, 30, 60, 0.24), rgba(0, 116, 255, 0.18))',
  gradient2: 'radial-gradient(circle at 15% 20%, rgba(255, 221, 87, 0.22), transparent 60%)',
  gradient3: 'radial-gradient(circle at 90% 10%, rgba(183, 30, 60, 0.2), transparent 55%)',
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
    const r = normalised[0];
    const g = normalised[1];
    const b = normalised[2];
    return [parseInt(r.repeat(2), 16), parseInt(g.repeat(2), 16), parseInt(b.repeat(2), 16)];
  }

  if (normalised.length !== 6) {
    return null;
  }

  const r = parseInt(normalised.slice(0, 2), 16);
  const g = parseInt(normalised.slice(2, 4), 16);
  const b = parseInt(normalised.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return null;
  }

  return [r, g, b];
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

const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return `rgba(0, 0, 0, ${clamp(alpha, 0, 1)})`;
  }
  const [r, g, b] = rgb;
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
};

const createTeamOverrides = (
  baseColor: string,
  textColor: string,
  mode: ThemeMode,
  defaults: ThemeVariables,
): Partial<ThemeVariables> => {
  const secondary = mixHexColors(baseColor, '#FFFFFF', mode === 'dark' ? 0.35 : 0.65);
  const accent = mixHexColors(baseColor, textColor, mode === 'dark' ? 0.45 : 0.25);
  const warning = mixHexColors(baseColor, '#FACC15', mode === 'dark' ? 0.5 : 0.3);
  const info = mixHexColors(baseColor, '#38BDF8', mode === 'dark' ? 0.5 : 0.35);
  const success = mixHexColors(baseColor, '#22C55E', mode === 'dark' ? 0.55 : 0.35);
  const border = mixHexColors(defaults.border, baseColor, mode === 'dark' ? 0.4 : 0.25);
  const surface = mixHexColors(defaults.surface, baseColor, mode === 'dark' ? 0.12 : 0.08);
  const surfaceAlt = mixHexColors(defaults.surfaceAlt, baseColor, mode === 'dark' ? 0.16 : 0.12);

  const gradient1 = `linear-gradient(140deg, ${hexToRgba(baseColor, mode === 'dark' ? 0.28 : 0.18)}, ${hexToRgba(accent, mode === 'dark' ? 0.18 : 0.12)})`;
  const gradient2 = `radial-gradient(circle at 20% 15%, ${hexToRgba(secondary, mode === 'dark' ? 0.24 : 0.16)}, transparent 55%)`;
  const gradient3 = `radial-gradient(circle at 80% 0%, ${hexToRgba(baseColor, mode === 'dark' ? 0.2 : 0.14)}, transparent 45%)`;

  return {
    primary: baseColor,
    secondary,
    accent,
    danger: baseColor,
    warning,
    info,
    success,
    border,
    surface,
    surfaceAlt,
    gradient1,
    gradient2,
    gradient3,
  };
};

const getDefaultsForMode = (mode: ThemeMode) => (mode === 'dark' ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME);

export const getThemeVariables = (teamId: string | undefined, mode: ThemeMode): ThemeVariables => {
  const defaults = getDefaultsForMode(mode);

  if (!teamId) {
    return defaults;
  }

  const branding = TEAM_BRANDING[teamId];
  if (!branding) {
    return defaults;
  }

  const overrides = createTeamOverrides(branding.bg, branding.text, mode, defaults);
  return { ...defaults, ...overrides };
};

const applyVariablesToRoot = (variables: ThemeVariables, mode: ThemeMode) => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  (Object.keys(VARIABLE_NAME_MAP) as Array<keyof ThemeVariables>).forEach(key => {
    const cssVar = VARIABLE_NAME_MAP[key];
    root.style.setProperty(cssVar, variables[key]);
  });

  root.style.setProperty('color-scheme', mode);
};

export const syncThemeWithFavouriteTeam = (teamId: string | undefined, mode: ThemeMode) => {
  const variables = getThemeVariables(teamId, mode);
  applyVariablesToRoot(variables, mode);
};
