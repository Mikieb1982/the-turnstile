<<<<<<< HEAD
import { useCallback, useEffect, useMemo, useState } from 'react';
=======
import { useEffect, useMemo, useState } from 'react';
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
import {
  applyThemeFromSettings,
  createTeamAwareTheme,
  persistTeamPreference,
  persistThemeMode,
  readPersistedTeam,
  resolveInitialMode,
  type ThemeMode,
  type ThemeVariables,
} from '../utils/themeUtils';

export interface UseThemeResult {
  mode: ThemeMode;
  teamId: string | null;
  theme: ThemeVariables;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setTeamId: (teamId: string | null) => void;
  refresh: () => void;
}

export const useTheme = (): UseThemeResult => {
  const [mode, setMode] = useState<ThemeMode>(() => resolveInitialMode());
  const [teamId, setTeamId] = useState<string | null>(() => readPersistedTeam());

  const theme = useMemo(() => createTeamAwareTheme(mode, teamId), [mode, teamId]);

  useEffect(() => {
    persistThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    persistTeamPreference(teamId);
  }, [teamId]);

<<<<<<< HEAD
  const refresh = useCallback(() => {
    applyThemeFromSettings(mode, teamId ?? undefined);
  }, [mode, teamId]);

  useEffect(() => {
    refresh();
  }, [refresh]);
=======
  const refresh = () => {
    applyThemeFromSettings(mode, teamId ?? undefined);
  };

  useEffect(() => {
    refresh();
  }, [mode, teamId]);
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return {
    mode,
    teamId,
    theme,
    toggleMode,
    setMode,
    setTeamId,
    refresh,
  };
};
