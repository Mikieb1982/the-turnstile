'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = (): [string, () => void] => {
  // Default to dark, but the user's preference in localStorage will override it.
  const [theme, setTheme] = useLocalStorage<string>('theme', 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggleTheme];
};