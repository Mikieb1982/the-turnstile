import { TEAM_BRANDING } from '../services/mockData';
import type { TeamBranding } from '../services/mockData';

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

const hexToHsl = (hex: string): [number, number, number] | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return null;
  }

  const [r, g, b] = rgb.map(component => component / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  const delta = max - min;
  if (delta === 0) {
    return [0, 0, l];
  }

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

  h /= 6;

  return [h, s, l];
};

const hueToRgb = (p: number, q: number, t: number) => {
  let temp = t;
  if (temp < 0) {
    temp += 1;
  }
  if (temp > 1) {
    temp -= 1;
  }
  if (temp < 1 / 6) {
    return p + (q - p) * 6 * temp;
  }
  if (temp < 1 / 2) {
    return q;
  }
  if (temp < 2 / 3) {
    return p + (q - p) * (2 / 3 - temp) * 6;
  }
  return p;
};

const hslToHex = (h: number, s: number, l: number): string => {
  const hue = ((h % 1) + 1) % 1;
  const saturation = clamp(s, 0, 1);
  const lightness = clamp(l, 0, 1);

  if (saturation === 0) {
    const gray = Math.round(lightness * 255);
    return rgbToHex(gray, gray, gray);
  }

  const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;

  const r = Math.round(hueToRgb(p, q, hue + 1 / 3) * 255);
  const g = Math.round(hueToRgb(p, q, hue) * 255);
  const b = Math.round(hueToRgb(p, q, hue - 1 / 3) * 255);

  return rgbToHex(r, g, b);
};

const adjustColorIntensity = (
  hex: string,
  { saturationMultiplier = 1, lightnessMultiplier = 1, lightnessBias = 0 }: {
    saturationMultiplier?: number;
    lightnessMultiplier?: number;
    lightnessBias?: number;
  },
): string => {
  const hsl = hexToHsl(hex);
  if (!hsl) {
    return hex;
  }

  const [h, s, l] = hsl;
  const adjustedS = clamp(s * saturationMultiplier, 0, 1);
  const adjustedL = clamp(l * lightnessMultiplier + lightnessBias, 0, 1);

  return hslToHex(h, adjustedS, adjustedL);
};

const emphasisePrimaryColor = (hex: string, mode: ThemeMode) =>
  adjustColorIntensity(hex, {
    saturationMultiplier: 1.12,
    lightnessMultiplier: mode === 'dark' ? 1.08 : 1,
  });

const createTeamOverrides = (
  branding: TeamBranding,
  mode: ThemeMode,
  defaults: ThemeVariables,
): Partial<ThemeVariables> => {
  const palette = branding.palette && branding.palette.length > 0 ? branding.palette : [branding.bg, branding.text];
  const [rawPrimary, rawSecondary, rawTertiary] = palette;

  const primary = emphasisePrimaryColor(rawPrimary ?? branding.bg, mode);

  const secondaryBase = rawSecondary ?? mixHexColors(primary, '#FFFFFF', mode === 'dark' ? 0.18 : 0.28);
  const accentBase = rawTertiary ?? rawSecondary ?? adjustColorIntensity(primary, {
    saturationMultiplier: 0.95,
    lightnessMultiplier: mode === 'dark' ? 1.22 : 0.88,
  });

  const secondary = adjustColorIntensity(secondaryBase, {
    saturationMultiplier: 1.08,
    lightnessMultiplier: mode === 'dark' ? 1.04 : 0.98,
  });

  const accent = adjustColorIntensity(accentBase, {
    saturationMultiplier: 1.1,
    lightnessMultiplier: mode === 'dark' ? 1.02 : 0.96,
  });

  const warning = adjustColorIntensity(rawSecondary ?? mixHexColors(primary, '#F97316', 0.45), {
    saturationMultiplier: 1.05,
    lightnessMultiplier: mode === 'dark' ? 1 : 0.98,
  });

  const info = adjustColorIntensity(mixHexColors(accent, '#2563EB', 0.35), {
    saturationMultiplier: 1.05,
    lightnessMultiplier: mode === 'dark' ? 1 : 0.97,
  });

  const success = adjustColorIntensity(mixHexColors(accent, '#16A34A', 0.4), {
    saturationMultiplier: 1.08,
    lightnessMultiplier: mode === 'dark' ? 1 : 0.97,
  });

  const border = adjustColorIntensity(mixHexColors(defaults.border, primary, mode === 'dark' ? 0.38 : 0.24), {
    saturationMultiplier: 1.05,
    lightnessMultiplier: mode === 'dark' ? 1 : 0.92,
  });

  const surface = mixHexColors(defaults.surface, primary, mode === 'dark' ? 0.12 : 0.07);
  const surfaceAlt = mixHexColors(defaults.surfaceAlt, primary, mode === 'dark' ? 0.16 : 0.1);

  const gradient1 = `linear-gradient(135deg, ${hexToRgba(primary, mode === 'dark' ? 0.65 : 0.5)}, ${hexToRgba(accent, mode === 'dark' ? 0.52 : 0.35)})`;
  const gradient2 = `radial-gradient(circle at 18% 20%, ${hexToRgba(secondary, mode === 'dark' ? 0.5 : 0.32)}, transparent 56%)`;
  const gradient3 = `radial-gradient(circle at 78% -10%, ${hexToRgba(primary, mode === 'dark' ? 0.5 : 0.28)}, transparent 48%)`;

  return {
    primary,
    secondary,
    accent,
    danger: primary,
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

  const overrides = createTeamOverrides(branding, mode, defaults);
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
